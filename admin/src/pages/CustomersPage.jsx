import { useDispatch, useSelector } from "react-redux"
import SideBarComponent from "../component/SideBarComponent"
import "./customersPage.css"
import { useEffect } from "react"
import { fetchUsers } from "../redux/userSlice"

function CustomersPage() {
  const dispatch = useDispatch()
  const {isLoading, users}= useSelector(state=>state.user)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div className="customer-page-container">
      <SideBarComponent />
      <div className="customers-page-content">
        <h2>Customers</h2>
        <div className="customers-list">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {
                users.map(user => {
                  return  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                </tr>
                })
              }
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CustomersPage