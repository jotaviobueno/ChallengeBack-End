import yup from 'yup';

class returnCar {
    async validateReturnCar (req, res, next) {
        req.headers;

        const BodySchema = yup.object().shape({

            days: yup.string ('days is not defined')
            .required ("the days is required"),
            
            password: yup.string ('password is not defined')
            .required ("the password is required")
        });

        const TokenSchema = yup.object().shape({

            token: yup.string ('token is not defined')
            .required ("the token is required"),

            id: yup.string ('id is not defined')
            .required ("the id is required")
        });
    
        try {
            await BodySchema.validate(req.file);
            await TokenSchema.validate(req.params);

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

export default new returnCar();