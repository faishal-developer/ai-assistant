"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.CowService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const cow_model_1 = require("./cow.model");
const ApiError_1 = __importDefault(require("../../errorHandler/ApiError"));
const commonFunction_1 = require("../../shared/commonFunction");
const utils_1 = require("../../utils/utils");
const cow_constant_1 = require("./cow.constant");
const user_model_1 = require("../user/user.model");
const createCow = (Cow) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Cow.seller;
    const user = yield user_model_1.User.findById({ _id: id });
    if ((user === null || user === void 0 ? void 0 : user.role) === 'buyer') {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Buyer can't sell a cow");
    }
    const result = yield cow_model_1.CowModel.create(Cow);
    return result;
});
const getAllCows = (queryData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { page, limit, sortBy, sortOrder, minPrice = 0, maxPrice = utils_1.maxNumber, location, searchTerm, } = queryData;
    const pagination = (0, commonFunction_1.calcSkip)(page, limit);
    //searching
    let query = {};
    //pricing
    query.price = { $gte: Number(minPrice), $lte: Number(maxPrice) };
    if (location) {
        query.location = location;
    }
    //searchTerm
    if (searchTerm) {
        query['$or'] = cow_constant_1.CowsSearchableFields.map((field) => ({
            [field]: {
                $regex: searchTerm,
                $options: "i",
            },
        }));
    }
    ;
    const sortCondition = {};
    if (sortBy) {
        sortCondition[sortBy] = (_a = sortOrder) !== null && _a !== void 0 ? _a : "asc";
    }
    const result = yield cow_model_1.CowModel.find(query)
        .sort(sortCondition)
        .skip(pagination.skip)
        .limit(pagination.limit);
    return result;
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.CowModel.findById({ _id: id });
    return result;
});
const updateCow = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield cow_model_1.CowModel.findById({ _id: id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cow not found !");
    }
    const result = yield cow_model_1.CowModel.findOneAndUpdate({ _id: id }, data, {
        new: true,
    });
    return result;
});
const deleteCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.CowModel.findByIdAndDelete({ _id: id });
    return result;
});
exports.CowService = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
