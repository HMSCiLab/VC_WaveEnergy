#include "wiring_analog.h"
#include "wiring_constants.h"
#include "wiring_digital.h"
#include "config.h"
#include "paddle.h"


int convert_user_height(int user_height) {
  return (int)user_height * config::BASE_HEIGHT_SPEED;
}

int convert_user_period(int user_period) {
  return (int)user_period * config::BASE_RETURN_SPEED;
}

/*
* Generate waves with tank paddle. PWM is computed from
* the given height and period. n waves are created based
* on the system defined run time (see src/config.h) and
* the user defined period.
*/
void generate_wave(int user_height, int user_period) {
  // convert height and period to PWM and distance traveled
  int height_pwm = convert_user_height(user_height);
  int period_pwm = convert_user_period(user_period);

  // Run time divided by input period in ms.
  int num_waves = (int)config::BASE_RUN_TIME / (user_period * 1000);

  // Generate n waves
  for (int n=0; n <= num_waves; n++){
    // Paddle at the start position (A)
    // set PWM speed so adequate height generated
    analogWrite(config::MOTOR_PWM_PIN, height_pwm);

    // Direction forward & motor on
    digitalWrite(config::MOTOR_DIRECTION_PIN, HIGH);
    digitalWrite(config::MOTOR_ENABLE_PIN, HIGH);

    // Run to middle of tank and reset motor
    while(digitalRead(config::LIMIT_SWITCH_C) != 1);
    digitalWrite(config::MOTOR_ENABLE_PIN, LOW);
    digitalWrite(config::MOTOR_DIRECTION_PIN, LOW);

    // Return to start at return speed
    analogWrite(config::MOTOR_PWM_PIN, period_pwm);    
    digitalWrite(config::MOTOR_ENABLE_PIN, HIGH);
    while(digitalRead(config::LIMIT_SWITCH_A) != 1);
    digitalWrite(config::MOTOR_ENABLE_PIN, LOW);
  }
}

