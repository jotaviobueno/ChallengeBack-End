import yup from 'yup';

class login {
    async validateLogin (req, res, next) {
        req.headers;

        const loginSchema = yup.object().shape({

            email: yup.string ('email is not defined')
            .required ("the email is required ")
            .email("the email is required"),

            password: yup.string ('email is not defined')
            .required ("the email is required  ")
        });
    
        try {
            await loginSchema.validate(req.body);

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

export default new login();