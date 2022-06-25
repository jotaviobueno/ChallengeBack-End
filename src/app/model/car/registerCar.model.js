import mongoose from 'mongoose';

const register = mongoose.model('car', {

    created_by: String,
    reserved_by: String,
    license_plate: Object,
    car_brand: String,
    color: String,
    available: Boolean,
    price_for_day: Number,
    deleted: Boolean,
    last_update: Date,
    create_in: Date, 
    
    mimetype: String,
    filename: String,
    path: String,
    size: Number
});

export default register;