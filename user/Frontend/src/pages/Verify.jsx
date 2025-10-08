import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

function Verify() {
    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get("success")
    const reservationId = searchParams.get("reservationId")
    const navigate= useNavigate()
    
    const verifyPayment = async () => {
        try {
            const request= await fetch("http://localhost:3500/order/verify", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                credentials:"include",
                body: JSON.stringify({ success: success === 'true', reservationId:reservationId }) 
            })

            const response = await request.json()
            console.log(response)
            if (response.success) {
                navigate("/orders")
            }
            else {
                navigate("/")
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    // useEffect(() => {
    //     verifyPayment()
    //     console.log("verified")
    // },[])
verifyPayment()
  return (
    <div>Verify</div>
  )
}

export default Verify