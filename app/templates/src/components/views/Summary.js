import React from 'react';

function Summary(props) {
  const data = props.data;

  return (
    <div className="Summary container mx-auto mt-4 px-4 md:px-0">
      <div className="max-w-4xl mx-auto p-6 bg-white border-2 border-gray-200 rounded-lg shadow-xl overflow-hidden">
        <div className="grid grid-cols-2">
          <div className="text-left">
            <p className="text-md text-purple-500 font-semibold pb-2">
              Summary
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              {data.words} words
            </p>
          </div>
        </div>
        <p className="text-justify leading-relaxed">
          {data.summary}
        </p>
        <p className="text-md text-purple-500 font-semibold pt-4 pb-2">
          Sources
        </p>
        <p className="leading-relaxed">
          <ul className="list-disc px-2">
            {data.urls && data.urls.map((url) => (
              <li>
                <a href={url} className="text-blue-700">{url}</a>
              </li>
            ))}
          </ul>
        </p>
      </div>
    </div>
  );
}

export default Summary;
