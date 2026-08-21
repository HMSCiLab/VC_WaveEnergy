#pragma once
#include <ArduinoJson.h>
#include <Arduino.h>

class jsonMessage {
  public:
    String channel = "DEBUG";
    String mssg = "";
    float data = NAN;
    JsonDocument doc;

    jsonMessage(String channel, String mssg, float data);
    int channel_check(String channel);

};

class jsonSender: public jsonMessage {
  public:   
    /***
    * Create a sendable json message.
    * jsonSender(channel, message, data)
    * valid channels: {"DEBUG", "WAVEDATA", "EOT"}
    */
    jsonSender(String channel, String mssg, float data);
    int send_json_response();

};