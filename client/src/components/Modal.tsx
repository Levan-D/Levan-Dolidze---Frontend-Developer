/** @format */

import { useEffect, useRef } from "react"
import { setModalVisibility } from "../slice/appSlice"
import { useAppDispatch, useAppSelector } from "../app/hooks"
//@ts-ignore
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock"

const Modal = () => {
  const dispatch = useAppDispatch()
  const { modalVisibility, modalData } = useAppSelector(store => store.getData)
  const refOne = useRef<HTMLDivElement | null>(null)

  const handleClick = () => {
    dispatch(setModalVisibility(false))
  }
  useEffect(() => {
    if (refOne !== null) {
      refOne.current?.focus()
    }

    if (modalVisibility) {
      disableBodyScroll(document)
    } else enableBodyScroll(document)
  }, [modalVisibility])

  return (
    <>
      {modalVisibility && (
        <div className="  z-50 fixed top-0 left-0 w-screen h-screen bg-[rgba(30,41,55,0.2)]  backdrop-blur-sm  	">
          <div
            ref={refOne}
            tabIndex={0}
            onBlur={handleClick}
            className=" bg-slate-700 mx-auto min-w-[450px]   rounded-lg w-fit mt-[10vh] h-fit "
          >
            {modalData && (
              <div className="p-4 shadow-[2px_4px_4px_0px_rgba(0,0,0,0.20),inset_-2px_-2px_12px_0px_rgba(0,_0,_0,0.25)]">
                <div className="flex justify-end ">
                  <div
                    onClick={handleClick}
                    className=" cursor-pointer rounded-full hover:bg-slate-200 hover:text-slate-900 text-xl px-2 font-bold right-0"
                  >
                    &#215;
                  </div>
                </div>
                <h3 className="font-bold text-center text-xl mb-8">Details:</h3>

                {Object.entries(modalData)
                  .filter(v => v[1] !== null)
                  .map((value, i) => {
                    if (typeof value[1] === "string" || typeof value[1] === "number") {
                      return (
                        <div className={` border-slate-600 border-b-[1px] `} key={i}>
                          <div className="flex justify-between py-2">
                            <div className="basis-1/2 font-semibold">{value[0]}</div>
                            <div className="text-left basis-1/2">{value[1]}</div>
                          </div>
                        </div>
                      )
                    } else return
                  })}
                {modalData.missions.length > 0 && (
                  <h3 className="font-bold text-center text-xl mt-4">Missions:</h3>
                )}
                {Object.entries(modalData)
                  .filter(v => v[1] !== null)
                  .map((value, i) => {
                    if (typeof value[1] === "object") {
                      return value[1].map(
                        (subValue: { name: string; flight: number }, index: number) => (
                          <div key={index} className="py-2">
                            <h4 className="font-semibold">Mission {index + 1}</h4>
                            <div
                              className={`${
                                Object.entries(value[1]).length === index + 1
                                  ? ""
                                  : "border-b-[1px]  border-slate-600"
                              } mx-8 text-sm flex justify-between pb-2 `}
                            >
                              <div className="flex justify-between basis-1/3  ">
                                <div className="font-semibold">name</div>
                                <div>{subValue.name}</div>
                              </div>
                              <div className="flex justify-between basis-1/3">
                                <div className="font-semibold">flight</div>
                                <div>{subValue.flight}</div>
                              </div>
                            </div>
                          </div>
                        )
                      )
                    } else return
                  })}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
