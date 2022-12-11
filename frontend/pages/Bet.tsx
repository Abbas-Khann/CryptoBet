import React, {useState} from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const Bet = (): JSX.Element => {

    const [started, setStarted] = useState<boolean>(false);

    const renderButton = (): JSX.Element | undefined => {
        if(!started) {
            return(
            <div className="bg-gradient-to-b from-[#010232] to-[#010232D4] flex flex-col items-center justify-center h-[82vh]">
            <button className="bg-transparent border-2 border-white animate-bounce rounded-md cursor-pointer text-white px-20 py-3">
                Start Game
            </button>
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