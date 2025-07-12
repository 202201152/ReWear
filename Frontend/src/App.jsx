import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-white">
      <Navbar />

      <main className="flex-grow">
        <Hero />
      </main>

      <Footer />
    </div>
  );
}

export default App;
