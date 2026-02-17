#include <stdlib.h>
#include <string.h>
#include "src/json_handler.h"
#include "src/config.h"
#include "src/interface.h"


void setup() {
  Serial.begin(9600);
  // Initialize motor enable pin, limits or encoder pins, and PWM pin.
}

void loop() {
  int user_height;
  int user_period;
  int check = listener(user_height, user_period);
  if (check) {
    print_ten();    // Demonstration
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