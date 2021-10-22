/// <reference no-default-lib="true"/>

/**
 * Reading and writing data to the console output.
 */
namespace console {
    type Listener = (text: string) => void;

    //% whenUsed
    const listeners: Listener[] = [function(text: string) { control.__log(text); }];

    /**
     * Write a line of text to the console output.
     * @param value to send
     */
    //%
    export function log(text: string): void {
        // pad text on the 32byte boundar
        text += "\r\n";
        // send to listeners
        for (let i = 0; i < listeners.length; ++i)
            listeners[i](text);
    }

    /**
     * Write a name:value pair as a line of text to the console output.
     * @param name name of the value stream, eg: "x"
     * @param value to write
     */
    //%
    export function logValue(name: string, value: number): void {
        log(name ? `${name}: ${value}` : `${value}`)
    }

    /**
     * Adds a listener for the log messages
     * @param listener
     */
    //%
    export function addListener(listener: (text: string) => void) {
        if (!listener) return;
        listeners.push(listener);
    }
}