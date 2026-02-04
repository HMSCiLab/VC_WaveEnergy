#define ARDUINOJSON_ENABLE_NAN 1
#include <stdlib.h>
#include <string.h>
#include <ArduinoJson.h>

void setup() {
  Serial.begin(9600);

  // Initialize motor enable pin, limits or encoder pins, and PWM pin.
}

void loop() {
  int go = 0;
  JsonDocument json_req;
  listener(json_req, go);
  if (go == 1) {
    print_ten();    // Demonstration
    go = 0;

  }
}


/**
* @brief Send ten random values [1-100] over serial. EOT escape character
* signal end of wave transmission.
*/
void print_ten() {
    for (size_t i=0; i < 10; i++){
      send_json_response("WAVEDATA", random(100));
      delay(1000);
    }
    send_json_response("EOT", NAN);
}

/**
* Receive communication over serial. Communication must end in '/n'
* otherwise the function will hang.
* 
* TODO: Add error handling.
*/
String get_input() {
    String cmmd = Serial.readStringUntil('\n');
    cmmd.trim();
    return cmmd;
}

/**
* Check Serial for communication, stores what it finds in the
* @param input
*/
void listener(JsonDocument &json_req, int &go) {
  if (Serial.available()){
    String input = get_input();
    // JsonDocument json_req;
    DeserializationError err = deserializeJson(json_req, input);
    if (err) {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(err.f_str());
    }

    const int user_height = json_req["height"];
    const int user_period = json_req["period"];

    send_json_response("DEBUG", user_height);
    send_json_response("DEBUG", user_period);

    go = 1;
  }
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
int validator(String input) {
  const String comparison = "hello";
  return input.compareTo(comparison);
}

void send_json_response(String mssg, float data) {
  JsonDocument resp;
  resp["mssg"] = mssg;
  resp["data"] = data;
  serializeJson(resp, Serial); 
}











