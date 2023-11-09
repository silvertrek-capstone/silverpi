import { gql, GraphQLClient, request } from 'graphql-request'
import 'dotenv/config' // Import the .env

/**
 * Given a query and variables, generates a token, then uses said token to make a request to the graphql api, see below for the standard response.
 * @param {gql} query The graphql query to make, should follow graphql standards, and be created with graphql-request "gql"
 * @param {object} variables Object containing any variables, ie: {customer: 1} would be an example
 * 
 */
export async function makeQuery(query, variables) {
    try {
        // First, get all the stuff we will need for making requests, api keys, urls, etc.
        const apiKey = process.env.VISTA_DB_API_KEY;
        const apiId = process.env.VISTA_DB_API_ID;
        const port = process.env.VISTA_DB_PORT;
        const url = process.env.VISTA_DB_URL;
        const apiLocation = process.env.VISTA_DB_GRAPHQL_LOCATION;
        const tokenLocation = process.env.VISTA_DB_TOKEN_LOCATION;

        // Create the basic auth header key (just a base64 encoded id and api key)
        const auth = btoa(`${apiId}:${apiKey}`);
        const fullUrl = `https://${url}:${port}/${tokenLocation}`
        console.log(fullUrl)
        // Make a request to get the token.
        const tokenResponse = await fetch(fullUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${auth}`
            },
        });
        console.log('test')
        console.log(tokenResponse);


    } catch(e) {
        console.log(e)
        return {
            error: e,
            data: null,
        };
    }

}