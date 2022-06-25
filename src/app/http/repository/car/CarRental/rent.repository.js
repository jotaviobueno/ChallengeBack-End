import carModel from '../../../../model/car/registerCar.model.js';
import clientModel from '../../../../model/client/register.model.js';
import loginModel from '../../../../model/client/login.model.js';
import rent from '../../../../model/car/rentCar.model.js';

import bcrypt from 'bcrypt';

class rentRepository {
    constructor () {
        this.carModel = carModel;
        this.clientModel = clientModel;
        this.loginModel = loginModel;
        this.rent = rent;
    }

    async verifyUser (token) {
      const findSession = await this.loginModel.findOne({session_token: token, disconnected: false});

      if (findSession === null)
      return false;

      const findUser = await this.clientModel.findOne({email: findSession.email, deleted_at: false});
      if (findUser != null)
      return true, findUser;

      return false;
    }

    async verifyId (id) {
      const findCar = await this.carModel.findOne({_id: id, deleted: false});
      
      if (findCar === null)
      return false;

      return true, findCar;
    }

    async verifyRentUser (userInfo) {
      if (await this.rent.findOne({rented_by: userInfo.email}) === null)
      return true; 

      return false;
    }

    async verifyRentCar (carInfo) {
      if ( await this.rent.findOne({rented_car: carInfo.license_plate}) === null )
      return true;

      return false;
    }

    async comparePassword (password, hash) {
        return await bcrypt.compare(password, hash);
    }

    async rental_registration (sum_days, date, UserInfo, CarInfo) {
        const totalPrice = (sum_days * CarInfo.price_for_day);

        await this.rent.create({
         rented_by: UserInfo.email,
         rented_car: CarInfo.license_plate,
         rented_in: new Date(),
         rented_until: date,
         total_price: totalPrice,
         CarSetting: {
         car_brand: CarInfo.car_brand,
         color: CarInfo.color,
         price_for_day: CarInfo.price_for_day
          }
        });

        await this.carModel.findOneAndUpdate({license_plate: CarInfo.license_plate}, 
            {available: false, last_update: new Date(), reserved_by: UserInfo.email});
        return totalPrice;
    }
}

export default new rentRepository();