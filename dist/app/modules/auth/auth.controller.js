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
exports.AuthController = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const setCookie_1 = require("../../utils/setCookie");
const userToken_1 = require("../../utils/userToken");
const passport_1 = __importDefault(require("passport"));
const auth_service_1 = require("./auth.service");
const envConfig_1 = require("../../config/envConfig");
const credentialsLogin = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    passport_1.default.authenticate("local", (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                success: false,
                message: (info === null || info === void 0 ? void 0 : info.message) || "Authentication failed",
            });
        }
        (() => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const userTokens = yield (0, userToken_1.createUserToken)(user);
                (0, setCookie_1.setAuthCookie)(res, userTokens);
                return res.status(200).json({
                    success: true,
                    message: "User Logged In Successfully",
                    data: user,
                });
            }
            catch (error) {
                return next(error);
            }
        }))();
    })(req, res, next);
}));
const getNewAccessToken = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken || req.headers.authorization;
    if (!refreshToken) {
        throw new Error("No refresh token received from cookies");
    }
    const tokenInfo = yield auth_service_1.AuthServices.getNewAccessToken(refreshToken);
    (0, setCookie_1.setAuthCookie)(res, tokenInfo);
    res.status(200).json({
        success: true,
        message: "New Access Token Retrieved Successfully",
        data: tokenInfo,
    });
}));
const logout = (0, express_async_handler_1.default)((_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.status(200).json({
        success: true,
        message: "User Logged out Successfully",
        data: null,
    });
}));
const googleCallbackController = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let redirectTo = req.query.state ? req.query.state : "";
    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1);
    }
    const user = req.user;
    if (!user) {
        throw new Error("User Not Found");
    }
    const tokenInfo = (0, userToken_1.createUserToken)(user);
    (0, setCookie_1.setAuthCookie)(res, tokenInfo);
    res.redirect(`${envConfig_1.envVariables.FRONTEND_URL}/${redirectTo}?success=${"Logged in successfully"}`);
}));
exports.AuthController = {
    credentialsLogin,
    logout,
    getNewAccessToken,
    googleCallbackController,
};
//# sourceMappingURL=auth.controller.js.map