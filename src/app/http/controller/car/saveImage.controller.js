import repository from '../../repository/car/saveImage.repository.js';
import sharedRepository from '../../repository/shared/sharedServices.repository.js';

class saveImage {
    
    async saveIMG (req, res) {
        const { id } = req.params;
        const file = req.file;

        await sharedRepository.validateSession();

        await repository.upDate(id, file);
        return res.status(200).json({
            success: {
               status: 200,
               error: false,
               info: {
                data: `registered photos`
               } 
            }
         });
    }
} 

export default new saveImage();