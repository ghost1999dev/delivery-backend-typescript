import app from "@server/server";
import dotenv from "dotenv"
dotenv.config()
const port = process.env.PORT || 4000
app.listen(port, ()=>{
    console.log("Server running in " + port);
})
