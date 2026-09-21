import { EventEmitter } from "node:events";
import {
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { USER_DATA_DIR, spawn } = vi.hoisted(() => ({
  USER_DATA_DIR: "/tmp/vc-wave-energy-pacwave-test",
  spawn: vi.fn(),
}));
const USER_DATA_FILE = path.join(USER_DATA_DIR, "waverider.json");
const TEMP_FILE = path.join(USER_DATA_DIR, "waverider.tmp");

vi.mock("electron", () => ({
  app: {
    getPath: () => USER_DATA_DIR,
  },
  ipcMain: {
    handle: vi.fn(),
  },
}));

vi.mock("child_process", () => ({ default: { spawn }, spawn }));

import { ipcMain } from "electron";
import { refreshData, registerPacWaveHandlers } from "../electron/pacwaveInterface";

const rawBuoyData = {
  waverider_id: 277,
  source_data_timestamp_utc: "2026-09-21T17:00:00.000Z",
  latitude: 44.6,
  longitude: -124.1,
  significant_wave_height_m: 1.0,
  mean_period_s: 6.0,
  wave_power_kw_per_m: 10.0,
};

describe("PacWave data refresh", () => {
  beforeEach(() => {
    mkdirSync(USER_DATA_DIR, { recursive: true });
    writeFileSync(USER_DATA_FILE, JSON.stringify(rawBuoyData));
    spawn.mockReset();
  });

  it("copies the configured remote file and normalizes the resulting data", async () => {
    const process = new EventEmitter() as EventEmitter & {
      stderr: EventEmitter;
    };
    process.stderr = new EventEmitter();
    spawn.mockReturnValue(process);

    refreshData();
    expect(spawn).toHaveBeenCalledWith(
      "scp",
      expect.arrayContaining([
        expect.stringContaining("pacwave-data.ceoas.oregonstate.edu"),
        TEMP_FILE,
      ]),
    );

    writeFileSync(TEMP_FILE, JSON.stringify(rawBuoyData));
    process.emit("close", 0);
    await vi.waitFor(() =>
      expect(JSON.parse(readFileSync(USER_DATA_FILE, "utf-8"))).toEqual(
        rawBuoyData,
      ),
    );

    registerPacWaveHandlers();
    const handler = vi
      .mocked(ipcMain.handle)
      .mock.calls.find(([channel]) => channel === "get-drive-data")?.[1];
    const result = handler?.({});

    expect(result).toMatchObject({
      success: true,
      data: {
        stationID: 277,
        height: 1,
        period: 6,
        wavePower: 10,
      },
    });
  });

  afterEach(() => {
    rmSync(USER_DATA_DIR, { recursive: true, force: true });
  });
});
