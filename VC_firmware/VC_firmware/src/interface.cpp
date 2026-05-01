#include <sys/_stdint.h>
#include "interface.h"

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
int listener(uint16_t &user_height, uint16_t &user_period) {
  if (Serial.available()){
    String input = get_input();
    return validator(user_height, user_period, input);
    }
  return 0;
}

void send_message(String channel, String mssg, float data) {
  jsonSender message(channel, mssg, data);
  message.send_json_response();
}

/**
* Validates incoming communication. Properties of the wave to
* be created are expected in JSON.
* 
* {
*   "height" : "3",
*   "period" : "12"
*  }
*
*/
int validator(uint16_t &user_height, uint16_t &user_period, String &input) {
  JsonDocument json_req;
  DeserializationError err = deserializeJson(json_req, input);
  if (err) {
    send_message(config::FAILED_TO_RUN_ERROR, "Failed to deserialize", NAN);
    return 0;
  }

  user_height = json_req["height"];
  user_period = json_req["period"];
  return 1;
}