import { BrowserRouter,Route,Routes } from "react-router-dom";
import Api1 from "./Services/Api1";
import Api2 from "./Services/Api2";
import Layout from "./Layout";
import Customcommands1 from './Services/Customcommands1.tsx'
import ActuationFetcher from './Services/ActuationFetcher .tsx'
import CommandFetcher from './Services/CommandFetcher .tsx'
import ModelListPage from './Services/ModelListPage.tsx'
import BikeMakeList from './Services/BikeMakeList.tsx'
import OdometerDetails from './Services/OdometerDetails.tsx'




function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout/>}>
      {/* <Route path="/" element={<Sidebar/>}/> */}
      <Route path="api1" element={<Api1/>}/>
      <Route path="api2" element={<Api2/>}/>
      <Route path="Customcommands1" element={<Customcommands1/>}/>
      <Route path="ActuationFetcher" element={<ActuationFetcher/>}/>
      <Route path="CommandFetcher" element={<CommandFetcher/>}/>
      <Route path="CommandFetcher" element={<CommandFetcher/>}/>
      <Route path="ModelListPage" element={<ModelListPage/>}/>
      <Route path="BikeMakeList" element={<BikeMakeList/>}/>
      <Route path="OdometerDetails" element={<OdometerDetails/>}/>
    </Route>
    </Routes>
    </BrowserRouter>



  )
}

export default App