const Feed = () => {
  return (
    <div className="ml-64 mt-4 p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to KnowTogether</h1>

      <div className="space-y-6">
        {[1, 2, 3].map((post) => (
          <div key={post} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="font-semibold text-lg">User {post} posted:</h3>
            <p className="text-gray-700 mt-2">Some interesting experience or post shared here...</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
