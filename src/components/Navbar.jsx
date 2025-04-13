import { appleImg, searchImg, bagImg } from "../utils";
import { navLists } from "../constants";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center w-full py-5 px-5">
      <nav className="flex w-full screen-max-width">
        <img src={appleImg} alt="apple-logo" width={14} height={18} />
        <div className="flex flex-1 justify-center max-sm:hidden gap-5">
          {navLists.map((product, i) => (
            <div
              key={i}
              className="text-sm cursor-pointer font-bold text-gray-400 hover:text-white transition-all"
            >
              {product}
            </div>
          ))}
        </div>
        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img
            src={searchImg}
            alt="search"
            width={18}
            height={18}
            className="cursor-pointer"
          />
          <img
            src={bagImg}
            alt="bag"
            width={18}
            height={18}
            className="cursor-pointer"
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
