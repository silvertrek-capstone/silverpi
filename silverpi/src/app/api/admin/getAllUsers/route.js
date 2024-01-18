import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import "dotenv/config"

export async function handler(request) {

    const cookieStore = cookies()                                      // Setup client with Cookies Auth for security
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore }, { supabaseKey: process.env.SUPABASE_SERVICE_KEY })
    try {
        const { data, error } = await supabase.auth.admin.listUsers(); // get all the users from supabase auth

        if (error) {
            throw new Error(error);                                    // err check
        }

        // console.log(data)                                              // Debug print
        const users = data.users;

        const { data: profilesData, error: profilesError } = await supabase.from('profiles').select('*'); // Get profiles to match IDS and get names

        const getName = (users) => {                                   // Function that gets the name for matching uids and

            let fullUsers = [];

            for (let i = 0; i < users.length; i++) {                   // Loop through each user passed in


                let userProfile = profilesData.find(profile => profile.id === users[i].id); // Seek for profile that matches user profile ID

                // Check that a profile has been found and exists
                if (userProfile) {

                    let fullName = userProfile.first_name + ' ' + userProfile.last_name;    // Found, Combine first and last name into one var

                    // Spread syntax for pushing all data from:
                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax

                    fullUsers.push({ ...users[i], name: fullName });    // Add user with the full name to the array

                } else {

                    fullUsers.push({ ...users[i], name: 'N/A' });       // User not found, can print N/A
                }
            }

            return fullUsers;                                           // Return the array formatted with user names
        };


        // SQL Query here from auth signup
        // Return new array we created after filtering
        // Filter the users array by the customer to users array
        // Change Select . doesnt need JS if wanted

        // Get SQL table data from customer / user relaton
        const { data: sqlTab, error: sqlErr } = await supabase.from('customer_to_user').select()

        // Err check
        if (sqlErr) {
            console.log(sqlErr)
        } else {
            console.log(sqlTab)
        }

        // Begin Filtering here
        // Note: Filtering technique found from following:
        //       https://stackoverflow.com/questions/37773925/filter-array-in-array-of-objects-in-javascript?rq=3
        //       https://stackoverflow.com/questions/46185327/how-to-filter-items-by-category-queryparams-in-angular-2-or-4?noredirect=1&lq=1
        const filteredUsers = getName(data.users.filter(user =>
            sqlTab.some(pendingUser => pendingUser.user_id === user.id))
        );

        // Send Valid Response
        return NextResponse.json({ data: filteredUsers, error }, { status: 200 })
    } catch (error) {

        // Print Error and send Invalid Response
        console.log(error)
        return NextResponse.json({ data: null, error }, { status: 500 })
    }
}
