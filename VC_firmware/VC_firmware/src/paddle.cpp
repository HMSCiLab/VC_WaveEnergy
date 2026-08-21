#include <cmath>
#include <sys/_stdint.h>
// #include "api/Common.h"
#include "interface.h"
#include <Arduino.h>
#include "config.h"
#include "paddle.h"
#include "interface.h"

volatile bool motor_should_stop = false;

/*
* 310mm -> 1ft -> 300hz -> smallest wave
* 920mm -> 3ft
* 1530mm -> 5ft
* 2140mm -> 7ft
* 2750mm -> 9ft
* 3660mm -> 12ft -> 1200hz -> largest wave

Choose the appropriate hz based on the arduino configuration
file located in the UI source code. 
*/
uint16_t choose_height_hz(uint16_t user_height){
  if (user_height <= 310) return 300;
  else if (user_height <= 920) return 450;
  else if (user_height <= 1530) return 600;
  else if (user_height <= 2140) return 750;
  else if (user_height <= 2750) return 900;
  else return 1200;
}

/*
* 3 sec -> 3000ms -> 150ms -> shortest period
* 5 sec -> 5000ms
* 7 sec -> 7000ms
* 9 sec -> 9000ms
* 11 sec -> 11000ms
* 14 sec -> 14000ms -> 1800ms -> longest period

Choose the appropriate ms motor run time based on the
arduino configuration file located in the UI source code. 
*/
uint16_t choose_period_ms(uint16_t user_period) {
  if (user_period <= 3) return 150;
  else if (user_period <= 5) return 400;
  else if (user_period <= 7) return 700;
  else if (user_period <= 9) return 1000;
  else if (user_period <= 11) return 1400;
  else return 1800;
}

uint16_t compute_power(uint16_t user_height, uint16_t user_period) {
  uint64_t raw = (uint64_t)user_height * user_height * user_period;
  uint16_t power = raw / 1000000;
  return constrain(power, 0, 100);  // Send something back between 0 & 100
}

void go_to_limit_C()
{ 
   if (digitalRead(config::LIMIT_SWITCH_C) == HIGH) 
  {
    // From current possition, send the motor back to Home (Limit C)
    digitalWrite(config::MOTOR_ENABLE_PIN, HIGH);
    digitalWrite(config::MOTOR_DIRECTION_PIN, config::motor_reverse); 
    delay(5); // Driver setup time
    tone(config::MOTOR_STEP_PIN, 100); // move slowly
    while (digitalRead(config::LIMIT_SWITCH_C) == HIGH);
  }
  noTone(config::MOTOR_STEP_PIN);
  digitalWrite(config::MOTOR_ENABLE_PIN, LOW); // set to HIGH if you want to hold the motor
}

void go_to_limit_B()
{
  // From current possition, move forward until either limit B (center) or limit A (front) is reached
  //If limit A is reached reverse direction and move back to limit B
  digitalWrite(config::MOTOR_ENABLE_PIN, HIGH);
  digitalWrite(config::MOTOR_DIRECTION_PIN, config::motor_forward); 
  delay(5); // Driver setup time
  tone(config::MOTOR_STEP_PIN, 100); // move slowley
  while ((digitalRead(config::LIMIT_SWITCH_B) == HIGH) && (digitalRead(config::LIMIT_SWITCH_A) == HIGH));
  noTone(config::MOTOR_STEP_PIN); 
  if (digitalRead(config::LIMIT_SWITCH_A) == LOW)
  {
    digitalWrite(config::MOTOR_DIRECTION_PIN, config::motor_reverse); 
    delay(5); // Driver setup time
    tone(config::MOTOR_STEP_PIN, 100); // move slowly
    while (digitalRead(config::LIMIT_SWITCH_B) == HIGH);
    noTone(config::MOTOR_STEP_PIN);
  }
  digitalWrite(config::MOTOR_ENABLE_PIN, LOW);
  delay(5);
}

