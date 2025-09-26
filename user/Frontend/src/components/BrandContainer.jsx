/* eslint-disable react/prop-types */
// import "./components.css"

function BrandContainer({ imgSource }) {
  return (
    <div>
      <img
        src={imgSource}
        className="h-24 w-24 rounded-full shadow-[1px_1px_4px_1px_rgba(198,198,198,1)]"
        alt="brand"
      />
    </div>
  );
}

export default BrandContainer