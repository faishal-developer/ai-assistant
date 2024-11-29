"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderZodValidation = void 0;
const zod_1 = require("zod");
const createOrder = zod_1.z.object({
    body: zod_1.z.object({
        cow: zod_1.z.string({
            required_error: "Cow is required",
        }),
        buyer: zod_1.z.string({
            required_error: "Buyer is required",
        }),
    }),
});
exports.orderZodValidation = {
    createOrder,
};
