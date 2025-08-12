
import { useLocation, useNavigate } from "react-router-dom";
import ScanDcodeArr from "./ScanDcodeArr";

const ScanDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ScanArray, DecodeArray,start_time,end_time,license_plate,email,App_version,scan_ended,functiones,type } = location.state || {};

  return (
    <div className="p-4 ml-7">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-300 px-4 py-2 rounded"
      >
        ⬅ Back
      </button>

      <h1 className="text-xl font-bold mb-2 ml-6">Scan Decode Details</h1>

      <ScanDcodeArr ScanArray={ScanArray} DecodeArray={DecodeArray} start_time={start_time} end_time={end_time}license_plate={license_plate} email={email} app_version={App_version} scan_ended={scan_ended} functiones={functiones} type={type} />
    </div>
  );
};

export default ScanDetailPage;

















// import { useLocation, useNavigate } from "react-router-dom";

// interface DetailsPageProps {
//   title?: string;
//   RenderComponent: React.ComponentType<any>;
// }

// const DetailsPage: React.FC<DetailsPageProps> = ({ title = "Details", RenderComponent }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const stateData = location.state || {};

//   return (
//     <div className="p-4 ml-7">
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-4 bg-gray-300 px-4 py-2 rounded"
//       >
//         ⬅ Back
//       </button>

//       <h1 className="text-xl font-bold mb-2 ml-6">{title}</h1>

//       <RenderComponent {...stateData} />
//     </div>
//   );
// };

// export default DetailsPage;
