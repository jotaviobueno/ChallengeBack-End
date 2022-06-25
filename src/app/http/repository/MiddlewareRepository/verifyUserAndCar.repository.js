import carModel from '../../../model/car/registerCar.model.js';

class verifyRepository { 
    constructor () {
        this.model = carModel;
    }
    
    async  validateId (id) {
        const findCar = await this.model.findOne({_id: id, deleted_at: false});

        if (findCar === null)
        return false;

        return true, findCar;
    }
}

export default new verifyRepository();