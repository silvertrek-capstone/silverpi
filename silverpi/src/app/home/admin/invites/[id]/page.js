import ClientUserPage from "./client";
import { getAllCustomers } from "@/api/user/getAllCustomers";
import { addCustomerToInvite } from "@/api/admin/addCustomerToInvite";
import { removeCustomerFromInvite } from "@/api/admin/removeCustomerFromInvite";
import { setInvite } from "@/api/admin/setInvite";
import { getInvite } from "@/api/admin/getInvite";
import { redirect } from 'next/navigation';

export default async function UserPage({ params }) {

    let invite_id = params.id;
    if (!invite_id) {
        redirect('/home/admin');
    }

    const initialErrors = [];
    // Handle getting all the data required
    const responses = await Promise.all([
        handleGetAllCustomers(),
        handleGetInvite(invite_id),
    ]);

    responses.forEach((e) => {
        if (e.error) {
            initialErrors.push(e.errorMsg);
        }
    });
    const allCustomers = responses[0].data;
    const invite = responses[1].data;


    // Event handlers
    async function handleSetInvite(email) {
        "use server";

        const { data, error } = await setInvite(invite_id, email);
        return JSON.parse(JSON.stringify({ data, error }));
    }
    async function handleAddCustomer(cust_num) {
        "use server";

        const { data, error } = await addCustomerToInvite(invite_id, cust_num);
        return JSON.parse(JSON.stringify({ data, error }));
    }
    async function handleRemoveCustomer(cust_num) {
        "use server";

        const { data, error } = await removeCustomerFromInvite(invite_id, cust_num);
        return JSON.parse(JSON.stringify({ data, error }));
    }





    return (
        <ClientUserPage
            allCustomers={allCustomers}
            invite={invite}
            handleSetInvite={handleSetInvite}
            handleAddCustomer={handleAddCustomer}
            handleRemoveCustomer={handleRemoveCustomer}
        >
        </ClientUserPage>
    );
}




// API CALLS


async function handleGetInvite(invite_id) {
    const { data, error } = await getInvite(invite_id);
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
