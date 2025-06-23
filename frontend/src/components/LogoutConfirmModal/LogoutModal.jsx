import { useRef, useEffect } from 'react';


const LogoutModal = ({ isOpen, onConfirm, onCancel, title, message, option1, option2 }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            // Focus the modal when it opens
            modalRef.current?.focus();
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Restore body scroll
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleEscapeKey = (event) => {
            if (event.key === 'Escape' && isOpen) {
                onCancel();
            }
        };

        document.addEventListener("keydown", handleEscapeKey);
        return () => document.removeEventListener("keydown", handleEscapeKey);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    const handleBackdropClick = (event) => {
        if (event.target === event.currentTarget) {
            onCancel();
        }
    };

    return (
        <div 
            className="logout-modal-overlay"
            onClick={handleBackdropClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-modal-title"
        >
            <div 
                className="logout-modal-content"
                ref={modalRef}
                tabIndex={-1}
            >
                <div className="logout-modal-header">
                    <h2 id="logout-modal-title" className="logout-modal-title">
                        {title}
                    </h2>
                </div>
                
                <div className="logout-modal-body">
                    <p className="logout-modal-message">{message}</p>
                </div>
                
                <div className="logout-modal-footer">
                    <button
                        className="logout-modal-button logout-modal-cancel-button"
                        onClick={onCancel}
                        autoFocus
                    >
                        {option1}
                    </button>
                    <button
                        className="logout-modal-button logout-modal-confirm-button"
                        onClick={onConfirm}
                    >
                        {option2}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogoutModal;