// Services/ScanDetailPage.tsx
import { useLocation, useNavigate } from "react-router-dom";
import ScanDcodeArr from "../Compontens/ScanDcodeArr";

const ScanDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ScanArray, DecodeArray } = location.state || {};

  return (
    <div className="p-4 ml-7">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-300 px-4 py-2 rounded"
      >
        ⬅ Back
      </button>

      <h1 className="text-xl font-bold mb-2 ml-6">Scan Decode Details</h1>

      <ScanDcodeArr ScanArray={ScanArray} DecodeArray={DecodeArray} />
    </div>
  );
};

export default ScanDetailPage;
