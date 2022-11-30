"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMention = exports.removeFirstUrl = exports.getFullDateAndTimeToDay = exports.splitChunks = exports.ToTimeStampGW = exports.ToISODateString = exports.genNickName = exports.genFullName = exports.ToTrim = exports.ToFullUrl = exports.ToNumber = exports.ToBoolean = void 0;
const s3_1 = require("./s3");
/** Transform 0/1 to true/false */
const ToBoolean = (param) => {
    if ((param === null || param === void 0 ? void 0 : param.value) === 1) {
        return true;
    }
    else if (param.value == 0) {
        return false;
    }
    return param.value;
};
exports.ToBoolean = ToBoolean;
/** Transform string to number */
const ToNumber = (param) => {
    const number = Number(param.value);
    if (isNaN(number)) {
        return 0;
    }
    return number;
};
exports.ToNumber = ToNumber;
/** Transform path to full location url */
const ToFullUrl = (param) => (0, s3_1.fullUrl)(param.value);
exports.ToFullUrl = ToFullUrl;
/** Transform to trim text */
const ToTrim = (param) => { var _a; return (_a = param === null || param === void 0 ? void 0 : param.value) === null || _a === void 0 ? void 0 : _a.trim(); };
exports.ToTrim = ToTrim;
const genFullName = (fn, mn, ln) => {
    const names = [fn];
    if (mn != null && mn != '') {
        names.push(mn);
    }
    names.push(ln);
    return names.join(' ');
};
exports.genFullName = genFullName;
const genNickName = (fn, ln) => {
    const names = [fn];
    names.push(ln);
    return names.join(' ');
};
exports.genNickName = genNickName;
/** Transform to ISO date string */
const ToISODateString = (param) => {
    if (param === null || param === void 0 ? void 0 : param.value) {
        const date = new Date(param.value);
        return date.toISOString();
    }
    return null;
};
exports.ToISODateString = ToISODateString;
/** Transform to timestamp GenWeb */
const ToTimeStampGW = (ts) => {
    const rpl = ts.replace('/Date(', '');
    const timestamp = rpl.split('+');
    const parseTimeToNumber = Number(timestamp[0]);
    if (!isNaN(parseTimeToNumber)) {
        return parseTimeToNumber;
    }
    return null;
};
exports.ToTimeStampGW = ToTimeStampGW;
const splitChunks = (source, size) => {
    const chunks = [];
    for (let i = 0; i < source.length; i += size) {
        chunks.push(source.slice(i, i + size));
    }
    return chunks;
};
exports.splitChunks = splitChunks;
const getFullDateAndTimeToDay = (timeParse) => {
    const today = timeParse ? timeParse : new Date();
    const date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    const month = today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : today.getMonth() + 1;
    const year = today.getFullYear();
    const hour = today.getHours() < 10 ? `0${today.getHours()}` : today.getHours();
    const minute = today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes();
    const second = today.getSeconds() < 10 ? `0${today.getSeconds()}` : today.getSeconds();
    const day = `${month}/${date}/${year}`;
    const time = `${hour}:${minute}:${second}`;
    return { day, time };
};
exports.getFullDateAndTimeToDay = getFullDateAndTimeToDay;
const removeFirstUrl = (text) => {
    const regex = new RegExp('((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)', 'g');
    const firstUrl = text.match(regex);
    if (firstUrl) {
        const newText = text.replace(firstUrl[0], '');
        if (firstUrl.length == 1 && newText.length == 0) {
            return ' ';
        }
        return newText;
    }
    else {
        return text;
    }
};
exports.removeFirstUrl = removeFirstUrl;
const removeMention = (text) => {
    const regex = new RegExp('@[A-Za-z0-9_.-]*', 'g');
    let newText = text;
    const mention = text.match(regex);
    if (mention && mention.length > 0) {
        for (let i = 0; i < mention.length; i++) {
            const textLength = mention[i].length;
            if (textLength >= 2 && textLength <= 33) {
                newText = newText.replace(mention[i], '');
            }
        }
        if (mention.length == 1 && newText.length == 0) {
            return ' ';
        }
    }
    return newText;
};
exports.removeMention = removeMention;
//# sourceMappingURL=utils.js.map