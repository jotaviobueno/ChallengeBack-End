import yup from 'yup';

class findById {
    async validateFindById(req, res, next) {
        req.headers;

        const schema = yup.object().shape({
            id: yup.string ('findById is not defined')
            .required ("the findById is required"),
        });
    
        try {
            await schema.validate(req.params);

        } catch(err) {
            return res.status(400).json({
                message:err.errors
            });
        }
       await next();
    }
}

export default new findById();