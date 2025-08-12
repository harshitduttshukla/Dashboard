
import { useLocation, useNavigate } from "react-router-dom";
import SpscanArr from "./SpscanArr";

const ScanDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
//   const { ScanArray, DecodeArray,start_time,end_time,license_plate,email,App_version,scan_ended,functiones,type } = location.state || {};
  const { ScanArray } = location.state || {};

  return (
    <div className="p-4 ml-7">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-300 px-4 py-2 rounded"
      >
        ⬅ Back
      </button>

      <h1 className="text-xl font-bold mb-2 ml-6">Scan Array Details</h1>

      
      <SpscanArr ScanArray= {ScanArray}/>

    </div>
  );
};

export default ScanDetailPage;













