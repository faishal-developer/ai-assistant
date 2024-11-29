"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalModel = void 0;
const mongoose_1 = require("mongoose");
const ProfessionalSchema = new mongoose_1.Schema({
    type: {
        type: String,
    },
    org_id: {
        type: String,
    },
    business: {
        type: String,
    },
    name: {
        type: String,
    },
    ranking: {
        type: Number,
    },
    photo: {
        type: String,
    },
    category: {
        type: String,
    },
    sub_category: {
        type: [String],
    },
    rating: {
        type: Number,
    },
    total_appointment: {
        type: Number,
    },
    zone: {
        type: [String],
    },
    branch: {
        type: [String],
    },
    area: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.ProfessionalModel = (0, mongoose_1.model)("Professional", ProfessionalSchema);
