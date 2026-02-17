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
  pinMode(config::MOTOR_PWM_PIN, OUTPUT);
  analogWrite(config::MOTOR_PWM_PIN, 0);

  // LIMIT SWITCHES
  pinMode(config::LIMIT_SWITCH_A, INPUT);
  pinMode(config::LIMIT_SWITCH_B, INPUT);
  pinMode(config::LIMIT_SWITCH_C, INPUT);
  pinMode(config::LIMIT_SWITCH_D, INPUT);
}

void loop() {
  int user_height;
  int user_period;
  int check = listener(user_height, user_period);
  if (check) {
    print_ten();    // Demonstration
    // generate_wave(user_height, user_period);   // Real life
  }
}

/**
* @brief Send ten random values [1-100] over serial. EOT
* signals end of wave transmission.
*/
void print_ten() {
    for (size_t i=0; i < 10; i++){
      send_message("WAVEDATA", "", random(100));
      delay(1000);
    }
    send_message("EOT", "", NAN);
}