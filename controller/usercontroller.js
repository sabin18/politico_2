
import users from "../db/user";
class usersController{

static getuser(req, res) {
    return res.json({
      status:200,  
      message: "List of all users",
      user: users
    });
}

//get user by id
static getOneuser(req, res) {
  const { id } = req.params;
  const user = users.find(oneuser => oneuser.id == id);
  if (user) {
    return res.status(200).json({
      status:200,
      message: "one user found",
      onePost: user
    });
  } else {
    res.status(404).json({
      error: "no user found with that id"
    });
  }
}


    //update user
   static createuser(req, res) {
    const id = parseInt(users.length) + 1;
    const {firstname,lastname,othername,email,phonenumber,passporturl} = req.body;
    const newuser = {
      id,
      firstname,
      lastname,
      othername,
      email,
      phonenumber,
      passporturl,
      isadmin:'false',
      
    };
    users.push(newuser);
    return res.status(200).json({  
      status:200,
      message: "created a new user"
    });
    }

  static updateuser(req, res) {
    const { id } = req.params;
    const user = users.find(updatePost => updatePost.id == id);
    if (user) {
          (user.firstname = req.body.firstname), (user.lastname=req.body.lastname), (user.othername=req.body.othername),(user.email=req.body.email),(user.phonenumber=req.body.phonenumber),(user.passporturl=req.body.passporturl),(user.body = req.body.body);
      return res.status(200).json({
        status:200,
        message: "user successfully updated",
        updatePost: user
      });
    } else {
      res.status(404).json({
        status:404,
        error: "user cannot be updated"
      });
    }
  }


  static deleteuser(req, res) {
    let { id } = req.params;
    const finduser = users.findIndex(post => {
      return post.id == parseInt(id, 10);
    });
    

    if (finduser >-1) {
      users.splice(finduser,1);
      const newuser = users.filter(post => {
        return post!== finduser;
      });
      return res.status(200).json({
        status:200,
        message: "user successfully deleted",
        Posts: newuser
      });
    } else {
      return res.status(404).json({
        status:404,
        error: "could not delete a user"
      });
    }
  }

}

export default usersController;