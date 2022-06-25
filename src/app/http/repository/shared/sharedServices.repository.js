import clientModel from '../../../model/client/register.model.js';
import loginModel from '../../../model/client/login.model.js';

class sharedServices {
  constructor () {
    this.model = clientModel;
    this.loginModel = loginModel;
  }

  async existUser (email) {
    const user = await this.model.findOne({email: email, deleted_at: false});

    if (user === null)
    return true;

    return false;
  }

  async validateSession () {
    const findLogin = await this.loginModel.find({ disconnected: false });

    if (findLogin.length != 0) {

      findLogin.forEach(async (session) => {
        await this.loginModel.findOneAndUpdate({email: session.email}, {disconnected: true, last_update: new Date()});
      });
    }
  }
  
  async existUserSession (token) {
    const findSession = await this.loginModel.findOne({session_token: token, disconnected: false});

    if (findSession === null)
    return false;

    const findUser = await this.model.findOne({email: findSession.email, deleted_at: false});

    if (findUser === null)
    return false;

    return true, findUser;
  }
}

export default new sharedServices();