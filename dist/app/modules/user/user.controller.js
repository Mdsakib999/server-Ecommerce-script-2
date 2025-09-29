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
exports.UserControllers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_service_1 = require("./user.service");
const userToken_1 = require("../../utils/userToken");
const setCookie_1 = require("../../utils/setCookie");
const createUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_service_1.UserService.createUserService(req.body);
    const userTokens = yield (0, userToken_1.createUserToken)(user);
    (0, setCookie_1.setAuthCookie)(res, userTokens);
    res.status(201).json({
        success: true,
        data: user,
    });
}));
const updateUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const verifiedToken = req.user;
    const payload = req.body;
    const user = yield user_service_1.UserService.updateUserService(req, userId, payload, verifiedToken);
    res.status(200).json({
        success: true,
        message: "User Updated Successfully",
        data: user,
    });
}));
const getAllUsers = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield user_service_1.UserService.getAllUsersService(query);
    res.status(200).json({
        success: true,
        message: "All users retrieved Successfully",
        data: result.data,
        meta: result.meta,
    });
}));
const getMe = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const decodedToken = req.user;
    const result = yield user_service_1.UserService.getMe(decodedToken.userId);
    res.status(200).json({
        success: true,
        message: "Your profile Retrieved Successfully",
        data: result.data,
    });
}));
const getSingleUser = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.getSingleUser(id);
    res.status(200).json({
        success: true,
        message: "User Retrieved Successfully",
        data: result.data,
    });
}));
exports.UserControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    getMe,
};
//# sourceMappingURL=user.controller.js.map