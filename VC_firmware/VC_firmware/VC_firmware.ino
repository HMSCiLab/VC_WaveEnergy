#include <stdlib.h>
#include <string.h>
#include <ArduinoJson.h>

void setup() {
  Serial.begin(9600);

  // Initialize motor enable pin, limits or encoder pins, and PWM pin.
}

void loop() {
  String input;
  listener(input);
  // if (input.length() != 0 && validator(input) == 0) {
  if (input.length() != 0) {
    print_ten();    // Demonstration


  }
}


/**
* @brief Send ten random values [1-100] over serial. EOT escape character
* signal end of wave transmission.
*/
void print_ten() {
    for (size_t i=0; i < 10; i++){
      Serial.println(random(100));
      delay(1000);
    }
    Serial.println("Wave complete");
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
void listener(String &input) {
  if (Serial.available()){
    input = get_input();
    Serial.println("Receiving input");
    Serial.print("Input = ");
    Serial.println(input);
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











