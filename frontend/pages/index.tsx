import React from "react"
import Hero from "../Components/Hero"
import Navbar from "../Components/Navbar"

const Home = (): JSX.Element => {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  )
}

export default Home