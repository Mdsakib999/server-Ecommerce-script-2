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
exports.authRoutes = void 0;
const passport_1 = __importDefault(require("passport"));
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const envConfig_1 = require("../../config/envConfig");
const router = (0, express_1.Router)();
router.post("/login", auth_controller_1.AuthController.credentialsLogin);
router.post("/refresh-token", auth_controller_1.AuthController.getNewAccessToken);
router.post("/logout", auth_controller_1.AuthController.logout);
router.get("/google", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const redirect = req.query.redirect || "/";
    passport_1.default.authenticate("google", {
        scope: ["profile", "email"],
        state: redirect,
    })(req, res, next);
}));
router.get("/google/callback", (req, res, next) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    passport_1.default.authenticate("google", (err, user, info) => {
        if (err) {
            return res.redirect(`${envConfig_1.envVariables.FRONTEND_URL}/login?error=Something went wrong`);
        }
        if (!user) {
            return res.redirect(`${envConfig_1.envVariables.FRONTEND_URL}/login?error=${encodeURIComponent((info === null || info === void 0 ? void 0 : info.message) || "Cannot login")}`);
        }
        req.user = user;
        return auth_controller_1.AuthController.googleCallbackController(req, res, next);
    })(req, res, next);
});
exports.authRoutes = router;
//# sourceMappingURL=auth.route.js.map