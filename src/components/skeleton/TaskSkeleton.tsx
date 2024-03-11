const TaskSkeleton = () => {
  return (
    <div className="mx-auto sm:px-10 md:px-8 lg:px-14 xl:px-20 mt-40">
      <div className="bg-gray-100 shadow-md rounded-md p-8 animate-pulse">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold mb-4 h-10 w-1/2 bg-gray-300 rounded"></h2>
          <div className="flex space-x-2">
            <div className="h-8 w-20 bg-green-300 rounded"></div>
            <div className="h-8 w-20 bg-red-300 rounded"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <div className="text-gray-700 font-bold mb-2 h-4 w-1/4 bg-gray-300 rounded"></div>
            <div className="text-gray-800 h-4 w-3/4 bg-gray-300 rounded"></div>
          </div>
          <div className="mb-4">
            <div className="text-gray-700 font-bold mb-2 h-4 w-1/4 bg-gray-300 rounded"></div>
            <div
              className={`text-gray-800 h-4 w-3/4 bg-gray-300 rounded`}
            ></div>
          </div>
          <div className="mb-4">
            <div className="text-gray-700 font-bold mb-2 h-4 w-1/4 bg-gray-300 rounded"></div>
            <div className="flex space-x-2">
              <div className="h-4 w-10 bg-gray-300 rounded"></div>
              <div className="h-4 w-10 bg-gray-300 rounded"></div>
              <div className="h-4 w-10 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-gray-700 font-bold mb-2 h-4 w-1/4 bg-gray-300 rounded"></div>
            <div className="text-gray-800 h-4 w-3/4 bg-gray-300 rounded"></div>
          </div>
          <div className="mb-4">
            <div className="text-gray-700 font-bold mb-2 h-4 w-1/4 bg-gray-300 rounded"></div>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <div className="h-4 w-4 bg-gray-300 rounded mr-2"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
              </div>
              <div className="flex items-center mb-2">
                <div className="h-4 w-4 bg-gray-300 rounded mr-2"></div>
                <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSkeleton;
