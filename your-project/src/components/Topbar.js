import { FiSearch } from "react-icons/fi";

const Topbar = () => {
  return (
    <div className="ml-64 flex items-center justify-between bg-gray-100 px-6 py-3 sticky top-0 z-10">
      <div className="flex items-center space-x-3">
        <img src="/logo.png" alt="logo" className="h-10 w-auto" />
        <span className="text-xl font-bold">KnowTogether</span>
      </div>
      <div className="relative w-1/3">
        <FiSearch className="absolute top-2.5 left-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-200 outline-none"
        />
      </div>
    </div>
  );
};

export default Topbar;
