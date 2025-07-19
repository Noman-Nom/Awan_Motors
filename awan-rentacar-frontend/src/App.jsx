import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cars from "./pages/Cars";
import Customers from './pages/Customers';
import Bookings from './pages/Bookings'; 
import CarBookings from "./pages/CarBookings";


export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-700 text-white p-4">
          <h1 className="text-2xl font-bold">Awan Motors – Rent A Car</h1>
          <nav className="mt-2">
            <Link
              to="/"
              className="mr-4 hover:underline"
            >
              Cars
            </Link>
            <Link
              to="/customers"
              className="mr-4 hover:underline"
            >
              Customers
            </Link>
            <Link
              to="/bookings"
              className="hover:underline"
            >
              Bookings
            </Link>
          </nav>
        </header>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<Cars />} />
          <Route path="/customers" element={<Customers />} />
          
           <Route path="/bookings" element={<Bookings />} />
           <Route path="/cars/:registration_no/bookings" element={<CarBookings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
