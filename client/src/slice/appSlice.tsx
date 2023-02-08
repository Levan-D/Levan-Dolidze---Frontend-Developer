/** @format */

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

export const getData = createAsyncThunk(
  "data/Get",
  async (
    {
      status,
      type,
      date = "",
      limit = 7,
      offset = 0,
    }: { status: string; type: string; date?: string; limit?: number; offset?: number },
    { rejectWithValue }
  ) => {
    const params = {
      status: status,
      type: type,
      date: date,
      limit: limit,
      offset: offset,
    }

    try {
      const response = await axios({
        method: "GET",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        url: "http://localhost:3001/data",
        params: params,
      })

      return response
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

interface Data {
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
interface apiData {
  status: string
  type: string
  date: string | undefined
  offset: number
}

interface InitialState {
  modalVisibility: boolean
  modalData: Data | undefined
  getDataStatus: {
    error: boolean
    errorMessage: string
    errorStatus: string
    loading: boolean
    success: boolean
    initialLoad: boolean
  }
  apiData: apiData
  endOfPages: boolean
  data: Data[]
}

const initialState: InitialState = {
  getDataStatus: {
    error: false,
    errorMessage: "",
    errorStatus: "",
    loading: false,
    success: false,
    initialLoad: true,
  },
  apiData: { status: "", type: "", date: undefined, offset: 0 },
  endOfPages: false,
  modalVisibility: false,
  modalData: undefined,
  data: [],
}

const getDate = createSlice({
  name: "getDate",
  initialState,
  reducers: {
    setModalVisibility: (state, action: PayloadAction<boolean>) => {
      state.modalVisibility = action.payload
    },
    setModalData: (state, action: PayloadAction<Data>) => {
      state.modalData = action.payload
    },
    saveApiData: (state, action: PayloadAction<apiData>) => {
      state.apiData = { ...state.apiData, ...action.payload }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getData.pending, state => {
        state.getDataStatus.loading = true
        state.getDataStatus.success = false
        state.getDataStatus.error = false
      })
      .addCase(getData.fulfilled, (state, action: PayloadAction<any>) => {
        state.getDataStatus.loading = false
        state.getDataStatus.success = true
        state.getDataStatus.initialLoad = false

        if (action.payload.data.response.length > 0) {
          state.data = action.payload.data.response
          state.endOfPages = false
        } else state.endOfPages = true
      })
      .addCase(getData.rejected, (state, action: PayloadAction<any>) => {
        state.getDataStatus.loading = false
        state.getDataStatus.error = true

        state.getDataStatus.initialLoad = false

        if (
          action.payload.request?.status.toString().startsWith(4) ||
          action.payload.request?.status.toString().startsWith(5)
        ) {
          state.getDataStatus.errorMessage = action.payload.message
          state.getDataStatus.errorStatus = action.payload.request.status
        } else state.getDataStatus.errorMessage = "Unknown Error"
      })
  },
})

export const { setModalVisibility, setModalData, saveApiData } = getDate.actions
export default getDate.reducer
