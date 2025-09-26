/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react";


function SnackBar({ visible, onClose }) {
  useEffect(() => {
    if (visible) {
      const timeout = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [visible, onClose]);

  return (
    <>
      {visible && (
        <div className="absolute bottom-5 left-5 border border-green-500 h-[40px] w-[300px] flex items-center rounded-[5px] bg-white shadow-[0_0_2px_2px_rgba(209,209,209,1)]">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-green-500 h-[18px] pl-[14px]"
          />
          <span className="px-2">Added to Cart</span>
          {/* Animated bottom bar */}
          <div className="absolute bottom-0 left-0 h-[3px] w-full bg-green-500 animate-slideOut"></div>
        </div>
      )}
    </>
  );
}


export default SnackBar