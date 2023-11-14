// pages/home/agreements/api.js
import { makeQuery } from '../../../helpers/graphApi';

export default async function handler(req, res) {
  try {
    // Define your GraphQL query
    const graphqlQuery = `
      query GetHomeAgreements($customer: Int!) {
        homeAgreements(customer: $customer) {
          // Define the fields you need for the table
          // For example: id, description, date, etc.
        }
      }
    `;

    // Set your fake customer number
    const fakeCustomerNumber = 1;

    // Make a query using the makeQuery function
    const { data, error } = await makeQuery(graphqlQuery, { customer: fakeCustomerNumber });

    if (error) {
      throw new Error(error);
    }

    // Extract the relevant data from the GraphQL response
    const agreementsData = data.homeAgreements;

    // Return the data as JSON
    res.status(200).json(agreementsData);
  } catch (error) {
    console.error('Error in home-agreements API route:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
