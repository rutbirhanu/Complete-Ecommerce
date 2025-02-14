import { useDispatch, useSelector } from "react-redux"
import SideBarComponent from "../component/SideBarComponent"
import "./customersPage.css"
import { useEffect } from "react"
import { fetchUsers } from "../redux/userSlice"

function CustomersPage() {
  const dispatch = useDispatch()
  const { users } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div className="orders-page-container">
      <SideBarComponent />
      <div className="orders-page-content">
        <h2>Customers</h2>
        <div className="orders-table-wrapper">
          <div className="table-wrapper">
            <table className="orders-table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Email</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    users.map(user => {
                      return <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.email}</td>
                      </tr>
                    })
                  }

                </tbody>
              </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomersPage