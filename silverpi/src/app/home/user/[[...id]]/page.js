"use server"
import ClientUserPage from "./client";

export default async function UserPage({ params }) {
    const userId = params.id?.[0];
    console.log(userId)
    return (
        <>
            <ClientUserPage
                
            >

            </ClientUserPage>
        </>
    );
}

