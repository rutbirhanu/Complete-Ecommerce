/* eslint-disable react/prop-types */
// import "./components.css"

function NavCatagoryContainer({ imgSource, category }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={imgSource} className="h-6" alt={category} />
      <small className="font-medium text-[13px] text-[#222222] outline-none font-sans">
        {category}
      </small>
    </div>
  );
}



export default NavCatagoryContainer