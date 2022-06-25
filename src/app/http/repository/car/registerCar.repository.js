import model from '../../../model/car/registerCar.model.js';
import loginModel from '../../../model/client/login.model.js';
import ClientModel from '../../../model/client/register.model.js';

import bcrypt from 'bcrypt';

class registerCarRepository {
    constructor () {
        this.model = model;
        this.loginModel = loginModel;
        this.modelClient = ClientModel;
    }

    async existUser (token) {
     const findSession = await this.loginModel.findOne({session_token: token, disconnected: false});
     if (findSession === null)
     return false;

     const findClient = await this.modelClient.findOne({email: findSession.email, deleted_at: false});
     if (findClient != null)
     return findClient;

     return false;
    }

    async validatePassword (password, hash) {
        return await bcrypt.compare(password, hash)
    }

    async existLicense (license_plate) {
     const findLicense = await this.model.findOne({license_plate: license_plate});

     if (findLicense === null)
     return true;

     return false;
    }

    async registerCar (email, license_plate, car_brand, color, price_for_day) {

     await this.model.create({
          created_by: email,
          reserved_by: null,
          license_plate: license_plate,
          car_brand: car_brand,
          color: color,
          available: true,
          price_for_day: price_for_day,
          deleted: false,
          last_update: null,
          create_in: new Date(),
            
          mimetype: null,
          filename: null,
          path: null,
          size: null
      });
    }
}

export default new registerCarRepository();