import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import axios from '../api/axios'

interface User {
  id: string
  name: string
  email: string
  status: string
}

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([])
  const [showDelete, setShowDelete] = useState<string | null>(null)

  useEffect(() => {
    axios.get('/users').then((r) => setUsers(r.data))
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link
          to="/users/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add User
        </Link>
      </div>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-b">
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.status}</td>
              <td className="p-2 text-right">
                <Link
                  to={`/users/${u.id}`}
                  className="text-blue-600 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => setShowDelete(u.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Confirm delete</h2>
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDelete(null)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await axios.delete(`/users/${showDelete}`);
                  setUsers(users.filter((u) => u.id !== showDelete));
                  setShowDelete(null);
                }}
                className="px-4 py-2 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
