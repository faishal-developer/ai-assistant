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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errorHandler/ApiError"));
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const orders_model_1 = require("./orders.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createOrder = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const buyer = yield user_model_1.User.findById({ _id: order.buyer });
    const cow = yield cow_model_1.CowModel.findById({ _id: order.cow });
    if (buyer && cow && (buyer === null || buyer === void 0 ? void 0 : buyer.budget) < (cow === null || cow === void 0 ? void 0 : cow.price)) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Buyer has not enough money");
        return null;
    }
    else if (!buyer || !cow) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Buyer or Cow does not exist");
        return null;
    }
    else if (cow.label === "sold out") {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Cows allready sold out");
        return null;
    }
    let newOrder;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const options = { session };
        const newCow = yield cow_model_1.CowModel.findOneAndUpdate({ _id: order.cow }, { label: "sold out" }, Object.assign({ new: true }, options));
        if (!newCow) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Cow not found");
        }
        const newBuyer = yield user_model_1.User.findOneAndUpdate({ _id: order.buyer }, { budget: buyer.budget - cow.price }, Object.assign({ new: true }, options));
        if (!newBuyer) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Buyer not found");
        }
        const newSeller = yield user_model_1.User.findOneAndUpdate({ _id: cow.seller }, {
            $inc: {
                income: cow.price,
            },
        }, Object.assign({ new: true }, options));
        if (!newSeller) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Seller not found");
        }
        const newOrders = yield orders_model_1.OrderModel.create([order], options);
        newOrder = newOrders[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    return newOrder;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.OrderModel.find({});
    return result;
});
const getSingleOrder = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.OrderModel.findOne({ _id: id })
        .populate("buyer")
        .populate({
        path: "cow",
        populate: "seller",
    });
    console.log("result", result);
    return result;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrder,
};
