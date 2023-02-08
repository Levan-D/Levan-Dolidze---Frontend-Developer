/** @format */

import React from "react"
import banner1k from "../assets/banner1k.png"
import banner2k from "../assets/banner2k.png"
import banner4k from "../assets/banner4k.png"

const Banner = () => {
  return (
    <section className=" ">
      <div className="absolute z-50  font-extrabold md:left-[10vh] md:top-[70vh] top-[20vh] left-[50%] w-max translate-x-[-50%] md:translate-x-[0] md:bg-transparent bg-[rgba(0,0,0,0.7)] p-4 rounded-lg">
        <div className=" text-2xl sm:text-4xl"> To Infinity & Beyond!</div>
        <div className=" text-lg sm:text-2xl mt-4 md:text-left text-center">
          Scroll below to explore glossary <br /> of SpaceX capsule launches
        </div>

        <a href={`#form`}>
          <div className=" flex justify-between gap-8 w-fit mx-auto px-8 border-2 text-center py-2 rounded-lg mt-8  duration-200 text-lg  sm:hover:bg-slate-100  sm:hover:text-slate-900">
            <div>Search</div> <div className="rotate-[180deg] sm:block hidden">&#94;</div>
          </div>
        </a>
      </div>
      <picture className=" ">
        <source media="(max-width: 768px)" srcSet={banner1k}></source>
        <source media="(max-width: 1024px)" srcSet={banner2k}></source>
        <source media="(min-width: 1280px)" srcSet={banner4k}></source>

        <img
          className="w-screen h-[600px] md:h-screen object-cover contrast-[1.05]"
          src={banner2k}
        ></img>
      </picture>
    </section>
  )
}

export default Banner
