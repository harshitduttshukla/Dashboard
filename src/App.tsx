import { BrowserRouter,Route,Routes } from "react-router-dom";
import Api1 from "./Services/Api1";
import Api2 from "./Services/Api2";
import Layout from "./Layout";




function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout/>}>
      {/* <Route path="/" element={<Sidebar/>}/> */}
      <Route path="api1" element={<Api1/>}/>
      <Route path="api2" element={<Api2/>}/>
    </Route>
    </Routes>
    </BrowserRouter>



  )
}

export default App