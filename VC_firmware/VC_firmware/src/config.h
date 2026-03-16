#pragma once
#include <stdint.h>

namespace config {

  // PADDLE PINS
  constexpr uint8_t MOTOR_ENABLE_PIN =      1;
  constexpr uint8_t MOTOR_DIRECTION_PIN =   1;
  constexpr uint8_t MOTOR_STEP_PIN =        1;
  constexpr uint8_t LIMIT_SWITCH_A =        1;
  constexpr uint8_t LIMIT_SWITCH_B =        1;
  constexpr uint8_t LIMIT_SWITCH_C =        1;

  // ELECTRICITY METER PINS


  // MOTOR CONSTANTS
  /**
  * Valid settings: [50,100,150,200,250,300,400,500]
  * Number of step pulses required for one motor revolution.
  * NOTE: Mechanically defined, do not change without changing
  * settings on the physical motor.
  */
  constexpr int PULSES_PER_REV = 200;

  /**
  * Inches traveled by the lead nut per one revolution
  * of the motor.
  */
  constexpr float INCHES_PER_REV = 1.0;

  /**
  * A common constant to describe the number of step pulses required
  * for the lead nut to travel one inch.
  */
  constexpr float HZ_PER_INCH = PULSES_PER_REV / INCHES_PER_REV;

  /**
  * Paddle forward velocity (inches/sec) required
  * to generate a 1-foot wave.
  */
  constexpr int BASE_HEIGHT_SPEED = 2;

  /**
  * Paddle velocity (inches/sec) required to return the 
  * paddle to the start in order to generate a 
  * 3s period for a 1 foot wave.
  */
  constexpr int BASE_RETURN_SPEED = 2 * HZ_PER_INCH;

  /**
  * Length of time (ms) the paddle will run. This constant
  * is used to calculate how many waves will be created given
  * the input period.
  */
  constexpr int BASE_RUN_TIME =   30000;

  // ERROR CHANNELS
  constexpr const char* FAILED_TO_RUN_ERROR = "ERROR-FTR";
}