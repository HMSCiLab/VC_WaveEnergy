# VC Wave Energy repository guidance

## Repository layout

This repo has three main software areas:

- `vc-wave-energy/`: the desktop app used in the visitor center. It is an Electron + React + TypeScript app with a kiosk-style UI and hardware integrations.
- `pacwave-pipe/`: the Python-side data bridge that exposes wave data through a FastAPI app and Unix domain socket. It is started by the Electron app.
- `VC_firmware/`: Arduino/firmware code for the connected wave-generating hardware.
- `docs/`: design notes and diagrams.

## Build, lint, and test commands

Use the commands from `vc-wave-energy/package.json`:

- `cd vc-wave-energy && npm run dev` — start the Vite dev workflow for the renderer app.
- `cd vc-wave-energy && npm run build` — full production build. This currently passes in the repo.
- `cd vc-wave-energy && npm run lint` — repository lint command. It currently fails on existing upstream issues in the codebase (notable `no-explicit-any`, `prefer-const`, and a few hook dependency warnings).
- `cd vc-wave-energy && npm run dist` — package the Electron app.
- `cd vc-wave-energy && npm test` — run the Vitest suite once.
- `cd vc-wave-energy && npm run test:watch` — run Vitest in watch mode.
- `cd vc-wave-energy && npx vitest run tests/waveSelector.test.tsx` — run one test file.

The renderer tests use Vitest with jsdom and Testing Library. Tests live under `vc-wave-energy/tests/`; the current suite covers slider selection/IPC conversion and the Electron Arduino interface with `@serialport/binding-mock`, so it does not require hardware. The test-only mock identifies itself as an R4 Minima (`2341`/`0069`) and emits `SOT`, `WAVEDATA`, and `EOT` asynchronously after a JSON wave command.

## High-level architecture

The project is split between a desktop app and a Python bridge:

- `vc-wave-energy/electron/main.ts` is the privileged process. It creates the kiosk `BrowserWindow`, starts the Arduino monitoring, triggers PacWave refreshes, and exposes `ipcMain.handle(...)` APIs for renderer-side calls.
- `vc-wave-energy/electron/arduinoInterface.ts` enumerates supported Arduino boards by vendor/product ID, opens the serial port, listens for JSON messages such as `SOT`, `EOT`, and `WAVEDATA`, and forwards them through the Electron app as window events.
- `vc-wave-energy/electron/pacwaveInterface.ts` retrieves remote buoy data with `scp`, writes it to the app data directory, then normalizes and exposes it via IPC (`get-drive-data`).
- `vc-wave-energy/electron/pythonProcControl.ts` launches the Python pipeline from the repo root virtualenv via `.venv/bin/python` and sets `WAVE_ENERGY_APP_ROOT` for the child process.
- `pacwave-pipe/src/pipeline/main.py` starts the FastAPI app on a Unix domain socket path read from `vc-wave-energy/config/pacwave.config.json`. This keeps the Python data service separate from the UI and hardware control logic.
- `vc-wave-energy/src/` is the React renderer. Screen flow is page-based, and app state such as selected height/period is shared through `src/AppContext.tsx`.
- `vc-wave-energy/config/*.json` is the central configuration source for serial IDs, socket paths, remote host/file, and the selectable wave presets. Do not hardcode these values in UI code.

## Key conventions specific to this repo

- Hardware configuration is file-driven: all device-specific values live under `vc-wave-energy/config/*.json`, including Arduino port IDs and PacWave connection settings.
- Renderer code should not directly access serial ports or filesystem features; it communicates with the Electron main process through `window.ipcRenderer.invoke(...)`/`on(...)` APIs.
- The app is intentionally a kiosk-style single-window workflow. Navigation is handled with React Router and shared app state rather than a more general multi-window architecture.
- The Python bridge is lifecycle-managed by Electron. The socket file is cleaned up before restart; if you change the wire-up, preserve the `WAVE_ENERGY_APP_ROOT` and socket-path contract.
- The root README includes a hardware note for Ubuntu/Linux: add the user to the `dialout` group before trying to access Arduino serial ports (`sudo usermod -aG dialout $USER`, then log out/in).

## Relevant files to read first

- `vc-wave-energy/electron/main.ts`
- `vc-wave-energy/electron/arduinoInterface.ts`
- `vc-wave-energy/electron/pacwaveInterface.ts`
- `vc-wave-energy/electron/pythonProcControl.ts`
- `vc-wave-energy/src/AppContext.tsx`
- `vc-wave-energy/config/pacwave.config.json`
- `vc-wave-energy/config/arduino.config.json`
- `vc-wave-energy/config/customwave.config.json`
- `README.md`
