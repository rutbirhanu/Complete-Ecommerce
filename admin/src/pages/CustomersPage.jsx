import { useDispatch, useSelector } from "react-redux"
import SideBarComponent from "../component/SideBarComponent"
import { useEffect } from "react"
import { fetchUsers } from "../redux/userSlice"

function CustomersPage() {
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <SideBarComponent />

      <div className="flex-grow flex flex-col items-center p-8 md:p-12">
        <h2 className="text-2xl font-semibold mb-6 text-[#1d3b7b]">Customers</h2>

        <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto w-full max-w-5xl">
          <table className="w-full border-collapse text-gray-800 text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="text-left py-2 px-4">Id</th>
                <th className="text-left py-2 px-4">Email</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, idx) => (
                <tr
                  key={user._id}
                  className={idx % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}
                >
                  <td className="py-2 px-4">{user._id}</td>
                  <td className="py-2 px-4">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}

export default CustomersPage