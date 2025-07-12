import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';

function App() {
  
  const handleSearch = (query) => {
    console.log('User searched for:', query);
    
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <Navbar />
    
      <SearchBar onSearch={handleSearch} />

      <main className="flex-grow">
        <Hero />
      </main>

      <Footer />
    </div>
  );
}

export default App;
