//@ts-nocheck
"use client"
import React, { createContext, useContext, useState } from 'react'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([])

    const addToast = (message, type = 'success') => {
        console.log("copying for real")
        const id = Date.now()
        setToasts((prev) => [...prev, { id, message, type }])

        setTimeout(() => {
            removeToast(id)
        }, 5000)
    }

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 space-y-2">
                {toasts.map((toast) => (
                    <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
                ))}
            </div>
        </ToastContext.Provider>
    )
}

const Toast = ({ message, type, onClose }) => {
    const bgColor = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500',
    }[type]

    return (
        <div
            className={`${bgColor}  text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-4 min-w-[200px] animate-fade-in`}
        >
            <span className="text-sm font-medium">{message}</span>
            <button
                onClick={onClose}
                className="text-white hover:text-gray-200 focus:outline-none"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    )
}

export const useToast = () => {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}