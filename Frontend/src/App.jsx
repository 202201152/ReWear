// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Hero from "./components/Hero";
import Profile from "./pages/Profile";
import BrowseItems from "./pages/BrowseItems";
import SwapRequests from "./components/SwapRequests";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Import this
import ItemDetails from "./pages/ItemDetail";

function App() {
  const handleSearch = (query) => {
    console.log("User searched for:", query);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          {/* ✅ Home Page */}
          <Route
            path="/"
            element={
              <>
                <SearchBar onSearch={handleSearch} />
                <Hero />
              </>
            }
          />

          {/* ✅ Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/browse"
            element={
              <ProtectedRoute>
                <BrowseItems />
              </ProtectedRoute>
            }
          />

          <Route
            path="/swap-requests"
            element={
              <ProtectedRoute>
                <SwapRequests />
              </ProtectedRoute>
            }
          />
          <Route
            path="/item/:id"
            element={
              <ProtectedRoute>
                <ItemDetails />
              </ProtectedRoute>
            }
          />


          {/* ✅ Admin Routes */}

          {/* ✅ Public Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
