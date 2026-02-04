var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __publicField = (obj, key2, value) => __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _dispatcher, _dispatch, _S, _T, _U;
import { ipcMain, app, BrowserWindow } from "electron";
import path from "node:path";
import { createRequire } from "node:module";
import fs, { existsSync, unlinkSync } from "node:fs";
import require$$1$2, { fileURLToPath } from "node:url";
import require$$0$1 from "node:assert";
import require$$0$3 from "node:net";
import require$$2 from "node:http";
import require$$0$2 from "node:stream";
import require$$0 from "node:buffer";
import require$$0$4 from "node:util";
import require$$7 from "node:querystring";
import require$$8 from "node:events";
import require$$0$5 from "node:diagnostics_channel";
import require$$5 from "node:tls";
import require$$1$1 from "node:zlib";
import require$$5$1 from "node:perf_hooks";
import require$$8$1 from "node:util/types";
import require$$1 from "node:worker_threads";
import require$$5$2 from "node:async_hooks";
import require$$1$3 from "node:console";
import require$$1$4 from "node:dns";
import require$$5$3 from "string_decoder";
import { spawn } from "node:child_process";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ELECTRON_DIST = __dirname;
const APP_ROOT = path.join(__dirname, "..");
const CONFIG_PATH = path.join(APP_ROOT, "config");
const PACWAVE_CONFIG = path.join(CONFIG_PATH, "pacwave.config.json");
const ARDUINO_CONFIG = path.join(CONFIG_PATH, "arduino.config.json");
const pacwave_config = JSON.parse(
  fs.readFileSync(PACWAVE_CONFIG, "utf-8")
);
const SOCK_PATH = pacwave_config.ipc.uds_path;
const TRY_INTERVAL = pacwave_config.healthcheck.interval_ms;
const PIPE_MAX_TRIES = pacwave_config.healthcheck.max_failures;
const arduino_config = JSON.parse(
  fs.readFileSync(ARDUINO_CONFIG, "utf-8")
);
const FEATHER_VENDOR_ID = arduino_config.ports.featherM0_vendor_id;
const FEATHER_PRODUCT_ID = arduino_config.ports.featherM0_product_id;
const BAUD_RATE = arduino_config.baud_rate;
var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;
var unicode = {
  Space_Separator,
  ID_Start,
  ID_Continue
};
var util$n = {
  isSpaceSeparator(c2) {
    return typeof c2 === "string" && unicode.Space_Separator.test(c2);
  },
  isIdStartChar(c2) {
    return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 === "$" || c2 === "_" || unicode.ID_Start.test(c2));
  },
  isIdContinueChar(c2) {
    return typeof c2 === "string" && (c2 >= "a" && c2 <= "z" || c2 >= "A" && c2 <= "Z" || c2 >= "0" && c2 <= "9" || c2 === "$" || c2 === "_" || c2 === "‌" || c2 === "‍" || unicode.ID_Continue.test(c2));
  },
  isDigit(c2) {
    return typeof c2 === "string" && /[0-9]/.test(c2);
  },
  isHexDigit(c2) {
    return typeof c2 === "string" && /[0-9A-Fa-f]/.test(c2);
  }
};
let source;
let parseState;
let stack;
let pos;
let line;
let column;
let token;
let key;
let root;
var parse$1 = function parse(text, reviver) {
  source = String(text);
  parseState = "start";
  stack = [];
  pos = 0;
  line = 1;
  column = 0;
  token = void 0;
  key = void 0;
  root = void 0;
  do {
    token = lex();
    parseStates[parseState]();
  } while (token.type !== "eof");
  if (typeof reviver === "function") {
    return internalize({ "": root }, "", reviver);
  }
  return root;
};
function internalize(holder, name, reviver) {
  const value = holder[name];
  if (value != null && typeof value === "object") {
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const key2 = String(i);
        const replacement = internalize(value, key2, reviver);
        if (replacement === void 0) {
          delete value[key2];
        } else {
          Object.defineProperty(value, key2, {
            value: replacement,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
    } else {
      for (const key2 in value) {
        const replacement = internalize(value, key2, reviver);
        if (replacement === void 0) {
          delete value[key2];
        } else {
          Object.defineProperty(value, key2, {
            value: replacement,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
    }
  }
  return reviver.call(holder, name, value);
}
let lexState;
let buffer;
let doubleQuote;
let sign;
let c;
function lex() {
  lexState = "default";
  buffer = "";
  doubleQuote = false;
  sign = 1;
  for (; ; ) {
    c = peek();
    const token2 = lexStates[lexState]();
    if (token2) {
      return token2;
    }
  }
}
function peek() {
  if (source[pos]) {
    return String.fromCodePoint(source.codePointAt(pos));
  }
}
function read() {
  const c2 = peek();
  if (c2 === "\n") {
    line++;
    column = 0;
  } else if (c2) {
    column += c2.length;
  } else {
    column++;
  }
  if (c2) {
    pos += c2.length;
  }
  return c2;
}
const lexStates = {
  default() {
    switch (c) {
      case "	":
      case "\v":
      case "\f":
      case " ":
      case " ":
      case "\uFEFF":
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
        read();
        return;
      case "/":
        read();
        lexState = "comment";
        return;
      case void 0:
        read();
        return newToken("eof");
    }
    if (util$n.isSpaceSeparator(c)) {
      read();
      return;
    }
    return lexStates[parseState]();
  },
  comment() {
    switch (c) {
      case "*":
        read();
        lexState = "multiLineComment";
        return;
      case "/":
        read();
        lexState = "singleLineComment";
        return;
    }
    throw invalidChar(read());
  },
  multiLineComment() {
    switch (c) {
      case "*":
        read();
        lexState = "multiLineCommentAsterisk";
        return;
      case void 0:
        throw invalidChar(read());
    }
    read();
  },
  multiLineCommentAsterisk() {
    switch (c) {
      case "*":
        read();
        return;
      case "/":
        read();
        lexState = "default";
        return;
      case void 0:
        throw invalidChar(read());
    }
    read();
    lexState = "multiLineComment";
  },
  singleLineComment() {
    switch (c) {
      case "\n":
      case "\r":
      case "\u2028":
      case "\u2029":
        read();
        lexState = "default";
        return;
      case void 0:
        read();
        return newToken("eof");
    }
    read();
  },
  value() {
    switch (c) {
      case "{":
      case "[":
        return newToken("punctuator", read());
      case "n":
        read();
        literal("ull");
        return newToken("null", null);
      case "t":
        read();
        literal("rue");
        return newToken("boolean", true);
      case "f":
        read();
        literal("alse");
        return newToken("boolean", false);
      case "-":
      case "+":
        if (read() === "-") {
          sign = -1;
        }
        lexState = "sign";
        return;
      case ".":
        buffer = read();
        lexState = "decimalPointLeading";
        return;
      case "0":
        buffer = read();
        lexState = "zero";
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
        buffer = read();
        lexState = "decimalInteger";
        return;
      case "I":
        read();
        literal("nfinity");
        return newToken("numeric", Infinity);
      case "N":
        read();
        literal("aN");
        return newToken("numeric", NaN);
      case '"':
      case "'":
        doubleQuote = read() === '"';
        buffer = "";
        lexState = "string";
        return;
    }
    throw invalidChar(read());
  },
  identifierNameStartEscape() {
    if (c !== "u") {
      throw invalidChar(read());
    }
    read();
    const u = unicodeEscape();
    switch (u) {
      case "$":
      case "_":
        break;
      default:
        if (!util$n.isIdStartChar(u)) {
          throw invalidIdentifier();
        }
        break;
    }
    buffer += u;
    lexState = "identifierName";
  },
  identifierName() {
    switch (c) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        buffer += read();
        return;
      case "\\":
        read();
        lexState = "identifierNameEscape";
        return;
    }
    if (util$n.isIdContinueChar(c)) {
      buffer += read();
      return;
    }
    return newToken("identifier", buffer);
  },
  identifierNameEscape() {
    if (c !== "u") {
      throw invalidChar(read());
    }
    read();
    const u = unicodeEscape();
    switch (u) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        break;
      default:
        if (!util$n.isIdContinueChar(u)) {
          throw invalidIdentifier();
        }
        break;
    }
    buffer += u;
    lexState = "identifierName";
  },
  sign() {
    switch (c) {
      case ".":
        buffer = read();
        lexState = "decimalPointLeading";
        return;
      case "0":
        buffer = read();
        lexState = "zero";
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
        buffer = read();
        lexState = "decimalInteger";
        return;
      case "I":
        read();
        literal("nfinity");
        return newToken("numeric", sign * Infinity);
      case "N":
        read();
        literal("aN");
        return newToken("numeric", NaN);
    }
    throw invalidChar(read());
  },
  zero() {
    switch (c) {
      case ".":
        buffer += read();
        lexState = "decimalPoint";
        return;
      case "e":
      case "E":
        buffer += read();
        lexState = "decimalExponent";
        return;
      case "x":
      case "X":
        buffer += read();
        lexState = "hexadecimal";
        return;
    }
    return newToken("numeric", sign * 0);
  },
  decimalInteger() {
    switch (c) {
      case ".":
        buffer += read();
        lexState = "decimalPoint";
        return;
      case "e":
      case "E":
        buffer += read();
        lexState = "decimalExponent";
        return;
    }
    if (util$n.isDigit(c)) {
      buffer += read();
      return;
    }
    return newToken("numeric", sign * Number(buffer));
  },
  decimalPointLeading() {
    if (util$n.isDigit(c)) {
      buffer += read();
      lexState = "decimalFraction";
      return;
    }
    throw invalidChar(read());
  },
  decimalPoint() {
    switch (c) {
      case "e":
      case "E":
        buffer += read();
        lexState = "decimalExponent";
        return;
    }
    if (util$n.isDigit(c)) {
      buffer += read();
      lexState = "decimalFraction";
      return;
    }
    return newToken("numeric", sign * Number(buffer));
  },
  decimalFraction() {
    switch (c) {
      case "e":
      case "E":
        buffer += read();
        lexState = "decimalExponent";
        return;
    }
    if (util$n.isDigit(c)) {
      buffer += read();
      return;
    }
    return newToken("numeric", sign * Number(buffer));
  },
  decimalExponent() {
    switch (c) {
      case "+":
      case "-":
        buffer += read();
        lexState = "decimalExponentSign";
        return;
    }
    if (util$n.isDigit(c)) {
      buffer += read();
      lexState = "decimalExponentInteger";
      return;
    }
    throw invalidChar(read());
  },
  decimalExponentSign() {
    if (util$n.isDigit(c)) {
      buffer += read();
      lexState = "decimalExponentInteger";
      return;
    }
    throw invalidChar(read());
  },
  decimalExponentInteger() {
    if (util$n.isDigit(c)) {
      buffer += read();
      return;
    }
    return newToken("numeric", sign * Number(buffer));
  },
  hexadecimal() {
    if (util$n.isHexDigit(c)) {
      buffer += read();
      lexState = "hexadecimalInteger";
      return;
    }
    throw invalidChar(read());
  },
  hexadecimalInteger() {
    if (util$n.isHexDigit(c)) {
      buffer += read();
      return;
    }
    return newToken("numeric", sign * Number(buffer));
  },
  string() {
    switch (c) {
      case "\\":
        read();
        buffer += escape();
        return;
      case '"':
        if (doubleQuote) {
          read();
          return newToken("string", buffer);
        }
        buffer += read();
        return;
      case "'":
        if (!doubleQuote) {
          read();
          return newToken("string", buffer);
        }
        buffer += read();
        return;
      case "\n":
      case "\r":
        throw invalidChar(read());
      case "\u2028":
      case "\u2029":
        separatorChar(c);
        break;
      case void 0:
        throw invalidChar(read());
    }
    buffer += read();
  },
  start() {
    switch (c) {
      case "{":
      case "[":
        return newToken("punctuator", read());
    }
    lexState = "value";
  },
  beforePropertyName() {
    switch (c) {
      case "$":
      case "_":
        buffer = read();
        lexState = "identifierName";
        return;
      case "\\":
        read();
        lexState = "identifierNameStartEscape";
        return;
      case "}":
        return newToken("punctuator", read());
      case '"':
      case "'":
        doubleQuote = read() === '"';
        lexState = "string";
        return;
    }
    if (util$n.isIdStartChar(c)) {
      buffer += read();
      lexState = "identifierName";
      return;
    }
    throw invalidChar(read());
  },
  afterPropertyName() {
    if (c === ":") {
      return newToken("punctuator", read());
    }
    throw invalidChar(read());
  },
  beforePropertyValue() {
    lexState = "value";
  },
  afterPropertyValue() {
    switch (c) {
      case ",":
      case "}":
        return newToken("punctuator", read());
    }
    throw invalidChar(read());
  },
  beforeArrayValue() {
    if (c === "]") {
      return newToken("punctuator", read());
    }
    lexState = "value";
  },
  afterArrayValue() {
    switch (c) {
      case ",":
      case "]":
        return newToken("punctuator", read());
    }
    throw invalidChar(read());
  },
  end() {
    throw invalidChar(read());
  }
};
function newToken(type, value) {
  return {
    type,
    value,
    line,
    column
  };
}
function literal(s) {
  for (const c2 of s) {
    const p = peek();
    if (p !== c2) {
      throw invalidChar(read());
    }
    read();
  }
}
function escape() {
  const c2 = peek();
  switch (c2) {
    case "b":
      read();
      return "\b";
    case "f":
      read();
      return "\f";
    case "n":
      read();
      return "\n";
    case "r":
      read();
      return "\r";
    case "t":
      read();
      return "	";
    case "v":
      read();
      return "\v";
    case "0":
      read();
      if (util$n.isDigit(peek())) {
        throw invalidChar(read());
      }
      return "\0";
    case "x":
      read();
      return hexEscape();
    case "u":
      read();
      return unicodeEscape();
    case "\n":
    case "\u2028":
    case "\u2029":
      read();
      return "";
    case "\r":
      read();
      if (peek() === "\n") {
        read();
      }
      return "";
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      throw invalidChar(read());
    case void 0:
      throw invalidChar(read());
  }
  return read();
}
function hexEscape() {
  let buffer2 = "";
  let c2 = peek();
  if (!util$n.isHexDigit(c2)) {
    throw invalidChar(read());
  }
  buffer2 += read();
  c2 = peek();
  if (!util$n.isHexDigit(c2)) {
    throw invalidChar(read());
  }
  buffer2 += read();
  return String.fromCodePoint(parseInt(buffer2, 16));
}
function unicodeEscape() {
  let buffer2 = "";
  let count = 4;
  while (count-- > 0) {
    const c2 = peek();
    if (!util$n.isHexDigit(c2)) {
      throw invalidChar(read());
    }
    buffer2 += read();
  }
  return String.fromCodePoint(parseInt(buffer2, 16));
}
const parseStates = {
  start() {
    if (token.type === "eof") {
      throw invalidEOF();
    }
    push();
  },
  beforePropertyName() {
    switch (token.type) {
      case "identifier":
      case "string":
        key = token.value;
        parseState = "afterPropertyName";
        return;
      case "punctuator":
        pop();
        return;
      case "eof":
        throw invalidEOF();
    }
  },
  afterPropertyName() {
    if (token.type === "eof") {
      throw invalidEOF();
    }
    parseState = "beforePropertyValue";
  },
  beforePropertyValue() {
    if (token.type === "eof") {
      throw invalidEOF();
    }
    push();
  },
  beforeArrayValue() {
    if (token.type === "eof") {
      throw invalidEOF();
    }
    if (token.type === "punctuator" && token.value === "]") {
      pop();
      return;
    }
    push();
  },
  afterPropertyValue() {
    if (token.type === "eof") {
      throw invalidEOF();
    }
    switch (token.value) {
      case ",":
        parseState = "beforePropertyName";
        return;
      case "}":
        pop();
    }
  },
  afterArrayValue() {
    if (token.type === "eof") {
      throw invalidEOF();
    }
    switch (token.value) {
      case ",":
        parseState = "beforeArrayValue";
        return;
      case "]":
        pop();
    }
  },
  end() {
  }
};
function push() {
  let value;
  switch (token.type) {
    case "punctuator":
      switch (token.value) {
        case "{":
          value = {};
          break;
        case "[":
          value = [];
          break;
      }
      break;
    case "null":
    case "boolean":
    case "numeric":
    case "string":
      value = token.value;
      break;
  }
  if (root === void 0) {
    root = value;
  } else {
    const parent = stack[stack.length - 1];
    if (Array.isArray(parent)) {
      parent.push(value);
    } else {
      Object.defineProperty(parent, key, {
        value,
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
  }
  if (value !== null && typeof value === "object") {
    stack.push(value);
    if (Array.isArray(value)) {
      parseState = "beforeArrayValue";
    } else {
      parseState = "beforePropertyName";
    }
  } else {
    const current = stack[stack.length - 1];
    if (current == null) {
      parseState = "end";
    } else if (Array.isArray(current)) {
      parseState = "afterArrayValue";
    } else {
      parseState = "afterPropertyValue";
    }
  }
}
function pop() {
  stack.pop();
  const current = stack[stack.length - 1];
  if (current == null) {
    parseState = "end";
  } else if (Array.isArray(current)) {
    parseState = "afterArrayValue";
  } else {
    parseState = "afterPropertyValue";
  }
}
function invalidChar(c2) {
  if (c2 === void 0) {
    return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
  }
  return syntaxError(`JSON5: invalid character '${formatChar(c2)}' at ${line}:${column}`);
}
function invalidEOF() {
  return syntaxError(`JSON5: invalid end of input at ${line}:${column}`);
}
function invalidIdentifier() {
  column -= 5;
  return syntaxError(`JSON5: invalid identifier character at ${line}:${column}`);
}
function separatorChar(c2) {
  console.warn(`JSON5: '${formatChar(c2)}' in strings is not valid ECMAScript; consider escaping`);
}
function formatChar(c2) {
  const replacements = {
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
  if (replacements[c2]) {
    return replacements[c2];
  }
  if (c2 < " ") {
    const hexString = c2.charCodeAt(0).toString(16);
    return "\\x" + ("00" + hexString).substring(hexString.length);
  }
  return c2;
}
function syntaxError(message) {
  const err = new SyntaxError(message);
  err.lineNumber = line;
  err.columnNumber = column;
  return err;
}
var stringify$1 = function stringify(value, replacer, space) {
  const stack2 = [];
  let indent = "";
  let propertyList;
  let replacerFunc;
  let gap = "";
  let quote;
  if (replacer != null && typeof replacer === "object" && !Array.isArray(replacer)) {
    space = replacer.space;
    quote = replacer.quote;
    replacer = replacer.replacer;
  }
  if (typeof replacer === "function") {
    replacerFunc = replacer;
  } else if (Array.isArray(replacer)) {
    propertyList = [];
    for (const v of replacer) {
      let item;
      if (typeof v === "string") {
        item = v;
      } else if (typeof v === "number" || v instanceof String || v instanceof Number) {
        item = String(v);
      }
      if (item !== void 0 && propertyList.indexOf(item) < 0) {
        propertyList.push(item);
      }
    }
  }
  if (space instanceof Number) {
    space = Number(space);
  } else if (space instanceof String) {
    space = String(space);
  }
  if (typeof space === "number") {
    if (space > 0) {
      space = Math.min(10, Math.floor(space));
      gap = "          ".substr(0, space);
    }
  } else if (typeof space === "string") {
    gap = space.substr(0, 10);
  }
  return serializeProperty("", { "": value });
  function serializeProperty(key2, holder) {
    let value2 = holder[key2];
    if (value2 != null) {
      if (typeof value2.toJSON5 === "function") {
        value2 = value2.toJSON5(key2);
      } else if (typeof value2.toJSON === "function") {
        value2 = value2.toJSON(key2);
      }
    }
    if (replacerFunc) {
      value2 = replacerFunc.call(holder, key2, value2);
    }
    if (value2 instanceof Number) {
      value2 = Number(value2);
    } else if (value2 instanceof String) {
      value2 = String(value2);
    } else if (value2 instanceof Boolean) {
      value2 = value2.valueOf();
    }
    switch (value2) {
      case null:
        return "null";
      case true:
        return "true";
      case false:
        return "false";
    }
    if (typeof value2 === "string") {
      return quoteString(value2);
    }
    if (typeof value2 === "number") {
      return String(value2);
    }
    if (typeof value2 === "object") {
      return Array.isArray(value2) ? serializeArray(value2) : serializeObject(value2);
    }
    return void 0;
  }
  function quoteString(value2) {
    const quotes = {
      "'": 0.1,
      '"': 0.2
    };
    const replacements = {
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
    let product = "";
    for (let i = 0; i < value2.length; i++) {
      const c2 = value2[i];
      switch (c2) {
        case "'":
        case '"':
          quotes[c2]++;
          product += c2;
          continue;
        case "\0":
          if (util$n.isDigit(value2[i + 1])) {
            product += "\\x00";
            continue;
          }
      }
      if (replacements[c2]) {
        product += replacements[c2];
        continue;
      }
      if (c2 < " ") {
        let hexString = c2.charCodeAt(0).toString(16);
        product += "\\x" + ("00" + hexString).substring(hexString.length);
        continue;
      }
      product += c2;
    }
    const quoteChar = quote || Object.keys(quotes).reduce((a, b) => quotes[a] < quotes[b] ? a : b);
    product = product.replace(new RegExp(quoteChar, "g"), replacements[quoteChar]);
    return quoteChar + product + quoteChar;
  }
  function serializeObject(value2) {
    if (stack2.indexOf(value2) >= 0) {
      throw TypeError("Converting circular structure to JSON5");
    }
    stack2.push(value2);
    let stepback = indent;
    indent = indent + gap;
    let keys = propertyList || Object.keys(value2);
    let partial = [];
    for (const key2 of keys) {
      const propertyString = serializeProperty(key2, value2);
      if (propertyString !== void 0) {
        let member = serializeKey(key2) + ":";
        if (gap !== "") {
          member += " ";
        }
        member += propertyString;
        partial.push(member);
      }
    }
    let final;
    if (partial.length === 0) {
      final = "{}";
    } else {
      let properties;
      if (gap === "") {
        properties = partial.join(",");
        final = "{" + properties + "}";
      } else {
        let separator = ",\n" + indent;
        properties = partial.join(separator);
        final = "{\n" + indent + properties + ",\n" + stepback + "}";
      }
    }
    stack2.pop();
    indent = stepback;
    return final;
  }
  function serializeKey(key2) {
    if (key2.length === 0) {
      return quoteString(key2);
    }
    const firstChar = String.fromCodePoint(key2.codePointAt(0));
    if (!util$n.isIdStartChar(firstChar)) {
      return quoteString(key2);
    }
    for (let i = firstChar.length; i < key2.length; i++) {
      if (!util$n.isIdContinueChar(String.fromCodePoint(key2.codePointAt(i)))) {
        return quoteString(key2);
      }
    }
    return key2;
  }
  function serializeArray(value2) {
    if (stack2.indexOf(value2) >= 0) {
      throw TypeError("Converting circular structure to JSON5");
    }
    stack2.push(value2);
    let stepback = indent;
    indent = indent + gap;
    let partial = [];
    for (let i = 0; i < value2.length; i++) {
      const propertyString = serializeProperty(String(i), value2);
      partial.push(propertyString !== void 0 ? propertyString : "null");
    }
    let final;
    if (partial.length === 0) {
      final = "[]";
    } else {
      if (gap === "") {
        let properties = partial.join(",");
        final = "[" + properties + "]";
      } else {
        let separator = ",\n" + indent;
        let properties = partial.join(separator);
        final = "[\n" + indent + properties + ",\n" + stepback + "]";
      }
    }
    stack2.pop();
    indent = stepback;
    return final;
  }
};
const JSON5 = {
  parse: parse$1,
  stringify: stringify$1
};
var lib = JSON5;
const require$1 = createRequire(import.meta.url);
const { SerialPort } = require$1("serialport");
const { ReadlineParser } = require$1("@serialport/parser-readline");
let port = null;
let waveData = [];
let parser = null;
let send;
function initArduino(sender2) {
  send = sender2;
  setInterval(tryArduinoConnection, 1e3);
}
function decomposeLine(line2) {
  console.log(line2);
  line2 += "}";
  const response2 = lib.parse(line2);
  return response2;
}
async function tryArduinoConnection() {
  const ports = await SerialPort.list();
  const arduinoPort = ports.find(
    (p) => p.vendorId && (p.vendorId === FEATHER_VENDOR_ID || p.productId === FEATHER_PRODUCT_ID)
  );
  if (!arduinoPort) {
    if (port && port.isOpen) {
      port.close();
      port = null;
      send("main.ts >> Arduino not connected.");
    }
    return;
  }
  if (port && port.isOpen) return;
  port = new SerialPort({
    path: arduinoPort.path,
    baudRate: BAUD_RATE
  });
  port.on("open", () => {
    console.log("main.ts >> Arduino connected", arduinoPort.path);
    send("arduino-connected");
  });
  port.on("close", () => {
    console.log("main.ts >> Arduino disconnected");
    port = null;
    send("arduino-disconnected");
  });
  port.on("error", (err) => {
    console.log("main.ts >> Arduino not connected.");
    send("arduino-error", err.message);
  });
  parser = port.pipe(new ReadlineParser({ delimiter: "}" }));
  parser.on(
    "data",
    (line2) => {
      const response2 = decomposeLine(line2);
      console.log("Message: " + response2.mssg);
      switch (response2.mssg) {
        case "DEBUG":
          console.log(response2.data);
          break;
        case "EOT":
          send("complete-wave", waveData);
          waveData = [];
          break;
        case "WAVEDATA":
          waveData.push(response2.data);
          send("wave-val", response2.data);
          break;
      }
    }
  );
}
function cleanup() {
  console.log("main.ts >> Shutting down app");
  if (port && port.isOpen) {
    try {
      port.close();
      console.log("main.ts >> Port closed");
    } catch (err) {
      console.log("main.ts >> Error: ", err);
    }
  }
  process.exit(0);
}
function registerArduinoHandlers() {
  ipcMain.handle("arduino-status", () => {
    return { connected: !!(port && port.isOpen) };
  });
  ipcMain.handle("send-wave", async (event, selected) => {
    const cmmd = JSON.stringify(selected);
    port.write(cmmd + "\n", (err) => {
      err ? console.log(`main.ts >> Error sending command to arduino: ${err}`) : console.log(`main.ts >> Sent command to arduino: ${cmmd}`);
    });
    return "OK";
  });
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var symbols$4 = {
  kClose: Symbol("close"),
  kDestroy: Symbol("destroy"),
  kDispatch: Symbol("dispatch"),
  kUrl: Symbol("url"),
  kWriting: Symbol("writing"),
  kResuming: Symbol("resuming"),
  kQueue: Symbol("queue"),
  kConnect: Symbol("connect"),
  kConnecting: Symbol("connecting"),
  kKeepAliveDefaultTimeout: Symbol("default keep alive timeout"),
  kKeepAliveMaxTimeout: Symbol("max keep alive timeout"),
  kKeepAliveTimeoutThreshold: Symbol("keep alive timeout threshold"),
  kKeepAliveTimeoutValue: Symbol("keep alive timeout"),
  kHeadersTimeout: Symbol("headers timeout"),
  kBodyTimeout: Symbol("body timeout"),
  kServerName: Symbol("server name"),
  kLocalAddress: Symbol("local address"),
  kNoRef: Symbol("no ref"),
  kBodyUsed: Symbol("used"),
  kBody: Symbol("abstracted request body"),
  kRunning: Symbol("running"),
  kBlocking: Symbol("blocking"),
  kPending: Symbol("pending"),
  kSize: Symbol("size"),
  kBusy: Symbol("busy"),
  kQueued: Symbol("queued"),
  kFree: Symbol("free"),
  kConnected: Symbol("connected"),
  kClosed: Symbol("closed"),
  kNeedDrain: Symbol("need drain"),
  kReset: Symbol("reset"),
  kDestroyed: Symbol.for("nodejs.stream.destroyed"),
  kResume: Symbol("resume"),
  kOnError: Symbol("on error"),
  kMaxHeadersSize: Symbol("max headers size"),
  kRunningIdx: Symbol("running index"),
  kPendingIdx: Symbol("pending index"),
  kError: Symbol("error"),
  kClients: Symbol("clients"),
  kClient: Symbol("client"),
  kParser: Symbol("parser"),
  kPipelining: Symbol("pipelining"),
  kSocket: Symbol("socket"),
  kHostHeader: Symbol("host header"),
  kConnector: Symbol("connector"),
  kStrictContentLength: Symbol("strict content length"),
  kMaxRedirections: Symbol("maxRedirections"),
  kMaxRequests: Symbol("maxRequestsPerClient"),
  kCounter: Symbol("socket request counter"),
  kInterceptors: Symbol("dispatch interceptors"),
  kMaxResponseSize: Symbol("max response size"),
  kHTTP2Session: Symbol("http2Session"),
  kConstruct: Symbol("constructable"),
  kListeners: Symbol("listeners"),
  kHTTPContext: Symbol("http context"),
  kMaxConcurrentStreams: Symbol("max concurrent streams")
};
const kUndiciError = Symbol.for("undici.error.UND_ERR");
let UndiciError$2 = class UndiciError extends Error {
  constructor(message) {
    super(message);
    __publicField(this, _a, true);
    this.name = "UndiciError";
    this.code = "UND_ERR";
  }
  static [(_b = Symbol.hasInstance, _a = kUndiciError, _b)](instance) {
    return instance && instance[kUndiciError] === true;
  }
};
const kConnectTimeoutError = Symbol.for("undici.error.UND_ERR_CONNECT_TIMEOUT");
let ConnectTimeoutError$1 = class ConnectTimeoutError extends UndiciError$2 {
  constructor(message) {
    super(message);
    __publicField(this, _c, true);
    this.name = "ConnectTimeoutError";
    this.message = message || "Connect Timeout Error";
    this.code = "UND_ERR_CONNECT_TIMEOUT";
  }
  static [(_d = Symbol.hasInstance, _c = kConnectTimeoutError, _d)](instance) {
    return instance && instance[kConnectTimeoutError] === true;
  }
};
const kHeadersTimeoutError = Symbol.for("undici.error.UND_ERR_HEADERS_TIMEOUT");
let HeadersTimeoutError$1 = class HeadersTimeoutError extends UndiciError$2 {
  constructor(message) {
    super(message);
    __publicField(this, _e, true);
    this.name = "HeadersTimeoutError";
    this.message = message || "Headers Timeout Error";
    this.code = "UND_ERR_HEADERS_TIMEOUT";
  }
  static [(_f = Symbol.hasInstance, _e = kHeadersTimeoutError, _f)](instance) {
    return instance && instance[kHeadersTimeoutError] === true;
  }
};
const kHeadersOverflowError = Symbol.for("undici.error.UND_ERR_HEADERS_OVERFLOW");
let HeadersOverflowError$1 = class HeadersOverflowError extends UndiciError$2 {
  constructor(message) {
    super(message);
    __publicField(this, _g, true);
    this.name = "HeadersOverflowError";
    this.message = message || "Headers Overflow Error";
    this.code = "UND_ERR_HEADERS_OVERFLOW";
  }
  static [(_h = Symbol.hasInstance, _g = kHeadersOverflowError, _h)](instance) {
    return instance && instance[kHeadersOverflowError] === true;
  }
};
const kBodyTimeoutError = Symbol.for("undici.error.UND_ERR_BODY_TIMEOUT");
let BodyTimeoutError$1 = class BodyTimeoutError extends UndiciError$2 {
  constructor(message) {
    super(message);
    __publicField(this, _i, true);
    this.name = "BodyTimeoutError";
    this.message = message || "Body Timeout Error";
    this.code = "UND_ERR_BODY_TIMEOUT";
  }
  static [(_j = Symbol.hasInstance, _i = kBodyTimeoutError, _j)](instance) {
    return instance && instance[kBodyTimeoutError] === true;
  }
};
const kResponseStatusCodeError = Symbol.for("undici.error.UND_ERR_RESPONSE_STATUS_CODE");
let ResponseStatusCodeError$1 = class ResponseStatusCodeError extends UndiciError$2 {
  constructor(message, statusCode, headers2, body2) {
    super(message);
    __publicField(this, _k, true);
    this.name = "ResponseStatusCodeError";
    this.message = message || "Response Status Code Error";
    this.code = "UND_ERR_RESPONSE_STATUS_CODE";
    this.body = body2;
    this.status = statusCode;
    this.statusCode = statusCode;
    this.headers = headers2;
  }
  static [(_l = Symbol.hasInstance, _k = kResponseStatusCodeError, _l)](instance) {
    return instance && instance[kResponseStatusCodeError] === true;
  }
};
const kInvalidArgumentError = Symbol.for("undici.error.UND_ERR_INVALID_ARG");
let InvalidArgumentError$o = class InvalidArgumentError extends UndiciError$2 {
  constructor(message) {
    super(message);
    __publicField(this, _m, true);
    this.name = "InvalidArgumentError";
    this.message = message || "Invalid Argument Error";
    this.code = "UND_ERR_INVALID_ARG";
  }
  static [(_n = Symbol.hasInstance, _m = kInvalidArgumentError, _n)](instance) {
    return instance && instance[kInvalidArgumentError] === true;
  }
};
const kInvalidReturnValueError = Symbol.for("undici.error.UND_ERR_INVALID_RETURN_VALUE");
let InvalidReturnValueError$2 = class InvalidReturnValueError extends UndiciError$2 {
  constructor(message) {
    super(message);
    __publicField(this, _o, true);
    this.name = "InvalidReturnValueError";
    this.message = message || "Invalid Return Value Error";
    this.code = "UND_ERR_INVALID_RETURN_VALUE";
  }
  static [(_p = Symbol.hasInstance, _o = kInvalidReturnValueError, _p)](instance) {
    return instance && instance[kInvalidReturnValueError] === true;
  }
};
const kAbortError = Symbol.for("undici.error.UND_ERR_ABORT");
let AbortError$1 = class AbortError extends UndiciError$2 {
  constructor(message) {
    super(message);
    __publicField(this, _q, true);
    this.name = "AbortError";
    this.message = message || "The operation was aborted";
    this.code = "UND_ERR_ABORT";
  }
  static [(_r = Symbol.hasInstance, _q = kAbortError, _r)](instance) {
    return instance && instance[kAbortError] === true;
  }
};
const kRequestAbortedError = Symbol.for("undici.error.UND_ERR_ABORTED");
let RequestAbortedError$8 = class RequestAbortedError extends AbortError$1 {
  constructor(message) {
    super(message);
    __publicField(this, _s, true);
    this.name = "AbortError";
    this.message = message || "Request aborted";
    this.code = "UND_ERR_ABORTED";
  }
  static [(_t = Symbol.hasInstance, _s = kRequestAbortedError, _t)](instance) {
    return instance && instance[kRequestAbortedError] === true;
  }
};
const kInformationalError = Symbol.for("undici.error.UND_ERR_INFO");
let InformationalError$4 = class InformationalError extends UndiciError$2 {
  constructor(message) {
    super(message);
    __publicField(this, _u, true);
    this.name = "InformationalError";
    this.message = message || "Request information";
    this.code = "UND_ERR_INFO";
  }
  static [(_v = Symbol.hasInstance, _u = kInformationalError, _v)](instance) {
    return instance && instance[kInformationalError] === true;
  }
};
const kRequestContentLengthMismatchError = Symbol.for("undici.error.UND_ERR_REQ_CONTENT_LENGTH_MISMATCH");
let RequestContentLengthMismatchError$2 = class RequestContentLengthMismatchError extends UndiciError$2 {
  constructor(message) {
    super(message);
    __publicField(this, _w, true);
    this.name = "RequestContentLengthMismatchError";
    this.message = message || "Request body length does not match content-length header";
    this.code = "UND_ERR_REQ_CONTENT_LENGTH_MISMATCH";
  }
  static [(_x = Symbol.hasInstance, _w = kRequestContentLengthMismatchError, _x)](instance) {
    return instance && instance[kRequestContentLengthMismatchError] === true;
  }
};
const kResponseContentLengthMismatchError = Symbol.for("undici.error.UND_ERR_RES_CONTENT_LENGTH_MISMATCH");
let ResponseContentLengthMismatchError$1 = class ResponseContentLengthMismatchError extends UndiciError$2 {
  constructor(message) {
    super(message);
    __publicField(this, _y, true);
    this.name = "ResponseContentLengthMismatchError";
    this.message = message || "Response body length does not match content-length header";
    this.code = "UND_ERR_RES_CONTENT_LENGTH_MISMATCH";
  }
  static [(_z = Symbol.hasInstance, _y = kResponseContentLengthMismatchError, _z)](instance) {
    return instance && instance[kResponseContentLengthMismatchError] === true;
  }
};
const kClientDestroyedError = Symbol.for("undici.error.UND_ERR_DESTROYED");
let ClientDestroyedError$2 = class ClientDestroyedError extends UndiciError$2 {
  constructor(message) {
    super(message);
    __publicField(this, _A, true);
    this.name = "ClientDestroyedError";
    this.message = message || "The client is destroyed";
    this.code = "UND_ERR_DESTROYED";
  }
  static [(_B = Symbol.hasInstance, _A = kClientDestroyedError, _B)](instance) {
    return instance && instance[kClientDestroyedError] === true;
  }
};
const kClientClosedError = Symbol.for("undici.error.UND_ERR_CLOSED");
let ClientClosedError$1 = class ClientClosedError extends UndiciError$2 {
  constructor(message) {
    super(message);
    __publicField(this, _C, true);
    this.name = "ClientClosedError";
    this.message = message || "The client is closed";
    this.code = "UND_ERR_CLOSED";
  }
  static [(_D = Symbol.hasInstance, _C = kClientClosedError, _D)](instance) {
    return instance && instance[kClientClosedError] === true;
  }
};
const kSocketError = Symbol.for("undici.error.UND_ERR_SOCKET");
let SocketError$4 = class SocketError extends UndiciError$2 {
  constructor(message, socket) {
    super(message);
    __publicField(this, _E, true);
    this.name = "SocketError";
    this.message = message || "Socket error";
    this.code = "UND_ERR_SOCKET";
    this.socket = socket;
  }
  static [(_F = Symbol.hasInstance, _E = kSocketError, _F)](instance) {
    return instance && instance[kSocketError] === true;
  }
};
const kNotSupportedError = Symbol.for("undici.error.UND_ERR_NOT_SUPPORTED");
let NotSupportedError$2 = class NotSupportedError extends UndiciError$2 {
  constructor(message) {
    super(message);
    __publicField(this, _G, true);
    this.name = "NotSupportedError";
    this.message = message || "Not supported error";
    this.code = "UND_ERR_NOT_SUPPORTED";
  }
  static [(_H = Symbol.hasInstance, _G = kNotSupportedError, _H)](instance) {
    return instance && instance[kNotSupportedError] === true;
  }
};
const kBalancedPoolMissingUpstreamError = Symbol.for("undici.error.UND_ERR_BPL_MISSING_UPSTREAM");
let BalancedPoolMissingUpstreamError$1 = class BalancedPoolMissingUpstreamError extends UndiciError$2 {
  constructor(message) {
    super(message);
    __publicField(this, _I, true);
    this.name = "MissingUpstreamError";
    this.message = message || "No upstream has been added to the BalancedPool";
    this.code = "UND_ERR_BPL_MISSING_UPSTREAM";
  }
  static [(_J = Symbol.hasInstance, _I = kBalancedPoolMissingUpstreamError, _J)](instance) {
    return instance && instance[kBalancedPoolMissingUpstreamError] === true;
  }
};
const kHTTPParserError = Symbol.for("undici.error.UND_ERR_HTTP_PARSER");
let HTTPParserError$1 = class HTTPParserError extends Error {
  constructor(message, code, data) {
    super(message);
    __publicField(this, _K, true);
    this.name = "HTTPParserError";
    this.code = code ? `HPE_${code}` : void 0;
    this.data = data ? data.toString() : void 0;
  }
  static [(_L = Symbol.hasInstance, _K = kHTTPParserError, _L)](instance) {
    return instance && instance[kHTTPParserError] === true;
  }
};
const kResponseExceededMaxSizeError = Symbol.for("undici.error.UND_ERR_RES_EXCEEDED_MAX_SIZE");
let ResponseExceededMaxSizeError$1 = class ResponseExceededMaxSizeError extends UndiciError$2 {
  constructor(message) {
    super(message);
    __publicField(this, _M, true);
    this.name = "ResponseExceededMaxSizeError";
    this.message = message || "Response content exceeded max size";
    this.code = "UND_ERR_RES_EXCEEDED_MAX_SIZE";
  }
  static [(_N = Symbol.hasInstance, _M = kResponseExceededMaxSizeError, _N)](instance) {
    return instance && instance[kResponseExceededMaxSizeError] === true;
  }
};
const kRequestRetryError = Symbol.for("undici.error.UND_ERR_REQ_RETRY");
let RequestRetryError$1 = class RequestRetryError extends UndiciError$2 {
  constructor(message, code, { headers: headers2, data }) {
    super(message);
    __publicField(this, _O, true);
    this.name = "RequestRetryError";
    this.message = message || "Request retry error";
    this.code = "UND_ERR_REQ_RETRY";
    this.statusCode = code;
    this.data = data;
    this.headers = headers2;
  }
  static [(_P = Symbol.hasInstance, _O = kRequestRetryError, _P)](instance) {
    return instance && instance[kRequestRetryError] === true;
  }
};
const kSecureProxyConnectionError = Symbol.for("undici.error.UND_ERR_PRX_TLS");
let SecureProxyConnectionError$1 = class SecureProxyConnectionError extends UndiciError$2 {
  constructor(cause, message, options) {
    super(message, { cause, ...options ?? {} });
    __publicField(this, _Q, true);
    this.name = "SecureProxyConnectionError";
    this.message = message || "Secure Proxy Connection failed";
    this.code = "UND_ERR_PRX_TLS";
    this.cause = cause;
  }
  static [(_R = Symbol.hasInstance, _Q = kSecureProxyConnectionError, _R)](instance) {
    return instance && instance[kSecureProxyConnectionError] === true;
  }
};
var errors$1 = {
  AbortError: AbortError$1,
  HTTPParserError: HTTPParserError$1,
  UndiciError: UndiciError$2,
  HeadersTimeoutError: HeadersTimeoutError$1,
  HeadersOverflowError: HeadersOverflowError$1,
  BodyTimeoutError: BodyTimeoutError$1,
  RequestContentLengthMismatchError: RequestContentLengthMismatchError$2,
  ConnectTimeoutError: ConnectTimeoutError$1,
  ResponseStatusCodeError: ResponseStatusCodeError$1,
  InvalidArgumentError: InvalidArgumentError$o,
  InvalidReturnValueError: InvalidReturnValueError$2,
  RequestAbortedError: RequestAbortedError$8,
  ClientDestroyedError: ClientDestroyedError$2,
  ClientClosedError: ClientClosedError$1,
  InformationalError: InformationalError$4,
  SocketError: SocketError$4,
  NotSupportedError: NotSupportedError$2,
  ResponseContentLengthMismatchError: ResponseContentLengthMismatchError$1,
  BalancedPoolMissingUpstreamError: BalancedPoolMissingUpstreamError$1,
  ResponseExceededMaxSizeError: ResponseExceededMaxSizeError$1,
  RequestRetryError: RequestRetryError$1,
  SecureProxyConnectionError: SecureProxyConnectionError$1
};
const headerNameLowerCasedRecord$3 = {};
const wellknownHeaderNames$1 = [
  "Accept",
  "Accept-Encoding",
  "Accept-Language",
  "Accept-Ranges",
  "Access-Control-Allow-Credentials",
  "Access-Control-Allow-Headers",
  "Access-Control-Allow-Methods",
  "Access-Control-Allow-Origin",
  "Access-Control-Expose-Headers",
  "Access-Control-Max-Age",
  "Access-Control-Request-Headers",
  "Access-Control-Request-Method",
  "Age",
  "Allow",
  "Alt-Svc",
  "Alt-Used",
  "Authorization",
  "Cache-Control",
  "Clear-Site-Data",
  "Connection",
  "Content-Disposition",
  "Content-Encoding",
  "Content-Language",
  "Content-Length",
  "Content-Location",
  "Content-Range",
  "Content-Security-Policy",
  "Content-Security-Policy-Report-Only",
  "Content-Type",
  "Cookie",
  "Cross-Origin-Embedder-Policy",
  "Cross-Origin-Opener-Policy",
  "Cross-Origin-Resource-Policy",
  "Date",
  "Device-Memory",
  "Downlink",
  "ECT",
  "ETag",
  "Expect",
  "Expect-CT",
  "Expires",
  "Forwarded",
  "From",
  "Host",
  "If-Match",
  "If-Modified-Since",
  "If-None-Match",
  "If-Range",
  "If-Unmodified-Since",
  "Keep-Alive",
  "Last-Modified",
  "Link",
  "Location",
  "Max-Forwards",
  "Origin",
  "Permissions-Policy",
  "Pragma",
  "Proxy-Authenticate",
  "Proxy-Authorization",
  "RTT",
  "Range",
  "Referer",
  "Referrer-Policy",
  "Refresh",
  "Retry-After",
  "Sec-WebSocket-Accept",
  "Sec-WebSocket-Extensions",
  "Sec-WebSocket-Key",
  "Sec-WebSocket-Protocol",
  "Sec-WebSocket-Version",
  "Server",
  "Server-Timing",
  "Service-Worker-Allowed",
  "Service-Worker-Navigation-Preload",
  "Set-Cookie",
  "SourceMap",
  "Strict-Transport-Security",
  "Supports-Loading-Mode",
  "TE",
  "Timing-Allow-Origin",
  "Trailer",
  "Transfer-Encoding",
  "Upgrade",
  "Upgrade-Insecure-Requests",
  "User-Agent",
  "Vary",
  "Via",
  "WWW-Authenticate",
  "X-Content-Type-Options",
  "X-DNS-Prefetch-Control",
  "X-Frame-Options",
  "X-Permitted-Cross-Domain-Policies",
  "X-Powered-By",
  "X-Requested-With",
  "X-XSS-Protection"
];
for (let i = 0; i < wellknownHeaderNames$1.length; ++i) {
  const key2 = wellknownHeaderNames$1[i];
  const lowerCasedKey = key2.toLowerCase();
  headerNameLowerCasedRecord$3[key2] = headerNameLowerCasedRecord$3[lowerCasedKey] = lowerCasedKey;
}
Object.setPrototypeOf(headerNameLowerCasedRecord$3, null);
var constants$5 = {
  wellknownHeaderNames: wellknownHeaderNames$1,
  headerNameLowerCasedRecord: headerNameLowerCasedRecord$3
};
const {
  wellknownHeaderNames,
  headerNameLowerCasedRecord: headerNameLowerCasedRecord$2
} = constants$5;
class TstNode {
  /**
   * @param {string} key
   * @param {any} value
   * @param {number} index
   */
  constructor(key2, value, index) {
    /** @type {any} */
    __publicField(this, "value", null);
    /** @type {null | TstNode} */
    __publicField(this, "left", null);
    /** @type {null | TstNode} */
    __publicField(this, "middle", null);
    /** @type {null | TstNode} */
    __publicField(this, "right", null);
    /** @type {number} */
    __publicField(this, "code");
    if (index === void 0 || index >= key2.length) {
      throw new TypeError("Unreachable");
    }
    const code = this.code = key2.charCodeAt(index);
    if (code > 127) {
      throw new TypeError("key must be ascii string");
    }
    if (key2.length !== ++index) {
      this.middle = new TstNode(key2, value, index);
    } else {
      this.value = value;
    }
  }
  /**
   * @param {string} key
   * @param {any} value
   */
  add(key2, value) {
    const length = key2.length;
    if (length === 0) {
      throw new TypeError("Unreachable");
    }
    let index = 0;
    let node = this;
    while (true) {
      const code = key2.charCodeAt(index);
      if (code > 127) {
        throw new TypeError("key must be ascii string");
      }
      if (node.code === code) {
        if (length === ++index) {
          node.value = value;
          break;
        } else if (node.middle !== null) {
          node = node.middle;
        } else {
          node.middle = new TstNode(key2, value, index);
          break;
        }
      } else if (node.code < code) {
        if (node.left !== null) {
          node = node.left;
        } else {
          node.left = new TstNode(key2, value, index);
          break;
        }
      } else if (node.right !== null) {
        node = node.right;
      } else {
        node.right = new TstNode(key2, value, index);
        break;
      }
    }
  }
  /**
   * @param {Uint8Array} key
   * @return {TstNode | null}
   */
  search(key2) {
    const keylength = key2.length;
    let index = 0;
    let node = this;
    while (node !== null && index < keylength) {
      let code = key2[index];
      if (code <= 90 && code >= 65) {
        code |= 32;
      }
      while (node !== null) {
        if (code === node.code) {
          if (keylength === ++index) {
            return node;
          }
          node = node.middle;
          break;
        }
        node = node.code < code ? node.left : node.right;
      }
    }
    return null;
  }
}
class TernarySearchTree {
  constructor() {
    /** @type {TstNode | null} */
    __publicField(this, "node", null);
  }
  /**
   * @param {string} key
   * @param {any} value
   * */
  insert(key2, value) {
    if (this.node === null) {
      this.node = new TstNode(key2, value, 0);
    } else {
      this.node.add(key2, value);
    }
  }
  /**
   * @param {Uint8Array} key
   * @return {any}
   */
  lookup(key2) {
    var _a2, _b2;
    return ((_b2 = (_a2 = this.node) == null ? void 0 : _a2.search(key2)) == null ? void 0 : _b2.value) ?? null;
  }
}
const tree$1 = new TernarySearchTree();
for (let i = 0; i < wellknownHeaderNames.length; ++i) {
  const key2 = headerNameLowerCasedRecord$2[wellknownHeaderNames[i]];
  tree$1.insert(key2, key2);
}
var tree_1 = {
  tree: tree$1
};
const assert$d = require$$0$1;
const { kDestroyed: kDestroyed$1, kBodyUsed: kBodyUsed$1, kListeners, kBody: kBody$2 } = symbols$4;
const { IncomingMessage } = require$$2;
const stream$1 = require$$0$2;
const net$2 = require$$0$3;
const { Blob: Blob$1 } = require$$0;
const nodeUtil = require$$0$4;
const { stringify: stringify2 } = require$$7;
const { EventEmitter: EE$1 } = require$$8;
const { InvalidArgumentError: InvalidArgumentError$n } = errors$1;
const { headerNameLowerCasedRecord: headerNameLowerCasedRecord$1 } = constants$5;
const { tree } = tree_1;
const [nodeMajor, nodeMinor] = process.versions.node.split(".").map((v) => Number(v));
let BodyAsyncIterable$1 = class BodyAsyncIterable {
  constructor(body2) {
    this[kBody$2] = body2;
    this[kBodyUsed$1] = false;
  }
  async *[Symbol.asyncIterator]() {
    assert$d(!this[kBodyUsed$1], "disturbed");
    this[kBodyUsed$1] = true;
    yield* this[kBody$2];
  }
};
function wrapRequestBody(body2) {
  if (isStream$1(body2)) {
    if (bodyLength(body2) === 0) {
      body2.on("data", function() {
        assert$d(false);
      });
    }
    if (typeof body2.readableDidRead !== "boolean") {
      body2[kBodyUsed$1] = false;
      EE$1.prototype.on.call(body2, "data", function() {
        this[kBodyUsed$1] = true;
      });
    }
    return body2;
  } else if (body2 && typeof body2.pipeTo === "function") {
    return new BodyAsyncIterable$1(body2);
  } else if (body2 && typeof body2 !== "string" && !ArrayBuffer.isView(body2) && isIterable$1(body2)) {
    return new BodyAsyncIterable$1(body2);
  } else {
    return body2;
  }
}
function nop() {
}
function isStream$1(obj) {
  return obj && typeof obj === "object" && typeof obj.pipe === "function" && typeof obj.on === "function";
}
function isBlobLike$1(object) {
  if (object === null) {
    return false;
  } else if (object instanceof Blob$1) {
    return true;
  } else if (typeof object !== "object") {
    return false;
  } else {
    const sTag = object[Symbol.toStringTag];
    return (sTag === "Blob" || sTag === "File") && ("stream" in object && typeof object.stream === "function" || "arrayBuffer" in object && typeof object.arrayBuffer === "function");
  }
}
function buildURL$1(url, queryParams) {
  if (url.includes("?") || url.includes("#")) {
    throw new Error('Query params cannot be passed when url already contains "?" or "#".');
  }
  const stringified = stringify2(queryParams);
  if (stringified) {
    url += "?" + stringified;
  }
  return url;
}
function isValidPort(port2) {
  const value = parseInt(port2, 10);
  return value === Number(port2) && value >= 0 && value <= 65535;
}
function isHttpOrHttpsPrefixed(value) {
  return value != null && value[0] === "h" && value[1] === "t" && value[2] === "t" && value[3] === "p" && (value[4] === ":" || value[4] === "s" && value[5] === ":");
}
function parseURL(url) {
  if (typeof url === "string") {
    url = new URL(url);
    if (!isHttpOrHttpsPrefixed(url.origin || url.protocol)) {
      throw new InvalidArgumentError$n("Invalid URL protocol: the URL must start with `http:` or `https:`.");
    }
    return url;
  }
  if (!url || typeof url !== "object") {
    throw new InvalidArgumentError$n("Invalid URL: The URL argument must be a non-null object.");
  }
  if (!(url instanceof URL)) {
    if (url.port != null && url.port !== "" && isValidPort(url.port) === false) {
      throw new InvalidArgumentError$n("Invalid URL: port must be a valid integer or a string representation of an integer.");
    }
    if (url.path != null && typeof url.path !== "string") {
      throw new InvalidArgumentError$n("Invalid URL path: the path must be a string or null/undefined.");
    }
    if (url.pathname != null && typeof url.pathname !== "string") {
      throw new InvalidArgumentError$n("Invalid URL pathname: the pathname must be a string or null/undefined.");
    }
    if (url.hostname != null && typeof url.hostname !== "string") {
      throw new InvalidArgumentError$n("Invalid URL hostname: the hostname must be a string or null/undefined.");
    }
    if (url.origin != null && typeof url.origin !== "string") {
      throw new InvalidArgumentError$n("Invalid URL origin: the origin must be a string or null/undefined.");
    }
    if (!isHttpOrHttpsPrefixed(url.origin || url.protocol)) {
      throw new InvalidArgumentError$n("Invalid URL protocol: the URL must start with `http:` or `https:`.");
    }
    const port2 = url.port != null ? url.port : url.protocol === "https:" ? 443 : 80;
    let origin = url.origin != null ? url.origin : `${url.protocol || ""}//${url.hostname || ""}:${port2}`;
    let path2 = url.path != null ? url.path : `${url.pathname || ""}${url.search || ""}`;
    if (origin[origin.length - 1] === "/") {
      origin = origin.slice(0, origin.length - 1);
    }
    if (path2 && path2[0] !== "/") {
      path2 = `/${path2}`;
    }
    return new URL(`${origin}${path2}`);
  }
  if (!isHttpOrHttpsPrefixed(url.origin || url.protocol)) {
    throw new InvalidArgumentError$n("Invalid URL protocol: the URL must start with `http:` or `https:`.");
  }
  return url;
}
function parseOrigin(url) {
  url = parseURL(url);
  if (url.pathname !== "/" || url.search || url.hash) {
    throw new InvalidArgumentError$n("invalid url");
  }
  return url;
}
function getHostname(host) {
  if (host[0] === "[") {
    const idx2 = host.indexOf("]");
    assert$d(idx2 !== -1);
    return host.substring(1, idx2);
  }
  const idx = host.indexOf(":");
  if (idx === -1) return host;
  return host.substring(0, idx);
}
function getServerName$1(host) {
  if (!host) {
    return null;
  }
  assert$d(typeof host === "string");
  const servername = getHostname(host);
  if (net$2.isIP(servername)) {
    return "";
  }
  return servername;
}
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
function isAsyncIterable(obj) {
  return !!(obj != null && typeof obj[Symbol.asyncIterator] === "function");
}
function isIterable$1(obj) {
  return !!(obj != null && (typeof obj[Symbol.iterator] === "function" || typeof obj[Symbol.asyncIterator] === "function"));
}
function bodyLength(body2) {
  if (body2 == null) {
    return 0;
  } else if (isStream$1(body2)) {
    const state = body2._readableState;
    return state && state.objectMode === false && state.ended === true && Number.isFinite(state.length) ? state.length : null;
  } else if (isBlobLike$1(body2)) {
    return body2.size != null ? body2.size : null;
  } else if (isBuffer$1(body2)) {
    return body2.byteLength;
  }
  return null;
}
function isDestroyed(body2) {
  var _a2;
  return body2 && !!(body2.destroyed || body2[kDestroyed$1] || ((_a2 = stream$1.isDestroyed) == null ? void 0 : _a2.call(stream$1, body2)));
}
function destroy$1(stream2, err) {
  if (stream2 == null || !isStream$1(stream2) || isDestroyed(stream2)) {
    return;
  }
  if (typeof stream2.destroy === "function") {
    if (Object.getPrototypeOf(stream2).constructor === IncomingMessage) {
      stream2.socket = null;
    }
    stream2.destroy(err);
  } else if (err) {
    queueMicrotask(() => {
      stream2.emit("error", err);
    });
  }
  if (stream2.destroyed !== true) {
    stream2[kDestroyed$1] = true;
  }
}
const KEEPALIVE_TIMEOUT_EXPR = /timeout=(\d+)/;
function parseKeepAliveTimeout(val) {
  const m = val.toString().match(KEEPALIVE_TIMEOUT_EXPR);
  return m ? parseInt(m[1], 10) * 1e3 : null;
}
function headerNameToString(value) {
  return typeof value === "string" ? headerNameLowerCasedRecord$1[value] ?? value.toLowerCase() : tree.lookup(value) ?? value.toString("latin1").toLowerCase();
}
function bufferToLowerCasedHeaderName(value) {
  return tree.lookup(value) ?? value.toString("latin1").toLowerCase();
}
function parseHeaders(headers2, obj) {
  if (obj === void 0) obj = {};
  for (let i = 0; i < headers2.length; i += 2) {
    const key2 = headerNameToString(headers2[i]);
    let val = obj[key2];
    if (val) {
      if (typeof val === "string") {
        val = [val];
        obj[key2] = val;
      }
      val.push(headers2[i + 1].toString("utf8"));
    } else {
      const headersValue = headers2[i + 1];
      if (typeof headersValue === "string") {
        obj[key2] = headersValue;
      } else {
        obj[key2] = Array.isArray(headersValue) ? headersValue.map((x) => x.toString("utf8")) : headersValue.toString("utf8");
      }
    }
  }
  if ("content-length" in obj && "content-disposition" in obj) {
    obj["content-disposition"] = Buffer.from(obj["content-disposition"]).toString("latin1");
  }
  return obj;
}
function parseRawHeaders(headers2) {
  const len = headers2.length;
  const ret = new Array(len);
  let hasContentLength = false;
  let contentDispositionIdx = -1;
  let key2;
  let val;
  let kLen = 0;
  for (let n = 0; n < headers2.length; n += 2) {
    key2 = headers2[n];
    val = headers2[n + 1];
    typeof key2 !== "string" && (key2 = key2.toString());
    typeof val !== "string" && (val = val.toString("utf8"));
    kLen = key2.length;
    if (kLen === 14 && key2[7] === "-" && (key2 === "content-length" || key2.toLowerCase() === "content-length")) {
      hasContentLength = true;
    } else if (kLen === 19 && key2[7] === "-" && (key2 === "content-disposition" || key2.toLowerCase() === "content-disposition")) {
      contentDispositionIdx = n + 1;
    }
    ret[n] = key2;
    ret[n + 1] = val;
  }
  if (hasContentLength && contentDispositionIdx !== -1) {
    ret[contentDispositionIdx] = Buffer.from(ret[contentDispositionIdx]).toString("latin1");
  }
  return ret;
}
function isBuffer$1(buffer2) {
  return buffer2 instanceof Uint8Array || Buffer.isBuffer(buffer2);
}
function validateHandler$1(handler, method, upgrade2) {
  if (!handler || typeof handler !== "object") {
    throw new InvalidArgumentError$n("handler must be an object");
  }
  if (typeof handler.onConnect !== "function") {
    throw new InvalidArgumentError$n("invalid onConnect method");
  }
  if (typeof handler.onError !== "function") {
    throw new InvalidArgumentError$n("invalid onError method");
  }
  if (typeof handler.onBodySent !== "function" && handler.onBodySent !== void 0) {
    throw new InvalidArgumentError$n("invalid onBodySent method");
  }
  if (upgrade2 || method === "CONNECT") {
    if (typeof handler.onUpgrade !== "function") {
      throw new InvalidArgumentError$n("invalid onUpgrade method");
    }
  } else {
    if (typeof handler.onHeaders !== "function") {
      throw new InvalidArgumentError$n("invalid onHeaders method");
    }
    if (typeof handler.onData !== "function") {
      throw new InvalidArgumentError$n("invalid onData method");
    }
    if (typeof handler.onComplete !== "function") {
      throw new InvalidArgumentError$n("invalid onComplete method");
    }
  }
}
function isDisturbed(body2) {
  return !!(body2 && (stream$1.isDisturbed(body2) || body2[kBodyUsed$1]));
}
function isErrored(body2) {
  return !!(body2 && stream$1.isErrored(body2));
}
function isReadable(body2) {
  return !!(body2 && stream$1.isReadable(body2));
}
function getSocketInfo(socket) {
  return {
    localAddress: socket.localAddress,
    localPort: socket.localPort,
    remoteAddress: socket.remoteAddress,
    remotePort: socket.remotePort,
    remoteFamily: socket.remoteFamily,
    timeout: socket.timeout,
    bytesWritten: socket.bytesWritten,
    bytesRead: socket.bytesRead
  };
}
function ReadableStreamFrom$1(iterable) {
  let iterator;
  return new ReadableStream(
    {
      async start() {
        iterator = iterable[Symbol.asyncIterator]();
      },
      async pull(controller) {
        const { done, value } = await iterator.next();
        if (done) {
          queueMicrotask(() => {
            var _a2;
            controller.close();
            (_a2 = controller.byobRequest) == null ? void 0 : _a2.respond(0);
          });
        } else {
          const buf = Buffer.isBuffer(value) ? value : Buffer.from(value);
          if (buf.byteLength) {
            controller.enqueue(new Uint8Array(buf));
          }
        }
        return controller.desiredSize > 0;
      },
      async cancel(reason) {
        await iterator.return();
      },
      type: "bytes"
    }
  );
}
function isFormDataLike$1(object) {
  return object && typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && object[Symbol.toStringTag] === "FormData";
}
function addAbortListener$1(signal, listener) {
  if ("addEventListener" in signal) {
    signal.addEventListener("abort", listener, { once: true });
    return () => signal.removeEventListener("abort", listener);
  }
  signal.addListener("abort", listener);
  return () => signal.removeListener("abort", listener);
}
const hasToWellFormed = typeof String.prototype.toWellFormed === "function";
const hasIsWellFormed = typeof String.prototype.isWellFormed === "function";
function toUSVString(val) {
  return hasToWellFormed ? `${val}`.toWellFormed() : nodeUtil.toUSVString(val);
}
function isUSVString(val) {
  return hasIsWellFormed ? `${val}`.isWellFormed() : toUSVString(val) === `${val}`;
}
function isTokenCharCode(c2) {
  switch (c2) {
    case 34:
    case 40:
    case 41:
    case 44:
    case 47:
    case 58:
    case 59:
    case 60:
    case 61:
    case 62:
    case 63:
    case 64:
    case 91:
    case 92:
    case 93:
    case 123:
    case 125:
      return false;
    default:
      return c2 >= 33 && c2 <= 126;
  }
}
function isValidHTTPToken$1(characters) {
  if (characters.length === 0) {
    return false;
  }
  for (let i = 0; i < characters.length; ++i) {
    if (!isTokenCharCode(characters.charCodeAt(i))) {
      return false;
    }
  }
  return true;
}
const headerCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
function isValidHeaderValue$1(characters) {
  return !headerCharRegex.test(characters);
}
function parseRangeHeader(range) {
  if (range == null || range === "") return { start: 0, end: null, size: null };
  const m = range ? range.match(/^bytes (\d+)-(\d+)\/(\d+)?$/) : null;
  return m ? {
    start: parseInt(m[1]),
    end: m[2] ? parseInt(m[2]) : null,
    size: m[3] ? parseInt(m[3]) : null
  } : null;
}
function addListener$1(obj, name, listener) {
  const listeners = obj[kListeners] ?? (obj[kListeners] = []);
  listeners.push([name, listener]);
  obj.on(name, listener);
  return obj;
}
function removeAllListeners$1(obj) {
  for (const [name, listener] of obj[kListeners] ?? []) {
    obj.removeListener(name, listener);
  }
  obj[kListeners] = null;
}
function errorRequest(client2, request2, err) {
  try {
    request2.onError(err);
    assert$d(request2.aborted);
  } catch (err2) {
    client2.emit("error", err2);
  }
}
const kEnumerableProperty = /* @__PURE__ */ Object.create(null);
kEnumerableProperty.enumerable = true;
const normalizedMethodRecordsBase = {
  delete: "DELETE",
  DELETE: "DELETE",
  get: "GET",
  GET: "GET",
  head: "HEAD",
  HEAD: "HEAD",
  options: "OPTIONS",
  OPTIONS: "OPTIONS",
  post: "POST",
  POST: "POST",
  put: "PUT",
  PUT: "PUT"
};
const normalizedMethodRecords$1 = {
  ...normalizedMethodRecordsBase,
  patch: "patch",
  PATCH: "PATCH"
};
Object.setPrototypeOf(normalizedMethodRecordsBase, null);
Object.setPrototypeOf(normalizedMethodRecords$1, null);
var util$m = {
  kEnumerableProperty,
  nop,
  isDisturbed,
  isErrored,
  isReadable,
  toUSVString,
  isUSVString,
  isBlobLike: isBlobLike$1,
  parseOrigin,
  parseURL,
  getServerName: getServerName$1,
  isStream: isStream$1,
  isIterable: isIterable$1,
  isAsyncIterable,
  isDestroyed,
  headerNameToString,
  bufferToLowerCasedHeaderName,
  addListener: addListener$1,
  removeAllListeners: removeAllListeners$1,
  errorRequest,
  parseRawHeaders,
  parseHeaders,
  parseKeepAliveTimeout,
  destroy: destroy$1,
  bodyLength,
  deepClone,
  ReadableStreamFrom: ReadableStreamFrom$1,
  isBuffer: isBuffer$1,
  validateHandler: validateHandler$1,
  getSocketInfo,
  isFormDataLike: isFormDataLike$1,
  buildURL: buildURL$1,
  addAbortListener: addAbortListener$1,
  isValidHTTPToken: isValidHTTPToken$1,
  isValidHeaderValue: isValidHeaderValue$1,
  isTokenCharCode,
  parseRangeHeader,
  normalizedMethodRecordsBase,
  normalizedMethodRecords: normalizedMethodRecords$1,
  isValidPort,
  isHttpOrHttpsPrefixed,
  nodeMajor,
  nodeMinor,
  safeHTTPMethods: ["GET", "HEAD", "OPTIONS", "TRACE"],
  wrapRequestBody
};
const diagnosticsChannel = require$$0$5;
const util$l = require$$0$4;
const undiciDebugLog = util$l.debuglog("undici");
const fetchDebuglog = util$l.debuglog("fetch");
const websocketDebuglog = util$l.debuglog("websocket");
let isClientSet = false;
const channels$3 = {
  // Client
  beforeConnect: diagnosticsChannel.channel("undici:client:beforeConnect"),
  connected: diagnosticsChannel.channel("undici:client:connected"),
  connectError: diagnosticsChannel.channel("undici:client:connectError"),
  sendHeaders: diagnosticsChannel.channel("undici:client:sendHeaders"),
  // Request
  create: diagnosticsChannel.channel("undici:request:create"),
  bodySent: diagnosticsChannel.channel("undici:request:bodySent"),
  headers: diagnosticsChannel.channel("undici:request:headers"),
  trailers: diagnosticsChannel.channel("undici:request:trailers"),
  error: diagnosticsChannel.channel("undici:request:error"),
  // WebSocket
  open: diagnosticsChannel.channel("undici:websocket:open"),
  close: diagnosticsChannel.channel("undici:websocket:close"),
  socketError: diagnosticsChannel.channel("undici:websocket:socket_error"),
  ping: diagnosticsChannel.channel("undici:websocket:ping"),
  pong: diagnosticsChannel.channel("undici:websocket:pong")
};
if (undiciDebugLog.enabled || fetchDebuglog.enabled) {
  const debuglog = fetchDebuglog.enabled ? fetchDebuglog : undiciDebugLog;
  diagnosticsChannel.channel("undici:client:beforeConnect").subscribe((evt) => {
    const {
      connectParams: { version, protocol, port: port2, host }
    } = evt;
    debuglog(
      "connecting to %s using %s%s",
      `${host}${port2 ? `:${port2}` : ""}`,
      protocol,
      version
    );
  });
  diagnosticsChannel.channel("undici:client:connected").subscribe((evt) => {
    const {
      connectParams: { version, protocol, port: port2, host }
    } = evt;
    debuglog(
      "connected to %s using %s%s",
      `${host}${port2 ? `:${port2}` : ""}`,
      protocol,
      version
    );
  });
  diagnosticsChannel.channel("undici:client:connectError").subscribe((evt) => {
    const {
      connectParams: { version, protocol, port: port2, host },
      error
    } = evt;
    debuglog(
      "connection to %s using %s%s errored - %s",
      `${host}${port2 ? `:${port2}` : ""}`,
      protocol,
      version,
      error.message
    );
  });
  diagnosticsChannel.channel("undici:client:sendHeaders").subscribe((evt) => {
    const {
      request: { method, path: path2, origin }
    } = evt;
    debuglog("sending request to %s %s/%s", method, origin, path2);
  });
  diagnosticsChannel.channel("undici:request:headers").subscribe((evt) => {
    const {
      request: { method, path: path2, origin },
      response: { statusCode }
    } = evt;
    debuglog(
      "received response to %s %s/%s - HTTP %d",
      method,
      origin,
      path2,
      statusCode
    );
  });
  diagnosticsChannel.channel("undici:request:trailers").subscribe((evt) => {
    const {
      request: { method, path: path2, origin }
    } = evt;
    debuglog("trailers received from %s %s/%s", method, origin, path2);
  });
  diagnosticsChannel.channel("undici:request:error").subscribe((evt) => {
    const {
      request: { method, path: path2, origin },
      error
    } = evt;
    debuglog(
      "request to %s %s/%s errored - %s",
      method,
      origin,
      path2,
      error.message
    );
  });
  isClientSet = true;
}
if (websocketDebuglog.enabled) {
  if (!isClientSet) {
    const debuglog = undiciDebugLog.enabled ? undiciDebugLog : websocketDebuglog;
    diagnosticsChannel.channel("undici:client:beforeConnect").subscribe((evt) => {
      const {
        connectParams: { version, protocol, port: port2, host }
      } = evt;
      debuglog(
        "connecting to %s%s using %s%s",
        host,
        port2 ? `:${port2}` : "",
        protocol,
        version
      );
    });
    diagnosticsChannel.channel("undici:client:connected").subscribe((evt) => {
      const {
        connectParams: { version, protocol, port: port2, host }
      } = evt;
      debuglog(
        "connected to %s%s using %s%s",
        host,
        port2 ? `:${port2}` : "",
        protocol,
        version
      );
    });
    diagnosticsChannel.channel("undici:client:connectError").subscribe((evt) => {
      const {
        connectParams: { version, protocol, port: port2, host },
        error
      } = evt;
      debuglog(
        "connection to %s%s using %s%s errored - %s",
        host,
        port2 ? `:${port2}` : "",
        protocol,
        version,
        error.message
      );
    });
    diagnosticsChannel.channel("undici:client:sendHeaders").subscribe((evt) => {
      const {
        request: { method, path: path2, origin }
      } = evt;
      debuglog("sending request to %s %s/%s", method, origin, path2);
    });
  }
  diagnosticsChannel.channel("undici:websocket:open").subscribe((evt) => {
    const {
      address: { address, port: port2 }
    } = evt;
    websocketDebuglog("connection opened %s%s", address, port2 ? `:${port2}` : "");
  });
  diagnosticsChannel.channel("undici:websocket:close").subscribe((evt) => {
    const { websocket: websocket2, code, reason } = evt;
    websocketDebuglog(
      "closed connection to %s - %s %s",
      websocket2.url,
      code,
      reason
    );
  });
  diagnosticsChannel.channel("undici:websocket:socket_error").subscribe((err) => {
    websocketDebuglog("connection errored - %s", err.message);
  });
  diagnosticsChannel.channel("undici:websocket:ping").subscribe((evt) => {
    websocketDebuglog("ping received");
  });
  diagnosticsChannel.channel("undici:websocket:pong").subscribe((evt) => {
    websocketDebuglog("pong received");
  });
}
var diagnostics = {
  channels: channels$3
};
const {
  InvalidArgumentError: InvalidArgumentError$m,
  NotSupportedError: NotSupportedError$1
} = errors$1;
const assert$c = require$$0$1;
const {
  isValidHTTPToken,
  isValidHeaderValue,
  isStream,
  destroy,
  isBuffer,
  isFormDataLike,
  isIterable,
  isBlobLike,
  buildURL,
  validateHandler,
  getServerName,
  normalizedMethodRecords
} = util$m;
const { channels: channels$2 } = diagnostics;
const { headerNameLowerCasedRecord } = constants$5;
const invalidPathRegex = /[^\u0021-\u00ff]/;
const kHandler = Symbol("handler");
let Request$1 = class Request {
  constructor(origin, {
    path: path2,
    method,
    body: body2,
    headers: headers2,
    query,
    idempotent,
    blocking,
    upgrade: upgrade2,
    headersTimeout,
    bodyTimeout,
    reset,
    throwOnError,
    expectContinue,
    servername
  }, handler) {
    if (typeof path2 !== "string") {
      throw new InvalidArgumentError$m("path must be a string");
    } else if (path2[0] !== "/" && !(path2.startsWith("http://") || path2.startsWith("https://")) && method !== "CONNECT") {
      throw new InvalidArgumentError$m("path must be an absolute URL or start with a slash");
    } else if (invalidPathRegex.test(path2)) {
      throw new InvalidArgumentError$m("invalid request path");
    }
    if (typeof method !== "string") {
      throw new InvalidArgumentError$m("method must be a string");
    } else if (normalizedMethodRecords[method] === void 0 && !isValidHTTPToken(method)) {
      throw new InvalidArgumentError$m("invalid request method");
    }
    if (upgrade2 && typeof upgrade2 !== "string") {
      throw new InvalidArgumentError$m("upgrade must be a string");
    }
    if (headersTimeout != null && (!Number.isFinite(headersTimeout) || headersTimeout < 0)) {
      throw new InvalidArgumentError$m("invalid headersTimeout");
    }
    if (bodyTimeout != null && (!Number.isFinite(bodyTimeout) || bodyTimeout < 0)) {
      throw new InvalidArgumentError$m("invalid bodyTimeout");
    }
    if (reset != null && typeof reset !== "boolean") {
      throw new InvalidArgumentError$m("invalid reset");
    }
    if (expectContinue != null && typeof expectContinue !== "boolean") {
      throw new InvalidArgumentError$m("invalid expectContinue");
    }
    this.headersTimeout = headersTimeout;
    this.bodyTimeout = bodyTimeout;
    this.throwOnError = throwOnError === true;
    this.method = method;
    this.abort = null;
    if (body2 == null) {
      this.body = null;
    } else if (isStream(body2)) {
      this.body = body2;
      const rState = this.body._readableState;
      if (!rState || !rState.autoDestroy) {
        this.endHandler = function autoDestroy() {
          destroy(this);
        };
        this.body.on("end", this.endHandler);
      }
      this.errorHandler = (err) => {
        if (this.abort) {
          this.abort(err);
        } else {
          this.error = err;
        }
      };
      this.body.on("error", this.errorHandler);
    } else if (isBuffer(body2)) {
      this.body = body2.byteLength ? body2 : null;
    } else if (ArrayBuffer.isView(body2)) {
      this.body = body2.buffer.byteLength ? Buffer.from(body2.buffer, body2.byteOffset, body2.byteLength) : null;
    } else if (body2 instanceof ArrayBuffer) {
      this.body = body2.byteLength ? Buffer.from(body2) : null;
    } else if (typeof body2 === "string") {
      this.body = body2.length ? Buffer.from(body2) : null;
    } else if (isFormDataLike(body2) || isIterable(body2) || isBlobLike(body2)) {
      this.body = body2;
    } else {
      throw new InvalidArgumentError$m("body must be a string, a Buffer, a Readable stream, an iterable, or an async iterable");
    }
    this.completed = false;
    this.aborted = false;
    this.upgrade = upgrade2 || null;
    this.path = query ? buildURL(path2, query) : path2;
    this.origin = origin;
    this.idempotent = idempotent == null ? method === "HEAD" || method === "GET" : idempotent;
    this.blocking = blocking == null ? false : blocking;
    this.reset = reset == null ? null : reset;
    this.host = null;
    this.contentLength = null;
    this.contentType = null;
    this.headers = [];
    this.expectContinue = expectContinue != null ? expectContinue : false;
    if (Array.isArray(headers2)) {
      if (headers2.length % 2 !== 0) {
        throw new InvalidArgumentError$m("headers array must be even");
      }
      for (let i = 0; i < headers2.length; i += 2) {
        processHeader(this, headers2[i], headers2[i + 1]);
      }
    } else if (headers2 && typeof headers2 === "object") {
      if (headers2[Symbol.iterator]) {
        for (const header of headers2) {
          if (!Array.isArray(header) || header.length !== 2) {
            throw new InvalidArgumentError$m("headers must be in key-value pair format");
          }
          processHeader(this, header[0], header[1]);
        }
      } else {
        const keys = Object.keys(headers2);
        for (let i = 0; i < keys.length; ++i) {
          processHeader(this, keys[i], headers2[keys[i]]);
        }
      }
    } else if (headers2 != null) {
      throw new InvalidArgumentError$m("headers must be an object or an array");
    }
    validateHandler(handler, method, upgrade2);
    this.servername = servername || getServerName(this.host);
    this[kHandler] = handler;
    if (channels$2.create.hasSubscribers) {
      channels$2.create.publish({ request: this });
    }
  }
  onBodySent(chunk) {
    if (this[kHandler].onBodySent) {
      try {
        return this[kHandler].onBodySent(chunk);
      } catch (err) {
        this.abort(err);
      }
    }
  }
  onRequestSent() {
    if (channels$2.bodySent.hasSubscribers) {
      channels$2.bodySent.publish({ request: this });
    }
    if (this[kHandler].onRequestSent) {
      try {
        return this[kHandler].onRequestSent();
      } catch (err) {
        this.abort(err);
      }
    }
  }
  onConnect(abort2) {
    assert$c(!this.aborted);
    assert$c(!this.completed);
    if (this.error) {
      abort2(this.error);
    } else {
      this.abort = abort2;
      return this[kHandler].onConnect(abort2);
    }
  }
  onResponseStarted() {
    var _a2, _b2;
    return (_b2 = (_a2 = this[kHandler]).onResponseStarted) == null ? void 0 : _b2.call(_a2);
  }
  onHeaders(statusCode, headers2, resume2, statusText) {
    assert$c(!this.aborted);
    assert$c(!this.completed);
    if (channels$2.headers.hasSubscribers) {
      channels$2.headers.publish({ request: this, response: { statusCode, headers: headers2, statusText } });
    }
    try {
      return this[kHandler].onHeaders(statusCode, headers2, resume2, statusText);
    } catch (err) {
      this.abort(err);
    }
  }
  onData(chunk) {
    assert$c(!this.aborted);
    assert$c(!this.completed);
    try {
      return this[kHandler].onData(chunk);
    } catch (err) {
      this.abort(err);
      return false;
    }
  }
  onUpgrade(statusCode, headers2, socket) {
    assert$c(!this.aborted);
    assert$c(!this.completed);
    return this[kHandler].onUpgrade(statusCode, headers2, socket);
  }
  onComplete(trailers) {
    this.onFinally();
    assert$c(!this.aborted);
    this.completed = true;
    if (channels$2.trailers.hasSubscribers) {
      channels$2.trailers.publish({ request: this, trailers });
    }
    try {
      return this[kHandler].onComplete(trailers);
    } catch (err) {
      this.onError(err);
    }
  }
  onError(error) {
    this.onFinally();
    if (channels$2.error.hasSubscribers) {
      channels$2.error.publish({ request: this, error });
    }
    if (this.aborted) {
      return;
    }
    this.aborted = true;
    return this[kHandler].onError(error);
  }
  onFinally() {
    if (this.errorHandler) {
      this.body.off("error", this.errorHandler);
      this.errorHandler = null;
    }
    if (this.endHandler) {
      this.body.off("end", this.endHandler);
      this.endHandler = null;
    }
  }
  addHeader(key2, value) {
    processHeader(this, key2, value);
    return this;
  }
};
function processHeader(request2, key2, val) {
  if (val && (typeof val === "object" && !Array.isArray(val))) {
    throw new InvalidArgumentError$m(`invalid ${key2} header`);
  } else if (val === void 0) {
    return;
  }
  let headerName = headerNameLowerCasedRecord[key2];
  if (headerName === void 0) {
    headerName = key2.toLowerCase();
    if (headerNameLowerCasedRecord[headerName] === void 0 && !isValidHTTPToken(headerName)) {
      throw new InvalidArgumentError$m("invalid header key");
    }
  }
  if (Array.isArray(val)) {
    const arr = [];
    for (let i = 0; i < val.length; i++) {
      if (typeof val[i] === "string") {
        if (!isValidHeaderValue(val[i])) {
          throw new InvalidArgumentError$m(`invalid ${key2} header`);
        }
        arr.push(val[i]);
      } else if (val[i] === null) {
        arr.push("");
      } else if (typeof val[i] === "object") {
        throw new InvalidArgumentError$m(`invalid ${key2} header`);
      } else {
        arr.push(`${val[i]}`);
      }
    }
    val = arr;
  } else if (typeof val === "string") {
    if (!isValidHeaderValue(val)) {
      throw new InvalidArgumentError$m(`invalid ${key2} header`);
    }
  } else if (val === null) {
    val = "";
  } else {
    val = `${val}`;
  }
  if (request2.host === null && headerName === "host") {
    if (typeof val !== "string") {
      throw new InvalidArgumentError$m("invalid host header");
    }
    request2.host = val;
  } else if (request2.contentLength === null && headerName === "content-length") {
    request2.contentLength = parseInt(val, 10);
    if (!Number.isFinite(request2.contentLength)) {
      throw new InvalidArgumentError$m("invalid content-length header");
    }
  } else if (request2.contentType === null && headerName === "content-type") {
    request2.contentType = val;
    request2.headers.push(key2, val);
  } else if (headerName === "transfer-encoding" || headerName === "keep-alive" || headerName === "upgrade") {
    throw new InvalidArgumentError$m(`invalid ${headerName} header`);
  } else if (headerName === "connection") {
    const value = typeof val === "string" ? val.toLowerCase() : null;
    if (value !== "close" && value !== "keep-alive") {
      throw new InvalidArgumentError$m("invalid connection header");
    }
    if (value === "close") {
      request2.reset = true;
    }
  } else if (headerName === "expect") {
    throw new NotSupportedError$1("expect header not supported");
  } else {
    request2.headers.push(key2, val);
  }
}
var request$3 = Request$1;
const EventEmitter = require$$8;
let Dispatcher$2 = class Dispatcher extends EventEmitter {
  dispatch() {
    throw new Error("not implemented");
  }
  close() {
    throw new Error("not implemented");
  }
  destroy() {
    throw new Error("not implemented");
  }
  compose(...args) {
    const interceptors = Array.isArray(args[0]) ? args[0] : args;
    let dispatch = this.dispatch.bind(this);
    for (const interceptor of interceptors) {
      if (interceptor == null) {
        continue;
      }
      if (typeof interceptor !== "function") {
        throw new TypeError(`invalid interceptor, expected function received ${typeof interceptor}`);
      }
      dispatch = interceptor(dispatch);
      if (dispatch == null || typeof dispatch !== "function" || dispatch.length !== 2) {
        throw new TypeError("invalid interceptor");
      }
    }
    return new ComposedDispatcher(this, dispatch);
  }
};
class ComposedDispatcher extends Dispatcher$2 {
  constructor(dispatcher2, dispatch) {
    super();
    __privateAdd(this, _dispatcher, null);
    __privateAdd(this, _dispatch, null);
    __privateSet(this, _dispatcher, dispatcher2);
    __privateSet(this, _dispatch, dispatch);
  }
  dispatch(...args) {
    __privateGet(this, _dispatch).call(this, ...args);
  }
  close(...args) {
    return __privateGet(this, _dispatcher).close(...args);
  }
  destroy(...args) {
    return __privateGet(this, _dispatcher).destroy(...args);
  }
}
_dispatcher = new WeakMap();
_dispatch = new WeakMap();
var dispatcher = Dispatcher$2;
const Dispatcher$1 = dispatcher;
const {
  ClientDestroyedError: ClientDestroyedError$1,
  ClientClosedError: ClientClosedError2,
  InvalidArgumentError: InvalidArgumentError$l
} = errors$1;
const { kDestroy: kDestroy$3, kClose: kClose$3, kClosed, kDestroyed, kDispatch: kDispatch$3, kInterceptors: kInterceptors$3 } = symbols$4;
const kOnDestroyed = Symbol("onDestroyed");
const kOnClosed = Symbol("onClosed");
const kInterceptedDispatch = Symbol("Intercepted Dispatch");
let DispatcherBase$3 = class DispatcherBase extends Dispatcher$1 {
  constructor() {
    super();
    this[kDestroyed] = false;
    this[kOnDestroyed] = null;
    this[kClosed] = false;
    this[kOnClosed] = [];
  }
  get destroyed() {
    return this[kDestroyed];
  }
  get closed() {
    return this[kClosed];
  }
  get interceptors() {
    return this[kInterceptors$3];
  }
  set interceptors(newInterceptors) {
    if (newInterceptors) {
      for (let i = newInterceptors.length - 1; i >= 0; i--) {
        const interceptor = this[kInterceptors$3][i];
        if (typeof interceptor !== "function") {
          throw new InvalidArgumentError$l("interceptor must be an function");
        }
      }
    }
    this[kInterceptors$3] = newInterceptors;
  }
  close(callback) {
    if (callback === void 0) {
      return new Promise((resolve, reject) => {
        this.close((err, data) => {
          return err ? reject(err) : resolve(data);
        });
      });
    }
    if (typeof callback !== "function") {
      throw new InvalidArgumentError$l("invalid callback");
    }
    if (this[kDestroyed]) {
      queueMicrotask(() => callback(new ClientDestroyedError$1(), null));
      return;
    }
    if (this[kClosed]) {
      if (this[kOnClosed]) {
        this[kOnClosed].push(callback);
      } else {
        queueMicrotask(() => callback(null, null));
      }
      return;
    }
    this[kClosed] = true;
    this[kOnClosed].push(callback);
    const onClosed = () => {
      const callbacks = this[kOnClosed];
      this[kOnClosed] = null;
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](null, null);
      }
    };
    this[kClose$3]().then(() => this.destroy()).then(() => {
      queueMicrotask(onClosed);
    });
  }
  destroy(err, callback) {
    if (typeof err === "function") {
      callback = err;
      err = null;
    }
    if (callback === void 0) {
      return new Promise((resolve, reject) => {
        this.destroy(err, (err2, data) => {
          return err2 ? (
            /* istanbul ignore next: should never error */
            reject(err2)
          ) : resolve(data);
        });
      });
    }
    if (typeof callback !== "function") {
      throw new InvalidArgumentError$l("invalid callback");
    }
    if (this[kDestroyed]) {
      if (this[kOnDestroyed]) {
        this[kOnDestroyed].push(callback);
      } else {
        queueMicrotask(() => callback(null, null));
      }
      return;
    }
    if (!err) {
      err = new ClientDestroyedError$1();
    }
    this[kDestroyed] = true;
    this[kOnDestroyed] = this[kOnDestroyed] || [];
    this[kOnDestroyed].push(callback);
    const onDestroyed = () => {
      const callbacks = this[kOnDestroyed];
      this[kOnDestroyed] = null;
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i](null, null);
      }
    };
    this[kDestroy$3](err).then(() => {
      queueMicrotask(onDestroyed);
    });
  }
  [kInterceptedDispatch](opts, handler) {
    if (!this[kInterceptors$3] || this[kInterceptors$3].length === 0) {
      this[kInterceptedDispatch] = this[kDispatch$3];
      return this[kDispatch$3](opts, handler);
    }
    let dispatch = this[kDispatch$3].bind(this);
    for (let i = this[kInterceptors$3].length - 1; i >= 0; i--) {
      dispatch = this[kInterceptors$3][i](dispatch);
    }
    this[kInterceptedDispatch] = dispatch;
    return dispatch(opts, handler);
  }
  dispatch(opts, handler) {
    if (!handler || typeof handler !== "object") {
      throw new InvalidArgumentError$l("handler must be an object");
    }
    try {
      if (!opts || typeof opts !== "object") {
        throw new InvalidArgumentError$l("opts must be an object.");
      }
      if (this[kDestroyed] || this[kOnDestroyed]) {
        throw new ClientDestroyedError$1();
      }
      if (this[kClosed]) {
        throw new ClientClosedError2();
      }
      return this[kInterceptedDispatch](opts, handler);
    } catch (err) {
      if (typeof handler.onError !== "function") {
        throw new InvalidArgumentError$l("invalid onError method");
      }
      handler.onError(err);
      return false;
    }
  }
};
var dispatcherBase = DispatcherBase$3;
let fastNow = 0;
const RESOLUTION_MS = 1e3;
const TICK_MS = (RESOLUTION_MS >> 1) - 1;
let fastNowTimeout;
const kFastTimer = Symbol("kFastTimer");
const fastTimers = [];
const NOT_IN_LIST = -2;
const TO_BE_CLEARED = -1;
const PENDING = 0;
const ACTIVE = 1;
function onTick() {
  fastNow += TICK_MS;
  let idx = 0;
  let len = fastTimers.length;
  while (idx < len) {
    const timer = fastTimers[idx];
    if (timer._state === PENDING) {
      timer._idleStart = fastNow - TICK_MS;
      timer._state = ACTIVE;
    } else if (timer._state === ACTIVE && fastNow >= timer._idleStart + timer._idleTimeout) {
      timer._state = TO_BE_CLEARED;
      timer._idleStart = -1;
      timer._onTimeout(timer._timerArg);
    }
    if (timer._state === TO_BE_CLEARED) {
      timer._state = NOT_IN_LIST;
      if (--len !== 0) {
        fastTimers[idx] = fastTimers[len];
      }
    } else {
      ++idx;
    }
  }
  fastTimers.length = len;
  if (fastTimers.length !== 0) {
    refreshTimeout();
  }
}
function refreshTimeout() {
  if (fastNowTimeout) {
    fastNowTimeout.refresh();
  } else {
    clearTimeout(fastNowTimeout);
    fastNowTimeout = setTimeout(onTick, TICK_MS);
    if (fastNowTimeout.unref) {
      fastNowTimeout.unref();
    }
  }
}
_S = kFastTimer;
class FastTimer {
  /**
   * @constructor
   * @param {Function} callback A function to be executed after the timer
   * expires.
   * @param {number} delay The time, in milliseconds that the timer should wait
   * before the specified function or code is executed.
   * @param {*} arg
   */
  constructor(callback, delay, arg) {
    __publicField(this, _S, true);
    /**
     * The state of the timer, which can be one of the following:
     * - NOT_IN_LIST (-2)
     * - TO_BE_CLEARED (-1)
     * - PENDING (0)
     * - ACTIVE (1)
     *
     * @type {-2|-1|0|1}
     * @private
     */
    __publicField(this, "_state", NOT_IN_LIST);
    /**
     * The number of milliseconds to wait before calling the callback.
     *
     * @type {number}
     * @private
     */
    __publicField(this, "_idleTimeout", -1);
    /**
     * The time in milliseconds when the timer was started. This value is used to
     * calculate when the timer should expire.
     *
     * @type {number}
     * @default -1
     * @private
     */
    __publicField(this, "_idleStart", -1);
    /**
     * The function to be executed when the timer expires.
     * @type {Function}
     * @private
     */
    __publicField(this, "_onTimeout");
    /**
     * The argument to be passed to the callback when the timer expires.
     *
     * @type {*}
     * @private
     */
    __publicField(this, "_timerArg");
    this._onTimeout = callback;
    this._idleTimeout = delay;
    this._timerArg = arg;
    this.refresh();
  }
  /**
   * Sets the timer's start time to the current time, and reschedules the timer
   * to call its callback at the previously specified duration adjusted to the
   * current time.
   * Using this on a timer that has already called its callback will reactivate
   * the timer.
   *
   * @returns {void}
   */
  refresh() {
    if (this._state === NOT_IN_LIST) {
      fastTimers.push(this);
    }
    if (!fastNowTimeout || fastTimers.length === 1) {
      refreshTimeout();
    }
    this._state = PENDING;
  }
  /**
   * The `clear` method cancels the timer, preventing it from executing.
   *
   * @returns {void}
   * @private
   */
  clear() {
    this._state = TO_BE_CLEARED;
    this._idleStart = -1;
  }
}
var timers$2 = {
  /**
   * The setTimeout() method sets a timer which executes a function once the
   * timer expires.
   * @param {Function} callback A function to be executed after the timer
   * expires.
   * @param {number} delay The time, in milliseconds that the timer should
   * wait before the specified function or code is executed.
   * @param {*} [arg] An optional argument to be passed to the callback function
   * when the timer expires.
   * @returns {NodeJS.Timeout|FastTimer}
   */
  setTimeout(callback, delay, arg) {
    return delay <= RESOLUTION_MS ? setTimeout(callback, delay, arg) : new FastTimer(callback, delay, arg);
  },
  /**
   * The clearTimeout method cancels an instantiated Timer previously created
   * by calling setTimeout.
   *
   * @param {NodeJS.Timeout|FastTimer} timeout
   */
  clearTimeout(timeout) {
    if (timeout[kFastTimer]) {
      timeout.clear();
    } else {
      clearTimeout(timeout);
    }
  },
  /**
   * The setFastTimeout() method sets a fastTimer which executes a function once
   * the timer expires.
   * @param {Function} callback A function to be executed after the timer
   * expires.
   * @param {number} delay The time, in milliseconds that the timer should
   * wait before the specified function or code is executed.
   * @param {*} [arg] An optional argument to be passed to the callback function
   * when the timer expires.
   * @returns {FastTimer}
   */
  setFastTimeout(callback, delay, arg) {
    return new FastTimer(callback, delay, arg);
  },
  /**
   * The clearTimeout method cancels an instantiated FastTimer previously
   * created by calling setFastTimeout.
   *
   * @param {FastTimer} timeout
   */
  clearFastTimeout(timeout) {
    timeout.clear();
  },
  /**
   * The now method returns the value of the internal fast timer clock.
   *
   * @returns {number}
   */
  now() {
    return fastNow;
  },
  /**
   * Trigger the onTick function to process the fastTimers array.
   * Exported for testing purposes only.
   * Marking as deprecated to discourage any use outside of testing.
   * @deprecated
   * @param {number} [delay=0] The delay in milliseconds to add to the now value.
   */
  tick(delay = 0) {
    fastNow += delay - RESOLUTION_MS + 1;
    onTick();
    onTick();
  },
  /**
   * Reset FastTimers.
   * Exported for testing purposes only.
   * Marking as deprecated to discourage any use outside of testing.
   * @deprecated
   */
  reset() {
    fastNow = 0;
    fastTimers.length = 0;
    clearTimeout(fastNowTimeout);
    fastNowTimeout = null;
  },
  /**
   * Exporting for testing purposes only.
   * Marking as deprecated to discourage any use outside of testing.
   * @deprecated
   */
  kFastTimer
};
const net$1 = require$$0$3;
const assert$b = require$$0$1;
const util$k = util$m;
const { InvalidArgumentError: InvalidArgumentError$k, ConnectTimeoutError: ConnectTimeoutError2 } = errors$1;
const timers$1 = timers$2;
function noop$2() {
}
let tls;
let SessionCache;
if (commonjsGlobal.FinalizationRegistry && !(process.env.NODE_V8_COVERAGE || process.env.UNDICI_NO_FG)) {
  SessionCache = class WeakSessionCache {
    constructor(maxCachedSessions) {
      this._maxCachedSessions = maxCachedSessions;
      this._sessionCache = /* @__PURE__ */ new Map();
      this._sessionRegistry = new commonjsGlobal.FinalizationRegistry((key2) => {
        if (this._sessionCache.size < this._maxCachedSessions) {
          return;
        }
        const ref = this._sessionCache.get(key2);
        if (ref !== void 0 && ref.deref() === void 0) {
          this._sessionCache.delete(key2);
        }
      });
    }
    get(sessionKey) {
      const ref = this._sessionCache.get(sessionKey);
      return ref ? ref.deref() : null;
    }
    set(sessionKey, session) {
      if (this._maxCachedSessions === 0) {
        return;
      }
      this._sessionCache.set(sessionKey, new WeakRef(session));
      this._sessionRegistry.register(session, sessionKey);
    }
  };
} else {
  SessionCache = class SimpleSessionCache {
    constructor(maxCachedSessions) {
      this._maxCachedSessions = maxCachedSessions;
      this._sessionCache = /* @__PURE__ */ new Map();
    }
    get(sessionKey) {
      return this._sessionCache.get(sessionKey);
    }
    set(sessionKey, session) {
      if (this._maxCachedSessions === 0) {
        return;
      }
      if (this._sessionCache.size >= this._maxCachedSessions) {
        const { value: oldestKey } = this._sessionCache.keys().next();
        this._sessionCache.delete(oldestKey);
      }
      this._sessionCache.set(sessionKey, session);
    }
  };
}
function buildConnector$2({ allowH2, maxCachedSessions, socketPath, timeout, session: customSession, ...opts }) {
  if (maxCachedSessions != null && (!Number.isInteger(maxCachedSessions) || maxCachedSessions < 0)) {
    throw new InvalidArgumentError$k("maxCachedSessions must be a positive integer or zero");
  }
  const options = { path: socketPath, ...opts };
  const sessionCache = new SessionCache(maxCachedSessions == null ? 100 : maxCachedSessions);
  timeout = timeout == null ? 1e4 : timeout;
  allowH2 = allowH2 != null ? allowH2 : false;
  return function connect2({ hostname, host, protocol, port: port2, servername, localAddress, httpSocket }, callback) {
    let socket;
    if (protocol === "https:") {
      if (!tls) {
        tls = require$$5;
      }
      servername = servername || options.servername || util$k.getServerName(host) || null;
      const sessionKey = servername || hostname;
      assert$b(sessionKey);
      const session = customSession || sessionCache.get(sessionKey) || null;
      port2 = port2 || 443;
      socket = tls.connect({
        highWaterMark: 16384,
        // TLS in node can't have bigger HWM anyway...
        ...options,
        servername,
        session,
        localAddress,
        // TODO(HTTP/2): Add support for h2c
        ALPNProtocols: allowH2 ? ["http/1.1", "h2"] : ["http/1.1"],
        socket: httpSocket,
        // upgrade socket connection
        port: port2,
        host: hostname
      });
      socket.on("session", function(session2) {
        sessionCache.set(sessionKey, session2);
      });
    } else {
      assert$b(!httpSocket, "httpSocket can only be sent on TLS update");
      port2 = port2 || 80;
      socket = net$1.connect({
        highWaterMark: 64 * 1024,
        // Same as nodejs fs streams.
        ...options,
        localAddress,
        port: port2,
        host: hostname
      });
    }
    if (options.keepAlive == null || options.keepAlive) {
      const keepAliveInitialDelay = options.keepAliveInitialDelay === void 0 ? 6e4 : options.keepAliveInitialDelay;
      socket.setKeepAlive(true, keepAliveInitialDelay);
    }
    const clearConnectTimeout = setupConnectTimeout(new WeakRef(socket), { timeout, hostname, port: port2 });
    socket.setNoDelay(true).once(protocol === "https:" ? "secureConnect" : "connect", function() {
      queueMicrotask(clearConnectTimeout);
      if (callback) {
        const cb = callback;
        callback = null;
        cb(null, this);
      }
    }).on("error", function(err) {
      queueMicrotask(clearConnectTimeout);
      if (callback) {
        const cb = callback;
        callback = null;
        cb(err);
      }
    });
    return socket;
  };
}
const setupConnectTimeout = process.platform === "win32" ? (socketWeakRef, opts) => {
  if (!opts.timeout) {
    return noop$2;
  }
  let s1 = null;
  let s2 = null;
  const fastTimer = timers$1.setFastTimeout(() => {
    s1 = setImmediate(() => {
      s2 = setImmediate(() => onConnectTimeout(socketWeakRef.deref(), opts));
    });
  }, opts.timeout);
  return () => {
    timers$1.clearFastTimeout(fastTimer);
    clearImmediate(s1);
    clearImmediate(s2);
  };
} : (socketWeakRef, opts) => {
  if (!opts.timeout) {
    return noop$2;
  }
  let s1 = null;
  const fastTimer = timers$1.setFastTimeout(() => {
    s1 = setImmediate(() => {
      onConnectTimeout(socketWeakRef.deref(), opts);
    });
  }, opts.timeout);
  return () => {
    timers$1.clearFastTimeout(fastTimer);
    clearImmediate(s1);
  };
};
function onConnectTimeout(socket, opts) {
  if (socket == null) {
    return;
  }
  let message = "Connect Timeout Error";
  if (Array.isArray(socket.autoSelectFamilyAttemptedAddresses)) {
    message += ` (attempted addresses: ${socket.autoSelectFamilyAttemptedAddresses.join(", ")},`;
  } else {
    message += ` (attempted address: ${opts.hostname}:${opts.port},`;
  }
  message += ` timeout: ${opts.timeout}ms)`;
  util$k.destroy(socket, new ConnectTimeoutError2(message));
}
var connect$2 = buildConnector$2;
var constants$4 = {};
var utils = {};
Object.defineProperty(utils, "__esModule", { value: true });
utils.enumToMap = void 0;
function enumToMap(obj) {
  const res = {};
  Object.keys(obj).forEach((key2) => {
    const value = obj[key2];
    if (typeof value === "number") {
      res[key2] = value;
    }
  });
  return res;
}
utils.enumToMap = enumToMap;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SPECIAL_HEADERS = exports.HEADER_STATE = exports.MINOR = exports.MAJOR = exports.CONNECTION_TOKEN_CHARS = exports.HEADER_CHARS = exports.TOKEN = exports.STRICT_TOKEN = exports.HEX = exports.URL_CHAR = exports.STRICT_URL_CHAR = exports.USERINFO_CHARS = exports.MARK = exports.ALPHANUM = exports.NUM = exports.HEX_MAP = exports.NUM_MAP = exports.ALPHA = exports.FINISH = exports.H_METHOD_MAP = exports.METHOD_MAP = exports.METHODS_RTSP = exports.METHODS_ICE = exports.METHODS_HTTP = exports.METHODS = exports.LENIENT_FLAGS = exports.FLAGS = exports.TYPE = exports.ERROR = void 0;
  const utils_1 = utils;
  (function(ERROR) {
    ERROR[ERROR["OK"] = 0] = "OK";
    ERROR[ERROR["INTERNAL"] = 1] = "INTERNAL";
    ERROR[ERROR["STRICT"] = 2] = "STRICT";
    ERROR[ERROR["LF_EXPECTED"] = 3] = "LF_EXPECTED";
    ERROR[ERROR["UNEXPECTED_CONTENT_LENGTH"] = 4] = "UNEXPECTED_CONTENT_LENGTH";
    ERROR[ERROR["CLOSED_CONNECTION"] = 5] = "CLOSED_CONNECTION";
    ERROR[ERROR["INVALID_METHOD"] = 6] = "INVALID_METHOD";
    ERROR[ERROR["INVALID_URL"] = 7] = "INVALID_URL";
    ERROR[ERROR["INVALID_CONSTANT"] = 8] = "INVALID_CONSTANT";
    ERROR[ERROR["INVALID_VERSION"] = 9] = "INVALID_VERSION";
    ERROR[ERROR["INVALID_HEADER_TOKEN"] = 10] = "INVALID_HEADER_TOKEN";
    ERROR[ERROR["INVALID_CONTENT_LENGTH"] = 11] = "INVALID_CONTENT_LENGTH";
    ERROR[ERROR["INVALID_CHUNK_SIZE"] = 12] = "INVALID_CHUNK_SIZE";
    ERROR[ERROR["INVALID_STATUS"] = 13] = "INVALID_STATUS";
    ERROR[ERROR["INVALID_EOF_STATE"] = 14] = "INVALID_EOF_STATE";
    ERROR[ERROR["INVALID_TRANSFER_ENCODING"] = 15] = "INVALID_TRANSFER_ENCODING";
    ERROR[ERROR["CB_MESSAGE_BEGIN"] = 16] = "CB_MESSAGE_BEGIN";
    ERROR[ERROR["CB_HEADERS_COMPLETE"] = 17] = "CB_HEADERS_COMPLETE";
    ERROR[ERROR["CB_MESSAGE_COMPLETE"] = 18] = "CB_MESSAGE_COMPLETE";
    ERROR[ERROR["CB_CHUNK_HEADER"] = 19] = "CB_CHUNK_HEADER";
    ERROR[ERROR["CB_CHUNK_COMPLETE"] = 20] = "CB_CHUNK_COMPLETE";
    ERROR[ERROR["PAUSED"] = 21] = "PAUSED";
    ERROR[ERROR["PAUSED_UPGRADE"] = 22] = "PAUSED_UPGRADE";
    ERROR[ERROR["PAUSED_H2_UPGRADE"] = 23] = "PAUSED_H2_UPGRADE";
    ERROR[ERROR["USER"] = 24] = "USER";
  })(exports.ERROR || (exports.ERROR = {}));
  (function(TYPE) {
    TYPE[TYPE["BOTH"] = 0] = "BOTH";
    TYPE[TYPE["REQUEST"] = 1] = "REQUEST";
    TYPE[TYPE["RESPONSE"] = 2] = "RESPONSE";
  })(exports.TYPE || (exports.TYPE = {}));
  (function(FLAGS) {
    FLAGS[FLAGS["CONNECTION_KEEP_ALIVE"] = 1] = "CONNECTION_KEEP_ALIVE";
    FLAGS[FLAGS["CONNECTION_CLOSE"] = 2] = "CONNECTION_CLOSE";
    FLAGS[FLAGS["CONNECTION_UPGRADE"] = 4] = "CONNECTION_UPGRADE";
    FLAGS[FLAGS["CHUNKED"] = 8] = "CHUNKED";
    FLAGS[FLAGS["UPGRADE"] = 16] = "UPGRADE";
    FLAGS[FLAGS["CONTENT_LENGTH"] = 32] = "CONTENT_LENGTH";
    FLAGS[FLAGS["SKIPBODY"] = 64] = "SKIPBODY";
    FLAGS[FLAGS["TRAILING"] = 128] = "TRAILING";
    FLAGS[FLAGS["TRANSFER_ENCODING"] = 512] = "TRANSFER_ENCODING";
  })(exports.FLAGS || (exports.FLAGS = {}));
  (function(LENIENT_FLAGS) {
    LENIENT_FLAGS[LENIENT_FLAGS["HEADERS"] = 1] = "HEADERS";
    LENIENT_FLAGS[LENIENT_FLAGS["CHUNKED_LENGTH"] = 2] = "CHUNKED_LENGTH";
    LENIENT_FLAGS[LENIENT_FLAGS["KEEP_ALIVE"] = 4] = "KEEP_ALIVE";
  })(exports.LENIENT_FLAGS || (exports.LENIENT_FLAGS = {}));
  var METHODS;
  (function(METHODS2) {
    METHODS2[METHODS2["DELETE"] = 0] = "DELETE";
    METHODS2[METHODS2["GET"] = 1] = "GET";
    METHODS2[METHODS2["HEAD"] = 2] = "HEAD";
    METHODS2[METHODS2["POST"] = 3] = "POST";
    METHODS2[METHODS2["PUT"] = 4] = "PUT";
    METHODS2[METHODS2["CONNECT"] = 5] = "CONNECT";
    METHODS2[METHODS2["OPTIONS"] = 6] = "OPTIONS";
    METHODS2[METHODS2["TRACE"] = 7] = "TRACE";
    METHODS2[METHODS2["COPY"] = 8] = "COPY";
    METHODS2[METHODS2["LOCK"] = 9] = "LOCK";
    METHODS2[METHODS2["MKCOL"] = 10] = "MKCOL";
    METHODS2[METHODS2["MOVE"] = 11] = "MOVE";
    METHODS2[METHODS2["PROPFIND"] = 12] = "PROPFIND";
    METHODS2[METHODS2["PROPPATCH"] = 13] = "PROPPATCH";
    METHODS2[METHODS2["SEARCH"] = 14] = "SEARCH";
    METHODS2[METHODS2["UNLOCK"] = 15] = "UNLOCK";
    METHODS2[METHODS2["BIND"] = 16] = "BIND";
    METHODS2[METHODS2["REBIND"] = 17] = "REBIND";
    METHODS2[METHODS2["UNBIND"] = 18] = "UNBIND";
    METHODS2[METHODS2["ACL"] = 19] = "ACL";
    METHODS2[METHODS2["REPORT"] = 20] = "REPORT";
    METHODS2[METHODS2["MKACTIVITY"] = 21] = "MKACTIVITY";
    METHODS2[METHODS2["CHECKOUT"] = 22] = "CHECKOUT";
    METHODS2[METHODS2["MERGE"] = 23] = "MERGE";
    METHODS2[METHODS2["M-SEARCH"] = 24] = "M-SEARCH";
    METHODS2[METHODS2["NOTIFY"] = 25] = "NOTIFY";
    METHODS2[METHODS2["SUBSCRIBE"] = 26] = "SUBSCRIBE";
    METHODS2[METHODS2["UNSUBSCRIBE"] = 27] = "UNSUBSCRIBE";
    METHODS2[METHODS2["PATCH"] = 28] = "PATCH";
    METHODS2[METHODS2["PURGE"] = 29] = "PURGE";
    METHODS2[METHODS2["MKCALENDAR"] = 30] = "MKCALENDAR";
    METHODS2[METHODS2["LINK"] = 31] = "LINK";
    METHODS2[METHODS2["UNLINK"] = 32] = "UNLINK";
    METHODS2[METHODS2["SOURCE"] = 33] = "SOURCE";
    METHODS2[METHODS2["PRI"] = 34] = "PRI";
    METHODS2[METHODS2["DESCRIBE"] = 35] = "DESCRIBE";
    METHODS2[METHODS2["ANNOUNCE"] = 36] = "ANNOUNCE";
    METHODS2[METHODS2["SETUP"] = 37] = "SETUP";
    METHODS2[METHODS2["PLAY"] = 38] = "PLAY";
    METHODS2[METHODS2["PAUSE"] = 39] = "PAUSE";
    METHODS2[METHODS2["TEARDOWN"] = 40] = "TEARDOWN";
    METHODS2[METHODS2["GET_PARAMETER"] = 41] = "GET_PARAMETER";
    METHODS2[METHODS2["SET_PARAMETER"] = 42] = "SET_PARAMETER";
    METHODS2[METHODS2["REDIRECT"] = 43] = "REDIRECT";
    METHODS2[METHODS2["RECORD"] = 44] = "RECORD";
    METHODS2[METHODS2["FLUSH"] = 45] = "FLUSH";
  })(METHODS = exports.METHODS || (exports.METHODS = {}));
  exports.METHODS_HTTP = [
    METHODS.DELETE,
    METHODS.GET,
    METHODS.HEAD,
    METHODS.POST,
    METHODS.PUT,
    METHODS.CONNECT,
    METHODS.OPTIONS,
    METHODS.TRACE,
    METHODS.COPY,
    METHODS.LOCK,
    METHODS.MKCOL,
    METHODS.MOVE,
    METHODS.PROPFIND,
    METHODS.PROPPATCH,
    METHODS.SEARCH,
    METHODS.UNLOCK,
    METHODS.BIND,
    METHODS.REBIND,
    METHODS.UNBIND,
    METHODS.ACL,
    METHODS.REPORT,
    METHODS.MKACTIVITY,
    METHODS.CHECKOUT,
    METHODS.MERGE,
    METHODS["M-SEARCH"],
    METHODS.NOTIFY,
    METHODS.SUBSCRIBE,
    METHODS.UNSUBSCRIBE,
    METHODS.PATCH,
    METHODS.PURGE,
    METHODS.MKCALENDAR,
    METHODS.LINK,
    METHODS.UNLINK,
    METHODS.PRI,
    // TODO(indutny): should we allow it with HTTP?
    METHODS.SOURCE
  ];
  exports.METHODS_ICE = [
    METHODS.SOURCE
  ];
  exports.METHODS_RTSP = [
    METHODS.OPTIONS,
    METHODS.DESCRIBE,
    METHODS.ANNOUNCE,
    METHODS.SETUP,
    METHODS.PLAY,
    METHODS.PAUSE,
    METHODS.TEARDOWN,
    METHODS.GET_PARAMETER,
    METHODS.SET_PARAMETER,
    METHODS.REDIRECT,
    METHODS.RECORD,
    METHODS.FLUSH,
    // For AirPlay
    METHODS.GET,
    METHODS.POST
  ];
  exports.METHOD_MAP = utils_1.enumToMap(METHODS);
  exports.H_METHOD_MAP = {};
  Object.keys(exports.METHOD_MAP).forEach((key2) => {
    if (/^H/.test(key2)) {
      exports.H_METHOD_MAP[key2] = exports.METHOD_MAP[key2];
    }
  });
  (function(FINISH) {
    FINISH[FINISH["SAFE"] = 0] = "SAFE";
    FINISH[FINISH["SAFE_WITH_CB"] = 1] = "SAFE_WITH_CB";
    FINISH[FINISH["UNSAFE"] = 2] = "UNSAFE";
  })(exports.FINISH || (exports.FINISH = {}));
  exports.ALPHA = [];
  for (let i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
    exports.ALPHA.push(String.fromCharCode(i));
    exports.ALPHA.push(String.fromCharCode(i + 32));
  }
  exports.NUM_MAP = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9
  };
  exports.HEX_MAP = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    A: 10,
    B: 11,
    C: 12,
    D: 13,
    E: 14,
    F: 15,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15
  };
  exports.NUM = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
  ];
  exports.ALPHANUM = exports.ALPHA.concat(exports.NUM);
  exports.MARK = ["-", "_", ".", "!", "~", "*", "'", "(", ")"];
  exports.USERINFO_CHARS = exports.ALPHANUM.concat(exports.MARK).concat(["%", ";", ":", "&", "=", "+", "$", ","]);
  exports.STRICT_URL_CHAR = [
    "!",
    '"',
    "$",
    "%",
    "&",
    "'",
    "(",
    ")",
    "*",
    "+",
    ",",
    "-",
    ".",
    "/",
    ":",
    ";",
    "<",
    "=",
    ">",
    "@",
    "[",
    "\\",
    "]",
    "^",
    "_",
    "`",
    "{",
    "|",
    "}",
    "~"
  ].concat(exports.ALPHANUM);
  exports.URL_CHAR = exports.STRICT_URL_CHAR.concat(["	", "\f"]);
  for (let i = 128; i <= 255; i++) {
    exports.URL_CHAR.push(i);
  }
  exports.HEX = exports.NUM.concat(["a", "b", "c", "d", "e", "f", "A", "B", "C", "D", "E", "F"]);
  exports.STRICT_TOKEN = [
    "!",
    "#",
    "$",
    "%",
    "&",
    "'",
    "*",
    "+",
    "-",
    ".",
    "^",
    "_",
    "`",
    "|",
    "~"
  ].concat(exports.ALPHANUM);
  exports.TOKEN = exports.STRICT_TOKEN.concat([" "]);
  exports.HEADER_CHARS = ["	"];
  for (let i = 32; i <= 255; i++) {
    if (i !== 127) {
      exports.HEADER_CHARS.push(i);
    }
  }
  exports.CONNECTION_TOKEN_CHARS = exports.HEADER_CHARS.filter((c2) => c2 !== 44);
  exports.MAJOR = exports.NUM_MAP;
  exports.MINOR = exports.MAJOR;
  var HEADER_STATE;
  (function(HEADER_STATE2) {
    HEADER_STATE2[HEADER_STATE2["GENERAL"] = 0] = "GENERAL";
    HEADER_STATE2[HEADER_STATE2["CONNECTION"] = 1] = "CONNECTION";
    HEADER_STATE2[HEADER_STATE2["CONTENT_LENGTH"] = 2] = "CONTENT_LENGTH";
    HEADER_STATE2[HEADER_STATE2["TRANSFER_ENCODING"] = 3] = "TRANSFER_ENCODING";
    HEADER_STATE2[HEADER_STATE2["UPGRADE"] = 4] = "UPGRADE";
    HEADER_STATE2[HEADER_STATE2["CONNECTION_KEEP_ALIVE"] = 5] = "CONNECTION_KEEP_ALIVE";
    HEADER_STATE2[HEADER_STATE2["CONNECTION_CLOSE"] = 6] = "CONNECTION_CLOSE";
    HEADER_STATE2[HEADER_STATE2["CONNECTION_UPGRADE"] = 7] = "CONNECTION_UPGRADE";
    HEADER_STATE2[HEADER_STATE2["TRANSFER_ENCODING_CHUNKED"] = 8] = "TRANSFER_ENCODING_CHUNKED";
  })(HEADER_STATE = exports.HEADER_STATE || (exports.HEADER_STATE = {}));
  exports.SPECIAL_HEADERS = {
    "connection": HEADER_STATE.CONNECTION,
    "content-length": HEADER_STATE.CONTENT_LENGTH,
    "proxy-connection": HEADER_STATE.CONNECTION,
    "transfer-encoding": HEADER_STATE.TRANSFER_ENCODING,
    "upgrade": HEADER_STATE.UPGRADE
  };
})(constants$4);
var llhttpWasm;
var hasRequiredLlhttpWasm;
function requireLlhttpWasm() {
  if (hasRequiredLlhttpWasm) return llhttpWasm;
  hasRequiredLlhttpWasm = 1;
  const { Buffer: Buffer2 } = require$$0;
  llhttpWasm = Buffer2.from("AGFzbQEAAAABJwdgAX8Bf2ADf39/AX9gAX8AYAJ/fwBgBH9/f38Bf2AAAGADf39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQAEA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAAy0sBQYAAAIAAAAAAAACAQIAAgICAAADAAAAAAMDAwMBAQEBAQEBAQEAAAIAAAAEBQFwARISBQMBAAIGCAF/AUGA1AQLB9EFIgZtZW1vcnkCAAtfaW5pdGlhbGl6ZQAIGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBAAtsbGh0dHBfaW5pdAAJGGxsaHR0cF9zaG91bGRfa2VlcF9hbGl2ZQAvDGxsaHR0cF9hbGxvYwALBm1hbGxvYwAxC2xsaHR0cF9mcmVlAAwEZnJlZQAMD2xsaHR0cF9nZXRfdHlwZQANFWxsaHR0cF9nZXRfaHR0cF9tYWpvcgAOFWxsaHR0cF9nZXRfaHR0cF9taW5vcgAPEWxsaHR0cF9nZXRfbWV0aG9kABAWbGxodHRwX2dldF9zdGF0dXNfY29kZQAREmxsaHR0cF9nZXRfdXBncmFkZQASDGxsaHR0cF9yZXNldAATDmxsaHR0cF9leGVjdXRlABQUbGxodHRwX3NldHRpbmdzX2luaXQAFQ1sbGh0dHBfZmluaXNoABYMbGxodHRwX3BhdXNlABcNbGxodHRwX3Jlc3VtZQAYG2xsaHR0cF9yZXN1bWVfYWZ0ZXJfdXBncmFkZQAZEGxsaHR0cF9nZXRfZXJybm8AGhdsbGh0dHBfZ2V0X2Vycm9yX3JlYXNvbgAbF2xsaHR0cF9zZXRfZXJyb3JfcmVhc29uABwUbGxodHRwX2dldF9lcnJvcl9wb3MAHRFsbGh0dHBfZXJybm9fbmFtZQAeEmxsaHR0cF9tZXRob2RfbmFtZQAfEmxsaHR0cF9zdGF0dXNfbmFtZQAgGmxsaHR0cF9zZXRfbGVu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PgtBhwEMPQtBiAEMPAtBiQEMOwtBigEMOgtBiwEMOQtBjAEMOAtBjQEMNwtBjgEMNgtBjwEMNQtBkAEMNAtBkQEMMwtBkgEMMgtBkwEMMQtBlAEMMAtBlQEMLwtBlgEMLgtBlwEMLQtBmAEMLAtBmQEMKwtBmgEMKgtBmwEMKQtBnAEMKAtBnQEMJwtBngEMJgtBnwEMJQtBoAEMJAtBoQEMIwtBogEMIgtBowEMIQtBpAEMIAtBpQEMHwtBpgEMHgtBpwEMHQtBqAEMHAtBqQEMGwtBqgEMGgtBqwEMGQtBrAEMGAtBrQEMFwtBrgEMFgtBAQwVC0GvAQwUC0GwAQwTC0GxAQwSC0GzAQwRC0GyAQwQC0G0AQwPC0G1AQwOC0G2AQwNC0G3AQwMC0G4AQwLC0G5AQwKC0G6AQwJC0G7AQwIC0HGAQwHC0G8AQwGC0G9AQwFC0G+AQwEC0G/AQwDC0HAAQwCC0HCAQwBC0HBAQshAwNAAkACQAJAAkACQAJAAkACQAJAIAICfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJ/AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAgJ/AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACfwJAAkACfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAC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iQEhAwykAgtBASABLQAAQd8ARw1nGiABQQFqIQEMXgtBigEhAyABIARGDaICIAIoAgAiACAEIAFraiEFIAEgAGtBAWohBgNAIAEtAAAgAEGMzwBqLQAARw1kIABBAUYN+gEgAEEBaiEAIAQgAUEBaiIBRw0ACyACIAU2AgAMogILQYsBIQMgASAERg2hAiACKAIAIgAgBCABa2ohBSABIABrQQJqIQYCQANAIAEtAAAgAEGOzwBqLQAARw1kIABBAkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAyiAgsgAkEANgIAIAZBAWohAUECDGULQYwBIQMgASAERg2gAiACKAIAIgAgBCABa2ohBSABIABrQQFqIQYCQANAIAEtAAAgAEHwzwBqLQAARw1jIABBAUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAyhAgsgAkEANgIAIAZBAWohAUEfDGQLQY0BIQMgASAERg2fAiACKAIAIgAgBCABa2ohBSABIABrQQFqIQYCQANAIAEtAAAgAEHyzwBqLQAARw1iIABBAUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAygAgsgAkEANgIAIAZBAWohAUEJDGMLIAEgBEYEQEGOASEDDJ8CCwJAAkAgAS0AAEHJAGsOBwBiYmJiYgFiCyABQQFqIQFB+AAhAwyGAgsgAUEBaiEBQfkAIQMMhQILQY8BIQMgASAERg2dAiACKAIAIgAgBCABa2ohBSABIABrQQVqIQYCQANAIAEtAAAgAEGRzwBqLQAARw1gIABBBUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAyeAgsgAkEANgIAIAZBAWohAUEYDGELQZABIQMgASAERg2cAiACKAIAIgAgBCABa2ohBSABIABrQQJqIQYCQANAIAEtAAAgAEGXzwBqLQAARw1fIABBAkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAydAgsgAkEANgIAIAZBAWohAUEXDGALQZEBIQMgASAERg2bAiACKAIAIgAgBCABa2ohBSABIABrQQZqIQYCQANAIAEtAAAgAEGazwBqLQAARw1eIABBBkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAycAgsgAkEANgIAIAZBAWohAUEV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JSIARQ0RIAJB5QA2AhwgAiABNgIUIAIgADYCDEEAIQMMtAELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0gIAJB0wA2AhwgAiABNgIUIAIgADYCDEEAIQMMswELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0iIAJB0gA2AhwgAiABNgIUIAIgADYCDEEAIQMMsgELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0OIAJB5QA2AhwgAiABNgIUIAIgADYCDEEAIQMMsQELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0dIAJB0wA2AhwgAiABNgIUIAIgADYCDEEAIQMMsAELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0fIAJB0gA2AhwgAiABNgIUIAIgADYCDEEAIQMMrwELIABBP0cNASABQQFqCyEBQQUhAwyUAQtBACEDIAJBADYCHCACIAE2AhQgAkH9EjYCECACQQc2AgwMrAELIAJBADYCHCACIAE2AhQgAkHcCDYCECACQQc2AgxBACEDDKsBCyACKAIEIQAgAkEANgIEIAIgACABECUiAEUNByACQeUANgIcIAIgATYCFCACIAA2AgxBACEDDKoBCyACKAIEIQAgAkEANgIEIAIgACABECUiAEUNFiACQdMANgIcIAIgATYCFCACIAA2AgxBACEDDKkBCyACKAIEIQAgAkEANgIEIAIgACABECUiAEUNGCACQdIANgIcIAIgATYCFCACIAA2AgxBACEDDKgBCyACQQA2AhwgAiABNgIUIAJBxgo2AhAgAkEHNgIMQQAhAwynAQsgAigCBCEAIAJBADYCBCACIAAgARAlIgBFDQMgAkHlADYCHCACIAE2AhQgAiAANgIMQQAhAwymAQsgAigCBCEAIAJBADYCBCACIAAgARAlIgBFDRIgAkHTADYCHCACIAE2AhQgAiAANgIMQQAhAwylAQsgAigCBCEAIAJBADYCBCACIAAgARAlIgBFDRQgAkHSADYCHCACIAE2AhQgAiAANgIMQQAhAwykAQsgAigCBCEAIAJBADYCBCACIAAgARAlIgBFDQAgAkHlADYCHCACIAE2AhQgAiAANgIMQQAhAwyjAQtB1QAhAwyJAQsgAEEVRwRAIAJBADYCHCACIAE2AhQgAkG5DTYCECACQRo2AgxBACEDDKIBCyACQeQANgIcIAIgATYCFCACQeMXNgIQIAJBFTYCDEEAIQMMoQELIAJBADYCACAGQQFqIQEgAi0AKSIAQSNrQQtJDQQCQCAAQQZLDQBBASAAdEHKAHFFDQAMBQtBACEDIAJBADYCHCACIAE2AhQgAkH3CTYCECACQQg2AgwMoAELIAJBADYCACAGQQFqIQEgAi0AKUEhRg0DIAJBADYCHCACIAE2AhQgAkGbCjYCECACQQg2AgxBACEDDJ8BCyACQQA2AgALQQAhAyACQQA2AhwgAiABNgIUIAJBkDM2AhAgAkEINgIMDJ0BCyACQQA2AgAgBkEBaiEBIAItAClBI0kNACACQQA2AhwgAiABNgIUIAJB0wk2AhAgAkEINgIMQQAhAwycAQtB0QAhAwyCAQsgAS0AAEEwayIAQf8BcUEKSQRAIAIgADoAKiABQQFqIQFBzwAhAwyCAQsgAigCBCEAIAJBADYCBCACIAAgARAoIgBFDYYBIAJB3gA2AhwgAiABNgIUIAIgADYCDEEAIQMMmgELIAIoAgQhACACQQA2AgQgAiAAIAEQKCIARQ2GASACQdwANgIcIAIgATYCFCACIAA2AgxBACEDDJkBCyACKAIEIQAgAkEANgIEIAIgACAFECgiAEUEQCAFIQEMhwELIAJB2gA2AhwgAiAFNgIUIAIgADYCDAyYAQtBACEBQQEhAwsgAiADOgArIAVBAWohAwJAAkACQCACLQAtQRBxDQACQAJAAkAgAi0AKg4DAQACBAsgBkUNAwwCCyAADQEMAgsgAUUNAQsgAigCBCEAIAJBADYCBCACIAAgAxAoIgBFBEAgAyEBDAILIAJB2AA2AhwgAiADNgIUIAIgADYCDEEAIQMMmAELIAIoAgQhACACQQA2AgQgAiAAIAMQKCIARQRAIAMhAQyHAQsgAkHZADYCHCACIAM2AhQgAiAANgIMQQAhAwyXAQtBzAAhAwx9CyAAQRVHBEAgAkEANgIcIAIgATYCFCACQZQNNgIQIAJBITYCDEEAIQMMlgELIAJB1wA2AhwgAiABNgIUIAJByRc2AhAgAkEVNgIMQQAhAwyVAQtBACEDIAJBADYCHCACIAE2AhQgAkGAETYCECACQQk2AgwMlAELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0AIAJB0wA2AhwgAiABNgIUIAIgADYCDEEAIQMMkwELQckAIQMMeQsgAkEANgIcIAIgATYCFCACQcEoNgIQIAJBBzYCDCACQQA2AgBBACEDDJEBCyACKAIEIQBBACEDIAJBADYCBCACIAAgARAlIgBFDQAgAkHSADYCHCACIAE2AhQgAiAANgIMDJABC0HIACEDDHYLIAJBADYCACAFIQELIAJBgBI7ASogAUEBaiEBQQAhAAJAIAIoAjgiA0UNACADKAIwIgNFDQAgAiADEQAAIQALIAANAQtBxwAhAwxzCyAAQRVGBEAgAkHRADYCHCACIAE2AhQgAkHjFzYCECACQRU2AgxBACEDDIwBC0EAIQMgAkEANgIcIAIgATYCFCACQbkNNgIQIAJBGjYCDAyLAQtBACEDIAJBADYCHCACIAE2AhQgAkGgGTYCECACQR42AgwMigELIAEtAABBOkYEQCACKAIEIQBBACEDIAJBADYCBCACIAAgARApIgBFDQEgAkHDADYCHCACIAA2AgwgAiABQQFqNgIUDIoBC0EAIQMgAkEANgIcIAIgATYCFCACQbERNgIQIAJBCjYCDAyJAQsgAUEBaiEBQTshAwxvCyACQcMANgIcIAIgADYCDCACIAFBAWo2AhQMhwELQQAhAyACQQA2AhwgAiABNgIUIAJB8A42AhAgAkEcNgIMDIYBCyACIAIvATBBEHI7ATAMZgsCQCACLwEwIgBBCHFFDQAgAi0AKEEBRw0AIAItAC1BCHFFDQMLIAIgAEH3+wNxQYAEcjsBMAwECyABIARHBEACQANAIAEtAABBMGsiAEH/AXFBCk8EQEE1IQMMbgsgAikDICIKQpmz5syZs+bMGVYNASACIApCCn4iCjcDICAKIACtQv8BgyILQn+FVg0BIAIgCiALfDcDICAEIAFBAWoiAUcNAAtBOSEDDIUBCyACKAIEIQBBACEDIAJBADYCBCACIAAgAUEBaiIBECoiAA0MDHcLQTkhAwyDAQsgAi0AMEEgcQ0GQcUBIQMMaQtBACEDIAJBADYCBCACIAEgARAqIgBFDQQgAkE6NgIcIAIgADYCDCACIAFBAWo2AhQMgQELIAItAChBAUcNACACLQAtQQhxRQ0BC0E3IQMMZgsgAigCBCEAQQAhAyACQQA2AgQgAiAAIAEQKiIABEAgAkE7NgIcIAIgADYCDCACIAFBAWo2AhQMfwsgAUEBaiEBDG4LIAJBCDoALAwECyABQQFqIQEMbQtBACEDIAJBADYCHCACIAE2AhQgAkHkEjYCECACQQQ2AgwMewsgAigCBCEAQQAhAyACQQA2AgQgAiAAIAEQKiIARQ1sIAJBNzYCHCACIAE2AhQgAiAANgIMDHoLIAIgAi8BMEEgcjsBMAtBMCEDDF8LIAJBNjYCHCACIAE2AhQgAiAANgIMDHcLIABBLEcNASABQQFqIQBBASEBAkACQAJAAkACQCACLQAsQQVrDgQDAQIEAAsgACEBDAQLQQIhAQwBC0EEIQELIAJBAToALCACIAIvATAgAXI7ATAgACEBDAELIAIgAi8BMEEIcjsBMCAAIQELQTkhAwxcCyACQQA6ACwLQTQhAwxaCyABIARGBEBBLSEDDHMLAkACQANAAkAgAS0AAEEKaw4EAgAAAwALIAQgAUEBaiIBRw0AC0EtIQMMdAsgAigCBCEAQQAhAyACQQA2AgQgAiAAIAEQKiIARQ0CIAJBLDYCHCACIAE2AhQgAiAANgIMDHMLIAIoAgQhAEEAIQMgAkEANgIEIAIgACABECoiAEUEQCABQQFqIQEMAgsgAkEsNgIcIAIgADYCDCACIAFBAWo2AhQMcgsgAS0AAEENRgRAIAIoAgQhAEEAIQMgAkEANgIEIAIgACABECoiAEUEQCABQQFqIQEMAgsgAkEsNgIcIAIgADYCDCACIAFBAWo2AhQMcgsgAi0ALUEBcQRAQcQBIQMMWQsgAigCBCEAQQAhAyACQQA2AgQgAiAAIAEQKiIADQEMZQtBLyEDDFcLIAJBLjYCHCACIAE2AhQgAiAANgIMDG8LQQAhAyACQQA2AhwgAiABNgIUIAJB8BQ2AhAgAkEDNgIMDG4LQQEhAwJAAkACQAJAIAItACxBBWsOBAMBAgAECyACIAIvATBBCHI7ATAMAwtBAiEDDAELQQQhAwsgAkEBOgAsIAIgAi8BMCADcjsBMAtBKiEDDFMLQQAhAyACQQA2AhwgAiABNgIUIAJB4Q82AhAgAkEKNgIMDGsLQQEhAwJAAkACQAJAAkACQCACLQAsQQJrDgcFBAQDAQIABAsgAiACLwEwQQhyOwEwDAMLQQIhAwwBC0EEIQMLIAJBAToALCACIAIvATAgA3I7ATALQSshAwxSC0EAIQMgAkEANgIcIAIgATYCFCACQasSNgIQIAJBCzYCDAxqC0EAIQMgAkEANgIcIAIgATYCFCACQf0NNgIQIAJBHTYCDAxpCyABIARHBEADQCABLQAAQSBHDUggBCABQQFqIgFHDQALQSUhAwxpC0ElIQMMaAsgAi0ALUEBcQRAQcMBIQMMTwsgAigCBCEAQQAhAyACQQA2AgQgAiAAIAEQKSIABEAgAkEmNgIcIAIgADYCDCACIAFBAWo2AhQMaAsgAUEBaiEBDFwLIAFBAWohASACLwEwIgBBgAFxBEBBACEAAkAgAigCOCIDRQ0AIAMoAlQiA0UNACACIAMRAAAhAAsgAEUNBiAAQRVHDR8gAkEFNgIcIAIgATYCFCACQfkXNgIQIAJBFTYCDEEAIQMMZwsCQCAAQaAEcUGgBEcNACACLQAtQQJxDQBBACEDIAJBADYCHCACIAE2AhQgAkGWEzYCECACQQQ2AgwMZwsgAgJ/IAIvATBBFHFBFEYEQEEBIAItAChBAUYNARogAi8BMkHlAEYMAQsgAi0AKUEFRgs6AC5BACEAAkAgAigCOCIDRQ0AIAMoAiQiA0UNACACIAMRAAAhAAsCQAJAAkACQAJAIAAOFgIBAAQEBAQEBAQEBAQEBAQEBAQEBAMECyACQQE6AC4LIAIgAi8BMEHAAHI7ATALQSchAwxPCyACQSM2AhwgAiABNgIUIAJBpRY2AhAgAkEVNgIMQQAhAwxnC0EAIQMgAkEANgIcIAIgATYCFCACQdULNgIQIAJBETYCDAxmC0EAIQACQCACKAI4IgNFDQAgAygCLCIDRQ0AIAIgAxEAACEACyAADQELQQ4hAwxLCyAAQRVGBEAgAkECNgIcIAIgATYCFCACQbAYNgIQIAJBFTYCDEEAIQMMZAtBACEDIAJBADYCHCACIAE2AhQgAkGnDjYCECACQRI2AgwMYwtBACEDIAJBADYCHCACIAE2AhQgAkGqHDYCECACQQ82AgwMYgsgAigCBCEAQQAhAyACQQA2AgQgAiAAIAEgCqdqIgEQKyIARQ0AIAJBBTYCHCACIAE2AhQgAiAANgIMDGELQQ8hAwxHC0EAIQMgAkEANgIcIAIgATYCFCACQc0TNgIQIAJBDDYCDAxfC0IBIQoLIAFBAWohAQJAIAIpAyAiC0L//////////w9YBEAgAiALQgSGIAqENwMgDAELQQAhAyACQQA2AhwgAiABNgIUIAJBrQk2AhAgAkEMNgIMDF4LQSQhAwxEC0EAIQMgAkEANgIcIAIgATYCFCACQc0TNgIQIAJBDDYCDAxcCyACKAIEIQBBACEDIAJBADYCBCACIAAgARAsIgBFBEAgAUEBaiEBDFILIAJBFzYCHCACIAA2AgwgAiABQQFqNgIUDFsLIAIoAgQhAEEAIQMgAkEANgIEAkAgAiAAIAEQLCIARQRAIAFBAWohAQwBCyACQRY2AhwgAiAANgIMIAIgAUEBajYCFAxbC0EfIQMMQQtBACEDIAJBADYCHCACIAE2AhQgAkGaDzYCECACQSI2AgwMWQsgAigCBCEAQQAhAyACQQA2AgQgAiAAIAEQLSIARQRAIAFBAWohAQxQCyACQRQ2AhwgAiAANgIMIAIgAUEBajYCFAxYCyACKAIEIQBBACEDIAJBADYCBAJAIAIgACABEC0iAEUEQCABQQFqIQEMAQsgAkETNgIcIAIgADYCDCACIAFBAWo2AhQMWAtBHiEDDD4LQQAhAyACQQA2AhwgAiABNgIUIAJBxgw2AhAgAkEjNgIMDFYLIAIoAgQhAEEAIQMgAkEANgIEIAIgACABEC0iAEUEQCABQQFqIQEMTgsgAkERNgIcIAIgADYCDCACIAFBAWo2AhQMVQsgAkEQNgIcIAIgATYCFCACIAA2AgwMVAtBACEDIAJBADYCHCACIAE2AhQgAkHGDDYCECACQSM2AgwMUwtBACEDIAJBADYCHCACIAE2AhQgAkHAFTYCECACQQI2AgwMUgsgAigCBCEAQQAhAyACQQA2AgQCQCACIAAgARAtIgBFBEAgAUEBaiEBDAELIAJBDjYCHCACIAA2AgwgAiABQQFqNgIUDFILQRshAww4C0EAIQMgAkEANgIcIAIgATYCFCACQcYMNgIQIAJBIzYCDAxQCyACKAIEIQBBACEDIAJBADYCBAJAIAIgACABECwiAEUEQCABQQFqIQEMAQsgAkENNgIcIAIgADYCDCACIAFBAWo2AhQMUAtBGiEDDDYLQQAhAyACQQA2AhwgAiABNgIUIAJBmg82AhAgAkEiNgIMDE4LIAIoAgQhAEEAIQMgAkEANgIEAkAgAiAAIAEQLCIARQRAIAFBAWohAQwBCyACQQw2AhwgAiAANgIMIAIgAUEBajYCFAxOC0EZIQMMNAtBACEDIAJBADYCHCACIAE2AhQgAkGaDzYCECACQSI2AgwMTAsgAEEVRwRAQQAhAyACQQA2AhwgAiABNgIUIAJBgww2AhAgAkETNgIMDEwLIAJBCjYCHCACIAE2AhQgAkHkFjYCECACQRU2AgxBACEDDEsLIAIoAgQhAEEAIQMgAkEANgIEIAIgACABIAqnaiIBECsiAARAIAJBBzYCHCACIAE2AhQgAiAANgIMDEsLQRMhAwwxCyAAQRVHBEBBACEDIAJBADYCHCACIAE2AhQgAkHaDTYCECACQRQ2AgwMSgsgAkEeNgIcIAIgATYCFCACQfkXNgIQIAJBFTYCDEEAIQMMSQtBACEAAkAgAigCOCIDRQ0AIAMoAiwiA0UNACACIAMRAAAhAAsgAEUNQSAAQRVGBEAgAkEDNgIcIAIgATYCFCACQbAYNgIQIAJBFTYCDEEAIQMMSQtBACEDIAJBADYCHCACIAE2AhQgAkGnDjYCECACQRI2AgwMSAtBACEDIAJBADYCHCACIAE2AhQgAkHaDTYCECACQRQ2AgwMRwtBACEDIAJBADYCHCACIAE2AhQgAkGnDjYCECACQRI2AgwMRgsgAkEAOgAvIAItAC1BBHFFDT8LIAJBADoALyACQQE6ADRBACEDDCsLQQAhAyACQQA2AhwgAkHkETYCECACQQc2AgwgAiABQQFqNgIUDEMLAkADQAJAIAEtAABBCmsOBAACAgACCyAEIAFBAWoiAUcNAAtB3QEhAwxDCwJAAkAgAi0ANEEBRw0AQQAhAAJAIAIoAjgiA0UNACADKAJYIgNFDQAgAiADEQAAIQALIABFDQAgAEEVRw0BIAJB3AE2AhwgAiABNgIUIAJB1RY2AhAgAkEVNgIMQQAhAwxEC0HBASEDDCoLIAJBADYCHCACIAE2AhQgAkHpCzYCECACQR82AgxBACEDDEILAkACQCACLQAoQQFrDgIEAQALQcABIQMMKQtBuQEhAwwoCyACQQI6AC9BACEAAkAgAigCOCIDRQ0AIAMoAgAiA0UNACACIAMRAAAhAAsgAEUEQEHCASEDDCgLIABBFUcEQCACQQA2AhwgAiABNgIUIAJBpAw2AhAgAkEQNgIMQQAhAwxBCyACQdsBNgIcIAIgATYCFCACQfoWNgIQIAJBFTYCDEEAIQMMQAsgASAERgRAQdoBIQMMQAsgAS0AAEHIAEYNASACQQE6ACgLQawBIQMMJQtBvwEhAwwkCyABIARHBEAgAkEQNgIIIAIgATYCBEG+ASEDDCQLQdkBIQMMPAsgASAERgRAQdgBIQMMPAsgAS0AAEHIAEcNBCABQQFqIQFBvQEhAwwiCyABIARGBEBB1wEhAww7CwJAAkAgAS0AAEHFAGsOEAAFBQUFBQUFBQUFBQUFBQEFCyABQQFqIQFBuwEhAwwiCyABQQFqIQFBvAEhAwwhC0HWASEDIAEgBEYNOSACKAIAIgAgBCABa2ohBSABIABrQQJqIQYCQANAIAEtAAAgAEGD0ABqLQAARw0DIABBAkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAw6CyACKAIEIQAgAkIANwMAIAIgACAGQQFqIgEQJyIARQRAQcYBIQMMIQsgAkHVATYCHCACIAE2AhQgAiAANgIMQQAhAww5C0HUASEDIAEgBEYNOCACKAIAIgAgBCABa2ohBSABIABrQQFqIQYCQANAIAEtAAAgAEGB0ABqLQAARw0CIABBAUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAw5CyACQYEEOwEoIAIoAgQhACACQgA3AwAgAiAAIAZBAWoiARAnIgANAwwCCyACQQA2AgALQQAhAyACQQA2AhwgAiABNgIUIAJB2Bs2AhAgAkEINgIMDDYLQboBIQMMHAsgAkHTATYCHCACIAE2AhQgAiAANgIMQQAhAww0C0EAIQACQCACKAI4IgNFDQAgAygCOCIDRQ0AIAIgAxEAACEACyAARQ0AIABBFUYNASACQQA2AhwgAiABNgIUIAJBzA42AhAgAkEgNgIMQQAhAwwzC0HkACEDDBkLIAJB+AA2AhwgAiABNgIUIAJByhg2AhAgAkEVNgIMQQAhAwwxC0HSASEDIAQgASIARg0wIAQgAWsgAigCACIBaiEFIAAgAWtBBGohBgJAA0AgAC0AACABQfzPAGotAABHDQEgAUEERg0DIAFBAWohASAEIABBAWoiAEcNAAsgAiAFNgIADDELIAJBADYCHCACIAA2AhQgAkGQMzYCECACQQg2AgwgAkEANgIAQQAhAwwwCyABIARHBEAgAkEONgIIIAIgATYCBEG3ASEDDBcLQdEBIQMMLwsgAkEANgIAIAZBAWohAQtBuAEhAwwUCyABIARGBEBB0AEhAwwtCyABLQAAQTBrIgBB/wFxQQpJBEAgAiAAOgAqIAFBAWohAUG2ASEDDBQLIAIoAgQhACACQQA2AgQgAiAAIAEQKCIARQ0UIAJBzwE2AhwgAiABNgIUIAIgADYCDEEAIQMMLAsgASAERgRAQc4BIQMMLAsCQCABLQAAQS5GBEAgAUEBaiEBDAELIAIoAgQhACACQQA2AgQgAiAAIAEQKCIARQ0VIAJBzQE2AhwgAiABNgIUIAIgADYCDEEAIQMMLAtBtQEhAwwSCyAEIAEiBUYEQEHMASEDDCsLQQAhAEEBIQFBASEGQQAhAwJAAkACQAJAAkACfwJAAkACQAJAAkACQAJAIAUtAABBMGsOCgoJAAECAwQFBggLC0ECDAYLQQMMBQtBBAwEC0EFDAMLQQYMAgtBBwwBC0EICyEDQQAhAUEAIQYMAgtBCSEDQQEhAEEAIQFBACEGDAELQQAhAUEBIQMLIAIgAzoAKyAFQQFqIQMCQAJAIAItAC1BEHENAAJAAkACQCACLQAqDgMBAAIECyAGRQ0DDAILIAANAQwCCyABRQ0BCyACKAIEIQAgAkEANgIEIAIgACADECgiAEUEQCADIQEMAwsgAkHJATYCHCACIAM2AhQgAiAANgIMQQAhAwwtCyACKAIEIQAgAkEANgIEIAIgACADECgiAEUEQCADIQEMGAsgAkHKATYCHCACIAM2AhQgAiAANgIMQQAhAwwsCyACKAIEIQAgAkEANgIEIAIgACAFECgiAEUEQCAFIQEMFgsgAkHLATYCHCACIAU2AhQgAiAANgIMDCsLQbQBIQMMEQtBACEAAkAgAigCOCIDRQ0AIAMoAjwiA0UNACACIAMRAAAhAAsCQCAABEAgAEEVRg0BIAJBADYCHCACIAE2AhQgAkGUDTYCECACQSE2AgxBACEDDCsLQbIBIQMMEQsgAkHIATYCHCACIAE2AhQgAkHJFzYCECACQRU2AgxBACEDDCkLIAJBADYCACAGQQFqIQFB9QAhAwwPCyACLQApQQVGBEBB4wAhAwwPC0HiACEDDA4LIAAhASACQQA2AgALIAJBADoALEEJIQMMDAsgAkEANgIAIAdBAWohAUHAACEDDAsLQQELOgAsIAJBADYCACAGQQFqIQELQSkhAwwIC0E4IQMMBwsCQCABIARHBEADQCABLQAAQYA+ai0AACIAQQFHBEAgAEECRw0DIAFBAWohAQwFCyAEIAFBAWoiAUcNAAtBPiEDDCELQT4hAwwgCwsgAkEAOgAsDAELQQshAwwEC0E6IQMMAwsgAUEBaiEBQS0hAwwCCyACIAE6ACwgAkEANgIAIAZBAWohAUEMIQMMAQsgAkEANgIAIAZBAWohAUEKIQMMAAsAC0EAIQMgAkEANgIcIAIgATYCFCACQc0QNgIQIAJBCTYCDAwXC0EAIQMgAkEANgIcIAIgATYCFCACQekKNgIQIAJBCTYCDAwWC0EAIQMgAkEANgIcIAIgATYCFCACQbcQNgIQIAJBCTYCDAwVC0EAIQMgAkEANgIcIAIgATYCFCACQZwRNgIQIAJBCTYCDAwUC0EAIQMgAkEANgIcIAIgATYCFCACQc0QNgIQIAJBCTYCDAwTC0EAIQMgAkEANgIcIAIgATYCFCACQekKNgIQIAJBCTYCDAwSC0EAIQMgAkEANgIcIAIgATYCFCACQbcQNgIQIAJBCTYCDAwRC0EAIQMgAkEANgIcIAIgATYCFCACQZwRNgIQIAJBCTYCDAwQC0EAIQMgAkEANgIcIAIgATYCFCACQZcVNgIQIAJBDzYCDAwPC0EAIQMgAkEANgIcIAIgATYCFCACQZcVNgIQIAJBDzYCDAwOC0EAIQMgAkEANgIcIAIgATYCFCACQcASNgIQIAJBCzYCDAwNC0EAIQMgAkEANgIcIAIgATYCFCACQZUJNgIQIAJBCzYCDAwMC0EAIQMgAkEANgIcIAIgATYCFCACQeEPNgIQIAJBCjYCDAwLC0EAIQMgAkEANgIcIAIgATYCFCACQfsPNgIQIAJBCjYCDAwKC0EAIQMgAkEANgIcIAIgATYCFCACQfEZNgIQIAJBAjYCDAwJC0EAIQMgAkEANgIcIAIgATYCFCACQcQUNgIQIAJBAjYCDAwIC0EAIQMgAkEANgIcIAIgATYCFCACQfIVNgIQIAJBAjYCDAwHCyACQQI2AhwgAiABNgIUIAJBnBo2AhAgAkEWNgIMQQAhAwwGC0EBIQMMBQtB1AAhAyABIARGDQQgCEEIaiEJIAIoAgAhBQJAAkAgASAERwRAIAVB2MIAaiEHIAQgBWogAWshACAFQX9zQQpqIgUgAWohBgNAIAEtAAAgBy0AAEcEQEECIQcMAwsgBUUEQEEAIQcgBiEBDAMLIAVBAWshBSAHQQFqIQcgBCABQQFqIgFHDQALIAAhBSAEIQELIAlBATYCACACIAU2AgAMAQsgAkEANgIAIAkgBzYCAAsgCSABNgIEIAgoAgwhACAIKAIIDgMBBAIACwALIAJBADYCHCACQbUaNgIQIAJBFzYCDCACIABBAWo2AhRBACEDDAILIAJBADYCHCACIAA2AhQgAkHKGjYCECACQQk2AgxBACEDDAELIAEgBEYEQEEiIQMMAQsgAkEJNgIIIAIgATYCBEEhIQMLIAhBEGokACADRQRAIAIoAgwhAAwBCyACIAM2AhxBACEAIAIoAgQiAUUNACACIAEgBCACKAIIEQEAIgFFDQAgAiAENgIUIAIgATYCDCABIQALIAALvgIBAn8gAEEAOgAAIABB3ABqIgFBAWtBADoAACAAQQA6AAIgAEEAOgABIAFBA2tBADoAACABQQJrQQA6AAAgAEEAOgADIAFBBGtBADoAAEEAIABrQQNxIgEgAGoiAEEANgIAQdwAIAFrQXxxIgIgAGoiAUEEa0EANgIAAkAgAkEJSQ0AIABBADYCCCAAQQA2AgQgAUEIa0EANgIAIAFBDGtBADYCACACQRlJDQAgAEEANgIYIABBADYCFCAAQQA2AhAgAEEANgIMIAFBEGtBADYCACABQRRrQQA2AgAgAUEYa0EANgIAIAFBHGtBADYCACACIABBBHFBGHIiAmsiAUEgSQ0AIAAgAmohAANAIABCADcDGCAAQgA3AxAgAEIANwMIIABCADcDACAAQSBqIQAgAUEgayIBQR9LDQALCwtWAQF/AkAgACgCDA0AAkACQAJAAkAgAC0ALw4DAQADAgsgACgCOCIBRQ0AIAEoAiwiAUUNACAAIAERAAAiAQ0DC0EADwsACyAAQcMWNgIQQQ4hAQsgAQsaACAAKAIMRQRAIABB0Rs2AhAgAEEVNgIMCwsUACAAKAIMQRVGBEAgAEEANgIMCwsUACAAKAIMQRZGBEAgAEEANgIMCwsHACAAKAIMCwcAIAAoAhALCQAgACABNgIQCwcAIAAoAhQLFwAgAEEkTwRAAAsgAEECdEGgM2ooAgALFwAgAEEuTwRAAAsgAEECdEGwNGooAgALvwkBAX9B6yghAQJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIABB5ABrDvQDY2IAAWFhYWFhYQIDBAVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhBgcICQoLDA0OD2FhYWFhEGFhYWFhYWFhYWFhEWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYRITFBUWFxgZGhthYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2YTc4OTphYWFhYWFhYTthYWE8YWFhYT0+P2FhYWFhYWFhQGFhQWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYUJDREVGR0hJSktMTU5PUFFSU2FhYWFhYWFhVFVWV1hZWlthXF1hYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFeYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhX2BhC0HhJw8LQaQhDwtByywPC0H+MQ8LQcAkDwtBqyQPC0GNKA8LQeImDwtBgDAPC0G5Lw8LQdckDwtB7x8PC0HhHw8LQfofDwtB8iAPC0GoLw8LQa4yDwtBiDAPC0HsJw8LQYIiDwtBjh0PC0HQLg8LQcojDwtBxTIPC0HfHA8LQdIcDwtBxCAPC0HXIA8LQaIfDwtB7S4PC0GrMA8LQdQlDwtBzC4PC0H6Lg8LQfwrDwtB0jAPC0HxHQ8LQbsgDwtB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CABB3AgLii1JbnZhbGlkIGNoYXIgaW4gdXJsIHF1ZXJ5AFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fYm9keQBDb250ZW50LUxlbmd0aCBvdmVyZmxvdwBDaHVuayBzaXplIG92ZXJmbG93AFJlc3BvbnNlIG92ZXJmbG93AEludmFsaWQgbWV0aG9kIGZvciBIVFRQL3gueCByZXF1ZXN0AEludmFsaWQgbWV0aG9kIGZvciBSVFNQL3gueCByZXF1ZXN0AEV4cGVjdGVkIFNPVVJDRSBtZXRob2QgZm9yIElDRS94LnggcmVxdWVzdABJbnZhbGlkIGNoYXIgaW4gdXJsIGZyYWdtZW50IHN0YXJ0AEV4cGVjdGVkIGRvdABTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX3N0YXR1cwBJbnZhbGlkIHJlc3BvbnNlIHN0YXR1cwBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zAFVzZXIgY2FsbGJhY2sgZXJyb3IAYG9uX3Jlc2V0YCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfaGVhZGVyYCBjYWxsYmFjayBlcnJvcgBgb25fbWVzc2FnZV9iZWdpbmAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2V4dGVuc2lvbl92YWx1ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX3N0YXR1c19jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX3ZlcnNpb25fY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl91cmxfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9jaHVua19jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX2hlYWRlcl92YWx1ZV9jb21wbGV0ZWAgY2FsbGJhY2sgZXJyb3IAYG9uX21lc3NhZ2VfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9tZXRob2RfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9oZWFkZXJfZmllbGRfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9jaHVua19leHRlbnNpb25fbmFtZWAgY2FsbGJhY2sgZXJyb3IAVW5leHBlY3RlZCBjaGFyIGluIHVybCBzZXJ2ZXIASW52YWxpZCBoZWFkZXIgdmFsdWUgY2hhcgBJbnZhbGlkIGhlYWRlciBmaWVsZCBjaGFyAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fdmVyc2lvbgBJbnZhbGlkIG1pbm9yIHZlcnNpb24ASW52YWxpZCBtYWpvciB2ZXJzaW9uAEV4cGVjdGVkIHNwYWNlIGFmdGVyIHZlcnNpb24ARXhwZWN0ZWQgQ1JMRiBhZnRlciB2ZXJzaW9uAEludmFsaWQgSFRUUCB2ZXJzaW9uAEludmFsaWQgaGVhZGVyIHRva2VuAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fdXJsAEludmFsaWQgY2hhcmFjdGVycyBpbiB1cmwAVW5leHBlY3RlZCBzdGFydCBjaGFyIGluIHVybABEb3VibGUgQCBpbiB1cmwARW1wdHkgQ29udGVudC1MZW5ndGgASW52YWxpZCBjaGFyYWN0ZXIgaW4gQ29udGVudC1MZW5ndGgARHVwbGljYXRlIENvbnRlbnQtTGVuZ3RoAEludmFsaWQgY2hhciBpbiB1cmwgcGF0aABDb250ZW50LUxlbmd0aCBjYW4ndCBiZSBwcmVzZW50IHdpdGggVHJhbnNmZXItRW5jb2RpbmcASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgc2l6ZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2hlYWRlcl92YWx1ZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2NodW5rX2V4dGVuc2lvbl92YWx1ZQBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zIHZhbHVlAE1pc3NpbmcgZXhwZWN0ZWQgTEYgYWZ0ZXIgaGVhZGVyIHZhbHVlAEludmFsaWQgYFRyYW5zZmVyLUVuY29kaW5nYCBoZWFkZXIgdmFsdWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyBxdW90ZSB2YWx1ZQBJbnZhbGlkIGNoYXJhY3RlciBpbiBjaHVuayBleHRlbnNpb25zIHF1b3RlZCB2YWx1ZQBQYXVzZWQgYnkgb25faGVhZGVyc19jb21wbGV0ZQBJbnZhbGlkIEVPRiBzdGF0ZQBvbl9yZXNldCBwYXVzZQBvbl9jaHVua19oZWFkZXIgcGF1c2UAb25fbWVzc2FnZV9iZWdpbiBwYXVzZQBvbl9jaHVua19leHRlbnNpb25fdmFsdWUgcGF1c2UAb25fc3RhdHVzX2NvbXBsZXRlIHBhdXNlAG9uX3ZlcnNpb25fY29tcGxldGUgcGF1c2UAb25fdXJsX2NvbXBsZXRlIHBhdXNlAG9uX2NodW5rX2NvbXBsZXRlIHBhdXNlAG9uX2hlYWRlcl92YWx1ZV9jb21wbGV0ZSBwYXVzZQBvbl9tZXNzYWdlX2NvbXBsZXRlIHBhdXNlAG9uX21ldGhvZF9jb21wbGV0ZSBwYXVzZQBvbl9oZWFkZXJfZmllbGRfY29tcGxldGUgcGF1c2UAb25fY2h1bmtfZXh0ZW5zaW9uX25hbWUgcGF1c2UAVW5leHBlY3RlZCBzcGFjZSBhZnRlciBzdGFydCBsaW5lAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fY2h1bmtfZXh0ZW5zaW9uX25hbWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyBuYW1lAFBhdXNlIG9uIENPTk5FQ1QvVXBncmFkZQBQYXVzZSBvbiBQUkkvVXBncmFkZQBFeHBlY3RlZCBIVFRQLzIgQ29ubmVjdGlvbiBQcmVmYWNlAFNwYW4gY2FsbGJhY2sgZXJyb3IgaW4gb25fbWV0aG9kAEV4cGVjdGVkIHNwYWNlIGFmdGVyIG1ldGhvZABTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2hlYWRlcl9maWVsZABQYXVzZWQASW52YWxpZCB3b3JkIGVuY291bnRlcmVkAEludmFsaWQgbWV0aG9kIGVuY291bnRlcmVkAFVuZXhwZWN0ZWQgY2hhciBpbiB1cmwgc2NoZW1hAFJlcXVlc3QgaGFzIGludmFsaWQgYFRyYW5zZmVyLUVuY29kaW5nYABTV0lUQ0hfUFJPWFkAVVNFX1BST1hZAE1LQUNUSVZJVFkAVU5QUk9DRVNTQUJMRV9FTlRJVFkAQ09QWQBNT1ZFRF9QRVJNQU5FTlRMWQBUT09fRUFSTFkATk9USUZZAEZBSUxFRF9ERVBFTkRFTkNZAEJBRF9HQVRFV0FZAFBMQVkAUFVUAENIRUNLT1VUAEdBVEVXQVlfVElNRU9VVABSRVFVRVNUX1RJTUVPVVQATkVUV09SS19DT05ORUNUX1RJTUVPVVQAQ09OTkVDVElPTl9USU1FT1VUAExPR0lOX1RJTUVPVVQATkVUV09SS19SRUFEX1RJTUVPVVQAUE9TVABNSVNESVJFQ1RFRF9SRVFVRVNUAENMSUVOVF9DTE9TRURfUkVRVUVTVABDTElFTlRfQ0xPU0VEX0xPQURfQkFMQU5DRURfUkVRVUVTVABCQURfUkVRVUVTVABIVFRQX1JFUVVFU1RfU0VOVF9UT19IVFRQU19QT1JUAFJFUE9SVABJTV9BX1RFQVBPVABSRVNFVF9DT05URU5UAE5PX0NPTlRFTlQAUEFSVElBTF9DT05URU5UAEhQRV9JTlZBTElEX0NPTlNUQU5UAEhQRV9DQl9SRVNFVABHRVQASFBFX1NUUklDVABDT05GTElDVABURU1QT1JBUllfUkVESVJFQ1QAUEVSTUFORU5UX1JFRElSRUNUAENPTk5FQ1QATVVMVElfU1RBVFVTAEhQRV9JTlZBTElEX1NUQVRVUwBUT09fTUFOWV9SRVFVRVNUUwBFQVJMWV9ISU5UUwBVTkFWQUlMQUJMRV9GT1JfTEVHQUxfUkVBU09OUwBPUFRJT05TAFNXSVRDSElOR19QUk9UT0NPTFMAVkFSSUFOVF9BTFNPX05FR09USUFURVMATVVMVElQTEVfQ0hPSUNFUwBJTlRFUk5BTF9TRVJWRVJfRVJST1IAV0VCX1NFUlZFUl9VTktOT1dOX0VSUk9SAFJBSUxHVU5fRVJST1IASURFTlRJVFlfUFJPVklERVJfQVVUSEVOVElDQVRJT05fRVJST1IAU1NMX0NFUlRJRklDQVRFX0VSUk9SAElOVkFMSURfWF9GT1JXQVJERURfRk9SAFNFVF9QQVJBTUVURVIAR0VUX1BBUkFNRVRFUgBIUEVfVVNFUgBTRUVfT1RIRVIASFBFX0NCX0NIVU5LX0hFQURFUgBNS0NBTEVOREFSAFNFVFVQAFdFQl9TRVJWRVJfSVNfRE9XTgBURUFSRE9XTgBIUEVfQ0xPU0VEX0NPTk5FQ1RJT04ASEVVUklTVElDX0VYUElSQVRJT04ARElTQ09OTkVDVEVEX09QRVJBVElPTgBOT05fQVVUSE9SSVRBVElWRV9JTkZPUk1BVElPTgBIUEVfSU5WQUxJRF9WRVJTSU9OAEhQRV9DQl9NRVNTQUdFX0JFR0lOAFNJVEVfSVNfRlJPWkVOAEhQRV9JTlZBTElEX0hFQURFUl9UT0tFTgBJTlZBTElEX1RPS0VOAEZPUkJJRERFTgBFTkhBTkNFX1lPVVJfQ0FMTQBIUEVfSU5WQUxJRF9VUkwAQkxPQ0tFRF9CWV9QQVJFTlRBTF9DT05UUk9MAE1LQ09MAEFDTABIUEVfSU5URVJOQUwAUkVRVUVTVF9IRUFERVJfRklFTERTX1RPT19MQVJHRV9VTk9GRklDSUFMAEhQRV9PSwBVTkxJTksAVU5MT0NLAFBSSQBSRVRSWV9XSVRIAEhQRV9JTlZBTElEX0NPTlRFTlRfTEVOR1RIAEhQRV9VTkVYUEVDVEVEX0NPTlRFTlRfTEVOR1RIAEZMVVNIAFBST1BQQVRDSABNLVNFQVJDSABVUklfVE9PX0xPTkcAUFJPQ0VTU0lORwBNSVNDRUxMQU5FT1VTX1BFUlNJU1RFTlRfV0FSTklORwBNSVNDRUxMQU5FT1VTX1dBUk5JTkcASFBFX0lOVkFMSURfVFJBTlNGRVJfRU5DT0RJTkcARXhwZWN0ZWQgQ1JMRgBIUEVfSU5WQUxJRF9DSFVOS19TSVpFAE1PVkUAQ09OVElOVUUASFBFX0NCX1NUQVRVU19DT01QTEVURQBIUEVfQ0JfSEVBREVSU19DT01QTEVURQBIUEVfQ0JfVkVSU0lPTl9DT01QTEVURQBIUEVfQ0JfVVJMX0NPTVBMRVRFAEhQRV9DQl9DSFVOS19DT01QTEVURQBIUEVfQ0JfSEVBREVSX1ZBTFVFX0NPTVBMRVRFAEhQRV9DQl9DSFVOS19FWFRFTlNJT05fVkFMVUVfQ09NUExFVEUASFBFX0NCX0NIVU5LX0VYVEVOU0lPTl9OQU1FX0NPTVBMRVRFAEhQRV9DQl9NRVNTQUdFX0NPTVBMRVRFAEhQRV9DQl9NRVRIT0RfQ09NUExFVEUASFBFX0NCX0hFQURFUl9GSUVMRF9DT01QTEVURQBERUxFVEUASFBFX0lOVkFMSURfRU9GX1NUQVRFAElOVkFMSURfU1NMX0NFUlRJRklDQVRFAFBBVVNFAE5PX1JFU1BPTlNFAFVOU1VQUE9SVEVEX01FRElBX1RZUEUAR09ORQBOT1RfQUNDRVBUQUJMRQBTRVJWSUNFX1VOQVZBSUxBQkxFAFJBTkdFX05PVF9TQVRJU0ZJQUJMRQBPUklHSU5fSVNfVU5SRUFDSEFCTEUAUkVTUE9OU0VfSVNfU1RBTEUAUFVSR0UATUVSR0UAUkVRVUVTVF9IRUFERVJfRklFTERTX1RPT19MQVJHRQBSRVFVRVNUX0hFQURFUl9UT09fTEFSR0UAUEFZTE9BRF9UT09fTEFSR0UASU5TVUZGSUNJRU5UX1NUT1JBR0UASFBFX1BBVVNFRF9VUEdSQURFAEhQRV9QQVVTRURfSDJfVVBHUkFERQBTT1VSQ0UAQU5OT1VOQ0UAVFJBQ0UASFBFX1VORVhQRUNURURfU1BBQ0UAREVTQ1JJQkUAVU5TVUJTQ1JJQkUAUkVDT1JEAEhQRV9JTlZBTElEX01FVEhPRABOT1RfRk9VTkQAUFJPUEZJTkQAVU5CSU5EAFJFQklORABVTkFVVEhPUklaRUQATUVUSE9EX05PVF9BTExPV0VEAEhUVFBfVkVSU0lPTl9OT1RfU1VQUE9SVEVEAEFMUkVBRFlfUkVQT1JURUQAQUNDRVBURUQATk9UX0lNUExFTUVOVEVEAExPT1BfREVURUNURUQASFBFX0NSX0VYUEVDVEVEAEhQRV9MRl9FWFBFQ1RFRABDUkVBVEVEAElNX1VTRUQASFBFX1BBVVNFRABUSU1FT1VUX09DQ1VSRUQAUEFZTUVOVF9SRVFVSVJFRABQUkVDT05ESVRJT05fUkVRVUlSRUQAUFJPWFlfQVVUSEVOVElDQVRJT05fUkVRVUlSRUQATkVUV09SS19BVVRIRU5USUNBVElPTl9SRVFVSVJFRABMRU5HVEhfUkVRVUlSRUQAU1NMX0NFUlRJRklDQVRFX1JFUVVJUkVEAFVQR1JBREVfUkVRVUlSRUQAUEFHRV9FWFBJUkVEAFBSRUNPTkRJVElPTl9GQUlMRUQARVhQRUNUQVRJT05fRkFJTEVEAFJFVkFMSURBVElPTl9GQUlMRUQAU1NMX0hBTkRTSEFLRV9GQUlMRUQATE9DS0VEAFRSQU5TRk9STUFUSU9OX0FQUExJRUQATk9UX01PRElGSUVEAE5PVF9FWFRFTkRFRABCQU5EV0lEVEhfTElNSVRfRVhDRUVERUQAU0lURV9JU19PVkVSTE9BREVEAEhFQUQARXhwZWN0ZWQgSFRUUC8AAF4TAAAmEwAAMBAAAPAXAACdEwAAFRIAADkXAADwEgAAChAAAHUSAACtEgAAghMAAE8UAAB/EAAAoBUAACMUAACJEgAAixQAAE0VAADUEQAAzxQAABAYAADJFgAA3BYAAMERAADgFwAAuxQAAHQUAAB8FQAA5RQAAAgXAAAfEAAAZRUAAKMUAAAoFQAAAhUAAJkVAAAsEAAAixkAAE8PAADUDgAAahAAAM4QAAACFwAAiQ4AAG4TAAAcEwAAZhQAAFYXAADBEwAAzRMAAGwTAABoFwAAZhcAAF8XAAAiEwAAzg8AAGkOAADYDgAAYxYAAMsTAACqDgAAKBcAACYXAADFEwAAXRYAAOgRAABnEwAAZRMAAPIWAABzEwAAHRcAAPkWAADzEQAAzw4AAM4VAAAMEgAAsxEAAKURAABhEAAAMhcAALsTAEH5NQsBAQBBkDYL4AEBAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQBB/TcLAQEAQZE4C14CAwICAgICAAACAgACAgACAgICAgICAgICAAQAAAAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAAgACAEH9OQsBAQBBkToLXgIAAgICAgIAAAICAAICAAICAgICAgICAgIAAwAEAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgIAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgACAAIAQfA7Cw1sb3NlZWVwLWFsaXZlAEGJPAsBAQBBoDwL4AEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQBBiT4LAQEAQaA+C+cBAQEBAQEBAQEBAQEBAgEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQFjaHVua2VkAEGwwAALXwEBAAEBAQEBAAABAQABAQABAQEBAQEBAQEBAAAAAAAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQABAEGQwgALIWVjdGlvbmVudC1sZW5ndGhvbnJveHktY29ubmVjdGlvbgBBwMIACy1yYW5zZmVyLWVuY29kaW5ncGdyYWRlDQoNCg0KU00NCg0KVFRQL0NFL1RTUC8AQfnCAAsFAQIAAQMAQZDDAAvgAQQBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAEH5xAALBQECAAEDAEGQxQAL4AEEAQEFAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQBB+cYACwQBAAABAEGRxwAL3wEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAEH6yAALBAEAAAIAQZDJAAtfAwQAAAQEBAQEBAQEBAQEBQQEBAQEBAQEBAQEBAAEAAYHBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQABAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAAAAQAQfrKAAsEAQAAAQBBkMsACwEBAEGqywALQQIAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwAAAAAAAAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAEH6zAALBAEAAAEAQZDNAAsBAQBBms0ACwYCAAAAAAIAQbHNAAs6AwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBB8M4AC5YBTk9VTkNFRUNLT1VUTkVDVEVURUNSSUJFTFVTSEVURUFEU0VBUkNIUkdFQ1RJVklUWUxFTkRBUlZFT1RJRllQVElPTlNDSFNFQVlTVEFUQ0hHRU9SRElSRUNUT1JUUkNIUEFSQU1FVEVSVVJDRUJTQ1JJQkVBUkRPV05BQ0VJTkROS0NLVUJTQ1JJQkVIVFRQL0FEVFAv", "base64");
  return llhttpWasm;
}
var llhttp_simdWasm;
var hasRequiredLlhttp_simdWasm;
function requireLlhttp_simdWasm() {
  if (hasRequiredLlhttp_simdWasm) return llhttp_simdWasm;
  hasRequiredLlhttp_simdWasm = 1;
  const { Buffer: Buffer2 } = require$$0;
  llhttp_simdWasm = Buffer2.from("AGFzbQEAAAABJwdgAX8Bf2ADf39/AX9gAX8AYAJ/fwBgBH9/f38Bf2AAAGADf39/AALLAQgDZW52GHdhc21fb25faGVhZGVyc19jb21wbGV0ZQAEA2VudhV3YXNtX29uX21lc3NhZ2VfYmVnaW4AAANlbnYLd2FzbV9vbl91cmwAAQNlbnYOd2FzbV9vbl9zdGF0dXMAAQNlbnYUd2FzbV9vbl9oZWFkZXJfZmllbGQAAQNlbnYUd2FzbV9vbl9oZWFkZXJfdmFsdWUAAQNlbnYMd2FzbV9vbl9ib2R5AAEDZW52GHdhc21fb25fbWVzc2FnZV9jb21wbGV0ZQAAAy0sBQYAAAIAAAAAAAACAQIAAgICAAADAAAAAAMDAwMBAQEBAQEBAQEAAAIAAAAEBQFwARISBQMBAAIGCAF/AUGA1AQLB9EFIgZtZW1vcnkCAAtfaW5pdGlhbGl6ZQAIGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBAAtsbGh0dHBfaW5pdAAJGGxsaHR0cF9zaG91bGRfa2VlcF9hbGl2ZQAvDGxsaHR0cF9hbGxvYwALBm1hbGxvYwAxC2xsaHR0cF9mcmVlAAwEZnJlZQAMD2xsaHR0cF9nZXRfdHlwZQANFWxsaHR0cF9nZXRfaHR0cF9tYWpvcgAOFWxsaHR0cF9nZXRfaHR0cF9taW5vcgAPEWxsaHR0cF9nZXRfbWV0aG9kABAWbGxodHRwX2dldF9zdGF0dXNfY29kZQAREmxsaHR0cF9nZXRfdXBncmFkZQASDGxsaHR0cF9yZXNldAATDmxsaHR0cF9leGVjdXRlABQUbGxodHRwX3NldHRpbmdzX2luaXQAFQ1sbGh0dHBfZmluaXNoABYMbGxodHRwX3BhdXNlABcNbGxodHRwX3Jlc3VtZQAYG2xsaHR0cF9yZXN1bWVfYWZ0ZXJfdXBncmFkZQAZEGxsaHR0cF9nZXRfZXJybm8AGhdsbGh0dHBfZ2V0X2Vycm9yX3JlYXNvbgAbF2xsaHR0cF9zZXRfZXJyb3JfcmVhc29uABwUbGxodHRwX2dldF9lcnJvcl9wb3MAHRFsbGh0dHBfZXJybm9fbmFtZQAeEmxsaHR0cF9tZXRob2RfbmFtZQAfEmxsaHR0cF9zdGF0dXNfbmFtZQAgGmxsaHR0cF9zZXRfbGVuaWVudF9oZWFkZXJzACEhbGxodHRwX3NldF9sZW5pZW50X2NodW5rZWRfbGVuZ3RoACIdbGxodHRwX3NldF9sZW5pZW50X2tlZXBfYWxpdmUAIyRsbGh0dHBfc2V0X2xlbmllbnRfdHJhbnNmZXJfZW5jb2RpbmcAJBhsbGh0dHBfbWVzc2FnZV9uZWVkc19lb2YALgkXAQBBAQsRAQIDBAUKBgcrLSwqKSglJyYK77MCLBYAQYjQACgCAARAAAtBiNAAQQE2AgALFAAgABAwIAAgAjYCOCAAIAE6ACgLFAAgACAALwEyIAAtAC4gABAvEAALHgEBf0HAABAyIgEQMCABQYAINgI4IAEgADoAKCABC48MAQd/AkAgAEUNACAAQQhrIgEgAEEEaygCACIAQXhxIgRqIQUCQCAAQQFxDQAgAEEDcUUNASABIAEoAgAiAGsiAUGc0AAoAgBJDQEgACAEaiEEAkACQEGg0AAoAgAgAUcEQCAAQf8BTQRAIABBA3YhAyABKAIIIgAgASgCDCICRgRAQYzQAEGM0AAoAgBBfiADd3E2AgAMBQsgAiAANgIIIAAgAjYCDAwECyABKAIYIQYgASABKAIMIgBHBEAgACABKAIIIgI2AgggAiAANgIMDAMLIAFBFGoiAygCACICRQRAIAEoAhAiAkUNAiABQRBqIQMLA0AgAyEHIAIiAEEUaiIDKAIAIgINACAAQRBqIQMgACgCECICDQALIAdBADYCAAwCCyAFKAIEIgBBA3FBA0cNAiAFIABBfnE2AgRBlNAAIAQ2AgAgBSAENgIAIAEgBEEBcjYCBAwDC0EAIQALIAZFDQACQCABKAIcIgJBAnRBvNIAaiIDKAIAIAFGBEAgAyAANgIAIAANAUGQ0ABBkNAAKAIAQX4gAndxNgIADAILIAZBEEEUIAYoAhAgAUYbaiAANgIAIABFDQELIAAgBjYCGCABKAIQIgIEQCAAIAI2AhAgAiAANgIYCyABQRRqKAIAIgJFDQAgAEEUaiACNgIAIAIgADYCGAsgASAFTw0AIAUoAgQiAEEBcUUNAAJAAkACQAJAIABBAnFFBEBBpNAAKAIAIAVGBEBBpNAAIAE2AgBBmNAAQZjQACgCACAEaiIANgIAIAEgAEEBcjYCBCABQaDQACgCAEcNBkGU0ABBADYCAEGg0ABBADYCAAwGC0Gg0AAoAgAgBUYEQEGg0AAgATYCAEGU0ABBlNAAKAIAIARqIgA2AgAgASAAQQFyNgIEIAAgAWogADYCAAwGCyAAQXhxIARqIQQgAEH/AU0EQCAAQQN2IQMgBSgCCCIAIAUoAgwiAkYEQEGM0ABBjNAAKAIAQX4gA3dxNgIADAULIAIgADYCCCAAIAI2AgwMBAsgBSgCGCEGIAUgBSgCDCIARwRAQZzQACgCABogACAFKAIIIgI2AgggAiAANgIMDAMLIAVBFGoiAygCACICRQRAIAUoAhAiAkUNAiAFQRBqIQMLA0AgAyEHIAIiAEEUaiIDKAIAIgINACAAQRBqIQMgACgCECICDQALIAdBADYCAAwCCyAFIABBfnE2AgQgASAEaiAENgIAIAEgBEEBcjYCBAwDC0EAIQALIAZFDQACQCAFKAIcIgJBAnRBvNIAaiIDKAIAIAVGBEAgAyAANgIAIAANAUGQ0ABBkNAAKAIAQX4gAndxNgIADAILIAZBEEEUIAYoAhAgBUYbaiAANgIAIABFDQELIAAgBjYCGCAFKAIQIgIEQCAAIAI2AhAgAiAANgIYCyAFQRRqKAIAIgJFDQAgAEEUaiACNgIAIAIgADYCGAsgASAEaiAENgIAIAEgBEEBcjYCBCABQaDQACgCAEcNAEGU0AAgBDYCAAwBCyAEQf8BTQRAIARBeHFBtNAAaiEAAn9BjNAAKAIAIgJBASAEQQN2dCIDcUUEQEGM0AAgAiADcjYCACAADAELIAAoAggLIgIgATYCDCAAIAE2AgggASAANgIMIAEgAjYCCAwBC0EfIQIgBEH///8HTQRAIARBJiAEQQh2ZyIAa3ZBAXEgAEEBdGtBPmohAgsgASACNgIcIAFCADcCECACQQJ0QbzSAGohAAJAQZDQACgCACIDQQEgAnQiB3FFBEAgACABNgIAQZDQACADIAdyNgIAIAEgADYCGCABIAE2AgggASABNgIMDAELIARBGSACQQF2a0EAIAJBH0cbdCECIAAoAgAhAAJAA0AgACIDKAIEQXhxIARGDQEgAkEddiEAIAJBAXQhAiADIABBBHFqQRBqIgcoAgAiAA0ACyAHIAE2AgAgASADNgIYIAEgATYCDCABIAE2AggMAQsgAygCCCIAIAE2AgwgAyABNgIIIAFBADYCGCABIAM2AgwgASAANgIIC0Gs0ABBrNAAKAIAQQFrIgBBfyAAGzYCAAsLBwAgAC0AKAsHACAALQAqCwcAIAAtACsLBwAgAC0AKQsHACAALwEyCwcAIAAtAC4LQAEEfyAAKAIYIQEgAC0ALSECIAAtACghAyAAKAI4IQQgABAwIAAgBDYCOCAAIAM6ACggACACOgAtIAAgATYCGAu74gECB38DfiABIAJqIQQCQCAAIgIoAgwiAA0AIAIoAgQEQCACIAE2AgQLIwBBEGsiCCQAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAIoAhwiA0EBaw7dAdoBAdkBAgMEBQYHCAkKCwwNDtgBDxDXARES1gETFBUWFxgZGhvgAd8BHB0e1QEfICEiIyQl1AEmJygpKiss0wHSAS0u0QHQAS8wMTIzNDU2Nzg5Ojs8PT4/QEFCQ0RFRtsBR0hJSs8BzgFLzQFMzAFNTk9QUVJTVFVWV1hZWltcXV5fYGFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6e3x9fn+AAYEBggGDAYQBhQGGAYcBiAGJAYoBiwGMAY0BjgGPAZABkQGSAZMBlAGVAZYBlwGYAZkBmgGbAZwBnQGeAZ8BoAGhAaIBowGkAaUBpgGnAagBqQGqAasBrAGtAa4BrwGwAbEBsgGzAbQBtQG2AbcBywHKAbgByQG5AcgBugG7AbwBvQG+Ab8BwAHBAcIBwwHEAcUBxgEA3AELQQAMxgELQQ4MxQELQQ0MxAELQQ8MwwELQRAMwgELQRMMwQELQRQMwAELQRUMvwELQRYMvgELQRgMvQELQRkMvAELQRoMuwELQRsMugELQRwMuQELQR0MuAELQQgMtwELQR4MtgELQSAMtQELQR8MtAELQQcMswELQSEMsgELQSIMsQELQSMMsAELQSQMrwELQRIMrgELQREMrQELQSUMrAELQSYMqwELQScMqgELQSgMqQELQcMBDKgBC0EqDKcBC0ErDKYBC0EsDKUBC0EtDKQBC0EuDKMBC0EvDKIBC0HEAQyhAQtBMAygAQtBNAyfAQtBDAyeAQtBMQydAQtBMgycAQtBMwybAQtBOQyaAQtBNQyZAQtBxQEMmAELQQsMlwELQToMlgELQTYMlQELQQoMlAELQTcMkwELQTgMkgELQTwMkQELQTsMkAELQT0MjwELQQkMjgELQSkMjQELQT4MjAELQT8MiwELQcAADIoBC0HBAAyJAQtBwgAMiAELQcMADIcBC0HEAAyGAQtBxQAMhQELQcYADIQBC0EXDIMBC0HHAAyCAQtByAAMgQELQckADIABC0HKAAx/C0HLAAx+C0HNAAx9C0HMAAx8C0HOAAx7C0HPAAx6C0HQAAx5C0HRAAx4C0HSAAx3C0HTAAx2C0HUAAx1C0HWAAx0C0HVAAxzC0EGDHILQdcADHELQQUMcAtB2AAMbwtBBAxuC0HZAAxtC0HaAAxsC0HbAAxrC0HcAAxqC0EDDGkLQd0ADGgLQd4ADGcLQd8ADGYLQeEADGULQeAADGQLQeIADGMLQeMADGILQQIMYQtB5AAMYAtB5QAMXwtB5gAMXgtB5wAMXQtB6AAMXAtB6QAMWwtB6gAMWgtB6wAMWQtB7AAMWAtB7QAMVwtB7gAMVgtB7wAMVQtB8AAMVAtB8QAMUwtB8gAMUgtB8wAMUQtB9AAMUAtB9QAMTwtB9gAMTgtB9wAMTQtB+AAMTAtB+QAMSwtB+gAMSgtB+wAMSQtB/AAMSAtB/QAMRwtB/gAMRgtB/wAMRQtBgAEMRAtBgQEMQwtBggEMQgtBgwEMQQtBhAEMQAtBhQEMPwtBhgEMPgtBhwEMPQtBiAEMPAtBiQEMOwtBigEMOgtBiwEMOQtBjAEMOAtBjQEMNwtBjgEMNgtBjwEMNQtBkAEMNAtBkQEMMwtBkgEMMgtBkwEMMQtBlAEMMAtBlQEMLwtBlgEMLgtBlwEMLQtBmAEMLAtBmQEMKwtBmgEMKgtBmwEMKQtBnAEMKAtBnQEMJwtBngEMJgtBnwEMJQtBoAEMJAtBoQEMIwtBogEMIgtBowEMIQtBpAEMIAtBpQEMHwtBpgEMHgtBpwEMHQtBqAEMHAtBqQEMGwtBqgEMGgtBqwEMGQtBrAEMGAtBrQEMFwtBrgEMFgtBAQwVC0GvAQwUC0GwAQwTC0GxAQwSC0GzAQwRC0GyAQwQC0G0AQwPC0G1AQwOC0G2AQwNC0G3AQwMC0G4AQwLC0G5AQwKC0G6AQwJC0G7AQwIC0HGAQwHC0G8AQwGC0G9AQwFC0G+AQwEC0G/AQwDC0HAAQwCC0HCAQwBC0HBAQshAwNAAkACQAJAAkACQAJAAkACQAJAIAICfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJ/AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAgJ/AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACfwJAAkACfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAC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iQEhAwykAgtBASABLQAAQd8ARw1nGiABQQFqIQEMXgtBigEhAyABIARGDaICIAIoAgAiACAEIAFraiEFIAEgAGtBAWohBgNAIAEtAAAgAEGMzwBqLQAARw1kIABBAUYN+gEgAEEBaiEAIAQgAUEBaiIBRw0ACyACIAU2AgAMogILQYsBIQMgASAERg2hAiACKAIAIgAgBCABa2ohBSABIABrQQJqIQYCQANAIAEtAAAgAEGOzwBqLQAARw1kIABBAkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAyiAgsgAkEANgIAIAZBAWohAUECDGULQYwBIQMgASAERg2gAiACKAIAIgAgBCABa2ohBSABIABrQQFqIQYCQANAIAEtAAAgAEHwzwBqLQAARw1jIABBAUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAyhAgsgAkEANgIAIAZBAWohAUEfDGQLQY0BIQMgASAERg2fAiACKAIAIgAgBCABa2ohBSABIABrQQFqIQYCQANAIAEtAAAgAEHyzwBqLQAARw1iIABBAUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAygAgsgAkEANgIAIAZBAWohAUEJDGMLIAEgBEYEQEGOASEDDJ8CCwJAAkAgAS0AAEHJAGsOBwBiYmJiYgFiCyABQQFqIQFB+AAhAwyGAgsgAUEBaiEBQfkAIQMMhQILQY8BIQMgASAERg2dAiACKAIAIgAgBCABa2ohBSABIABrQQVqIQYCQANAIAEtAAAgAEGRzwBqLQAARw1gIABBBUYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAyeAgsgAkEANgIAIAZBAWohAUEYDGELQZABIQMgASAERg2cAiACKAIAIgAgBCABa2ohBSABIABrQQJqIQYCQANAIAEtAAAgAEGXzwBqLQAARw1fIABBAkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAydAgsgAkEANgIAIAZBAWohAUEXDGALQZEBIQMgASAERg2bAiACKAIAIgAgBCABa2ohBSABIABrQQZqIQYCQANAIAEtAAAgAEGazwBqLQAARw1eIABBBkYNASAAQQFqIQAgBCABQQFqIgFHDQALIAIgBTYCAAycAgsgAkEANgIAIAZBAWohAUEV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JSIARQ0RIAJB5QA2AhwgAiABNgIUIAIgADYCDEEAIQMMtAELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0gIAJB0wA2AhwgAiABNgIUIAIgADYCDEEAIQMMswELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0iIAJB0gA2AhwgAiABNgIUIAIgADYCDEEAIQMMsgELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0OIAJB5QA2AhwgAiABNgIUIAIgADYCDEEAIQMMsQELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0dIAJB0wA2AhwgAiABNgIUIAIgADYCDEEAIQMMsAELIAIoAgQhACACQQA2AgQgAiAAIAEQJSIARQ0fIAJB0gA2AhwgAiABNgIUIAIgADYCDEEAIQMMrwELIABBP0cNASABQQFqCyEBQQUhAwyUAQtBACEDIAJBADYCHCACIAE2AhQgAkH9EjYCECACQQc2AgwMrAELIAJBADYCHCACIAE2AhQgAkHcCDYCECACQQc2AgxBACEDDKsBCyACKAIEIQAgAkEANgIEIAIgACABECUiAEUNByACQeUANgIcIAIgATYCFCACIAA2AgxBACEDDKoBCyACKAIEIQAgAkEANgIEIAIgACABECUiAEUNFiACQdMANgIcIAIgATYCFCACIAA2AgxBACEDDKkBCyACKAIEIQAgAkEANgIEIAIgACABECUiAEUNGCACQdIANgIcIAIgATYCFCACIAA2AgxBACEDDKgBCyACQQA2AhwgAiABNgIUIAJBxgo2AhAgAkEHNgIMQQAhAwynAQsgAigCBCEAIAJBADYCBCACIAAgARAlIgBFDQMgAkHlADYCHCACIAE2AhQgAiAANgIMQQAhAwymAQsgAigCBCEAIAJBADYCBCACIAAgARAlIgBFDRIgAkHTADYCHCACIAE2AhQgAiAANgIMQQAhAwylAQsgAigCBCEAIAJBADYCBCACIAAgARAlIgBFDRQgAkHSADYCHCACIAE2AhQgAiAANgIMQQAhAwykAQsgAigCBCEAIAJBADYCBCACIAAgARAlIgBFDQAgAkHlADYCHCACIAE2AhQgAiAANgIMQQAhAwyjAQtB1QAhAwyJAQsgAEEVRwRAIAJBADYCHCACIAE2AhQgAkG5DTYCECACQRo2AgxB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AkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIABB5ABrDvQDY2IAAWFhYWFhYQIDBAVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhBgcICQoLDA0OD2FhYWFhEGFhYWFhYWFhYWFhEWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYRITFBUWFxgZGhthYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhHB0eHyAhIiMkJSYnKCkqKywtLi8wMTIzNDU2YTc4OTphYWFhYWFhYTthYWE8YWFhYT0+P2FhYWFhYWFhQGFhQWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYUJDREVGR0hJSktMTU5PUFFSU2FhYWFhYWFhVFVWV1hZWlthXF1hYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFeYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhX2BhC0HhJw8LQaQhDwtByywPC0H+MQ8LQcAkDwtBqyQPC0GNKA8LQeImDwtBgDAPC0G5Lw8LQdckDwtB7x8PC0HhHw8LQfofDwtB8iAPC0GoLw8LQa4yDwtBiDAPC0HsJw8LQYIiDwtBjh0PC0HQLg8LQcojDwtBxTIPC0HfHA8LQdIcDwtBxCAPC0HXIA8LQaIfDwtB7S4PC0GrMA8LQdQlDwtBzC4PC0H6Lg8LQfwrDwtB0jAPC0HxHQ8LQbsgDwtB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AAADAEGUCAsFBAAAAAUAQaQICwkGAAAABwAAAAgAQdwIC4otSW52YWxpZCBjaGFyIGluIHVybCBxdWVyeQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2JvZHkAQ29udGVudC1MZW5ndGggb3ZlcmZsb3cAQ2h1bmsgc2l6ZSBvdmVyZmxvdwBSZXNwb25zZSBvdmVyZmxvdwBJbnZhbGlkIG1ldGhvZCBmb3IgSFRUUC94LnggcmVxdWVzdABJbnZhbGlkIG1ldGhvZCBmb3IgUlRTUC94LnggcmVxdWVzdABFeHBlY3RlZCBTT1VSQ0UgbWV0aG9kIGZvciBJQ0UveC54IHJlcXVlc3QASW52YWxpZCBjaGFyIGluIHVybCBmcmFnbWVudCBzdGFydABFeHBlY3RlZCBkb3QAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9zdGF0dXMASW52YWxpZCByZXNwb25zZSBzdGF0dXMASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucwBVc2VyIGNhbGxiYWNrIGVycm9yAGBvbl9yZXNldGAgY2FsbGJhY2sgZXJyb3IAYG9uX2NodW5rX2hlYWRlcmAgY2FsbGJhY2sgZXJyb3IAYG9uX21lc3NhZ2VfYmVnaW5gIGNhbGxiYWNrIGVycm9yAGBvbl9jaHVua19leHRlbnNpb25fdmFsdWVgIGNhbGxiYWNrIGVycm9yAGBvbl9zdGF0dXNfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl92ZXJzaW9uX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fdXJsX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9oZWFkZXJfdmFsdWVfY29tcGxldGVgIGNhbGxiYWNrIGVycm9yAGBvbl9tZXNzYWdlX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fbWV0aG9kX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25faGVhZGVyX2ZpZWxkX2NvbXBsZXRlYCBjYWxsYmFjayBlcnJvcgBgb25fY2h1bmtfZXh0ZW5zaW9uX25hbWVgIGNhbGxiYWNrIGVycm9yAFVuZXhwZWN0ZWQgY2hhciBpbiB1cmwgc2VydmVyAEludmFsaWQgaGVhZGVyIHZhbHVlIGNoYXIASW52YWxpZCBoZWFkZXIgZmllbGQgY2hhcgBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX3ZlcnNpb24ASW52YWxpZCBtaW5vciB2ZXJzaW9uAEludmFsaWQgbWFqb3IgdmVyc2lvbgBFeHBlY3RlZCBzcGFjZSBhZnRlciB2ZXJzaW9uAEV4cGVjdGVkIENSTEYgYWZ0ZXIgdmVyc2lvbgBJbnZhbGlkIEhUVFAgdmVyc2lvbgBJbnZhbGlkIGhlYWRlciB0b2tlbgBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX3VybABJbnZhbGlkIGNoYXJhY3RlcnMgaW4gdXJsAFVuZXhwZWN0ZWQgc3RhcnQgY2hhciBpbiB1cmwARG91YmxlIEAgaW4gdXJsAEVtcHR5IENvbnRlbnQtTGVuZ3RoAEludmFsaWQgY2hhcmFjdGVyIGluIENvbnRlbnQtTGVuZ3RoAER1cGxpY2F0ZSBDb250ZW50LUxlbmd0aABJbnZhbGlkIGNoYXIgaW4gdXJsIHBhdGgAQ29udGVudC1MZW5ndGggY2FuJ3QgYmUgcHJlc2VudCB3aXRoIFRyYW5zZmVyLUVuY29kaW5nAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIHNpemUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9oZWFkZXJfdmFsdWUAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9jaHVua19leHRlbnNpb25fdmFsdWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyB2YWx1ZQBNaXNzaW5nIGV4cGVjdGVkIExGIGFmdGVyIGhlYWRlciB2YWx1ZQBJbnZhbGlkIGBUcmFuc2Zlci1FbmNvZGluZ2AgaGVhZGVyIHZhbHVlAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgcXVvdGUgdmFsdWUASW52YWxpZCBjaGFyYWN0ZXIgaW4gY2h1bmsgZXh0ZW5zaW9ucyBxdW90ZWQgdmFsdWUAUGF1c2VkIGJ5IG9uX2hlYWRlcnNfY29tcGxldGUASW52YWxpZCBFT0Ygc3RhdGUAb25fcmVzZXQgcGF1c2UAb25fY2h1bmtfaGVhZGVyIHBhdXNlAG9uX21lc3NhZ2VfYmVnaW4gcGF1c2UAb25fY2h1bmtfZXh0ZW5zaW9uX3ZhbHVlIHBhdXNlAG9uX3N0YXR1c19jb21wbGV0ZSBwYXVzZQBvbl92ZXJzaW9uX2NvbXBsZXRlIHBhdXNlAG9uX3VybF9jb21wbGV0ZSBwYXVzZQBvbl9jaHVua19jb21wbGV0ZSBwYXVzZQBvbl9oZWFkZXJfdmFsdWVfY29tcGxldGUgcGF1c2UAb25fbWVzc2FnZV9jb21wbGV0ZSBwYXVzZQBvbl9tZXRob2RfY29tcGxldGUgcGF1c2UAb25faGVhZGVyX2ZpZWxkX2NvbXBsZXRlIHBhdXNlAG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lIHBhdXNlAFVuZXhwZWN0ZWQgc3BhY2UgYWZ0ZXIgc3RhcnQgbGluZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX2NodW5rX2V4dGVuc2lvbl9uYW1lAEludmFsaWQgY2hhcmFjdGVyIGluIGNodW5rIGV4dGVuc2lvbnMgbmFtZQBQYXVzZSBvbiBDT05ORUNUL1VwZ3JhZGUAUGF1c2Ugb24gUFJJL1VwZ3JhZGUARXhwZWN0ZWQgSFRUUC8yIENvbm5lY3Rpb24gUHJlZmFjZQBTcGFuIGNhbGxiYWNrIGVycm9yIGluIG9uX21ldGhvZABFeHBlY3RlZCBzcGFjZSBhZnRlciBtZXRob2QAU3BhbiBjYWxsYmFjayBlcnJvciBpbiBvbl9oZWFkZXJfZmllbGQAUGF1c2VkAEludmFsaWQgd29yZCBlbmNvdW50ZXJlZABJbnZhbGlkIG1ldGhvZCBlbmNvdW50ZXJlZABVbmV4cGVjdGVkIGNoYXIgaW4gdXJsIHNjaGVtYQBSZXF1ZXN0IGhhcyBpbnZhbGlkIGBUcmFuc2Zlci1FbmNvZGluZ2AAU1dJVENIX1BST1hZAFVTRV9QUk9YWQBNS0FDVElWSVRZAFVOUFJPQ0VTU0FCTEVfRU5USVRZAENPUFkATU9WRURfUEVSTUFORU5UTFkAVE9PX0VBUkxZAE5PVElGWQBGQUlMRURfREVQRU5ERU5DWQBCQURfR0FURVdBWQBQTEFZAFBVVABDSEVDS09VVABHQVRFV0FZX1RJTUVPVVQAUkVRVUVTVF9USU1FT1VUAE5FVFdPUktfQ09OTkVDVF9USU1FT1VUAENPTk5FQ1RJT05fVElNRU9VVABMT0dJTl9USU1FT1VUAE5FVFdPUktfUkVBRF9USU1FT1VUAFBPU1QATUlTRElSRUNURURfUkVRVUVTVABDTElFTlRfQ0xPU0VEX1JFUVVFU1QAQ0xJRU5UX0NMT1NFRF9MT0FEX0JBTEFOQ0VEX1JFUVVFU1QAQkFEX1JFUVVFU1QASFRUUF9SRVFVRVNUX1NFTlRfVE9fSFRUUFNfUE9SVABSRVBPUlQASU1fQV9URUFQT1QAUkVTRVRfQ09OVEVOVABOT19DT05URU5UAFBBUlRJQUxfQ09OVEVOVABIUEVfSU5WQUxJRF9DT05TVEFOVABIUEVfQ0JfUkVTRVQAR0VUAEhQRV9TVFJJQ1QAQ09ORkxJQ1QAVEVNUE9SQVJZX1JFRElSRUNUAFBFUk1BTkVOVF9SRURJUkVDVABDT05ORUNUAE1VTFRJX1NUQVRVUwBIUEVfSU5WQUxJRF9TVEFUVVMAVE9PX01BTllfUkVRVUVTVFMARUFSTFlfSElOVFMAVU5BVkFJTEFCTEVfRk9SX0xFR0FMX1JFQVNPTlMAT1BUSU9OUwBTV0lUQ0hJTkdfUFJPVE9DT0xTAFZBUklBTlRfQUxTT19ORUdPVElBVEVTAE1VTFRJUExFX0NIT0lDRVMASU5URVJOQUxfU0VSVkVSX0VSUk9SAFdFQl9TRVJWRVJfVU5LTk9XTl9FUlJPUgBSQUlMR1VOX0VSUk9SAElERU5USVRZX1BST1ZJREVSX0FVVEhFTlRJQ0FUSU9OX0VSUk9SAFNTTF9DRVJUSUZJQ0FURV9FUlJPUgBJTlZBTElEX1hfRk9SV0FSREVEX0ZPUgBTRVRfUEFSQU1FVEVSAEdFVF9QQVJBTUVURVIASFBFX1VTRVIAU0VFX09USEVSAEhQRV9DQl9DSFVOS19IRUFERVIATUtDQUxFTkRBUgBTRVRVUABXRUJfU0VSVkVSX0lTX0RPV04AVEVBUkRPV04ASFBFX0NMT1NFRF9DT05ORUNUSU9OAEhFVVJJU1RJQ19FWFBJUkFUSU9OAERJU0NPTk5FQ1RFRF9PUEVSQVRJT04ATk9OX0FVVEhPUklUQVRJVkVfSU5GT1JNQVRJT04ASFBFX0lOVkFMSURfVkVSU0lPTgBIUEVfQ0JfTUVTU0FHRV9CRUdJTgBTSVRFX0lTX0ZST1pFTgBIUEVfSU5WQUxJRF9IRUFERVJfVE9LRU4ASU5WQUxJRF9UT0tFTgBGT1JCSURERU4ARU5IQU5DRV9ZT1VSX0NBTE0ASFBFX0lOVkFMSURfVVJMAEJMT0NLRURfQllfUEFSRU5UQUxfQ09OVFJPTABNS0NPTABBQ0wASFBFX0lOVEVSTkFMAFJFUVVFU1RfSEVBREVSX0ZJRUxEU19UT09fTEFSR0VfVU5PRkZJQ0lBTABIUEVfT0sAVU5MSU5LAFVOTE9DSwBQUkkAUkVUUllfV0lUSABIUEVfSU5WQUxJRF9DT05URU5UX0xFTkdUSABIUEVfVU5FWFBFQ1RFRF9DT05URU5UX0xFTkdUSABGTFVTSABQUk9QUEFUQ0gATS1TRUFSQ0gAVVJJX1RPT19MT05HAFBST0NFU1NJTkcATUlTQ0VMTEFORU9VU19QRVJTSVNURU5UX1dBUk5JTkcATUlTQ0VMTEFORU9VU19XQVJOSU5HAEhQRV9JTlZBTElEX1RSQU5TRkVSX0VOQ09ESU5HAEV4cGVjdGVkIENSTEYASFBFX0lOVkFMSURfQ0hVTktfU0laRQBNT1ZFAENPTlRJTlVFAEhQRV9DQl9TVEFUVVNfQ09NUExFVEUASFBFX0NCX0hFQURFUlNfQ09NUExFVEUASFBFX0NCX1ZFUlNJT05fQ09NUExFVEUASFBFX0NCX1VSTF9DT01QTEVURQBIUEVfQ0JfQ0hVTktfQ09NUExFVEUASFBFX0NCX0hFQURFUl9WQUxVRV9DT01QTEVURQBIUEVfQ0JfQ0hVTktfRVhURU5TSU9OX1ZBTFVFX0NPTVBMRVRFAEhQRV9DQl9DSFVOS19FWFRFTlNJT05fTkFNRV9DT01QTEVURQBIUEVfQ0JfTUVTU0FHRV9DT01QTEVURQBIUEVfQ0JfTUVUSE9EX0NPTVBMRVRFAEhQRV9DQl9IRUFERVJfRklFTERfQ09NUExFVEUAREVMRVRFAEhQRV9JTlZBTElEX0VPRl9TVEFURQBJTlZBTElEX1NTTF9DRVJUSUZJQ0FURQBQQVVTRQBOT19SRVNQT05TRQBVTlNVUFBPUlRFRF9NRURJQV9UWVBFAEdPTkUATk9UX0FDQ0VQVEFCTEUAU0VSVklDRV9VTkFWQUlMQUJMRQBSQU5HRV9OT1RfU0FUSVNGSUFCTEUAT1JJR0lOX0lTX1VOUkVBQ0hBQkxFAFJFU1BPTlNFX0lTX1NUQUxFAFBVUkdFAE1FUkdFAFJFUVVFU1RfSEVBREVSX0ZJRUxEU19UT09fTEFSR0UAUkVRVUVTVF9IRUFERVJfVE9PX0xBUkdFAFBBWUxPQURfVE9PX0xBUkdFAElOU1VGRklDSUVOVF9TVE9SQUdFAEhQRV9QQVVTRURfVVBHUkFERQBIUEVfUEFVU0VEX0gyX1VQR1JBREUAU09VUkNFAEFOTk9VTkNFAFRSQUNFAEhQRV9VTkVYUEVDVEVEX1NQQUNFAERFU0NSSUJFAFVOU1VCU0NSSUJFAFJFQ09SRABIUEVfSU5WQUxJRF9NRVRIT0QATk9UX0ZPVU5EAFBST1BGSU5EAFVOQklORABSRUJJTkQAVU5BVVRIT1JJWkVEAE1FVEhPRF9OT1RfQUxMT1dFRABIVFRQX1ZFUlNJT05fTk9UX1NVUFBPUlRFRABBTFJFQURZX1JFUE9SVEVEAEFDQ0VQVEVEAE5PVF9JTVBMRU1FTlRFRABMT09QX0RFVEVDVEVEAEhQRV9DUl9FWFBFQ1RFRABIUEVfTEZfRVhQRUNURUQAQ1JFQVRFRABJTV9VU0VEAEhQRV9QQVVTRUQAVElNRU9VVF9PQ0NVUkVEAFBBWU1FTlRfUkVRVUlSRUQAUFJFQ09ORElUSU9OX1JFUVVJUkVEAFBST1hZX0FVVEhFTlRJQ0FUSU9OX1JFUVVJUkVEAE5FVFdPUktfQVVUSEVOVElDQVRJT05fUkVRVUlSRUQATEVOR1RIX1JFUVVJUkVEAFNTTF9DRVJUSUZJQ0FURV9SRVFVSVJFRABVUEdSQURFX1JFUVVJUkVEAFBBR0VfRVhQSVJFRABQUkVDT05ESVRJT05fRkFJTEVEAEVYUEVDVEFUSU9OX0ZBSUxFRABSRVZBTElEQVRJT05fRkFJTEVEAFNTTF9IQU5EU0hBS0VfRkFJTEVEAExPQ0tFRABUUkFOU0ZPUk1BVElPTl9BUFBMSUVEAE5PVF9NT0RJRklFRABOT1RfRVhURU5ERUQAQkFORFdJRFRIX0xJTUlUX0VYQ0VFREVEAFNJVEVfSVNfT1ZFUkxPQURFRABIRUFEAEV4cGVjdGVkIEhUVFAvAABeEwAAJhMAADAQAADwFwAAnRMAABUSAAA5FwAA8BIAAAoQAAB1EgAArRIAAIITAABPFAAAfxAAAKAVAAAjFAAAiRIAAIsUAABNFQAA1BEAAM8UAAAQGAAAyRYAANwWAADBEQAA4BcAALsUAAB0FAAAfBUAAOUUAAAIFwAAHxAAAGUVAACjFAAAKBUAAAIVAACZFQAALBAAAIsZAABPDwAA1A4AAGoQAADOEAAAAhcAAIkOAABuEwAAHBMAAGYUAABWFwAAwRMAAM0TAABsEwAAaBcAAGYXAABfFwAAIhMAAM4PAABpDgAA2A4AAGMWAADLEwAAqg4AACgXAAAmFwAAxRMAAF0WAADoEQAAZxMAAGUTAADyFgAAcxMAAB0XAAD5FgAA8xEAAM8OAADOFQAADBIAALMRAAClEQAAYRAAADIXAAC7EwBB+TULAQEAQZA2C+ABAQECAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAQf03CwEBAEGROAteAgMCAgICAgAAAgIAAgIAAgICAgICAgICAgAEAAAAAAACAgICAgICAgICAgICAgICAgICAgICAgICAgAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAgICAAIAAgBB/TkLAQEAQZE6C14CAAICAgICAAACAgACAgACAgICAgICAgICAAMABAAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAAAAAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAAgACAEHwOwsNbG9zZWVlcC1hbGl2ZQBBiTwLAQEAQaA8C+ABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAQYk+CwEBAEGgPgvnAQEBAQEBAQEBAQEBAQIBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBY2h1bmtlZABBsMAAC18BAQABAQEBAQAAAQEAAQEAAQEBAQEBAQEBAQAAAAAAAAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAQBBkMIACyFlY3Rpb25lbnQtbGVuZ3Rob25yb3h5LWNvbm5lY3Rpb24AQcDCAAstcmFuc2Zlci1lbmNvZGluZ3BncmFkZQ0KDQoNClNNDQoNClRUUC9DRS9UU1AvAEH5wgALBQECAAEDAEGQwwAL4AEEAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQBB+cQACwUBAgABAwBBkMUAC+ABBAEBBQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEAQfnGAAsEAQAAAQBBkccAC98BAQEAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQBB+sgACwQBAAACAEGQyQALXwMEAAAEBAQEBAQEBAQEBAUEBAQEBAQEBAQEBAQABAAGBwQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAAEAAQABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAAAEAEH6ygALBAEAAAEAQZDLAAsBAQBBqssAC0ECAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAAAADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBB+swACwQBAAABAEGQzQALAQEAQZrNAAsGAgAAAAACAEGxzQALOgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAAAAAAAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQfDOAAuWAU5PVU5DRUVDS09VVE5FQ1RFVEVDUklCRUxVU0hFVEVBRFNFQVJDSFJHRUNUSVZJVFlMRU5EQVJWRU9USUZZUFRJT05TQ0hTRUFZU1RBVENIR0VPUkRJUkVDVE9SVFJDSFBBUkFNRVRFUlVSQ0VCU0NSSUJFQVJET1dOQUNFSU5ETktDS1VCU0NSSUJFSFRUUC9BRFRQLw==", "base64");
  return llhttp_simdWasm;
}
var constants$3;
var hasRequiredConstants$2;
function requireConstants$2() {
  if (hasRequiredConstants$2) return constants$3;
  hasRequiredConstants$2 = 1;
  const corsSafeListedMethods = (
    /** @type {const} */
    ["GET", "HEAD", "POST"]
  );
  const corsSafeListedMethodsSet = new Set(corsSafeListedMethods);
  const nullBodyStatus = (
    /** @type {const} */
    [101, 204, 205, 304]
  );
  const redirectStatus = (
    /** @type {const} */
    [301, 302, 303, 307, 308]
  );
  const redirectStatusSet = new Set(redirectStatus);
  const badPorts = (
    /** @type {const} */
    [
      "1",
      "7",
      "9",
      "11",
      "13",
      "15",
      "17",
      "19",
      "20",
      "21",
      "22",
      "23",
      "25",
      "37",
      "42",
      "43",
      "53",
      "69",
      "77",
      "79",
      "87",
      "95",
      "101",
      "102",
      "103",
      "104",
      "109",
      "110",
      "111",
      "113",
      "115",
      "117",
      "119",
      "123",
      "135",
      "137",
      "139",
      "143",
      "161",
      "179",
      "389",
      "427",
      "465",
      "512",
      "513",
      "514",
      "515",
      "526",
      "530",
      "531",
      "532",
      "540",
      "548",
      "554",
      "556",
      "563",
      "587",
      "601",
      "636",
      "989",
      "990",
      "993",
      "995",
      "1719",
      "1720",
      "1723",
      "2049",
      "3659",
      "4045",
      "4190",
      "5060",
      "5061",
      "6000",
      "6566",
      "6665",
      "6666",
      "6667",
      "6668",
      "6669",
      "6679",
      "6697",
      "10080"
    ]
  );
  const badPortsSet = new Set(badPorts);
  const referrerPolicy = (
    /** @type {const} */
    [
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]
  );
  const referrerPolicySet = new Set(referrerPolicy);
  const requestRedirect = (
    /** @type {const} */
    ["follow", "manual", "error"]
  );
  const safeMethods = (
    /** @type {const} */
    ["GET", "HEAD", "OPTIONS", "TRACE"]
  );
  const safeMethodsSet = new Set(safeMethods);
  const requestMode = (
    /** @type {const} */
    ["navigate", "same-origin", "no-cors", "cors"]
  );
  const requestCredentials = (
    /** @type {const} */
    ["omit", "same-origin", "include"]
  );
  const requestCache = (
    /** @type {const} */
    [
      "default",
      "no-store",
      "reload",
      "no-cache",
      "force-cache",
      "only-if-cached"
    ]
  );
  const requestBodyHeader = (
    /** @type {const} */
    [
      "content-encoding",
      "content-language",
      "content-location",
      "content-type",
      // See https://github.com/nodejs/undici/issues/2021
      // 'Content-Length' is a forbidden header name, which is typically
      // removed in the Headers implementation. However, undici doesn't
      // filter out headers, so we add it here.
      "content-length"
    ]
  );
  const requestDuplex = (
    /** @type {const} */
    [
      "half"
    ]
  );
  const forbiddenMethods = (
    /** @type {const} */
    ["CONNECT", "TRACE", "TRACK"]
  );
  const forbiddenMethodsSet = new Set(forbiddenMethods);
  const subresource = (
    /** @type {const} */
    [
      "audio",
      "audioworklet",
      "font",
      "image",
      "manifest",
      "paintworklet",
      "script",
      "style",
      "track",
      "video",
      "xslt",
      ""
    ]
  );
  const subresourceSet = new Set(subresource);
  constants$3 = {
    subresource,
    forbiddenMethods,
    requestBodyHeader,
    referrerPolicy,
    requestRedirect,
    requestMode,
    requestCredentials,
    requestCache,
    redirectStatus,
    corsSafeListedMethods,
    nullBodyStatus,
    safeMethods,
    badPorts,
    requestDuplex,
    subresourceSet,
    badPortsSet,
    redirectStatusSet,
    corsSafeListedMethodsSet,
    safeMethodsSet,
    forbiddenMethodsSet,
    referrerPolicySet
  };
  return constants$3;
}
var global$2;
var hasRequiredGlobal;
function requireGlobal() {
  if (hasRequiredGlobal) return global$2;
  hasRequiredGlobal = 1;
  const globalOrigin = Symbol.for("undici.globalOrigin.1");
  function getGlobalOrigin2() {
    return globalThis[globalOrigin];
  }
  function setGlobalOrigin2(newOrigin) {
    if (newOrigin === void 0) {
      Object.defineProperty(globalThis, globalOrigin, {
        value: void 0,
        writable: true,
        enumerable: false,
        configurable: false
      });
      return;
    }
    const parsedURL = new URL(newOrigin);
    if (parsedURL.protocol !== "http:" && parsedURL.protocol !== "https:") {
      throw new TypeError(`Only http & https urls are allowed, received ${parsedURL.protocol}`);
    }
    Object.defineProperty(globalThis, globalOrigin, {
      value: parsedURL,
      writable: true,
      enumerable: false,
      configurable: false
    });
  }
  global$2 = {
    getGlobalOrigin: getGlobalOrigin2,
    setGlobalOrigin: setGlobalOrigin2
  };
  return global$2;
}
var dataUrl;
var hasRequiredDataUrl;
function requireDataUrl() {
  if (hasRequiredDataUrl) return dataUrl;
  hasRequiredDataUrl = 1;
  const assert2 = require$$0$1;
  const encoder = new TextEncoder();
  const HTTP_TOKEN_CODEPOINTS = /^[!#$%&'*+\-.^_|~A-Za-z0-9]+$/;
  const HTTP_WHITESPACE_REGEX = /[\u000A\u000D\u0009\u0020]/;
  const ASCII_WHITESPACE_REPLACE_REGEX = /[\u0009\u000A\u000C\u000D\u0020]/g;
  const HTTP_QUOTED_STRING_TOKENS = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
  function dataURLProcessor(dataURL) {
    assert2(dataURL.protocol === "data:");
    let input = URLSerializer(dataURL, true);
    input = input.slice(5);
    const position = { position: 0 };
    let mimeType = collectASequenceOfCodePointsFast(
      ",",
      input,
      position
    );
    const mimeTypeLength = mimeType.length;
    mimeType = removeASCIIWhitespace(mimeType, true, true);
    if (position.position >= input.length) {
      return "failure";
    }
    position.position++;
    const encodedBody = input.slice(mimeTypeLength + 1);
    let body2 = stringPercentDecode(encodedBody);
    if (/;(\u0020){0,}base64$/i.test(mimeType)) {
      const stringBody = isomorphicDecode(body2);
      body2 = forgivingBase64(stringBody);
      if (body2 === "failure") {
        return "failure";
      }
      mimeType = mimeType.slice(0, -6);
      mimeType = mimeType.replace(/(\u0020)+$/, "");
      mimeType = mimeType.slice(0, -1);
    }
    if (mimeType.startsWith(";")) {
      mimeType = "text/plain" + mimeType;
    }
    let mimeTypeRecord = parseMIMEType2(mimeType);
    if (mimeTypeRecord === "failure") {
      mimeTypeRecord = parseMIMEType2("text/plain;charset=US-ASCII");
    }
    return { mimeType: mimeTypeRecord, body: body2 };
  }
  function URLSerializer(url, excludeFragment = false) {
    if (!excludeFragment) {
      return url.href;
    }
    const href = url.href;
    const hashLength = url.hash.length;
    const serialized = hashLength === 0 ? href : href.substring(0, href.length - hashLength);
    if (!hashLength && href.endsWith("#")) {
      return serialized.slice(0, -1);
    }
    return serialized;
  }
  function collectASequenceOfCodePoints(condition, input, position) {
    let result = "";
    while (position.position < input.length && condition(input[position.position])) {
      result += input[position.position];
      position.position++;
    }
    return result;
  }
  function collectASequenceOfCodePointsFast(char, input, position) {
    const idx = input.indexOf(char, position.position);
    const start = position.position;
    if (idx === -1) {
      position.position = input.length;
      return input.slice(start);
    }
    position.position = idx;
    return input.slice(start, position.position);
  }
  function stringPercentDecode(input) {
    const bytes = encoder.encode(input);
    return percentDecode(bytes);
  }
  function isHexCharByte(byte) {
    return byte >= 48 && byte <= 57 || byte >= 65 && byte <= 70 || byte >= 97 && byte <= 102;
  }
  function hexByteToNumber(byte) {
    return (
      // 0-9
      byte >= 48 && byte <= 57 ? byte - 48 : (byte & 223) - 55
    );
  }
  function percentDecode(input) {
    const length = input.length;
    const output = new Uint8Array(length);
    let j = 0;
    for (let i = 0; i < length; ++i) {
      const byte = input[i];
      if (byte !== 37) {
        output[j++] = byte;
      } else if (byte === 37 && !(isHexCharByte(input[i + 1]) && isHexCharByte(input[i + 2]))) {
        output[j++] = 37;
      } else {
        output[j++] = hexByteToNumber(input[i + 1]) << 4 | hexByteToNumber(input[i + 2]);
        i += 2;
      }
    }
    return length === j ? output : output.subarray(0, j);
  }
  function parseMIMEType2(input) {
    input = removeHTTPWhitespace(input, true, true);
    const position = { position: 0 };
    const type = collectASequenceOfCodePointsFast(
      "/",
      input,
      position
    );
    if (type.length === 0 || !HTTP_TOKEN_CODEPOINTS.test(type)) {
      return "failure";
    }
    if (position.position > input.length) {
      return "failure";
    }
    position.position++;
    let subtype = collectASequenceOfCodePointsFast(
      ";",
      input,
      position
    );
    subtype = removeHTTPWhitespace(subtype, false, true);
    if (subtype.length === 0 || !HTTP_TOKEN_CODEPOINTS.test(subtype)) {
      return "failure";
    }
    const typeLowercase = type.toLowerCase();
    const subtypeLowercase = subtype.toLowerCase();
    const mimeType = {
      type: typeLowercase,
      subtype: subtypeLowercase,
      /** @type {Map<string, string>} */
      parameters: /* @__PURE__ */ new Map(),
      // https://mimesniff.spec.whatwg.org/#mime-type-essence
      essence: `${typeLowercase}/${subtypeLowercase}`
    };
    while (position.position < input.length) {
      position.position++;
      collectASequenceOfCodePoints(
        // https://fetch.spec.whatwg.org/#http-whitespace
        (char) => HTTP_WHITESPACE_REGEX.test(char),
        input,
        position
      );
      let parameterName = collectASequenceOfCodePoints(
        (char) => char !== ";" && char !== "=",
        input,
        position
      );
      parameterName = parameterName.toLowerCase();
      if (position.position < input.length) {
        if (input[position.position] === ";") {
          continue;
        }
        position.position++;
      }
      if (position.position > input.length) {
        break;
      }
      let parameterValue = null;
      if (input[position.position] === '"') {
        parameterValue = collectAnHTTPQuotedString(input, position, true);
        collectASequenceOfCodePointsFast(
          ";",
          input,
          position
        );
      } else {
        parameterValue = collectASequenceOfCodePointsFast(
          ";",
          input,
          position
        );
        parameterValue = removeHTTPWhitespace(parameterValue, false, true);
        if (parameterValue.length === 0) {
          continue;
        }
      }
      if (parameterName.length !== 0 && HTTP_TOKEN_CODEPOINTS.test(parameterName) && (parameterValue.length === 0 || HTTP_QUOTED_STRING_TOKENS.test(parameterValue)) && !mimeType.parameters.has(parameterName)) {
        mimeType.parameters.set(parameterName, parameterValue);
      }
    }
    return mimeType;
  }
  function forgivingBase64(data) {
    data = data.replace(ASCII_WHITESPACE_REPLACE_REGEX, "");
    let dataLength = data.length;
    if (dataLength % 4 === 0) {
      if (data.charCodeAt(dataLength - 1) === 61) {
        --dataLength;
        if (data.charCodeAt(dataLength - 1) === 61) {
          --dataLength;
        }
      }
    }
    if (dataLength % 4 === 1) {
      return "failure";
    }
    if (/[^+/0-9A-Za-z]/.test(data.length === dataLength ? data : data.substring(0, dataLength))) {
      return "failure";
    }
    const buffer2 = Buffer.from(data, "base64");
    return new Uint8Array(buffer2.buffer, buffer2.byteOffset, buffer2.byteLength);
  }
  function collectAnHTTPQuotedString(input, position, extractValue) {
    const positionStart = position.position;
    let value = "";
    assert2(input[position.position] === '"');
    position.position++;
    while (true) {
      value += collectASequenceOfCodePoints(
        (char) => char !== '"' && char !== "\\",
        input,
        position
      );
      if (position.position >= input.length) {
        break;
      }
      const quoteOrBackslash = input[position.position];
      position.position++;
      if (quoteOrBackslash === "\\") {
        if (position.position >= input.length) {
          value += "\\";
          break;
        }
        value += input[position.position];
        position.position++;
      } else {
        assert2(quoteOrBackslash === '"');
        break;
      }
    }
    if (extractValue) {
      return value;
    }
    return input.slice(positionStart, position.position);
  }
  function serializeAMimeType2(mimeType) {
    assert2(mimeType !== "failure");
    const { parameters, essence } = mimeType;
    let serialization = essence;
    for (let [name, value] of parameters.entries()) {
      serialization += ";";
      serialization += name;
      serialization += "=";
      if (!HTTP_TOKEN_CODEPOINTS.test(value)) {
        value = value.replace(/(\\|")/g, "\\$1");
        value = '"' + value;
        value += '"';
      }
      serialization += value;
    }
    return serialization;
  }
  function isHTTPWhiteSpace(char) {
    return char === 13 || char === 10 || char === 9 || char === 32;
  }
  function removeHTTPWhitespace(str, leading = true, trailing = true) {
    return removeChars(str, leading, trailing, isHTTPWhiteSpace);
  }
  function isASCIIWhitespace(char) {
    return char === 13 || char === 10 || char === 9 || char === 12 || char === 32;
  }
  function removeASCIIWhitespace(str, leading = true, trailing = true) {
    return removeChars(str, leading, trailing, isASCIIWhitespace);
  }
  function removeChars(str, leading, trailing, predicate) {
    let lead = 0;
    let trail = str.length - 1;
    if (leading) {
      while (lead < str.length && predicate(str.charCodeAt(lead))) lead++;
    }
    if (trailing) {
      while (trail > 0 && predicate(str.charCodeAt(trail))) trail--;
    }
    return lead === 0 && trail === str.length - 1 ? str : str.slice(lead, trail + 1);
  }
  function isomorphicDecode(input) {
    const length = input.length;
    if ((2 << 15) - 1 > length) {
      return String.fromCharCode.apply(null, input);
    }
    let result = "";
    let i = 0;
    let addition = (2 << 15) - 1;
    while (i < length) {
      if (i + addition > length) {
        addition = length - i;
      }
      result += String.fromCharCode.apply(null, input.subarray(i, i += addition));
    }
    return result;
  }
  function minimizeSupportedMimeType(mimeType) {
    switch (mimeType.essence) {
      case "application/ecmascript":
      case "application/javascript":
      case "application/x-ecmascript":
      case "application/x-javascript":
      case "text/ecmascript":
      case "text/javascript":
      case "text/javascript1.0":
      case "text/javascript1.1":
      case "text/javascript1.2":
      case "text/javascript1.3":
      case "text/javascript1.4":
      case "text/javascript1.5":
      case "text/jscript":
      case "text/livescript":
      case "text/x-ecmascript":
      case "text/x-javascript":
        return "text/javascript";
      case "application/json":
      case "text/json":
        return "application/json";
      case "image/svg+xml":
        return "image/svg+xml";
      case "text/xml":
      case "application/xml":
        return "application/xml";
    }
    if (mimeType.subtype.endsWith("+json")) {
      return "application/json";
    }
    if (mimeType.subtype.endsWith("+xml")) {
      return "application/xml";
    }
    return "";
  }
  dataUrl = {
    dataURLProcessor,
    URLSerializer,
    collectASequenceOfCodePoints,
    collectASequenceOfCodePointsFast,
    stringPercentDecode,
    parseMIMEType: parseMIMEType2,
    collectAnHTTPQuotedString,
    serializeAMimeType: serializeAMimeType2,
    removeChars,
    removeHTTPWhitespace,
    minimizeSupportedMimeType,
    HTTP_TOKEN_CODEPOINTS,
    isomorphicDecode
  };
  return dataUrl;
}
var webidl_1;
var hasRequiredWebidl;
function requireWebidl() {
  if (hasRequiredWebidl) return webidl_1;
  hasRequiredWebidl = 1;
  const { types, inspect } = require$$0$4;
  const { markAsUncloneable } = require$$1;
  const { toUSVString: toUSVString2 } = util$m;
  const webidl = {};
  webidl.converters = {};
  webidl.util = {};
  webidl.errors = {};
  webidl.errors.exception = function(message) {
    return new TypeError(`${message.header}: ${message.message}`);
  };
  webidl.errors.conversionFailed = function(context) {
    const plural = context.types.length === 1 ? "" : " one of";
    const message = `${context.argument} could not be converted to${plural}: ${context.types.join(", ")}.`;
    return webidl.errors.exception({
      header: context.prefix,
      message
    });
  };
  webidl.errors.invalidArgument = function(context) {
    return webidl.errors.exception({
      header: context.prefix,
      message: `"${context.value}" is an invalid ${context.type}.`
    });
  };
  webidl.brandCheck = function(V, I, opts) {
    if ((opts == null ? void 0 : opts.strict) !== false) {
      if (!(V instanceof I)) {
        const err = new TypeError("Illegal invocation");
        err.code = "ERR_INVALID_THIS";
        throw err;
      }
    } else {
      if ((V == null ? void 0 : V[Symbol.toStringTag]) !== I.prototype[Symbol.toStringTag]) {
        const err = new TypeError("Illegal invocation");
        err.code = "ERR_INVALID_THIS";
        throw err;
      }
    }
  };
  webidl.argumentLengthCheck = function({ length }, min, ctx) {
    if (length < min) {
      throw webidl.errors.exception({
        message: `${min} argument${min !== 1 ? "s" : ""} required, but${length ? " only" : ""} ${length} found.`,
        header: ctx
      });
    }
  };
  webidl.illegalConstructor = function() {
    throw webidl.errors.exception({
      header: "TypeError",
      message: "Illegal constructor"
    });
  };
  webidl.util.Type = function(V) {
    switch (typeof V) {
      case "undefined":
        return "Undefined";
      case "boolean":
        return "Boolean";
      case "string":
        return "String";
      case "symbol":
        return "Symbol";
      case "number":
        return "Number";
      case "bigint":
        return "BigInt";
      case "function":
      case "object": {
        if (V === null) {
          return "Null";
        }
        return "Object";
      }
    }
  };
  webidl.util.markAsUncloneable = markAsUncloneable || (() => {
  });
  webidl.util.ConvertToInt = function(V, bitLength, signedness, opts) {
    let upperBound;
    let lowerBound;
    if (bitLength === 64) {
      upperBound = Math.pow(2, 53) - 1;
      if (signedness === "unsigned") {
        lowerBound = 0;
      } else {
        lowerBound = Math.pow(-2, 53) + 1;
      }
    } else if (signedness === "unsigned") {
      lowerBound = 0;
      upperBound = Math.pow(2, bitLength) - 1;
    } else {
      lowerBound = Math.pow(-2, bitLength) - 1;
      upperBound = Math.pow(2, bitLength - 1) - 1;
    }
    let x = Number(V);
    if (x === 0) {
      x = 0;
    }
    if ((opts == null ? void 0 : opts.enforceRange) === true) {
      if (Number.isNaN(x) || x === Number.POSITIVE_INFINITY || x === Number.NEGATIVE_INFINITY) {
        throw webidl.errors.exception({
          header: "Integer conversion",
          message: `Could not convert ${webidl.util.Stringify(V)} to an integer.`
        });
      }
      x = webidl.util.IntegerPart(x);
      if (x < lowerBound || x > upperBound) {
        throw webidl.errors.exception({
          header: "Integer conversion",
          message: `Value must be between ${lowerBound}-${upperBound}, got ${x}.`
        });
      }
      return x;
    }
    if (!Number.isNaN(x) && (opts == null ? void 0 : opts.clamp) === true) {
      x = Math.min(Math.max(x, lowerBound), upperBound);
      if (Math.floor(x) % 2 === 0) {
        x = Math.floor(x);
      } else {
        x = Math.ceil(x);
      }
      return x;
    }
    if (Number.isNaN(x) || x === 0 && Object.is(0, x) || x === Number.POSITIVE_INFINITY || x === Number.NEGATIVE_INFINITY) {
      return 0;
    }
    x = webidl.util.IntegerPart(x);
    x = x % Math.pow(2, bitLength);
    if (signedness === "signed" && x >= Math.pow(2, bitLength) - 1) {
      return x - Math.pow(2, bitLength);
    }
    return x;
  };
  webidl.util.IntegerPart = function(n) {
    const r = Math.floor(Math.abs(n));
    if (n < 0) {
      return -1 * r;
    }
    return r;
  };
  webidl.util.Stringify = function(V) {
    const type = webidl.util.Type(V);
    switch (type) {
      case "Symbol":
        return `Symbol(${V.description})`;
      case "Object":
        return inspect(V);
      case "String":
        return `"${V}"`;
      default:
        return `${V}`;
    }
  };
  webidl.sequenceConverter = function(converter) {
    return (V, prefix, argument, Iterable) => {
      var _a2;
      if (webidl.util.Type(V) !== "Object") {
        throw webidl.errors.exception({
          header: prefix,
          message: `${argument} (${webidl.util.Stringify(V)}) is not iterable.`
        });
      }
      const method = typeof Iterable === "function" ? Iterable() : (_a2 = V == null ? void 0 : V[Symbol.iterator]) == null ? void 0 : _a2.call(V);
      const seq = [];
      let index = 0;
      if (method === void 0 || typeof method.next !== "function") {
        throw webidl.errors.exception({
          header: prefix,
          message: `${argument} is not iterable.`
        });
      }
      while (true) {
        const { done, value } = method.next();
        if (done) {
          break;
        }
        seq.push(converter(value, prefix, `${argument}[${index++}]`));
      }
      return seq;
    };
  };
  webidl.recordConverter = function(keyConverter, valueConverter) {
    return (O, prefix, argument) => {
      if (webidl.util.Type(O) !== "Object") {
        throw webidl.errors.exception({
          header: prefix,
          message: `${argument} ("${webidl.util.Type(O)}") is not an Object.`
        });
      }
      const result = {};
      if (!types.isProxy(O)) {
        const keys2 = [...Object.getOwnPropertyNames(O), ...Object.getOwnPropertySymbols(O)];
        for (const key2 of keys2) {
          const typedKey = keyConverter(key2, prefix, argument);
          const typedValue = valueConverter(O[key2], prefix, argument);
          result[typedKey] = typedValue;
        }
        return result;
      }
      const keys = Reflect.ownKeys(O);
      for (const key2 of keys) {
        const desc = Reflect.getOwnPropertyDescriptor(O, key2);
        if (desc == null ? void 0 : desc.enumerable) {
          const typedKey = keyConverter(key2, prefix, argument);
          const typedValue = valueConverter(O[key2], prefix, argument);
          result[typedKey] = typedValue;
        }
      }
      return result;
    };
  };
  webidl.interfaceConverter = function(i) {
    return (V, prefix, argument, opts) => {
      if ((opts == null ? void 0 : opts.strict) !== false && !(V instanceof i)) {
        throw webidl.errors.exception({
          header: prefix,
          message: `Expected ${argument} ("${webidl.util.Stringify(V)}") to be an instance of ${i.name}.`
        });
      }
      return V;
    };
  };
  webidl.dictionaryConverter = function(converters) {
    return (dictionary, prefix, argument) => {
      const type = webidl.util.Type(dictionary);
      const dict = {};
      if (type === "Null" || type === "Undefined") {
        return dict;
      } else if (type !== "Object") {
        throw webidl.errors.exception({
          header: prefix,
          message: `Expected ${dictionary} to be one of: Null, Undefined, Object.`
        });
      }
      for (const options of converters) {
        const { key: key2, defaultValue, required, converter } = options;
        if (required === true) {
          if (!Object.hasOwn(dictionary, key2)) {
            throw webidl.errors.exception({
              header: prefix,
              message: `Missing required key "${key2}".`
            });
          }
        }
        let value = dictionary[key2];
        const hasDefault = Object.hasOwn(options, "defaultValue");
        if (hasDefault && value !== null) {
          value ?? (value = defaultValue());
        }
        if (required || hasDefault || value !== void 0) {
          value = converter(value, prefix, `${argument}.${key2}`);
          if (options.allowedValues && !options.allowedValues.includes(value)) {
            throw webidl.errors.exception({
              header: prefix,
              message: `${value} is not an accepted type. Expected one of ${options.allowedValues.join(", ")}.`
            });
          }
          dict[key2] = value;
        }
      }
      return dict;
    };
  };
  webidl.nullableConverter = function(converter) {
    return (V, prefix, argument) => {
      if (V === null) {
        return V;
      }
      return converter(V, prefix, argument);
    };
  };
  webidl.converters.DOMString = function(V, prefix, argument, opts) {
    if (V === null && (opts == null ? void 0 : opts.legacyNullToEmptyString)) {
      return "";
    }
    if (typeof V === "symbol") {
      throw webidl.errors.exception({
        header: prefix,
        message: `${argument} is a symbol, which cannot be converted to a DOMString.`
      });
    }
    return String(V);
  };
  webidl.converters.ByteString = function(V, prefix, argument) {
    const x = webidl.converters.DOMString(V, prefix, argument);
    for (let index = 0; index < x.length; index++) {
      if (x.charCodeAt(index) > 255) {
        throw new TypeError(
          `Cannot convert argument to a ByteString because the character at index ${index} has a value of ${x.charCodeAt(index)} which is greater than 255.`
        );
      }
    }
    return x;
  };
  webidl.converters.USVString = toUSVString2;
  webidl.converters.boolean = function(V) {
    const x = Boolean(V);
    return x;
  };
  webidl.converters.any = function(V) {
    return V;
  };
  webidl.converters["long long"] = function(V, prefix, argument) {
    const x = webidl.util.ConvertToInt(V, 64, "signed", void 0, prefix, argument);
    return x;
  };
  webidl.converters["unsigned long long"] = function(V, prefix, argument) {
    const x = webidl.util.ConvertToInt(V, 64, "unsigned", void 0, prefix, argument);
    return x;
  };
  webidl.converters["unsigned long"] = function(V, prefix, argument) {
    const x = webidl.util.ConvertToInt(V, 32, "unsigned", void 0, prefix, argument);
    return x;
  };
  webidl.converters["unsigned short"] = function(V, prefix, argument, opts) {
    const x = webidl.util.ConvertToInt(V, 16, "unsigned", opts, prefix, argument);
    return x;
  };
  webidl.converters.ArrayBuffer = function(V, prefix, argument, opts) {
    if (webidl.util.Type(V) !== "Object" || !types.isAnyArrayBuffer(V)) {
      throw webidl.errors.conversionFailed({
        prefix,
        argument: `${argument} ("${webidl.util.Stringify(V)}")`,
        types: ["ArrayBuffer"]
      });
    }
    if ((opts == null ? void 0 : opts.allowShared) === false && types.isSharedArrayBuffer(V)) {
      throw webidl.errors.exception({
        header: "ArrayBuffer",
        message: "SharedArrayBuffer is not allowed."
      });
    }
    if (V.resizable || V.growable) {
      throw webidl.errors.exception({
        header: "ArrayBuffer",
        message: "Received a resizable ArrayBuffer."
      });
    }
    return V;
  };
  webidl.converters.TypedArray = function(V, T, prefix, name, opts) {
    if (webidl.util.Type(V) !== "Object" || !types.isTypedArray(V) || V.constructor.name !== T.name) {
      throw webidl.errors.conversionFailed({
        prefix,
        argument: `${name} ("${webidl.util.Stringify(V)}")`,
        types: [T.name]
      });
    }
    if ((opts == null ? void 0 : opts.allowShared) === false && types.isSharedArrayBuffer(V.buffer)) {
      throw webidl.errors.exception({
        header: "ArrayBuffer",
        message: "SharedArrayBuffer is not allowed."
      });
    }
    if (V.buffer.resizable || V.buffer.growable) {
      throw webidl.errors.exception({
        header: "ArrayBuffer",
        message: "Received a resizable ArrayBuffer."
      });
    }
    return V;
  };
  webidl.converters.DataView = function(V, prefix, name, opts) {
    if (webidl.util.Type(V) !== "Object" || !types.isDataView(V)) {
      throw webidl.errors.exception({
        header: prefix,
        message: `${name} is not a DataView.`
      });
    }
    if ((opts == null ? void 0 : opts.allowShared) === false && types.isSharedArrayBuffer(V.buffer)) {
      throw webidl.errors.exception({
        header: "ArrayBuffer",
        message: "SharedArrayBuffer is not allowed."
      });
    }
    if (V.buffer.resizable || V.buffer.growable) {
      throw webidl.errors.exception({
        header: "ArrayBuffer",
        message: "Received a resizable ArrayBuffer."
      });
    }
    return V;
  };
  webidl.converters.BufferSource = function(V, prefix, name, opts) {
    if (types.isAnyArrayBuffer(V)) {
      return webidl.converters.ArrayBuffer(V, prefix, name, { ...opts, allowShared: false });
    }
    if (types.isTypedArray(V)) {
      return webidl.converters.TypedArray(V, V.constructor, prefix, name, { ...opts, allowShared: false });
    }
    if (types.isDataView(V)) {
      return webidl.converters.DataView(V, prefix, name, { ...opts, allowShared: false });
    }
    throw webidl.errors.conversionFailed({
      prefix,
      argument: `${name} ("${webidl.util.Stringify(V)}")`,
      types: ["BufferSource"]
    });
  };
  webidl.converters["sequence<ByteString>"] = webidl.sequenceConverter(
    webidl.converters.ByteString
  );
  webidl.converters["sequence<sequence<ByteString>>"] = webidl.sequenceConverter(
    webidl.converters["sequence<ByteString>"]
  );
  webidl.converters["record<ByteString, ByteString>"] = webidl.recordConverter(
    webidl.converters.ByteString,
    webidl.converters.ByteString
  );
  webidl_1 = {
    webidl
  };
  return webidl_1;
}
var util$j;
var hasRequiredUtil$5;
function requireUtil$5() {
  var _zlibOptions;
  if (hasRequiredUtil$5) return util$j;
  hasRequiredUtil$5 = 1;
  const { Transform: Transform2 } = require$$0$2;
  const zlib = require$$1$1;
  const { redirectStatusSet, referrerPolicySet: referrerPolicyTokens, badPortsSet } = requireConstants$2();
  const { getGlobalOrigin: getGlobalOrigin2 } = requireGlobal();
  const { collectASequenceOfCodePoints, collectAnHTTPQuotedString, removeChars, parseMIMEType: parseMIMEType2 } = requireDataUrl();
  const { performance: performance2 } = require$$5$1;
  const { isBlobLike: isBlobLike2, ReadableStreamFrom: ReadableStreamFrom2, isValidHTTPToken: isValidHTTPToken2, normalizedMethodRecordsBase: normalizedMethodRecordsBase2 } = util$m;
  const assert2 = require$$0$1;
  const { isUint8Array } = require$$8$1;
  const { webidl } = requireWebidl();
  let supportedHashes = [];
  let crypto;
  try {
    crypto = require("node:crypto");
    const possibleRelevantHashes = ["sha256", "sha384", "sha512"];
    supportedHashes = crypto.getHashes().filter((hash) => possibleRelevantHashes.includes(hash));
  } catch {
  }
  function responseURL(response2) {
    const urlList = response2.urlList;
    const length = urlList.length;
    return length === 0 ? null : urlList[length - 1].toString();
  }
  function responseLocationURL(response2, requestFragment) {
    if (!redirectStatusSet.has(response2.status)) {
      return null;
    }
    let location = response2.headersList.get("location", true);
    if (location !== null && isValidHeaderValue2(location)) {
      if (!isValidEncodedURL(location)) {
        location = normalizeBinaryStringToUtf8(location);
      }
      location = new URL(location, responseURL(response2));
    }
    if (location && !location.hash) {
      location.hash = requestFragment;
    }
    return location;
  }
  function isValidEncodedURL(url) {
    for (let i = 0; i < url.length; ++i) {
      const code = url.charCodeAt(i);
      if (code > 126 || // Non-US-ASCII + DEL
      code < 32) {
        return false;
      }
    }
    return true;
  }
  function normalizeBinaryStringToUtf8(value) {
    return Buffer.from(value, "binary").toString("utf8");
  }
  function requestCurrentURL(request2) {
    return request2.urlList[request2.urlList.length - 1];
  }
  function requestBadPort(request2) {
    const url = requestCurrentURL(request2);
    if (urlIsHttpHttpsScheme(url) && badPortsSet.has(url.port)) {
      return "blocked";
    }
    return "allowed";
  }
  function isErrorLike(object) {
    var _a2, _b2;
    return object instanceof Error || (((_a2 = object == null ? void 0 : object.constructor) == null ? void 0 : _a2.name) === "Error" || ((_b2 = object == null ? void 0 : object.constructor) == null ? void 0 : _b2.name) === "DOMException");
  }
  function isValidReasonPhrase(statusText) {
    for (let i = 0; i < statusText.length; ++i) {
      const c2 = statusText.charCodeAt(i);
      if (!(c2 === 9 || // HTAB
      c2 >= 32 && c2 <= 126 || // SP / VCHAR
      c2 >= 128 && c2 <= 255)) {
        return false;
      }
    }
    return true;
  }
  const isValidHeaderName = isValidHTTPToken2;
  function isValidHeaderValue2(potentialValue) {
    return (potentialValue[0] === "	" || potentialValue[0] === " " || potentialValue[potentialValue.length - 1] === "	" || potentialValue[potentialValue.length - 1] === " " || potentialValue.includes("\n") || potentialValue.includes("\r") || potentialValue.includes("\0")) === false;
  }
  function setRequestReferrerPolicyOnRedirect(request2, actualResponse) {
    const { headersList } = actualResponse;
    const policyHeader = (headersList.get("referrer-policy", true) ?? "").split(",");
    let policy = "";
    if (policyHeader.length > 0) {
      for (let i = policyHeader.length; i !== 0; i--) {
        const token2 = policyHeader[i - 1].trim();
        if (referrerPolicyTokens.has(token2)) {
          policy = token2;
          break;
        }
      }
    }
    if (policy !== "") {
      request2.referrerPolicy = policy;
    }
  }
  function crossOriginResourcePolicyCheck() {
    return "allowed";
  }
  function corsCheck() {
    return "success";
  }
  function TAOCheck() {
    return "success";
  }
  function appendFetchMetadata(httpRequest) {
    let header = null;
    header = httpRequest.mode;
    httpRequest.headersList.set("sec-fetch-mode", header, true);
  }
  function appendRequestOriginHeader(request2) {
    let serializedOrigin = request2.origin;
    if (serializedOrigin === "client" || serializedOrigin === void 0) {
      return;
    }
    if (request2.responseTainting === "cors" || request2.mode === "websocket") {
      request2.headersList.append("origin", serializedOrigin, true);
    } else if (request2.method !== "GET" && request2.method !== "HEAD") {
      switch (request2.referrerPolicy) {
        case "no-referrer":
          serializedOrigin = null;
          break;
        case "no-referrer-when-downgrade":
        case "strict-origin":
        case "strict-origin-when-cross-origin":
          if (request2.origin && urlHasHttpsScheme(request2.origin) && !urlHasHttpsScheme(requestCurrentURL(request2))) {
            serializedOrigin = null;
          }
          break;
        case "same-origin":
          if (!sameOrigin(request2, requestCurrentURL(request2))) {
            serializedOrigin = null;
          }
          break;
      }
      request2.headersList.append("origin", serializedOrigin, true);
    }
  }
  function coarsenTime(timestamp, crossOriginIsolatedCapability) {
    return timestamp;
  }
  function clampAndCoarsenConnectionTimingInfo(connectionTimingInfo, defaultStartTime, crossOriginIsolatedCapability) {
    if (!(connectionTimingInfo == null ? void 0 : connectionTimingInfo.startTime) || connectionTimingInfo.startTime < defaultStartTime) {
      return {
        domainLookupStartTime: defaultStartTime,
        domainLookupEndTime: defaultStartTime,
        connectionStartTime: defaultStartTime,
        connectionEndTime: defaultStartTime,
        secureConnectionStartTime: defaultStartTime,
        ALPNNegotiatedProtocol: connectionTimingInfo == null ? void 0 : connectionTimingInfo.ALPNNegotiatedProtocol
      };
    }
    return {
      domainLookupStartTime: coarsenTime(connectionTimingInfo.domainLookupStartTime),
      domainLookupEndTime: coarsenTime(connectionTimingInfo.domainLookupEndTime),
      connectionStartTime: coarsenTime(connectionTimingInfo.connectionStartTime),
      connectionEndTime: coarsenTime(connectionTimingInfo.connectionEndTime),
      secureConnectionStartTime: coarsenTime(connectionTimingInfo.secureConnectionStartTime),
      ALPNNegotiatedProtocol: connectionTimingInfo.ALPNNegotiatedProtocol
    };
  }
  function coarsenedSharedCurrentTime(crossOriginIsolatedCapability) {
    return coarsenTime(performance2.now());
  }
  function createOpaqueTimingInfo(timingInfo) {
    return {
      startTime: timingInfo.startTime ?? 0,
      redirectStartTime: 0,
      redirectEndTime: 0,
      postRedirectStartTime: timingInfo.startTime ?? 0,
      finalServiceWorkerStartTime: 0,
      finalNetworkResponseStartTime: 0,
      finalNetworkRequestStartTime: 0,
      endTime: 0,
      encodedBodySize: 0,
      decodedBodySize: 0,
      finalConnectionTimingInfo: null
    };
  }
  function makePolicyContainer() {
    return {
      referrerPolicy: "strict-origin-when-cross-origin"
    };
  }
  function clonePolicyContainer(policyContainer) {
    return {
      referrerPolicy: policyContainer.referrerPolicy
    };
  }
  function determineRequestsReferrer(request2) {
    const policy = request2.referrerPolicy;
    assert2(policy);
    let referrerSource = null;
    if (request2.referrer === "client") {
      const globalOrigin = getGlobalOrigin2();
      if (!globalOrigin || globalOrigin.origin === "null") {
        return "no-referrer";
      }
      referrerSource = new URL(globalOrigin);
    } else if (request2.referrer instanceof URL) {
      referrerSource = request2.referrer;
    }
    let referrerURL = stripURLForReferrer(referrerSource);
    const referrerOrigin = stripURLForReferrer(referrerSource, true);
    if (referrerURL.toString().length > 4096) {
      referrerURL = referrerOrigin;
    }
    const areSameOrigin = sameOrigin(request2, referrerURL);
    const isNonPotentiallyTrustWorthy = isURLPotentiallyTrustworthy(referrerURL) && !isURLPotentiallyTrustworthy(request2.url);
    switch (policy) {
      case "origin":
        return referrerOrigin != null ? referrerOrigin : stripURLForReferrer(referrerSource, true);
      case "unsafe-url":
        return referrerURL;
      case "same-origin":
        return areSameOrigin ? referrerOrigin : "no-referrer";
      case "origin-when-cross-origin":
        return areSameOrigin ? referrerURL : referrerOrigin;
      case "strict-origin-when-cross-origin": {
        const currentURL = requestCurrentURL(request2);
        if (sameOrigin(referrerURL, currentURL)) {
          return referrerURL;
        }
        if (isURLPotentiallyTrustworthy(referrerURL) && !isURLPotentiallyTrustworthy(currentURL)) {
          return "no-referrer";
        }
        return referrerOrigin;
      }
      case "strict-origin":
      case "no-referrer-when-downgrade":
      default:
        return isNonPotentiallyTrustWorthy ? "no-referrer" : referrerOrigin;
    }
  }
  function stripURLForReferrer(url, originOnly) {
    assert2(url instanceof URL);
    url = new URL(url);
    if (url.protocol === "file:" || url.protocol === "about:" || url.protocol === "blank:") {
      return "no-referrer";
    }
    url.username = "";
    url.password = "";
    url.hash = "";
    if (originOnly) {
      url.pathname = "";
      url.search = "";
    }
    return url;
  }
  function isURLPotentiallyTrustworthy(url) {
    if (!(url instanceof URL)) {
      return false;
    }
    if (url.href === "about:blank" || url.href === "about:srcdoc") {
      return true;
    }
    if (url.protocol === "data:") return true;
    if (url.protocol === "file:") return true;
    return isOriginPotentiallyTrustworthy(url.origin);
    function isOriginPotentiallyTrustworthy(origin) {
      if (origin == null || origin === "null") return false;
      const originAsURL = new URL(origin);
      if (originAsURL.protocol === "https:" || originAsURL.protocol === "wss:") {
        return true;
      }
      if (/^127(?:\.[0-9]+){0,2}\.[0-9]+$|^\[(?:0*:)*?:?0*1\]$/.test(originAsURL.hostname) || (originAsURL.hostname === "localhost" || originAsURL.hostname.includes("localhost.")) || originAsURL.hostname.endsWith(".localhost")) {
        return true;
      }
      return false;
    }
  }
  function bytesMatch(bytes, metadataList) {
    if (crypto === void 0) {
      return true;
    }
    const parsedMetadata = parseMetadata(metadataList);
    if (parsedMetadata === "no metadata") {
      return true;
    }
    if (parsedMetadata.length === 0) {
      return true;
    }
    const strongest = getStrongestMetadata(parsedMetadata);
    const metadata = filterMetadataListByAlgorithm(parsedMetadata, strongest);
    for (const item of metadata) {
      const algorithm = item.algo;
      const expectedValue = item.hash;
      let actualValue = crypto.createHash(algorithm).update(bytes).digest("base64");
      if (actualValue[actualValue.length - 1] === "=") {
        if (actualValue[actualValue.length - 2] === "=") {
          actualValue = actualValue.slice(0, -2);
        } else {
          actualValue = actualValue.slice(0, -1);
        }
      }
      if (compareBase64Mixed(actualValue, expectedValue)) {
        return true;
      }
    }
    return false;
  }
  const parseHashWithOptions = /(?<algo>sha256|sha384|sha512)-((?<hash>[A-Za-z0-9+/]+|[A-Za-z0-9_-]+)={0,2}(?:\s|$)( +[!-~]*)?)?/i;
  function parseMetadata(metadata) {
    const result = [];
    let empty = true;
    for (const token2 of metadata.split(" ")) {
      empty = false;
      const parsedToken = parseHashWithOptions.exec(token2);
      if (parsedToken === null || parsedToken.groups === void 0 || parsedToken.groups.algo === void 0) {
        continue;
      }
      const algorithm = parsedToken.groups.algo.toLowerCase();
      if (supportedHashes.includes(algorithm)) {
        result.push(parsedToken.groups);
      }
    }
    if (empty === true) {
      return "no metadata";
    }
    return result;
  }
  function getStrongestMetadata(metadataList) {
    let algorithm = metadataList[0].algo;
    if (algorithm[3] === "5") {
      return algorithm;
    }
    for (let i = 1; i < metadataList.length; ++i) {
      const metadata = metadataList[i];
      if (metadata.algo[3] === "5") {
        algorithm = "sha512";
        break;
      } else if (algorithm[3] === "3") {
        continue;
      } else if (metadata.algo[3] === "3") {
        algorithm = "sha384";
      }
    }
    return algorithm;
  }
  function filterMetadataListByAlgorithm(metadataList, algorithm) {
    if (metadataList.length === 1) {
      return metadataList;
    }
    let pos2 = 0;
    for (let i = 0; i < metadataList.length; ++i) {
      if (metadataList[i].algo === algorithm) {
        metadataList[pos2++] = metadataList[i];
      }
    }
    metadataList.length = pos2;
    return metadataList;
  }
  function compareBase64Mixed(actualValue, expectedValue) {
    if (actualValue.length !== expectedValue.length) {
      return false;
    }
    for (let i = 0; i < actualValue.length; ++i) {
      if (actualValue[i] !== expectedValue[i]) {
        if (actualValue[i] === "+" && expectedValue[i] === "-" || actualValue[i] === "/" && expectedValue[i] === "_") {
          continue;
        }
        return false;
      }
    }
    return true;
  }
  function tryUpgradeRequestToAPotentiallyTrustworthyURL(request2) {
  }
  function sameOrigin(A, B) {
    if (A.origin === B.origin && A.origin === "null") {
      return true;
    }
    if (A.protocol === B.protocol && A.hostname === B.hostname && A.port === B.port) {
      return true;
    }
    return false;
  }
  function createDeferredPromise() {
    let res;
    let rej;
    const promise = new Promise((resolve, reject) => {
      res = resolve;
      rej = reject;
    });
    return { promise, resolve: res, reject: rej };
  }
  function isAborted(fetchParams) {
    return fetchParams.controller.state === "aborted";
  }
  function isCancelled(fetchParams) {
    return fetchParams.controller.state === "aborted" || fetchParams.controller.state === "terminated";
  }
  function normalizeMethod(method) {
    return normalizedMethodRecordsBase2[method.toLowerCase()] ?? method;
  }
  function serializeJavascriptValueToJSONString(value) {
    const result = JSON.stringify(value);
    if (result === void 0) {
      throw new TypeError("Value is not JSON serializable");
    }
    assert2(typeof result === "string");
    return result;
  }
  const esIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));
  function createIterator(name, kInternalIterator, keyIndex = 0, valueIndex = 1) {
    var _target, _kind, _index;
    class FastIterableIterator {
      /**
       * @see https://webidl.spec.whatwg.org/#dfn-default-iterator-object
       * @param {unknown} target
       * @param {'key' | 'value' | 'key+value'} kind
       */
      constructor(target, kind) {
        /** @type {any} */
        __privateAdd(this, _target);
        /** @type {'key' | 'value' | 'key+value'} */
        __privateAdd(this, _kind);
        /** @type {number} */
        __privateAdd(this, _index);
        __privateSet(this, _target, target);
        __privateSet(this, _kind, kind);
        __privateSet(this, _index, 0);
      }
      next() {
        if (typeof this !== "object" || this === null || !__privateIn(_target, this)) {
          throw new TypeError(
            `'next' called on an object that does not implement interface ${name} Iterator.`
          );
        }
        const index = __privateGet(this, _index);
        const values = __privateGet(this, _target)[kInternalIterator];
        const len = values.length;
        if (index >= len) {
          return {
            value: void 0,
            done: true
          };
        }
        const { [keyIndex]: key2, [valueIndex]: value } = values[index];
        __privateSet(this, _index, index + 1);
        let result;
        switch (__privateGet(this, _kind)) {
          case "key":
            result = key2;
            break;
          case "value":
            result = value;
            break;
          case "key+value":
            result = [key2, value];
            break;
        }
        return {
          value: result,
          done: false
        };
      }
    }
    _target = new WeakMap();
    _kind = new WeakMap();
    _index = new WeakMap();
    delete FastIterableIterator.prototype.constructor;
    Object.setPrototypeOf(FastIterableIterator.prototype, esIteratorPrototype);
    Object.defineProperties(FastIterableIterator.prototype, {
      [Symbol.toStringTag]: {
        writable: false,
        enumerable: false,
        configurable: true,
        value: `${name} Iterator`
      },
      next: { writable: true, enumerable: true, configurable: true }
    });
    return function(target, kind) {
      return new FastIterableIterator(target, kind);
    };
  }
  function iteratorMixin(name, object, kInternalIterator, keyIndex = 0, valueIndex = 1) {
    const makeIterator = createIterator(name, kInternalIterator, keyIndex, valueIndex);
    const properties = {
      keys: {
        writable: true,
        enumerable: true,
        configurable: true,
        value: function keys() {
          webidl.brandCheck(this, object);
          return makeIterator(this, "key");
        }
      },
      values: {
        writable: true,
        enumerable: true,
        configurable: true,
        value: function values() {
          webidl.brandCheck(this, object);
          return makeIterator(this, "value");
        }
      },
      entries: {
        writable: true,
        enumerable: true,
        configurable: true,
        value: function entries() {
          webidl.brandCheck(this, object);
          return makeIterator(this, "key+value");
        }
      },
      forEach: {
        writable: true,
        enumerable: true,
        configurable: true,
        value: function forEach(callbackfn, thisArg = globalThis) {
          webidl.brandCheck(this, object);
          webidl.argumentLengthCheck(arguments, 1, `${name}.forEach`);
          if (typeof callbackfn !== "function") {
            throw new TypeError(
              `Failed to execute 'forEach' on '${name}': parameter 1 is not of type 'Function'.`
            );
          }
          for (const { 0: key2, 1: value } of makeIterator(this, "key+value")) {
            callbackfn.call(thisArg, value, key2, this);
          }
        }
      }
    };
    return Object.defineProperties(object.prototype, {
      ...properties,
      [Symbol.iterator]: {
        writable: true,
        enumerable: false,
        configurable: true,
        value: properties.entries.value
      }
    });
  }
  async function fullyReadBody(body2, processBody, processBodyError) {
    const successSteps = processBody;
    const errorSteps = processBodyError;
    let reader;
    try {
      reader = body2.stream.getReader();
    } catch (e) {
      errorSteps(e);
      return;
    }
    try {
      successSteps(await readAllBytes(reader));
    } catch (e) {
      errorSteps(e);
    }
  }
  function isReadableStreamLike(stream2) {
    return stream2 instanceof ReadableStream || stream2[Symbol.toStringTag] === "ReadableStream" && typeof stream2.tee === "function";
  }
  function readableStreamClose(controller) {
    var _a2;
    try {
      controller.close();
      (_a2 = controller.byobRequest) == null ? void 0 : _a2.respond(0);
    } catch (err) {
      if (!err.message.includes("Controller is already closed") && !err.message.includes("ReadableStream is already closed")) {
        throw err;
      }
    }
  }
  const invalidIsomorphicEncodeValueRegex = /[^\x00-\xFF]/;
  function isomorphicEncode(input) {
    assert2(!invalidIsomorphicEncodeValueRegex.test(input));
    return input;
  }
  async function readAllBytes(reader) {
    const bytes = [];
    let byteLength = 0;
    while (true) {
      const { done, value: chunk } = await reader.read();
      if (done) {
        return Buffer.concat(bytes, byteLength);
      }
      if (!isUint8Array(chunk)) {
        throw new TypeError("Received non-Uint8Array chunk");
      }
      bytes.push(chunk);
      byteLength += chunk.length;
    }
  }
  function urlIsLocal(url) {
    assert2("protocol" in url);
    const protocol = url.protocol;
    return protocol === "about:" || protocol === "blob:" || protocol === "data:";
  }
  function urlHasHttpsScheme(url) {
    return typeof url === "string" && url[5] === ":" && url[0] === "h" && url[1] === "t" && url[2] === "t" && url[3] === "p" && url[4] === "s" || url.protocol === "https:";
  }
  function urlIsHttpHttpsScheme(url) {
    assert2("protocol" in url);
    const protocol = url.protocol;
    return protocol === "http:" || protocol === "https:";
  }
  function simpleRangeHeaderValue(value, allowWhitespace) {
    const data = value;
    if (!data.startsWith("bytes")) {
      return "failure";
    }
    const position = { position: 5 };
    if (allowWhitespace) {
      collectASequenceOfCodePoints(
        (char) => char === "	" || char === " ",
        data,
        position
      );
    }
    if (data.charCodeAt(position.position) !== 61) {
      return "failure";
    }
    position.position++;
    if (allowWhitespace) {
      collectASequenceOfCodePoints(
        (char) => char === "	" || char === " ",
        data,
        position
      );
    }
    const rangeStart = collectASequenceOfCodePoints(
      (char) => {
        const code = char.charCodeAt(0);
        return code >= 48 && code <= 57;
      },
      data,
      position
    );
    const rangeStartValue = rangeStart.length ? Number(rangeStart) : null;
    if (allowWhitespace) {
      collectASequenceOfCodePoints(
        (char) => char === "	" || char === " ",
        data,
        position
      );
    }
    if (data.charCodeAt(position.position) !== 45) {
      return "failure";
    }
    position.position++;
    if (allowWhitespace) {
      collectASequenceOfCodePoints(
        (char) => char === "	" || char === " ",
        data,
        position
      );
    }
    const rangeEnd = collectASequenceOfCodePoints(
      (char) => {
        const code = char.charCodeAt(0);
        return code >= 48 && code <= 57;
      },
      data,
      position
    );
    const rangeEndValue = rangeEnd.length ? Number(rangeEnd) : null;
    if (position.position < data.length) {
      return "failure";
    }
    if (rangeEndValue === null && rangeStartValue === null) {
      return "failure";
    }
    if (rangeStartValue > rangeEndValue) {
      return "failure";
    }
    return { rangeStartValue, rangeEndValue };
  }
  function buildContentRange(rangeStart, rangeEnd, fullLength) {
    let contentRange = "bytes ";
    contentRange += isomorphicEncode(`${rangeStart}`);
    contentRange += "-";
    contentRange += isomorphicEncode(`${rangeEnd}`);
    contentRange += "/";
    contentRange += isomorphicEncode(`${fullLength}`);
    return contentRange;
  }
  class InflateStream extends Transform2 {
    /** @param {zlib.ZlibOptions} [zlibOptions] */
    constructor(zlibOptions) {
      super();
      __privateAdd(this, _zlibOptions);
      __privateSet(this, _zlibOptions, zlibOptions);
    }
    _transform(chunk, encoding2, callback) {
      if (!this._inflateStream) {
        if (chunk.length === 0) {
          callback();
          return;
        }
        this._inflateStream = (chunk[0] & 15) === 8 ? zlib.createInflate(__privateGet(this, _zlibOptions)) : zlib.createInflateRaw(__privateGet(this, _zlibOptions));
        this._inflateStream.on("data", this.push.bind(this));
        this._inflateStream.on("end", () => this.push(null));
        this._inflateStream.on("error", (err) => this.destroy(err));
      }
      this._inflateStream.write(chunk, encoding2, callback);
    }
    _final(callback) {
      if (this._inflateStream) {
        this._inflateStream.end();
        this._inflateStream = null;
      }
      callback();
    }
  }
  _zlibOptions = new WeakMap();
  function createInflate(zlibOptions) {
    return new InflateStream(zlibOptions);
  }
  function extractMimeType(headers2) {
    let charset = null;
    let essence = null;
    let mimeType = null;
    const values = getDecodeSplit("content-type", headers2);
    if (values === null) {
      return "failure";
    }
    for (const value of values) {
      const temporaryMimeType = parseMIMEType2(value);
      if (temporaryMimeType === "failure" || temporaryMimeType.essence === "*/*") {
        continue;
      }
      mimeType = temporaryMimeType;
      if (mimeType.essence !== essence) {
        charset = null;
        if (mimeType.parameters.has("charset")) {
          charset = mimeType.parameters.get("charset");
        }
        essence = mimeType.essence;
      } else if (!mimeType.parameters.has("charset") && charset !== null) {
        mimeType.parameters.set("charset", charset);
      }
    }
    if (mimeType == null) {
      return "failure";
    }
    return mimeType;
  }
  function gettingDecodingSplitting(value) {
    const input = value;
    const position = { position: 0 };
    const values = [];
    let temporaryValue = "";
    while (position.position < input.length) {
      temporaryValue += collectASequenceOfCodePoints(
        (char) => char !== '"' && char !== ",",
        input,
        position
      );
      if (position.position < input.length) {
        if (input.charCodeAt(position.position) === 34) {
          temporaryValue += collectAnHTTPQuotedString(
            input,
            position
          );
          if (position.position < input.length) {
            continue;
          }
        } else {
          assert2(input.charCodeAt(position.position) === 44);
          position.position++;
        }
      }
      temporaryValue = removeChars(temporaryValue, true, true, (char) => char === 9 || char === 32);
      values.push(temporaryValue);
      temporaryValue = "";
    }
    return values;
  }
  function getDecodeSplit(name, list) {
    const value = list.get(name, true);
    if (value === null) {
      return null;
    }
    return gettingDecodingSplitting(value);
  }
  const textDecoder = new TextDecoder();
  function utf8DecodeBytes(buffer2) {
    if (buffer2.length === 0) {
      return "";
    }
    if (buffer2[0] === 239 && buffer2[1] === 187 && buffer2[2] === 191) {
      buffer2 = buffer2.subarray(3);
    }
    const output = textDecoder.decode(buffer2);
    return output;
  }
  class EnvironmentSettingsObjectBase {
    constructor() {
      __publicField(this, "policyContainer", makePolicyContainer());
    }
    get baseUrl() {
      return getGlobalOrigin2();
    }
    get origin() {
      var _a2;
      return (_a2 = this.baseUrl) == null ? void 0 : _a2.origin;
    }
  }
  class EnvironmentSettingsObject {
    constructor() {
      __publicField(this, "settingsObject", new EnvironmentSettingsObjectBase());
    }
  }
  const environmentSettingsObject = new EnvironmentSettingsObject();
  util$j = {
    isAborted,
    isCancelled,
    isValidEncodedURL,
    createDeferredPromise,
    ReadableStreamFrom: ReadableStreamFrom2,
    tryUpgradeRequestToAPotentiallyTrustworthyURL,
    clampAndCoarsenConnectionTimingInfo,
    coarsenedSharedCurrentTime,
    determineRequestsReferrer,
    makePolicyContainer,
    clonePolicyContainer,
    appendFetchMetadata,
    appendRequestOriginHeader,
    TAOCheck,
    corsCheck,
    crossOriginResourcePolicyCheck,
    createOpaqueTimingInfo,
    setRequestReferrerPolicyOnRedirect,
    isValidHTTPToken: isValidHTTPToken2,
    requestBadPort,
    requestCurrentURL,
    responseURL,
    responseLocationURL,
    isBlobLike: isBlobLike2,
    isURLPotentiallyTrustworthy,
    isValidReasonPhrase,
    sameOrigin,
    normalizeMethod,
    serializeJavascriptValueToJSONString,
    iteratorMixin,
    createIterator,
    isValidHeaderName,
    isValidHeaderValue: isValidHeaderValue2,
    isErrorLike,
    fullyReadBody,
    bytesMatch,
    isReadableStreamLike,
    readableStreamClose,
    isomorphicEncode,
    urlIsLocal,
    urlHasHttpsScheme,
    urlIsHttpHttpsScheme,
    readAllBytes,
    simpleRangeHeaderValue,
    buildContentRange,
    parseMetadata,
    createInflate,
    extractMimeType,
    getDecodeSplit,
    utf8DecodeBytes,
    environmentSettingsObject
  };
  return util$j;
}
var symbols$3;
var hasRequiredSymbols$3;
function requireSymbols$3() {
  if (hasRequiredSymbols$3) return symbols$3;
  hasRequiredSymbols$3 = 1;
  symbols$3 = {
    kUrl: Symbol("url"),
    kHeaders: Symbol("headers"),
    kSignal: Symbol("signal"),
    kState: Symbol("state"),
    kDispatcher: Symbol("dispatcher")
  };
  return symbols$3;
}
var file;
var hasRequiredFile;
function requireFile() {
  if (hasRequiredFile) return file;
  hasRequiredFile = 1;
  const { Blob: Blob2, File } = require$$0;
  const { kState } = requireSymbols$3();
  const { webidl } = requireWebidl();
  class FileLike {
    constructor(blobLike, fileName, options = {}) {
      const n = fileName;
      const t = options.type;
      const d = options.lastModified ?? Date.now();
      this[kState] = {
        blobLike,
        name: n,
        type: t,
        lastModified: d
      };
    }
    stream(...args) {
      webidl.brandCheck(this, FileLike);
      return this[kState].blobLike.stream(...args);
    }
    arrayBuffer(...args) {
      webidl.brandCheck(this, FileLike);
      return this[kState].blobLike.arrayBuffer(...args);
    }
    slice(...args) {
      webidl.brandCheck(this, FileLike);
      return this[kState].blobLike.slice(...args);
    }
    text(...args) {
      webidl.brandCheck(this, FileLike);
      return this[kState].blobLike.text(...args);
    }
    get size() {
      webidl.brandCheck(this, FileLike);
      return this[kState].blobLike.size;
    }
    get type() {
      webidl.brandCheck(this, FileLike);
      return this[kState].blobLike.type;
    }
    get name() {
      webidl.brandCheck(this, FileLike);
      return this[kState].name;
    }
    get lastModified() {
      webidl.brandCheck(this, FileLike);
      return this[kState].lastModified;
    }
    get [Symbol.toStringTag]() {
      return "File";
    }
  }
  webidl.converters.Blob = webidl.interfaceConverter(Blob2);
  function isFileLike(object) {
    return object instanceof File || object && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && object[Symbol.toStringTag] === "File";
  }
  file = { FileLike, isFileLike };
  return file;
}
var formdata;
var hasRequiredFormdata;
function requireFormdata() {
  if (hasRequiredFormdata) return formdata;
  hasRequiredFormdata = 1;
  const { isBlobLike: isBlobLike2, iteratorMixin } = requireUtil$5();
  const { kState } = requireSymbols$3();
  const { kEnumerableProperty: kEnumerableProperty2 } = util$m;
  const { FileLike, isFileLike } = requireFile();
  const { webidl } = requireWebidl();
  const { File: NativeFile } = require$$0;
  const nodeUtil2 = require$$0$4;
  const File = globalThis.File ?? NativeFile;
  class FormData {
    constructor(form) {
      webidl.util.markAsUncloneable(this);
      if (form !== void 0) {
        throw webidl.errors.conversionFailed({
          prefix: "FormData constructor",
          argument: "Argument 1",
          types: ["undefined"]
        });
      }
      this[kState] = [];
    }
    append(name, value, filename = void 0) {
      webidl.brandCheck(this, FormData);
      const prefix = "FormData.append";
      webidl.argumentLengthCheck(arguments, 2, prefix);
      if (arguments.length === 3 && !isBlobLike2(value)) {
        throw new TypeError(
          "Failed to execute 'append' on 'FormData': parameter 2 is not of type 'Blob'"
        );
      }
      name = webidl.converters.USVString(name, prefix, "name");
      value = isBlobLike2(value) ? webidl.converters.Blob(value, prefix, "value", { strict: false }) : webidl.converters.USVString(value, prefix, "value");
      filename = arguments.length === 3 ? webidl.converters.USVString(filename, prefix, "filename") : void 0;
      const entry = makeEntry(name, value, filename);
      this[kState].push(entry);
    }
    delete(name) {
      webidl.brandCheck(this, FormData);
      const prefix = "FormData.delete";
      webidl.argumentLengthCheck(arguments, 1, prefix);
      name = webidl.converters.USVString(name, prefix, "name");
      this[kState] = this[kState].filter((entry) => entry.name !== name);
    }
    get(name) {
      webidl.brandCheck(this, FormData);
      const prefix = "FormData.get";
      webidl.argumentLengthCheck(arguments, 1, prefix);
      name = webidl.converters.USVString(name, prefix, "name");
      const idx = this[kState].findIndex((entry) => entry.name === name);
      if (idx === -1) {
        return null;
      }
      return this[kState][idx].value;
    }
    getAll(name) {
      webidl.brandCheck(this, FormData);
      const prefix = "FormData.getAll";
      webidl.argumentLengthCheck(arguments, 1, prefix);
      name = webidl.converters.USVString(name, prefix, "name");
      return this[kState].filter((entry) => entry.name === name).map((entry) => entry.value);
    }
    has(name) {
      webidl.brandCheck(this, FormData);
      const prefix = "FormData.has";
      webidl.argumentLengthCheck(arguments, 1, prefix);
      name = webidl.converters.USVString(name, prefix, "name");
      return this[kState].findIndex((entry) => entry.name === name) !== -1;
    }
    set(name, value, filename = void 0) {
      webidl.brandCheck(this, FormData);
      const prefix = "FormData.set";
      webidl.argumentLengthCheck(arguments, 2, prefix);
      if (arguments.length === 3 && !isBlobLike2(value)) {
        throw new TypeError(
          "Failed to execute 'set' on 'FormData': parameter 2 is not of type 'Blob'"
        );
      }
      name = webidl.converters.USVString(name, prefix, "name");
      value = isBlobLike2(value) ? webidl.converters.Blob(value, prefix, "name", { strict: false }) : webidl.converters.USVString(value, prefix, "name");
      filename = arguments.length === 3 ? webidl.converters.USVString(filename, prefix, "name") : void 0;
      const entry = makeEntry(name, value, filename);
      const idx = this[kState].findIndex((entry2) => entry2.name === name);
      if (idx !== -1) {
        this[kState] = [
          ...this[kState].slice(0, idx),
          entry,
          ...this[kState].slice(idx + 1).filter((entry2) => entry2.name !== name)
        ];
      } else {
        this[kState].push(entry);
      }
    }
    [nodeUtil2.inspect.custom](depth, options) {
      const state = this[kState].reduce((a, b) => {
        if (a[b.name]) {
          if (Array.isArray(a[b.name])) {
            a[b.name].push(b.value);
          } else {
            a[b.name] = [a[b.name], b.value];
          }
        } else {
          a[b.name] = b.value;
        }
        return a;
      }, { __proto__: null });
      options.depth ?? (options.depth = depth);
      options.colors ?? (options.colors = true);
      const output = nodeUtil2.formatWithOptions(options, state);
      return `FormData ${output.slice(output.indexOf("]") + 2)}`;
    }
  }
  iteratorMixin("FormData", FormData, kState, "name", "value");
  Object.defineProperties(FormData.prototype, {
    append: kEnumerableProperty2,
    delete: kEnumerableProperty2,
    get: kEnumerableProperty2,
    getAll: kEnumerableProperty2,
    has: kEnumerableProperty2,
    set: kEnumerableProperty2,
    [Symbol.toStringTag]: {
      value: "FormData",
      configurable: true
    }
  });
  function makeEntry(name, value, filename) {
    if (typeof value === "string") ;
    else {
      if (!isFileLike(value)) {
        value = value instanceof Blob ? new File([value], "blob", { type: value.type }) : new FileLike(value, "blob", { type: value.type });
      }
      if (filename !== void 0) {
        const options = {
          type: value.type,
          lastModified: value.lastModified
        };
        value = value instanceof NativeFile ? new File([value], filename, options) : new FileLike(value, filename, options);
      }
    }
    return { name, value };
  }
  formdata = { FormData, makeEntry };
  return formdata;
}
var formdataParser;
var hasRequiredFormdataParser;
function requireFormdataParser() {
  if (hasRequiredFormdataParser) return formdataParser;
  hasRequiredFormdataParser = 1;
  const { isUSVString: isUSVString2, bufferToLowerCasedHeaderName: bufferToLowerCasedHeaderName2 } = util$m;
  const { utf8DecodeBytes } = requireUtil$5();
  const { HTTP_TOKEN_CODEPOINTS, isomorphicDecode } = requireDataUrl();
  const { isFileLike } = requireFile();
  const { makeEntry } = requireFormdata();
  const assert2 = require$$0$1;
  const { File: NodeFile } = require$$0;
  const File = globalThis.File ?? NodeFile;
  const formDataNameBuffer = Buffer.from('form-data; name="');
  const filenameBuffer = Buffer.from("; filename");
  const dd = Buffer.from("--");
  const ddcrlf = Buffer.from("--\r\n");
  function isAsciiString(chars) {
    for (let i = 0; i < chars.length; ++i) {
      if ((chars.charCodeAt(i) & -128) !== 0) {
        return false;
      }
    }
    return true;
  }
  function validateBoundary(boundary) {
    const length = boundary.length;
    if (length < 27 || length > 70) {
      return false;
    }
    for (let i = 0; i < length; ++i) {
      const cp = boundary.charCodeAt(i);
      if (!(cp >= 48 && cp <= 57 || cp >= 65 && cp <= 90 || cp >= 97 && cp <= 122 || cp === 39 || cp === 45 || cp === 95)) {
        return false;
      }
    }
    return true;
  }
  function multipartFormDataParser(input, mimeType) {
    assert2(mimeType !== "failure" && mimeType.essence === "multipart/form-data");
    const boundaryString = mimeType.parameters.get("boundary");
    if (boundaryString === void 0) {
      return "failure";
    }
    const boundary = Buffer.from(`--${boundaryString}`, "utf8");
    const entryList = [];
    const position = { position: 0 };
    while (input[position.position] === 13 && input[position.position + 1] === 10) {
      position.position += 2;
    }
    let trailing = input.length;
    while (input[trailing - 1] === 10 && input[trailing - 2] === 13) {
      trailing -= 2;
    }
    if (trailing !== input.length) {
      input = input.subarray(0, trailing);
    }
    while (true) {
      if (input.subarray(position.position, position.position + boundary.length).equals(boundary)) {
        position.position += boundary.length;
      } else {
        return "failure";
      }
      if (position.position === input.length - 2 && bufferStartsWith(input, dd, position) || position.position === input.length - 4 && bufferStartsWith(input, ddcrlf, position)) {
        return entryList;
      }
      if (input[position.position] !== 13 || input[position.position + 1] !== 10) {
        return "failure";
      }
      position.position += 2;
      const result = parseMultipartFormDataHeaders(input, position);
      if (result === "failure") {
        return "failure";
      }
      let { name, filename, contentType, encoding: encoding2 } = result;
      position.position += 2;
      let body2;
      {
        const boundaryIndex = input.indexOf(boundary.subarray(2), position.position);
        if (boundaryIndex === -1) {
          return "failure";
        }
        body2 = input.subarray(position.position, boundaryIndex - 4);
        position.position += body2.length;
        if (encoding2 === "base64") {
          body2 = Buffer.from(body2.toString(), "base64");
        }
      }
      if (input[position.position] !== 13 || input[position.position + 1] !== 10) {
        return "failure";
      } else {
        position.position += 2;
      }
      let value;
      if (filename !== null) {
        contentType ?? (contentType = "text/plain");
        if (!isAsciiString(contentType)) {
          contentType = "";
        }
        value = new File([body2], filename, { type: contentType });
      } else {
        value = utf8DecodeBytes(Buffer.from(body2));
      }
      assert2(isUSVString2(name));
      assert2(typeof value === "string" && isUSVString2(value) || isFileLike(value));
      entryList.push(makeEntry(name, value, filename));
    }
  }
  function parseMultipartFormDataHeaders(input, position) {
    let name = null;
    let filename = null;
    let contentType = null;
    let encoding2 = null;
    while (true) {
      if (input[position.position] === 13 && input[position.position + 1] === 10) {
        if (name === null) {
          return "failure";
        }
        return { name, filename, contentType, encoding: encoding2 };
      }
      let headerName = collectASequenceOfBytes(
        (char) => char !== 10 && char !== 13 && char !== 58,
        input,
        position
      );
      headerName = removeChars(headerName, true, true, (char) => char === 9 || char === 32);
      if (!HTTP_TOKEN_CODEPOINTS.test(headerName.toString())) {
        return "failure";
      }
      if (input[position.position] !== 58) {
        return "failure";
      }
      position.position++;
      collectASequenceOfBytes(
        (char) => char === 32 || char === 9,
        input,
        position
      );
      switch (bufferToLowerCasedHeaderName2(headerName)) {
        case "content-disposition": {
          name = filename = null;
          if (!bufferStartsWith(input, formDataNameBuffer, position)) {
            return "failure";
          }
          position.position += 17;
          name = parseMultipartFormDataName(input, position);
          if (name === null) {
            return "failure";
          }
          if (bufferStartsWith(input, filenameBuffer, position)) {
            let check = position.position + filenameBuffer.length;
            if (input[check] === 42) {
              position.position += 1;
              check += 1;
            }
            if (input[check] !== 61 || input[check + 1] !== 34) {
              return "failure";
            }
            position.position += 12;
            filename = parseMultipartFormDataName(input, position);
            if (filename === null) {
              return "failure";
            }
          }
          break;
        }
        case "content-type": {
          let headerValue = collectASequenceOfBytes(
            (char) => char !== 10 && char !== 13,
            input,
            position
          );
          headerValue = removeChars(headerValue, false, true, (char) => char === 9 || char === 32);
          contentType = isomorphicDecode(headerValue);
          break;
        }
        case "content-transfer-encoding": {
          let headerValue = collectASequenceOfBytes(
            (char) => char !== 10 && char !== 13,
            input,
            position
          );
          headerValue = removeChars(headerValue, false, true, (char) => char === 9 || char === 32);
          encoding2 = isomorphicDecode(headerValue);
          break;
        }
        default: {
          collectASequenceOfBytes(
            (char) => char !== 10 && char !== 13,
            input,
            position
          );
        }
      }
      if (input[position.position] !== 13 && input[position.position + 1] !== 10) {
        return "failure";
      } else {
        position.position += 2;
      }
    }
  }
  function parseMultipartFormDataName(input, position) {
    assert2(input[position.position - 1] === 34);
    let name = collectASequenceOfBytes(
      (char) => char !== 10 && char !== 13 && char !== 34,
      input,
      position
    );
    if (input[position.position] !== 34) {
      return null;
    } else {
      position.position++;
    }
    name = new TextDecoder().decode(name).replace(/%0A/ig, "\n").replace(/%0D/ig, "\r").replace(/%22/g, '"');
    return name;
  }
  function collectASequenceOfBytes(condition, input, position) {
    let start = position.position;
    while (start < input.length && condition(input[start])) {
      ++start;
    }
    return input.subarray(position.position, position.position = start);
  }
  function removeChars(buf, leading, trailing, predicate) {
    let lead = 0;
    let trail = buf.length - 1;
    if (leading) {
      while (lead < buf.length && predicate(buf[lead])) lead++;
    }
    {
      while (trail > 0 && predicate(buf[trail])) trail--;
    }
    return lead === 0 && trail === buf.length - 1 ? buf : buf.subarray(lead, trail + 1);
  }
  function bufferStartsWith(buffer2, start, position) {
    if (buffer2.length < start.length) {
      return false;
    }
    for (let i = 0; i < start.length; i++) {
      if (start[i] !== buffer2[position.position + i]) {
        return false;
      }
    }
    return true;
  }
  formdataParser = {
    multipartFormDataParser,
    validateBoundary
  };
  return formdataParser;
}
var body;
var hasRequiredBody;
function requireBody() {
  if (hasRequiredBody) return body;
  hasRequiredBody = 1;
  const util2 = util$m;
  const {
    ReadableStreamFrom: ReadableStreamFrom2,
    isBlobLike: isBlobLike2,
    isReadableStreamLike,
    readableStreamClose,
    createDeferredPromise,
    fullyReadBody,
    extractMimeType,
    utf8DecodeBytes
  } = requireUtil$5();
  const { FormData } = requireFormdata();
  const { kState } = requireSymbols$3();
  const { webidl } = requireWebidl();
  const { Blob: Blob2 } = require$$0;
  const assert2 = require$$0$1;
  const { isErrored: isErrored2, isDisturbed: isDisturbed2 } = require$$0$2;
  const { isArrayBuffer } = require$$8$1;
  const { serializeAMimeType: serializeAMimeType2 } = requireDataUrl();
  const { multipartFormDataParser } = requireFormdataParser();
  let random;
  try {
    const crypto = require("node:crypto");
    random = (max) => crypto.randomInt(0, max);
  } catch {
    random = (max) => Math.floor(Math.random(max));
  }
  const textEncoder = new TextEncoder();
  function noop2() {
  }
  const hasFinalizationRegistry = globalThis.FinalizationRegistry && process.version.indexOf("v18") !== 0;
  let streamRegistry;
  if (hasFinalizationRegistry) {
    streamRegistry = new FinalizationRegistry((weakRef) => {
      const stream2 = weakRef.deref();
      if (stream2 && !stream2.locked && !isDisturbed2(stream2) && !isErrored2(stream2)) {
        stream2.cancel("Response object has been garbage collected").catch(noop2);
      }
    });
  }
  function extractBody2(object, keepalive = false) {
    let stream2 = null;
    if (object instanceof ReadableStream) {
      stream2 = object;
    } else if (isBlobLike2(object)) {
      stream2 = object.stream();
    } else {
      stream2 = new ReadableStream({
        async pull(controller) {
          const buffer2 = typeof source2 === "string" ? textEncoder.encode(source2) : source2;
          if (buffer2.byteLength) {
            controller.enqueue(buffer2);
          }
          queueMicrotask(() => readableStreamClose(controller));
        },
        start() {
        },
        type: "bytes"
      });
    }
    assert2(isReadableStreamLike(stream2));
    let action = null;
    let source2 = null;
    let length = null;
    let type = null;
    if (typeof object === "string") {
      source2 = object;
      type = "text/plain;charset=UTF-8";
    } else if (object instanceof URLSearchParams) {
      source2 = object.toString();
      type = "application/x-www-form-urlencoded;charset=UTF-8";
    } else if (isArrayBuffer(object)) {
      source2 = new Uint8Array(object.slice());
    } else if (ArrayBuffer.isView(object)) {
      source2 = new Uint8Array(object.buffer.slice(object.byteOffset, object.byteOffset + object.byteLength));
    } else if (util2.isFormDataLike(object)) {
      const boundary = `----formdata-undici-0${`${random(1e11)}`.padStart(11, "0")}`;
      const prefix = `--${boundary}\r
Content-Disposition: form-data`;
      /*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
      const escape2 = (str) => str.replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
      const normalizeLinefeeds = (value) => value.replace(/\r?\n|\r/g, "\r\n");
      const blobParts = [];
      const rn = new Uint8Array([13, 10]);
      length = 0;
      let hasUnknownSizeValue = false;
      for (const [name, value] of object) {
        if (typeof value === "string") {
          const chunk2 = textEncoder.encode(prefix + `; name="${escape2(normalizeLinefeeds(name))}"\r
\r
${normalizeLinefeeds(value)}\r
`);
          blobParts.push(chunk2);
          length += chunk2.byteLength;
        } else {
          const chunk2 = textEncoder.encode(`${prefix}; name="${escape2(normalizeLinefeeds(name))}"` + (value.name ? `; filename="${escape2(value.name)}"` : "") + `\r
Content-Type: ${value.type || "application/octet-stream"}\r
\r
`);
          blobParts.push(chunk2, value, rn);
          if (typeof value.size === "number") {
            length += chunk2.byteLength + value.size + rn.byteLength;
          } else {
            hasUnknownSizeValue = true;
          }
        }
      }
      const chunk = textEncoder.encode(`--${boundary}--\r
`);
      blobParts.push(chunk);
      length += chunk.byteLength;
      if (hasUnknownSizeValue) {
        length = null;
      }
      source2 = object;
      action = async function* () {
        for (const part of blobParts) {
          if (part.stream) {
            yield* part.stream();
          } else {
            yield part;
          }
        }
      };
      type = `multipart/form-data; boundary=${boundary}`;
    } else if (isBlobLike2(object)) {
      source2 = object;
      length = object.size;
      if (object.type) {
        type = object.type;
      }
    } else if (typeof object[Symbol.asyncIterator] === "function") {
      if (keepalive) {
        throw new TypeError("keepalive");
      }
      if (util2.isDisturbed(object) || object.locked) {
        throw new TypeError(
          "Response body object should not be disturbed or locked"
        );
      }
      stream2 = object instanceof ReadableStream ? object : ReadableStreamFrom2(object);
    }
    if (typeof source2 === "string" || util2.isBuffer(source2)) {
      length = Buffer.byteLength(source2);
    }
    if (action != null) {
      let iterator;
      stream2 = new ReadableStream({
        async start() {
          iterator = action(object)[Symbol.asyncIterator]();
        },
        async pull(controller) {
          const { value, done } = await iterator.next();
          if (done) {
            queueMicrotask(() => {
              var _a2;
              controller.close();
              (_a2 = controller.byobRequest) == null ? void 0 : _a2.respond(0);
            });
          } else {
            if (!isErrored2(stream2)) {
              const buffer2 = new Uint8Array(value);
              if (buffer2.byteLength) {
                controller.enqueue(buffer2);
              }
            }
          }
          return controller.desiredSize > 0;
        },
        async cancel(reason) {
          await iterator.return();
        },
        type: "bytes"
      });
    }
    const body2 = { stream: stream2, source: source2, length };
    return [body2, type];
  }
  function safelyExtractBody(object, keepalive = false) {
    if (object instanceof ReadableStream) {
      assert2(!util2.isDisturbed(object), "The body has already been consumed.");
      assert2(!object.locked, "The stream is locked.");
    }
    return extractBody2(object, keepalive);
  }
  function cloneBody(instance, body2) {
    const [out1, out2] = body2.stream.tee();
    body2.stream = out1;
    return {
      stream: out2,
      length: body2.length,
      source: body2.source
    };
  }
  function throwIfAborted(state) {
    if (state.aborted) {
      throw new DOMException("The operation was aborted.", "AbortError");
    }
  }
  function bodyMixinMethods(instance) {
    const methods = {
      blob() {
        return consumeBody(this, (bytes) => {
          let mimeType = bodyMimeType(this);
          if (mimeType === null) {
            mimeType = "";
          } else if (mimeType) {
            mimeType = serializeAMimeType2(mimeType);
          }
          return new Blob2([bytes], { type: mimeType });
        }, instance);
      },
      arrayBuffer() {
        return consumeBody(this, (bytes) => {
          return new Uint8Array(bytes).buffer;
        }, instance);
      },
      text() {
        return consumeBody(this, utf8DecodeBytes, instance);
      },
      json() {
        return consumeBody(this, parseJSONFromBytes, instance);
      },
      formData() {
        return consumeBody(this, (value) => {
          const mimeType = bodyMimeType(this);
          if (mimeType !== null) {
            switch (mimeType.essence) {
              case "multipart/form-data": {
                const parsed = multipartFormDataParser(value, mimeType);
                if (parsed === "failure") {
                  throw new TypeError("Failed to parse body as FormData.");
                }
                const fd = new FormData();
                fd[kState] = parsed;
                return fd;
              }
              case "application/x-www-form-urlencoded": {
                const entries = new URLSearchParams(value.toString());
                const fd = new FormData();
                for (const [name, value2] of entries) {
                  fd.append(name, value2);
                }
                return fd;
              }
            }
          }
          throw new TypeError(
            'Content-Type was not one of "multipart/form-data" or "application/x-www-form-urlencoded".'
          );
        }, instance);
      },
      bytes() {
        return consumeBody(this, (bytes) => {
          return new Uint8Array(bytes);
        }, instance);
      }
    };
    return methods;
  }
  function mixinBody(prototype) {
    Object.assign(prototype.prototype, bodyMixinMethods(prototype));
  }
  async function consumeBody(object, convertBytesToJSValue, instance) {
    webidl.brandCheck(object, instance);
    if (bodyUnusable(object)) {
      throw new TypeError("Body is unusable: Body has already been read");
    }
    throwIfAborted(object[kState]);
    const promise = createDeferredPromise();
    const errorSteps = (error) => promise.reject(error);
    const successSteps = (data) => {
      try {
        promise.resolve(convertBytesToJSValue(data));
      } catch (e) {
        errorSteps(e);
      }
    };
    if (object[kState].body == null) {
      successSteps(Buffer.allocUnsafe(0));
      return promise.promise;
    }
    await fullyReadBody(object[kState].body, successSteps, errorSteps);
    return promise.promise;
  }
  function bodyUnusable(object) {
    const body2 = object[kState].body;
    return body2 != null && (body2.stream.locked || util2.isDisturbed(body2.stream));
  }
  function parseJSONFromBytes(bytes) {
    return JSON.parse(utf8DecodeBytes(bytes));
  }
  function bodyMimeType(requestOrResponse) {
    const headers2 = requestOrResponse[kState].headersList;
    const mimeType = extractMimeType(headers2);
    if (mimeType === "failure") {
      return null;
    }
    return mimeType;
  }
  body = {
    extractBody: extractBody2,
    safelyExtractBody,
    cloneBody,
    mixinBody,
    streamRegistry,
    hasFinalizationRegistry,
    bodyUnusable
  };
  return body;
}
const assert$a = require$$0$1;
const util$i = util$m;
const { channels: channels$1 } = diagnostics;
const timers = timers$2;
const {
  RequestContentLengthMismatchError: RequestContentLengthMismatchError$1,
  ResponseContentLengthMismatchError: ResponseContentLengthMismatchError2,
  RequestAbortedError: RequestAbortedError$7,
  HeadersTimeoutError: HeadersTimeoutError2,
  HeadersOverflowError: HeadersOverflowError2,
  SocketError: SocketError$3,
  InformationalError: InformationalError$3,
  BodyTimeoutError: BodyTimeoutError2,
  HTTPParserError: HTTPParserError2,
  ResponseExceededMaxSizeError: ResponseExceededMaxSizeError2
} = errors$1;
const {
  kUrl: kUrl$4,
  kReset: kReset$1,
  kClient: kClient$2,
  kParser,
  kBlocking,
  kRunning: kRunning$5,
  kPending: kPending$4,
  kSize: kSize$5,
  kWriting,
  kQueue: kQueue$3,
  kNoRef,
  kKeepAliveDefaultTimeout: kKeepAliveDefaultTimeout$1,
  kHostHeader: kHostHeader$1,
  kPendingIdx: kPendingIdx$2,
  kRunningIdx: kRunningIdx$2,
  kError: kError$2,
  kPipelining: kPipelining$1,
  kSocket: kSocket$1,
  kKeepAliveTimeoutValue: kKeepAliveTimeoutValue$1,
  kMaxHeadersSize: kMaxHeadersSize$1,
  kKeepAliveMaxTimeout: kKeepAliveMaxTimeout$1,
  kKeepAliveTimeoutThreshold: kKeepAliveTimeoutThreshold$1,
  kHeadersTimeout: kHeadersTimeout$1,
  kBodyTimeout: kBodyTimeout$1,
  kStrictContentLength: kStrictContentLength$2,
  kMaxRequests: kMaxRequests$1,
  kCounter: kCounter$1,
  kMaxResponseSize: kMaxResponseSize$1,
  kOnError: kOnError$2,
  kResume: kResume$3,
  kHTTPContext: kHTTPContext$2
} = symbols$4;
const constants$2 = constants$4;
const EMPTY_BUF = Buffer.alloc(0);
const FastBuffer = Buffer[Symbol.species];
const addListener = util$i.addListener;
const removeAllListeners = util$i.removeAllListeners;
let extractBody$1;
async function lazyllhttp() {
  const llhttpWasmData = process.env.JEST_WORKER_ID ? requireLlhttpWasm() : void 0;
  let mod;
  try {
    mod = await WebAssembly.compile(requireLlhttp_simdWasm());
  } catch (e) {
    mod = await WebAssembly.compile(llhttpWasmData || requireLlhttpWasm());
  }
  return await WebAssembly.instantiate(mod, {
    env: {
      /* eslint-disable camelcase */
      wasm_on_url: (p, at, len) => {
        return 0;
      },
      wasm_on_status: (p, at, len) => {
        assert$a(currentParser.ptr === p);
        const start = at - currentBufferPtr + currentBufferRef.byteOffset;
        return currentParser.onStatus(new FastBuffer(currentBufferRef.buffer, start, len)) || 0;
      },
      wasm_on_message_begin: (p) => {
        assert$a(currentParser.ptr === p);
        return currentParser.onMessageBegin() || 0;
      },
      wasm_on_header_field: (p, at, len) => {
        assert$a(currentParser.ptr === p);
        const start = at - currentBufferPtr + currentBufferRef.byteOffset;
        return currentParser.onHeaderField(new FastBuffer(currentBufferRef.buffer, start, len)) || 0;
      },
      wasm_on_header_value: (p, at, len) => {
        assert$a(currentParser.ptr === p);
        const start = at - currentBufferPtr + currentBufferRef.byteOffset;
        return currentParser.onHeaderValue(new FastBuffer(currentBufferRef.buffer, start, len)) || 0;
      },
      wasm_on_headers_complete: (p, statusCode, upgrade2, shouldKeepAlive) => {
        assert$a(currentParser.ptr === p);
        return currentParser.onHeadersComplete(statusCode, Boolean(upgrade2), Boolean(shouldKeepAlive)) || 0;
      },
      wasm_on_body: (p, at, len) => {
        assert$a(currentParser.ptr === p);
        const start = at - currentBufferPtr + currentBufferRef.byteOffset;
        return currentParser.onBody(new FastBuffer(currentBufferRef.buffer, start, len)) || 0;
      },
      wasm_on_message_complete: (p) => {
        assert$a(currentParser.ptr === p);
        return currentParser.onMessageComplete() || 0;
      }
      /* eslint-enable camelcase */
    }
  });
}
let llhttpInstance = null;
let llhttpPromise = lazyllhttp();
llhttpPromise.catch();
let currentParser = null;
let currentBufferRef = null;
let currentBufferSize = 0;
let currentBufferPtr = null;
const USE_NATIVE_TIMER = 0;
const USE_FAST_TIMER = 1;
const TIMEOUT_HEADERS = 2 | USE_FAST_TIMER;
const TIMEOUT_BODY = 4 | USE_FAST_TIMER;
const TIMEOUT_KEEP_ALIVE = 8 | USE_NATIVE_TIMER;
class Parser {
  constructor(client2, socket, { exports }) {
    assert$a(Number.isFinite(client2[kMaxHeadersSize$1]) && client2[kMaxHeadersSize$1] > 0);
    this.llhttp = exports;
    this.ptr = this.llhttp.llhttp_alloc(constants$2.TYPE.RESPONSE);
    this.client = client2;
    this.socket = socket;
    this.timeout = null;
    this.timeoutValue = null;
    this.timeoutType = null;
    this.statusCode = null;
    this.statusText = "";
    this.upgrade = false;
    this.headers = [];
    this.headersSize = 0;
    this.headersMaxSize = client2[kMaxHeadersSize$1];
    this.shouldKeepAlive = false;
    this.paused = false;
    this.resume = this.resume.bind(this);
    this.bytesRead = 0;
    this.keepAlive = "";
    this.contentLength = "";
    this.connection = "";
    this.maxResponseSize = client2[kMaxResponseSize$1];
  }
  setTimeout(delay, type) {
    if (delay !== this.timeoutValue || type & USE_FAST_TIMER ^ this.timeoutType & USE_FAST_TIMER) {
      if (this.timeout) {
        timers.clearTimeout(this.timeout);
        this.timeout = null;
      }
      if (delay) {
        if (type & USE_FAST_TIMER) {
          this.timeout = timers.setFastTimeout(onParserTimeout, delay, new WeakRef(this));
        } else {
          this.timeout = setTimeout(onParserTimeout, delay, new WeakRef(this));
          this.timeout.unref();
        }
      }
      this.timeoutValue = delay;
    } else if (this.timeout) {
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }
    this.timeoutType = type;
  }
  resume() {
    if (this.socket.destroyed || !this.paused) {
      return;
    }
    assert$a(this.ptr != null);
    assert$a(currentParser == null);
    this.llhttp.llhttp_resume(this.ptr);
    assert$a(this.timeoutType === TIMEOUT_BODY);
    if (this.timeout) {
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }
    this.paused = false;
    this.execute(this.socket.read() || EMPTY_BUF);
    this.readMore();
  }
  readMore() {
    while (!this.paused && this.ptr) {
      const chunk = this.socket.read();
      if (chunk === null) {
        break;
      }
      this.execute(chunk);
    }
  }
  execute(data) {
    assert$a(this.ptr != null);
    assert$a(currentParser == null);
    assert$a(!this.paused);
    const { socket, llhttp } = this;
    if (data.length > currentBufferSize) {
      if (currentBufferPtr) {
        llhttp.free(currentBufferPtr);
      }
      currentBufferSize = Math.ceil(data.length / 4096) * 4096;
      currentBufferPtr = llhttp.malloc(currentBufferSize);
    }
    new Uint8Array(llhttp.memory.buffer, currentBufferPtr, currentBufferSize).set(data);
    try {
      let ret;
      try {
        currentBufferRef = data;
        currentParser = this;
        ret = llhttp.llhttp_execute(this.ptr, currentBufferPtr, data.length);
      } catch (err) {
        throw err;
      } finally {
        currentParser = null;
        currentBufferRef = null;
      }
      const offset = llhttp.llhttp_get_error_pos(this.ptr) - currentBufferPtr;
      if (ret === constants$2.ERROR.PAUSED_UPGRADE) {
        this.onUpgrade(data.slice(offset));
      } else if (ret === constants$2.ERROR.PAUSED) {
        this.paused = true;
        socket.unshift(data.slice(offset));
      } else if (ret !== constants$2.ERROR.OK) {
        const ptr = llhttp.llhttp_get_error_reason(this.ptr);
        let message = "";
        if (ptr) {
          const len = new Uint8Array(llhttp.memory.buffer, ptr).indexOf(0);
          message = "Response does not match the HTTP/1.1 protocol (" + Buffer.from(llhttp.memory.buffer, ptr, len).toString() + ")";
        }
        throw new HTTPParserError2(message, constants$2.ERROR[ret], data.slice(offset));
      }
    } catch (err) {
      util$i.destroy(socket, err);
    }
  }
  destroy() {
    assert$a(this.ptr != null);
    assert$a(currentParser == null);
    this.llhttp.llhttp_free(this.ptr);
    this.ptr = null;
    this.timeout && timers.clearTimeout(this.timeout);
    this.timeout = null;
    this.timeoutValue = null;
    this.timeoutType = null;
    this.paused = false;
  }
  onStatus(buf) {
    this.statusText = buf.toString();
  }
  onMessageBegin() {
    const { socket, client: client2 } = this;
    if (socket.destroyed) {
      return -1;
    }
    const request2 = client2[kQueue$3][client2[kRunningIdx$2]];
    if (!request2) {
      return -1;
    }
    request2.onResponseStarted();
  }
  onHeaderField(buf) {
    const len = this.headers.length;
    if ((len & 1) === 0) {
      this.headers.push(buf);
    } else {
      this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
    }
    this.trackHeader(buf.length);
  }
  onHeaderValue(buf) {
    let len = this.headers.length;
    if ((len & 1) === 1) {
      this.headers.push(buf);
      len += 1;
    } else {
      this.headers[len - 1] = Buffer.concat([this.headers[len - 1], buf]);
    }
    const key2 = this.headers[len - 2];
    if (key2.length === 10) {
      const headerName = util$i.bufferToLowerCasedHeaderName(key2);
      if (headerName === "keep-alive") {
        this.keepAlive += buf.toString();
      } else if (headerName === "connection") {
        this.connection += buf.toString();
      }
    } else if (key2.length === 14 && util$i.bufferToLowerCasedHeaderName(key2) === "content-length") {
      this.contentLength += buf.toString();
    }
    this.trackHeader(buf.length);
  }
  trackHeader(len) {
    this.headersSize += len;
    if (this.headersSize >= this.headersMaxSize) {
      util$i.destroy(this.socket, new HeadersOverflowError2());
    }
  }
  onUpgrade(head) {
    const { upgrade: upgrade2, client: client2, socket, headers: headers2, statusCode } = this;
    assert$a(upgrade2);
    assert$a(client2[kSocket$1] === socket);
    assert$a(!socket.destroyed);
    assert$a(!this.paused);
    assert$a((headers2.length & 1) === 0);
    const request2 = client2[kQueue$3][client2[kRunningIdx$2]];
    assert$a(request2);
    assert$a(request2.upgrade || request2.method === "CONNECT");
    this.statusCode = null;
    this.statusText = "";
    this.shouldKeepAlive = null;
    this.headers = [];
    this.headersSize = 0;
    socket.unshift(head);
    socket[kParser].destroy();
    socket[kParser] = null;
    socket[kClient$2] = null;
    socket[kError$2] = null;
    removeAllListeners(socket);
    client2[kSocket$1] = null;
    client2[kHTTPContext$2] = null;
    client2[kQueue$3][client2[kRunningIdx$2]++] = null;
    client2.emit("disconnect", client2[kUrl$4], [client2], new InformationalError$3("upgrade"));
    try {
      request2.onUpgrade(statusCode, headers2, socket);
    } catch (err) {
      util$i.destroy(socket, err);
    }
    client2[kResume$3]();
  }
  onHeadersComplete(statusCode, upgrade2, shouldKeepAlive) {
    const { client: client2, socket, headers: headers2, statusText } = this;
    if (socket.destroyed) {
      return -1;
    }
    const request2 = client2[kQueue$3][client2[kRunningIdx$2]];
    if (!request2) {
      return -1;
    }
    assert$a(!this.upgrade);
    assert$a(this.statusCode < 200);
    if (statusCode === 100) {
      util$i.destroy(socket, new SocketError$3("bad response", util$i.getSocketInfo(socket)));
      return -1;
    }
    if (upgrade2 && !request2.upgrade) {
      util$i.destroy(socket, new SocketError$3("bad upgrade", util$i.getSocketInfo(socket)));
      return -1;
    }
    assert$a(this.timeoutType === TIMEOUT_HEADERS);
    this.statusCode = statusCode;
    this.shouldKeepAlive = shouldKeepAlive || // Override llhttp value which does not allow keepAlive for HEAD.
    request2.method === "HEAD" && !socket[kReset$1] && this.connection.toLowerCase() === "keep-alive";
    if (this.statusCode >= 200) {
      const bodyTimeout = request2.bodyTimeout != null ? request2.bodyTimeout : client2[kBodyTimeout$1];
      this.setTimeout(bodyTimeout, TIMEOUT_BODY);
    } else if (this.timeout) {
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }
    if (request2.method === "CONNECT") {
      assert$a(client2[kRunning$5] === 1);
      this.upgrade = true;
      return 2;
    }
    if (upgrade2) {
      assert$a(client2[kRunning$5] === 1);
      this.upgrade = true;
      return 2;
    }
    assert$a((this.headers.length & 1) === 0);
    this.headers = [];
    this.headersSize = 0;
    if (this.shouldKeepAlive && client2[kPipelining$1]) {
      const keepAliveTimeout = this.keepAlive ? util$i.parseKeepAliveTimeout(this.keepAlive) : null;
      if (keepAliveTimeout != null) {
        const timeout = Math.min(
          keepAliveTimeout - client2[kKeepAliveTimeoutThreshold$1],
          client2[kKeepAliveMaxTimeout$1]
        );
        if (timeout <= 0) {
          socket[kReset$1] = true;
        } else {
          client2[kKeepAliveTimeoutValue$1] = timeout;
        }
      } else {
        client2[kKeepAliveTimeoutValue$1] = client2[kKeepAliveDefaultTimeout$1];
      }
    } else {
      socket[kReset$1] = true;
    }
    const pause = request2.onHeaders(statusCode, headers2, this.resume, statusText) === false;
    if (request2.aborted) {
      return -1;
    }
    if (request2.method === "HEAD") {
      return 1;
    }
    if (statusCode < 200) {
      return 1;
    }
    if (socket[kBlocking]) {
      socket[kBlocking] = false;
      client2[kResume$3]();
    }
    return pause ? constants$2.ERROR.PAUSED : 0;
  }
  onBody(buf) {
    const { client: client2, socket, statusCode, maxResponseSize } = this;
    if (socket.destroyed) {
      return -1;
    }
    const request2 = client2[kQueue$3][client2[kRunningIdx$2]];
    assert$a(request2);
    assert$a(this.timeoutType === TIMEOUT_BODY);
    if (this.timeout) {
      if (this.timeout.refresh) {
        this.timeout.refresh();
      }
    }
    assert$a(statusCode >= 200);
    if (maxResponseSize > -1 && this.bytesRead + buf.length > maxResponseSize) {
      util$i.destroy(socket, new ResponseExceededMaxSizeError2());
      return -1;
    }
    this.bytesRead += buf.length;
    if (request2.onData(buf) === false) {
      return constants$2.ERROR.PAUSED;
    }
  }
  onMessageComplete() {
    const { client: client2, socket, statusCode, upgrade: upgrade2, headers: headers2, contentLength, bytesRead, shouldKeepAlive } = this;
    if (socket.destroyed && (!statusCode || shouldKeepAlive)) {
      return -1;
    }
    if (upgrade2) {
      return;
    }
    assert$a(statusCode >= 100);
    assert$a((this.headers.length & 1) === 0);
    const request2 = client2[kQueue$3][client2[kRunningIdx$2]];
    assert$a(request2);
    this.statusCode = null;
    this.statusText = "";
    this.bytesRead = 0;
    this.contentLength = "";
    this.keepAlive = "";
    this.connection = "";
    this.headers = [];
    this.headersSize = 0;
    if (statusCode < 200) {
      return;
    }
    if (request2.method !== "HEAD" && contentLength && bytesRead !== parseInt(contentLength, 10)) {
      util$i.destroy(socket, new ResponseContentLengthMismatchError2());
      return -1;
    }
    request2.onComplete(headers2);
    client2[kQueue$3][client2[kRunningIdx$2]++] = null;
    if (socket[kWriting]) {
      assert$a(client2[kRunning$5] === 0);
      util$i.destroy(socket, new InformationalError$3("reset"));
      return constants$2.ERROR.PAUSED;
    } else if (!shouldKeepAlive) {
      util$i.destroy(socket, new InformationalError$3("reset"));
      return constants$2.ERROR.PAUSED;
    } else if (socket[kReset$1] && client2[kRunning$5] === 0) {
      util$i.destroy(socket, new InformationalError$3("reset"));
      return constants$2.ERROR.PAUSED;
    } else if (client2[kPipelining$1] == null || client2[kPipelining$1] === 1) {
      setImmediate(() => client2[kResume$3]());
    } else {
      client2[kResume$3]();
    }
  }
}
function onParserTimeout(parser2) {
  const { socket, timeoutType, client: client2, paused } = parser2.deref();
  if (timeoutType === TIMEOUT_HEADERS) {
    if (!socket[kWriting] || socket.writableNeedDrain || client2[kRunning$5] > 1) {
      assert$a(!paused, "cannot be paused while waiting for headers");
      util$i.destroy(socket, new HeadersTimeoutError2());
    }
  } else if (timeoutType === TIMEOUT_BODY) {
    if (!paused) {
      util$i.destroy(socket, new BodyTimeoutError2());
    }
  } else if (timeoutType === TIMEOUT_KEEP_ALIVE) {
    assert$a(client2[kRunning$5] === 0 && client2[kKeepAliveTimeoutValue$1]);
    util$i.destroy(socket, new InformationalError$3("socket idle timeout"));
  }
}
async function connectH1$1(client2, socket) {
  client2[kSocket$1] = socket;
  if (!llhttpInstance) {
    llhttpInstance = await llhttpPromise;
    llhttpPromise = null;
  }
  socket[kNoRef] = false;
  socket[kWriting] = false;
  socket[kReset$1] = false;
  socket[kBlocking] = false;
  socket[kParser] = new Parser(client2, socket, llhttpInstance);
  addListener(socket, "error", function(err) {
    assert$a(err.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
    const parser2 = this[kParser];
    if (err.code === "ECONNRESET" && parser2.statusCode && !parser2.shouldKeepAlive) {
      parser2.onMessageComplete();
      return;
    }
    this[kError$2] = err;
    this[kClient$2][kOnError$2](err);
  });
  addListener(socket, "readable", function() {
    const parser2 = this[kParser];
    if (parser2) {
      parser2.readMore();
    }
  });
  addListener(socket, "end", function() {
    const parser2 = this[kParser];
    if (parser2.statusCode && !parser2.shouldKeepAlive) {
      parser2.onMessageComplete();
      return;
    }
    util$i.destroy(this, new SocketError$3("other side closed", util$i.getSocketInfo(this)));
  });
  addListener(socket, "close", function() {
    const client22 = this[kClient$2];
    const parser2 = this[kParser];
    if (parser2) {
      if (!this[kError$2] && parser2.statusCode && !parser2.shouldKeepAlive) {
        parser2.onMessageComplete();
      }
      this[kParser].destroy();
      this[kParser] = null;
    }
    const err = this[kError$2] || new SocketError$3("closed", util$i.getSocketInfo(this));
    client22[kSocket$1] = null;
    client22[kHTTPContext$2] = null;
    if (client22.destroyed) {
      assert$a(client22[kPending$4] === 0);
      const requests = client22[kQueue$3].splice(client22[kRunningIdx$2]);
      for (let i = 0; i < requests.length; i++) {
        const request2 = requests[i];
        util$i.errorRequest(client22, request2, err);
      }
    } else if (client22[kRunning$5] > 0 && err.code !== "UND_ERR_INFO") {
      const request2 = client22[kQueue$3][client22[kRunningIdx$2]];
      client22[kQueue$3][client22[kRunningIdx$2]++] = null;
      util$i.errorRequest(client22, request2, err);
    }
    client22[kPendingIdx$2] = client22[kRunningIdx$2];
    assert$a(client22[kRunning$5] === 0);
    client22.emit("disconnect", client22[kUrl$4], [client22], err);
    client22[kResume$3]();
  });
  let closed = false;
  socket.on("close", () => {
    closed = true;
  });
  return {
    version: "h1",
    defaultPipelining: 1,
    write(...args) {
      return writeH1(client2, ...args);
    },
    resume() {
      resumeH1(client2);
    },
    destroy(err, callback) {
      if (closed) {
        queueMicrotask(callback);
      } else {
        socket.destroy(err).on("close", callback);
      }
    },
    get destroyed() {
      return socket.destroyed;
    },
    busy(request2) {
      if (socket[kWriting] || socket[kReset$1] || socket[kBlocking]) {
        return true;
      }
      if (request2) {
        if (client2[kRunning$5] > 0 && !request2.idempotent) {
          return true;
        }
        if (client2[kRunning$5] > 0 && (request2.upgrade || request2.method === "CONNECT")) {
          return true;
        }
        if (client2[kRunning$5] > 0 && util$i.bodyLength(request2.body) !== 0 && (util$i.isStream(request2.body) || util$i.isAsyncIterable(request2.body) || util$i.isFormDataLike(request2.body))) {
          return true;
        }
      }
      return false;
    }
  };
}
function resumeH1(client2) {
  const socket = client2[kSocket$1];
  if (socket && !socket.destroyed) {
    if (client2[kSize$5] === 0) {
      if (!socket[kNoRef] && socket.unref) {
        socket.unref();
        socket[kNoRef] = true;
      }
    } else if (socket[kNoRef] && socket.ref) {
      socket.ref();
      socket[kNoRef] = false;
    }
    if (client2[kSize$5] === 0) {
      if (socket[kParser].timeoutType !== TIMEOUT_KEEP_ALIVE) {
        socket[kParser].setTimeout(client2[kKeepAliveTimeoutValue$1], TIMEOUT_KEEP_ALIVE);
      }
    } else if (client2[kRunning$5] > 0 && socket[kParser].statusCode < 200) {
      if (socket[kParser].timeoutType !== TIMEOUT_HEADERS) {
        const request2 = client2[kQueue$3][client2[kRunningIdx$2]];
        const headersTimeout = request2.headersTimeout != null ? request2.headersTimeout : client2[kHeadersTimeout$1];
        socket[kParser].setTimeout(headersTimeout, TIMEOUT_HEADERS);
      }
    }
  }
}
function shouldSendContentLength$1(method) {
  return method !== "GET" && method !== "HEAD" && method !== "OPTIONS" && method !== "TRACE" && method !== "CONNECT";
}
function writeH1(client2, request2) {
  const { method, path: path2, host, upgrade: upgrade2, blocking, reset } = request2;
  let { body: body2, headers: headers2, contentLength } = request2;
  const expectsPayload = method === "PUT" || method === "POST" || method === "PATCH" || method === "QUERY" || method === "PROPFIND" || method === "PROPPATCH";
  if (util$i.isFormDataLike(body2)) {
    if (!extractBody$1) {
      extractBody$1 = requireBody().extractBody;
    }
    const [bodyStream, contentType] = extractBody$1(body2);
    if (request2.contentType == null) {
      headers2.push("content-type", contentType);
    }
    body2 = bodyStream.stream;
    contentLength = bodyStream.length;
  } else if (util$i.isBlobLike(body2) && request2.contentType == null && body2.type) {
    headers2.push("content-type", body2.type);
  }
  if (body2 && typeof body2.read === "function") {
    body2.read(0);
  }
  const bodyLength2 = util$i.bodyLength(body2);
  contentLength = bodyLength2 ?? contentLength;
  if (contentLength === null) {
    contentLength = request2.contentLength;
  }
  if (contentLength === 0 && !expectsPayload) {
    contentLength = null;
  }
  if (shouldSendContentLength$1(method) && contentLength > 0 && request2.contentLength !== null && request2.contentLength !== contentLength) {
    if (client2[kStrictContentLength$2]) {
      util$i.errorRequest(client2, request2, new RequestContentLengthMismatchError$1());
      return false;
    }
    process.emitWarning(new RequestContentLengthMismatchError$1());
  }
  const socket = client2[kSocket$1];
  const abort2 = (err) => {
    if (request2.aborted || request2.completed) {
      return;
    }
    util$i.errorRequest(client2, request2, err || new RequestAbortedError$7());
    util$i.destroy(body2);
    util$i.destroy(socket, new InformationalError$3("aborted"));
  };
  try {
    request2.onConnect(abort2);
  } catch (err) {
    util$i.errorRequest(client2, request2, err);
  }
  if (request2.aborted) {
    return false;
  }
  if (method === "HEAD") {
    socket[kReset$1] = true;
  }
  if (upgrade2 || method === "CONNECT") {
    socket[kReset$1] = true;
  }
  if (reset != null) {
    socket[kReset$1] = reset;
  }
  if (client2[kMaxRequests$1] && socket[kCounter$1]++ >= client2[kMaxRequests$1]) {
    socket[kReset$1] = true;
  }
  if (blocking) {
    socket[kBlocking] = true;
  }
  let header = `${method} ${path2} HTTP/1.1\r
`;
  if (typeof host === "string") {
    header += `host: ${host}\r
`;
  } else {
    header += client2[kHostHeader$1];
  }
  if (upgrade2) {
    header += `connection: upgrade\r
upgrade: ${upgrade2}\r
`;
  } else if (client2[kPipelining$1] && !socket[kReset$1]) {
    header += "connection: keep-alive\r\n";
  } else {
    header += "connection: close\r\n";
  }
  if (Array.isArray(headers2)) {
    for (let n = 0; n < headers2.length; n += 2) {
      const key2 = headers2[n + 0];
      const val = headers2[n + 1];
      if (Array.isArray(val)) {
        for (let i = 0; i < val.length; i++) {
          header += `${key2}: ${val[i]}\r
`;
        }
      } else {
        header += `${key2}: ${val}\r
`;
      }
    }
  }
  if (channels$1.sendHeaders.hasSubscribers) {
    channels$1.sendHeaders.publish({ request: request2, headers: header, socket });
  }
  if (!body2 || bodyLength2 === 0) {
    writeBuffer$1(abort2, null, client2, request2, socket, contentLength, header, expectsPayload);
  } else if (util$i.isBuffer(body2)) {
    writeBuffer$1(abort2, body2, client2, request2, socket, contentLength, header, expectsPayload);
  } else if (util$i.isBlobLike(body2)) {
    if (typeof body2.stream === "function") {
      writeIterable$1(abort2, body2.stream(), client2, request2, socket, contentLength, header, expectsPayload);
    } else {
      writeBlob$1(abort2, body2, client2, request2, socket, contentLength, header, expectsPayload);
    }
  } else if (util$i.isStream(body2)) {
    writeStream$1(abort2, body2, client2, request2, socket, contentLength, header, expectsPayload);
  } else if (util$i.isIterable(body2)) {
    writeIterable$1(abort2, body2, client2, request2, socket, contentLength, header, expectsPayload);
  } else {
    assert$a(false);
  }
  return true;
}
function writeStream$1(abort2, body2, client2, request2, socket, contentLength, header, expectsPayload) {
  assert$a(contentLength !== 0 || client2[kRunning$5] === 0, "stream body cannot be pipelined");
  let finished2 = false;
  const writer = new AsyncWriter({ abort: abort2, socket, request: request2, contentLength, client: client2, expectsPayload, header });
  const onData = function(chunk) {
    if (finished2) {
      return;
    }
    try {
      if (!writer.write(chunk) && this.pause) {
        this.pause();
      }
    } catch (err) {
      util$i.destroy(this, err);
    }
  };
  const onDrain = function() {
    if (finished2) {
      return;
    }
    if (body2.resume) {
      body2.resume();
    }
  };
  const onClose = function() {
    queueMicrotask(() => {
      body2.removeListener("error", onFinished);
    });
    if (!finished2) {
      const err = new RequestAbortedError$7();
      queueMicrotask(() => onFinished(err));
    }
  };
  const onFinished = function(err) {
    if (finished2) {
      return;
    }
    finished2 = true;
    assert$a(socket.destroyed || socket[kWriting] && client2[kRunning$5] <= 1);
    socket.off("drain", onDrain).off("error", onFinished);
    body2.removeListener("data", onData).removeListener("end", onFinished).removeListener("close", onClose);
    if (!err) {
      try {
        writer.end();
      } catch (er) {
        err = er;
      }
    }
    writer.destroy(err);
    if (err && (err.code !== "UND_ERR_INFO" || err.message !== "reset")) {
      util$i.destroy(body2, err);
    } else {
      util$i.destroy(body2);
    }
  };
  body2.on("data", onData).on("end", onFinished).on("error", onFinished).on("close", onClose);
  if (body2.resume) {
    body2.resume();
  }
  socket.on("drain", onDrain).on("error", onFinished);
  if (body2.errorEmitted ?? body2.errored) {
    setImmediate(() => onFinished(body2.errored));
  } else if (body2.endEmitted ?? body2.readableEnded) {
    setImmediate(() => onFinished(null));
  }
  if (body2.closeEmitted ?? body2.closed) {
    setImmediate(onClose);
  }
}
function writeBuffer$1(abort2, body2, client2, request2, socket, contentLength, header, expectsPayload) {
  try {
    if (!body2) {
      if (contentLength === 0) {
        socket.write(`${header}content-length: 0\r
\r
`, "latin1");
      } else {
        assert$a(contentLength === null, "no body must not have content length");
        socket.write(`${header}\r
`, "latin1");
      }
    } else if (util$i.isBuffer(body2)) {
      assert$a(contentLength === body2.byteLength, "buffer body must have content length");
      socket.cork();
      socket.write(`${header}content-length: ${contentLength}\r
\r
`, "latin1");
      socket.write(body2);
      socket.uncork();
      request2.onBodySent(body2);
      if (!expectsPayload && request2.reset !== false) {
        socket[kReset$1] = true;
      }
    }
    request2.onRequestSent();
    client2[kResume$3]();
  } catch (err) {
    abort2(err);
  }
}
async function writeBlob$1(abort2, body2, client2, request2, socket, contentLength, header, expectsPayload) {
  assert$a(contentLength === body2.size, "blob body must have content length");
  try {
    if (contentLength != null && contentLength !== body2.size) {
      throw new RequestContentLengthMismatchError$1();
    }
    const buffer2 = Buffer.from(await body2.arrayBuffer());
    socket.cork();
    socket.write(`${header}content-length: ${contentLength}\r
\r
`, "latin1");
    socket.write(buffer2);
    socket.uncork();
    request2.onBodySent(buffer2);
    request2.onRequestSent();
    if (!expectsPayload && request2.reset !== false) {
      socket[kReset$1] = true;
    }
    client2[kResume$3]();
  } catch (err) {
    abort2(err);
  }
}
async function writeIterable$1(abort2, body2, client2, request2, socket, contentLength, header, expectsPayload) {
  assert$a(contentLength !== 0 || client2[kRunning$5] === 0, "iterator body cannot be pipelined");
  let callback = null;
  function onDrain() {
    if (callback) {
      const cb = callback;
      callback = null;
      cb();
    }
  }
  const waitForDrain = () => new Promise((resolve, reject) => {
    assert$a(callback === null);
    if (socket[kError$2]) {
      reject(socket[kError$2]);
    } else {
      callback = resolve;
    }
  });
  socket.on("close", onDrain).on("drain", onDrain);
  const writer = new AsyncWriter({ abort: abort2, socket, request: request2, contentLength, client: client2, expectsPayload, header });
  try {
    for await (const chunk of body2) {
      if (socket[kError$2]) {
        throw socket[kError$2];
      }
      if (!writer.write(chunk)) {
        await waitForDrain();
      }
    }
    writer.end();
  } catch (err) {
    writer.destroy(err);
  } finally {
    socket.off("close", onDrain).off("drain", onDrain);
  }
}
class AsyncWriter {
  constructor({ abort: abort2, socket, request: request2, contentLength, client: client2, expectsPayload, header }) {
    this.socket = socket;
    this.request = request2;
    this.contentLength = contentLength;
    this.client = client2;
    this.bytesWritten = 0;
    this.expectsPayload = expectsPayload;
    this.header = header;
    this.abort = abort2;
    socket[kWriting] = true;
  }
  write(chunk) {
    const { socket, request: request2, contentLength, client: client2, bytesWritten, expectsPayload, header } = this;
    if (socket[kError$2]) {
      throw socket[kError$2];
    }
    if (socket.destroyed) {
      return false;
    }
    const len = Buffer.byteLength(chunk);
    if (!len) {
      return true;
    }
    if (contentLength !== null && bytesWritten + len > contentLength) {
      if (client2[kStrictContentLength$2]) {
        throw new RequestContentLengthMismatchError$1();
      }
      process.emitWarning(new RequestContentLengthMismatchError$1());
    }
    socket.cork();
    if (bytesWritten === 0) {
      if (!expectsPayload && request2.reset !== false) {
        socket[kReset$1] = true;
      }
      if (contentLength === null) {
        socket.write(`${header}transfer-encoding: chunked\r
`, "latin1");
      } else {
        socket.write(`${header}content-length: ${contentLength}\r
\r
`, "latin1");
      }
    }
    if (contentLength === null) {
      socket.write(`\r
${len.toString(16)}\r
`, "latin1");
    }
    this.bytesWritten += len;
    const ret = socket.write(chunk);
    socket.uncork();
    request2.onBodySent(chunk);
    if (!ret) {
      if (socket[kParser].timeout && socket[kParser].timeoutType === TIMEOUT_HEADERS) {
        if (socket[kParser].timeout.refresh) {
          socket[kParser].timeout.refresh();
        }
      }
    }
    return ret;
  }
  end() {
    const { socket, contentLength, client: client2, bytesWritten, expectsPayload, header, request: request2 } = this;
    request2.onRequestSent();
    socket[kWriting] = false;
    if (socket[kError$2]) {
      throw socket[kError$2];
    }
    if (socket.destroyed) {
      return;
    }
    if (bytesWritten === 0) {
      if (expectsPayload) {
        socket.write(`${header}content-length: 0\r
\r
`, "latin1");
      } else {
        socket.write(`${header}\r
`, "latin1");
      }
    } else if (contentLength === null) {
      socket.write("\r\n0\r\n\r\n", "latin1");
    }
    if (contentLength !== null && bytesWritten !== contentLength) {
      if (client2[kStrictContentLength$2]) {
        throw new RequestContentLengthMismatchError$1();
      } else {
        process.emitWarning(new RequestContentLengthMismatchError$1());
      }
    }
    if (socket[kParser].timeout && socket[kParser].timeoutType === TIMEOUT_HEADERS) {
      if (socket[kParser].timeout.refresh) {
        socket[kParser].timeout.refresh();
      }
    }
    client2[kResume$3]();
  }
  destroy(err) {
    const { socket, client: client2, abort: abort2 } = this;
    socket[kWriting] = false;
    if (err) {
      assert$a(client2[kRunning$5] <= 1, "pipeline should only contain this request");
      abort2(err);
    }
  }
}
var clientH1 = connectH1$1;
const assert$9 = require$$0$1;
const { pipeline: pipeline$1 } = require$$0$2;
const util$h = util$m;
const {
  RequestContentLengthMismatchError: RequestContentLengthMismatchError2,
  RequestAbortedError: RequestAbortedError$6,
  SocketError: SocketError$2,
  InformationalError: InformationalError$2
} = errors$1;
const {
  kUrl: kUrl$3,
  kReset,
  kClient: kClient$1,
  kRunning: kRunning$4,
  kPending: kPending$3,
  kQueue: kQueue$2,
  kPendingIdx: kPendingIdx$1,
  kRunningIdx: kRunningIdx$1,
  kError: kError$1,
  kSocket,
  kStrictContentLength: kStrictContentLength$1,
  kOnError: kOnError$1,
  kMaxConcurrentStreams: kMaxConcurrentStreams$1,
  kHTTP2Session,
  kResume: kResume$2,
  kSize: kSize$4,
  kHTTPContext: kHTTPContext$1
} = symbols$4;
const kOpenStreams = Symbol("open streams");
let extractBody;
let h2ExperimentalWarned = false;
let http2;
try {
  http2 = require("node:http2");
} catch {
  http2 = { constants: {} };
}
const {
  constants: {
    HTTP2_HEADER_AUTHORITY,
    HTTP2_HEADER_METHOD,
    HTTP2_HEADER_PATH,
    HTTP2_HEADER_SCHEME,
    HTTP2_HEADER_CONTENT_LENGTH,
    HTTP2_HEADER_EXPECT,
    HTTP2_HEADER_STATUS
  }
} = http2;
function parseH2Headers(headers2) {
  const result = [];
  for (const [name, value] of Object.entries(headers2)) {
    if (Array.isArray(value)) {
      for (const subvalue of value) {
        result.push(Buffer.from(name), Buffer.from(subvalue));
      }
    } else {
      result.push(Buffer.from(name), Buffer.from(value));
    }
  }
  return result;
}
async function connectH2$1(client2, socket) {
  client2[kSocket] = socket;
  if (!h2ExperimentalWarned) {
    h2ExperimentalWarned = true;
    process.emitWarning("H2 support is experimental, expect them to change at any time.", {
      code: "UNDICI-H2"
    });
  }
  const session = http2.connect(client2[kUrl$3], {
    createConnection: () => socket,
    peerMaxConcurrentStreams: client2[kMaxConcurrentStreams$1]
  });
  session[kOpenStreams] = 0;
  session[kClient$1] = client2;
  session[kSocket] = socket;
  util$h.addListener(session, "error", onHttp2SessionError);
  util$h.addListener(session, "frameError", onHttp2FrameError);
  util$h.addListener(session, "end", onHttp2SessionEnd);
  util$h.addListener(session, "goaway", onHTTP2GoAway);
  util$h.addListener(session, "close", function() {
    const { [kClient$1]: client3 } = this;
    const { [kSocket]: socket2 } = client3;
    const err = this[kSocket][kError$1] || this[kError$1] || new SocketError$2("closed", util$h.getSocketInfo(socket2));
    client3[kHTTP2Session] = null;
    if (client3.destroyed) {
      assert$9(client3[kPending$3] === 0);
      const requests = client3[kQueue$2].splice(client3[kRunningIdx$1]);
      for (let i = 0; i < requests.length; i++) {
        const request2 = requests[i];
        util$h.errorRequest(client3, request2, err);
      }
    }
  });
  session.unref();
  client2[kHTTP2Session] = session;
  socket[kHTTP2Session] = session;
  util$h.addListener(socket, "error", function(err) {
    assert$9(err.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
    this[kError$1] = err;
    this[kClient$1][kOnError$1](err);
  });
  util$h.addListener(socket, "end", function() {
    util$h.destroy(this, new SocketError$2("other side closed", util$h.getSocketInfo(this)));
  });
  util$h.addListener(socket, "close", function() {
    const err = this[kError$1] || new SocketError$2("closed", util$h.getSocketInfo(this));
    client2[kSocket] = null;
    if (this[kHTTP2Session] != null) {
      this[kHTTP2Session].destroy(err);
    }
    client2[kPendingIdx$1] = client2[kRunningIdx$1];
    assert$9(client2[kRunning$4] === 0);
    client2.emit("disconnect", client2[kUrl$3], [client2], err);
    client2[kResume$2]();
  });
  let closed = false;
  socket.on("close", () => {
    closed = true;
  });
  return {
    version: "h2",
    defaultPipelining: Infinity,
    write(...args) {
      return writeH2(client2, ...args);
    },
    resume() {
      resumeH2(client2);
    },
    destroy(err, callback) {
      if (closed) {
        queueMicrotask(callback);
      } else {
        socket.destroy(err).on("close", callback);
      }
    },
    get destroyed() {
      return socket.destroyed;
    },
    busy() {
      return false;
    }
  };
}
function resumeH2(client2) {
  const socket = client2[kSocket];
  if ((socket == null ? void 0 : socket.destroyed) === false) {
    if (client2[kSize$4] === 0 && client2[kMaxConcurrentStreams$1] === 0) {
      socket.unref();
      client2[kHTTP2Session].unref();
    } else {
      socket.ref();
      client2[kHTTP2Session].ref();
    }
  }
}
function onHttp2SessionError(err) {
  assert$9(err.code !== "ERR_TLS_CERT_ALTNAME_INVALID");
  this[kSocket][kError$1] = err;
  this[kClient$1][kOnError$1](err);
}
function onHttp2FrameError(type, code, id) {
  if (id === 0) {
    const err = new InformationalError$2(`HTTP/2: "frameError" received - type ${type}, code ${code}`);
    this[kSocket][kError$1] = err;
    this[kClient$1][kOnError$1](err);
  }
}
function onHttp2SessionEnd() {
  const err = new SocketError$2("other side closed", util$h.getSocketInfo(this[kSocket]));
  this.destroy(err);
  util$h.destroy(this[kSocket], err);
}
function onHTTP2GoAway(code) {
  const err = this[kError$1] || new SocketError$2(`HTTP/2: "GOAWAY" frame received with code ${code}`, util$h.getSocketInfo(this));
  const client2 = this[kClient$1];
  client2[kSocket] = null;
  client2[kHTTPContext$1] = null;
  if (this[kHTTP2Session] != null) {
    this[kHTTP2Session].destroy(err);
    this[kHTTP2Session] = null;
  }
  util$h.destroy(this[kSocket], err);
  if (client2[kRunningIdx$1] < client2[kQueue$2].length) {
    const request2 = client2[kQueue$2][client2[kRunningIdx$1]];
    client2[kQueue$2][client2[kRunningIdx$1]++] = null;
    util$h.errorRequest(client2, request2, err);
    client2[kPendingIdx$1] = client2[kRunningIdx$1];
  }
  assert$9(client2[kRunning$4] === 0);
  client2.emit("disconnect", client2[kUrl$3], [client2], err);
  client2[kResume$2]();
}
function shouldSendContentLength(method) {
  return method !== "GET" && method !== "HEAD" && method !== "OPTIONS" && method !== "TRACE" && method !== "CONNECT";
}
function writeH2(client2, request2) {
  const session = client2[kHTTP2Session];
  const { method, path: path2, host, upgrade: upgrade2, expectContinue, signal, headers: reqHeaders } = request2;
  let { body: body2 } = request2;
  if (upgrade2) {
    util$h.errorRequest(client2, request2, new Error("Upgrade not supported for H2"));
    return false;
  }
  const headers2 = {};
  for (let n = 0; n < reqHeaders.length; n += 2) {
    const key2 = reqHeaders[n + 0];
    const val = reqHeaders[n + 1];
    if (Array.isArray(val)) {
      for (let i = 0; i < val.length; i++) {
        if (headers2[key2]) {
          headers2[key2] += `,${val[i]}`;
        } else {
          headers2[key2] = val[i];
        }
      }
    } else {
      headers2[key2] = val;
    }
  }
  let stream2;
  const { hostname, port: port2 } = client2[kUrl$3];
  headers2[HTTP2_HEADER_AUTHORITY] = host || `${hostname}${port2 ? `:${port2}` : ""}`;
  headers2[HTTP2_HEADER_METHOD] = method;
  const abort2 = (err) => {
    if (request2.aborted || request2.completed) {
      return;
    }
    err = err || new RequestAbortedError$6();
    util$h.errorRequest(client2, request2, err);
    if (stream2 != null) {
      util$h.destroy(stream2, err);
    }
    util$h.destroy(body2, err);
    client2[kQueue$2][client2[kRunningIdx$1]++] = null;
    client2[kResume$2]();
  };
  try {
    request2.onConnect(abort2);
  } catch (err) {
    util$h.errorRequest(client2, request2, err);
  }
  if (request2.aborted) {
    return false;
  }
  if (method === "CONNECT") {
    session.ref();
    stream2 = session.request(headers2, { endStream: false, signal });
    if (stream2.id && !stream2.pending) {
      request2.onUpgrade(null, null, stream2);
      ++session[kOpenStreams];
      client2[kQueue$2][client2[kRunningIdx$1]++] = null;
    } else {
      stream2.once("ready", () => {
        request2.onUpgrade(null, null, stream2);
        ++session[kOpenStreams];
        client2[kQueue$2][client2[kRunningIdx$1]++] = null;
      });
    }
    stream2.once("close", () => {
      session[kOpenStreams] -= 1;
      if (session[kOpenStreams] === 0) session.unref();
    });
    return true;
  }
  headers2[HTTP2_HEADER_PATH] = path2;
  headers2[HTTP2_HEADER_SCHEME] = "https";
  const expectsPayload = method === "PUT" || method === "POST" || method === "PATCH";
  if (body2 && typeof body2.read === "function") {
    body2.read(0);
  }
  let contentLength = util$h.bodyLength(body2);
  if (util$h.isFormDataLike(body2)) {
    extractBody ?? (extractBody = requireBody().extractBody);
    const [bodyStream, contentType] = extractBody(body2);
    headers2["content-type"] = contentType;
    body2 = bodyStream.stream;
    contentLength = bodyStream.length;
  }
  if (contentLength == null) {
    contentLength = request2.contentLength;
  }
  if (contentLength === 0 || !expectsPayload) {
    contentLength = null;
  }
  if (shouldSendContentLength(method) && contentLength > 0 && request2.contentLength != null && request2.contentLength !== contentLength) {
    if (client2[kStrictContentLength$1]) {
      util$h.errorRequest(client2, request2, new RequestContentLengthMismatchError2());
      return false;
    }
    process.emitWarning(new RequestContentLengthMismatchError2());
  }
  if (contentLength != null) {
    assert$9(body2, "no body must not have content length");
    headers2[HTTP2_HEADER_CONTENT_LENGTH] = `${contentLength}`;
  }
  session.ref();
  const shouldEndStream = method === "GET" || method === "HEAD" || body2 === null;
  if (expectContinue) {
    headers2[HTTP2_HEADER_EXPECT] = "100-continue";
    stream2 = session.request(headers2, { endStream: shouldEndStream, signal });
    stream2.once("continue", writeBodyH2);
  } else {
    stream2 = session.request(headers2, {
      endStream: shouldEndStream,
      signal
    });
    writeBodyH2();
  }
  ++session[kOpenStreams];
  stream2.once("response", (headers3) => {
    const { [HTTP2_HEADER_STATUS]: statusCode, ...realHeaders } = headers3;
    request2.onResponseStarted();
    if (request2.aborted) {
      const err = new RequestAbortedError$6();
      util$h.errorRequest(client2, request2, err);
      util$h.destroy(stream2, err);
      return;
    }
    if (request2.onHeaders(Number(statusCode), parseH2Headers(realHeaders), stream2.resume.bind(stream2), "") === false) {
      stream2.pause();
    }
    stream2.on("data", (chunk) => {
      if (request2.onData(chunk) === false) {
        stream2.pause();
      }
    });
  });
  stream2.once("end", () => {
    var _a2;
    if (((_a2 = stream2.state) == null ? void 0 : _a2.state) == null || stream2.state.state < 6) {
      request2.onComplete([]);
    }
    if (session[kOpenStreams] === 0) {
      session.unref();
    }
    abort2(new InformationalError$2("HTTP/2: stream half-closed (remote)"));
    client2[kQueue$2][client2[kRunningIdx$1]++] = null;
    client2[kPendingIdx$1] = client2[kRunningIdx$1];
    client2[kResume$2]();
  });
  stream2.once("close", () => {
    session[kOpenStreams] -= 1;
    if (session[kOpenStreams] === 0) {
      session.unref();
    }
  });
  stream2.once("error", function(err) {
    abort2(err);
  });
  stream2.once("frameError", (type, code) => {
    abort2(new InformationalError$2(`HTTP/2: "frameError" received - type ${type}, code ${code}`));
  });
  return true;
  function writeBodyH2() {
    if (!body2 || contentLength === 0) {
      writeBuffer(
        abort2,
        stream2,
        null,
        client2,
        request2,
        client2[kSocket],
        contentLength,
        expectsPayload
      );
    } else if (util$h.isBuffer(body2)) {
      writeBuffer(
        abort2,
        stream2,
        body2,
        client2,
        request2,
        client2[kSocket],
        contentLength,
        expectsPayload
      );
    } else if (util$h.isBlobLike(body2)) {
      if (typeof body2.stream === "function") {
        writeIterable(
          abort2,
          stream2,
          body2.stream(),
          client2,
          request2,
          client2[kSocket],
          contentLength,
          expectsPayload
        );
      } else {
        writeBlob(
          abort2,
          stream2,
          body2,
          client2,
          request2,
          client2[kSocket],
          contentLength,
          expectsPayload
        );
      }
    } else if (util$h.isStream(body2)) {
      writeStream(
        abort2,
        client2[kSocket],
        expectsPayload,
        stream2,
        body2,
        client2,
        request2,
        contentLength
      );
    } else if (util$h.isIterable(body2)) {
      writeIterable(
        abort2,
        stream2,
        body2,
        client2,
        request2,
        client2[kSocket],
        contentLength,
        expectsPayload
      );
    } else {
      assert$9(false);
    }
  }
}
function writeBuffer(abort2, h2stream, body2, client2, request2, socket, contentLength, expectsPayload) {
  try {
    if (body2 != null && util$h.isBuffer(body2)) {
      assert$9(contentLength === body2.byteLength, "buffer body must have content length");
      h2stream.cork();
      h2stream.write(body2);
      h2stream.uncork();
      h2stream.end();
      request2.onBodySent(body2);
    }
    if (!expectsPayload) {
      socket[kReset] = true;
    }
    request2.onRequestSent();
    client2[kResume$2]();
  } catch (error) {
    abort2(error);
  }
}
function writeStream(abort2, socket, expectsPayload, h2stream, body2, client2, request2, contentLength) {
  assert$9(contentLength !== 0 || client2[kRunning$4] === 0, "stream body cannot be pipelined");
  const pipe = pipeline$1(
    body2,
    h2stream,
    (err) => {
      if (err) {
        util$h.destroy(pipe, err);
        abort2(err);
      } else {
        util$h.removeAllListeners(pipe);
        request2.onRequestSent();
        if (!expectsPayload) {
          socket[kReset] = true;
        }
        client2[kResume$2]();
      }
    }
  );
  util$h.addListener(pipe, "data", onPipeData);
  function onPipeData(chunk) {
    request2.onBodySent(chunk);
  }
}
async function writeBlob(abort2, h2stream, body2, client2, request2, socket, contentLength, expectsPayload) {
  assert$9(contentLength === body2.size, "blob body must have content length");
  try {
    if (contentLength != null && contentLength !== body2.size) {
      throw new RequestContentLengthMismatchError2();
    }
    const buffer2 = Buffer.from(await body2.arrayBuffer());
    h2stream.cork();
    h2stream.write(buffer2);
    h2stream.uncork();
    h2stream.end();
    request2.onBodySent(buffer2);
    request2.onRequestSent();
    if (!expectsPayload) {
      socket[kReset] = true;
    }
    client2[kResume$2]();
  } catch (err) {
    abort2(err);
  }
}
async function writeIterable(abort2, h2stream, body2, client2, request2, socket, contentLength, expectsPayload) {
  assert$9(contentLength !== 0 || client2[kRunning$4] === 0, "iterator body cannot be pipelined");
  let callback = null;
  function onDrain() {
    if (callback) {
      const cb = callback;
      callback = null;
      cb();
    }
  }
  const waitForDrain = () => new Promise((resolve, reject) => {
    assert$9(callback === null);
    if (socket[kError$1]) {
      reject(socket[kError$1]);
    } else {
      callback = resolve;
    }
  });
  h2stream.on("close", onDrain).on("drain", onDrain);
  try {
    for await (const chunk of body2) {
      if (socket[kError$1]) {
        throw socket[kError$1];
      }
      const res = h2stream.write(chunk);
      request2.onBodySent(chunk);
      if (!res) {
        await waitForDrain();
      }
    }
    h2stream.end();
    request2.onRequestSent();
    if (!expectsPayload) {
      socket[kReset] = true;
    }
    client2[kResume$2]();
  } catch (err) {
    abort2(err);
  } finally {
    h2stream.off("close", onDrain).off("drain", onDrain);
  }
}
var clientH2 = connectH2$1;
const util$g = util$m;
const { kBodyUsed } = symbols$4;
const assert$8 = require$$0$1;
const { InvalidArgumentError: InvalidArgumentError$j } = errors$1;
const EE = require$$8;
const redirectableStatusCodes = [300, 301, 302, 303, 307, 308];
const kBody$1 = Symbol("body");
class BodyAsyncIterable2 {
  constructor(body2) {
    this[kBody$1] = body2;
    this[kBodyUsed] = false;
  }
  async *[Symbol.asyncIterator]() {
    assert$8(!this[kBodyUsed], "disturbed");
    this[kBodyUsed] = true;
    yield* this[kBody$1];
  }
}
let RedirectHandler$1 = class RedirectHandler {
  constructor(dispatch, maxRedirections, opts, handler) {
    if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
      throw new InvalidArgumentError$j("maxRedirections must be a positive number");
    }
    util$g.validateHandler(handler, opts.method, opts.upgrade);
    this.dispatch = dispatch;
    this.location = null;
    this.abort = null;
    this.opts = { ...opts, maxRedirections: 0 };
    this.maxRedirections = maxRedirections;
    this.handler = handler;
    this.history = [];
    this.redirectionLimitReached = false;
    if (util$g.isStream(this.opts.body)) {
      if (util$g.bodyLength(this.opts.body) === 0) {
        this.opts.body.on("data", function() {
          assert$8(false);
        });
      }
      if (typeof this.opts.body.readableDidRead !== "boolean") {
        this.opts.body[kBodyUsed] = false;
        EE.prototype.on.call(this.opts.body, "data", function() {
          this[kBodyUsed] = true;
        });
      }
    } else if (this.opts.body && typeof this.opts.body.pipeTo === "function") {
      this.opts.body = new BodyAsyncIterable2(this.opts.body);
    } else if (this.opts.body && typeof this.opts.body !== "string" && !ArrayBuffer.isView(this.opts.body) && util$g.isIterable(this.opts.body)) {
      this.opts.body = new BodyAsyncIterable2(this.opts.body);
    }
  }
  onConnect(abort2) {
    this.abort = abort2;
    this.handler.onConnect(abort2, { history: this.history });
  }
  onUpgrade(statusCode, headers2, socket) {
    this.handler.onUpgrade(statusCode, headers2, socket);
  }
  onError(error) {
    this.handler.onError(error);
  }
  onHeaders(statusCode, headers2, resume2, statusText) {
    this.location = this.history.length >= this.maxRedirections || util$g.isDisturbed(this.opts.body) ? null : parseLocation(statusCode, headers2);
    if (this.opts.throwOnMaxRedirect && this.history.length >= this.maxRedirections) {
      if (this.request) {
        this.request.abort(new Error("max redirects"));
      }
      this.redirectionLimitReached = true;
      this.abort(new Error("max redirects"));
      return;
    }
    if (this.opts.origin) {
      this.history.push(new URL(this.opts.path, this.opts.origin));
    }
    if (!this.location) {
      return this.handler.onHeaders(statusCode, headers2, resume2, statusText);
    }
    const { origin, pathname, search } = util$g.parseURL(new URL(this.location, this.opts.origin && new URL(this.opts.path, this.opts.origin)));
    const path2 = search ? `${pathname}${search}` : pathname;
    this.opts.headers = cleanRequestHeaders(this.opts.headers, statusCode === 303, this.opts.origin !== origin);
    this.opts.path = path2;
    this.opts.origin = origin;
    this.opts.maxRedirections = 0;
    this.opts.query = null;
    if (statusCode === 303 && this.opts.method !== "HEAD") {
      this.opts.method = "GET";
      this.opts.body = null;
    }
  }
  onData(chunk) {
    if (this.location) ;
    else {
      return this.handler.onData(chunk);
    }
  }
  onComplete(trailers) {
    if (this.location) {
      this.location = null;
      this.abort = null;
      this.dispatch(this.opts, this);
    } else {
      this.handler.onComplete(trailers);
    }
  }
  onBodySent(chunk) {
    if (this.handler.onBodySent) {
      this.handler.onBodySent(chunk);
    }
  }
};
function parseLocation(statusCode, headers2) {
  if (redirectableStatusCodes.indexOf(statusCode) === -1) {
    return null;
  }
  for (let i = 0; i < headers2.length; i += 2) {
    if (headers2[i].length === 8 && util$g.headerNameToString(headers2[i]) === "location") {
      return headers2[i + 1];
    }
  }
}
function shouldRemoveHeader(header, removeContent, unknownOrigin) {
  if (header.length === 4) {
    return util$g.headerNameToString(header) === "host";
  }
  if (removeContent && util$g.headerNameToString(header).startsWith("content-")) {
    return true;
  }
  if (unknownOrigin && (header.length === 13 || header.length === 6 || header.length === 19)) {
    const name = util$g.headerNameToString(header);
    return name === "authorization" || name === "cookie" || name === "proxy-authorization";
  }
  return false;
}
function cleanRequestHeaders(headers2, removeContent, unknownOrigin) {
  const ret = [];
  if (Array.isArray(headers2)) {
    for (let i = 0; i < headers2.length; i += 2) {
      if (!shouldRemoveHeader(headers2[i], removeContent, unknownOrigin)) {
        ret.push(headers2[i], headers2[i + 1]);
      }
    }
  } else if (headers2 && typeof headers2 === "object") {
    for (const key2 of Object.keys(headers2)) {
      if (!shouldRemoveHeader(key2, removeContent, unknownOrigin)) {
        ret.push(key2, headers2[key2]);
      }
    }
  } else {
    assert$8(headers2 == null, "headers must be an object or an array");
  }
  return ret;
}
var redirectHandler = RedirectHandler$1;
const RedirectHandler2 = redirectHandler;
function createRedirectInterceptor$2({ maxRedirections: defaultMaxRedirections }) {
  return (dispatch) => {
    return function Intercept(opts, handler) {
      const { maxRedirections = defaultMaxRedirections } = opts;
      if (!maxRedirections) {
        return dispatch(opts, handler);
      }
      const redirectHandler2 = new RedirectHandler2(dispatch, maxRedirections, opts, handler);
      opts = { ...opts, maxRedirections: 0 };
      return dispatch(opts, redirectHandler2);
    };
  };
}
var redirectInterceptor = createRedirectInterceptor$2;
const assert$7 = require$$0$1;
const net = require$$0$3;
const http = require$$2;
const util$f = util$m;
const { channels } = diagnostics;
const Request2 = request$3;
const DispatcherBase$2 = dispatcherBase;
const {
  InvalidArgumentError: InvalidArgumentError$i,
  InformationalError: InformationalError$1,
  ClientDestroyedError: ClientDestroyedError2
} = errors$1;
const buildConnector$1 = connect$2;
const {
  kUrl: kUrl$2,
  kServerName,
  kClient,
  kBusy: kBusy$1,
  kConnect,
  kResuming,
  kRunning: kRunning$3,
  kPending: kPending$2,
  kSize: kSize$3,
  kQueue: kQueue$1,
  kConnected: kConnected$2,
  kConnecting,
  kNeedDrain: kNeedDrain$2,
  kKeepAliveDefaultTimeout,
  kHostHeader,
  kPendingIdx,
  kRunningIdx,
  kError,
  kPipelining,
  kKeepAliveTimeoutValue,
  kMaxHeadersSize,
  kKeepAliveMaxTimeout,
  kKeepAliveTimeoutThreshold,
  kHeadersTimeout,
  kBodyTimeout,
  kStrictContentLength,
  kConnector,
  kMaxRedirections: kMaxRedirections$1,
  kMaxRequests,
  kCounter,
  kClose: kClose$2,
  kDestroy: kDestroy$2,
  kDispatch: kDispatch$2,
  kInterceptors: kInterceptors$2,
  kLocalAddress,
  kMaxResponseSize,
  kOnError,
  kHTTPContext,
  kMaxConcurrentStreams,
  kResume: kResume$1
} = symbols$4;
const connectH1 = clientH1;
const connectH2 = clientH2;
let deprecatedInterceptorWarned = false;
const kClosedResolve$1 = Symbol("kClosedResolve");
const noop$1 = () => {
};
function getPipelining(client2) {
  var _a2;
  return client2[kPipelining] ?? ((_a2 = client2[kHTTPContext]) == null ? void 0 : _a2.defaultPipelining) ?? 1;
}
let Client$2 = class Client extends DispatcherBase$2 {
  /**
   *
   * @param {string|URL} url
   * @param {import('../../types/client.js').Client.Options} options
   */
  constructor(url, {
    interceptors,
    maxHeaderSize,
    headersTimeout,
    socketTimeout,
    requestTimeout,
    connectTimeout,
    bodyTimeout,
    idleTimeout,
    keepAlive,
    keepAliveTimeout,
    maxKeepAliveTimeout,
    keepAliveMaxTimeout,
    keepAliveTimeoutThreshold,
    socketPath,
    pipelining,
    tls: tls2,
    strictContentLength,
    maxCachedSessions,
    maxRedirections,
    connect: connect2,
    maxRequestsPerClient,
    localAddress,
    maxResponseSize,
    autoSelectFamily,
    autoSelectFamilyAttemptTimeout,
    // h2
    maxConcurrentStreams,
    allowH2
  } = {}) {
    super();
    if (keepAlive !== void 0) {
      throw new InvalidArgumentError$i("unsupported keepAlive, use pipelining=0 instead");
    }
    if (socketTimeout !== void 0) {
      throw new InvalidArgumentError$i("unsupported socketTimeout, use headersTimeout & bodyTimeout instead");
    }
    if (requestTimeout !== void 0) {
      throw new InvalidArgumentError$i("unsupported requestTimeout, use headersTimeout & bodyTimeout instead");
    }
    if (idleTimeout !== void 0) {
      throw new InvalidArgumentError$i("unsupported idleTimeout, use keepAliveTimeout instead");
    }
    if (maxKeepAliveTimeout !== void 0) {
      throw new InvalidArgumentError$i("unsupported maxKeepAliveTimeout, use keepAliveMaxTimeout instead");
    }
    if (maxHeaderSize != null && !Number.isFinite(maxHeaderSize)) {
      throw new InvalidArgumentError$i("invalid maxHeaderSize");
    }
    if (socketPath != null && typeof socketPath !== "string") {
      throw new InvalidArgumentError$i("invalid socketPath");
    }
    if (connectTimeout != null && (!Number.isFinite(connectTimeout) || connectTimeout < 0)) {
      throw new InvalidArgumentError$i("invalid connectTimeout");
    }
    if (keepAliveTimeout != null && (!Number.isFinite(keepAliveTimeout) || keepAliveTimeout <= 0)) {
      throw new InvalidArgumentError$i("invalid keepAliveTimeout");
    }
    if (keepAliveMaxTimeout != null && (!Number.isFinite(keepAliveMaxTimeout) || keepAliveMaxTimeout <= 0)) {
      throw new InvalidArgumentError$i("invalid keepAliveMaxTimeout");
    }
    if (keepAliveTimeoutThreshold != null && !Number.isFinite(keepAliveTimeoutThreshold)) {
      throw new InvalidArgumentError$i("invalid keepAliveTimeoutThreshold");
    }
    if (headersTimeout != null && (!Number.isInteger(headersTimeout) || headersTimeout < 0)) {
      throw new InvalidArgumentError$i("headersTimeout must be a positive integer or zero");
    }
    if (bodyTimeout != null && (!Number.isInteger(bodyTimeout) || bodyTimeout < 0)) {
      throw new InvalidArgumentError$i("bodyTimeout must be a positive integer or zero");
    }
    if (connect2 != null && typeof connect2 !== "function" && typeof connect2 !== "object") {
      throw new InvalidArgumentError$i("connect must be a function or an object");
    }
    if (maxRedirections != null && (!Number.isInteger(maxRedirections) || maxRedirections < 0)) {
      throw new InvalidArgumentError$i("maxRedirections must be a positive number");
    }
    if (maxRequestsPerClient != null && (!Number.isInteger(maxRequestsPerClient) || maxRequestsPerClient < 0)) {
      throw new InvalidArgumentError$i("maxRequestsPerClient must be a positive number");
    }
    if (localAddress != null && (typeof localAddress !== "string" || net.isIP(localAddress) === 0)) {
      throw new InvalidArgumentError$i("localAddress must be valid string IP address");
    }
    if (maxResponseSize != null && (!Number.isInteger(maxResponseSize) || maxResponseSize < -1)) {
      throw new InvalidArgumentError$i("maxResponseSize must be a positive number");
    }
    if (autoSelectFamilyAttemptTimeout != null && (!Number.isInteger(autoSelectFamilyAttemptTimeout) || autoSelectFamilyAttemptTimeout < -1)) {
      throw new InvalidArgumentError$i("autoSelectFamilyAttemptTimeout must be a positive number");
    }
    if (allowH2 != null && typeof allowH2 !== "boolean") {
      throw new InvalidArgumentError$i("allowH2 must be a valid boolean value");
    }
    if (maxConcurrentStreams != null && (typeof maxConcurrentStreams !== "number" || maxConcurrentStreams < 1)) {
      throw new InvalidArgumentError$i("maxConcurrentStreams must be a positive integer, greater than 0");
    }
    if (typeof connect2 !== "function") {
      connect2 = buildConnector$1({
        ...tls2,
        maxCachedSessions,
        allowH2,
        socketPath,
        timeout: connectTimeout,
        ...autoSelectFamily ? { autoSelectFamily, autoSelectFamilyAttemptTimeout } : void 0,
        ...connect2
      });
    }
    if ((interceptors == null ? void 0 : interceptors.Client) && Array.isArray(interceptors.Client)) {
      this[kInterceptors$2] = interceptors.Client;
      if (!deprecatedInterceptorWarned) {
        deprecatedInterceptorWarned = true;
        process.emitWarning("Client.Options#interceptor is deprecated. Use Dispatcher#compose instead.", {
          code: "UNDICI-CLIENT-INTERCEPTOR-DEPRECATED"
        });
      }
    } else {
      this[kInterceptors$2] = [createRedirectInterceptor$1({ maxRedirections })];
    }
    this[kUrl$2] = util$f.parseOrigin(url);
    this[kConnector] = connect2;
    this[kPipelining] = pipelining != null ? pipelining : 1;
    this[kMaxHeadersSize] = maxHeaderSize || http.maxHeaderSize;
    this[kKeepAliveDefaultTimeout] = keepAliveTimeout == null ? 4e3 : keepAliveTimeout;
    this[kKeepAliveMaxTimeout] = keepAliveMaxTimeout == null ? 6e5 : keepAliveMaxTimeout;
    this[kKeepAliveTimeoutThreshold] = keepAliveTimeoutThreshold == null ? 2e3 : keepAliveTimeoutThreshold;
    this[kKeepAliveTimeoutValue] = this[kKeepAliveDefaultTimeout];
    this[kServerName] = null;
    this[kLocalAddress] = localAddress != null ? localAddress : null;
    this[kResuming] = 0;
    this[kNeedDrain$2] = 0;
    this[kHostHeader] = `host: ${this[kUrl$2].hostname}${this[kUrl$2].port ? `:${this[kUrl$2].port}` : ""}\r
`;
    this[kBodyTimeout] = bodyTimeout != null ? bodyTimeout : 3e5;
    this[kHeadersTimeout] = headersTimeout != null ? headersTimeout : 3e5;
    this[kStrictContentLength] = strictContentLength == null ? true : strictContentLength;
    this[kMaxRedirections$1] = maxRedirections;
    this[kMaxRequests] = maxRequestsPerClient;
    this[kClosedResolve$1] = null;
    this[kMaxResponseSize] = maxResponseSize > -1 ? maxResponseSize : -1;
    this[kMaxConcurrentStreams] = maxConcurrentStreams != null ? maxConcurrentStreams : 100;
    this[kHTTPContext] = null;
    this[kQueue$1] = [];
    this[kRunningIdx] = 0;
    this[kPendingIdx] = 0;
    this[kResume$1] = (sync) => resume(this, sync);
    this[kOnError] = (err) => onError(this, err);
  }
  get pipelining() {
    return this[kPipelining];
  }
  set pipelining(value) {
    this[kPipelining] = value;
    this[kResume$1](true);
  }
  get [kPending$2]() {
    return this[kQueue$1].length - this[kPendingIdx];
  }
  get [kRunning$3]() {
    return this[kPendingIdx] - this[kRunningIdx];
  }
  get [kSize$3]() {
    return this[kQueue$1].length - this[kRunningIdx];
  }
  get [kConnected$2]() {
    return !!this[kHTTPContext] && !this[kConnecting] && !this[kHTTPContext].destroyed;
  }
  get [kBusy$1]() {
    var _a2;
    return Boolean(
      ((_a2 = this[kHTTPContext]) == null ? void 0 : _a2.busy(null)) || this[kSize$3] >= (getPipelining(this) || 1) || this[kPending$2] > 0
    );
  }
  /* istanbul ignore: only used for test */
  [kConnect](cb) {
    connect$1(this);
    this.once("connect", cb);
  }
  [kDispatch$2](opts, handler) {
    const origin = opts.origin || this[kUrl$2].origin;
    const request2 = new Request2(origin, opts, handler);
    this[kQueue$1].push(request2);
    if (this[kResuming]) ;
    else if (util$f.bodyLength(request2.body) == null && util$f.isIterable(request2.body)) {
      this[kResuming] = 1;
      queueMicrotask(() => resume(this));
    } else {
      this[kResume$1](true);
    }
    if (this[kResuming] && this[kNeedDrain$2] !== 2 && this[kBusy$1]) {
      this[kNeedDrain$2] = 2;
    }
    return this[kNeedDrain$2] < 2;
  }
  async [kClose$2]() {
    return new Promise((resolve) => {
      if (this[kSize$3]) {
        this[kClosedResolve$1] = resolve;
      } else {
        resolve(null);
      }
    });
  }
  async [kDestroy$2](err) {
    return new Promise((resolve) => {
      const requests = this[kQueue$1].splice(this[kPendingIdx]);
      for (let i = 0; i < requests.length; i++) {
        const request2 = requests[i];
        util$f.errorRequest(this, request2, err);
      }
      const callback = () => {
        if (this[kClosedResolve$1]) {
          this[kClosedResolve$1]();
          this[kClosedResolve$1] = null;
        }
        resolve(null);
      };
      if (this[kHTTPContext]) {
        this[kHTTPContext].destroy(err, callback);
        this[kHTTPContext] = null;
      } else {
        queueMicrotask(callback);
      }
      this[kResume$1]();
    });
  }
};
const createRedirectInterceptor$1 = redirectInterceptor;
function onError(client2, err) {
  if (client2[kRunning$3] === 0 && err.code !== "UND_ERR_INFO" && err.code !== "UND_ERR_SOCKET") {
    assert$7(client2[kPendingIdx] === client2[kRunningIdx]);
    const requests = client2[kQueue$1].splice(client2[kRunningIdx]);
    for (let i = 0; i < requests.length; i++) {
      const request2 = requests[i];
      util$f.errorRequest(client2, request2, err);
    }
    assert$7(client2[kSize$3] === 0);
  }
}
async function connect$1(client2) {
  var _a2, _b2, _c2;
  assert$7(!client2[kConnecting]);
  assert$7(!client2[kHTTPContext]);
  let { host, hostname, protocol, port: port2 } = client2[kUrl$2];
  if (hostname[0] === "[") {
    const idx = hostname.indexOf("]");
    assert$7(idx !== -1);
    const ip = hostname.substring(1, idx);
    assert$7(net.isIP(ip));
    hostname = ip;
  }
  client2[kConnecting] = true;
  if (channels.beforeConnect.hasSubscribers) {
    channels.beforeConnect.publish({
      connectParams: {
        host,
        hostname,
        protocol,
        port: port2,
        version: (_a2 = client2[kHTTPContext]) == null ? void 0 : _a2.version,
        servername: client2[kServerName],
        localAddress: client2[kLocalAddress]
      },
      connector: client2[kConnector]
    });
  }
  try {
    const socket = await new Promise((resolve, reject) => {
      client2[kConnector]({
        host,
        hostname,
        protocol,
        port: port2,
        servername: client2[kServerName],
        localAddress: client2[kLocalAddress]
      }, (err, socket2) => {
        if (err) {
          reject(err);
        } else {
          resolve(socket2);
        }
      });
    });
    if (client2.destroyed) {
      util$f.destroy(socket.on("error", noop$1), new ClientDestroyedError2());
      return;
    }
    assert$7(socket);
    try {
      client2[kHTTPContext] = socket.alpnProtocol === "h2" ? await connectH2(client2, socket) : await connectH1(client2, socket);
    } catch (err) {
      socket.destroy().on("error", noop$1);
      throw err;
    }
    client2[kConnecting] = false;
    socket[kCounter] = 0;
    socket[kMaxRequests] = client2[kMaxRequests];
    socket[kClient] = client2;
    socket[kError] = null;
    if (channels.connected.hasSubscribers) {
      channels.connected.publish({
        connectParams: {
          host,
          hostname,
          protocol,
          port: port2,
          version: (_b2 = client2[kHTTPContext]) == null ? void 0 : _b2.version,
          servername: client2[kServerName],
          localAddress: client2[kLocalAddress]
        },
        connector: client2[kConnector],
        socket
      });
    }
    client2.emit("connect", client2[kUrl$2], [client2]);
  } catch (err) {
    if (client2.destroyed) {
      return;
    }
    client2[kConnecting] = false;
    if (channels.connectError.hasSubscribers) {
      channels.connectError.publish({
        connectParams: {
          host,
          hostname,
          protocol,
          port: port2,
          version: (_c2 = client2[kHTTPContext]) == null ? void 0 : _c2.version,
          servername: client2[kServerName],
          localAddress: client2[kLocalAddress]
        },
        connector: client2[kConnector],
        error: err
      });
    }
    if (err.code === "ERR_TLS_CERT_ALTNAME_INVALID") {
      assert$7(client2[kRunning$3] === 0);
      while (client2[kPending$2] > 0 && client2[kQueue$1][client2[kPendingIdx]].servername === client2[kServerName]) {
        const request2 = client2[kQueue$1][client2[kPendingIdx]++];
        util$f.errorRequest(client2, request2, err);
      }
    } else {
      onError(client2, err);
    }
    client2.emit("connectionError", client2[kUrl$2], [client2], err);
  }
  client2[kResume$1]();
}
function emitDrain(client2) {
  client2[kNeedDrain$2] = 0;
  client2.emit("drain", client2[kUrl$2], [client2]);
}
function resume(client2, sync) {
  if (client2[kResuming] === 2) {
    return;
  }
  client2[kResuming] = 2;
  _resume(client2, sync);
  client2[kResuming] = 0;
  if (client2[kRunningIdx] > 256) {
    client2[kQueue$1].splice(0, client2[kRunningIdx]);
    client2[kPendingIdx] -= client2[kRunningIdx];
    client2[kRunningIdx] = 0;
  }
}
function _resume(client2, sync) {
  var _a2;
  while (true) {
    if (client2.destroyed) {
      assert$7(client2[kPending$2] === 0);
      return;
    }
    if (client2[kClosedResolve$1] && !client2[kSize$3]) {
      client2[kClosedResolve$1]();
      client2[kClosedResolve$1] = null;
      return;
    }
    if (client2[kHTTPContext]) {
      client2[kHTTPContext].resume();
    }
    if (client2[kBusy$1]) {
      client2[kNeedDrain$2] = 2;
    } else if (client2[kNeedDrain$2] === 2) {
      if (sync) {
        client2[kNeedDrain$2] = 1;
        queueMicrotask(() => emitDrain(client2));
      } else {
        emitDrain(client2);
      }
      continue;
    }
    if (client2[kPending$2] === 0) {
      return;
    }
    if (client2[kRunning$3] >= (getPipelining(client2) || 1)) {
      return;
    }
    const request2 = client2[kQueue$1][client2[kPendingIdx]];
    if (client2[kUrl$2].protocol === "https:" && client2[kServerName] !== request2.servername) {
      if (client2[kRunning$3] > 0) {
        return;
      }
      client2[kServerName] = request2.servername;
      (_a2 = client2[kHTTPContext]) == null ? void 0 : _a2.destroy(new InformationalError$1("servername changed"), () => {
        client2[kHTTPContext] = null;
        resume(client2);
      });
    }
    if (client2[kConnecting]) {
      return;
    }
    if (!client2[kHTTPContext]) {
      connect$1(client2);
      return;
    }
    if (client2[kHTTPContext].destroyed) {
      return;
    }
    if (client2[kHTTPContext].busy(request2)) {
      return;
    }
    if (!request2.aborted && client2[kHTTPContext].write(request2)) {
      client2[kPendingIdx]++;
    } else {
      client2[kQueue$1].splice(client2[kPendingIdx], 1);
    }
  }
}
var client = Client$2;
const kSize$2 = 2048;
const kMask = kSize$2 - 1;
class FixedCircularBuffer {
  constructor() {
    this.bottom = 0;
    this.top = 0;
    this.list = new Array(kSize$2);
    this.next = null;
  }
  isEmpty() {
    return this.top === this.bottom;
  }
  isFull() {
    return (this.top + 1 & kMask) === this.bottom;
  }
  push(data) {
    this.list[this.top] = data;
    this.top = this.top + 1 & kMask;
  }
  shift() {
    const nextItem = this.list[this.bottom];
    if (nextItem === void 0)
      return null;
    this.list[this.bottom] = void 0;
    this.bottom = this.bottom + 1 & kMask;
    return nextItem;
  }
}
var fixedQueue = class FixedQueue {
  constructor() {
    this.head = this.tail = new FixedCircularBuffer();
  }
  isEmpty() {
    return this.head.isEmpty();
  }
  push(data) {
    if (this.head.isFull()) {
      this.head = this.head.next = new FixedCircularBuffer();
    }
    this.head.push(data);
  }
  shift() {
    const tail = this.tail;
    const next = tail.shift();
    if (tail.isEmpty() && tail.next !== null) {
      this.tail = tail.next;
    }
    return next;
  }
};
const { kFree: kFree$1, kConnected: kConnected$1, kPending: kPending$1, kQueued: kQueued$1, kRunning: kRunning$2, kSize: kSize$1 } = symbols$4;
const kPool = Symbol("pool");
let PoolStats$1 = class PoolStats {
  constructor(pool2) {
    this[kPool] = pool2;
  }
  get connected() {
    return this[kPool][kConnected$1];
  }
  get free() {
    return this[kPool][kFree$1];
  }
  get pending() {
    return this[kPool][kPending$1];
  }
  get queued() {
    return this[kPool][kQueued$1];
  }
  get running() {
    return this[kPool][kRunning$2];
  }
  get size() {
    return this[kPool][kSize$1];
  }
};
var poolStats = PoolStats$1;
const DispatcherBase$1 = dispatcherBase;
const FixedQueue2 = fixedQueue;
const { kConnected, kSize, kRunning: kRunning$1, kPending, kQueued, kBusy, kFree, kUrl: kUrl$1, kClose: kClose$1, kDestroy: kDestroy$1, kDispatch: kDispatch$1 } = symbols$4;
const PoolStats2 = poolStats;
const kClients$2 = Symbol("clients");
const kNeedDrain$1 = Symbol("needDrain");
const kQueue = Symbol("queue");
const kClosedResolve = Symbol("closed resolve");
const kOnDrain$1 = Symbol("onDrain");
const kOnConnect$1 = Symbol("onConnect");
const kOnDisconnect$1 = Symbol("onDisconnect");
const kOnConnectionError$1 = Symbol("onConnectionError");
const kGetDispatcher$1 = Symbol("get dispatcher");
const kAddClient$1 = Symbol("add client");
const kRemoveClient = Symbol("remove client");
const kStats = Symbol("stats");
let PoolBase$1 = class PoolBase extends DispatcherBase$1 {
  constructor() {
    super();
    this[kQueue] = new FixedQueue2();
    this[kClients$2] = [];
    this[kQueued] = 0;
    const pool2 = this;
    this[kOnDrain$1] = function onDrain(origin, targets) {
      const queue = pool2[kQueue];
      let needDrain = false;
      while (!needDrain) {
        const item = queue.shift();
        if (!item) {
          break;
        }
        pool2[kQueued]--;
        needDrain = !this.dispatch(item.opts, item.handler);
      }
      this[kNeedDrain$1] = needDrain;
      if (!this[kNeedDrain$1] && pool2[kNeedDrain$1]) {
        pool2[kNeedDrain$1] = false;
        pool2.emit("drain", origin, [pool2, ...targets]);
      }
      if (pool2[kClosedResolve] && queue.isEmpty()) {
        Promise.all(pool2[kClients$2].map((c2) => c2.close())).then(pool2[kClosedResolve]);
      }
    };
    this[kOnConnect$1] = (origin, targets) => {
      pool2.emit("connect", origin, [pool2, ...targets]);
    };
    this[kOnDisconnect$1] = (origin, targets, err) => {
      pool2.emit("disconnect", origin, [pool2, ...targets], err);
    };
    this[kOnConnectionError$1] = (origin, targets, err) => {
      pool2.emit("connectionError", origin, [pool2, ...targets], err);
    };
    this[kStats] = new PoolStats2(this);
  }
  get [kBusy]() {
    return this[kNeedDrain$1];
  }
  get [kConnected]() {
    return this[kClients$2].filter((client2) => client2[kConnected]).length;
  }
  get [kFree]() {
    return this[kClients$2].filter((client2) => client2[kConnected] && !client2[kNeedDrain$1]).length;
  }
  get [kPending]() {
    let ret = this[kQueued];
    for (const { [kPending]: pending } of this[kClients$2]) {
      ret += pending;
    }
    return ret;
  }
  get [kRunning$1]() {
    let ret = 0;
    for (const { [kRunning$1]: running } of this[kClients$2]) {
      ret += running;
    }
    return ret;
  }
  get [kSize]() {
    let ret = this[kQueued];
    for (const { [kSize]: size } of this[kClients$2]) {
      ret += size;
    }
    return ret;
  }
  get stats() {
    return this[kStats];
  }
  async [kClose$1]() {
    if (this[kQueue].isEmpty()) {
      await Promise.all(this[kClients$2].map((c2) => c2.close()));
    } else {
      await new Promise((resolve) => {
        this[kClosedResolve] = resolve;
      });
    }
  }
  async [kDestroy$1](err) {
    while (true) {
      const item = this[kQueue].shift();
      if (!item) {
        break;
      }
      item.handler.onError(err);
    }
    await Promise.all(this[kClients$2].map((c2) => c2.destroy(err)));
  }
  [kDispatch$1](opts, handler) {
    const dispatcher2 = this[kGetDispatcher$1]();
    if (!dispatcher2) {
      this[kNeedDrain$1] = true;
      this[kQueue].push({ opts, handler });
      this[kQueued]++;
    } else if (!dispatcher2.dispatch(opts, handler)) {
      dispatcher2[kNeedDrain$1] = true;
      this[kNeedDrain$1] = !this[kGetDispatcher$1]();
    }
    return !this[kNeedDrain$1];
  }
  [kAddClient$1](client2) {
    client2.on("drain", this[kOnDrain$1]).on("connect", this[kOnConnect$1]).on("disconnect", this[kOnDisconnect$1]).on("connectionError", this[kOnConnectionError$1]);
    this[kClients$2].push(client2);
    if (this[kNeedDrain$1]) {
      queueMicrotask(() => {
        if (this[kNeedDrain$1]) {
          this[kOnDrain$1](client2[kUrl$1], [this, client2]);
        }
      });
    }
    return this;
  }
  [kRemoveClient](client2) {
    client2.close(() => {
      const idx = this[kClients$2].indexOf(client2);
      if (idx !== -1) {
        this[kClients$2].splice(idx, 1);
      }
    });
    this[kNeedDrain$1] = this[kClients$2].some((dispatcher2) => !dispatcher2[kNeedDrain$1] && dispatcher2.closed !== true && dispatcher2.destroyed !== true);
  }
};
var poolBase = {
  PoolBase: PoolBase$1,
  kClients: kClients$2,
  kNeedDrain: kNeedDrain$1,
  kAddClient: kAddClient$1,
  kGetDispatcher: kGetDispatcher$1
};
const {
  PoolBase: PoolBase2,
  kClients: kClients$1,
  kNeedDrain,
  kAddClient,
  kGetDispatcher
} = poolBase;
const Client$1 = client;
const {
  InvalidArgumentError: InvalidArgumentError$h
} = errors$1;
const util$e = util$m;
const { kUrl, kInterceptors: kInterceptors$1 } = symbols$4;
const buildConnector = connect$2;
const kOptions$1 = Symbol("options");
const kConnections = Symbol("connections");
const kFactory$1 = Symbol("factory");
function defaultFactory$1(origin, opts) {
  return new Client$1(origin, opts);
}
let Pool$1 = class Pool extends PoolBase2 {
  constructor(origin, {
    connections,
    factory = defaultFactory$1,
    connect: connect2,
    connectTimeout,
    tls: tls2,
    maxCachedSessions,
    socketPath,
    autoSelectFamily,
    autoSelectFamilyAttemptTimeout,
    allowH2,
    ...options
  } = {}) {
    var _a2;
    super();
    if (connections != null && (!Number.isFinite(connections) || connections < 0)) {
      throw new InvalidArgumentError$h("invalid connections");
    }
    if (typeof factory !== "function") {
      throw new InvalidArgumentError$h("factory must be a function.");
    }
    if (connect2 != null && typeof connect2 !== "function" && typeof connect2 !== "object") {
      throw new InvalidArgumentError$h("connect must be a function or an object");
    }
    if (typeof connect2 !== "function") {
      connect2 = buildConnector({
        ...tls2,
        maxCachedSessions,
        allowH2,
        socketPath,
        timeout: connectTimeout,
        ...autoSelectFamily ? { autoSelectFamily, autoSelectFamilyAttemptTimeout } : void 0,
        ...connect2
      });
    }
    this[kInterceptors$1] = ((_a2 = options.interceptors) == null ? void 0 : _a2.Pool) && Array.isArray(options.interceptors.Pool) ? options.interceptors.Pool : [];
    this[kConnections] = connections || null;
    this[kUrl] = util$e.parseOrigin(origin);
    this[kOptions$1] = { ...util$e.deepClone(options), connect: connect2, allowH2 };
    this[kOptions$1].interceptors = options.interceptors ? { ...options.interceptors } : void 0;
    this[kFactory$1] = factory;
    this.on("connectionError", (origin2, targets, error) => {
      for (const target of targets) {
        const idx = this[kClients$1].indexOf(target);
        if (idx !== -1) {
          this[kClients$1].splice(idx, 1);
        }
      }
    });
  }
  [kGetDispatcher]() {
    for (const client2 of this[kClients$1]) {
      if (!client2[kNeedDrain]) {
        return client2;
      }
    }
    if (!this[kConnections] || this[kClients$1].length < this[kConnections]) {
      const dispatcher2 = this[kFactory$1](this[kUrl], this[kOptions$1]);
      this[kAddClient](dispatcher2);
      return dispatcher2;
    }
  }
};
var pool = Pool$1;
const {
  BalancedPoolMissingUpstreamError: BalancedPoolMissingUpstreamError2,
  InvalidArgumentError: InvalidArgumentError$g
} = errors$1;
const { InvalidArgumentError: InvalidArgumentError$f } = errors$1;
const { kClients, kRunning, kClose, kDestroy, kDispatch, kInterceptors } = symbols$4;
const DispatcherBase2 = dispatcherBase;
const Pool2 = pool;
const Client2 = client;
const util$d = util$m;
const createRedirectInterceptor = redirectInterceptor;
const kOnConnect = Symbol("onConnect");
const kOnDisconnect = Symbol("onDisconnect");
const kOnConnectionError = Symbol("onConnectionError");
const kMaxRedirections = Symbol("maxRedirections");
const kOnDrain = Symbol("onDrain");
const kFactory = Symbol("factory");
const kOptions = Symbol("options");
function defaultFactory(origin, opts) {
  return opts && opts.connections === 1 ? new Client2(origin, opts) : new Pool2(origin, opts);
}
let Agent$2 = class Agent extends DispatcherBase2 {
  constructor({ factory = defaultFactory, maxRedirections = 0, connect: connect2, ...options } = {}) {
    var _a2;
    super();
    if (typeof factory !== "function") {
      throw new InvalidArgumentError$f("factory must be a function.");
    }
    if (connect2 != null && typeof connect2 !== "function" && typeof connect2 !== "object") {
      throw new InvalidArgumentError$f("connect must be a function or an object");
    }
    if (!Number.isInteger(maxRedirections) || maxRedirections < 0) {
      throw new InvalidArgumentError$f("maxRedirections must be a positive number");
    }
    if (connect2 && typeof connect2 !== "function") {
      connect2 = { ...connect2 };
    }
    this[kInterceptors] = ((_a2 = options.interceptors) == null ? void 0 : _a2.Agent) && Array.isArray(options.interceptors.Agent) ? options.interceptors.Agent : [createRedirectInterceptor({ maxRedirections })];
    this[kOptions] = { ...util$d.deepClone(options), connect: connect2 };
    this[kOptions].interceptors = options.interceptors ? { ...options.interceptors } : void 0;
    this[kMaxRedirections] = maxRedirections;
    this[kFactory] = factory;
    this[kClients] = /* @__PURE__ */ new Map();
    this[kOnDrain] = (origin, targets) => {
      this.emit("drain", origin, [this, ...targets]);
    };
    this[kOnConnect] = (origin, targets) => {
      this.emit("connect", origin, [this, ...targets]);
    };
    this[kOnDisconnect] = (origin, targets, err) => {
      this.emit("disconnect", origin, [this, ...targets], err);
    };
    this[kOnConnectionError] = (origin, targets, err) => {
      this.emit("connectionError", origin, [this, ...targets], err);
    };
  }
  get [kRunning]() {
    let ret = 0;
    for (const client2 of this[kClients].values()) {
      ret += client2[kRunning];
    }
    return ret;
  }
  [kDispatch](opts, handler) {
    let key2;
    if (opts.origin && (typeof opts.origin === "string" || opts.origin instanceof URL)) {
      key2 = String(opts.origin);
    } else {
      throw new InvalidArgumentError$f("opts.origin must be a non-empty string or URL.");
    }
    let dispatcher2 = this[kClients].get(key2);
    if (!dispatcher2) {
      dispatcher2 = this[kFactory](opts.origin, this[kOptions]).on("drain", this[kOnDrain]).on("connect", this[kOnConnect]).on("disconnect", this[kOnDisconnect]).on("connectionError", this[kOnConnectionError]);
      this[kClients].set(key2, dispatcher2);
    }
    return dispatcher2.dispatch(opts, handler);
  }
  async [kClose]() {
    const closePromises = [];
    for (const client2 of this[kClients].values()) {
      closePromises.push(client2.close());
    }
    this[kClients].clear();
    await Promise.all(closePromises);
  }
  async [kDestroy](err) {
    const destroyPromises = [];
    for (const client2 of this[kClients].values()) {
      destroyPromises.push(client2.destroy(err));
    }
    this[kClients].clear();
    await Promise.all(destroyPromises);
  }
};
var agent = Agent$2;
const { URL: URL$1 } = require$$1$2;
const { InvalidArgumentError: InvalidArgumentError$e, RequestAbortedError: RequestAbortedError$5, SecureProxyConnectionError: SecureProxyConnectionError2 } = errors$1;
const { RequestRetryError: RequestRetryError2 } = errors$1;
var api$1 = {};
var apiRequest = { exports: {} };
const assert$6 = require$$0$1;
const { Readable: Readable$2 } = require$$0$2;
const { RequestAbortedError: RequestAbortedError$4, NotSupportedError: NotSupportedError2, InvalidArgumentError: InvalidArgumentError$d, AbortError: AbortError2 } = errors$1;
const util$c = util$m;
const { ReadableStreamFrom } = util$m;
const kConsume = Symbol("kConsume");
const kReading = Symbol("kReading");
const kBody = Symbol("kBody");
const kAbort = Symbol("kAbort");
const kContentType = Symbol("kContentType");
const kContentLength = Symbol("kContentLength");
const noop = () => {
};
class BodyReadable extends Readable$2 {
  constructor({
    resume: resume2,
    abort: abort2,
    contentType = "",
    contentLength,
    highWaterMark = 64 * 1024
    // Same as nodejs fs streams.
  }) {
    super({
      autoDestroy: true,
      read: resume2,
      highWaterMark
    });
    this._readableState.dataEmitted = false;
    this[kAbort] = abort2;
    this[kConsume] = null;
    this[kBody] = null;
    this[kContentType] = contentType;
    this[kContentLength] = contentLength;
    this[kReading] = false;
  }
  destroy(err) {
    if (!err && !this._readableState.endEmitted) {
      err = new RequestAbortedError$4();
    }
    if (err) {
      this[kAbort]();
    }
    return super.destroy(err);
  }
  _destroy(err, callback) {
    if (!this[kReading]) {
      setImmediate(() => {
        callback(err);
      });
    } else {
      callback(err);
    }
  }
  on(ev, ...args) {
    if (ev === "data" || ev === "readable") {
      this[kReading] = true;
    }
    return super.on(ev, ...args);
  }
  addListener(ev, ...args) {
    return this.on(ev, ...args);
  }
  off(ev, ...args) {
    const ret = super.off(ev, ...args);
    if (ev === "data" || ev === "readable") {
      this[kReading] = this.listenerCount("data") > 0 || this.listenerCount("readable") > 0;
    }
    return ret;
  }
  removeListener(ev, ...args) {
    return this.off(ev, ...args);
  }
  push(chunk) {
    if (this[kConsume] && chunk !== null) {
      consumePush(this[kConsume], chunk);
      return this[kReading] ? super.push(chunk) : true;
    }
    return super.push(chunk);
  }
  // https://fetch.spec.whatwg.org/#dom-body-text
  async text() {
    return consume(this, "text");
  }
  // https://fetch.spec.whatwg.org/#dom-body-json
  async json() {
    return consume(this, "json");
  }
  // https://fetch.spec.whatwg.org/#dom-body-blob
  async blob() {
    return consume(this, "blob");
  }
  // https://fetch.spec.whatwg.org/#dom-body-bytes
  async bytes() {
    return consume(this, "bytes");
  }
  // https://fetch.spec.whatwg.org/#dom-body-arraybuffer
  async arrayBuffer() {
    return consume(this, "arrayBuffer");
  }
  // https://fetch.spec.whatwg.org/#dom-body-formdata
  async formData() {
    throw new NotSupportedError2();
  }
  // https://fetch.spec.whatwg.org/#dom-body-bodyused
  get bodyUsed() {
    return util$c.isDisturbed(this);
  }
  // https://fetch.spec.whatwg.org/#dom-body-body
  get body() {
    if (!this[kBody]) {
      this[kBody] = ReadableStreamFrom(this);
      if (this[kConsume]) {
        this[kBody].getReader();
        assert$6(this[kBody].locked);
      }
    }
    return this[kBody];
  }
  async dump(opts) {
    let limit = Number.isFinite(opts == null ? void 0 : opts.limit) ? opts.limit : 128 * 1024;
    const signal = opts == null ? void 0 : opts.signal;
    if (signal != null && (typeof signal !== "object" || !("aborted" in signal))) {
      throw new InvalidArgumentError$d("signal must be an AbortSignal");
    }
    signal == null ? void 0 : signal.throwIfAborted();
    if (this._readableState.closeEmitted) {
      return null;
    }
    return await new Promise((resolve, reject) => {
      if (this[kContentLength] > limit) {
        this.destroy(new AbortError2());
      }
      const onAbort = () => {
        this.destroy(signal.reason ?? new AbortError2());
      };
      signal == null ? void 0 : signal.addEventListener("abort", onAbort);
      this.on("close", function() {
        signal == null ? void 0 : signal.removeEventListener("abort", onAbort);
        if (signal == null ? void 0 : signal.aborted) {
          reject(signal.reason ?? new AbortError2());
        } else {
          resolve(null);
        }
      }).on("error", noop).on("data", function(chunk) {
        limit -= chunk.length;
        if (limit <= 0) {
          this.destroy();
        }
      }).resume();
    });
  }
}
function isLocked(self2) {
  return self2[kBody] && self2[kBody].locked === true || self2[kConsume];
}
function isUnusable(self2) {
  return util$c.isDisturbed(self2) || isLocked(self2);
}
async function consume(stream2, type) {
  assert$6(!stream2[kConsume]);
  return new Promise((resolve, reject) => {
    if (isUnusable(stream2)) {
      const rState = stream2._readableState;
      if (rState.destroyed && rState.closeEmitted === false) {
        stream2.on("error", (err) => {
          reject(err);
        }).on("close", () => {
          reject(new TypeError("unusable"));
        });
      } else {
        reject(rState.errored ?? new TypeError("unusable"));
      }
    } else {
      queueMicrotask(() => {
        stream2[kConsume] = {
          type,
          stream: stream2,
          resolve,
          reject,
          length: 0,
          body: []
        };
        stream2.on("error", function(err) {
          consumeFinish(this[kConsume], err);
        }).on("close", function() {
          if (this[kConsume].body !== null) {
            consumeFinish(this[kConsume], new RequestAbortedError$4());
          }
        });
        consumeStart(stream2[kConsume]);
      });
    }
  });
}
function consumeStart(consume2) {
  if (consume2.body === null) {
    return;
  }
  const { _readableState: state } = consume2.stream;
  if (state.bufferIndex) {
    const start = state.bufferIndex;
    const end = state.buffer.length;
    for (let n = start; n < end; n++) {
      consumePush(consume2, state.buffer[n]);
    }
  } else {
    for (const chunk of state.buffer) {
      consumePush(consume2, chunk);
    }
  }
  if (state.endEmitted) {
    consumeEnd(this[kConsume]);
  } else {
    consume2.stream.on("end", function() {
      consumeEnd(this[kConsume]);
    });
  }
  consume2.stream.resume();
  while (consume2.stream.read() != null) {
  }
}
function chunksDecode$1(chunks, length) {
  if (chunks.length === 0 || length === 0) {
    return "";
  }
  const buffer2 = chunks.length === 1 ? chunks[0] : Buffer.concat(chunks, length);
  const bufferLength = buffer2.length;
  const start = bufferLength > 2 && buffer2[0] === 239 && buffer2[1] === 187 && buffer2[2] === 191 ? 3 : 0;
  return buffer2.utf8Slice(start, bufferLength);
}
function chunksConcat(chunks, length) {
  if (chunks.length === 0 || length === 0) {
    return new Uint8Array(0);
  }
  if (chunks.length === 1) {
    return new Uint8Array(chunks[0]);
  }
  const buffer2 = new Uint8Array(Buffer.allocUnsafeSlow(length).buffer);
  let offset = 0;
  for (let i = 0; i < chunks.length; ++i) {
    const chunk = chunks[i];
    buffer2.set(chunk, offset);
    offset += chunk.length;
  }
  return buffer2;
}
function consumeEnd(consume2) {
  const { type, body: body2, resolve, stream: stream2, length } = consume2;
  try {
    if (type === "text") {
      resolve(chunksDecode$1(body2, length));
    } else if (type === "json") {
      resolve(JSON.parse(chunksDecode$1(body2, length)));
    } else if (type === "arrayBuffer") {
      resolve(chunksConcat(body2, length).buffer);
    } else if (type === "blob") {
      resolve(new Blob(body2, { type: stream2[kContentType] }));
    } else if (type === "bytes") {
      resolve(chunksConcat(body2, length));
    }
    consumeFinish(consume2);
  } catch (err) {
    stream2.destroy(err);
  }
}
function consumePush(consume2, chunk) {
  consume2.length += chunk.length;
  consume2.body.push(chunk);
}
function consumeFinish(consume2, err) {
  if (consume2.body === null) {
    return;
  }
  if (err) {
    consume2.reject(err);
  } else {
    consume2.resolve();
  }
  consume2.type = null;
  consume2.stream = null;
  consume2.resolve = null;
  consume2.reject = null;
  consume2.length = 0;
  consume2.body = null;
}
var readable = { Readable: BodyReadable, chunksDecode: chunksDecode$1 };
const assert$5 = require$$0$1;
const {
  ResponseStatusCodeError: ResponseStatusCodeError2
} = errors$1;
const { chunksDecode } = readable;
const CHUNK_LIMIT = 128 * 1024;
async function getResolveErrorBodyCallback$2({ callback, body: body2, contentType, statusCode, statusMessage, headers: headers2 }) {
  assert$5(body2);
  let chunks = [];
  let length = 0;
  try {
    for await (const chunk of body2) {
      chunks.push(chunk);
      length += chunk.length;
      if (length > CHUNK_LIMIT) {
        chunks = [];
        length = 0;
        break;
      }
    }
  } catch {
    chunks = [];
    length = 0;
  }
  const message = `Response status code ${statusCode}${statusMessage ? `: ${statusMessage}` : ""}`;
  if (statusCode === 204 || !contentType || !length) {
    queueMicrotask(() => callback(new ResponseStatusCodeError2(message, statusCode, headers2)));
    return;
  }
  const stackTraceLimit = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  let payload;
  try {
    if (isContentTypeApplicationJson(contentType)) {
      payload = JSON.parse(chunksDecode(chunks, length));
    } else if (isContentTypeText(contentType)) {
      payload = chunksDecode(chunks, length);
    }
  } catch {
  } finally {
    Error.stackTraceLimit = stackTraceLimit;
  }
  queueMicrotask(() => callback(new ResponseStatusCodeError2(message, statusCode, headers2, payload)));
}
const isContentTypeApplicationJson = (contentType) => {
  return contentType.length > 15 && contentType[11] === "/" && contentType[0] === "a" && contentType[1] === "p" && contentType[2] === "p" && contentType[3] === "l" && contentType[4] === "i" && contentType[5] === "c" && contentType[6] === "a" && contentType[7] === "t" && contentType[8] === "i" && contentType[9] === "o" && contentType[10] === "n" && contentType[12] === "j" && contentType[13] === "s" && contentType[14] === "o" && contentType[15] === "n";
};
const isContentTypeText = (contentType) => {
  return contentType.length > 4 && contentType[4] === "/" && contentType[0] === "t" && contentType[1] === "e" && contentType[2] === "x" && contentType[3] === "t";
};
var util$b = {
  getResolveErrorBodyCallback: getResolveErrorBodyCallback$2
};
const assert$4 = require$$0$1;
const { Readable: Readable$1 } = readable;
const { InvalidArgumentError: InvalidArgumentError$c, RequestAbortedError: RequestAbortedError$3 } = errors$1;
const util$a = util$m;
const { getResolveErrorBodyCallback: getResolveErrorBodyCallback$1 } = util$b;
const { AsyncResource: AsyncResource$4 } = require$$5$2;
class RequestHandler extends AsyncResource$4 {
  constructor(opts, callback) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$c("invalid opts");
    }
    const { signal, method, opaque, body: body2, onInfo, responseHeaders, throwOnError, highWaterMark } = opts;
    try {
      if (typeof callback !== "function") {
        throw new InvalidArgumentError$c("invalid callback");
      }
      if (highWaterMark && (typeof highWaterMark !== "number" || highWaterMark < 0)) {
        throw new InvalidArgumentError$c("invalid highWaterMark");
      }
      if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
        throw new InvalidArgumentError$c("signal must be an EventEmitter or EventTarget");
      }
      if (method === "CONNECT") {
        throw new InvalidArgumentError$c("invalid method");
      }
      if (onInfo && typeof onInfo !== "function") {
        throw new InvalidArgumentError$c("invalid onInfo callback");
      }
      super("UNDICI_REQUEST");
    } catch (err) {
      if (util$a.isStream(body2)) {
        util$a.destroy(body2.on("error", util$a.nop), err);
      }
      throw err;
    }
    this.method = method;
    this.responseHeaders = responseHeaders || null;
    this.opaque = opaque || null;
    this.callback = callback;
    this.res = null;
    this.abort = null;
    this.body = body2;
    this.trailers = {};
    this.context = null;
    this.onInfo = onInfo || null;
    this.throwOnError = throwOnError;
    this.highWaterMark = highWaterMark;
    this.signal = signal;
    this.reason = null;
    this.removeAbortListener = null;
    if (util$a.isStream(body2)) {
      body2.on("error", (err) => {
        this.onError(err);
      });
    }
    if (this.signal) {
      if (this.signal.aborted) {
        this.reason = this.signal.reason ?? new RequestAbortedError$3();
      } else {
        this.removeAbortListener = util$a.addAbortListener(this.signal, () => {
          var _a2;
          this.reason = this.signal.reason ?? new RequestAbortedError$3();
          if (this.res) {
            util$a.destroy(this.res.on("error", util$a.nop), this.reason);
          } else if (this.abort) {
            this.abort(this.reason);
          }
          if (this.removeAbortListener) {
            (_a2 = this.res) == null ? void 0 : _a2.off("close", this.removeAbortListener);
            this.removeAbortListener();
            this.removeAbortListener = null;
          }
        });
      }
    }
  }
  onConnect(abort2, context) {
    if (this.reason) {
      abort2(this.reason);
      return;
    }
    assert$4(this.callback);
    this.abort = abort2;
    this.context = context;
  }
  onHeaders(statusCode, rawHeaders, resume2, statusMessage) {
    const { callback, opaque, abort: abort2, context, responseHeaders, highWaterMark } = this;
    const headers2 = responseHeaders === "raw" ? util$a.parseRawHeaders(rawHeaders) : util$a.parseHeaders(rawHeaders);
    if (statusCode < 200) {
      if (this.onInfo) {
        this.onInfo({ statusCode, headers: headers2 });
      }
      return;
    }
    const parsedHeaders = responseHeaders === "raw" ? util$a.parseHeaders(rawHeaders) : headers2;
    const contentType = parsedHeaders["content-type"];
    const contentLength = parsedHeaders["content-length"];
    const res = new Readable$1({
      resume: resume2,
      abort: abort2,
      contentType,
      contentLength: this.method !== "HEAD" && contentLength ? Number(contentLength) : null,
      highWaterMark
    });
    if (this.removeAbortListener) {
      res.on("close", this.removeAbortListener);
    }
    this.callback = null;
    this.res = res;
    if (callback !== null) {
      if (this.throwOnError && statusCode >= 400) {
        this.runInAsyncScope(
          getResolveErrorBodyCallback$1,
          null,
          { callback, body: res, contentType, statusCode, statusMessage, headers: headers2 }
        );
      } else {
        this.runInAsyncScope(callback, null, null, {
          statusCode,
          headers: headers2,
          trailers: this.trailers,
          opaque,
          body: res,
          context
        });
      }
    }
  }
  onData(chunk) {
    return this.res.push(chunk);
  }
  onComplete(trailers) {
    util$a.parseHeaders(trailers, this.trailers);
    this.res.push(null);
  }
  onError(err) {
    const { res, callback, body: body2, opaque } = this;
    if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
    if (res) {
      this.res = null;
      queueMicrotask(() => {
        util$a.destroy(res, err);
      });
    }
    if (body2) {
      this.body = null;
      util$a.destroy(body2, err);
    }
    if (this.removeAbortListener) {
      res == null ? void 0 : res.off("close", this.removeAbortListener);
      this.removeAbortListener();
      this.removeAbortListener = null;
    }
  }
}
function request$2(opts, callback) {
  if (callback === void 0) {
    return new Promise((resolve, reject) => {
      request$2.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  }
  try {
    this.dispatch(opts, new RequestHandler(opts, callback));
  } catch (err) {
    if (typeof callback !== "function") {
      throw err;
    }
    const opaque = opts == null ? void 0 : opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}
apiRequest.exports = request$2;
apiRequest.exports.RequestHandler = RequestHandler;
var apiRequestExports = apiRequest.exports;
const { addAbortListener } = util$m;
const { RequestAbortedError: RequestAbortedError$2 } = errors$1;
const kListener = Symbol("kListener");
const kSignal = Symbol("kSignal");
function abort(self2) {
  var _a2, _b2;
  if (self2.abort) {
    self2.abort((_a2 = self2[kSignal]) == null ? void 0 : _a2.reason);
  } else {
    self2.reason = ((_b2 = self2[kSignal]) == null ? void 0 : _b2.reason) ?? new RequestAbortedError$2();
  }
  removeSignal$4(self2);
}
function addSignal$4(self2, signal) {
  self2.reason = null;
  self2[kSignal] = null;
  self2[kListener] = null;
  if (!signal) {
    return;
  }
  if (signal.aborted) {
    abort(self2);
    return;
  }
  self2[kSignal] = signal;
  self2[kListener] = () => {
    abort(self2);
  };
  addAbortListener(self2[kSignal], self2[kListener]);
}
function removeSignal$4(self2) {
  if (!self2[kSignal]) {
    return;
  }
  if ("removeEventListener" in self2[kSignal]) {
    self2[kSignal].removeEventListener("abort", self2[kListener]);
  } else {
    self2[kSignal].removeListener("abort", self2[kListener]);
  }
  self2[kSignal] = null;
  self2[kListener] = null;
}
var abortSignal = {
  addSignal: addSignal$4,
  removeSignal: removeSignal$4
};
const assert$3 = require$$0$1;
const { finished, PassThrough: PassThrough$1 } = require$$0$2;
const { InvalidArgumentError: InvalidArgumentError$b, InvalidReturnValueError: InvalidReturnValueError$1 } = errors$1;
const util$9 = util$m;
const { getResolveErrorBodyCallback } = util$b;
const { AsyncResource: AsyncResource$3 } = require$$5$2;
const { addSignal: addSignal$3, removeSignal: removeSignal$3 } = abortSignal;
class StreamHandler extends AsyncResource$3 {
  constructor(opts, factory, callback) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$b("invalid opts");
    }
    const { signal, method, opaque, body: body2, onInfo, responseHeaders, throwOnError } = opts;
    try {
      if (typeof callback !== "function") {
        throw new InvalidArgumentError$b("invalid callback");
      }
      if (typeof factory !== "function") {
        throw new InvalidArgumentError$b("invalid factory");
      }
      if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
        throw new InvalidArgumentError$b("signal must be an EventEmitter or EventTarget");
      }
      if (method === "CONNECT") {
        throw new InvalidArgumentError$b("invalid method");
      }
      if (onInfo && typeof onInfo !== "function") {
        throw new InvalidArgumentError$b("invalid onInfo callback");
      }
      super("UNDICI_STREAM");
    } catch (err) {
      if (util$9.isStream(body2)) {
        util$9.destroy(body2.on("error", util$9.nop), err);
      }
      throw err;
    }
    this.responseHeaders = responseHeaders || null;
    this.opaque = opaque || null;
    this.factory = factory;
    this.callback = callback;
    this.res = null;
    this.abort = null;
    this.context = null;
    this.trailers = null;
    this.body = body2;
    this.onInfo = onInfo || null;
    this.throwOnError = throwOnError || false;
    if (util$9.isStream(body2)) {
      body2.on("error", (err) => {
        this.onError(err);
      });
    }
    addSignal$3(this, signal);
  }
  onConnect(abort2, context) {
    if (this.reason) {
      abort2(this.reason);
      return;
    }
    assert$3(this.callback);
    this.abort = abort2;
    this.context = context;
  }
  onHeaders(statusCode, rawHeaders, resume2, statusMessage) {
    var _a2;
    const { factory, opaque, context, callback, responseHeaders } = this;
    const headers2 = responseHeaders === "raw" ? util$9.parseRawHeaders(rawHeaders) : util$9.parseHeaders(rawHeaders);
    if (statusCode < 200) {
      if (this.onInfo) {
        this.onInfo({ statusCode, headers: headers2 });
      }
      return;
    }
    this.factory = null;
    let res;
    if (this.throwOnError && statusCode >= 400) {
      const parsedHeaders = responseHeaders === "raw" ? util$9.parseHeaders(rawHeaders) : headers2;
      const contentType = parsedHeaders["content-type"];
      res = new PassThrough$1();
      this.callback = null;
      this.runInAsyncScope(
        getResolveErrorBodyCallback,
        null,
        { callback, body: res, contentType, statusCode, statusMessage, headers: headers2 }
      );
    } else {
      if (factory === null) {
        return;
      }
      res = this.runInAsyncScope(factory, null, {
        statusCode,
        headers: headers2,
        opaque,
        context
      });
      if (!res || typeof res.write !== "function" || typeof res.end !== "function" || typeof res.on !== "function") {
        throw new InvalidReturnValueError$1("expected Writable");
      }
      finished(res, { readable: false }, (err) => {
        const { callback: callback2, res: res2, opaque: opaque2, trailers, abort: abort2 } = this;
        this.res = null;
        if (err || !res2.readable) {
          util$9.destroy(res2, err);
        }
        this.callback = null;
        this.runInAsyncScope(callback2, null, err || null, { opaque: opaque2, trailers });
        if (err) {
          abort2();
        }
      });
    }
    res.on("drain", resume2);
    this.res = res;
    const needDrain = res.writableNeedDrain !== void 0 ? res.writableNeedDrain : (_a2 = res._writableState) == null ? void 0 : _a2.needDrain;
    return needDrain !== true;
  }
  onData(chunk) {
    const { res } = this;
    return res ? res.write(chunk) : true;
  }
  onComplete(trailers) {
    const { res } = this;
    removeSignal$3(this);
    if (!res) {
      return;
    }
    this.trailers = util$9.parseHeaders(trailers);
    res.end();
  }
  onError(err) {
    const { res, callback, opaque, body: body2 } = this;
    removeSignal$3(this);
    this.factory = null;
    if (res) {
      this.res = null;
      util$9.destroy(res, err);
    } else if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
    if (body2) {
      this.body = null;
      util$9.destroy(body2, err);
    }
  }
}
function stream(opts, factory, callback) {
  if (callback === void 0) {
    return new Promise((resolve, reject) => {
      stream.call(this, opts, factory, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  }
  try {
    this.dispatch(opts, new StreamHandler(opts, factory, callback));
  } catch (err) {
    if (typeof callback !== "function") {
      throw err;
    }
    const opaque = opts == null ? void 0 : opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}
var apiStream = stream;
const {
  Readable,
  Duplex,
  PassThrough
} = require$$0$2;
const {
  InvalidArgumentError: InvalidArgumentError$a,
  InvalidReturnValueError: InvalidReturnValueError2,
  RequestAbortedError: RequestAbortedError$1
} = errors$1;
const util$8 = util$m;
const { AsyncResource: AsyncResource$2 } = require$$5$2;
const { addSignal: addSignal$2, removeSignal: removeSignal$2 } = abortSignal;
const assert$2 = require$$0$1;
const kResume = Symbol("resume");
class PipelineRequest extends Readable {
  constructor() {
    super({ autoDestroy: true });
    this[kResume] = null;
  }
  _read() {
    const { [kResume]: resume2 } = this;
    if (resume2) {
      this[kResume] = null;
      resume2();
    }
  }
  _destroy(err, callback) {
    this._read();
    callback(err);
  }
}
class PipelineResponse extends Readable {
  constructor(resume2) {
    super({ autoDestroy: true });
    this[kResume] = resume2;
  }
  _read() {
    this[kResume]();
  }
  _destroy(err, callback) {
    if (!err && !this._readableState.endEmitted) {
      err = new RequestAbortedError$1();
    }
    callback(err);
  }
}
class PipelineHandler extends AsyncResource$2 {
  constructor(opts, handler) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$a("invalid opts");
    }
    if (typeof handler !== "function") {
      throw new InvalidArgumentError$a("invalid handler");
    }
    const { signal, method, opaque, onInfo, responseHeaders } = opts;
    if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
      throw new InvalidArgumentError$a("signal must be an EventEmitter or EventTarget");
    }
    if (method === "CONNECT") {
      throw new InvalidArgumentError$a("invalid method");
    }
    if (onInfo && typeof onInfo !== "function") {
      throw new InvalidArgumentError$a("invalid onInfo callback");
    }
    super("UNDICI_PIPELINE");
    this.opaque = opaque || null;
    this.responseHeaders = responseHeaders || null;
    this.handler = handler;
    this.abort = null;
    this.context = null;
    this.onInfo = onInfo || null;
    this.req = new PipelineRequest().on("error", util$8.nop);
    this.ret = new Duplex({
      readableObjectMode: opts.objectMode,
      autoDestroy: true,
      read: () => {
        const { body: body2 } = this;
        if (body2 == null ? void 0 : body2.resume) {
          body2.resume();
        }
      },
      write: (chunk, encoding2, callback) => {
        const { req } = this;
        if (req.push(chunk, encoding2) || req._readableState.destroyed) {
          callback();
        } else {
          req[kResume] = callback;
        }
      },
      destroy: (err, callback) => {
        const { body: body2, req, res, ret, abort: abort2 } = this;
        if (!err && !ret._readableState.endEmitted) {
          err = new RequestAbortedError$1();
        }
        if (abort2 && err) {
          abort2();
        }
        util$8.destroy(body2, err);
        util$8.destroy(req, err);
        util$8.destroy(res, err);
        removeSignal$2(this);
        callback(err);
      }
    }).on("prefinish", () => {
      const { req } = this;
      req.push(null);
    });
    this.res = null;
    addSignal$2(this, signal);
  }
  onConnect(abort2, context) {
    const { ret, res } = this;
    if (this.reason) {
      abort2(this.reason);
      return;
    }
    assert$2(!res, "pipeline cannot be retried");
    assert$2(!ret.destroyed);
    this.abort = abort2;
    this.context = context;
  }
  onHeaders(statusCode, rawHeaders, resume2) {
    const { opaque, handler, context } = this;
    if (statusCode < 200) {
      if (this.onInfo) {
        const headers2 = this.responseHeaders === "raw" ? util$8.parseRawHeaders(rawHeaders) : util$8.parseHeaders(rawHeaders);
        this.onInfo({ statusCode, headers: headers2 });
      }
      return;
    }
    this.res = new PipelineResponse(resume2);
    let body2;
    try {
      this.handler = null;
      const headers2 = this.responseHeaders === "raw" ? util$8.parseRawHeaders(rawHeaders) : util$8.parseHeaders(rawHeaders);
      body2 = this.runInAsyncScope(handler, null, {
        statusCode,
        headers: headers2,
        opaque,
        body: this.res,
        context
      });
    } catch (err) {
      this.res.on("error", util$8.nop);
      throw err;
    }
    if (!body2 || typeof body2.on !== "function") {
      throw new InvalidReturnValueError2("expected Readable");
    }
    body2.on("data", (chunk) => {
      const { ret, body: body3 } = this;
      if (!ret.push(chunk) && body3.pause) {
        body3.pause();
      }
    }).on("error", (err) => {
      const { ret } = this;
      util$8.destroy(ret, err);
    }).on("end", () => {
      const { ret } = this;
      ret.push(null);
    }).on("close", () => {
      const { ret } = this;
      if (!ret._readableState.ended) {
        util$8.destroy(ret, new RequestAbortedError$1());
      }
    });
    this.body = body2;
  }
  onData(chunk) {
    const { res } = this;
    return res.push(chunk);
  }
  onComplete(trailers) {
    const { res } = this;
    res.push(null);
  }
  onError(err) {
    const { ret } = this;
    this.handler = null;
    util$8.destroy(ret, err);
  }
}
function pipeline(opts, handler) {
  try {
    const pipelineHandler = new PipelineHandler(opts, handler);
    this.dispatch({ ...opts, body: pipelineHandler.req }, pipelineHandler);
    return pipelineHandler.ret;
  } catch (err) {
    return new PassThrough().destroy(err);
  }
}
var apiPipeline = pipeline;
const { InvalidArgumentError: InvalidArgumentError$9, SocketError: SocketError$1 } = errors$1;
const { AsyncResource: AsyncResource$1 } = require$$5$2;
const util$7 = util$m;
const { addSignal: addSignal$1, removeSignal: removeSignal$1 } = abortSignal;
const assert$1 = require$$0$1;
class UpgradeHandler extends AsyncResource$1 {
  constructor(opts, callback) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$9("invalid opts");
    }
    if (typeof callback !== "function") {
      throw new InvalidArgumentError$9("invalid callback");
    }
    const { signal, opaque, responseHeaders } = opts;
    if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
      throw new InvalidArgumentError$9("signal must be an EventEmitter or EventTarget");
    }
    super("UNDICI_UPGRADE");
    this.responseHeaders = responseHeaders || null;
    this.opaque = opaque || null;
    this.callback = callback;
    this.abort = null;
    this.context = null;
    addSignal$1(this, signal);
  }
  onConnect(abort2, context) {
    if (this.reason) {
      abort2(this.reason);
      return;
    }
    assert$1(this.callback);
    this.abort = abort2;
    this.context = null;
  }
  onHeaders() {
    throw new SocketError$1("bad upgrade", null);
  }
  onUpgrade(statusCode, rawHeaders, socket) {
    assert$1(statusCode === 101);
    const { callback, opaque, context } = this;
    removeSignal$1(this);
    this.callback = null;
    const headers2 = this.responseHeaders === "raw" ? util$7.parseRawHeaders(rawHeaders) : util$7.parseHeaders(rawHeaders);
    this.runInAsyncScope(callback, null, null, {
      headers: headers2,
      socket,
      opaque,
      context
    });
  }
  onError(err) {
    const { callback, opaque } = this;
    removeSignal$1(this);
    if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
  }
}
function upgrade(opts, callback) {
  if (callback === void 0) {
    return new Promise((resolve, reject) => {
      upgrade.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  }
  try {
    const upgradeHandler = new UpgradeHandler(opts, callback);
    this.dispatch({
      ...opts,
      method: opts.method || "GET",
      upgrade: opts.protocol || "Websocket"
    }, upgradeHandler);
  } catch (err) {
    if (typeof callback !== "function") {
      throw err;
    }
    const opaque = opts == null ? void 0 : opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}
var apiUpgrade = upgrade;
const assert = require$$0$1;
const { AsyncResource } = require$$5$2;
const { InvalidArgumentError: InvalidArgumentError$8, SocketError: SocketError2 } = errors$1;
const util$6 = util$m;
const { addSignal, removeSignal } = abortSignal;
class ConnectHandler extends AsyncResource {
  constructor(opts, callback) {
    if (!opts || typeof opts !== "object") {
      throw new InvalidArgumentError$8("invalid opts");
    }
    if (typeof callback !== "function") {
      throw new InvalidArgumentError$8("invalid callback");
    }
    const { signal, opaque, responseHeaders } = opts;
    if (signal && typeof signal.on !== "function" && typeof signal.addEventListener !== "function") {
      throw new InvalidArgumentError$8("signal must be an EventEmitter or EventTarget");
    }
    super("UNDICI_CONNECT");
    this.opaque = opaque || null;
    this.responseHeaders = responseHeaders || null;
    this.callback = callback;
    this.abort = null;
    addSignal(this, signal);
  }
  onConnect(abort2, context) {
    if (this.reason) {
      abort2(this.reason);
      return;
    }
    assert(this.callback);
    this.abort = abort2;
    this.context = context;
  }
  onHeaders() {
    throw new SocketError2("bad connect", null);
  }
  onUpgrade(statusCode, rawHeaders, socket) {
    const { callback, opaque, context } = this;
    removeSignal(this);
    this.callback = null;
    let headers2 = rawHeaders;
    if (headers2 != null) {
      headers2 = this.responseHeaders === "raw" ? util$6.parseRawHeaders(rawHeaders) : util$6.parseHeaders(rawHeaders);
    }
    this.runInAsyncScope(callback, null, null, {
      statusCode,
      headers: headers2,
      socket,
      opaque,
      context
    });
  }
  onError(err) {
    const { callback, opaque } = this;
    removeSignal(this);
    if (callback) {
      this.callback = null;
      queueMicrotask(() => {
        this.runInAsyncScope(callback, null, err, { opaque });
      });
    }
  }
}
function connect(opts, callback) {
  if (callback === void 0) {
    return new Promise((resolve, reject) => {
      connect.call(this, opts, (err, data) => {
        return err ? reject(err) : resolve(data);
      });
    });
  }
  try {
    const connectHandler = new ConnectHandler(opts, callback);
    this.dispatch({ ...opts, method: "CONNECT" }, connectHandler);
  } catch (err) {
    if (typeof callback !== "function") {
      throw err;
    }
    const opaque = opts == null ? void 0 : opts.opaque;
    queueMicrotask(() => callback(err, { opaque }));
  }
}
var apiConnect = connect;
api$1.request = apiRequestExports;
api$1.stream = apiStream;
api$1.pipeline = apiPipeline;
api$1.upgrade = apiUpgrade;
api$1.connect = apiConnect;
const { UndiciError: UndiciError$1 } = errors$1;
const kMockNotMatchedError = Symbol.for("undici.error.UND_MOCK_ERR_MOCK_NOT_MATCHED");
let MockNotMatchedError$1 = class MockNotMatchedError extends UndiciError$1 {
  constructor(message) {
    super(message);
    __publicField(this, _T, true);
    Error.captureStackTrace(this, MockNotMatchedError);
    this.name = "MockNotMatchedError";
    this.message = message || "The request does not match any registered mock dispatches";
    this.code = "UND_MOCK_ERR_MOCK_NOT_MATCHED";
  }
  static [(_U = Symbol.hasInstance, _T = kMockNotMatchedError, _U)](instance) {
    return instance && instance[kMockNotMatchedError] === true;
  }
};
var mockErrors = {
  MockNotMatchedError: MockNotMatchedError$1
};
const { MockNotMatchedError: MockNotMatchedError2 } = mockErrors;
const { STATUS_CODES } = require$$2;
const {
  types: {
    isPromise
  }
} = require$$0$4;
const { InvalidArgumentError: InvalidArgumentError$7 } = errors$1;
const { promisify: promisify$1 } = require$$0$4;
const { InvalidArgumentError: InvalidArgumentError$6 } = errors$1;
const { promisify } = require$$0$4;
const { InvalidArgumentError: InvalidArgumentError$5 } = errors$1;
const { Transform } = require$$0$2;
const { Console } = require$$1$3;
process.versions.icu ? "✅" : "Y ";
process.versions.icu ? "❌" : "N ";
const { InvalidArgumentError: InvalidArgumentError$4, UndiciError: UndiciError2 } = errors$1;
const globalDispatcher = Symbol.for("undici.globalDispatcher.1");
const { InvalidArgumentError: InvalidArgumentError$3 } = errors$1;
const Agent$1 = agent;
if (getGlobalDispatcher$1() === void 0) {
  setGlobalDispatcher$1(new Agent$1());
}
function setGlobalDispatcher$1(agent2) {
  if (!agent2 || typeof agent2.dispatch !== "function") {
    throw new InvalidArgumentError$3("Argument agent must implement Agent");
  }
  Object.defineProperty(globalThis, globalDispatcher, {
    value: agent2,
    writable: true,
    enumerable: false,
    configurable: false
  });
}
function getGlobalDispatcher$1() {
  return globalThis[globalDispatcher];
}
var global$1 = {
  setGlobalDispatcher: setGlobalDispatcher$1,
  getGlobalDispatcher: getGlobalDispatcher$1
};
const { InvalidArgumentError: InvalidArgumentError$2, RequestAbortedError: RequestAbortedError2 } = errors$1;
const { isIP } = require$$0$3;
const { lookup } = require$$1$4;
const { InvalidArgumentError: InvalidArgumentError$1, InformationalError: InformationalError2 } = errors$1;
var headers;
var hasRequiredHeaders;
function requireHeaders() {
  var _guard, _headersList;
  if (hasRequiredHeaders) return headers;
  hasRequiredHeaders = 1;
  const { kConstruct: kConstruct2 } = symbols$4;
  const { kEnumerableProperty: kEnumerableProperty2 } = util$m;
  const {
    iteratorMixin,
    isValidHeaderName,
    isValidHeaderValue: isValidHeaderValue2
  } = requireUtil$5();
  const { webidl } = requireWebidl();
  const assert2 = require$$0$1;
  const util2 = require$$0$4;
  const kHeadersMap = Symbol("headers map");
  const kHeadersSortedMap = Symbol("headers map sorted");
  function isHTTPWhiteSpaceCharCode(code) {
    return code === 10 || code === 13 || code === 9 || code === 32;
  }
  function headerValueNormalize(potentialValue) {
    let i = 0;
    let j = potentialValue.length;
    while (j > i && isHTTPWhiteSpaceCharCode(potentialValue.charCodeAt(j - 1))) --j;
    while (j > i && isHTTPWhiteSpaceCharCode(potentialValue.charCodeAt(i))) ++i;
    return i === 0 && j === potentialValue.length ? potentialValue : potentialValue.substring(i, j);
  }
  function fill(headers2, object) {
    if (Array.isArray(object)) {
      for (let i = 0; i < object.length; ++i) {
        const header = object[i];
        if (header.length !== 2) {
          throw webidl.errors.exception({
            header: "Headers constructor",
            message: `expected name/value pair to be length 2, found ${header.length}.`
          });
        }
        appendHeader(headers2, header[0], header[1]);
      }
    } else if (typeof object === "object" && object !== null) {
      const keys = Object.keys(object);
      for (let i = 0; i < keys.length; ++i) {
        appendHeader(headers2, keys[i], object[keys[i]]);
      }
    } else {
      throw webidl.errors.conversionFailed({
        prefix: "Headers constructor",
        argument: "Argument 1",
        types: ["sequence<sequence<ByteString>>", "record<ByteString, ByteString>"]
      });
    }
  }
  function appendHeader(headers2, name, value) {
    value = headerValueNormalize(value);
    if (!isValidHeaderName(name)) {
      throw webidl.errors.invalidArgument({
        prefix: "Headers.append",
        value: name,
        type: "header name"
      });
    } else if (!isValidHeaderValue2(value)) {
      throw webidl.errors.invalidArgument({
        prefix: "Headers.append",
        value,
        type: "header value"
      });
    }
    if (getHeadersGuard(headers2) === "immutable") {
      throw new TypeError("immutable");
    }
    return getHeadersList(headers2).append(name, value, false);
  }
  function compareHeaderName(a, b) {
    return a[0] < b[0] ? -1 : 1;
  }
  class HeadersList {
    constructor(init) {
      /** @type {[string, string][]|null} */
      __publicField(this, "cookies", null);
      if (init instanceof HeadersList) {
        this[kHeadersMap] = new Map(init[kHeadersMap]);
        this[kHeadersSortedMap] = init[kHeadersSortedMap];
        this.cookies = init.cookies === null ? null : [...init.cookies];
      } else {
        this[kHeadersMap] = new Map(init);
        this[kHeadersSortedMap] = null;
      }
    }
    /**
     * @see https://fetch.spec.whatwg.org/#header-list-contains
     * @param {string} name
     * @param {boolean} isLowerCase
     */
    contains(name, isLowerCase) {
      return this[kHeadersMap].has(isLowerCase ? name : name.toLowerCase());
    }
    clear() {
      this[kHeadersMap].clear();
      this[kHeadersSortedMap] = null;
      this.cookies = null;
    }
    /**
     * @see https://fetch.spec.whatwg.org/#concept-header-list-append
     * @param {string} name
     * @param {string} value
     * @param {boolean} isLowerCase
     */
    append(name, value, isLowerCase) {
      this[kHeadersSortedMap] = null;
      const lowercaseName = isLowerCase ? name : name.toLowerCase();
      const exists = this[kHeadersMap].get(lowercaseName);
      if (exists) {
        const delimiter = lowercaseName === "cookie" ? "; " : ", ";
        this[kHeadersMap].set(lowercaseName, {
          name: exists.name,
          value: `${exists.value}${delimiter}${value}`
        });
      } else {
        this[kHeadersMap].set(lowercaseName, { name, value });
      }
      if (lowercaseName === "set-cookie") {
        (this.cookies ?? (this.cookies = [])).push(value);
      }
    }
    /**
     * @see https://fetch.spec.whatwg.org/#concept-header-list-set
     * @param {string} name
     * @param {string} value
     * @param {boolean} isLowerCase
     */
    set(name, value, isLowerCase) {
      this[kHeadersSortedMap] = null;
      const lowercaseName = isLowerCase ? name : name.toLowerCase();
      if (lowercaseName === "set-cookie") {
        this.cookies = [value];
      }
      this[kHeadersMap].set(lowercaseName, { name, value });
    }
    /**
     * @see https://fetch.spec.whatwg.org/#concept-header-list-delete
     * @param {string} name
     * @param {boolean} isLowerCase
     */
    delete(name, isLowerCase) {
      this[kHeadersSortedMap] = null;
      if (!isLowerCase) name = name.toLowerCase();
      if (name === "set-cookie") {
        this.cookies = null;
      }
      this[kHeadersMap].delete(name);
    }
    /**
     * @see https://fetch.spec.whatwg.org/#concept-header-list-get
     * @param {string} name
     * @param {boolean} isLowerCase
     * @returns {string | null}
     */
    get(name, isLowerCase) {
      var _a2;
      return ((_a2 = this[kHeadersMap].get(isLowerCase ? name : name.toLowerCase())) == null ? void 0 : _a2.value) ?? null;
    }
    *[Symbol.iterator]() {
      for (const { 0: name, 1: { value } } of this[kHeadersMap]) {
        yield [name, value];
      }
    }
    get entries() {
      const headers2 = {};
      if (this[kHeadersMap].size !== 0) {
        for (const { name, value } of this[kHeadersMap].values()) {
          headers2[name] = value;
        }
      }
      return headers2;
    }
    rawValues() {
      return this[kHeadersMap].values();
    }
    get entriesList() {
      const headers2 = [];
      if (this[kHeadersMap].size !== 0) {
        for (const { 0: lowerName, 1: { name, value } } of this[kHeadersMap]) {
          if (lowerName === "set-cookie") {
            for (const cookie of this.cookies) {
              headers2.push([name, cookie]);
            }
          } else {
            headers2.push([name, value]);
          }
        }
      }
      return headers2;
    }
    // https://fetch.spec.whatwg.org/#convert-header-names-to-a-sorted-lowercase-set
    toSortedArray() {
      const size = this[kHeadersMap].size;
      const array = new Array(size);
      if (size <= 32) {
        if (size === 0) {
          return array;
        }
        const iterator = this[kHeadersMap][Symbol.iterator]();
        const firstValue = iterator.next().value;
        array[0] = [firstValue[0], firstValue[1].value];
        assert2(firstValue[1].value !== null);
        for (let i = 1, j = 0, right = 0, left = 0, pivot = 0, x, value; i < size; ++i) {
          value = iterator.next().value;
          x = array[i] = [value[0], value[1].value];
          assert2(x[1] !== null);
          left = 0;
          right = i;
          while (left < right) {
            pivot = left + (right - left >> 1);
            if (array[pivot][0] <= x[0]) {
              left = pivot + 1;
            } else {
              right = pivot;
            }
          }
          if (i !== pivot) {
            j = i;
            while (j > left) {
              array[j] = array[--j];
            }
            array[left] = x;
          }
        }
        if (!iterator.next().done) {
          throw new TypeError("Unreachable");
        }
        return array;
      } else {
        let i = 0;
        for (const { 0: name, 1: { value } } of this[kHeadersMap]) {
          array[i++] = [name, value];
          assert2(value !== null);
        }
        return array.sort(compareHeaderName);
      }
    }
  }
  const _Headers = class _Headers {
    constructor(init = void 0) {
      __privateAdd(this, _guard);
      __privateAdd(this, _headersList);
      webidl.util.markAsUncloneable(this);
      if (init === kConstruct2) {
        return;
      }
      __privateSet(this, _headersList, new HeadersList());
      __privateSet(this, _guard, "none");
      if (init !== void 0) {
        init = webidl.converters.HeadersInit(init, "Headers contructor", "init");
        fill(this, init);
      }
    }
    // https://fetch.spec.whatwg.org/#dom-headers-append
    append(name, value) {
      webidl.brandCheck(this, _Headers);
      webidl.argumentLengthCheck(arguments, 2, "Headers.append");
      const prefix = "Headers.append";
      name = webidl.converters.ByteString(name, prefix, "name");
      value = webidl.converters.ByteString(value, prefix, "value");
      return appendHeader(this, name, value);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-delete
    delete(name) {
      webidl.brandCheck(this, _Headers);
      webidl.argumentLengthCheck(arguments, 1, "Headers.delete");
      const prefix = "Headers.delete";
      name = webidl.converters.ByteString(name, prefix, "name");
      if (!isValidHeaderName(name)) {
        throw webidl.errors.invalidArgument({
          prefix: "Headers.delete",
          value: name,
          type: "header name"
        });
      }
      if (__privateGet(this, _guard) === "immutable") {
        throw new TypeError("immutable");
      }
      if (!__privateGet(this, _headersList).contains(name, false)) {
        return;
      }
      __privateGet(this, _headersList).delete(name, false);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-get
    get(name) {
      webidl.brandCheck(this, _Headers);
      webidl.argumentLengthCheck(arguments, 1, "Headers.get");
      const prefix = "Headers.get";
      name = webidl.converters.ByteString(name, prefix, "name");
      if (!isValidHeaderName(name)) {
        throw webidl.errors.invalidArgument({
          prefix,
          value: name,
          type: "header name"
        });
      }
      return __privateGet(this, _headersList).get(name, false);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-has
    has(name) {
      webidl.brandCheck(this, _Headers);
      webidl.argumentLengthCheck(arguments, 1, "Headers.has");
      const prefix = "Headers.has";
      name = webidl.converters.ByteString(name, prefix, "name");
      if (!isValidHeaderName(name)) {
        throw webidl.errors.invalidArgument({
          prefix,
          value: name,
          type: "header name"
        });
      }
      return __privateGet(this, _headersList).contains(name, false);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-set
    set(name, value) {
      webidl.brandCheck(this, _Headers);
      webidl.argumentLengthCheck(arguments, 2, "Headers.set");
      const prefix = "Headers.set";
      name = webidl.converters.ByteString(name, prefix, "name");
      value = webidl.converters.ByteString(value, prefix, "value");
      value = headerValueNormalize(value);
      if (!isValidHeaderName(name)) {
        throw webidl.errors.invalidArgument({
          prefix,
          value: name,
          type: "header name"
        });
      } else if (!isValidHeaderValue2(value)) {
        throw webidl.errors.invalidArgument({
          prefix,
          value,
          type: "header value"
        });
      }
      if (__privateGet(this, _guard) === "immutable") {
        throw new TypeError("immutable");
      }
      __privateGet(this, _headersList).set(name, value, false);
    }
    // https://fetch.spec.whatwg.org/#dom-headers-getsetcookie
    getSetCookie() {
      webidl.brandCheck(this, _Headers);
      const list = __privateGet(this, _headersList).cookies;
      if (list) {
        return [...list];
      }
      return [];
    }
    // https://fetch.spec.whatwg.org/#concept-header-list-sort-and-combine
    get [kHeadersSortedMap]() {
      if (__privateGet(this, _headersList)[kHeadersSortedMap]) {
        return __privateGet(this, _headersList)[kHeadersSortedMap];
      }
      const headers2 = [];
      const names = __privateGet(this, _headersList).toSortedArray();
      const cookies2 = __privateGet(this, _headersList).cookies;
      if (cookies2 === null || cookies2.length === 1) {
        return __privateGet(this, _headersList)[kHeadersSortedMap] = names;
      }
      for (let i = 0; i < names.length; ++i) {
        const { 0: name, 1: value } = names[i];
        if (name === "set-cookie") {
          for (let j = 0; j < cookies2.length; ++j) {
            headers2.push([name, cookies2[j]]);
          }
        } else {
          headers2.push([name, value]);
        }
      }
      return __privateGet(this, _headersList)[kHeadersSortedMap] = headers2;
    }
    [util2.inspect.custom](depth, options) {
      options.depth ?? (options.depth = depth);
      return `Headers ${util2.formatWithOptions(options, __privateGet(this, _headersList).entries)}`;
    }
    static getHeadersGuard(o) {
      return __privateGet(o, _guard);
    }
    static setHeadersGuard(o, guard) {
      __privateSet(o, _guard, guard);
    }
    static getHeadersList(o) {
      return __privateGet(o, _headersList);
    }
    static setHeadersList(o, list) {
      __privateSet(o, _headersList, list);
    }
  };
  _guard = new WeakMap();
  _headersList = new WeakMap();
  let Headers = _Headers;
  const { getHeadersGuard, setHeadersGuard, getHeadersList, setHeadersList } = Headers;
  Reflect.deleteProperty(Headers, "getHeadersGuard");
  Reflect.deleteProperty(Headers, "setHeadersGuard");
  Reflect.deleteProperty(Headers, "getHeadersList");
  Reflect.deleteProperty(Headers, "setHeadersList");
  iteratorMixin("Headers", Headers, kHeadersSortedMap, 0, 1);
  Object.defineProperties(Headers.prototype, {
    append: kEnumerableProperty2,
    delete: kEnumerableProperty2,
    get: kEnumerableProperty2,
    has: kEnumerableProperty2,
    set: kEnumerableProperty2,
    getSetCookie: kEnumerableProperty2,
    [Symbol.toStringTag]: {
      value: "Headers",
      configurable: true
    },
    [util2.inspect.custom]: {
      enumerable: false
    }
  });
  webidl.converters.HeadersInit = function(V, prefix, argument) {
    if (webidl.util.Type(V) === "Object") {
      const iterator = Reflect.get(V, Symbol.iterator);
      if (!util2.types.isProxy(V) && iterator === Headers.prototype.entries) {
        try {
          return getHeadersList(V).entriesList;
        } catch {
        }
      }
      if (typeof iterator === "function") {
        return webidl.converters["sequence<sequence<ByteString>>"](V, prefix, argument, iterator.bind(V));
      }
      return webidl.converters["record<ByteString, ByteString>"](V, prefix, argument);
    }
    throw webidl.errors.conversionFailed({
      prefix: "Headers constructor",
      argument: "Argument 1",
      types: ["sequence<sequence<ByteString>>", "record<ByteString, ByteString>"]
    });
  };
  headers = {
    fill,
    // for test.
    compareHeaderName,
    Headers,
    HeadersList,
    getHeadersGuard,
    setHeadersGuard,
    setHeadersList,
    getHeadersList
  };
  return headers;
}
var response;
var hasRequiredResponse;
function requireResponse() {
  if (hasRequiredResponse) return response;
  hasRequiredResponse = 1;
  const { Headers, HeadersList, fill, getHeadersGuard, setHeadersGuard, setHeadersList } = requireHeaders();
  const { extractBody: extractBody2, cloneBody, mixinBody, hasFinalizationRegistry, streamRegistry, bodyUnusable } = requireBody();
  const util2 = util$m;
  const nodeUtil2 = require$$0$4;
  const { kEnumerableProperty: kEnumerableProperty2 } = util2;
  const {
    isValidReasonPhrase,
    isCancelled,
    isAborted,
    isBlobLike: isBlobLike2,
    serializeJavascriptValueToJSONString,
    isErrorLike,
    isomorphicEncode,
    environmentSettingsObject: relevantRealm
  } = requireUtil$5();
  const {
    redirectStatusSet,
    nullBodyStatus
  } = requireConstants$2();
  const { kState, kHeaders } = requireSymbols$3();
  const { webidl } = requireWebidl();
  const { FormData } = requireFormdata();
  const { URLSerializer } = requireDataUrl();
  const { kConstruct: kConstruct2 } = symbols$4;
  const assert2 = require$$0$1;
  const { types } = require$$0$4;
  const textEncoder = new TextEncoder("utf-8");
  class Response {
    // Creates network error Response.
    static error() {
      const responseObject = fromInnerResponse(makeNetworkError(), "immutable");
      return responseObject;
    }
    // https://fetch.spec.whatwg.org/#dom-response-json
    static json(data, init = {}) {
      webidl.argumentLengthCheck(arguments, 1, "Response.json");
      if (init !== null) {
        init = webidl.converters.ResponseInit(init);
      }
      const bytes = textEncoder.encode(
        serializeJavascriptValueToJSONString(data)
      );
      const body2 = extractBody2(bytes);
      const responseObject = fromInnerResponse(makeResponse({}), "response");
      initializeResponse(responseObject, init, { body: body2[0], type: "application/json" });
      return responseObject;
    }
    // Creates a redirect Response that redirects to url with status status.
    static redirect(url, status = 302) {
      webidl.argumentLengthCheck(arguments, 1, "Response.redirect");
      url = webidl.converters.USVString(url);
      status = webidl.converters["unsigned short"](status);
      let parsedURL;
      try {
        parsedURL = new URL(url, relevantRealm.settingsObject.baseUrl);
      } catch (err) {
        throw new TypeError(`Failed to parse URL from ${url}`, { cause: err });
      }
      if (!redirectStatusSet.has(status)) {
        throw new RangeError(`Invalid status code ${status}`);
      }
      const responseObject = fromInnerResponse(makeResponse({}), "immutable");
      responseObject[kState].status = status;
      const value = isomorphicEncode(URLSerializer(parsedURL));
      responseObject[kState].headersList.append("location", value, true);
      return responseObject;
    }
    // https://fetch.spec.whatwg.org/#dom-response
    constructor(body2 = null, init = {}) {
      webidl.util.markAsUncloneable(this);
      if (body2 === kConstruct2) {
        return;
      }
      if (body2 !== null) {
        body2 = webidl.converters.BodyInit(body2);
      }
      init = webidl.converters.ResponseInit(init);
      this[kState] = makeResponse({});
      this[kHeaders] = new Headers(kConstruct2);
      setHeadersGuard(this[kHeaders], "response");
      setHeadersList(this[kHeaders], this[kState].headersList);
      let bodyWithType = null;
      if (body2 != null) {
        const [extractedBody, type] = extractBody2(body2);
        bodyWithType = { body: extractedBody, type };
      }
      initializeResponse(this, init, bodyWithType);
    }
    // Returns response’s type, e.g., "cors".
    get type() {
      webidl.brandCheck(this, Response);
      return this[kState].type;
    }
    // Returns response’s URL, if it has one; otherwise the empty string.
    get url() {
      webidl.brandCheck(this, Response);
      const urlList = this[kState].urlList;
      const url = urlList[urlList.length - 1] ?? null;
      if (url === null) {
        return "";
      }
      return URLSerializer(url, true);
    }
    // Returns whether response was obtained through a redirect.
    get redirected() {
      webidl.brandCheck(this, Response);
      return this[kState].urlList.length > 1;
    }
    // Returns response’s status.
    get status() {
      webidl.brandCheck(this, Response);
      return this[kState].status;
    }
    // Returns whether response’s status is an ok status.
    get ok() {
      webidl.brandCheck(this, Response);
      return this[kState].status >= 200 && this[kState].status <= 299;
    }
    // Returns response’s status message.
    get statusText() {
      webidl.brandCheck(this, Response);
      return this[kState].statusText;
    }
    // Returns response’s headers as Headers.
    get headers() {
      webidl.brandCheck(this, Response);
      return this[kHeaders];
    }
    get body() {
      webidl.brandCheck(this, Response);
      return this[kState].body ? this[kState].body.stream : null;
    }
    get bodyUsed() {
      webidl.brandCheck(this, Response);
      return !!this[kState].body && util2.isDisturbed(this[kState].body.stream);
    }
    // Returns a clone of response.
    clone() {
      var _a2;
      webidl.brandCheck(this, Response);
      if (bodyUnusable(this)) {
        throw webidl.errors.exception({
          header: "Response.clone",
          message: "Body has already been consumed."
        });
      }
      const clonedResponse = cloneResponse(this[kState]);
      if (hasFinalizationRegistry && ((_a2 = this[kState].body) == null ? void 0 : _a2.stream)) {
        streamRegistry.register(this, new WeakRef(this[kState].body.stream));
      }
      return fromInnerResponse(clonedResponse, getHeadersGuard(this[kHeaders]));
    }
    [nodeUtil2.inspect.custom](depth, options) {
      if (options.depth === null) {
        options.depth = 2;
      }
      options.colors ?? (options.colors = true);
      const properties = {
        status: this.status,
        statusText: this.statusText,
        headers: this.headers,
        body: this.body,
        bodyUsed: this.bodyUsed,
        ok: this.ok,
        redirected: this.redirected,
        type: this.type,
        url: this.url
      };
      return `Response ${nodeUtil2.formatWithOptions(options, properties)}`;
    }
  }
  mixinBody(Response);
  Object.defineProperties(Response.prototype, {
    type: kEnumerableProperty2,
    url: kEnumerableProperty2,
    status: kEnumerableProperty2,
    ok: kEnumerableProperty2,
    redirected: kEnumerableProperty2,
    statusText: kEnumerableProperty2,
    headers: kEnumerableProperty2,
    clone: kEnumerableProperty2,
    body: kEnumerableProperty2,
    bodyUsed: kEnumerableProperty2,
    [Symbol.toStringTag]: {
      value: "Response",
      configurable: true
    }
  });
  Object.defineProperties(Response, {
    json: kEnumerableProperty2,
    redirect: kEnumerableProperty2,
    error: kEnumerableProperty2
  });
  function cloneResponse(response2) {
    if (response2.internalResponse) {
      return filterResponse(
        cloneResponse(response2.internalResponse),
        response2.type
      );
    }
    const newResponse = makeResponse({ ...response2, body: null });
    if (response2.body != null) {
      newResponse.body = cloneBody(newResponse, response2.body);
    }
    return newResponse;
  }
  function makeResponse(init) {
    return {
      aborted: false,
      rangeRequested: false,
      timingAllowPassed: false,
      requestIncludesCredentials: false,
      type: "default",
      status: 200,
      timingInfo: null,
      cacheState: "",
      statusText: "",
      ...init,
      headersList: (init == null ? void 0 : init.headersList) ? new HeadersList(init == null ? void 0 : init.headersList) : new HeadersList(),
      urlList: (init == null ? void 0 : init.urlList) ? [...init.urlList] : []
    };
  }
  function makeNetworkError(reason) {
    const isError = isErrorLike(reason);
    return makeResponse({
      type: "error",
      status: 0,
      error: isError ? reason : new Error(reason ? String(reason) : reason),
      aborted: reason && reason.name === "AbortError"
    });
  }
  function isNetworkError(response2) {
    return (
      // A network error is a response whose type is "error",
      response2.type === "error" && // status is 0
      response2.status === 0
    );
  }
  function makeFilteredResponse(response2, state) {
    state = {
      internalResponse: response2,
      ...state
    };
    return new Proxy(response2, {
      get(target, p) {
        return p in state ? state[p] : target[p];
      },
      set(target, p, value) {
        assert2(!(p in state));
        target[p] = value;
        return true;
      }
    });
  }
  function filterResponse(response2, type) {
    if (type === "basic") {
      return makeFilteredResponse(response2, {
        type: "basic",
        headersList: response2.headersList
      });
    } else if (type === "cors") {
      return makeFilteredResponse(response2, {
        type: "cors",
        headersList: response2.headersList
      });
    } else if (type === "opaque") {
      return makeFilteredResponse(response2, {
        type: "opaque",
        urlList: Object.freeze([]),
        status: 0,
        statusText: "",
        body: null
      });
    } else if (type === "opaqueredirect") {
      return makeFilteredResponse(response2, {
        type: "opaqueredirect",
        status: 0,
        statusText: "",
        headersList: [],
        body: null
      });
    } else {
      assert2(false);
    }
  }
  function makeAppropriateNetworkError(fetchParams, err = null) {
    assert2(isCancelled(fetchParams));
    return isAborted(fetchParams) ? makeNetworkError(Object.assign(new DOMException("The operation was aborted.", "AbortError"), { cause: err })) : makeNetworkError(Object.assign(new DOMException("Request was cancelled."), { cause: err }));
  }
  function initializeResponse(response2, init, body2) {
    if (init.status !== null && (init.status < 200 || init.status > 599)) {
      throw new RangeError('init["status"] must be in the range of 200 to 599, inclusive.');
    }
    if ("statusText" in init && init.statusText != null) {
      if (!isValidReasonPhrase(String(init.statusText))) {
        throw new TypeError("Invalid statusText");
      }
    }
    if ("status" in init && init.status != null) {
      response2[kState].status = init.status;
    }
    if ("statusText" in init && init.statusText != null) {
      response2[kState].statusText = init.statusText;
    }
    if ("headers" in init && init.headers != null) {
      fill(response2[kHeaders], init.headers);
    }
    if (body2) {
      if (nullBodyStatus.includes(response2.status)) {
        throw webidl.errors.exception({
          header: "Response constructor",
          message: `Invalid response status code ${response2.status}`
        });
      }
      response2[kState].body = body2.body;
      if (body2.type != null && !response2[kState].headersList.contains("content-type", true)) {
        response2[kState].headersList.append("content-type", body2.type, true);
      }
    }
  }
  function fromInnerResponse(innerResponse, guard) {
    var _a2;
    const response2 = new Response(kConstruct2);
    response2[kState] = innerResponse;
    response2[kHeaders] = new Headers(kConstruct2);
    setHeadersList(response2[kHeaders], innerResponse.headersList);
    setHeadersGuard(response2[kHeaders], guard);
    if (hasFinalizationRegistry && ((_a2 = innerResponse.body) == null ? void 0 : _a2.stream)) {
      streamRegistry.register(response2, new WeakRef(innerResponse.body.stream));
    }
    return response2;
  }
  webidl.converters.ReadableStream = webidl.interfaceConverter(
    ReadableStream
  );
  webidl.converters.FormData = webidl.interfaceConverter(
    FormData
  );
  webidl.converters.URLSearchParams = webidl.interfaceConverter(
    URLSearchParams
  );
  webidl.converters.XMLHttpRequestBodyInit = function(V, prefix, name) {
    if (typeof V === "string") {
      return webidl.converters.USVString(V, prefix, name);
    }
    if (isBlobLike2(V)) {
      return webidl.converters.Blob(V, prefix, name, { strict: false });
    }
    if (ArrayBuffer.isView(V) || types.isArrayBuffer(V)) {
      return webidl.converters.BufferSource(V, prefix, name);
    }
    if (util2.isFormDataLike(V)) {
      return webidl.converters.FormData(V, prefix, name, { strict: false });
    }
    if (V instanceof URLSearchParams) {
      return webidl.converters.URLSearchParams(V, prefix, name);
    }
    return webidl.converters.DOMString(V, prefix, name);
  };
  webidl.converters.BodyInit = function(V, prefix, argument) {
    if (V instanceof ReadableStream) {
      return webidl.converters.ReadableStream(V, prefix, argument);
    }
    if (V == null ? void 0 : V[Symbol.asyncIterator]) {
      return V;
    }
    return webidl.converters.XMLHttpRequestBodyInit(V, prefix, argument);
  };
  webidl.converters.ResponseInit = webidl.dictionaryConverter([
    {
      key: "status",
      converter: webidl.converters["unsigned short"],
      defaultValue: () => 200
    },
    {
      key: "statusText",
      converter: webidl.converters.ByteString,
      defaultValue: () => ""
    },
    {
      key: "headers",
      converter: webidl.converters.HeadersInit
    }
  ]);
  response = {
    isNetworkError,
    makeNetworkError,
    makeResponse,
    makeAppropriateNetworkError,
    filterResponse,
    Response,
    cloneResponse,
    fromInnerResponse
  };
  return response;
}
var dispatcherWeakref;
var hasRequiredDispatcherWeakref;
function requireDispatcherWeakref() {
  if (hasRequiredDispatcherWeakref) return dispatcherWeakref;
  hasRequiredDispatcherWeakref = 1;
  const { kConnected: kConnected2, kSize: kSize2 } = symbols$4;
  class CompatWeakRef {
    constructor(value) {
      this.value = value;
    }
    deref() {
      return this.value[kConnected2] === 0 && this.value[kSize2] === 0 ? void 0 : this.value;
    }
  }
  class CompatFinalizer {
    constructor(finalizer) {
      this.finalizer = finalizer;
    }
    register(dispatcher2, key2) {
      if (dispatcher2.on) {
        dispatcher2.on("disconnect", () => {
          if (dispatcher2[kConnected2] === 0 && dispatcher2[kSize2] === 0) {
            this.finalizer(key2);
          }
        });
      }
    }
    unregister(key2) {
    }
  }
  dispatcherWeakref = function() {
    if (process.env.NODE_V8_COVERAGE && process.version.startsWith("v18")) {
      process._rawDebug("Using compatibility WeakRef and FinalizationRegistry");
      return {
        WeakRef: CompatWeakRef,
        FinalizationRegistry: CompatFinalizer
      };
    }
    return { WeakRef, FinalizationRegistry };
  };
  return dispatcherWeakref;
}
var request$1;
var hasRequiredRequest;
function requireRequest() {
  if (hasRequiredRequest) return request$1;
  hasRequiredRequest = 1;
  const { extractBody: extractBody2, mixinBody, cloneBody, bodyUnusable } = requireBody();
  const { Headers, fill: fillHeaders, HeadersList, setHeadersGuard, getHeadersGuard, setHeadersList, getHeadersList } = requireHeaders();
  const { FinalizationRegistry: FinalizationRegistry2 } = requireDispatcherWeakref()();
  const util2 = util$m;
  const nodeUtil2 = require$$0$4;
  const {
    isValidHTTPToken: isValidHTTPToken2,
    sameOrigin,
    environmentSettingsObject
  } = requireUtil$5();
  const {
    forbiddenMethodsSet,
    corsSafeListedMethodsSet,
    referrerPolicy,
    requestRedirect,
    requestMode,
    requestCredentials,
    requestCache,
    requestDuplex
  } = requireConstants$2();
  const { kEnumerableProperty: kEnumerableProperty2, normalizedMethodRecordsBase: normalizedMethodRecordsBase2, normalizedMethodRecords: normalizedMethodRecords2 } = util2;
  const { kHeaders, kSignal: kSignal2, kState, kDispatcher } = requireSymbols$3();
  const { webidl } = requireWebidl();
  const { URLSerializer } = requireDataUrl();
  const { kConstruct: kConstruct2 } = symbols$4;
  const assert2 = require$$0$1;
  const { getMaxListeners, setMaxListeners, getEventListeners, defaultMaxListeners } = require$$8;
  const kAbortController = Symbol("abortController");
  const requestFinalizer = new FinalizationRegistry2(({ signal, abort: abort2 }) => {
    signal.removeEventListener("abort", abort2);
  });
  const dependentControllerMap = /* @__PURE__ */ new WeakMap();
  function buildAbort(acRef) {
    return abort2;
    function abort2() {
      const ac = acRef.deref();
      if (ac !== void 0) {
        requestFinalizer.unregister(abort2);
        this.removeEventListener("abort", abort2);
        ac.abort(this.reason);
        const controllerList = dependentControllerMap.get(ac.signal);
        if (controllerList !== void 0) {
          if (controllerList.size !== 0) {
            for (const ref of controllerList) {
              const ctrl = ref.deref();
              if (ctrl !== void 0) {
                ctrl.abort(this.reason);
              }
            }
            controllerList.clear();
          }
          dependentControllerMap.delete(ac.signal);
        }
      }
    }
  }
  let patchMethodWarning = false;
  class Request3 {
    // https://fetch.spec.whatwg.org/#dom-request
    constructor(input, init = {}) {
      var _a2, _b2;
      webidl.util.markAsUncloneable(this);
      if (input === kConstruct2) {
        return;
      }
      const prefix = "Request constructor";
      webidl.argumentLengthCheck(arguments, 1, prefix);
      input = webidl.converters.RequestInfo(input, prefix, "input");
      init = webidl.converters.RequestInit(init, prefix, "init");
      let request2 = null;
      let fallbackMode = null;
      const baseUrl = environmentSettingsObject.settingsObject.baseUrl;
      let signal = null;
      if (typeof input === "string") {
        this[kDispatcher] = init.dispatcher;
        let parsedURL;
        try {
          parsedURL = new URL(input, baseUrl);
        } catch (err) {
          throw new TypeError("Failed to parse URL from " + input, { cause: err });
        }
        if (parsedURL.username || parsedURL.password) {
          throw new TypeError(
            "Request cannot be constructed from a URL that includes credentials: " + input
          );
        }
        request2 = makeRequest({ urlList: [parsedURL] });
        fallbackMode = "cors";
      } else {
        this[kDispatcher] = init.dispatcher || input[kDispatcher];
        assert2(input instanceof Request3);
        request2 = input[kState];
        signal = input[kSignal2];
      }
      const origin = environmentSettingsObject.settingsObject.origin;
      let window2 = "client";
      if (((_b2 = (_a2 = request2.window) == null ? void 0 : _a2.constructor) == null ? void 0 : _b2.name) === "EnvironmentSettingsObject" && sameOrigin(request2.window, origin)) {
        window2 = request2.window;
      }
      if (init.window != null) {
        throw new TypeError(`'window' option '${window2}' must be null`);
      }
      if ("window" in init) {
        window2 = "no-window";
      }
      request2 = makeRequest({
        // URL request’s URL.
        // undici implementation note: this is set as the first item in request's urlList in makeRequest
        // method request’s method.
        method: request2.method,
        // header list A copy of request’s header list.
        // undici implementation note: headersList is cloned in makeRequest
        headersList: request2.headersList,
        // unsafe-request flag Set.
        unsafeRequest: request2.unsafeRequest,
        // client This’s relevant settings object.
        client: environmentSettingsObject.settingsObject,
        // window window.
        window: window2,
        // priority request’s priority.
        priority: request2.priority,
        // origin request’s origin. The propagation of the origin is only significant for navigation requests
        // being handled by a service worker. In this scenario a request can have an origin that is different
        // from the current client.
        origin: request2.origin,
        // referrer request’s referrer.
        referrer: request2.referrer,
        // referrer policy request’s referrer policy.
        referrerPolicy: request2.referrerPolicy,
        // mode request’s mode.
        mode: request2.mode,
        // credentials mode request’s credentials mode.
        credentials: request2.credentials,
        // cache mode request’s cache mode.
        cache: request2.cache,
        // redirect mode request’s redirect mode.
        redirect: request2.redirect,
        // integrity metadata request’s integrity metadata.
        integrity: request2.integrity,
        // keepalive request’s keepalive.
        keepalive: request2.keepalive,
        // reload-navigation flag request’s reload-navigation flag.
        reloadNavigation: request2.reloadNavigation,
        // history-navigation flag request’s history-navigation flag.
        historyNavigation: request2.historyNavigation,
        // URL list A clone of request’s URL list.
        urlList: [...request2.urlList]
      });
      const initHasKey = Object.keys(init).length !== 0;
      if (initHasKey) {
        if (request2.mode === "navigate") {
          request2.mode = "same-origin";
        }
        request2.reloadNavigation = false;
        request2.historyNavigation = false;
        request2.origin = "client";
        request2.referrer = "client";
        request2.referrerPolicy = "";
        request2.url = request2.urlList[request2.urlList.length - 1];
        request2.urlList = [request2.url];
      }
      if (init.referrer !== void 0) {
        const referrer = init.referrer;
        if (referrer === "") {
          request2.referrer = "no-referrer";
        } else {
          let parsedReferrer;
          try {
            parsedReferrer = new URL(referrer, baseUrl);
          } catch (err) {
            throw new TypeError(`Referrer "${referrer}" is not a valid URL.`, { cause: err });
          }
          if (parsedReferrer.protocol === "about:" && parsedReferrer.hostname === "client" || origin && !sameOrigin(parsedReferrer, environmentSettingsObject.settingsObject.baseUrl)) {
            request2.referrer = "client";
          } else {
            request2.referrer = parsedReferrer;
          }
        }
      }
      if (init.referrerPolicy !== void 0) {
        request2.referrerPolicy = init.referrerPolicy;
      }
      let mode;
      if (init.mode !== void 0) {
        mode = init.mode;
      } else {
        mode = fallbackMode;
      }
      if (mode === "navigate") {
        throw webidl.errors.exception({
          header: "Request constructor",
          message: "invalid request mode navigate."
        });
      }
      if (mode != null) {
        request2.mode = mode;
      }
      if (init.credentials !== void 0) {
        request2.credentials = init.credentials;
      }
      if (init.cache !== void 0) {
        request2.cache = init.cache;
      }
      if (request2.cache === "only-if-cached" && request2.mode !== "same-origin") {
        throw new TypeError(
          "'only-if-cached' can be set only with 'same-origin' mode"
        );
      }
      if (init.redirect !== void 0) {
        request2.redirect = init.redirect;
      }
      if (init.integrity != null) {
        request2.integrity = String(init.integrity);
      }
      if (init.keepalive !== void 0) {
        request2.keepalive = Boolean(init.keepalive);
      }
      if (init.method !== void 0) {
        let method = init.method;
        const mayBeNormalized = normalizedMethodRecords2[method];
        if (mayBeNormalized !== void 0) {
          request2.method = mayBeNormalized;
        } else {
          if (!isValidHTTPToken2(method)) {
            throw new TypeError(`'${method}' is not a valid HTTP method.`);
          }
          const upperCase = method.toUpperCase();
          if (forbiddenMethodsSet.has(upperCase)) {
            throw new TypeError(`'${method}' HTTP method is unsupported.`);
          }
          method = normalizedMethodRecordsBase2[upperCase] ?? method;
          request2.method = method;
        }
        if (!patchMethodWarning && request2.method === "patch") {
          process.emitWarning("Using `patch` is highly likely to result in a `405 Method Not Allowed`. `PATCH` is much more likely to succeed.", {
            code: "UNDICI-FETCH-patch"
          });
          patchMethodWarning = true;
        }
      }
      if (init.signal !== void 0) {
        signal = init.signal;
      }
      this[kState] = request2;
      const ac = new AbortController();
      this[kSignal2] = ac.signal;
      if (signal != null) {
        if (!signal || typeof signal.aborted !== "boolean" || typeof signal.addEventListener !== "function") {
          throw new TypeError(
            "Failed to construct 'Request': member signal is not of type AbortSignal."
          );
        }
        if (signal.aborted) {
          ac.abort(signal.reason);
        } else {
          this[kAbortController] = ac;
          const acRef = new WeakRef(ac);
          const abort2 = buildAbort(acRef);
          try {
            if (typeof getMaxListeners === "function" && getMaxListeners(signal) === defaultMaxListeners) {
              setMaxListeners(1500, signal);
            } else if (getEventListeners(signal, "abort").length >= defaultMaxListeners) {
              setMaxListeners(1500, signal);
            }
          } catch {
          }
          util2.addAbortListener(signal, abort2);
          requestFinalizer.register(ac, { signal, abort: abort2 }, abort2);
        }
      }
      this[kHeaders] = new Headers(kConstruct2);
      setHeadersList(this[kHeaders], request2.headersList);
      setHeadersGuard(this[kHeaders], "request");
      if (mode === "no-cors") {
        if (!corsSafeListedMethodsSet.has(request2.method)) {
          throw new TypeError(
            `'${request2.method} is unsupported in no-cors mode.`
          );
        }
        setHeadersGuard(this[kHeaders], "request-no-cors");
      }
      if (initHasKey) {
        const headersList = getHeadersList(this[kHeaders]);
        const headers2 = init.headers !== void 0 ? init.headers : new HeadersList(headersList);
        headersList.clear();
        if (headers2 instanceof HeadersList) {
          for (const { name, value } of headers2.rawValues()) {
            headersList.append(name, value, false);
          }
          headersList.cookies = headers2.cookies;
        } else {
          fillHeaders(this[kHeaders], headers2);
        }
      }
      const inputBody = input instanceof Request3 ? input[kState].body : null;
      if ((init.body != null || inputBody != null) && (request2.method === "GET" || request2.method === "HEAD")) {
        throw new TypeError("Request with GET/HEAD method cannot have body.");
      }
      let initBody = null;
      if (init.body != null) {
        const [extractedBody, contentType] = extractBody2(
          init.body,
          request2.keepalive
        );
        initBody = extractedBody;
        if (contentType && !getHeadersList(this[kHeaders]).contains("content-type", true)) {
          this[kHeaders].append("content-type", contentType);
        }
      }
      const inputOrInitBody = initBody ?? inputBody;
      if (inputOrInitBody != null && inputOrInitBody.source == null) {
        if (initBody != null && init.duplex == null) {
          throw new TypeError("RequestInit: duplex option is required when sending a body.");
        }
        if (request2.mode !== "same-origin" && request2.mode !== "cors") {
          throw new TypeError(
            'If request is made from ReadableStream, mode should be "same-origin" or "cors"'
          );
        }
        request2.useCORSPreflightFlag = true;
      }
      let finalBody = inputOrInitBody;
      if (initBody == null && inputBody != null) {
        if (bodyUnusable(input)) {
          throw new TypeError(
            "Cannot construct a Request with a Request object that has already been used."
          );
        }
        const identityTransform = new TransformStream();
        inputBody.stream.pipeThrough(identityTransform);
        finalBody = {
          source: inputBody.source,
          length: inputBody.length,
          stream: identityTransform.readable
        };
      }
      this[kState].body = finalBody;
    }
    // Returns request’s HTTP method, which is "GET" by default.
    get method() {
      webidl.brandCheck(this, Request3);
      return this[kState].method;
    }
    // Returns the URL of request as a string.
    get url() {
      webidl.brandCheck(this, Request3);
      return URLSerializer(this[kState].url);
    }
    // Returns a Headers object consisting of the headers associated with request.
    // Note that headers added in the network layer by the user agent will not
    // be accounted for in this object, e.g., the "Host" header.
    get headers() {
      webidl.brandCheck(this, Request3);
      return this[kHeaders];
    }
    // Returns the kind of resource requested by request, e.g., "document"
    // or "script".
    get destination() {
      webidl.brandCheck(this, Request3);
      return this[kState].destination;
    }
    // Returns the referrer of request. Its value can be a same-origin URL if
    // explicitly set in init, the empty string to indicate no referrer, and
    // "about:client" when defaulting to the global’s default. This is used
    // during fetching to determine the value of the `Referer` header of the
    // request being made.
    get referrer() {
      webidl.brandCheck(this, Request3);
      if (this[kState].referrer === "no-referrer") {
        return "";
      }
      if (this[kState].referrer === "client") {
        return "about:client";
      }
      return this[kState].referrer.toString();
    }
    // Returns the referrer policy associated with request.
    // This is used during fetching to compute the value of the request’s
    // referrer.
    get referrerPolicy() {
      webidl.brandCheck(this, Request3);
      return this[kState].referrerPolicy;
    }
    // Returns the mode associated with request, which is a string indicating
    // whether the request will use CORS, or will be restricted to same-origin
    // URLs.
    get mode() {
      webidl.brandCheck(this, Request3);
      return this[kState].mode;
    }
    // Returns the credentials mode associated with request,
    // which is a string indicating whether credentials will be sent with the
    // request always, never, or only when sent to a same-origin URL.
    get credentials() {
      return this[kState].credentials;
    }
    // Returns the cache mode associated with request,
    // which is a string indicating how the request will
    // interact with the browser’s cache when fetching.
    get cache() {
      webidl.brandCheck(this, Request3);
      return this[kState].cache;
    }
    // Returns the redirect mode associated with request,
    // which is a string indicating how redirects for the
    // request will be handled during fetching. A request
    // will follow redirects by default.
    get redirect() {
      webidl.brandCheck(this, Request3);
      return this[kState].redirect;
    }
    // Returns request’s subresource integrity metadata, which is a
    // cryptographic hash of the resource being fetched. Its value
    // consists of multiple hashes separated by whitespace. [SRI]
    get integrity() {
      webidl.brandCheck(this, Request3);
      return this[kState].integrity;
    }
    // Returns a boolean indicating whether or not request can outlive the
    // global in which it was created.
    get keepalive() {
      webidl.brandCheck(this, Request3);
      return this[kState].keepalive;
    }
    // Returns a boolean indicating whether or not request is for a reload
    // navigation.
    get isReloadNavigation() {
      webidl.brandCheck(this, Request3);
      return this[kState].reloadNavigation;
    }
    // Returns a boolean indicating whether or not request is for a history
    // navigation (a.k.a. back-forward navigation).
    get isHistoryNavigation() {
      webidl.brandCheck(this, Request3);
      return this[kState].historyNavigation;
    }
    // Returns the signal associated with request, which is an AbortSignal
    // object indicating whether or not request has been aborted, and its
    // abort event handler.
    get signal() {
      webidl.brandCheck(this, Request3);
      return this[kSignal2];
    }
    get body() {
      webidl.brandCheck(this, Request3);
      return this[kState].body ? this[kState].body.stream : null;
    }
    get bodyUsed() {
      webidl.brandCheck(this, Request3);
      return !!this[kState].body && util2.isDisturbed(this[kState].body.stream);
    }
    get duplex() {
      webidl.brandCheck(this, Request3);
      return "half";
    }
    // Returns a clone of request.
    clone() {
      webidl.brandCheck(this, Request3);
      if (bodyUnusable(this)) {
        throw new TypeError("unusable");
      }
      const clonedRequest = cloneRequest(this[kState]);
      const ac = new AbortController();
      if (this.signal.aborted) {
        ac.abort(this.signal.reason);
      } else {
        let list = dependentControllerMap.get(this.signal);
        if (list === void 0) {
          list = /* @__PURE__ */ new Set();
          dependentControllerMap.set(this.signal, list);
        }
        const acRef = new WeakRef(ac);
        list.add(acRef);
        util2.addAbortListener(
          ac.signal,
          buildAbort(acRef)
        );
      }
      return fromInnerRequest(clonedRequest, ac.signal, getHeadersGuard(this[kHeaders]));
    }
    [nodeUtil2.inspect.custom](depth, options) {
      if (options.depth === null) {
        options.depth = 2;
      }
      options.colors ?? (options.colors = true);
      const properties = {
        method: this.method,
        url: this.url,
        headers: this.headers,
        destination: this.destination,
        referrer: this.referrer,
        referrerPolicy: this.referrerPolicy,
        mode: this.mode,
        credentials: this.credentials,
        cache: this.cache,
        redirect: this.redirect,
        integrity: this.integrity,
        keepalive: this.keepalive,
        isReloadNavigation: this.isReloadNavigation,
        isHistoryNavigation: this.isHistoryNavigation,
        signal: this.signal
      };
      return `Request ${nodeUtil2.formatWithOptions(options, properties)}`;
    }
  }
  mixinBody(Request3);
  function makeRequest(init) {
    return {
      method: init.method ?? "GET",
      localURLsOnly: init.localURLsOnly ?? false,
      unsafeRequest: init.unsafeRequest ?? false,
      body: init.body ?? null,
      client: init.client ?? null,
      reservedClient: init.reservedClient ?? null,
      replacesClientId: init.replacesClientId ?? "",
      window: init.window ?? "client",
      keepalive: init.keepalive ?? false,
      serviceWorkers: init.serviceWorkers ?? "all",
      initiator: init.initiator ?? "",
      destination: init.destination ?? "",
      priority: init.priority ?? null,
      origin: init.origin ?? "client",
      policyContainer: init.policyContainer ?? "client",
      referrer: init.referrer ?? "client",
      referrerPolicy: init.referrerPolicy ?? "",
      mode: init.mode ?? "no-cors",
      useCORSPreflightFlag: init.useCORSPreflightFlag ?? false,
      credentials: init.credentials ?? "same-origin",
      useCredentials: init.useCredentials ?? false,
      cache: init.cache ?? "default",
      redirect: init.redirect ?? "follow",
      integrity: init.integrity ?? "",
      cryptoGraphicsNonceMetadata: init.cryptoGraphicsNonceMetadata ?? "",
      parserMetadata: init.parserMetadata ?? "",
      reloadNavigation: init.reloadNavigation ?? false,
      historyNavigation: init.historyNavigation ?? false,
      userActivation: init.userActivation ?? false,
      taintedOrigin: init.taintedOrigin ?? false,
      redirectCount: init.redirectCount ?? 0,
      responseTainting: init.responseTainting ?? "basic",
      preventNoCacheCacheControlHeaderModification: init.preventNoCacheCacheControlHeaderModification ?? false,
      done: init.done ?? false,
      timingAllowFailed: init.timingAllowFailed ?? false,
      urlList: init.urlList,
      url: init.urlList[0],
      headersList: init.headersList ? new HeadersList(init.headersList) : new HeadersList()
    };
  }
  function cloneRequest(request2) {
    const newRequest = makeRequest({ ...request2, body: null });
    if (request2.body != null) {
      newRequest.body = cloneBody(newRequest, request2.body);
    }
    return newRequest;
  }
  function fromInnerRequest(innerRequest, signal, guard) {
    const request2 = new Request3(kConstruct2);
    request2[kState] = innerRequest;
    request2[kSignal2] = signal;
    request2[kHeaders] = new Headers(kConstruct2);
    setHeadersList(request2[kHeaders], innerRequest.headersList);
    setHeadersGuard(request2[kHeaders], guard);
    return request2;
  }
  Object.defineProperties(Request3.prototype, {
    method: kEnumerableProperty2,
    url: kEnumerableProperty2,
    headers: kEnumerableProperty2,
    redirect: kEnumerableProperty2,
    clone: kEnumerableProperty2,
    signal: kEnumerableProperty2,
    duplex: kEnumerableProperty2,
    destination: kEnumerableProperty2,
    body: kEnumerableProperty2,
    bodyUsed: kEnumerableProperty2,
    isHistoryNavigation: kEnumerableProperty2,
    isReloadNavigation: kEnumerableProperty2,
    keepalive: kEnumerableProperty2,
    integrity: kEnumerableProperty2,
    cache: kEnumerableProperty2,
    credentials: kEnumerableProperty2,
    attribute: kEnumerableProperty2,
    referrerPolicy: kEnumerableProperty2,
    referrer: kEnumerableProperty2,
    mode: kEnumerableProperty2,
    [Symbol.toStringTag]: {
      value: "Request",
      configurable: true
    }
  });
  webidl.converters.Request = webidl.interfaceConverter(
    Request3
  );
  webidl.converters.RequestInfo = function(V, prefix, argument) {
    if (typeof V === "string") {
      return webidl.converters.USVString(V, prefix, argument);
    }
    if (V instanceof Request3) {
      return webidl.converters.Request(V, prefix, argument);
    }
    return webidl.converters.USVString(V, prefix, argument);
  };
  webidl.converters.AbortSignal = webidl.interfaceConverter(
    AbortSignal
  );
  webidl.converters.RequestInit = webidl.dictionaryConverter([
    {
      key: "method",
      converter: webidl.converters.ByteString
    },
    {
      key: "headers",
      converter: webidl.converters.HeadersInit
    },
    {
      key: "body",
      converter: webidl.nullableConverter(
        webidl.converters.BodyInit
      )
    },
    {
      key: "referrer",
      converter: webidl.converters.USVString
    },
    {
      key: "referrerPolicy",
      converter: webidl.converters.DOMString,
      // https://w3c.github.io/webappsec-referrer-policy/#referrer-policy
      allowedValues: referrerPolicy
    },
    {
      key: "mode",
      converter: webidl.converters.DOMString,
      // https://fetch.spec.whatwg.org/#concept-request-mode
      allowedValues: requestMode
    },
    {
      key: "credentials",
      converter: webidl.converters.DOMString,
      // https://fetch.spec.whatwg.org/#requestcredentials
      allowedValues: requestCredentials
    },
    {
      key: "cache",
      converter: webidl.converters.DOMString,
      // https://fetch.spec.whatwg.org/#requestcache
      allowedValues: requestCache
    },
    {
      key: "redirect",
      converter: webidl.converters.DOMString,
      // https://fetch.spec.whatwg.org/#requestredirect
      allowedValues: requestRedirect
    },
    {
      key: "integrity",
      converter: webidl.converters.DOMString
    },
    {
      key: "keepalive",
      converter: webidl.converters.boolean
    },
    {
      key: "signal",
      converter: webidl.nullableConverter(
        (signal) => webidl.converters.AbortSignal(
          signal,
          "RequestInit",
          "signal",
          { strict: false }
        )
      )
    },
    {
      key: "window",
      converter: webidl.converters.any
    },
    {
      key: "duplex",
      converter: webidl.converters.DOMString,
      allowedValues: requestDuplex
    },
    {
      key: "dispatcher",
      // undici specific option
      converter: webidl.converters.any
    }
  ]);
  request$1 = { Request: Request3, makeRequest, fromInnerRequest, cloneRequest };
  return request$1;
}
var fetch_1;
var hasRequiredFetch;
function requireFetch() {
  if (hasRequiredFetch) return fetch_1;
  hasRequiredFetch = 1;
  const {
    makeNetworkError,
    makeAppropriateNetworkError,
    filterResponse,
    makeResponse,
    fromInnerResponse
  } = requireResponse();
  const { HeadersList } = requireHeaders();
  const { Request: Request3, cloneRequest } = requireRequest();
  const zlib = require$$1$1;
  const {
    bytesMatch,
    makePolicyContainer,
    clonePolicyContainer,
    requestBadPort,
    TAOCheck,
    appendRequestOriginHeader,
    responseLocationURL,
    requestCurrentURL,
    setRequestReferrerPolicyOnRedirect,
    tryUpgradeRequestToAPotentiallyTrustworthyURL,
    createOpaqueTimingInfo,
    appendFetchMetadata,
    corsCheck,
    crossOriginResourcePolicyCheck,
    determineRequestsReferrer,
    coarsenedSharedCurrentTime,
    createDeferredPromise,
    isBlobLike: isBlobLike2,
    sameOrigin,
    isCancelled,
    isAborted,
    isErrorLike,
    fullyReadBody,
    readableStreamClose,
    isomorphicEncode,
    urlIsLocal,
    urlIsHttpHttpsScheme,
    urlHasHttpsScheme,
    clampAndCoarsenConnectionTimingInfo,
    simpleRangeHeaderValue,
    buildContentRange,
    createInflate,
    extractMimeType
  } = requireUtil$5();
  const { kState, kDispatcher } = requireSymbols$3();
  const assert2 = require$$0$1;
  const { safelyExtractBody, extractBody: extractBody2 } = requireBody();
  const {
    redirectStatusSet,
    nullBodyStatus,
    safeMethodsSet,
    requestBodyHeader,
    subresourceSet
  } = requireConstants$2();
  const EE2 = require$$8;
  const { Readable: Readable2, pipeline: pipeline2, finished: finished2 } = require$$0$2;
  const { addAbortListener: addAbortListener2, isErrored: isErrored2, isReadable: isReadable2, bufferToLowerCasedHeaderName: bufferToLowerCasedHeaderName2 } = util$m;
  const { dataURLProcessor, serializeAMimeType: serializeAMimeType2, minimizeSupportedMimeType } = requireDataUrl();
  const { getGlobalDispatcher: getGlobalDispatcher2 } = global$1;
  const { webidl } = requireWebidl();
  const { STATUS_CODES: STATUS_CODES2 } = require$$2;
  const GET_OR_HEAD = ["GET", "HEAD"];
  const defaultUserAgent = typeof __UNDICI_IS_NODE__ !== "undefined" || typeof esbuildDetection !== "undefined" ? "node" : "undici";
  let resolveObjectURL;
  class Fetch extends EE2 {
    constructor(dispatcher2) {
      super();
      this.dispatcher = dispatcher2;
      this.connection = null;
      this.dump = false;
      this.state = "ongoing";
    }
    terminate(reason) {
      var _a2;
      if (this.state !== "ongoing") {
        return;
      }
      this.state = "terminated";
      (_a2 = this.connection) == null ? void 0 : _a2.destroy(reason);
      this.emit("terminated", reason);
    }
    // https://fetch.spec.whatwg.org/#fetch-controller-abort
    abort(error) {
      var _a2;
      if (this.state !== "ongoing") {
        return;
      }
      this.state = "aborted";
      if (!error) {
        error = new DOMException("The operation was aborted.", "AbortError");
      }
      this.serializedAbortReason = error;
      (_a2 = this.connection) == null ? void 0 : _a2.destroy(error);
      this.emit("terminated", error);
    }
  }
  function handleFetchDone(response2) {
    finalizeAndReportTiming(response2, "fetch");
  }
  function fetch(input, init = void 0) {
    var _a2;
    webidl.argumentLengthCheck(arguments, 1, "globalThis.fetch");
    let p = createDeferredPromise();
    let requestObject;
    try {
      requestObject = new Request3(input, init);
    } catch (e) {
      p.reject(e);
      return p.promise;
    }
    const request2 = requestObject[kState];
    if (requestObject.signal.aborted) {
      abortFetch(p, request2, null, requestObject.signal.reason);
      return p.promise;
    }
    const globalObject = request2.client.globalObject;
    if (((_a2 = globalObject == null ? void 0 : globalObject.constructor) == null ? void 0 : _a2.name) === "ServiceWorkerGlobalScope") {
      request2.serviceWorkers = "none";
    }
    let responseObject = null;
    let locallyAborted = false;
    let controller = null;
    addAbortListener2(
      requestObject.signal,
      () => {
        locallyAborted = true;
        assert2(controller != null);
        controller.abort(requestObject.signal.reason);
        const realResponse = responseObject == null ? void 0 : responseObject.deref();
        abortFetch(p, request2, realResponse, requestObject.signal.reason);
      }
    );
    const processResponse = (response2) => {
      if (locallyAborted) {
        return;
      }
      if (response2.aborted) {
        abortFetch(p, request2, responseObject, controller.serializedAbortReason);
        return;
      }
      if (response2.type === "error") {
        p.reject(new TypeError("fetch failed", { cause: response2.error }));
        return;
      }
      responseObject = new WeakRef(fromInnerResponse(response2, "immutable"));
      p.resolve(responseObject.deref());
      p = null;
    };
    controller = fetching({
      request: request2,
      processResponseEndOfBody: handleFetchDone,
      processResponse,
      dispatcher: requestObject[kDispatcher]
      // undici
    });
    return p.promise;
  }
  function finalizeAndReportTiming(response2, initiatorType = "other") {
    var _a2;
    if (response2.type === "error" && response2.aborted) {
      return;
    }
    if (!((_a2 = response2.urlList) == null ? void 0 : _a2.length)) {
      return;
    }
    const originalURL = response2.urlList[0];
    let timingInfo = response2.timingInfo;
    let cacheState = response2.cacheState;
    if (!urlIsHttpHttpsScheme(originalURL)) {
      return;
    }
    if (timingInfo === null) {
      return;
    }
    if (!response2.timingAllowPassed) {
      timingInfo = createOpaqueTimingInfo({
        startTime: timingInfo.startTime
      });
      cacheState = "";
    }
    timingInfo.endTime = coarsenedSharedCurrentTime();
    response2.timingInfo = timingInfo;
    markResourceTiming(
      timingInfo,
      originalURL.href,
      initiatorType,
      globalThis,
      cacheState
    );
  }
  const markResourceTiming = performance.markResourceTiming;
  function abortFetch(p, request2, responseObject, error) {
    var _a2, _b2;
    if (p) {
      p.reject(error);
    }
    if (request2.body != null && isReadable2((_a2 = request2.body) == null ? void 0 : _a2.stream)) {
      request2.body.stream.cancel(error).catch((err) => {
        if (err.code === "ERR_INVALID_STATE") {
          return;
        }
        throw err;
      });
    }
    if (responseObject == null) {
      return;
    }
    const response2 = responseObject[kState];
    if (response2.body != null && isReadable2((_b2 = response2.body) == null ? void 0 : _b2.stream)) {
      response2.body.stream.cancel(error).catch((err) => {
        if (err.code === "ERR_INVALID_STATE") {
          return;
        }
        throw err;
      });
    }
  }
  function fetching({
    request: request2,
    processRequestBodyChunkLength,
    processRequestEndOfBody,
    processResponse,
    processResponseEndOfBody,
    processResponseConsumeBody,
    useParallelQueue = false,
    dispatcher: dispatcher2 = getGlobalDispatcher2()
    // undici
  }) {
    var _a2, _b2, _c2;
    assert2(dispatcher2);
    let taskDestination = null;
    let crossOriginIsolatedCapability = false;
    if (request2.client != null) {
      taskDestination = request2.client.globalObject;
      crossOriginIsolatedCapability = request2.client.crossOriginIsolatedCapability;
    }
    const currentTime = coarsenedSharedCurrentTime(crossOriginIsolatedCapability);
    const timingInfo = createOpaqueTimingInfo({
      startTime: currentTime
    });
    const fetchParams = {
      controller: new Fetch(dispatcher2),
      request: request2,
      timingInfo,
      processRequestBodyChunkLength,
      processRequestEndOfBody,
      processResponse,
      processResponseConsumeBody,
      processResponseEndOfBody,
      taskDestination,
      crossOriginIsolatedCapability
    };
    assert2(!request2.body || request2.body.stream);
    if (request2.window === "client") {
      request2.window = ((_c2 = (_b2 = (_a2 = request2.client) == null ? void 0 : _a2.globalObject) == null ? void 0 : _b2.constructor) == null ? void 0 : _c2.name) === "Window" ? request2.client : "no-window";
    }
    if (request2.origin === "client") {
      request2.origin = request2.client.origin;
    }
    if (request2.policyContainer === "client") {
      if (request2.client != null) {
        request2.policyContainer = clonePolicyContainer(
          request2.client.policyContainer
        );
      } else {
        request2.policyContainer = makePolicyContainer();
      }
    }
    if (!request2.headersList.contains("accept", true)) {
      const value = "*/*";
      request2.headersList.append("accept", value, true);
    }
    if (!request2.headersList.contains("accept-language", true)) {
      request2.headersList.append("accept-language", "*", true);
    }
    if (request2.priority === null) ;
    if (subresourceSet.has(request2.destination)) ;
    mainFetch(fetchParams).catch((err) => {
      fetchParams.controller.terminate(err);
    });
    return fetchParams.controller;
  }
  async function mainFetch(fetchParams, recursive = false) {
    const request2 = fetchParams.request;
    let response2 = null;
    if (request2.localURLsOnly && !urlIsLocal(requestCurrentURL(request2))) {
      response2 = makeNetworkError("local URLs only");
    }
    tryUpgradeRequestToAPotentiallyTrustworthyURL(request2);
    if (requestBadPort(request2) === "blocked") {
      response2 = makeNetworkError("bad port");
    }
    if (request2.referrerPolicy === "") {
      request2.referrerPolicy = request2.policyContainer.referrerPolicy;
    }
    if (request2.referrer !== "no-referrer") {
      request2.referrer = determineRequestsReferrer(request2);
    }
    if (response2 === null) {
      response2 = await (async () => {
        const currentURL = requestCurrentURL(request2);
        if (
          // - request’s current URL’s origin is same origin with request’s origin,
          //   and request’s response tainting is "basic"
          sameOrigin(currentURL, request2.url) && request2.responseTainting === "basic" || // request’s current URL’s scheme is "data"
          currentURL.protocol === "data:" || // - request’s mode is "navigate" or "websocket"
          (request2.mode === "navigate" || request2.mode === "websocket")
        ) {
          request2.responseTainting = "basic";
          return await schemeFetch(fetchParams);
        }
        if (request2.mode === "same-origin") {
          return makeNetworkError('request mode cannot be "same-origin"');
        }
        if (request2.mode === "no-cors") {
          if (request2.redirect !== "follow") {
            return makeNetworkError(
              'redirect mode cannot be "follow" for "no-cors" request'
            );
          }
          request2.responseTainting = "opaque";
          return await schemeFetch(fetchParams);
        }
        if (!urlIsHttpHttpsScheme(requestCurrentURL(request2))) {
          return makeNetworkError("URL scheme must be a HTTP(S) scheme");
        }
        request2.responseTainting = "cors";
        return await httpFetch(fetchParams);
      })();
    }
    if (recursive) {
      return response2;
    }
    if (response2.status !== 0 && !response2.internalResponse) {
      if (request2.responseTainting === "cors") ;
      if (request2.responseTainting === "basic") {
        response2 = filterResponse(response2, "basic");
      } else if (request2.responseTainting === "cors") {
        response2 = filterResponse(response2, "cors");
      } else if (request2.responseTainting === "opaque") {
        response2 = filterResponse(response2, "opaque");
      } else {
        assert2(false);
      }
    }
    let internalResponse = response2.status === 0 ? response2 : response2.internalResponse;
    if (internalResponse.urlList.length === 0) {
      internalResponse.urlList.push(...request2.urlList);
    }
    if (!request2.timingAllowFailed) {
      response2.timingAllowPassed = true;
    }
    if (response2.type === "opaque" && internalResponse.status === 206 && internalResponse.rangeRequested && !request2.headers.contains("range", true)) {
      response2 = internalResponse = makeNetworkError();
    }
    if (response2.status !== 0 && (request2.method === "HEAD" || request2.method === "CONNECT" || nullBodyStatus.includes(internalResponse.status))) {
      internalResponse.body = null;
      fetchParams.controller.dump = true;
    }
    if (request2.integrity) {
      const processBodyError = (reason) => fetchFinale(fetchParams, makeNetworkError(reason));
      if (request2.responseTainting === "opaque" || response2.body == null) {
        processBodyError(response2.error);
        return;
      }
      const processBody = (bytes) => {
        if (!bytesMatch(bytes, request2.integrity)) {
          processBodyError("integrity mismatch");
          return;
        }
        response2.body = safelyExtractBody(bytes)[0];
        fetchFinale(fetchParams, response2);
      };
      await fullyReadBody(response2.body, processBody, processBodyError);
    } else {
      fetchFinale(fetchParams, response2);
    }
  }
  function schemeFetch(fetchParams) {
    if (isCancelled(fetchParams) && fetchParams.request.redirectCount === 0) {
      return Promise.resolve(makeAppropriateNetworkError(fetchParams));
    }
    const { request: request2 } = fetchParams;
    const { protocol: scheme } = requestCurrentURL(request2);
    switch (scheme) {
      case "about:": {
        return Promise.resolve(makeNetworkError("about scheme is not supported"));
      }
      case "blob:": {
        if (!resolveObjectURL) {
          resolveObjectURL = require$$0.resolveObjectURL;
        }
        const blobURLEntry = requestCurrentURL(request2);
        if (blobURLEntry.search.length !== 0) {
          return Promise.resolve(makeNetworkError("NetworkError when attempting to fetch resource."));
        }
        const blob = resolveObjectURL(blobURLEntry.toString());
        if (request2.method !== "GET" || !isBlobLike2(blob)) {
          return Promise.resolve(makeNetworkError("invalid method"));
        }
        const response2 = makeResponse();
        const fullLength = blob.size;
        const serializedFullLength = isomorphicEncode(`${fullLength}`);
        const type = blob.type;
        if (!request2.headersList.contains("range", true)) {
          const bodyWithType = extractBody2(blob);
          response2.statusText = "OK";
          response2.body = bodyWithType[0];
          response2.headersList.set("content-length", serializedFullLength, true);
          response2.headersList.set("content-type", type, true);
        } else {
          response2.rangeRequested = true;
          const rangeHeader = request2.headersList.get("range", true);
          const rangeValue = simpleRangeHeaderValue(rangeHeader, true);
          if (rangeValue === "failure") {
            return Promise.resolve(makeNetworkError("failed to fetch the data URL"));
          }
          let { rangeStartValue: rangeStart, rangeEndValue: rangeEnd } = rangeValue;
          if (rangeStart === null) {
            rangeStart = fullLength - rangeEnd;
            rangeEnd = rangeStart + rangeEnd - 1;
          } else {
            if (rangeStart >= fullLength) {
              return Promise.resolve(makeNetworkError("Range start is greater than the blob's size."));
            }
            if (rangeEnd === null || rangeEnd >= fullLength) {
              rangeEnd = fullLength - 1;
            }
          }
          const slicedBlob = blob.slice(rangeStart, rangeEnd, type);
          const slicedBodyWithType = extractBody2(slicedBlob);
          response2.body = slicedBodyWithType[0];
          const serializedSlicedLength = isomorphicEncode(`${slicedBlob.size}`);
          const contentRange = buildContentRange(rangeStart, rangeEnd, fullLength);
          response2.status = 206;
          response2.statusText = "Partial Content";
          response2.headersList.set("content-length", serializedSlicedLength, true);
          response2.headersList.set("content-type", type, true);
          response2.headersList.set("content-range", contentRange, true);
        }
        return Promise.resolve(response2);
      }
      case "data:": {
        const currentURL = requestCurrentURL(request2);
        const dataURLStruct = dataURLProcessor(currentURL);
        if (dataURLStruct === "failure") {
          return Promise.resolve(makeNetworkError("failed to fetch the data URL"));
        }
        const mimeType = serializeAMimeType2(dataURLStruct.mimeType);
        return Promise.resolve(makeResponse({
          statusText: "OK",
          headersList: [
            ["content-type", { name: "Content-Type", value: mimeType }]
          ],
          body: safelyExtractBody(dataURLStruct.body)[0]
        }));
      }
      case "file:": {
        return Promise.resolve(makeNetworkError("not implemented... yet..."));
      }
      case "http:":
      case "https:": {
        return httpFetch(fetchParams).catch((err) => makeNetworkError(err));
      }
      default: {
        return Promise.resolve(makeNetworkError("unknown scheme"));
      }
    }
  }
  function finalizeResponse(fetchParams, response2) {
    fetchParams.request.done = true;
    if (fetchParams.processResponseDone != null) {
      queueMicrotask(() => fetchParams.processResponseDone(response2));
    }
  }
  function fetchFinale(fetchParams, response2) {
    let timingInfo = fetchParams.timingInfo;
    const processResponseEndOfBody = () => {
      const unsafeEndTime = Date.now();
      if (fetchParams.request.destination === "document") {
        fetchParams.controller.fullTimingInfo = timingInfo;
      }
      fetchParams.controller.reportTimingSteps = () => {
        if (fetchParams.request.url.protocol !== "https:") {
          return;
        }
        timingInfo.endTime = unsafeEndTime;
        let cacheState = response2.cacheState;
        const bodyInfo = response2.bodyInfo;
        if (!response2.timingAllowPassed) {
          timingInfo = createOpaqueTimingInfo(timingInfo);
          cacheState = "";
        }
        let responseStatus = 0;
        if (fetchParams.request.mode !== "navigator" || !response2.hasCrossOriginRedirects) {
          responseStatus = response2.status;
          const mimeType = extractMimeType(response2.headersList);
          if (mimeType !== "failure") {
            bodyInfo.contentType = minimizeSupportedMimeType(mimeType);
          }
        }
        if (fetchParams.request.initiatorType != null) {
          markResourceTiming(timingInfo, fetchParams.request.url.href, fetchParams.request.initiatorType, globalThis, cacheState, bodyInfo, responseStatus);
        }
      };
      const processResponseEndOfBodyTask = () => {
        fetchParams.request.done = true;
        if (fetchParams.processResponseEndOfBody != null) {
          queueMicrotask(() => fetchParams.processResponseEndOfBody(response2));
        }
        if (fetchParams.request.initiatorType != null) {
          fetchParams.controller.reportTimingSteps();
        }
      };
      queueMicrotask(() => processResponseEndOfBodyTask());
    };
    if (fetchParams.processResponse != null) {
      queueMicrotask(() => {
        fetchParams.processResponse(response2);
        fetchParams.processResponse = null;
      });
    }
    const internalResponse = response2.type === "error" ? response2 : response2.internalResponse ?? response2;
    if (internalResponse.body == null) {
      processResponseEndOfBody();
    } else {
      finished2(internalResponse.body.stream, () => {
        processResponseEndOfBody();
      });
    }
  }
  async function httpFetch(fetchParams) {
    const request2 = fetchParams.request;
    let response2 = null;
    let actualResponse = null;
    const timingInfo = fetchParams.timingInfo;
    if (request2.serviceWorkers === "all") ;
    if (response2 === null) {
      if (request2.redirect === "follow") {
        request2.serviceWorkers = "none";
      }
      actualResponse = response2 = await httpNetworkOrCacheFetch(fetchParams);
      if (request2.responseTainting === "cors" && corsCheck(request2, response2) === "failure") {
        return makeNetworkError("cors failure");
      }
      if (TAOCheck(request2, response2) === "failure") {
        request2.timingAllowFailed = true;
      }
    }
    if ((request2.responseTainting === "opaque" || response2.type === "opaque") && crossOriginResourcePolicyCheck(
      request2.origin,
      request2.client,
      request2.destination,
      actualResponse
    ) === "blocked") {
      return makeNetworkError("blocked");
    }
    if (redirectStatusSet.has(actualResponse.status)) {
      if (request2.redirect !== "manual") {
        fetchParams.controller.connection.destroy(void 0, false);
      }
      if (request2.redirect === "error") {
        response2 = makeNetworkError("unexpected redirect");
      } else if (request2.redirect === "manual") {
        response2 = actualResponse;
      } else if (request2.redirect === "follow") {
        response2 = await httpRedirectFetch(fetchParams, response2);
      } else {
        assert2(false);
      }
    }
    response2.timingInfo = timingInfo;
    return response2;
  }
  function httpRedirectFetch(fetchParams, response2) {
    const request2 = fetchParams.request;
    const actualResponse = response2.internalResponse ? response2.internalResponse : response2;
    let locationURL;
    try {
      locationURL = responseLocationURL(
        actualResponse,
        requestCurrentURL(request2).hash
      );
      if (locationURL == null) {
        return response2;
      }
    } catch (err) {
      return Promise.resolve(makeNetworkError(err));
    }
    if (!urlIsHttpHttpsScheme(locationURL)) {
      return Promise.resolve(makeNetworkError("URL scheme must be a HTTP(S) scheme"));
    }
    if (request2.redirectCount === 20) {
      return Promise.resolve(makeNetworkError("redirect count exceeded"));
    }
    request2.redirectCount += 1;
    if (request2.mode === "cors" && (locationURL.username || locationURL.password) && !sameOrigin(request2, locationURL)) {
      return Promise.resolve(makeNetworkError('cross origin not allowed for request mode "cors"'));
    }
    if (request2.responseTainting === "cors" && (locationURL.username || locationURL.password)) {
      return Promise.resolve(makeNetworkError(
        'URL cannot contain credentials for request mode "cors"'
      ));
    }
    if (actualResponse.status !== 303 && request2.body != null && request2.body.source == null) {
      return Promise.resolve(makeNetworkError());
    }
    if ([301, 302].includes(actualResponse.status) && request2.method === "POST" || actualResponse.status === 303 && !GET_OR_HEAD.includes(request2.method)) {
      request2.method = "GET";
      request2.body = null;
      for (const headerName of requestBodyHeader) {
        request2.headersList.delete(headerName);
      }
    }
    if (!sameOrigin(requestCurrentURL(request2), locationURL)) {
      request2.headersList.delete("authorization", true);
      request2.headersList.delete("proxy-authorization", true);
      request2.headersList.delete("cookie", true);
      request2.headersList.delete("host", true);
    }
    if (request2.body != null) {
      assert2(request2.body.source != null);
      request2.body = safelyExtractBody(request2.body.source)[0];
    }
    const timingInfo = fetchParams.timingInfo;
    timingInfo.redirectEndTime = timingInfo.postRedirectStartTime = coarsenedSharedCurrentTime(fetchParams.crossOriginIsolatedCapability);
    if (timingInfo.redirectStartTime === 0) {
      timingInfo.redirectStartTime = timingInfo.startTime;
    }
    request2.urlList.push(locationURL);
    setRequestReferrerPolicyOnRedirect(request2, actualResponse);
    return mainFetch(fetchParams, true);
  }
  async function httpNetworkOrCacheFetch(fetchParams, isAuthenticationFetch = false, isNewConnectionFetch = false) {
    const request2 = fetchParams.request;
    let httpFetchParams = null;
    let httpRequest = null;
    let response2 = null;
    if (request2.window === "no-window" && request2.redirect === "error") {
      httpFetchParams = fetchParams;
      httpRequest = request2;
    } else {
      httpRequest = cloneRequest(request2);
      httpFetchParams = { ...fetchParams };
      httpFetchParams.request = httpRequest;
    }
    const includeCredentials = request2.credentials === "include" || request2.credentials === "same-origin" && request2.responseTainting === "basic";
    const contentLength = httpRequest.body ? httpRequest.body.length : null;
    let contentLengthHeaderValue = null;
    if (httpRequest.body == null && ["POST", "PUT"].includes(httpRequest.method)) {
      contentLengthHeaderValue = "0";
    }
    if (contentLength != null) {
      contentLengthHeaderValue = isomorphicEncode(`${contentLength}`);
    }
    if (contentLengthHeaderValue != null) {
      httpRequest.headersList.append("content-length", contentLengthHeaderValue, true);
    }
    if (contentLength != null && httpRequest.keepalive) ;
    if (httpRequest.referrer instanceof URL) {
      httpRequest.headersList.append("referer", isomorphicEncode(httpRequest.referrer.href), true);
    }
    appendRequestOriginHeader(httpRequest);
    appendFetchMetadata(httpRequest);
    if (!httpRequest.headersList.contains("user-agent", true)) {
      httpRequest.headersList.append("user-agent", defaultUserAgent);
    }
    if (httpRequest.cache === "default" && (httpRequest.headersList.contains("if-modified-since", true) || httpRequest.headersList.contains("if-none-match", true) || httpRequest.headersList.contains("if-unmodified-since", true) || httpRequest.headersList.contains("if-match", true) || httpRequest.headersList.contains("if-range", true))) {
      httpRequest.cache = "no-store";
    }
    if (httpRequest.cache === "no-cache" && !httpRequest.preventNoCacheCacheControlHeaderModification && !httpRequest.headersList.contains("cache-control", true)) {
      httpRequest.headersList.append("cache-control", "max-age=0", true);
    }
    if (httpRequest.cache === "no-store" || httpRequest.cache === "reload") {
      if (!httpRequest.headersList.contains("pragma", true)) {
        httpRequest.headersList.append("pragma", "no-cache", true);
      }
      if (!httpRequest.headersList.contains("cache-control", true)) {
        httpRequest.headersList.append("cache-control", "no-cache", true);
      }
    }
    if (httpRequest.headersList.contains("range", true)) {
      httpRequest.headersList.append("accept-encoding", "identity", true);
    }
    if (!httpRequest.headersList.contains("accept-encoding", true)) {
      if (urlHasHttpsScheme(requestCurrentURL(httpRequest))) {
        httpRequest.headersList.append("accept-encoding", "br, gzip, deflate", true);
      } else {
        httpRequest.headersList.append("accept-encoding", "gzip, deflate", true);
      }
    }
    httpRequest.headersList.delete("host", true);
    {
      httpRequest.cache = "no-store";
    }
    if (httpRequest.cache !== "no-store" && httpRequest.cache !== "reload") ;
    if (response2 == null) {
      if (httpRequest.cache === "only-if-cached") {
        return makeNetworkError("only if cached");
      }
      const forwardResponse = await httpNetworkFetch(
        httpFetchParams,
        includeCredentials,
        isNewConnectionFetch
      );
      if (!safeMethodsSet.has(httpRequest.method) && forwardResponse.status >= 200 && forwardResponse.status <= 399) ;
      if (response2 == null) {
        response2 = forwardResponse;
      }
    }
    response2.urlList = [...httpRequest.urlList];
    if (httpRequest.headersList.contains("range", true)) {
      response2.rangeRequested = true;
    }
    response2.requestIncludesCredentials = includeCredentials;
    if (response2.status === 407) {
      if (request2.window === "no-window") {
        return makeNetworkError();
      }
      if (isCancelled(fetchParams)) {
        return makeAppropriateNetworkError(fetchParams);
      }
      return makeNetworkError("proxy authentication required");
    }
    if (
      // response’s status is 421
      response2.status === 421 && // isNewConnectionFetch is false
      !isNewConnectionFetch && // request’s body is null, or request’s body is non-null and request’s body’s source is non-null
      (request2.body == null || request2.body.source != null)
    ) {
      if (isCancelled(fetchParams)) {
        return makeAppropriateNetworkError(fetchParams);
      }
      fetchParams.controller.connection.destroy();
      response2 = await httpNetworkOrCacheFetch(
        fetchParams,
        isAuthenticationFetch,
        true
      );
    }
    return response2;
  }
  async function httpNetworkFetch(fetchParams, includeCredentials = false, forceNewConnection = false) {
    assert2(!fetchParams.controller.connection || fetchParams.controller.connection.destroyed);
    fetchParams.controller.connection = {
      abort: null,
      destroyed: false,
      destroy(err, abort2 = true) {
        var _a2;
        if (!this.destroyed) {
          this.destroyed = true;
          if (abort2) {
            (_a2 = this.abort) == null ? void 0 : _a2.call(this, err ?? new DOMException("The operation was aborted.", "AbortError"));
          }
        }
      }
    };
    const request2 = fetchParams.request;
    let response2 = null;
    const timingInfo = fetchParams.timingInfo;
    {
      request2.cache = "no-store";
    }
    if (request2.mode === "websocket") ;
    let requestBody = null;
    if (request2.body == null && fetchParams.processRequestEndOfBody) {
      queueMicrotask(() => fetchParams.processRequestEndOfBody());
    } else if (request2.body != null) {
      const processBodyChunk = async function* (bytes) {
        var _a2;
        if (isCancelled(fetchParams)) {
          return;
        }
        yield bytes;
        (_a2 = fetchParams.processRequestBodyChunkLength) == null ? void 0 : _a2.call(fetchParams, bytes.byteLength);
      };
      const processEndOfBody = () => {
        if (isCancelled(fetchParams)) {
          return;
        }
        if (fetchParams.processRequestEndOfBody) {
          fetchParams.processRequestEndOfBody();
        }
      };
      const processBodyError = (e) => {
        if (isCancelled(fetchParams)) {
          return;
        }
        if (e.name === "AbortError") {
          fetchParams.controller.abort();
        } else {
          fetchParams.controller.terminate(e);
        }
      };
      requestBody = async function* () {
        try {
          for await (const bytes of request2.body.stream) {
            yield* processBodyChunk(bytes);
          }
          processEndOfBody();
        } catch (err) {
          processBodyError(err);
        }
      }();
    }
    try {
      const { body: body2, status, statusText, headersList, socket } = await dispatch({ body: requestBody });
      if (socket) {
        response2 = makeResponse({ status, statusText, headersList, socket });
      } else {
        const iterator = body2[Symbol.asyncIterator]();
        fetchParams.controller.next = () => iterator.next();
        response2 = makeResponse({ status, statusText, headersList });
      }
    } catch (err) {
      if (err.name === "AbortError") {
        fetchParams.controller.connection.destroy();
        return makeAppropriateNetworkError(fetchParams, err);
      }
      return makeNetworkError(err);
    }
    const pullAlgorithm = async () => {
      await fetchParams.controller.resume();
    };
    const cancelAlgorithm = (reason) => {
      if (!isCancelled(fetchParams)) {
        fetchParams.controller.abort(reason);
      }
    };
    const stream2 = new ReadableStream(
      {
        async start(controller) {
          fetchParams.controller.controller = controller;
        },
        async pull(controller) {
          await pullAlgorithm();
        },
        async cancel(reason) {
          await cancelAlgorithm(reason);
        },
        type: "bytes"
      }
    );
    response2.body = { stream: stream2, source: null, length: null };
    fetchParams.controller.onAborted = onAborted;
    fetchParams.controller.on("terminated", onAborted);
    fetchParams.controller.resume = async () => {
      while (true) {
        let bytes;
        let isFailure;
        try {
          const { done, value } = await fetchParams.controller.next();
          if (isAborted(fetchParams)) {
            break;
          }
          bytes = done ? void 0 : value;
        } catch (err) {
          if (fetchParams.controller.ended && !timingInfo.encodedBodySize) {
            bytes = void 0;
          } else {
            bytes = err;
            isFailure = true;
          }
        }
        if (bytes === void 0) {
          readableStreamClose(fetchParams.controller.controller);
          finalizeResponse(fetchParams, response2);
          return;
        }
        timingInfo.decodedBodySize += (bytes == null ? void 0 : bytes.byteLength) ?? 0;
        if (isFailure) {
          fetchParams.controller.terminate(bytes);
          return;
        }
        const buffer2 = new Uint8Array(bytes);
        if (buffer2.byteLength) {
          fetchParams.controller.controller.enqueue(buffer2);
        }
        if (isErrored2(stream2)) {
          fetchParams.controller.terminate();
          return;
        }
        if (fetchParams.controller.controller.desiredSize <= 0) {
          return;
        }
      }
    };
    function onAborted(reason) {
      if (isAborted(fetchParams)) {
        response2.aborted = true;
        if (isReadable2(stream2)) {
          fetchParams.controller.controller.error(
            fetchParams.controller.serializedAbortReason
          );
        }
      } else {
        if (isReadable2(stream2)) {
          fetchParams.controller.controller.error(new TypeError("terminated", {
            cause: isErrorLike(reason) ? reason : void 0
          }));
        }
      }
      fetchParams.controller.connection.destroy();
    }
    return response2;
    function dispatch({ body: body2 }) {
      const url = requestCurrentURL(request2);
      const agent2 = fetchParams.controller.dispatcher;
      return new Promise((resolve, reject) => agent2.dispatch(
        {
          path: url.pathname + url.search,
          origin: url.origin,
          method: request2.method,
          body: agent2.isMockActive ? request2.body && (request2.body.source || request2.body.stream) : body2,
          headers: request2.headersList.entries,
          maxRedirections: 0,
          upgrade: request2.mode === "websocket" ? "websocket" : void 0
        },
        {
          body: null,
          abort: null,
          onConnect(abort2) {
            const { connection: connection2 } = fetchParams.controller;
            timingInfo.finalConnectionTimingInfo = clampAndCoarsenConnectionTimingInfo(void 0, timingInfo.postRedirectStartTime, fetchParams.crossOriginIsolatedCapability);
            if (connection2.destroyed) {
              abort2(new DOMException("The operation was aborted.", "AbortError"));
            } else {
              fetchParams.controller.on("terminated", abort2);
              this.abort = connection2.abort = abort2;
            }
            timingInfo.finalNetworkRequestStartTime = coarsenedSharedCurrentTime(fetchParams.crossOriginIsolatedCapability);
          },
          onResponseStarted() {
            timingInfo.finalNetworkResponseStartTime = coarsenedSharedCurrentTime(fetchParams.crossOriginIsolatedCapability);
          },
          onHeaders(status, rawHeaders, resume2, statusText) {
            if (status < 200) {
              return;
            }
            let location = "";
            const headersList = new HeadersList();
            for (let i = 0; i < rawHeaders.length; i += 2) {
              headersList.append(bufferToLowerCasedHeaderName2(rawHeaders[i]), rawHeaders[i + 1].toString("latin1"), true);
            }
            location = headersList.get("location", true);
            this.body = new Readable2({ read: resume2 });
            const decoders = [];
            const willFollow = location && request2.redirect === "follow" && redirectStatusSet.has(status);
            if (request2.method !== "HEAD" && request2.method !== "CONNECT" && !nullBodyStatus.includes(status) && !willFollow) {
              const contentEncoding = headersList.get("content-encoding", true);
              const codings = contentEncoding ? contentEncoding.toLowerCase().split(",") : [];
              const maxContentEncodings = 5;
              if (codings.length > maxContentEncodings) {
                reject(new Error(`too many content-encodings in response: ${codings.length}, maximum allowed is ${maxContentEncodings}`));
                return true;
              }
              for (let i = codings.length - 1; i >= 0; --i) {
                const coding = codings[i].trim();
                if (coding === "x-gzip" || coding === "gzip") {
                  decoders.push(zlib.createGunzip({
                    // Be less strict when decoding compressed responses, since sometimes
                    // servers send slightly invalid responses that are still accepted
                    // by common browsers.
                    // Always using Z_SYNC_FLUSH is what cURL does.
                    flush: zlib.constants.Z_SYNC_FLUSH,
                    finishFlush: zlib.constants.Z_SYNC_FLUSH
                  }));
                } else if (coding === "deflate") {
                  decoders.push(createInflate({
                    flush: zlib.constants.Z_SYNC_FLUSH,
                    finishFlush: zlib.constants.Z_SYNC_FLUSH
                  }));
                } else if (coding === "br") {
                  decoders.push(zlib.createBrotliDecompress({
                    flush: zlib.constants.BROTLI_OPERATION_FLUSH,
                    finishFlush: zlib.constants.BROTLI_OPERATION_FLUSH
                  }));
                } else {
                  decoders.length = 0;
                  break;
                }
              }
            }
            const onError2 = this.onError.bind(this);
            resolve({
              status,
              statusText,
              headersList,
              body: decoders.length ? pipeline2(this.body, ...decoders, (err) => {
                if (err) {
                  this.onError(err);
                }
              }).on("error", onError2) : this.body.on("error", onError2)
            });
            return true;
          },
          onData(chunk) {
            if (fetchParams.controller.dump) {
              return;
            }
            const bytes = chunk;
            timingInfo.encodedBodySize += bytes.byteLength;
            return this.body.push(bytes);
          },
          onComplete() {
            if (this.abort) {
              fetchParams.controller.off("terminated", this.abort);
            }
            if (fetchParams.controller.onAborted) {
              fetchParams.controller.off("terminated", fetchParams.controller.onAborted);
            }
            fetchParams.controller.ended = true;
            this.body.push(null);
          },
          onError(error) {
            var _a2;
            if (this.abort) {
              fetchParams.controller.off("terminated", this.abort);
            }
            (_a2 = this.body) == null ? void 0 : _a2.destroy(error);
            fetchParams.controller.terminate(error);
            reject(error);
          },
          onUpgrade(status, rawHeaders, socket) {
            if (status !== 101) {
              return;
            }
            const headersList = new HeadersList();
            for (let i = 0; i < rawHeaders.length; i += 2) {
              headersList.append(bufferToLowerCasedHeaderName2(rawHeaders[i]), rawHeaders[i + 1].toString("latin1"), true);
            }
            resolve({
              status,
              statusText: STATUS_CODES2[status],
              headersList,
              socket
            });
            return true;
          }
        }
      ));
    }
  }
  fetch_1 = {
    fetch,
    Fetch,
    fetching,
    finalizeAndReportTiming
  };
  return fetch_1;
}
var symbols$2;
var hasRequiredSymbols$2;
function requireSymbols$2() {
  if (hasRequiredSymbols$2) return symbols$2;
  hasRequiredSymbols$2 = 1;
  symbols$2 = {
    kState: Symbol("FileReader state"),
    kResult: Symbol("FileReader result"),
    kError: Symbol("FileReader error"),
    kLastProgressEventFired: Symbol("FileReader last progress event fired timestamp"),
    kEvents: Symbol("FileReader events"),
    kAborted: Symbol("FileReader aborted")
  };
  return symbols$2;
}
var progressevent;
var hasRequiredProgressevent;
function requireProgressevent() {
  if (hasRequiredProgressevent) return progressevent;
  hasRequiredProgressevent = 1;
  const { webidl } = requireWebidl();
  const kState = Symbol("ProgressEvent state");
  class ProgressEvent extends Event {
    constructor(type, eventInitDict = {}) {
      type = webidl.converters.DOMString(type, "ProgressEvent constructor", "type");
      eventInitDict = webidl.converters.ProgressEventInit(eventInitDict ?? {});
      super(type, eventInitDict);
      this[kState] = {
        lengthComputable: eventInitDict.lengthComputable,
        loaded: eventInitDict.loaded,
        total: eventInitDict.total
      };
    }
    get lengthComputable() {
      webidl.brandCheck(this, ProgressEvent);
      return this[kState].lengthComputable;
    }
    get loaded() {
      webidl.brandCheck(this, ProgressEvent);
      return this[kState].loaded;
    }
    get total() {
      webidl.brandCheck(this, ProgressEvent);
      return this[kState].total;
    }
  }
  webidl.converters.ProgressEventInit = webidl.dictionaryConverter([
    {
      key: "lengthComputable",
      converter: webidl.converters.boolean,
      defaultValue: () => false
    },
    {
      key: "loaded",
      converter: webidl.converters["unsigned long long"],
      defaultValue: () => 0
    },
    {
      key: "total",
      converter: webidl.converters["unsigned long long"],
      defaultValue: () => 0
    },
    {
      key: "bubbles",
      converter: webidl.converters.boolean,
      defaultValue: () => false
    },
    {
      key: "cancelable",
      converter: webidl.converters.boolean,
      defaultValue: () => false
    },
    {
      key: "composed",
      converter: webidl.converters.boolean,
      defaultValue: () => false
    }
  ]);
  progressevent = {
    ProgressEvent
  };
  return progressevent;
}
var encoding;
var hasRequiredEncoding;
function requireEncoding() {
  if (hasRequiredEncoding) return encoding;
  hasRequiredEncoding = 1;
  function getEncoding(label) {
    if (!label) {
      return "failure";
    }
    switch (label.trim().toLowerCase()) {
      case "unicode-1-1-utf-8":
      case "unicode11utf8":
      case "unicode20utf8":
      case "utf-8":
      case "utf8":
      case "x-unicode20utf8":
        return "UTF-8";
      case "866":
      case "cp866":
      case "csibm866":
      case "ibm866":
        return "IBM866";
      case "csisolatin2":
      case "iso-8859-2":
      case "iso-ir-101":
      case "iso8859-2":
      case "iso88592":
      case "iso_8859-2":
      case "iso_8859-2:1987":
      case "l2":
      case "latin2":
        return "ISO-8859-2";
      case "csisolatin3":
      case "iso-8859-3":
      case "iso-ir-109":
      case "iso8859-3":
      case "iso88593":
      case "iso_8859-3":
      case "iso_8859-3:1988":
      case "l3":
      case "latin3":
        return "ISO-8859-3";
      case "csisolatin4":
      case "iso-8859-4":
      case "iso-ir-110":
      case "iso8859-4":
      case "iso88594":
      case "iso_8859-4":
      case "iso_8859-4:1988":
      case "l4":
      case "latin4":
        return "ISO-8859-4";
      case "csisolatincyrillic":
      case "cyrillic":
      case "iso-8859-5":
      case "iso-ir-144":
      case "iso8859-5":
      case "iso88595":
      case "iso_8859-5":
      case "iso_8859-5:1988":
        return "ISO-8859-5";
      case "arabic":
      case "asmo-708":
      case "csiso88596e":
      case "csiso88596i":
      case "csisolatinarabic":
      case "ecma-114":
      case "iso-8859-6":
      case "iso-8859-6-e":
      case "iso-8859-6-i":
      case "iso-ir-127":
      case "iso8859-6":
      case "iso88596":
      case "iso_8859-6":
      case "iso_8859-6:1987":
        return "ISO-8859-6";
      case "csisolatingreek":
      case "ecma-118":
      case "elot_928":
      case "greek":
      case "greek8":
      case "iso-8859-7":
      case "iso-ir-126":
      case "iso8859-7":
      case "iso88597":
      case "iso_8859-7":
      case "iso_8859-7:1987":
      case "sun_eu_greek":
        return "ISO-8859-7";
      case "csiso88598e":
      case "csisolatinhebrew":
      case "hebrew":
      case "iso-8859-8":
      case "iso-8859-8-e":
      case "iso-ir-138":
      case "iso8859-8":
      case "iso88598":
      case "iso_8859-8":
      case "iso_8859-8:1988":
      case "visual":
        return "ISO-8859-8";
      case "csiso88598i":
      case "iso-8859-8-i":
      case "logical":
        return "ISO-8859-8-I";
      case "csisolatin6":
      case "iso-8859-10":
      case "iso-ir-157":
      case "iso8859-10":
      case "iso885910":
      case "l6":
      case "latin6":
        return "ISO-8859-10";
      case "iso-8859-13":
      case "iso8859-13":
      case "iso885913":
        return "ISO-8859-13";
      case "iso-8859-14":
      case "iso8859-14":
      case "iso885914":
        return "ISO-8859-14";
      case "csisolatin9":
      case "iso-8859-15":
      case "iso8859-15":
      case "iso885915":
      case "iso_8859-15":
      case "l9":
        return "ISO-8859-15";
      case "iso-8859-16":
        return "ISO-8859-16";
      case "cskoi8r":
      case "koi":
      case "koi8":
      case "koi8-r":
      case "koi8_r":
        return "KOI8-R";
      case "koi8-ru":
      case "koi8-u":
        return "KOI8-U";
      case "csmacintosh":
      case "mac":
      case "macintosh":
      case "x-mac-roman":
        return "macintosh";
      case "iso-8859-11":
      case "iso8859-11":
      case "iso885911":
      case "tis-620":
      case "windows-874":
        return "windows-874";
      case "cp1250":
      case "windows-1250":
      case "x-cp1250":
        return "windows-1250";
      case "cp1251":
      case "windows-1251":
      case "x-cp1251":
        return "windows-1251";
      case "ansi_x3.4-1968":
      case "ascii":
      case "cp1252":
      case "cp819":
      case "csisolatin1":
      case "ibm819":
      case "iso-8859-1":
      case "iso-ir-100":
      case "iso8859-1":
      case "iso88591":
      case "iso_8859-1":
      case "iso_8859-1:1987":
      case "l1":
      case "latin1":
      case "us-ascii":
      case "windows-1252":
      case "x-cp1252":
        return "windows-1252";
      case "cp1253":
      case "windows-1253":
      case "x-cp1253":
        return "windows-1253";
      case "cp1254":
      case "csisolatin5":
      case "iso-8859-9":
      case "iso-ir-148":
      case "iso8859-9":
      case "iso88599":
      case "iso_8859-9":
      case "iso_8859-9:1989":
      case "l5":
      case "latin5":
      case "windows-1254":
      case "x-cp1254":
        return "windows-1254";
      case "cp1255":
      case "windows-1255":
      case "x-cp1255":
        return "windows-1255";
      case "cp1256":
      case "windows-1256":
      case "x-cp1256":
        return "windows-1256";
      case "cp1257":
      case "windows-1257":
      case "x-cp1257":
        return "windows-1257";
      case "cp1258":
      case "windows-1258":
      case "x-cp1258":
        return "windows-1258";
      case "x-mac-cyrillic":
      case "x-mac-ukrainian":
        return "x-mac-cyrillic";
      case "chinese":
      case "csgb2312":
      case "csiso58gb231280":
      case "gb2312":
      case "gb_2312":
      case "gb_2312-80":
      case "gbk":
      case "iso-ir-58":
      case "x-gbk":
        return "GBK";
      case "gb18030":
        return "gb18030";
      case "big5":
      case "big5-hkscs":
      case "cn-big5":
      case "csbig5":
      case "x-x-big5":
        return "Big5";
      case "cseucpkdfmtjapanese":
      case "euc-jp":
      case "x-euc-jp":
        return "EUC-JP";
      case "csiso2022jp":
      case "iso-2022-jp":
        return "ISO-2022-JP";
      case "csshiftjis":
      case "ms932":
      case "ms_kanji":
      case "shift-jis":
      case "shift_jis":
      case "sjis":
      case "windows-31j":
      case "x-sjis":
        return "Shift_JIS";
      case "cseuckr":
      case "csksc56011987":
      case "euc-kr":
      case "iso-ir-149":
      case "korean":
      case "ks_c_5601-1987":
      case "ks_c_5601-1989":
      case "ksc5601":
      case "ksc_5601":
      case "windows-949":
        return "EUC-KR";
      case "csiso2022kr":
      case "hz-gb-2312":
      case "iso-2022-cn":
      case "iso-2022-cn-ext":
      case "iso-2022-kr":
      case "replacement":
        return "replacement";
      case "unicodefffe":
      case "utf-16be":
        return "UTF-16BE";
      case "csunicode":
      case "iso-10646-ucs-2":
      case "ucs-2":
      case "unicode":
      case "unicodefeff":
      case "utf-16":
      case "utf-16le":
        return "UTF-16LE";
      case "x-user-defined":
        return "x-user-defined";
      default:
        return "failure";
    }
  }
  encoding = {
    getEncoding
  };
  return encoding;
}
var util$5;
var hasRequiredUtil$4;
function requireUtil$4() {
  if (hasRequiredUtil$4) return util$5;
  hasRequiredUtil$4 = 1;
  const {
    kState,
    kError: kError2,
    kResult,
    kAborted,
    kLastProgressEventFired
  } = requireSymbols$2();
  const { ProgressEvent } = requireProgressevent();
  const { getEncoding } = requireEncoding();
  const { serializeAMimeType: serializeAMimeType2, parseMIMEType: parseMIMEType2 } = requireDataUrl();
  const { types } = require$$0$4;
  const { StringDecoder } = require$$5$3;
  const { btoa } = require$$0;
  const staticPropertyDescriptors = {
    enumerable: true,
    writable: false,
    configurable: false
  };
  function readOperation(fr, blob, type, encodingName) {
    if (fr[kState] === "loading") {
      throw new DOMException("Invalid state", "InvalidStateError");
    }
    fr[kState] = "loading";
    fr[kResult] = null;
    fr[kError2] = null;
    const stream2 = blob.stream();
    const reader = stream2.getReader();
    const bytes = [];
    let chunkPromise = reader.read();
    let isFirstChunk = true;
    (async () => {
      while (!fr[kAborted]) {
        try {
          const { done, value } = await chunkPromise;
          if (isFirstChunk && !fr[kAborted]) {
            queueMicrotask(() => {
              fireAProgressEvent("loadstart", fr);
            });
          }
          isFirstChunk = false;
          if (!done && types.isUint8Array(value)) {
            bytes.push(value);
            if ((fr[kLastProgressEventFired] === void 0 || Date.now() - fr[kLastProgressEventFired] >= 50) && !fr[kAborted]) {
              fr[kLastProgressEventFired] = Date.now();
              queueMicrotask(() => {
                fireAProgressEvent("progress", fr);
              });
            }
            chunkPromise = reader.read();
          } else if (done) {
            queueMicrotask(() => {
              fr[kState] = "done";
              try {
                const result = packageData(bytes, type, blob.type, encodingName);
                if (fr[kAborted]) {
                  return;
                }
                fr[kResult] = result;
                fireAProgressEvent("load", fr);
              } catch (error) {
                fr[kError2] = error;
                fireAProgressEvent("error", fr);
              }
              if (fr[kState] !== "loading") {
                fireAProgressEvent("loadend", fr);
              }
            });
            break;
          }
        } catch (error) {
          if (fr[kAborted]) {
            return;
          }
          queueMicrotask(() => {
            fr[kState] = "done";
            fr[kError2] = error;
            fireAProgressEvent("error", fr);
            if (fr[kState] !== "loading") {
              fireAProgressEvent("loadend", fr);
            }
          });
          break;
        }
      }
    })();
  }
  function fireAProgressEvent(e, reader) {
    const event = new ProgressEvent(e, {
      bubbles: false,
      cancelable: false
    });
    reader.dispatchEvent(event);
  }
  function packageData(bytes, type, mimeType, encodingName) {
    switch (type) {
      case "DataURL": {
        let dataURL = "data:";
        const parsed = parseMIMEType2(mimeType || "application/octet-stream");
        if (parsed !== "failure") {
          dataURL += serializeAMimeType2(parsed);
        }
        dataURL += ";base64,";
        const decoder = new StringDecoder("latin1");
        for (const chunk of bytes) {
          dataURL += btoa(decoder.write(chunk));
        }
        dataURL += btoa(decoder.end());
        return dataURL;
      }
      case "Text": {
        let encoding2 = "failure";
        if (encodingName) {
          encoding2 = getEncoding(encodingName);
        }
        if (encoding2 === "failure" && mimeType) {
          const type2 = parseMIMEType2(mimeType);
          if (type2 !== "failure") {
            encoding2 = getEncoding(type2.parameters.get("charset"));
          }
        }
        if (encoding2 === "failure") {
          encoding2 = "UTF-8";
        }
        return decode(bytes, encoding2);
      }
      case "ArrayBuffer": {
        const sequence = combineByteSequences(bytes);
        return sequence.buffer;
      }
      case "BinaryString": {
        let binaryString = "";
        const decoder = new StringDecoder("latin1");
        for (const chunk of bytes) {
          binaryString += decoder.write(chunk);
        }
        binaryString += decoder.end();
        return binaryString;
      }
    }
  }
  function decode(ioQueue, encoding2) {
    const bytes = combineByteSequences(ioQueue);
    const BOMEncoding = BOMSniffing(bytes);
    let slice = 0;
    if (BOMEncoding !== null) {
      encoding2 = BOMEncoding;
      slice = BOMEncoding === "UTF-8" ? 3 : 2;
    }
    const sliced = bytes.slice(slice);
    return new TextDecoder(encoding2).decode(sliced);
  }
  function BOMSniffing(ioQueue) {
    const [a, b, c2] = ioQueue;
    if (a === 239 && b === 187 && c2 === 191) {
      return "UTF-8";
    } else if (a === 254 && b === 255) {
      return "UTF-16BE";
    } else if (a === 255 && b === 254) {
      return "UTF-16LE";
    }
    return null;
  }
  function combineByteSequences(sequences) {
    const size = sequences.reduce((a, b) => {
      return a + b.byteLength;
    }, 0);
    let offset = 0;
    return sequences.reduce((a, b) => {
      a.set(b, offset);
      offset += b.byteLength;
      return a;
    }, new Uint8Array(size));
  }
  util$5 = {
    staticPropertyDescriptors,
    readOperation,
    fireAProgressEvent
  };
  return util$5;
}
var filereader;
var hasRequiredFilereader;
function requireFilereader() {
  if (hasRequiredFilereader) return filereader;
  hasRequiredFilereader = 1;
  const {
    staticPropertyDescriptors,
    readOperation,
    fireAProgressEvent
  } = requireUtil$4();
  const {
    kState,
    kError: kError2,
    kResult,
    kEvents,
    kAborted
  } = requireSymbols$2();
  const { webidl } = requireWebidl();
  const { kEnumerableProperty: kEnumerableProperty2 } = util$m;
  class FileReader extends EventTarget {
    constructor() {
      super();
      this[kState] = "empty";
      this[kResult] = null;
      this[kError2] = null;
      this[kEvents] = {
        loadend: null,
        error: null,
        abort: null,
        load: null,
        progress: null,
        loadstart: null
      };
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dfn-readAsArrayBuffer
     * @param {import('buffer').Blob} blob
     */
    readAsArrayBuffer(blob) {
      webidl.brandCheck(this, FileReader);
      webidl.argumentLengthCheck(arguments, 1, "FileReader.readAsArrayBuffer");
      blob = webidl.converters.Blob(blob, { strict: false });
      readOperation(this, blob, "ArrayBuffer");
    }
    /**
     * @see https://w3c.github.io/FileAPI/#readAsBinaryString
     * @param {import('buffer').Blob} blob
     */
    readAsBinaryString(blob) {
      webidl.brandCheck(this, FileReader);
      webidl.argumentLengthCheck(arguments, 1, "FileReader.readAsBinaryString");
      blob = webidl.converters.Blob(blob, { strict: false });
      readOperation(this, blob, "BinaryString");
    }
    /**
     * @see https://w3c.github.io/FileAPI/#readAsDataText
     * @param {import('buffer').Blob} blob
     * @param {string?} encoding
     */
    readAsText(blob, encoding2 = void 0) {
      webidl.brandCheck(this, FileReader);
      webidl.argumentLengthCheck(arguments, 1, "FileReader.readAsText");
      blob = webidl.converters.Blob(blob, { strict: false });
      if (encoding2 !== void 0) {
        encoding2 = webidl.converters.DOMString(encoding2, "FileReader.readAsText", "encoding");
      }
      readOperation(this, blob, "Text", encoding2);
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dfn-readAsDataURL
     * @param {import('buffer').Blob} blob
     */
    readAsDataURL(blob) {
      webidl.brandCheck(this, FileReader);
      webidl.argumentLengthCheck(arguments, 1, "FileReader.readAsDataURL");
      blob = webidl.converters.Blob(blob, { strict: false });
      readOperation(this, blob, "DataURL");
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dfn-abort
     */
    abort() {
      if (this[kState] === "empty" || this[kState] === "done") {
        this[kResult] = null;
        return;
      }
      if (this[kState] === "loading") {
        this[kState] = "done";
        this[kResult] = null;
      }
      this[kAborted] = true;
      fireAProgressEvent("abort", this);
      if (this[kState] !== "loading") {
        fireAProgressEvent("loadend", this);
      }
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dom-filereader-readystate
     */
    get readyState() {
      webidl.brandCheck(this, FileReader);
      switch (this[kState]) {
        case "empty":
          return this.EMPTY;
        case "loading":
          return this.LOADING;
        case "done":
          return this.DONE;
      }
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dom-filereader-result
     */
    get result() {
      webidl.brandCheck(this, FileReader);
      return this[kResult];
    }
    /**
     * @see https://w3c.github.io/FileAPI/#dom-filereader-error
     */
    get error() {
      webidl.brandCheck(this, FileReader);
      return this[kError2];
    }
    get onloadend() {
      webidl.brandCheck(this, FileReader);
      return this[kEvents].loadend;
    }
    set onloadend(fn) {
      webidl.brandCheck(this, FileReader);
      if (this[kEvents].loadend) {
        this.removeEventListener("loadend", this[kEvents].loadend);
      }
      if (typeof fn === "function") {
        this[kEvents].loadend = fn;
        this.addEventListener("loadend", fn);
      } else {
        this[kEvents].loadend = null;
      }
    }
    get onerror() {
      webidl.brandCheck(this, FileReader);
      return this[kEvents].error;
    }
    set onerror(fn) {
      webidl.brandCheck(this, FileReader);
      if (this[kEvents].error) {
        this.removeEventListener("error", this[kEvents].error);
      }
      if (typeof fn === "function") {
        this[kEvents].error = fn;
        this.addEventListener("error", fn);
      } else {
        this[kEvents].error = null;
      }
    }
    get onloadstart() {
      webidl.brandCheck(this, FileReader);
      return this[kEvents].loadstart;
    }
    set onloadstart(fn) {
      webidl.brandCheck(this, FileReader);
      if (this[kEvents].loadstart) {
        this.removeEventListener("loadstart", this[kEvents].loadstart);
      }
      if (typeof fn === "function") {
        this[kEvents].loadstart = fn;
        this.addEventListener("loadstart", fn);
      } else {
        this[kEvents].loadstart = null;
      }
    }
    get onprogress() {
      webidl.brandCheck(this, FileReader);
      return this[kEvents].progress;
    }
    set onprogress(fn) {
      webidl.brandCheck(this, FileReader);
      if (this[kEvents].progress) {
        this.removeEventListener("progress", this[kEvents].progress);
      }
      if (typeof fn === "function") {
        this[kEvents].progress = fn;
        this.addEventListener("progress", fn);
      } else {
        this[kEvents].progress = null;
      }
    }
    get onload() {
      webidl.brandCheck(this, FileReader);
      return this[kEvents].load;
    }
    set onload(fn) {
      webidl.brandCheck(this, FileReader);
      if (this[kEvents].load) {
        this.removeEventListener("load", this[kEvents].load);
      }
      if (typeof fn === "function") {
        this[kEvents].load = fn;
        this.addEventListener("load", fn);
      } else {
        this[kEvents].load = null;
      }
    }
    get onabort() {
      webidl.brandCheck(this, FileReader);
      return this[kEvents].abort;
    }
    set onabort(fn) {
      webidl.brandCheck(this, FileReader);
      if (this[kEvents].abort) {
        this.removeEventListener("abort", this[kEvents].abort);
      }
      if (typeof fn === "function") {
        this[kEvents].abort = fn;
        this.addEventListener("abort", fn);
      } else {
        this[kEvents].abort = null;
      }
    }
  }
  FileReader.EMPTY = FileReader.prototype.EMPTY = 0;
  FileReader.LOADING = FileReader.prototype.LOADING = 1;
  FileReader.DONE = FileReader.prototype.DONE = 2;
  Object.defineProperties(FileReader.prototype, {
    EMPTY: staticPropertyDescriptors,
    LOADING: staticPropertyDescriptors,
    DONE: staticPropertyDescriptors,
    readAsArrayBuffer: kEnumerableProperty2,
    readAsBinaryString: kEnumerableProperty2,
    readAsText: kEnumerableProperty2,
    readAsDataURL: kEnumerableProperty2,
    abort: kEnumerableProperty2,
    readyState: kEnumerableProperty2,
    result: kEnumerableProperty2,
    error: kEnumerableProperty2,
    onloadstart: kEnumerableProperty2,
    onprogress: kEnumerableProperty2,
    onload: kEnumerableProperty2,
    onabort: kEnumerableProperty2,
    onerror: kEnumerableProperty2,
    onloadend: kEnumerableProperty2,
    [Symbol.toStringTag]: {
      value: "FileReader",
      writable: false,
      enumerable: false,
      configurable: true
    }
  });
  Object.defineProperties(FileReader, {
    EMPTY: staticPropertyDescriptors,
    LOADING: staticPropertyDescriptors,
    DONE: staticPropertyDescriptors
  });
  filereader = {
    FileReader
  };
  return filereader;
}
var symbols$1;
var hasRequiredSymbols$1;
function requireSymbols$1() {
  if (hasRequiredSymbols$1) return symbols$1;
  hasRequiredSymbols$1 = 1;
  symbols$1 = {
    kConstruct: symbols$4.kConstruct
  };
  return symbols$1;
}
var util$4;
var hasRequiredUtil$3;
function requireUtil$3() {
  if (hasRequiredUtil$3) return util$4;
  hasRequiredUtil$3 = 1;
  const assert2 = require$$0$1;
  const { URLSerializer } = requireDataUrl();
  const { isValidHeaderName } = requireUtil$5();
  function urlEquals(A, B, excludeFragment = false) {
    const serializedA = URLSerializer(A, excludeFragment);
    const serializedB = URLSerializer(B, excludeFragment);
    return serializedA === serializedB;
  }
  function getFieldValues(header) {
    assert2(header !== null);
    const values = [];
    for (let value of header.split(",")) {
      value = value.trim();
      if (isValidHeaderName(value)) {
        values.push(value);
      }
    }
    return values;
  }
  util$4 = {
    urlEquals,
    getFieldValues
  };
  return util$4;
}
var cache;
var hasRequiredCache;
function requireCache() {
  var _relevantRequestResponseList, _Cache_instances, batchCacheOperations_fn, queryCache_fn, requestMatchesCachedItem_fn, internalMatchAll_fn;
  if (hasRequiredCache) return cache;
  hasRequiredCache = 1;
  const { kConstruct: kConstruct2 } = requireSymbols$1();
  const { urlEquals, getFieldValues } = requireUtil$3();
  const { kEnumerableProperty: kEnumerableProperty2, isDisturbed: isDisturbed2 } = util$m;
  const { webidl } = requireWebidl();
  const { Response, cloneResponse, fromInnerResponse } = requireResponse();
  const { Request: Request3, fromInnerRequest } = requireRequest();
  const { kState } = requireSymbols$3();
  const { fetching } = requireFetch();
  const { urlIsHttpHttpsScheme, createDeferredPromise, readAllBytes } = requireUtil$5();
  const assert2 = require$$0$1;
  const _Cache = class _Cache {
    constructor() {
      __privateAdd(this, _Cache_instances);
      /**
       * @see https://w3c.github.io/ServiceWorker/#dfn-relevant-request-response-list
       * @type {requestResponseList}
       */
      __privateAdd(this, _relevantRequestResponseList);
      if (arguments[0] !== kConstruct2) {
        webidl.illegalConstructor();
      }
      webidl.util.markAsUncloneable(this);
      __privateSet(this, _relevantRequestResponseList, arguments[1]);
    }
    async match(request2, options = {}) {
      webidl.brandCheck(this, _Cache);
      const prefix = "Cache.match";
      webidl.argumentLengthCheck(arguments, 1, prefix);
      request2 = webidl.converters.RequestInfo(request2, prefix, "request");
      options = webidl.converters.CacheQueryOptions(options, prefix, "options");
      const p = __privateMethod(this, _Cache_instances, internalMatchAll_fn).call(this, request2, options, 1);
      if (p.length === 0) {
        return;
      }
      return p[0];
    }
    async matchAll(request2 = void 0, options = {}) {
      webidl.brandCheck(this, _Cache);
      const prefix = "Cache.matchAll";
      if (request2 !== void 0) request2 = webidl.converters.RequestInfo(request2, prefix, "request");
      options = webidl.converters.CacheQueryOptions(options, prefix, "options");
      return __privateMethod(this, _Cache_instances, internalMatchAll_fn).call(this, request2, options);
    }
    async add(request2) {
      webidl.brandCheck(this, _Cache);
      const prefix = "Cache.add";
      webidl.argumentLengthCheck(arguments, 1, prefix);
      request2 = webidl.converters.RequestInfo(request2, prefix, "request");
      const requests = [request2];
      const responseArrayPromise = this.addAll(requests);
      return await responseArrayPromise;
    }
    async addAll(requests) {
      webidl.brandCheck(this, _Cache);
      const prefix = "Cache.addAll";
      webidl.argumentLengthCheck(arguments, 1, prefix);
      const responsePromises = [];
      const requestList = [];
      for (let request2 of requests) {
        if (request2 === void 0) {
          throw webidl.errors.conversionFailed({
            prefix,
            argument: "Argument 1",
            types: ["undefined is not allowed"]
          });
        }
        request2 = webidl.converters.RequestInfo(request2);
        if (typeof request2 === "string") {
          continue;
        }
        const r = request2[kState];
        if (!urlIsHttpHttpsScheme(r.url) || r.method !== "GET") {
          throw webidl.errors.exception({
            header: prefix,
            message: "Expected http/s scheme when method is not GET."
          });
        }
      }
      const fetchControllers = [];
      for (const request2 of requests) {
        const r = new Request3(request2)[kState];
        if (!urlIsHttpHttpsScheme(r.url)) {
          throw webidl.errors.exception({
            header: prefix,
            message: "Expected http/s scheme."
          });
        }
        r.initiator = "fetch";
        r.destination = "subresource";
        requestList.push(r);
        const responsePromise = createDeferredPromise();
        fetchControllers.push(fetching({
          request: r,
          processResponse(response2) {
            if (response2.type === "error" || response2.status === 206 || response2.status < 200 || response2.status > 299) {
              responsePromise.reject(webidl.errors.exception({
                header: "Cache.addAll",
                message: "Received an invalid status code or the request failed."
              }));
            } else if (response2.headersList.contains("vary")) {
              const fieldValues = getFieldValues(response2.headersList.get("vary"));
              for (const fieldValue of fieldValues) {
                if (fieldValue === "*") {
                  responsePromise.reject(webidl.errors.exception({
                    header: "Cache.addAll",
                    message: "invalid vary field value"
                  }));
                  for (const controller of fetchControllers) {
                    controller.abort();
                  }
                  return;
                }
              }
            }
          },
          processResponseEndOfBody(response2) {
            if (response2.aborted) {
              responsePromise.reject(new DOMException("aborted", "AbortError"));
              return;
            }
            responsePromise.resolve(response2);
          }
        }));
        responsePromises.push(responsePromise.promise);
      }
      const p = Promise.all(responsePromises);
      const responses = await p;
      const operations = [];
      let index = 0;
      for (const response2 of responses) {
        const operation = {
          type: "put",
          // 7.3.2
          request: requestList[index],
          // 7.3.3
          response: response2
          // 7.3.4
        };
        operations.push(operation);
        index++;
      }
      const cacheJobPromise = createDeferredPromise();
      let errorData = null;
      try {
        __privateMethod(this, _Cache_instances, batchCacheOperations_fn).call(this, operations);
      } catch (e) {
        errorData = e;
      }
      queueMicrotask(() => {
        if (errorData === null) {
          cacheJobPromise.resolve(void 0);
        } else {
          cacheJobPromise.reject(errorData);
        }
      });
      return cacheJobPromise.promise;
    }
    async put(request2, response2) {
      webidl.brandCheck(this, _Cache);
      const prefix = "Cache.put";
      webidl.argumentLengthCheck(arguments, 2, prefix);
      request2 = webidl.converters.RequestInfo(request2, prefix, "request");
      response2 = webidl.converters.Response(response2, prefix, "response");
      let innerRequest = null;
      if (request2 instanceof Request3) {
        innerRequest = request2[kState];
      } else {
        innerRequest = new Request3(request2)[kState];
      }
      if (!urlIsHttpHttpsScheme(innerRequest.url) || innerRequest.method !== "GET") {
        throw webidl.errors.exception({
          header: prefix,
          message: "Expected an http/s scheme when method is not GET"
        });
      }
      const innerResponse = response2[kState];
      if (innerResponse.status === 206) {
        throw webidl.errors.exception({
          header: prefix,
          message: "Got 206 status"
        });
      }
      if (innerResponse.headersList.contains("vary")) {
        const fieldValues = getFieldValues(innerResponse.headersList.get("vary"));
        for (const fieldValue of fieldValues) {
          if (fieldValue === "*") {
            throw webidl.errors.exception({
              header: prefix,
              message: "Got * vary field value"
            });
          }
        }
      }
      if (innerResponse.body && (isDisturbed2(innerResponse.body.stream) || innerResponse.body.stream.locked)) {
        throw webidl.errors.exception({
          header: prefix,
          message: "Response body is locked or disturbed"
        });
      }
      const clonedResponse = cloneResponse(innerResponse);
      const bodyReadPromise = createDeferredPromise();
      if (innerResponse.body != null) {
        const stream2 = innerResponse.body.stream;
        const reader = stream2.getReader();
        readAllBytes(reader).then(bodyReadPromise.resolve, bodyReadPromise.reject);
      } else {
        bodyReadPromise.resolve(void 0);
      }
      const operations = [];
      const operation = {
        type: "put",
        // 14.
        request: innerRequest,
        // 15.
        response: clonedResponse
        // 16.
      };
      operations.push(operation);
      const bytes = await bodyReadPromise.promise;
      if (clonedResponse.body != null) {
        clonedResponse.body.source = bytes;
      }
      const cacheJobPromise = createDeferredPromise();
      let errorData = null;
      try {
        __privateMethod(this, _Cache_instances, batchCacheOperations_fn).call(this, operations);
      } catch (e) {
        errorData = e;
      }
      queueMicrotask(() => {
        if (errorData === null) {
          cacheJobPromise.resolve();
        } else {
          cacheJobPromise.reject(errorData);
        }
      });
      return cacheJobPromise.promise;
    }
    async delete(request2, options = {}) {
      webidl.brandCheck(this, _Cache);
      const prefix = "Cache.delete";
      webidl.argumentLengthCheck(arguments, 1, prefix);
      request2 = webidl.converters.RequestInfo(request2, prefix, "request");
      options = webidl.converters.CacheQueryOptions(options, prefix, "options");
      let r = null;
      if (request2 instanceof Request3) {
        r = request2[kState];
        if (r.method !== "GET" && !options.ignoreMethod) {
          return false;
        }
      } else {
        assert2(typeof request2 === "string");
        r = new Request3(request2)[kState];
      }
      const operations = [];
      const operation = {
        type: "delete",
        request: r,
        options
      };
      operations.push(operation);
      const cacheJobPromise = createDeferredPromise();
      let errorData = null;
      let requestResponses;
      try {
        requestResponses = __privateMethod(this, _Cache_instances, batchCacheOperations_fn).call(this, operations);
      } catch (e) {
        errorData = e;
      }
      queueMicrotask(() => {
        if (errorData === null) {
          cacheJobPromise.resolve(!!(requestResponses == null ? void 0 : requestResponses.length));
        } else {
          cacheJobPromise.reject(errorData);
        }
      });
      return cacheJobPromise.promise;
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#dom-cache-keys
     * @param {any} request
     * @param {import('../../types/cache').CacheQueryOptions} options
     * @returns {Promise<readonly Request[]>}
     */
    async keys(request2 = void 0, options = {}) {
      webidl.brandCheck(this, _Cache);
      const prefix = "Cache.keys";
      if (request2 !== void 0) request2 = webidl.converters.RequestInfo(request2, prefix, "request");
      options = webidl.converters.CacheQueryOptions(options, prefix, "options");
      let r = null;
      if (request2 !== void 0) {
        if (request2 instanceof Request3) {
          r = request2[kState];
          if (r.method !== "GET" && !options.ignoreMethod) {
            return [];
          }
        } else if (typeof request2 === "string") {
          r = new Request3(request2)[kState];
        }
      }
      const promise = createDeferredPromise();
      const requests = [];
      if (request2 === void 0) {
        for (const requestResponse of __privateGet(this, _relevantRequestResponseList)) {
          requests.push(requestResponse[0]);
        }
      } else {
        const requestResponses = __privateMethod(this, _Cache_instances, queryCache_fn).call(this, r, options);
        for (const requestResponse of requestResponses) {
          requests.push(requestResponse[0]);
        }
      }
      queueMicrotask(() => {
        const requestList = [];
        for (const request3 of requests) {
          const requestObject = fromInnerRequest(
            request3,
            new AbortController().signal,
            "immutable"
          );
          requestList.push(requestObject);
        }
        promise.resolve(Object.freeze(requestList));
      });
      return promise.promise;
    }
  };
  _relevantRequestResponseList = new WeakMap();
  _Cache_instances = new WeakSet();
  /**
   * @see https://w3c.github.io/ServiceWorker/#batch-cache-operations-algorithm
   * @param {CacheBatchOperation[]} operations
   * @returns {requestResponseList}
   */
  batchCacheOperations_fn = function(operations) {
    const cache2 = __privateGet(this, _relevantRequestResponseList);
    const backupCache = [...cache2];
    const addedItems = [];
    const resultList = [];
    try {
      for (const operation of operations) {
        if (operation.type !== "delete" && operation.type !== "put") {
          throw webidl.errors.exception({
            header: "Cache.#batchCacheOperations",
            message: 'operation type does not match "delete" or "put"'
          });
        }
        if (operation.type === "delete" && operation.response != null) {
          throw webidl.errors.exception({
            header: "Cache.#batchCacheOperations",
            message: "delete operation should not have an associated response"
          });
        }
        if (__privateMethod(this, _Cache_instances, queryCache_fn).call(this, operation.request, operation.options, addedItems).length) {
          throw new DOMException("???", "InvalidStateError");
        }
        let requestResponses;
        if (operation.type === "delete") {
          requestResponses = __privateMethod(this, _Cache_instances, queryCache_fn).call(this, operation.request, operation.options);
          if (requestResponses.length === 0) {
            return [];
          }
          for (const requestResponse of requestResponses) {
            const idx = cache2.indexOf(requestResponse);
            assert2(idx !== -1);
            cache2.splice(idx, 1);
          }
        } else if (operation.type === "put") {
          if (operation.response == null) {
            throw webidl.errors.exception({
              header: "Cache.#batchCacheOperations",
              message: "put operation should have an associated response"
            });
          }
          const r = operation.request;
          if (!urlIsHttpHttpsScheme(r.url)) {
            throw webidl.errors.exception({
              header: "Cache.#batchCacheOperations",
              message: "expected http or https scheme"
            });
          }
          if (r.method !== "GET") {
            throw webidl.errors.exception({
              header: "Cache.#batchCacheOperations",
              message: "not get method"
            });
          }
          if (operation.options != null) {
            throw webidl.errors.exception({
              header: "Cache.#batchCacheOperations",
              message: "options must not be defined"
            });
          }
          requestResponses = __privateMethod(this, _Cache_instances, queryCache_fn).call(this, operation.request);
          for (const requestResponse of requestResponses) {
            const idx = cache2.indexOf(requestResponse);
            assert2(idx !== -1);
            cache2.splice(idx, 1);
          }
          cache2.push([operation.request, operation.response]);
          addedItems.push([operation.request, operation.response]);
        }
        resultList.push([operation.request, operation.response]);
      }
      return resultList;
    } catch (e) {
      __privateGet(this, _relevantRequestResponseList).length = 0;
      __privateSet(this, _relevantRequestResponseList, backupCache);
      throw e;
    }
  };
  /**
   * @see https://w3c.github.io/ServiceWorker/#query-cache
   * @param {any} requestQuery
   * @param {import('../../types/cache').CacheQueryOptions} options
   * @param {requestResponseList} targetStorage
   * @returns {requestResponseList}
   */
  queryCache_fn = function(requestQuery, options, targetStorage) {
    const resultList = [];
    const storage = targetStorage ?? __privateGet(this, _relevantRequestResponseList);
    for (const requestResponse of storage) {
      const [cachedRequest, cachedResponse] = requestResponse;
      if (__privateMethod(this, _Cache_instances, requestMatchesCachedItem_fn).call(this, requestQuery, cachedRequest, cachedResponse, options)) {
        resultList.push(requestResponse);
      }
    }
    return resultList;
  };
  /**
   * @see https://w3c.github.io/ServiceWorker/#request-matches-cached-item-algorithm
   * @param {any} requestQuery
   * @param {any} request
   * @param {any | null} response
   * @param {import('../../types/cache').CacheQueryOptions | undefined} options
   * @returns {boolean}
   */
  requestMatchesCachedItem_fn = function(requestQuery, request2, response2 = null, options) {
    const queryURL = new URL(requestQuery.url);
    const cachedURL = new URL(request2.url);
    if (options == null ? void 0 : options.ignoreSearch) {
      cachedURL.search = "";
      queryURL.search = "";
    }
    if (!urlEquals(queryURL, cachedURL, true)) {
      return false;
    }
    if (response2 == null || (options == null ? void 0 : options.ignoreVary) || !response2.headersList.contains("vary")) {
      return true;
    }
    const fieldValues = getFieldValues(response2.headersList.get("vary"));
    for (const fieldValue of fieldValues) {
      if (fieldValue === "*") {
        return false;
      }
      const requestValue = request2.headersList.get(fieldValue);
      const queryValue = requestQuery.headersList.get(fieldValue);
      if (requestValue !== queryValue) {
        return false;
      }
    }
    return true;
  };
  internalMatchAll_fn = function(request2, options, maxResponses = Infinity) {
    let r = null;
    if (request2 !== void 0) {
      if (request2 instanceof Request3) {
        r = request2[kState];
        if (r.method !== "GET" && !options.ignoreMethod) {
          return [];
        }
      } else if (typeof request2 === "string") {
        r = new Request3(request2)[kState];
      }
    }
    const responses = [];
    if (request2 === void 0) {
      for (const requestResponse of __privateGet(this, _relevantRequestResponseList)) {
        responses.push(requestResponse[1]);
      }
    } else {
      const requestResponses = __privateMethod(this, _Cache_instances, queryCache_fn).call(this, r, options);
      for (const requestResponse of requestResponses) {
        responses.push(requestResponse[1]);
      }
    }
    const responseList = [];
    for (const response2 of responses) {
      const responseObject = fromInnerResponse(response2, "immutable");
      responseList.push(responseObject.clone());
      if (responseList.length >= maxResponses) {
        break;
      }
    }
    return Object.freeze(responseList);
  };
  let Cache = _Cache;
  Object.defineProperties(Cache.prototype, {
    [Symbol.toStringTag]: {
      value: "Cache",
      configurable: true
    },
    match: kEnumerableProperty2,
    matchAll: kEnumerableProperty2,
    add: kEnumerableProperty2,
    addAll: kEnumerableProperty2,
    put: kEnumerableProperty2,
    delete: kEnumerableProperty2,
    keys: kEnumerableProperty2
  });
  const cacheQueryOptionConverters = [
    {
      key: "ignoreSearch",
      converter: webidl.converters.boolean,
      defaultValue: () => false
    },
    {
      key: "ignoreMethod",
      converter: webidl.converters.boolean,
      defaultValue: () => false
    },
    {
      key: "ignoreVary",
      converter: webidl.converters.boolean,
      defaultValue: () => false
    }
  ];
  webidl.converters.CacheQueryOptions = webidl.dictionaryConverter(cacheQueryOptionConverters);
  webidl.converters.MultiCacheQueryOptions = webidl.dictionaryConverter([
    ...cacheQueryOptionConverters,
    {
      key: "cacheName",
      converter: webidl.converters.DOMString
    }
  ]);
  webidl.converters.Response = webidl.interfaceConverter(Response);
  webidl.converters["sequence<RequestInfo>"] = webidl.sequenceConverter(
    webidl.converters.RequestInfo
  );
  cache = {
    Cache
  };
  return cache;
}
var cachestorage;
var hasRequiredCachestorage;
function requireCachestorage() {
  var _caches;
  if (hasRequiredCachestorage) return cachestorage;
  hasRequiredCachestorage = 1;
  const { kConstruct: kConstruct2 } = requireSymbols$1();
  const { Cache } = requireCache();
  const { webidl } = requireWebidl();
  const { kEnumerableProperty: kEnumerableProperty2 } = util$m;
  const _CacheStorage = class _CacheStorage {
    constructor() {
      /**
       * @see https://w3c.github.io/ServiceWorker/#dfn-relevant-name-to-cache-map
       * @type {Map<string, import('./cache').requestResponseList}
       */
      __privateAdd(this, _caches, /* @__PURE__ */ new Map());
      if (arguments[0] !== kConstruct2) {
        webidl.illegalConstructor();
      }
      webidl.util.markAsUncloneable(this);
    }
    async match(request2, options = {}) {
      webidl.brandCheck(this, _CacheStorage);
      webidl.argumentLengthCheck(arguments, 1, "CacheStorage.match");
      request2 = webidl.converters.RequestInfo(request2);
      options = webidl.converters.MultiCacheQueryOptions(options);
      if (options.cacheName != null) {
        if (__privateGet(this, _caches).has(options.cacheName)) {
          const cacheList = __privateGet(this, _caches).get(options.cacheName);
          const cache2 = new Cache(kConstruct2, cacheList);
          return await cache2.match(request2, options);
        }
      } else {
        for (const cacheList of __privateGet(this, _caches).values()) {
          const cache2 = new Cache(kConstruct2, cacheList);
          const response2 = await cache2.match(request2, options);
          if (response2 !== void 0) {
            return response2;
          }
        }
      }
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#cache-storage-has
     * @param {string} cacheName
     * @returns {Promise<boolean>}
     */
    async has(cacheName) {
      webidl.brandCheck(this, _CacheStorage);
      const prefix = "CacheStorage.has";
      webidl.argumentLengthCheck(arguments, 1, prefix);
      cacheName = webidl.converters.DOMString(cacheName, prefix, "cacheName");
      return __privateGet(this, _caches).has(cacheName);
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#dom-cachestorage-open
     * @param {string} cacheName
     * @returns {Promise<Cache>}
     */
    async open(cacheName) {
      webidl.brandCheck(this, _CacheStorage);
      const prefix = "CacheStorage.open";
      webidl.argumentLengthCheck(arguments, 1, prefix);
      cacheName = webidl.converters.DOMString(cacheName, prefix, "cacheName");
      if (__privateGet(this, _caches).has(cacheName)) {
        const cache3 = __privateGet(this, _caches).get(cacheName);
        return new Cache(kConstruct2, cache3);
      }
      const cache2 = [];
      __privateGet(this, _caches).set(cacheName, cache2);
      return new Cache(kConstruct2, cache2);
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#cache-storage-delete
     * @param {string} cacheName
     * @returns {Promise<boolean>}
     */
    async delete(cacheName) {
      webidl.brandCheck(this, _CacheStorage);
      const prefix = "CacheStorage.delete";
      webidl.argumentLengthCheck(arguments, 1, prefix);
      cacheName = webidl.converters.DOMString(cacheName, prefix, "cacheName");
      return __privateGet(this, _caches).delete(cacheName);
    }
    /**
     * @see https://w3c.github.io/ServiceWorker/#cache-storage-keys
     * @returns {Promise<string[]>}
     */
    async keys() {
      webidl.brandCheck(this, _CacheStorage);
      const keys = __privateGet(this, _caches).keys();
      return [...keys];
    }
  };
  _caches = new WeakMap();
  let CacheStorage2 = _CacheStorage;
  Object.defineProperties(CacheStorage2.prototype, {
    [Symbol.toStringTag]: {
      value: "CacheStorage",
      configurable: true
    },
    match: kEnumerableProperty2,
    has: kEnumerableProperty2,
    open: kEnumerableProperty2,
    delete: kEnumerableProperty2,
    keys: kEnumerableProperty2
  });
  cachestorage = {
    CacheStorage: CacheStorage2
  };
  return cachestorage;
}
var constants$1;
var hasRequiredConstants$1;
function requireConstants$1() {
  if (hasRequiredConstants$1) return constants$1;
  hasRequiredConstants$1 = 1;
  const maxAttributeValueSize = 1024;
  const maxNameValuePairSize = 4096;
  constants$1 = {
    maxAttributeValueSize,
    maxNameValuePairSize
  };
  return constants$1;
}
var util$3;
var hasRequiredUtil$2;
function requireUtil$2() {
  if (hasRequiredUtil$2) return util$3;
  hasRequiredUtil$2 = 1;
  function isCTLExcludingHtab(value) {
    for (let i = 0; i < value.length; ++i) {
      const code = value.charCodeAt(i);
      if (code >= 0 && code <= 8 || code >= 10 && code <= 31 || code === 127) {
        return true;
      }
    }
    return false;
  }
  function validateCookieName(name) {
    for (let i = 0; i < name.length; ++i) {
      const code = name.charCodeAt(i);
      if (code < 33 || // exclude CTLs (0-31), SP and HT
      code > 126 || // exclude non-ascii and DEL
      code === 34 || // "
      code === 40 || // (
      code === 41 || // )
      code === 60 || // <
      code === 62 || // >
      code === 64 || // @
      code === 44 || // ,
      code === 59 || // ;
      code === 58 || // :
      code === 92 || // \
      code === 47 || // /
      code === 91 || // [
      code === 93 || // ]
      code === 63 || // ?
      code === 61 || // =
      code === 123 || // {
      code === 125) {
        throw new Error("Invalid cookie name");
      }
    }
  }
  function validateCookieValue(value) {
    let len = value.length;
    let i = 0;
    if (value[0] === '"') {
      if (len === 1 || value[len - 1] !== '"') {
        throw new Error("Invalid cookie value");
      }
      --len;
      ++i;
    }
    while (i < len) {
      const code = value.charCodeAt(i++);
      if (code < 33 || // exclude CTLs (0-31)
      code > 126 || // non-ascii and DEL (127)
      code === 34 || // "
      code === 44 || // ,
      code === 59 || // ;
      code === 92) {
        throw new Error("Invalid cookie value");
      }
    }
  }
  function validateCookiePath(path2) {
    for (let i = 0; i < path2.length; ++i) {
      const code = path2.charCodeAt(i);
      if (code < 32 || // exclude CTLs (0-31)
      code === 127 || // DEL
      code === 59) {
        throw new Error("Invalid cookie path");
      }
    }
  }
  function validateCookieDomain(domain) {
    if (domain.startsWith("-") || domain.endsWith(".") || domain.endsWith("-")) {
      throw new Error("Invalid cookie domain");
    }
  }
  const IMFDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  const IMFMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const IMFPaddedNumbers = Array(61).fill(0).map((_, i) => i.toString().padStart(2, "0"));
  function toIMFDate(date) {
    if (typeof date === "number") {
      date = new Date(date);
    }
    return `${IMFDays[date.getUTCDay()]}, ${IMFPaddedNumbers[date.getUTCDate()]} ${IMFMonths[date.getUTCMonth()]} ${date.getUTCFullYear()} ${IMFPaddedNumbers[date.getUTCHours()]}:${IMFPaddedNumbers[date.getUTCMinutes()]}:${IMFPaddedNumbers[date.getUTCSeconds()]} GMT`;
  }
  function validateCookieMaxAge(maxAge) {
    if (maxAge < 0) {
      throw new Error("Invalid cookie max-age");
    }
  }
  function stringify3(cookie) {
    if (cookie.name.length === 0) {
      return null;
    }
    validateCookieName(cookie.name);
    validateCookieValue(cookie.value);
    const out = [`${cookie.name}=${cookie.value}`];
    if (cookie.name.startsWith("__Secure-")) {
      cookie.secure = true;
    }
    if (cookie.name.startsWith("__Host-")) {
      cookie.secure = true;
      cookie.domain = null;
      cookie.path = "/";
    }
    if (cookie.secure) {
      out.push("Secure");
    }
    if (cookie.httpOnly) {
      out.push("HttpOnly");
    }
    if (typeof cookie.maxAge === "number") {
      validateCookieMaxAge(cookie.maxAge);
      out.push(`Max-Age=${cookie.maxAge}`);
    }
    if (cookie.domain) {
      validateCookieDomain(cookie.domain);
      out.push(`Domain=${cookie.domain}`);
    }
    if (cookie.path) {
      validateCookiePath(cookie.path);
      out.push(`Path=${cookie.path}`);
    }
    if (cookie.expires && cookie.expires.toString() !== "Invalid Date") {
      out.push(`Expires=${toIMFDate(cookie.expires)}`);
    }
    if (cookie.sameSite) {
      out.push(`SameSite=${cookie.sameSite}`);
    }
    for (const part of cookie.unparsed) {
      if (!part.includes("=")) {
        throw new Error("Invalid unparsed");
      }
      const [key2, ...value] = part.split("=");
      out.push(`${key2.trim()}=${value.join("=")}`);
    }
    return out.join("; ");
  }
  util$3 = {
    isCTLExcludingHtab,
    validateCookieName,
    validateCookiePath,
    validateCookieValue,
    toIMFDate,
    stringify: stringify3
  };
  return util$3;
}
var parse2;
var hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse2;
  hasRequiredParse = 1;
  const { maxNameValuePairSize, maxAttributeValueSize } = requireConstants$1();
  const { isCTLExcludingHtab } = requireUtil$2();
  const { collectASequenceOfCodePointsFast } = requireDataUrl();
  const assert2 = require$$0$1;
  function parseSetCookie(header) {
    if (isCTLExcludingHtab(header)) {
      return null;
    }
    let nameValuePair = "";
    let unparsedAttributes = "";
    let name = "";
    let value = "";
    if (header.includes(";")) {
      const position = { position: 0 };
      nameValuePair = collectASequenceOfCodePointsFast(";", header, position);
      unparsedAttributes = header.slice(position.position);
    } else {
      nameValuePair = header;
    }
    if (!nameValuePair.includes("=")) {
      value = nameValuePair;
    } else {
      const position = { position: 0 };
      name = collectASequenceOfCodePointsFast(
        "=",
        nameValuePair,
        position
      );
      value = nameValuePair.slice(position.position + 1);
    }
    name = name.trim();
    value = value.trim();
    if (name.length + value.length > maxNameValuePairSize) {
      return null;
    }
    return {
      name,
      value,
      ...parseUnparsedAttributes(unparsedAttributes)
    };
  }
  function parseUnparsedAttributes(unparsedAttributes, cookieAttributeList = {}) {
    if (unparsedAttributes.length === 0) {
      return cookieAttributeList;
    }
    assert2(unparsedAttributes[0] === ";");
    unparsedAttributes = unparsedAttributes.slice(1);
    let cookieAv = "";
    if (unparsedAttributes.includes(";")) {
      cookieAv = collectASequenceOfCodePointsFast(
        ";",
        unparsedAttributes,
        { position: 0 }
      );
      unparsedAttributes = unparsedAttributes.slice(cookieAv.length);
    } else {
      cookieAv = unparsedAttributes;
      unparsedAttributes = "";
    }
    let attributeName = "";
    let attributeValue = "";
    if (cookieAv.includes("=")) {
      const position = { position: 0 };
      attributeName = collectASequenceOfCodePointsFast(
        "=",
        cookieAv,
        position
      );
      attributeValue = cookieAv.slice(position.position + 1);
    } else {
      attributeName = cookieAv;
    }
    attributeName = attributeName.trim();
    attributeValue = attributeValue.trim();
    if (attributeValue.length > maxAttributeValueSize) {
      return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
    }
    const attributeNameLowercase = attributeName.toLowerCase();
    if (attributeNameLowercase === "expires") {
      const expiryTime = new Date(attributeValue);
      cookieAttributeList.expires = expiryTime;
    } else if (attributeNameLowercase === "max-age") {
      const charCode = attributeValue.charCodeAt(0);
      if ((charCode < 48 || charCode > 57) && attributeValue[0] !== "-") {
        return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
      }
      if (!/^\d+$/.test(attributeValue)) {
        return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
      }
      const deltaSeconds = Number(attributeValue);
      cookieAttributeList.maxAge = deltaSeconds;
    } else if (attributeNameLowercase === "domain") {
      let cookieDomain = attributeValue;
      if (cookieDomain[0] === ".") {
        cookieDomain = cookieDomain.slice(1);
      }
      cookieDomain = cookieDomain.toLowerCase();
      cookieAttributeList.domain = cookieDomain;
    } else if (attributeNameLowercase === "path") {
      let cookiePath = "";
      if (attributeValue.length === 0 || attributeValue[0] !== "/") {
        cookiePath = "/";
      } else {
        cookiePath = attributeValue;
      }
      cookieAttributeList.path = cookiePath;
    } else if (attributeNameLowercase === "secure") {
      cookieAttributeList.secure = true;
    } else if (attributeNameLowercase === "httponly") {
      cookieAttributeList.httpOnly = true;
    } else if (attributeNameLowercase === "samesite") {
      let enforcement = "Default";
      const attributeValueLowercase = attributeValue.toLowerCase();
      if (attributeValueLowercase.includes("none")) {
        enforcement = "None";
      }
      if (attributeValueLowercase.includes("strict")) {
        enforcement = "Strict";
      }
      if (attributeValueLowercase.includes("lax")) {
        enforcement = "Lax";
      }
      cookieAttributeList.sameSite = enforcement;
    } else {
      cookieAttributeList.unparsed ?? (cookieAttributeList.unparsed = []);
      cookieAttributeList.unparsed.push(`${attributeName}=${attributeValue}`);
    }
    return parseUnparsedAttributes(unparsedAttributes, cookieAttributeList);
  }
  parse2 = {
    parseSetCookie,
    parseUnparsedAttributes
  };
  return parse2;
}
var cookies;
var hasRequiredCookies;
function requireCookies() {
  if (hasRequiredCookies) return cookies;
  hasRequiredCookies = 1;
  const { parseSetCookie } = requireParse();
  const { stringify: stringify3 } = requireUtil$2();
  const { webidl } = requireWebidl();
  const { Headers } = requireHeaders();
  function getCookies2(headers2) {
    webidl.argumentLengthCheck(arguments, 1, "getCookies");
    webidl.brandCheck(headers2, Headers, { strict: false });
    const cookie = headers2.get("cookie");
    const out = {};
    if (!cookie) {
      return out;
    }
    for (const piece of cookie.split(";")) {
      const [name, ...value] = piece.split("=");
      out[name.trim()] = value.join("=");
    }
    return out;
  }
  function deleteCookie2(headers2, name, attributes) {
    webidl.brandCheck(headers2, Headers, { strict: false });
    const prefix = "deleteCookie";
    webidl.argumentLengthCheck(arguments, 2, prefix);
    name = webidl.converters.DOMString(name, prefix, "name");
    attributes = webidl.converters.DeleteCookieAttributes(attributes);
    setCookie2(headers2, {
      name,
      value: "",
      expires: /* @__PURE__ */ new Date(0),
      ...attributes
    });
  }
  function getSetCookies2(headers2) {
    webidl.argumentLengthCheck(arguments, 1, "getSetCookies");
    webidl.brandCheck(headers2, Headers, { strict: false });
    const cookies2 = headers2.getSetCookie();
    if (!cookies2) {
      return [];
    }
    return cookies2.map((pair) => parseSetCookie(pair));
  }
  function setCookie2(headers2, cookie) {
    webidl.argumentLengthCheck(arguments, 2, "setCookie");
    webidl.brandCheck(headers2, Headers, { strict: false });
    cookie = webidl.converters.Cookie(cookie);
    const str = stringify3(cookie);
    if (str) {
      headers2.append("Set-Cookie", str);
    }
  }
  webidl.converters.DeleteCookieAttributes = webidl.dictionaryConverter([
    {
      converter: webidl.nullableConverter(webidl.converters.DOMString),
      key: "path",
      defaultValue: () => null
    },
    {
      converter: webidl.nullableConverter(webidl.converters.DOMString),
      key: "domain",
      defaultValue: () => null
    }
  ]);
  webidl.converters.Cookie = webidl.dictionaryConverter([
    {
      converter: webidl.converters.DOMString,
      key: "name"
    },
    {
      converter: webidl.converters.DOMString,
      key: "value"
    },
    {
      converter: webidl.nullableConverter((value) => {
        if (typeof value === "number") {
          return webidl.converters["unsigned long long"](value);
        }
        return new Date(value);
      }),
      key: "expires",
      defaultValue: () => null
    },
    {
      converter: webidl.nullableConverter(webidl.converters["long long"]),
      key: "maxAge",
      defaultValue: () => null
    },
    {
      converter: webidl.nullableConverter(webidl.converters.DOMString),
      key: "domain",
      defaultValue: () => null
    },
    {
      converter: webidl.nullableConverter(webidl.converters.DOMString),
      key: "path",
      defaultValue: () => null
    },
    {
      converter: webidl.nullableConverter(webidl.converters.boolean),
      key: "secure",
      defaultValue: () => null
    },
    {
      converter: webidl.nullableConverter(webidl.converters.boolean),
      key: "httpOnly",
      defaultValue: () => null
    },
    {
      converter: webidl.converters.USVString,
      key: "sameSite",
      allowedValues: ["Strict", "Lax", "None"]
    },
    {
      converter: webidl.sequenceConverter(webidl.converters.DOMString),
      key: "unparsed",
      defaultValue: () => new Array(0)
    }
  ]);
  cookies = {
    getCookies: getCookies2,
    deleteCookie: deleteCookie2,
    getSetCookies: getSetCookies2,
    setCookie: setCookie2
  };
  return cookies;
}
var events;
var hasRequiredEvents;
function requireEvents() {
  var _eventInit, _eventInit2, _eventInit3;
  if (hasRequiredEvents) return events;
  hasRequiredEvents = 1;
  const { webidl } = requireWebidl();
  const { kEnumerableProperty: kEnumerableProperty2 } = util$m;
  const { kConstruct: kConstruct2 } = symbols$4;
  const { MessagePort } = require$$1;
  const _MessageEvent = class _MessageEvent extends Event {
    constructor(type, eventInitDict = {}) {
      var __super = (...args) => {
        super(...args);
        __privateAdd(this, _eventInit);
        return this;
      };
      if (type === kConstruct2) {
        __super(arguments[1], arguments[2]);
        webidl.util.markAsUncloneable(this);
        return;
      }
      const prefix = "MessageEvent constructor";
      webidl.argumentLengthCheck(arguments, 1, prefix);
      type = webidl.converters.DOMString(type, prefix, "type");
      eventInitDict = webidl.converters.MessageEventInit(eventInitDict, prefix, "eventInitDict");
      __super(type, eventInitDict);
      __privateSet(this, _eventInit, eventInitDict);
      webidl.util.markAsUncloneable(this);
    }
    get data() {
      webidl.brandCheck(this, _MessageEvent);
      return __privateGet(this, _eventInit).data;
    }
    get origin() {
      webidl.brandCheck(this, _MessageEvent);
      return __privateGet(this, _eventInit).origin;
    }
    get lastEventId() {
      webidl.brandCheck(this, _MessageEvent);
      return __privateGet(this, _eventInit).lastEventId;
    }
    get source() {
      webidl.brandCheck(this, _MessageEvent);
      return __privateGet(this, _eventInit).source;
    }
    get ports() {
      webidl.brandCheck(this, _MessageEvent);
      if (!Object.isFrozen(__privateGet(this, _eventInit).ports)) {
        Object.freeze(__privateGet(this, _eventInit).ports);
      }
      return __privateGet(this, _eventInit).ports;
    }
    initMessageEvent(type, bubbles = false, cancelable = false, data = null, origin = "", lastEventId = "", source2 = null, ports = []) {
      webidl.brandCheck(this, _MessageEvent);
      webidl.argumentLengthCheck(arguments, 1, "MessageEvent.initMessageEvent");
      return new _MessageEvent(type, {
        bubbles,
        cancelable,
        data,
        origin,
        lastEventId,
        source: source2,
        ports
      });
    }
    static createFastMessageEvent(type, init) {
      var _a2, _b2, _c2, _d2, _e2;
      const messageEvent = new _MessageEvent(kConstruct2, type, init);
      __privateSet(messageEvent, _eventInit, init);
      (_a2 = __privateGet(messageEvent, _eventInit)).data ?? (_a2.data = null);
      (_b2 = __privateGet(messageEvent, _eventInit)).origin ?? (_b2.origin = "");
      (_c2 = __privateGet(messageEvent, _eventInit)).lastEventId ?? (_c2.lastEventId = "");
      (_d2 = __privateGet(messageEvent, _eventInit)).source ?? (_d2.source = null);
      (_e2 = __privateGet(messageEvent, _eventInit)).ports ?? (_e2.ports = []);
      return messageEvent;
    }
  };
  _eventInit = new WeakMap();
  let MessageEvent2 = _MessageEvent;
  const { createFastMessageEvent } = MessageEvent2;
  delete MessageEvent2.createFastMessageEvent;
  const _CloseEvent = class _CloseEvent extends Event {
    constructor(type, eventInitDict = {}) {
      const prefix = "CloseEvent constructor";
      webidl.argumentLengthCheck(arguments, 1, prefix);
      type = webidl.converters.DOMString(type, prefix, "type");
      eventInitDict = webidl.converters.CloseEventInit(eventInitDict);
      super(type, eventInitDict);
      __privateAdd(this, _eventInit2);
      __privateSet(this, _eventInit2, eventInitDict);
      webidl.util.markAsUncloneable(this);
    }
    get wasClean() {
      webidl.brandCheck(this, _CloseEvent);
      return __privateGet(this, _eventInit2).wasClean;
    }
    get code() {
      webidl.brandCheck(this, _CloseEvent);
      return __privateGet(this, _eventInit2).code;
    }
    get reason() {
      webidl.brandCheck(this, _CloseEvent);
      return __privateGet(this, _eventInit2).reason;
    }
  };
  _eventInit2 = new WeakMap();
  let CloseEvent2 = _CloseEvent;
  const _ErrorEvent = class _ErrorEvent extends Event {
    constructor(type, eventInitDict) {
      const prefix = "ErrorEvent constructor";
      webidl.argumentLengthCheck(arguments, 1, prefix);
      super(type, eventInitDict);
      __privateAdd(this, _eventInit3);
      webidl.util.markAsUncloneable(this);
      type = webidl.converters.DOMString(type, prefix, "type");
      eventInitDict = webidl.converters.ErrorEventInit(eventInitDict ?? {});
      __privateSet(this, _eventInit3, eventInitDict);
    }
    get message() {
      webidl.brandCheck(this, _ErrorEvent);
      return __privateGet(this, _eventInit3).message;
    }
    get filename() {
      webidl.brandCheck(this, _ErrorEvent);
      return __privateGet(this, _eventInit3).filename;
    }
    get lineno() {
      webidl.brandCheck(this, _ErrorEvent);
      return __privateGet(this, _eventInit3).lineno;
    }
    get colno() {
      webidl.brandCheck(this, _ErrorEvent);
      return __privateGet(this, _eventInit3).colno;
    }
    get error() {
      webidl.brandCheck(this, _ErrorEvent);
      return __privateGet(this, _eventInit3).error;
    }
  };
  _eventInit3 = new WeakMap();
  let ErrorEvent2 = _ErrorEvent;
  Object.defineProperties(MessageEvent2.prototype, {
    [Symbol.toStringTag]: {
      value: "MessageEvent",
      configurable: true
    },
    data: kEnumerableProperty2,
    origin: kEnumerableProperty2,
    lastEventId: kEnumerableProperty2,
    source: kEnumerableProperty2,
    ports: kEnumerableProperty2,
    initMessageEvent: kEnumerableProperty2
  });
  Object.defineProperties(CloseEvent2.prototype, {
    [Symbol.toStringTag]: {
      value: "CloseEvent",
      configurable: true
    },
    reason: kEnumerableProperty2,
    code: kEnumerableProperty2,
    wasClean: kEnumerableProperty2
  });
  Object.defineProperties(ErrorEvent2.prototype, {
    [Symbol.toStringTag]: {
      value: "ErrorEvent",
      configurable: true
    },
    message: kEnumerableProperty2,
    filename: kEnumerableProperty2,
    lineno: kEnumerableProperty2,
    colno: kEnumerableProperty2,
    error: kEnumerableProperty2
  });
  webidl.converters.MessagePort = webidl.interfaceConverter(MessagePort);
  webidl.converters["sequence<MessagePort>"] = webidl.sequenceConverter(
    webidl.converters.MessagePort
  );
  const eventInit = [
    {
      key: "bubbles",
      converter: webidl.converters.boolean,
      defaultValue: () => false
    },
    {
      key: "cancelable",
      converter: webidl.converters.boolean,
      defaultValue: () => false
    },
    {
      key: "composed",
      converter: webidl.converters.boolean,
      defaultValue: () => false
    }
  ];
  webidl.converters.MessageEventInit = webidl.dictionaryConverter([
    ...eventInit,
    {
      key: "data",
      converter: webidl.converters.any,
      defaultValue: () => null
    },
    {
      key: "origin",
      converter: webidl.converters.USVString,
      defaultValue: () => ""
    },
    {
      key: "lastEventId",
      converter: webidl.converters.DOMString,
      defaultValue: () => ""
    },
    {
      key: "source",
      // Node doesn't implement WindowProxy or ServiceWorker, so the only
      // valid value for source is a MessagePort.
      converter: webidl.nullableConverter(webidl.converters.MessagePort),
      defaultValue: () => null
    },
    {
      key: "ports",
      converter: webidl.converters["sequence<MessagePort>"],
      defaultValue: () => new Array(0)
    }
  ]);
  webidl.converters.CloseEventInit = webidl.dictionaryConverter([
    ...eventInit,
    {
      key: "wasClean",
      converter: webidl.converters.boolean,
      defaultValue: () => false
    },
    {
      key: "code",
      converter: webidl.converters["unsigned short"],
      defaultValue: () => 0
    },
    {
      key: "reason",
      converter: webidl.converters.USVString,
      defaultValue: () => ""
    }
  ]);
  webidl.converters.ErrorEventInit = webidl.dictionaryConverter([
    ...eventInit,
    {
      key: "message",
      converter: webidl.converters.DOMString,
      defaultValue: () => ""
    },
    {
      key: "filename",
      converter: webidl.converters.USVString,
      defaultValue: () => ""
    },
    {
      key: "lineno",
      converter: webidl.converters["unsigned long"],
      defaultValue: () => 0
    },
    {
      key: "colno",
      converter: webidl.converters["unsigned long"],
      defaultValue: () => 0
    },
    {
      key: "error",
      converter: webidl.converters.any
    }
  ]);
  events = {
    MessageEvent: MessageEvent2,
    CloseEvent: CloseEvent2,
    ErrorEvent: ErrorEvent2,
    createFastMessageEvent
  };
  return events;
}
var constants;
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  const uid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
  const staticPropertyDescriptors = {
    enumerable: true,
    writable: false,
    configurable: false
  };
  const states = {
    CONNECTING: 0,
    OPEN: 1,
    CLOSING: 2,
    CLOSED: 3
  };
  const sentCloseFrameState = {
    NOT_SENT: 0,
    PROCESSING: 1,
    SENT: 2
  };
  const opcodes = {
    CONTINUATION: 0,
    TEXT: 1,
    BINARY: 2,
    CLOSE: 8,
    PING: 9,
    PONG: 10
  };
  const maxUnsigned16Bit = 2 ** 16 - 1;
  const parserStates = {
    INFO: 0,
    PAYLOADLENGTH_16: 2,
    PAYLOADLENGTH_64: 3,
    READ_DATA: 4
  };
  const emptyBuffer = Buffer.allocUnsafe(0);
  const sendHints = {
    string: 1,
    typedArray: 2,
    arrayBuffer: 3,
    blob: 4
  };
  constants = {
    uid,
    sentCloseFrameState,
    staticPropertyDescriptors,
    states,
    opcodes,
    maxUnsigned16Bit,
    parserStates,
    emptyBuffer,
    sendHints
  };
  return constants;
}
var symbols;
var hasRequiredSymbols;
function requireSymbols() {
  if (hasRequiredSymbols) return symbols;
  hasRequiredSymbols = 1;
  symbols = {
    kWebSocketURL: Symbol("url"),
    kReadyState: Symbol("ready state"),
    kController: Symbol("controller"),
    kResponse: Symbol("response"),
    kBinaryType: Symbol("binary type"),
    kSentClose: Symbol("sent close"),
    kReceivedClose: Symbol("received close"),
    kByteParser: Symbol("byte parser")
  };
  return symbols;
}
var util$2;
var hasRequiredUtil$1;
function requireUtil$1() {
  if (hasRequiredUtil$1) return util$2;
  hasRequiredUtil$1 = 1;
  const { kReadyState, kController, kResponse, kBinaryType, kWebSocketURL } = requireSymbols();
  const { states, opcodes } = requireConstants();
  const { ErrorEvent: ErrorEvent2, createFastMessageEvent } = requireEvents();
  const { isUtf8 } = require$$0;
  const { collectASequenceOfCodePointsFast, removeHTTPWhitespace } = requireDataUrl();
  function isConnecting(ws) {
    return ws[kReadyState] === states.CONNECTING;
  }
  function isEstablished(ws) {
    return ws[kReadyState] === states.OPEN;
  }
  function isClosing(ws) {
    return ws[kReadyState] === states.CLOSING;
  }
  function isClosed(ws) {
    return ws[kReadyState] === states.CLOSED;
  }
  function fireEvent(e, target, eventFactory = (type, init) => new Event(type, init), eventInitDict = {}) {
    const event = eventFactory(e, eventInitDict);
    target.dispatchEvent(event);
  }
  function websocketMessageReceived(ws, type, data) {
    if (ws[kReadyState] !== states.OPEN) {
      return;
    }
    let dataForEvent;
    if (type === opcodes.TEXT) {
      try {
        dataForEvent = utf8Decode(data);
      } catch {
        failWebsocketConnection(ws, "Received invalid UTF-8 in text frame.");
        return;
      }
    } else if (type === opcodes.BINARY) {
      if (ws[kBinaryType] === "blob") {
        dataForEvent = new Blob([data]);
      } else {
        dataForEvent = toArrayBuffer(data);
      }
    }
    fireEvent("message", ws, createFastMessageEvent, {
      origin: ws[kWebSocketURL].origin,
      data: dataForEvent
    });
  }
  function toArrayBuffer(buffer2) {
    if (buffer2.byteLength === buffer2.buffer.byteLength) {
      return buffer2.buffer;
    }
    return buffer2.buffer.slice(buffer2.byteOffset, buffer2.byteOffset + buffer2.byteLength);
  }
  function isValidSubprotocol(protocol) {
    if (protocol.length === 0) {
      return false;
    }
    for (let i = 0; i < protocol.length; ++i) {
      const code = protocol.charCodeAt(i);
      if (code < 33 || // CTL, contains SP (0x20) and HT (0x09)
      code > 126 || code === 34 || // "
      code === 40 || // (
      code === 41 || // )
      code === 44 || // ,
      code === 47 || // /
      code === 58 || // :
      code === 59 || // ;
      code === 60 || // <
      code === 61 || // =
      code === 62 || // >
      code === 63 || // ?
      code === 64 || // @
      code === 91 || // [
      code === 92 || // \
      code === 93 || // ]
      code === 123 || // {
      code === 125) {
        return false;
      }
    }
    return true;
  }
  function isValidStatusCode(code) {
    if (code >= 1e3 && code < 1015) {
      return code !== 1004 && // reserved
      code !== 1005 && // "MUST NOT be set as a status code"
      code !== 1006;
    }
    return code >= 3e3 && code <= 4999;
  }
  function failWebsocketConnection(ws, reason) {
    const { [kController]: controller, [kResponse]: response2 } = ws;
    controller.abort();
    if ((response2 == null ? void 0 : response2.socket) && !response2.socket.destroyed) {
      response2.socket.destroy();
    }
    if (reason) {
      fireEvent("error", ws, (type, init) => new ErrorEvent2(type, init), {
        error: new Error(reason),
        message: reason
      });
    }
  }
  function isControlFrame(opcode) {
    return opcode === opcodes.CLOSE || opcode === opcodes.PING || opcode === opcodes.PONG;
  }
  function isContinuationFrame(opcode) {
    return opcode === opcodes.CONTINUATION;
  }
  function isTextBinaryFrame(opcode) {
    return opcode === opcodes.TEXT || opcode === opcodes.BINARY;
  }
  function isValidOpcode(opcode) {
    return isTextBinaryFrame(opcode) || isContinuationFrame(opcode) || isControlFrame(opcode);
  }
  function parseExtensions(extensions) {
    const position = { position: 0 };
    const extensionList = /* @__PURE__ */ new Map();
    while (position.position < extensions.length) {
      const pair = collectASequenceOfCodePointsFast(";", extensions, position);
      const [name, value = ""] = pair.split("=");
      extensionList.set(
        removeHTTPWhitespace(name, true, false),
        removeHTTPWhitespace(value, false, true)
      );
      position.position++;
    }
    return extensionList;
  }
  function isValidClientWindowBits(value) {
    for (let i = 0; i < value.length; i++) {
      const byte = value.charCodeAt(i);
      if (byte < 48 || byte > 57) {
        return false;
      }
    }
    return true;
  }
  const hasIntl = typeof process.versions.icu === "string";
  const fatalDecoder = hasIntl ? new TextDecoder("utf-8", { fatal: true }) : void 0;
  const utf8Decode = hasIntl ? fatalDecoder.decode.bind(fatalDecoder) : function(buffer2) {
    if (isUtf8(buffer2)) {
      return buffer2.toString("utf-8");
    }
    throw new TypeError("Invalid utf-8 received.");
  };
  util$2 = {
    isConnecting,
    isEstablished,
    isClosing,
    isClosed,
    fireEvent,
    isValidSubprotocol,
    isValidStatusCode,
    failWebsocketConnection,
    websocketMessageReceived,
    utf8Decode,
    isControlFrame,
    isContinuationFrame,
    isTextBinaryFrame,
    isValidOpcode,
    parseExtensions,
    isValidClientWindowBits
  };
  return util$2;
}
var frame;
var hasRequiredFrame;
function requireFrame() {
  if (hasRequiredFrame) return frame;
  hasRequiredFrame = 1;
  const { maxUnsigned16Bit } = requireConstants();
  const BUFFER_SIZE = 16386;
  let crypto;
  let buffer2 = null;
  let bufIdx = BUFFER_SIZE;
  try {
    crypto = require("node:crypto");
  } catch {
    crypto = {
      // not full compatibility, but minimum.
      randomFillSync: function randomFillSync(buffer3, _offset, _size) {
        for (let i = 0; i < buffer3.length; ++i) {
          buffer3[i] = Math.random() * 255 | 0;
        }
        return buffer3;
      }
    };
  }
  function generateMask() {
    if (bufIdx === BUFFER_SIZE) {
      bufIdx = 0;
      crypto.randomFillSync(buffer2 ?? (buffer2 = Buffer.allocUnsafe(BUFFER_SIZE)), 0, BUFFER_SIZE);
    }
    return [buffer2[bufIdx++], buffer2[bufIdx++], buffer2[bufIdx++], buffer2[bufIdx++]];
  }
  class WebsocketFrameSend {
    /**
     * @param {Buffer|undefined} data
     */
    constructor(data) {
      this.frameData = data;
    }
    createFrame(opcode) {
      const frameData = this.frameData;
      const maskKey = generateMask();
      const bodyLength2 = (frameData == null ? void 0 : frameData.byteLength) ?? 0;
      let payloadLength = bodyLength2;
      let offset = 6;
      if (bodyLength2 > maxUnsigned16Bit) {
        offset += 8;
        payloadLength = 127;
      } else if (bodyLength2 > 125) {
        offset += 2;
        payloadLength = 126;
      }
      const buffer3 = Buffer.allocUnsafe(bodyLength2 + offset);
      buffer3[0] = buffer3[1] = 0;
      buffer3[0] |= 128;
      buffer3[0] = (buffer3[0] & 240) + opcode;
      /*! ws. MIT License. Einar Otto Stangvik <einaros@gmail.com> */
      buffer3[offset - 4] = maskKey[0];
      buffer3[offset - 3] = maskKey[1];
      buffer3[offset - 2] = maskKey[2];
      buffer3[offset - 1] = maskKey[3];
      buffer3[1] = payloadLength;
      if (payloadLength === 126) {
        buffer3.writeUInt16BE(bodyLength2, 2);
      } else if (payloadLength === 127) {
        buffer3[2] = buffer3[3] = 0;
        buffer3.writeUIntBE(bodyLength2, 4, 6);
      }
      buffer3[1] |= 128;
      for (let i = 0; i < bodyLength2; ++i) {
        buffer3[offset + i] = frameData[i] ^ maskKey[i & 3];
      }
      return buffer3;
    }
  }
  frame = {
    WebsocketFrameSend
  };
  return frame;
}
var connection;
var hasRequiredConnection;
function requireConnection() {
  if (hasRequiredConnection) return connection;
  hasRequiredConnection = 1;
  const { uid, states, sentCloseFrameState, emptyBuffer, opcodes } = requireConstants();
  const {
    kReadyState,
    kSentClose,
    kByteParser,
    kReceivedClose,
    kResponse
  } = requireSymbols();
  const { fireEvent, failWebsocketConnection, isClosing, isClosed, isEstablished, parseExtensions } = requireUtil$1();
  const { channels: channels2 } = diagnostics;
  const { CloseEvent: CloseEvent2 } = requireEvents();
  const { makeRequest } = requireRequest();
  const { fetching } = requireFetch();
  const { Headers, getHeadersList } = requireHeaders();
  const { getDecodeSplit } = requireUtil$5();
  const { WebsocketFrameSend } = requireFrame();
  let crypto;
  try {
    crypto = require("node:crypto");
  } catch {
  }
  function establishWebSocketConnection(url, protocols, client2, ws, onEstablish, options) {
    const requestURL = url;
    requestURL.protocol = url.protocol === "ws:" ? "http:" : "https:";
    const request2 = makeRequest({
      urlList: [requestURL],
      client: client2,
      serviceWorkers: "none",
      referrer: "no-referrer",
      mode: "websocket",
      credentials: "include",
      cache: "no-store",
      redirect: "error"
    });
    if (options.headers) {
      const headersList = getHeadersList(new Headers(options.headers));
      request2.headersList = headersList;
    }
    const keyValue = crypto.randomBytes(16).toString("base64");
    request2.headersList.append("sec-websocket-key", keyValue);
    request2.headersList.append("sec-websocket-version", "13");
    for (const protocol of protocols) {
      request2.headersList.append("sec-websocket-protocol", protocol);
    }
    const permessageDeflate2 = "permessage-deflate; client_max_window_bits";
    request2.headersList.append("sec-websocket-extensions", permessageDeflate2);
    const controller = fetching({
      request: request2,
      useParallelQueue: true,
      dispatcher: options.dispatcher,
      processResponse(response2) {
        var _a2, _b2;
        if (response2.type === "error" || response2.status !== 101) {
          failWebsocketConnection(ws, "Received network error or non-101 status code.");
          return;
        }
        if (protocols.length !== 0 && !response2.headersList.get("Sec-WebSocket-Protocol")) {
          failWebsocketConnection(ws, "Server did not respond with sent protocols.");
          return;
        }
        if (((_a2 = response2.headersList.get("Upgrade")) == null ? void 0 : _a2.toLowerCase()) !== "websocket") {
          failWebsocketConnection(ws, 'Server did not set Upgrade header to "websocket".');
          return;
        }
        if (((_b2 = response2.headersList.get("Connection")) == null ? void 0 : _b2.toLowerCase()) !== "upgrade") {
          failWebsocketConnection(ws, 'Server did not set Connection header to "upgrade".');
          return;
        }
        const secWSAccept = response2.headersList.get("Sec-WebSocket-Accept");
        const digest = crypto.createHash("sha1").update(keyValue + uid).digest("base64");
        if (secWSAccept !== digest) {
          failWebsocketConnection(ws, "Incorrect hash received in Sec-WebSocket-Accept header.");
          return;
        }
        const secExtension = response2.headersList.get("Sec-WebSocket-Extensions");
        let extensions;
        if (secExtension !== null) {
          extensions = parseExtensions(secExtension);
          if (!extensions.has("permessage-deflate")) {
            failWebsocketConnection(ws, "Sec-WebSocket-Extensions header does not match.");
            return;
          }
        }
        const secProtocol = response2.headersList.get("Sec-WebSocket-Protocol");
        if (secProtocol !== null) {
          const requestProtocols = getDecodeSplit("sec-websocket-protocol", request2.headersList);
          if (!requestProtocols.includes(secProtocol)) {
            failWebsocketConnection(ws, "Protocol was not set in the opening handshake.");
            return;
          }
        }
        response2.socket.on("data", onSocketData);
        response2.socket.on("close", onSocketClose);
        response2.socket.on("error", onSocketError);
        if (channels2.open.hasSubscribers) {
          channels2.open.publish({
            address: response2.socket.address(),
            protocol: secProtocol,
            extensions: secExtension
          });
        }
        onEstablish(response2, extensions);
      }
    });
    return controller;
  }
  function closeWebSocketConnection(ws, code, reason, reasonByteLength) {
    if (isClosing(ws) || isClosed(ws)) ;
    else if (!isEstablished(ws)) {
      failWebsocketConnection(ws, "Connection was closed before it was established.");
      ws[kReadyState] = states.CLOSING;
    } else if (ws[kSentClose] === sentCloseFrameState.NOT_SENT) {
      ws[kSentClose] = sentCloseFrameState.PROCESSING;
      const frame2 = new WebsocketFrameSend();
      if (code !== void 0 && reason === void 0) {
        frame2.frameData = Buffer.allocUnsafe(2);
        frame2.frameData.writeUInt16BE(code, 0);
      } else if (code !== void 0 && reason !== void 0) {
        frame2.frameData = Buffer.allocUnsafe(2 + reasonByteLength);
        frame2.frameData.writeUInt16BE(code, 0);
        frame2.frameData.write(reason, 2, "utf-8");
      } else {
        frame2.frameData = emptyBuffer;
      }
      const socket = ws[kResponse].socket;
      socket.write(frame2.createFrame(opcodes.CLOSE));
      ws[kSentClose] = sentCloseFrameState.SENT;
      ws[kReadyState] = states.CLOSING;
    } else {
      ws[kReadyState] = states.CLOSING;
    }
  }
  function onSocketData(chunk) {
    if (!this.ws[kByteParser].write(chunk)) {
      this.pause();
    }
  }
  function onSocketClose() {
    const { ws } = this;
    const { [kResponse]: response2 } = ws;
    response2.socket.off("data", onSocketData);
    response2.socket.off("close", onSocketClose);
    response2.socket.off("error", onSocketError);
    const wasClean = ws[kSentClose] === sentCloseFrameState.SENT && ws[kReceivedClose];
    let code = 1005;
    let reason = "";
    const result = ws[kByteParser].closingInfo;
    if (result && !result.error) {
      code = result.code ?? 1005;
      reason = result.reason;
    } else if (!ws[kReceivedClose]) {
      code = 1006;
    }
    ws[kReadyState] = states.CLOSED;
    fireEvent("close", ws, (type, init) => new CloseEvent2(type, init), {
      wasClean,
      code,
      reason
    });
    if (channels2.close.hasSubscribers) {
      channels2.close.publish({
        websocket: ws,
        code,
        reason
      });
    }
  }
  function onSocketError(error) {
    const { ws } = this;
    ws[kReadyState] = states.CLOSING;
    if (channels2.socketError.hasSubscribers) {
      channels2.socketError.publish(error);
    }
    this.destroy();
  }
  connection = {
    establishWebSocketConnection,
    closeWebSocketConnection
  };
  return connection;
}
var permessageDeflate;
var hasRequiredPermessageDeflate;
function requirePermessageDeflate() {
  var _inflate, _options;
  if (hasRequiredPermessageDeflate) return permessageDeflate;
  hasRequiredPermessageDeflate = 1;
  const { createInflateRaw, Z_DEFAULT_WINDOWBITS } = require$$1$1;
  const { isValidClientWindowBits } = requireUtil$1();
  const tail = Buffer.from([0, 0, 255, 255]);
  const kBuffer = Symbol("kBuffer");
  const kLength = Symbol("kLength");
  class PerMessageDeflate {
    constructor(extensions) {
      /** @type {import('node:zlib').InflateRaw} */
      __privateAdd(this, _inflate);
      __privateAdd(this, _options, {});
      __privateGet(this, _options).serverNoContextTakeover = extensions.has("server_no_context_takeover");
      __privateGet(this, _options).serverMaxWindowBits = extensions.get("server_max_window_bits");
    }
    decompress(chunk, fin, callback) {
      if (!__privateGet(this, _inflate)) {
        let windowBits = Z_DEFAULT_WINDOWBITS;
        if (__privateGet(this, _options).serverMaxWindowBits) {
          if (!isValidClientWindowBits(__privateGet(this, _options).serverMaxWindowBits)) {
            callback(new Error("Invalid server_max_window_bits"));
            return;
          }
          windowBits = Number.parseInt(__privateGet(this, _options).serverMaxWindowBits);
        }
        __privateSet(this, _inflate, createInflateRaw({ windowBits }));
        __privateGet(this, _inflate)[kBuffer] = [];
        __privateGet(this, _inflate)[kLength] = 0;
        __privateGet(this, _inflate).on("data", (data) => {
          __privateGet(this, _inflate)[kBuffer].push(data);
          __privateGet(this, _inflate)[kLength] += data.length;
        });
        __privateGet(this, _inflate).on("error", (err) => {
          __privateSet(this, _inflate, null);
          callback(err);
        });
      }
      __privateGet(this, _inflate).write(chunk);
      if (fin) {
        __privateGet(this, _inflate).write(tail);
      }
      __privateGet(this, _inflate).flush(() => {
        const full = Buffer.concat(__privateGet(this, _inflate)[kBuffer], __privateGet(this, _inflate)[kLength]);
        __privateGet(this, _inflate)[kBuffer].length = 0;
        __privateGet(this, _inflate)[kLength] = 0;
        callback(null, full);
      });
    }
  }
  _inflate = new WeakMap();
  _options = new WeakMap();
  permessageDeflate = { PerMessageDeflate };
  return permessageDeflate;
}
var receiver;
var hasRequiredReceiver;
function requireReceiver() {
  var _buffers, _byteOffset, _loop, _state, _info, _fragments, _extensions;
  if (hasRequiredReceiver) return receiver;
  hasRequiredReceiver = 1;
  const { Writable } = require$$0$2;
  const assert2 = require$$0$1;
  const { parserStates, opcodes, states, emptyBuffer, sentCloseFrameState } = requireConstants();
  const { kReadyState, kSentClose, kResponse, kReceivedClose } = requireSymbols();
  const { channels: channels2 } = diagnostics;
  const {
    isValidStatusCode,
    isValidOpcode,
    failWebsocketConnection,
    websocketMessageReceived,
    utf8Decode,
    isControlFrame,
    isTextBinaryFrame,
    isContinuationFrame
  } = requireUtil$1();
  const { WebsocketFrameSend } = requireFrame();
  const { closeWebSocketConnection } = requireConnection();
  const { PerMessageDeflate } = requirePermessageDeflate();
  class ByteParser extends Writable {
    constructor(ws, extensions) {
      super();
      __privateAdd(this, _buffers, []);
      __privateAdd(this, _byteOffset, 0);
      __privateAdd(this, _loop, false);
      __privateAdd(this, _state, parserStates.INFO);
      __privateAdd(this, _info, {});
      __privateAdd(this, _fragments, []);
      /** @type {Map<string, PerMessageDeflate>} */
      __privateAdd(this, _extensions);
      this.ws = ws;
      __privateSet(this, _extensions, extensions == null ? /* @__PURE__ */ new Map() : extensions);
      if (__privateGet(this, _extensions).has("permessage-deflate")) {
        __privateGet(this, _extensions).set("permessage-deflate", new PerMessageDeflate(extensions));
      }
    }
    /**
     * @param {Buffer} chunk
     * @param {() => void} callback
     */
    _write(chunk, _, callback) {
      __privateGet(this, _buffers).push(chunk);
      __privateSet(this, _byteOffset, __privateGet(this, _byteOffset) + chunk.length);
      __privateSet(this, _loop, true);
      this.run(callback);
    }
    /**
     * Runs whenever a new chunk is received.
     * Callback is called whenever there are no more chunks buffering,
     * or not enough bytes are buffered to parse.
     */
    run(callback) {
      while (__privateGet(this, _loop)) {
        if (__privateGet(this, _state) === parserStates.INFO) {
          if (__privateGet(this, _byteOffset) < 2) {
            return callback();
          }
          const buffer2 = this.consume(2);
          const fin = (buffer2[0] & 128) !== 0;
          const opcode = buffer2[0] & 15;
          const masked = (buffer2[1] & 128) === 128;
          const fragmented = !fin && opcode !== opcodes.CONTINUATION;
          const payloadLength = buffer2[1] & 127;
          const rsv1 = buffer2[0] & 64;
          const rsv2 = buffer2[0] & 32;
          const rsv3 = buffer2[0] & 16;
          if (!isValidOpcode(opcode)) {
            failWebsocketConnection(this.ws, "Invalid opcode received");
            return callback();
          }
          if (masked) {
            failWebsocketConnection(this.ws, "Frame cannot be masked");
            return callback();
          }
          if (rsv1 !== 0 && !__privateGet(this, _extensions).has("permessage-deflate")) {
            failWebsocketConnection(this.ws, "Expected RSV1 to be clear.");
            return;
          }
          if (rsv2 !== 0 || rsv3 !== 0) {
            failWebsocketConnection(this.ws, "RSV1, RSV2, RSV3 must be clear");
            return;
          }
          if (fragmented && !isTextBinaryFrame(opcode)) {
            failWebsocketConnection(this.ws, "Invalid frame type was fragmented.");
            return;
          }
          if (isTextBinaryFrame(opcode) && __privateGet(this, _fragments).length > 0) {
            failWebsocketConnection(this.ws, "Expected continuation frame");
            return;
          }
          if (__privateGet(this, _info).fragmented && fragmented) {
            failWebsocketConnection(this.ws, "Fragmented frame exceeded 125 bytes.");
            return;
          }
          if ((payloadLength > 125 || fragmented) && isControlFrame(opcode)) {
            failWebsocketConnection(this.ws, "Control frame either too large or fragmented");
            return;
          }
          if (isContinuationFrame(opcode) && __privateGet(this, _fragments).length === 0 && !__privateGet(this, _info).compressed) {
            failWebsocketConnection(this.ws, "Unexpected continuation frame");
            return;
          }
          if (payloadLength <= 125) {
            __privateGet(this, _info).payloadLength = payloadLength;
            __privateSet(this, _state, parserStates.READ_DATA);
          } else if (payloadLength === 126) {
            __privateSet(this, _state, parserStates.PAYLOADLENGTH_16);
          } else if (payloadLength === 127) {
            __privateSet(this, _state, parserStates.PAYLOADLENGTH_64);
          }
          if (isTextBinaryFrame(opcode)) {
            __privateGet(this, _info).binaryType = opcode;
            __privateGet(this, _info).compressed = rsv1 !== 0;
          }
          __privateGet(this, _info).opcode = opcode;
          __privateGet(this, _info).masked = masked;
          __privateGet(this, _info).fin = fin;
          __privateGet(this, _info).fragmented = fragmented;
        } else if (__privateGet(this, _state) === parserStates.PAYLOADLENGTH_16) {
          if (__privateGet(this, _byteOffset) < 2) {
            return callback();
          }
          const buffer2 = this.consume(2);
          __privateGet(this, _info).payloadLength = buffer2.readUInt16BE(0);
          __privateSet(this, _state, parserStates.READ_DATA);
        } else if (__privateGet(this, _state) === parserStates.PAYLOADLENGTH_64) {
          if (__privateGet(this, _byteOffset) < 8) {
            return callback();
          }
          const buffer2 = this.consume(8);
          const upper = buffer2.readUInt32BE(0);
          if (upper > 2 ** 31 - 1) {
            failWebsocketConnection(this.ws, "Received payload length > 2^31 bytes.");
            return;
          }
          const lower = buffer2.readUInt32BE(4);
          __privateGet(this, _info).payloadLength = (upper << 8) + lower;
          __privateSet(this, _state, parserStates.READ_DATA);
        } else if (__privateGet(this, _state) === parserStates.READ_DATA) {
          if (__privateGet(this, _byteOffset) < __privateGet(this, _info).payloadLength) {
            return callback();
          }
          const body2 = this.consume(__privateGet(this, _info).payloadLength);
          if (isControlFrame(__privateGet(this, _info).opcode)) {
            __privateSet(this, _loop, this.parseControlFrame(body2));
            __privateSet(this, _state, parserStates.INFO);
          } else {
            if (!__privateGet(this, _info).compressed) {
              __privateGet(this, _fragments).push(body2);
              if (!__privateGet(this, _info).fragmented && __privateGet(this, _info).fin) {
                const fullMessage = Buffer.concat(__privateGet(this, _fragments));
                websocketMessageReceived(this.ws, __privateGet(this, _info).binaryType, fullMessage);
                __privateGet(this, _fragments).length = 0;
              }
              __privateSet(this, _state, parserStates.INFO);
            } else {
              __privateGet(this, _extensions).get("permessage-deflate").decompress(body2, __privateGet(this, _info).fin, (error, data) => {
                if (error) {
                  closeWebSocketConnection(this.ws, 1007, error.message, error.message.length);
                  return;
                }
                __privateGet(this, _fragments).push(data);
                if (!__privateGet(this, _info).fin) {
                  __privateSet(this, _state, parserStates.INFO);
                  __privateSet(this, _loop, true);
                  this.run(callback);
                  return;
                }
                websocketMessageReceived(this.ws, __privateGet(this, _info).binaryType, Buffer.concat(__privateGet(this, _fragments)));
                __privateSet(this, _loop, true);
                __privateSet(this, _state, parserStates.INFO);
                __privateGet(this, _fragments).length = 0;
                this.run(callback);
              });
              __privateSet(this, _loop, false);
              break;
            }
          }
        }
      }
    }
    /**
     * Take n bytes from the buffered Buffers
     * @param {number} n
     * @returns {Buffer}
     */
    consume(n) {
      if (n > __privateGet(this, _byteOffset)) {
        throw new Error("Called consume() before buffers satiated.");
      } else if (n === 0) {
        return emptyBuffer;
      }
      if (__privateGet(this, _buffers)[0].length === n) {
        __privateSet(this, _byteOffset, __privateGet(this, _byteOffset) - __privateGet(this, _buffers)[0].length);
        return __privateGet(this, _buffers).shift();
      }
      const buffer2 = Buffer.allocUnsafe(n);
      let offset = 0;
      while (offset !== n) {
        const next = __privateGet(this, _buffers)[0];
        const { length } = next;
        if (length + offset === n) {
          buffer2.set(__privateGet(this, _buffers).shift(), offset);
          break;
        } else if (length + offset > n) {
          buffer2.set(next.subarray(0, n - offset), offset);
          __privateGet(this, _buffers)[0] = next.subarray(n - offset);
          break;
        } else {
          buffer2.set(__privateGet(this, _buffers).shift(), offset);
          offset += next.length;
        }
      }
      __privateSet(this, _byteOffset, __privateGet(this, _byteOffset) - n);
      return buffer2;
    }
    parseCloseBody(data) {
      assert2(data.length !== 1);
      let code;
      if (data.length >= 2) {
        code = data.readUInt16BE(0);
      }
      if (code !== void 0 && !isValidStatusCode(code)) {
        return { code: 1002, reason: "Invalid status code", error: true };
      }
      let reason = data.subarray(2);
      if (reason[0] === 239 && reason[1] === 187 && reason[2] === 191) {
        reason = reason.subarray(3);
      }
      try {
        reason = utf8Decode(reason);
      } catch {
        return { code: 1007, reason: "Invalid UTF-8", error: true };
      }
      return { code, reason, error: false };
    }
    /**
     * Parses control frames.
     * @param {Buffer} body
     */
    parseControlFrame(body2) {
      const { opcode, payloadLength } = __privateGet(this, _info);
      if (opcode === opcodes.CLOSE) {
        if (payloadLength === 1) {
          failWebsocketConnection(this.ws, "Received close frame with a 1-byte body.");
          return false;
        }
        __privateGet(this, _info).closeInfo = this.parseCloseBody(body2);
        if (__privateGet(this, _info).closeInfo.error) {
          const { code, reason } = __privateGet(this, _info).closeInfo;
          closeWebSocketConnection(this.ws, code, reason, reason.length);
          failWebsocketConnection(this.ws, reason);
          return false;
        }
        if (this.ws[kSentClose] !== sentCloseFrameState.SENT) {
          let body3 = emptyBuffer;
          if (__privateGet(this, _info).closeInfo.code) {
            body3 = Buffer.allocUnsafe(2);
            body3.writeUInt16BE(__privateGet(this, _info).closeInfo.code, 0);
          }
          const closeFrame = new WebsocketFrameSend(body3);
          this.ws[kResponse].socket.write(
            closeFrame.createFrame(opcodes.CLOSE),
            (err) => {
              if (!err) {
                this.ws[kSentClose] = sentCloseFrameState.SENT;
              }
            }
          );
        }
        this.ws[kReadyState] = states.CLOSING;
        this.ws[kReceivedClose] = true;
        return false;
      } else if (opcode === opcodes.PING) {
        if (!this.ws[kReceivedClose]) {
          const frame2 = new WebsocketFrameSend(body2);
          this.ws[kResponse].socket.write(frame2.createFrame(opcodes.PONG));
          if (channels2.ping.hasSubscribers) {
            channels2.ping.publish({
              payload: body2
            });
          }
        }
      } else if (opcode === opcodes.PONG) {
        if (channels2.pong.hasSubscribers) {
          channels2.pong.publish({
            payload: body2
          });
        }
      }
      return true;
    }
    get closingInfo() {
      return __privateGet(this, _info).closeInfo;
    }
  }
  _buffers = new WeakMap();
  _byteOffset = new WeakMap();
  _loop = new WeakMap();
  _state = new WeakMap();
  _info = new WeakMap();
  _fragments = new WeakMap();
  _extensions = new WeakMap();
  receiver = {
    ByteParser
  };
  return receiver;
}
var sender;
var hasRequiredSender;
function requireSender() {
  var _queue, _running, _socket, _SendQueue_instances, run_fn;
  if (hasRequiredSender) return sender;
  hasRequiredSender = 1;
  const { WebsocketFrameSend } = requireFrame();
  const { opcodes, sendHints } = requireConstants();
  const FixedQueue3 = fixedQueue;
  const FastBuffer2 = Buffer[Symbol.species];
  class SendQueue {
    constructor(socket) {
      __privateAdd(this, _SendQueue_instances);
      /**
       * @type {FixedQueue}
       */
      __privateAdd(this, _queue, new FixedQueue3());
      /**
       * @type {boolean}
       */
      __privateAdd(this, _running, false);
      /** @type {import('node:net').Socket} */
      __privateAdd(this, _socket);
      __privateSet(this, _socket, socket);
    }
    add(item, cb, hint) {
      if (hint !== sendHints.blob) {
        const frame2 = createFrame(item, hint);
        if (!__privateGet(this, _running)) {
          __privateGet(this, _socket).write(frame2, cb);
        } else {
          const node2 = {
            promise: null,
            callback: cb,
            frame: frame2
          };
          __privateGet(this, _queue).push(node2);
        }
        return;
      }
      const node = {
        promise: item.arrayBuffer().then((ab) => {
          node.promise = null;
          node.frame = createFrame(ab, hint);
        }),
        callback: cb,
        frame: null
      };
      __privateGet(this, _queue).push(node);
      if (!__privateGet(this, _running)) {
        __privateMethod(this, _SendQueue_instances, run_fn).call(this);
      }
    }
  }
  _queue = new WeakMap();
  _running = new WeakMap();
  _socket = new WeakMap();
  _SendQueue_instances = new WeakSet();
  run_fn = async function() {
    __privateSet(this, _running, true);
    const queue = __privateGet(this, _queue);
    while (!queue.isEmpty()) {
      const node = queue.shift();
      if (node.promise !== null) {
        await node.promise;
      }
      __privateGet(this, _socket).write(node.frame, node.callback);
      node.callback = node.frame = null;
    }
    __privateSet(this, _running, false);
  };
  function createFrame(data, hint) {
    return new WebsocketFrameSend(toBuffer(data, hint)).createFrame(hint === sendHints.string ? opcodes.TEXT : opcodes.BINARY);
  }
  function toBuffer(data, hint) {
    switch (hint) {
      case sendHints.string:
        return Buffer.from(data);
      case sendHints.arrayBuffer:
      case sendHints.blob:
        return new FastBuffer2(data);
      case sendHints.typedArray:
        return new FastBuffer2(data.buffer, data.byteOffset, data.byteLength);
    }
  }
  sender = { SendQueue };
  return sender;
}
var websocket;
var hasRequiredWebsocket;
function requireWebsocket() {
  var _events, _bufferedAmount, _protocol, _extensions, _sendQueue, _WebSocket_instances, onConnectionEstablished_fn;
  if (hasRequiredWebsocket) return websocket;
  hasRequiredWebsocket = 1;
  const { webidl } = requireWebidl();
  const { URLSerializer } = requireDataUrl();
  const { environmentSettingsObject } = requireUtil$5();
  const { staticPropertyDescriptors, states, sentCloseFrameState, sendHints } = requireConstants();
  const {
    kWebSocketURL,
    kReadyState,
    kController,
    kBinaryType,
    kResponse,
    kSentClose,
    kByteParser
  } = requireSymbols();
  const {
    isConnecting,
    isEstablished,
    isClosing,
    isValidSubprotocol,
    fireEvent
  } = requireUtil$1();
  const { establishWebSocketConnection, closeWebSocketConnection } = requireConnection();
  const { ByteParser } = requireReceiver();
  const { kEnumerableProperty: kEnumerableProperty2, isBlobLike: isBlobLike2 } = util$m;
  const { getGlobalDispatcher: getGlobalDispatcher2 } = global$1;
  const { types } = require$$0$4;
  const { ErrorEvent: ErrorEvent2, CloseEvent: CloseEvent2 } = requireEvents();
  const { SendQueue } = requireSender();
  const _WebSocket = class _WebSocket extends EventTarget {
    /**
     * @param {string} url
     * @param {string|string[]} protocols
     */
    constructor(url, protocols = []) {
      super();
      __privateAdd(this, _WebSocket_instances);
      __privateAdd(this, _events, {
        open: null,
        error: null,
        close: null,
        message: null
      });
      __privateAdd(this, _bufferedAmount, 0);
      __privateAdd(this, _protocol, "");
      __privateAdd(this, _extensions, "");
      /** @type {SendQueue} */
      __privateAdd(this, _sendQueue);
      webidl.util.markAsUncloneable(this);
      const prefix = "WebSocket constructor";
      webidl.argumentLengthCheck(arguments, 1, prefix);
      const options = webidl.converters["DOMString or sequence<DOMString> or WebSocketInit"](protocols, prefix, "options");
      url = webidl.converters.USVString(url, prefix, "url");
      protocols = options.protocols;
      const baseURL = environmentSettingsObject.settingsObject.baseUrl;
      let urlRecord;
      try {
        urlRecord = new URL(url, baseURL);
      } catch (e) {
        throw new DOMException(e, "SyntaxError");
      }
      if (urlRecord.protocol === "http:") {
        urlRecord.protocol = "ws:";
      } else if (urlRecord.protocol === "https:") {
        urlRecord.protocol = "wss:";
      }
      if (urlRecord.protocol !== "ws:" && urlRecord.protocol !== "wss:") {
        throw new DOMException(
          `Expected a ws: or wss: protocol, got ${urlRecord.protocol}`,
          "SyntaxError"
        );
      }
      if (urlRecord.hash || urlRecord.href.endsWith("#")) {
        throw new DOMException("Got fragment", "SyntaxError");
      }
      if (typeof protocols === "string") {
        protocols = [protocols];
      }
      if (protocols.length !== new Set(protocols.map((p) => p.toLowerCase())).size) {
        throw new DOMException("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
      }
      if (protocols.length > 0 && !protocols.every((p) => isValidSubprotocol(p))) {
        throw new DOMException("Invalid Sec-WebSocket-Protocol value", "SyntaxError");
      }
      this[kWebSocketURL] = new URL(urlRecord.href);
      const client2 = environmentSettingsObject.settingsObject;
      this[kController] = establishWebSocketConnection(
        urlRecord,
        protocols,
        client2,
        this,
        (response2, extensions) => __privateMethod(this, _WebSocket_instances, onConnectionEstablished_fn).call(this, response2, extensions),
        options
      );
      this[kReadyState] = _WebSocket.CONNECTING;
      this[kSentClose] = sentCloseFrameState.NOT_SENT;
      this[kBinaryType] = "blob";
    }
    /**
     * @see https://websockets.spec.whatwg.org/#dom-websocket-close
     * @param {number|undefined} code
     * @param {string|undefined} reason
     */
    close(code = void 0, reason = void 0) {
      webidl.brandCheck(this, _WebSocket);
      const prefix = "WebSocket.close";
      if (code !== void 0) {
        code = webidl.converters["unsigned short"](code, prefix, "code", { clamp: true });
      }
      if (reason !== void 0) {
        reason = webidl.converters.USVString(reason, prefix, "reason");
      }
      if (code !== void 0) {
        if (code !== 1e3 && (code < 3e3 || code > 4999)) {
          throw new DOMException("invalid code", "InvalidAccessError");
        }
      }
      let reasonByteLength = 0;
      if (reason !== void 0) {
        reasonByteLength = Buffer.byteLength(reason);
        if (reasonByteLength > 123) {
          throw new DOMException(
            `Reason must be less than 123 bytes; received ${reasonByteLength}`,
            "SyntaxError"
          );
        }
      }
      closeWebSocketConnection(this, code, reason, reasonByteLength);
    }
    /**
     * @see https://websockets.spec.whatwg.org/#dom-websocket-send
     * @param {NodeJS.TypedArray|ArrayBuffer|Blob|string} data
     */
    send(data) {
      webidl.brandCheck(this, _WebSocket);
      const prefix = "WebSocket.send";
      webidl.argumentLengthCheck(arguments, 1, prefix);
      data = webidl.converters.WebSocketSendData(data, prefix, "data");
      if (isConnecting(this)) {
        throw new DOMException("Sent before connected.", "InvalidStateError");
      }
      if (!isEstablished(this) || isClosing(this)) {
        return;
      }
      if (typeof data === "string") {
        const length = Buffer.byteLength(data);
        __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) + length);
        __privateGet(this, _sendQueue).add(data, () => {
          __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) - length);
        }, sendHints.string);
      } else if (types.isArrayBuffer(data)) {
        __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) + data.byteLength);
        __privateGet(this, _sendQueue).add(data, () => {
          __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) - data.byteLength);
        }, sendHints.arrayBuffer);
      } else if (ArrayBuffer.isView(data)) {
        __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) + data.byteLength);
        __privateGet(this, _sendQueue).add(data, () => {
          __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) - data.byteLength);
        }, sendHints.typedArray);
      } else if (isBlobLike2(data)) {
        __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) + data.size);
        __privateGet(this, _sendQueue).add(data, () => {
          __privateSet(this, _bufferedAmount, __privateGet(this, _bufferedAmount) - data.size);
        }, sendHints.blob);
      }
    }
    get readyState() {
      webidl.brandCheck(this, _WebSocket);
      return this[kReadyState];
    }
    get bufferedAmount() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _bufferedAmount);
    }
    get url() {
      webidl.brandCheck(this, _WebSocket);
      return URLSerializer(this[kWebSocketURL]);
    }
    get extensions() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _extensions);
    }
    get protocol() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _protocol);
    }
    get onopen() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _events).open;
    }
    set onopen(fn) {
      webidl.brandCheck(this, _WebSocket);
      if (__privateGet(this, _events).open) {
        this.removeEventListener("open", __privateGet(this, _events).open);
      }
      if (typeof fn === "function") {
        __privateGet(this, _events).open = fn;
        this.addEventListener("open", fn);
      } else {
        __privateGet(this, _events).open = null;
      }
    }
    get onerror() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _events).error;
    }
    set onerror(fn) {
      webidl.brandCheck(this, _WebSocket);
      if (__privateGet(this, _events).error) {
        this.removeEventListener("error", __privateGet(this, _events).error);
      }
      if (typeof fn === "function") {
        __privateGet(this, _events).error = fn;
        this.addEventListener("error", fn);
      } else {
        __privateGet(this, _events).error = null;
      }
    }
    get onclose() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _events).close;
    }
    set onclose(fn) {
      webidl.brandCheck(this, _WebSocket);
      if (__privateGet(this, _events).close) {
        this.removeEventListener("close", __privateGet(this, _events).close);
      }
      if (typeof fn === "function") {
        __privateGet(this, _events).close = fn;
        this.addEventListener("close", fn);
      } else {
        __privateGet(this, _events).close = null;
      }
    }
    get onmessage() {
      webidl.brandCheck(this, _WebSocket);
      return __privateGet(this, _events).message;
    }
    set onmessage(fn) {
      webidl.brandCheck(this, _WebSocket);
      if (__privateGet(this, _events).message) {
        this.removeEventListener("message", __privateGet(this, _events).message);
      }
      if (typeof fn === "function") {
        __privateGet(this, _events).message = fn;
        this.addEventListener("message", fn);
      } else {
        __privateGet(this, _events).message = null;
      }
    }
    get binaryType() {
      webidl.brandCheck(this, _WebSocket);
      return this[kBinaryType];
    }
    set binaryType(type) {
      webidl.brandCheck(this, _WebSocket);
      if (type !== "blob" && type !== "arraybuffer") {
        this[kBinaryType] = "blob";
      } else {
        this[kBinaryType] = type;
      }
    }
  };
  _events = new WeakMap();
  _bufferedAmount = new WeakMap();
  _protocol = new WeakMap();
  _extensions = new WeakMap();
  _sendQueue = new WeakMap();
  _WebSocket_instances = new WeakSet();
  /**
   * @see https://websockets.spec.whatwg.org/#feedback-from-the-protocol
   */
  onConnectionEstablished_fn = function(response2, parsedExtensions) {
    this[kResponse] = response2;
    const parser2 = new ByteParser(this, parsedExtensions);
    parser2.on("drain", onParserDrain);
    parser2.on("error", onParserError.bind(this));
    response2.socket.ws = this;
    this[kByteParser] = parser2;
    __privateSet(this, _sendQueue, new SendQueue(response2.socket));
    this[kReadyState] = states.OPEN;
    const extensions = response2.headersList.get("sec-websocket-extensions");
    if (extensions !== null) {
      __privateSet(this, _extensions, extensions);
    }
    const protocol = response2.headersList.get("sec-websocket-protocol");
    if (protocol !== null) {
      __privateSet(this, _protocol, protocol);
    }
    fireEvent("open", this);
  };
  let WebSocket = _WebSocket;
  WebSocket.CONNECTING = WebSocket.prototype.CONNECTING = states.CONNECTING;
  WebSocket.OPEN = WebSocket.prototype.OPEN = states.OPEN;
  WebSocket.CLOSING = WebSocket.prototype.CLOSING = states.CLOSING;
  WebSocket.CLOSED = WebSocket.prototype.CLOSED = states.CLOSED;
  Object.defineProperties(WebSocket.prototype, {
    CONNECTING: staticPropertyDescriptors,
    OPEN: staticPropertyDescriptors,
    CLOSING: staticPropertyDescriptors,
    CLOSED: staticPropertyDescriptors,
    url: kEnumerableProperty2,
    readyState: kEnumerableProperty2,
    bufferedAmount: kEnumerableProperty2,
    onopen: kEnumerableProperty2,
    onerror: kEnumerableProperty2,
    onclose: kEnumerableProperty2,
    close: kEnumerableProperty2,
    onmessage: kEnumerableProperty2,
    binaryType: kEnumerableProperty2,
    send: kEnumerableProperty2,
    extensions: kEnumerableProperty2,
    protocol: kEnumerableProperty2,
    [Symbol.toStringTag]: {
      value: "WebSocket",
      writable: false,
      enumerable: false,
      configurable: true
    }
  });
  Object.defineProperties(WebSocket, {
    CONNECTING: staticPropertyDescriptors,
    OPEN: staticPropertyDescriptors,
    CLOSING: staticPropertyDescriptors,
    CLOSED: staticPropertyDescriptors
  });
  webidl.converters["sequence<DOMString>"] = webidl.sequenceConverter(
    webidl.converters.DOMString
  );
  webidl.converters["DOMString or sequence<DOMString>"] = function(V, prefix, argument) {
    if (webidl.util.Type(V) === "Object" && Symbol.iterator in V) {
      return webidl.converters["sequence<DOMString>"](V);
    }
    return webidl.converters.DOMString(V, prefix, argument);
  };
  webidl.converters.WebSocketInit = webidl.dictionaryConverter([
    {
      key: "protocols",
      converter: webidl.converters["DOMString or sequence<DOMString>"],
      defaultValue: () => new Array(0)
    },
    {
      key: "dispatcher",
      converter: webidl.converters.any,
      defaultValue: () => getGlobalDispatcher2()
    },
    {
      key: "headers",
      converter: webidl.nullableConverter(webidl.converters.HeadersInit)
    }
  ]);
  webidl.converters["DOMString or sequence<DOMString> or WebSocketInit"] = function(V) {
    if (webidl.util.Type(V) === "Object" && !(Symbol.iterator in V)) {
      return webidl.converters.WebSocketInit(V);
    }
    return { protocols: webidl.converters["DOMString or sequence<DOMString>"](V) };
  };
  webidl.converters.WebSocketSendData = function(V) {
    if (webidl.util.Type(V) === "Object") {
      if (isBlobLike2(V)) {
        return webidl.converters.Blob(V, { strict: false });
      }
      if (ArrayBuffer.isView(V) || types.isArrayBuffer(V)) {
        return webidl.converters.BufferSource(V);
      }
    }
    return webidl.converters.USVString(V);
  };
  function onParserDrain() {
    this.ws[kResponse].socket.resume();
  }
  function onParserError(err) {
    let message;
    let code;
    if (err instanceof CloseEvent2) {
      message = err.reason;
      code = err.code;
    } else {
      message = err.message;
    }
    fireEvent("error", this, () => new ErrorEvent2("error", { error: err, message }));
    closeWebSocketConnection(this, code);
  }
  websocket = {
    WebSocket
  };
  return websocket;
}
var util$1;
var hasRequiredUtil;
function requireUtil() {
  if (hasRequiredUtil) return util$1;
  hasRequiredUtil = 1;
  function isValidLastEventId(value) {
    return value.indexOf("\0") === -1;
  }
  function isASCIINumber(value) {
    if (value.length === 0) return false;
    for (let i = 0; i < value.length; i++) {
      if (value.charCodeAt(i) < 48 || value.charCodeAt(i) > 57) return false;
    }
    return true;
  }
  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms).unref();
    });
  }
  util$1 = {
    isValidLastEventId,
    isASCIINumber,
    delay
  };
  return util$1;
}
var eventsourceStream;
var hasRequiredEventsourceStream;
function requireEventsourceStream() {
  if (hasRequiredEventsourceStream) return eventsourceStream;
  hasRequiredEventsourceStream = 1;
  const { Transform: Transform2 } = require$$0$2;
  const { isASCIINumber, isValidLastEventId } = requireUtil();
  const BOM = [239, 187, 191];
  const LF = 10;
  const CR = 13;
  const COLON = 58;
  const SPACE = 32;
  class EventSourceStream extends Transform2 {
    /**
     * @param {object} options
     * @param {eventSourceSettings} options.eventSourceSettings
     * @param {Function} [options.push]
     */
    constructor(options = {}) {
      options.readableObjectMode = true;
      super(options);
      /**
       * @type {eventSourceSettings}
       */
      __publicField(this, "state", null);
      /**
       * Leading byte-order-mark check.
       * @type {boolean}
       */
      __publicField(this, "checkBOM", true);
      /**
       * @type {boolean}
       */
      __publicField(this, "crlfCheck", false);
      /**
       * @type {boolean}
       */
      __publicField(this, "eventEndCheck", false);
      /**
       * @type {Buffer}
       */
      __publicField(this, "buffer", null);
      __publicField(this, "pos", 0);
      __publicField(this, "event", {
        data: void 0,
        event: void 0,
        id: void 0,
        retry: void 0
      });
      this.state = options.eventSourceSettings || {};
      if (options.push) {
        this.push = options.push;
      }
    }
    /**
     * @param {Buffer} chunk
     * @param {string} _encoding
     * @param {Function} callback
     * @returns {void}
     */
    _transform(chunk, _encoding, callback) {
      if (chunk.length === 0) {
        callback();
        return;
      }
      if (this.buffer) {
        this.buffer = Buffer.concat([this.buffer, chunk]);
      } else {
        this.buffer = chunk;
      }
      if (this.checkBOM) {
        switch (this.buffer.length) {
          case 1:
            if (this.buffer[0] === BOM[0]) {
              callback();
              return;
            }
            this.checkBOM = false;
            callback();
            return;
          case 2:
            if (this.buffer[0] === BOM[0] && this.buffer[1] === BOM[1]) {
              callback();
              return;
            }
            this.checkBOM = false;
            break;
          case 3:
            if (this.buffer[0] === BOM[0] && this.buffer[1] === BOM[1] && this.buffer[2] === BOM[2]) {
              this.buffer = Buffer.alloc(0);
              this.checkBOM = false;
              callback();
              return;
            }
            this.checkBOM = false;
            break;
          default:
            if (this.buffer[0] === BOM[0] && this.buffer[1] === BOM[1] && this.buffer[2] === BOM[2]) {
              this.buffer = this.buffer.subarray(3);
            }
            this.checkBOM = false;
            break;
        }
      }
      while (this.pos < this.buffer.length) {
        if (this.eventEndCheck) {
          if (this.crlfCheck) {
            if (this.buffer[this.pos] === LF) {
              this.buffer = this.buffer.subarray(this.pos + 1);
              this.pos = 0;
              this.crlfCheck = false;
              continue;
            }
            this.crlfCheck = false;
          }
          if (this.buffer[this.pos] === LF || this.buffer[this.pos] === CR) {
            if (this.buffer[this.pos] === CR) {
              this.crlfCheck = true;
            }
            this.buffer = this.buffer.subarray(this.pos + 1);
            this.pos = 0;
            if (this.event.data !== void 0 || this.event.event || this.event.id || this.event.retry) {
              this.processEvent(this.event);
            }
            this.clearEvent();
            continue;
          }
          this.eventEndCheck = false;
          continue;
        }
        if (this.buffer[this.pos] === LF || this.buffer[this.pos] === CR) {
          if (this.buffer[this.pos] === CR) {
            this.crlfCheck = true;
          }
          this.parseLine(this.buffer.subarray(0, this.pos), this.event);
          this.buffer = this.buffer.subarray(this.pos + 1);
          this.pos = 0;
          this.eventEndCheck = true;
          continue;
        }
        this.pos++;
      }
      callback();
    }
    /**
     * @param {Buffer} line
     * @param {EventStreamEvent} event
     */
    parseLine(line2, event) {
      if (line2.length === 0) {
        return;
      }
      const colonPosition = line2.indexOf(COLON);
      if (colonPosition === 0) {
        return;
      }
      let field = "";
      let value = "";
      if (colonPosition !== -1) {
        field = line2.subarray(0, colonPosition).toString("utf8");
        let valueStart = colonPosition + 1;
        if (line2[valueStart] === SPACE) {
          ++valueStart;
        }
        value = line2.subarray(valueStart).toString("utf8");
      } else {
        field = line2.toString("utf8");
        value = "";
      }
      switch (field) {
        case "data":
          if (event[field] === void 0) {
            event[field] = value;
          } else {
            event[field] += `
${value}`;
          }
          break;
        case "retry":
          if (isASCIINumber(value)) {
            event[field] = value;
          }
          break;
        case "id":
          if (isValidLastEventId(value)) {
            event[field] = value;
          }
          break;
        case "event":
          if (value.length > 0) {
            event[field] = value;
          }
          break;
      }
    }
    /**
     * @param {EventSourceStreamEvent} event
     */
    processEvent(event) {
      if (event.retry && isASCIINumber(event.retry)) {
        this.state.reconnectionTime = parseInt(event.retry, 10);
      }
      if (event.id && isValidLastEventId(event.id)) {
        this.state.lastEventId = event.id;
      }
      if (event.data !== void 0) {
        this.push({
          type: event.event || "message",
          options: {
            data: event.data,
            lastEventId: this.state.lastEventId,
            origin: this.state.origin
          }
        });
      }
    }
    clearEvent() {
      this.event = {
        data: void 0,
        event: void 0,
        id: void 0,
        retry: void 0
      };
    }
  }
  eventsourceStream = {
    EventSourceStream
  };
  return eventsourceStream;
}
var eventsource;
var hasRequiredEventsource;
function requireEventsource() {
  var _events, _url, _withCredentials, _readyState, _request, _controller, _dispatcher2, _state, _EventSource_instances, connect_fn, reconnect_fn;
  if (hasRequiredEventsource) return eventsource;
  hasRequiredEventsource = 1;
  const { pipeline: pipeline2 } = require$$0$2;
  const { fetching } = requireFetch();
  const { makeRequest } = requireRequest();
  const { webidl } = requireWebidl();
  const { EventSourceStream } = requireEventsourceStream();
  const { parseMIMEType: parseMIMEType2 } = requireDataUrl();
  const { createFastMessageEvent } = requireEvents();
  const { isNetworkError } = requireResponse();
  const { delay } = requireUtil();
  const { kEnumerableProperty: kEnumerableProperty2 } = util$m;
  const { environmentSettingsObject } = requireUtil$5();
  let experimentalWarned = false;
  const defaultReconnectionTime = 3e3;
  const CONNECTING = 0;
  const OPEN = 1;
  const CLOSED = 2;
  const ANONYMOUS = "anonymous";
  const USE_CREDENTIALS = "use-credentials";
  const _EventSource = class _EventSource extends EventTarget {
    /**
     * Creates a new EventSource object.
     * @param {string} url
     * @param {EventSourceInit} [eventSourceInitDict]
     * @see https://html.spec.whatwg.org/multipage/server-sent-events.html#the-eventsource-interface
     */
    constructor(url, eventSourceInitDict = {}) {
      super();
      __privateAdd(this, _EventSource_instances);
      __privateAdd(this, _events, {
        open: null,
        error: null,
        message: null
      });
      __privateAdd(this, _url, null);
      __privateAdd(this, _withCredentials, false);
      __privateAdd(this, _readyState, CONNECTING);
      __privateAdd(this, _request, null);
      __privateAdd(this, _controller, null);
      __privateAdd(this, _dispatcher2);
      /**
       * @type {import('./eventsource-stream').eventSourceSettings}
       */
      __privateAdd(this, _state);
      webidl.util.markAsUncloneable(this);
      const prefix = "EventSource constructor";
      webidl.argumentLengthCheck(arguments, 1, prefix);
      if (!experimentalWarned) {
        experimentalWarned = true;
        process.emitWarning("EventSource is experimental, expect them to change at any time.", {
          code: "UNDICI-ES"
        });
      }
      url = webidl.converters.USVString(url, prefix, "url");
      eventSourceInitDict = webidl.converters.EventSourceInitDict(eventSourceInitDict, prefix, "eventSourceInitDict");
      __privateSet(this, _dispatcher2, eventSourceInitDict.dispatcher);
      __privateSet(this, _state, {
        lastEventId: "",
        reconnectionTime: defaultReconnectionTime
      });
      const settings = environmentSettingsObject;
      let urlRecord;
      try {
        urlRecord = new URL(url, settings.settingsObject.baseUrl);
        __privateGet(this, _state).origin = urlRecord.origin;
      } catch (e) {
        throw new DOMException(e, "SyntaxError");
      }
      __privateSet(this, _url, urlRecord.href);
      let corsAttributeState = ANONYMOUS;
      if (eventSourceInitDict.withCredentials) {
        corsAttributeState = USE_CREDENTIALS;
        __privateSet(this, _withCredentials, true);
      }
      const initRequest = {
        redirect: "follow",
        keepalive: true,
        // @see https://html.spec.whatwg.org/multipage/urls-and-fetching.html#cors-settings-attributes
        mode: "cors",
        credentials: corsAttributeState === "anonymous" ? "same-origin" : "omit",
        referrer: "no-referrer"
      };
      initRequest.client = environmentSettingsObject.settingsObject;
      initRequest.headersList = [["accept", { name: "accept", value: "text/event-stream" }]];
      initRequest.cache = "no-store";
      initRequest.initiator = "other";
      initRequest.urlList = [new URL(__privateGet(this, _url))];
      __privateSet(this, _request, makeRequest(initRequest));
      __privateMethod(this, _EventSource_instances, connect_fn).call(this);
    }
    /**
     * Returns the state of this EventSource object's connection. It can have the
     * values described below.
     * @returns {0|1|2}
     * @readonly
     */
    get readyState() {
      return __privateGet(this, _readyState);
    }
    /**
     * Returns the URL providing the event stream.
     * @readonly
     * @returns {string}
     */
    get url() {
      return __privateGet(this, _url);
    }
    /**
     * Returns a boolean indicating whether the EventSource object was
     * instantiated with CORS credentials set (true), or not (false, the default).
     */
    get withCredentials() {
      return __privateGet(this, _withCredentials);
    }
    /**
     * Closes the connection, if any, and sets the readyState attribute to
     * CLOSED.
     */
    close() {
      webidl.brandCheck(this, _EventSource);
      if (__privateGet(this, _readyState) === CLOSED) return;
      __privateSet(this, _readyState, CLOSED);
      __privateGet(this, _controller).abort();
      __privateSet(this, _request, null);
    }
    get onopen() {
      return __privateGet(this, _events).open;
    }
    set onopen(fn) {
      if (__privateGet(this, _events).open) {
        this.removeEventListener("open", __privateGet(this, _events).open);
      }
      if (typeof fn === "function") {
        __privateGet(this, _events).open = fn;
        this.addEventListener("open", fn);
      } else {
        __privateGet(this, _events).open = null;
      }
    }
    get onmessage() {
      return __privateGet(this, _events).message;
    }
    set onmessage(fn) {
      if (__privateGet(this, _events).message) {
        this.removeEventListener("message", __privateGet(this, _events).message);
      }
      if (typeof fn === "function") {
        __privateGet(this, _events).message = fn;
        this.addEventListener("message", fn);
      } else {
        __privateGet(this, _events).message = null;
      }
    }
    get onerror() {
      return __privateGet(this, _events).error;
    }
    set onerror(fn) {
      if (__privateGet(this, _events).error) {
        this.removeEventListener("error", __privateGet(this, _events).error);
      }
      if (typeof fn === "function") {
        __privateGet(this, _events).error = fn;
        this.addEventListener("error", fn);
      } else {
        __privateGet(this, _events).error = null;
      }
    }
  };
  _events = new WeakMap();
  _url = new WeakMap();
  _withCredentials = new WeakMap();
  _readyState = new WeakMap();
  _request = new WeakMap();
  _controller = new WeakMap();
  _dispatcher2 = new WeakMap();
  _state = new WeakMap();
  _EventSource_instances = new WeakSet();
  connect_fn = function() {
    if (__privateGet(this, _readyState) === CLOSED) return;
    __privateSet(this, _readyState, CONNECTING);
    const fetchParams = {
      request: __privateGet(this, _request),
      dispatcher: __privateGet(this, _dispatcher2)
    };
    const processEventSourceEndOfBody = (response2) => {
      if (isNetworkError(response2)) {
        this.dispatchEvent(new Event("error"));
        this.close();
      }
      __privateMethod(this, _EventSource_instances, reconnect_fn).call(this);
    };
    fetchParams.processResponseEndOfBody = processEventSourceEndOfBody;
    fetchParams.processResponse = (response2) => {
      if (isNetworkError(response2)) {
        if (response2.aborted) {
          this.close();
          this.dispatchEvent(new Event("error"));
          return;
        } else {
          __privateMethod(this, _EventSource_instances, reconnect_fn).call(this);
          return;
        }
      }
      const contentType = response2.headersList.get("content-type", true);
      const mimeType = contentType !== null ? parseMIMEType2(contentType) : "failure";
      const contentTypeValid = mimeType !== "failure" && mimeType.essence === "text/event-stream";
      if (response2.status !== 200 || contentTypeValid === false) {
        this.close();
        this.dispatchEvent(new Event("error"));
        return;
      }
      __privateSet(this, _readyState, OPEN);
      this.dispatchEvent(new Event("open"));
      __privateGet(this, _state).origin = response2.urlList[response2.urlList.length - 1].origin;
      const eventSourceStream = new EventSourceStream({
        eventSourceSettings: __privateGet(this, _state),
        push: (event) => {
          this.dispatchEvent(createFastMessageEvent(
            event.type,
            event.options
          ));
        }
      });
      pipeline2(
        response2.body.stream,
        eventSourceStream,
        (error) => {
          if ((error == null ? void 0 : error.aborted) === false) {
            this.close();
            this.dispatchEvent(new Event("error"));
          }
        }
      );
    };
    __privateSet(this, _controller, fetching(fetchParams));
  };
  reconnect_fn = async function() {
    if (__privateGet(this, _readyState) === CLOSED) return;
    __privateSet(this, _readyState, CONNECTING);
    this.dispatchEvent(new Event("error"));
    await delay(__privateGet(this, _state).reconnectionTime);
    if (__privateGet(this, _readyState) !== CONNECTING) return;
    if (__privateGet(this, _state).lastEventId.length) {
      __privateGet(this, _request).headersList.set("last-event-id", __privateGet(this, _state).lastEventId, true);
    }
    __privateMethod(this, _EventSource_instances, connect_fn).call(this);
  };
  let EventSource2 = _EventSource;
  const constantsPropertyDescriptors = {
    CONNECTING: {
      __proto__: null,
      configurable: false,
      enumerable: true,
      value: CONNECTING,
      writable: false
    },
    OPEN: {
      __proto__: null,
      configurable: false,
      enumerable: true,
      value: OPEN,
      writable: false
    },
    CLOSED: {
      __proto__: null,
      configurable: false,
      enumerable: true,
      value: CLOSED,
      writable: false
    }
  };
  Object.defineProperties(EventSource2, constantsPropertyDescriptors);
  Object.defineProperties(EventSource2.prototype, constantsPropertyDescriptors);
  Object.defineProperties(EventSource2.prototype, {
    close: kEnumerableProperty2,
    onerror: kEnumerableProperty2,
    onmessage: kEnumerableProperty2,
    onopen: kEnumerableProperty2,
    readyState: kEnumerableProperty2,
    url: kEnumerableProperty2,
    withCredentials: kEnumerableProperty2
  });
  webidl.converters.EventSourceInitDict = webidl.dictionaryConverter([
    {
      key: "withCredentials",
      converter: webidl.converters.boolean,
      defaultValue: () => false
    },
    {
      key: "dispatcher",
      // undici only
      converter: webidl.converters.any
    }
  ]);
  eventsource = {
    EventSource: EventSource2,
    defaultReconnectionTime
  };
  return eventsource;
}
const Dispatcher2 = dispatcher;
const Agent2 = agent;
const errors = errors$1;
const util = util$m;
const { InvalidArgumentError: InvalidArgumentError2 } = errors;
const api = api$1;
const { getGlobalDispatcher, setGlobalDispatcher } = global$1;
Object.assign(Dispatcher2.prototype, api);
var Agent_1 = Agent2;
function makeDispatcher(fn) {
  return (url, opts, handler) => {
    if (typeof opts === "function") {
      handler = opts;
      opts = null;
    }
    if (!url || typeof url !== "string" && typeof url !== "object" && !(url instanceof URL)) {
      throw new InvalidArgumentError2("invalid url");
    }
    if (opts != null && typeof opts !== "object") {
      throw new InvalidArgumentError2("invalid opts");
    }
    if (opts && opts.path != null) {
      if (typeof opts.path !== "string") {
        throw new InvalidArgumentError2("invalid opts.path");
      }
      let path2 = opts.path;
      if (!opts.path.startsWith("/")) {
        path2 = `/${path2}`;
      }
      url = new URL(util.parseOrigin(url).origin + path2);
    } else {
      if (!opts) {
        opts = typeof url === "object" ? url : {};
      }
      url = util.parseURL(url);
    }
    const { agent: agent2, dispatcher: dispatcher2 = getGlobalDispatcher() } = opts;
    if (agent2) {
      throw new InvalidArgumentError2("unsupported opts.agent. Did you mean opts.client?");
    }
    return fn.call(dispatcher2, {
      ...opts,
      origin: url.origin,
      path: url.search ? `${url.pathname}${url.search}` : url.pathname,
      method: opts.method || (opts.body ? "PUT" : "GET")
    }, handler);
  };
}
var setGlobalDispatcher_1 = setGlobalDispatcher;
requireFetch().fetch;
requireHeaders().Headers;
requireResponse().Response;
requireRequest().Request;
requireFormdata().FormData;
globalThis.File ?? require$$0.File;
requireFilereader().FileReader;
const { setGlobalOrigin, getGlobalOrigin } = requireGlobal();
const { CacheStorage } = requireCachestorage();
const { kConstruct } = requireSymbols$1();
new CacheStorage(kConstruct);
const { deleteCookie, getCookies, getSetCookies, setCookie } = requireCookies();
const { parseMIMEType, serializeAMimeType } = requireDataUrl();
const { CloseEvent, ErrorEvent, MessageEvent } = requireEvents();
requireWebsocket().WebSocket;
var request = makeDispatcher(api.request);
makeDispatcher(api.stream);
makeDispatcher(api.pipeline);
makeDispatcher(api.connect);
makeDispatcher(api.upgrade);
const { EventSource } = requireEventsource();
let pyProc = null;
const PY_BIN = path.join(path.dirname(APP_ROOT), ".venv/bin/python");
function check_sock() {
  if (existsSync(SOCK_PATH)) {
    unlinkSync(SOCK_PATH);
  }
}
function startPyPipe() {
  if (pyProc) return;
  check_sock();
  pyProc = spawn(
    PY_BIN,
    ["../pacwave-pipe/src/pipeline/main.py"],
    {
      env: {
        ...process.env,
        WAVE_ENERGY_APP_ROOT: APP_ROOT
      }
    }
  );
  pyProc.stdout.on("data", (d) => console.log("[python]", d.toString()));
  pyProc.stderr.on("data", (d) => console.error("[python]", d.toString()));
  pyProc.on("exit", (code, signal) => {
    console.warn(`Python exited (code=${code}, signal=${signal})`);
    pyProc = null;
  });
}
function killPyPipe() {
  if (!pyProc) return;
  console.warn("Killing Python process");
  pyProc.kill("SIGKILL");
  pyProc = null;
  check_sock();
}
function restartPyPipe() {
  killPyPipe();
  startPyPipe();
}
let failures = 0;
let getting_data = false;
setGlobalDispatcher_1(new Agent_1({
  socketPath: SOCK_PATH
}));
async function initPacWavePipe() {
  restartPyPipe();
}
async function CheckPacWavePipe() {
  if (!getting_data) setInterval(tryStatus, TRY_INTERVAL);
}
async function tryStatus() {
  try {
    const { statusCode, body: body2 } = await request("http://localhost/status");
    if (statusCode != 200) {
      throw new Error(`Bad status: ${statusCode}`);
    }
    await body2.json();
    failures = 0;
  } catch (error) {
    failures++;
    console.warn(`PyPipe start failures: (${failures}/${PIPE_MAX_TRIES})`);
    if (failures >= PIPE_MAX_TRIES) {
      console.error("Python appears hung — restarting");
      failures = 0;
      restartPyPipe();
    }
  }
}
async function getCdipData() {
  try {
    getting_data = true;
    const { statusCode, body: body2 } = await request("http://localhost/data/cdip", {
      headersTimeout: 1e4,
      bodyTimeout: 1e4
    });
    if (statusCode != 200) {
      throw new Error(`Bad status: ${statusCode}`);
    }
    const data = await body2.json();
    getting_data = false;
    return data;
  } catch (err) {
    console.error("CDIP fetch failed:", err);
    throw err;
  }
}
function registerPyPipeHandlers() {
  ipcMain.handle("get-wave-data", getCdipData);
}
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(ELECTRON_DIST, "preload.mjs")
    },
    width: 1024,
    height: 1366
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(() => {
  createWindow();
  initArduino(safeSend);
  registerArduinoHandlers();
  initPacWavePipe();
  CheckPacWavePipe();
  registerPyPipeHandlers();
});
function safeSend(channel, ...args) {
  if (win && !win.isDestroyed()) {
    win.webContents.send(channel, ...args);
  }
}
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
app.on("before-quit", cleanup);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL,
  safeSend
};
