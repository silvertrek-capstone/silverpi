import Table from "@/components/table"
import { getPendingUsers } from "@/api/admin/getPendingUsers"
import { getActiveUsers } from "@/api/admin/getActiveUsers"

export default async function AdminPanel() {
  const headers = [
    { text: 'ID', value: 'id' },
    // { text: 'Name', value: 'name' },
    { text: 'Email', value: 'email' },
  ]

  const res = await getPendingUsers()
  const pendingUsers = res.data;
  console.log(pendingUsers);
  const res2 = await getActiveUsers()
  const activeUsers = res2.data;

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