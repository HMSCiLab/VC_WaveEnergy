#include <stdlib.h>

void setup() {
  Serial.begin(9600);
}

void loop() {
  if (Serial.available()){
    String cmmd = Serial.readStringUntil('\n');
    cmmd.trim();

    for (size_t i=0; i < 10; i++){
      Serial.println(random(100));
      delay(500);
    }
  }
}
