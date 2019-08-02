const connection = require('../lib/db');
const util = require('util');

const dbRead = util.promisify(connection.query).bind(connection);

class RoomService {
  async addRoom(newRoom) {
    const query = `insert into rooms(Type, Status, Description, Price, Location) values ('${newRoom.type}', '${newRoom.status}', '${newRoom.description}', '${newRoom.price}', '${newRoom.location}');`
    await dbQuery(query);
  }
  async getRoomDetails(id) {
    const allRoomData = await this.getData();

    const roomDetails = allRoomData.find((room) => {
      return room.id === id;
    });

    return roomDetails;
  }

  async getRooms() {
    const roomsArray = await this.getData();

    return roomsArray.map((room) => {
      return {type: room.type, status: room.status, price: room.price, location: room.location, image: room.Image};
    });
  }

  async getData() {

    const query = `select r.id, r.type, r.status, r.price, r.location, i.url
    from rooms r
    join images i on r.id = i.roomID`;
    
    const rows = await dbRead(query);
    const data = LSON.parse(JSON.stringify(rows));
    console.log(`Fetched ${data.length} rooms data from DB.`);
    return data; 
  }
}

module.exports = RoomService;