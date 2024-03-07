import { useAppSelector } from "@/lib/hook";
import { ITodo } from "@/types/todo.interface";

interface IProps {
  isModalUpdateOpen: boolean;
  closeModal: () => void;
  todoInfo: ITodo;
  handleSaveTodo: () => void;
  handleInputUpdateChange: (e: React.ChangeEvent<any>) => void;
}

const ModalUpdate = (props: IProps) => {
  const {
    isModalUpdateOpen,
    closeModal,
    todoInfo,
    handleSaveTodo,
    handleInputUpdateChange,
  } = props;

  const users = useAppSelector((state) => state.userReducer);

  return (
    <>
      {isModalUpdateOpen && (
        <div
          id="modal"
          tabIndex={-1}
          aria-hidden="true"
          className="bg-gray-500 bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full inset-0 h-full md:inset-0"
        >
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Update todo
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                  onClick={closeModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <div className="my-3">
                  <label htmlFor="name" className="text-slate-400 text-sm">
                    Task name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="New task..."
                    required
                    value={todoInfo?.name}
                    onChange={handleInputUpdateChange}
                  />
                </div>

                <div className="my-3">
                  <label htmlFor="status" className="text-slate-400 text-sm">
                    Status:
                  </label>
                  <select
                    name="status"
                    value={todoInfo?.status}
                    onChange={handleInputUpdateChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option disabled>Choose a status</option>

                    <option value="Open">Open</option>
                    <option value="InProcess">In process</option>
                    <option value="Done">Done</option>
                  </select>
                </div>

                <div className="my-3">
                  <label htmlFor="deadline" className="text-slate-400 text-sm">
                    Deadline:
                  </label>
                  <input
                    name="deadline"
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Select date"
                    value={todoInfo?.deadline}
                    onChange={handleInputUpdateChange}
                  />
                </div>

                <div className="my-3">
                  <label
                    htmlFor="assignment"
                    className="text-slate-400 text-sm"
                  >
                    Assignment:
                  </label>
                  <select
                    name="assignment"
                    value={todoInfo?.assignment}
                    onChange={handleInputUpdateChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option disabled>Choose</option>
                    {users?.map((user, index) => (
                      <option value={user.email} key={index}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSaveTodo}
                >
                  Save
                </button>
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalUpdate;
