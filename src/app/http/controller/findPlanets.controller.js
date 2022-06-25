import repository from '../repository/findPlanets.repository.js';

class findPlanets {

    async findAll (req, res) {
        return res.status(200).json({result: await repository.findAll()});
    }

    async findByPlanet (req, res) {
        const {planet_name} = req.body;

        const getInfoPlanet = await repository.findByName(planet_name);
        if (! getInfoPlanet)
        return res.status(400).json({message: 'name invalid!'});

        return res.status(200).json({planet_Information: getInfoPlanet});
    }

    async findById (req, res) {
        const {id} = req.params;

        if (! await repository.existUser(id))
        return res.status(400).json({message: 'id invalid!'});

        const getInfoById = await repository.findById(id);
        if (! getInfoById)
        return res.status(400).json({message: 'id invalid!'});

        return res.status(200).json({result: getInfoById}); 
    }

    async remove (req, res) {
        const {id} = req.params;

        if (! await repository.existUser(id))
        return res.status(400).json({message: 'id invalid!'});

        await repository.remove(id);
        return res.status(200).json({message: 'deleted!'});
        
    }
}

export default new findPlanets();