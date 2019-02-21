import passwordHash from 'password-hash';

// Define a class for creating a user

class User {
  constructor(id, firstname, lastname, othername, email,phonenumber,passporturl, password,Isadmin = 'false') {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.othername = othername;
    this.email = email;
    this.passporturl=passporturl;
    this.phonenumber=phonenumber;
    this.passporturl=passporturl;
    this.Isadmin =Isadmin;
    this.setPassword(password);
  }

  // define a function to hash the password.
  setPassword(password) {
    const hashedPassword = passwordHash.generate(password);
    // hash the password
    return (this.password = hashedPassword);
  }
}
export default User;