import offices from "../db/office";
import office from "../helpers/validationoffice";
import moment from "moment";

class officesController{

static getoffice(req, res) {

    return res.json({
      status:200,  
      message: "List of all offices",
      office: offices
    });

}

//create political office
  
static createoffice(req, res) {
    const id = parseInt(offices.length) + 1;
    const {type,name}= req.body;
    const newoffice = {
      created_at: moment.utc().format(),
      id,
      type,
      name,
    };

    const{
      error
       }=office(req.body);
       error? res.send({
       status:400,
        error:error.details[0].message
        }):null;
      
      const existoffice=offices.find(field => field.name==req.body.name);

      if (existoffice)return res.send({
        status: 400,
        error:"please use other name this office name already exist!"
      });
      

    offices.push(newoffice);
    return res.status(200).json({ 
      status:200, 
      message: "created a new office"
    });
  }

  // get office by id
static getOneoffice(req, res) {
    const { id } = req.params;
    const office = offices.find(oneoffice => oneoffice.id == id);
    if (office) {
      return res.status(200).json({
        status:200,
        message: "one office found",
        onePost: office
      });
    } else {
      return res.status(400).json({
        status:400,
        error: "no office found with that id"
      });
    }
  }
  
  
  //update an  office

  static updateoffice(req, res) {
    const { id } = req.params;
    const officeupdate = offices.find(updatePost => updatePost.id == id);
    
    if (officeupdate) {

        const{
            error
             }=office(req.body);
             error? res.send({
             status:400,
              error:error.details[0].message
              }):null;
            
            const existoffice=offices.find(field => field.name==req.body.name);
      
            if (existoffice)return res.send({
              status: 400,
              error:"please use other name this office name already exist!"
            });

      (officeupdate.name = req.body.name),(officeupdate.type=req.body.type),(officeupdate.body = req.body.body);
      return res.status(200).json({
        status:200,
        message: "successfully updated",
        updateoffice: offices
      });
    } else {
      res.status(404).json({
        status:404,
        error: "office can't be updated because we can't find that office"
      });
    }
  }



static deleteoffice(req, res) {
    let { id } = req.params;
    const findoffice = offices.findIndex(post => {
      return post.id == parseInt(id, 10);
    });
    if (findoffice >-1) {
      offices.splice(findoffice,1);
      const newoffice = offices.filter(post => {
        return findoffice;
      });
      res.status(200).json({
        status:200,
        message: "office successfully deleted",
        office: newoffice
      });
    } else {
      res.status(404).json({
        status:404,
        error: "could not find that  office"
      });
    }
  }
}
export default officesController;