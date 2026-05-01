#include <stdlib.h>
#include <string.h>
#include "src/json_handler.h"
#include "src/config.h"
#include "src/interface.h"
#include "src/paddle.h"


void setup() {
  Serial.begin(9600);
  
  // PADDLE PWM/ENABLE/DIRECTION
  pinMode(config::MOTOR_DIRECTION_PIN, OUTPUT);
  pinMode(config::MOTOR_ENABLE_PIN, OUTPUT);
  digitalWrite(config::MOTOR_ENABLE_PIN, LOW);
  pinMode(config::MOTOR_STEP_PIN, OUTPUT);
  analogWrite(config::MOTOR_STEP_PIN, 0);

  // LIMIT SWITCHES
  pinMode(config::LIMIT_SWITCH_A, INPUT);
  pinMode(config::LIMIT_SWITCH_B, INPUT);
  pinMode(config::LIMIT_SWITCH_C, INPUT);
}

void loop() {
  uint16_t user_height;
  uint16_t user_period;
  int check = listener(user_height, user_period);
  if (check) {
    generate_wave(user_height, user_period);   // Real life
  }
}