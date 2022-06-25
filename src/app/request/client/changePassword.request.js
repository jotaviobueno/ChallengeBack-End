import yup from 'yup';

class changePassword {
    async validateGetToken (req, res, next) {
        req.headers;

        const getTokenSchema = yup.object().shape({

            email: yup.string ('email is not defined')
            .required ("the email is required")
            .email("the email is required")
        });
    
        try {
            await getTokenSchema.validate(req.body);

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

    async validateChangePassword (req, res, next) {
        req.headers;

        const ChangePasswordSchema = yup.object().shape({

            newPassword: yup.string ('newPassword is not defined')
            .required ("the newPassword is required")
        });

        const TokenSchema = yup.object().shape({

            token: yup.string ('token is not defined')
            .required ("the token is required")
        });
    
        try {
            await ChangePasswordSchema.validate(req.body);
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

export default new changePassword();