import model from '../../../model/client/register.model.js';

import bcrypt from 'bcrypt';

class registerRepository {
  constructor () {
    this.model = model;
  }
  async registerClient (full_name, email, password) {
    await this.model.create({
      full_name: full_name,
      email: email,
      password: await bcrypt.hash(password, 10),
      license_plate: null,
      car_color: null,
      car_brand: null,
      rented_something: [null],
      its_admin: false,
      created_in: new Date(),
      deleted_at: false,
      last_update: null,
    });
  }
}

export default new registerRepository();