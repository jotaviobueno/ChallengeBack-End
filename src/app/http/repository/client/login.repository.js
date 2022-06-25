import loginModel from '../../../model/client/login.model.js';
import ClientModel from '../../../model/client/register.model.js';

import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

class loginRepository {
    constructor () {
     this.model = loginModel;
     this.clientModel = ClientModel;
    }

    async validateSession (email) {
        const findLogin = await this.model.find({ email: email, disconnected: false });

        if (findLogin.length >= 1) {
            await this.model.updateMany({ disconnected: true, last_update: new Date() });
        }
    }

    async comparePassword (email, password) {
     const findClient = await this.clientModel.findOne({ email: email, deleted_at: false });

     return await bcrypt.compare(password, findClient.password);
    }

    async createSession (email) {
     const token = uuidv4()
     await this.model.create({
        email: email,
        session_token: token,
        jwt: null,
        expires_in: new Date().setHours(new Date().getHours() + 6),
        login_date: new Date(),
        disconnected: false,
        last_update: null,
     });
     return token;
    }
}

export default new loginRepository();