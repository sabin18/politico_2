import votes from "../db/votes";
import moment from "moment";

class voteController{
static getvotes(req, res) {
    return res.json({
      status:200,  
      message: "List of all votes",
      posts: votes
    });

}
static createvote(req, res) {
  const id = parseInt(votes.length) + 1;

  const newvotes = {
    id,
    createdon:moment.utc().format(),
    createdby:1,
    office:1,
    candidate:3,
    
  };
  votes.push(newvotes);
  return res.status(200).json({  
    status:200,
    message: "your votes have been recorded"
  });
}

//get votes by id
static getOnevote(req, res) {
    const { id } = req.params;
    const vote = votes.find(onevotes => onevotes.id == id);
    if (vote) {
      return res.status(200).json({
        status:200,
        message: "one vote found",
        onePost: vote
      });
    } else {
      res.status(404).json({
        status:404,
        error: "no vote found with that id"
      });
    }
  }

}

export default voteController;