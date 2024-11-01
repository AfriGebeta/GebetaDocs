"use client";
import React, {useState} from 'react';

const JsonViewer = ({ data, name , alwaysExpand }) => {
  const [expanded, setExpanded] = useState(alwaysExpand);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

 

  const renderJsonArray = (array, key) => (
    <div className="ml-4">
      <div className="flex items-center cursor-pointer" onClick={toggleExpand}>
        {expanded ? '-' : '+'} {key}:
        {expanded ? null : ' [...] ,' }
      </div>
      {expanded ? (
        <div>
          [ {array.map((item, index) => <div className='ml-[5%]'><JsonViewer key={index} data={item} name={index} alwaysExpand = {false} /></div>)} ]
        </div>
      ) : null}
    </div>
  );

  const renderJsonObject = (obj, key) => (
    <div className="ml-4">
      {
        alwaysExpand ? 
        <div className="flex items-center cursor-pointer" onClick={toggleExpand}>    
           {key}
            
        </div>: <div className="flex items-center cursor-pointer" onClick={toggleExpand}>    
            {expanded ? '-' : '+'} {key}:
            {expanded ? null : ' {...} ,'}
        </div>
      }
            
      {expanded ? (
        <div>
          {'{ '}
          {Object.entries(obj).map(([k, value]) => <div className='ml-[5%]'><JsonViewer key={k} data={value} name={k} alwaysExpand = {false} /></div>)}
          {' }'}
        </div>
      ) : null}
    </div>
  );

  const renderContent = (value, key) => {
    if (Array.isArray(value)) {
      return renderJsonArray(value, key);
    } else if (typeof value === 'object') {
      return renderJsonObject(value, key);
    } else {
      return <span className="ml-[5%]">{key} : {JSON.stringify(value)} , </span>;
    }
  };

  return <div>{renderContent(data, name)}</div>;
};

export default JsonViewer;
