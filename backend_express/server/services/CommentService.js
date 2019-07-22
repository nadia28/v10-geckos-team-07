const connection = require('../lib/db');
const util = require('util');

const dbRead = util.promisify(connection.query).bind(connection);

class CommentService {
 // add comments
  async addComment(newComment) {
    let existingUser = await this.getUser(newUser.email);
    if(!existingUser) {
      throw Error('Please login to write a comment');
    }

    const query = `insert into comments(Name, Body) values ('${newComment.name}', '${newComment.body}');`
    await dbQuery(query);
  }


  // show all comments for a particular room
  async getAllComments() {
    const allCommentsArray = await this.getData();
    return allCommentsArray.map((comment) => {
      return {user: user.Name, body: comment.body};
    })
  }

  async getData() {
    const query = `select u.name, c.body
    from comments c
    join users u on c.userID = u.id`;
    
    const rows = await dbQuery(query);
    const data = JSON.parse(JSON.stringify(rows));
    console.log(`Fetched ${data.length} comments data from DB.`);
    return data;
  }
}

module.exports = CommentService;