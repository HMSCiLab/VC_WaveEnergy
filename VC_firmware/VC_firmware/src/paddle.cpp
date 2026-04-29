#include "api/Common.h"
#include "interface.h"
#include <Arduino.h>
#include "config.h"
#include "paddle.h"
#include "interface.h"


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
int convert_user_height(float user_height) {
  float height_inches = user_height * 12.0;
  float height_scaled = height_inches * config::SCALE;
  send_message("DEBUG", "height_hz", height_scaled * config::HZ_PER_INCH);
  float clamped = constrain(height_scaled, config::MIN_HEIGHT_IN, config::MAX_HEIGHT_IN);
  return (clamped * config::HZ_PER_INCH);
}

/*
* Generate waves with tank paddle. Computed from
* the given height and period. n waves are created based
* on the system defined run time (see src/config.h) and
* the user defined period.
*/
void generate_wave(float user_height, float user_period) {
  if (user_period <= 0) return;
  return_to_start();

  // Convert height to HZ per inch scaled.
  float height_hz = convert_user_height(user_height);
  float period_ms = user_period * 1000 * config::SCALE;

  // Run time divided by input period in ms.
  long num_waves = (long)config::BASE_RUN_TIME / period_ms;
  send_message("DEBUG", "Number of waves", num_waves);

  // // Generate n waves
  // for (int n=0; n < num_waves; n++){
  //   // Paddle at the start position (A)
  //   // Direction forward & motor on
  //   digitalWrite(config::MOTOR_DIRECTION_PIN, HIGH);
  //   delayMicroseconds(5); // Driver setup time
  //   digitalWrite(config::MOTOR_ENABLE_PIN, HIGH);
  //   delay(5); // Driver setup time
  //   tone(config::MOTOR_STEP_PIN, height_hz);
    
  //   // Go half period and stop
  //   delay(period_ms / 2);
  //   digitalWrite(config::MOTOR_ENABLE_PIN, LOW);
  //   delay(100);

  //   // Return to start
  //   digitalWrite(config::MOTOR_DIRECTION_PIN, LOW);
  //   delayMicroseconds(5);
  //   digitalWrite(config::MOTOR_ENABLE_PIN, HIGH);
  //   delay(5);
  //   tone(config::MOTOR_STEP_PIN, height_hz);
  //   delay(period_ms / 2);

  //   digitalWrite(config::MOTOR_ENABLE_PIN, LOW);
  // }
  // return_to_start();
}