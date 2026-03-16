import { z } from "zod";

export type buoyData = {
    ts: Date;
    lat: number;
    long: number;
    height: number;
    period: number;
    stationID?: number | null;
}

export const buoyDataZ = z.object({
    timestamp: z.iso.datetime(),
    latitude: z.number(),
    longitude: z.number(),
    significant_wave_height: z.number(),
    mean_period: z.number(),
    // stationID: z.nullable(z.number())
    stationID: z.number().nullable().optional()
}).transform((d) => ({
  ts: new Date(d.timestamp),
  lat: d.latitude,
  long: d.longitude,
  height: d.significant_wave_height,
  period: d.mean_period,
//   stationID: d.stationID
}));