#include "Tone.h"
#include <Arduino.h>
#include "config.h"
#include "paddle.h"


/*
* Convert the given user height in feet to the number of 
* motor step pulses required to create a scaled version of
* this wave.
*
* User height (ft) is converted to inches. It's then scaled
* based on a configurable speed constant that should produce
* a decided upon consistent wave height. The returned value
* is converted to HZ per inch (Pulses per Revolution / Inches per Revolution)
*/
int convert_user_height(int user_height) {
  float height_inches = user_height * 12;
  return (int)(height_inches * config::BASE_HEIGHT_SPEED * config::HZ_PER_INCH);
}

/*
* Generate waves with tank paddle. PWM is computed from
* the given height and period. n waves are created based
* on the system defined run time (see src/config.h) and
* the user defined period.
*/
void generate_wave(int user_height, int user_period) {
  if (user_period <= 0) return;
  // Convert height and period to PWM and distance traveled
  int height_hz = (int)convert_user_height(user_height);

  // Run time divided by input period in ms.
  long num_waves = (long)config::BASE_RUN_TIME / (user_period * 1000);

  // Generate n waves
  for (int n=0; n < num_waves; n++){
    // Paddle at the start position (A)
    // Direction forward & motor on
    digitalWrite(config::MOTOR_DIRECTION_PIN, HIGH);
    digitalWrite(config::MOTOR_ENABLE_PIN, HIGH);
    delayMicroseconds(5); // Driver setup time
    tone(config::MOTOR_STEP_PIN, height_hz);

    // Run to end position (C) and reverse direction
    while(digitalRead(config::LIMIT_SWITCH_C) == LOW);
    noTone(config::MOTOR_STEP_PIN);
    digitalWrite(config::MOTOR_ENABLE_PIN, LOW);
    delay(100);

    // Return to start at return speed
    digitalWrite(config::MOTOR_DIRECTION_PIN, LOW);
    digitalWrite(config::MOTOR_ENABLE_PIN, HIGH);
    delayMicroseconds(5);
    tone(config::MOTOR_STEP_PIN, config::BASE_RETURN_SPEED);
    while(digitalRead(config::LIMIT_SWITCH_A) == LOW);

    noTone(config::MOTOR_STEP_PIN);
    digitalWrite(config::MOTOR_ENABLE_PIN, LOW);
  }
}