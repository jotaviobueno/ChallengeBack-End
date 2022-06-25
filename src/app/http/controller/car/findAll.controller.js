import repository from '../../repository/car/findAll.repository.js';
import sharedRepository from '../../repository/shared/sharedServices.repository.js';


class finds {   

    async findByAvailable (req, res) {
      await sharedRepository.validateSession();

        return res.status(200).json({
         success: {
               status: 200,
               error: false,
               info: {
                data: await repository.findAvailable()
               } 
            }
         }); 
    }

    async findByBrand (req, res) {
     const { brand } = req.body;
     const find = await repository.findBrand(brand)
     
     await sharedRepository.validateSession();

     if (find != "nothing")
     return res.status(200).json({
        success: {
           status: 200,
           error: false,
           info: {
            data: find
           } 
         }
     });

     return res.status(400).json({
        error: {
           status: 400,
           error: true,
           info: {
            data: "nothing found"
           } 
        }
     });
    }
}

export default new finds();