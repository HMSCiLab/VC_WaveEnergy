#pragma once

#ifndef HIGH_HEIGHT_VAL
#define HIGH_HEIGHT_VAL 12
#endif

#ifndef LOW_HEIGHT_VAL
#define LOW_HEIGHT_VAL 0
#endif

#ifndef HIGH_PERIOD_VAL
#define HIGH_PERIOD_VAL 16
#endif

#ifndef LOW_PERIOD_VAL
#define LOW_PERIOD_VAL 3
#endif

#ifndef VALID_CHANNEL_VALS
#define VALID_CHANNEL_VALS {"DEBUG", "ERROR", "WAVEDATA", "EOT"}
#endif

constexpr int HIGH_HEIGHT = HIGH_HEIGHT_VAL;
constexpr int LOW_HEIGHT = LOW_HEIGHT_VAL;
constexpr int HIGH_PERIOD = HIGH_PERIOD_VAL;
constexpr int LOW_PERIOD = LOW_PERIOD_VAL;
// const String VALID_CHANNELS[] = {"DEBUG", "ERROR", "WAVEDATA", "EOT"};
// constexpr size_t VALID_CHANNEL_COUNT = sizeof(VALID_CHANNELS) / sizeof(VALID_CHANNELS[0]);