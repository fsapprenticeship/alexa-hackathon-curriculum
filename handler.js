'use strict';

const sanityClient = require('@sanity/client');

const sanity = sanityClient({
  // Find your project ID and dataset in `sanity.json` in your studio project
  projectId: 'musclhjv',
  dataset: 'production',
  useCdn: true
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
})

module.exports.readExperience = async (event, context, callback) => {

      async function sanityQuery(schema) {
        const query = `*[_type == '${schema}']`
        const links = await sanity.fetch(query);
        return links;
      }

      const result = await sanityQuery('productExperienceSchema')
      await console.log(result);

    
        const response = {
            version: '1.0',
            response: {
            outputSpeech: {
                type: 'PlainText',
                text: `${result[0].title} ${result[0].overview[0].children[0].text}.`,
            },
            shouldEndSession: false,
            },
        }
        

//   try {
//     const result = await sanityQuery('productSchema')
//     console.log('Result', result);
    
    
// } catch (error) {
//     console.log('Error:', error)
// }
  callback(null, response)
};