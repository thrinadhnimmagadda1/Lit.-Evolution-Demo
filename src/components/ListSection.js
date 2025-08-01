import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ListSection = ({ items = [], onCategorySelect, onItemClick }) => {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState(null);

  const toggleAbstract = (e, itemId) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggle abstract for item:', itemId, 'Current expandedId:', expandedId);
    setExpandedId(prevId => {
      const newId = prevId === itemId ? null : itemId;
      console.log('Setting expandedId to:', newId);
      return newId;
    });
  };

  const handleItemClick = (e, itemId) => {
    // Check if the click is on the abstract toggle or content
    const isAbstractClick = e.target.closest('.abstract-toggle') || 
                           e.target.closest('.abstract-content');
    
    console.log('Item clicked:', itemId, 'Is abstract click:', isAbstractClick);
    
    if (!isAbstractClick) {
      console.log('Navigating to item:', itemId);
      onItemClick?.(itemId);
      navigate(`/item/${itemId}`);
    }
  };
  return (
    <div className="space-y-6">
      

      {/* Papers List */}
      <div className="space-y-6">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-200"
            onClick={(e) => handleItemClick(e, item.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleItemClick(e, item.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="p-6">
              <div className="flex flex-col space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900 hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-sm text-gray-500 whitespace-nowrap ml-4">
                    {new Date(item.line2.replace('Date : ', '')).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600">
                  {item.line1}
                </p>

                {item.technologies?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.technologies.map((tech, techIndex) => (
                      <span
                        key={`tech-${techIndex}`}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center mt-3">
                  <button
                    onClick={(e) => toggleAbstract(e, item.id)}
                    className="abstract-toggle flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none transition-colors duration-200"
                    aria-expanded={expandedId === item.id}
                    aria-controls={`abstract-${item.id}`}
                  >
                    {expandedId === item.id ? (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        Hide Abstract
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        Read Abstract
                      </>
                    )}
                  </button>
                  <a 
                    href={item.line4} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                    onClick={e => e.stopPropagation()}
                  >
                    Read full paper →
                  </a>
                </div>
                
                {expandedId === item.id && (item.abstract || item.line3) && (
                  <div 
                    id={`abstract-${item.id}`}
                    className="abstract-content mt-3 p-4 bg-gray-50 rounded-md border border-gray-200 transition-all duration-300 ease-in-out" 
                    onClick={e => e.stopPropagation()}
                  >
                    <h4 className="text-sm font-medium text-gray-800 mb-2">Abstract:</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {item.abstract || item.line3 || 'No abstract available'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-b-lg">
        <div className="flex flex-1 justify-between sm:hidden">
          <a href="#" className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Previous
          </a>
          <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(items.length, 10)}</span> of{' '}
              <span className="font-medium">{items.length}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <a
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                &larr; Previous
              </a>
              <a
                href="#"
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                2
              </a>
              <a
                href="#"
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                3
              </a>
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                Next &rarr;
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListSection;
