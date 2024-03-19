import express from "express";
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
import askroute from './routes/askroute.js'

app.use("/",askroute);
app.listen(4000,(req,res)=>{
    console.log('Server is running at http://localhost:4000');
})


