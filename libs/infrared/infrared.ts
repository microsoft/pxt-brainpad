/**
 * infrared remote
 */
//% color=#0000ff weight=80
//% icon="\uf1eb"
namespace infrared {
  /**
  * initialization
  */
  //% blockId=ir_init
  //% block="connect ir receiver to %pin"
  //% shim=infrared::init
  //% weight=50
  export function init(pin: Pins): void {
    return
  }

  /**
  * read last key
  */ 
  //% shim=infrared::readkey
  export function readkey(pin: Pins): number {
    return 100
  }
  
  /**
  * clear last key
  */
  //% shim=infrared::clearkey
  export function clearkey(pin: Pins): void {
    return
  }
  
  /**
  * button pushed.
  */
  //% blockId=ir_received_event
  //% block="on |%btn| button pressed"
  //% shim=infrared::onPressEvent
  //% weight=49
  export function onPressEvent(btn: RemoteButton, body:Action): void {
    return
  }
  
  
}
