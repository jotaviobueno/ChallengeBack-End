import yup from 'yup';

class registerCar {

    async validateRegisterCar (req, res, next) {
        req.headers;

        const CarInfoSchema = yup.object().shape({

            newPassword: yup.string ('newPassword is not defined')
            .required ("the newPassword is required")
        });

        const tokenSchema = yup.object().shape({

            // license_plate, car_brand, color, price_for_day, password

            license_plate: yup.string ('license_plate is not defined')
            .required ("the license_plate is required"),
            
            car_brand: yup.string ('car_brand is not defined')
            .required ("the car_brand is required"),

            color: yup.string ('color is not defined')
            .required ("the color is required"),
            
            price_for_day: yup.string ('price_for_day is not defined')
            .required ("the price_for_day is required"),

            password: yup.string ('password is not defined')
            .required ("the password is required"),
        });
    
        try {
            await CarInfoSchema.validate(req.body);
            await tokenSchema.validate(req.params);

        } catch (e) {
            return res.status(400).json({
                    success: {
                    status: 400,
                    error: false,
                    info: {
                     data: e.errors
                    } 
                }
            });
        }
       await next();
    }
}

export default new registerCar();