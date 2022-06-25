import loginModel from '../../../../model/client/login.model.js';
import clientModel from '../../../../model/client/register.model.js';
import carModel from '../../../../model/car/registerCar.model.js';
import rentModel from '../../../../model/car/rentCar.model.js';

import bcrypt from 'bcrypt';

class carReturnRepository {
    constructor () {
        this.loginModel = loginModel;
        this.clientModel = clientModel;
        this.carModel = carModel;
        this.rentModel = rentModel;
    }

    async verifyToken (token) {
      const findSession = await this.loginModel.findOne({session_token: token, disconnect: false});

      if (findSession === null)
      return false;

      return true, findSession.email;
    }

    async verifyUser (email) {
        const findClient= await this.clientModel.findOne({email: email, deleted_at: false});
  
        if (findClient === null)
        return false;
  
        return true, findClient;
    }

    async verifyCarId (id) {
        try {
            const findCar = await this.carModel.findOne({_id: id});

            if (findCar === null)
            return false;
    
            return true, findCar;
        } catch (e) {
            return false;
        }
    }

    async validatePassword (password, hash) {
        return await bcrypt.compare(password, hash);
    }

    async validateDate (license_plate) {
        const findPlate = await this.rentModel.findOne({rented_car: license_plate});
        
        if (findPlate.rented_until >= new Date())
        return false;

        return true;
    }

    async devolution (license_plate, email) {
        await this.carModel.findOneAndUpdate({reserved_by: email}, 
            {reserved_by: null, available: true, last_update: new Date()});

        await this.clientModel.findOneAndUpdate({email: email}, {last_update: new Date()});

        await this.rentModel.findOneAndRemove({rented_car: license_plate});

        return true;
    }
}

export default new carReturnRepository();