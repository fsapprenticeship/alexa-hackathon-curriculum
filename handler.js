'use strict';

import sanity from "../lib/sanity"
import { success, failure } from './libs/response';


module.exports.readExperience = async (event, context, callback) => {
  
    // function httpGet() {
    //     return new Promise(((resolve, reject) => {
    //       var options = {
    //           host: 'api.icndb.com',
    //           port: 443,
    //           path: '/jokes/random',
    //           method: 'GET',
    //       };
          
    //       const request = https.request(options, (response) => {
    //         response.setEncoding('utf8');
    //         let returnData = '';
      
    //         response.on('data', (chunk) => {
    //           returnData += chunk;
    //         });
      
    //         response.on('end', () => {
    //           resolve(JSON.parse(returnData));
    //         });
      
    //         response.on('error', (error) => {
    //           reject(error);
    //         });
    //       });
    //       request.end();
    //     }));
    //   }

      async function sanityQuery(schema) {
        const query = `*[_type == '${schema}']`
        const links = await sanity.fetch(query);
        return links;
      }


    function createResponse(body) {
        const audio = body
        const response = {
            version: '1.0',
            response: {
            outputSpeech: {
                type: 'PlainText',
                text: `The first step is to ${audio}`,
            },
            shouldEndSession: false,
            },
        }
        return response;
        }

  try {
    const result = await sanityQuery('productSchema')
    console.log('Result: ', result);
    
    return success ({ result })
} catch (error) {
    console.log('Error:', e)
    return failure({ status: false })
}

//   callback(null, response);
};