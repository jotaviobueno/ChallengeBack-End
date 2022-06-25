import planetModel from "../../model/planetsFilmsNULL.model.js";
import films from "../../model/films.model.js";

class findPlanetsAndFilm {
    constructor () {
        this.model = planetModel;
        this.modelFilm = films;
    }

  async findAll () {
    return (
      await this.model.find({deleted: false}).select({__v: 0, url: 0 }),
      await this.modelFilm.find({deleted: false}).select({__v: 0, url: 0 })
    );
  }

  async findByName (name) {
    try {
        const findName = await this.model.findOne({ name: name, deleted: false }).select({__v: 0, url: 0 });
        const findName2 = await this.modelFilm.findOne({ planet_name: name, deleted: false }).select({__v: 0, url: 0 });
    
        if (findName != null) {
          return findName;
        }
    
        if (findName2 != null) {
          return findName2;
        }
    
        return false;
    } catch (e) {
        return false;
    }
  }

  async findById (id) {
    try {
        const FindId = await this.model.findOne({ _id: id, deleted: false }).select({__v: 0, url: 0 });
        const FindId2 = await this.modelFilm.findOne({ _id: id, deleted: false }).select({__v: 0, url: 0 });
    
        if (FindId != null) {
            return FindId;
        }
      
        if (FindId2 != null) {
            return FindId2;
        }
        
        return false;
    }
     catch (e) {
        return false;
    }
 }

 async existUser (id) {
    const FindId = await this.model.findOne({ _id: id, deleted: false });
    const FindId2 = await this.modelFilm.findOne({ _id: id, deleted: false });

    if (FindId === null)
    return false;

    if (FindId2 === null)
    return false;

    return true;
  }

  async remove (id) {
    const FindId = await this.model.findOne({ _id: id, deleted: false });
    const FindId2 = await this.modelFilm.findOne({ _id: id, deleted: false });

    if (FindId != null) 
    await this.model.findOneAndUpdate({_id: id}, { deleted: true });

    if (FindId2 != null)
    await this.modelFilm.findOneAndUpdate({_id: id}, { deleted: true });

    return false;
  }
}


export default new findPlanetsAndFilm();
