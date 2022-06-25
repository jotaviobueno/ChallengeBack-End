import repository from '../../repository/car/registerCar.repository.js';
import sharedRepository from '../../repository/shared/sharedServices.repository.js';

class register {

    async registerCar (req, res) {
     const { token } = req.params;
     const { license_plate, car_brand, color, price_for_day, password } = req.body;

     await sharedRepository.validateSession();

     const userInformation = await repository.existUser(token);
     if (! userInformation)
      return res.status(400).json({
        error: {
           status: 400,
           error: true,
           info: {
            data: `session invalid or user invalid`
           } 
        }
      });

     if (! await userInformation.its_admin) 
      return res.status(400).json({
        error: {
           status: 400,
           error: true,
           info: {
            data: `you are not an admin`
           } 
        }
      });
   
     if (! await repository.validatePassword(password, userInformation.password))
      return res.status(400).json({
      error: {
         status: 400,
         error: true,
         info: {
          data: `password invalid`
         } 
      }
      });


     if (! await repository.existLicense(license_plate))
      return res.status(400).json({
        error: {
           status: 400,
           error: true,
           info: {
            data: `license_plate already registered`
           } 
        }
      });

     await repository.registerCar(userInformation.email, license_plate, car_brand, color, price_for_day)
      return res.status(200).json({
        success: {
           status: 200,
           error: false,
           info: {
            data: `car registered in the system`
           } 
        }
      });
   }
}

export default new register();