"use server"
import { getUserProfile } from "@/api/user/getUserProfile";

import ClientUserPage from "./client";
import { getRole } from "@/app/api/admin/getRole";

export default async function UserPage({ params }) {

    // Get role id of user, if user is not admin (1), just get their own user profile
    const {data: role_id, error: roleError} = await getRole(); // Always gets logged in users.
    let userId = params.id?.[0];
    if (role_id !== 1) {
        userId = null;
    }


    return (
        <>
            <ClientUserPage
                profile={data}
                roleId={role_id}
                roles={[]}
                errors={initialErrors}
            >
            </ClientUserPage>
        </>
    );
}

