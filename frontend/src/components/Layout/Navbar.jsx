import React from "react";
import styles from "../../styles/style";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <>
      <div className={`block 800px:${styles.normalFlex}`}>
        {navItems &&
          navItems?.map((navItem, index) => (
            <>
              <div className="flex" key={navItem}>
                <Link
                  to={navItem.url}
                  className={`${
                    active === index + 1
                      ? "text-[#17dd1f]"
                      : "text-black 800px:text-white"
                  } font-[500] 800px:pb-0 pb-10 px-6 cursor-pointer`}
                >
                  {navItem.title}
                </Link>
              </div>
            </>
          ))}
      </div>
    </>
  );
};

export default Navbar;
