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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const user_model_1 = require("../modules/user/user.model");
const jwt_1 = require("../utils/jwt");
const envConfig_1 = require("../config/envConfig");
const checkAuth = (...authRoles) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = req.headers.authorization || req.cookies.accessToken;
        if (!accessToken) {
            throw new Error("No Token Received");
        }
        const verifiedToken = (0, jwt_1.verifyToken)(accessToken, envConfig_1.envVariables.JWT_ACCESS_SECRET);
        const isUserExist = yield user_model_1.User.findOne({ email: verifiedToken.email });
        if (!isUserExist) {
            throw new Error("User does not exist");
        }
        if (isUserExist && isUserExist.isBanned) {
            throw new Error("You're banned! please contact support");
        }
        if (!authRoles.includes(verifiedToken.role)) {
            throw new Error("You are not authorized to access this route!");
        }
        req.user = verifiedToken;
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.checkAuth = checkAuth;
//# sourceMappingURL=checkAuth.js.map