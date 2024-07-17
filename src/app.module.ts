import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainModule } from './main/main.module';
import * as admin from 'firebase-admin'
import { APP_GUARD, RouterModule, Routes } from '@nestjs/core';
import { FileModule } from './file/file.module';
import { UserModule } from './user/user.module';
import { FileService } from './file/services/file.service';
import { RoleGuard } from './global/guards/role.guard';
import { UserService } from './user/user.service';
import { FileRecord, FileRecordSchema } from './file/schemas/file-record.schema';
import { User, UserSchema } from './user/schemas/user.schema';
import { Attempt, AttemptSchema } from './main/attempt/schemas/attempt.schema';

const routes: Routes = [
  {
    path: "api",
    module: MainModule
  }
]

@Global()
@Module({
  imports: [
    FirebaseAdminModule.forRootAsync({
      useFactory: () => ({
        credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDS) as admin.ServiceAccount)
      })
    }),
    ConfigModule.forRoot(),
    RouterModule.register(routes),
    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeatureAsync([
      { name: FileRecord.name, useFactory: () => FileRecordSchema},
      { name: User.name, useFactory: () => {
          const schema = UserSchema;
          schema.plugin(require('mongoose-unique-validator'));
          return schema;
        },
      },
    ]),
    MainModule,
    UserModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    UserService,
    FileService,
  ],
  exports: [FileService, UserService ]
})
export class AppModule {}
