import changePasswordModel from '../../../../model/client/changePassword.js';
import clientModel from '../../../../model/client/register.model.js';

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

class clientChangePassword {
    constructor () {
        this.changeModel = changePasswordModel;
        this.clientModel = clientModel;
    }

    async verifyAllTokens ()  {
        const verifyToken = await this.changeModel.find({token_discarded: false});

        verifyToken.forEach(async (tokens) => {
            if (new Date() >= tokens.token_expires_in)
            await this.changeModel.findOneAndUpdate({email: tokens.email}, {token_discarded: true});
        });
    }

    async verifyTokensForEmail (email) {
        const verify = await this.changeModel.find({email: email, token_discarded: false});

        if (verify.length >= 1)
        await this.changeModel.findOneAndUpdate({email: email}, {token_discarded: true});
    }

    async verifyClient (email) {
        const findClient = await this.clientModel.findOne({email: email, deleted_at: false});

        if (findClient === null)
        return false;

        return true, findClient;
    }

    async createToken (email) {
        const token = uuidv4();
        await this.changeModel.create({
            email: email,
            change_token: token,
            token_created_in: new Date(),
            token_expires_in: new Date().setHours(new Date().getHours() + 3),
            token_discarded: false,
        });
        return token;
    }   

    //changePassword
    async existToken (token) {
        const findToken = await this.changeModel.findOne({change_token: token, token_discarded: false});

        if (findToken === null)
        return false;

        return true, findToken;
    }

    async existUser (email) {
        const findClient = await this.clientModel.findOne({email: email, deleted_at: false});

        if (findClient === null)
        return false;

        return true, findClient;

    }

    async verifyPassword (password, hash) {
        return await bcrypt.compare(password, hash)
    }

    async changePassword (email, password, token) {
        await this.clientModel.findOneAndUpdate({email: email, deleted_at: false}, 
            {password: await bcrypt.hash(password, 10), last_update: new Date()});
        
        await this.changeModel.findOneAndUpdate({change_token: token}, {token_discarded: true});
    }
}

export default new clientChangePassword();