import { Outlet, Link, Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'

export default function Layout() {
  const { user, logout } = useAuth()
  const [logoutModal, setLogoutModal] = useState(false)

  if (!user) return <Navigate to="/login" replace />

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-lg font-bold">
          Home
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/users" className="text-blue-600 hover:underline">
            Users
          </Link>
          <button
            onClick={() => setLogoutModal(true)}
            className="text-sm text-red-600"
          >
            Logout
          </button>
        </div>
        {logoutModal && (
          <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded p-6 max-w-sm w-full">
              <h2 className="text-lg font-semibold mb-4">Confirm logout</h2>
              <p className="mb-4">Are you sure you want to log out?</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setLogoutModal(false)}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    logout()
                    setLogoutModal(false)
                  }}
                  className="px-4 py-2 rounded bg-red-600 text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  )
}
