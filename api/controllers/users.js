require('dotenv').config();
const Airtable = require('airtable');
const db = require('./data');

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID);

const table = base('users');

// Param: userData = { user_id, villager_name, avatar }
// Returns {User} Record
exports.findUserById = async userId => {
  try {
    const users = await db.getAirtableRecords(table, {
      filterByFormula: `user_id = '${userId}'`
    });
    return users[0];
  } catch (err) {
    console.log(err.stack);
  }
};

// Param: userData = { user_id, villager_name, avatar }
// Returns {User} Record
exports.registerUser = async userData => {
  const { user_id, villager_name, avatar } = userData;

  try {
    return await table.create({ user_id, villager_name, avatar });
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};
