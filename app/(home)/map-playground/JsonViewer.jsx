"use client";
import React, {useState} from 'react';

const JsonViewer = ({ data, name = null, alwaysExpand = false, depth = 0 }) => {
    const [expanded, setExpanded] = useState(alwaysExpand);
    const isRoot = depth === 0;
    const toggleExpand = () => !alwaysExpand && setExpanded(!expanded);

    // Color scheme
    const colors = {
        key: 'text-purple-500',
        string: 'text-green-500',
        number: 'text-blue-400',
        boolean: 'text-red-400',
        null: 'text-gray-400',
        punctuation: 'text-gray-300',
    };

    const renderValue = (value) => {
        if (value === null) return <span className={colors.null}>null</span>;
        if (typeof value === 'string') return <span className={colors.string}>"{value}"</span>;
        if (typeof value === 'number') return <span className={colors.number}>{value}</span>;
        if (typeof value === 'boolean') return <span className={colors.boolean}>{value.toString()}</span>;
        return JSON.stringify(value);
    };

    const renderJsonArray = (array, key) => (
        <div className={`ml-${depth > 0 ? 4 : 0} min-w-max`}>
            <div
                className={`flex items-center ${!alwaysExpand ? 'cursor-pointer hover:bg-gray-50 rounded px-1' : ''}`}
                onClick={toggleExpand}
            >
                {!alwaysExpand && (
                    <span className="text-gray-400 mr-1 w-4 text-center">
            {expanded ? '−' : '+'}
          </span>
                )}
                {key && <span className={`font-medium ${colors.key}`}>{key}: </span>}
                <span className={colors.punctuation}>[</span>
                {!expanded && <span className="text-gray-400">...]</span>}
                {expanded && array.length === 0 && <span className={colors.punctuation}>]</span>}
            </div>

            {expanded && array.length > 0 && (
                <div className="border-l-2 border-gray-100 pl-3 ml-2 min-w-max">
                    {array.map((item, index) => (
                        <div key={index} className="flex min-w-max">
                            <JsonViewer
                                data={item}
                                name={null}
                                alwaysExpand={false}
                                depth={depth + 1}
                            />
                            {index < array.length - 1 && <span className={colors.punctuation}>,</span>}
                        </div>
                    ))}
                    <span className={colors.punctuation}>]</span>
                </div>
            )}
        </div>
    );

    const renderJsonObject = (obj, key) => (
        <div className={`ml-${depth > 0 ? 4 : 0} min-w-max`}>
            <div
                className={`flex items-center ${!alwaysExpand ? 'cursor-pointer hover:bg-gray-50 rounded px-1' : ''}`}
                onClick={toggleExpand}
            >
                {!alwaysExpand && (
                    <span className="text-gray-400 mr-1 w-4 text-center">
            {expanded ? '−' : '+'}
          </span>
                )}
                {key && <span className={`font-medium ${colors.key}`}>{key}: </span>}
                <span className={colors.punctuation}>{'{'}</span>
                {!expanded && <span className="text-gray-400">...</span>}
                {expanded && Object.keys(obj).length === 0 && <span className={colors.punctuation}>{'}'}</span>}
            </div>

            {expanded && Object.keys(obj).length > 0 && (
                <div className="border-l-2 border-gray-100 pl-3 ml-2 min-w-max">
                    {Object.entries(obj).map(([k, value], index, arr) => (
                        <div key={k} className="flex min-w-max">
                            <span className={`font-medium ${colors.key}`}>{k}: </span>
                            <JsonViewer
                                data={value}
                                name={null}
                                alwaysExpand={false}
                                depth={depth + 1}
                            />
                            {index < arr.length - 1 && <span className={colors.punctuation}>,</span>}
                        </div>
                    ))}
                    <span className={colors.punctuation}>{'}'}</span>
                </div>
            )}
        </div>
    );

    const renderContent = () => {
        if (Array.isArray(data)) {
            return renderJsonArray(data, name);
        } else if (typeof data === 'object' && data !== null) {
            return renderJsonObject(data, name);
        } else {
            return (
                <div className={`flex min-w-max ${isRoot ? '' : 'ml-4'}`}>
                    {name && <span className={`font-medium ${colors.key}`}>{name}: </span>}
                    {renderValue(data)}
                </div>
            );
        }
    };

    return (
        <div className={`font-mono text-sm ${isRoot ? 'bg-gray-50 p-4 rounded-lg overflow-x-auto' : ''}`}>
            <div className="min-w-max">
                {renderContent()}
            </div>
        </div>
    );
};

export default JsonViewer;