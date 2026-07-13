const Header = () => {
    return (
        <header className="w-5/6 mx-auto">
            <nav className="flex justify-between items-center">
                <div className="my-1">
                    <img src="https://placehold.co/40" alt="Logo" />
                </div>
                <ul className="flex gap-6 justify-between items-center">
                    <li className="px-2 py-1 hover:text-(--primary-color)"><a href="#">Home</a></li>
                    <li className="px-2 py-1 hover:text-(--primary-color)"><a href="#">About Us</a></li>
                    <li className="px-2 py-1 hover:text-(--primary-color)"><a href="#">Classes</a></li>
                    <li className="px-2 py-1 hover:text-(--primary-color)"><a href="#">Blog</a></li>
                    <li className="px-2 py-1 hover:text-(--primary-color)"><a href="#">Contact</a></li>
                </ul>
                <button className="my-1 px-5 py-1 bg-(--accent-color) text-white shadow-sm rounded-lg">
                    Enroll a Class
                </button>
            </nav>
        </header>
    );
};

export default Header;