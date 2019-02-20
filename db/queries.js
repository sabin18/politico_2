import execute from '../src/connection';

const sqlQueries = {};

// Create table for parties 
const createPartiesTable = 'CREATE TABLE IF NOT EXISTS parties(id UUID(200) PRIMARY KEY,name VARCHAR(100) NOT NULL,hqaddress VARCHAR(70) NOT NULL,logourl VARCHAR(100) NOT NULL)';

// Create users table
const createusersTable = 'CREATE TABLE IF NOT EXISTS users(id UUID(200) PRIMARY KEY, firstname VARCHAR(70) NOT NULL,lastname VARCHAR(70) NOT NULL, othername VARCHAR(70) NOT NULL,email VARCHAR(40) NOT NULL UNIQUE , passporturl VARCHAR(70) NOT NULL, password VARCHAR(200) NOT NULL, userIsadmin VARCHAR(200) NOT NULL)';

// Create table for office 
const createOfficeTable = 'CREATE TABLE IF NOT EXISTS office(id UUID(200) PRIMARY KEY,office INTEGER(70) NOT NULL,party INTEGER(70) NOT NULL,candidates INTEGER(70) NOT NULL)';


// Create table for candidates
const createCandidatesTable = "CREATE TABLE IF NOT EXISTS office(id UUID(200) PRIMARY KEY,name VARCHAR(70) NOT NULL,type VARCHAR(70) NOT NULL)";

if (require.main === module) {
  execute(createPartiesTable);
  execute(createusersTable);
}


// insert party into the database
const insertIntoParty = 'INSERT INTO parties (id, name, hqaddress, logourl) VALUES($1,$2,$3,$4) RETURNING * ';

// Pull out a party from a database
const getSpecificParty = 'SELECT * FROM parties WHERE id =$1 ';

const getallParty = 'SELECT * FROM parties ';

// Update data of a party
const UpdateParty = 'UPDATE parties SET name = $1 WHERE  HQAddress= $2 logourl= $3 id = $4 RETURNING * ';

//delete aparty
const deleteParty='DELETE * FROM parties WHERE id =$1';

 //insert office into the database
const insertoffice = 'INSERT INTO office (id, name, hqaddress, logourl) VALUES($1,$2,$3,$4) RETURNING * ';

// Pull out a party from a database
const getSpecificoffice = 'SELECT * FROM office WHERE id =$1 ';

const getalloffice = 'SELECT * FROM office ';

// Update data of a party
const Updateoffice = 'UPDATE parties SET name = $1 WHERE  type= $2  id = $4 RETURNING * ';

//delete aparty
const deleteoffice='DELETE * FROM office WHERE id =$1';

// register user
const registerUser = ' INSERT INTO users (id, firstname,lastname, othername,email,phonenumber,passporturl, password,Isadmin) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *';

// Check if a user is logged in
const checkUser = 'SELECT * FROM users WHERE email = $1';



sqlQueries.createPartiesTable = createPartiesTable;

sqlQueries.createusersTable = createusersTable;

sqlQueries.UpdateParty = UpdateParty;

sqlQueries.getSpecificParty = getSpecificParty;

sqlQueries.getallParty = getallParty;

sqlQueries.insertIntoParty = insertIntoParty;

sqlQueries.createCandidatesTable=createCandidatesTable;

sqlQueries.createOfficeTable= createOfficeTable;

sqlQueries.deleteParty= deleteParty;

sqlQueries.registerUser = registerUser;

sqlQueries.checkUser = checkUser;

sqlQueries.insertoffice= insertoffice

sqlQueries.getSpecificoffice= insertoffice

sqlQueries.getalloffice=insertoffice

sqlQueries.Updateoffice=insertoffice

sqlQueries.deleteoffice=insertoffice


export default sqlQueries;