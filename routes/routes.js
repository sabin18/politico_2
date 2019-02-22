import express from "express";
const router = express.Router();

import partyController from "../controller/partycontroller";
import officeController from "../controller/officecontroller";
import usersController from "../controller/usercontroller";
import candidateController from "../controller/candidatecontroller";
//import petitionsController from "../controller/petitioncontroller";
//import voteController from "../controller/votescontroller";
import authentication from '../helpers/authentication';


//post routers
router.get("/api/v1/parties", partyController.AllParty);
//router.get("/api/v1/user", usersController.getuser);
router.get("/api/v1/office/", officeController.Alloffice);
//router.get("/api/v1/candidates",candidatesController.getcandidates);
//router.get("/api/v1/votes", voteController.getvotes);
//router.get("/api/v1/petition", petitionsController.getpetition);

//post routers
router.post("/api/v1/parties", authentication.adminTokenRequired,partyController.createParty);
//router.post("/api/v1/user", usersController.createuser);
router.post("/api/v1/office/:id/register", authentication.adminTokenRequired,officeController.createcandidates);
//router.post("/api/v1/petition/", petitionsController.createpetition);
router.post("/api/v1/office/", authentication.adminTokenRequired,officeController.createoffice);
//router.post("/api/v1/votes/", voteController. createvote);

//get by id  routers
//router.get("/api/v1/user/:id", usersController.getOneuser);
router.get("/api/v1/parties/:id", partyController.GetPartById);
router.get("/api/v1/office/:id", officeController.GetofficeById);
//router.get("/api/v1/candidates/:id", candidatesController.getOnecandidate);
//router.get("/api/v1/votes/:id", voteController.getOnevote);
//router.get("/api/v1/petition/:id",petitionsController.getOnepetition);

//updates routers
router.put("/api/v1/parties/:id",authentication.adminTokenRequired,partyController.updateparty);
router.put("/api/v1/office/:id",authentication.adminTokenRequired,officeController.updateoffice);
//router.put("/api/v1/user/:id", usersController.updateuser);


// patch router
//router.patch("/api/v1/parties/:id/:name", partyController.updatepartyname);

//delete routers
router.delete("/api/v1/parties/:id", partyController.deleteparty);
//router.delete("/api/v1/user/:id", usersController.deleteuser);
//router.delete("/api/v1/candidates/:id", candidatesController.deletecandidate);
router.delete("/api/v1/office/:id",officeController.deleteoffice);
//router.delete("/api/v1/petition/:id", petitionsController.deletepetition);

// accept the data from users signing up
router.post('/api/v1/auth/signup', usersController.createUser);

// the login data
router.post('/api/v1/auth/login', usersController.login);


export default router;