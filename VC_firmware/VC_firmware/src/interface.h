#pragma once

#include <Arduino.h>
#include "json_handler.h"
#include <Arduino.h>
#include "config.h"

void send_message(String channel, String mssg, float data);
int validator(float &user_height, float &user_period, String &input);
int check_height(float &num);
int check_period(float &num);
String get_input();
int listener(float &user_height, float &user_period);