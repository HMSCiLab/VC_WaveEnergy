#pragma once
#include <stdint.h>
#include <Arduino.h>

namespace config 
{

  // PADDLE PINS
  constexpr uint8_t MOTOR_ENABLE_PIN =      12;
  constexpr uint8_t MOTOR_DIRECTION_PIN =   7;
  constexpr uint8_t MOTOR_STEP_PIN =        4;
  constexpr uint8_t LIMIT_SWITCH_A =        2; // Front
  constexpr uint8_t LIMIT_SWITCH_B =        6; // Center
  constexpr uint8_t LIMIT_SWITCH_C =        11; // Rear

  // ELECTRICITY METER PINS


  // MOTOR CONSTANTS
    constexpr uint8_t motor_forward = LOW;
    constexpr uint8_t motor_reverse = HIGH;

  /**
  * Valid settings: [200, 400, 800, 1600, 3200, 6400, 12800, 25600]
  * Number of step pulses required for one motor revolution.
  * NOTE: Mechanically defined, do not change without changing
  * settings on the motor controller.
  */
  constexpr float PULSES_PER_REV = 400.0;

  /**
  * millimeters traveled by the lead nut per one revolution
  * of the motor.
  */
  constexpr float MM_PER_REV = 55;

  /**
  * A common constant to describe the number of step pulses required
  * for the lead nut to travel one inch.
  */
  constexpr float HZ_PER_MM = PULSES_PER_REV / MM_PER_REV;

  /**
  * Maximum attainable wave height in inches.
  */
  constexpr float MAX_HEIGHT_IN = 3.8;

  /**
  * Minimum attainable wave height in inches.
  */
  constexpr float MIN_HEIGHT_IN = 0.2;

  /**
  * Paddle velocity (inches/sec) required to return the 
  * paddle to the start in order to generate a 
  * 3s period for a 1 foot wave.
  */
  constexpr int BASE_RETURN_SPEED = 2 * HZ_PER_MM;

  /**
  * Length of time (ms) the paddle will run. This constant
  * is used to calculate how many waves will be created given
  * the input period.
  */
  constexpr int LONG_PERIOD_RUN_TIME = 30000;
  constexpr int SHORT_PERIOD_RUN_TIME = 30000;

  /**
  * Scale as prescribed by capstone group.
  */
  constexpr float SCALE = (float)1 / 10;

  // ERROR CHANNELS
  constexpr const char* FAILED_TO_RUN_ERROR = "ERROR-FTR";
}