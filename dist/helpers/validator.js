"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseValidationError = void 0;
const class_transformer_1 = require("class-transformer");
const error_1 = require("./error");
const parseValidationError = (err) => {
    var _a, _b;
    const validationErrs = err;
    if (validationErrs.length == 0) {
        return err;
    }
    if (((_a = validationErrs[0]) === null || _a === void 0 ? void 0 : _a.contexts) != null) {
        const errValues = Object.values(validationErrs[0].contexts);
        if (errValues.length > 0) {
            const errResp = (0, class_transformer_1.plainToInstance)(error_1.ErrorResp, (0, class_transformer_1.instanceToPlain)(errValues[0]));
            if (errResp.message != null)
                return errResp;
        }
    }
    if (((_b = validationErrs[0]) === null || _b === void 0 ? void 0 : _b.constraints) != null) {
        const constraintValues = Object.values(validationErrs[0].constraints);
        if (constraintValues.length > 0) {
            return new error_1.ErrorResp(error_1.Errors.BadRequest.code, constraintValues[0], error_1.Errors.BadRequest.status);
        }
    }
    return error_1.Errors.BadRequest;
};
exports.parseValidationError = parseValidationError;
//# sourceMappingURL=validator.js.map