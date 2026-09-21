export type IpcSender = (channel: string, ...args: unknown[]) => void;

export type InputClamps = {
    high_height: number,
    high_period: number,
    low_height: number,
    low_period: number
}