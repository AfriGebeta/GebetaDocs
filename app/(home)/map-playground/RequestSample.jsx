"use client"
import React, {useState} from 'react'
import {useToast} from '@/providers/ToastProvider'
import {Check, Copy} from "lucide-react";
import {Button} from "@/components/ui/button";

const RequestSample = ({curl, js = [], className = ''}) => {
    const [activeTab, setActiveTab] = useState(0)
    const [copyState, setCopyState] = useState(false)

    const {addToast} = useToast()
    const languages = ['cURL', 'JavaScript']
    const hasJs = js.length > 0

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyState(true)

            setTimeout(() => {
                setCopyState(false)
            }, 2000)
        })
        console.log("copying")
        addToast('Copied to clipboard!', 'info')
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

            <div className="relative bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                <div className="p-5 overflow-auto max-h-96">
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

                <div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleCopy(activeTab === 0 ? curl : js.join('\n'))}
                        className="absolute w-5 border-none bg-transparent h-5 top-2 right-2"
                    >
                        {copyState ? (
                            <Check className="h-3 w-3"/>
                        ) : (
                            <Copy className="h-3 w-3"/>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default RequestSample