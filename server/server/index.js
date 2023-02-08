/** @format */

const express = require("express")
const cors = require("cors")
const _ = require("lodash")
const axios = require("axios")

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: "*",
  })
)

app.get("/data", async (req, res) => {
  const prompt = req.query

  try {
    const response = await axios({
      method: "GET",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      url: `https://api.spacexdata.com/v3/capsules?status=${prompt.status}&original_launch=${prompt.date}&type=${prompt.type}&limit=${prompt.limit}&offset=${prompt.offset}`,
    })

    return res.json({ response: response.data, status: 200 })
  } catch (err) {
    return res.sendStatus(404)
  }
})

app.listen(3001, () => console.log("API Server is running..."))
