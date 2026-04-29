#pragma once
#include <Arduino.h>
#include <cstddef>
#include "interface.h"
#include "config.h"

void generate_wave(float user_height, float user_period);
void return_to_start();