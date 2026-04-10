import { InputClamps } from "../../electron/types/ipc";
import config from "../../config/arduino.config.json"

export const inputValidation = (
    waveProperties: {height: number, period: number}
): boolean => {

    const inputClamps: InputClamps = config.input_clamps;

    const heightCheck: boolean = 
        inputClamps.low_height <= waveProperties.height 
        && waveProperties.height <= inputClamps.high_height;

    const periodCheck: boolean = 
        inputClamps.low_period <= waveProperties.period 
        && waveProperties.period <= inputClamps.high_period;

    return heightCheck && periodCheck;
}

export const clampInput = (waveProperties: {height: number, period: number}) => {
    const inputClamps = config.input_clamps;
    return {
        /**
         * Take the prop if it's bigger than the low clamp, then compare to high
         * clamp - bigger? take the high clamp else take the prop.
         */
        height: Math.min(
            inputClamps.high_height,
            Math.max(inputClamps.low_height, waveProperties.height)
        ),
        period: Math.min(
            inputClamps.high_period,
            Math.max(inputClamps.low_period, waveProperties.period)
        )
    }
}