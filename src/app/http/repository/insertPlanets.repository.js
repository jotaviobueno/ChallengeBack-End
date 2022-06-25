import planetModel from "../../model/planetsFilmsNULL.model.js";
import films from "../../model/films.model.js";

import axios from "axios";

class testRepository {
  constructor() {
    this.model = planetModel;
    this.modelFilm = films;
    this.linkArray = [
      "https://swapi.dev/api/planets/?page=1",
      "https://swapi.dev/api/planets/?page=2",
      "https://swapi.dev/api/planets/?page=3",
      "https://swapi.dev/api/planets/?page=4",
      "https://swapi.dev/api/planets/?page=5",
      "https://swapi.dev/api/planets/?page=6",
    ];
  }

  async getAllPlanetsAndFilms() {
    this.linkArray.forEach(async (allLinks) => {
      try {
        const getResult = await axios.get(`${allLinks}`);

        getResult.data.results.forEach(async (Object) => {

          // pegar todos os planetas que tem filme === null e jogar em uma schema proprio
          if (Object.films.length === 0) {
            if ((await this.model.findOne({ url: Object.url })) === null) {
              await this.model.create({
                name: Object.name,
                planet: {
                  planet: Object,
                  climate: Object.climate,
                  terrain: Object.terrain,
                  population: Object.population,
                },
                films: null,
                url: Object.url,
                deleted: false,
              });
            }
          }

          if (Object.films.length >= 1) {
            if ((await this.modelFilm.findOne({ url: Object.url })) === null) {
              await this.modelFilm.create({
                planet_name: Object.name,
                planet: {
                  climate: Object.climate,
                  terrain: Object.terrain,
                  population: Object.population,
                },
                films: {
                  name: null,
                  planets: null,
                },
                url: Object.url,
                deleted: false
              });
            }

            Object.films.forEach(async (Films) => {
              const getNameFilm = await axios.get(`${Films}`);

              getNameFilm.data.planets.forEach(async (linksV2) => {
                await this.modelFilm.findOneAndUpdate({ url: linksV2 },
                  { name_film: getNameFilm.data.title,
                    films: {
                      planets: getNameFilm.data.planets,
                    },
                  }
                );
              });
            });
          }
        });
      } catch (e) {
        return false;
      }
    });
  }
}

export default new testRepository();