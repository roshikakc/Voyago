import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Destination from "./pages/Destinations";
import Plan from "./pages/Plan";
import DestinationDetailsPage from "./pages/DestinationDetailsPage";
import Itinerary from "./pages/Itinerary";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import LogInPage from "./pages/Log-In";
import SignUpPage from "./pages/Sign-Up";
import Footer from "./components/Footer";
import ProtectedRoute from './components/protectedRoute';




function App() {
  return (

    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/destination" element={<Destination />} />
            <Route path="/profile" element={<Profile />} />
         
            <Route path="/itinerary" element={<Itinerary />} />
            {/* <Route path="/destination/:id" element={<DestinationDetails />} /> */}
            <Route path="/destinationdetailspage" element={<DestinationDetailsPage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            <Route path="/plan" element={
              <ProtectedRoute>
                <Plan />
              </ProtectedRoute>}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>

  );
}
export default App;
