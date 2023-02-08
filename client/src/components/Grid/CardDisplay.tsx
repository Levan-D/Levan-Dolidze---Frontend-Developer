/** @format */

import React from "react"
import Card from "./Card"
import { useAppSelector } from "../../app/hooks"

const CardDisplay = () => {
  const {
    data,
    getDataStatus: { error, errorMessage, errorStatus, success, initialLoad },
  } = useAppSelector(store => store.getData)

  if (error) {
    return (
      <div className="min-h-[370px] rounded-lg  bg-slate-800 p-2 ">
        <div className="mt-28 text-center text-lg text-red-500">Error: {errorStatus}</div>
        <div className="text-center text-lg text-red-500 "> {errorMessage}</div>
        <div className="text-center  text-lg"> Please, try again later</div>
      </div>
    )
  } else if (data.length === 0 && initialLoad === true) {
    return (
      <div className="text-slate-800 font-bold text-4xl text-center py-20">
        Hello, <br />
        Select options above <br /> to display results
      </div>
    )
  } else if (data.length === 0 && initialLoad === false) {
    return (
      <div className="text-slate-800 font-bold text-4xl text-center py-20">
        Whoops! <br /> It looks like we couldn't find anything <br /> matching those
        search parameters
      </div>
    )
  }

  return (
    <div className="py-16">
      <div className=" flex flex-wrap  gap-8 justify-center">
        {data.length !== 0 &&
          data.map((capsule, i) => (
            <div key={i} className=" mb-4 last:mb-0">
              <Card capsule={capsule} />
            </div>
          ))}
      </div>
    </div>
  )
}

export default CardDisplay
