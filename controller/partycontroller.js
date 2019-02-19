import parties from "../db/parties";
import party from "../helpers/validationparty";

class partyController {

    //getting the parties
    static getparties(req, res){
    
      return res.json({
        status:200,
        message: "List of all parties",
        party: parties
  
      });
    }


 // create political party

static createparties(req, res) {
    const id = parseInt(parties.length) + 1;
    const {name,HQAddress,logourl} = req.body;
    const newparty = {
      id,
      name,
      HQAddress,
      logourl,
    };

 const{
error
 }=party(req.body);
 error? res.send({
 status:400,
  error:error.details[0].message
  }):null;

const existparty=parties.find(field => field.name==req.body.name);
if (existparty) return res.send({
  status: 400,
  error:"please use other name this party name already exist"
});

    parties.push(newparty);
    return res.status(200).json({  
      status:200,
      message: "created a new party"
    });

  }

//get parties by id
static getOneparty(req, res) {
    const { id } = req.params;
    const party = parties.find(oneparties => oneparties.id == id);
    if (party) {
      return res.status(200).json({
        status:200,
        message: "one party found",
        onePost: party
      });
    } else {
      return res.status(404).json({
        status:404,
        error: "no party found with that id"
      });
    }
  }

  static updateparty(req, res) {
    const { id } = req.params;
    const partyupdate = parties.find(updatePost => updatePost.id == id);
  
  
    if (partyupdate) {
  
      const{
        error
         }=party(req.body);
         error? res.send({
         status:400,
          error:error.details[0].message
          }):null;
  
      const existparty=parties.find(field => field.name==req.body.name);
        if (existparty) return res.send({
          status: 400,
          error:"please use other name ,this name is same as name you are updating"
        });
  
      (partyupdate.name = req.body.name), (partyupdate.HQAddress=req.body.HQAddress), (partyupdate.logourl=req.body.logourl), (partyupdate.body = req.body.body);
      return res.status(200).json({
        status:200,
        message: "successfully updated",
        updateParty: party
      });
    } else {
      return res.status(404).json({
        status:404,
        error: "party cannot be updated"
      });
    }
  }
  

//update function (patch)
static updatepartyname(req, res) {
    const { id } = req.params;
    const { name } = req.params;
    const updateparty = parties.find(updatePost => updatePost.id == id);
    const updatepartyname = parties.find(updatePost => updatePost.name == name);
  
    
  
    if (updateparty&&updatepartyname) {
        
      const{
        error
         }=party(req.body);
         error? res.send({
         status:400,
          error:error.details[0].message
          }):null;
  
        const existparty=parties.find(field => field.name==req.body.name);
        if (existparty) return res.send({
          status: 400,
          error:"please use other name ,this name is same as name you are updating"
        });
  
      (party.name = req.body.name),(party.body = req.body.body);
      return res.status(200).json({
        status:200,
        message: "party successfully  updated",
        updatePost: party
      });
    } else {
      return res.status(404).json({
        status:404,
        error: "party cannot be updated"
      });
    }
  }

  
  // delete data functions 

  static deleteparties(req, res) {
    let { id } = req.params;
    const findparty = parties.findIndex(post => {
      return post.id == id;
    });
    if (findparty >-1) {
      parties.splice(findparty,1);
      const newparty = parties.filter(post => {
        return post !== findparty;
      });
      res.status(200).json({
        status:200,
        message: "party successfully deleted",
        Posts: newparty
      });
    } else {
      res.status(400).json({
        status:400,
        error: "could not delete a party"
      });
    }
  }

}
export default partyController;