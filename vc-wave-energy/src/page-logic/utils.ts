import { InputClamps } from "../../electron/types/ipc";
import config from "../../config/arduino.config.json"
export const inputValidation = (
    waveProperties: {height: number, period: number}
): boolean => {
    const inputClamps: InputClamps = config.input_clamps

    const heightCheck: boolean = 
        inputClamps.low_height < waveProperties.height 
        && waveProperties.height < inputClamps.high_height;

    const periodCheck: boolean = 
        inputClamps.low_period < waveProperties.period 
        && waveProperties.period < inputClamps.high_period;

    return heightCheck && periodCheck
}