import mongoose from 'mongoose';

const rentCar = mongoose.model('rent', {

    rented_by: String,
    rented_car: String,
    rented_in: Date,
    rented_until: Date,
    total_price: Number,

    CarSetting: {
        car_brand: String,
        color: String,
        price_for_day: Number
    }
});

export default rentCar;