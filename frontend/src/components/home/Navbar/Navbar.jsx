import React, { useState, useEffect, useRef } from 'react';
import { GiFruitTree } from "react-icons/gi";
import { Squash as Hamburger } from 'hamburger-react';
import { Link, useLocation } from 'react-router-dom';
import MenuAbout from './MenuAbout';
import MenuServices from './MenuServices';
import MenuContact from './MenuContact';
import SlideWrapper from './SlideWrapper';
import clsx from 'clsx';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isHamburgerOpen, setHamburgerOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isNavbarHovered, setNavbarHovered] = useState(false);
  const [hoveringElement, setHoveringElement] = useState(null);
  const [popoverLeft, setPopoverLeft] = useState(null);
  const [popoverHeight, setPopoverHeight] = useState(null);
  const refs = useRef([])

  const location = useLocation();
  const homeAndScroll = location.pathname === '/' && scrollPosition < 200;
  const homeAndScrollHovered = homeAndScroll && !isNavbarHovered;
  const onMouseEnter = (index, el) => {
    setHoveringElement(index);
    setPopoverLeft(el.offsetLeft);
    const menuElement = refs.current[index];
    if (menuElement) {
      setPopoverHeight(menuElement.offsetHeight);
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <nav
      className={`${homeAndScroll
        ? 'bg-transparent/5 hover:bg-[#CDD1B5] animation duration-150'
        : 'bg-[#CDD1B5] transition duration-150 ease-in-out'
        } fixed w-full top-0 left-0 z-20`}
      onMouseEnter={() => setNavbarHovered(true)}
      onMouseLeave={() => { setNavbarHovered(false) }}
    >
      <div className='flex flex-wrap justify-between items-center max-w-screen-2xl mx-auto px-4 py-[0.75rem]'>
        <Link to={`/`} className='ml-2 flex items-center space-x-3'>
          <GiFruitTree className={`${homeAndScrollHovered ? 'text-[#C6B49F]' : 'text-gray-900'} text-5xl`} />
          <span className={`${homeAndScrollHovered ? 'text-[#C6B49F]' : 'text-gray-900'} text-2xl self-center font-semibold whitespace-nowrap`}>
            DjanTree
          </span>
        </Link>
        <div className='flex md:order-2 space-x-3'>
          <Link to={`/login`} >
            <p className='px-3 py-2 text-md font-medium bg-[#C6B49F] rounded-lg hover:scale-105 hover:shadow-sm'>Log In</p>
          </Link>
          <Link to={`/signup`} >
            <p className='px-3 py-2 text-md font-medium bg-black text-white rounded-lg hover:scale-105 hover:shadow-sm hover:shadow-black'>Sign Up</p>
          </Link>
          <button
            className='inline-flex items-center w-12 h-10 justify-center text-gray-700 rounded-lg md:hidden hover:bg-gray-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-200'
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <span className='sr-only'>Open main menu</span>
            <Hamburger toggled={isHamburgerOpen} toggle={setHamburgerOpen} size={23} />
          </button>
        </div>
        <div
          className={`${isDropdownOpen ? 'block' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`}
          onMouseLeave={() => setHoveringElement(null)}
        >
          <ul className={`${homeAndScroll ? 'bg-transparent' : 'bg-[#CDD1B5]'} flex flex-col p-4 md:p-0 font-medium rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent`}>
            <li>
              <Link
                to={`/`}
                className={`${location.pathname === '/' ? 'bg-[#7091AD] md:text-[#5080aa] md:bg-transparent' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#5080aa]'} text-lg font-medium block py-2 px-3 rounded md:p-0`}
                onMouseEnter={() => setHoveringElement(null)}
              >
                <p>Home</p>
              </Link>
            </li>
            <li>
              <Link
                to={`/about`}
                className={`${location.pathname === '/about' ? 'bg-[#7091AD] md:text-[#5080aa] md:bg-transparent' : homeAndScrollHovered ? 'md:text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#5080aa]'} text-lg font-medium block py-2 px-3 rounded md:p-0`}
                onMouseEnter={(event) => {
                  onMouseEnter(1, event.currentTarget);
                }}
              >
                <p>About</p>
              </Link>
            </li>
            <li>
              <Link
                to={`/services`}
                className={`${location.pathname === '/services' ? 'bg-[#7091AD] md:text-[#5080aa] md:bg-transparent' : homeAndScrollHovered ? 'md:text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#5080aa]'} text-lg font-medium block py-2 px-3 rounded md:p-0`}
                onMouseEnter={(event) => {
                  onMouseEnter(2, event.currentTarget);
                }}
              >
                <p>Services</p>
              </Link>
            </li>
            <li>
              <Link
                to={`/contact`}
                className={`${location.pathname === '/contact' ? 'bg-[#7091AD] md:text-[#5080aa] md:bg-transparent' : homeAndScrollHovered ? 'md:text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#5080aa]'} text-lg font-medium block py-2 px-3 rounded md:p-0`}
                onMouseEnter={(event) => {
                  onMouseEnter(3, event.currentTarget);
                }}
              >
                <p>Contact</p>
              </Link>
            </li>
          </ul>
        </div>

      </div>
      <div
        className={clsx(
          'absolute top-12 pt-4 -ml-32 w-[600px]',
          hoveringElement !== null ? 'transition-all' : 'opacity-0 pointer-events-none')}
        style={{ left: popoverLeft || 0, height: popoverHeight || 100 }}
      >
        <SlideWrapper index={1} hoveringElement={hoveringElement}>
          <MenuAbout ref={(ref) => (refs.current[1] = ref)} />
        </SlideWrapper>
        <SlideWrapper index={2} hoveringElement={hoveringElement}>
          <MenuServices ref={(ref) => (refs.current[2] = ref)} />
        </SlideWrapper>
        <SlideWrapper index={3} hoveringElement={hoveringElement}>
          <MenuContact ref={(ref) => (refs.current[3] = ref)} />
        </SlideWrapper>

      </div>
    </nav>
  )
}

export default Navbar