#include <cmath>
#include <sys/_stdint.h>
// #include "api/Common.h"
#include "interface.h"
#include <Arduino.h>
#include "config.h"
#include "paddle.h"
#include "interface.h"

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
    // Direction forward & motor on
    digitalWrite(config::MOTOR_ENABLE_PIN, HIGH);
    digitalWrite(config::MOTOR_DIRECTION_PIN, config::motor_reverse); 
    delay(5); // Driver setup time
    tone(config::MOTOR_STEP_PIN, 100); // move slowly
    while (digitalRead(config::LIMIT_SWITCH_C) == HIGH);
  }
  noTone(config::MOTOR_STEP_PIN);
  digitalWrite(config::MOTOR_ENABLE_PIN, LOW); // set to HIGH if you want to brake
}

void go_to_limit_B()
{
  // Direction backward & motor on
  digitalWrite(config::MOTOR_ENABLE_PIN, HIGH);
  digitalWrite(config::MOTOR_DIRECTION_PIN, config::motor_forward); 
  delay(5); // Driver setup time
  tone(config::MOTOR_STEP_PIN, 100); // move slowley
  //
  while ((digitalRead(config::LIMIT_SWITCH_B) == HIGH) && (digitalRead(config::LIMIT_SWITCH_A) == HIGH));
  noTone(config::MOTOR_STEP_PIN); // leave enable pin HIGH so motor doesn't move
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

/********************************if the carrage hits an end--stop the motor*********************************/
  //attachInterrupt(digitalPinToInterrupt(config::LIMIT_SWITCH_C), handle_limit_C, FALLING);
  //attachInterrupt(digitalPinToInterrupt(config::LIMIT_SWITCH_A), handle_limit_A, FALLING);

  // Generate n waves
  for (int n = 0; n < 8; n++)
  send_message("SOT", "", NAN);
  digitalWrite(config::MOTOR_ENABLE_PIN, HIGH);
  {
    // Paddle at the start position (B or C)
    // Direction forward & motor on
    digitalWrite(config::MOTOR_DIRECTION_PIN, config::motor_reverse);
    delay(5); // Driver setup time
    tone(config::MOTOR_STEP_PIN, height_hz);
    delay(period_ms / 2);
    noTone(config::MOTOR_STEP_PIN);
    
    // Return to start
    digitalWrite(config::MOTOR_DIRECTION_PIN, config::motor_forward);
    delay(5);
    tone(config::MOTOR_STEP_PIN, height_hz);
    delay(period_ms / 2);
    noTone(config::MOTOR_STEP_PIN);

    // TODO: FIGURE OUT SOME KIND OF ACTUAL ENERGY CREATION FEEDBACK
    int variation = random(0, 100);
    send_message("WAVEDATA", "", variation);
  }
  digitalWrite(config::MOTOR_ENABLE_PIN, LOW);
  send_message("EOT", "", NAN);

  /*********************when finished running a set of waves disable the interrupts***********************/
  //detachInterrupt(digitalPinToInterrupt(config::LIMIT_SWITCH_C));
  //detachInterrupt(digitalPinToInterrupt(config::LIMIT_SWITCH_A));
  // Return the paddle to "Home"
  go_to_limit_C();
}

void handle_limit_C() 
{
  noTone(config::MOTOR_STEP_PIN); // Instantly stops hardware pulses in microseconds
}

void handle_limit_A() 
{
  noTone(config::MOTOR_STEP_PIN); // Instantly stops hardware pulses in microseconds
}