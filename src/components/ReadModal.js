import React from 'react'
import Modal from 'react-modal'

function ReadModal({isReadModalOpen,closeReadModal,selectedNote}) {
    return (
        <div>
            <Modal
                isOpen={isReadModalOpen}
                onRequestClose={closeReadModal}
                className="read-modal"
            >
                <h3>{selectedNote?.title}</h3>
                <p>{selectedNote?.body}</p>
            </Modal>
        </div>
    )
}

export default ReadModal