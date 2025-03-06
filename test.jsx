





import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Navbar as MTNavbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Collapse,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export function Navbar({ routes, action }) {
  const [openNav, setOpenNav] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const { scrollY } = useScroll();
  const navRef = useRef(null);
  
  const width = useTransform(scrollY, [0, 100], ["100%", "100%"]);
  const left = useTransform(scrollY, [0, 100], ["50%", "0%"]);
  const translateX = useTransform(scrollY, [0, 100], ["-50%", "0%"]);
  const navbarHeight = useTransform(scrollY, [0, 100], ["4.5rem", "4rem"]);
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0.7)", "rgba(255, 255, 255, 0.95)"]
  );
  const boxShadow = useTransform(
    scrollY, 
    [0, 100], 
    ["0 4px 12px rgba(0,0,0,0.05)", "0 2px 8px rgba(0,0,0,0.1)"]
  );
  const borderRadius = useTransform(scrollY, [0, 100], ["0rem", "0rem"]);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && openNav) {
        setOpenNav(false);
      }
    };
    
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && openNav) {
        setOpenNav(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [openNav]);

  // Close on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpenNav(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navList = (
    <ul className="mb-0 mt-0 flex flex-col gap-1 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map(({ name, path, icon, href, target }) => (
        <Typography
          key={name}
          as="li"
          variant="small"
          color="black"
          className="capitalize p-0"
        >
          {href ? (
            <a
              href={href}
              target={target}
              className="flex items-center gap-1 py-1 px-2 font-medium text-md hover:bg-black/5 rounded transition-colors"
              onClick={() => setOpenNav(false)}
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-4 h-4 opacity-75 mr-1",
                })}
              {name}
            </a>
          ) : (
            <Link
              to={path}
              target={target}
              className="flex items-center gap-1 py-1 px-2 font-medium text-md hover:bg-black/5 rounded transition-colors"
              onClick={() => setOpenNav(false)}
            >
              {icon &&
                React.createElement(icon, {
                  className: "w-4 h-4 opacity-75 mr-1",
                })}
              {name}
            </Link>
          )}
        </Typography>
      ))}
    </ul>
  );

  return (
    <motion.div
      className="fixed top-0 z-50"
      style={{
        width,
        left,
        translateX,
      }}
      ref={navRef}
    >
      <motion.div
        style={{
          backgroundColor,
          borderRadius,
          boxShadow,
          height: navbarHeight,
        }}
        className="transition-all duration-300 ease-in-out backdrop-blur-sm"
      >
        <div className="px-3 h-full">
          <div className="container mx-auto flex items-center justify-between h-full">
            <Link to="/">
              <div className="flex items-center py-1 px-2">
                <img 
                  src="https://businessboosters.club/static/media/logo.b092c9f492105e973cc3.png" 
                  alt="Business Boosters Logo" 
                  className="h-10 w-auto"
                />
              </div>
            </Link>
            <div className="hidden lg:block">{navList}</div>
            <div className="hidden gap-1 lg:flex items-center">
              <Link to='/register'>
                <Button variant="text" className="py-1.5 px-3 text-sm text-[#A51B64]">
                  Join Us
                </Button>
              </Link>
              <a
                href="https://login.businessboosters.club/login"
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="text" className="py-1.5 px-3 text-sm text-[#A51B64]">
                  Login
                </Button>
              </a>
            </div>
            <IconButton
              variant="text"
              size="sm"
              className="ml-auto lg:hidden h-8 w-8 flex items-center justify-center"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <XMarkIcon strokeWidth={2} className="h-5 w-5" />
              ) : (
                <Bars3Icon strokeWidth={2} className="h-5 w-5" />
              )}
            </IconButton>
          </div>
          
          <AnimatePresence>
            {openNav && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="lg:hidden"
              >
                <div className="rounded-b-lg bg-white/95 backdrop-blur-sm px-4 pt-3 pb-6 text-blue-gray-900 shadow-lg border border-gray-100">
                  <div className="container mx-auto">
                    <div className="mb-6 border-b border-gray-100 pb-4">
                      <Typography variant="h5" className="font-bold text-[#A51B64] mb-2">
                        Menu
                      </Typography>
                      {navList}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Link to='/register' className="col-span-1">
                        <Button 
                          variant="gradient" 
                          size="md"
                          fullWidth
                          onClick={() => setOpenNav(!openNav)}
                          className="py-2.5 text-white bg-gradient-to-r from-[#A51B64] to-[#CE267A] shadow-md"
                        >
                          Join Us
                        </Button>
                      </Link>
                      <a
                        href="https://login.businessboosters.club/login"
                        target="_blank"
                        rel="noreferrer"
                        className="col-span-1"
                      >
                        <Button 
                          variant="outlined" 
                          size="md"
                          onClick={() => setOpenNav(!openNav)}
                          fullWidth
                          className="py-2.5 border-[#A51B64] text-[#A51B64]"
                        >
                          Login
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

Navbar.defaultProps = {
  routes: [],
  action: null,
};

Navbar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  action: PropTypes.node,
};

Navbar.displayName = "/src/widgets/layout/navbar.jsx";

export default Navbar;