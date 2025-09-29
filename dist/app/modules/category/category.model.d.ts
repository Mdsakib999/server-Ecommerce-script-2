export interface ICategory {
    name: string;
}
declare const Category: import("mongoose").Model<ICategory, {}, {}, {}, import("mongoose").Document<unknown, {}, ICategory, {}, {}> & ICategory & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default Category;
//# sourceMappingURL=category.model.d.ts.map