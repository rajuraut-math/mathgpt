import React from 'react'

const Modal = ({ title, message, onClose, onAction, actionLabel, secondaryLabel, onSecondary }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 z-10 animate-in fade-in slide-in-from-bottom-4">
        <h2 className="text-xl font-bold text-slate-800 mb-2">{title}</h2>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">{message}</p>

        <div className="flex flex-col gap-3">
          {onAction && (
            <button
              onClick={onAction}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl transition-colors"
            >
              {actionLabel || 'OK'}
            </button>
          )}
          {onSecondary && (
            <button
              onClick={onSecondary}
              className="w-full py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-2xl transition-colors"
            >
              {secondaryLabel || 'Cancel'}
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full py-2 text-slate-400 hover:text-slate-600 text-sm transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
