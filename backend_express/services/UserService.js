const connection = require('../lib/db');
const util = require('util');

const dbQuery = util.promisify(connection.query).bind(connection);

class UserService {
 
   async addUser(newUser) {
    let existingUser = await this.getAllUsers(newUser.email);
    if (existingUser) {
      throw Error('User already exists');
    }

    const query = `insert into users(Name, LastName, Email, Birthday, Address) values ('${newUser.email}', '${newUser.address}', '', '${newUser.email}');`
    await dbQuery(query);
  }
    
  async getUser(email) {
    const query = `select * from users where email = '${email}'`;

    const rows = await dbQuery(query);
    const data = rows[0];
    return data;
  }

  async getAllUsers() {
    const allUsersArray = await this.getData();
    return allUsersArray.map((user) => {
      return {id: user.UserID, name: user.Name, lastName: user.LastName, email: user.Email, birthday: user.Birthday, address: user.Address};
    });
  }

  async getData() {
    const query = `select * from users`;

    const rows = await dbQuery(query);
    const data = JSON.parse(JSON.stringify(rows));
    console.log(`Fetched ${data.length} users data from DB.`);
    return data;
  }
}

module.exports = UserService;