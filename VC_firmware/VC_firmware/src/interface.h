#pragma once

#include <Arduino.h>
#include "json_handler.h"
#include <Arduino.h>
#include "config.h"

void send_message(String channel, String mssg, float data);
int validator(int &user_height, int &user_period, String &input);
int check_height(int &num);
int check_period(int &num);
String get_input();
int listener(int &user_height, int &user_period);