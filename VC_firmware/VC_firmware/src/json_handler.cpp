#include "config.h"
#define ARDUINOJSON_ENABLE_NAN 1
#include <ArduinoJson.h>
#include <Arduino.h>


class jsonMessage {
  public:
    String channel = "DEBUG";
    String mssg = "";
    float data = NAN;
    JsonDocument doc;

  public:
    jsonMessage(String channel, String mssg, float data) : 
      channel{channel}, 
      mssg{mssg}, 
      data{data} {
          doc["channel"] = channel;
          doc["mssg"] = mssg;
          doc["data"] = data;
        }

  public:
    int channel_check(String channel){
      String valid_channels[] = {"DEBUG", "WAVEDATA", "EOT"};
      int size = sizeof(valid_channels);
      for (int i=0; i < size; i++){
        if (channel == valid_channels[i]) return 1;
      }
      return 0;
    }
};

class jsonSender: public jsonMessage {
  public:   
    /***
    * Create a sendable json message.
    * jsonSender(channel, message, data)
    * valid channels: {"DEBUG", "WAVEDATA", "EOT"}
    */
    jsonSender(String channel, String mssg, float data) :
      jsonMessage(channel, mssg, data) {}

    int send_json_response() {
      if (channel_check(channel)) {
        serializeJson(doc, Serial); 
        return 1;
        }
      doc["channel"] = "ERROR";
      doc["mssg"] = "Failed channel check";
      doc["data"] = NAN;
      serializeJson(doc, Serial);
      return 0;
    }
};
