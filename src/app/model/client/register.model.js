import mongoose from 'mongoose';

const client = mongoose.model('client', {

    full_name: String,
    email: String,
    password: String,
    created_in: Date,
    deleted_at: Boolean,
    last_update: Date,
    its_admin: Boolean,
    //Car Settings
    license_plate: String,
    car_color: String,
    car_brand: String,
});

export default client;