"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const nestjs_firebase_admin_1 = require("@aginix/nestjs-firebase-admin");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const main_module_1 = require("./main/main.module");
const admin = require("firebase-admin");
const core_1 = require("@nestjs/core");
const file_module_1 = require("./file/file.module");
const user_module_1 = require("./user/user.module");
const file_service_1 = require("./file/services/file.service");
const role_guard_1 = require("./global/guards/role.guard");
const user_service_1 = require("./user/user.service");
const file_record_schema_1 = require("./file/schemas/file-record.schema");
const user_schema_1 = require("./user/schemas/user.schema");
const routes = [
    {
        path: "api",
        module: main_module_1.MainModule
    }
];
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            nestjs_firebase_admin_1.FirebaseAdminModule.forRootAsync({
                useFactory: () => ({
                    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDS))
                })
            }),
            config_1.ConfigModule.forRoot(),
            core_1.RouterModule.register(routes),
            mongoose_1.MongooseModule.forRoot(process.env.DB_URI),
            mongoose_1.MongooseModule.forFeatureAsync([
                { name: file_record_schema_1.FileRecord.name, useFactory: () => file_record_schema_1.FileRecordSchema },
                { name: user_schema_1.User.name, useFactory: () => {
                        const schema = user_schema_1.UserSchema;
                        schema.plugin(require('mongoose-unique-validator'));
                        return schema;
                    },
                },
            ]),
            main_module_1.MainModule,
            user_module_1.UserModule,
            file_module_1.FileModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: role_guard_1.RoleGuard,
            },
            user_service_1.UserService,
            file_service_1.FileService,
        ],
        exports: [file_service_1.FileService, user_service_1.UserService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map