#ifndef MMA8453_H
#define MMA8453_H

#include "CodalConfig.h"
#include "CodalComponent.h"
#include "CodalUtil.h"
#include "CoordinateSystem.h"
#include "Pin.h"
#include "I2C.h"
#include "Accelerometer.h"

/**
  * Status flags
  */
#define ACCELEROMETER_IMU_DATA_VALID           0x02

/**
  * I2C constants
  */
#define MMA8453_DEFAULT_ADDR    0x38

/**
  * LIS3DH Register map (partial)
  */
#define STATUS_REG      0x27
#define STATUS_REG_AUX  0x07
#define OUT_X_MSB       0x01
#define OUT_X_LSB       0x02
#define OUT_Y_MSB       0x03
#define OUT_Y_LSB       0x04
#define OUT_Z_MSB       0x05
#define OUT_Z_LSB       0x06
#define WHOAMI          0x0D

#define CTRL_REG1       0x2A
#define CTRL_REG2       0x2B
#define CTRL_REG3       0x2C
#define CTRL_REG4       0x2D
#define CTRL_REG5       0x2E

#define FIFO_CTRL_REG   0x2E
#define FIFO_SRC_REG    0x2F
#define INT1_CFG        0x30
#define INT1_SRC        0x31
#define INT1_THS        0x32
#define INT1_DURATION   0x33
#define INT2_CFG        0x34
#define INT2_SRC        0x35
#define INT2_THS        0x36
#define INT2_DURATION   0x37

/**
  * MMA8653 constants
  */
#define MMA8453_WHOAMI_VAL      0x0D

namespace codal
{
    /**
     * Class definition for Accelerometer.
     *
     * Represents an implementation of the Freescale MMA8653 3 axis accelerometer
     * Also includes basic data caching and on demand activation.
     */
    class MMA8453 : public Accelerometer
    {
        I2C&            i2c;                // The I2C interface to use.
        Pin             &int1;              // Data ready interrupt.
        uint16_t        address;            // I2C address of this accelerometer.
        uint16_t        samplePeriod;       // The time between samples, in milliseconds.
        uint8_t         sampleRange;        // The sample range of the accelerometer in g.
        Sample3D        sample;             // The last sample read.

        public:

        /**
          * Constructor.
          * Create a software abstraction of an accelerometer.
          *
          * @param _i2c an instance of I2C used to communicate with the onboard accelerometer.
          *
          * @param address the default I2C address of the accelerometer. Defaults to: MMA8653_DEFAULT_ADDR.
          *
          * @param id the unique EventModel id of this component. Defaults to: DEVICE_ID_ACCELEROMETER
          *
          * @param coordinateSystem the orientation of the sensor. Defaults to: SIMPLE_CARTESIAN
          *
          * @code
          * I2C i2c = I2C(I2C_SDA0, I2C_SCL0);
          *
          * Accelerometer accelerometer = Accelerometer(i2c);
          * @endcode
         */
        MMA8453(I2C &_i2c, Pin &_int1, CoordinateSpace &coordinateSpace, uint16_t address = MMA8453_DEFAULT_ADDR,  uint16_t id = DEVICE_ID_ACCELEROMETER);

        /**
          * Attempts to set the sample rate of the accelerometer to the specified value (in ms).
          *
          * @param period the requested time between samples, in milliseconds.
          *
          * @return DEVICE_OK on success, DEVICE_I2C_ERROR is the request fails.
          *
          * @code
          * // sample rate is now 20 ms.
          * accelerometer.setPeriod(20);
          * @endcode
          *
          * @note The requested rate may not be possible on the hardware. In this case, the
          * nearest lower rate is chosen.
          */
        int setPeriod(int period);

        /**
          * Reads the currently configured sample rate of the accelerometer.
          *
          * @return The time between samples, in milliseconds.
          */
        virtual int getPeriod();

        /**
          * Attempts to set the sample range of the accelerometer to the specified value (in g).
          *
          * @param range The requested sample range of samples, in g.
          *
          * @return DEVICE_OK on success, DEVICE_I2C_ERROR is the request fails.
          *
          * @code
          * // the sample range of the accelerometer is now 8G.
          * accelerometer.setRange(8);
          * @endcode
          *
          * @note The requested range may not be possible on the hardware. In this case, the
          * nearest lower range is chosen.
          */
        int setRange(int range);

        /**
          * Reads the currently configured sample range of the accelerometer.
          *
          * @return The sample range, in g.
          */
        virtual int getRange();

        /**
          * Attempts to read the 8 bit ID from the accelerometer, this can be used for
          * validation purposes.
          *
          * @return the 8 bit ID returned by the accelerometer, or DEVICE_I2C_ERROR if the request fails.
          *
          * @code
          * accelerometer.whoAmI();
          * @endcode
          */
        int whoAmI();

        /**
          * Reads the accelerometer data from the latest update retrieved from the accelerometer.
          * Data is provided in ENU format, relative to the device package (and makes no attempt
          * to align axes to the device).
          *
          * @return The force measured in each axis, in milli-g.
          *
          */
        Sample3D getSample();

        /**
          * A periodic callback invoked by the fiber scheduler idle thread.
          *
          * Internally calls updateSample().
          */
        virtual void idleCallback();

        /**
          * Configures the accelerometer for G range and sample rate defined
          * in this object. The nearest values are chosen to those defined
          * that are supported by the hardware. The instance variables are then
          * updated to reflect reality.
          *
          * @return DEVICE_OK on success, DEVICE_I2C_ERROR if the accelerometer could not be configured.
          */
        int configure();

        /**
          * Reads the acceleration data from the accelerometer, and stores it in our buffer.
          * This only happens if the accelerometer indicates that it has new data via int1.
          *
          * On first use, this member function will attempt to add this component to the
          * list of fiber components in order to constantly update the values stored
          * by this object.
          *
          * This technique is called lazy instantiation, and it means that we do not
          * obtain the overhead from non-chalantly adding this component to fiber components.
          *
          * @return DEVICE_OK on success, DEVICE_I2C_ERROR if the read request fails.
          */
        int updateSample();

        /**
         * Poll to see if new data is available from the hardware. If so, update it.
         * n.b. it is not necessary to explicitly call this funciton to update data
         * (it normally happens in the background when the scheduler is idle), but a check is performed
         * if the user explicitly requests up to date data.
         *
         * @return DEVICE_OK on success, DEVICE_I2C_ERROR if the update fails.
         *
         * @note This method should be overidden by the hardware driver to implement the requested
         * changes in hardware.
         */
        virtual int requestUpdate();

        /**
          * Destructor.
          */
        ~MMA8453();
    };
}

#endif