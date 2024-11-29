"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowsZodValidataion = void 0;
const zod_1 = require("zod");
const cow_constant_1 = require("./cow.constant");
const createCow = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        age: zod_1.z.number({
            required_error: "Age is required",
        }),
        price: zod_1.z.number({
            required_error: "Price is required",
        }),
        location: zod_1.z.enum([...cow_constant_1.location], {
            required_error: "Location is required",
        }),
        breed: zod_1.z.enum([...cow_constant_1.breed], {
            required_error: "Breed is required",
        }),
        label: zod_1.z.enum([...cow_constant_1.level], {
            required_error: "Level is required",
        }),
        category: zod_1.z.enum([...cow_constant_1.category], {
            required_error: "Level is required",
        }),
        weight: zod_1.z.number({
            required_error: "Weight is required",
        }),
        seller: zod_1.z.string({
            required_error: "Seller is required",
        }),
    }),
});
const updateCow = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z.enum([...cow_constant_1.location]).optional(),
        breed: zod_1.z.enum([...cow_constant_1.breed]).optional(),
        label: zod_1.z.enum([...cow_constant_1.level]).optional(),
        category: zod_1.z.enum([...cow_constant_1.category]).optional(),
        weight: zod_1.z.number().optional(),
        seller: zod_1.z.string().optional(),
    }),
});
exports.cowsZodValidataion = {
    createCow,
    updateCow
};
