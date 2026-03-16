// A type to allow sharing of the safeSend function between main electron
// process and arduino electron functionality. This needs to be formalized into
// a type safe interface rather than allowing ...args: any[]
export type IpcSender = (channel: string, ...args: any[]) => void;

export type InputClamps = {
    high_height: number,
    high_period: number,
    low_height: number,
    low_period: number
}