const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
  async index (request, response) {
    const ongs = await connection('ongs').select('*');
  
    return response.json(ongs);
  },

  async create (request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = generateUniqueId();
    
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })

    return response.json({ id });
  },

  async delete (request, response) {
    const ong_id = request.headers.authorization;

    const ong = await connection('ongs')
      .where('id', ong_id)
      .select('id')
      .first();
      
    if (ong.id != ong_id) {
      return response.status(401).json('Operation not permitted.');
    }

    await connection('ongs').where('id', ong_id).delete();

    return response.status(204).send();
  }
}