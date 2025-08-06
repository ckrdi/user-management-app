import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import axios from '../api/axios'

interface Form {
  name: string
  email: string
  password: string
  status: string
}

export default function UserAddPage() {
  const { register, handleSubmit } = useForm<Form>()
  const nav = useNavigate()

  const onSubmit = async (data: Form) => {
    await axios.post('/users', data)
    nav('/users')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add User</h1>
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
        <input
          {...register('password', { required: true })}
          placeholder="Password"
          type="password"
          className="border w-full p-2 mb-2"
        />
        <select {...register('status')} className="border w-full p-2 mb-4">
          <option value="Active">Active</option>
          <option value="Not Active">Not Active</option>
        </select>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  )
}
