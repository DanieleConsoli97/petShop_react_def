import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ReactStateToast(props) {
    
    const titleTost= props.title || ""
    const textTost = props.text || ""
    
    const [showToast, setShowToast] = useState(false);

    const handleShowToast = () => {
        
        setShowToast(true);
        // Nasconde automaticamente dopo 5 secondi
        setTimeout(() => setShowToast(false), 5000);
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };
    return (
        <>
            <button
                type="button"className="btn btn-primary"onClick={(()=>(handleShowToast()))}>
                Show live toast (React State)
            </button>

            <div className="toast-container position-fixed top-0 end-0 p-3">
                <div className={`toast ${showToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                        <img src="" className="rounded me-2" alt="..." />
                        <strong className="me-auto">{titleTost}</strong>
                        <small>Adesso</small>
                        <button type="button" className="btn-close" onClick={handleCloseToast} aria-label="Close"></button>
                    </div>
                    <div className="toast-body">
                        {textTost}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ReactStateToast;