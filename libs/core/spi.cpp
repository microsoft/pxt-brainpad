#include "pxt.h"
#include "ErrorNo.h"

namespace pins {
    static codal::SPI *spi = NULL;
    static void initSPI() {
        if (NULL == spi)
            spi = new CODAL_SPI(*LOOKUP_PIN(MOSI), *LOOKUP_PIN(MISO), *LOOKUP_PIN(SCK));
    }

    /**
    * Write to the SPI slave and return the response
    * @param value Data to be sent to the SPI slave
    */
    //%
    int spiWrite(int value) {
        initSPI();
        return spi->write(value);
    }

    /**
    * Writes a given command to SPI bus, and afterwards reads the response.
    */
    //%
    void spiTransfer(Buffer command, Buffer response) {
        initSPI();
        auto cdata = NULL == command ? NULL : command->data;
        auto clength = NULL == command ? 0 : command->length;
        auto rdata = NULL == response ? NULL : response->data;
        auto rlength = NULL == response ? 0 : response->length;
        spi->transfer(cdata, clength, rdata, rlength);
    }

    /**
    * Sets the SPI frequency
    * @param frequency the clock frequency, eg: 1000000
    */
    //%
    void spiFrequency(int frequency) {
        initSPI();
        spi->setFrequency(frequency);
    }

    /**
    * Sets the SPI mode and bits
    * @param mode the mode, eg: 3
    */
    //%
    void spiMode(int mode) {
        initSPI();
        spi->setMode(mode);        
    }
}
