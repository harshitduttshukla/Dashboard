import { BrowserRouter,Route,Routes } from "react-router-dom";
import Api1 from "./Services/Api1";
import Api2 from "./Services/Api2";
import BikeMakeList from './Services/BikeMakeList.tsx'
import ModelListPage from './Services/ModelListPage.tsx'
import Customcommands1 from './Services/Customcommands1.tsx'
import Layout from "./Compontens/Layout.tsx";
import ActuationFetcher from './Services/ActuationFetcher .tsx'
import CommandFetcher from './Services/CommandFetcher .tsx'
import OdometerDetails from './Services/OdometerDetails.tsx'
import FileUploader from './Services/Updatecommand.tsx'
import UsersTable from "./Services/UsersTable.tsx";
import ObdScanReport from "./Services/Scandetail.tsx";
import ScanDetailPage from "./Compontens/ScanDetailsPage.tsx"; 
import SpdetailsPage from "./Compontens/SpdetailsPage.tsx"; 
import SpecilaFunction from "./Services/SpecialFunctions.tsx"; 



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="api1" element={<Api1 />} />
          <Route path="api2" element={<Api2 />} />
          <Route path="ObdScanReport" element={<ObdScanReport />} />
          <Route path="ObdScanReport/details" element={<ScanDetailPage />} />
          <Route path="SpecilaFunction" element={<SpecilaFunction />} />
          <Route path="/SpecialFunctions/details" element={<SpdetailsPage />} />
          <Route path="BikeMakeList" element={<BikeMakeList />} />
          <Route path="UsersTable" element={<UsersTable />} />
          <Route path="CommandFetcher" element={<CommandFetcher />} />
          <Route path="Customcommands1" element={<Customcommands1 />} />
          <Route path="ActuationFetcher" element={<ActuationFetcher />} />
          <Route path="ModelListPage" element={<ModelListPage />} />
          <Route path="OdometerDetails" element={<OdometerDetails />} />
          <Route path="Updatecommand" element={<FileUploader />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App