import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Home from "./pages/Home";
import Destination from "./pages/Destinations";
import Plan from "./pages/Plan";
import DestinationDetails from "./pages/DestinationDetails";
import Itinerary from "./pages/Itinerary";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import LogInPage from "./pages/Log-In";
import SignUpPage from "./pages/Sign-Up";
import Footer from "./components/Footer";



function App(){
  return(
   
  <BrowserRouter>
  <div className="flex flex-col min-h-screen">
      <Header/>

      <main className="flex-grow">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/plan" element={<Plan/>} />
        <Route path="/itinerary" element={<Itinerary/>} />
        {/* <Route path="/destination/:id" element={<DestinationDetails />} /> */}
        <Route path="/destinationdetails" element={<DestinationDetails />} />
        <Route path="/log-in" element={<LogInPage/>} />
        <Route path="/sign-up" element={<SignUpPage/>}/>
      </Routes> 
      </main>

      <Footer/>
      </div>
      </BrowserRouter>
   
  );
}
export default App;
