import { app as ee, ipcMain as fe, BrowserWindow as yu } from "electron";
import J from "node:path";
import { fileURLToPath as sn } from "node:url";
import Ge from "node:fs";
import { createRequire as cn } from "node:module";
import { spawn as an } from "child_process";
import oe from "fs";
import vu from "path";
const Dn = sn(import.meta.url), wu = J.dirname(Dn), ln = wu, he = J.join(wu, ".."), We = J.join(he, "config"), fn = J.join(We, "pacwave.config.json"), dn = J.join(We, "arduino.config.json"), pn = J.join(We, "customwave.config.json");
J.join(he, "Shared/data/waverider.json");
const hn = ee.getPath("userData"), Ze = J.join(ee.getPath("userData"), "waverider.json"), Ce = JSON.parse(
  Ge.readFileSync(fn, "utf-8")
);
Ce.ipc.uds_path;
Ce.healthcheck.interval_ms;
Ce.healthcheck.max_failures;
const Cn = Ce.remote_host, Fn = Ce.remote_file, Fe = JSON.parse(
  Ge.readFileSync(dn, "utf-8")
), En = Fe.ports.featherM0_vendor_id, An = Fe.ports.featherM0_wifi_product_id, mn = Fe.ports.r4minima_vendor_id, gn = Fe.ports.r4minima_product_id, _n = Fe.baud_rate, bu = JSON.parse(
  Ge.readFileSync(pn, "utf-8")
), Bn = bu.height_selection_options, yn = bu.period_selection_options;
var vn = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/, wn = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/, bn = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/, $e = {
  Space_Separator: vn,
  ID_Start: wn,
  ID_Continue: bn
}, O = {
  isSpaceSeparator(e) {
    return typeof e == "string" && $e.Space_Separator.test(e);
  },
  isIdStartChar(e) {
    return typeof e == "string" && (e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e === "$" || e === "_" || $e.ID_Start.test(e));
  },
  isIdContinueChar(e) {
    return typeof e == "string" && (e >= "a" && e <= "z" || e >= "A" && e <= "Z" || e >= "0" && e <= "9" || e === "$" || e === "_" || e === "‌" || e === "‍" || $e.ID_Continue.test(e));
  },
  isDigit(e) {
    return typeof e == "string" && /[0-9]/.test(e);
  },
  isHexDigit(e) {
    return typeof e == "string" && /[0-9A-Fa-f]/.test(e);
  }
};
let je, R, G, ge, q, L, I, qe, le;
var zn = function(u, n) {
  je = String(u), R = "start", G = [], ge = 0, q = 1, L = 0, I = void 0, qe = void 0, le = void 0;
  do
    I = Sn(), $n[R]();
  while (I.type !== "eof");
  return typeof n == "function" ? Re({ "": le }, "", n) : le;
};
function Re(e, u, n) {
  const t = e[u];
  if (t != null && typeof t == "object")
    if (Array.isArray(t))
      for (let r = 0; r < t.length; r++) {
        const o = String(r), i = Re(t, o, n);
        i === void 0 ? delete t[o] : Object.defineProperty(t, o, {
          value: i,
          writable: !0,
          enumerable: !0,
          configurable: !0
        });
      }
    else
      for (const r in t) {
        const o = Re(t, r, n);
        o === void 0 ? delete t[r] : Object.defineProperty(t, r, {
          value: o,
          writable: !0,
          enumerable: !0,
          configurable: !0
        });
      }
  return n.call(e, u, t);
}
let m, E, ae, U, _;
function Sn() {
  for (m = "default", E = "", ae = !1, U = 1; ; ) {
    _ = W();
    const e = zu[m]();
    if (e)
      return e;
  }
}
function W() {
  if (je[ge])
    return String.fromCodePoint(je.codePointAt(ge));
}
function a() {
  const e = W();
  return e === `
` ? (q++, L = 0) : e ? L += e.length : L++, e && (ge += e.length), e;
}
const zu = {
  default() {
    switch (_) {
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
        a();
        return;
      case "/":
        a(), m = "comment";
        return;
      case void 0:
        return a(), z("eof");
    }
    if (O.isSpaceSeparator(_)) {
      a();
      return;
    }
    return zu[R]();
  },
  comment() {
    switch (_) {
      case "*":
        a(), m = "multiLineComment";
        return;
      case "/":
        a(), m = "singleLineComment";
        return;
    }
    throw S(a());
  },
  multiLineComment() {
    switch (_) {
      case "*":
        a(), m = "multiLineCommentAsterisk";
        return;
      case void 0:
        throw S(a());
    }
    a();
  },
  multiLineCommentAsterisk() {
    switch (_) {
      case "*":
        a();
        return;
      case "/":
        a(), m = "default";
        return;
      case void 0:
        throw S(a());
    }
    a(), m = "multiLineComment";
  },
  singleLineComment() {
    switch (_) {
      case `
`:
      case "\r":
      case "\u2028":
      case "\u2029":
        a(), m = "default";
        return;
      case void 0:
        return a(), z("eof");
    }
    a();
  },
  value() {
    switch (_) {
      case "{":
      case "[":
        return z("punctuator", a());
      case "n":
        return a(), Y("ull"), z("null", null);
      case "t":
        return a(), Y("rue"), z("boolean", !0);
      case "f":
        return a(), Y("alse"), z("boolean", !1);
      case "-":
      case "+":
        a() === "-" && (U = -1), m = "sign";
        return;
      case ".":
        E = a(), m = "decimalPointLeading";
        return;
      case "0":
        E = a(), m = "zero";
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
        E = a(), m = "decimalInteger";
        return;
      case "I":
        return a(), Y("nfinity"), z("numeric", 1 / 0);
      case "N":
        return a(), Y("aN"), z("numeric", NaN);
      case '"':
      case "'":
        ae = a() === '"', E = "", m = "string";
        return;
    }
    throw S(a());
  },
  identifierNameStartEscape() {
    if (_ !== "u")
      throw S(a());
    a();
    const e = xe();
    switch (e) {
      case "$":
      case "_":
        break;
      default:
        if (!O.isIdStartChar(e))
          throw nu();
        break;
    }
    E += e, m = "identifierName";
  },
  identifierName() {
    switch (_) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        E += a();
        return;
      case "\\":
        a(), m = "identifierNameEscape";
        return;
    }
    if (O.isIdContinueChar(_)) {
      E += a();
      return;
    }
    return z("identifier", E);
  },
  identifierNameEscape() {
    if (_ !== "u")
      throw S(a());
    a();
    const e = xe();
    switch (e) {
      case "$":
      case "_":
      case "‌":
      case "‍":
        break;
      default:
        if (!O.isIdContinueChar(e))
          throw nu();
        break;
    }
    E += e, m = "identifierName";
  },
  sign() {
    switch (_) {
      case ".":
        E = a(), m = "decimalPointLeading";
        return;
      case "0":
        E = a(), m = "zero";
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
        E = a(), m = "decimalInteger";
        return;
      case "I":
        return a(), Y("nfinity"), z("numeric", U * (1 / 0));
      case "N":
        return a(), Y("aN"), z("numeric", NaN);
    }
    throw S(a());
  },
  zero() {
    switch (_) {
      case ".":
        E += a(), m = "decimalPoint";
        return;
      case "e":
      case "E":
        E += a(), m = "decimalExponent";
        return;
      case "x":
      case "X":
        E += a(), m = "hexadecimal";
        return;
    }
    return z("numeric", U * 0);
  },
  decimalInteger() {
    switch (_) {
      case ".":
        E += a(), m = "decimalPoint";
        return;
      case "e":
      case "E":
        E += a(), m = "decimalExponent";
        return;
    }
    if (O.isDigit(_)) {
      E += a();
      return;
    }
    return z("numeric", U * Number(E));
  },
  decimalPointLeading() {
    if (O.isDigit(_)) {
      E += a(), m = "decimalFraction";
      return;
    }
    throw S(a());
  },
  decimalPoint() {
    switch (_) {
      case "e":
      case "E":
        E += a(), m = "decimalExponent";
        return;
    }
    if (O.isDigit(_)) {
      E += a(), m = "decimalFraction";
      return;
    }
    return z("numeric", U * Number(E));
  },
  decimalFraction() {
    switch (_) {
      case "e":
      case "E":
        E += a(), m = "decimalExponent";
        return;
    }
    if (O.isDigit(_)) {
      E += a();
      return;
    }
    return z("numeric", U * Number(E));
  },
  decimalExponent() {
    switch (_) {
      case "+":
      case "-":
        E += a(), m = "decimalExponentSign";
        return;
    }
    if (O.isDigit(_)) {
      E += a(), m = "decimalExponentInteger";
      return;
    }
    throw S(a());
  },
  decimalExponentSign() {
    if (O.isDigit(_)) {
      E += a(), m = "decimalExponentInteger";
      return;
    }
    throw S(a());
  },
  decimalExponentInteger() {
    if (O.isDigit(_)) {
      E += a();
      return;
    }
    return z("numeric", U * Number(E));
  },
  hexadecimal() {
    if (O.isHexDigit(_)) {
      E += a(), m = "hexadecimalInteger";
      return;
    }
    throw S(a());
  },
  hexadecimalInteger() {
    if (O.isHexDigit(_)) {
      E += a();
      return;
    }
    return z("numeric", U * Number(E));
  },
  string() {
    switch (_) {
      case "\\":
        a(), E += kn();
        return;
      case '"':
        if (ae)
          return a(), z("string", E);
        E += a();
        return;
      case "'":
        if (!ae)
          return a(), z("string", E);
        E += a();
        return;
      case `
`:
      case "\r":
        throw S(a());
      case "\u2028":
      case "\u2029":
        Nn(_);
        break;
      case void 0:
        throw S(a());
    }
    E += a();
  },
  start() {
    switch (_) {
      case "{":
      case "[":
        return z("punctuator", a());
    }
    m = "value";
  },
  beforePropertyName() {
    switch (_) {
      case "$":
      case "_":
        E = a(), m = "identifierName";
        return;
      case "\\":
        a(), m = "identifierNameStartEscape";
        return;
      case "}":
        return z("punctuator", a());
      case '"':
      case "'":
        ae = a() === '"', m = "string";
        return;
    }
    if (O.isIdStartChar(_)) {
      E += a(), m = "identifierName";
      return;
    }
    throw S(a());
  },
  afterPropertyName() {
    if (_ === ":")
      return z("punctuator", a());
    throw S(a());
  },
  beforePropertyValue() {
    m = "value";
  },
  afterPropertyValue() {
    switch (_) {
      case ",":
      case "}":
        return z("punctuator", a());
    }
    throw S(a());
  },
  beforeArrayValue() {
    if (_ === "]")
      return z("punctuator", a());
    m = "value";
  },
  afterArrayValue() {
    switch (_) {
      case ",":
      case "]":
        return z("punctuator", a());
    }
    throw S(a());
  },
  end() {
    throw S(a());
  }
};
function z(e, u) {
  return {
    type: e,
    value: u,
    line: q,
    column: L
  };
}
function Y(e) {
  for (const u of e) {
    if (W() !== u)
      throw S(a());
    a();
  }
}
function kn() {
  switch (W()) {
    case "b":
      return a(), "\b";
    case "f":
      return a(), "\f";
    case "n":
      return a(), `
`;
    case "r":
      return a(), "\r";
    case "t":
      return a(), "	";
    case "v":
      return a(), "\v";
    case "0":
      if (a(), O.isDigit(W()))
        throw S(a());
      return "\0";
    case "x":
      return a(), On();
    case "u":
      return a(), xe();
    case `
`:
    case "\u2028":
    case "\u2029":
      return a(), "";
    case "\r":
      return a(), W() === `
` && a(), "";
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      throw S(a());
    case void 0:
      throw S(a());
  }
  return a();
}
function On() {
  let e = "", u = W();
  if (!O.isHexDigit(u) || (e += a(), u = W(), !O.isHexDigit(u)))
    throw S(a());
  return e += a(), String.fromCodePoint(parseInt(e, 16));
}
function xe() {
  let e = "", u = 4;
  for (; u-- > 0; ) {
    const n = W();
    if (!O.isHexDigit(n))
      throw S(a());
    e += a();
  }
  return String.fromCodePoint(parseInt(e, 16));
}
const $n = {
  start() {
    if (I.type === "eof")
      throw X();
    Ne();
  },
  beforePropertyName() {
    switch (I.type) {
      case "identifier":
      case "string":
        qe = I.value, R = "afterPropertyName";
        return;
      case "punctuator":
        Ee();
        return;
      case "eof":
        throw X();
    }
  },
  afterPropertyName() {
    if (I.type === "eof")
      throw X();
    R = "beforePropertyValue";
  },
  beforePropertyValue() {
    if (I.type === "eof")
      throw X();
    Ne();
  },
  beforeArrayValue() {
    if (I.type === "eof")
      throw X();
    if (I.type === "punctuator" && I.value === "]") {
      Ee();
      return;
    }
    Ne();
  },
  afterPropertyValue() {
    if (I.type === "eof")
      throw X();
    switch (I.value) {
      case ",":
        R = "beforePropertyName";
        return;
      case "}":
        Ee();
    }
  },
  afterArrayValue() {
    if (I.type === "eof")
      throw X();
    switch (I.value) {
      case ",":
        R = "beforeArrayValue";
        return;
      case "]":
        Ee();
    }
  },
  end() {
  }
};
function Ne() {
  let e;
  switch (I.type) {
    case "punctuator":
      switch (I.value) {
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
      e = I.value;
      break;
  }
  if (le === void 0)
    le = e;
  else {
    const u = G[G.length - 1];
    Array.isArray(u) ? u.push(e) : Object.defineProperty(u, qe, {
      value: e,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  }
  if (e !== null && typeof e == "object")
    G.push(e), Array.isArray(e) ? R = "beforeArrayValue" : R = "beforePropertyName";
  else {
    const u = G[G.length - 1];
    u == null ? R = "end" : Array.isArray(u) ? R = "afterArrayValue" : R = "afterPropertyValue";
  }
}
function Ee() {
  G.pop();
  const e = G[G.length - 1];
  e == null ? R = "end" : Array.isArray(e) ? R = "afterArrayValue" : R = "afterPropertyValue";
}
function S(e) {
  return _e(e === void 0 ? `JSON5: invalid end of input at ${q}:${L}` : `JSON5: invalid character '${Su(e)}' at ${q}:${L}`);
}
function X() {
  return _e(`JSON5: invalid end of input at ${q}:${L}`);
}
function nu() {
  return L -= 5, _e(`JSON5: invalid identifier character at ${q}:${L}`);
}
function Nn(e) {
  console.warn(`JSON5: '${Su(e)}' in strings is not valid ECMAScript; consider escaping`);
}
function Su(e) {
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
function _e(e) {
  const u = new SyntaxError(e);
  return u.lineNumber = q, u.columnNumber = L, u;
}
var Pn = function(u, n, t) {
  const r = [];
  let o = "", i, s, c = "", D;
  if (n != null && typeof n == "object" && !Array.isArray(n) && (t = n.space, D = n.quote, n = n.replacer), typeof n == "function")
    s = n;
  else if (Array.isArray(n)) {
    i = [];
    for (const p of n) {
      let A;
      typeof p == "string" ? A = p : (typeof p == "number" || p instanceof String || p instanceof Number) && (A = String(p)), A !== void 0 && i.indexOf(A) < 0 && i.push(A);
    }
  }
  return t instanceof Number ? t = Number(t) : t instanceof String && (t = String(t)), typeof t == "number" ? t > 0 && (t = Math.min(10, Math.floor(t)), c = "          ".substr(0, t)) : typeof t == "string" && (c = t.substr(0, 10)), l("", { "": u });
  function l(p, A) {
    let h = A[p];
    switch (h != null && (typeof h.toJSON5 == "function" ? h = h.toJSON5(p) : typeof h.toJSON == "function" && (h = h.toJSON(p))), s && (h = s.call(A, p, h)), h instanceof Number ? h = Number(h) : h instanceof String ? h = String(h) : h instanceof Boolean && (h = h.valueOf()), h) {
      case null:
        return "null";
      case !0:
        return "true";
      case !1:
        return "false";
    }
    if (typeof h == "string")
      return f(h);
    if (typeof h == "number")
      return String(h);
    if (typeof h == "object")
      return Array.isArray(h) ? v(h) : F(h);
  }
  function f(p) {
    const A = {
      "'": 0.1,
      '"': 0.2
    }, h = {
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
    let g = "";
    for (let B = 0; B < p.length; B++) {
      const y = p[B];
      switch (y) {
        case "'":
        case '"':
          A[y]++, g += y;
          continue;
        case "\0":
          if (O.isDigit(p[B + 1])) {
            g += "\\x00";
            continue;
          }
      }
      if (h[y]) {
        g += h[y];
        continue;
      }
      if (y < " ") {
        let P = y.charCodeAt(0).toString(16);
        g += "\\x" + ("00" + P).substring(P.length);
        continue;
      }
      g += y;
    }
    const k = D || Object.keys(A).reduce((B, y) => A[B] < A[y] ? B : y);
    return g = g.replace(new RegExp(k, "g"), h[k]), k + g + k;
  }
  function F(p) {
    if (r.indexOf(p) >= 0)
      throw TypeError("Converting circular structure to JSON5");
    r.push(p);
    let A = o;
    o = o + c;
    let h = i || Object.keys(p), g = [];
    for (const B of h) {
      const y = l(B, p);
      if (y !== void 0) {
        let P = C(B) + ":";
        c !== "" && (P += " "), P += y, g.push(P);
      }
    }
    let k;
    if (g.length === 0)
      k = "{}";
    else {
      let B;
      if (c === "")
        B = g.join(","), k = "{" + B + "}";
      else {
        let y = `,
` + o;
        B = g.join(y), k = `{
` + o + B + `,
` + A + "}";
      }
    }
    return r.pop(), o = A, k;
  }
  function C(p) {
    if (p.length === 0)
      return f(p);
    const A = String.fromCodePoint(p.codePointAt(0));
    if (!O.isIdStartChar(A))
      return f(p);
    for (let h = A.length; h < p.length; h++)
      if (!O.isIdContinueChar(String.fromCodePoint(p.codePointAt(h))))
        return f(p);
    return p;
  }
  function v(p) {
    if (r.indexOf(p) >= 0)
      throw TypeError("Converting circular structure to JSON5");
    r.push(p);
    let A = o;
    o = o + c;
    let h = [];
    for (let k = 0; k < p.length; k++) {
      const B = l(String(k), p);
      h.push(B !== void 0 ? B : "null");
    }
    let g;
    if (h.length === 0)
      g = "[]";
    else if (c === "")
      g = "[" + h.join(",") + "]";
    else {
      let k = `,
` + o, B = h.join(k);
      g = `[
` + o + B + `,
` + A + "]";
    }
    return r.pop(), o = A, g;
  }
};
const In = {
  parse: zn,
  stringify: Pn
};
var Tn = In;
const ku = cn(import.meta.url), { SerialPort: tu } = ku("serialport"), { ReadlineParser: Zn } = ku("@serialport/parser-readline");
let T = null, Pe = [], ru = null, Q;
function jn(e) {
  Q = e, setInterval(xn, 1e3);
}
function Rn(e) {
  return e += "}", Tn.parse(e);
}
async function xn() {
  const u = (await tu.list()).find(
    (n) => n.vendorId && (n.vendorId === En || n.productId === An || n.vendorId === mn || n.productId === gn)
  );
  if (!u) {
    T && T.isOpen && (T.close(), T = null, Q("main.ts >> Arduino not connected."));
    return;
  }
  T && T.isOpen || (T = new tu({
    path: u.path,
    baudRate: _n
  }), T.on("open", () => {
    console.log("main.ts >> Arduino connected", u.path), Q("arduino-connected");
  }), T.on("close", () => {
    console.log("main.ts >> Arduino disconnected"), T = null, Q("arduino-disconnected");
  }), T.on("error", (n) => {
    console.log("main.ts >> Arduino not connected."), Q("arduino-error", n.message);
  }), ru = T.pipe(new Zn({ delimiter: "}" })), ru.on(
    "data",
    (n) => {
      const t = Rn(n);
      switch (t.channel) {
        case "DEBUG":
          console.log(`Channel: ${t.channel}
Message:${t.mssg}
Data: ${t.data}`);
          break;
        case "EOT":
          Q("complete-wave", Pe), Pe = [], console.log("main.ts >> Received EOT!");
          break;
        case "WAVEDATA":
          Pe.push(t.data), Q("wave-val", t.data);
          break;
      }
    }
  ));
}
function He() {
  if (console.log("main.ts >> Shutting down app"), T && T.isOpen)
    try {
      T.close(), console.log("main.ts >> Port closed");
    } catch (e) {
      console.log("main.ts >> Error: ", e);
    }
  process.exit(0);
}
function Jn() {
  fe.handle("arduino-status", () => ({ connected: !!(T && T.isOpen) })), fe.handle("send-wave", async (e, u) => {
    const n = JSON.stringify(u);
    return T.write(n + `
`, (t) => {
      console.log(t ? `main.ts >> Error sending command to arduino: ${t}` : `main.ts >> Sent command to arduino: ${n}`);
    }), "OK";
  });
}
function d(e, u, n) {
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
    const D = i.prototype, l = Object.keys(D);
    for (let f = 0; f < l.length; f++) {
      const F = l[f];
      F in s || (s[F] = D[F].bind(s));
    }
  }
  const r = (n == null ? void 0 : n.Parent) ?? Object;
  class o extends r {
  }
  Object.defineProperty(o, "name", { value: e });
  function i(s) {
    var c;
    const D = n != null && n.Parent ? new o() : this;
    t(D, s), (c = D._zod).deferred ?? (c.deferred = []);
    for (const l of D._zod.deferred)
      l();
    return D;
  }
  return Object.defineProperty(i, "init", { value: t }), Object.defineProperty(i, Symbol.hasInstance, {
    value: (s) => {
      var c, D;
      return n != null && n.Parent && s instanceof n.Parent ? !0 : (D = (c = s == null ? void 0 : s._zod) == null ? void 0 : c.traits) == null ? void 0 : D.has(e);
    }
  }), Object.defineProperty(i, "name", { value: e }), i;
}
class se extends Error {
  constructor() {
    super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
  }
}
class Ou extends Error {
  constructor(u) {
    super(`Encountered unidirectional transform during encode: ${u}`), this.name = "ZodEncodeError";
  }
}
const $u = {};
function ue(e) {
  return $u;
}
function Nu(e) {
  const u = Object.values(e).filter((t) => typeof t == "number");
  return Object.entries(e).filter(([t, r]) => u.indexOf(+t) === -1).map(([t, r]) => r);
}
function Je(e, u) {
  return typeof u == "bigint" ? u.toString() : u;
}
function Ke(e) {
  return {
    get value() {
      {
        const u = e();
        return Object.defineProperty(this, "value", { value: u }), u;
      }
    }
  };
}
function Ye(e) {
  return e == null;
}
function Xe(e) {
  const u = e.startsWith("^") ? 1 : 0, n = e.endsWith("$") ? e.length - 1 : e.length;
  return e.slice(u, n);
}
function Mn(e, u) {
  const n = (e.toString().split(".")[1] || "").length, t = u.toString();
  let r = (t.split(".")[1] || "").length;
  if (r === 0 && /\d?e-\d?/.test(t)) {
    const c = t.match(/\d?e-(\d?)/);
    c != null && c[1] && (r = Number.parseInt(c[1]));
  }
  const o = n > r ? n : r, i = Number.parseInt(e.toFixed(o).replace(".", "")), s = Number.parseInt(u.toFixed(o).replace(".", ""));
  return i % s / 10 ** o;
}
const ou = Symbol("evaluating");
function w(e, u, n) {
  let t;
  Object.defineProperty(e, u, {
    get() {
      if (t !== ou)
        return t === void 0 && (t = ou, t = n()), t;
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
function te(e, u, n) {
  Object.defineProperty(e, u, {
    value: n,
    writable: !0,
    enumerable: !0,
    configurable: !0
  });
}
function H(...e) {
  const u = {};
  for (const n of e) {
    const t = Object.getOwnPropertyDescriptors(n);
    Object.assign(u, t);
  }
  return Object.defineProperties({}, u);
}
function iu(e) {
  return JSON.stringify(e);
}
function Vn(e) {
  return e.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}
const Pu = "captureStackTrace" in Error ? Error.captureStackTrace : (...e) => {
};
function Be(e) {
  return typeof e == "object" && e !== null && !Array.isArray(e);
}
const Ln = Ke(() => {
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
function de(e) {
  if (Be(e) === !1)
    return !1;
  const u = e.constructor;
  if (u === void 0 || typeof u != "function")
    return !0;
  const n = u.prototype;
  return !(Be(n) === !1 || Object.prototype.hasOwnProperty.call(n, "isPrototypeOf") === !1);
}
function Iu(e) {
  return de(e) ? { ...e } : Array.isArray(e) ? [...e] : e;
}
const Un = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function be(e) {
  return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function K(e, u, n) {
  const t = new e._zod.constr(u ?? e._zod.def);
  return (!u || n != null && n.parent) && (t._zod.parent = e), t;
}
function b(e) {
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
function Gn(e) {
  return Object.keys(e).filter((u) => e[u]._zod.optin === "optional" && e[u]._zod.optout === "optional");
}
const Wn = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-34028234663852886e22, 34028234663852886e22],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function qn(e, u) {
  const n = e._zod.def, t = n.checks;
  if (t && t.length > 0)
    throw new Error(".pick() cannot be used on object schemas containing refinements");
  const o = H(e._zod.def, {
    get shape() {
      const i = {};
      for (const s in u) {
        if (!(s in n.shape))
          throw new Error(`Unrecognized key: "${s}"`);
        u[s] && (i[s] = n.shape[s]);
      }
      return te(this, "shape", i), i;
    },
    checks: []
  });
  return K(e, o);
}
function Hn(e, u) {
  const n = e._zod.def, t = n.checks;
  if (t && t.length > 0)
    throw new Error(".omit() cannot be used on object schemas containing refinements");
  const o = H(e._zod.def, {
    get shape() {
      const i = { ...e._zod.def.shape };
      for (const s in u) {
        if (!(s in n.shape))
          throw new Error(`Unrecognized key: "${s}"`);
        u[s] && delete i[s];
      }
      return te(this, "shape", i), i;
    },
    checks: []
  });
  return K(e, o);
}
function Kn(e, u) {
  if (!de(u))
    throw new Error("Invalid input to extend: expected a plain object");
  const n = e._zod.def.checks;
  if (n && n.length > 0) {
    const o = e._zod.def.shape;
    for (const i in u)
      if (Object.getOwnPropertyDescriptor(o, i) !== void 0)
        throw new Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
  }
  const r = H(e._zod.def, {
    get shape() {
      const o = { ...e._zod.def.shape, ...u };
      return te(this, "shape", o), o;
    }
  });
  return K(e, r);
}
function Yn(e, u) {
  if (!de(u))
    throw new Error("Invalid input to safeExtend: expected a plain object");
  const n = H(e._zod.def, {
    get shape() {
      const t = { ...e._zod.def.shape, ...u };
      return te(this, "shape", t), t;
    }
  });
  return K(e, n);
}
function Xn(e, u) {
  const n = H(e._zod.def, {
    get shape() {
      const t = { ...e._zod.def.shape, ...u._zod.def.shape };
      return te(this, "shape", t), t;
    },
    get catchall() {
      return u._zod.def.catchall;
    },
    checks: []
    // delete existing checks
  });
  return K(e, n);
}
function Qn(e, u, n) {
  const r = u._zod.def.checks;
  if (r && r.length > 0)
    throw new Error(".partial() cannot be used on object schemas containing refinements");
  const i = H(u._zod.def, {
    get shape() {
      const s = u._zod.def.shape, c = { ...s };
      if (n)
        for (const D in n) {
          if (!(D in s))
            throw new Error(`Unrecognized key: "${D}"`);
          n[D] && (c[D] = e ? new e({
            type: "optional",
            innerType: s[D]
          }) : s[D]);
        }
      else
        for (const D in s)
          c[D] = e ? new e({
            type: "optional",
            innerType: s[D]
          }) : s[D];
      return te(this, "shape", c), c;
    },
    checks: []
  });
  return K(u, i);
}
function et(e, u, n) {
  const t = H(u._zod.def, {
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
      return te(this, "shape", o), o;
    }
  });
  return K(u, t);
}
function ie(e, u = 0) {
  var n;
  if (e.aborted === !0)
    return !0;
  for (let t = u; t < e.issues.length; t++)
    if (((n = e.issues[t]) == null ? void 0 : n.continue) !== !0)
      return !0;
  return !1;
}
function Tu(e, u) {
  return u.map((n) => {
    var t;
    return (t = n).path ?? (t.path = []), n.path.unshift(e), n;
  });
}
function Ae(e) {
  return typeof e == "string" ? e : e == null ? void 0 : e.message;
}
function ne(e, u, n) {
  var r, o, i, s, c, D;
  const t = { ...e, path: e.path ?? [] };
  if (!e.message) {
    const l = Ae((i = (o = (r = e.inst) == null ? void 0 : r._zod.def) == null ? void 0 : o.error) == null ? void 0 : i.call(o, e)) ?? Ae((s = u == null ? void 0 : u.error) == null ? void 0 : s.call(u, e)) ?? Ae((c = n.customError) == null ? void 0 : c.call(n, e)) ?? Ae((D = n.localeError) == null ? void 0 : D.call(n, e)) ?? "Invalid input";
    t.message = l;
  }
  return delete t.inst, delete t.continue, u != null && u.reportInput || delete t.input, t;
}
function Qe(e) {
  return Array.isArray(e) ? "array" : typeof e == "string" ? "string" : "unknown";
}
function pe(...e) {
  const [u, n, t] = e;
  return typeof u == "string" ? {
    message: u,
    code: "custom",
    input: n,
    inst: t
  } : { ...u };
}
const Zu = (e, u) => {
  e.name = "$ZodError", Object.defineProperty(e, "_zod", {
    value: e._zod,
    enumerable: !1
  }), Object.defineProperty(e, "issues", {
    value: u,
    enumerable: !1
  }), e.message = JSON.stringify(u, Je, 2), Object.defineProperty(e, "toString", {
    value: () => e.message,
    enumerable: !1
  });
}, ju = d("$ZodError", Zu), Ru = d("$ZodError", Zu, { Parent: Error });
function ut(e, u = (n) => n.message) {
  const n = {}, t = [];
  for (const r of e.issues)
    r.path.length > 0 ? (n[r.path[0]] = n[r.path[0]] || [], n[r.path[0]].push(u(r))) : t.push(u(r));
  return { formErrors: t, fieldErrors: n };
}
function nt(e, u = (n) => n.message) {
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
const eu = (e) => (u, n, t, r) => {
  const o = t ? Object.assign(t, { async: !1 }) : { async: !1 }, i = u._zod.run({ value: n, issues: [] }, o);
  if (i instanceof Promise)
    throw new se();
  if (i.issues.length) {
    const s = new ((r == null ? void 0 : r.Err) ?? e)(i.issues.map((c) => ne(c, o, ue())));
    throw Pu(s, r == null ? void 0 : r.callee), s;
  }
  return i.value;
}, uu = (e) => async (u, n, t, r) => {
  const o = t ? Object.assign(t, { async: !0 }) : { async: !0 };
  let i = u._zod.run({ value: n, issues: [] }, o);
  if (i instanceof Promise && (i = await i), i.issues.length) {
    const s = new ((r == null ? void 0 : r.Err) ?? e)(i.issues.map((c) => ne(c, o, ue())));
    throw Pu(s, r == null ? void 0 : r.callee), s;
  }
  return i.value;
}, ze = (e) => (u, n, t) => {
  const r = t ? { ...t, async: !1 } : { async: !1 }, o = u._zod.run({ value: n, issues: [] }, r);
  if (o instanceof Promise)
    throw new se();
  return o.issues.length ? {
    success: !1,
    error: new (e ?? ju)(o.issues.map((i) => ne(i, r, ue())))
  } : { success: !0, data: o.value };
}, tt = /* @__PURE__ */ ze(Ru), Se = (e) => async (u, n, t) => {
  const r = t ? Object.assign(t, { async: !0 }) : { async: !0 };
  let o = u._zod.run({ value: n, issues: [] }, r);
  return o instanceof Promise && (o = await o), o.issues.length ? {
    success: !1,
    error: new e(o.issues.map((i) => ne(i, r, ue())))
  } : { success: !0, data: o.value };
}, rt = /* @__PURE__ */ Se(Ru), ot = (e) => (u, n, t) => {
  const r = t ? Object.assign(t, { direction: "backward" }) : { direction: "backward" };
  return eu(e)(u, n, r);
}, it = (e) => (u, n, t) => eu(e)(u, n, t), st = (e) => async (u, n, t) => {
  const r = t ? Object.assign(t, { direction: "backward" }) : { direction: "backward" };
  return uu(e)(u, n, r);
}, ct = (e) => async (u, n, t) => uu(e)(u, n, t), at = (e) => (u, n, t) => {
  const r = t ? Object.assign(t, { direction: "backward" }) : { direction: "backward" };
  return ze(e)(u, n, r);
}, Dt = (e) => (u, n, t) => ze(e)(u, n, t), lt = (e) => async (u, n, t) => {
  const r = t ? Object.assign(t, { direction: "backward" }) : { direction: "backward" };
  return Se(e)(u, n, r);
}, ft = (e) => async (u, n, t) => Se(e)(u, n, t), dt = "(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";
function pt(e) {
  const u = "(?:[01]\\d|2[0-3]):[0-5]\\d";
  return typeof e.precision == "number" ? e.precision === -1 ? `${u}` : e.precision === 0 ? `${u}:[0-5]\\d` : `${u}:[0-5]\\d\\.\\d{${e.precision}}` : `${u}(?::[0-5]\\d(?:\\.\\d+)?)?`;
}
function ht(e) {
  const u = pt({ precision: e.precision }), n = ["Z"];
  e.local && n.push(""), e.offset && n.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");
  const t = `${u}(?:${n.join("|")})`;
  return new RegExp(`^${dt}T(?:${t})$`);
}
const Ct = (e) => {
  const u = e ? `[\\s\\S]{${(e == null ? void 0 : e.minimum) ?? 0},${(e == null ? void 0 : e.maximum) ?? ""}}` : "[\\s\\S]*";
  return new RegExp(`^${u}$`);
}, Ft = /^-?\d+$/, Et = /^-?\d+(?:\.\d+)?$/, At = /^[^A-Z]*$/, mt = /^[^a-z]*$/, x = /* @__PURE__ */ d("$ZodCheck", (e, u) => {
  var n;
  e._zod ?? (e._zod = {}), e._zod.def = u, (n = e._zod).onattach ?? (n.onattach = []);
}), xu = {
  number: "number",
  bigint: "bigint",
  object: "date"
}, Ju = /* @__PURE__ */ d("$ZodCheckLessThan", (e, u) => {
  x.init(e, u);
  const n = xu[typeof u.value];
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
}), Mu = /* @__PURE__ */ d("$ZodCheckGreaterThan", (e, u) => {
  x.init(e, u);
  const n = xu[typeof u.value];
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
}), gt = /* @__PURE__ */ d("$ZodCheckMultipleOf", (e, u) => {
  x.init(e, u), e._zod.onattach.push((n) => {
    var t;
    (t = n._zod.bag).multipleOf ?? (t.multipleOf = u.value);
  }), e._zod.check = (n) => {
    if (typeof n.value != typeof u.value)
      throw new Error("Cannot mix number and bigint in multiple_of check.");
    (typeof n.value == "bigint" ? n.value % u.value === BigInt(0) : Mn(n.value, u.value) === 0) || n.issues.push({
      origin: typeof n.value,
      code: "not_multiple_of",
      divisor: u.value,
      input: n.value,
      inst: e,
      continue: !u.abort
    });
  };
}), _t = /* @__PURE__ */ d("$ZodCheckNumberFormat", (e, u) => {
  var i;
  x.init(e, u), u.format = u.format || "float64";
  const n = (i = u.format) == null ? void 0 : i.includes("int"), t = n ? "int" : "number", [r, o] = Wn[u.format];
  e._zod.onattach.push((s) => {
    const c = s._zod.bag;
    c.format = u.format, c.minimum = r, c.maximum = o, n && (c.pattern = Ft);
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
}), Bt = /* @__PURE__ */ d("$ZodCheckMaxLength", (e, u) => {
  var n;
  x.init(e, u), (n = e._zod.def).when ?? (n.when = (t) => {
    const r = t.value;
    return !Ye(r) && r.length !== void 0;
  }), e._zod.onattach.push((t) => {
    const r = t._zod.bag.maximum ?? Number.POSITIVE_INFINITY;
    u.maximum < r && (t._zod.bag.maximum = u.maximum);
  }), e._zod.check = (t) => {
    const r = t.value;
    if (r.length <= u.maximum)
      return;
    const i = Qe(r);
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
}), yt = /* @__PURE__ */ d("$ZodCheckMinLength", (e, u) => {
  var n;
  x.init(e, u), (n = e._zod.def).when ?? (n.when = (t) => {
    const r = t.value;
    return !Ye(r) && r.length !== void 0;
  }), e._zod.onattach.push((t) => {
    const r = t._zod.bag.minimum ?? Number.NEGATIVE_INFINITY;
    u.minimum > r && (t._zod.bag.minimum = u.minimum);
  }), e._zod.check = (t) => {
    const r = t.value;
    if (r.length >= u.minimum)
      return;
    const i = Qe(r);
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
}), vt = /* @__PURE__ */ d("$ZodCheckLengthEquals", (e, u) => {
  var n;
  x.init(e, u), (n = e._zod.def).when ?? (n.when = (t) => {
    const r = t.value;
    return !Ye(r) && r.length !== void 0;
  }), e._zod.onattach.push((t) => {
    const r = t._zod.bag;
    r.minimum = u.length, r.maximum = u.length, r.length = u.length;
  }), e._zod.check = (t) => {
    const r = t.value, o = r.length;
    if (o === u.length)
      return;
    const i = Qe(r), s = o > u.length;
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
}), ke = /* @__PURE__ */ d("$ZodCheckStringFormat", (e, u) => {
  var n, t;
  x.init(e, u), e._zod.onattach.push((r) => {
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
}), wt = /* @__PURE__ */ d("$ZodCheckRegex", (e, u) => {
  ke.init(e, u), e._zod.check = (n) => {
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
}), bt = /* @__PURE__ */ d("$ZodCheckLowerCase", (e, u) => {
  u.pattern ?? (u.pattern = At), ke.init(e, u);
}), zt = /* @__PURE__ */ d("$ZodCheckUpperCase", (e, u) => {
  u.pattern ?? (u.pattern = mt), ke.init(e, u);
}), St = /* @__PURE__ */ d("$ZodCheckIncludes", (e, u) => {
  x.init(e, u);
  const n = be(u.includes), t = new RegExp(typeof u.position == "number" ? `^.{${u.position}}${n}` : n);
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
}), kt = /* @__PURE__ */ d("$ZodCheckStartsWith", (e, u) => {
  x.init(e, u);
  const n = new RegExp(`^${be(u.prefix)}.*`);
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
}), Ot = /* @__PURE__ */ d("$ZodCheckEndsWith", (e, u) => {
  x.init(e, u);
  const n = new RegExp(`.*${be(u.suffix)}$`);
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
}), $t = /* @__PURE__ */ d("$ZodCheckOverwrite", (e, u) => {
  x.init(e, u), e._zod.check = (n) => {
    n.value = u.tx(n.value);
  };
});
class Nt {
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
const Pt = {
  major: 4,
  minor: 3,
  patch: 6
}, $ = /* @__PURE__ */ d("$ZodType", (e, u) => {
  var r;
  var n;
  e ?? (e = {}), e._zod.def = u, e._zod.bag = e._zod.bag || {}, e._zod.version = Pt;
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
    const o = (s, c, D) => {
      let l = ie(s), f;
      for (const F of c) {
        if (F._zod.def.when) {
          if (!F._zod.def.when(s))
            continue;
        } else if (l)
          continue;
        const C = s.issues.length, v = F._zod.check(s);
        if (v instanceof Promise && (D == null ? void 0 : D.async) === !1)
          throw new se();
        if (f || v instanceof Promise)
          f = (f ?? Promise.resolve()).then(async () => {
            await v, s.issues.length !== C && (l || (l = ie(s, C)));
          });
        else {
          if (s.issues.length === C)
            continue;
          l || (l = ie(s, C));
        }
      }
      return f ? f.then(() => s) : s;
    }, i = (s, c, D) => {
      if (ie(s))
        return s.aborted = !0, s;
      const l = o(c, t, D);
      if (l instanceof Promise) {
        if (D.async === !1)
          throw new se();
        return l.then((f) => e._zod.parse(f, D));
      }
      return e._zod.parse(l, D);
    };
    e._zod.run = (s, c) => {
      if (c.skipChecks)
        return e._zod.parse(s, c);
      if (c.direction === "backward") {
        const l = e._zod.parse({ value: s.value, issues: [] }, { ...c, skipChecks: !0 });
        return l instanceof Promise ? l.then((f) => i(f, s, c)) : i(l, s, c);
      }
      const D = e._zod.parse(s, c);
      if (D instanceof Promise) {
        if (c.async === !1)
          throw new se();
        return D.then((l) => o(l, t, c));
      }
      return o(D, t, c);
    };
  }
  w(e, "~standard", () => ({
    validate: (o) => {
      var i;
      try {
        const s = tt(e, o);
        return s.success ? { value: s.data } : { issues: (i = s.error) == null ? void 0 : i.issues };
      } catch {
        return rt(e, o).then((c) => {
          var D;
          return c.success ? { value: c.data } : { issues: (D = c.error) == null ? void 0 : D.issues };
        });
      }
    },
    vendor: "zod",
    version: 1
  }));
}), Vu = /* @__PURE__ */ d("$ZodString", (e, u) => {
  var n;
  $.init(e, u), e._zod.pattern = [...((n = e == null ? void 0 : e._zod.bag) == null ? void 0 : n.patterns) ?? []].pop() ?? Ct(e._zod.bag), e._zod.parse = (t, r) => {
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
}), Lu = /* @__PURE__ */ d("$ZodStringFormat", (e, u) => {
  ke.init(e, u), Vu.init(e, u);
}), It = /* @__PURE__ */ d("$ZodISODateTime", (e, u) => {
  u.pattern ?? (u.pattern = ht(u)), Lu.init(e, u);
}), Uu = /* @__PURE__ */ d("$ZodNumber", (e, u) => {
  $.init(e, u), e._zod.pattern = e._zod.bag.pattern ?? Et, e._zod.parse = (n, t) => {
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
}), Tt = /* @__PURE__ */ d("$ZodNumberFormat", (e, u) => {
  _t.init(e, u), Uu.init(e, u);
}), Zt = /* @__PURE__ */ d("$ZodUnknown", (e, u) => {
  $.init(e, u), e._zod.parse = (n) => n;
}), jt = /* @__PURE__ */ d("$ZodNever", (e, u) => {
  $.init(e, u), e._zod.parse = (n, t) => (n.issues.push({
    expected: "never",
    code: "invalid_type",
    input: n.value,
    inst: e
  }), n);
});
function su(e, u, n) {
  e.issues.length && u.issues.push(...Tu(n, e.issues)), u.value[n] = e.value;
}
const Rt = /* @__PURE__ */ d("$ZodArray", (e, u) => {
  $.init(e, u), e._zod.parse = (n, t) => {
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
      c instanceof Promise ? o.push(c.then((D) => su(D, n, i))) : su(c, n, i);
    }
    return o.length ? Promise.all(o).then(() => n) : n;
  };
});
function ye(e, u, n, t, r) {
  if (e.issues.length) {
    if (r && !(n in t))
      return;
    u.issues.push(...Tu(n, e.issues));
  }
  e.value === void 0 ? n in t && (u.value[n] = void 0) : u.value[n] = e.value;
}
function Gu(e) {
  var t, r, o, i;
  const u = Object.keys(e.shape);
  for (const s of u)
    if (!((i = (o = (r = (t = e.shape) == null ? void 0 : t[s]) == null ? void 0 : r._zod) == null ? void 0 : o.traits) != null && i.has("$ZodType")))
      throw new Error(`Invalid element at key "${s}": expected a Zod schema`);
  const n = Gn(e.shape);
  return {
    ...e,
    keys: u,
    keySet: new Set(u),
    numKeys: u.length,
    optionalKeys: new Set(n)
  };
}
function Wu(e, u, n, t, r, o) {
  const i = [], s = r.keySet, c = r.catchall._zod, D = c.def.type, l = c.optout === "optional";
  for (const f in u) {
    if (s.has(f))
      continue;
    if (D === "never") {
      i.push(f);
      continue;
    }
    const F = c.run({ value: u[f], issues: [] }, t);
    F instanceof Promise ? e.push(F.then((C) => ye(C, n, f, u, l))) : ye(F, n, f, u, l);
  }
  return i.length && n.issues.push({
    code: "unrecognized_keys",
    keys: i,
    input: u,
    inst: o
  }), e.length ? Promise.all(e).then(() => n) : n;
}
const xt = /* @__PURE__ */ d("$ZodObject", (e, u) => {
  $.init(e, u);
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
  const t = Ke(() => Gu(u));
  w(e._zod, "propValues", () => {
    const s = u.shape, c = {};
    for (const D in s) {
      const l = s[D]._zod;
      if (l.values) {
        c[D] ?? (c[D] = /* @__PURE__ */ new Set());
        for (const f of l.values)
          c[D].add(f);
      }
    }
    return c;
  });
  const r = Be, o = u.catchall;
  let i;
  e._zod.parse = (s, c) => {
    i ?? (i = t.value);
    const D = s.value;
    if (!r(D))
      return s.issues.push({
        expected: "object",
        code: "invalid_type",
        input: D,
        inst: e
      }), s;
    s.value = {};
    const l = [], f = i.shape;
    for (const F of i.keys) {
      const C = f[F], v = C._zod.optout === "optional", p = C._zod.run({ value: D[F], issues: [] }, c);
      p instanceof Promise ? l.push(p.then((A) => ye(A, s, F, D, v))) : ye(p, s, F, D, v);
    }
    return o ? Wu(l, D, s, c, t.value, e) : l.length ? Promise.all(l).then(() => s) : s;
  };
}), Jt = /* @__PURE__ */ d("$ZodObjectJIT", (e, u) => {
  xt.init(e, u);
  const n = e._zod.parse, t = Ke(() => Gu(u)), r = (F) => {
    var k;
    const C = new Nt(["shape", "payload", "ctx"]), v = t.value, p = (B) => {
      const y = iu(B);
      return `shape[${y}]._zod.run({ value: input[${y}], issues: [] }, ctx)`;
    };
    C.write("const input = payload.value;");
    const A = /* @__PURE__ */ Object.create(null);
    let h = 0;
    for (const B of v.keys)
      A[B] = `key_${h++}`;
    C.write("const newResult = {};");
    for (const B of v.keys) {
      const y = A[B], P = iu(B), Oe = F[B], on = ((k = Oe == null ? void 0 : Oe._zod) == null ? void 0 : k.optout) === "optional";
      C.write(`const ${y} = ${p(B)};`), on ? C.write(`
        if (${y}.issues.length) {
          if (${P} in input) {
            payload.issues = payload.issues.concat(${y}.issues.map(iss => ({
              ...iss,
              path: iss.path ? [${P}, ...iss.path] : [${P}]
            })));
          }
        }
        
        if (${y}.value === undefined) {
          if (${P} in input) {
            newResult[${P}] = undefined;
          }
        } else {
          newResult[${P}] = ${y}.value;
        }
        
      `) : C.write(`
        if (${y}.issues.length) {
          payload.issues = payload.issues.concat(${y}.issues.map(iss => ({
            ...iss,
            path: iss.path ? [${P}, ...iss.path] : [${P}]
          })));
        }
        
        if (${y}.value === undefined) {
          if (${P} in input) {
            newResult[${P}] = undefined;
          }
        } else {
          newResult[${P}] = ${y}.value;
        }
        
      `);
    }
    C.write("payload.value = newResult;"), C.write("return payload;");
    const g = C.compile();
    return (B, y) => g(F, B, y);
  };
  let o;
  const i = Be, s = !$u.jitless, D = s && Ln.value, l = u.catchall;
  let f;
  e._zod.parse = (F, C) => {
    f ?? (f = t.value);
    const v = F.value;
    return i(v) ? s && D && (C == null ? void 0 : C.async) === !1 && C.jitless !== !0 ? (o || (o = r(u.shape)), F = o(F, C), l ? Wu([], v, F, C, f, e) : F) : n(F, C) : (F.issues.push({
      expected: "object",
      code: "invalid_type",
      input: v,
      inst: e
    }), F);
  };
});
function cu(e, u, n, t) {
  for (const o of e)
    if (o.issues.length === 0)
      return u.value = o.value, u;
  const r = e.filter((o) => !ie(o));
  return r.length === 1 ? (u.value = r[0].value, r[0]) : (u.issues.push({
    code: "invalid_union",
    input: u.value,
    inst: n,
    errors: e.map((o) => o.issues.map((i) => ne(i, t, ue())))
  }), u);
}
const Mt = /* @__PURE__ */ d("$ZodUnion", (e, u) => {
  $.init(e, u), w(e._zod, "optin", () => u.options.some((r) => r._zod.optin === "optional") ? "optional" : void 0), w(e._zod, "optout", () => u.options.some((r) => r._zod.optout === "optional") ? "optional" : void 0), w(e._zod, "values", () => {
    if (u.options.every((r) => r._zod.values))
      return new Set(u.options.flatMap((r) => Array.from(r._zod.values)));
  }), w(e._zod, "pattern", () => {
    if (u.options.every((r) => r._zod.pattern)) {
      const r = u.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${r.map((o) => Xe(o.source)).join("|")})$`);
    }
  });
  const n = u.options.length === 1, t = u.options[0]._zod.run;
  e._zod.parse = (r, o) => {
    if (n)
      return t(r, o);
    let i = !1;
    const s = [];
    for (const c of u.options) {
      const D = c._zod.run({
        value: r.value,
        issues: []
      }, o);
      if (D instanceof Promise)
        s.push(D), i = !0;
      else {
        if (D.issues.length === 0)
          return D;
        s.push(D);
      }
    }
    return i ? Promise.all(s).then((c) => cu(c, r, e, o)) : cu(s, r, e, o);
  };
}), Vt = /* @__PURE__ */ d("$ZodIntersection", (e, u) => {
  $.init(e, u), e._zod.parse = (n, t) => {
    const r = n.value, o = u.left._zod.run({ value: r, issues: [] }, t), i = u.right._zod.run({ value: r, issues: [] }, t);
    return o instanceof Promise || i instanceof Promise ? Promise.all([o, i]).then(([c, D]) => au(n, c, D)) : au(n, o, i);
  };
});
function Me(e, u) {
  if (e === u)
    return { valid: !0, data: e };
  if (e instanceof Date && u instanceof Date && +e == +u)
    return { valid: !0, data: e };
  if (de(e) && de(u)) {
    const n = Object.keys(u), t = Object.keys(e).filter((o) => n.indexOf(o) !== -1), r = { ...e, ...u };
    for (const o of t) {
      const i = Me(e[o], u[o]);
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
      const r = e[t], o = u[t], i = Me(r, o);
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
function au(e, u, n) {
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
  if (o.length && r && e.issues.push({ ...r, keys: o }), ie(e))
    return e;
  const i = Me(u.value, n.value);
  if (!i.valid)
    throw new Error(`Unmergable intersection. Error path: ${JSON.stringify(i.mergeErrorPath)}`);
  return e.value = i.data, e;
}
const Lt = /* @__PURE__ */ d("$ZodEnum", (e, u) => {
  $.init(e, u);
  const n = Nu(u.entries), t = new Set(n);
  e._zod.values = t, e._zod.pattern = new RegExp(`^(${n.filter((r) => Un.has(typeof r)).map((r) => typeof r == "string" ? be(r) : r.toString()).join("|")})$`), e._zod.parse = (r, o) => {
    const i = r.value;
    return t.has(i) || r.issues.push({
      code: "invalid_value",
      values: n,
      input: i,
      inst: e
    }), r;
  };
}), Ut = /* @__PURE__ */ d("$ZodTransform", (e, u) => {
  $.init(e, u), e._zod.parse = (n, t) => {
    if (t.direction === "backward")
      throw new Ou(e.constructor.name);
    const r = u.transform(n.value, n);
    if (t.async)
      return (r instanceof Promise ? r : Promise.resolve(r)).then((i) => (n.value = i, n));
    if (r instanceof Promise)
      throw new se();
    return n.value = r, n;
  };
});
function Du(e, u) {
  return e.issues.length && u === void 0 ? { issues: [], value: void 0 } : e;
}
const qu = /* @__PURE__ */ d("$ZodOptional", (e, u) => {
  $.init(e, u), e._zod.optin = "optional", e._zod.optout = "optional", w(e._zod, "values", () => u.innerType._zod.values ? /* @__PURE__ */ new Set([...u.innerType._zod.values, void 0]) : void 0), w(e._zod, "pattern", () => {
    const n = u.innerType._zod.pattern;
    return n ? new RegExp(`^(${Xe(n.source)})?$`) : void 0;
  }), e._zod.parse = (n, t) => {
    if (u.innerType._zod.optin === "optional") {
      const r = u.innerType._zod.run(n, t);
      return r instanceof Promise ? r.then((o) => Du(o, n.value)) : Du(r, n.value);
    }
    return n.value === void 0 ? n : u.innerType._zod.run(n, t);
  };
}), Gt = /* @__PURE__ */ d("$ZodExactOptional", (e, u) => {
  qu.init(e, u), w(e._zod, "values", () => u.innerType._zod.values), w(e._zod, "pattern", () => u.innerType._zod.pattern), e._zod.parse = (n, t) => u.innerType._zod.run(n, t);
}), Wt = /* @__PURE__ */ d("$ZodNullable", (e, u) => {
  $.init(e, u), w(e._zod, "optin", () => u.innerType._zod.optin), w(e._zod, "optout", () => u.innerType._zod.optout), w(e._zod, "pattern", () => {
    const n = u.innerType._zod.pattern;
    return n ? new RegExp(`^(${Xe(n.source)}|null)$`) : void 0;
  }), w(e._zod, "values", () => u.innerType._zod.values ? /* @__PURE__ */ new Set([...u.innerType._zod.values, null]) : void 0), e._zod.parse = (n, t) => n.value === null ? n : u.innerType._zod.run(n, t);
}), qt = /* @__PURE__ */ d("$ZodDefault", (e, u) => {
  $.init(e, u), e._zod.optin = "optional", w(e._zod, "values", () => u.innerType._zod.values), e._zod.parse = (n, t) => {
    if (t.direction === "backward")
      return u.innerType._zod.run(n, t);
    if (n.value === void 0)
      return n.value = u.defaultValue, n;
    const r = u.innerType._zod.run(n, t);
    return r instanceof Promise ? r.then((o) => lu(o, u)) : lu(r, u);
  };
});
function lu(e, u) {
  return e.value === void 0 && (e.value = u.defaultValue), e;
}
const Ht = /* @__PURE__ */ d("$ZodPrefault", (e, u) => {
  $.init(e, u), e._zod.optin = "optional", w(e._zod, "values", () => u.innerType._zod.values), e._zod.parse = (n, t) => (t.direction === "backward" || n.value === void 0 && (n.value = u.defaultValue), u.innerType._zod.run(n, t));
}), Kt = /* @__PURE__ */ d("$ZodNonOptional", (e, u) => {
  $.init(e, u), w(e._zod, "values", () => {
    const n = u.innerType._zod.values;
    return n ? new Set([...n].filter((t) => t !== void 0)) : void 0;
  }), e._zod.parse = (n, t) => {
    const r = u.innerType._zod.run(n, t);
    return r instanceof Promise ? r.then((o) => fu(o, e)) : fu(r, e);
  };
});
function fu(e, u) {
  return !e.issues.length && e.value === void 0 && e.issues.push({
    code: "invalid_type",
    expected: "nonoptional",
    input: e.value,
    inst: u
  }), e;
}
const Yt = /* @__PURE__ */ d("$ZodCatch", (e, u) => {
  $.init(e, u), w(e._zod, "optin", () => u.innerType._zod.optin), w(e._zod, "optout", () => u.innerType._zod.optout), w(e._zod, "values", () => u.innerType._zod.values), e._zod.parse = (n, t) => {
    if (t.direction === "backward")
      return u.innerType._zod.run(n, t);
    const r = u.innerType._zod.run(n, t);
    return r instanceof Promise ? r.then((o) => (n.value = o.value, o.issues.length && (n.value = u.catchValue({
      ...n,
      error: {
        issues: o.issues.map((i) => ne(i, t, ue()))
      },
      input: n.value
    }), n.issues = []), n)) : (n.value = r.value, r.issues.length && (n.value = u.catchValue({
      ...n,
      error: {
        issues: r.issues.map((o) => ne(o, t, ue()))
      },
      input: n.value
    }), n.issues = []), n);
  };
}), Xt = /* @__PURE__ */ d("$ZodPipe", (e, u) => {
  $.init(e, u), w(e._zod, "values", () => u.in._zod.values), w(e._zod, "optin", () => u.in._zod.optin), w(e._zod, "optout", () => u.out._zod.optout), w(e._zod, "propValues", () => u.in._zod.propValues), e._zod.parse = (n, t) => {
    if (t.direction === "backward") {
      const o = u.out._zod.run(n, t);
      return o instanceof Promise ? o.then((i) => me(i, u.in, t)) : me(o, u.in, t);
    }
    const r = u.in._zod.run(n, t);
    return r instanceof Promise ? r.then((o) => me(o, u.out, t)) : me(r, u.out, t);
  };
});
function me(e, u, n) {
  return e.issues.length ? (e.aborted = !0, e) : u._zod.run({ value: e.value, issues: e.issues }, n);
}
const Qt = /* @__PURE__ */ d("$ZodReadonly", (e, u) => {
  $.init(e, u), w(e._zod, "propValues", () => u.innerType._zod.propValues), w(e._zod, "values", () => u.innerType._zod.values), w(e._zod, "optin", () => {
    var n, t;
    return (t = (n = u.innerType) == null ? void 0 : n._zod) == null ? void 0 : t.optin;
  }), w(e._zod, "optout", () => {
    var n, t;
    return (t = (n = u.innerType) == null ? void 0 : n._zod) == null ? void 0 : t.optout;
  }), e._zod.parse = (n, t) => {
    if (t.direction === "backward")
      return u.innerType._zod.run(n, t);
    const r = u.innerType._zod.run(n, t);
    return r instanceof Promise ? r.then(du) : du(r);
  };
});
function du(e) {
  return e.value = Object.freeze(e.value), e;
}
const er = /* @__PURE__ */ d("$ZodCustom", (e, u) => {
  x.init(e, u), $.init(e, u), e._zod.parse = (n, t) => n, e._zod.check = (n) => {
    const t = n.value, r = u.fn(t);
    if (r instanceof Promise)
      return r.then((o) => pu(o, n, t, e));
    pu(r, n, t, e);
  };
});
function pu(e, u, n, t) {
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
    t._zod.def.params && (r.params = t._zod.def.params), u.issues.push(pe(r));
  }
}
var hu;
class ur {
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
function nr() {
  return new ur();
}
(hu = globalThis).__zod_globalRegistry ?? (hu.__zod_globalRegistry = nr());
const De = globalThis.__zod_globalRegistry;
// @__NO_SIDE_EFFECTS__
function tr(e, u) {
  return new e({
    type: "string",
    format: "datetime",
    check: "string_format",
    offset: !1,
    local: !1,
    precision: null,
    ...b(u)
  });
}
// @__NO_SIDE_EFFECTS__
function rr(e, u) {
  return new e({
    type: "number",
    coerce: !0,
    checks: [],
    ...b(u)
  });
}
// @__NO_SIDE_EFFECTS__
function or(e, u) {
  return new e({
    type: "number",
    check: "number_format",
    abort: !1,
    format: "safeint",
    ...b(u)
  });
}
// @__NO_SIDE_EFFECTS__
function ir(e) {
  return new e({
    type: "unknown"
  });
}
// @__NO_SIDE_EFFECTS__
function sr(e, u) {
  return new e({
    type: "never",
    ...b(u)
  });
}
// @__NO_SIDE_EFFECTS__
function Cu(e, u) {
  return new Ju({
    check: "less_than",
    ...b(u),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function Ie(e, u) {
  return new Ju({
    check: "less_than",
    ...b(u),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function Fu(e, u) {
  return new Mu({
    check: "greater_than",
    ...b(u),
    value: e,
    inclusive: !1
  });
}
// @__NO_SIDE_EFFECTS__
function Te(e, u) {
  return new Mu({
    check: "greater_than",
    ...b(u),
    value: e,
    inclusive: !0
  });
}
// @__NO_SIDE_EFFECTS__
function Eu(e, u) {
  return new gt({
    check: "multiple_of",
    ...b(u),
    value: e
  });
}
// @__NO_SIDE_EFFECTS__
function Hu(e, u) {
  return new Bt({
    check: "max_length",
    ...b(u),
    maximum: e
  });
}
// @__NO_SIDE_EFFECTS__
function ve(e, u) {
  return new yt({
    check: "min_length",
    ...b(u),
    minimum: e
  });
}
// @__NO_SIDE_EFFECTS__
function Ku(e, u) {
  return new vt({
    check: "length_equals",
    ...b(u),
    length: e
  });
}
// @__NO_SIDE_EFFECTS__
function cr(e, u) {
  return new wt({
    check: "string_format",
    format: "regex",
    ...b(u),
    pattern: e
  });
}
// @__NO_SIDE_EFFECTS__
function ar(e) {
  return new bt({
    check: "string_format",
    format: "lowercase",
    ...b(e)
  });
}
// @__NO_SIDE_EFFECTS__
function Dr(e) {
  return new zt({
    check: "string_format",
    format: "uppercase",
    ...b(e)
  });
}
// @__NO_SIDE_EFFECTS__
function lr(e, u) {
  return new St({
    check: "string_format",
    format: "includes",
    ...b(u),
    includes: e
  });
}
// @__NO_SIDE_EFFECTS__
function fr(e, u) {
  return new kt({
    check: "string_format",
    format: "starts_with",
    ...b(u),
    prefix: e
  });
}
// @__NO_SIDE_EFFECTS__
function dr(e, u) {
  return new Ot({
    check: "string_format",
    format: "ends_with",
    ...b(u),
    suffix: e
  });
}
// @__NO_SIDE_EFFECTS__
function ce(e) {
  return new $t({
    check: "overwrite",
    tx: e
  });
}
// @__NO_SIDE_EFFECTS__
function pr(e) {
  return /* @__PURE__ */ ce((u) => u.normalize(e));
}
// @__NO_SIDE_EFFECTS__
function hr() {
  return /* @__PURE__ */ ce((e) => e.trim());
}
// @__NO_SIDE_EFFECTS__
function Cr() {
  return /* @__PURE__ */ ce((e) => e.toLowerCase());
}
// @__NO_SIDE_EFFECTS__
function Fr() {
  return /* @__PURE__ */ ce((e) => e.toUpperCase());
}
// @__NO_SIDE_EFFECTS__
function Er() {
  return /* @__PURE__ */ ce((e) => Vn(e));
}
// @__NO_SIDE_EFFECTS__
function Ar(e, u, n) {
  return new e({
    type: "array",
    element: u,
    // get element() {
    //   return element;
    // },
    ...b(n)
  });
}
// @__NO_SIDE_EFFECTS__
function mr(e, u, n) {
  return new e({
    type: "custom",
    check: "custom",
    fn: u,
    ...b(n)
  });
}
// @__NO_SIDE_EFFECTS__
function gr(e) {
  const u = /* @__PURE__ */ _r((n) => (n.addIssue = (t) => {
    if (typeof t == "string")
      n.issues.push(pe(t, n.value, u._zod.def));
    else {
      const r = t;
      r.fatal && (r.continue = !1), r.code ?? (r.code = "custom"), r.input ?? (r.input = n.value), r.inst ?? (r.inst = u), r.continue ?? (r.continue = !u._zod.def.abort), n.issues.push(pe(r));
    }
  }, e(n.value, n)));
  return u;
}
// @__NO_SIDE_EFFECTS__
function _r(e, u) {
  const n = new x({
    check: "custom",
    ...b(u)
  });
  return n._zod.check = e, n;
}
function Yu(e) {
  let u = (e == null ? void 0 : e.target) ?? "draft-2020-12";
  return u === "draft-4" && (u = "draft-04"), u === "draft-7" && (u = "draft-07"), {
    processors: e.processors ?? {},
    metadataRegistry: (e == null ? void 0 : e.metadata) ?? De,
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
function Z(e, u, n = { path: [], schemaPath: [] }) {
  var l, f;
  var t;
  const r = e._zod.def, o = u.seen.get(e);
  if (o)
    return o.count++, n.schemaPath.includes(e) && (o.cycle = n.path), o.schema;
  const i = { schema: {}, count: 1, cycle: void 0, path: n.path };
  u.seen.set(e, i);
  const s = (f = (l = e._zod).toJSONSchema) == null ? void 0 : f.call(l);
  if (s)
    i.schema = s;
  else {
    const F = {
      ...n,
      schemaPath: [...n.schemaPath, e],
      path: n.path
    };
    if (e._zod.processJSONSchema)
      e._zod.processJSONSchema(u, i.schema, F);
    else {
      const v = i.schema, p = u.processors[r.type];
      if (!p)
        throw new Error(`[toJSONSchema]: Non-representable type encountered: ${r.type}`);
      p(e, u, v, F);
    }
    const C = e._zod.parent;
    C && (i.ref || (i.ref = C), Z(C, u, F), u.seen.get(C).isParent = !0);
  }
  const c = u.metadataRegistry.get(e);
  return c && Object.assign(i.schema, c), u.io === "input" && j(e) && (delete i.schema.examples, delete i.schema.default), u.io === "input" && i.schema._prefault && ((t = i.schema).default ?? (t.default = i.schema._prefault)), delete i.schema._prefault, u.seen.get(e).schema;
}
function Xu(e, u) {
  var i, s, c, D;
  const n = e.seen.get(u);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const t = /* @__PURE__ */ new Map();
  for (const l of e.seen.entries()) {
    const f = (i = e.metadataRegistry.get(l[0])) == null ? void 0 : i.id;
    if (f) {
      const F = t.get(f);
      if (F && F !== l[0])
        throw new Error(`Duplicate schema id "${f}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);
      t.set(f, l[0]);
    }
  }
  const r = (l) => {
    var p;
    const f = e.target === "draft-2020-12" ? "$defs" : "definitions";
    if (e.external) {
      const A = (p = e.external.registry.get(l[0])) == null ? void 0 : p.id, h = e.external.uri ?? ((k) => k);
      if (A)
        return { ref: h(A) };
      const g = l[1].defId ?? l[1].schema.id ?? `schema${e.counter++}`;
      return l[1].defId = g, { defId: g, ref: `${h("__shared")}#/${f}/${g}` };
    }
    if (l[1] === n)
      return { ref: "#" };
    const C = `#/${f}/`, v = l[1].schema.id ?? `__schema${e.counter++}`;
    return { defId: v, ref: C + v };
  }, o = (l) => {
    if (l[1].schema.$ref)
      return;
    const f = l[1], { ref: F, defId: C } = r(l);
    f.def = { ...f.schema }, C && (f.defId = C);
    const v = f.schema;
    for (const p in v)
      delete v[p];
    v.$ref = F;
  };
  if (e.cycles === "throw")
    for (const l of e.seen.entries()) {
      const f = l[1];
      if (f.cycle)
        throw new Error(`Cycle detected: #/${(s = f.cycle) == null ? void 0 : s.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`);
    }
  for (const l of e.seen.entries()) {
    const f = l[1];
    if (u === l[0]) {
      o(l);
      continue;
    }
    if (e.external) {
      const C = (c = e.external.registry.get(l[0])) == null ? void 0 : c.id;
      if (u !== l[0] && C) {
        o(l);
        continue;
      }
    }
    if ((D = e.metadataRegistry.get(l[0])) == null ? void 0 : D.id) {
      o(l);
      continue;
    }
    if (f.cycle) {
      o(l);
      continue;
    }
    if (f.count > 1 && e.reused === "ref") {
      o(l);
      continue;
    }
  }
}
function Qu(e, u) {
  var i, s, c;
  const n = e.seen.get(u);
  if (!n)
    throw new Error("Unprocessed schema. This is a bug in Zod.");
  const t = (D) => {
    const l = e.seen.get(D);
    if (l.ref === null)
      return;
    const f = l.def ?? l.schema, F = { ...f }, C = l.ref;
    if (l.ref = null, C) {
      t(C);
      const p = e.seen.get(C), A = p.schema;
      if (A.$ref && (e.target === "draft-07" || e.target === "draft-04" || e.target === "openapi-3.0") ? (f.allOf = f.allOf ?? [], f.allOf.push(A)) : Object.assign(f, A), Object.assign(f, F), D._zod.parent === C)
        for (const g in f)
          g === "$ref" || g === "allOf" || g in F || delete f[g];
      if (A.$ref && p.def)
        for (const g in f)
          g === "$ref" || g === "allOf" || g in p.def && JSON.stringify(f[g]) === JSON.stringify(p.def[g]) && delete f[g];
    }
    const v = D._zod.parent;
    if (v && v !== C) {
      t(v);
      const p = e.seen.get(v);
      if (p != null && p.schema.$ref && (f.$ref = p.schema.$ref, p.def))
        for (const A in f)
          A === "$ref" || A === "allOf" || A in p.def && JSON.stringify(f[A]) === JSON.stringify(p.def[A]) && delete f[A];
    }
    e.override({
      zodSchema: D,
      jsonSchema: f,
      path: l.path ?? []
    });
  };
  for (const D of [...e.seen.entries()].reverse())
    t(D[0]);
  const r = {};
  if (e.target === "draft-2020-12" ? r.$schema = "https://json-schema.org/draft/2020-12/schema" : e.target === "draft-07" ? r.$schema = "http://json-schema.org/draft-07/schema#" : e.target === "draft-04" ? r.$schema = "http://json-schema.org/draft-04/schema#" : e.target, (i = e.external) != null && i.uri) {
    const D = (s = e.external.registry.get(u)) == null ? void 0 : s.id;
    if (!D)
      throw new Error("Schema is missing an `id` property");
    r.$id = e.external.uri(D);
  }
  Object.assign(r, n.def ?? n.schema);
  const o = ((c = e.external) == null ? void 0 : c.defs) ?? {};
  for (const D of e.seen.entries()) {
    const l = D[1];
    l.def && l.defId && (o[l.defId] = l.def);
  }
  e.external || Object.keys(o).length > 0 && (e.target === "draft-2020-12" ? r.$defs = o : r.definitions = o);
  try {
    const D = JSON.parse(JSON.stringify(r));
    return Object.defineProperty(D, "~standard", {
      value: {
        ...u["~standard"],
        jsonSchema: {
          input: we(u, "input", e.processors),
          output: we(u, "output", e.processors)
        }
      },
      enumerable: !1,
      writable: !1
    }), D;
  } catch {
    throw new Error("Error converting schema to JSON.");
  }
}
function j(e, u) {
  const n = u ?? { seen: /* @__PURE__ */ new Set() };
  if (n.seen.has(e))
    return !1;
  n.seen.add(e);
  const t = e._zod.def;
  if (t.type === "transform")
    return !0;
  if (t.type === "array")
    return j(t.element, n);
  if (t.type === "set")
    return j(t.valueType, n);
  if (t.type === "lazy")
    return j(t.getter(), n);
  if (t.type === "promise" || t.type === "optional" || t.type === "nonoptional" || t.type === "nullable" || t.type === "readonly" || t.type === "default" || t.type === "prefault")
    return j(t.innerType, n);
  if (t.type === "intersection")
    return j(t.left, n) || j(t.right, n);
  if (t.type === "record" || t.type === "map")
    return j(t.keyType, n) || j(t.valueType, n);
  if (t.type === "pipe")
    return j(t.in, n) || j(t.out, n);
  if (t.type === "object") {
    for (const r in t.shape)
      if (j(t.shape[r], n))
        return !0;
    return !1;
  }
  if (t.type === "union") {
    for (const r of t.options)
      if (j(r, n))
        return !0;
    return !1;
  }
  if (t.type === "tuple") {
    for (const r of t.items)
      if (j(r, n))
        return !0;
    return !!(t.rest && j(t.rest, n));
  }
  return !1;
}
const Br = (e, u = {}) => (n) => {
  const t = Yu({ ...n, processors: u });
  return Z(e, t), Xu(t, e), Qu(t, e);
}, we = (e, u, n = {}) => (t) => {
  const { libraryOptions: r, target: o } = t ?? {}, i = Yu({ ...r ?? {}, target: o, io: u, processors: n });
  return Z(e, i), Xu(i, e), Qu(i, e);
}, yr = {
  guid: "uuid",
  url: "uri",
  datetime: "date-time",
  json_string: "json-string",
  regex: ""
  // do not set
}, vr = (e, u, n, t) => {
  const r = n;
  r.type = "string";
  const { minimum: o, maximum: i, format: s, patterns: c, contentEncoding: D } = e._zod.bag;
  if (typeof o == "number" && (r.minLength = o), typeof i == "number" && (r.maxLength = i), s && (r.format = yr[s] ?? s, r.format === "" && delete r.format, s === "time" && delete r.format), D && (r.contentEncoding = D), c && c.size > 0) {
    const l = [...c];
    l.length === 1 ? r.pattern = l[0].source : l.length > 1 && (r.allOf = [
      ...l.map((f) => ({
        ...u.target === "draft-07" || u.target === "draft-04" || u.target === "openapi-3.0" ? { type: "string" } : {},
        pattern: f.source
      }))
    ]);
  }
}, wr = (e, u, n, t) => {
  const r = n, { minimum: o, maximum: i, format: s, multipleOf: c, exclusiveMaximum: D, exclusiveMinimum: l } = e._zod.bag;
  typeof s == "string" && s.includes("int") ? r.type = "integer" : r.type = "number", typeof l == "number" && (u.target === "draft-04" || u.target === "openapi-3.0" ? (r.minimum = l, r.exclusiveMinimum = !0) : r.exclusiveMinimum = l), typeof o == "number" && (r.minimum = o, typeof l == "number" && u.target !== "draft-04" && (l >= o ? delete r.minimum : delete r.exclusiveMinimum)), typeof D == "number" && (u.target === "draft-04" || u.target === "openapi-3.0" ? (r.maximum = D, r.exclusiveMaximum = !0) : r.exclusiveMaximum = D), typeof i == "number" && (r.maximum = i, typeof D == "number" && u.target !== "draft-04" && (D <= i ? delete r.maximum : delete r.exclusiveMaximum)), typeof c == "number" && (r.multipleOf = c);
}, br = (e, u, n, t) => {
  n.not = {};
}, zr = (e, u, n, t) => {
}, Sr = (e, u, n, t) => {
  const r = e._zod.def, o = Nu(r.entries);
  o.every((i) => typeof i == "number") && (n.type = "number"), o.every((i) => typeof i == "string") && (n.type = "string"), n.enum = o;
}, kr = (e, u, n, t) => {
  if (u.unrepresentable === "throw")
    throw new Error("Custom types cannot be represented in JSON Schema");
}, Or = (e, u, n, t) => {
  if (u.unrepresentable === "throw")
    throw new Error("Transforms cannot be represented in JSON Schema");
}, $r = (e, u, n, t) => {
  const r = n, o = e._zod.def, { minimum: i, maximum: s } = e._zod.bag;
  typeof i == "number" && (r.minItems = i), typeof s == "number" && (r.maxItems = s), r.type = "array", r.items = Z(o.element, u, { ...t, path: [...t.path, "items"] });
}, Nr = (e, u, n, t) => {
  var D;
  const r = n, o = e._zod.def;
  r.type = "object", r.properties = {};
  const i = o.shape;
  for (const l in i)
    r.properties[l] = Z(i[l], u, {
      ...t,
      path: [...t.path, "properties", l]
    });
  const s = new Set(Object.keys(i)), c = new Set([...s].filter((l) => {
    const f = o.shape[l]._zod;
    return u.io === "input" ? f.optin === void 0 : f.optout === void 0;
  }));
  c.size > 0 && (r.required = Array.from(c)), ((D = o.catchall) == null ? void 0 : D._zod.def.type) === "never" ? r.additionalProperties = !1 : o.catchall ? o.catchall && (r.additionalProperties = Z(o.catchall, u, {
    ...t,
    path: [...t.path, "additionalProperties"]
  })) : u.io === "output" && (r.additionalProperties = !1);
}, Pr = (e, u, n, t) => {
  const r = e._zod.def, o = r.inclusive === !1, i = r.options.map((s, c) => Z(s, u, {
    ...t,
    path: [...t.path, o ? "oneOf" : "anyOf", c]
  }));
  o ? n.oneOf = i : n.anyOf = i;
}, Ir = (e, u, n, t) => {
  const r = e._zod.def, o = Z(r.left, u, {
    ...t,
    path: [...t.path, "allOf", 0]
  }), i = Z(r.right, u, {
    ...t,
    path: [...t.path, "allOf", 1]
  }), s = (D) => "allOf" in D && Object.keys(D).length === 1, c = [
    ...s(o) ? o.allOf : [o],
    ...s(i) ? i.allOf : [i]
  ];
  n.allOf = c;
}, Tr = (e, u, n, t) => {
  const r = e._zod.def, o = Z(r.innerType, u, t), i = u.seen.get(e);
  u.target === "openapi-3.0" ? (i.ref = r.innerType, n.nullable = !0) : n.anyOf = [o, { type: "null" }];
}, Zr = (e, u, n, t) => {
  const r = e._zod.def;
  Z(r.innerType, u, t);
  const o = u.seen.get(e);
  o.ref = r.innerType;
}, jr = (e, u, n, t) => {
  const r = e._zod.def;
  Z(r.innerType, u, t);
  const o = u.seen.get(e);
  o.ref = r.innerType, n.default = JSON.parse(JSON.stringify(r.defaultValue));
}, Rr = (e, u, n, t) => {
  const r = e._zod.def;
  Z(r.innerType, u, t);
  const o = u.seen.get(e);
  o.ref = r.innerType, u.io === "input" && (n._prefault = JSON.parse(JSON.stringify(r.defaultValue)));
}, xr = (e, u, n, t) => {
  const r = e._zod.def;
  Z(r.innerType, u, t);
  const o = u.seen.get(e);
  o.ref = r.innerType;
  let i;
  try {
    i = r.catchValue(void 0);
  } catch {
    throw new Error("Dynamic catch values are not supported in JSON Schema");
  }
  n.default = i;
}, Jr = (e, u, n, t) => {
  const r = e._zod.def, o = u.io === "input" ? r.in._zod.def.type === "transform" ? r.out : r.in : r.out;
  Z(o, u, t);
  const i = u.seen.get(e);
  i.ref = o;
}, Mr = (e, u, n, t) => {
  const r = e._zod.def;
  Z(r.innerType, u, t);
  const o = u.seen.get(e);
  o.ref = r.innerType, n.readOnly = !0;
}, en = (e, u, n, t) => {
  const r = e._zod.def;
  Z(r.innerType, u, t);
  const o = u.seen.get(e);
  o.ref = r.innerType;
}, Vr = /* @__PURE__ */ d("ZodISODateTime", (e, u) => {
  It.init(e, u), oo.init(e, u);
});
function Lr(e) {
  return /* @__PURE__ */ tr(Vr, e);
}
const Ur = (e, u) => {
  ju.init(e, u), e.name = "ZodError", Object.defineProperties(e, {
    format: {
      value: (n) => nt(e, n)
      // enumerable: false,
    },
    flatten: {
      value: (n) => ut(e, n)
      // enumerable: false,
    },
    addIssue: {
      value: (n) => {
        e.issues.push(n), e.message = JSON.stringify(e.issues, Je, 2);
      }
      // enumerable: false,
    },
    addIssues: {
      value: (n) => {
        e.issues.push(...n), e.message = JSON.stringify(e.issues, Je, 2);
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
}, M = d("ZodError", Ur, {
  Parent: Error
}), Gr = /* @__PURE__ */ eu(M), Wr = /* @__PURE__ */ uu(M), qr = /* @__PURE__ */ ze(M), Hr = /* @__PURE__ */ Se(M), Kr = /* @__PURE__ */ ot(M), Yr = /* @__PURE__ */ it(M), Xr = /* @__PURE__ */ st(M), Qr = /* @__PURE__ */ ct(M), eo = /* @__PURE__ */ at(M), uo = /* @__PURE__ */ Dt(M), no = /* @__PURE__ */ lt(M), to = /* @__PURE__ */ ft(M), N = /* @__PURE__ */ d("ZodType", (e, u) => ($.init(e, u), Object.assign(e["~standard"], {
  jsonSchema: {
    input: we(e, "input"),
    output: we(e, "output")
  }
}), e.toJSONSchema = Br(e, {}), e.def = u, e.type = u.type, Object.defineProperty(e, "_def", { value: u }), e.check = (...n) => e.clone(H(u, {
  checks: [
    ...u.checks ?? [],
    ...n.map((t) => typeof t == "function" ? { _zod: { check: t, def: { check: "custom" }, onattach: [] } } : t)
  ]
}), {
  parent: !0
}), e.with = e.check, e.clone = (n, t) => K(e, n, t), e.brand = () => e, e.register = (n, t) => (n.add(e, t), e), e.parse = (n, t) => Gr(e, n, t, { callee: e.parse }), e.safeParse = (n, t) => qr(e, n, t), e.parseAsync = async (n, t) => Wr(e, n, t, { callee: e.parseAsync }), e.safeParseAsync = async (n, t) => Hr(e, n, t), e.spa = e.safeParseAsync, e.encode = (n, t) => Kr(e, n, t), e.decode = (n, t) => Yr(e, n, t), e.encodeAsync = async (n, t) => Xr(e, n, t), e.decodeAsync = async (n, t) => Qr(e, n, t), e.safeEncode = (n, t) => eo(e, n, t), e.safeDecode = (n, t) => uo(e, n, t), e.safeEncodeAsync = async (n, t) => no(e, n, t), e.safeDecodeAsync = async (n, t) => to(e, n, t), e.refine = (n, t) => e.check(To(n, t)), e.superRefine = (n) => e.check(Zo(n)), e.overwrite = (n) => e.check(/* @__PURE__ */ ce(n)), e.optional = () => gu(e), e.exactOptional = () => Bo(e), e.nullable = () => _u(e), e.nullish = () => gu(_u(e)), e.nonoptional = (n) => So(e, n), e.array = () => lo(e), e.or = (n) => Co([e, n]), e.and = (n) => Eo(e, n), e.transform = (n) => Bu(e, go(n)), e.default = (n) => wo(e, n), e.prefault = (n) => zo(e, n), e.catch = (n) => Oo(e, n), e.pipe = (n) => Bu(e, n), e.readonly = () => Po(e), e.describe = (n) => {
  const t = e.clone();
  return De.add(t, { description: n }), t;
}, Object.defineProperty(e, "description", {
  get() {
    var n;
    return (n = De.get(e)) == null ? void 0 : n.description;
  },
  configurable: !0
}), e.meta = (...n) => {
  if (n.length === 0)
    return De.get(e);
  const t = e.clone();
  return De.add(t, n[0]), t;
}, e.isOptional = () => e.safeParse(void 0).success, e.isNullable = () => e.safeParse(null).success, e.apply = (n) => n(e), e)), ro = /* @__PURE__ */ d("_ZodString", (e, u) => {
  Vu.init(e, u), N.init(e, u), e._zod.processJSONSchema = (t, r, o) => vr(e, t, r);
  const n = e._zod.bag;
  e.format = n.format ?? null, e.minLength = n.minimum ?? null, e.maxLength = n.maximum ?? null, e.regex = (...t) => e.check(/* @__PURE__ */ cr(...t)), e.includes = (...t) => e.check(/* @__PURE__ */ lr(...t)), e.startsWith = (...t) => e.check(/* @__PURE__ */ fr(...t)), e.endsWith = (...t) => e.check(/* @__PURE__ */ dr(...t)), e.min = (...t) => e.check(/* @__PURE__ */ ve(...t)), e.max = (...t) => e.check(/* @__PURE__ */ Hu(...t)), e.length = (...t) => e.check(/* @__PURE__ */ Ku(...t)), e.nonempty = (...t) => e.check(/* @__PURE__ */ ve(1, ...t)), e.lowercase = (t) => e.check(/* @__PURE__ */ ar(t)), e.uppercase = (t) => e.check(/* @__PURE__ */ Dr(t)), e.trim = () => e.check(/* @__PURE__ */ hr()), e.normalize = (...t) => e.check(/* @__PURE__ */ pr(...t)), e.toLowerCase = () => e.check(/* @__PURE__ */ Cr()), e.toUpperCase = () => e.check(/* @__PURE__ */ Fr()), e.slugify = () => e.check(/* @__PURE__ */ Er());
}), oo = /* @__PURE__ */ d("ZodStringFormat", (e, u) => {
  Lu.init(e, u), ro.init(e, u);
}), un = /* @__PURE__ */ d("ZodNumber", (e, u) => {
  Uu.init(e, u), N.init(e, u), e._zod.processJSONSchema = (t, r, o) => wr(e, t, r), e.gt = (t, r) => e.check(/* @__PURE__ */ Fu(t, r)), e.gte = (t, r) => e.check(/* @__PURE__ */ Te(t, r)), e.min = (t, r) => e.check(/* @__PURE__ */ Te(t, r)), e.lt = (t, r) => e.check(/* @__PURE__ */ Cu(t, r)), e.lte = (t, r) => e.check(/* @__PURE__ */ Ie(t, r)), e.max = (t, r) => e.check(/* @__PURE__ */ Ie(t, r)), e.int = (t) => e.check(Au(t)), e.safe = (t) => e.check(Au(t)), e.positive = (t) => e.check(/* @__PURE__ */ Fu(0, t)), e.nonnegative = (t) => e.check(/* @__PURE__ */ Te(0, t)), e.negative = (t) => e.check(/* @__PURE__ */ Cu(0, t)), e.nonpositive = (t) => e.check(/* @__PURE__ */ Ie(0, t)), e.multipleOf = (t, r) => e.check(/* @__PURE__ */ Eu(t, r)), e.step = (t, r) => e.check(/* @__PURE__ */ Eu(t, r)), e.finite = () => e;
  const n = e._zod.bag;
  e.minValue = Math.max(n.minimum ?? Number.NEGATIVE_INFINITY, n.exclusiveMinimum ?? Number.NEGATIVE_INFINITY) ?? null, e.maxValue = Math.min(n.maximum ?? Number.POSITIVE_INFINITY, n.exclusiveMaximum ?? Number.POSITIVE_INFINITY) ?? null, e.isInt = (n.format ?? "").includes("int") || Number.isSafeInteger(n.multipleOf ?? 0.5), e.isFinite = !0, e.format = n.format ?? null;
}), io = /* @__PURE__ */ d("ZodNumberFormat", (e, u) => {
  Tt.init(e, u), un.init(e, u);
});
function Au(e) {
  return /* @__PURE__ */ or(io, e);
}
const so = /* @__PURE__ */ d("ZodUnknown", (e, u) => {
  Zt.init(e, u), N.init(e, u), e._zod.processJSONSchema = (n, t, r) => zr();
});
function mu() {
  return /* @__PURE__ */ ir(so);
}
const co = /* @__PURE__ */ d("ZodNever", (e, u) => {
  jt.init(e, u), N.init(e, u), e._zod.processJSONSchema = (n, t, r) => br(e, n, t);
});
function ao(e) {
  return /* @__PURE__ */ sr(co, e);
}
const Do = /* @__PURE__ */ d("ZodArray", (e, u) => {
  Rt.init(e, u), N.init(e, u), e._zod.processJSONSchema = (n, t, r) => $r(e, n, t, r), e.element = u.element, e.min = (n, t) => e.check(/* @__PURE__ */ ve(n, t)), e.nonempty = (n) => e.check(/* @__PURE__ */ ve(1, n)), e.max = (n, t) => e.check(/* @__PURE__ */ Hu(n, t)), e.length = (n, t) => e.check(/* @__PURE__ */ Ku(n, t)), e.unwrap = () => e.element;
});
function lo(e, u) {
  return /* @__PURE__ */ Ar(Do, e, u);
}
const fo = /* @__PURE__ */ d("ZodObject", (e, u) => {
  Jt.init(e, u), N.init(e, u), e._zod.processJSONSchema = (n, t, r) => Nr(e, n, t, r), w(e, "shape", () => u.shape), e.keyof = () => Ao(Object.keys(e._zod.def.shape)), e.catchall = (n) => e.clone({ ...e._zod.def, catchall: n }), e.passthrough = () => e.clone({ ...e._zod.def, catchall: mu() }), e.loose = () => e.clone({ ...e._zod.def, catchall: mu() }), e.strict = () => e.clone({ ...e._zod.def, catchall: ao() }), e.strip = () => e.clone({ ...e._zod.def, catchall: void 0 }), e.extend = (n) => Kn(e, n), e.safeExtend = (n) => Yn(e, n), e.merge = (n) => Xn(e, n), e.pick = (n) => qn(e, n), e.omit = (n) => Hn(e, n), e.partial = (...n) => Qn(nn, e, n[0]), e.required = (...n) => et(tn, e, n[0]);
});
function po(e, u) {
  const n = {
    type: "object",
    shape: e ?? {},
    ...b(u)
  };
  return new fo(n);
}
const ho = /* @__PURE__ */ d("ZodUnion", (e, u) => {
  Mt.init(e, u), N.init(e, u), e._zod.processJSONSchema = (n, t, r) => Pr(e, n, t, r), e.options = u.options;
});
function Co(e, u) {
  return new ho({
    type: "union",
    options: e,
    ...b(u)
  });
}
const Fo = /* @__PURE__ */ d("ZodIntersection", (e, u) => {
  Vt.init(e, u), N.init(e, u), e._zod.processJSONSchema = (n, t, r) => Ir(e, n, t, r);
});
function Eo(e, u) {
  return new Fo({
    type: "intersection",
    left: e,
    right: u
  });
}
const Ve = /* @__PURE__ */ d("ZodEnum", (e, u) => {
  Lt.init(e, u), N.init(e, u), e._zod.processJSONSchema = (t, r, o) => Sr(e, t, r), e.enum = u.entries, e.options = Object.values(u.entries);
  const n = new Set(Object.keys(u.entries));
  e.extract = (t, r) => {
    const o = {};
    for (const i of t)
      if (n.has(i))
        o[i] = u.entries[i];
      else
        throw new Error(`Key ${i} not found in enum`);
    return new Ve({
      ...u,
      checks: [],
      ...b(r),
      entries: o
    });
  }, e.exclude = (t, r) => {
    const o = { ...u.entries };
    for (const i of t)
      if (n.has(i))
        delete o[i];
      else
        throw new Error(`Key ${i} not found in enum`);
    return new Ve({
      ...u,
      checks: [],
      ...b(r),
      entries: o
    });
  };
});
function Ao(e, u) {
  const n = Array.isArray(e) ? Object.fromEntries(e.map((t) => [t, t])) : e;
  return new Ve({
    type: "enum",
    entries: n,
    ...b(u)
  });
}
const mo = /* @__PURE__ */ d("ZodTransform", (e, u) => {
  Ut.init(e, u), N.init(e, u), e._zod.processJSONSchema = (n, t, r) => Or(e, n), e._zod.parse = (n, t) => {
    if (t.direction === "backward")
      throw new Ou(e.constructor.name);
    n.addIssue = (o) => {
      if (typeof o == "string")
        n.issues.push(pe(o, n.value, u));
      else {
        const i = o;
        i.fatal && (i.continue = !1), i.code ?? (i.code = "custom"), i.input ?? (i.input = n.value), i.inst ?? (i.inst = e), n.issues.push(pe(i));
      }
    };
    const r = u.transform(n.value, n);
    return r instanceof Promise ? r.then((o) => (n.value = o, n)) : (n.value = r, n);
  };
});
function go(e) {
  return new mo({
    type: "transform",
    transform: e
  });
}
const nn = /* @__PURE__ */ d("ZodOptional", (e, u) => {
  qu.init(e, u), N.init(e, u), e._zod.processJSONSchema = (n, t, r) => en(e, n, t, r), e.unwrap = () => e._zod.def.innerType;
});
function gu(e) {
  return new nn({
    type: "optional",
    innerType: e
  });
}
const _o = /* @__PURE__ */ d("ZodExactOptional", (e, u) => {
  Gt.init(e, u), N.init(e, u), e._zod.processJSONSchema = (n, t, r) => en(e, n, t, r), e.unwrap = () => e._zod.def.innerType;
});
function Bo(e) {
  return new _o({
    type: "optional",
    innerType: e
  });
}
const yo = /* @__PURE__ */ d("ZodNullable", (e, u) => {
  Wt.init(e, u), N.init(e, u), e._zod.processJSONSchema = (n, t, r) => Tr(e, n, t, r), e.unwrap = () => e._zod.def.innerType;
});
function _u(e) {
  return new yo({
    type: "nullable",
    innerType: e
  });
}
const vo = /* @__PURE__ */ d("ZodDefault", (e, u) => {
  qt.init(e, u), N.init(e, u), e._zod.processJSONSchema = (n, t, r) => jr(e, n, t, r), e.unwrap = () => e._zod.def.innerType, e.removeDefault = e.unwrap;
});
function wo(e, u) {
  return new vo({
    type: "default",
    innerType: e,
    get defaultValue() {
      return typeof u == "function" ? u() : Iu(u);
    }
  });
}
const bo = /* @__PURE__ */ d("ZodPrefault", (e, u) => {
  Ht.init(e, u), N.init(e, u), e._zod.processJSONSchema = (n, t, r) => Rr(e, n, t, r), e.unwrap = () => e._zod.def.innerType;
});
function zo(e, u) {
  return new bo({
    type: "prefault",
    innerType: e,
    get defaultValue() {
      return typeof u == "function" ? u() : Iu(u);
    }
  });
}
const tn = /* @__PURE__ */ d("ZodNonOptional", (e, u) => {
  Kt.init(e, u), N.init(e, u), e._zod.processJSONSchema = (n, t, r) => Zr(e, n, t, r), e.unwrap = () => e._zod.def.innerType;
});
function So(e, u) {
  return new tn({
    type: "nonoptional",
    innerType: e,
    ...b(u)
  });
}
const ko = /* @__PURE__ */ d("ZodCatch", (e, u) => {
  Yt.init(e, u), N.init(e, u), e._zod.processJSONSchema = (n, t, r) => xr(e, n, t, r), e.unwrap = () => e._zod.def.innerType, e.removeCatch = e.unwrap;
});
function Oo(e, u) {
  return new ko({
    type: "catch",
    innerType: e,
    catchValue: typeof u == "function" ? u : () => u
  });
}
const $o = /* @__PURE__ */ d("ZodPipe", (e, u) => {
  Xt.init(e, u), N.init(e, u), e._zod.processJSONSchema = (n, t, r) => Jr(e, n, t, r), e.in = u.in, e.out = u.out;
});
function Bu(e, u) {
  return new $o({
    type: "pipe",
    in: e,
    out: u
    // ...util.normalizeParams(params),
  });
}
const No = /* @__PURE__ */ d("ZodReadonly", (e, u) => {
  Qt.init(e, u), N.init(e, u), e._zod.processJSONSchema = (n, t, r) => Mr(e, n, t, r), e.unwrap = () => e._zod.def.innerType;
});
function Po(e) {
  return new No({
    type: "readonly",
    innerType: e
  });
}
const Io = /* @__PURE__ */ d("ZodCustom", (e, u) => {
  er.init(e, u), N.init(e, u), e._zod.processJSONSchema = (n, t, r) => kr(e, n);
});
function To(e, u = {}) {
  return /* @__PURE__ */ mr(Io, e, u);
}
function Zo(e) {
  return /* @__PURE__ */ gr(e);
}
function re(e) {
  return /* @__PURE__ */ rr(un, e);
}
const jo = po({
  waverider_id: re(),
  source_data_timestamp_utc: Lr(),
  latitude: re(),
  longitude: re(),
  significant_wave_height_m: re(),
  mean_period_s: re(),
  wave_power_kw_per_m: re()
}).loose().transform((e) => ({
  stationID: e.waverider_id,
  ts: new Date(e.source_data_timestamp_utc),
  lat: e.latitude,
  long: e.longitude,
  height: e.significant_wave_height_m,
  period: e.mean_period_s,
  wavePower: e.wave_power_kw_per_m
})), Ro = (e) => {
  const u = jo.safeParse(e);
  return u.success ? { success: !0, data: u.data, err: null } : (console.log("Data parsing error: ", u.error.message), { success: !1, data: null, err: u.error });
}, Le = () => {
  const e = vu.join(hn, "waverider.tmp"), u = [Cn, ":", Fn].join("");
  console.log(`main.ts >> cmmd = scp ${u} ${e}`);
  const n = setInterval(() => console.log("main.ts >> fetching data"), 1e3), t = an("scp", [u, e]);
  t.stderr.on("data", (r) => {
    console.error(r.toString()), clearInterval(n);
  }), t.on("close", (r) => {
    r === 0 ? oe.rename(e, Ze, (o) => {
      if (o) throw o;
      console.log("main.ts >> Data transfer complete");
    }) : console.error(`main.ts >> scp failed with code -- ${r}`), clearInterval(n);
  });
}, xo = () => {
  Jo(Ze);
  const e = oe.readFileSync(Ze, "utf-8"), u = JSON.parse(e);
  return Ro(u);
}, Jo = (e) => {
  const u = vu.dirname(e);
  console.log(`main.ts >> ensuring ${u} exists`), oe.existsSync(u) || oe.mkdirSync(u, { recursive: !0 }), oe.existsSync(e) || (oe.writeFileSync(e, JSON.stringify({}), "utf-8"), Le());
};
function Mo() {
  fe.handle("get-drive-data", xo);
}
const Ue = process.env.VITE_DEV_SERVER_URL, Qo = J.join(he, "dist-electron"), Vo = J.join(he, "dist");
process.env.VITE_PUBLIC = Ue ? J.join(he, "public") : Vo;
let V;
function rn() {
  V = new yu({
    kiosk: !0,
    webPreferences: {
      preload: J.join(ln, "preload.mjs")
    },
    width: 1024,
    height: 1366
  }), V.webContents.on("did-finish-load", () => {
    V == null || V.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Ue ? V.loadURL(Ue) : V.loadFile("./dist/index.html");
}
ee.on("window-all-closed", () => {
  process.platform !== "darwin" && (ee.quit(), V = null);
});
ee.on("activate", () => {
  yu.getAllWindows().length === 0 && rn();
});
ee.whenReady().then(() => {
  rn(), jn(Lo), Jn(), Le(), setInterval(Le, 1e3 * 60 * 60), Mo(), fe.handle("get-height-options", async () => Bn), fe.handle("get-period-options", async () => yn);
});
function Lo(e, ...u) {
  V && !V.isDestroyed() && V.webContents.send(e, ...u);
}
process.on("SIGINT", He);
process.on("SIGTERM", He);
ee.on("before-quit", He);
export {
  Qo as MAIN_DIST,
  Vo as RENDERER_DIST,
  Ue as VITE_DEV_SERVER_URL,
  Lo as safeSend
};
