#include <cstddef>
#include "config.h"
#include "paddle.h"


void generate_wave(int user_height, int user_period) {
  // convert height and period to PWM and distance traveled
  // int height_pwm = convert_user_height(user_height);
  // int period_pwm = convert_user_period(user_period);

  // Run time divided by input period in ms.
  int num_waves = (int)config::BASE_RUN_TIME / (user_period * 1000);

  // Generate n waves
  for (size_t n=0; n <= num_waves; n++){

  }
}

int convert_user_height(int user_height) {
  return (int)user_height * config::BASE_HEIGHT_SPEED;
}

int convert_user_period(int user_period) {
  return (int)user_period * config::BASE_RETURN_SPEED;
}