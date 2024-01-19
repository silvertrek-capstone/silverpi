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
    <div className="min-h-screen bg-transparent p-8 pt-20 flex flex-col items-center">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-regular text-gray-800 p-2 -mt-8">Admin Panel</h1>
        </div>
        <div className="mb-6">
          <Table
            headers={headers}
            items={pendingUsers}
            title="Pending Users"
          >

          </Table>
        </div>
        <div>
          <Table
            headers={headers}
            items={activeUsers}
            title="Active Users"
          >

          </Table>
        </div>
      </div>
    </div>
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