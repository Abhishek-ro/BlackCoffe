"use client";
import { useState, useMemo } from "react";
import InsightsChart from "./components/InsightsChart";
import LikelihoodChart from "./components/LikelihoodChart";
import { unparse } from "papaparse";
import useInsights from "./hooks/useInsights";




export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [endYear, setEndYear] = useState("");
  const [region, setRegion] = useState("");
  const [pestle, setPestle] = useState("");
  const [source, setSource] = useState("");
  const [swot, setSwot] = useState("");
  const [city, setCity] = useState("");

  const { insights: filteredData, isLoading } = useInsights({
    topic: selectedTopic,
    country: selectedCountry,
    sector: selectedSector,
    search: searchQuery,
    end_year: endYear,
    region,
    pestle,
    source,
    swot,
    city,
  });
  
  
  const topics = useMemo(
    () => [
      ...new Set(
        (filteredData || []).map((item) => item.topic).filter(Boolean)
      ),
    ],
    [filteredData]
  );

  const countries = useMemo(
    () => [
      ...new Set(
        (filteredData || []).map((item) => item.country).filter(Boolean)
      ),
    ],
    [filteredData]
  );

  const sectors = useMemo(
    () => [
      ...new Set(
        (filteredData || []).map((item) => item.sector).filter(Boolean)
      ),
    ],
    [filteredData]
  );
  


  return (

    <div
      className={`${
        isDarkMode ? "dark" : ""
      } min-h-screen font-sans antialiased`}
    >
      <main className="bg-gray-950 dark:bg-gray-950 text-gray-100 dark:text-gray-100 py-10 px-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto space-y-8">
          {" "}
         
          <div className="flex justify-between items-center pb-6 border-b border-gray-800">
            {" "}
            
            <h1 className="text-4xl font-extrabold text-white">
              {" "}
             
              Blackcoffer Insights Dashboard
            </h1>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="px-5 py-2 rounded-full bg-gray-700 text-gray-200 shadow-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 flex items-center gap-2"
              aria-label="Toggle light/dark mode"
            >
              
              Toggle {isDarkMode ? "Light" : "Dark"} Mode
            </button>
          </div>
          
          <div className="bg-gray-850 p-7 rounded-xl shadow-2xl border border-gray-700">
            {" "}
           
            <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
              {" "}
            
              Filter Insights
            </h2>
        
            <div className="mb-6">
              <label
                htmlFor="search-input"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Search by Title or Insight
              </label>
              <input
                id="search-input"
                type="text"
                placeholder="e.g., market trends, economic impact..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-600 rounded-lg shadow-sm bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              {" "}
           
              <div>
                <label
                  htmlFor="topic-select"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Topic
                </label>
                <select
                  id="topic-select"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8 transition-colors duration-200 cursor-pointer"
                >
                  <option value="" className="text-gray-400">
                    All Topics
                  </option>
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="country-select"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Country
                </label>
                <select
                  id="country-select"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8 transition-colors duration-200 cursor-pointer"
                >
                  <option value="" className="text-gray-400">
                    All Countries
                  </option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="sector-select"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Sector
                </label>
                <select
                  id="sector-select"
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8 transition-colors duration-200 cursor-pointer"
                >
                  <option value="" className="text-gray-400">
                    All Sectors
                  </option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>
             
              <div>
                <label
                  htmlFor="end-year-select"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  End Year
                </label>
                <select
                  id="end-year-select"
                  value={endYear}
                  onChange={(e) => setEndYear(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8 transition-colors duration-200 cursor-pointer"
                >
                  <option value="" className="text-gray-400">
                    All End Years
                  </option>
                  {[
                    ...new Set(
                      filteredData.map((item) => item.end_year).filter(Boolean)
                    ),
                  ].map((year, idx) => (
                    <option key={idx} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            
              <div>
                <label
                  htmlFor="region-select"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Region
                </label>
                <select
                  id="region-select"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8 transition-colors duration-200 cursor-pointer"
                >
                  <option value="" className="text-gray-400">
                    All Regions
                  </option>
                  {[
                    ...new Set(
                      filteredData.map((item) => item.region).filter(Boolean)
                    ),
                  ].map((r, idx) => (
                    <option key={idx} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
             
              <div>
                <label
                  htmlFor="pestle-select"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  PESTLE
                </label>
                <select
                  id="pestle-select"
                  value={pestle}
                  onChange={(e) => setPestle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8 transition-colors duration-200 cursor-pointer"
                >
                  <option value="" className="text-gray-400">
                    All PESTLE
                  </option>
                  {[
                    ...new Set(
                      filteredData.map((item) => item.pestle).filter(Boolean)
                    ),
                  ].map((p, idx) => (
                    <option key={idx} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label
                  htmlFor="source-select"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Source
                </label>
                <select
                  id="source-select"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8 transition-colors duration-200 cursor-pointer"
                >
                  <option value="" className="text-gray-400">
                    All Sources
                  </option>
                  {[
                    ...new Set(
                      filteredData.map((item) => item.source).filter(Boolean)
                    ),
                  ].map((s, idx) => (
                    <option key={idx} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
        
              <div>
                <label
                  htmlFor="swot-select"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  SWOT
                </label>
                <select
                  id="swot-select"
                  value={swot}
                  onChange={(e) => setSwot(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8 transition-colors duration-200 cursor-pointer"
                >
                  <option value="" className="text-gray-400">
                    All SWOT
                  </option>
                  {[
                    ...new Set(
                      filteredData.map((item) => item.swot).filter(Boolean)
                    ),
                  ].map((s, idx) => (
                    <option key={idx} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
         
              <div>
                <label
                  htmlFor="city-select"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  City
                </label>
                <select
                  id="city-select"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-8 transition-colors duration-200 cursor-pointer"
                >
                  <option value="" className="text-gray-400">
                    All Cities
                  </option>
                  {[
                    ...new Set(
                      filteredData.map((item) => item.city).filter(Boolean)
                    ),
                  ].map((c, idx) => (
                    <option key={idx} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
           
            <div className="flex justify-end gap-4 mt-6">
              {" "}
    
              <button
                onClick={() => {
                  setSelectedTopic("");
                  setSelectedCountry("");
                  setSelectedSector("");
                  setSearchQuery("");
                }}
                className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-200"
              >
                Reset Filters
              </button>
              <button
                onClick={() => {
                  const csv = unparse(filteredData);
                  const blob = new Blob([csv], {
                    type: "text/csv;charset=utf-8;",
                  });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.setAttribute("href", url);
                  link.setAttribute("download", "filtered_insights.csv");
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors duration-200 flex items-center gap-2"
              >
               
                Export CSV
              </button>
            </div>
          </div>
        
          {isLoading ? (
            <p className="text-center text-gray-500">Loading insights...</p>
          ) : (
            <>
              <InsightsChart data={filteredData} />
              <LikelihoodChart data={filteredData} />
              ...
            </>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {" "}
           
            <div className="bg-gray-850 p-6 rounded-xl shadow-2xl border border-gray-700">
              {" "}
         
              <h2 className="text-xl font-bold mb-4 text-white">
                Insights by Topic
              </h2>{" "}
             
              <InsightsChart data={filteredData} />
            </div>
            <div className="bg-gray-850 p-6 rounded-xl shadow-2xl border border-gray-700">
              {" "}
           
              <h2 className="text-xl font-bold mb-4 text-white">
                Likelihood Distribution
              </h2>{" "}
              
              <LikelihoodChart data={filteredData} />
            </div>
          </div>
         
          <h2 className="text-3xl font-bold pt-4 text-white">Insights</h2>{" "}
          
          {filteredData.length === 0 ? (
            <p className="text-center text-gray-400 text-lg py-10">
              No insights found matching your criteria. Try adjusting your
              filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredData.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-700 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200"
                >
                  <h3 className="text-lg font-bold text-blue-400 mb-3">
                    {item.title || "Untitled Insight"}
                  </h3>
                  <p className="text-sm text-gray-300 mb-1">
                    <strong className="text-gray-100">Topic:</strong>{" "}
                    {item.topic || <span className="text-gray-500">N/A</span>}
                  </p>
                  <p className="text-sm text-gray-300 mb-1">
                    <strong className="text-gray-100">Sector:</strong>{" "}
                    {item.sector || <span className="text-gray-500">N/A</span>}
                  </p>
                  <p className="text-sm text-gray-300 mb-1">
                    <strong className="text-gray-100">Region:</strong>{" "}
                    {item.region || <span className="text-gray-500">N/A</span>}
                  </p>
                  <p className="text-sm text-gray-300 mb-1">
                    <strong className="text-gray-100">Country:</strong>{" "}
                    {item.country || <span className="text-gray-500">N/A</span>}
                  </p>
                  <p className="text-sm text-gray-300 mb-1">
                    <strong className="text-gray-100">Relevance:</strong>{" "}
                    {item.relevance || (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-300 mb-1">
                    <strong className="text-gray-100">Intensity:</strong>{" "}
                    {item.intensity || (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-300 mb-3">
                    <strong className="text-gray-100">Likelihood:</strong>{" "}
                    {item.likelihood || (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </p>
                  <a
                    href={item.url}
                    className="text-sm text-blue-400 hover:underline mt-2 inline-flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Source
                    
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
