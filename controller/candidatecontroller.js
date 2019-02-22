// src/usingDB/controllers/Reflection.js
import joi from 'joi';
import uuidv1 from 'uuid/v1';
//import candidate from '../models/candidatemodel';
import queries from '../db/Queries';
import execute from '../src/connection';
import Schema from '../helpers/Validationparty';

const controllers = {};


// fetch a candidates by id  method
const Getcandidate = (req, res) => {
  const candidateId = req.params.id;
const candidate = execute(queries.getSpecificandidate,[candidateId]);
candidate
.then((response) => {
  // send it.
  if (response.length >=1) {
    res.status(200).send(response[0]);
  } else {
    // send the error on page
    res.status(404).send({ message:'sorry no candidate  found it is empty' });
  }
})
.catch(error => console.log(error));
};
// create candidates
const createcandidates = (req, res) => {
	// Office id
	const { id } = req.params;
	const candidate = {
		party: req.body.party,
		user: req.body.user
  }

  Schema.candidateSchema
	// Check if party exists
	const party = execute(queries.getSpecificParty, [candidate.party]);
	if (party.rows.length === 0) {
		return res.status(400).json({
			status: 400,
			error: 'The party of id does not exist.'
		});
	}
	// Check if office exists
	const office = execute(queries.getSpecificoffice, [id]);
	if (office.rows.length === 0) {
		return res.status(400).json({
			status: 400,
			error: 'The office of id does not exist.'
		});
	}
	// Check if user exists
	const user = execute(getoneuser, [candidate.user]);
	if (user.rows.length === 0) {
		return res.status(400).json({
			status: 400,
			error: 'The user of id does not exist.'
		});
	}
	// Check if candidate (office, party and user) is already registered
	const candidatecheck = execute('SELECT * FROM candidates WHERE office=$1 and party=$2 and candidate=$3',
		[
			id,
			candidate.party,
			candidate.user
		]);
	if (candidatecheck.rows.length !== 0) {
		return res.status(409).json({
			status: 409,
			error: 'The candidate is already registered.'
		});
	}
	// Register candidate
	try {
		execute('INSERT INTO candidates(office, candidates, party) VALUES($1,$2,$3)',
		[
			id,
			candidate.party,
			candidate.user
		]);
		return res.status(201).json({
			status: 201,
			data: [
			  {
			  	office: id,
			  	user: candidate.user
			  }
			]
		});
	} catch (error) {
		return res.status(404).json({
			status: 404,
			error: error
		});
	}
};



controllers.createcandidates = createcandidates;
controllers.Getcandidate=Getcandidate;

export default controllers;