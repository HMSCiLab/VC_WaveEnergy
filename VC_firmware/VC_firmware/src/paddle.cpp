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

void return_to_start(){
// if (digitalRead(config::LIMIT_SWITCH_A == HIGH)){
  digitalWrite(config::MOTOR_DIRECTION_PIN, LOW);
  delayMicroseconds(5);
  digitalWrite(config::MOTOR_ENABLE_PIN, HIGH);
  delay(5);
  tone(config::MOTOR_STEP_PIN, 100);
  while(config::LIMIT_SWITCH_A == HIGH);
  digitalWrite(config::MOTOR_ENABLE_PIN, LOW);
  // }
}

/*
* Convert the given user height in feet to the number of 
* motor step pulses required to create a scaled version of
* this wave.
*
* User height (ft) is converted to inches. It's then scaled
* based on a configurable speed constant that should produce
* a decided upon consistent wave height. The returned value
* is converted to HZ per inch (Pulses per Revolution / Inches per Revolution)
* scaled by a configurable SCALE value.
*/
int convert_user_height(uint16_t user_height) {
  uint16_t height_scaled = user_height * config::SCALE;
  return height_scaled * config::HZ_PER_MM;
  // uint16_t clamped = constrain(height_scaled, config::MIN_HEIGHT_IN, config::MAX_HEIGHT_IN);
}

/*
* Generate waves with tank paddle. Computed from
* the given height and period. n waves are created based
* on the system defined run time (see src/config.h) and
* the user defined period.
*/
void generate_wave(uint16_t user_height, uint16_t user_period) {
  if (user_period <= 0) return;
  if (user_height <= 0) return;

  // Convert height to HZ per inch scaled.
  uint16_t height_hz = choose_height_hz(user_height);
  uint16_t period_ms = choose_period_ms(user_period);

  // Run time divided by input period in ms.
  long num_waves = (long)(config::BASE_RUN_TIME / period_ms) / 2;

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

  }
  send_message("EOT", "", NAN);
}