import { useState } from 'react'
import axios from 'axios';



interface Result {
  objectID: string;
  title: string;
 }

function Home() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Result[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [searched, setSearched] = useState<boolean>(false);

  const search = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
      setResults(response.data.hits);
      setSearched(true);
    } catch (error) {
      console.error(error);
     
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-3xl font-bold text-gray-600">Loading...</div>;
   }
  return (
    <div className={`max-w-4xl mx-auto p-8 bg-white rounded-lg transition-all duration-500 ${searched ? 'mt-4' : 'mt-40'}`}>
      <div className="flex justify-between">
        <div className="inline-flex border rounded w-11/12 px-2 lg:px-6 h-12 bg-transparent">
          <div className="flex flex-wrap items-stretch w-full h-full mb-6 relative">
            <div className="flex">
              <span className="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-black ">
                <svg
                  width="18"
                  height="18"
                  className="w-4 lg:w-auto"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
                    stroke="#455A64"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.9993 16.9993L13.1328 13.1328"
                    stroke="#455A64"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
            <input
              type="text"
              className="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-black "
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="hello">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4" onClick={search}>Search</button>
        <ul className="mt-8 space-y-4">
        {results.map((result) => (
          <li key={result.objectID} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <a className="text-2xl font-medium text-gray-700 hover:text-blue-500" href={`/item/${result.objectID}`}>{result.title}</a>
          </li>
        ))}
        </ul>
      </div>
    </div>
  )
}

export default Home;
