"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInventory = exports.getAllInventories = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const getAllInventories = async () => {
    return await prisma_1.default.inventory.findMany({
        include: {
            owner: true,
            tags: true
        },
    });
};
exports.getAllInventories = getAllInventories;
const createInventory = async (data) => {
    return prisma_1.default.inventory.create({ data });
};
exports.createInventory = createInventory;
