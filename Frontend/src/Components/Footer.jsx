import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-8 px-6 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        
        <div className="text-lg font-semibold">
          ReWear &copy; {new Date().getFullYear()}
        </div>

        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Use
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </div>

        <div className="text-sm text-green-100">
          Made with 💚 for a greener planet.
        </div>
      </div>
      <div className="text-sm text-green-100 ">Made by 
        Raagan Patel,\n
        Harshal Patel,
       Krushnadev Rayjada
        </div>
    </footer>
  );
};

export default Footer;
