import React ,{useEffect,useState,useCallback,useRef} from "react";
import TableHead  from "../ReusedCompontets/TableHead"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ITEMS_PER_PAGE = 30;


const columns = [
    "Name",
    "model",
    "make",
    "Header",
    "Sub Header",
    "PIN",
    "Protocol",
    "Formula Based",
    "Formula (Metric)",
    "Formula (Imperial)",
    "Unit (Metric)",
    "Unit (Imperial)",
    "Reference JSON"
];


const LiveDateCommands : React.FC = () => {
    const [liveData , setLiveData] = useState<any[]>([]);
    const [loading,setLoading] = useState<boolean> (false);
    const [error,setError] = useState<string>("");

    const [make,setMake] = useState<string>("");
    const [model,setModel] = useState<string>("");
    const [module,setModule] = useState<string>("");

    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    

    const abortControllerRef = useRef<AbortController | null >(null);

    const FetchLiveData = useCallback(async (targetPage ? : number,currentMake?: string,currentModel?:string
        ,currentModule ? : string
    )=>{
        if(abortControllerRef.current){
            abortControllerRef.current.abort();
        }

        abortControllerRef.current = new AbortController();

        setLoading(true)
        setError("");

        const currentPage = targetPage ?? page;
        const searchMake = currentMake !== undefined ? currentMake : make;
        const searchModel = currentModel !== undefined ? currentModel : model;
        const searchModule = currentModule !== undefined ? currentModule : module;

        try {
            const url = `${API_BASE_URL}api/LiveDataCommands?make=${searchMake}&model=${searchModel}&module=${searchModule}&limit=${ITEMS_PER_PAGE}&page=${currentPage}`;

          const token = localStorage.getItem("token");
            const response = await fetch(url,{
                signal : abortControllerRef.current.signal,
                headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}), // ✅ attach token
                },
            })

            if(!response.ok){
                throw new Error(`HTTP error! status : ${response.status}`);
            }

            const result = await response.json();

            if(Array.isArray(result.data)){
                setLiveData(result.data);
                setTotal(typeof result.total === "number" ? result.total : result.data.length);
                setError("");
                if(result.data.length === 0){
                    if(searchMake || searchModel || searchModule){
                        setError("No live data found for the specified criteria.");
                    }else{
                        setError("No live data available.");
                    }
                }
            }
            else{
                setLiveData([]);
                setError("No Live data found");
                setTotal(0);
            }


        } catch (err) {
            if(err instanceof Error && err.name === 'AbortError'){
                return;
            }

            console.error("Error fetching live data :", err);
            setLiveData([]);
            setError("Failed to fetch live data . please try again.");
            
        }finally{
            setLoading(false);
            abortControllerRef.current = null;
        }
    },[]);

    // Fetch on first render - load all data by default
    useEffect(() => {
        FetchLiveData(1);
    },[]);

     // Handle search button click
    const handleSearch = () => {
        setPage(1);
        FetchLiveData(1,make,model,module);
    };
     // Handle page navigation
     const handlePageChange = (newpage : number) => {
        setPage(newpage);
        FetchLiveData(newpage,make,model , module);
     }

    //  Cleanup on unmout 
    useEffect(() => {
        return () => {
            if(abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        }
    },[]);

    const totalPages = Math.max(1,Math.ceil(total / ITEMS_PER_PAGE));

    return(
        <div className="min-h-screen flex flex-col p-6 max-w-full mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Live Details
       </h1>

       <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
            <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
            }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4"
            >
                <input type="text"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="Make"
                className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />

                <input type="text"
                 value={model}
                 onChange={(e) => setModel(e.target.value)}
                 placeholder="Model"
                 className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
                 <input type="text"
                 value={module}
                 onChange={(e) => setModule(e.target.value)}
                 placeholder="Module"
                 className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                <button
                type="submit" // ✅ Enter key will trigger this
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
                disabled={loading}
                >
                {loading ? "Loading..." : "Fetch"}
                    </button>
                </form>
            </div>

            {error && <p className="text-red-500 text-center py-4 text-lg">{error}</p>}

            <div className="flex-1 overflow-auto space-y-6">
                {
                    loading ? (
                        <div className="flex items-center justify-center py-20">
                            <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-blue-500 text-xl">Loading odometer data...</p>
                            <p className="text-gray-500 mt-2">Please wait while we fetch the data</p>
                            </div>
                        </div>
        ) : liveData.length > 0 ? (
            <div className="bg-white border rounded-lg shadow-sm p-6">
                 <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-blue-700">
                Live Data Results
              </h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {liveData.length} items
              </span>
            </div>
            <div className="overflow-x-auto">
                 <table className="min-w-full text-sm border">
                     <TableHead columns={columns} />
                    <tbody>
                        {
                            liveData.map((item,idx) => (
                               <tr key={idx} className="hover:bg-gray-50">
                                <td className="border px-3">
                                {item.name ? (
                          <span className=" px-2  rounded text-xs font-mono">
                            {item.name}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                        <td className="border px-3">
                        {item.model ? (
                          <span className=" px-2  rounded text-xs font-mono">
                            {item.model}
                          </span>
                        ) : (
                          "-"
                        )}
                        </td>
                        <td className="border px-3">
                        {item.make ? (
                          <span className=" px-2  rounded text-xs font-mono">
                            {item.make}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                        <td className="border px-3">
                        {item.header ? (
                          <span className=" px-2  rounded text-xs font-mono">
                            {item.header}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                        <td className="border px-3">
                        {item.subHeader ? (
                          <span className=" px-2  rounded text-xs font-mono">
                            {item.subHeader}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                        <td className="border px-3">
                        {item.pid ? (
                          <span className=" px-2  rounded text-xs font-mono">
                            {item.pid}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                        <td className="border px-3">
                        {item.protocol ? (
                          <span className=" px-2  rounded text-xs font-mono">
                            {item.protocol}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                        <td className="border px-3">
                        {item.formulaBased ? (
                          <span className=" px-2  rounded text-xs font-mono">
                            {item.formulaBased}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                        <td className="border px-3">
                        {item.formula_metric ? (
                          <span className=" px-2  rounded text-xs font-mono">
                            {item.formula_metric}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                        <td className="border px-3">
                        {item.formula_imperial ? (
                          <span className=" px-2  rounded text-xs font-mono">
                            {item.formula_imperial}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                        <td className="border px-3">
                        {item.unit_metric ? (
                          <span className=" px-2  rounded text-xs font-mono">
                            {item.unit_metric}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                        <td className="border px-3">
                        {item.unit_imperial ? (
                          <span className=" px-2  rounded text-xs font-mono">
                            {item.unit_imperial}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>
                        <td className="border px-3">
                        {item.referenceJSON ? (
                          <span className=" px-2  rounded text-xs font-mono">
                            {item.referenceJSON}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>

                    </tr>
                            ))
                        }
                    </tbody>
                 </table>

                </div>
            </div>

        ) : !error && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-xl">No odometer data to display</p>
              <p className="text-gray-400 mt-2">Try searching with different criteria</p>
            </div>
        )}

            </div>

            {liveData.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => handlePageChange(Math.max(1, page - 1))}
            disabled={page === 1 || loading}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Previous
          </button>
          
          {/* Page numbers */}
          <div className="flex gap-2">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  disabled={loading}
                  className={`px-3 py-2 rounded transition ${
                    page === pageNum
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  } disabled:opacity-50`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
            disabled={page === totalPages || loading}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Next
          </button>
        </div>
            )}

             {totalPages > 0 && (
        <div className="text-center text-sm text-gray-500 mt-2 bg-white rounded-lg p-4 border">
          <div className="flex flex-wrap justify-center items-center gap-6">
            <span>📄 Page {page} of {totalPages}</span>
            <span>📊 Total Items: {total}</span>
            <span>🔧 Current Page Items: {liveData.length}</span>
          </div>
        </div>
      )}
        </div>
    )}

export default LiveDateCommands