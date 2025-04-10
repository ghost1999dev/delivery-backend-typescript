import routes from "@routes/routes";
import express,{Application, urlencoded} from "express";
import morgan from "morgan";

const app: Application = express()
app.use("/api/v1", routes())
app.use(express.json())
app.use(urlencoded({
    extended:true
}))
app.use(morgan("dev"))




export default app
