import petitions from "../db/Petition";
import moment from "moment";

class petitionsController {

static getpetition(req, res) {
    return res.json({
     status:200,  
     message: "List of all petitions",
     petition: petitions
   });
} 

//create petition

static createpetition(req, res) {
    const id = parseInt(petitions.length) + 1;
    const {body} = req.body;
    const newpetition = {
      id,
      createdon:moment.utc().format(),
      createdby:1,
      office:3,
      body,
    };
    petitions.push(newpetition);
    return res.status(200).json({  
      status:200,
      message: "created a new petition"
    });
  }

//get petition by id
static getOnepetition(req, res) {
    const { id } = req.params;
    const petition = petitions.find(onepetition => onepetition.id == id);
    if (petition) {
      return res.status(200).json({
        status:200,
        message: "one petition found",
        onePetition: petition
      });
    } else {
      res.status(404).json({
        status:404,
        error: "no petition found with that id"
      });
    }
  }

//delete function

  static deletepetition(req, res) {
    let { id } = req.params;
    const findpetition = petitions.findIndex(post => {
      return post.id == parseInt(id, 10);
    });
    if (findpetition  >-1){
      petitions.splice(findpetition,1);
      const newpetition = petitions.filter(post => {
        return post !== findpetition;
      });
      res.status(200).json({
        status:200,
        message: "petition successfully deleted",
        petition: newpetition
      });
    } else {
      res.status(404).json({
        status:404,
        error: "could not find that a petition"
      });
    }
  }
  }



export default petitionsController;