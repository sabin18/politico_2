import passwordHash from 'password-hash';
import joi from 'joi';
import uuidv1 from 'uuid/v1';
import queries from '../db/Queries';
import execute from '../src/connection';
import authentication from '../helpers/authentication';
import User from '../models/usermodel';
import Schema from '../helpers/userValidation';

const userControllers = {};

// create a user
const createUser = (req, res) => {
  const {
    firstname, lastname,othername,email,phonenumber, password,passporturl,isadmin,
  } = req.body;
  const { error, value } = joi.validate(
    {
      firstname,
      lastname,
      othername,
      email,
      phonenumber,
      passporturl,
      password,
      isadmin,
    },
    Schema.userSchema,
  );
  if (error) {
    res.status(400).send({ error: error.details[0].message });
  } else {
    // generate the id and pass it to a user
    const id = uuidv1();
    const userin = new User(id, firstname, lastname,othername,email,phonenumber,passporturl,password, isadmin);
    const token = authentication.encodeToken({
      firstname,
      lastname,
      othername,
      email,
      phonenumber,
      passporturl,
      password,
      userId: id,
      isadmin:userin.isadmin,
    });
    const promise = execute(queries.registerUser, [
      userin.id,
      userin.firstname,
      userin.lastname,
      userin.othername,
      userin.email,
      userin.phonenumber,
      userin.passporturl,
      userin.password,
      userin.isadmin,
    ]);
    promise
      .then((response) => {
        const {
          firstname, lastname, email, isadmin,
        } = response[0];
        res.status(200).send({
          status:200,
          message: 'user registered successfully',
          
          user: {
            id,
            firstname,
            lastname,
            email,
          },
          token,
        });
      })
      .catch((error) => {
        res.status(400).send({ error });
      });
  }
};

// get a user
const getUser = (req, res) => {
  const id = req.params.id;
  // const specificUser = users.find(item => item.id === id);
  const specificUser = execute('SELECT * FROM users WHERE id =$1', [id]);
  specificUser
    .then((response) => {
      if (response) {
        res.status(200).send(response[0]);
      } else {
        res.send({ message: 'There is no user with that id' });
      }
    })
    .catch(error => res.status(400).send({ error }));
};

// Login data processing
const login = (req, res) => {
  const { email, password } = req.body;
  const specificUser = execute(queries.checkUser,[email]);
  specificUser
    .then((response) => {
      if (response.length > 0) {
        if (passwordHash.verify(password, response[0].password)) {
          const {
            firstname, lastname,othername, phonenumber,email,passporturl,password,
          } = response[0];
          const user = {
            firstname,
            lastname,
            othername,
            email,
            phonenumber,
            passporturl,
            password,
            isadmin: response[0].isadmin,
            userId: response[0].id,
          };
          const token = authentication.encodeToken(user);
          res.status(200).send({
            message: 'Logged in successfully',
            token,
            firstname,
            lastname,
            userid: response[0].id,
          });
        } else {
          res.status(400).send({ error: 'Password not matching' });
        }
      } else {
        res.status(400).send({ error: 'No user with that email' });
      }
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
};

// Delete all users from users table.
const deleteUsers = (req, res) => {
  const parcels = execute('DELETE FROM users ');
  parcels
    .then((response) => {
      res.status(200).send({ message: 'Users deleted successfully', response });
    })
    .catch((error) => {
      res.status(400).send({ error });
    });
};

//userControllers.fetchAllUsers = fetchAllUsers;
userControllers.getUser = getUser;
userControllers.createUser = createUser;
userControllers.login = login;
userControllers.deleteUsers = deleteUsers;

export default userControllers;
