#pragma once
#include <stdint.h>

namespace config {

  // PADDLE PINS
  constexpr uint8_t MOTOR_ENABLE_PIN =      1;
  constexpr uint8_t MOTOR_DIRECTION_PIN =   1;
  constexpr uint8_t MOTOR_PWM_PIN =         1;
  constexpr uint8_t LIMIT_SWITCH_A =        1;
  constexpr uint8_t LIMIT_SWITCH_B =        1;
  constexpr uint8_t LIMIT_SWITCH_C =        1;
  constexpr uint8_t LIMIT_SWITCH_D =        1;


  // ELECTRICITY METER PINS
  // ?????????
  // ?????????
  // ?????????


  // CALIBRATION CONSTANTS
  /**
  * Base height speed represents the PWM (speed of paddle
  * movement) required to generate a 1 foot wave. 
  */
  constexpr int BASE_HEIGHT_SPEED = 20;

  /**
  * Base return speed represents the PWM (speed of paddle
  * movement) required to return the paddle to the start
  * in order to generate a 3s period for a 1 foot wave.
  */
  constexpr int BASE_RETURN_SPEED = 10;

  /**
  * Length of time (ms) the paddle will run. This constant
  * is used to calculate how many waves will be created given
  * the input period.
  */
  constexpr int BASE_RUN_TIME =   30000;

  // // INPUT CLAMPS
  constexpr int HIGH_HEIGHT =     12;
  constexpr int LOW_HEIGHT =      0;
  constexpr int HIGH_PERIOD =     16;
  constexpr int LOW_PERIOD =      3;


  // ERROR CHANNELS
  constexpr const char* FAILED_TO_RUN_ERROR = "ERROR-FTR";
  constexpr const char* INVALID_INPUT_ERROR = "ERROR-II";
}