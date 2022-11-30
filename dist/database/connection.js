"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.execProc = exports.initProcs = exports.rawQuery = exports.database = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const class_transformer_1 = require("class-transformer");
const fs_1 = __importDefault(require("fs"));
const humps_1 = __importDefault(require("humps"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const logger_1 = require("../helpers/logger");
const MODULES_PATH = 'src/modules';
const SPROC_PATH = 'sprocs';
exports.database = null;
/** Execute raw query */
const rawQuery = (query, opts, Model) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield exports.database.query(query, {
        replacements: opts.replacements || [],
        type: sequelize_1.QueryTypes.SELECT,
        plain: opts.plain || false,
        transaction: opts.transaction,
    });
    return (0, class_transformer_1.plainToInstance)(Model, humps_1.default.camelizeKeys(res), {
        excludeExtraneousValues: true,
    });
});
exports.rawQuery = rawQuery;
/** Initialize all stored procedure */
const initProcs = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let total = 0;
        const folderPathArray = fs_1.default.readdirSync(MODULES_PATH);
        for (const folderPath of folderPathArray) {
            const dir = `${MODULES_PATH}/${folderPath}/${SPROC_PATH}`;
            if (fs_1.default.existsSync(dir)) {
                total += yield _execProcSqls(dir);
            }
        }
        logger_1.logger.info(`Init ${total} sprocs completed!`);
    }
    catch (err) {
        logger_1.logger.error(`Init stored procedure failed. ${err.message}.`);
        process.exit(1);
    }
});
exports.initProcs = initProcs;
const _execProcSqls = (dir) => __awaiter(void 0, void 0, void 0, function* () {
    const sqlFiles = fs_1.default.readdirSync(dir);
    let total = 0;
    for (const sql of sqlFiles) {
        const filePath = path_1.default.join(dir, sql);
        const rawSql = fs_1.default.readFileSync(filePath).toString();
        const spName = sql.replace('.sql', '');
        if (rawSql && rawSql !== '') {
            const spType = dir.includes('function') ? 'FUNCTION' : 'PROCEDURE';
            yield exports.database.query(`DROP ${spType} IF EXISTS ${spName}`, {
                logging: false,
            });
            yield exports.database.query(rawSql.toString(), { logging: false });
            total += 1;
        }
        else {
            throw Error(`${spName}.sql is empty or not existed.`);
        }
    }
    return total;
});
/** Execute store procedure */
const execProc = (Model, procName, opts) => __awaiter(void 0, void 0, void 0, function* () {
    const params = opts.replacements || [];
    const qs = [];
    for (let i = 0; i < params.length; i++) {
        qs.push('?');
    }
    const queryStr = `CALL ${procName}(${qs.join(',')})`;
    const [res] = yield exports.database.query(queryStr, {
        replacements: params,
        type: sequelize_1.QueryTypes.SELECT,
        transaction: opts.transaction,
    });
    const obj = [];
    for (const i in res) {
        obj.push(res[i]);
    }
    if (opts.plain) {
        //logger.info(JSON.stringify(obj[0]))
        return (0, class_transformer_1.plainToInstance)(Model, humps_1.default.camelizeKeys(obj[0]), {
            excludeExtraneousValues: true,
        });
    }
    //logger.info(JSON.stringify(obj))
    return (0, class_transformer_1.plainToInstance)(Model, humps_1.default.camelizeKeys(obj), {
        excludeExtraneousValues: true,
    });
});
exports.execProc = execProc;
//# sourceMappingURL=connection.js.map