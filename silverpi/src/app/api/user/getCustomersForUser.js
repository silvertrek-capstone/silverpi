import { createClient } from '@supabase/supabase-js'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { gql } from 'graphql-request'
import { makeQuery } from '@/helpers/graphApi.js'

// Gets the customer numbers and their related info (name, etc)
// Either uses the logged in user, if no user_id sent, or uses the user_id sent

export async function getCustomersForUser(user_id) {
    try {
        let customers = []; // The array of customers to return
        if (user_id) {
            const { SUPABASE_SERVICE_KEY, NEXT_PUBLIC_SUPABASE_URL } = process.env
            // Have to create it this way to work as a service_role send
            const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_KEY)
            // Do a select on the customer to user table, where user_id
            const { data, error } = await supabase
                .from('customer_to_user')
                .select()
                .eq('user_id', user_id);
            if (error) {
                throw new Error(error);
            }
            customers = data;
        } else {
            // Regular supabase, with cookies
            const cookieStore = cookies()
            const supabase = createServerComponentClient({ cookies: () => cookieStore })
            // Do a select on the table, uses rls so it will just return the users rows
            const { data, error } = await supabase
                .from('customer_to_user')
                .select();
            if (error) {
                throw new Error(error);
            }
            customers = data;
        }

        const nums = customers.map((e) => {
            return e.cust_num;
        });

        // Now that nums has the customer numbers, we need to make a graphql query to get the data related to the customers
        const query = gql`
        query($filter: bARCMFilterInput){
            bARCM(where: $filter){
                customer
                name
                phone
                fax
                eMail
                address
                city
                state
                zip
            }
        }`

        const variables = {
            filter: {
                customer: {
                    "in": nums // Acts as a WHERE IN in sql, returns all customer numbers that are in the ids array
                },
                custGroup: {
                    "eq": 1, // Always has to equal one
                }
            }
        }

        // Make the request
        const { data, error } = await makeQuery(query, variables)
        if (error) {
            throw new Error(error);
        }
        // If no error, get the table rows
        const tableRows = data.bARCM;

        // Join the tableRows with the customer_to_user rows.
        const joined = leftJoin(data, tableRows || [], 'cust_num', 'customer')

        // Sort the rows by the "using" column, so its always first
        joined.sort((a, b) => {
            return b.using - a.using
        });

        return { data: joined, error: null };
    } catch (e) {
        return { data: null, error: e.toString() };
    }
}

// helper function
function leftJoin(objArr1, objArr2, key1, key2) {
    return objArr1.map(
        anObj1 => ({
            ...objArr2.find(
                anObj2 => anObj1[key1] === anObj2[key2]
            ),
            ...anObj1
        })
    );
} 

