import { useState } from "react";

function App() {
  const [subreddit, setSubreddit] = useState("");
  const [keywords, setKeywords] = useState("");
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async () => {
    if (!subreddit || !keywords) {
      setError("Subreddit and keywords are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://localhost:5000/api/search?subreddit=${subreddit}&keywords=${keywords}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResults(data.results);
      setTotalPages(Math.ceil(data.results.length / limit));
    } catch (error) {
      console.log(error);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const currentResults = results.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="container mx-auto flex flex-col sm:flex-row gap-8">
        {/* Search Section */}
        <div className="w-full sm:w-1/3 p-6 bg-white border rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center mb-6">Reddit Search</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchData();
            }}
          >
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="subreddit"
              >
                Subreddit Name
              </label>
              <input
                type="text"
                id="subreddit"
                value={subreddit}
                onChange={(e) => setSubreddit(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., learnpython"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="keywords"
              >
                Keywords (comma separated)
              </label>
              <input
                type="text"
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., AI, Python, machine learning"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="limit"
              >
                Number of Posts
              </label>
              <select
                id="limit"
                value={limit}
                onChange={(e) => setLimit(parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg mt-4 hover:bg-blue-600 transition-all"
            >
              {loading ? "Loading..." : "Search"}
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>

        {/* Results Section */}
        <div className="w-full sm:w-2/3 p-6 bg-white border rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Results</h2>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="spinner-border animate-spin border-4 border-t-transparent rounded-full w-12 h-12 border-blue-500"></div>
            </div>
          ) : results.length === 0 ? (
            <p className="text-center text-gray-500">No results found.</p>
          ) : (
            <div>
              <ul>
                {currentResults.map((post, idx) => (
                  <li key={idx} className="mb-6 p-6 border-b border-gray-200 rounded-lg hover:shadow-lg transition-all">
                    <h3 className="font-semibold text-xl">{post.title}</h3>
                    <p className="text-sm text-gray-500">Author: {post.author}</p>
                    <p className="text-sm text-gray-500">Score: {post.score}</p>
                    <p className="text-sm text-gray-500">Comments: {post.comments}</p>
                    <p className="text-sm text-gray-500">
                      Created: {new Date(post.created_utc * 1000).toLocaleString()}
                    </p>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 mt-2 inline-block"
                    >
                      Read more
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex justify-between mt-8">
                <button
                  disabled={currentPage === 1}
                  onClick={() => handlePagination(currentPage - 1)}
                  className="bg-gray-300 py-2 px-4 rounded-lg disabled:opacity-50"
                >
                  Prev
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => handlePagination(currentPage + 1)}
                  className="bg-gray-300 py-2 px-4 rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
