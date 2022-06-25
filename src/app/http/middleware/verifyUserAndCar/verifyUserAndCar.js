import sharedRepository from '../../repository/shared/sharedServices.repository.js';
import repository from '../../repository/MiddlewareRepository/verifyUserAndCar.repository.js';

class verify {

    async verifyUser (req, res, next) {
      const { token, id } = req.params;

      const getUserInformation = await sharedRepository.existUserSession(token);
      if (! getUserInformation)
      return res.status(400).json({
        error: {
           status: 400,
           error: true,
           info: {
            data: `session invalid`
           } 
        }
     });

     if ( getUserInformation.its_admin === false)
     return res.status(400).json({
      error: {
         status: 400,
         error: true,
         info: {
          data: `you are not an admin`
         } 
       }
     }); 

     const getCarInformationCar = await repository.validateId(id);
     if (! getCarInformationCar)
     return res.status(400).json({
        error: {
           status: 400,
           error: true,
           info: {
            data: `car id invalid`
           } 
        }
     });

     if (getCarInformationCar.filename != null) 
     return res.status(400).json({
      error: {
         status: 400,
         error: true,
         info: {
          data: `this car already has a registered image`
          } 
         }
      });

      if ( getCarInformationCar.filename === null ) {
         return next();
      }

      return res.status(400).json({
        error: {
           status: 400,
           error: true,
           info: {
            data: `you have already registered an image`
           } 
        }
     });
    }
}

export default new verify();