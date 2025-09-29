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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = require("./user.model");
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const user_interface_1 = require("./user.interface");
const uploadToCloudinary_1 = require("../../utils/uploadToCloudinary");
const createUserService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload, rest = __rest(payload, ["email", "password"]);
    const isUserExists = yield user_model_1.User.findOne({ email }).lean();
    if (isUserExists) {
        throw new Error("User Already Exists");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, Number(envConfig_1.envVariables.BCRYPT_SALT_ROUNDS));
    const authProvider = {
        provider: "credentials",
        providerId: email,
    };
    const user = yield user_model_1.User.create(Object.assign({ email, password: hashedPassword, auths: [authProvider] }, rest));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _a = user.toObject(), { password: exceptPassword } = _a, remaining = __rest(_a, ["password"]);
    return remaining;
});
const envConfig_1 = require("../../config/envConfig");
const updateUserService = (req, userId, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    if (decodedToken.role === user_interface_1.Role.CUSTOMER) {
        if (userId !== decodedToken.userId) {
            throw new Error("You are not authorized");
        }
    }
    if (req.file) {
        const result = yield (0, uploadToCloudinary_1.uploadToCloudinary)(req.file.buffer, "myFolder");
        payload.picture = result.url;
    }
    const ifUserExist = yield user_model_1.User.findById(userId);
    if (!ifUserExist) {
        throw new Error("User Not Found");
    }
    if (payload.role) {
        if (decodedToken.role === user_interface_1.Role.CUSTOMER) {
            throw new Error("You are not authorized");
        }
    }
    const newUpdatedUser = yield user_model_1.User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });
    return newUpdatedUser;
});
const getAllUsersService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(user_model_1.User.find(), query);
    const userSearchableFields = ["name", "email", "address"];
    const usersData = queryBuilder
        .filter()
        .search(userSearchableFields)
        .sort()
        .fields()
        .paginate();
    const [data, meta] = yield Promise.all([
        usersData.build(),
        queryBuilder.getMeta(),
    ]);
    return {
        data,
        meta,
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id).select("-password");
    return {
        data: user,
    };
});
const getMe = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId)
        .select("-password")
        .populate("orders");
    return {
        data: user,
    };
});
exports.UserService = {
    createUserService,
    getAllUsersService,
    getSingleUser,
    getMe,
    updateUserService,
};
//# sourceMappingURL=user.service.js.map