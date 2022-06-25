import repository from "../repository/insertPlanets.repository.js";
import planetModel from "../../model/planetsFilmsNULL.model.js";
import films from "../../model/films.model.js";

class insertPlanets {
  constructor() {
    this.model = planetModel;
    this.modelFilm = films;
  }

  async getAllPlanets (req, res) {
    await repository.getAllPlanetsAndFilms();
    return res.status(200).json({ message: "created" });
  }
}
export default new insertPlanets();