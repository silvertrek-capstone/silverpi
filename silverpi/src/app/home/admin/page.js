import Table from "@/components/table"
import { getPendingUsers } from "@/api/admin/getPendingUsers"
import { getActiveUsers } from "@/api/admin/getActiveUsers"
import { getAllInvites } from "@/api/admin/getAllInvites";
import { setInvite } from "@/api/admin/setInvite";
import InviteButton from "./addInviteButton";
import { redirect } from "next/navigation";
import { getRole } from "@/api/admin/getRole";

export default async function AdminPanel() {

  const { data: role_id, error: roleError } = await getRole();
  if (roleError || role_id !== 1) { // Only authenticated users
    redirect('/home');
  }

  

  const headers = [
    { text: 'ID', value: 'id' },
    // { text: 'Name', value: 'name' },
    { text: 'Email', value: 'email' },
  ];


  const res = await getPendingUsers()
  const pendingUsers = res.data;
  const res2 = await getActiveUsers()
  const activeUsers = res2.data;
  const res3 = await getAllInvites();
  const invites = res3.data;

  async function handleSetInvite() {
    "use server";

    const { data, error } = await setInvite();
    redirect('/home/admin/invites/' + data)

  }

  return (
    <>
      <h1 className="text-3xl my-5 text-txt font-bold leading-tight tracking-tight">Admin Panel</h1>
      <div className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        <div className="row-span-2 self-start">
          <h2 className=" mb-2 text-base font-semibold leading-7 text-gray-900">Pending Users</h2>

          <Table
            headers={headers}
            items={pendingUsers}
            mainkey='id'
            link="/home/user/"
          >

          </Table>
        </div>

        <div className="self-start">
          <h2 className="mb-2 text-base font-semibold leading-7 text-gray-900">Active Users</h2>

          <Table
            headers={headers}
            items={activeUsers}
            mainkey='id'
            link="/home/user/"
          >

          </Table>
        </div>
      </div>
      <div className="mt-6">
        <InviteButton handleSetInvite={handleSetInvite} />

        <Table
          headers={headers}
          items={invites}
          mainkey='id'
          link="/home/admin/invites/"
        >
        </Table>

      </div>
    </>
  );
}