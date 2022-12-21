import React from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Image from "next/image";
import Benefits from "../public/img/About.png";

const About = (): JSX.Element => {
    return(
        <section className="bg-gradient-to-b from-[#010232] to-[#010232D4] text-white">
            <Navbar />
            <div className="sm:flex items-center justify-between h-[90vh]">
               <div className="p-10 sm:mb-32 sm:w-1/2 sm:p-0 sm:pl-10">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-7xl py-10">How CryptoBet <h1 className="text-blue-500 inline">Works 👇</h1></h1>
                <p className="text-base lg:text-lg">CryptoBet allows you to deploy a smart contract where you get to choose the timing and the pricing of the bet and everything and later on users can play a game where they will be able to bet on the price of Eth in the time interval chosen by the owner of the contract and based off the correct or wrong guess the player will be rewarded with crypto or lose the crypto they locked in to the contract while entering the game.
                </p>
               </div>
               <div className="flex items-end justify-center sm:pt-20 mb-10 sm:mb-0">
                 <Image src={Benefits} width={400} alt="Benefits Of CryptoBet" />
               </div>
            </div>
            <Footer />
        </section>
    )
}

export default About