void runTrapezoid(uint16_t period_ms, uint16_t height_hz)
{
    if (period_ms == 0 || height_hz == 0)
    {
        return;
    }

    uint32_t strokeMicros = (period_ms / 2) * 1000UL; // divide the period in half and make microseconds (us)
    uint32_t phaseDuration = strokeMicros / 3; // 1/3 split: Accel, Coast, Decel
    const float startHz = 50.0; // Starting pulse speed
    const float endHz   = 25.0; // Ending pulse speed before stop
    const uint16_t HIGH_TIME_US = 10; // Fixed 10us HIGH pulse width determined by motor controller

    uint32_t elapsedMicros = 0;

    while (elapsedMicros < strokeMicros)
    {
        float currentHz = startHz;

        // Phase 1: Ramp Up (0 to 1/3 stroke duration)
        if (elapsedMicros < phaseDuration)
        {
            float progress = (float)elapsedMicros / phaseDuration;
            currentHz = startHz + (height_hz - startHz) * progress;
        }
        // Phase 2: Coast (1/3 to 2/3 stroke duration)
        else if (elapsedMicros < (phaseDuration * 2))
        {
            currentHz = height_hz;
        }
        // Phase 3: Ramp Down (2/3 to 3/3 stroke duration)
        else
        {
            uint32_t decelElapsed = elapsedMicros - (phaseDuration * 2);
            float progress = (float)decelElapsed / phaseDuration;
            currentHz = height_hz - (height_hz - endHz) * progress;
        }

        // Calculate step period
        uint32_t stepPeriodUs = (uint32_t)(1000000.0 / currentHz);
        
        // Calculate LOW duration
        uint32_t lowTimeUs;
        if (stepPeriodUs > HIGH_TIME_US)
        {
            lowTimeUs = stepPeriodUs - HIGH_TIME_US;
        }
        else
        {
            lowTimeUs = 1;
        }

        // --- Output 10us Step Pulse ---
        digitalWrite(config::MOTOR_STEP_PIN, HIGH);
        delayMicroseconds(HIGH_TIME_US);
        digitalWrite(config::MOTOR_STEP_PIN, LOW);
        delayMicroseconds(lowTimeUs);

        // Track time execution
        elapsedMicros += (HIGH_TIME_US + lowTimeUs);
    }
}

/*
* Generate waves with tank paddle. Computed from
* the given height and period. n waves are created based
* on the system defined run time (see src/config.h) and
* the user defined period.
*/
void generate_wave(uint16_t user_height, uint16_t user_period) 
 {
  if (user_period <= 0) return;
  if (user_height <= 0) return;

  // Convert height to HZ per inch scaled.
  uint16_t height_hz = choose_height_hz(user_height);
  uint16_t period_ms = choose_period_ms(user_period);
  uint32_t estimated_power = compute_power(user_height, user_period);

  // Run time divided by input period in ms.
  long num_waves = (long)(config::LONG_PERIOD_RUN_TIME / period_ms) / 2;

  go_to_limit_C();
  if (period_ms < 1000) 
  {
    go_to_limit_B();
    num_waves = (long)(config::SHORT_PERIOD_RUN_TIME / period_ms) / 2;
  }

  // Generate n waves
  send_message("SOT", "", NAN);
  digitalWrite(config::MOTOR_ENABLE_PIN, HIGH);
  for (int n = 0; n < num_waves; n++)
  {
    //Paddle at the start position (B or C)
  
    //1. Move Forward
    digitalWrite (config::MOTOR_DIRECTION_PIN, config::motor_forward);
    runTrapezoid(period_ms, height_hz);

    // Mechanical settling dwell
    delay(5);

    // 2. Move Reverse 
    digitalWrite (config::MOTOR_DIRECTION_PIN, config::motor_reverse);
    runTrapezoid(period_ms, height_hz);

    // Mechanical settling dwell
    delay(5);
  }

  digitalWrite(config::MOTOR_ENABLE_PIN, LOW);
  send_message("EOT", "", NAN);

  // Return the paddle to "Home"
  go_to_limit_C();
}
