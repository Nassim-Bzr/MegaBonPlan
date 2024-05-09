import React from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ onClose, title, children }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        <span className="absolute top-0 right-0 p-4">
          <button
            onClick={onClose}
            className="text-gray-900 hover:text-gray-600"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </span>
        <div className="py-4 text-lg text-gray-900">{title}</div>
        <div className="text-gray-700">{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root') // Assurez-vous d'avoir un élément avec l'ID `modal-root` quelque part dans votre HTML.
  )
}

export default Modal
