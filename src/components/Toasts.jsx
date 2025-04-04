import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useGlobalContext } from '../context/GlobalContext';
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { IoAlertCircleOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import {formatDistanceToNow} from 'date-fns';
import { it } from 'date-fns/locale'; //import locale italiano.

function ReactStateToast(props) {
    const titleToast = props.title || "";
    const textToast = props.text || "";
    const type = props.type || "success"; // Tipi possibili: success, warning, info
    const data = new Date();
    const { showToast, handleCloseToast } = useGlobalContext();

    // Determina l'icona e il colore in base al tipo di toast
    const getToastIcon = () => {
        switch(type) {
            case "warning":
                return <IoAlertCircleOutline color="orange" />;
            case "info":
                return <IoInformationCircleOutline color="blue" />;
            case "success":
            default:
                return <IoCheckmarkDoneSharp color="green" />;
        }
    };

    // Determina il colore di sfondo dell'header in base al tipo
    const getHeaderStyle = () => {
        switch(type) {
            case "warning":
                return { backgroundColor: "#FFF3CD" };
            case "info":
                return { backgroundColor: "#FFF3CD" };
            case "success":
            default:
                return { backgroundColor: "#FFF3CD" };
        }
    };

    return (
        <>
            <div className="toast-container position-fixed top-10 end-0 p-3" >
                <div className={`toast ${showToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header" style={getHeaderStyle()}>
                        {getToastIcon()}
                        <strong className="me-auto">{titleToast}</strong>
                        <small>{formatDistanceToNow(data, { addSuffix: true, locale: it })}</small>
                        <button type="button" className="btn-close" onClick={handleCloseToast} aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        {textToast}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReactStateToast;