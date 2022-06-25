import mongoose from 'mongoose';

const filmsNull = mongoose.model('filmsNull', {

    name: Object,
    planet: {
        climate: Object,
        terrain: Object,
        population: Object,
    },

    films: Object,
    url: Object,
    deleted: Boolean
    
});

export default filmsNull;