import React from 'react';

const Navbar = () => {
    return (
        <header>
            <nav>
                <div className="bg-white flex-1 flex justify-center max-sm:">
                    {['Home', 'About', 'Services', 'Contact'].map((nav, i) => (
                        <div className="px-5 text-sm coursor-pointer text-black hover:text-red-700 transition-all ">
                            {nav}
                        </div>
                    ))}
                </div>
            </nav>
        </header>
    )
}

export default Navbar