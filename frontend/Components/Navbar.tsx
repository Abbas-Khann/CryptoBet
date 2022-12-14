import Link from "next/link";
import React,{ useState } from "react";
import { Transition } from "@headlessui/react";
import { BiMenu } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import Image from "next/image";
import logo from "../public/img/logo.png";
import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = (): JSX.Element => {
  // --------- States here ------------- //
  const [expand, setExpand] = useState<boolean>(false);
    
  return (
    <nav className="bg-[#010232] max-w-full flex justify-between items-center px-6 py-8 lg:flex lg:justify-around lg:px-0 font-plus relative lg:items-center text-white">
      {!expand ? (
        <a
          href="#"
          className="self-center ml-2 lg:hidden"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <BiMenu className="text-5xl" />
        </a>
      ) : (
        <a
          href="#"
          className="self-center text-center lg:hidden fixed left-[80%] z-50 rounded-full ml-3 border-2 px-2 py-2"
          onClick={() => {
            setExpand(!expand);
          }}
        >
          <MdClose className="text-4xl text-white" />
        </a>
      )}
      <div className="flex justify-between w-[200px] -order-1 lg:w-72">
        <div className="flex items-center justify-center space-x-2 w-auto cursor-pointer">
          <Link
            href="/"
          >
            {!expand ? <Image width={190} src={logo} alt="logo" /> : null }
          </Link>
        </div>
      </div>
      <ul className="hidden lg:flex justify-evenly items-center basis-2/5 text-lg">
        <Link href="/">
          <div className="cursor-pointer relative hover:animate-pulse group py-0.5 px-0.5 ">
            <div
              className="absolute -inset-1 blur-lg transition-all"
            ></div>
            <button
              className="relative border-[#D100D1] py-1 transition-all text-xl"
            >
              Home
            </button>
          </div>
        </Link>
        <Link href="/About">
          <div className="cursor-pointer hover:animate-pulse relative group py-0.5 px-0.5 ">
            <div
              className="absolute -inset-1 blur-lg transition-all"
            ></div>
            <button className="relative border-[#D100D1] py-1 transition-all text-xl">
              About
            </button>
          </div>
        </Link>
        <Link href="/Bet">
          <div className="cursor-pointer hover:animate-pulse relative group py-0.5 px-0.5 ">
            <div
              className="absolute -inset-1 blur-lg transition-all"
            ></div>
            <button className="relative border-[#D100D1] py-1 transition-all text-xl">
              Bet
            </button>
          </div>
        </Link>
      </ul>
      <div className="hidden lg:flex items-center">
        <ConnectButton />
      </div>
      {/* --------------- Mobile and Tablets --------------- */}
      {/* ------------- Transition for Mobile Menu -------------- */}
      <Transition
        show={expand}
        enter="transition ease-out duration-1000 transform"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-1000 transform"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
        className="lg:hidden w-screen h-screen fixed overflow-y left-0 top-0 z-10"
      >
        <div
          className="bg-[#010232] lg:hidden flex flex-col items-center h-full px-4 w-full py-10 md:px-8"
          id="mobile-menu"
        >
          <div className="flex justify-center space-x-2 items-center w-auto mb-24">
            <Link
              href="/"
              onClick={() => {
                setExpand(!expand);
              }}
            >
              <Image src={logo} width={200} height={180} alt="logo" />
            </Link>
          </div>
          <ul className="flex flex-col justify-evenly items-center basis-2/6 items-start mb-6">
            <Link href="/">
              <button
              onClick={() => setExpand(!expand)}
                className="cursor-pointer transition-all text-3xl mb-4"
              >
                Home
              </button>
            </Link>
            <Link href="/About">
              <button
                className="cursor-pointer transition-all text-3xl mb-4"
              >
                About
              </button>
            </Link>
            <Link href="/Bet">
              <button
                className="cursor-pointer  transition-all text-3xl mb-4"
              >
                Bet
              </button>
            </Link>
          </ul>
          <div className="flex items-center ">
            <ConnectButton />
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navbar;