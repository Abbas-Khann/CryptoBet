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
                <p className="text-base lg:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo molestiae, atque facere, esse delectus sequi corporis obcaecati, voluptate totam nesciunt repellendus in excepturi quo at. Numquam sint ipsam modi quibusdam nam, voluptatem aspernatur ad ipsa?
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