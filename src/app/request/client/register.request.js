import yup from 'yup';

class register {
    async validateRegister (req, res, next) {
        req.headers;

        const registerSchema = yup.object().shape({

            full_name: yup.string ("name is not defined")
            .required ("the name is required for registration"),

            email: yup.string ('email is not defined')
            .required ("the email is required for registration")
            .email("the email is required"),

            password: yup.string ('email is not defined')
            .required ("the email is required for registration")
            .min(4, "password min value 3")
            .max(30, "password max value 30")
        });
    
        try {
            await registerSchema.validate(req.body);

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

export default new register();