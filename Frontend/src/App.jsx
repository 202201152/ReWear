import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Hero from "./components/Hero";
import Profile from "./pages/Profile";
import BrowseItems from "./pages/BrowseItems";
import SwapRequests from "./components/SwapRequests"; // ✅ NEW

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

          {/* ✅ Profile Page */}
          <Route path="/profile" element={<Profile />} />

          {/* ✅ Browse Items Page */}
          <Route path="/browse" element={<BrowseItems />} />

          {/* ✅ Swap Requests Page */}
          <Route path="/swap-requests" element={<SwapRequests />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
