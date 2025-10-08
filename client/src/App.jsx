import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/home";
import Destination from "./pages/destinations";
import DestinationDetails from "./pages/destinationDetails";
import Header from "./components/header";




function App(){
  return(
   <>
  <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/destination/:id" element={<DestinationDetails />} />
      </Routes> 
      </BrowserRouter>
   </>
  );
}
export default App;
