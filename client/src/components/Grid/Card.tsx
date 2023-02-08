/** @format */

import { useAppDispatch } from "../../app/hooks"
import { setModalVisibility, setModalData } from "../../slice/appSlice"
import c1 from "../../assets/c1.png"
import c2 from "../../assets/c2.png"

type CardProps = {
  capsule: {
    capsule_serial: string
    capsule_id: string
    status: string
    original_launch: string
    original_launch_unix: number
    missions: {
      name: string
      flight: number
    }[]
    landings: number
    type: string
    details: string
    reuse_count: number
  }
}

const Card = ({ capsule }: CardProps) => {
  const dispatch = useAppDispatch()

  const renderArray = Object.entries(capsule)

  return (
    <div className=" bg-slate-500  justify-between w-80 py-4 px-6 rounded-md border  border-slate-400 shadow-[2px_4px_4px_0px_rgba(0,0,0,0.20),inset_-2px_-2px_12px_0px_rgba(0,_0,_0,0.25)]">
      <div className="flex justify-between">
        <div className="rounded-full font-semibold  px-4 text-slate-800 !bg-slate-200  ">
          {capsule.capsule_serial}
        </div>
        <div
          className={`${
            capsule.status === "active"
              ? "text-green-800 !bg-green-200"
              : capsule.status === "destroyed"
              ? "text-red-800 !bg-red-200"
              : capsule.status === "retired"
              ? "text-sky-800 !bg-sky-200"
              : "text-amber-800 !bg-amber-200"
          }  rounded-full font-semibold  px-4`}
        >
          {capsule.status}
        </div>
      </div>
      <h3 className="font-bold  text-center text-xl mt-4">{capsule.type}</h3>
      <div className="mb-6 mt-2 text-center">{capsule.details} </div>
      <div>
        <div
          className={`bg-slate-400 rounded-xl h-56 flex justify-center flex-col shadow-md`}
        >
          <img
            className={` ${capsule.type === "Dragon 2.0" ? "w-40" : "w-52"} mx-auto`}
            src={capsule.type === "Dragon 2.0" ? c2 : c1}
            alt="capsule"
          />
        </div>
        <div className="text-center  font-semibold mt-4">Original launch:</div>
        <div className="text-center">
          {new Date(capsule.original_launch_unix * 1000).toUTCString()}
        </div>
      </div>
      <div
        onClick={() => {
          dispatch(setModalVisibility(true))
          dispatch(setModalData(capsule))
        }}
        className="py-2 px-8 bg-slate-800 text-white rounded-full font-bold drop-shadow-md w-fit mx-auto mb-2 mt-4 cursor-pointer hover:bg-slate-700  duration-200"
      >
        Details
      </div>
    </div>
  )
}

export default Card
