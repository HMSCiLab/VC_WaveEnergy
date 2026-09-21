var yu = Object.defineProperty;
var wu = (e, t, n) => t in e ? yu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var w = (e, t, n) => wu(e, typeof t != "symbol" ? t + "" : t, n);
import { app as Ae, ipcMain as Ze, BrowserWindow as bn } from "electron";
import te from "node:path";
import { fileURLToPath as _u } from "node:url";
import Er from "node:fs";
import re from "stream";
import mt from "tty";
import Ie from "util";
import vn from "os";
import de from "fs";
import Je from "path";
import Au from "events";
import bu, { spawn as vu } from "child_process";
const Bu = _u(import.meta.url), Bn = te.dirname(Bu), Ou = Bn, qe = te.join(Bn, ".."), Fr = te.join(qe, "config"), Su = te.join(Fr, "pacwave.config.json"), Pu = te.join(Fr, "arduino.config.json"), Nu = te.join(Fr, "customwave.config.json");
te.join(qe, "Shared/data/waverider.json");
const zu = Ae.getPath("userData"), rr = te.join(Ae.getPath("userData"), "waverider.json"), We = JSON.parse(
  Er.readFileSync(Su, "utf-8")
);
We.ipc.uds_path;
We.healthcheck.interval_ms;
We.healthcheck.max_failures;
const Tu = We.remote_host, ku = We.remote_file, Ge = JSON.parse(
  Er.readFileSync(Pu, "utf-8")
), Ru = Ge.ports.featherM0_vendor_id, Iu = Ge.ports.featherM0_wifi_product_id, ju = Ge.ports.r4minima_vendor_id, $u = Ge.ports.r4minima_product_id, xu = Ge.baud_rate, On = JSON.parse(
  Er.readFileSync(Nu, "utf-8")
), Mu = On.height_selection_options, Lu = On.period_selection_options;
var N = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ct = {}, gt = {};
Object.defineProperty(gt, "__esModule", { value: !0 });
gt.ByteLengthParser = void 0;
const Zu = re;
class Uu extends Zu.Transform {
  constructor(n) {
    super(n);
    w(this, "length");
    w(this, "position");
    w(this, "buffer");
    if (typeof n.length != "number")
      throw new TypeError('"length" is not a number');
    if (n.length < 1)
      throw new TypeError('"length" is not greater than 0');
    this.length = n.length, this.position = 0, this.buffer = Buffer.alloc(this.length);
  }
  _transform(n, r, u) {
    let o = 0;
    for (; o < n.length; )
      this.buffer[this.position] = n[o], o++, this.position++, this.position === this.length && (this.push(this.buffer), this.buffer = Buffer.alloc(this.length), this.position = 0);
    u();
  }
  _flush(n) {
    this.push(this.buffer.slice(0, this.position)), this.buffer = Buffer.alloc(this.length), n();
  }
}
gt.ByteLengthParser = Uu;
var Et = {};
Object.defineProperty(Et, "__esModule", { value: !0 });
Et.CCTalkParser = void 0;
const Vu = re;
class Ju extends Vu.Transform {
  constructor(n = 50) {
    super();
    w(this, "array");
    w(this, "cursor");
    w(this, "lastByteFetchTime");
    w(this, "maxDelayBetweenBytesMs");
    this.array = [], this.cursor = 0, this.lastByteFetchTime = 0, this.maxDelayBetweenBytesMs = n;
  }
  _transform(n, r, u) {
    if (this.maxDelayBetweenBytesMs > 0) {
      const o = Date.now();
      o - this.lastByteFetchTime > this.maxDelayBetweenBytesMs && (this.array = [], this.cursor = 0), this.lastByteFetchTime = o;
    }
    for (this.cursor += n.length, Array.from(n).map((o) => this.array.push(o)); this.cursor > 1 && this.cursor >= this.array[1] + 5; ) {
      const o = this.array[1] + 5, i = Buffer.from(this.array.slice(0, o));
      this.array = this.array.slice(i.length, this.array.length), this.cursor -= o, this.push(i);
    }
    u();
  }
}
Et.CCTalkParser = Ju;
var He = {};
Object.defineProperty(He, "__esModule", { value: !0 });
He.DelimiterParser = void 0;
const qu = re;
let Wu = class extends qu.Transform {
  constructor({ delimiter: n, includeDelimiter: r = !1, ...u }) {
    super(u);
    w(this, "includeDelimiter");
    w(this, "delimiter");
    w(this, "buffer");
    if (n === void 0)
      throw new TypeError('"delimiter" is not a bufferable object');
    if (n.length === 0)
      throw new TypeError('"delimiter" has a 0 or undefined length');
    this.includeDelimiter = r, this.delimiter = Buffer.from(n), this.buffer = Buffer.alloc(0);
  }
  _transform(n, r, u) {
    let o = Buffer.concat([this.buffer, n]), i;
    for (; (i = o.indexOf(this.delimiter)) !== -1; )
      this.push(o.slice(0, i + (this.includeDelimiter ? this.delimiter.length : 0))), o = o.slice(i + this.delimiter.length);
    this.buffer = o, u();
  }
  _flush(n) {
    this.push(this.buffer), this.buffer = Buffer.alloc(0), n();
  }
};
He.DelimiterParser = Wu;
var Ft = {};
Object.defineProperty(Ft, "__esModule", { value: !0 });
Ft.InterByteTimeoutParser = void 0;
const Gu = re;
class Hu extends Gu.Transform {
  constructor({ maxBufferSize: n = 65536, interval: r, ...u }) {
    super(u);
    w(this, "maxBufferSize");
    w(this, "currentPacket");
    w(this, "interval");
    w(this, "intervalID");
    if (!r)
      throw new TypeError('"interval" is required');
    if (typeof r != "number" || Number.isNaN(r))
      throw new TypeError('"interval" is not a number');
    if (r < 1)
      throw new TypeError('"interval" is not greater than 0');
    if (typeof n != "number" || Number.isNaN(n))
      throw new TypeError('"maxBufferSize" is not a number');
    if (n < 1)
      throw new TypeError('"maxBufferSize" is not greater than 0');
    this.maxBufferSize = n, this.currentPacket = [], this.interval = r;
  }
  _transform(n, r, u) {
    this.intervalID && clearTimeout(this.intervalID);
    for (let o = 0; o < n.length; o++)
      this.currentPacket.push(n[o]), this.currentPacket.length >= this.maxBufferSize && this.emitPacket();
    this.intervalID = setTimeout(this.emitPacket.bind(this), this.interval), u();
  }
  emitPacket() {
    this.intervalID && clearTimeout(this.intervalID), this.currentPacket.length > 0 && this.push(Buffer.from(this.currentPacket)), this.currentPacket = [];
  }
  _flush(n) {
    this.emitPacket(), n();
  }
}
Ft.InterByteTimeoutParser = Hu;
var yt = {};
Object.defineProperty(yt, "__esModule", { value: !0 });
yt.PacketLengthParser = void 0;
const Ku = re;
class Yu extends Ku.Transform {
  constructor(n = {}) {
    super(n);
    w(this, "buffer");
    w(this, "start");
    w(this, "opts");
    const { delimiter: r = 170, packetOverhead: u = 2, lengthBytes: o = 1, lengthOffset: i = 1, maxLen: l = 255 } = n;
    this.opts = {
      delimiter: r,
      packetOverhead: u,
      lengthBytes: o,
      lengthOffset: i,
      maxLen: l
    }, this.buffer = Buffer.alloc(0), this.start = !1;
  }
  _transform(n, r, u) {
    for (let o = 0; o < n.length; o++) {
      const i = n[o];
      if (i === this.opts.delimiter && (this.start = !0), this.start === !0 && (this.buffer = Buffer.concat([this.buffer, Buffer.from([i])]), this.buffer.length >= this.opts.lengthOffset + this.opts.lengthBytes)) {
        const l = this.buffer.readUIntLE(this.opts.lengthOffset, this.opts.lengthBytes);
        (this.buffer.length == l + this.opts.packetOverhead || l > this.opts.maxLen) && (this.push(this.buffer), this.buffer = Buffer.alloc(0), this.start = !1);
      }
    }
    u();
  }
  _flush(n) {
    this.push(this.buffer), this.buffer = Buffer.alloc(0), n();
  }
}
yt.PacketLengthParser = Yu;
var wt = {};
Object.defineProperty(wt, "__esModule", { value: !0 });
var Sn = wt.ReadlineParser = void 0;
const Xu = He;
let Qu = class extends Xu.DelimiterParser {
  constructor(t) {
    const n = {
      delimiter: Buffer.from(`
`, "utf8"),
      encoding: "utf8",
      ...t
    };
    typeof n.delimiter == "string" && (n.delimiter = Buffer.from(n.delimiter, n.encoding)), super(n);
  }
};
Sn = wt.ReadlineParser = Qu;
var _t = {};
Object.defineProperty(_t, "__esModule", { value: !0 });
_t.ReadyParser = void 0;
const eo = re;
class to extends eo.Transform {
  constructor({ delimiter: n, ...r }) {
    if (n === void 0)
      throw new TypeError('"delimiter" is not a bufferable object');
    if (n.length === 0)
      throw new TypeError('"delimiter" has a 0 or undefined length');
    super(r);
    w(this, "delimiter");
    w(this, "readOffset");
    w(this, "ready");
    this.delimiter = Buffer.from(n), this.readOffset = 0, this.ready = !1;
  }
  _transform(n, r, u) {
    if (this.ready)
      return this.push(n), u();
    const o = this.delimiter;
    let i = 0;
    for (; this.readOffset < o.length && i < n.length; )
      o[this.readOffset] === n[i] ? this.readOffset++ : this.readOffset = 0, i++;
    if (this.readOffset === o.length) {
      this.ready = !0, this.emit("ready");
      const l = n.slice(i);
      l.length > 0 && this.push(l);
    }
    u();
  }
}
_t.ReadyParser = to;
var At = {};
Object.defineProperty(At, "__esModule", { value: !0 });
At.RegexParser = void 0;
const ro = re;
class no extends ro.Transform {
  constructor({ regex: n, ...r }) {
    const u = {
      encoding: "utf8",
      ...r
    };
    if (n === void 0)
      throw new TypeError('"options.regex" must be a regular expression pattern or object');
    n instanceof RegExp || (n = new RegExp(n.toString()));
    super(u);
    w(this, "regex");
    w(this, "data");
    this.regex = n, this.data = "";
  }
  _transform(n, r, u) {
    const i = (this.data + n).split(this.regex);
    this.data = i.pop() || "", i.forEach((l) => {
      this.push(l);
    }), u();
  }
  _flush(n) {
    this.push(this.data), this.data = "", n();
  }
}
At.RegexParser = no;
var Pn = {}, bt = {};
Object.defineProperty(bt, "__esModule", { value: !0 });
bt.SlipDecoder = void 0;
const uo = re;
class oo extends uo.Transform {
  constructor(n = {}) {
    super(n);
    w(this, "opts");
    w(this, "buffer");
    w(this, "escape");
    w(this, "start");
    const { START: r, ESC: u = 219, END: o = 192, ESC_START: i, ESC_END: l = 220, ESC_ESC: c = 221 } = n;
    this.opts = {
      START: r,
      ESC: u,
      END: o,
      ESC_START: i,
      ESC_END: l,
      ESC_ESC: c
    }, this.buffer = Buffer.alloc(0), this.escape = !1, this.start = !1;
  }
  _transform(n, r, u) {
    for (let o = 0; o < n.length; o++) {
      let i = n[o];
      if (i === this.opts.START) {
        this.start = !0;
        continue;
      } else this.opts.START == null && (this.start = !0);
      if (this.escape)
        i === this.opts.ESC_START && this.opts.START ? i = this.opts.START : i === this.opts.ESC_ESC ? i = this.opts.ESC : i === this.opts.ESC_END ? i = this.opts.END : (this.escape = !1, this.push(this.buffer), this.buffer = Buffer.alloc(0));
      else {
        if (i === this.opts.ESC) {
          this.escape = !0;
          continue;
        }
        if (i === this.opts.END) {
          this.push(this.buffer), this.buffer = Buffer.alloc(0), this.escape = !1, this.start = !1;
          continue;
        }
      }
      this.escape = !1, this.start && (this.buffer = Buffer.concat([this.buffer, Buffer.from([i])]));
    }
    u();
  }
  _flush(n) {
    this.push(this.buffer), this.buffer = Buffer.alloc(0), n();
  }
}
bt.SlipDecoder = oo;
var vt = {};
Object.defineProperty(vt, "__esModule", { value: !0 });
vt.SlipEncoder = void 0;
const io = re;
class so extends io.Transform {
  constructor(n = {}) {
    super(n);
    w(this, "opts");
    const { START: r, ESC: u = 219, END: o = 192, ESC_START: i, ESC_END: l = 220, ESC_ESC: c = 221, bluetoothQuirk: d = !1 } = n;
    this.opts = {
      START: r,
      ESC: u,
      END: o,
      ESC_START: i,
      ESC_END: l,
      ESC_ESC: c,
      bluetoothQuirk: d
    };
  }
  _transform(n, r, u) {
    const o = n.length;
    if (this.opts.bluetoothQuirk && o === 0)
      return u();
    const i = Buffer.alloc(o * 2 + 2);
    let l = 0;
    this.opts.bluetoothQuirk == !0 && (i[l++] = this.opts.END), this.opts.START !== void 0 && (i[l++] = this.opts.START);
    for (let c = 0; c < o; c++) {
      let d = n[c];
      d === this.opts.START && this.opts.ESC_START ? (i[l++] = this.opts.ESC, d = this.opts.ESC_START) : d === this.opts.END ? (i[l++] = this.opts.ESC, d = this.opts.ESC_END) : d === this.opts.ESC && (i[l++] = this.opts.ESC, d = this.opts.ESC_ESC), i[l++] = d;
    }
    i[l++] = this.opts.END, u(null, i.slice(0, l));
  }
}
vt.SlipEncoder = so;
(function(e) {
  var t = N && N.__createBinding || (Object.create ? function(r, u, o, i) {
    i === void 0 && (i = o);
    var l = Object.getOwnPropertyDescriptor(u, o);
    (!l || ("get" in l ? !u.__esModule : l.writable || l.configurable)) && (l = { enumerable: !0, get: function() {
      return u[o];
    } }), Object.defineProperty(r, i, l);
  } : function(r, u, o, i) {
    i === void 0 && (i = o), r[i] = u[o];
  }), n = N && N.__exportStar || function(r, u) {
    for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(u, o) && t(u, r, o);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), n(bt, e), n(vt, e);
})(Pn);
var Bt = {}, Nn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.convertHeaderBufferToObj = e.HEADER_LENGTH = void 0, e.HEADER_LENGTH = 6;
  const t = (r) => {
    let u = Number(r).toString(2);
    for (; u.length < 8; )
      u = `0${u}`;
    return u;
  }, n = (r) => {
    const u = Array.from(r.slice(0, e.HEADER_LENGTH)).reduce((h, D) => `${h}${t(D)}`, ""), i = u.slice(0, 3) === "000" ? 1 : "UNKNOWN_VERSION", l = Number(u[3]), c = Number(u[4]), d = parseInt(u.slice(5, 16), 2), f = parseInt(u.slice(16, 18), 2), s = parseInt(u.slice(18, 32), 2), a = parseInt(u.slice(-16), 2) + 1;
    return {
      versionNumber: i,
      identification: {
        apid: d,
        secondaryHeader: c,
        type: l
      },
      sequenceControl: {
        packetName: s,
        sequenceFlags: f
      },
      dataLength: a
    };
  };
  e.convertHeaderBufferToObj = n;
})(Nn);
Object.defineProperty(Bt, "__esModule", { value: !0 });
Bt.SpacePacketParser = void 0;
const ao = re, Ye = Nn;
class co extends ao.Transform {
  /**
   * A Transform stream that accepts a stream of octet data and emits object representations of
   * CCSDS Space Packets once a packet has been completely received.
   * @param {Object} [options] Configuration options for the stream
   * @param {Number} options.timeCodeFieldLength The length of the time code field within the data
   * @param {Number} options.ancillaryDataFieldLength The length of the ancillary data field within the data
   */
  constructor(n = {}) {
    super({ ...n, objectMode: !0 });
    w(this, "timeCodeFieldLength");
    w(this, "ancillaryDataFieldLength");
    w(this, "dataBuffer");
    w(this, "headerBuffer");
    w(this, "dataLength");
    w(this, "expectingHeader");
    w(this, "dataSlice");
    w(this, "header");
    this.timeCodeFieldLength = n.timeCodeFieldLength || 0, this.ancillaryDataFieldLength = n.ancillaryDataFieldLength || 0, this.dataSlice = this.timeCodeFieldLength + this.ancillaryDataFieldLength, this.dataBuffer = Buffer.alloc(0), this.headerBuffer = Buffer.alloc(0), this.dataLength = 0, this.expectingHeader = !0;
  }
  /**
   * Bundle the header, secondary header if present, and the data into a JavaScript object to emit.
   * If more data has been received past the current packet, begin the process of parsing the next
   * packet(s).
   */
  pushCompletedPacket() {
    if (!this.header)
      throw new Error("Missing header");
    const n = Buffer.from(this.dataBuffer.slice(0, this.timeCodeFieldLength)), r = Buffer.from(this.dataBuffer.slice(this.timeCodeFieldLength, this.timeCodeFieldLength + this.ancillaryDataFieldLength)), u = Buffer.from(this.dataBuffer.slice(this.dataSlice, this.dataLength)), o = {
      header: { ...this.header },
      data: u.toString()
    };
    (n.length > 0 || r.length > 0) && (o.secondaryHeader = {}, n.length && (o.secondaryHeader.timeCode = n.toString()), r.length && (o.secondaryHeader.ancillaryData = r.toString())), this.push(o);
    const i = Buffer.from(this.dataBuffer.slice(this.dataLength));
    i.length >= Ye.HEADER_LENGTH ? this.extractHeader(i) : (this.headerBuffer = i, this.dataBuffer = Buffer.alloc(0), this.expectingHeader = !0, this.dataLength = 0, this.header = void 0);
  }
  /**
   * Build the Stream's headerBuffer property from the received Buffer chunk; extract data from it
   * if it's complete. If there's more to the chunk than just the header, initiate handling the
   * packet data.
   * @param chunk -  Build the Stream's headerBuffer property from
   */
  extractHeader(n) {
    const r = Buffer.concat([this.headerBuffer, n]), u = r.slice(Ye.HEADER_LENGTH);
    r.length >= Ye.HEADER_LENGTH ? (this.header = (0, Ye.convertHeaderBufferToObj)(r), this.dataLength = this.header.dataLength, this.headerBuffer = Buffer.alloc(0), this.expectingHeader = !1) : this.headerBuffer = r, u.length > 0 && (this.dataBuffer = Buffer.from(u), this.dataBuffer.length >= this.dataLength && this.pushCompletedPacket());
  }
  _transform(n, r, u) {
    this.expectingHeader ? this.extractHeader(n) : (this.dataBuffer = Buffer.concat([this.dataBuffer, n]), this.dataBuffer.length >= this.dataLength && this.pushCompletedPacket()), u();
  }
  _flush(n) {
    const r = Buffer.concat([this.headerBuffer, this.dataBuffer]), u = Array.from(r);
    this.push(u), n();
  }
}
Bt.SpacePacketParser = co;
var Ot = {}, be = {}, nr = { exports: {} }, Xe = { exports: {} }, xt, jr;
function lo() {
  if (jr) return xt;
  jr = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, u = r * 7, o = r * 365.25;
  xt = function(f, s) {
    s = s || {};
    var a = typeof f;
    if (a === "string" && f.length > 0)
      return i(f);
    if (a === "number" && isFinite(f))
      return s.long ? c(f) : l(f);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(f)
    );
  };
  function i(f) {
    if (f = String(f), !(f.length > 100)) {
      var s = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        f
      );
      if (s) {
        var a = parseFloat(s[1]), h = (s[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return a * o;
          case "weeks":
          case "week":
          case "w":
            return a * u;
          case "days":
          case "day":
          case "d":
            return a * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return a * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return a * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return a * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return a;
          default:
            return;
        }
      }
    }
  }
  function l(f) {
    var s = Math.abs(f);
    return s >= r ? Math.round(f / r) + "d" : s >= n ? Math.round(f / n) + "h" : s >= t ? Math.round(f / t) + "m" : s >= e ? Math.round(f / e) + "s" : f + "ms";
  }
  function c(f) {
    var s = Math.abs(f);
    return s >= r ? d(f, s, r, "day") : s >= n ? d(f, s, n, "hour") : s >= t ? d(f, s, t, "minute") : s >= e ? d(f, s, e, "second") : f + " ms";
  }
  function d(f, s, a, h) {
    var D = s >= a * 1.5;
    return Math.round(f / a) + " " + h + (D ? "s" : "");
  }
  return xt;
}
var Mt, $r;
function zn() {
  if ($r) return Mt;
  $r = 1;
  function e(t) {
    r.debug = r, r.default = r, r.coerce = d, r.disable = i, r.enable = o, r.enabled = l, r.humanize = lo(), r.destroy = f, Object.keys(t).forEach((s) => {
      r[s] = t[s];
    }), r.names = [], r.skips = [], r.formatters = {};
    function n(s) {
      let a = 0;
      for (let h = 0; h < s.length; h++)
        a = (a << 5) - a + s.charCodeAt(h), a |= 0;
      return r.colors[Math.abs(a) % r.colors.length];
    }
    r.selectColor = n;
    function r(s) {
      let a, h = null, D, p;
      function g(...C) {
        if (!g.enabled)
          return;
        const F = g, v = Number(/* @__PURE__ */ new Date()), A = v - (a || v);
        F.diff = A, F.prev = a, F.curr = v, a = v, C[0] = r.coerce(C[0]), typeof C[0] != "string" && C.unshift("%O");
        let y = 0;
        C[0] = C[0].replace(/%([a-zA-Z%])/g, (J, ae) => {
          if (J === "%%")
            return "%";
          y++;
          const se = r.formatters[ae];
          if (typeof se == "function") {
            const Fe = C[y];
            J = se.call(F, Fe), C.splice(y, 1), y--;
          }
          return J;
        }), r.formatArgs.call(F, C), (F.log || r.log).apply(F, C);
      }
      return g.namespace = s, g.useColors = r.useColors(), g.color = r.selectColor(s), g.extend = u, g.destroy = r.destroy, Object.defineProperty(g, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => h !== null ? h : (D !== r.namespaces && (D = r.namespaces, p = r.enabled(s)), p),
        set: (C) => {
          h = C;
        }
      }), typeof r.init == "function" && r.init(g), g;
    }
    function u(s, a) {
      const h = r(this.namespace + (typeof a > "u" ? ":" : a) + s);
      return h.log = this.log, h;
    }
    function o(s) {
      r.save(s), r.namespaces = s, r.names = [], r.skips = [];
      let a;
      const h = (typeof s == "string" ? s : "").split(/[\s,]+/), D = h.length;
      for (a = 0; a < D; a++)
        h[a] && (s = h[a].replace(/\*/g, ".*?"), s[0] === "-" ? r.skips.push(new RegExp("^" + s.slice(1) + "$")) : r.names.push(new RegExp("^" + s + "$")));
    }
    function i() {
      const s = [
        ...r.names.map(c),
        ...r.skips.map(c).map((a) => "-" + a)
      ].join(",");
      return r.enable(""), s;
    }
    function l(s) {
      if (s[s.length - 1] === "*")
        return !0;
      let a, h;
      for (a = 0, h = r.skips.length; a < h; a++)
        if (r.skips[a].test(s))
          return !1;
      for (a = 0, h = r.names.length; a < h; a++)
        if (r.names[a].test(s))
          return !0;
      return !1;
    }
    function c(s) {
      return s.toString().substring(2, s.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function d(s) {
      return s instanceof Error ? s.stack || s.message : s;
    }
    function f() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  return Mt = e, Mt;
}
var xr;
function fo() {
  return xr || (xr = 1, function(e, t) {
    t.formatArgs = r, t.save = u, t.load = o, t.useColors = n, t.storage = i(), t.destroy = /* @__PURE__ */ (() => {
      let c = !1;
      return () => {
        c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function n() {
      return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function r(c) {
      if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const d = "color: " + this.color;
      c.splice(1, 0, d, "color: inherit");
      let f = 0, s = 0;
      c[0].replace(/%[a-zA-Z%]/g, (a) => {
        a !== "%%" && (f++, a === "%c" && (s = f));
      }), c.splice(s, 0, d);
    }
    t.log = console.debug || console.log || (() => {
    });
    function u(c) {
      try {
        c ? t.storage.setItem("debug", c) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let c;
      try {
        c = t.storage.getItem("debug");
      } catch {
      }
      return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
    }
    function i() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = zn()(t);
    const { formatters: l } = e.exports;
    l.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (d) {
        return "[UnexpectedJSONParseError]: " + d.message;
      }
    };
  }(Xe, Xe.exports)), Xe.exports;
}
var Qe = { exports: {} }, Lt, Mr;
function ho() {
  return Mr || (Mr = 1, Lt = (e, t = process.argv) => {
    const n = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", r = t.indexOf(n + e), u = t.indexOf("--");
    return r !== -1 && (u === -1 || r < u);
  }), Lt;
}
var Zt, Lr;
function yr() {
  if (Lr) return Zt;
  Lr = 1;
  const e = vn, t = mt, n = ho(), { env: r } = process;
  let u;
  n("no-color") || n("no-colors") || n("color=false") || n("color=never") ? u = 0 : (n("color") || n("colors") || n("color=true") || n("color=always")) && (u = 1), "FORCE_COLOR" in r && (r.FORCE_COLOR === "true" ? u = 1 : r.FORCE_COLOR === "false" ? u = 0 : u = r.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(r.FORCE_COLOR, 10), 3));
  function o(c) {
    return c === 0 ? !1 : {
      level: c,
      hasBasic: !0,
      has256: c >= 2,
      has16m: c >= 3
    };
  }
  function i(c, d) {
    if (u === 0)
      return 0;
    if (n("color=16m") || n("color=full") || n("color=truecolor"))
      return 3;
    if (n("color=256"))
      return 2;
    if (c && !d && u === void 0)
      return 0;
    const f = u || 0;
    if (r.TERM === "dumb")
      return f;
    if (process.platform === "win32") {
      const s = e.release().split(".");
      return Number(s[0]) >= 10 && Number(s[2]) >= 10586 ? Number(s[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in r)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((s) => s in r) || r.CI_NAME === "codeship" ? 1 : f;
    if ("TEAMCITY_VERSION" in r)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(r.TEAMCITY_VERSION) ? 1 : 0;
    if (r.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in r) {
      const s = parseInt((r.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (r.TERM_PROGRAM) {
        case "iTerm.app":
          return s >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(r.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(r.TERM) || "COLORTERM" in r ? 1 : f;
  }
  function l(c) {
    const d = i(c, c && c.isTTY);
    return o(d);
  }
  return Zt = {
    supportsColor: l,
    stdout: o(i(!0, t.isatty(1))),
    stderr: o(i(!0, t.isatty(2)))
  }, Zt;
}
var Zr;
function po() {
  return Zr || (Zr = 1, function(e, t) {
    const n = mt, r = Ie;
    t.init = f, t.log = l, t.formatArgs = o, t.save = c, t.load = d, t.useColors = u, t.destroy = r.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const a = yr();
      a && (a.stderr || a).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((a) => /^debug_/i.test(a)).reduce((a, h) => {
      const D = h.substring(6).toLowerCase().replace(/_([a-z])/g, (g, C) => C.toUpperCase());
      let p = process.env[h];
      return /^(yes|on|true|enabled)$/i.test(p) ? p = !0 : /^(no|off|false|disabled)$/i.test(p) ? p = !1 : p === "null" ? p = null : p = Number(p), a[D] = p, a;
    }, {});
    function u() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function o(a) {
      const { namespace: h, useColors: D } = this;
      if (D) {
        const p = this.color, g = "\x1B[3" + (p < 8 ? p : "8;5;" + p), C = `  ${g};1m${h} \x1B[0m`;
        a[0] = C + a[0].split(`
`).join(`
` + C), a.push(g + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        a[0] = i() + h + " " + a[0];
    }
    function i() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function l(...a) {
      return process.stderr.write(r.format(...a) + `
`);
    }
    function c(a) {
      a ? process.env.DEBUG = a : delete process.env.DEBUG;
    }
    function d() {
      return process.env.DEBUG;
    }
    function f(a) {
      a.inspectOpts = {};
      const h = Object.keys(t.inspectOpts);
      for (let D = 0; D < h.length; D++)
        a.inspectOpts[h[D]] = t.inspectOpts[h[D]];
    }
    e.exports = zn()(t);
    const { formatters: s } = e.exports;
    s.o = function(a) {
      return this.inspectOpts.colors = this.useColors, r.inspect(a, this.inspectOpts).split(`
`).map((h) => h.trim()).join(" ");
    }, s.O = function(a) {
      return this.inspectOpts.colors = this.useColors, r.inspect(a, this.inspectOpts);
    };
  }(Qe, Qe.exports)), Qe.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? nr.exports = fo() : nr.exports = po();
var Do = nr.exports, mo = N && N.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(be, "__esModule", { value: !0 });
be.SerialPortStream = be.DisconnectedError = void 0;
const Co = re, go = mo(Do), B = (0, go.default)("serialport/stream");
class Tn extends Error {
  constructor(n) {
    super(n);
    w(this, "disconnected");
    this.disconnected = !0;
  }
}
be.DisconnectedError = Tn;
const Eo = {
  brk: !1,
  cts: !1,
  dtr: !0,
  rts: !0
};
function Ur(e) {
  const t = Buffer.allocUnsafe(e);
  return t.used = 0, t;
}
class Fo extends Co.Duplex {
  /**
   * Create a new serial port object for the `path`. In the case of invalid arguments or invalid options, when constructing a new SerialPort it will throw an error. The port will open automatically by default, which is the equivalent of calling `port.open(openCallback)` in the next tick. You can disable this by setting the option `autoOpen` to `false`.
   * @emits open
   * @emits data
   * @emits close
   * @emits error
   */
  constructor(n, r) {
    const u = {
      autoOpen: !0,
      endOnClose: !1,
      highWaterMark: 65536,
      ...n
    };
    super({
      highWaterMark: u.highWaterMark
    });
    w(this, "port");
    w(this, "_pool");
    w(this, "_kMinPoolSpace");
    w(this, "opening");
    w(this, "closing");
    w(this, "settings");
    if (!u.binding)
      throw new TypeError('"Bindings" is invalid pass it as `options.binding`');
    if (!u.path)
      throw new TypeError(`"path" is not defined: ${u.path}`);
    if (typeof u.baudRate != "number")
      throw new TypeError(`"baudRate" must be a number: ${u.baudRate}`);
    this.settings = u, this.opening = !1, this.closing = !1, this._pool = Ur(this.settings.highWaterMark), this._kMinPoolSpace = 128, this.settings.autoOpen && this.open(r);
  }
  get path() {
    return this.settings.path;
  }
  get baudRate() {
    return this.settings.baudRate;
  }
  get isOpen() {
    var n;
    return (((n = this.port) == null ? void 0 : n.isOpen) ?? !1) && !this.closing;
  }
  _error(n, r) {
    r ? r.call(this, n) : this.emit("error", n);
  }
  _asyncError(n, r) {
    process.nextTick(() => this._error(n, r));
  }
  /**
   * Opens a connection to the given serial port.
   * @param {ErrorCallback=} openCallback - Called after a connection is opened. If this is not provided and an error occurs, it will be emitted on the port's `error` event.
   * @emits open
   */
  open(n) {
    if (this.isOpen)
      return this._asyncError(new Error("Port is already open"), n);
    if (this.opening)
      return this._asyncError(new Error("Port is opening"), n);
    const { highWaterMark: r, binding: u, autoOpen: o, endOnClose: i, ...l } = this.settings;
    this.opening = !0, B("opening", `path: ${this.path}`), this.settings.binding.open(l).then((c) => {
      B("opened", `path: ${this.path}`), this.port = c, this.opening = !1, this.emit("open"), n && n.call(this, null);
    }, (c) => {
      this.opening = !1, B("Binding #open had an error", c), this._error(c, n);
    });
  }
  /**
   * Changes the baud rate for an open port. Emits an error or calls the callback if the baud rate isn't supported.
   * @param {object=} options Only supports `baudRate`.
   * @param {number=} [options.baudRate] The baud rate of the port to be opened. This should match one of the commonly available baud rates, such as 110, 300, 1200, 2400, 4800, 9600, 14400, 19200, 38400, 57600, or 115200. Custom rates are supported best effort per platform. The device connected to the serial port is not guaranteed to support the requested baud rate, even if the port itself supports that baud rate.
   * @param {ErrorCallback=} [callback] Called once the port's baud rate changes. If `.update` is called without a callback, and there is an error, an error event is emitted.
   * @returns {undefined}
   */
  update(n, r) {
    if (!this.isOpen || !this.port)
      return B("update attempted, but port is not open"), this._asyncError(new Error("Port is not open"), r);
    B("update", `baudRate: ${n.baudRate}`), this.port.update(n).then(() => {
      B("binding.update", "finished"), this.settings.baudRate = n.baudRate, r && r.call(this, null);
    }, (u) => (B("binding.update", "error", u), this._error(u, r)));
  }
  write(n, r, u) {
    return Array.isArray(n) && (n = Buffer.from(n)), typeof r == "function" ? super.write(n, r) : super.write(n, r, u);
  }
  _write(n, r, u) {
    if (!this.isOpen || !this.port) {
      this.once("open", () => {
        this._write(n, r, u);
      });
      return;
    }
    B("_write", `${n.length} bytes of data`), this.port.write(n).then(() => {
      B("binding.write", "write finished"), u(null);
    }, (o) => {
      B("binding.write", "error", o), o.canceled || this._disconnected(o), u(o);
    });
  }
  _writev(n, r) {
    B("_writev", `${n.length} chunks of data`);
    const u = n.map((o) => o.chunk);
    this._write(Buffer.concat(u), void 0, r);
  }
  _read(n) {
    if (!this.isOpen || !this.port) {
      B("_read", "queueing _read for after open"), this.once("open", () => {
        this._read(n);
      });
      return;
    }
    (!this._pool || this._pool.length - this._pool.used < this._kMinPoolSpace) && (B("_read", "discarding the read buffer pool because it is below kMinPoolSpace"), this._pool = Ur(this.settings.highWaterMark));
    const r = this._pool, u = Math.min(r.length - r.used, n), o = r.used;
    B("_read", "reading", { start: o, toRead: u }), this.port.read(r, o, u).then(({ bytesRead: i }) => {
      if (B("binding.read", "finished", { bytesRead: i }), i === 0) {
        B("binding.read", "Zero bytes read closing readable stream"), this.push(null);
        return;
      }
      r.used += i, this.push(r.slice(o, o + i));
    }, (i) => {
      B("binding.read", "error", i), i.canceled || this._disconnected(i), this._read(n);
    });
  }
  _disconnected(n) {
    if (!this.isOpen) {
      B("disconnected aborted because already closed", n);
      return;
    }
    B("disconnected", n), this.close(void 0, new Tn(n.message));
  }
  /**
   * Closes an open connection.
   *
   * If there are in progress writes when the port is closed the writes will error.
   * @param {ErrorCallback} callback Called once a connection is closed.
   * @param {Error} disconnectError used internally to propagate a disconnect error
   */
  close(n, r = null) {
    if (!this.isOpen || !this.port)
      return B("close attempted, but port is not open"), this._asyncError(new Error("Port is not open"), n);
    this.closing = !0, B("#close"), this.port.close().then(() => {
      this.closing = !1, B("binding.close", "finished"), this.emit("close", r), this.settings.endOnClose && this.emit("end"), n && n.call(this, r);
    }, (u) => (this.closing = !1, B("binding.close", "had an error", u), this._error(u, n)));
  }
  /**
   * Set control flags on an open port. Uses [`SetCommMask`](https://msdn.microsoft.com/en-us/library/windows/desktop/aa363257(v=vs.85).aspx) for Windows and [`ioctl`](http://linux.die.net/man/4/tty_ioctl) for OS X and Linux.
   *
   * All options are operating system default when the port is opened. Every flag is set on each call to the provided or default values. If options isn't provided default options is used.
   */
  set(n, r) {
    if (!this.isOpen || !this.port)
      return B("set attempted, but port is not open"), this._asyncError(new Error("Port is not open"), r);
    const u = { ...Eo, ...n };
    B("#set", u), this.port.set(u).then(() => {
      B("binding.set", "finished"), r && r.call(this, null);
    }, (o) => (B("binding.set", "had an error", o), this._error(o, r)));
  }
  /**
   * Returns the control flags (CTS, DSR, DCD) on the open port.
   * Uses [`GetCommModemStatus`](https://msdn.microsoft.com/en-us/library/windows/desktop/aa363258(v=vs.85).aspx) for Windows and [`ioctl`](http://linux.die.net/man/4/tty_ioctl) for mac and linux.
   */
  get(n) {
    if (!this.isOpen || !this.port)
      return B("get attempted, but port is not open"), this._asyncError(new Error("Port is not open"), n);
    B("#get"), this.port.get().then((r) => {
      B("binding.get", "finished"), n.call(this, null, r);
    }, (r) => (B("binding.get", "had an error", r), this._error(r, n)));
  }
  /**
   * Flush discards data received but not read, and written but not transmitted by the operating system. For more technical details, see [`tcflush(fd, TCIOFLUSH)`](http://linux.die.net/man/3/tcflush) for Mac/Linux and [`FlushFileBuffers`](http://msdn.microsoft.com/en-us/library/windows/desktop/aa364439) for Windows.
   */
  flush(n) {
    if (!this.isOpen || !this.port)
      return B("flush attempted, but port is not open"), this._asyncError(new Error("Port is not open"), n);
    B("#flush"), this.port.flush().then(() => {
      B("binding.flush", "finished"), n && n.call(this, null);
    }, (r) => (B("binding.flush", "had an error", r), this._error(r, n)));
  }
  /**
     * Waits until all output data is transmitted to the serial port. After any pending write has completed it calls [`tcdrain()`](http://linux.die.net/man/3/tcdrain) or [FlushFileBuffers()](https://msdn.microsoft.com/en-us/library/windows/desktop/aa364439(v=vs.85).aspx) to ensure it has been written to the device.
    * @example
    Write the `data` and wait until it has finished transmitting to the target serial port before calling the callback. This will queue until the port is open and writes are finished.
  
    ```js
    function writeAndDrain (data, callback) {
      port.write(data);
      port.drain(callback);
    }
    ```
    */
  drain(n) {
    if (B("drain"), !this.isOpen || !this.port) {
      B("drain queuing on port open"), this.once("open", () => {
        this.drain(n);
      });
      return;
    }
    this.port.drain().then(() => {
      B("binding.drain", "finished"), n && n.call(this, null);
    }, (r) => (B("binding.drain", "had an error", r), this._error(r, n)));
  }
}
be.SerialPortStream = Fo;
var Ke = {}, ur = { exports: {} }, et = { exports: {} }, Ut, Vr;
function yo() {
  if (Vr) return Ut;
  Vr = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, u = r * 7, o = r * 365.25;
  Ut = function(f, s) {
    s = s || {};
    var a = typeof f;
    if (a === "string" && f.length > 0)
      return i(f);
    if (a === "number" && isFinite(f))
      return s.long ? c(f) : l(f);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(f)
    );
  };
  function i(f) {
    if (f = String(f), !(f.length > 100)) {
      var s = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        f
      );
      if (s) {
        var a = parseFloat(s[1]), h = (s[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return a * o;
          case "weeks":
          case "week":
          case "w":
            return a * u;
          case "days":
          case "day":
          case "d":
            return a * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return a * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return a * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return a * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return a;
          default:
            return;
        }
      }
    }
  }
  function l(f) {
    var s = Math.abs(f);
    return s >= r ? Math.round(f / r) + "d" : s >= n ? Math.round(f / n) + "h" : s >= t ? Math.round(f / t) + "m" : s >= e ? Math.round(f / e) + "s" : f + "ms";
  }
  function c(f) {
    var s = Math.abs(f);
    return s >= r ? d(f, s, r, "day") : s >= n ? d(f, s, n, "hour") : s >= t ? d(f, s, t, "minute") : s >= e ? d(f, s, e, "second") : f + " ms";
  }
  function d(f, s, a, h) {
    var D = s >= a * 1.5;
    return Math.round(f / a) + " " + h + (D ? "s" : "");
  }
  return Ut;
}
var Vt, Jr;
function kn() {
  if (Jr) return Vt;
  Jr = 1;
  function e(t) {
    r.debug = r, r.default = r, r.coerce = d, r.disable = l, r.enable = o, r.enabled = c, r.humanize = yo(), r.destroy = f, Object.keys(t).forEach((s) => {
      r[s] = t[s];
    }), r.names = [], r.skips = [], r.formatters = {};
    function n(s) {
      let a = 0;
      for (let h = 0; h < s.length; h++)
        a = (a << 5) - a + s.charCodeAt(h), a |= 0;
      return r.colors[Math.abs(a) % r.colors.length];
    }
    r.selectColor = n;
    function r(s) {
      let a, h = null, D, p;
      function g(...C) {
        if (!g.enabled)
          return;
        const F = g, v = Number(/* @__PURE__ */ new Date()), A = v - (a || v);
        F.diff = A, F.prev = a, F.curr = v, a = v, C[0] = r.coerce(C[0]), typeof C[0] != "string" && C.unshift("%O");
        let y = 0;
        C[0] = C[0].replace(/%([a-zA-Z%])/g, (J, ae) => {
          if (J === "%%")
            return "%";
          y++;
          const se = r.formatters[ae];
          if (typeof se == "function") {
            const Fe = C[y];
            J = se.call(F, Fe), C.splice(y, 1), y--;
          }
          return J;
        }), r.formatArgs.call(F, C), (F.log || r.log).apply(F, C);
      }
      return g.namespace = s, g.useColors = r.useColors(), g.color = r.selectColor(s), g.extend = u, g.destroy = r.destroy, Object.defineProperty(g, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => h !== null ? h : (D !== r.namespaces && (D = r.namespaces, p = r.enabled(s)), p),
        set: (C) => {
          h = C;
        }
      }), typeof r.init == "function" && r.init(g), g;
    }
    function u(s, a) {
      const h = r(this.namespace + (typeof a > "u" ? ":" : a) + s);
      return h.log = this.log, h;
    }
    function o(s) {
      r.save(s), r.namespaces = s, r.names = [], r.skips = [];
      const a = (typeof s == "string" ? s : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const h of a)
        h[0] === "-" ? r.skips.push(h.slice(1)) : r.names.push(h);
    }
    function i(s, a) {
      let h = 0, D = 0, p = -1, g = 0;
      for (; h < s.length; )
        if (D < a.length && (a[D] === s[h] || a[D] === "*"))
          a[D] === "*" ? (p = D, g = h, D++) : (h++, D++);
        else if (p !== -1)
          D = p + 1, g++, h = g;
        else
          return !1;
      for (; D < a.length && a[D] === "*"; )
        D++;
      return D === a.length;
    }
    function l() {
      const s = [
        ...r.names,
        ...r.skips.map((a) => "-" + a)
      ].join(",");
      return r.enable(""), s;
    }
    function c(s) {
      for (const a of r.skips)
        if (i(s, a))
          return !1;
      for (const a of r.names)
        if (i(s, a))
          return !0;
      return !1;
    }
    function d(s) {
      return s instanceof Error ? s.stack || s.message : s;
    }
    function f() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  return Vt = e, Vt;
}
var qr;
function wo() {
  return qr || (qr = 1, function(e, t) {
    t.formatArgs = r, t.save = u, t.load = o, t.useColors = n, t.storage = i(), t.destroy = /* @__PURE__ */ (() => {
      let c = !1;
      return () => {
        c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function n() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let c;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (c = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(c[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function r(c) {
      if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const d = "color: " + this.color;
      c.splice(1, 0, d, "color: inherit");
      let f = 0, s = 0;
      c[0].replace(/%[a-zA-Z%]/g, (a) => {
        a !== "%%" && (f++, a === "%c" && (s = f));
      }), c.splice(s, 0, d);
    }
    t.log = console.debug || console.log || (() => {
    });
    function u(c) {
      try {
        c ? t.storage.setItem("debug", c) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let c;
      try {
        c = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
      } catch {
      }
      return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
    }
    function i() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = kn()(t);
    const { formatters: l } = e.exports;
    l.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (d) {
        return "[UnexpectedJSONParseError]: " + d.message;
      }
    };
  }(et, et.exports)), et.exports;
}
var tt = { exports: {} }, Wr;
function _o() {
  return Wr || (Wr = 1, function(e, t) {
    const n = mt, r = Ie;
    t.init = f, t.log = l, t.formatArgs = o, t.save = c, t.load = d, t.useColors = u, t.destroy = r.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const a = yr();
      a && (a.stderr || a).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((a) => /^debug_/i.test(a)).reduce((a, h) => {
      const D = h.substring(6).toLowerCase().replace(/_([a-z])/g, (g, C) => C.toUpperCase());
      let p = process.env[h];
      return /^(yes|on|true|enabled)$/i.test(p) ? p = !0 : /^(no|off|false|disabled)$/i.test(p) ? p = !1 : p === "null" ? p = null : p = Number(p), a[D] = p, a;
    }, {});
    function u() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function o(a) {
      const { namespace: h, useColors: D } = this;
      if (D) {
        const p = this.color, g = "\x1B[3" + (p < 8 ? p : "8;5;" + p), C = `  ${g};1m${h} \x1B[0m`;
        a[0] = C + a[0].split(`
`).join(`
` + C), a.push(g + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        a[0] = i() + h + " " + a[0];
    }
    function i() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function l(...a) {
      return process.stderr.write(r.formatWithOptions(t.inspectOpts, ...a) + `
`);
    }
    function c(a) {
      a ? process.env.DEBUG = a : delete process.env.DEBUG;
    }
    function d() {
      return process.env.DEBUG;
    }
    function f(a) {
      a.inspectOpts = {};
      const h = Object.keys(t.inspectOpts);
      for (let D = 0; D < h.length; D++)
        a.inspectOpts[h[D]] = t.inspectOpts[h[D]];
    }
    e.exports = kn()(t);
    const { formatters: s } = e.exports;
    s.o = function(a) {
      return this.inspectOpts.colors = this.useColors, r.inspect(a, this.inspectOpts).split(`
`).map((h) => h.trim()).join(" ");
    }, s.O = function(a) {
      return this.inspectOpts.colors = this.useColors, r.inspect(a, this.inspectOpts);
    };
  }(tt, tt.exports)), tt.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? ur.exports = wo() : ur.exports = _o();
var Ao = ur.exports;
Object.defineProperty(Ke, "__esModule", { value: !0 });
var bo = Ao;
function vo(e) {
  return e && typeof e == "object" && "default" in e ? e : { default: e };
}
var Bo = /* @__PURE__ */ vo(bo);
const L = Bo.default("serialport/binding-mock");
let rt = {}, nt = 0;
function ce() {
  return new Promise((e) => process.nextTick(() => e()));
}
class or extends Error {
  constructor(t) {
    super(t), this.canceled = !0;
  }
}
const Oo = {
  reset() {
    rt = {}, nt = 0;
  },
  // Create a mock port
  createPort(e, t = {}) {
    nt++;
    const n = Object.assign({ echo: !1, record: !1, manufacturer: "The J5 Robotics Company", vendorId: void 0, productId: void 0, maxReadSize: 1024 }, t);
    rt[e] = {
      data: Buffer.alloc(0),
      echo: n.echo,
      record: n.record,
      readyData: n.readyData,
      maxReadSize: n.maxReadSize,
      info: {
        path: e,
        manufacturer: n.manufacturer,
        serialNumber: `${nt}`,
        pnpId: void 0,
        locationId: void 0,
        vendorId: n.vendorId,
        productId: n.productId
      }
    }, L(nt, "created port", JSON.stringify({ path: e, opt: t }));
  },
  async list() {
    return L(null, "list"), Object.values(rt).map((e) => e.info);
  },
  async open(e) {
    var t;
    if (!e || typeof e != "object" || Array.isArray(e))
      throw new TypeError('"options" is not an object');
    if (!e.path)
      throw new TypeError('"path" is not a valid port');
    if (!e.baudRate)
      throw new TypeError('"baudRate" is not a valid baudRate');
    const n = Object.assign({ dataBits: 8, lock: !0, stopBits: 1, parity: "none", rtscts: !1, xon: !1, xoff: !1, xany: !1, hupcl: !0 }, e), { path: r } = n;
    L(null, `open: opening path ${r}`);
    const u = rt[r];
    if (await ce(), !u)
      throw new Error(`Port does not exist - please call MockBinding.createPort('${r}') first`);
    const o = u.info.serialNumber;
    if (!((t = u.openOpt) === null || t === void 0) && t.lock)
      throw L(o, "open: Port is locked cannot open"), new Error("Port is locked cannot open");
    return L(o, `open: opened path ${r}`), u.openOpt = Object.assign({}, n), new Rn(u, n);
  }
};
class Rn {
  constructor(t, n) {
    if (this.port = t, this.openOptions = n, this.pendingRead = null, this.isOpen = !0, this.lastWrite = null, this.recording = Buffer.alloc(0), this.writeOperation = null, this.serialNumber = t.info.serialNumber, t.readyData) {
      const r = t.readyData;
      process.nextTick(() => {
        this.isOpen && (L(this.serialNumber, "emitting ready data"), this.emitData(r));
      });
    }
  }
  // Emit data on a mock port
  emitData(t) {
    if (!this.isOpen || !this.port)
      throw new Error("Port must be open to pretend to receive data");
    const n = Buffer.isBuffer(t) ? t : Buffer.from(t);
    L(this.serialNumber, "emitting data - pending read:", !!this.pendingRead), this.port.data = Buffer.concat([this.port.data, n]), this.pendingRead && (process.nextTick(this.pendingRead), this.pendingRead = null);
  }
  async close() {
    if (L(this.serialNumber, "close"), !this.isOpen)
      throw new Error("Port is not open");
    const t = this.port;
    if (!t)
      throw new Error("already closed");
    t.openOpt = void 0, t.data = Buffer.alloc(0), L(this.serialNumber, "port is closed"), this.serialNumber = void 0, this.isOpen = !1, this.pendingRead && this.pendingRead(new or("port is closed"));
  }
  async read(t, n, r) {
    if (!Buffer.isBuffer(t))
      throw new TypeError('"buffer" is not a Buffer');
    if (typeof n != "number" || isNaN(n))
      throw new TypeError(`"offset" is not an integer got "${isNaN(n) ? "NaN" : typeof n}"`);
    if (typeof r != "number" || isNaN(r))
      throw new TypeError(`"length" is not an integer got "${isNaN(r) ? "NaN" : typeof r}"`);
    if (t.length < n + r)
      throw new Error("buffer is too small");
    if (!this.isOpen)
      throw new Error("Port is not open");
    if (L(this.serialNumber, "read", r, "bytes"), await ce(), !this.isOpen || !this.port)
      throw new or("Read canceled");
    if (this.port.data.length <= 0)
      return new Promise((l, c) => {
        this.pendingRead = (d) => {
          if (d)
            return c(d);
          this.read(t, n, r).then(l, c);
        };
      });
    const u = this.port.maxReadSize > r ? r : this.port.maxReadSize, i = this.port.data.slice(0, u).copy(t, n);
    return this.port.data = this.port.data.slice(u), L(this.serialNumber, "read", i, "bytes"), { bytesRead: i, buffer: t };
  }
  async write(t) {
    if (!Buffer.isBuffer(t))
      throw new TypeError('"buffer" is not a Buffer');
    if (!this.isOpen || !this.port)
      throw L("write", "error port is not open"), new Error("Port is not open");
    if (L(this.serialNumber, "write", t.length, "bytes"), this.writeOperation)
      throw new Error("Overlapping writes are not supported and should be queued by the serialport object");
    return this.writeOperation = (async () => {
      if (await ce(), !this.isOpen || !this.port)
        throw new Error("Write canceled");
      const n = this.lastWrite = Buffer.from(t);
      this.port.record && (this.recording = Buffer.concat([this.recording, n])), this.port.echo && process.nextTick(() => {
        this.isOpen && this.emitData(n);
      }), this.writeOperation = null, L(this.serialNumber, "writing finished");
    })(), this.writeOperation;
  }
  async update(t) {
    if (typeof t != "object")
      throw TypeError('"options" is not an object');
    if (typeof t.baudRate != "number")
      throw new TypeError('"options.baudRate" is not a number');
    if (L(this.serialNumber, "update"), !this.isOpen || !this.port)
      throw new Error("Port is not open");
    await ce(), this.port.openOpt && (this.port.openOpt.baudRate = t.baudRate);
  }
  async set(t) {
    if (typeof t != "object")
      throw new TypeError('"options" is not an object');
    if (L(this.serialNumber, "set"), !this.isOpen)
      throw new Error("Port is not open");
    await ce();
  }
  async get() {
    if (L(this.serialNumber, "get"), !this.isOpen)
      throw new Error("Port is not open");
    return await ce(), {
      cts: !0,
      dsr: !1,
      dcd: !1
    };
  }
  async getBaudRate() {
    var t;
    if (L(this.serialNumber, "getBaudRate"), !this.isOpen || !this.port)
      throw new Error("Port is not open");
    if (await ce(), !(!((t = this.port.openOpt) === null || t === void 0) && t.baudRate))
      throw new Error("Internal Error");
    return {
      baudRate: this.port.openOpt.baudRate
    };
  }
  async flush() {
    if (L(this.serialNumber, "flush"), !this.isOpen || !this.port)
      throw new Error("Port is not open");
    await ce(), this.port.data = Buffer.alloc(0);
  }
  async drain() {
    if (L(this.serialNumber, "drain"), !this.isOpen)
      throw new Error("Port is not open");
    await this.writeOperation, await ce();
  }
}
Ke.CanceledError = or;
Ke.MockBinding = Oo;
Ke.MockPortBinding = Rn;
Object.defineProperty(Ot, "__esModule", { value: !0 });
Ot.SerialPortMock = void 0;
const So = be, Jt = Ke;
class ir extends So.SerialPortStream {
  constructor(t, n) {
    const r = {
      binding: Jt.MockBinding,
      ...t
    };
    super(r, n);
  }
}
w(ir, "list", Jt.MockBinding.list), w(ir, "binding", Jt.MockBinding);
Ot.SerialPortMock = ir;
var St = {}, qt = {}, sr = { exports: {} }, ut = { exports: {} }, Wt, Gr;
function Po() {
  if (Gr) return Wt;
  Gr = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, u = r * 7, o = r * 365.25;
  Wt = function(f, s) {
    s = s || {};
    var a = typeof f;
    if (a === "string" && f.length > 0)
      return i(f);
    if (a === "number" && isFinite(f))
      return s.long ? c(f) : l(f);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(f)
    );
  };
  function i(f) {
    if (f = String(f), !(f.length > 100)) {
      var s = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        f
      );
      if (s) {
        var a = parseFloat(s[1]), h = (s[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return a * o;
          case "weeks":
          case "week":
          case "w":
            return a * u;
          case "days":
          case "day":
          case "d":
            return a * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return a * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return a * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return a * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return a;
          default:
            return;
        }
      }
    }
  }
  function l(f) {
    var s = Math.abs(f);
    return s >= r ? Math.round(f / r) + "d" : s >= n ? Math.round(f / n) + "h" : s >= t ? Math.round(f / t) + "m" : s >= e ? Math.round(f / e) + "s" : f + "ms";
  }
  function c(f) {
    var s = Math.abs(f);
    return s >= r ? d(f, s, r, "day") : s >= n ? d(f, s, n, "hour") : s >= t ? d(f, s, t, "minute") : s >= e ? d(f, s, e, "second") : f + " ms";
  }
  function d(f, s, a, h) {
    var D = s >= a * 1.5;
    return Math.round(f / a) + " " + h + (D ? "s" : "");
  }
  return Wt;
}
var Gt, Hr;
function In() {
  if (Hr) return Gt;
  Hr = 1;
  function e(t) {
    r.debug = r, r.default = r, r.coerce = d, r.disable = i, r.enable = o, r.enabled = l, r.humanize = Po(), r.destroy = f, Object.keys(t).forEach((s) => {
      r[s] = t[s];
    }), r.names = [], r.skips = [], r.formatters = {};
    function n(s) {
      let a = 0;
      for (let h = 0; h < s.length; h++)
        a = (a << 5) - a + s.charCodeAt(h), a |= 0;
      return r.colors[Math.abs(a) % r.colors.length];
    }
    r.selectColor = n;
    function r(s) {
      let a, h = null, D, p;
      function g(...C) {
        if (!g.enabled)
          return;
        const F = g, v = Number(/* @__PURE__ */ new Date()), A = v - (a || v);
        F.diff = A, F.prev = a, F.curr = v, a = v, C[0] = r.coerce(C[0]), typeof C[0] != "string" && C.unshift("%O");
        let y = 0;
        C[0] = C[0].replace(/%([a-zA-Z%])/g, (J, ae) => {
          if (J === "%%")
            return "%";
          y++;
          const se = r.formatters[ae];
          if (typeof se == "function") {
            const Fe = C[y];
            J = se.call(F, Fe), C.splice(y, 1), y--;
          }
          return J;
        }), r.formatArgs.call(F, C), (F.log || r.log).apply(F, C);
      }
      return g.namespace = s, g.useColors = r.useColors(), g.color = r.selectColor(s), g.extend = u, g.destroy = r.destroy, Object.defineProperty(g, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => h !== null ? h : (D !== r.namespaces && (D = r.namespaces, p = r.enabled(s)), p),
        set: (C) => {
          h = C;
        }
      }), typeof r.init == "function" && r.init(g), g;
    }
    function u(s, a) {
      const h = r(this.namespace + (typeof a > "u" ? ":" : a) + s);
      return h.log = this.log, h;
    }
    function o(s) {
      r.save(s), r.namespaces = s, r.names = [], r.skips = [];
      let a;
      const h = (typeof s == "string" ? s : "").split(/[\s,]+/), D = h.length;
      for (a = 0; a < D; a++)
        h[a] && (s = h[a].replace(/\*/g, ".*?"), s[0] === "-" ? r.skips.push(new RegExp("^" + s.slice(1) + "$")) : r.names.push(new RegExp("^" + s + "$")));
    }
    function i() {
      const s = [
        ...r.names.map(c),
        ...r.skips.map(c).map((a) => "-" + a)
      ].join(",");
      return r.enable(""), s;
    }
    function l(s) {
      if (s[s.length - 1] === "*")
        return !0;
      let a, h;
      for (a = 0, h = r.skips.length; a < h; a++)
        if (r.skips[a].test(s))
          return !1;
      for (a = 0, h = r.names.length; a < h; a++)
        if (r.names[a].test(s))
          return !0;
      return !1;
    }
    function c(s) {
      return s.toString().substring(2, s.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function d(s) {
      return s instanceof Error ? s.stack || s.message : s;
    }
    function f() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  return Gt = e, Gt;
}
var Kr;
function No() {
  return Kr || (Kr = 1, function(e, t) {
    t.formatArgs = r, t.save = u, t.load = o, t.useColors = n, t.storage = i(), t.destroy = /* @__PURE__ */ (() => {
      let c = !1;
      return () => {
        c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function n() {
      return typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs) ? !0 : typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/) ? !1 : typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function r(c) {
      if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const d = "color: " + this.color;
      c.splice(1, 0, d, "color: inherit");
      let f = 0, s = 0;
      c[0].replace(/%[a-zA-Z%]/g, (a) => {
        a !== "%%" && (f++, a === "%c" && (s = f));
      }), c.splice(s, 0, d);
    }
    t.log = console.debug || console.log || (() => {
    });
    function u(c) {
      try {
        c ? t.storage.setItem("debug", c) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let c;
      try {
        c = t.storage.getItem("debug");
      } catch {
      }
      return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
    }
    function i() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = In()(t);
    const { formatters: l } = e.exports;
    l.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (d) {
        return "[UnexpectedJSONParseError]: " + d.message;
      }
    };
  }(ut, ut.exports)), ut.exports;
}
var ot = { exports: {} }, Yr;
function zo() {
  return Yr || (Yr = 1, function(e, t) {
    const n = mt, r = Ie;
    t.init = f, t.log = l, t.formatArgs = o, t.save = c, t.load = d, t.useColors = u, t.destroy = r.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const a = yr();
      a && (a.stderr || a).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((a) => /^debug_/i.test(a)).reduce((a, h) => {
      const D = h.substring(6).toLowerCase().replace(/_([a-z])/g, (g, C) => C.toUpperCase());
      let p = process.env[h];
      return /^(yes|on|true|enabled)$/i.test(p) ? p = !0 : /^(no|off|false|disabled)$/i.test(p) ? p = !1 : p === "null" ? p = null : p = Number(p), a[D] = p, a;
    }, {});
    function u() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function o(a) {
      const { namespace: h, useColors: D } = this;
      if (D) {
        const p = this.color, g = "\x1B[3" + (p < 8 ? p : "8;5;" + p), C = `  ${g};1m${h} \x1B[0m`;
        a[0] = C + a[0].split(`
`).join(`
` + C), a.push(g + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        a[0] = i() + h + " " + a[0];
    }
    function i() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function l(...a) {
      return process.stderr.write(r.format(...a) + `
`);
    }
    function c(a) {
      a ? process.env.DEBUG = a : delete process.env.DEBUG;
    }
    function d() {
      return process.env.DEBUG;
    }
    function f(a) {
      a.inspectOpts = {};
      const h = Object.keys(t.inspectOpts);
      for (let D = 0; D < h.length; D++)
        a.inspectOpts[h[D]] = t.inspectOpts[h[D]];
    }
    e.exports = In()(t);
    const { formatters: s } = e.exports;
    s.o = function(a) {
      return this.inspectOpts.colors = this.useColors, r.inspect(a, this.inspectOpts).split(`
`).map((h) => h.trim()).join(" ");
    }, s.O = function(a) {
      return this.inspectOpts.colors = this.useColors, r.inspect(a, this.inspectOpts);
    };
  }(ot, ot.exports)), ot.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? sr.exports = No() : sr.exports = zo();
var Pe = sr.exports, ve = {}, R = {}, ar = { exports: {} };
function To(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var Ht, Xr;
function ko() {
  if (Xr) return Ht;
  Xr = 1;
  var e = de, t = Je, n = vn, r = typeof __webpack_require__ == "function" ? __non_webpack_require__ : To, u = process.config && process.config.variables || {}, o = !!process.env.PREBUILDS_ONLY, i = process.versions.modules, l = se() ? "electron" : ae() ? "node-webkit" : "node", c = process.env.npm_config_arch || n.arch(), d = process.env.npm_config_platform || n.platform(), f = process.env.LIBC || (Fe(d) ? "musl" : "glibc"), s = process.env.ARM_VERSION || (c === "arm64" ? "8" : u.arm_version) || "", a = (process.versions.uv || "").split(".")[0];
  Ht = h;
  function h(O) {
    return r(h.resolve(O));
  }
  h.resolve = h.path = function(O) {
    O = t.resolve(O || ".");
    try {
      var k = r(t.join(O, "package.json")).name.toUpperCase().replace(/-/g, "_");
      process.env[k + "_PREBUILD"] && (O = process.env[k + "_PREBUILD"]);
    } catch {
    }
    if (!o) {
      var P = p(t.join(O, "build/Release"), g);
      if (P) return P;
      var H = p(t.join(O, "build/Debug"), g);
      if (H) return H;
    }
    var ze = Tr(O);
    if (ze) return ze;
    var W = Tr(t.dirname(process.execPath));
    if (W) return W;
    var Cu = [
      "platform=" + d,
      "arch=" + c,
      "runtime=" + l,
      "abi=" + i,
      "uv=" + a,
      s ? "armv=" + s : "",
      "libc=" + f,
      "node=" + process.versions.node,
      process.versions.electron ? "electron=" + process.versions.electron : "",
      typeof __webpack_require__ == "function" ? "webpack=true" : ""
      // eslint-disable-line
    ].filter(Boolean).join(" ");
    throw new Error("No native build was found for " + Cu + `
    loaded from: ` + O + `
`);
    function Tr($t) {
      var gu = D(t.join($t, "prebuilds")).map(C), kr = gu.filter(F(d, c)).sort(v)[0];
      if (kr) {
        var Rr = t.join($t, "prebuilds", kr.name), Eu = D(Rr).map(A), Fu = Eu.filter(y(l, i)), Ir = Fu.sort(J(l))[0];
        if (Ir) return t.join(Rr, Ir.file);
      }
    }
  };
  function D(O) {
    try {
      return e.readdirSync(O);
    } catch {
      return [];
    }
  }
  function p(O, k) {
    var P = D(O).filter(k);
    return P[0] && t.join(O, P[0]);
  }
  function g(O) {
    return /\.node$/.test(O);
  }
  function C(O) {
    var k = O.split("-");
    if (k.length === 2) {
      var P = k[0], H = k[1].split("+");
      if (P && H.length && H.every(Boolean))
        return { name: O, platform: P, architectures: H };
    }
  }
  function F(O, k) {
    return function(P) {
      return P == null || P.platform !== O ? !1 : P.architectures.includes(k);
    };
  }
  function v(O, k) {
    return O.architectures.length - k.architectures.length;
  }
  function A(O) {
    var k = O.split("."), P = k.pop(), H = { file: O, specificity: 0 };
    if (P === "node") {
      for (var ze = 0; ze < k.length; ze++) {
        var W = k[ze];
        if (W === "node" || W === "electron" || W === "node-webkit")
          H.runtime = W;
        else if (W === "napi")
          H.napi = !0;
        else if (W.slice(0, 3) === "abi")
          H.abi = W.slice(3);
        else if (W.slice(0, 2) === "uv")
          H.uv = W.slice(2);
        else if (W.slice(0, 4) === "armv")
          H.armv = W.slice(4);
        else if (W === "glibc" || W === "musl")
          H.libc = W;
        else
          continue;
        H.specificity++;
      }
      return H;
    }
  }
  function y(O, k) {
    return function(P) {
      return !(P == null || P.runtime !== O && !$(P) || P.abi !== k && !P.napi || P.uv && P.uv !== a || P.armv && P.armv !== s || P.libc && P.libc !== f);
    };
  }
  function $(O) {
    return O.runtime === "node" && O.napi;
  }
  function J(O) {
    return function(k, P) {
      return k.runtime !== P.runtime ? k.runtime === O ? -1 : 1 : k.abi !== P.abi ? k.abi ? -1 : 1 : k.specificity !== P.specificity ? k.specificity > P.specificity ? -1 : 1 : 0;
    };
  }
  function ae() {
    return !!(process.versions && process.versions.nw);
  }
  function se() {
    return process.versions && process.versions.electron || process.env.ELECTRON_RUN_AS_NODE ? !0 : typeof window < "u" && window.process && window.process.type === "renderer";
  }
  function Fe(O) {
    return O === "linux" && e.existsSync("/etc/alpine-release");
  }
  return h.parseTags = A, h.matchTags = y, h.compareTags = J, h.parseTuple = C, h.matchTuple = F, h.compareTuples = v, Ht;
}
typeof process.addon == "function" ? ar.exports = process.addon.bind(process) : ar.exports = ko();
var jn = ar.exports, Ro = N && N.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(R, "__esModule", { value: !0 });
R.asyncWrite = R.asyncRead = R.asyncUpdate = R.asyncSet = R.asyncOpen = R.asyncList = R.asyncGetBaudRate = R.asyncGet = R.asyncFlush = R.asyncDrain = R.asyncClose = void 0;
const Io = Ro(jn), ie = Ie, jo = Je, x = (0, Io.default)((0, jo.join)(__dirname, "../"));
R.asyncClose = x.close ? (0, ie.promisify)(x.close) : async () => {
  throw new Error('"binding.close" Method not implemented');
};
R.asyncDrain = x.drain ? (0, ie.promisify)(x.drain) : async () => {
  throw new Error('"binding.drain" Method not implemented');
};
R.asyncFlush = x.flush ? (0, ie.promisify)(x.flush) : async () => {
  throw new Error('"binding.flush" Method not implemented');
};
R.asyncGet = x.get ? (0, ie.promisify)(x.get) : async () => {
  throw new Error('"binding.get" Method not implemented');
};
R.asyncGetBaudRate = x.getBaudRate ? (0, ie.promisify)(x.getBaudRate) : async () => {
  throw new Error('"binding.getBaudRate" Method not implemented');
};
R.asyncList = x.list ? (0, ie.promisify)(x.list) : async () => {
  throw new Error('"binding.list" Method not implemented');
};
R.asyncOpen = x.open ? (0, ie.promisify)(x.open) : async () => {
  throw new Error('"binding.open" Method not implemented');
};
R.asyncSet = x.set ? (0, ie.promisify)(x.set) : async () => {
  throw new Error('"binding.set" Method not implemented');
};
R.asyncUpdate = x.update ? (0, ie.promisify)(x.update) : async () => {
  throw new Error('"binding.update" Method not implemented');
};
R.asyncRead = x.read ? (0, ie.promisify)(x.read) : async () => {
  throw new Error('"binding.read" Method not implemented');
};
R.asyncWrite = x.write ? (0, ie.promisify)(x.write) : async () => {
  throw new Error('"binding.write" Method not implemented');
};
var wr = {}, je = {};
Object.defineProperty(je, "__esModule", { value: !0 });
je.BindingsError = void 0;
class $o extends Error {
  constructor(t, { canceled: n = !1 } = {}) {
    super(t), this.canceled = n;
  }
}
je.BindingsError = $o;
(function(e) {
  var t = N && N.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.Poller = e.EVENTS = void 0;
  const n = t(Pe), r = Au, u = Je, o = t(jn), i = je, { Poller: l } = (0, o.default)((0, u.join)(__dirname, "../")), c = (0, n.default)("serialport/bindings-cpp/poller");
  e.EVENTS = {
    UV_READABLE: 1,
    UV_WRITABLE: 2,
    UV_DISCONNECT: 4
  };
  function d(s, a) {
    if (s) {
      c("error", s), this.emit("readable", s), this.emit("writable", s), this.emit("disconnect", s);
      return;
    }
    a & e.EVENTS.UV_READABLE && (c('received "readable"'), this.emit("readable", null)), a & e.EVENTS.UV_WRITABLE && (c('received "writable"'), this.emit("writable", null)), a & e.EVENTS.UV_DISCONNECT && (c('received "disconnect"'), this.emit("disconnect", null));
  }
  class f extends r.EventEmitter {
    constructor(a, h = l) {
      c("Creating poller"), super(), this.poller = new h(a, d.bind(this));
    }
    /**
     * Wait for the next event to occur
     * @param {string} event ('readable'|'writable'|'disconnect')
     * @returns {Poller} returns itself
     */
    once(a, h) {
      switch (a) {
        case "readable":
          this.poll(e.EVENTS.UV_READABLE);
          break;
        case "writable":
          this.poll(e.EVENTS.UV_WRITABLE);
          break;
        case "disconnect":
          this.poll(e.EVENTS.UV_DISCONNECT);
          break;
      }
      return super.once(a, h);
    }
    /**
     * Ask the bindings to listen for an event, it is recommend to use `.once()` for easy use
     * @param {EVENTS} eventFlag polls for an event or group of events based upon a flag.
     */
    poll(a = 0) {
      a & e.EVENTS.UV_READABLE && c('Polling for "readable"'), a & e.EVENTS.UV_WRITABLE && c('Polling for "writable"'), a & e.EVENTS.UV_DISCONNECT && c('Polling for "disconnect"'), this.poller.poll(a);
    }
    /**
     * Stop listening for events and cancel all outstanding listening with an error
     */
    stop() {
      c("Stopping poller"), this.poller.stop(), this.emitCanceled();
    }
    destroy() {
      c("Destroying poller"), this.poller.destroy(), this.emitCanceled();
    }
    emitCanceled() {
      const a = new i.BindingsError("Canceled", { canceled: !0 });
      this.emit("readable", a), this.emit("writable", a), this.emit("disconnect", a);
    }
  }
  e.Poller = f;
})(wr);
var _r = {};
(function(e) {
  var t = N && N.__importDefault || function(f) {
    return f && f.__esModule ? f : { default: f };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.unixRead = void 0;
  const n = Ie, r = de, u = je, i = (0, t(Pe).default)("serialport/bindings-cpp/unixRead"), l = (0, n.promisify)(r.read), c = (f) => new Promise((s, a) => {
    if (!f.poller)
      throw new Error("No poller on bindings");
    f.poller.once("readable", (h) => h ? a(h) : s());
  }), d = async ({ binding: f, buffer: s, offset: a, length: h, fsReadAsync: D = l }) => {
    if (i("Starting read"), !f.isOpen || !f.fd)
      throw new u.BindingsError("Port is not open", { canceled: !0 });
    try {
      const { bytesRead: p } = await D(f.fd, s, a, h, null);
      return p === 0 ? (0, e.unixRead)({ binding: f, buffer: s, offset: a, length: h, fsReadAsync: D }) : (i("Finished read", p, "bytes"), { bytesRead: p, buffer: s });
    } catch (p) {
      if (i("read error", p), p.code === "EAGAIN" || p.code === "EWOULDBLOCK" || p.code === "EINTR") {
        if (!f.isOpen)
          throw new u.BindingsError("Port is not open", { canceled: !0 });
        return i("waiting for readable because of code:", p.code), await c(f), (0, e.unixRead)({ binding: f, buffer: s, offset: a, length: h, fsReadAsync: D });
      }
      throw (p.code === "EBADF" || // Bad file number means we got closed
      p.code === "ENXIO" || // No such device or address probably usb disconnect
      p.code === "UNKNOWN" || p.errno === -1) && (p.disconnect = !0, i("disconnecting", p)), p;
    }
  };
  e.unixRead = d;
})(_r);
var Ar = {};
(function(e) {
  var t = N && N.__importDefault || function(d) {
    return d && d.__esModule ? d : { default: d };
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.unixWrite = void 0;
  const n = de, r = t(Pe), u = Ie, o = (0, r.default)("serialport/bindings-cpp/unixWrite"), i = (0, u.promisify)(n.write), l = (d) => new Promise((f, s) => {
    d.poller.once("writable", (a) => a ? s(a) : f());
  }), c = async ({ binding: d, buffer: f, offset: s = 0, fsWriteAsync: a = i }) => {
    const h = f.length - s;
    if (o("Starting write", f.length, "bytes offset", s, "bytesToWrite", h), !d.isOpen || !d.fd)
      throw new Error("Port is not open");
    try {
      const { bytesWritten: D } = await a(d.fd, f, s, h);
      if (o("write returned: wrote", D, "bytes"), D + s < f.length) {
        if (!d.isOpen)
          throw new Error("Port is not open");
        return (0, e.unixWrite)({ binding: d, buffer: f, offset: D + s, fsWriteAsync: a });
      }
      o("Finished writing", D + s, "bytes");
    } catch (D) {
      if (o("write errored", D), D.code === "EAGAIN" || D.code === "EWOULDBLOCK" || D.code === "EINTR") {
        if (!d.isOpen)
          throw new Error("Port is not open");
        return o("waiting for writable because of code:", D.code), await l(d), (0, e.unixWrite)({ binding: d, buffer: f, offset: s, fsWriteAsync: a });
      }
      throw (D.code === "EBADF" || // Bad file number means we got closed
      D.code === "ENXIO" || // No such device or address probably usb disconnect
      D.code === "UNKNOWN" || D.errno === -1) && (D.disconnect = !0, o("disconnecting", D)), o("error", D), D;
    }
  };
  e.unixWrite = c;
})(Ar);
var xo = N && N.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(ve, "__esModule", { value: !0 });
ve.DarwinPortBinding = ve.DarwinBinding = void 0;
const Mo = xo(Pe), me = R, Lo = wr, Zo = _r, Uo = Ar, Q = (0, Mo.default)("serialport/bindings-cpp");
ve.DarwinBinding = {
  list() {
    return Q("list"), (0, me.asyncList)();
  },
  async open(e) {
    if (!e || typeof e != "object" || Array.isArray(e))
      throw new TypeError('"options" is not an object');
    if (!e.path)
      throw new TypeError('"path" is not a valid port');
    if (!e.baudRate)
      throw new TypeError('"baudRate" is not a valid baudRate');
    Q("open");
    const t = Object.assign({ vmin: 1, vtime: 0, dataBits: 8, lock: !0, stopBits: 1, parity: "none", rtscts: !1, xon: !1, xoff: !1, xany: !1, hupcl: !0 }, e), n = await (0, me.asyncOpen)(t.path, t);
    return new $n(n, t);
  }
};
class $n {
  constructor(t, n) {
    this.fd = t, this.openOptions = n, this.poller = new Lo.Poller(t), this.writeOperation = null;
  }
  get isOpen() {
    return this.fd !== null;
  }
  async close() {
    if (Q("close"), !this.isOpen)
      throw new Error("Port is not open");
    const t = this.fd;
    this.poller.stop(), this.poller.destroy(), this.fd = null, await (0, me.asyncClose)(t);
  }
  async read(t, n, r) {
    if (!Buffer.isBuffer(t))
      throw new TypeError('"buffer" is not a Buffer');
    if (typeof n != "number" || isNaN(n))
      throw new TypeError(`"offset" is not an integer got "${isNaN(n) ? "NaN" : typeof n}"`);
    if (typeof r != "number" || isNaN(r))
      throw new TypeError(`"length" is not an integer got "${isNaN(r) ? "NaN" : typeof r}"`);
    if (Q("read"), t.length < n + r)
      throw new Error("buffer is too small");
    if (!this.isOpen)
      throw new Error("Port is not open");
    return (0, Zo.unixRead)({ binding: this, buffer: t, offset: n, length: r });
  }
  async write(t) {
    if (!Buffer.isBuffer(t))
      throw new TypeError('"buffer" is not a Buffer');
    if (Q("write", t.length, "bytes"), !this.isOpen)
      throw Q("write", "error port is not open"), new Error("Port is not open");
    return this.writeOperation = (async () => {
      t.length !== 0 && (await (0, Uo.unixWrite)({ binding: this, buffer: t }), this.writeOperation = null);
    })(), this.writeOperation;
  }
  async update(t) {
    if (!t || typeof t != "object" || Array.isArray(t))
      throw TypeError('"options" is not an object');
    if (typeof t.baudRate != "number")
      throw new TypeError('"options.baudRate" is not a number');
    if (Q("update"), !this.isOpen)
      throw new Error("Port is not open");
    await (0, me.asyncUpdate)(this.fd, t);
  }
  async set(t) {
    if (!t || typeof t != "object" || Array.isArray(t))
      throw new TypeError('"options" is not an object');
    if (Q("set", t), !this.isOpen)
      throw new Error("Port is not open");
    await (0, me.asyncSet)(this.fd, t);
  }
  async get() {
    if (Q("get"), !this.isOpen)
      throw new Error("Port is not open");
    return (0, me.asyncGet)(this.fd);
  }
  async getBaudRate() {
    throw Q("getBaudRate"), this.isOpen ? new Error("getBaudRate is not implemented on darwin") : new Error("Port is not open");
  }
  async flush() {
    if (Q("flush"), !this.isOpen)
      throw new Error("Port is not open");
    await (0, me.asyncFlush)(this.fd);
  }
  async drain() {
    if (Q("drain"), !this.isOpen)
      throw new Error("Port is not open");
    await this.writeOperation, await (0, me.asyncDrain)(this.fd);
  }
}
ve.DarwinPortBinding = $n;
var Be = {}, Pt = {}, Nt = {}, zt = {};
Object.defineProperty(zt, "__esModule", { value: !0 });
zt.DelimiterParser = void 0;
const Vo = re;
class Jo extends Vo.Transform {
  constructor({ delimiter: t, includeDelimiter: n = !1, ...r }) {
    if (super(r), t === void 0)
      throw new TypeError('"delimiter" is not a bufferable object');
    if (t.length === 0)
      throw new TypeError('"delimiter" has a 0 or undefined length');
    this.includeDelimiter = n, this.delimiter = Buffer.from(t), this.buffer = Buffer.alloc(0);
  }
  _transform(t, n, r) {
    let u = Buffer.concat([this.buffer, t]), o;
    for (; (o = u.indexOf(this.delimiter)) !== -1; )
      this.push(u.slice(0, o + (this.includeDelimiter ? this.delimiter.length : 0))), u = u.slice(o + this.delimiter.length);
    this.buffer = u, r();
  }
  _flush(t) {
    this.push(this.buffer), this.buffer = Buffer.alloc(0), t();
  }
}
zt.DelimiterParser = Jo;
Object.defineProperty(Nt, "__esModule", { value: !0 });
Nt.ReadlineParser = void 0;
const qo = zt;
class Wo extends qo.DelimiterParser {
  constructor(t) {
    const n = {
      delimiter: Buffer.from(`
`, "utf8"),
      encoding: "utf8",
      ...t
    };
    typeof n.delimiter == "string" && (n.delimiter = Buffer.from(n.delimiter, n.encoding)), super(n);
  }
}
Nt.ReadlineParser = Wo;
Object.defineProperty(Pt, "__esModule", { value: !0 });
Pt.linuxList = void 0;
const Go = bu, Ho = Nt;
function Ko(e) {
  return /(tty(S|WCH|ACM|USB|AMA|MFD|O|XRUSB)|rfcomm)/.test(e) && e;
}
function Yo(e) {
  return {
    DEVNAME: "path",
    ID_VENDOR_ENC: "manufacturer",
    ID_SERIAL_SHORT: "serialNumber",
    ID_VENDOR_ID: "vendorId",
    ID_MODEL_ID: "productId",
    DEVLINKS: "pnpId",
    /**
    * Workaround for systemd defect
    * see https://github.com/serialport/bindings-cpp/issues/115
    */
    ID_USB_VENDOR_ENC: "manufacturer",
    ID_USB_SERIAL_SHORT: "serialNumber",
    ID_USB_VENDOR_ID: "vendorId",
    ID_USB_MODEL_ID: "productId"
    // End of workaround
  }[e.toUpperCase()];
}
function Xo(e) {
  return e.replace(/\\x([a-fA-F0-9]{2})/g, (t, n) => String.fromCharCode(parseInt(n, 16)));
}
function Qo(e, t) {
  if (e === "pnpId") {
    const n = t.match(/\/by-id\/([^\s]+)/);
    return (n == null ? void 0 : n[1]) || void 0;
  }
  return e === "manufacturer" ? Xo(t) : /^0x/.test(t) ? t.substr(2) : t;
}
function ei(e = Go.spawn) {
  const t = [], n = e("udevadm", ["info", "-e"]), r = n.stdout.pipe(new Ho.ReadlineParser());
  let u = !1, o = {
    path: "",
    manufacturer: void 0,
    serialNumber: void 0,
    pnpId: void 0,
    locationId: void 0,
    vendorId: void 0,
    productId: void 0
  };
  return r.on("data", (i) => {
    const l = i.slice(0, 1), c = i.slice(3);
    if (l === "P") {
      o = {
        path: "",
        manufacturer: void 0,
        serialNumber: void 0,
        pnpId: void 0,
        locationId: void 0,
        vendorId: void 0,
        productId: void 0
      }, u = !1;
      return;
    }
    if (!u) {
      if (l === "N") {
        Ko(c) ? t.push(o) : u = !0;
        return;
      }
      if (l === "E") {
        const d = c.match(/^(.+)=(.*)/);
        if (!d)
          return;
        const f = Yo(d[1]);
        if (!f)
          return;
        o[f] = Qo(f, d[2]);
      }
    }
  }), new Promise((i, l) => {
    n.on("close", (c) => {
      c && l(new Error(`Error listing ports udevadm exited with error code: ${c}`));
    }), n.on("error", l), r.on("error", l), r.on("finish", () => i(t));
  });
}
Pt.linuxList = ei;
var ti = N && N.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(Be, "__esModule", { value: !0 });
Be.LinuxPortBinding = Be.LinuxBinding = void 0;
const ri = ti(Pe), ni = Pt, ui = wr, oi = _r, ii = Ar, pe = R, ee = (0, ri.default)("serialport/bindings-cpp");
Be.LinuxBinding = {
  list() {
    return ee("list"), (0, ni.linuxList)();
  },
  async open(e) {
    if (!e || typeof e != "object" || Array.isArray(e))
      throw new TypeError('"options" is not an object');
    if (!e.path)
      throw new TypeError('"path" is not a valid port');
    if (!e.baudRate)
      throw new TypeError('"baudRate" is not a valid baudRate');
    ee("open");
    const t = Object.assign({ vmin: 1, vtime: 0, dataBits: 8, lock: !0, stopBits: 1, parity: "none", rtscts: !1, xon: !1, xoff: !1, xany: !1, hupcl: !0 }, e), n = await (0, pe.asyncOpen)(t.path, t);
    return this.fd = n, new xn(n, t);
  }
};
class xn {
  constructor(t, n) {
    this.fd = t, this.openOptions = n, this.poller = new ui.Poller(t), this.writeOperation = null;
  }
  get isOpen() {
    return this.fd !== null;
  }
  async close() {
    if (ee("close"), !this.isOpen)
      throw new Error("Port is not open");
    const t = this.fd;
    this.poller.stop(), this.poller.destroy(), this.fd = null, await (0, pe.asyncClose)(t);
  }
  async read(t, n, r) {
    if (!Buffer.isBuffer(t))
      throw new TypeError('"buffer" is not a Buffer');
    if (typeof n != "number" || isNaN(n))
      throw new TypeError(`"offset" is not an integer got "${isNaN(n) ? "NaN" : typeof n}"`);
    if (typeof r != "number" || isNaN(r))
      throw new TypeError(`"length" is not an integer got "${isNaN(r) ? "NaN" : typeof r}"`);
    if (ee("read"), t.length < n + r)
      throw new Error("buffer is too small");
    if (!this.isOpen)
      throw new Error("Port is not open");
    return (0, oi.unixRead)({ binding: this, buffer: t, offset: n, length: r });
  }
  async write(t) {
    if (!Buffer.isBuffer(t))
      throw new TypeError('"buffer" is not a Buffer');
    if (ee("write", t.length, "bytes"), !this.isOpen)
      throw ee("write", "error port is not open"), new Error("Port is not open");
    return this.writeOperation = (async () => {
      t.length !== 0 && (await (0, ii.unixWrite)({ binding: this, buffer: t }), this.writeOperation = null);
    })(), this.writeOperation;
  }
  async update(t) {
    if (!t || typeof t != "object" || Array.isArray(t))
      throw TypeError('"options" is not an object');
    if (typeof t.baudRate != "number")
      throw new TypeError('"options.baudRate" is not a number');
    if (ee("update"), !this.isOpen)
      throw new Error("Port is not open");
    await (0, pe.asyncUpdate)(this.fd, t);
  }
  async set(t) {
    if (!t || typeof t != "object" || Array.isArray(t))
      throw new TypeError('"options" is not an object');
    if (ee("set"), !this.isOpen)
      throw new Error("Port is not open");
    await (0, pe.asyncSet)(this.fd, t);
  }
  async get() {
    if (ee("get"), !this.isOpen)
      throw new Error("Port is not open");
    return (0, pe.asyncGet)(this.fd);
  }
  async getBaudRate() {
    if (ee("getBaudRate"), !this.isOpen)
      throw new Error("Port is not open");
    return (0, pe.asyncGetBaudRate)(this.fd);
  }
  async flush() {
    if (ee("flush"), !this.isOpen)
      throw new Error("Port is not open");
    await (0, pe.asyncFlush)(this.fd);
  }
  async drain() {
    if (ee("drain"), !this.isOpen)
      throw new Error("Port is not open");
    await this.writeOperation, await (0, pe.asyncDrain)(this.fd);
  }
}
Be.LinuxPortBinding = xn;
var ye = {}, Tt = {};
Object.defineProperty(Tt, "__esModule", { value: !0 });
Tt.serialNumParser = void 0;
const si = [/USB\\(?:.+)\\(.+)/, /FTDIBUS\\(?:.+)\+(.+?)A?\\.+/], ai = (e) => {
  if (!e)
    return null;
  for (const t of si) {
    const n = e.match(t);
    if (n)
      return n[1];
  }
  return null;
};
Tt.serialNumParser = ai;
var Qr;
function en() {
  if (Qr) return ye;
  Qr = 1;
  var e = N && N.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(ye, "__esModule", { value: !0 }), ye.WindowsPortBinding = ye.WindowsBinding = void 0;
  const t = e(Pe), n = Mn(), r = R, u = Tt, o = (0, t.default)("serialport/bindings-cpp");
  ye.WindowsBinding = {
    async list() {
      return (await (0, r.asyncList)()).map((c) => {
        if (c.pnpId && !c.serialNumber) {
          const d = (0, u.serialNumParser)(c.pnpId);
          if (d)
            return Object.assign(Object.assign({}, c), { serialNumber: d });
        }
        return c;
      });
    },
    async open(l) {
      if (!l || typeof l != "object" || Array.isArray(l))
        throw new TypeError('"options" is not an object');
      if (!l.path)
        throw new TypeError('"path" is not a valid port');
      if (!l.baudRate)
        throw new TypeError('"baudRate" is not a valid baudRate');
      o("open");
      const c = Object.assign({ dataBits: 8, lock: !0, stopBits: 1, parity: "none", rtscts: !1, rtsMode: "handshake", xon: !1, xoff: !1, xany: !1, hupcl: !0 }, l), d = await (0, r.asyncOpen)(c.path, c);
      return new i(d, c);
    }
  };
  class i {
    constructor(c, d) {
      this.fd = c, this.openOptions = d, this.writeOperation = null;
    }
    get isOpen() {
      return this.fd !== null;
    }
    async close() {
      if (o("close"), !this.isOpen)
        throw new Error("Port is not open");
      const c = this.fd;
      this.fd = null, await (0, r.asyncClose)(c);
    }
    async read(c, d, f) {
      if (!Buffer.isBuffer(c))
        throw new TypeError('"buffer" is not a Buffer');
      if (typeof d != "number" || isNaN(d))
        throw new TypeError(`"offset" is not an integer got "${isNaN(d) ? "NaN" : typeof d}"`);
      if (typeof f != "number" || isNaN(f))
        throw new TypeError(`"length" is not an integer got "${isNaN(f) ? "NaN" : typeof f}"`);
      if (o("read"), c.length < d + f)
        throw new Error("buffer is too small");
      if (!this.isOpen)
        throw new Error("Port is not open");
      try {
        return { bytesRead: await (0, r.asyncRead)(this.fd, c, d, f), buffer: c };
      } catch (s) {
        throw this.isOpen ? s : new n.BindingsError(s.message, { canceled: !0 });
      }
    }
    async write(c) {
      if (!Buffer.isBuffer(c))
        throw new TypeError('"buffer" is not a Buffer');
      if (o("write", c.length, "bytes"), !this.isOpen)
        throw o("write", "error port is not open"), new Error("Port is not open");
      return this.writeOperation = (async () => {
        c.length !== 0 && (await (0, r.asyncWrite)(this.fd, c), this.writeOperation = null);
      })(), this.writeOperation;
    }
    async update(c) {
      if (!c || typeof c != "object" || Array.isArray(c))
        throw TypeError('"options" is not an object');
      if (typeof c.baudRate != "number")
        throw new TypeError('"options.baudRate" is not a number');
      if (o("update"), !this.isOpen)
        throw new Error("Port is not open");
      await (0, r.asyncUpdate)(this.fd, c);
    }
    async set(c) {
      if (!c || typeof c != "object" || Array.isArray(c))
        throw new TypeError('"options" is not an object');
      if (o("set", c), !this.isOpen)
        throw new Error("Port is not open");
      await (0, r.asyncSet)(this.fd, c);
    }
    async get() {
      if (o("get"), !this.isOpen)
        throw new Error("Port is not open");
      return (0, r.asyncGet)(this.fd);
    }
    async getBaudRate() {
      if (o("getBaudRate"), !this.isOpen)
        throw new Error("Port is not open");
      return (0, r.asyncGetBaudRate)(this.fd);
    }
    async flush() {
      if (o("flush"), !this.isOpen)
        throw new Error("Port is not open");
      await (0, r.asyncFlush)(this.fd);
    }
    async drain() {
      if (o("drain"), !this.isOpen)
        throw new Error("Port is not open");
      await this.writeOperation, await (0, r.asyncDrain)(this.fd);
    }
  }
  return ye.WindowsPortBinding = i, ye;
}
var ci = {}, tn;
function Mn() {
  return tn || (tn = 1, function(e) {
    var t = N && N.__createBinding || (Object.create ? function(f, s, a, h) {
      h === void 0 && (h = a);
      var D = Object.getOwnPropertyDescriptor(s, a);
      (!D || ("get" in D ? !s.__esModule : D.writable || D.configurable)) && (D = { enumerable: !0, get: function() {
        return s[a];
      } }), Object.defineProperty(f, h, D);
    } : function(f, s, a, h) {
      h === void 0 && (h = a), f[h] = s[a];
    }), n = N && N.__exportStar || function(f, s) {
      for (var a in f) a !== "default" && !Object.prototype.hasOwnProperty.call(s, a) && t(s, f, a);
    }, r = N && N.__importDefault || function(f) {
      return f && f.__esModule ? f : { default: f };
    };
    Object.defineProperty(e, "__esModule", { value: !0 }), e.autoDetect = void 0;
    const u = r(Pe), o = ve, i = Be, l = en(), c = (0, u.default)("serialport/bindings-cpp");
    n(ci, e), n(ve, e), n(Be, e), n(en(), e), n(je, e);
    function d() {
      switch (process.platform) {
        case "win32":
          return c("loading WindowsBinding"), l.WindowsBinding;
        case "darwin":
          return c("loading DarwinBinding"), o.DarwinBinding;
        default:
          return c("loading LinuxBinding"), i.LinuxBinding;
      }
    }
    e.autoDetect = d;
  }(qt)), qt;
}
Object.defineProperty(St, "__esModule", { value: !0 });
St.SerialPort = void 0;
const li = be, fi = Mn(), Kt = (0, fi.autoDetect)();
class cr extends li.SerialPortStream {
  constructor(t, n) {
    const r = {
      binding: Kt,
      ...t
    };
    super(r, n);
  }
}
w(cr, "list", Kt.list), w(cr, "binding", Kt);
St.SerialPort = cr;
(function(e) {
  var t = N && N.__createBinding || (Object.create ? function(r, u, o, i) {
    i === void 0 && (i = o);
    var l = Object.getOwnPropertyDescriptor(u, o);
    (!l || ("get" in l ? !u.__esModule : l.writable || l.configurable)) && (l = { enumerable: !0, get: function() {
      return u[o];
    } }), Object.defineProperty(r, i, l);
  } : function(r, u, o, i) {
    i === void 0 && (i = o), r[i] = u[o];
  }), n = N && N.__exportStar || function(r, u) {
    for (var o in r) o !== "default" && !Object.prototype.hasOwnProperty.call(u, o) && t(u, r, o);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), n(gt, e), n(Et, e), n(He, e), n(Ft, e), n(yt, e), n(wt, e), n(_t, e), n(At, e), n(Pn, e), n(Bt, e), n(Ot, e), n(St, e);
})(Ct);
var di = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/, hi = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/, pi = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/, Yt = {
  Space_Separator: di,
  ID_Start: hi,
  ID_Continue: pi
}, M = {
  isSpaceSeparator(e) {
    return typeof e == "string" && Yt.Space_Separator.test(e);
  },
  isIdStartChar(e) {
    return typeof e == "string" && (e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e === "$" || e === "_" || Yt.ID_Start.test(e));
  },
  isIdContinueChar(e) {
    return typeof e == "string" && (e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e >= "0" && e <= "9" || e === "$" || e === "_" || e === "‌" || e === "‍" || Yt.ID_Continue.test(e));
  },
  isDigit(e) {
    return typeof e == "string" && /[0-9]/.test(e);
  },
  isHexDigit(e) {
    return typeof e == "string" && /[0-9A-Fa-f]/.test(e);
  }
};
let lr, Y, fe, lt, Ce, oe, q, br, Le;
var Di = function(t, n) {
  lr = String(t), Y = "start", fe = [], lt = 0, Ce = 1, oe = 0, q = void 0, br = void 0, Le = void 0;
  do
    q = mi(), Ei[Y]();
  while (q.type !== "eof");
  return typeof n == "function" ? fr({ "": Le }, "", n) : Le;
};
function fr(e, t, n) {
  const r = e[t];
  if (r != null && typeof r == "object")
    if (Array.isArray(r))
      for (let u = 0; u < r.length; u++) {
        const o = String(u), i = fr(r, o, n);
        i === void 0 ? delete r[o] : Object.defineProperty(r, o, {
          value: i,
          writable: !0,
          enumerable: !0,
          configurable: !0
        });
      }
    else
      for (const u in r) {
        const o = fr(r, u, n);
        o === void 0 ? delete r[u] : Object.defineProperty(r, u, {
          value: o,
          writable: !0,
          enumerable: !0,
          configurable: !0
        });
      }
  return n.call(e, t, r);
}
let b, _, xe, le, S;
function mi() {
  for (b = "default", _ = "", xe = !1, le = 1; ; ) {
    S = he();
    const e = Ln[b]();
    if (e)
      return e;
  }
}
function he() {
  if (lr[lt])
    return String.fromCodePoint(lr.codePointAt(lt));
}
function m() {
  const e = he();
  return e === `
` ? (Ce++, oe = 0) : e ? oe += e.length : oe++, e && (lt += e.length), e;
}
const Ln = {
  default() {
    switch (S) {
      case "	":
      case "\v":
      case "\f":
      case " ":
      case " ":
      case "\uFEFF":
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        m();
        return;
      case "/":
        m(), b = "comment";
        return;
      case void 0:
        return m(), I("eof");
    }
    if (M.isSpaceSeparator(S)) {
      m();
      return;
    }
    return Ln[Y]();
  },
  comment() {
    switch (S) {
      case "*":
        m(), b = "multiLineComment";
        return;
      case "/":
        m(), b = "singleLineComment";
        return;
    }
    throw j(m());
  },
  multiLineComment() {
    switch (S) {
      case "*":
        m(), b = "multiLineCommentAsterisk";
        return;
      case void 0:
        throw j(m());
    }
    m();
  },
  multiLineCommentAsterisk() {
    switch (S) {
      case "*":
        m();
        return;
      case "/":
        m(), b = "default";
        return;
      case void 0:
        throw j(m());
    }
    m(), b = "multiLineComment";
  },
  singleLineComment() {
    switch (S) {
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        m(), b = "default";
        return;
      case void 0:
        return m(), I("eof");
    }
    m();
  },
  value() {
    switch (S) {
      case "{":
      case "[":
        return I("punctuator", m());
      case "n":
        return m(), we("ull"), I("null", null);
      case "t":
        return m(), we("rue"), I("boolean", !0);
      case "f":
        return m(), we("alse"), I("boolean", !1);
      case "-":
      case "+":
        m() === "-" && (le = -1), b = "sign";
        return;
      case ".":
        _ = m(), b = "decimalPointLeading";
        return;
      case "0":
        _ = m(), b = "zero";
        return;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        _ = m(), b = "decimalInteger";
        return;
      case "I":
        return m(), we("nfinity"), I("numeric", 1 / 0);
      case "N":
        return m(), we("aN"), I("numeric", NaN);
      case '"':
      case "'":
        xe = m() === '"', _ = "", b = "string";
        return;
    }
    throw j(m());
  },
  identifierNameStartEscape() {
    if (S !== "u")
      throw j(m());
    m();
    const e = dr();
    switch (e) {
      case "$":
      case "_":
        break;
      default:
        if (!M.isIdStartChar(e))
          throw rn();
        break;
    }
    _ += e, b = "identifierName";
  },
  identifierName() {
    switch (S) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        _ += m();
        return;
      case "\\":
        m(), b = "identifierNameEscape";
        return;
    }
    if (M.isIdContinueChar(S)) {
      _ += m();
      return;
    }
    return I("identifier", _);
  },
  identifierNameEscape() {
    if (S !== "u")
      throw j(m());
    m();
    const e = dr();
    switch (e) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        break;
      default:
        if (!M.isIdContinueChar(e))
          throw rn();
        break;
    }
    _ += e, b = "identifierName";
  },
  sign() {
    switch (S) {
      case ".":
        _ = m(), b = "decimalPointLeading";
        return;
      case "0":
        _ = m(), b = "zero";
        return;
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        _ = m(), b = "decimalInteger";
        return;
      case "I":
        return m(), we("nfinity"), I("numeric", le * (1 / 0));
      case "N":
        return m(), we("aN"), I("numeric", NaN);
    }
    throw j(m());
  },
  zero() {
    switch (S) {
      case ".":
        _ += m(), b = "decimalPoint";
        return;
      case "e":
      case "E":
        _ += m(), b = "decimalExponent";
        return;
      case "x":
      case "X":
        _ += m(), b = "hexadecimal";
        return;
    }
    return I("numeric", le * 0);
  },
  decimalInteger() {
    switch (S) {
      case ".":
        _ += m(), b = "decimalPoint";
        return;
      case "e":
      case "E":
        _ += m(), b = "decimalExponent";
        return;
    }
    if (M.isDigit(S)) {
      _ += m();
      return;
    }
    return I("numeric", le * Number(_));
  },
  decimalPointLeading() {
    if (M.isDigit(S)) {
      _ += m(), b = "decimalFraction";
      return;
    }
    throw j(m());
  },
  decimalPoint() {
    switch (S) {
      case "e":
      case "E":
        _ += m(), b = "decimalExponent";
        return;
    }
    if (M.isDigit(S)) {
      _ += m(), b = "decimalFraction";
      return;
    }
    return I("numeric", le * Number(_));
  },
  decimalFraction() {
    switch (S) {
      case "e":
      case "E":
        _ += m(), b = "decimalExponent";
        return;
    }
    if (M.isDigit(S)) {
      _ += m();
      return;
    }
    return I("numeric", le * Number(_));
  },
  decimalExponent() {
    switch (S) {
      case "+":
      case "-":
        _ += m(), b = "decimalExponentSign";
        return;
    }
    if (M.isDigit(S)) {
      _ += m(), b = "decimalExponentInteger";
      return;
    }
    throw j(m());
  },
  decimalExponentSign() {
    if (M.isDigit(S)) {
      _ += m(), b = "decimalExponentInteger";
      return;
    }
    throw j(m());
  },
  decimalExponentInteger() {
    if (M.isDigit(S)) {
      _ += m();
      return;
    }
    return I("numeric", le * Number(_));
  },
  hexadecimal() {
    if (M.isHexDigit(S)) {
      _ += m(), b = "hexadecimalInteger";
      return;
    }
    throw j(m());
  },
  hexadecimalInteger() {
    if (M.isHexDigit(S)) {
      _ += m();
      return;
    }
    return I("numeric", le * Number(_));
  },
  string() {
    switch (S) {
      case "\\":
        m(), _ += Ci();
        return;
      case '"':
        if (xe)
          return m(), I("string", _);
        _ += m();
        return;
      case "'":
        if (!xe)
          return m(), I("string", _);
        _ += m();
        return;
      case `
`:
      case "\r":
        throw j(m());
      case "\u2028":
      case "\u2029":
        Fi(S);
        break;
      case void 0:
        throw j(m());
    }
    _ += m();
  },
  start() {
    switch (S) {
      case "{":
      case "[":
        return I("punctuator", m());
    }
    b = "value";
  },
  beforePropertyName() {
    switch (S) {
      case "$":
      case "_":
        _ = m(), b = "identifierName";
        return;
      case "\\":
        m(), b = "identifierNameStartEscape";
        return;
      case "}":
        return I("punctuator", m());
      case '"':
      case "'":
        xe = m() === '"', b = "string";
        return;
    }
    if (M.isIdStartChar(S)) {
      _ += m(), b = "identifierName";
      return;
    }
    throw j(m());
  },
  afterPropertyName() {
    if (S === ":")
      return I("punctuator", m());
    throw j(m());
  },
  beforePropertyValue() {
    b = "value";
  },
  afterPropertyValue() {
    switch (S) {
      case ",":
      case "}":
        return I("punctuator", m());
    }
    throw j(m());
  },
  beforeArrayValue() {
    if (S === "]")
      return I("punctuator", m());
    b = "value";
  },
  afterArrayValue() {
    switch (S) {
      case ",":
      case "]":
        return I("punctuator", m());
    }
    throw j(m());
  },
  end() {
    throw j(m());
  }
};
function I(e, t) {
  return {
    type: e,
    value: t,
    line: Ce,
    column: oe
  };
}
function we(e) {
  for (const t of e) {
    if (he() !== t)
      throw j(m());
    m();
  }
}
function Ci() {
  switch (he()) {
    case "b":
      return m(), "\b";
    case "f":
      return m(), "\f";
    case "n":
      return m(), `
`;
    case "r":
      return m(), "\r";
    case "t":
      return m(), "	";
    case "v":
      return m(), "\v";
    case "0":
      if (m(), M.isDigit(he()))
        throw j(m());
      return "\0";
    case "x":
      return m(), gi();
    case "u":
      return m(), dr();
    case `
`:
    case "\u2028":
    case "\u2029":
      return m(), "";
    case "\r":
      return m(), he() === `
` && m(), "";
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      throw j(m());
    case void 0:
      throw j(m());
  }
  return m();
}
function gi() {
  let e = "", t = he();
  if (!M.isHexDigit(t) || (e += m(), t = he(), !M.isHexDigit(t)))
    throw j(m());
  return e += m(), String.fromCodePoint(parseInt(e, 16));
}
function dr() {
  let e = "", t = 4;
  for (; t-- > 0; ) {
    const n = he();
    if (!M.isHexDigit(n))
      throw j(m());
    e += m();
  }
  return String.fromCodePoint(parseInt(e, 16));
}
const Ei = {
  start() {
    if (q.type === "eof")
      throw _e();
    Xt();
  },
  beforePropertyName() {
    switch (q.type) {
      case "identifier":
      case "string":
        br = q.value, Y = "afterPropertyName";
        return;
      case "punctuator":
        it();
        return;
      case "eof":
        throw _e();
    }
  },
  afterPropertyName() {
    if (q.type === "eof")
      throw _e();
    Y = "beforePropertyValue";
  },
  beforePropertyValue() {
    if (q.type === "eof")
      throw _e();
    Xt();
  },
  beforeArrayValue() {
    if (q.type === "eof")
      throw _e();
    if (q.type === "punctuator" && q.value === "]") {
      it();
      return;
    }
    Xt();
  },
  afterPropertyValue() {
    if (q.type === "eof")
      throw _e();
    switch (q.value) {
      case ",":
        Y = "beforePropertyName";
        return;
      case "}":
        it();
    }
  },
  afterArrayValue() {
    if (q.type === "eof")
      throw _e();
    switch (q.value) {
      case ",":
        Y = "beforeArrayValue";
        return;
      case "]":
        it();
    }
  },
  end() {
  }
};
function Xt() {
  let e;
  switch (q.type) {
    case "punctuator":
      switch (q.value) {
        case "{":
          e = {};
          break;
        case "[":
          e = [];
          break;
      }
      break;
    case "null":
    case "boolean":
    case "numeric":
    case "string":
      e = q.value;
      break;
  }
  if (Le === void 0)
    Le = e;
  else {
    const t = fe[fe.length - 1];
    Array.isArray(t) ? t.push(e) : Object.defineProperty(t, br, {
      value: e,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  }
  if (e !== null && typeof e == "object")
    fe.push(e), Array.isArray(e) ? Y = "beforeArrayValue" : Y = "beforePropertyName";
  else {
    const t = fe[fe.length - 1];
    t == null ? Y = "end" : Array.isArray(t) ? Y = "afterArrayValue" : Y = "afterPropertyValue";
  }
}
function it() {
  fe.pop();
  const e = fe[fe.length - 1];
  e == null ? Y = "end" : Array.isArray(e) ? Y = "afterArrayValue" : Y = "afterPropertyValue";
}
function j(e) {
  return ft(e === void 0 ? `JSON5: invalid end of input at ${Ce}:${oe}` : `JSON5: invalid character '${Zn(e)}' at ${Ce}:${oe}`);
}
function _e() {
  return ft(`JSON5: invalid end of input at ${Ce}:${oe}`);
}
function rn() {
  return oe -= 5, ft(`JSON5: invalid identifier character at ${Ce}:${oe}`);
}
function Fi(e) {
  console.warn(`JSON5: '${Zn(e)}' in strings is not valid ECMAScript; consider escaping`);
}
function Zn(e) {
  const t = {
    "'": "\\'",
    '"': '\\"',
    "\\": "\\\\",
    "\b": "\\b",
    "\f": "\\f",
    "\n": "\\n",
    "\r": "\\r",
    "	": "\\t",
    "\v": "\\v",
    "\0": "\\0",
    "\u2028": "\\u2028",
    "\u2029": "\\u2029"
  };
  if (t[e])
    return t[e];
  if (e < " ") {
    const n = e.charCodeAt(0).toString(16);
    return "\\x" + ("00" + n).substring(n.length);
  }
  return e;
}
function ft(e) {
  const t = new SyntaxError(e);
  return t.lineNumber = Ce, t.columnNumber = oe, t;
}
var yi = function(t, n, r) {
  const u = [];
  let o = "", i, l, c = "", d;
  if (n != null && typeof n == "object" && !Array.isArray(n) && (r = n.space, d = n.quote, n = n.replacer), typeof n == "function")
    l = n;
  else if (Array.isArray(n)) {
    i = [];
    for (const p of n) {
      let g;
      typeof p == "string" ? g = p : (typeof p == "number" || p instanceof String || p instanceof Number) && (g = String(p)), g !== void 0 && i.indexOf(g) < 0 && i.push(g);
    }
  }
  return r instanceof Number ? r = Number(r) : r instanceof String && (r = String(r)), typeof r == "number" ? r > 0 && (r = Math.min(10, Math.floor(r)), c = "          ".substr(0, r)) : typeof r == "string" && (c = r.substr(0, 10)), f("", { "": t });
  function f(p, g) {
    let C = g[p];
    switch (C != null && (typeof C.toJSON5 == "function" ? C = C.toJSON5(p) : typeof C.toJSON == "function" && (C = C.toJSON(p))), l && (C = l.call(g, p, C)), C instanceof Number ? C = Number(C) : C instanceof String ? C = String(C) : C instanceof Boolean && (C = C.valueOf()), C) {
      case null:
        return "null";
      case !0:
        return "true";
      case !1:
        return "false";
    }
    if (typeof C == "string")
      return s(C);
    if (typeof C == "number")
      return String(C);
    if (typeof C == "object")
      return Array.isArray(C) ? D(C) : a(C);
  }
  function s(p) {
    const g = {
      "'": 0.1,
      '"': 0.2
    }, C = {
      "'": "\\'",
      '"': '\\"',
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\v": "\\v",
      "\0": "\\0",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    let F = "";
    for (let A = 0; A < p.length; A++) {
      const y = p[A];
      switch (y) {
        case "'":
        case '"':
          g[y]++, F += y;
          continue;
        case "\0":
          if (M.isDigit(p[A + 1])) {
            F += "\\x00";
            continue;
          }
      }
      if (C[y]) {
        F += C[y];
        continue;
      }
      if (y < " ") {
        let $ = y.charCodeAt(0).toString(16);
        F += "\\x" + ("00" + $).substring($.length);
        continue;
      }
      F += y;
    }
    const v = d || Object.keys(g).reduce((A, y) => g[A] < g[y] ? A : y);
    return F = F.replace(new RegExp(v, "g"), C[v]), v + F + v;
  }
  function a(p) {
    if (u.indexOf(p) >= 0)
      throw TypeError("Converting circular structure to JSON5");
    u.push(p);
    let g = o;
    o = o + c;
    let C = i || Object.keys(p), F = [];
    for (const A of C) {
      const y = f(A, p);
      if (y !== void 0) {
        let $ = h(A) + ":";
        c !== "" && ($ += " "), $ += y, F.push($);
      }
    }
    let v;
    if (F.length === 0)
      v = "{}";
    else {
      let A;
      if (c === "")
        A = F.join(","), v = "{" + A + "}";
      else {
        let y = `,
` + o;
        A = F.join(y), v = `{
` + o + A + `,
` + g + "}";
      }
    }
    return u.pop(), o = g, v;
  }
  function h(p) {
    if (p.length === 0)
      return s(p);
    const g = String.fromCodePoint(p.codePointAt(0));
    if (!M.isIdStartChar(g))
      return s(p);
    for (let C = g.length; C < p.length; C++)
      if (!M.isIdContinueChar(String.fromCodePoint(p.codePointAt(C))))
        return s(p);
    return p;
  }
  function D(p) {
    if (u.indexOf(p) >= 0)
      throw TypeError("Converting circular structure to JSON5");
    u.push(p);
    let g = o;
    o = o + c;
    let C = [];
    for (let v = 0; v < p.length; v++) {
      const A = f(String(v), p);
      C.push(A !== void 0 ? A : "null");
    }
    let F;
    if (C.length === 0)
      F = "[]";
    else if (c === "")
      F = "[" + C.join(",") + "]";
    else {
      let v = `,
` + o, A = C.join(v);
      F = `[
` + o + A + `,
` + g + "]";
    }
    return u.pop(), o = g, F;
  }
};
const wi = {
  parse: Di,
  stringify: yi
};
var _i = wi;
let Z = null, Qt = [], nn = null, De, ct = null, hr = Ct.SerialPort.binding;
function Ai(e, t = Ct.SerialPort.binding) {
  De = e, hr = t, ct = setInterval(un, 1e3), un();
}
function bi(e) {
  return e += "}", _i.parse(e);
}
async function un() {
  const t = (await hr.list()).find(
    (n) => n.vendorId && (n.vendorId === Ru || n.productId === Iu || n.vendorId === ju || n.productId === $u)
  );
  if (!t) {
    Z && Z.isOpen && (Z.close(), Z = null, De("main.ts >> Arduino not connected."));
    return;
  }
  Z && Z.isOpen || (Z = new Ct.SerialPort({
    path: t.path,
    baudRate: xu,
    binding: hr
  }), Z.on("open", () => {
    console.log("main.ts >> Arduino connected", t.path), De("arduino-connected");
  }), Z.on("close", () => {
    console.log("main.ts >> Arduino disconnected"), Z = null, De("arduino-disconnected");
  }), Z.on("error", (n) => {
    console.log("main.ts >> Arduino not connected."), De("arduino-error", n.message);
  }), nn = Z.pipe(new Sn({ delimiter: "}" })), nn.on(
    "data",
    (n) => {
      const r = bi(n);
      switch (r.channel) {
        case "DEBUG":
          console.log(`Channel: ${r.channel}
Message:${r.mssg}
Data: ${r.data}`);
          break;
        case "SOT":
          De("start-wave"), console.log("main.ts >> Received SOT!");
          break;
        case "EOT":
          De("complete-wave", Qt), Qt = [], console.log("main.ts >> Received EOT!");
          break;
        case "WAVEDATA":
          Qt.push(r.data), De("wave-val", r.data);
          break;
      }
    }
  ));
}
function vr() {
  if (console.log("main.ts >> Shutting down app"), ct && (clearInterval(ct), ct = null), Z && Z.isOpen)
    try {
      Z.close(), console.log("main.ts >> Port closed");
    } catch (e) {
      console.log("main.ts >> Error: ", e);
    }
  process.exit(0);
}
function vi() {
  Ze.handle("arduino-status", () => ({ connected: !!(Z && Z.isOpen) })), Ze.handle("send-wave", async (e, t) => {
    if (!Z || !Z.isOpen)
      throw new Error("Arduino is not connected");
    const n = JSON.stringify(t);
    return Z.write(n + `
`, (r) => {
      console.log(r ? `main.ts >> Error sending command to arduino: ${r}` : `main.ts >> Sent command to arduino: ${n}`);
    }), "OK";
  });
}
function E(e, t, n) {
  function r(l, c) {
    if (l._zod || Object.defineProperty(l, "_zod", {
      value: {
        def: c,
        constr: i,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), l._zod.traits.has(e))
      return;
    l._zod.traits.add(e), t(l, c);
    const d = i.prototype, f = Object.keys(d);
    for (let s = 0; s < f.length; s++) {
      const a = f[s];
      a in l || (l[a] = d[a].bind(l));
    }
  }
  const u = (n == null ? void 0 : n.Parent) ?? Object;
  class o extends u {
  }
  Object.defineProperty(o, "name", { value: e });
  function i(l) {
    var c;
    const d = n != null && n.Parent ? new o() : this;
    r(d, l), (c = d._zod).deferred ?? (c.deferred = []);
    for (const f of d._zod.deferred)
      f();
    return d;
  }
  return Object.defineProperty(i, "init", { value: r }), Object.defineProperty(i, Symbol.hasInstance, {
    value: (l) => {
      var c, d;
      return n != null && n.Parent && l instanceof n.Parent ? !0 : (d = (c = l == null ? void 0 : l._zod) == null ? void 0 : c.traits) == null ? void 0 : d.has(e);
    }
  }), Object.defineProperty(i, "name", { value: e }), i;
}
class Re extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class Un extends Error {
  constructor(t) {
    super(`Encountered unidirectional transform during encode: ${t}`), this.name = "ZodEncodeError";
  }
}
const Vn = {};
function Oe(e) {
  return Vn;
}
function Jn(e) {
  const t = Object.values(e).filter((r) => typeof r == "number");
  return Object.entries(e).filter(([r, u]) => t.indexOf(+r) === -1).map(([r, u]) => u);
}
function pr(e, t) {
  return typeof t == "bigint" ? t.toString() : t;
}
function Br(e) {
  return {
    get value() {
      {
        const t = e();
        return Object.defineProperty(this, "value", { value: t }), t;
      }
    }
  };
}
function Or(e) {
  return e == null;
}
function Sr(e) {
  const t = e.startsWith("^") ? 1 : 0, n = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(t, n);
}
function Bi(e, t) {
  const n = (e.toString().split(".")[1] || "").length, r = t.toString();
  let u = (r.split(".")[1] || "").length;
  if (u === 0 && /\d?e-\d?/.test(r)) {
    const c = r.match(/\d?e-(\d?)/);
    c != null && c[1] && (u = Number.parseInt(c[1]));
  }
  const o = n > u ? n : u, i = Number.parseInt(e.toFixed(o).replace(".", "")), l = Number.parseInt(t.toFixed(o).replace(".", ""));
  return i % l / 10 ** o;
}
const on = Symbol("evaluating");
function z(e, t, n) {
  let r;
  Object.defineProperty(e, t, {
    get() {
      if (r !== on)
        return r === void 0 && (r = on, r = n()), r;
    },
    set(u) {
      Object.defineProperty(e, t, {
        value: u
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function Ne(e, t, n) {
  Object.defineProperty(e, t, {
    value: n,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function ge(...e) {
  const t = {};
  for (const n of e) {
    const r = Object.getOwnPropertyDescriptors(n);
    Object.assign(t, r);
  }
  return Object.defineProperties({}, t);
}
function sn(e) {
  return JSON.stringify(e);
}
function Oi(e) {
  return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const qn = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function dt(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const Si = Br(() => {
  var e;
  if (typeof navigator < "u" && ((e = navigator == null ? void 0 : navigator.userAgent) != null && e.includes("Cloudflare")))
    return !1;
  try {
    const t = Function;
    return new t(""), !0;
  } catch {
    return !1;
  }
});
function Ue(e) {
  if (dt(e) === !1)
    return !1;
  const t = e.constructor;
  if (t === void 0 || typeof t != "function")
    return !0;
  const n = t.prototype;
  return !(dt(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function Wn(e) {
  return Ue(e) ? { ...e } : Array.isArray(e) ? [...e] : e;
}
const Pi = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function kt(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Ee(e, t, n) {
  const r = new e._zod.constr(t ?? e._zod.def);
  return (!t || n != null && n.parent) && (r._zod.parent = e), r;
}
function T(e) {
  const t = e;
  if (!t)
    return {};
  if (typeof t == "string")
    return { error: () => t };
  if ((t == null ? void 0 : t.message) !== void 0) {
    if ((t == null ? void 0 : t.error) !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    t.error = t.message;
  }
  return delete t.message, typeof t.error == "string" ? { ...t, error: () => t.error } : t;
}
function Ni(e) {
  return Object.keys(e).filter((t) => e[t]._zod.optin === "optional" && e[t]._zod.optout === "optional");
}
const zi = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function Ti(e, t) {
  const n = e._zod.def, r = n.checks;
  if (r && r.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const o = ge(e._zod.def, {
    get shape() {
      const i = {};
      for (const l in t) {
        if (!(l in n.shape))
          throw new Error(`Unrecognized key: "${l}"`);
        t[l] && (i[l] = n.shape[l]);
      }
      return Ne(this, "shape", i), i;
    },
    checks: []
  });
  return Ee(e, o);
}
function ki(e, t) {
  const n = e._zod.def, r = n.checks;
  if (r && r.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const o = ge(e._zod.def, {
    get shape() {
      const i = { ...e._zod.def.shape };
      for (const l in t) {
        if (!(l in n.shape))
          throw new Error(`Unrecognized key: "${l}"`);
        t[l] && delete i[l];
      }
      return Ne(this, "shape", i), i;
    },
    checks: []
  });
  return Ee(e, o);
}
function Ri(e, t) {
  if (!Ue(t))
    throw new Error("Invalid input to extend: expected a plain object");
  const n = e._zod.def.checks;
  if (n && n.length > 0) {
    const o = e._zod.def.shape;
    for (const i in t)
      if (Object.getOwnPropertyDescriptor(o, i) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  const u = ge(e._zod.def, {
    get shape() {
      const o = { ...e._zod.def.shape, ...t };
      return Ne(this, "shape", o), o;
    }
  });
  return Ee(e, u);
}
function Ii(e, t) {
  if (!Ue(t))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const n = ge(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t };
      return Ne(this, "shape", r), r;
    }
  });
  return Ee(e, n);
}
function ji(e, t) {
  const n = ge(e._zod.def, {
    get shape() {
      const r = { ...e._zod.def.shape, ...t._zod.def.shape };
      return Ne(this, "shape", r), r;
    },
    get catchall() {
      return t._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return Ee(e, n);
}
function $i(e, t, n) {
  const u = t._zod.def.checks;
  if (u && u.length > 0)
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  const i = ge(t._zod.def, {
    get shape() {
      const l = t._zod.def.shape, c = { ...l };
      if (n)
        for (const d in n) {
          if (!(d in l))
            throw new Error(`Unrecognized key: "${d}"`);
          n[d] && (c[d] = e ? new e({
            type: "optional",
            innerType: l[d]
          }) : l[d]);
        }
      else
        for (const d in l)
          c[d] = e ? new e({
            type: "optional",
            innerType: l[d]
          }) : l[d];
      return Ne(this, "shape", c), c;
    },
    checks: []
  });
  return Ee(t, i);
}
function xi(e, t, n) {
  const r = ge(t._zod.def, {
    get shape() {
      const u = t._zod.def.shape, o = { ...u };
      if (n)
        for (const i in n) {
          if (!(i in o))
            throw new Error(`Unrecognized key: "${i}"`);
          n[i] && (o[i] = new e({
            type: "nonoptional",
            innerType: u[i]
          }));
        }
      else
        for (const i in u)
          o[i] = new e({
            type: "nonoptional",
            innerType: u[i]
          });
      return Ne(this, "shape", o), o;
    }
  });
  return Ee(t, r);
}
function ke(e, t = 0) {
  var n;
  if (e.aborted === !0)
    return !0;
  for (let r = t; r < e.issues.length; r++)
    if (((n = e.issues[r]) == null ? void 0 : n.continue) !== !0)
      return !0;
  return !1;
}
function Gn(e, t) {
  return t.map((n) => {
    var r;
    return (r = n).path ?? (r.path = []), n.path.unshift(e), n;
  });
}
function st(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.message;
}
function Se(e, t, n) {
  var u, o, i, l, c, d;
  const r = { ...e, path: e.path ?? [] };
  if (!e.message) {
    const f = st((i = (o = (u = e.inst) == null ? void 0 : u._zod.def) == null ? void 0 : o.error) == null ? void 0 : i.call(o, e)) ?? st((l = t == null ? void 0 : t.error) == null ? void 0 : l.call(t, e)) ?? st((c = n.customError) == null ? void 0 : c.call(n, e)) ?? st((d = n.localeError) == null ? void 0 : d.call(n, e)) ?? "Invalid input";
    r.message = f;
  }
  return delete r.inst, delete r.continue, t != null && t.reportInput || delete r.input, r;
}
function Pr(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function Ve(...e) {
  const [t, n, r] = e;
  return typeof t == "string" ? {
    message: t,
    code: "custom",
    input: n,
    inst: r
  } : { ...t };
}
const Hn = (e, t) => {
  e.name = "$ZodError", Object.defineProperty(e, "_zod", {
    value: e._zod,
    enumerable: !1
  }), Object.defineProperty(e, "issues", {
    value: t,
    enumerable: !1
  }), e.message = JSON.stringify(t, pr, 2), Object.defineProperty(e, "toString", {
    value: () => e.message,
    enumerable: !1
  });
}, Kn = E("$ZodError", Hn), Yn = E("$ZodError", Hn, { Parent: Error });
function Mi(e, t = (n) => n.message) {
  const n = {}, r = [];
  for (const u of e.issues)
    u.path.length > 0 ? (n[u.path[0]] = n[u.path[0]] || [], n[u.path[0]].push(t(u))) : r.push(t(u));
  return { formErrors: r, fieldErrors: n };
}
function Li(e, t = (n) => n.message) {
  const n = { _errors: [] }, r = (u) => {
    for (const o of u.issues)
      if (o.code === "invalid_union" && o.errors.length)
        o.errors.map((i) => r({ issues: i }));
      else if (o.code === "invalid_key")
        r({ issues: o.issues });
      else if (o.code === "invalid_element")
        r({ issues: o.issues });
      else if (o.path.length === 0)
        n._errors.push(t(o));
      else {
        let i = n, l = 0;
        for (; l < o.path.length; ) {
          const c = o.path[l];
          l === o.path.length - 1 ? (i[c] = i[c] || { _errors: [] }, i[c]._errors.push(t(o))) : i[c] = i[c] || { _errors: [] }, i = i[c], l++;
        }
      }
  };
  return r(e), n;
}
const Nr = (e) => (t, n, r, u) => {
  const o = r ? Object.assign(r, { async: !1 }) : { async: !1 }, i = t._zod.run({ value: n, issues: [] }, o);
  if (i instanceof Promise)
    throw new Re();
  if (i.issues.length) {
    const l = new ((u == null ? void 0 : u.Err) ?? e)(i.issues.map((c) => Se(c, o, Oe())));
    throw qn(l, u == null ? void 0 : u.callee), l;
  }
  return i.value;
}, zr = (e) => async (t, n, r, u) => {
  const o = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let i = t._zod.run({ value: n, issues: [] }, o);
  if (i instanceof Promise && (i = await i), i.issues.length) {
    const l = new ((u == null ? void 0 : u.Err) ?? e)(i.issues.map((c) => Se(c, o, Oe())));
    throw qn(l, u == null ? void 0 : u.callee), l;
  }
  return i.value;
}, Rt = (e) => (t, n, r) => {
  const u = r ? { ...r, async: !1 } : { async: !1 }, o = t._zod.run({ value: n, issues: [] }, u);
  if (o instanceof Promise)
    throw new Re();
  return o.issues.length ? {
    success: !1,
    error: new (e ?? Kn)(o.issues.map((i) => Se(i, u, Oe())))
  } : { success: !0, data: o.value };
}, Zi = /* @__PURE__ */ Rt(Yn), It = (e) => async (t, n, r) => {
  const u = r ? Object.assign(r, { async: !0 }) : { async: !0 };
  let o = t._zod.run({ value: n, issues: [] }, u);
  return o instanceof Promise && (o = await o), o.issues.length ? {
    success: !1,
    error: new e(o.issues.map((i) => Se(i, u, Oe())))
  } : { success: !0, data: o.value };
}, Ui = /* @__PURE__ */ It(Yn), Vi = (e) => (t, n, r) => {
  const u = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return Nr(e)(t, n, u);
}, Ji = (e) => (t, n, r) => Nr(e)(t, n, r), qi = (e) => async (t, n, r) => {
  const u = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return zr(e)(t, n, u);
}, Wi = (e) => async (t, n, r) => zr(e)(t, n, r), Gi = (e) => (t, n, r) => {
  const u = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return Rt(e)(t, n, u);
}, Hi = (e) => (t, n, r) => Rt(e)(t, n, r), Ki = (e) => async (t, n, r) => {
  const u = r ? Object.assign(r, { direction: "backward" }) : { direction: "backward" };
  return It(e)(t, n, u);
}, Yi = (e) => async (t, n, r) => It(e)(t, n, r), Xi = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function Qi(e) {
  const t = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${t}` : e.precision === 0 ? `${t}:[0-5]\\d` : `${t}:[0-5]\\d\\.\\d{${e.precision}}` : `${t}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function es(e) {
  const t = Qi({ precision: e.precision }), n = ["Z"];
  e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const r = `${t}(?:${n.join("|")})`;
  return new RegExp(`^${Xi}T(?:${r})$`);
}
const ts = (e) => {
  const t = e ? `[\\s\\S]{${(e == null ? void 0 : e.minimum) ?? 0},${(e == null ? void 0 : e.maximum) ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${t}$`);
}, rs = /^-?\d+$/, ns = /^-?\d+(?:\.\d+)?$/, us = /^[^A-Z]*$/, os = /^[^a-z]*$/, X = /* @__PURE__ */ E("$ZodCheck", (e, t) => {
  var n;
  e._zod ?? (e._zod = {}), e._zod.def = t, (n = e._zod).onattach ?? (n.onattach = []);
}), Xn = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, Qn = /* @__PURE__ */ E("$ZodCheckLessThan", (e, t) => {
  X.init(e, t);
  const n = Xn[typeof t.value];
  e._zod.onattach.push((r) => {
    const u = r._zod.bag, o = (t.inclusive ? u.maximum : u.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    t.value < o && (t.inclusive ? u.maximum = t.value : u.exclusiveMaximum = t.value);
  }), e._zod.check = (r) => {
    (t.inclusive ? r.value <= t.value : r.value < t.value) || r.issues.push({
      origin: n,
      code: "too_big",
      maximum: typeof t.value == "object" ? t.value.getTime() : t.value,
      input: r.value,
      inclusive: t.inclusive,
      inst: e,
      continue: !t.abort
    });
  };
}), eu = /* @__PURE__ */ E("$ZodCheckGreaterThan", (e, t) => {
  X.init(e, t);
  const n = Xn[typeof t.value];
  e._zod.onattach.push((r) => {
    const u = r._zod.bag, o = (t.inclusive ? u.minimum : u.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    t.value > o && (t.inclusive ? u.minimum = t.value : u.exclusiveMinimum = t.value);
  }), e._zod.check = (r) => {
    (t.inclusive ? r.value >= t.value : r.value > t.value) || r.issues.push({
      origin: n,
      code: "too_small",
      minimum: typeof t.value == "object" ? t.value.getTime() : t.value,
      input: r.value,
      inclusive: t.inclusive,
      inst: e,
      continue: !t.abort
    });
  };
}), is = /* @__PURE__ */ E("$ZodCheckMultipleOf", (e, t) => {
  X.init(e, t), e._zod.onattach.push((n) => {
    var r;
    (r = n._zod.bag).multipleOf ?? (r.multipleOf = t.value);
  }), e._zod.check = (n) => {
    if (typeof n.value != typeof t.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof n.value == "bigint" ? n.value % t.value === BigInt(0) : Bi(n.value, t.value) === 0) || n.issues.push({
      origin: typeof n.value,
      code: "not_multiple_of",
      divisor: t.value,
      input: n.value,
      inst: e,
      continue: !t.abort
    });
  };
}), ss = /* @__PURE__ */ E("$ZodCheckNumberFormat", (e, t) => {
  var i;
  X.init(e, t), t.format = t.format || "float64";
  const n = (i = t.format) == null ? void 0 : i.includes("int"), r = n ? "int" : "number", [u, o] = zi[t.format];
  e._zod.onattach.push((l) => {
    const c = l._zod.bag;
    c.format = t.format, c.minimum = u, c.maximum = o, n && (c.pattern = rs);
  }), e._zod.check = (l) => {
    const c = l.value;
    if (n) {
      if (!Number.isInteger(c)) {
        l.issues.push({
          expected: r,
          format: t.format,
          code: "invalid_type",
          continue: !1,
          input: c,
          inst: e
        });
        return;
      }
      if (!Number.isSafeInteger(c)) {
        c > 0 ? l.issues.push({
          input: c,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: r,
          inclusive: !0,
          continue: !t.abort
        }) : l.issues.push({
          input: c,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: r,
          inclusive: !0,
          continue: !t.abort
        });
        return;
      }
    }
    c < u && l.issues.push({
      origin: "number",
      input: c,
      code: "too_small",
      minimum: u,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    }), c > o && l.issues.push({
      origin: "number",
      input: c,
      code: "too_big",
      maximum: o,
      inclusive: !0,
      inst: e,
      continue: !t.abort
    });
  };
}), as = /* @__PURE__ */ E("$ZodCheckMaxLength", (e, t) => {
  var n;
  X.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const u = r.value;
    return !Or(u) && u.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const u = r._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    t.maximum < u && (r._zod.bag.maximum = t.maximum);
  }), e._zod.check = (r) => {
    const u = r.value;
    if (u.length <= t.maximum)
      return;
    const i = Pr(u);
    r.issues.push({
      origin: i,
      code: "too_big",
      maximum: t.maximum,
      inclusive: !0,
      input: u,
      inst: e,
      continue: !t.abort
    });
  };
}), cs = /* @__PURE__ */ E("$ZodCheckMinLength", (e, t) => {
  var n;
  X.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const u = r.value;
    return !Or(u) && u.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const u = r._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    t.minimum > u && (r._zod.bag.minimum = t.minimum);
  }), e._zod.check = (r) => {
    const u = r.value;
    if (u.length >= t.minimum)
      return;
    const i = Pr(u);
    r.issues.push({
      origin: i,
      code: "too_small",
      minimum: t.minimum,
      inclusive: !0,
      input: u,
      inst: e,
      continue: !t.abort
    });
  };
}), ls = /* @__PURE__ */ E("$ZodCheckLengthEquals", (e, t) => {
  var n;
  X.init(e, t), (n = e._zod.def).when ?? (n.when = (r) => {
    const u = r.value;
    return !Or(u) && u.length !== void 0;
  }), e._zod.onattach.push((r) => {
    const u = r._zod.bag;
    u.minimum = t.length, u.maximum = t.length, u.length = t.length;
  }), e._zod.check = (r) => {
    const u = r.value, o = u.length;
    if (o === t.length)
      return;
    const i = Pr(u), l = o > t.length;
    r.issues.push({
      origin: i,
      ...l ? { code: "too_big", maximum: t.length } : { code: "too_small", minimum: t.length },
      inclusive: !0,
      exact: !0,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), jt = /* @__PURE__ */ E("$ZodCheckStringFormat", (e, t) => {
  var n, r;
  X.init(e, t), e._zod.onattach.push((u) => {
    const o = u._zod.bag;
    o.format = t.format, t.pattern && (o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(t.pattern));
  }), t.pattern ? (n = e._zod).check ?? (n.check = (u) => {
    t.pattern.lastIndex = 0, !t.pattern.test(u.value) && u.issues.push({
      origin: "string",
      code: "invalid_format",
      format: t.format,
      input: u.value,
      ...t.pattern ? { pattern: t.pattern.toString() } : {},
      inst: e,
      continue: !t.abort
    });
  }) : (r = e._zod).check ?? (r.check = () => {
  });
}), fs = /* @__PURE__ */ E("$ZodCheckRegex", (e, t) => {
  jt.init(e, t), e._zod.check = (n) => {
    t.pattern.lastIndex = 0, !t.pattern.test(n.value) && n.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: n.value,
      pattern: t.pattern.toString(),
      inst: e,
      continue: !t.abort
    });
  };
}), ds = /* @__PURE__ */ E("$ZodCheckLowerCase", (e, t) => {
  t.pattern ?? (t.pattern = us), jt.init(e, t);
}), hs = /* @__PURE__ */ E("$ZodCheckUpperCase", (e, t) => {
  t.pattern ?? (t.pattern = os), jt.init(e, t);
}), ps = /* @__PURE__ */ E("$ZodCheckIncludes", (e, t) => {
  X.init(e, t);
  const n = kt(t.includes), r = new RegExp(typeof t.position == "number" ? `^.{${t.position}}${n}` : n);
  t.pattern = r, e._zod.onattach.push((u) => {
    const o = u._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(r);
  }), e._zod.check = (u) => {
    u.value.includes(t.includes, t.position) || u.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: t.includes,
      input: u.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Ds = /* @__PURE__ */ E("$ZodCheckStartsWith", (e, t) => {
  X.init(e, t);
  const n = new RegExp(`^${kt(t.prefix)}.*`);
  t.pattern ?? (t.pattern = n), e._zod.onattach.push((r) => {
    const u = r._zod.bag;
    u.patterns ?? (u.patterns = /* @__PURE__ */ new Set()), u.patterns.add(n);
  }), e._zod.check = (r) => {
    r.value.startsWith(t.prefix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: t.prefix,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), ms = /* @__PURE__ */ E("$ZodCheckEndsWith", (e, t) => {
  X.init(e, t);
  const n = new RegExp(`.*${kt(t.suffix)}$`);
  t.pattern ?? (t.pattern = n), e._zod.onattach.push((r) => {
    const u = r._zod.bag;
    u.patterns ?? (u.patterns = /* @__PURE__ */ new Set()), u.patterns.add(n);
  }), e._zod.check = (r) => {
    r.value.endsWith(t.suffix) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: t.suffix,
      input: r.value,
      inst: e,
      continue: !t.abort
    });
  };
}), Cs = /* @__PURE__ */ E("$ZodCheckOverwrite", (e, t) => {
  X.init(e, t), e._zod.check = (n) => {
    n.value = t.tx(n.value);
  };
});
class gs {
  constructor(t = []) {
    this.content = [], this.indent = 0, this && (this.args = t);
  }
  indented(t) {
    this.indent += 1, t(this), this.indent -= 1;
  }
  write(t) {
    if (typeof t == "function") {
      t(this, { execution: "sync" }), t(this, { execution: "async" });
      return;
    }
    const r = t.split(`
`).filter((i) => i), u = Math.min(...r.map((i) => i.length - i.trimStart().length)), o = r.map((i) => i.slice(u)).map((i) => " ".repeat(this.indent * 2) + i);
    for (const i of o)
      this.content.push(i);
  }
  compile() {
    const t = Function, n = this == null ? void 0 : this.args, u = [...((this == null ? void 0 : this.content) ?? [""]).map((o) => `  ${o}`)];
    return new t(...n, u.join(`
`));
  }
}
const Es = {
  major: 4,
  minor: 3,
  patch: 6
}, U = /* @__PURE__ */ E("$ZodType", (e, t) => {
  var u;
  var n;
  e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Es;
  const r = [...e._zod.def.checks ?? []];
  e._zod.traits.has("$ZodCheck") && r.unshift(e);
  for (const o of r)
    for (const i of o._zod.onattach)
      i(e);
  if (r.length === 0)
    (n = e._zod).deferred ?? (n.deferred = []), (u = e._zod.deferred) == null || u.push(() => {
      e._zod.run = e._zod.parse;
    });
  else {
    const o = (l, c, d) => {
      let f = ke(l), s;
      for (const a of c) {
        if (a._zod.def.when) {
          if (!a._zod.def.when(l))
            continue;
        } else if (f)
          continue;
        const h = l.issues.length, D = a._zod.check(l);
        if (D instanceof Promise && (d == null ? void 0 : d.async) === !1)
          throw new Re();
        if (s || D instanceof Promise)
          s = (s ?? Promise.resolve()).then(async () => {
            await D, l.issues.length !== h && (f || (f = ke(l, h)));
          });
        else {
          if (l.issues.length === h)
            continue;
          f || (f = ke(l, h));
        }
      }
      return s ? s.then(() => l) : l;
    }, i = (l, c, d) => {
      if (ke(l))
        return l.aborted = !0, l;
      const f = o(c, r, d);
      if (f instanceof Promise) {
        if (d.async === !1)
          throw new Re();
        return f.then((s) => e._zod.parse(s, d));
      }
      return e._zod.parse(f, d);
    };
    e._zod.run = (l, c) => {
      if (c.skipChecks)
        return e._zod.parse(l, c);
      if (c.direction === "backward") {
        const f = e._zod.parse({ value: l.value, issues: [] }, { ...c, skipChecks: !0 });
        return f instanceof Promise ? f.then((s) => i(s, l, c)) : i(f, l, c);
      }
      const d = e._zod.parse(l, c);
      if (d instanceof Promise) {
        if (c.async === !1)
          throw new Re();
        return d.then((f) => o(f, r, c));
      }
      return o(d, r, c);
    };
  }
  z(e, "~standard", () => ({
    validate: (o) => {
      var i;
      try {
        const l = Zi(e, o);
        return l.success ? { value: l.data } : { issues: (i = l.error) == null ? void 0 : i.issues };
      } catch {
        return Ui(e, o).then((c) => {
          var d;
          return c.success ? { value: c.data } : { issues: (d = c.error) == null ? void 0 : d.issues };
        });
      }
    },
    vendor: "zod",
    version: 1
  }));
}), tu = /* @__PURE__ */ E("$ZodString", (e, t) => {
  var n;
  U.init(e, t), e._zod.pattern = [...((n = e == null ? void 0 : e._zod.bag) == null ? void 0 : n.patterns) ?? []].pop() ?? ts(e._zod.bag), e._zod.parse = (r, u) => {
    if (t.coerce)
      try {
        r.value = String(r.value);
      } catch {
      }
    return typeof r.value == "string" || r.issues.push({
      expected: "string",
      code: "invalid_type",
      input: r.value,
      inst: e
    }), r;
  };
}), ru = /* @__PURE__ */ E("$ZodStringFormat", (e, t) => {
  jt.init(e, t), tu.init(e, t);
}), Fs = /* @__PURE__ */ E("$ZodISODateTime", (e, t) => {
  t.pattern ?? (t.pattern = es(t)), ru.init(e, t);
}), nu = /* @__PURE__ */ E("$ZodNumber", (e, t) => {
  U.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? ns, e._zod.parse = (n, r) => {
    if (t.coerce)
      try {
        n.value = Number(n.value);
      } catch {
      }
    const u = n.value;
    if (typeof u == "number" && !Number.isNaN(u) && Number.isFinite(u))
      return n;
    const o = typeof u == "number" ? Number.isNaN(u) ? "NaN" : Number.isFinite(u) ? void 0 : "Infinity" : void 0;
    return n.issues.push({
      expected: "number",
      code: "invalid_type",
      input: u,
      inst: e,
      ...o ? { received: o } : {}
    }), n;
  };
}), ys = /* @__PURE__ */ E("$ZodNumberFormat", (e, t) => {
  ss.init(e, t), nu.init(e, t);
}), ws = /* @__PURE__ */ E("$ZodUnknown", (e, t) => {
  U.init(e, t), e._zod.parse = (n) => n;
}), _s = /* @__PURE__ */ E("$ZodNever", (e, t) => {
  U.init(e, t), e._zod.parse = (n, r) => (n.issues.push({
    expected: "never",
    code: "invalid_type",
    input: n.value,
    inst: e
  }), n);
});
function an(e, t, n) {
  e.issues.length && t.issues.push(...Gn(n, e.issues)), t.value[n] = e.value;
}
const As = /* @__PURE__ */ E("$ZodArray", (e, t) => {
  U.init(e, t), e._zod.parse = (n, r) => {
    const u = n.value;
    if (!Array.isArray(u))
      return n.issues.push({
        expected: "array",
        code: "invalid_type",
        input: u,
        inst: e
      }), n;
    n.value = Array(u.length);
    const o = [];
    for (let i = 0; i < u.length; i++) {
      const l = u[i], c = t.element._zod.run({
        value: l,
        issues: []
      }, r);
      c instanceof Promise ? o.push(c.then((d) => an(d, n, i))) : an(c, n, i);
    }
    return o.length ? Promise.all(o).then(() => n) : n;
  };
});
function ht(e, t, n, r, u) {
  if (e.issues.length) {
    if (u && !(n in r))
      return;
    t.issues.push(...Gn(n, e.issues));
  }
  e.value === void 0 ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
function uu(e) {
  var r, u, o, i;
  const t = Object.keys(e.shape);
  for (const l of t)
    if (!((i = (o = (u = (r = e.shape) == null ? void 0 : r[l]) == null ? void 0 : u._zod) == null ? void 0 : o.traits) != null && i.has("$ZodType")))
      throw new Error(`Invalid element at key "${l}": expected a Zod schema`);
  const n = Ni(e.shape);
  return {
    ...e,
    keys: t,
    keySet: new Set(t),
    numKeys: t.length,
    optionalKeys: new Set(n)
  };
}
function ou(e, t, n, r, u, o) {
  const i = [], l = u.keySet, c = u.catchall._zod, d = c.def.type, f = c.optout === "optional";
  for (const s in t) {
    if (l.has(s))
      continue;
    if (d === "never") {
      i.push(s);
      continue;
    }
    const a = c.run({ value: t[s], issues: [] }, r);
    a instanceof Promise ? e.push(a.then((h) => ht(h, n, s, t, f))) : ht(a, n, s, t, f);
  }
  return i.length && n.issues.push({
    code: "unrecognized_keys",
    keys: i,
    input: t,
    inst: o
  }), e.length ? Promise.all(e).then(() => n) : n;
}
const bs = /* @__PURE__ */ E("$ZodObject", (e, t) => {
  U.init(e, t);
  const n = Object.getOwnPropertyDescriptor(t, "shape");
  if (!(n != null && n.get)) {
    const l = t.shape;
    Object.defineProperty(t, "shape", {
      get: () => {
        const c = { ...l };
        return Object.defineProperty(t, "shape", {
          value: c
        }), c;
      }
    });
  }
  const r = Br(() => uu(t));
  z(e._zod, "propValues", () => {
    const l = t.shape, c = {};
    for (const d in l) {
      const f = l[d]._zod;
      if (f.values) {
        c[d] ?? (c[d] = /* @__PURE__ */ new Set());
        for (const s of f.values)
          c[d].add(s);
      }
    }
    return c;
  });
  const u = dt, o = t.catchall;
  let i;
  e._zod.parse = (l, c) => {
    i ?? (i = r.value);
    const d = l.value;
    if (!u(d))
      return l.issues.push({
        expected: "object",
        code: "invalid_type",
        input: d,
        inst: e
      }), l;
    l.value = {};
    const f = [], s = i.shape;
    for (const a of i.keys) {
      const h = s[a], D = h._zod.optout === "optional", p = h._zod.run({ value: d[a], issues: [] }, c);
      p instanceof Promise ? f.push(p.then((g) => ht(g, l, a, d, D))) : ht(p, l, a, d, D);
    }
    return o ? ou(f, d, l, c, r.value, e) : f.length ? Promise.all(f).then(() => l) : l;
  };
}), vs = /* @__PURE__ */ E("$ZodObjectJIT", (e, t) => {
  bs.init(e, t);
  const n = e._zod.parse, r = Br(() => uu(t)), u = (a) => {
    var v;
    const h = new gs(["shape", "payload", "ctx"]), D = r.value, p = (A) => {
      const y = sn(A);
      return `shape[${y}]._zod.run({ value: input[${y}], issues: [] }, ctx)`;
    };
    h.write("const input = payload.value;");
    const g = /* @__PURE__ */ Object.create(null);
    let C = 0;
    for (const A of D.keys)
      g[A] = `key_${C++}`;
    h.write("const newResult = {};");
    for (const A of D.keys) {
      const y = g[A], $ = sn(A), J = a[A], ae = ((v = J == null ? void 0 : J._zod) == null ? void 0 : v.optout) === "optional";
      h.write(`const ${y} = ${p(A)};`), ae ? h.write(`
        if (${y}.issues.length) {
          if (${$} in input) {
            payload.issues = payload.issues.concat(${y}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${$}, ...iss.path] : [${$}]
            })));
          }
        }
        
        if (${y}.value === undefined) {
          if (${$} in input) {
            newResult[${$}] = undefined;
          }
        } else {
          newResult[${$}] = ${y}.value;
        }
        
      `) : h.write(`
        if (${y}.issues.length) {
          payload.issues = payload.issues.concat(${y}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${$}, ...iss.path] : [${$}]
          })));
        }
        
        if (${y}.value === undefined) {
          if (${$} in input) {
            newResult[${$}] = undefined;
          }
        } else {
          newResult[${$}] = ${y}.value;
        }
        
      `);
    }
    h.write("payload.value = newResult;"), h.write("return payload;");
    const F = h.compile();
    return (A, y) => F(a, A, y);
  };
  let o;
  const i = dt, l = !Vn.jitless, d = l && Si.value, f = t.catchall;
  let s;
  e._zod.parse = (a, h) => {
    s ?? (s = r.value);
    const D = a.value;
    return i(D) ? l && d && (h == null ? void 0 : h.async) === !1 && h.jitless !== !0 ? (o || (o = u(t.shape)), a = o(a, h), f ? ou([], D, a, h, s, e) : a) : n(a, h) : (a.issues.push({
      expected: "object",
      code: "invalid_type",
      input: D,
      inst: e
    }), a);
  };
});
function cn(e, t, n, r) {
  for (const o of e)
    if (o.issues.length === 0)
      return t.value = o.value, t;
  const u = e.filter((o) => !ke(o));
  return u.length === 1 ? (t.value = u[0].value, u[0]) : (t.issues.push({
    code: "invalid_union",
    input: t.value,
    inst: n,
    errors: e.map((o) => o.issues.map((i) => Se(i, r, Oe())))
  }), t);
}
const Bs = /* @__PURE__ */ E("$ZodUnion", (e, t) => {
  U.init(e, t), z(e._zod, "optin", () => t.options.some((u) => u._zod.optin === "optional") ? "optional" : void 0), z(e._zod, "optout", () => t.options.some((u) => u._zod.optout === "optional") ? "optional" : void 0), z(e._zod, "values", () => {
    if (t.options.every((u) => u._zod.values))
      return new Set(t.options.flatMap((u) => Array.from(u._zod.values)));
  }), z(e._zod, "pattern", () => {
    if (t.options.every((u) => u._zod.pattern)) {
      const u = t.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${u.map((o) => Sr(o.source)).join("|")})$`);
    }
  });
  const n = t.options.length === 1, r = t.options[0]._zod.run;
  e._zod.parse = (u, o) => {
    if (n)
      return r(u, o);
    let i = !1;
    const l = [];
    for (const c of t.options) {
      const d = c._zod.run({
        value: u.value,
        issues: []
      }, o);
      if (d instanceof Promise)
        l.push(d), i = !0;
      else {
        if (d.issues.length === 0)
          return d;
        l.push(d);
      }
    }
    return i ? Promise.all(l).then((c) => cn(c, u, e, o)) : cn(l, u, e, o);
  };
}), Os = /* @__PURE__ */ E("$ZodIntersection", (e, t) => {
  U.init(e, t), e._zod.parse = (n, r) => {
    const u = n.value, o = t.left._zod.run({ value: u, issues: [] }, r), i = t.right._zod.run({ value: u, issues: [] }, r);
    return o instanceof Promise || i instanceof Promise ? Promise.all([o, i]).then(([c, d]) => ln(n, c, d)) : ln(n, o, i);
  };
});
function Dr(e, t) {
  if (e === t)
    return { valid: !0, data: e };
  if (e instanceof Date && t instanceof Date && +e == +t)
    return { valid: !0, data: e };
  if (Ue(e) && Ue(t)) {
    const n = Object.keys(t), r = Object.keys(e).filter((o) => n.indexOf(o) !== -1), u = { ...e, ...t };
    for (const o of r) {
      const i = Dr(e[o], t[o]);
      if (!i.valid)
        return {
          valid: !1,
          mergeErrorPath: [o, ...i.mergeErrorPath]
        };
      u[o] = i.data;
    }
    return { valid: !0, data: u };
  }
  if (Array.isArray(e) && Array.isArray(t)) {
    if (e.length !== t.length)
      return { valid: !1, mergeErrorPath: [] };
    const n = [];
    for (let r = 0; r < e.length; r++) {
      const u = e[r], o = t[r], i = Dr(u, o);
      if (!i.valid)
        return {
          valid: !1,
          mergeErrorPath: [r, ...i.mergeErrorPath]
        };
      n.push(i.data);
    }
    return { valid: !0, data: n };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function ln(e, t, n) {
  const r = /* @__PURE__ */ new Map();
  let u;
  for (const l of t.issues)
    if (l.code === "unrecognized_keys") {
      u ?? (u = l);
      for (const c of l.keys)
        r.has(c) || r.set(c, {}), r.get(c).l = !0;
    } else
      e.issues.push(l);
  for (const l of n.issues)
    if (l.code === "unrecognized_keys")
      for (const c of l.keys)
        r.has(c) || r.set(c, {}), r.get(c).r = !0;
    else
      e.issues.push(l);
  const o = [...r].filter(([, l]) => l.l && l.r).map(([l]) => l);
  if (o.length && u && e.issues.push({ ...u, keys: o }), ke(e))
    return e;
  const i = Dr(t.value, n.value);
  if (!i.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(i.mergeErrorPath)}`);
  return e.value = i.data, e;
}
const Ss = /* @__PURE__ */ E("$ZodEnum", (e, t) => {
  U.init(e, t);
  const n = Jn(t.entries), r = new Set(n);
  e._zod.values = r, e._zod.pattern = new RegExp(`^(${n.filter((u) => Pi.has(typeof u)).map((u) => typeof u == "string" ? kt(u) : u.toString()).join("|")})$`), e._zod.parse = (u, o) => {
    const i = u.value;
    return r.has(i) || u.issues.push({
      code: "invalid_value",
      values: n,
      input: i,
      inst: e
    }), u;
  };
}), Ps = /* @__PURE__ */ E("$ZodTransform", (e, t) => {
  U.init(e, t), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new Un(e.constructor.name);
    const u = t.transform(n.value, n);
    if (r.async)
      return (u instanceof Promise ? u : Promise.resolve(u)).then((i) => (n.value = i, n));
    if (u instanceof Promise)
      throw new Re();
    return n.value = u, n;
  };
});
function fn(e, t) {
  return e.issues.length && t === void 0 ? { issues: [], value: void 0 } : e;
}
const iu = /* @__PURE__ */ E("$ZodOptional", (e, t) => {
  U.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", z(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, void 0]) : void 0), z(e._zod, "pattern", () => {
    const n = t.innerType._zod.pattern;
    return n ? new RegExp(`^(${Sr(n.source)})?$`) : void 0;
  }), e._zod.parse = (n, r) => {
    if (t.innerType._zod.optin === "optional") {
      const u = t.innerType._zod.run(n, r);
      return u instanceof Promise ? u.then((o) => fn(o, n.value)) : fn(u, n.value);
    }
    return n.value === void 0 ? n : t.innerType._zod.run(n, r);
  };
}), Ns = /* @__PURE__ */ E("$ZodExactOptional", (e, t) => {
  iu.init(e, t), z(e._zod, "values", () => t.innerType._zod.values), z(e._zod, "pattern", () => t.innerType._zod.pattern), e._zod.parse = (n, r) => t.innerType._zod.run(n, r);
}), zs = /* @__PURE__ */ E("$ZodNullable", (e, t) => {
  U.init(e, t), z(e._zod, "optin", () => t.innerType._zod.optin), z(e._zod, "optout", () => t.innerType._zod.optout), z(e._zod, "pattern", () => {
    const n = t.innerType._zod.pattern;
    return n ? new RegExp(`^(${Sr(n.source)}|null)$`) : void 0;
  }), z(e._zod, "values", () => t.innerType._zod.values ? /* @__PURE__ */ new Set([...t.innerType._zod.values, null]) : void 0), e._zod.parse = (n, r) => n.value === null ? n : t.innerType._zod.run(n, r);
}), Ts = /* @__PURE__ */ E("$ZodDefault", (e, t) => {
  U.init(e, t), e._zod.optin = "optional", z(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    if (n.value === void 0)
      return n.value = t.defaultValue, n;
    const u = t.innerType._zod.run(n, r);
    return u instanceof Promise ? u.then((o) => dn(o, t)) : dn(u, t);
  };
});
function dn(e, t) {
  return e.value === void 0 && (e.value = t.defaultValue), e;
}
const ks = /* @__PURE__ */ E("$ZodPrefault", (e, t) => {
  U.init(e, t), e._zod.optin = "optional", z(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => (r.direction === "backward" || n.value === void 0 && (n.value = t.defaultValue), t.innerType._zod.run(n, r));
}), Rs = /* @__PURE__ */ E("$ZodNonOptional", (e, t) => {
  U.init(e, t), z(e._zod, "values", () => {
    const n = t.innerType._zod.values;
    return n ? new Set([...n].filter((r) => r !== void 0)) : void 0;
  }), e._zod.parse = (n, r) => {
    const u = t.innerType._zod.run(n, r);
    return u instanceof Promise ? u.then((o) => hn(o, e)) : hn(u, e);
  };
});
function hn(e, t) {
  return !e.issues.length && e.value === void 0 && e.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: e.value,
    inst: t
  }), e;
}
const Is = /* @__PURE__ */ E("$ZodCatch", (e, t) => {
  U.init(e, t), z(e._zod, "optin", () => t.innerType._zod.optin), z(e._zod, "optout", () => t.innerType._zod.optout), z(e._zod, "values", () => t.innerType._zod.values), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    const u = t.innerType._zod.run(n, r);
    return u instanceof Promise ? u.then((o) => (n.value = o.value, o.issues.length && (n.value = t.catchValue({
      ...n,
      error: {
        issues: o.issues.map((i) => Se(i, r, Oe()))
      },
      input: n.value
    }), n.issues = []), n)) : (n.value = u.value, u.issues.length && (n.value = t.catchValue({
      ...n,
      error: {
        issues: u.issues.map((o) => Se(o, r, Oe()))
      },
      input: n.value
    }), n.issues = []), n);
  };
}), js = /* @__PURE__ */ E("$ZodPipe", (e, t) => {
  U.init(e, t), z(e._zod, "values", () => t.in._zod.values), z(e._zod, "optin", () => t.in._zod.optin), z(e._zod, "optout", () => t.out._zod.optout), z(e._zod, "propValues", () => t.in._zod.propValues), e._zod.parse = (n, r) => {
    if (r.direction === "backward") {
      const o = t.out._zod.run(n, r);
      return o instanceof Promise ? o.then((i) => at(i, t.in, r)) : at(o, t.in, r);
    }
    const u = t.in._zod.run(n, r);
    return u instanceof Promise ? u.then((o) => at(o, t.out, r)) : at(u, t.out, r);
  };
});
function at(e, t, n) {
  return e.issues.length ? (e.aborted = !0, e) : t._zod.run({ value: e.value, issues: e.issues }, n);
}
const $s = /* @__PURE__ */ E("$ZodReadonly", (e, t) => {
  U.init(e, t), z(e._zod, "propValues", () => t.innerType._zod.propValues), z(e._zod, "values", () => t.innerType._zod.values), z(e._zod, "optin", () => {
    var n, r;
    return (r = (n = t.innerType) == null ? void 0 : n._zod) == null ? void 0 : r.optin;
  }), z(e._zod, "optout", () => {
    var n, r;
    return (r = (n = t.innerType) == null ? void 0 : n._zod) == null ? void 0 : r.optout;
  }), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      return t.innerType._zod.run(n, r);
    const u = t.innerType._zod.run(n, r);
    return u instanceof Promise ? u.then(pn) : pn(u);
  };
});
function pn(e) {
  return e.value = Object.freeze(e.value), e;
}
const xs = /* @__PURE__ */ E("$ZodCustom", (e, t) => {
  X.init(e, t), U.init(e, t), e._zod.parse = (n, r) => n, e._zod.check = (n) => {
    const r = n.value, u = t.fn(r);
    if (u instanceof Promise)
      return u.then((o) => Dn(o, n, r, e));
    Dn(u, n, r, e);
  };
});
function Dn(e, t, n, r) {
  if (!e) {
    const u = {
      code: "custom",
      input: n,
      inst: r,
      // incorporates params.error into issue reporting
      path: [...r._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !r._zod.def.abort
      // params: inst._zod.def.params,
    };
    r._zod.def.params && (u.params = r._zod.def.params), t.issues.push(Ve(u));
  }
}
var mn;
class Ms {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(t, ...n) {
    const r = n[0];
    return this._map.set(t, r), r && typeof r == "object" && "id" in r && this._idmap.set(r.id, t), this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(t) {
    const n = this._map.get(t);
    return n && typeof n == "object" && "id" in n && this._idmap.delete(n.id), this._map.delete(t), this;
  }
  get(t) {
    const n = t._zod.parent;
    if (n) {
      const r = { ...this.get(n) ?? {} };
      delete r.id;
      const u = { ...r, ...this._map.get(t) };
      return Object.keys(u).length ? u : void 0;
    }
    return this._map.get(t);
  }
  has(t) {
    return this._map.has(t);
  }
}
function Ls() {
  return new Ms();
}
(mn = globalThis).__zod_globalRegistry ?? (mn.__zod_globalRegistry = Ls());
const Me = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function Zs(e, t) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...T(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Us(e, t) {
  return new e({
    type: "number",
    coerce: !0,
    checks: [],
    ...T(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Vs(e, t) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...T(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Js(e) {
  return new e({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function qs(e, t) {
  return new e({
    type: "never",
    ...T(t)
  });
}
// @__NO_SIDE_EFFECTS__
function Cn(e, t) {
  return new Qn({
    check: "less_than",
    ...T(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function er(e, t) {
  return new Qn({
    check: "less_than",
    ...T(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function gn(e, t) {
  return new eu({
    check: "greater_than",
    ...T(t),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function tr(e, t) {
  return new eu({
    check: "greater_than",
    ...T(t),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function En(e, t) {
  return new is({
    check: "multiple_of",
    ...T(t),
    value: e
  });
}
// @__NO_SIDE_EFFECTS__
function su(e, t) {
  return new as({
    check: "max_length",
    ...T(t),
    maximum: e
  });
}
// @__NO_SIDE_EFFECTS__
function pt(e, t) {
  return new cs({
    check: "min_length",
    ...T(t),
    minimum: e
  });
}
// @__NO_SIDE_EFFECTS__
function au(e, t) {
  return new ls({
    check: "length_equals",
    ...T(t),
    length: e
  });
}
// @__NO_SIDE_EFFECTS__
function Ws(e, t) {
  return new fs({
    check: "string_format",
    format: "regex",
    ...T(t),
    pattern: e
  });
}
// @__NO_SIDE_EFFECTS__
function Gs(e) {
  return new ds({
    check: "string_format",
    format: "lowercase",
    ...T(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Hs(e) {
  return new hs({
    check: "string_format",
    format: "uppercase",
    ...T(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Ks(e, t) {
  return new ps({
    check: "string_format",
    format: "includes",
    ...T(t),
    includes: e
  });
}
// @__NO_SIDE_EFFECTS__
function Ys(e, t) {
  return new Ds({
    check: "string_format",
    format: "starts_with",
    ...T(t),
    prefix: e
  });
}
// @__NO_SIDE_EFFECTS__
function Xs(e, t) {
  return new ms({
    check: "string_format",
    format: "ends_with",
    ...T(t),
    suffix: e
  });
}
// @__NO_SIDE_EFFECTS__
function $e(e) {
  return new Cs({
    check: "overwrite",
    tx: e
  });
}
// @__NO_SIDE_EFFECTS__
function Qs(e) {
  return /* @__PURE__ */ $e((t) => t.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function ea() {
  return /* @__PURE__ */ $e((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function ta() {
  return /* @__PURE__ */ $e((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function ra() {
  return /* @__PURE__ */ $e((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function na() {
  return /* @__PURE__ */ $e((e) => Oi(e));
}
// @__NO_SIDE_EFFECTS__
function ua(e, t, n) {
  return new e({
    type: "array",
    element: t,
    // get element() {
    //   return element;
    // },
    ...T(n)
  });
}
// @__NO_SIDE_EFFECTS__
function oa(e, t, n) {
  return new e({
    type: "custom",
    check: "custom",
    fn: t,
    ...T(n)
  });
}
// @__NO_SIDE_EFFECTS__
function ia(e) {
  const t = /* @__PURE__ */ sa((n) => (n.addIssue = (r) => {
    if (typeof r == "string")
      n.issues.push(Ve(r, n.value, t._zod.def));
    else {
      const u = r;
      u.fatal && (u.continue = !1), u.code ?? (u.code = "custom"), u.input ?? (u.input = n.value), u.inst ?? (u.inst = t), u.continue ?? (u.continue = !t._zod.def.abort), n.issues.push(Ve(u));
    }
  }, e(n.value, n)));
  return t;
}
// @__NO_SIDE_EFFECTS__
function sa(e, t) {
  const n = new X({
    check: "custom",
    ...T(t)
  });
  return n._zod.check = e, n;
}
function cu(e) {
  let t = (e == null ? void 0 : e.target) ?? "draft-2020-12";
  return t === "draft-4" && (t = "draft-04"), t === "draft-7" && (t = "draft-07"), {
    processors: e.processors ?? {},
    metadataRegistry: (e == null ? void 0 : e.metadata) ?? Me,
    target: t,
    unrepresentable: (e == null ? void 0 : e.unrepresentable) ?? "throw",
    override: (e == null ? void 0 : e.override) ?? (() => {
    }),
    io: (e == null ? void 0 : e.io) ?? "output",
    counter: 0,
    seen: /* @__PURE__ */ new Map(),
    cycles: (e == null ? void 0 : e.cycles) ?? "ref",
    reused: (e == null ? void 0 : e.reused) ?? "inline",
    external: (e == null ? void 0 : e.external) ?? void 0
  };
}
function G(e, t, n = { path: [], schemaPath: [] }) {
  var f, s;
  var r;
  const u = e._zod.def, o = t.seen.get(e);
  if (o)
    return o.count++, n.schemaPath.includes(e) && (o.cycle = n.path), o.schema;
  const i = { schema: {}, count: 1, cycle: void 0, path: n.path };
  t.seen.set(e, i);
  const l = (s = (f = e._zod).toJSONSchema) == null ? void 0 : s.call(f);
  if (l)
    i.schema = l;
  else {
    const a = {
      ...n,
      schemaPath: [...n.schemaPath, e],
      path: n.path
    };
    if (e._zod.processJSONSchema)
      e._zod.processJSONSchema(t, i.schema, a);
    else {
      const D = i.schema, p = t.processors[u.type];
      if (!p)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${u.type}`);
      p(e, t, D, a);
    }
    const h = e._zod.parent;
    h && (i.ref || (i.ref = h), G(h, t, a), t.seen.get(h).isParent = !0);
  }
  const c = t.metadataRegistry.get(e);
  return c && Object.assign(i.schema, c), t.io === "input" && K(e) && (delete i.schema.examples, delete i.schema.default), t.io === "input" && i.schema._prefault && ((r = i.schema).default ?? (r.default = i.schema._prefault)), delete i.schema._prefault, t.seen.get(e).schema;
}
function lu(e, t) {
  var i, l, c, d;
  const n = e.seen.get(t);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const r = /* @__PURE__ */ new Map();
  for (const f of e.seen.entries()) {
    const s = (i = e.metadataRegistry.get(f[0])) == null ? void 0 : i.id;
    if (s) {
      const a = r.get(s);
      if (a && a !== f[0])
        throw new Error(`Duplicate schema id "${s}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      r.set(s, f[0]);
    }
  }
  const u = (f) => {
    var p;
    const s = e.target === "draft-2020-12" ? "$defs" : "definitions";
    if (e.external) {
      const g = (p = e.external.registry.get(f[0])) == null ? void 0 : p.id, C = e.external.uri ?? ((v) => v);
      if (g)
        return { ref: C(g) };
      const F = f[1].defId ?? f[1].schema.id ?? `schema${e.counter++}`;
      return f[1].defId = F, { defId: F, ref: `${C("__shared")}#/${s}/${F}` };
    }
    if (f[1] === n)
      return { ref: "#" };
    const h = `#/${s}/`, D = f[1].schema.id ?? `__schema${e.counter++}`;
    return { defId: D, ref: h + D };
  }, o = (f) => {
    if (f[1].schema.$ref)
      return;
    const s = f[1], { ref: a, defId: h } = u(f);
    s.def = { ...s.schema }, h && (s.defId = h);
    const D = s.schema;
    for (const p in D)
      delete D[p];
    D.$ref = a;
  };
  if (e.cycles === "throw")
    for (const f of e.seen.entries()) {
      const s = f[1];
      if (s.cycle)
        throw new Error(`Cycle detected: #/${(l = s.cycle) == null ? void 0 : l.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const f of e.seen.entries()) {
    const s = f[1];
    if (t === f[0]) {
      o(f);
      continue;
    }
    if (e.external) {
      const h = (c = e.external.registry.get(f[0])) == null ? void 0 : c.id;
      if (t !== f[0] && h) {
        o(f);
        continue;
      }
    }
    if ((d = e.metadataRegistry.get(f[0])) == null ? void 0 : d.id) {
      o(f);
      continue;
    }
    if (s.cycle) {
      o(f);
      continue;
    }
    if (s.count > 1 && e.reused === "ref") {
      o(f);
      continue;
    }
  }
}
function fu(e, t) {
  var i, l, c;
  const n = e.seen.get(t);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const r = (d) => {
    const f = e.seen.get(d);
    if (f.ref === null)
      return;
    const s = f.def ?? f.schema, a = { ...s }, h = f.ref;
    if (f.ref = null, h) {
      r(h);
      const p = e.seen.get(h), g = p.schema;
      if (g.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (s.allOf = s.allOf ?? [], s.allOf.push(g)) : Object.assign(s, g), Object.assign(s, a), d._zod.parent === h)
        for (const F in s)
          F === "$ref" || F === "allOf" || F in a || delete s[F];
      if (g.$ref && p.def)
        for (const F in s)
          F === "$ref" || F === "allOf" || F in p.def && JSON.stringify(s[F]) === JSON.stringify(p.def[F]) && delete s[F];
    }
    const D = d._zod.parent;
    if (D && D !== h) {
      r(D);
      const p = e.seen.get(D);
      if (p != null && p.schema.$ref && (s.$ref = p.schema.$ref, p.def))
        for (const g in s)
          g === "$ref" || g === "allOf" || g in p.def && JSON.stringify(s[g]) === JSON.stringify(p.def[g]) && delete s[g];
    }
    e.override({
      zodSchema: d,
      jsonSchema: s,
      path: f.path ?? []
    });
  };
  for (const d of [...e.seen.entries()].reverse())
    r(d[0]);
  const u = {};
  if (e.target === "draft-2020-12" ? u.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? u.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? u.$schema = "http://json-schema.org/draft-04/schema#" : e.target, (i = e.external) != null && i.uri) {
    const d = (l = e.external.registry.get(t)) == null ? void 0 : l.id;
    if (!d)
      throw new Error("Schema is missing an `id` property");
    u.$id = e.external.uri(d);
  }
  Object.assign(u, n.def ?? n.schema);
  const o = ((c = e.external) == null ? void 0 : c.defs) ?? {};
  for (const d of e.seen.entries()) {
    const f = d[1];
    f.def && f.defId && (o[f.defId] = f.def);
  }
  e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? u.$defs = o : u.definitions = o);
  try {
    const d = JSON.parse(JSON.stringify(u));
    return Object.defineProperty(d, "~standard", {
      value: {
        ...t["~standard"],
        jsonSchema: {
          input: Dt(t, "input", e.processors),
          output: Dt(t, "output", e.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), d;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function K(e, t) {
  const n = t ?? { seen: /* @__PURE__ */ new Set() };
  if (n.seen.has(e))
    return !1;
  n.seen.add(e);
  const r = e._zod.def;
  if (r.type === "transform")
    return !0;
  if (r.type === "array")
    return K(r.element, n);
  if (r.type === "set")
    return K(r.valueType, n);
  if (r.type === "lazy")
    return K(r.getter(), n);
  if (r.type === "promise" || r.type === "optional" || r.type === "nonoptional" || r.type === "nullable" || r.type === "readonly" || r.type === "default" || r.type === "prefault")
    return K(r.innerType, n);
  if (r.type === "intersection")
    return K(r.left, n) || K(r.right, n);
  if (r.type === "record" || r.type === "map")
    return K(r.keyType, n) || K(r.valueType, n);
  if (r.type === "pipe")
    return K(r.in, n) || K(r.out, n);
  if (r.type === "object") {
    for (const u in r.shape)
      if (K(r.shape[u], n))
        return !0;
    return !1;
  }
  if (r.type === "union") {
    for (const u of r.options)
      if (K(u, n))
        return !0;
    return !1;
  }
  if (r.type === "tuple") {
    for (const u of r.items)
      if (K(u, n))
        return !0;
    return !!(r.rest && K(r.rest, n));
  }
  return !1;
}
const aa = (e, t = {}) => (n) => {
  const r = cu({ ...n, processors: t });
  return G(e, r), lu(r, e), fu(r, e);
}, Dt = (e, t, n = {}) => (r) => {
  const { libraryOptions: u, target: o } = r ?? {}, i = cu({ ...u ?? {}, target: o, io: t, processors: n });
  return G(e, i), lu(i, e), fu(i, e);
}, ca = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, la = (e, t, n, r) => {
  const u = n;
  u.type = "string";
  const { minimum: o, maximum: i, format: l, patterns: c, contentEncoding: d } = e._zod.bag;
  if (typeof o == "number" && (u.minLength = o), typeof i == "number" && (u.maxLength = i), l && (u.format = ca[l] ?? l, u.format === "" && delete u.format, l === "time" && delete u.format), d && (u.contentEncoding = d), c && c.size > 0) {
    const f = [...c];
    f.length === 1 ? u.pattern = f[0].source : f.length > 1 && (u.allOf = [
      ...f.map((s) => ({
        ...t.target === "draft-07" || t.target === "draft-04" || t.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: s.source
      }))
    ]);
  }
}, fa = (e, t, n, r) => {
  const u = n, { minimum: o, maximum: i, format: l, multipleOf: c, exclusiveMaximum: d, exclusiveMinimum: f } = e._zod.bag;
  typeof l == "string" && l.includes("int") ? u.type = "integer" : u.type = "number", typeof f == "number" && (t.target === "draft-04" || t.target === "openapi-3.0" ? (u.minimum = f, u.exclusiveMinimum = !0) : u.exclusiveMinimum = f), typeof o == "number" && (u.minimum = o, typeof f == "number" && t.target !== "draft-04" && (f >= o ? delete u.minimum : delete u.exclusiveMinimum)), typeof d == "number" && (t.target === "draft-04" || t.target === "openapi-3.0" ? (u.maximum = d, u.exclusiveMaximum = !0) : u.exclusiveMaximum = d), typeof i == "number" && (u.maximum = i, typeof d == "number" && t.target !== "draft-04" && (d <= i ? delete u.maximum : delete u.exclusiveMaximum)), typeof c == "number" && (u.multipleOf = c);
}, da = (e, t, n, r) => {
  n.not = {};
}, ha = (e, t, n, r) => {
}, pa = (e, t, n, r) => {
  const u = e._zod.def, o = Jn(u.entries);
  o.every((i) => typeof i == "number") && (n.type = "number"), o.every((i) => typeof i == "string") && (n.type = "string"), n.enum = o;
}, Da = (e, t, n, r) => {
  if (t.unrepresentable === "throw")
    throw new Error("Custom types cannot be represented in JSON Schema");
}, ma = (e, t, n, r) => {
  if (t.unrepresentable === "throw")
    throw new Error("Transforms cannot be represented in JSON Schema");
}, Ca = (e, t, n, r) => {
  const u = n, o = e._zod.def, { minimum: i, maximum: l } = e._zod.bag;
  typeof i == "number" && (u.minItems = i), typeof l == "number" && (u.maxItems = l), u.type = "array", u.items = G(o.element, t, { ...r, path: [...r.path, "items"] });
}, ga = (e, t, n, r) => {
  var d;
  const u = n, o = e._zod.def;
  u.type = "object", u.properties = {};
  const i = o.shape;
  for (const f in i)
    u.properties[f] = G(i[f], t, {
      ...r,
      path: [...r.path, "properties", f]
    });
  const l = new Set(Object.keys(i)), c = new Set([...l].filter((f) => {
    const s = o.shape[f]._zod;
    return t.io === "input" ? s.optin === void 0 : s.optout === void 0;
  }));
  c.size > 0 && (u.required = Array.from(c)), ((d = o.catchall) == null ? void 0 : d._zod.def.type) === "never" ? u.additionalProperties = !1 : o.catchall ? o.catchall && (u.additionalProperties = G(o.catchall, t, {
    ...r,
    path: [...r.path, "additionalProperties"]
  })) : t.io === "output" && (u.additionalProperties = !1);
}, Ea = (e, t, n, r) => {
  const u = e._zod.def, o = u.inclusive === !1, i = u.options.map((l, c) => G(l, t, {
    ...r,
    path: [...r.path, o ? "oneOf" : "anyOf", c]
  }));
  o ? n.oneOf = i : n.anyOf = i;
}, Fa = (e, t, n, r) => {
  const u = e._zod.def, o = G(u.left, t, {
    ...r,
    path: [...r.path, "allOf", 0]
  }), i = G(u.right, t, {
    ...r,
    path: [...r.path, "allOf", 1]
  }), l = (d) => "allOf" in d && Object.keys(d).length === 1, c = [
    ...l(o) ? o.allOf : [o],
    ...l(i) ? i.allOf : [i]
  ];
  n.allOf = c;
}, ya = (e, t, n, r) => {
  const u = e._zod.def, o = G(u.innerType, t, r), i = t.seen.get(e);
  t.target === "openapi-3.0" ? (i.ref = u.innerType, n.nullable = !0) : n.anyOf = [o, { type: "null" }];
}, wa = (e, t, n, r) => {
  const u = e._zod.def;
  G(u.innerType, t, r);
  const o = t.seen.get(e);
  o.ref = u.innerType;
}, _a = (e, t, n, r) => {
  const u = e._zod.def;
  G(u.innerType, t, r);
  const o = t.seen.get(e);
  o.ref = u.innerType, n.default = JSON.parse(JSON.stringify(u.defaultValue));
}, Aa = (e, t, n, r) => {
  const u = e._zod.def;
  G(u.innerType, t, r);
  const o = t.seen.get(e);
  o.ref = u.innerType, t.io === "input" && (n._prefault = JSON.parse(JSON.stringify(u.defaultValue)));
}, ba = (e, t, n, r) => {
  const u = e._zod.def;
  G(u.innerType, t, r);
  const o = t.seen.get(e);
  o.ref = u.innerType;
  let i;
  try {
    i = u.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  n.default = i;
}, va = (e, t, n, r) => {
  const u = e._zod.def, o = t.io === "input" ? u.in._zod.def.type === "transform" ? u.out : u.in : u.out;
  G(o, t, r);
  const i = t.seen.get(e);
  i.ref = o;
}, Ba = (e, t, n, r) => {
  const u = e._zod.def;
  G(u.innerType, t, r);
  const o = t.seen.get(e);
  o.ref = u.innerType, n.readOnly = !0;
}, du = (e, t, n, r) => {
  const u = e._zod.def;
  G(u.innerType, t, r);
  const o = t.seen.get(e);
  o.ref = u.innerType;
}, Oa = /* @__PURE__ */ E("ZodISODateTime", (e, t) => {
  Fs.init(e, t), Va.init(e, t);
});
function Sa(e) {
  return /* @__PURE__ */ Zs(Oa, e);
}
const Pa = (e, t) => {
  Kn.init(e, t), e.name = "ZodError", Object.defineProperties(e, {
    format: {
      value: (n) => Li(e, n)
      // enumerable: false,
    },
    flatten: {
      value: (n) => Mi(e, n)
      // enumerable: false,
    },
    addIssue: {
      value: (n) => {
        e.issues.push(n), e.message = JSON.stringify(e.issues, pr, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (n) => {
        e.issues.push(...n), e.message = JSON.stringify(e.issues, pr, 2);
      }
      // enumerable: false,
    },
    isEmpty: {
      get() {
        return e.issues.length === 0;
      }
      // enumerable: false,
    }
  });
}, ne = E("ZodError", Pa, {
  Parent: Error
}), Na = /* @__PURE__ */ Nr(ne), za = /* @__PURE__ */ zr(ne), Ta = /* @__PURE__ */ Rt(ne), ka = /* @__PURE__ */ It(ne), Ra = /* @__PURE__ */ Vi(ne), Ia = /* @__PURE__ */ Ji(ne), ja = /* @__PURE__ */ qi(ne), $a = /* @__PURE__ */ Wi(ne), xa = /* @__PURE__ */ Gi(ne), Ma = /* @__PURE__ */ Hi(ne), La = /* @__PURE__ */ Ki(ne), Za = /* @__PURE__ */ Yi(ne), V = /* @__PURE__ */ E("ZodType", (e, t) => (U.init(e, t), Object.assign(e["~standard"], {
  jsonSchema: {
    input: Dt(e, "input"),
    output: Dt(e, "output")
  }
}), e.toJSONSchema = aa(e, {}), e.def = t, e.type = t.type, Object.defineProperty(e, "_def", { value: t }), e.check = (...n) => e.clone(ge(t, {
  checks: [
    ...t.checks ?? [],
    ...n.map((r) => typeof r == "function" ? { _zod: { check: r, def: { check: "custom" }, onattach: [] } } : r)
  ]
}), {
  parent: !0
}), e.with = e.check, e.clone = (n, r) => Ee(e, n, r), e.brand = () => e, e.register = (n, r) => (n.add(e, r), e), e.parse = (n, r) => Na(e, n, r, { callee: e.parse }), e.safeParse = (n, r) => Ta(e, n, r), e.parseAsync = async (n, r) => za(e, n, r, { callee: e.parseAsync }), e.safeParseAsync = async (n, r) => ka(e, n, r), e.spa = e.safeParseAsync, e.encode = (n, r) => Ra(e, n, r), e.decode = (n, r) => Ia(e, n, r), e.encodeAsync = async (n, r) => ja(e, n, r), e.decodeAsync = async (n, r) => $a(e, n, r), e.safeEncode = (n, r) => xa(e, n, r), e.safeDecode = (n, r) => Ma(e, n, r), e.safeEncodeAsync = async (n, r) => La(e, n, r), e.safeDecodeAsync = async (n, r) => Za(e, n, r), e.refine = (n, r) => e.check(Fc(n, r)), e.superRefine = (n) => e.check(yc(n)), e.overwrite = (n) => e.check(/* @__PURE__ */ $e(n)), e.optional = () => wn(e), e.exactOptional = () => sc(e), e.nullable = () => _n(e), e.nullish = () => wn(_n(e)), e.nonoptional = (n) => hc(e, n), e.array = () => Ka(e), e.or = (n) => ec([e, n]), e.and = (n) => rc(e, n), e.transform = (n) => An(e, oc(n)), e.default = (n) => lc(e, n), e.prefault = (n) => dc(e, n), e.catch = (n) => Dc(e, n), e.pipe = (n) => An(e, n), e.readonly = () => gc(e), e.describe = (n) => {
  const r = e.clone();
  return Me.add(r, { description: n }), r;
}, Object.defineProperty(e, "description", {
  get() {
    var n;
    return (n = Me.get(e)) == null ? void 0 : n.description;
  },
  configurable: !0
}), e.meta = (...n) => {
  if (n.length === 0)
    return Me.get(e);
  const r = e.clone();
  return Me.add(r, n[0]), r;
}, e.isOptional = () => e.safeParse(void 0).success, e.isNullable = () => e.safeParse(null).success, e.apply = (n) => n(e), e)), Ua = /* @__PURE__ */ E("_ZodString", (e, t) => {
  tu.init(e, t), V.init(e, t), e._zod.processJSONSchema = (r, u, o) => la(e, r, u);
  const n = e._zod.bag;
  e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, e.regex = (...r) => e.check(/* @__PURE__ */ Ws(...r)), e.includes = (...r) => e.check(/* @__PURE__ */ Ks(...r)), e.startsWith = (...r) => e.check(/* @__PURE__ */ Ys(...r)), e.endsWith = (...r) => e.check(/* @__PURE__ */ Xs(...r)), e.min = (...r) => e.check(/* @__PURE__ */ pt(...r)), e.max = (...r) => e.check(/* @__PURE__ */ su(...r)), e.length = (...r) => e.check(/* @__PURE__ */ au(...r)), e.nonempty = (...r) => e.check(/* @__PURE__ */ pt(1, ...r)), e.lowercase = (r) => e.check(/* @__PURE__ */ Gs(r)), e.uppercase = (r) => e.check(/* @__PURE__ */ Hs(r)), e.trim = () => e.check(/* @__PURE__ */ ea()), e.normalize = (...r) => e.check(/* @__PURE__ */ Qs(...r)), e.toLowerCase = () => e.check(/* @__PURE__ */ ta()), e.toUpperCase = () => e.check(/* @__PURE__ */ ra()), e.slugify = () => e.check(/* @__PURE__ */ na());
}), Va = /* @__PURE__ */ E("ZodStringFormat", (e, t) => {
  ru.init(e, t), Ua.init(e, t);
}), hu = /* @__PURE__ */ E("ZodNumber", (e, t) => {
  nu.init(e, t), V.init(e, t), e._zod.processJSONSchema = (r, u, o) => fa(e, r, u), e.gt = (r, u) => e.check(/* @__PURE__ */ gn(r, u)), e.gte = (r, u) => e.check(/* @__PURE__ */ tr(r, u)), e.min = (r, u) => e.check(/* @__PURE__ */ tr(r, u)), e.lt = (r, u) => e.check(/* @__PURE__ */ Cn(r, u)), e.lte = (r, u) => e.check(/* @__PURE__ */ er(r, u)), e.max = (r, u) => e.check(/* @__PURE__ */ er(r, u)), e.int = (r) => e.check(Fn(r)), e.safe = (r) => e.check(Fn(r)), e.positive = (r) => e.check(/* @__PURE__ */ gn(0, r)), e.nonnegative = (r) => e.check(/* @__PURE__ */ tr(0, r)), e.negative = (r) => e.check(/* @__PURE__ */ Cn(0, r)), e.nonpositive = (r) => e.check(/* @__PURE__ */ er(0, r)), e.multipleOf = (r, u) => e.check(/* @__PURE__ */ En(r, u)), e.step = (r, u) => e.check(/* @__PURE__ */ En(r, u)), e.finite = () => e;
  const n = e._zod.bag;
  e.minValue = Math.max(n.minimum ?? Number.NEGATIVE_INFINITY, n.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, e.maxValue = Math.min(n.maximum ?? Number.POSITIVE_INFINITY, n.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? 0.5), e.isFinite = !0, e.format = n.format ?? null;
}), Ja = /* @__PURE__ */ E("ZodNumberFormat", (e, t) => {
  ys.init(e, t), hu.init(e, t);
});
function Fn(e) {
  return /* @__PURE__ */ Vs(Ja, e);
}
const qa = /* @__PURE__ */ E("ZodUnknown", (e, t) => {
  ws.init(e, t), V.init(e, t), e._zod.processJSONSchema = (n, r, u) => ha();
});
function yn() {
  return /* @__PURE__ */ Js(qa);
}
const Wa = /* @__PURE__ */ E("ZodNever", (e, t) => {
  _s.init(e, t), V.init(e, t), e._zod.processJSONSchema = (n, r, u) => da(e, n, r);
});
function Ga(e) {
  return /* @__PURE__ */ qs(Wa, e);
}
const Ha = /* @__PURE__ */ E("ZodArray", (e, t) => {
  As.init(e, t), V.init(e, t), e._zod.processJSONSchema = (n, r, u) => Ca(e, n, r, u), e.element = t.element, e.min = (n, r) => e.check(/* @__PURE__ */ pt(n, r)), e.nonempty = (n) => e.check(/* @__PURE__ */ pt(1, n)), e.max = (n, r) => e.check(/* @__PURE__ */ su(n, r)), e.length = (n, r) => e.check(/* @__PURE__ */ au(n, r)), e.unwrap = () => e.element;
});
function Ka(e, t) {
  return /* @__PURE__ */ ua(Ha, e, t);
}
const Ya = /* @__PURE__ */ E("ZodObject", (e, t) => {
  vs.init(e, t), V.init(e, t), e._zod.processJSONSchema = (n, r, u) => ga(e, n, r, u), z(e, "shape", () => t.shape), e.keyof = () => nc(Object.keys(e._zod.def.shape)), e.catchall = (n) => e.clone({ ...e._zod.def, catchall: n }), e.passthrough = () => e.clone({ ...e._zod.def, catchall: yn() }), e.loose = () => e.clone({ ...e._zod.def, catchall: yn() }), e.strict = () => e.clone({ ...e._zod.def, catchall: Ga() }), e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 }), e.extend = (n) => Ri(e, n), e.safeExtend = (n) => Ii(e, n), e.merge = (n) => ji(e, n), e.pick = (n) => Ti(e, n), e.omit = (n) => ki(e, n), e.partial = (...n) => $i(pu, e, n[0]), e.required = (...n) => xi(Du, e, n[0]);
});
function Xa(e, t) {
  const n = {
    type: "object",
    shape: e ?? {},
    ...T(t)
  };
  return new Ya(n);
}
const Qa = /* @__PURE__ */ E("ZodUnion", (e, t) => {
  Bs.init(e, t), V.init(e, t), e._zod.processJSONSchema = (n, r, u) => Ea(e, n, r, u), e.options = t.options;
});
function ec(e, t) {
  return new Qa({
    type: "union",
    options: e,
    ...T(t)
  });
}
const tc = /* @__PURE__ */ E("ZodIntersection", (e, t) => {
  Os.init(e, t), V.init(e, t), e._zod.processJSONSchema = (n, r, u) => Fa(e, n, r, u);
});
function rc(e, t) {
  return new tc({
    type: "intersection",
    left: e,
    right: t
  });
}
const mr = /* @__PURE__ */ E("ZodEnum", (e, t) => {
  Ss.init(e, t), V.init(e, t), e._zod.processJSONSchema = (r, u, o) => pa(e, r, u), e.enum = t.entries, e.options = Object.values(t.entries);
  const n = new Set(Object.keys(t.entries));
  e.extract = (r, u) => {
    const o = {};
    for (const i of r)
      if (n.has(i))
        o[i] = t.entries[i];
      else
        throw new Error(`Key ${i} not found in enum`);
    return new mr({
      ...t,
      checks: [],
      ...T(u),
      entries: o
    });
  }, e.exclude = (r, u) => {
    const o = { ...t.entries };
    for (const i of r)
      if (n.has(i))
        delete o[i];
      else
        throw new Error(`Key ${i} not found in enum`);
    return new mr({
      ...t,
      checks: [],
      ...T(u),
      entries: o
    });
  };
});
function nc(e, t) {
  const n = Array.isArray(e) ? Object.fromEntries(e.map((r) => [r, r])) : e;
  return new mr({
    type: "enum",
    entries: n,
    ...T(t)
  });
}
const uc = /* @__PURE__ */ E("ZodTransform", (e, t) => {
  Ps.init(e, t), V.init(e, t), e._zod.processJSONSchema = (n, r, u) => ma(e, n), e._zod.parse = (n, r) => {
    if (r.direction === "backward")
      throw new Un(e.constructor.name);
    n.addIssue = (o) => {
      if (typeof o == "string")
        n.issues.push(Ve(o, n.value, t));
      else {
        const i = o;
        i.fatal && (i.continue = !1), i.code ?? (i.code = "custom"), i.input ?? (i.input = n.value), i.inst ?? (i.inst = e), n.issues.push(Ve(i));
      }
    };
    const u = t.transform(n.value, n);
    return u instanceof Promise ? u.then((o) => (n.value = o, n)) : (n.value = u, n);
  };
});
function oc(e) {
  return new uc({
    type: "transform",
    transform: e
  });
}
const pu = /* @__PURE__ */ E("ZodOptional", (e, t) => {
  iu.init(e, t), V.init(e, t), e._zod.processJSONSchema = (n, r, u) => du(e, n, r, u), e.unwrap = () => e._zod.def.innerType;
});
function wn(e) {
  return new pu({
    type: "optional",
    innerType: e
  });
}
const ic = /* @__PURE__ */ E("ZodExactOptional", (e, t) => {
  Ns.init(e, t), V.init(e, t), e._zod.processJSONSchema = (n, r, u) => du(e, n, r, u), e.unwrap = () => e._zod.def.innerType;
});
function sc(e) {
  return new ic({
    type: "optional",
    innerType: e
  });
}
const ac = /* @__PURE__ */ E("ZodNullable", (e, t) => {
  zs.init(e, t), V.init(e, t), e._zod.processJSONSchema = (n, r, u) => ya(e, n, r, u), e.unwrap = () => e._zod.def.innerType;
});
function _n(e) {
  return new ac({
    type: "nullable",
    innerType: e
  });
}
const cc = /* @__PURE__ */ E("ZodDefault", (e, t) => {
  Ts.init(e, t), V.init(e, t), e._zod.processJSONSchema = (n, r, u) => _a(e, n, r, u), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function lc(e, t) {
  return new cc({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : Wn(t);
    }
  });
}
const fc = /* @__PURE__ */ E("ZodPrefault", (e, t) => {
  ks.init(e, t), V.init(e, t), e._zod.processJSONSchema = (n, r, u) => Aa(e, n, r, u), e.unwrap = () => e._zod.def.innerType;
});
function dc(e, t) {
  return new fc({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof t == "function" ? t() : Wn(t);
    }
  });
}
const Du = /* @__PURE__ */ E("ZodNonOptional", (e, t) => {
  Rs.init(e, t), V.init(e, t), e._zod.processJSONSchema = (n, r, u) => wa(e, n, r, u), e.unwrap = () => e._zod.def.innerType;
});
function hc(e, t) {
  return new Du({
    type: "nonoptional",
    innerType: e,
    ...T(t)
  });
}
const pc = /* @__PURE__ */ E("ZodCatch", (e, t) => {
  Is.init(e, t), V.init(e, t), e._zod.processJSONSchema = (n, r, u) => ba(e, n, r, u), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function Dc(e, t) {
  return new pc({
    type: "catch",
    innerType: e,
    catchValue: typeof t == "function" ? t : () => t
  });
}
const mc = /* @__PURE__ */ E("ZodPipe", (e, t) => {
  js.init(e, t), V.init(e, t), e._zod.processJSONSchema = (n, r, u) => va(e, n, r, u), e.in = t.in, e.out = t.out;
});
function An(e, t) {
  return new mc({
    type: "pipe",
    in: e,
    out: t
    // ...util.normalizeParams(params),
  });
}
const Cc = /* @__PURE__ */ E("ZodReadonly", (e, t) => {
  $s.init(e, t), V.init(e, t), e._zod.processJSONSchema = (n, r, u) => Ba(e, n, r, u), e.unwrap = () => e._zod.def.innerType;
});
function gc(e) {
  return new Cc({
    type: "readonly",
    innerType: e
  });
}
const Ec = /* @__PURE__ */ E("ZodCustom", (e, t) => {
  xs.init(e, t), V.init(e, t), e._zod.processJSONSchema = (n, r, u) => Da(e, n);
});
function Fc(e, t = {}) {
  return /* @__PURE__ */ oa(Ec, e, t);
}
function yc(e) {
  return /* @__PURE__ */ ia(e);
}
function Te(e) {
  return /* @__PURE__ */ Us(hu, e);
}
const wc = Xa({
  waverider_id: Te(),
  source_data_timestamp_utc: Sa(),
  latitude: Te(),
  longitude: Te(),
  significant_wave_height_m: Te(),
  mean_period_s: Te(),
  wave_power_kw_per_m: Te()
}).loose().transform((e) => ({
  stationID: e.waverider_id,
  ts: new Date(e.source_data_timestamp_utc),
  lat: e.latitude,
  long: e.longitude,
  height: e.significant_wave_height_m,
  period: e.mean_period_s,
  wavePower: e.wave_power_kw_per_m
})), _c = (e) => {
  const t = wc.safeParse(e);
  return t.success ? { success: !0, data: t.data, err: null } : (console.log("Data parsing error: ", t.error.message), { success: !1, data: null, err: t.error });
}, Cr = () => {
  const e = Je.join(zu, "waverider.tmp"), t = [Tu, ":", ku].join("");
  console.log(`main.ts >> cmmd = scp ${t} ${e}`);
  const n = vu("scp", [t, e]);
  n.stderr.on("data", (r) => {
    console.error(r.toString());
  }), n.on("close", (r) => {
    r === 0 ? de.rename(e, rr, (u) => {
      if (u) throw u;
      console.log("main.ts >> Data transfer complete");
    }) : console.error(`main.ts >> scp failed with code -- ${r}`);
  });
}, Ac = () => {
  bc(rr);
  const e = de.readFileSync(rr, "utf-8"), t = JSON.parse(e);
  return _c(t);
}, bc = (e) => {
  const t = Je.dirname(e);
  console.log(`main.ts >> ensuring ${t} exists`), de.existsSync(t) || de.mkdirSync(t, { recursive: !0 }), de.existsSync(e) || (de.writeFileSync(e, JSON.stringify({}), "utf-8"), Cr());
};
function vc() {
  Ze.handle("get-drive-data", Ac);
}
const gr = process.env.VITE_DEV_SERVER_URL, Vc = te.join(qe, "dist-electron"), Bc = te.join(qe, "dist");
process.env.VITE_PUBLIC = gr ? te.join(qe, "public") : Bc;
let ue;
function mu() {
  ue = new bn({
    kiosk: !0,
    webPreferences: {
      preload: te.join(Ou, "preload.mjs")
    },
    width: 1024,
    height: 1366
  }), ue.webContents.on("did-finish-load", () => {
    ue == null || ue.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), gr ? ue.loadURL(gr) : ue.loadFile("./dist/index.html");
}
Ae.on("window-all-closed", () => {
  process.platform !== "darwin" && (Ae.quit(), ue = null);
});
Ae.on("activate", () => {
  bn.getAllWindows().length === 0 && mu();
});
Ae.whenReady().then(() => {
  mu(), Ai(Oc), vi(), Cr(), setInterval(Cr, 1e3 * 60 * 60), vc(), Ze.handle("get-height-options", async () => Mu), Ze.handle("get-period-options", async () => Lu);
});
function Oc(e, ...t) {
  ue && !ue.isDestroyed() && ue.webContents.send(e, ...t);
}
process.on("SIGINT", vr);
process.on("SIGTERM", vr);
Ae.on("before-quit", vr);
export {
  Vc as MAIN_DIST,
  Bc as RENDERER_DIST,
  gr as VITE_DEV_SERVER_URL,
  Oc as safeSend
};
