import { app as ne, ipcMain as he, BrowserWindow as qu } from "electron";
import J from "node:path";
import { fileURLToPath as Nt } from "node:url";
import su from "node:fs";
import { SerialPort as cu } from "serialport";
import { ReadlineParser as It } from "@serialport/parser-readline";
import { spawn as Pt } from "child_process";
import ce from "fs";
import Ku from "path";
import Hu from "tty";
import Tt from "util";
import $t from "os";
const Rt = Nt(import.meta.url), Yu = J.dirname(Rt), jt = Yu, Fe = J.join(Yu, ".."), au = J.join(Fe, "config"), Zt = J.join(au, "pacwave.config.json"), xt = J.join(au, "arduino.config.json"), Mt = J.join(au, "customwave.config.json");
J.join(Fe, "Shared/data/waverider.json");
const Jt = ne.getPath("userData"), He = J.join(ne.getPath("userData"), "waverider.json"), Ee = JSON.parse(
  su.readFileSync(Zt, "utf-8")
);
Ee.ipc.uds_path;
Ee.healthcheck.interval_ms;
Ee.healthcheck.max_failures;
const Lt = Ee.remote_host, Vt = Ee.remote_file, Ae = JSON.parse(
  su.readFileSync(xt, "utf-8")
), Ut = Ae.ports.featherM0_vendor_id, Gt = Ae.ports.featherM0_wifi_product_id, Wt = Ae.ports.r4minima_vendor_id, qt = Ae.ports.r4minima_product_id, Kt = Ae.baud_rate, Xu = JSON.parse(
  su.readFileSync(Mt, "utf-8")
), Ht = Xu.height_selection_options, Yt = Xu.period_selection_options;
var Xt = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/, Qt = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/, en = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/, Me = {
  Space_Separator: Xt,
  ID_Start: Qt,
  ID_Continue: en
}, k = {
  isSpaceSeparator(e) {
    return typeof e == "string" && Me.Space_Separator.test(e);
  },
  isIdStartChar(e) {
    return typeof e == "string" && (e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e === "$" || e === "_" || Me.ID_Start.test(e));
  },
  isIdContinueChar(e) {
    return typeof e == "string" && (e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e >= "0" && e <= "9" || e === "$" || e === "_" || e === "‌" || e === "‍" || Me.ID_Continue.test(e));
  },
  isDigit(e) {
    return typeof e == "string" && /[0-9]/.test(e);
  },
  isHexDigit(e) {
    return typeof e == "string" && /[0-9A-Fa-f]/.test(e);
  }
};
let Ye, x, q, Se, Y, U, R, Du, pe;
var un = function(u, n) {
  Ye = String(u), x = "start", q = [], Se = 0, Y = 1, U = 0, R = void 0, Du = void 0, pe = void 0;
  do
    R = tn(), on[x]();
  while (R.type !== "eof");
  return typeof n == "function" ? Xe({ "": pe }, "", n) : pe;
};
function Xe(e, u, n) {
  const t = e[u];
  if (t != null && typeof t == "object")
    if (Array.isArray(t))
      for (let r = 0; r < t.length; r++) {
        const o = String(r), i = Xe(t, o, n);
        i === void 0 ? delete t[o] : Object.defineProperty(t, o, {
          value: i,
          writable: !0,
          enumerable: !0,
          configurable: !0
        });
      }
    else
      for (const r in t) {
        const o = Xe(t, r, n);
        o === void 0 ? delete t[r] : Object.defineProperty(t, r, {
          value: o,
          writable: !0,
          enumerable: !0,
          configurable: !0
        });
      }
  return n.call(e, u, t);
}
let _, g, fe, G, y;
function tn() {
  for (_ = "default", g = "", fe = !1, G = 1; ; ) {
    y = K();
    const e = Qu[_]();
    if (e)
      return e;
  }
}
function K() {
  if (Ye[Se])
    return String.fromCodePoint(Ye.codePointAt(Se));
}
function d() {
  const e = K();
  return e === `
` ? (Y++, U = 0) : e ? U += e.length : U++, e && (Se += e.length), e;
}
const Qu = {
  default() {
    switch (y) {
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
        d();
        return;
      case "/":
        d(), _ = "comment";
        return;
      case void 0:
        return d(), z("eof");
    }
    if (k.isSpaceSeparator(y)) {
      d();
      return;
    }
    return Qu[x]();
  },
  comment() {
    switch (y) {
      case "*":
        d(), _ = "multiLineComment";
        return;
      case "/":
        d(), _ = "singleLineComment";
        return;
    }
    throw S(d());
  },
  multiLineComment() {
    switch (y) {
      case "*":
        d(), _ = "multiLineCommentAsterisk";
        return;
      case void 0:
        throw S(d());
    }
    d();
  },
  multiLineCommentAsterisk() {
    switch (y) {
      case "*":
        d();
        return;
      case "/":
        d(), _ = "default";
        return;
      case void 0:
        throw S(d());
    }
    d(), _ = "multiLineComment";
  },
  singleLineComment() {
    switch (y) {
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        d(), _ = "default";
        return;
      case void 0:
        return d(), z("eof");
    }
    d();
  },
  value() {
    switch (y) {
      case "{":
      case "[":
        return z("punctuator", d());
      case "n":
        return d(), ue("ull"), z("null", null);
      case "t":
        return d(), ue("rue"), z("boolean", !0);
      case "f":
        return d(), ue("alse"), z("boolean", !1);
      case "-":
      case "+":
        d() === "-" && (G = -1), _ = "sign";
        return;
      case ".":
        g = d(), _ = "decimalPointLeading";
        return;
      case "0":
        g = d(), _ = "zero";
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
        g = d(), _ = "decimalInteger";
        return;
      case "I":
        return d(), ue("nfinity"), z("numeric", 1 / 0);
      case "N":
        return d(), ue("aN"), z("numeric", NaN);
      case '"':
      case "'":
        fe = d() === '"', g = "", _ = "string";
        return;
    }
    throw S(d());
  },
  identifierNameStartEscape() {
    if (y !== "u")
      throw S(d());
    d();
    const e = Qe();
    switch (e) {
      case "$":
      case "_":
        break;
      default:
        if (!k.isIdStartChar(e))
          throw Eu();
        break;
    }
    g += e, _ = "identifierName";
  },
  identifierName() {
    switch (y) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        g += d();
        return;
      case "\\":
        d(), _ = "identifierNameEscape";
        return;
    }
    if (k.isIdContinueChar(y)) {
      g += d();
      return;
    }
    return z("identifier", g);
  },
  identifierNameEscape() {
    if (y !== "u")
      throw S(d());
    d();
    const e = Qe();
    switch (e) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        break;
      default:
        if (!k.isIdContinueChar(e))
          throw Eu();
        break;
    }
    g += e, _ = "identifierName";
  },
  sign() {
    switch (y) {
      case ".":
        g = d(), _ = "decimalPointLeading";
        return;
      case "0":
        g = d(), _ = "zero";
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
        g = d(), _ = "decimalInteger";
        return;
      case "I":
        return d(), ue("nfinity"), z("numeric", G * (1 / 0));
      case "N":
        return d(), ue("aN"), z("numeric", NaN);
    }
    throw S(d());
  },
  zero() {
    switch (y) {
      case ".":
        g += d(), _ = "decimalPoint";
        return;
      case "e":
      case "E":
        g += d(), _ = "decimalExponent";
        return;
      case "x":
      case "X":
        g += d(), _ = "hexadecimal";
        return;
    }
    return z("numeric", G * 0);
  },
  decimalInteger() {
    switch (y) {
      case ".":
        g += d(), _ = "decimalPoint";
        return;
      case "e":
      case "E":
        g += d(), _ = "decimalExponent";
        return;
    }
    if (k.isDigit(y)) {
      g += d();
      return;
    }
    return z("numeric", G * Number(g));
  },
  decimalPointLeading() {
    if (k.isDigit(y)) {
      g += d(), _ = "decimalFraction";
      return;
    }
    throw S(d());
  },
  decimalPoint() {
    switch (y) {
      case "e":
      case "E":
        g += d(), _ = "decimalExponent";
        return;
    }
    if (k.isDigit(y)) {
      g += d(), _ = "decimalFraction";
      return;
    }
    return z("numeric", G * Number(g));
  },
  decimalFraction() {
    switch (y) {
      case "e":
      case "E":
        g += d(), _ = "decimalExponent";
        return;
    }
    if (k.isDigit(y)) {
      g += d();
      return;
    }
    return z("numeric", G * Number(g));
  },
  decimalExponent() {
    switch (y) {
      case "+":
      case "-":
        g += d(), _ = "decimalExponentSign";
        return;
    }
    if (k.isDigit(y)) {
      g += d(), _ = "decimalExponentInteger";
      return;
    }
    throw S(d());
  },
  decimalExponentSign() {
    if (k.isDigit(y)) {
      g += d(), _ = "decimalExponentInteger";
      return;
    }
    throw S(d());
  },
  decimalExponentInteger() {
    if (k.isDigit(y)) {
      g += d();
      return;
    }
    return z("numeric", G * Number(g));
  },
  hexadecimal() {
    if (k.isHexDigit(y)) {
      g += d(), _ = "hexadecimalInteger";
      return;
    }
    throw S(d());
  },
  hexadecimalInteger() {
    if (k.isHexDigit(y)) {
      g += d();
      return;
    }
    return z("numeric", G * Number(g));
  },
  string() {
    switch (y) {
      case "\\":
        d(), g += nn();
        return;
      case '"':
        if (fe)
          return d(), z("string", g);
        g += d();
        return;
      case "'":
        if (!fe)
          return d(), z("string", g);
        g += d();
        return;
      case `
`:
      case "\r":
        throw S(d());
      case "\u2028":
      case "\u2029":
        sn(y);
        break;
      case void 0:
        throw S(d());
    }
    g += d();
  },
  start() {
    switch (y) {
      case "{":
      case "[":
        return z("punctuator", d());
    }
    _ = "value";
  },
  beforePropertyName() {
    switch (y) {
      case "$":
      case "_":
        g = d(), _ = "identifierName";
        return;
      case "\\":
        d(), _ = "identifierNameStartEscape";
        return;
      case "}":
        return z("punctuator", d());
      case '"':
      case "'":
        fe = d() === '"', _ = "string";
        return;
    }
    if (k.isIdStartChar(y)) {
      g += d(), _ = "identifierName";
      return;
    }
    throw S(d());
  },
  afterPropertyName() {
    if (y === ":")
      return z("punctuator", d());
    throw S(d());
  },
  beforePropertyValue() {
    _ = "value";
  },
  afterPropertyValue() {
    switch (y) {
      case ",":
      case "}":
        return z("punctuator", d());
    }
    throw S(d());
  },
  beforeArrayValue() {
    if (y === "]")
      return z("punctuator", d());
    _ = "value";
  },
  afterArrayValue() {
    switch (y) {
      case ",":
      case "]":
        return z("punctuator", d());
    }
    throw S(d());
  },
  end() {
    throw S(d());
  }
};
function z(e, u) {
  return {
    type: e,
    value: u,
    line: Y,
    column: U
  };
}
function ue(e) {
  for (const u of e) {
    if (K() !== u)
      throw S(d());
    d();
  }
}
function nn() {
  switch (K()) {
    case "b":
      return d(), "\b";
    case "f":
      return d(), "\f";
    case "n":
      return d(), `
`;
    case "r":
      return d(), "\r";
    case "t":
      return d(), "	";
    case "v":
      return d(), "\v";
    case "0":
      if (d(), k.isDigit(K()))
        throw S(d());
      return "\0";
    case "x":
      return d(), rn();
    case "u":
      return d(), Qe();
    case `
`:
    case "\u2028":
    case "\u2029":
      return d(), "";
    case "\r":
      return d(), K() === `
` && d(), "";
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      throw S(d());
    case void 0:
      throw S(d());
  }
  return d();
}
function rn() {
  let e = "", u = K();
  if (!k.isHexDigit(u) || (e += d(), u = K(), !k.isHexDigit(u)))
    throw S(d());
  return e += d(), String.fromCodePoint(parseInt(e, 16));
}
function Qe() {
  let e = "", u = 4;
  for (; u-- > 0; ) {
    const n = K();
    if (!k.isHexDigit(n))
      throw S(d());
    e += d();
  }
  return String.fromCodePoint(parseInt(e, 16));
}
const on = {
  start() {
    if (R.type === "eof")
      throw te();
    Je();
  },
  beforePropertyName() {
    switch (R.type) {
      case "identifier":
      case "string":
        Du = R.value, x = "afterPropertyName";
        return;
      case "punctuator":
        ge();
        return;
      case "eof":
        throw te();
    }
  },
  afterPropertyName() {
    if (R.type === "eof")
      throw te();
    x = "beforePropertyValue";
  },
  beforePropertyValue() {
    if (R.type === "eof")
      throw te();
    Je();
  },
  beforeArrayValue() {
    if (R.type === "eof")
      throw te();
    if (R.type === "punctuator" && R.value === "]") {
      ge();
      return;
    }
    Je();
  },
  afterPropertyValue() {
    if (R.type === "eof")
      throw te();
    switch (R.value) {
      case ",":
        x = "beforePropertyName";
        return;
      case "}":
        ge();
    }
  },
  afterArrayValue() {
    if (R.type === "eof")
      throw te();
    switch (R.value) {
      case ",":
        x = "beforeArrayValue";
        return;
      case "]":
        ge();
    }
  },
  end() {
  }
};
function Je() {
  let e;
  switch (R.type) {
    case "punctuator":
      switch (R.value) {
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
      e = R.value;
      break;
  }
  if (pe === void 0)
    pe = e;
  else {
    const u = q[q.length - 1];
    Array.isArray(u) ? u.push(e) : Object.defineProperty(u, Du, {
      value: e,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  }
  if (e !== null && typeof e == "object")
    q.push(e), Array.isArray(e) ? x = "beforeArrayValue" : x = "beforePropertyName";
  else {
    const u = q[q.length - 1];
    u == null ? x = "end" : Array.isArray(u) ? x = "afterArrayValue" : x = "afterPropertyValue";
  }
}
function ge() {
  q.pop();
  const e = q[q.length - 1];
  e == null ? x = "end" : Array.isArray(e) ? x = "afterArrayValue" : x = "afterPropertyValue";
}
function S(e) {
  return ke(e === void 0 ? `JSON5: invalid end of input at ${Y}:${U}` : `JSON5: invalid character '${et(e)}' at ${Y}:${U}`);
}
function te() {
  return ke(`JSON5: invalid end of input at ${Y}:${U}`);
}
function Eu() {
  return U -= 5, ke(`JSON5: invalid identifier character at ${Y}:${U}`);
}
function sn(e) {
  console.warn(`JSON5: '${et(e)}' in strings is not valid ECMAScript; consider escaping`);
}
function et(e) {
  const u = {
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
  if (u[e])
    return u[e];
  if (e < " ") {
    const n = e.charCodeAt(0).toString(16);
    return "\\x" + ("00" + n).substring(n.length);
  }
  return e;
}
function ke(e) {
  const u = new SyntaxError(e);
  return u.lineNumber = Y, u.columnNumber = U, u;
}
var cn = function(u, n, t) {
  const r = [];
  let o = "", i, s, c = "", l;
  if (n != null && typeof n == "object" && !Array.isArray(n) && (t = n.space, l = n.quote, n = n.replacer), typeof n == "function")
    s = n;
  else if (Array.isArray(n)) {
    i = [];
    for (const p of n) {
      let F;
      typeof p == "string" ? F = p : (typeof p == "number" || p instanceof String || p instanceof Number) && (F = String(p)), F !== void 0 && i.indexOf(F) < 0 && i.push(F);
    }
  }
  return t instanceof Number ? t = Number(t) : t instanceof String && (t = String(t)), typeof t == "number" ? t > 0 && (t = Math.min(10, Math.floor(t)), c = "          ".substr(0, t)) : typeof t == "string" && (c = t.substr(0, 10)), D("", { "": u });
  function D(p, F) {
    let m = F[p];
    switch (m != null && (typeof m.toJSON5 == "function" ? m = m.toJSON5(p) : typeof m.toJSON == "function" && (m = m.toJSON(p))), s && (m = s.call(F, p, m)), m instanceof Number ? m = Number(m) : m instanceof String ? m = String(m) : m instanceof Boolean && (m = m.valueOf()), m) {
      case null:
        return "null";
      case !0:
        return "true";
      case !1:
        return "false";
    }
    if (typeof m == "string")
      return a(m);
    if (typeof m == "number")
      return String(m);
    if (typeof m == "object")
      return Array.isArray(m) ? E(m) : f(m);
  }
  function a(p) {
    const F = {
      "'": 0.1,
      '"': 0.2
    }, m = {
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
    let A = "";
    for (let v = 0; v < p.length; v++) {
      const w = p[v];
      switch (w) {
        case "'":
        case '"':
          F[w]++, A += w;
          continue;
        case "\0":
          if (k.isDigit(p[v + 1])) {
            A += "\\x00";
            continue;
          }
      }
      if (m[w]) {
        A += m[w];
        continue;
      }
      if (w < " ") {
        let $ = w.charCodeAt(0).toString(16);
        A += "\\x" + ("00" + $).substring($.length);
        continue;
      }
      A += w;
    }
    const O = l || Object.keys(F).reduce((v, w) => F[v] < F[w] ? v : w);
    return A = A.replace(new RegExp(O, "g"), m[O]), O + A + O;
  }
  function f(p) {
    if (r.indexOf(p) >= 0)
      throw TypeError("Converting circular structure to JSON5");
    r.push(p);
    let F = o;
    o = o + c;
    let m = i || Object.keys(p), A = [];
    for (const v of m) {
      const w = D(v, p);
      if (w !== void 0) {
        let $ = h(v) + ":";
        c !== "" && ($ += " "), $ += w, A.push($);
      }
    }
    let O;
    if (A.length === 0)
      O = "{}";
    else {
      let v;
      if (c === "")
        v = A.join(","), O = "{" + v + "}";
      else {
        let w = `,
` + o;
        v = A.join(w), O = `{
` + o + v + `,
` + F + "}";
      }
    }
    return r.pop(), o = F, O;
  }
  function h(p) {
    if (p.length === 0)
      return a(p);
    const F = String.fromCodePoint(p.codePointAt(0));
    if (!k.isIdStartChar(F))
      return a(p);
    for (let m = F.length; m < p.length; m++)
      if (!k.isIdContinueChar(String.fromCodePoint(p.codePointAt(m))))
        return a(p);
    return p;
  }
  function E(p) {
    if (r.indexOf(p) >= 0)
      throw TypeError("Converting circular structure to JSON5");
    r.push(p);
    let F = o;
    o = o + c;
    let m = [];
    for (let O = 0; O < p.length; O++) {
      const v = D(String(O), p);
      m.push(v !== void 0 ? v : "null");
    }
    let A;
    if (m.length === 0)
      A = "[]";
    else if (c === "")
      A = "[" + m.join(",") + "]";
    else {
      let O = `,
` + o, v = m.join(O);
      A = `[
` + o + v + `,
` + F + "]";
    }
    return r.pop(), o = F, A;
  }
};
const an = {
  parse: un,
  stringify: cn
};
var Dn = an;
let I = null, Le = [], Au = null, H, ze = null, eu = cu.binding;
function ln(e, u = cu.binding) {
  H = e, eu = u, ze = setInterval(gu, 1e3), gu();
}
function fn(e) {
  return e += "}", Dn.parse(e);
}
async function gu() {
  const u = (await eu.list()).find(
    (n) => n.vendorId && (n.vendorId === Ut || n.productId === Gt || n.vendorId === Wt || n.productId === qt)
  );
  if (!u) {
    I && I.isOpen && (I.close(), I = null, H("main.ts >> Arduino not connected."));
    return;
  }
  I && I.isOpen || (I = new cu({
    path: u.path,
    baudRate: Kt,
    binding: eu
  }), I.on("open", () => {
    console.log("main.ts >> Arduino connected", u.path), H("arduino-connected");
  }), I.on("close", () => {
    console.log("main.ts >> Arduino disconnected"), I = null, H("arduino-disconnected");
  }), I.on("error", (n) => {
    console.log("main.ts >> Arduino not connected."), H("arduino-error", n.message);
  }), Au = I.pipe(new It({ delimiter: "}" })), Au.on(
    "data",
    (n) => {
      const t = fn(n);
      switch (t.channel) {
        case "DEBUG":
          console.log(`Channel: ${t.channel}
Message:${t.mssg}
Data: ${t.data}`);
          break;
        case "SOT":
          H("start-wave"), console.log("main.ts >> Received SOT!");
          break;
        case "EOT":
          H("complete-wave", Le), Le = [], console.log("main.ts >> Received EOT!");
          break;
        case "WAVEDATA":
          Le.push(t.data), H("wave-val", t.data);
          break;
      }
    }
  ));
}
function lu() {
  if (console.log("main.ts >> Shutting down app"), ze && (clearInterval(ze), ze = null), I && I.isOpen)
    try {
      I.close(), console.log("main.ts >> Port closed");
    } catch (e) {
      console.log("main.ts >> Error: ", e);
    }
  process.exit(0);
}
function dn() {
  he.handle("arduino-status", () => ({ connected: !!(I && I.isOpen) })), he.handle("send-wave", async (e, u) => {
    if (!I || !I.isOpen)
      throw new Error("Arduino is not connected");
    const n = JSON.stringify(u);
    return I.write(n + `
`, (t) => {
      console.log(t ? `main.ts >> Error sending command to arduino: ${t}` : `main.ts >> Sent command to arduino: ${n}`);
    }), "OK";
  });
}
function C(e, u, n) {
  function t(s, c) {
    if (s._zod || Object.defineProperty(s, "_zod", {
      value: {
        def: c,
        constr: i,
        traits: /* @__PURE__ */ new Set()
      },
      enumerable: !1
    }), s._zod.traits.has(e))
      return;
    s._zod.traits.add(e), u(s, c);
    const l = i.prototype, D = Object.keys(l);
    for (let a = 0; a < D.length; a++) {
      const f = D[a];
      f in s || (s[f] = l[f].bind(s));
    }
  }
  const r = (n == null ? void 0 : n.Parent) ?? Object;
  class o extends r {
  }
  Object.defineProperty(o, "name", { value: e });
  function i(s) {
    var c;
    const l = n != null && n.Parent ? new o() : this;
    t(l, s), (c = l._zod).deferred ?? (c.deferred = []);
    for (const D of l._zod.deferred)
      D();
    return l;
  }
  return Object.defineProperty(i, "init", { value: t }), Object.defineProperty(i, Symbol.hasInstance, {
    value: (s) => {
      var c, l;
      return n != null && n.Parent && s instanceof n.Parent ? !0 : (l = (c = s == null ? void 0 : s._zod) == null ? void 0 : c.traits) == null ? void 0 : l.has(e);
    }
  }), Object.defineProperty(i, "name", { value: e }), i;
}
class De extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class ut extends Error {
  constructor(u) {
    super(`Encountered unidirectional transform during encode: ${u}`), this.name = "ZodEncodeError";
  }
}
const tt = {};
function re(e) {
  return tt;
}
function nt(e) {
  const u = Object.values(e).filter((t) => typeof t == "number");
  return Object.entries(e).filter(([t, r]) => u.indexOf(+t) === -1).map(([t, r]) => r);
}
function uu(e, u) {
  return typeof u == "bigint" ? u.toString() : u;
}
function fu(e) {
  return {
    get value() {
      {
        const u = e();
        return Object.defineProperty(this, "value", { value: u }), u;
      }
    }
  };
}
function du(e) {
  return e == null;
}
function pu(e) {
  const u = e.startsWith("^") ? 1 : 0, n = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(u, n);
}
function pn(e, u) {
  const n = (e.toString().split(".")[1] || "").length, t = u.toString();
  let r = (t.split(".")[1] || "").length;
  if (r === 0 && /\d?e-\d?/.test(t)) {
    const c = t.match(/\d?e-(\d?)/);
    c != null && c[1] && (r = Number.parseInt(c[1]));
  }
  const o = n > r ? n : r, i = Number.parseInt(e.toFixed(o).replace(".", "")), s = Number.parseInt(u.toFixed(o).replace(".", ""));
  return i % s / 10 ** o;
}
const _u = Symbol("evaluating");
function b(e, u, n) {
  let t;
  Object.defineProperty(e, u, {
    get() {
      if (t !== _u)
        return t === void 0 && (t = _u, t = n()), t;
    },
    set(r) {
      Object.defineProperty(e, u, {
        value: r
        // configurable: true,
      });
    },
    configurable: !0
  });
}
function ie(e, u, n) {
  Object.defineProperty(e, u, {
    value: n,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function X(...e) {
  const u = {};
  for (const n of e) {
    const t = Object.getOwnPropertyDescriptors(n);
    Object.assign(u, t);
  }
  return Object.defineProperties({}, u);
}
function wu(e) {
  return JSON.stringify(e);
}
function hn(e) {
  return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const rt = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function Ne(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const Cn = fu(() => {
  var e;
  if (typeof navigator < "u" && ((e = navigator == null ? void 0 : navigator.userAgent) != null && e.includes("Cloudflare")))
    return !1;
  try {
    const u = Function;
    return new u(""), !0;
  } catch {
    return !1;
  }
});
function Ce(e) {
  if (Ne(e) === !1)
    return !1;
  const u = e.constructor;
  if (u === void 0 || typeof u != "function")
    return !0;
  const n = u.prototype;
  return !(Ne(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function ot(e) {
  return Ce(e) ? { ...e } : Array.isArray(e) ? [...e] : e;
}
const mn = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function $e(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Q(e, u, n) {
  const t = new e._zod.constr(u ?? e._zod.def);
  return (!u || n != null && n.parent) && (t._zod.parent = e), t;
}
function B(e) {
  const u = e;
  if (!u)
    return {};
  if (typeof u == "string")
    return { error: () => u };
  if ((u == null ? void 0 : u.message) !== void 0) {
    if ((u == null ? void 0 : u.error) !== void 0)
      throw new Error("Cannot specify both `message` and `error` params");
    u.error = u.message;
  }
  return delete u.message, typeof u.error == "string" ? { ...u, error: () => u.error } : u;
}
function Fn(e) {
  return Object.keys(e).filter((u) => e[u]._zod.optin === "optional" && e[u]._zod.optout === "optional");
}
const En = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function An(e, u) {
  const n = e._zod.def, t = n.checks;
  if (t && t.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const o = X(e._zod.def, {
    get shape() {
      const i = {};
      for (const s in u) {
        if (!(s in n.shape))
          throw new Error(`Unrecognized key: "${s}"`);
        u[s] && (i[s] = n.shape[s]);
      }
      return ie(this, "shape", i), i;
    },
    checks: []
  });
  return Q(e, o);
}
function gn(e, u) {
  const n = e._zod.def, t = n.checks;
  if (t && t.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const o = X(e._zod.def, {
    get shape() {
      const i = { ...e._zod.def.shape };
      for (const s in u) {
        if (!(s in n.shape))
          throw new Error(`Unrecognized key: "${s}"`);
        u[s] && delete i[s];
      }
      return ie(this, "shape", i), i;
    },
    checks: []
  });
  return Q(e, o);
}
function _n(e, u) {
  if (!Ce(u))
    throw new Error("Invalid input to extend: expected a plain object");
  const n = e._zod.def.checks;
  if (n && n.length > 0) {
    const o = e._zod.def.shape;
    for (const i in u)
      if (Object.getOwnPropertyDescriptor(o, i) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  const r = X(e._zod.def, {
    get shape() {
      const o = { ...e._zod.def.shape, ...u };
      return ie(this, "shape", o), o;
    }
  });
  return Q(e, r);
}
function wn(e, u) {
  if (!Ce(u))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const n = X(e._zod.def, {
    get shape() {
      const t = { ...e._zod.def.shape, ...u };
      return ie(this, "shape", t), t;
    }
  });
  return Q(e, n);
}
function yn(e, u) {
  const n = X(e._zod.def, {
    get shape() {
      const t = { ...e._zod.def.shape, ...u._zod.def.shape };
      return ie(this, "shape", t), t;
    },
    get catchall() {
      return u._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return Q(e, n);
}
function vn(e, u, n) {
  const r = u._zod.def.checks;
  if (r && r.length > 0)
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  const i = X(u._zod.def, {
    get shape() {
      const s = u._zod.def.shape, c = { ...s };
      if (n)
        for (const l in n) {
          if (!(l in s))
            throw new Error(`Unrecognized key: "${l}"`);
          n[l] && (c[l] = e ? new e({
            type: "optional",
            innerType: s[l]
          }) : s[l]);
        }
      else
        for (const l in s)
          c[l] = e ? new e({
            type: "optional",
            innerType: s[l]
          }) : s[l];
      return ie(this, "shape", c), c;
    },
    checks: []
  });
  return Q(u, i);
}
function bn(e, u, n) {
  const t = X(u._zod.def, {
    get shape() {
      const r = u._zod.def.shape, o = { ...r };
      if (n)
        for (const i in n) {
          if (!(i in o))
            throw new Error(`Unrecognized key: "${i}"`);
          n[i] && (o[i] = new e({
            type: "nonoptional",
            innerType: r[i]
          }));
        }
      else
        for (const i in r)
          o[i] = new e({
            type: "nonoptional",
            innerType: r[i]
          });
      return ie(this, "shape", o), o;
    }
  });
  return Q(u, t);
}
function ae(e, u = 0) {
  var n;
  if (e.aborted === !0)
    return !0;
  for (let t = u; t < e.issues.length; t++)
    if (((n = e.issues[t]) == null ? void 0 : n.continue) !== !0)
      return !0;
  return !1;
}
function it(e, u) {
  return u.map((n) => {
    var t;
    return (t = n).path ?? (t.path = []), n.path.unshift(e), n;
  });
}
function _e(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.message;
}
function oe(e, u, n) {
  var r, o, i, s, c, l;
  const t = { ...e, path: e.path ?? [] };
  if (!e.message) {
    const D = _e((i = (o = (r = e.inst) == null ? void 0 : r._zod.def) == null ? void 0 : o.error) == null ? void 0 : i.call(o, e)) ?? _e((s = u == null ? void 0 : u.error) == null ? void 0 : s.call(u, e)) ?? _e((c = n.customError) == null ? void 0 : c.call(n, e)) ?? _e((l = n.localeError) == null ? void 0 : l.call(n, e)) ?? "Invalid input";
    t.message = D;
  }
  return delete t.inst, delete t.continue, u != null && u.reportInput || delete t.input, t;
}
function hu(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function me(...e) {
  const [u, n, t] = e;
  return typeof u == "string" ? {
    message: u,
    code: "custom",
    input: n,
    inst: t
  } : { ...u };
}
const st = (e, u) => {
  e.name = "$ZodError", Object.defineProperty(e, "_zod", {
    value: e._zod,
    enumerable: !1
  }), Object.defineProperty(e, "issues", {
    value: u,
    enumerable: !1
  }), e.message = JSON.stringify(u, uu, 2), Object.defineProperty(e, "toString", {
    value: () => e.message,
    enumerable: !1
  });
}, ct = C("$ZodError", st), at = C("$ZodError", st, { Parent: Error });
function Bn(e, u = (n) => n.message) {
  const n = {}, t = [];
  for (const r of e.issues)
    r.path.length > 0 ? (n[r.path[0]] = n[r.path[0]] || [], n[r.path[0]].push(u(r))) : t.push(u(r));
  return { formErrors: t, fieldErrors: n };
}
function On(e, u = (n) => n.message) {
  const n = { _errors: [] }, t = (r) => {
    for (const o of r.issues)
      if (o.code === "invalid_union" && o.errors.length)
        o.errors.map((i) => t({ issues: i }));
      else if (o.code === "invalid_key")
        t({ issues: o.issues });
      else if (o.code === "invalid_element")
        t({ issues: o.issues });
      else if (o.path.length === 0)
        n._errors.push(u(o));
      else {
        let i = n, s = 0;
        for (; s < o.path.length; ) {
          const c = o.path[s];
          s === o.path.length - 1 ? (i[c] = i[c] || { _errors: [] }, i[c]._errors.push(u(o))) : i[c] = i[c] || { _errors: [] }, i = i[c], s++;
        }
      }
  };
  return t(e), n;
}
const Cu = (e) => (u, n, t, r) => {
  const o = t ? Object.assign(t, { async: !1 }) : { async: !1 }, i = u._zod.run({ value: n, issues: [] }, o);
  if (i instanceof Promise)
    throw new De();
  if (i.issues.length) {
    const s = new ((r == null ? void 0 : r.Err) ?? e)(i.issues.map((c) => oe(c, o, re())));
    throw rt(s, r == null ? void 0 : r.callee), s;
  }
  return i.value;
}, mu = (e) => async (u, n, t, r) => {
  const o = t ? Object.assign(t, { async: !0 }) : { async: !0 };
  let i = u._zod.run({ value: n, issues: [] }, o);
  if (i instanceof Promise && (i = await i), i.issues.length) {
    const s = new ((r == null ? void 0 : r.Err) ?? e)(i.issues.map((c) => oe(c, o, re())));
    throw rt(s, r == null ? void 0 : r.callee), s;
  }
  return i.value;
}, Re = (e) => (u, n, t) => {
  const r = t ? { ...t, async: !1 } : { async: !1 }, o = u._zod.run({ value: n, issues: [] }, r);
  if (o instanceof Promise)
    throw new De();
  return o.issues.length ? {
    success: !1,
    error: new (e ?? ct)(o.issues.map((i) => oe(i, r, re())))
  } : { success: !0, data: o.value };
}, zn = /* @__PURE__ */ Re(at), je = (e) => async (u, n, t) => {
  const r = t ? Object.assign(t, { async: !0 }) : { async: !0 };
  let o = u._zod.run({ value: n, issues: [] }, r);
  return o instanceof Promise && (o = await o), o.issues.length ? {
    success: !1,
    error: new e(o.issues.map((i) => oe(i, r, re())))
  } : { success: !0, data: o.value };
}, Sn = /* @__PURE__ */ je(at), kn = (e) => (u, n, t) => {
  const r = t ? Object.assign(t, { direction: "backward" }) : { direction: "backward" };
  return Cu(e)(u, n, r);
}, Nn = (e) => (u, n, t) => Cu(e)(u, n, t), In = (e) => async (u, n, t) => {
  const r = t ? Object.assign(t, { direction: "backward" }) : { direction: "backward" };
  return mu(e)(u, n, r);
}, Pn = (e) => async (u, n, t) => mu(e)(u, n, t), Tn = (e) => (u, n, t) => {
  const r = t ? Object.assign(t, { direction: "backward" }) : { direction: "backward" };
  return Re(e)(u, n, r);
}, $n = (e) => (u, n, t) => Re(e)(u, n, t), Rn = (e) => async (u, n, t) => {
  const r = t ? Object.assign(t, { direction: "backward" }) : { direction: "backward" };
  return je(e)(u, n, r);
}, jn = (e) => async (u, n, t) => je(e)(u, n, t), Zn = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function xn(e) {
  const u = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${u}` : e.precision === 0 ? `${u}:[0-5]\\d` : `${u}:[0-5]\\d\\.\\d{${e.precision}}` : `${u}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function Mn(e) {
  const u = xn({ precision: e.precision }), n = ["Z"];
  e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const t = `${u}(?:${n.join("|")})`;
  return new RegExp(`^${Zn}T(?:${t})$`);
}
const Jn = (e) => {
  const u = e ? `[\\s\\S]{${(e == null ? void 0 : e.minimum) ?? 0},${(e == null ? void 0 : e.maximum) ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${u}$`);
}, Ln = /^-?\d+$/, Vn = /^-?\d+(?:\.\d+)?$/, Un = /^[^A-Z]*$/, Gn = /^[^a-z]*$/, M = /* @__PURE__ */ C("$ZodCheck", (e, u) => {
  var n;
  e._zod ?? (e._zod = {}), e._zod.def = u, (n = e._zod).onattach ?? (n.onattach = []);
}), Dt = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, lt = /* @__PURE__ */ C("$ZodCheckLessThan", (e, u) => {
  M.init(e, u);
  const n = Dt[typeof u.value];
  e._zod.onattach.push((t) => {
    const r = t._zod.bag, o = (u.inclusive ? r.maximum : r.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    u.value < o && (u.inclusive ? r.maximum = u.value : r.exclusiveMaximum = u.value);
  }), e._zod.check = (t) => {
    (u.inclusive ? t.value <= u.value : t.value < u.value) || t.issues.push({
      origin: n,
      code: "too_big",
      maximum: typeof u.value == "object" ? u.value.getTime() : u.value,
      input: t.value,
      inclusive: u.inclusive,
      inst: e,
      continue: !u.abort
    });
  };
}), ft = /* @__PURE__ */ C("$ZodCheckGreaterThan", (e, u) => {
  M.init(e, u);
  const n = Dt[typeof u.value];
  e._zod.onattach.push((t) => {
    const r = t._zod.bag, o = (u.inclusive ? r.minimum : r.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    u.value > o && (u.inclusive ? r.minimum = u.value : r.exclusiveMinimum = u.value);
  }), e._zod.check = (t) => {
    (u.inclusive ? t.value >= u.value : t.value > u.value) || t.issues.push({
      origin: n,
      code: "too_small",
      minimum: typeof u.value == "object" ? u.value.getTime() : u.value,
      input: t.value,
      inclusive: u.inclusive,
      inst: e,
      continue: !u.abort
    });
  };
}), Wn = /* @__PURE__ */ C("$ZodCheckMultipleOf", (e, u) => {
  M.init(e, u), e._zod.onattach.push((n) => {
    var t;
    (t = n._zod.bag).multipleOf ?? (t.multipleOf = u.value);
  }), e._zod.check = (n) => {
    if (typeof n.value != typeof u.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof n.value == "bigint" ? n.value % u.value === BigInt(0) : pn(n.value, u.value) === 0) || n.issues.push({
      origin: typeof n.value,
      code: "not_multiple_of",
      divisor: u.value,
      input: n.value,
      inst: e,
      continue: !u.abort
    });
  };
}), qn = /* @__PURE__ */ C("$ZodCheckNumberFormat", (e, u) => {
  var i;
  M.init(e, u), u.format = u.format || "float64";
  const n = (i = u.format) == null ? void 0 : i.includes("int"), t = n ? "int" : "number", [r, o] = En[u.format];
  e._zod.onattach.push((s) => {
    const c = s._zod.bag;
    c.format = u.format, c.minimum = r, c.maximum = o, n && (c.pattern = Ln);
  }), e._zod.check = (s) => {
    const c = s.value;
    if (n) {
      if (!Number.isInteger(c)) {
        s.issues.push({
          expected: t,
          format: u.format,
          code: "invalid_type",
          continue: !1,
          input: c,
          inst: e
        });
        return;
      }
      if (!Number.isSafeInteger(c)) {
        c > 0 ? s.issues.push({
          input: c,
          code: "too_big",
          maximum: Number.MAX_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: t,
          inclusive: !0,
          continue: !u.abort
        }) : s.issues.push({
          input: c,
          code: "too_small",
          minimum: Number.MIN_SAFE_INTEGER,
          note: "Integers must be within the safe integer range.",
          inst: e,
          origin: t,
          inclusive: !0,
          continue: !u.abort
        });
        return;
      }
    }
    c < r && s.issues.push({
      origin: "number",
      input: c,
      code: "too_small",
      minimum: r,
      inclusive: !0,
      inst: e,
      continue: !u.abort
    }), c > o && s.issues.push({
      origin: "number",
      input: c,
      code: "too_big",
      maximum: o,
      inclusive: !0,
      inst: e,
      continue: !u.abort
    });
  };
}), Kn = /* @__PURE__ */ C("$ZodCheckMaxLength", (e, u) => {
  var n;
  M.init(e, u), (n = e._zod.def).when ?? (n.when = (t) => {
    const r = t.value;
    return !du(r) && r.length !== void 0;
  }), e._zod.onattach.push((t) => {
    const r = t._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    u.maximum < r && (t._zod.bag.maximum = u.maximum);
  }), e._zod.check = (t) => {
    const r = t.value;
    if (r.length <= u.maximum)
      return;
    const i = hu(r);
    t.issues.push({
      origin: i,
      code: "too_big",
      maximum: u.maximum,
      inclusive: !0,
      input: r,
      inst: e,
      continue: !u.abort
    });
  };
}), Hn = /* @__PURE__ */ C("$ZodCheckMinLength", (e, u) => {
  var n;
  M.init(e, u), (n = e._zod.def).when ?? (n.when = (t) => {
    const r = t.value;
    return !du(r) && r.length !== void 0;
  }), e._zod.onattach.push((t) => {
    const r = t._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    u.minimum > r && (t._zod.bag.minimum = u.minimum);
  }), e._zod.check = (t) => {
    const r = t.value;
    if (r.length >= u.minimum)
      return;
    const i = hu(r);
    t.issues.push({
      origin: i,
      code: "too_small",
      minimum: u.minimum,
      inclusive: !0,
      input: r,
      inst: e,
      continue: !u.abort
    });
  };
}), Yn = /* @__PURE__ */ C("$ZodCheckLengthEquals", (e, u) => {
  var n;
  M.init(e, u), (n = e._zod.def).when ?? (n.when = (t) => {
    const r = t.value;
    return !du(r) && r.length !== void 0;
  }), e._zod.onattach.push((t) => {
    const r = t._zod.bag;
    r.minimum = u.length, r.maximum = u.length, r.length = u.length;
  }), e._zod.check = (t) => {
    const r = t.value, o = r.length;
    if (o === u.length)
      return;
    const i = hu(r), s = o > u.length;
    t.issues.push({
      origin: i,
      ...s ? { code: "too_big", maximum: u.length } : { code: "too_small", minimum: u.length },
      inclusive: !0,
      exact: !0,
      input: t.value,
      inst: e,
      continue: !u.abort
    });
  };
}), Ze = /* @__PURE__ */ C("$ZodCheckStringFormat", (e, u) => {
  var n, t;
  M.init(e, u), e._zod.onattach.push((r) => {
    const o = r._zod.bag;
    o.format = u.format, u.pattern && (o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(u.pattern));
  }), u.pattern ? (n = e._zod).check ?? (n.check = (r) => {
    u.pattern.lastIndex = 0, !u.pattern.test(r.value) && r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: u.format,
      input: r.value,
      ...u.pattern ? { pattern: u.pattern.toString() } : {},
      inst: e,
      continue: !u.abort
    });
  }) : (t = e._zod).check ?? (t.check = () => {
  });
}), Xn = /* @__PURE__ */ C("$ZodCheckRegex", (e, u) => {
  Ze.init(e, u), e._zod.check = (n) => {
    u.pattern.lastIndex = 0, !u.pattern.test(n.value) && n.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "regex",
      input: n.value,
      pattern: u.pattern.toString(),
      inst: e,
      continue: !u.abort
    });
  };
}), Qn = /* @__PURE__ */ C("$ZodCheckLowerCase", (e, u) => {
  u.pattern ?? (u.pattern = Un), Ze.init(e, u);
}), er = /* @__PURE__ */ C("$ZodCheckUpperCase", (e, u) => {
  u.pattern ?? (u.pattern = Gn), Ze.init(e, u);
}), ur = /* @__PURE__ */ C("$ZodCheckIncludes", (e, u) => {
  M.init(e, u);
  const n = $e(u.includes), t = new RegExp(typeof u.position == "number" ? `^.{${u.position}}${n}` : n);
  u.pattern = t, e._zod.onattach.push((r) => {
    const o = r._zod.bag;
    o.patterns ?? (o.patterns = /* @__PURE__ */ new Set()), o.patterns.add(t);
  }), e._zod.check = (r) => {
    r.value.includes(u.includes, u.position) || r.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "includes",
      includes: u.includes,
      input: r.value,
      inst: e,
      continue: !u.abort
    });
  };
}), tr = /* @__PURE__ */ C("$ZodCheckStartsWith", (e, u) => {
  M.init(e, u);
  const n = new RegExp(`^${$e(u.prefix)}.*`);
  u.pattern ?? (u.pattern = n), e._zod.onattach.push((t) => {
    const r = t._zod.bag;
    r.patterns ?? (r.patterns = /* @__PURE__ */ new Set()), r.patterns.add(n);
  }), e._zod.check = (t) => {
    t.value.startsWith(u.prefix) || t.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "starts_with",
      prefix: u.prefix,
      input: t.value,
      inst: e,
      continue: !u.abort
    });
  };
}), nr = /* @__PURE__ */ C("$ZodCheckEndsWith", (e, u) => {
  M.init(e, u);
  const n = new RegExp(`.*${$e(u.suffix)}$`);
  u.pattern ?? (u.pattern = n), e._zod.onattach.push((t) => {
    const r = t._zod.bag;
    r.patterns ?? (r.patterns = /* @__PURE__ */ new Set()), r.patterns.add(n);
  }), e._zod.check = (t) => {
    t.value.endsWith(u.suffix) || t.issues.push({
      origin: "string",
      code: "invalid_format",
      format: "ends_with",
      suffix: u.suffix,
      input: t.value,
      inst: e,
      continue: !u.abort
    });
  };
}), rr = /* @__PURE__ */ C("$ZodCheckOverwrite", (e, u) => {
  M.init(e, u), e._zod.check = (n) => {
    n.value = u.tx(n.value);
  };
});
class or {
  constructor(u = []) {
    this.content = [], this.indent = 0, this && (this.args = u);
  }
  indented(u) {
    this.indent += 1, u(this), this.indent -= 1;
  }
  write(u) {
    if (typeof u == "function") {
      u(this, { execution: "sync" }), u(this, { execution: "async" });
      return;
    }
    const t = u.split(`
`).filter((i) => i), r = Math.min(...t.map((i) => i.length - i.trimStart().length)), o = t.map((i) => i.slice(r)).map((i) => " ".repeat(this.indent * 2) + i);
    for (const i of o)
      this.content.push(i);
  }
  compile() {
    const u = Function, n = this == null ? void 0 : this.args, r = [...((this == null ? void 0 : this.content) ?? [""]).map((o) => `  ${o}`)];
    return new u(...n, r.join(`
`));
  }
}
const ir = {
  major: 4,
  minor: 3,
  patch: 6
}, P = /* @__PURE__ */ C("$ZodType", (e, u) => {
  var r;
  var n;
  e ?? (e = {}), e._zod.def = u, e._zod.bag = e._zod.bag || {}, e._zod.version = ir;
  const t = [...e._zod.def.checks ?? []];
  e._zod.traits.has("$ZodCheck") && t.unshift(e);
  for (const o of t)
    for (const i of o._zod.onattach)
      i(e);
  if (t.length === 0)
    (n = e._zod).deferred ?? (n.deferred = []), (r = e._zod.deferred) == null || r.push(() => {
      e._zod.run = e._zod.parse;
    });
  else {
    const o = (s, c, l) => {
      let D = ae(s), a;
      for (const f of c) {
        if (f._zod.def.when) {
          if (!f._zod.def.when(s))
            continue;
        } else if (D)
          continue;
        const h = s.issues.length, E = f._zod.check(s);
        if (E instanceof Promise && (l == null ? void 0 : l.async) === !1)
          throw new De();
        if (a || E instanceof Promise)
          a = (a ?? Promise.resolve()).then(async () => {
            await E, s.issues.length !== h && (D || (D = ae(s, h)));
          });
        else {
          if (s.issues.length === h)
            continue;
          D || (D = ae(s, h));
        }
      }
      return a ? a.then(() => s) : s;
    }, i = (s, c, l) => {
      if (ae(s))
        return s.aborted = !0, s;
      const D = o(c, t, l);
      if (D instanceof Promise) {
        if (l.async === !1)
          throw new De();
        return D.then((a) => e._zod.parse(a, l));
      }
      return e._zod.parse(D, l);
    };
    e._zod.run = (s, c) => {
      if (c.skipChecks)
        return e._zod.parse(s, c);
      if (c.direction === "backward") {
        const D = e._zod.parse({ value: s.value, issues: [] }, { ...c, skipChecks: !0 });
        return D instanceof Promise ? D.then((a) => i(a, s, c)) : i(D, s, c);
      }
      const l = e._zod.parse(s, c);
      if (l instanceof Promise) {
        if (c.async === !1)
          throw new De();
        return l.then((D) => o(D, t, c));
      }
      return o(l, t, c);
    };
  }
  b(e, "~standard", () => ({
    validate: (o) => {
      var i;
      try {
        const s = zn(e, o);
        return s.success ? { value: s.data } : { issues: (i = s.error) == null ? void 0 : i.issues };
      } catch {
        return Sn(e, o).then((c) => {
          var l;
          return c.success ? { value: c.data } : { issues: (l = c.error) == null ? void 0 : l.issues };
        });
      }
    },
    vendor: "zod",
    version: 1
  }));
}), dt = /* @__PURE__ */ C("$ZodString", (e, u) => {
  var n;
  P.init(e, u), e._zod.pattern = [...((n = e == null ? void 0 : e._zod.bag) == null ? void 0 : n.patterns) ?? []].pop() ?? Jn(e._zod.bag), e._zod.parse = (t, r) => {
    if (u.coerce)
      try {
        t.value = String(t.value);
      } catch {
      }
    return typeof t.value == "string" || t.issues.push({
      expected: "string",
      code: "invalid_type",
      input: t.value,
      inst: e
    }), t;
  };
}), pt = /* @__PURE__ */ C("$ZodStringFormat", (e, u) => {
  Ze.init(e, u), dt.init(e, u);
}), sr = /* @__PURE__ */ C("$ZodISODateTime", (e, u) => {
  u.pattern ?? (u.pattern = Mn(u)), pt.init(e, u);
}), ht = /* @__PURE__ */ C("$ZodNumber", (e, u) => {
  P.init(e, u), e._zod.pattern = e._zod.bag.pattern ?? Vn, e._zod.parse = (n, t) => {
    if (u.coerce)
      try {
        n.value = Number(n.value);
      } catch {
      }
    const r = n.value;
    if (typeof r == "number" && !Number.isNaN(r) && Number.isFinite(r))
      return n;
    const o = typeof r == "number" ? Number.isNaN(r) ? "NaN" : Number.isFinite(r) ? void 0 : "Infinity" : void 0;
    return n.issues.push({
      expected: "number",
      code: "invalid_type",
      input: r,
      inst: e,
      ...o ? { received: o } : {}
    }), n;
  };
}), cr = /* @__PURE__ */ C("$ZodNumberFormat", (e, u) => {
  qn.init(e, u), ht.init(e, u);
}), ar = /* @__PURE__ */ C("$ZodUnknown", (e, u) => {
  P.init(e, u), e._zod.parse = (n) => n;
}), Dr = /* @__PURE__ */ C("$ZodNever", (e, u) => {
  P.init(e, u), e._zod.parse = (n, t) => (n.issues.push({
    expected: "never",
    code: "invalid_type",
    input: n.value,
    inst: e
  }), n);
});
function yu(e, u, n) {
  e.issues.length && u.issues.push(...it(n, e.issues)), u.value[n] = e.value;
}
const lr = /* @__PURE__ */ C("$ZodArray", (e, u) => {
  P.init(e, u), e._zod.parse = (n, t) => {
    const r = n.value;
    if (!Array.isArray(r))
      return n.issues.push({
        expected: "array",
        code: "invalid_type",
        input: r,
        inst: e
      }), n;
    n.value = Array(r.length);
    const o = [];
    for (let i = 0; i < r.length; i++) {
      const s = r[i], c = u.element._zod.run({
        value: s,
        issues: []
      }, t);
      c instanceof Promise ? o.push(c.then((l) => yu(l, n, i))) : yu(c, n, i);
    }
    return o.length ? Promise.all(o).then(() => n) : n;
  };
});
function Ie(e, u, n, t, r) {
  if (e.issues.length) {
    if (r && !(n in t))
      return;
    u.issues.push(...it(n, e.issues));
  }
  e.value === void 0 ? n in t && (u.value[n] = void 0) : u.value[n] = e.value;
}
function Ct(e) {
  var t, r, o, i;
  const u = Object.keys(e.shape);
  for (const s of u)
    if (!((i = (o = (r = (t = e.shape) == null ? void 0 : t[s]) == null ? void 0 : r._zod) == null ? void 0 : o.traits) != null && i.has("$ZodType")))
      throw new Error(`Invalid element at key "${s}": expected a Zod schema`);
  const n = Fn(e.shape);
  return {
    ...e,
    keys: u,
    keySet: new Set(u),
    numKeys: u.length,
    optionalKeys: new Set(n)
  };
}
function mt(e, u, n, t, r, o) {
  const i = [], s = r.keySet, c = r.catchall._zod, l = c.def.type, D = c.optout === "optional";
  for (const a in u) {
    if (s.has(a))
      continue;
    if (l === "never") {
      i.push(a);
      continue;
    }
    const f = c.run({ value: u[a], issues: [] }, t);
    f instanceof Promise ? e.push(f.then((h) => Ie(h, n, a, u, D))) : Ie(f, n, a, u, D);
  }
  return i.length && n.issues.push({
    code: "unrecognized_keys",
    keys: i,
    input: u,
    inst: o
  }), e.length ? Promise.all(e).then(() => n) : n;
}
const fr = /* @__PURE__ */ C("$ZodObject", (e, u) => {
  P.init(e, u);
  const n = Object.getOwnPropertyDescriptor(u, "shape");
  if (!(n != null && n.get)) {
    const s = u.shape;
    Object.defineProperty(u, "shape", {
      get: () => {
        const c = { ...s };
        return Object.defineProperty(u, "shape", {
          value: c
        }), c;
      }
    });
  }
  const t = fu(() => Ct(u));
  b(e._zod, "propValues", () => {
    const s = u.shape, c = {};
    for (const l in s) {
      const D = s[l]._zod;
      if (D.values) {
        c[l] ?? (c[l] = /* @__PURE__ */ new Set());
        for (const a of D.values)
          c[l].add(a);
      }
    }
    return c;
  });
  const r = Ne, o = u.catchall;
  let i;
  e._zod.parse = (s, c) => {
    i ?? (i = t.value);
    const l = s.value;
    if (!r(l))
      return s.issues.push({
        expected: "object",
        code: "invalid_type",
        input: l,
        inst: e
      }), s;
    s.value = {};
    const D = [], a = i.shape;
    for (const f of i.keys) {
      const h = a[f], E = h._zod.optout === "optional", p = h._zod.run({ value: l[f], issues: [] }, c);
      p instanceof Promise ? D.push(p.then((F) => Ie(F, s, f, l, E))) : Ie(p, s, f, l, E);
    }
    return o ? mt(D, l, s, c, t.value, e) : D.length ? Promise.all(D).then(() => s) : s;
  };
}), dr = /* @__PURE__ */ C("$ZodObjectJIT", (e, u) => {
  fr.init(e, u);
  const n = e._zod.parse, t = fu(() => Ct(u)), r = (f) => {
    var O;
    const h = new or(["shape", "payload", "ctx"]), E = t.value, p = (v) => {
      const w = wu(v);
      return `shape[${w}]._zod.run({ value: input[${w}], issues: [] }, ctx)`;
    };
    h.write("const input = payload.value;");
    const F = /* @__PURE__ */ Object.create(null);
    let m = 0;
    for (const v of E.keys)
      F[v] = `key_${m++}`;
    h.write("const newResult = {};");
    for (const v of E.keys) {
      const w = F[v], $ = wu(v), ee = f[v], xe = ((O = ee == null ? void 0 : ee._zod) == null ? void 0 : O.optout) === "optional";
      h.write(`const ${w} = ${p(v)};`), xe ? h.write(`
        if (${w}.issues.length) {
          if (${$} in input) {
            payload.issues = payload.issues.concat(${w}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${$}, ...iss.path] : [${$}]
            })));
          }
        }
        
        if (${w}.value === undefined) {
          if (${$} in input) {
            newResult[${$}] = undefined;
          }
        } else {
          newResult[${$}] = ${w}.value;
        }
        
      `) : h.write(`
        if (${w}.issues.length) {
          payload.issues = payload.issues.concat(${w}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${$}, ...iss.path] : [${$}]
          })));
        }
        
        if (${w}.value === undefined) {
          if (${$} in input) {
            newResult[${$}] = undefined;
          }
        } else {
          newResult[${$}] = ${w}.value;
        }
        
      `);
    }
    h.write("payload.value = newResult;"), h.write("return payload;");
    const A = h.compile();
    return (v, w) => A(f, v, w);
  };
  let o;
  const i = Ne, s = !tt.jitless, l = s && Cn.value, D = u.catchall;
  let a;
  e._zod.parse = (f, h) => {
    a ?? (a = t.value);
    const E = f.value;
    return i(E) ? s && l && (h == null ? void 0 : h.async) === !1 && h.jitless !== !0 ? (o || (o = r(u.shape)), f = o(f, h), D ? mt([], E, f, h, a, e) : f) : n(f, h) : (f.issues.push({
      expected: "object",
      code: "invalid_type",
      input: E,
      inst: e
    }), f);
  };
});
function vu(e, u, n, t) {
  for (const o of e)
    if (o.issues.length === 0)
      return u.value = o.value, u;
  const r = e.filter((o) => !ae(o));
  return r.length === 1 ? (u.value = r[0].value, r[0]) : (u.issues.push({
    code: "invalid_union",
    input: u.value,
    inst: n,
    errors: e.map((o) => o.issues.map((i) => oe(i, t, re())))
  }), u);
}
const pr = /* @__PURE__ */ C("$ZodUnion", (e, u) => {
  P.init(e, u), b(e._zod, "optin", () => u.options.some((r) => r._zod.optin === "optional") ? "optional" : void 0), b(e._zod, "optout", () => u.options.some((r) => r._zod.optout === "optional") ? "optional" : void 0), b(e._zod, "values", () => {
    if (u.options.every((r) => r._zod.values))
      return new Set(u.options.flatMap((r) => Array.from(r._zod.values)));
  }), b(e._zod, "pattern", () => {
    if (u.options.every((r) => r._zod.pattern)) {
      const r = u.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${r.map((o) => pu(o.source)).join("|")})$`);
    }
  });
  const n = u.options.length === 1, t = u.options[0]._zod.run;
  e._zod.parse = (r, o) => {
    if (n)
      return t(r, o);
    let i = !1;
    const s = [];
    for (const c of u.options) {
      const l = c._zod.run({
        value: r.value,
        issues: []
      }, o);
      if (l instanceof Promise)
        s.push(l), i = !0;
      else {
        if (l.issues.length === 0)
          return l;
        s.push(l);
      }
    }
    return i ? Promise.all(s).then((c) => vu(c, r, e, o)) : vu(s, r, e, o);
  };
}), hr = /* @__PURE__ */ C("$ZodIntersection", (e, u) => {
  P.init(e, u), e._zod.parse = (n, t) => {
    const r = n.value, o = u.left._zod.run({ value: r, issues: [] }, t), i = u.right._zod.run({ value: r, issues: [] }, t);
    return o instanceof Promise || i instanceof Promise ? Promise.all([o, i]).then(([c, l]) => bu(n, c, l)) : bu(n, o, i);
  };
});
function tu(e, u) {
  if (e === u)
    return { valid: !0, data: e };
  if (e instanceof Date && u instanceof Date && +e == +u)
    return { valid: !0, data: e };
  if (Ce(e) && Ce(u)) {
    const n = Object.keys(u), t = Object.keys(e).filter((o) => n.indexOf(o) !== -1), r = { ...e, ...u };
    for (const o of t) {
      const i = tu(e[o], u[o]);
      if (!i.valid)
        return {
          valid: !1,
          mergeErrorPath: [o, ...i.mergeErrorPath]
        };
      r[o] = i.data;
    }
    return { valid: !0, data: r };
  }
  if (Array.isArray(e) && Array.isArray(u)) {
    if (e.length !== u.length)
      return { valid: !1, mergeErrorPath: [] };
    const n = [];
    for (let t = 0; t < e.length; t++) {
      const r = e[t], o = u[t], i = tu(r, o);
      if (!i.valid)
        return {
          valid: !1,
          mergeErrorPath: [t, ...i.mergeErrorPath]
        };
      n.push(i.data);
    }
    return { valid: !0, data: n };
  }
  return { valid: !1, mergeErrorPath: [] };
}
function bu(e, u, n) {
  const t = /* @__PURE__ */ new Map();
  let r;
  for (const s of u.issues)
    if (s.code === "unrecognized_keys") {
      r ?? (r = s);
      for (const c of s.keys)
        t.has(c) || t.set(c, {}), t.get(c).l = !0;
    } else
      e.issues.push(s);
  for (const s of n.issues)
    if (s.code === "unrecognized_keys")
      for (const c of s.keys)
        t.has(c) || t.set(c, {}), t.get(c).r = !0;
    else
      e.issues.push(s);
  const o = [...t].filter(([, s]) => s.l && s.r).map(([s]) => s);
  if (o.length && r && e.issues.push({ ...r, keys: o }), ae(e))
    return e;
  const i = tu(u.value, n.value);
  if (!i.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(i.mergeErrorPath)}`);
  return e.value = i.data, e;
}
const Cr = /* @__PURE__ */ C("$ZodEnum", (e, u) => {
  P.init(e, u);
  const n = nt(u.entries), t = new Set(n);
  e._zod.values = t, e._zod.pattern = new RegExp(`^(${n.filter((r) => mn.has(typeof r)).map((r) => typeof r == "string" ? $e(r) : r.toString()).join("|")})$`), e._zod.parse = (r, o) => {
    const i = r.value;
    return t.has(i) || r.issues.push({
      code: "invalid_value",
      values: n,
      input: i,
      inst: e
    }), r;
  };
}), mr = /* @__PURE__ */ C("$ZodTransform", (e, u) => {
  P.init(e, u), e._zod.parse = (n, t) => {
    if (t.direction === "backward")
      throw new ut(e.constructor.name);
    const r = u.transform(n.value, n);
    if (t.async)
      return (r instanceof Promise ? r : Promise.resolve(r)).then((i) => (n.value = i, n));
    if (r instanceof Promise)
      throw new De();
    return n.value = r, n;
  };
});
function Bu(e, u) {
  return e.issues.length && u === void 0 ? { issues: [], value: void 0 } : e;
}
const Ft = /* @__PURE__ */ C("$ZodOptional", (e, u) => {
  P.init(e, u), e._zod.optin = "optional", e._zod.optout = "optional", b(e._zod, "values", () => u.innerType._zod.values ? /* @__PURE__ */ new Set([...u.innerType._zod.values, void 0]) : void 0), b(e._zod, "pattern", () => {
    const n = u.innerType._zod.pattern;
    return n ? new RegExp(`^(${pu(n.source)})?$`) : void 0;
  }), e._zod.parse = (n, t) => {
    if (u.innerType._zod.optin === "optional") {
      const r = u.innerType._zod.run(n, t);
      return r instanceof Promise ? r.then((o) => Bu(o, n.value)) : Bu(r, n.value);
    }
    return n.value === void 0 ? n : u.innerType._zod.run(n, t);
  };
}), Fr = /* @__PURE__ */ C("$ZodExactOptional", (e, u) => {
  Ft.init(e, u), b(e._zod, "values", () => u.innerType._zod.values), b(e._zod, "pattern", () => u.innerType._zod.pattern), e._zod.parse = (n, t) => u.innerType._zod.run(n, t);
}), Er = /* @__PURE__ */ C("$ZodNullable", (e, u) => {
  P.init(e, u), b(e._zod, "optin", () => u.innerType._zod.optin), b(e._zod, "optout", () => u.innerType._zod.optout), b(e._zod, "pattern", () => {
    const n = u.innerType._zod.pattern;
    return n ? new RegExp(`^(${pu(n.source)}|null)$`) : void 0;
  }), b(e._zod, "values", () => u.innerType._zod.values ? /* @__PURE__ */ new Set([...u.innerType._zod.values, null]) : void 0), e._zod.parse = (n, t) => n.value === null ? n : u.innerType._zod.run(n, t);
}), Ar = /* @__PURE__ */ C("$ZodDefault", (e, u) => {
  P.init(e, u), e._zod.optin = "optional", b(e._zod, "values", () => u.innerType._zod.values), e._zod.parse = (n, t) => {
    if (t.direction === "backward")
      return u.innerType._zod.run(n, t);
    if (n.value === void 0)
      return n.value = u.defaultValue, n;
    const r = u.innerType._zod.run(n, t);
    return r instanceof Promise ? r.then((o) => Ou(o, u)) : Ou(r, u);
  };
});
function Ou(e, u) {
  return e.value === void 0 && (e.value = u.defaultValue), e;
}
const gr = /* @__PURE__ */ C("$ZodPrefault", (e, u) => {
  P.init(e, u), e._zod.optin = "optional", b(e._zod, "values", () => u.innerType._zod.values), e._zod.parse = (n, t) => (t.direction === "backward" || n.value === void 0 && (n.value = u.defaultValue), u.innerType._zod.run(n, t));
}), _r = /* @__PURE__ */ C("$ZodNonOptional", (e, u) => {
  P.init(e, u), b(e._zod, "values", () => {
    const n = u.innerType._zod.values;
    return n ? new Set([...n].filter((t) => t !== void 0)) : void 0;
  }), e._zod.parse = (n, t) => {
    const r = u.innerType._zod.run(n, t);
    return r instanceof Promise ? r.then((o) => zu(o, e)) : zu(r, e);
  };
});
function zu(e, u) {
  return !e.issues.length && e.value === void 0 && e.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: e.value,
    inst: u
  }), e;
}
const wr = /* @__PURE__ */ C("$ZodCatch", (e, u) => {
  P.init(e, u), b(e._zod, "optin", () => u.innerType._zod.optin), b(e._zod, "optout", () => u.innerType._zod.optout), b(e._zod, "values", () => u.innerType._zod.values), e._zod.parse = (n, t) => {
    if (t.direction === "backward")
      return u.innerType._zod.run(n, t);
    const r = u.innerType._zod.run(n, t);
    return r instanceof Promise ? r.then((o) => (n.value = o.value, o.issues.length && (n.value = u.catchValue({
      ...n,
      error: {
        issues: o.issues.map((i) => oe(i, t, re()))
      },
      input: n.value
    }), n.issues = []), n)) : (n.value = r.value, r.issues.length && (n.value = u.catchValue({
      ...n,
      error: {
        issues: r.issues.map((o) => oe(o, t, re()))
      },
      input: n.value
    }), n.issues = []), n);
  };
}), yr = /* @__PURE__ */ C("$ZodPipe", (e, u) => {
  P.init(e, u), b(e._zod, "values", () => u.in._zod.values), b(e._zod, "optin", () => u.in._zod.optin), b(e._zod, "optout", () => u.out._zod.optout), b(e._zod, "propValues", () => u.in._zod.propValues), e._zod.parse = (n, t) => {
    if (t.direction === "backward") {
      const o = u.out._zod.run(n, t);
      return o instanceof Promise ? o.then((i) => we(i, u.in, t)) : we(o, u.in, t);
    }
    const r = u.in._zod.run(n, t);
    return r instanceof Promise ? r.then((o) => we(o, u.out, t)) : we(r, u.out, t);
  };
});
function we(e, u, n) {
  return e.issues.length ? (e.aborted = !0, e) : u._zod.run({ value: e.value, issues: e.issues }, n);
}
const vr = /* @__PURE__ */ C("$ZodReadonly", (e, u) => {
  P.init(e, u), b(e._zod, "propValues", () => u.innerType._zod.propValues), b(e._zod, "values", () => u.innerType._zod.values), b(e._zod, "optin", () => {
    var n, t;
    return (t = (n = u.innerType) == null ? void 0 : n._zod) == null ? void 0 : t.optin;
  }), b(e._zod, "optout", () => {
    var n, t;
    return (t = (n = u.innerType) == null ? void 0 : n._zod) == null ? void 0 : t.optout;
  }), e._zod.parse = (n, t) => {
    if (t.direction === "backward")
      return u.innerType._zod.run(n, t);
    const r = u.innerType._zod.run(n, t);
    return r instanceof Promise ? r.then(Su) : Su(r);
  };
});
function Su(e) {
  return e.value = Object.freeze(e.value), e;
}
const br = /* @__PURE__ */ C("$ZodCustom", (e, u) => {
  M.init(e, u), P.init(e, u), e._zod.parse = (n, t) => n, e._zod.check = (n) => {
    const t = n.value, r = u.fn(t);
    if (r instanceof Promise)
      return r.then((o) => ku(o, n, t, e));
    ku(r, n, t, e);
  };
});
function ku(e, u, n, t) {
  if (!e) {
    const r = {
      code: "custom",
      input: n,
      inst: t,
      // incorporates params.error into issue reporting
      path: [...t._zod.def.path ?? []],
      // incorporates params.error into issue reporting
      continue: !t._zod.def.abort
      // params: inst._zod.def.params,
    };
    t._zod.def.params && (r.params = t._zod.def.params), u.issues.push(me(r));
  }
}
var Nu;
class Br {
  constructor() {
    this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map();
  }
  add(u, ...n) {
    const t = n[0];
    return this._map.set(u, t), t && typeof t == "object" && "id" in t && this._idmap.set(t.id, u), this;
  }
  clear() {
    return this._map = /* @__PURE__ */ new WeakMap(), this._idmap = /* @__PURE__ */ new Map(), this;
  }
  remove(u) {
    const n = this._map.get(u);
    return n && typeof n == "object" && "id" in n && this._idmap.delete(n.id), this._map.delete(u), this;
  }
  get(u) {
    const n = u._zod.parent;
    if (n) {
      const t = { ...this.get(n) ?? {} };
      delete t.id;
      const r = { ...t, ...this._map.get(u) };
      return Object.keys(r).length ? r : void 0;
    }
    return this._map.get(u);
  }
  has(u) {
    return this._map.has(u);
  }
}
function Or() {
  return new Br();
}
(Nu = globalThis).__zod_globalRegistry ?? (Nu.__zod_globalRegistry = Or());
const de = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function zr(e, u) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...B(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Sr(e, u) {
  return new e({
    type: "number",
    coerce: !0,
    checks: [],
    ...B(u)
  });
}
// @__NO_SIDE_EFFECTS__
function kr(e, u) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...B(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Nr(e) {
  return new e({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function Ir(e, u) {
  return new e({
    type: "never",
    ...B(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Iu(e, u) {
  return new lt({
    check: "less_than",
    ...B(u),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function Ve(e, u) {
  return new lt({
    check: "less_than",
    ...B(u),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function Pu(e, u) {
  return new ft({
    check: "greater_than",
    ...B(u),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function Ue(e, u) {
  return new ft({
    check: "greater_than",
    ...B(u),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function Tu(e, u) {
  return new Wn({
    check: "multiple_of",
    ...B(u),
    value: e
  });
}
// @__NO_SIDE_EFFECTS__
function Et(e, u) {
  return new Kn({
    check: "max_length",
    ...B(u),
    maximum: e
  });
}
// @__NO_SIDE_EFFECTS__
function Pe(e, u) {
  return new Hn({
    check: "min_length",
    ...B(u),
    minimum: e
  });
}
// @__NO_SIDE_EFFECTS__
function At(e, u) {
  return new Yn({
    check: "length_equals",
    ...B(u),
    length: e
  });
}
// @__NO_SIDE_EFFECTS__
function Pr(e, u) {
  return new Xn({
    check: "string_format",
    format: "regex",
    ...B(u),
    pattern: e
  });
}
// @__NO_SIDE_EFFECTS__
function Tr(e) {
  return new Qn({
    check: "string_format",
    format: "lowercase",
    ...B(e)
  });
}
// @__NO_SIDE_EFFECTS__
function $r(e) {
  return new er({
    check: "string_format",
    format: "uppercase",
    ...B(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Rr(e, u) {
  return new ur({
    check: "string_format",
    format: "includes",
    ...B(u),
    includes: e
  });
}
// @__NO_SIDE_EFFECTS__
function jr(e, u) {
  return new tr({
    check: "string_format",
    format: "starts_with",
    ...B(u),
    prefix: e
  });
}
// @__NO_SIDE_EFFECTS__
function Zr(e, u) {
  return new nr({
    check: "string_format",
    format: "ends_with",
    ...B(u),
    suffix: e
  });
}
// @__NO_SIDE_EFFECTS__
function le(e) {
  return new rr({
    check: "overwrite",
    tx: e
  });
}
// @__NO_SIDE_EFFECTS__
function xr(e) {
  return /* @__PURE__ */ le((u) => u.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function Mr() {
  return /* @__PURE__ */ le((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function Jr() {
  return /* @__PURE__ */ le((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function Lr() {
  return /* @__PURE__ */ le((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function Vr() {
  return /* @__PURE__ */ le((e) => hn(e));
}
// @__NO_SIDE_EFFECTS__
function Ur(e, u, n) {
  return new e({
    type: "array",
    element: u,
    // get element() {
    //   return element;
    // },
    ...B(n)
  });
}
// @__NO_SIDE_EFFECTS__
function Gr(e, u, n) {
  return new e({
    type: "custom",
    check: "custom",
    fn: u,
    ...B(n)
  });
}
// @__NO_SIDE_EFFECTS__
function Wr(e) {
  const u = /* @__PURE__ */ qr((n) => (n.addIssue = (t) => {
    if (typeof t == "string")
      n.issues.push(me(t, n.value, u._zod.def));
    else {
      const r = t;
      r.fatal && (r.continue = !1), r.code ?? (r.code = "custom"), r.input ?? (r.input = n.value), r.inst ?? (r.inst = u), r.continue ?? (r.continue = !u._zod.def.abort), n.issues.push(me(r));
    }
  }, e(n.value, n)));
  return u;
}
// @__NO_SIDE_EFFECTS__
function qr(e, u) {
  const n = new M({
    check: "custom",
    ...B(u)
  });
  return n._zod.check = e, n;
}
function gt(e) {
  let u = (e == null ? void 0 : e.target) ?? "draft-2020-12";
  return u === "draft-4" && (u = "draft-04"), u === "draft-7" && (u = "draft-07"), {
    processors: e.processors ?? {},
    metadataRegistry: (e == null ? void 0 : e.metadata) ?? de,
    target: u,
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
function j(e, u, n = { path: [], schemaPath: [] }) {
  var D, a;
  var t;
  const r = e._zod.def, o = u.seen.get(e);
  if (o)
    return o.count++, n.schemaPath.includes(e) && (o.cycle = n.path), o.schema;
  const i = { schema: {}, count: 1, cycle: void 0, path: n.path };
  u.seen.set(e, i);
  const s = (a = (D = e._zod).toJSONSchema) == null ? void 0 : a.call(D);
  if (s)
    i.schema = s;
  else {
    const f = {
      ...n,
      schemaPath: [...n.schemaPath, e],
      path: n.path
    };
    if (e._zod.processJSONSchema)
      e._zod.processJSONSchema(u, i.schema, f);
    else {
      const E = i.schema, p = u.processors[r.type];
      if (!p)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${r.type}`);
      p(e, u, E, f);
    }
    const h = e._zod.parent;
    h && (i.ref || (i.ref = h), j(h, u, f), u.seen.get(h).isParent = !0);
  }
  const c = u.metadataRegistry.get(e);
  return c && Object.assign(i.schema, c), u.io === "input" && Z(e) && (delete i.schema.examples, delete i.schema.default), u.io === "input" && i.schema._prefault && ((t = i.schema).default ?? (t.default = i.schema._prefault)), delete i.schema._prefault, u.seen.get(e).schema;
}
function _t(e, u) {
  var i, s, c, l;
  const n = e.seen.get(u);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const t = /* @__PURE__ */ new Map();
  for (const D of e.seen.entries()) {
    const a = (i = e.metadataRegistry.get(D[0])) == null ? void 0 : i.id;
    if (a) {
      const f = t.get(a);
      if (f && f !== D[0])
        throw new Error(`Duplicate schema id "${a}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      t.set(a, D[0]);
    }
  }
  const r = (D) => {
    var p;
    const a = e.target === "draft-2020-12" ? "$defs" : "definitions";
    if (e.external) {
      const F = (p = e.external.registry.get(D[0])) == null ? void 0 : p.id, m = e.external.uri ?? ((O) => O);
      if (F)
        return { ref: m(F) };
      const A = D[1].defId ?? D[1].schema.id ?? `schema${e.counter++}`;
      return D[1].defId = A, { defId: A, ref: `${m("__shared")}#/${a}/${A}` };
    }
    if (D[1] === n)
      return { ref: "#" };
    const h = `#/${a}/`, E = D[1].schema.id ?? `__schema${e.counter++}`;
    return { defId: E, ref: h + E };
  }, o = (D) => {
    if (D[1].schema.$ref)
      return;
    const a = D[1], { ref: f, defId: h } = r(D);
    a.def = { ...a.schema }, h && (a.defId = h);
    const E = a.schema;
    for (const p in E)
      delete E[p];
    E.$ref = f;
  };
  if (e.cycles === "throw")
    for (const D of e.seen.entries()) {
      const a = D[1];
      if (a.cycle)
        throw new Error(`Cycle detected: #/${(s = a.cycle) == null ? void 0 : s.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const D of e.seen.entries()) {
    const a = D[1];
    if (u === D[0]) {
      o(D);
      continue;
    }
    if (e.external) {
      const h = (c = e.external.registry.get(D[0])) == null ? void 0 : c.id;
      if (u !== D[0] && h) {
        o(D);
        continue;
      }
    }
    if ((l = e.metadataRegistry.get(D[0])) == null ? void 0 : l.id) {
      o(D);
      continue;
    }
    if (a.cycle) {
      o(D);
      continue;
    }
    if (a.count > 1 && e.reused === "ref") {
      o(D);
      continue;
    }
  }
}
function wt(e, u) {
  var i, s, c;
  const n = e.seen.get(u);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const t = (l) => {
    const D = e.seen.get(l);
    if (D.ref === null)
      return;
    const a = D.def ?? D.schema, f = { ...a }, h = D.ref;
    if (D.ref = null, h) {
      t(h);
      const p = e.seen.get(h), F = p.schema;
      if (F.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (a.allOf = a.allOf ?? [], a.allOf.push(F)) : Object.assign(a, F), Object.assign(a, f), l._zod.parent === h)
        for (const A in a)
          A === "$ref" || A === "allOf" || A in f || delete a[A];
      if (F.$ref && p.def)
        for (const A in a)
          A === "$ref" || A === "allOf" || A in p.def && JSON.stringify(a[A]) === JSON.stringify(p.def[A]) && delete a[A];
    }
    const E = l._zod.parent;
    if (E && E !== h) {
      t(E);
      const p = e.seen.get(E);
      if (p != null && p.schema.$ref && (a.$ref = p.schema.$ref, p.def))
        for (const F in a)
          F === "$ref" || F === "allOf" || F in p.def && JSON.stringify(a[F]) === JSON.stringify(p.def[F]) && delete a[F];
    }
    e.override({
      zodSchema: l,
      jsonSchema: a,
      path: D.path ?? []
    });
  };
  for (const l of [...e.seen.entries()].reverse())
    t(l[0]);
  const r = {};
  if (e.target === "draft-2020-12" ? r.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? r.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? r.$schema = "http://json-schema.org/draft-04/schema#" : e.target, (i = e.external) != null && i.uri) {
    const l = (s = e.external.registry.get(u)) == null ? void 0 : s.id;
    if (!l)
      throw new Error("Schema is missing an `id` property");
    r.$id = e.external.uri(l);
  }
  Object.assign(r, n.def ?? n.schema);
  const o = ((c = e.external) == null ? void 0 : c.defs) ?? {};
  for (const l of e.seen.entries()) {
    const D = l[1];
    D.def && D.defId && (o[D.defId] = D.def);
  }
  e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? r.$defs = o : r.definitions = o);
  try {
    const l = JSON.parse(JSON.stringify(r));
    return Object.defineProperty(l, "~standard", {
      value: {
        ...u["~standard"],
        jsonSchema: {
          input: Te(u, "input", e.processors),
          output: Te(u, "output", e.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), l;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function Z(e, u) {
  const n = u ?? { seen: /* @__PURE__ */ new Set() };
  if (n.seen.has(e))
    return !1;
  n.seen.add(e);
  const t = e._zod.def;
  if (t.type === "transform")
    return !0;
  if (t.type === "array")
    return Z(t.element, n);
  if (t.type === "set")
    return Z(t.valueType, n);
  if (t.type === "lazy")
    return Z(t.getter(), n);
  if (t.type === "promise" || t.type === "optional" || t.type === "nonoptional" || t.type === "nullable" || t.type === "readonly" || t.type === "default" || t.type === "prefault")
    return Z(t.innerType, n);
  if (t.type === "intersection")
    return Z(t.left, n) || Z(t.right, n);
  if (t.type === "record" || t.type === "map")
    return Z(t.keyType, n) || Z(t.valueType, n);
  if (t.type === "pipe")
    return Z(t.in, n) || Z(t.out, n);
  if (t.type === "object") {
    for (const r in t.shape)
      if (Z(t.shape[r], n))
        return !0;
    return !1;
  }
  if (t.type === "union") {
    for (const r of t.options)
      if (Z(r, n))
        return !0;
    return !1;
  }
  if (t.type === "tuple") {
    for (const r of t.items)
      if (Z(r, n))
        return !0;
    return !!(t.rest && Z(t.rest, n));
  }
  return !1;
}
const Kr = (e, u = {}) => (n) => {
  const t = gt({ ...n, processors: u });
  return j(e, t), _t(t, e), wt(t, e);
}, Te = (e, u, n = {}) => (t) => {
  const { libraryOptions: r, target: o } = t ?? {}, i = gt({ ...r ?? {}, target: o, io: u, processors: n });
  return j(e, i), _t(i, e), wt(i, e);
}, Hr = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, Yr = (e, u, n, t) => {
  const r = n;
  r.type = "string";
  const { minimum: o, maximum: i, format: s, patterns: c, contentEncoding: l } = e._zod.bag;
  if (typeof o == "number" && (r.minLength = o), typeof i == "number" && (r.maxLength = i), s && (r.format = Hr[s] ?? s, r.format === "" && delete r.format, s === "time" && delete r.format), l && (r.contentEncoding = l), c && c.size > 0) {
    const D = [...c];
    D.length === 1 ? r.pattern = D[0].source : D.length > 1 && (r.allOf = [
      ...D.map((a) => ({
        ...u.target === "draft-07" || u.target === "draft-04" || u.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: a.source
      }))
    ]);
  }
}, Xr = (e, u, n, t) => {
  const r = n, { minimum: o, maximum: i, format: s, multipleOf: c, exclusiveMaximum: l, exclusiveMinimum: D } = e._zod.bag;
  typeof s == "string" && s.includes("int") ? r.type = "integer" : r.type = "number", typeof D == "number" && (u.target === "draft-04" || u.target === "openapi-3.0" ? (r.minimum = D, r.exclusiveMinimum = !0) : r.exclusiveMinimum = D), typeof o == "number" && (r.minimum = o, typeof D == "number" && u.target !== "draft-04" && (D >= o ? delete r.minimum : delete r.exclusiveMinimum)), typeof l == "number" && (u.target === "draft-04" || u.target === "openapi-3.0" ? (r.maximum = l, r.exclusiveMaximum = !0) : r.exclusiveMaximum = l), typeof i == "number" && (r.maximum = i, typeof l == "number" && u.target !== "draft-04" && (l <= i ? delete r.maximum : delete r.exclusiveMaximum)), typeof c == "number" && (r.multipleOf = c);
}, Qr = (e, u, n, t) => {
  n.not = {};
}, eo = (e, u, n, t) => {
}, uo = (e, u, n, t) => {
  const r = e._zod.def, o = nt(r.entries);
  o.every((i) => typeof i == "number") && (n.type = "number"), o.every((i) => typeof i == "string") && (n.type = "string"), n.enum = o;
}, to = (e, u, n, t) => {
  if (u.unrepresentable === "throw")
    throw new Error("Custom types cannot be represented in JSON Schema");
}, no = (e, u, n, t) => {
  if (u.unrepresentable === "throw")
    throw new Error("Transforms cannot be represented in JSON Schema");
}, ro = (e, u, n, t) => {
  const r = n, o = e._zod.def, { minimum: i, maximum: s } = e._zod.bag;
  typeof i == "number" && (r.minItems = i), typeof s == "number" && (r.maxItems = s), r.type = "array", r.items = j(o.element, u, { ...t, path: [...t.path, "items"] });
}, oo = (e, u, n, t) => {
  var l;
  const r = n, o = e._zod.def;
  r.type = "object", r.properties = {};
  const i = o.shape;
  for (const D in i)
    r.properties[D] = j(i[D], u, {
      ...t,
      path: [...t.path, "properties", D]
    });
  const s = new Set(Object.keys(i)), c = new Set([...s].filter((D) => {
    const a = o.shape[D]._zod;
    return u.io === "input" ? a.optin === void 0 : a.optout === void 0;
  }));
  c.size > 0 && (r.required = Array.from(c)), ((l = o.catchall) == null ? void 0 : l._zod.def.type) === "never" ? r.additionalProperties = !1 : o.catchall ? o.catchall && (r.additionalProperties = j(o.catchall, u, {
    ...t,
    path: [...t.path, "additionalProperties"]
  })) : u.io === "output" && (r.additionalProperties = !1);
}, io = (e, u, n, t) => {
  const r = e._zod.def, o = r.inclusive === !1, i = r.options.map((s, c) => j(s, u, {
    ...t,
    path: [...t.path, o ? "oneOf" : "anyOf", c]
  }));
  o ? n.oneOf = i : n.anyOf = i;
}, so = (e, u, n, t) => {
  const r = e._zod.def, o = j(r.left, u, {
    ...t,
    path: [...t.path, "allOf", 0]
  }), i = j(r.right, u, {
    ...t,
    path: [...t.path, "allOf", 1]
  }), s = (l) => "allOf" in l && Object.keys(l).length === 1, c = [
    ...s(o) ? o.allOf : [o],
    ...s(i) ? i.allOf : [i]
  ];
  n.allOf = c;
}, co = (e, u, n, t) => {
  const r = e._zod.def, o = j(r.innerType, u, t), i = u.seen.get(e);
  u.target === "openapi-3.0" ? (i.ref = r.innerType, n.nullable = !0) : n.anyOf = [o, { type: "null" }];
}, ao = (e, u, n, t) => {
  const r = e._zod.def;
  j(r.innerType, u, t);
  const o = u.seen.get(e);
  o.ref = r.innerType;
}, Do = (e, u, n, t) => {
  const r = e._zod.def;
  j(r.innerType, u, t);
  const o = u.seen.get(e);
  o.ref = r.innerType, n.default = JSON.parse(JSON.stringify(r.defaultValue));
}, lo = (e, u, n, t) => {
  const r = e._zod.def;
  j(r.innerType, u, t);
  const o = u.seen.get(e);
  o.ref = r.innerType, u.io === "input" && (n._prefault = JSON.parse(JSON.stringify(r.defaultValue)));
}, fo = (e, u, n, t) => {
  const r = e._zod.def;
  j(r.innerType, u, t);
  const o = u.seen.get(e);
  o.ref = r.innerType;
  let i;
  try {
    i = r.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  n.default = i;
}, po = (e, u, n, t) => {
  const r = e._zod.def, o = u.io === "input" ? r.in._zod.def.type === "transform" ? r.out : r.in : r.out;
  j(o, u, t);
  const i = u.seen.get(e);
  i.ref = o;
}, ho = (e, u, n, t) => {
  const r = e._zod.def;
  j(r.innerType, u, t);
  const o = u.seen.get(e);
  o.ref = r.innerType, n.readOnly = !0;
}, yt = (e, u, n, t) => {
  const r = e._zod.def;
  j(r.innerType, u, t);
  const o = u.seen.get(e);
  o.ref = r.innerType;
}, Co = /* @__PURE__ */ C("ZodISODateTime", (e, u) => {
  sr.init(e, u), No.init(e, u);
});
function mo(e) {
  return /* @__PURE__ */ zr(Co, e);
}
const Fo = (e, u) => {
  ct.init(e, u), e.name = "ZodError", Object.defineProperties(e, {
    format: {
      value: (n) => On(e, n)
      // enumerable: false,
    },
    flatten: {
      value: (n) => Bn(e, n)
      // enumerable: false,
    },
    addIssue: {
      value: (n) => {
        e.issues.push(n), e.message = JSON.stringify(e.issues, uu, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (n) => {
        e.issues.push(...n), e.message = JSON.stringify(e.issues, uu, 2);
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
}, L = C("ZodError", Fo, {
  Parent: Error
}), Eo = /* @__PURE__ */ Cu(L), Ao = /* @__PURE__ */ mu(L), go = /* @__PURE__ */ Re(L), _o = /* @__PURE__ */ je(L), wo = /* @__PURE__ */ kn(L), yo = /* @__PURE__ */ Nn(L), vo = /* @__PURE__ */ In(L), bo = /* @__PURE__ */ Pn(L), Bo = /* @__PURE__ */ Tn(L), Oo = /* @__PURE__ */ $n(L), zo = /* @__PURE__ */ Rn(L), So = /* @__PURE__ */ jn(L), T = /* @__PURE__ */ C("ZodType", (e, u) => (P.init(e, u), Object.assign(e["~standard"], {
  jsonSchema: {
    input: Te(e, "input"),
    output: Te(e, "output")
  }
}), e.toJSONSchema = Kr(e, {}), e.def = u, e.type = u.type, Object.defineProperty(e, "_def", { value: u }), e.check = (...n) => e.clone(X(u, {
  checks: [
    ...u.checks ?? [],
    ...n.map((t) => typeof t == "function" ? { _zod: { check: t, def: { check: "custom" }, onattach: [] } } : t)
  ]
}), {
  parent: !0
}), e.with = e.check, e.clone = (n, t) => Q(e, n, t), e.brand = () => e, e.register = (n, t) => (n.add(e, t), e), e.parse = (n, t) => Eo(e, n, t, { callee: e.parse }), e.safeParse = (n, t) => go(e, n, t), e.parseAsync = async (n, t) => Ao(e, n, t, { callee: e.parseAsync }), e.safeParseAsync = async (n, t) => _o(e, n, t), e.spa = e.safeParseAsync, e.encode = (n, t) => wo(e, n, t), e.decode = (n, t) => yo(e, n, t), e.encodeAsync = async (n, t) => vo(e, n, t), e.decodeAsync = async (n, t) => bo(e, n, t), e.safeEncode = (n, t) => Bo(e, n, t), e.safeDecode = (n, t) => Oo(e, n, t), e.safeEncodeAsync = async (n, t) => zo(e, n, t), e.safeDecodeAsync = async (n, t) => So(e, n, t), e.refine = (n, t) => e.check(ci(n, t)), e.superRefine = (n) => e.check(ai(n)), e.overwrite = (n) => e.check(/* @__PURE__ */ le(n)), e.optional = () => ju(e), e.exactOptional = () => Ko(e), e.nullable = () => Zu(e), e.nullish = () => ju(Zu(e)), e.nonoptional = (n) => ui(e, n), e.array = () => jo(e), e.or = (n) => Jo([e, n]), e.and = (n) => Vo(e, n), e.transform = (n) => xu(e, Wo(n)), e.default = (n) => Xo(e, n), e.prefault = (n) => ei(e, n), e.catch = (n) => ni(e, n), e.pipe = (n) => xu(e, n), e.readonly = () => ii(e), e.describe = (n) => {
  const t = e.clone();
  return de.add(t, { description: n }), t;
}, Object.defineProperty(e, "description", {
  get() {
    var n;
    return (n = de.get(e)) == null ? void 0 : n.description;
  },
  configurable: !0
}), e.meta = (...n) => {
  if (n.length === 0)
    return de.get(e);
  const t = e.clone();
  return de.add(t, n[0]), t;
}, e.isOptional = () => e.safeParse(void 0).success, e.isNullable = () => e.safeParse(null).success, e.apply = (n) => n(e), e)), ko = /* @__PURE__ */ C("_ZodString", (e, u) => {
  dt.init(e, u), T.init(e, u), e._zod.processJSONSchema = (t, r, o) => Yr(e, t, r);
  const n = e._zod.bag;
  e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, e.regex = (...t) => e.check(/* @__PURE__ */ Pr(...t)), e.includes = (...t) => e.check(/* @__PURE__ */ Rr(...t)), e.startsWith = (...t) => e.check(/* @__PURE__ */ jr(...t)), e.endsWith = (...t) => e.check(/* @__PURE__ */ Zr(...t)), e.min = (...t) => e.check(/* @__PURE__ */ Pe(...t)), e.max = (...t) => e.check(/* @__PURE__ */ Et(...t)), e.length = (...t) => e.check(/* @__PURE__ */ At(...t)), e.nonempty = (...t) => e.check(/* @__PURE__ */ Pe(1, ...t)), e.lowercase = (t) => e.check(/* @__PURE__ */ Tr(t)), e.uppercase = (t) => e.check(/* @__PURE__ */ $r(t)), e.trim = () => e.check(/* @__PURE__ */ Mr()), e.normalize = (...t) => e.check(/* @__PURE__ */ xr(...t)), e.toLowerCase = () => e.check(/* @__PURE__ */ Jr()), e.toUpperCase = () => e.check(/* @__PURE__ */ Lr()), e.slugify = () => e.check(/* @__PURE__ */ Vr());
}), No = /* @__PURE__ */ C("ZodStringFormat", (e, u) => {
  pt.init(e, u), ko.init(e, u);
}), vt = /* @__PURE__ */ C("ZodNumber", (e, u) => {
  ht.init(e, u), T.init(e, u), e._zod.processJSONSchema = (t, r, o) => Xr(e, t, r), e.gt = (t, r) => e.check(/* @__PURE__ */ Pu(t, r)), e.gte = (t, r) => e.check(/* @__PURE__ */ Ue(t, r)), e.min = (t, r) => e.check(/* @__PURE__ */ Ue(t, r)), e.lt = (t, r) => e.check(/* @__PURE__ */ Iu(t, r)), e.lte = (t, r) => e.check(/* @__PURE__ */ Ve(t, r)), e.max = (t, r) => e.check(/* @__PURE__ */ Ve(t, r)), e.int = (t) => e.check($u(t)), e.safe = (t) => e.check($u(t)), e.positive = (t) => e.check(/* @__PURE__ */ Pu(0, t)), e.nonnegative = (t) => e.check(/* @__PURE__ */ Ue(0, t)), e.negative = (t) => e.check(/* @__PURE__ */ Iu(0, t)), e.nonpositive = (t) => e.check(/* @__PURE__ */ Ve(0, t)), e.multipleOf = (t, r) => e.check(/* @__PURE__ */ Tu(t, r)), e.step = (t, r) => e.check(/* @__PURE__ */ Tu(t, r)), e.finite = () => e;
  const n = e._zod.bag;
  e.minValue = Math.max(n.minimum ?? Number.NEGATIVE_INFINITY, n.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, e.maxValue = Math.min(n.maximum ?? Number.POSITIVE_INFINITY, n.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? 0.5), e.isFinite = !0, e.format = n.format ?? null;
}), Io = /* @__PURE__ */ C("ZodNumberFormat", (e, u) => {
  cr.init(e, u), vt.init(e, u);
});
function $u(e) {
  return /* @__PURE__ */ kr(Io, e);
}
const Po = /* @__PURE__ */ C("ZodUnknown", (e, u) => {
  ar.init(e, u), T.init(e, u), e._zod.processJSONSchema = (n, t, r) => eo();
});
function Ru() {
  return /* @__PURE__ */ Nr(Po);
}
const To = /* @__PURE__ */ C("ZodNever", (e, u) => {
  Dr.init(e, u), T.init(e, u), e._zod.processJSONSchema = (n, t, r) => Qr(e, n, t);
});
function $o(e) {
  return /* @__PURE__ */ Ir(To, e);
}
const Ro = /* @__PURE__ */ C("ZodArray", (e, u) => {
  lr.init(e, u), T.init(e, u), e._zod.processJSONSchema = (n, t, r) => ro(e, n, t, r), e.element = u.element, e.min = (n, t) => e.check(/* @__PURE__ */ Pe(n, t)), e.nonempty = (n) => e.check(/* @__PURE__ */ Pe(1, n)), e.max = (n, t) => e.check(/* @__PURE__ */ Et(n, t)), e.length = (n, t) => e.check(/* @__PURE__ */ At(n, t)), e.unwrap = () => e.element;
});
function jo(e, u) {
  return /* @__PURE__ */ Ur(Ro, e, u);
}
const Zo = /* @__PURE__ */ C("ZodObject", (e, u) => {
  dr.init(e, u), T.init(e, u), e._zod.processJSONSchema = (n, t, r) => oo(e, n, t, r), b(e, "shape", () => u.shape), e.keyof = () => Uo(Object.keys(e._zod.def.shape)), e.catchall = (n) => e.clone({ ...e._zod.def, catchall: n }), e.passthrough = () => e.clone({ ...e._zod.def, catchall: Ru() }), e.loose = () => e.clone({ ...e._zod.def, catchall: Ru() }), e.strict = () => e.clone({ ...e._zod.def, catchall: $o() }), e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 }), e.extend = (n) => _n(e, n), e.safeExtend = (n) => wn(e, n), e.merge = (n) => yn(e, n), e.pick = (n) => An(e, n), e.omit = (n) => gn(e, n), e.partial = (...n) => vn(bt, e, n[0]), e.required = (...n) => bn(Bt, e, n[0]);
});
function xo(e, u) {
  const n = {
    type: "object",
    shape: e ?? {},
    ...B(u)
  };
  return new Zo(n);
}
const Mo = /* @__PURE__ */ C("ZodUnion", (e, u) => {
  pr.init(e, u), T.init(e, u), e._zod.processJSONSchema = (n, t, r) => io(e, n, t, r), e.options = u.options;
});
function Jo(e, u) {
  return new Mo({
    type: "union",
    options: e,
    ...B(u)
  });
}
const Lo = /* @__PURE__ */ C("ZodIntersection", (e, u) => {
  hr.init(e, u), T.init(e, u), e._zod.processJSONSchema = (n, t, r) => so(e, n, t, r);
});
function Vo(e, u) {
  return new Lo({
    type: "intersection",
    left: e,
    right: u
  });
}
const nu = /* @__PURE__ */ C("ZodEnum", (e, u) => {
  Cr.init(e, u), T.init(e, u), e._zod.processJSONSchema = (t, r, o) => uo(e, t, r), e.enum = u.entries, e.options = Object.values(u.entries);
  const n = new Set(Object.keys(u.entries));
  e.extract = (t, r) => {
    const o = {};
    for (const i of t)
      if (n.has(i))
        o[i] = u.entries[i];
      else
        throw new Error(`Key ${i} not found in enum`);
    return new nu({
      ...u,
      checks: [],
      ...B(r),
      entries: o
    });
  }, e.exclude = (t, r) => {
    const o = { ...u.entries };
    for (const i of t)
      if (n.has(i))
        delete o[i];
      else
        throw new Error(`Key ${i} not found in enum`);
    return new nu({
      ...u,
      checks: [],
      ...B(r),
      entries: o
    });
  };
});
function Uo(e, u) {
  const n = Array.isArray(e) ? Object.fromEntries(e.map((t) => [t, t])) : e;
  return new nu({
    type: "enum",
    entries: n,
    ...B(u)
  });
}
const Go = /* @__PURE__ */ C("ZodTransform", (e, u) => {
  mr.init(e, u), T.init(e, u), e._zod.processJSONSchema = (n, t, r) => no(e, n), e._zod.parse = (n, t) => {
    if (t.direction === "backward")
      throw new ut(e.constructor.name);
    n.addIssue = (o) => {
      if (typeof o == "string")
        n.issues.push(me(o, n.value, u));
      else {
        const i = o;
        i.fatal && (i.continue = !1), i.code ?? (i.code = "custom"), i.input ?? (i.input = n.value), i.inst ?? (i.inst = e), n.issues.push(me(i));
      }
    };
    const r = u.transform(n.value, n);
    return r instanceof Promise ? r.then((o) => (n.value = o, n)) : (n.value = r, n);
  };
});
function Wo(e) {
  return new Go({
    type: "transform",
    transform: e
  });
}
const bt = /* @__PURE__ */ C("ZodOptional", (e, u) => {
  Ft.init(e, u), T.init(e, u), e._zod.processJSONSchema = (n, t, r) => yt(e, n, t, r), e.unwrap = () => e._zod.def.innerType;
});
function ju(e) {
  return new bt({
    type: "optional",
    innerType: e
  });
}
const qo = /* @__PURE__ */ C("ZodExactOptional", (e, u) => {
  Fr.init(e, u), T.init(e, u), e._zod.processJSONSchema = (n, t, r) => yt(e, n, t, r), e.unwrap = () => e._zod.def.innerType;
});
function Ko(e) {
  return new qo({
    type: "optional",
    innerType: e
  });
}
const Ho = /* @__PURE__ */ C("ZodNullable", (e, u) => {
  Er.init(e, u), T.init(e, u), e._zod.processJSONSchema = (n, t, r) => co(e, n, t, r), e.unwrap = () => e._zod.def.innerType;
});
function Zu(e) {
  return new Ho({
    type: "nullable",
    innerType: e
  });
}
const Yo = /* @__PURE__ */ C("ZodDefault", (e, u) => {
  Ar.init(e, u), T.init(e, u), e._zod.processJSONSchema = (n, t, r) => Do(e, n, t, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function Xo(e, u) {
  return new Yo({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof u == "function" ? u() : ot(u);
    }
  });
}
const Qo = /* @__PURE__ */ C("ZodPrefault", (e, u) => {
  gr.init(e, u), T.init(e, u), e._zod.processJSONSchema = (n, t, r) => lo(e, n, t, r), e.unwrap = () => e._zod.def.innerType;
});
function ei(e, u) {
  return new Qo({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof u == "function" ? u() : ot(u);
    }
  });
}
const Bt = /* @__PURE__ */ C("ZodNonOptional", (e, u) => {
  _r.init(e, u), T.init(e, u), e._zod.processJSONSchema = (n, t, r) => ao(e, n, t, r), e.unwrap = () => e._zod.def.innerType;
});
function ui(e, u) {
  return new Bt({
    type: "nonoptional",
    innerType: e,
    ...B(u)
  });
}
const ti = /* @__PURE__ */ C("ZodCatch", (e, u) => {
  wr.init(e, u), T.init(e, u), e._zod.processJSONSchema = (n, t, r) => fo(e, n, t, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function ni(e, u) {
  return new ti({
    type: "catch",
    innerType: e,
    catchValue: typeof u == "function" ? u : () => u
  });
}
const ri = /* @__PURE__ */ C("ZodPipe", (e, u) => {
  yr.init(e, u), T.init(e, u), e._zod.processJSONSchema = (n, t, r) => po(e, n, t, r), e.in = u.in, e.out = u.out;
});
function xu(e, u) {
  return new ri({
    type: "pipe",
    in: e,
    out: u
    // ...util.normalizeParams(params),
  });
}
const oi = /* @__PURE__ */ C("ZodReadonly", (e, u) => {
  vr.init(e, u), T.init(e, u), e._zod.processJSONSchema = (n, t, r) => ho(e, n, t, r), e.unwrap = () => e._zod.def.innerType;
});
function ii(e) {
  return new oi({
    type: "readonly",
    innerType: e
  });
}
const si = /* @__PURE__ */ C("ZodCustom", (e, u) => {
  br.init(e, u), T.init(e, u), e._zod.processJSONSchema = (n, t, r) => to(e, n);
});
function ci(e, u = {}) {
  return /* @__PURE__ */ Gr(si, e, u);
}
function ai(e) {
  return /* @__PURE__ */ Wr(e);
}
function se(e) {
  return /* @__PURE__ */ Sr(vt, e);
}
const Di = xo({
  waverider_id: se(),
  source_data_timestamp_utc: mo(),
  latitude: se(),
  longitude: se(),
  significant_wave_height_m: se(),
  mean_period_s: se(),
  wave_power_kw_per_m: se()
}).loose().transform((e) => ({
  stationID: e.waverider_id,
  ts: new Date(e.source_data_timestamp_utc),
  lat: e.latitude,
  long: e.longitude,
  height: e.significant_wave_height_m,
  period: e.mean_period_s,
  wavePower: e.wave_power_kw_per_m
})), li = (e) => {
  const u = Di.safeParse(e);
  return u.success ? { success: !0, data: u.data, err: null } : (console.log("Data parsing error: ", u.error.message), { success: !1, data: null, err: u.error });
}, ru = () => {
  const e = Ku.join(Jt, "waverider.tmp"), u = [Lt, ":", Vt].join("");
  console.log(`main.ts >> cmmd = scp ${u} ${e}`);
  const n = Pt("scp", [u, e]);
  n.stderr.on("data", (t) => {
    console.error(t.toString());
  }), n.on("close", (t) => {
    t === 0 ? ce.rename(e, He, (r) => {
      if (r) throw r;
      console.log("main.ts >> Data transfer complete");
    }) : console.error(`main.ts >> scp failed with code -- ${t}`);
  });
}, fi = () => {
  di(He);
  const e = ce.readFileSync(He, "utf-8"), u = JSON.parse(e);
  return li(u);
}, di = (e) => {
  const u = Ku.dirname(e);
  console.log(`main.ts >> ensuring ${u} exists`), ce.existsSync(u) || ce.mkdirSync(u, { recursive: !0 }), ce.existsSync(e) || (ce.writeFileSync(e, JSON.stringify({}), "utf-8"), ru());
};
function pi() {
  he.handle("get-drive-data", fi);
}
function hi(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ou = { exports: {} }, ye = { exports: {} }, Ge, Mu;
function Ci() {
  if (Mu) return Ge;
  Mu = 1;
  var e = 1e3, u = e * 60, n = u * 60, t = n * 24, r = t * 7, o = t * 365.25;
  Ge = function(D, a) {
    a = a || {};
    var f = typeof D;
    if (f === "string" && D.length > 0)
      return i(D);
    if (f === "number" && isFinite(D))
      return a.long ? c(D) : s(D);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(D)
    );
  };
  function i(D) {
    if (D = String(D), !(D.length > 100)) {
      var a = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        D
      );
      if (a) {
        var f = parseFloat(a[1]), h = (a[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return f * o;
          case "weeks":
          case "week":
          case "w":
            return f * r;
          case "days":
          case "day":
          case "d":
            return f * t;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return f * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return f * u;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return f * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return f;
          default:
            return;
        }
      }
    }
  }
  function s(D) {
    var a = Math.abs(D);
    return a >= t ? Math.round(D / t) + "d" : a >= n ? Math.round(D / n) + "h" : a >= u ? Math.round(D / u) + "m" : a >= e ? Math.round(D / e) + "s" : D + "ms";
  }
  function c(D) {
    var a = Math.abs(D);
    return a >= t ? l(D, a, t, "day") : a >= n ? l(D, a, n, "hour") : a >= u ? l(D, a, u, "minute") : a >= e ? l(D, a, e, "second") : D + " ms";
  }
  function l(D, a, f, h) {
    var E = a >= f * 1.5;
    return Math.round(D / f) + " " + h + (E ? "s" : "");
  }
  return Ge;
}
var We, Ju;
function Ot() {
  if (Ju) return We;
  Ju = 1;
  function e(u) {
    t.debug = t, t.default = t, t.coerce = l, t.disable = s, t.enable = o, t.enabled = c, t.humanize = Ci(), t.destroy = D, Object.keys(u).forEach((a) => {
      t[a] = u[a];
    }), t.names = [], t.skips = [], t.formatters = {};
    function n(a) {
      let f = 0;
      for (let h = 0; h < a.length; h++)
        f = (f << 5) - f + a.charCodeAt(h), f |= 0;
      return t.colors[Math.abs(f) % t.colors.length];
    }
    t.selectColor = n;
    function t(a) {
      let f, h = null, E, p;
      function F(...m) {
        if (!F.enabled)
          return;
        const A = F, O = Number(/* @__PURE__ */ new Date()), v = O - (f || O);
        A.diff = v, A.prev = f, A.curr = O, f = O, m[0] = t.coerce(m[0]), typeof m[0] != "string" && m.unshift("%O");
        let w = 0;
        m[0] = m[0].replace(/%([a-zA-Z%])/g, (ee, xe) => {
          if (ee === "%%")
            return "%";
          w++;
          const Fu = t.formatters[xe];
          if (typeof Fu == "function") {
            const kt = m[w];
            ee = Fu.call(A, kt), m.splice(w, 1), w--;
          }
          return ee;
        }), t.formatArgs.call(A, m), (A.log || t.log).apply(A, m);
      }
      return F.namespace = a, F.useColors = t.useColors(), F.color = t.selectColor(a), F.extend = r, F.destroy = t.destroy, Object.defineProperty(F, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => h !== null ? h : (E !== t.namespaces && (E = t.namespaces, p = t.enabled(a)), p),
        set: (m) => {
          h = m;
        }
      }), typeof t.init == "function" && t.init(F), F;
    }
    function r(a, f) {
      const h = t(this.namespace + (typeof f > "u" ? ":" : f) + a);
      return h.log = this.log, h;
    }
    function o(a) {
      t.save(a), t.namespaces = a, t.names = [], t.skips = [];
      const f = (typeof a == "string" ? a : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const h of f)
        h[0] === "-" ? t.skips.push(h.slice(1)) : t.names.push(h);
    }
    function i(a, f) {
      let h = 0, E = 0, p = -1, F = 0;
      for (; h < a.length; )
        if (E < f.length && (f[E] === a[h] || f[E] === "*"))
          f[E] === "*" ? (p = E, F = h, E++) : (h++, E++);
        else if (p !== -1)
          E = p + 1, F++, h = F;
        else
          return !1;
      for (; E < f.length && f[E] === "*"; )
        E++;
      return E === f.length;
    }
    function s() {
      const a = [
        ...t.names,
        ...t.skips.map((f) => "-" + f)
      ].join(",");
      return t.enable(""), a;
    }
    function c(a) {
      for (const f of t.skips)
        if (i(a, f))
          return !1;
      for (const f of t.names)
        if (i(a, f))
          return !0;
      return !1;
    }
    function l(a) {
      return a instanceof Error ? a.stack || a.message : a;
    }
    function D() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return t.enable(t.load()), t;
  }
  return We = e, We;
}
var Lu;
function mi() {
  return Lu || (Lu = 1, function(e, u) {
    u.formatArgs = t, u.save = r, u.load = o, u.useColors = n, u.storage = i(), u.destroy = /* @__PURE__ */ (() => {
      let c = !1;
      return () => {
        c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), u.colors = [
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
    function t(c) {
      if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const l = "color: " + this.color;
      c.splice(1, 0, l, "color: inherit");
      let D = 0, a = 0;
      c[0].replace(/%[a-zA-Z%]/g, (f) => {
        f !== "%%" && (D++, f === "%c" && (a = D));
      }), c.splice(a, 0, l);
    }
    u.log = console.debug || console.log || (() => {
    });
    function r(c) {
      try {
        c ? u.storage.setItem("debug", c) : u.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let c;
      try {
        c = u.storage.getItem("debug") || u.storage.getItem("DEBUG");
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
    e.exports = Ot()(u);
    const { formatters: s } = e.exports;
    s.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (l) {
        return "[UnexpectedJSONParseError]: " + l.message;
      }
    };
  }(ye, ye.exports)), ye.exports;
}
var ve = { exports: {} }, qe, Vu;
function Fi() {
  return Vu || (Vu = 1, qe = (e, u = process.argv) => {
    const n = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", t = u.indexOf(n + e), r = u.indexOf("--");
    return t !== -1 && (r === -1 || t < r);
  }), qe;
}
var Ke, Uu;
function Ei() {
  if (Uu) return Ke;
  Uu = 1;
  const e = $t, u = Hu, n = Fi(), { env: t } = process;
  let r;
  n("no-color") || n("no-colors") || n("color=false") || n("color=never") ? r = 0 : (n("color") || n("colors") || n("color=true") || n("color=always")) && (r = 1), "FORCE_COLOR" in t && (t.FORCE_COLOR === "true" ? r = 1 : t.FORCE_COLOR === "false" ? r = 0 : r = t.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(t.FORCE_COLOR, 10), 3));
  function o(c) {
    return c === 0 ? !1 : {
      level: c,
      hasBasic: !0,
      has256: c >= 2,
      has16m: c >= 3
    };
  }
  function i(c, l) {
    if (r === 0)
      return 0;
    if (n("color=16m") || n("color=full") || n("color=truecolor"))
      return 3;
    if (n("color=256"))
      return 2;
    if (c && !l && r === void 0)
      return 0;
    const D = r || 0;
    if (t.TERM === "dumb")
      return D;
    if (process.platform === "win32") {
      const a = e.release().split(".");
      return Number(a[0]) >= 10 && Number(a[2]) >= 10586 ? Number(a[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in t)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((a) => a in t) || t.CI_NAME === "codeship" ? 1 : D;
    if ("TEAMCITY_VERSION" in t)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(t.TEAMCITY_VERSION) ? 1 : 0;
    if (t.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in t) {
      const a = parseInt((t.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (t.TERM_PROGRAM) {
        case "iTerm.app":
          return a >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(t.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(t.TERM) || "COLORTERM" in t ? 1 : D;
  }
  function s(c) {
    const l = i(c, c && c.isTTY);
    return o(l);
  }
  return Ke = {
    supportsColor: s,
    stdout: o(i(!0, u.isatty(1))),
    stderr: o(i(!0, u.isatty(2)))
  }, Ke;
}
var Gu;
function Ai() {
  return Gu || (Gu = 1, function(e, u) {
    const n = Hu, t = Tt;
    u.init = D, u.log = s, u.formatArgs = o, u.save = c, u.load = l, u.useColors = r, u.destroy = t.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), u.colors = [6, 2, 3, 4, 5, 1];
    try {
      const f = Ei();
      f && (f.stderr || f).level >= 2 && (u.colors = [
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
    u.inspectOpts = Object.keys(process.env).filter((f) => /^debug_/i.test(f)).reduce((f, h) => {
      const E = h.substring(6).toLowerCase().replace(/_([a-z])/g, (F, m) => m.toUpperCase());
      let p = process.env[h];
      return /^(yes|on|true|enabled)$/i.test(p) ? p = !0 : /^(no|off|false|disabled)$/i.test(p) ? p = !1 : p === "null" ? p = null : p = Number(p), f[E] = p, f;
    }, {});
    function r() {
      return "colors" in u.inspectOpts ? !!u.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function o(f) {
      const { namespace: h, useColors: E } = this;
      if (E) {
        const p = this.color, F = "\x1B[3" + (p < 8 ? p : "8;5;" + p), m = `  ${F};1m${h} \x1B[0m`;
        f[0] = m + f[0].split(`
`).join(`
` + m), f.push(F + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        f[0] = i() + h + " " + f[0];
    }
    function i() {
      return u.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function s(...f) {
      return process.stderr.write(t.formatWithOptions(u.inspectOpts, ...f) + `
`);
    }
    function c(f) {
      f ? process.env.DEBUG = f : delete process.env.DEBUG;
    }
    function l() {
      return process.env.DEBUG;
    }
    function D(f) {
      f.inspectOpts = {};
      const h = Object.keys(u.inspectOpts);
      for (let E = 0; E < h.length; E++)
        f.inspectOpts[h[E]] = u.inspectOpts[h[E]];
    }
    e.exports = Ot()(u);
    const { formatters: a } = e.exports;
    a.o = function(f) {
      return this.inspectOpts.colors = this.useColors, t.inspect(f, this.inspectOpts).split(`
`).map((h) => h.trim()).join(" ");
    }, a.O = function(f) {
      return this.inspectOpts.colors = this.useColors, t.inspect(f, this.inspectOpts);
    };
  }(ve, ve.exports)), ve.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? ou.exports = mi() : ou.exports = Ai();
var gi = ou.exports;
const _i = /* @__PURE__ */ hi(gi), N = _i("serialport/binding-mock");
let be = {}, Be = 0;
function W() {
  return new Promise((e) => process.nextTick(() => e()));
}
class Wu extends Error {
  constructor(u) {
    super(u), this.canceled = !0;
  }
}
const Oe = {
  reset() {
    be = {}, Be = 0;
  },
  // Create a mock port
  createPort(e, u = {}) {
    Be++;
    const n = Object.assign({ echo: !1, record: !1, manufacturer: "The J5 Robotics Company", vendorId: void 0, productId: void 0, maxReadSize: 1024 }, u);
    be[e] = {
      data: Buffer.alloc(0),
      echo: n.echo,
      record: n.record,
      readyData: n.readyData,
      maxReadSize: n.maxReadSize,
      info: {
        path: e,
        manufacturer: n.manufacturer,
        serialNumber: `${Be}`,
        pnpId: void 0,
        locationId: void 0,
        vendorId: n.vendorId,
        productId: n.productId
      }
    }, N(Be, "created port", JSON.stringify({ path: e, opt: u }));
  },
  async list() {
    return N(null, "list"), Object.values(be).map((e) => e.info);
  },
  async open(e) {
    var u;
    if (!e || typeof e != "object" || Array.isArray(e))
      throw new TypeError('"options" is not an object');
    if (!e.path)
      throw new TypeError('"path" is not a valid port');
    if (!e.baudRate)
      throw new TypeError('"baudRate" is not a valid baudRate');
    const n = Object.assign({ dataBits: 8, lock: !0, stopBits: 1, parity: "none", rtscts: !1, xon: !1, xoff: !1, xany: !1, hupcl: !0 }, e), { path: t } = n;
    N(null, `open: opening path ${t}`);
    const r = be[t];
    if (await W(), !r)
      throw new Error(`Port does not exist - please call MockBinding.createPort('${t}') first`);
    const o = r.info.serialNumber;
    if (!((u = r.openOpt) === null || u === void 0) && u.lock)
      throw N(o, "open: Port is locked cannot open"), new Error("Port is locked cannot open");
    return N(o, `open: opened path ${t}`), r.openOpt = Object.assign({}, n), new wi(r, n);
  }
};
class wi {
  constructor(u, n) {
    if (this.port = u, this.openOptions = n, this.pendingRead = null, this.isOpen = !0, this.lastWrite = null, this.recording = Buffer.alloc(0), this.writeOperation = null, this.serialNumber = u.info.serialNumber, u.readyData) {
      const t = u.readyData;
      process.nextTick(() => {
        this.isOpen && (N(this.serialNumber, "emitting ready data"), this.emitData(t));
      });
    }
  }
  // Emit data on a mock port
  emitData(u) {
    if (!this.isOpen || !this.port)
      throw new Error("Port must be open to pretend to receive data");
    const n = Buffer.isBuffer(u) ? u : Buffer.from(u);
    N(this.serialNumber, "emitting data - pending read:", !!this.pendingRead), this.port.data = Buffer.concat([this.port.data, n]), this.pendingRead && (process.nextTick(this.pendingRead), this.pendingRead = null);
  }
  async close() {
    if (N(this.serialNumber, "close"), !this.isOpen)
      throw new Error("Port is not open");
    const u = this.port;
    if (!u)
      throw new Error("already closed");
    u.openOpt = void 0, u.data = Buffer.alloc(0), N(this.serialNumber, "port is closed"), this.serialNumber = void 0, this.isOpen = !1, this.pendingRead && this.pendingRead(new Wu("port is closed"));
  }
  async read(u, n, t) {
    if (!Buffer.isBuffer(u))
      throw new TypeError('"buffer" is not a Buffer');
    if (typeof n != "number" || isNaN(n))
      throw new TypeError(`"offset" is not an integer got "${isNaN(n) ? "NaN" : typeof n}"`);
    if (typeof t != "number" || isNaN(t))
      throw new TypeError(`"length" is not an integer got "${isNaN(t) ? "NaN" : typeof t}"`);
    if (u.length < n + t)
      throw new Error("buffer is too small");
    if (!this.isOpen)
      throw new Error("Port is not open");
    if (N(this.serialNumber, "read", t, "bytes"), await W(), !this.isOpen || !this.port)
      throw new Wu("Read canceled");
    if (this.port.data.length <= 0)
      return new Promise((s, c) => {
        this.pendingRead = (l) => {
          if (l)
            return c(l);
          this.read(u, n, t).then(s, c);
        };
      });
    const r = this.port.maxReadSize > t ? t : this.port.maxReadSize, i = this.port.data.slice(0, r).copy(u, n);
    return this.port.data = this.port.data.slice(r), N(this.serialNumber, "read", i, "bytes"), { bytesRead: i, buffer: u };
  }
  async write(u) {
    if (!Buffer.isBuffer(u))
      throw new TypeError('"buffer" is not a Buffer');
    if (!this.isOpen || !this.port)
      throw N("write", "error port is not open"), new Error("Port is not open");
    if (N(this.serialNumber, "write", u.length, "bytes"), this.writeOperation)
      throw new Error("Overlapping writes are not supported and should be queued by the serialport object");
    return this.writeOperation = (async () => {
      if (await W(), !this.isOpen || !this.port)
        throw new Error("Write canceled");
      const n = this.lastWrite = Buffer.from(u);
      this.port.record && (this.recording = Buffer.concat([this.recording, n])), this.port.echo && process.nextTick(() => {
        this.isOpen && this.emitData(n);
      }), this.writeOperation = null, N(this.serialNumber, "writing finished");
    })(), this.writeOperation;
  }
  async update(u) {
    if (typeof u != "object")
      throw TypeError('"options" is not an object');
    if (typeof u.baudRate != "number")
      throw new TypeError('"options.baudRate" is not a number');
    if (N(this.serialNumber, "update"), !this.isOpen || !this.port)
      throw new Error("Port is not open");
    await W(), this.port.openOpt && (this.port.openOpt.baudRate = u.baudRate);
  }
  async set(u) {
    if (typeof u != "object")
      throw new TypeError('"options" is not an object');
    if (N(this.serialNumber, "set"), !this.isOpen)
      throw new Error("Port is not open");
    await W();
  }
  async get() {
    if (N(this.serialNumber, "get"), !this.isOpen)
      throw new Error("Port is not open");
    return await W(), {
      cts: !0,
      dsr: !1,
      dcd: !1
    };
  }
  async getBaudRate() {
    var u;
    if (N(this.serialNumber, "getBaudRate"), !this.isOpen || !this.port)
      throw new Error("Port is not open");
    if (await W(), !(!((u = this.port.openOpt) === null || u === void 0) && u.baudRate))
      throw new Error("Internal Error");
    return {
      baudRate: this.port.openOpt.baudRate
    };
  }
  async flush() {
    if (N(this.serialNumber, "flush"), !this.isOpen || !this.port)
      throw new Error("Port is not open");
    await W(), this.port.data = Buffer.alloc(0);
  }
  async drain() {
    if (N(this.serialNumber, "drain"), !this.isOpen)
      throw new Error("Port is not open");
    await this.writeOperation, await W();
  }
}
const yi = {
  r4minima_vendor_id: "2341",
  r4minima_product_id: "0069"
}, zt = {
  ports: yi
}, vi = "/dev/mock-arduino", bi = zt.ports.r4minima_vendor_id, Bi = zt.ports.r4minima_product_id, Oi = '{"channel":"SOT","mssg":"","data":0}{"channel":"WAVEDATA","mssg":"","data":1}{"channel":"WAVEDATA","mssg":"","data":2}{"channel":"WAVEDATA","mssg":"","data":3}{"channel":"EOT","mssg":"","data":0}';
function zi() {
  return Oe.reset(), Oe.createPort(vi, {
    vendorId: bi,
    productId: Bi
  }), {
    ...Oe,
    async open(e) {
      const u = await Oe.open(e), n = u.write.bind(u);
      return u.write = async (t) => {
        await n(t), setTimeout(() => {
          u.isOpen && u.emitData(Oi);
        }, 0);
      }, u;
    }
  };
}
const iu = process.env.VITE_DEV_SERVER_URL, Vi = J.join(Fe, "dist-electron"), Si = J.join(Fe, "dist");
process.env.VITE_PUBLIC = iu ? J.join(Fe, "public") : Si;
let V;
function St() {
  V = new qu({
    kiosk: process.env.WAVE_ENERGY_MOCK_ARDUINO !== "1",
    webPreferences: {
      preload: J.join(jt, "preload.mjs")
    },
    width: 1024,
    height: 1366
  }), V.webContents.on("did-finish-load", () => {
    V == null || V.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), iu ? V.loadURL(iu) : V.loadFile("./dist/index.html");
}
ne.on("window-all-closed", () => {
  process.platform !== "darwin" && (ne.quit(), V = null);
});
ne.on("activate", () => {
  qu.getAllWindows().length === 0 && St();
});
ne.whenReady().then(() => {
  St();
  const e = process.env.WAVE_ENERGY_MOCK_ARDUINO === "1" ? zi() : void 0;
  ln(ki, e), dn(), ru(), setInterval(ru, 1e3 * 60 * 60), pi(), he.handle("get-height-options", async () => Ht), he.handle("get-period-options", async () => Yt);
});
function ki(e, ...u) {
  V && !V.isDestroyed() && V.webContents.send(e, ...u);
}
process.on("SIGINT", lu);
process.on("SIGTERM", lu);
ne.on("before-quit", lu);
export {
  Vi as MAIN_DIST,
  Si as RENDERER_DIST,
  iu as VITE_DEV_SERVER_URL,
  ki as safeSend
};
