import { useParams, Link, useNavigate } from 'react-router-dom';

const ItemDetail = ({ items = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const numericId = parseInt(id, 10);
  const currentItem = items.find(item => item.id === numericId);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!currentItem) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Paper not found</h2>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Back to Papers List
          </Link>
        </div>
      </div>
    );
  }

  // Find previous and next items for navigation
  const currentIndex = items.findIndex(item => item.id === numericId);
  const prevItem = currentIndex > 0 ? items[currentIndex - 1] : null;
  const nextItem = currentIndex < items.length - 1 ? items[currentIndex + 1] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentItem.title}
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                {formatDate(currentItem.line2.replace('Date : ', ''))}
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Papers
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Authors</h2>
            <p className="text-gray-700">{currentItem.line1}</p>
          </div>

          {currentItem.technologies?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Categories</h2>
              <div className="flex flex-wrap gap-2">
                {currentItem.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Abstract</h2>
            <p className="text-gray-700">{currentItem.line3}</p>
          </div>

          {currentItem.line4 && (
            <div className="mt-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Full Paper</h2>
              <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
                <iframe 
                  src={currentItem.line4} 
                  className="w-full h-[800px]"
                  title="Paper Content"
                ></iframe>
              </div>
            </div>
          )}
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => prevItem && navigate(`/item/${prevItem.id}`)}
                disabled={!prevItem}
                className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md ${
                  prevItem 
                    ? 'text-gray-700 bg-white hover:bg-gray-50' 
                    : 'text-gray-400 bg-gray-50 cursor-not-allowed'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                <svg className="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Previous Paper
              </button>
              <button
                type="button"
                onClick={() => nextItem && navigate(`/item/${nextItem.id}`)}
                disabled={!nextItem}
                className={`ml-3 inline-flex items-center px-4 py-2 border ${
                  nextItem 
                    ? 'border-transparent bg-indigo-600 hover:bg-indigo-700 text-white' 
                    : 'border-gray-300 bg-gray-50 text-gray-400 cursor-not-allowed'
                } text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              >
                Next Paper
                <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
