import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import axios from '../api/axios'

interface Form {
  name: string
  email: string
  status: string
}

export default function UserEditPage() {
  const { id } = useParams<{ id: string }>()
  const { register, handleSubmit, reset } = useForm<Form>()
  const nav = useNavigate()

  useEffect(() => {
    axios.get(`/users/${id}`).then((r) => reset(r.data))
  }, [id, reset])

  const onSubmit = async (data: Form) => {
    await axios.put(`/users/${id}`, data)
    nav('/users')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-4 rounded shadow max-w-md"
      >
        <input
          {...register('name', { required: true })}
          placeholder="Name"
          className="border w-full p-2 mb-2"
        />
        <input
          {...register('email', { required: true })}
          placeholder="Email"
          type="email"
          className="border w-full p-2 mb-2"
        />
        <select {...register('status')} className="border w-full p-2 mb-4">
          <option value="Active">Active</option>
          <option value="Not Active">Not Active</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  )
}
