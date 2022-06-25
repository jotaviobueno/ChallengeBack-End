import carModel from '../../../model/car/registerCar.model.js';

class saveImageRepository {
    constructor () {
        this.model = carModel;
    }
    
    async upDate (id, file) {

        await this.model.findOneAndUpdate({_id: id}, {
            mimetype: file.mimetype,
            filename: file.filename,
            path: file.path,
            size: file.size
        })
    }
} 

export default new saveImageRepository();