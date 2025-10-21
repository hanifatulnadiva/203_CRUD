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
});

db.connect((err)=>{
    if(err){
        console.error('error connecting to MYSQL:'+err.stack);
        return;
    }
    console.log('connection succuessfully!');
});

app.get('/api/mahasiswa', (req,res)=>{
    db.query('select*from mahasiswa ',(err,result)=>{
        if(err){
            console.error('error excecuting query:'+err.stack);
            res.status(500).send('error fetching users');
            return;
        }
        res.json(results);
    });
});
