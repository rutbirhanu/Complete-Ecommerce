import { useNavigate } from "react-router-dom"
// import "./components.css"

function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 left-0 right-0 z-10 bg-[#252b60] flex items-center justify-between min-h-[4em] mb-4 rounded-b-md px-2 overflow-hidden text-white">
      
      {/* Left side */}
      <div className="flex items-center justify-evenly w-[47vw] gap-4">
        <img src="/gojo_logo.png" alt="logo" className="h-10" />
        
        <div className="flex items-center justify-around w-[24em] h-8 bg-white rounded-full px-2 text-gray-700">
          <input
            type="text"
            placeholder="search here"
            className="w-[85%] bg-transparent border-none outline-none"
          />
          <img src="/search-logo.png" alt="search" className="h-4" />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center justify-end gap-5 text-white ">
        <p className="font-semibold relative hover:after:content-[''] hover:after:absolute hover:after:bottom-[-5px] hover:after:left-0 hover:after:h-[1px] hover:after:w-full hover:after:bg-white cursor-pointer">
          Download app
        </p>
        <p
          onClick={() => navigate("/sign-up")}
          className="font-semibold relative hover:after:content-[''] hover:after:absolute hover:after:bottom-[-5px] hover:after:left-0 hover:after:h-[1px] hover:after:w-full hover:after:bg-white cursor-pointer"
        >
          Sign up
        </p>
        <p
          onClick={() => navigate("/login")}
          className="font-semibold relative hover:after:content-[''] hover:after:absolute hover:after:bottom-[-5px] hover:after:left-0 hover:after:h-[1px] hover:after:w-full hover:after:bg-white cursor-pointer"
        >
          Login
        </p>
        <p> || </p>
        <img
          src="https://cdn-icons-png.flaticon.com/256/6515/6515773.png"
          alt="cart"
          className="h-7 cursor-pointer"
          onClick={() => navigate("/cart")}
        />
        <img
          src="/cart.png"
          alt="cart"
          className="h-8 cursor-pointer"
          onClick={() => navigate("/cart")}
        />
      </div>
    </div>
  );
}

export default NavBar