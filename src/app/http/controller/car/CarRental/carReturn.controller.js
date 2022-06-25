import repository from '../../../repository/car/CarRental/carReturn.repository.js';
import sharedRepository from '../../../repository/shared/sharedServices.repository.js';

class carReturn {

    async returnCar (req, res) {
        const {token, id} = req.params;
        const {password} = req.body;

        await sharedRepository.validateSession();

        const getEmail = await repository.verifyToken(token);
        if (! getEmail)
        return res.status(400).json({
            error: {
              status: 400,
               error: true,
               info: {
                 data: `Session invalid!`
              }
            }
        });

        const getUserInfo = await repository.verifyUser(getEmail);
        if (! getUserInfo)
        return res.status(400).json({
            error: {
               status: 400,
               error: true,
               info: {
                data: `User invalid!`
               } 
            }
        });
        
        const getCarInfo = await repository.verifyCarId(id);
        if (! getCarInfo)
        return res.status(400).json({
            error: {
               status: 400,
               error: true,
               info: {
                data: `car id Invalid!`
               } 
            }
        });

        if (getUserInfo.email != getCarInfo.reserved_by)
        return res.status(400).json({
            error: {
               status: 401,
               error: true,
               info: {
                data: `not authorized!`
               } 
            }
        });

        if (! await repository.validatePassword(password, getUserInfo.password))
        return res.status(400).json({
            error: {
               status: 400,
               error: true,
               info: {
                data: `password invalid`
               } 
            }
        });

        if (! await repository.validateDate(getCarInfo.license_plate))
        return res.status(400).json({
            error: {
               status: 400,
               error: true,
               info: {
                data: "you still have time to return the car, please return it at the correct time" ,
               } 
            }
        });

        if (await repository.devolution(getCarInfo.license_plate, getUserInfo.email))
        return res.status(200).json({
            success: {
                status: 200,
                error: false,
                info: {
                  data: "returned car",
                } 
            }
        });

        return res.status(500).json({
            error: {
                status: 500,
                error: true,
                info: {
                  data: "server error",
                } 
            }
        });
    }
}

export default new carReturn();