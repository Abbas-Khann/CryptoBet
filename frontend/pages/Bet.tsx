import React, {useState} from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Image from "next/image";
import upward from "../public/img/Upward.png";
import downward from "../public/img/downward.png";

const Bet = (): JSX.Element => {

    const [started, setStarted] = useState<boolean>(true);

    const renderButton = (): JSX.Element | undefined => {
        if(!started) {
            return(
            <div className="bg-gradient-to-b from-[#010232] to-[#010232D4] flex flex-col items-center justify-center h-[87vh]">
            <button
             className="bg-transparent text-4xl border-2 border-white animate-bounce rounded-md cursor-pointer text-white px-24 py-3 hover:text-black hover:bg-gradient-to-r from-blue-400 to-[#3DD2CC] hover:duration-100 hover:ease-in-out">
                Start Game
            </button>
            </div>
        )
    }
    else{
        return(
            <div className="bg-gradient-to-b from-[#010232] to-[#010232D4] min-h-screen text-white">
                <div className="flex justify-center">
                <h1
                className="text-center text-xl pt-14 pb-1 border-b-2 inline px-4"
                >Predict the Eth Price ↕️ and Win</h1>
                </div>
                <div className="p-5 flex flex-col sm:flex-row justify-around items-center">
                <div 
                className=
                "py-10 my-10 mx-10 border-2 rounded-3xl flex items-center justify-centers flex-col w-10/12 bg-gradient-to-b from-[#010232D4] via-[#0102328C] to-[#0771D38A]"
                >
                    <h2 className="text-5xl mb-2">Start {" "}<span className="text-[#0771D3]">Betting</span></h2>
                    <h4 className="text-xl pb-16">Entry Fee:{" "}<span className="text-[#0771D3]">1.1 Matic</span></h4>
                    <div className="flex">
                        <div className="pr-10">
                        <Image width={50} height={50} src={upward} alt={ "" } />
                        </div>
                        <Image width={50} height={50} src={downward} alt={ "" } />
                    </div>
                </div>
                <div 
                className=
                "py-10 border-2 rounded-3xl flex items-center justify-center flex-col w-10/12 bg-gradient-to-b from-[#010232D4] via-[#0102328C] to-[#0771D38A]"
                >
                    <h2 className="text-5xl mb-2">Start {" "}<span className="text-[#0771D3]">Betting</span></h2>
                    <h4 className="text-xl pb-16">Entry Fee:{" "}<span className="text-[#0771D3]">1.1 Matic</span></h4>
                    <div className="flex">
                    <div className="pr-10">
                        <Image width={50} height={50} src={upward} alt={ "" } />
                        </div>
                        <Image width={50} height={50} src={downward} alt={ "" } />
                    </div>
                </div>
                </div>
            </div>
        )
    }
    }

    return(
        <section className="">
            <Navbar />
            {renderButton()}
            <Footer />
        </section>
    )
}

export default Bet