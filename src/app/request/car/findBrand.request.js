import yup from 'yup';

class findBrand {
    async validateBrand (req, res, next) {
        req.headers;

        const brandSchema = yup.object().shape({

            brand: yup.string ('brand is not defined')
            .required ("the brand is required ")

        });
    
        try {
            await brandSchema.validate(req.body);

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

export default new findBrand();