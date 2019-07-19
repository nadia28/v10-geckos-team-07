const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

class RoomService {
  constructor(dataFile) {
    this.dataFile = dataFile;
  }

  async getRoomDetails(id) {
    const allRoomData = await this.getData();

    const roomDetails = allRoomData.find((room) => {
      return room.id === id;
    });

    return roomDetails;
  }


  async addRoom(newRoom) {

    const roomsArray = await this.getData();

    roomsArray.unshift({
      type: newRoom.type,
      status: newRoom.status,
      description: newRoom.description,
      price: newRoom.price,
      location: newRoom.location,
      address: newRoom.address
    });

    await writeFile(this.dataFile, JSON.stringify(roomsArray));
  }

  async getRooms() {
    const roomsArray = await this.getData();

    return roomsArray.map((room) => {
      return {type: room.type, status: room.status, price: room.price, location: room.location};
    });
  }

  async getData() {
    const data = await readFile(this.dataFile, 'utf8');
    if(!data) return [];
    return JSON.parse(data);
  }
}

module.exports = RoomService;