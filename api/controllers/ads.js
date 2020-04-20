require("dotenv").config();
const Airtable = require("airtable");
const { ad } = require("../../json/ad.json");

const base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

const table = base("ads");

exports.createAdRecord = async (price, userRecord) => {
  try {
    return await table.create({
      price,
      user_id: [userRecord.id],
      ...ad,
    });
  } catch (err) {
    console.log(err.stack);
    throw err;
  }
};
