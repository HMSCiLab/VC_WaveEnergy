import { describe, expect, it, vi } from "vitest";
import { normalizeData } from "../electron/types/buoyDataType";
import { chooseDoodad, computeEnergy } from "../src/page-logic/waveInfoLogic";
import { clampInput, convertToMM } from "../src/page-logic/utils";

describe("wave input logic", () => {
  it("clamps height and period to configured limits", () => {
    expect(clampInput({ height: 0, period: 20 })).toEqual({
      height: 1,
      period: 14,
    });
    expect(clampInput({ height: 6, period: 9 })).toEqual({
      height: 6,
      period: 9,
    });
  });

  it("converts feet to millimeters rounded up to the nearest ten", () => {
    expect(convertToMM({ height: 4, period: 6 })).toBe(1220);
    expect(convertToMM({ height: 12, period: 10 })).toBe(3660);
  });
});

describe("energy logic", () => {
  it("calculates energy and produces bounded animation values", () => {
    vi.spyOn(Math, "random").mockReturnValue(0.5);

    const result = computeEnergy(12, 10);

    expect(result.instantaneousKW).toBeCloseTo(105.84);
    expect(result.kilowattHours).toBeCloseTo(105.84);
    expect(result.animationNums).toHaveLength(11);
    expect(result.animationNums.every((value) => value === 105.84)).toBe(true);

    vi.restoreAllMocks();
  });

  it.each([
    [15, "cellphones"],
    [30, "loads in a dishwasher"],
    [60, "cycles of a clothes dryer"],
    [90, "days"],
    [120, "hours of air conditioning"],
    [150, "days"],
  ])("maps the %s threshold to %s", (value, object) => {
    expect(chooseDoodad(value).doodadObject).toBe(object);
  });

  it("uses the fallback doodad outside the configured range", () => {
    expect(chooseDoodad(151)).toEqual({
      doodadPrefix: "to complete",
      doodadObject: "loads in a dishwasher",
      doodadNum: 9,
    });
  });
});

describe("PacWave normalization", () => {
  it("normalizes the remote buoy schema into app data", () => {
    const result = normalizeData({
      waverider_id: "277",
      source_data_timestamp_utc: "2026-09-21T17:00:00.000Z",
      latitude: "44.6",
      longitude: "-124.1",
      significant_wave_height_m: "1.2",
      mean_period_s: "6",
      wave_power_kw_per_m: "10",
    });

    expect(result).toMatchObject({
      success: true,
      data: {
        stationID: 277,
        height: 1.2,
        period: 6,
        wavePower: 10,
      },
    });
    if (result.success) {
      expect(result.data.ts).toEqual(new Date("2026-09-21T17:00:00.000Z"));
    }
  });

  it("rejects incomplete remote buoy data", () => {
    const result = normalizeData({ waverider_id: 277 });

    expect(result.success).toBe(false);
  });
});
