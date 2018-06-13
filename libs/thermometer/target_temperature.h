#include "BrainPadTemperatureSensor.h"

namespace pxt {

class WTemp {
  public:
    codal::BrainPadTemperatureSensor sensor;
    WTemp()
        : sensor(*LOOKUP_PIN(TEMPERATURE), DEVICE_ID_THERMOMETER)
    {
        sensor.init();
    }
};

}

