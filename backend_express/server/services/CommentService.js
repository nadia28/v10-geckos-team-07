const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

class CommentService {
  constructor(dataFile) {
    this.dataFile = dataFile;
  }

  async addComment(newComment) {

    const commentsArray = await this.getData();

    commentsArray.unshift({
      name: newComment.name,
      email: newComment.email,
      message: newComment.message
    });

    await writeFile(this.dataFile, JSON.stringify(commentsArray));
  }

  async getAllComments() {
    const allCommentsArray = await this.getData();
    return allCommentsArray;
  }

  async getData() {
    const data = await readFile(this.dataFile, 'utf8');
    if (!data) return [];
    return JSON.parse(data);
  }
}

module.exports = CommentService;