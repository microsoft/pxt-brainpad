# i2c Write Number

Write a number to an address on the I2C bus.

```sig
pins.i2cWriteNumber(0, NumberFormat.Int8LE, false)
```

If your board has pins that say **SDA** and **SCL**, then you can write numbers to
other chips that are not on your board. The **SDA** and **SCL** pins connect to other chips
([ICs](https://wikipedia.org/wiki/Integrated_circuit)) that also have these same pins. This connection
is called [**I2C**](https://wikipedia.org/wiki/I2C). It only needs two wires to read or write
a number. As you can guess, one wire is for **SDA** and the other is for **SCL**.

The wires, and the signals that go through them, together are called a _bus_. An I2C connection is
an _I2C bus_.

You might know that storing a number in electronics takes several bits of digital information that exist
all at one time (a combination of many high and low voltages inside a chip). Since the I2C
bus has only two wires, a number moves through one of the wires just one bit at a time. The
bits of the number are short pulses of high and low voltage on the **SDA** wire. The **SCL**
wire lets one chip tell another chip when the next bit of the number is on the **SDA** wire.

### Addresses

To keep things simple, the I2C bus lets many chips connect to the same wires. Nice, because
it could get messy if each chip couldn't share the same wires. This is like pretending the
chips are houses on a street. The street is the bus connected to the chips, the houses. We know that
a house on a street usually has an address. Same thing with chips on a bus. Without an address,
a number would move on the bus but the chips waiting for input wouldn't know who's
supposed to receive it.

The chips on your bus can have address numbers that are between `8` and `123`. Make
sure that all of the chips are using a different number so they respond to their own address.

## Parameters

* **address**: a [number](types/number) between `8` and `123` that is the address of a chip on the I2C bus.
* **value**: a [number](types/number) a number to write to the I2C bus. It's size (number of bytes) depends
on what you say in **format**.
* **format**: the type of number you will write to the bus, like: `Int8LE`.
* **repeated**: a [boolean](/types/boolean) value, `true` or `false`, to say if you want to read
again right away.
>This is usually `false` if you wait for a while before reading from, or writing to, the bus again.


## Example #example

Connect a 12-bit digital-to-analog converter (DAC) on a breadboard to the **SDA** and **SCL** pins on your
board. Set your DAC to respond to address `99`. Write numbers to the DAC to have it make a sawtooth wave
about every second.

```blocks
let i = 0
forever(() => {
    i = 0
    while (i <= 4095) {
        pins.i2cWriteNumber(98, i, NumberFormat.UInt16LE, false)
        pause(6)
        if (i > 0) {
            i += 256
        } else {
            i += 255
        }
    }
})
```

## See also #seealso

[i2c read number](/reference/pins/i2c-read-number)