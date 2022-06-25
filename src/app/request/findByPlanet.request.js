import yup from 'yup';

class findByPlanet {
    async validateFindByPlanet (req, res, next) {
        req.headers;

        const schema = yup.object().shape({
            planet_name: yup.string ('planet_name is not defined')
            .required ("the planet_name is required"),
        });
    
        try {
            await schema.validate(req.body);

        } catch(err) {
            return res.status(400).json({
                message:err.errors
            });
        }
       await next();
    }
}

export default new findByPlanet();