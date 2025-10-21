const express =require('express');
let mysql =require('mysql2');
const app = express();
const PORT =3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req, res)=>{
    res.send ('hello world');
});

app.listen(PORT,()=>{
    console.log('server is running on port ${PORT}');

});

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'biodata',
    port:3307
})