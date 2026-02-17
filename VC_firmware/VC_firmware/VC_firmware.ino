#include <stdlib.h>
#include <string.h>
#include "src/json_handler.cpp"
#include "src/config.h"


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
* @brief Send ten random values [1-100] over serial. EOT escape character
* signal end of wave transmission.
*/
void print_ten() {
    for (size_t i=0; i < 10; i++){
      send_message("WAVEDATA", "", random(100));
      delay(1000);
    }
    send_message("EOT", "", NAN);
}

/**
* Receive communication over serial. Communication must end in '/n'
* otherwise the function will hang.
* 
* TODO: Add error handling.
*/
String get_input() {
    String cmmd = Serial.readStringUntil('\n');
    send_message("DEBUG", "get_input", NAN);
    cmmd.trim();
    return cmmd;
}

/**
* Check Serial for communication.
*/
int listener(int &user_height, int &user_period) {
  if (Serial.available()){
    String input = get_input();
    return validator(user_height, user_period, input);
    }
  return 0;
}

/**
* Validates incoming communication. Properties of the wave to
* be created are expected in JSON.
* 
* {
*   "userHeight" : "3",
*   "userPeriod" : "12"
*  }
*
*/
int validator(int &user_height, int &user_period, String &input) {
  JsonDocument json_req;
  DeserializationError err = deserializeJson(json_req, input);
  if (err) {
    send_message(FAILED_TO_RUN_ERROR, "Failed to deserialize", NAN);
    return 0;
  }

  user_height = json_req["height"];
  user_period = json_req["period"];
  send_message("DEBUG", "user_height", user_height);

  if (std::isnan(user_height) || isnan(user_period)) {
    send_message(INVALID_INPUT_ERROR, "Invalid user input", NAN);
  }

  int height_check = check_height(user_height);
  int period_check = check_period(user_period);

  int total_check = height_check && period_check;
  if (!total_check) send_message(INVALID_INPUT_ERROR, "Invalid user input", NAN);
  return total_check;
}

int check_height(int &num){
  return num > LOW_HEIGHT && num < HIGH_HEIGHT;
}

int check_period(int &num){
  return num > LOW_PERIOD && num < HIGH_PERIOD;
}

void send_message(String channel, String mssg, float data) {
  jsonSender message(channel, mssg, data);
  message.send_json_response();
}

