import Table from "@/components/table"
import { handler as handlePendingUsers } from "@/api/admin/getPendingUsers/route"
import { handler as handleActiveUsers } from "@/api/admin/getActiveUsers/route"

export default async function AdminPanel() {
  const headers = [
    { text: 'ID', value: 'id' },
    // { text: 'Name', value: 'name' },
    { text: 'Email', value: 'email' },
  ]

  const pendingUsers = await getAllPending()
  const activeUsers = await getAllActive()

  return (
    <>
      <h1 className="text-3xl my-5 text-txt font-bold leading-tight tracking-tight">Admin Panel</h1>
      <div className="mb-6">
        <Table
          headers={headers}
          items={pendingUsers}
          title="Pending Users"
          mainkey='id'
          link="/home/user/"
        >

        </Table>
      </div>
      <div>
        <Table
          headers={headers}
          items={activeUsers}
          title="Active Users"
          mainkey='id'
          link="/home/user/"
        >

        </Table>
      </div>
    </>
  );
}


async function getAllPending() {
  const res = await handlePendingUsers()
  const jsonData = await res.json();
  const { data, error } = jsonData
  return data;
}

async function getAllActive() {
  const res = await handleActiveUsers()
  const jsonData = await res.json();
  const { data, error } = jsonData
  return data;
}