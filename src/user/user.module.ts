import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Attempt, AttemptSchema } from 'src/main/attempt/schemas/attempt.schema';
import { UserController } from './user.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Attempt.name, schema: AttemptSchema},
        ])
    ],
    controllers: [ UserController ]
})
export class UserModule {}
