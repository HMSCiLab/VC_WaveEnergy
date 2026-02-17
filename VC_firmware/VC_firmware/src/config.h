#pragma once

// INPUT CLAMPS
#define HIGH_HEIGHT_VAL 12
#define LOW_HEIGHT_VAL 0
#define HIGH_PERIOD_VAL 16
#define LOW_PERIOD_VAL 3


// ERROR CHANNELS
#define FAILED_TO_RUN_CHANNEL "ERROR-FTR"
#define INVALID_INPUT_CHANNEL "ERROR-II"


// CALIBRATION CONSTANTS
/**
* Base height speed represents the PWM (speed of paddle
* movement) required to generate a 1 foot wave. 
*/
#define BASE_HEIGHT_SPEED 20

/**
* Base return speed represents the PWM (speed of paddle
* movement) required to return the paddle to the start
* in order to generate a 3s period for a 1 foot wave.
*/
#define BASE_RETURN_SPEED 10

/**
* Base height represents the PWM (speed of paddle
* movement) required to generate a 1 foot wave. 
*/
#define 


// EXPORT
constexpr int HIGH_HEIGHT = HIGH_HEIGHT_VAL;
constexpr int LOW_HEIGHT = LOW_HEIGHT_VAL;
constexpr int HIGH_PERIOD = HIGH_PERIOD_VAL;
constexpr int LOW_PERIOD = LOW_PERIOD_VAL;
constexpr const char* INVALID_INPUT_ERROR = INVALID_INPUT_CHANNEL;
constexpr const char* FAILED_TO_RUN_ERROR = FAILED_TO_RUN_CHANNEL;