import mongoose from 'mongoose';

const films = mongoose.model('films', {

    planet_name: Object,
    name_film: Object,
    planet: {
        climate: Object,
        terrain: Object,
        population: Object,
    },

    films: {
        planets: Object,
    },
    url: Object,
    deleted: Boolean
    
});

export default films;