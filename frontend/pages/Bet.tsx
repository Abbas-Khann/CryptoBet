import React, {useState} from "react";

const Bet = (): JSX.Element => {

    const [started, setStarted] = useState<boolean>(false);

    const renderButton = (): JSX.Element | undefined => {
        if(!started) {
            return(
            <button className="bg-transparent border-4 border-white animate-bounce">
                Start Game
            </button>
        )
    }
    }

    return(
        <section>
            {renderButton()}
        </section>
    )
}

export default Bet