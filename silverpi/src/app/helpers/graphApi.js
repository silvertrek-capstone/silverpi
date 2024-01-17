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
        const apiKey = process.env.VISTA_DB_API_KEY
        const apiId = process.env.VISTA_DB_API_ID
        const port = process.env.VISTA_DB_PORT
        const url = process.env.VISTA_DB_URL
        const apiLocation = process.env.VISTA_DB_GRAPHQL_LOCATION
        const tokenLocation = process.env.VISTA_DB_TOKEN_LOCATION
        const apiLoc = `https://${url}:${port}`
        // Create the basic auth header key (just a base64 encoded id and api key)
        const auth = btoa(`${apiId}:${apiKey}`)
        const tokenUrl = `${apiLoc}/${tokenLocation}`
        // Make a request to get the token.
        const tokenResponse = await fetch(tokenUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${auth}`
            },
            cache: 'no-cache',
            body: "grant_type=client_credentials"
        })

        // Get the json of the response
        const tokenData = await tokenResponse.json()
        // Check if theres an error, if yes, throw the error
        if (tokenData.error) {
            throw new Error(tokenData.error)
        }

        // If not, we got the token, and we are good to make a request.
        const { access_token, token_type } = tokenData // Get the access token and token type
        const graphUrl = `${apiLoc}/${apiLocation}`
        // Create a graphql client for us to make the request. Client is made with auth headers
        const gqClient = new GraphQLClient(graphUrl, {
            headers: {
                authorization: `${token_type} ${access_token}`,
            },
        })
        const apiResponse = await gqClient.request(query, variables)
        // Above will throw a client error on error

        // console.log(Object.keys(apiResponse))
        return {
            data: apiResponse,
            error: null,
        }

    } catch (e) {
        return {
            error: e.message,
            data: null,
        }
    }

}