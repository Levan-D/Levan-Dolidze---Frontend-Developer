/** @format */

import { useState } from "react"
//@ts-ignore
import DateTimePicker from "react-datetime-picker"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { getData, saveApiData } from "../../slice/appSlice"

const Search = () => {
  const dispatch = useAppDispatch()
  const { data } = useAppSelector(store => store.getData)

  const [status, setStatus] = useState("")
  const [type, setType] = useState("")
  const [date, setDate] = useState(null)

  function toIsoString(dateConv: any) {
    var pad = function (num: number) {
      return (num < 10 ? "0" : "") + num
    }

    return (
      dateConv.getFullYear() +
      "-" +
      pad(dateConv.getMonth() + 1) +
      "-" +
      pad(dateConv.getDate()) +
      "T" +
      pad(dateConv.getHours()) +
      ":" +
      pad(dateConv.getMinutes()) +
      ":" +
      pad(dateConv.getSeconds()) +
      ".000Z"
    )
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let launchDate
    if (date !== null) {
      launchDate = toIsoString(date)
    } else launchDate = undefined

    dispatch(getData({ status: status, type: type, date: launchDate, offset: 0 }))
    dispatch(saveApiData({ status: status, type: type, date: launchDate, offset: 0 }))
  }

  const onStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(() => e.target.value)
  }
  const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(() => e.target.value)
  }

  return (
    <section id="form" className="bg-slate-400 py-8">
      <form
        onSubmit={handleFormSubmit}
        className=" w-fit  mx-auto  px-12 py-8 rounded-lg   bg-slate-300 shadow-[2px_4px_4px_0px_rgba(0,0,0,0.15),inset_-2px_-2px_12px_0px_rgba(0,_0,_0,0.20)]"
      >
        <h2 className="text-center text-lg text-slate-800 font-semibold">
          Select Capsule Status:
        </h2>
        <div className="text-center mt-2 mb-4">
          <select
            id="status"
            className=" cursor-pointer px-4  w-60 py-2 rounded-lg bg-slate-800"
            value={status}
            onChange={onStatusChange}
            name="favColor"
          >
            <option value="">Blank</option>
            <option value="active">Active</option>
            <option value="retired">Retired</option>
            <option value="destroyed">Destroyed</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>

        <h2 className="text-center text-lg text-slate-800 font-semibold">
          Select Capsule Type:
        </h2>
        <div className="text-center mt-2 mb-4">
          <div className="text-center ">
            <select
              className=" cursor-pointer px-4  w-60 py-2 rounded-lg bg-slate-800"
              id="type"
              value={type}
              onChange={onTypeChange}
              name="favColor"
            >
              <option value="">Blank</option>
              <option value="Dragon 1.0">Dragon 1.0</option>
              <option value="Dragon 1.1">Dragon 1.1</option>
              <option value="Dragon 2.0">Dragon 2.0</option>
            </select>
          </div>
        </div>

        <h2 className="text-center text-lg text-slate-800 font-semibold">
          Pick Launch Date:
        </h2>
        <DateTimePicker
          className="text-slate-800 bg-white rounded-lg [&>*]:border-none left-[50%]  translate-x-[-50%] py-1 px-1  mt-2 mb-8 "
          onChange={setDate}
          value={date}
        />

        <input
          type="submit"
          value="Submit"
          className="block mx-auto px-14 text-lg py-2 bg-blue-500 cursor-pointer duration-200 hover:bg-blue-400 active:bg-blue-600 font-bold rounded-xl shadow-md"
        />
      </form>
    </section>
  )
}

export default Search
