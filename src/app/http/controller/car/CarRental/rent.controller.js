import repository from '../../../repository/car/CarRental/rent.repository.js';
import sharedRepository from '../../../repository/shared/sharedServices.repository.js';

class rentController {

    async rentCar (req, res) {
        const {token, id} = req.params;
        const {days, password} = req.body;
        const day = new Date(days);

        const n1 = new Date().getDate();
        const n2 = day.getDate();
        const sum_days = (n2 - n1);

        await sharedRepository.validateSession();

        if (day <= new Date())
        return res.status(400).json({
            error: {
               status: 400,
               error: true,
               info: {
                data: `data invalid`
               } 
            }
        });
        
        const verifySession = await repository.verifyUser(token);
        if (! verifySession)
        return res.status(400).json({
            error: {
               status: 400,
               error: true,
               info: {
                data: `session invalid or user invalid`
               } 
            }
        });

        const verifyId = await repository.verifyId(id);
        if (! verifyId)
        return res.status(400).json({
            error: {
               status: 400,
               error: true,
               info: {
                data: `car id its invalid`
               } 
            }
        });

        if (! await repository.verifyRentCar(verifyId))
        return res.status(400).json({
            error: {
               status: 400,
               error: true,
               info: {
                data: `car already rented`
               } 
            }
        });

        if (! await repository.verifyRentUser(verifySession))
        return res.status(400).json({
            error: {
               status: 400,
               error: true,
               info: {
                data: `do you already have a rental car`
               } 
            }
        });

        if (! await repository.comparePassword(password, verifySession.password))
        return res.status(400).json({
          error: {
           status: 400,
           error: true,
           info: {
            data: `password its invalid`
           } 
          }
        });

        const getTotalPrice = await repository.rental_registration(sum_days, day, verifySession, verifyId);
        return res.status(200).json({
         success: {
           status: 200,
           error: false,
           info: {
            data: `the, registered car for you to rent. pass one of our sharpeners and get it`,
            total_price: `R$ ${getTotalPrice},00` 
           } 
          }
        });
    }
}

export default new rentController();