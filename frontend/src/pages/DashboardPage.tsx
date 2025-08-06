import { useEffect, useState } from 'react'
import axios from '../api/axios'

export default function DashboardPage() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    axios.get('/users').then((r) => setCount(r.data.length))
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white p-4 rounded shadow">
        Total users: <span className="font-bold">{count}</span>
      </div>
    </div>
  )
}
