require('dotenv').config();

const Airtable = require('airtable-node');

const airtable = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
  .base(process.env.AIRTABLE_BASE_ID)
  .table(process.env.AIRTABLE_TABLE_NAME);

exports.handler = async (event, context, callback) => {
  try {
    const response = await airtable.list({maxRecords: 150});
    const products = response.records.map((product) => {
      const {id, fields} = product;
      const {
        name,
        price,
        reviews,
        shipping,
        colors,
        stock,
        images,
        stars,
        category,
        company,
        featured,
        description,
      } = fields;
      const {url} = images[0];
      return {
        id,
        name,
        price,
        reviews,
        shipping,
        colors,
        stock,
        stars,
        category,
        company,
        featured,
        description,
        image: url,
      };
    });
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: 'internal server error',
    };
  }
};
