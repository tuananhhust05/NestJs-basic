"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSchema = exports.Test = exports.TestStatusEnum = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
var TestStatusEnum;
(function (TestStatusEnum) {
    TestStatusEnum[TestStatusEnum["pending"] = 0] = "pending";
    TestStatusEnum[TestStatusEnum["open"] = 1] = "open";
    TestStatusEnum[TestStatusEnum["closed"] = -1] = "closed";
})(TestStatusEnum = exports.TestStatusEnum || (exports.TestStatusEnum = {}));
let Test = class Test {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "Subject" }),
    __metadata("design:type", Object)
], Test.prototype, "subject", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, required: true, ref: "SubjectType" }),
    __metadata("design:type", Object)
], Test.prototype, "subjectType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Test.prototype, "testFormality", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 0, required: false }),
    __metadata("design:type", Number)
], Test.prototype, "attendanceCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Test.prototype, "testDuration", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Test.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Test.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)([{ type: mongoose.Schema.Types.ObjectId, ref: "Question", default: [] }]),
    __metadata("design:type", Array)
], Test.prototype, "questions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: TestStatusEnum.pending }),
    __metadata("design:type", Number)
], Test.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: Date.now }),
    __metadata("design:type", Date)
], Test.prototype, "timestamp", void 0);
Test = __decorate([
    (0, mongoose_1.Schema)({ collection: "tests" })
], Test);
exports.Test = Test;
exports.TestSchema = mongoose_1.SchemaFactory.createForClass(Test);
//# sourceMappingURL=test.schema.js.map