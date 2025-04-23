import React from "react";
import "./Popup.css";
import BookMore from "./BookMore";

const Popup = ({ message, onClose }) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>
                    Close
                </button>
                <p>{message}</p>
                <BookMore/>
            </div>
        </div>
    );
};

export default Popup;
