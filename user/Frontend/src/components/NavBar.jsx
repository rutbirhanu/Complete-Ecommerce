// import { useNavigate } from "react-router-dom"

// function NavBar() {
//   const navigate = useNavigate();
//   return (
//     <div className="sticky top-0 left-0 right-0 z-10 bg-[#252b60] flex items-center justify-between min-h-[4em] mb-4 rounded-b-md px-2 overflow-hidden text-white">

//       {/* Left side */}
//       <div className="flex items-center justify-evenly w-[47vw] gap-4">
//         <img src="/gojo_logo.png" alt="logo" className="h-10" />

//         <div className="flex items-center justify-around w-[24em] h-8 bg-white rounded-full px-2 text-gray-700">
//           <input
//             type="text"
//             placeholder="search here"
//             className="w-[85%] bg-transparent border-none outline-none"
//           />
//           <img src="/search-logo.png" alt="search" className="h-4" />
//         </div>
//       </div>

//       {/* Right side */}
//       <div className="flex items-center justify-end gap-5 text-white ">
//         <p className="font-semibold relative hover:after:content-[''] hover:after:absolute hover:after:bottom-[-5px] hover:after:left-0 hover:after:h-[1px] hover:after:w-full hover:after:bg-white cursor-pointer">
//           Download app
//         </p>
//         <p
//           onClick={() => navigate("/sign-up")}
//           className="font-semibold relative hover:after:content-[''] hover:after:absolute hover:after:bottom-[-5px] hover:after:left-0 hover:after:h-[1px] hover:after:w-full hover:after:bg-white cursor-pointer"
//         >
//           Sign up
//         </p>
//         <p
//           onClick={() => navigate("/login")}
//           className="font-semibold relative hover:after:content-[''] hover:after:absolute hover:after:bottom-[-5px] hover:after:left-0 hover:after:h-[1px] hover:after:w-full hover:after:bg-white cursor-pointer"
//         >
//           Login
//         </p>
//         <p> || </p>
//         <img
//           src="https://cdn-icons-png.flaticon.com/256/6515/6515773.png"
//           alt="cart"
//           className="h-7 cursor-pointer"
//           onClick={() => navigate("/cart")}
//         />
//         <img
//           src="/cart.png"
//           alt="cart"
//           className="h-8 cursor-pointer"
//           onClick={() => navigate("/cart")}
//         />
//       </div>
//     </div>
//   );
// }

// export default NavBar




import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import { createPortal } from "react-dom";

function NavBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({});

  // Debounced fetch function
  const fetchSuggestions = useCallback(
    debounce(async (query) => {
      if (!query.trim()) return;
      try {
        const res = await fetch(
          `http://localhost:3500/product/suggestion?query=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setSuggestions(data.suggestions || []);
      } catch (err) {
        console.error("Error fetching suggestions:", err);
      }
    }, 400),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSuggestions(true);
    setActiveIndex(-1);
    fetchSuggestions(value);
  };

  const handleSelect = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/search?query=${encodeURIComponent(suggestion)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        handleSelect(suggestions[activeIndex]);
      } else {
        handleSubmit(e);
      }
    }
  };

  // Update dropdown position
  useEffect(() => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "absolute",
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        zIndex: 999999,
      });
    }
  }, [searchQuery, showSuggestions]);

  // Cleanup debounce
  useEffect(() => {
    return () => {
      fetchSuggestions.cancel();
    };
  }, [fetchSuggestions]);

  return (
    <div className="sticky top-0 left-0 right-0 z-50 bg-[#252b60] flex items-center justify-between min-h-[4em] mb-4 rounded-b-md px-4 overflow-visible text-white">
      {/* Left side */}
      <div className="flex items-center justify-evenly w-[47vw] gap-4 relative">
        <img src="/gojo_logo.png" alt="logo" className="h-10" />

        <form
          className="flex items-center justify-around w-[24em] h-10 bg-white rounded-full px-2 text-gray-700 relative"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            ref={inputRef}
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleChange}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onKeyDown={handleKeyDown}
            className="w-[85%] bg-transparent border-none outline-none px-2 py-1 text-gray-700"
          />
          <button type="submit">
            <img src="/search-logo.png" alt="search" className="h-4" />
          </button>
        </form>
      </div>

      {/* Right side */}
      <div className="flex items-center justify-end gap-5 text-white">
        <p className="font-semibold hover:underline cursor-pointer">Download app</p>
        <p onClick={() => navigate("/sign-up")} className="font-semibold hover:underline cursor-pointer">
          Sign up
        </p>
        <p onClick={() => navigate("/login")} className="font-semibold hover:underline cursor-pointer">
          Login
        </p>
        <p>||</p>
        <img
          src="/cart.png"
          alt="cart"
          className="h-8 cursor-pointer"
          onClick={() => navigate("/cart")}
        />
      </div>

      {/* Dropdown rendered outside the layout */}
      {createPortal(
        showSuggestions && suggestions.length > 0 && (
          <ul
            style={dropdownStyle}
            className="bg-white shadow-lg rounded-md max-h-60 overflow-y-auto text-gray-800 border border-gray-200"
            onMouseDown={(e) => e.preventDefault()} // Fix blur issue
          >
            {suggestions.map((sug, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(sug)}
                className={`px-4 py-2 cursor-pointer ${activeIndex === idx
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100"
                  }`}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                {sug}
              </li>
            ))}
          </ul>
        ),
        document.body
      )}
    </div>
  );
}

export default NavBar;
