"use client"
import React, {useState} from 'react'
import {useToast} from '@/providers/ToastProvider'

const RequestSample = ({curl, js = [], className = ''}) => {
    const [activeTab, setActiveTab] = useState(0)
    const {addToast} = useToast()
    const languages = ['cURL', 'JavaScript']
    const hasJs = js.length > 0

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        console.log("copying")
        addToast('Copied to clipboard!', 'success')
    }

    return (
        <div className={`mt-6 ${className}`}>
            <div className="flex items-center justify-between mb-3">
                <h3 className="mt-4 text-md font-semibold text-gray-800 mb-3">Request Samples</h3>
                {hasJs && (
                    <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                        {languages.map((lang, i) => (
                            <button
                                key={lang}
                                onClick={() => setActiveTab(i)}
                                className={`px-3 py-1 text-sm rounded-md transition-all ${
                                    activeTab === i
                                        ? 'bg-white shadow-sm text-purple-600 font-medium'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                {lang}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                <div className="p-4 overflow-auto max-h-96">
                    {activeTab === 0 ? (
                        <pre className="text-sm text-gray-800 font-mono whitespace-pre-wrap break-words">
                            <code>{curl}</code>
                        </pre>
                    ) : (
                        <pre className="text-sm text-gray-800 font-mono">
                            <code>{js.join('\n')}</code>
                        </pre>
                    )}
                </div>

                <div className="bg-gray-100 px-4 py-2 flex justify-end">
                    <button
                        onClick={() => handleCopy(activeTab === 0 ? curl : js.join('\n'))}
                        className="text-xs text-gray-600 hover:text-gray-500 flex items-center transition-colors"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
                        </svg>
                        Copy to clipboard
                    </button>
                </div>
            </div>
        </div>
    )
}

export default RequestSample