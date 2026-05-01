#pragma once

#include <Arduino.h>
#include "json_handler.h"
#include <Arduino.h>
#include "config.h"

void send_message(String channel, String mssg, float data);
int validator(uint16_t &user_height, uint16_t &user_period, String &input);
int check_height(uint16_t &num);
int check_period(uint16_t &num);
String get_input();
int listener(uint16_t &user_height, uint16_t &user_period);