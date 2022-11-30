"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = exports.ResponseWrapper = void 0;
class ResponseWrapper {
    constructor(data, error = null, pagination = null) {
        this.data = data;
        this.error = error;
        this.pagination = pagination;
    }
}
exports.ResponseWrapper = ResponseWrapper;
class Pagination {
    constructor(page = 1, limit = 10, total) {
        this.getOffset = () => {
            return (this.page - 1) * this.limit;
        };
        this.page = page;
        this.limit = limit;
        this.total = total;
    }
}
exports.Pagination = Pagination;
Pagination.fromReq = (req) => {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    return new Pagination(isNaN(page) ? 1 : page, isNaN(limit) ? 10 : limit);
};
//# sourceMappingURL=response.wrapper.js.map