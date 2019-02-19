import candidates from "../db/candidates";



class candidatesController {
static getcandidates(req, res) {
    return res.json({
      status:200,  
      message: "List of all candidates",
      candidate: candidates
    });

  }

  static createcandidates(req, res) {
    const id = parseInt(candidates.length) + 1;

    const newcandidate = {
      id,
      office:1,
      party:2,
      candidate:3,
      
    };
    candidates.push(newcandidate);
    return res.status(200).json({  
      status:200,
      message: "created a new candidate"
    });
  
}

//get candidate by id
static getOnecandidate(req, res) {
    const { id } = req.params;
    const candidate = candidates.find(onecandidates => onecandidates.id == id);
    if (candidate) {
      return res.status(200).json({
        status:200,
        message: "one candidate found",
        onePost: candidate
      });
    } else {
      res.status(404).json({
        status:404,
        error: "no candidate found with that id"
      });
    }
  }
 //delete candidates

  static deletecandidate(req, res) {
    let { id } = req.params;
    const findcandidate = candidates.findIndex(post => {
      return post.id == parseInt(id, 10);
    });
    
    if (findcandidate >-1) {

      candidates.splice(findcandidate,1);
      
      const newcandidate = candidates.filter(post => {
        return post !== findcandidate;
      });
      res.status(200).json({
        status:200,
        message: "candidate successfully deleted",
        Posts: findcandidate.id,
      });
    } else {
      res.status(404).json({
        status:404,
        error: "could not delete a candidate"
      });
    }
  }



}
export default candidatesController;




