#include <cmath>
#include <sys/_stdint.h>
#include "api/Common.h"
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

void go_to_limit_C(){
  while (digitalRead(config::LIMIT_SWITCH_C) == HIGH) {
    // Direction forward & motor on
    digitalWrite(config::MOTOR_DIRECTION_PIN, LOW);
    delayMicroseconds(5); // Driver setup time
    digitalWrite(config::MOTOR_ENABLE_PIN, HIGH);
    delay(5); // Driver setup time
    tone(config::MOTOR_STEP_PIN, 400);
  }
  noTone(config::MOTOR_STEP_PIN);
  digitalWrite(config::MOTOR_ENABLE_PIN, LOW);
  delay(5);
}

void go_to_limit_B(){
  while (digitalRead(config::LIMIT_SWITCH_B) == HIGH) {
    // Direction backward & motor on
    digitalWrite(config::MOTOR_DIRECTION_PIN, HIGH);
    delayMicroseconds(5); // Driver setup time
    digitalWrite(config::MOTOR_ENABLE_PIN, HIGH);
    delay(5); // Driver setup time
    tone(config::MOTOR_STEP_PIN, 400);
  }
  noTone(config::MOTOR_STEP_PIN);
  digitalWrite(config::MOTOR_ENABLE_PIN, LOW);
  delay(5);

}

/*
* Generate waves with tank paddle. Computed from
* the given height and period. n waves are created based
* on the system defined run time (see src/config.h) and
* the user defined period.
*/
void generate_wave(uint16_t user_height, uint16_t user_period) {

  if (user_height <= 0) return;

  // Convert height to HZ per inch scaled.
  uint16_t height_hz = choose_height_hz(user_height);
  uint16_t period_ms = choose_period_ms(user_period);
  uint32_t estimated_power = compute_power(user_height, user_period);

  // Run time divided by input period in ms.
  long num_waves = (long)(config::BASE_RUN_TIME / period_ms) / 2;

  // Go to start, if short period, go to middle.
  go_to_limit_C();
  if (period_ms < 1000) {
    go_to_limit_B();
  }

  // Generate n waves
  for (int n=0; n < num_waves; n++){
    // Paddle at the start position (A)
    // Direction forward & motor on
    digitalWrite(config::MOTOR_DIRECTION_PIN, HIGH);
    delayMicroseconds(5); // Driver setup time
    digitalWrite(config::MOTOR_ENABLE_PIN, HIGH);
    delay(5); // Driver setup time
    tone(config::MOTOR_STEP_PIN, height_hz);
    delay(period_ms / 2);
    noTone(config::MOTOR_STEP_PIN);
    
    // Go half period and stop
    digitalWrite(config::MOTOR_ENABLE_PIN, LOW);
    delay(5);

    // Return to start
    digitalWrite(config::MOTOR_DIRECTION_PIN, LOW);
    delayMicroseconds(5);
    digitalWrite(config::MOTOR_ENABLE_PIN, HIGH);
    delay(5);
    tone(config::MOTOR_STEP_PIN, height_hz);
    delay(period_ms / 2);
    noTone(config::MOTOR_STEP_PIN);

    digitalWrite(config::MOTOR_ENABLE_PIN, LOW);
    delay(5);

    // TODO: FIGURE OUT SOME KIND OF ACTUAL ENERGY CREATION FEEDBACK
    int variation = random(0, 100);
    send_message("WAVEDATA", "", variation);
  }
  send_message("EOT", "", NAN);
  go_to_limit_C();
}