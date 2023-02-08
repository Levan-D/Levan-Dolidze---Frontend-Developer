/** @format */

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { changePage, saveApiData } from "../../slice/appSlice"

const Pagination = () => {
  const dispatch = useAppDispatch()

  const {
    endOfPages,
    data,
    getDataStatus: { error },
    apiData: { status, type, date, offset },
  } = useAppSelector(store => store.getData)

  const handleNext = () => {
    if (!endOfPages) {
      dispatch(changePage({ status: status, type: type, date: date, offset: offset + 7 }))
      dispatch(
        saveApiData({ status: status, type: type, date: date, offset: offset + 7 })
      )
    } else return
  }

  const handlePrev = () => {
    if (offset !== 0) {
      dispatch(
        changePage({
          status: status,
          type: type,
          date: date,
          offset: offset - 7,
        })
      )
      dispatch(
        saveApiData({
          status: status,
          type: type,
          date: date,
          offset: offset - 7,
        })
      )
    } else return
  }

  return (
    <div className="mx-auto w-fit pb-8 select-none">
      {!error && data.length > 0 && (
        <div className="flex gap-4">
          <div className="flex gap-4">
            <div
              onClick={handlePrev}
              className={`${
                offset === 0 ? "opacity-50 hover:bg-slate-800 cursor-auto" : ""
              } offset text-2xl py-2 px-8 bg-slate-800 text-white rounded-full font-bold drop-shadow-md w-fit mx-auto mb-2 mt-4 cursor-pointer hover:bg-slate-700  duration-200`}
            >
              &#8592;
            </div>

            <div
              onClick={handleNext}
              className={` ${
                endOfPages ? "opacity-50 hover:bg-slate-800 cursor-auto" : ""
              } text-2xl pt-2 pb-3 px-8 bg-slate-800 text-white rounded-full font-bold drop-shadow-md w-fit mx-auto mb-2 mt-4 cursor-pointer hover:bg-slate-700  duration-200`}
            >
              &#8594;
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Pagination
