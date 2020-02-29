import React from 'react';
import Modal from 'react-modal';

interface ConfirmDialogProps {
    isOpen: boolean,
    title?: string,
    message?: string,
    onRequestClose: () => void,
    onConfirm: () => void,
}

const ConfirmDialog = ({ isOpen, onRequestClose, title = "Confirm Action", message = "Are you sure you want to delete", onConfirm }: ConfirmDialogProps) => {
    Modal.setAppElement('#root');
    return <Modal
        isOpen={isOpen}
        contentLabel='Are you sure you want to delete?'
        onRequestClose={onRequestClose}
        className='confirm-dialog-content'
        overlayClassName='confirm-dialog-overlay'
    >

        <div className="confirm-dialog-root">

            <h3>{title}</h3>
            <p>{message}</p>

        <div className="confirm-dialog-buttons">
            <button className='btn btn-cancel' onClick={onRequestClose}>Cancel</button>
            <button className='btn btn-confirm' onClick={onConfirm}>Okay</button>
        </div>
        </div>


    </Modal>
}

export default ConfirmDialog;