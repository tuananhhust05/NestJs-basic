import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AccountType, ARole, User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose"
import { FirebaseAuthenticationService } from "@aginix/nestjs-firebase-admin";
import { ExcBadRequest, ExcIntError, ExcNotFound, ExcUnprEntity } from "src/global/models/exception.models";
import { CreateFirebaseUserDTO, CreateUserDTO, EditUserDTO } from "./user.dtos";
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';
import { isStringEmpty } from "src/global/helpers/utilities.helper";
import { Attempt, AttemptDocument } from "src/main/attempt/schemas/attempt.schema";

const nameConfig: Config = {
    dictionaries: [names, names],
    separator: ' ',
    length: 2,
    style: 'capital'
  };

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private auth$: FirebaseAuthenticationService
        ) {}

    async getUserByUserId(userId: string) {
        try {
            const _user = await this.userModel.findOne({userId: userId}).select("-_id, -__v");
            return _user;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async getUserById(id: string) {
        try {
            if (isStringEmpty(id)) throw ExcUnprEntity.queryExcFact("id");
            const _user = await this.userModel.findById(id);
            if (!_user) throw new ExcNotFound();
            return _user;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }
    async getPopulatedUser(id: string) {
        try {
            if (isStringEmpty(id)) throw ExcUnprEntity.queryExcFact("id");
            const _user = await this.userModel.findById(id).populate("attempt")
            if (!_user) throw new ExcNotFound();
            if (_user.attempt) {
                let isAttemptExpired = new Date(_user.attempt.endTime).getTime() < new Date().getTime() + 10000;
                if (isAttemptExpired) {
                    await this.userModel.findByIdAndUpdate(_user._id, {attempt: null});
                    _user.attempt = null;
                }
            }
            return _user;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async getAllUser() {
        try {
            return await this.userModel.find()
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async getUserFromToken(token) {
        try {
            const _fbUser = await this.auth$.verifyIdToken(token);
            
            const _user = await this.getUserByUserId(_fbUser.uid);
            if (_user) return _user;
            let providers = _fbUser.firebase.identities;
            let email = _fbUser.email;
            let type = AccountType.email;
            let fullname = uniqueNamesGenerator(nameConfig);
            if (providers['google.com']) {
                type = AccountType.google
                if (Array.isArray(providers['google.com'].email))
                    email = providers['google.com'].email[0];
                if ( _fbUser.name)
                    fullname = _fbUser.name
            }
            return await this.createUser({
                userId: _fbUser.uid,
                role: ARole.student,
                fullname: fullname,
                email: email,
                accountType: type
            })
        } catch (err) {
            console.log(err);
            throw new ExcUnprEntity(undefined, "Token không đúng");
        }
    }

    async createUser(dto: CreateUserDTO) {
        try {
            return await (new this.userModel(dto)).save()
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async editUser(dto: EditUserDTO) {
        try {
            dto.isFirst = false;
            const _user = await this.userModel.findByIdAndUpdate(dto._id, dto);
            if (!_user) throw new ExcNotFound();
            return await this.userModel.findById(_user._id);
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async deleteUser(id: string) {
        try {
            if (isStringEmpty(id)) throw ExcUnprEntity.queryExcFact("id");
            const _user = await this.userModel.findByIdAndDelete(id);
            if (!_user) throw new ExcNotFound();
            await this.auth$.deleteUser(_user.userId);
            return _user;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }

    async createFirebaseUser(dto: CreateFirebaseUserDTO) {
        try {
            if (isStringEmpty(dto.email)) throw ExcUnprEntity.fieldExcFact(".email");
            if (isStringEmpty(dto.password)) throw ExcUnprEntity.fieldExcFact(".password");
            if (isStringEmpty(dto.fullname)) throw ExcUnprEntity.fieldExcFact(".fullname");
            const _auth = await this.auth$.createUser({
                email: dto.email,
                password: dto.password,
                emailVerified: true
            })
            return await this.createUser({
                fullname: dto.fullname,
                email: dto.email,
                userId: _auth.uid,
                role: dto.role??ARole.student,
                accountType: AccountType.email,
            })
        } catch (err) {
            throw new ExcIntError(err);
        }
    }
    
    async changeUserPassword(uid:string, password:string) {
        try {
            await this.auth$.updateUser(uid, {password: password});
            return true;
        } catch (err) {
            throw new ExcIntError(err);
        }
    }
}