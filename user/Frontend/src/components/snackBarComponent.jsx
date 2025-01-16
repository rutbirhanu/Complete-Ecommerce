/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { useEffect } from "react";
import "./components.css"

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
            {visible &&
                <div className="toast-container">
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: "green", height: "18px", paddingLeft: "14px" }} />
                    <span>Added to Cart </span>
                </div>
            }
        </>
    )
}

export default SnackBar