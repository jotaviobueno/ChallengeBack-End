import model from '../../../model/car/registerCar.model.js';

class findsRepository {
    constructor () {
      this.model = model;
    }

    async findAvailable () {
        return this.model.find({ available: true }).select({
      created_by: 0,
      license_plate: 0,
      deleted: 0,
      last_update: 0,
      create_in: 0,
      __v: 0,
      reserved_by:0

        });
    }

    async findBrand (brand) {
     const findBrand = await this.model.find({car_brand: brand, available: true}).select({
      created_by: 0,
      license_plate: 0,
      deleted: 0,
      last_update: 0,
      create_in: 0,
      __v: 0,
      size: 0,
      reserved_by:0

    });
    
     if (findBrand.length >= 1)
     return findBrand;

     return "nothing";
    }
}

export default new findsRepository();