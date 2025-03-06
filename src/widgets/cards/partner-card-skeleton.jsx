const PartnerCardSkeleton = () => {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
        <div className="flex flex-col h-full">
          <div className="flex p-4">
            <div className="mr-3 flex-shrink-0">
              <div className="h-[7rem] w-[4rem] rounded-lg bg-gray-200"></div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-5 bg-indigo-100 rounded w-2/3 mb-2"></div>
              <div className="mt-2 flex items-center">
                <div className="h-3 w-3 rounded-full bg-gray-200 mr-1"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
  
          <div className="mt-auto border-t border-gray-100">
            <div className="flex">
              <div className="flex-1 py-2 text-center">
                <div className="h-4 bg-blue-100 rounded mx-auto w-2/3"></div>
              </div>
              <div className="w-10 py-2 flex items-center justify-center">
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


export default PartnerCardSkeleton;