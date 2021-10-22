#ifndef __PXT_PLATFORM_H
#define __PXT_PLATFORM_H

#include "Image.h"
#include "MbedTimer.h"
#include "MbedI2C.h"
#include "MbedPin.h"
#include "MbedSPI.h"
#include "MultiButton.h"
#include "BrainPadPin.h"

//#include "SAMD21DMAC.h"

using namespace codal;

#define PAGE_SIZE 256 // doesn't really apply

// 3 ports times 16 pins in each; there are bigger packages with 4 or 5 ports
#define DEV_NUM_PINS 48

// Table 8 in STM32F401xE Product Spec.
// PA0-3 PA5-12 PA15 PB0-1 PB10 PB12-15 PC6-9
#define DEV_PWM_PINS 0x03c0f4039fefULL
// PA0-7 PB0-1 PC0-5
#define DEV_AIN_PINS 0x001f000300ffULL

// Codal doesn't yet distinguish between PWM and AIN
#define DEV_ANALOG_PINS (DEV_PWM_PINS | DEV_AIN_PINS)

//#define PlatformDMAC SAMD21DMAC

#define CODAL_MBED codal::_mbed
#define CODAL_SPI codal::MbedSPI
#define CODAL_PIN codal::BrainPadPin
#define CODAL_ACCELEROMETER_HEADER "MC3216.h"
#define CODAL_ACCELEROMETER codal::MC3216

#define IMAGE_BITS 1
#define LCD_WIDTH 128
#define LCD_HEIGHT 64

// #define TEMPERATURE_NOMINAL_VALUE 25
// #define TEMPERATURE_NOMINAL_READING 10000
// #define TEMPERATURE_SERIES_RESISTOR 10000
// #define TEMPERATURE_ZERO_OFFSET 273.5

#define CODAL_LIGHT_SENSOR_HEADER "BrainPadLightSensor.h"
#define CODAL_LIGHT_SENSOR codal::BrainPadLightSensor
#define LIGHTSENSOR_SENSITIVITY 868 // codal has 912 now
#define LIGHTSENSOR_LOW_THRESHOLD 128
#define LIGHTSENSOR_HIGH_THRESHOLD 896

#define target_wait_us wait_us

#ifdef JUST_FOR_DAL_D_TS_CPP_WILL_IGNORE
#define PA_0 0x00
#define PA_1 0x01
#define PA_2 0x02
#define PA_3 0x03
#define PA_4 0x04
#define PA_5 0x05
#define PA_6 0x06
#define PA_7 0x07
#define PA_8 0x08
#define PA_9 0x09
#define PA_10 0x0A
#define PA_11 0x0B
#define PA_12 0x0C
#define PA_13 0x0D
#define PA_14 0x0E
#define PA_15 0x0F
#define PB_0 0x10
#define PB_1 0x11
#define PB_2 0x12
#define PB_3 0x13
#define PB_4 0x14
#define PB_5 0x15
#define PB_6 0x16
#define PB_7 0x17
#define PB_8 0x18
#define PB_9 0x19
#define PB_10 0x1A
#define PB_12 0x1C
#define PB_13 0x1D
#define PB_14 0x1E
#define PB_15 0x1F
#define PC_0 0x20
#define PC_1 0x21
#define PC_2 0x22
#define PC_3 0x23
#define PC_4 0x24
#define PC_5 0x25
#define PC_6 0x26
#define PC_7 0x27
#define PC_8 0x28
#define PC_9 0x29
#define PC_10 0x2A
#define PC_11 0x2B
#define PC_12 0x2C
#define PC_13 0x2D
#define PC_14 0x2E
#define PC_15 0x2F
#define PD_2 0x32
#define PH_0 0x70
#define PH_1 0x71
#endif

typedef uint32_t ImageLiteral_;

static inline ImageData *imageBytes(ImageLiteral_ lit) {
    return (ImageData *)lit;
}


namespace pxt {
	bool IsPulse();
}

#endif
