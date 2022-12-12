import React, {useState} from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

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
                <div className="">
                    
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