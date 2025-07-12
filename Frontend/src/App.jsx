import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import Hero from "./components/Hero";
import Profile from "./pages/Profile";

function App() {
  const handleSearch = (query) => {
    console.log("User searched for:", query);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar onSearch={handleSearch} />
                <Hero />
              </>
            }
          />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
