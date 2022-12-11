import React from "react"
import Footer from "../Components/Footer"
import Hero from "../Components/Hero"
import Navbar from "../Components/Navbar"

const Home = (): JSX.Element => {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  )
}

export default Home