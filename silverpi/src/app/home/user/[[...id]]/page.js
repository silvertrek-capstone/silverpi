import ClientUserPage from "./client";
import { getRole } from "@/api/admin/getRole";
import { getCustomersForUser } from "@/api/user/getCustomersForUser";
import { getUserProfile } from "@/api/user/getUserProfile";
import { getAllCustomers } from "@/api/user/getAllCustomers";
import { getAllRoles } from "@/api/admin/getAllRoles";
import { setProfile } from "@/api/admin/setProfile";
import { addCustomerForUser } from "@/api/admin/addCustomerForUser";
import { deleteCustomerForUser } from "@/api/admin/deleteCustomerForUser";

export default async function UserPage({ params }) {

    // Get role id of user, if user is not admin (1), just get their own user profile
    const { data: role_id, error: roleError } = await getRole(); // Always gets logged in users.
    let userId = params.id?.[0];
    if (role_id !== 1) {
        userId = null;
    }

    const initialErrors = [];
    // Handle getting all the data required
    const responses = await Promise.all([
        handleGetAllCustomers(),
        handleGetCustomersForUser(userId),
        handleGetUserProfile(userId),
        handleGetAllRoles(userId),
    ]);

    responses.forEach((e) => {
        if (e.error) {
            initialErrors.push(e.errorMsg);
        }
    });
    const allCustomers = responses[0].data;
    const customers = responses[1].data;
    const profile = responses[2].data;
    const roles = responses[3].data


    // Event handlers
    async function handleSetProfile(profile) {
        "use server";

        const { data, error } = await setProfile(userId, profile);
        return JSON.parse(JSON.stringify({ data, error }));
    }

    async function insertCustomer(profile) {
        "use server";

        const { data, error } = await addCustomerForUser(userId, profile);
        return JSON.parse(JSON.stringify({ data, error }));
    }
    async function removeCustomer(cust_num) {
        "use server";
        console.log(userId);
        const { data, error } = await deleteCustomerForUser(userId, cust_num);
        return JSON.parse(JSON.stringify({ data, error }));
    }





    return (
        <ClientUserPage
            profile={profile}
            roleId={role_id}
            roles={roles}
            customers={customers}
            allCustomers={allCustomers}
            errors={initialErrors}
            updateProfile={handleSetProfile}
            insertCustomer={insertCustomer}
            removeCustomer={removeCustomer}
        >
        </ClientUserPage>
    );
}




// API CALLS


async function handleGetUserProfile(userId) {
    const { data, error } = await getUserProfile(userId);
    if (error) {
        return {
            data,
            error,
            errorMsg: 'Failed to get user profile'
        };
    }
    return { data, error };
};

async function handleGetCustomersForUser(userId) {
    const { data, error } = await getCustomersForUser(userId);
    if (error) {
        return {
            data,
            error,
            errorMsg: 'Failed to get related customers for user.'
        };
    }
    return { data, error };
}

async function handleGetAllCustomers() {
    const { data, error } = await getAllCustomers();
    if (error) {
        return {
            data,
            error,
            errorMsg: 'Failed to get all customers'
        };
    }
    const customers = data.map((e) => {
        return {
            text: `${e.customer} - ${e.name}`,
            value: e.customer,
            ...e,
        }
    })
    return { data: customers, error };
}

async function handleGetAllRoles() {
    const { data, error } = await getAllRoles();
    if (error) {
        return {
            data,
            error,
            errorMsg: 'Failed to get all roles'
        };
    }
    const roles = data.map((e) => {
        return {
            text: `${e.id} - ${e.name}`,
            value: e.id,
            ...e,
        }
    })
    return { data: roles, error };
}

