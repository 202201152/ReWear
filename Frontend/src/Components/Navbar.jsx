const Navbar = () => {
  const navItems = ['Home', 'About', 'Services', 'Contact'];

  return (
    <header>
      <nav>
        <div className="bg-white flex-1 flex justify-center max-sm:">
          {navItems.map((nav, i) => (
            <div
              key={nav}
              className="px-5 text-xl cursor-pointer text-black hover:text-red-700 transition-all"
            >
              {nav}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
