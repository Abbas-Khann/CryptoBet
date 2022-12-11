import React, {useState} from "react";
import HeroImg from "../public/img/Hero.png";
import Image from "next/image";

const Hero = (): JSX.Element => {
    const [showModal, setShowModal] = useState<boolean>(false);

    return(
    <section className="min-h-screen bg-gradient-to-b from-[#010232] to-[#010232D4] px-2 py-20 text-white">
      <div className="md:flex items-center justify-around ">
        <div className=" md:w-3/5 px-32">
          <h2 className="text-4xl text-skin-base my-4 leading-tight lg:text-7xl tracking-tighter mb-6">
            Start Betting with<br />
            <span className="text-[#07AFD3]">CryptoBet</span>
          </h2>
          <p className="text-base text-skin-muted dark:text-skin-darkMuted lg:text-xl sm:mb-14 mb-10">
            Bet on the future and upcoming price of crypto and get your opportunity to win some crypto yourself in the most safe and secure manner using CryptoBet
          </p>
          <div>
              <button
                className="border-full py-2 px-6 border-2  hover:bg-white hover:text-black hover:border-2 hover:border-black"
                onClick={() => setShowModal(!showModal)}
                >
                Bet Now
              </button>
          </div>
        </div>
        <div className="w-10/12 md:w-1/3 mx-auto md:mx-0 my-8 order-2 ">
          <Image src={HeroImg} alt="HeroImage" />
        </div>
      </div>
    </section>
    )
}

export default Hero