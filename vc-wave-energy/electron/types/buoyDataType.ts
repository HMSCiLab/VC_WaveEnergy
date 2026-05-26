import { z } from "zod";

export type BuoyData = {
    stationID: number;
    ts: Date;
    lat: number;
    long: number;
    height: number;
    period: number;
    wavePower: number;
}

export type BuoyDataParseResult = 
    | {success: true, data: BuoyData, err: null}
    | {success: false, data: null, err: z.ZodError}


const BuoyDataSchema = z
    .object({
        waverider_id: z.coerce.number(),
        source_data_timestamp_utc: z.iso.datetime(),
        latitude: z.coerce.number(),
        longitude: z.coerce.number(),
        significant_wave_height_m: z.coerce.number(),
        mean_period_s: z.coerce.number(),
        wave_power_kw_per_m: z.coerce.number()
    })
    .loose()
    .transform((data): BuoyData => ({
        stationID: data.waverider_id,
        ts: new Date(data.source_data_timestamp_utc),
        lat: data.latitude,
        long: data.longitude,
        height: data.significant_wave_height_m,
        period: data.mean_period_s,
        wavePower: data.wave_power_kw_per_m
    }))

export const normalizeData = (rawData: unknown): BuoyDataParseResult => {
    const parsedData = BuoyDataSchema.safeParse(rawData);

    if (!parsedData.success) {
        console.log("Data parsing error: ", parsedData.error.message)
        return {success: false, data: null, err: parsedData.error}
    }

    return {success: true, data: parsedData.data, err: null};
}