require('dotenv').config();

const Airtable = require('airtable-node');

const airtable = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
  .base(process.env.AIRTABLE_BASE_ID)
  .table(process.env.AIRTABLE_TABLE_NAME);

exports.handler = async (event, context, callback) => {
  const {id} = event.queryStringParameters;
  if (id) {
    try {
      let product = await airtable.retrieve(id);
      if (product.error) {
        return {
          statusCode: 404,
          body: 'product with such id was not found',
        };
      }
      product = {id: product.id, ...product.fields};
      return {
        statusCode: 200,
        body: JSON.stringify(product),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: 'Sorry, there was internal server error, this is not your fault :)',
      };
    }
  }
};
