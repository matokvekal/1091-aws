import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import {join} from 'path';
import cookieParser from 'cookie-parser';

const app=express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());


app.post("/",async(req,res)=>{
    let data=req.body;
    console.log(data);
    if (data?.name) {
        const username = data.name;
        res.cookie("username", username);
        res.redirect("/welcome");
      } else {
        res.redirect("/");
      }
})


app.get("/welcome", (req, res) => {
    const currentFilePath = fileURLToPath(import.meta.url);
    const formPath = join(currentFilePath, "..", "./public/welcome.html");
  
    const username = req.cookies.username;
  
    if (username) {
      res.sendFile(formPath);
    } else {
      res.redirect("/");
    }
  });

  
const server = app.listen(4000, () => {
    console.log('listening on *:4000');
});
