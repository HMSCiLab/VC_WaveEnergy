#define ARDUINOJSON_ENABLE_NAN 1
#include "config.h"
#include "json_handler.h"


jsonMessage::jsonMessage(String channel, String mssg, float data) : 
  channel{channel}, 
  mssg{mssg}, 
  data{data} {
      doc["channel"] = channel;
      doc["mssg"] = mssg;
      doc["data"] = data;
    }


int jsonMessage::channel_check(String channel){
  String valid_channels[] = {"DEBUG", "WAVEDATA", "EOT"};
  int size = sizeof(valid_channels);
  for (int i=0; i < size; i++){
    if (channel == valid_channels[i]) return 1;
  }
  return 0;
}


jsonSender::jsonSender(String channel, String mssg, float data) :
  jsonMessage(channel, mssg, data) {}

int jsonSender::send_json_response() {
  if (channel_check(channel)) {
    serializeJson(doc, Serial); 
    return 1;
    }
  doc["channel"] = config::FAILED_TO_RUN_ERROR;
  doc["mssg"] = "Message channel unknown";
  doc["data"] = NAN;
  
  serializeJson(doc, Serial);
  return 0;
}
