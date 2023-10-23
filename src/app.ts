import express from "express"
import { userRouter } from "./routes/user.routes"
import { errorHandler } from "./helper/errorHandler"
import connect from "./config/connect";


export const app = express()
app.use(express.json())

app.use("/users", userRouter)

app.use(errorHandler)

connect.sync().then(()=>
{
    console.log("Database Conected Successfully")
}).catch((err)=>{
    console.log("Err",err)
})

app.use("", (req, res) => {
	return res.status(404).json({
		status: 404,
		message: "Route not found",
	})
})

const PORT = 3000

app.listen(PORT, () => {
	console.log("The server is running on port " + PORT)
})
