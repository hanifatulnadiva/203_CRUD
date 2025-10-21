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

app.post('/api/mahasiswa', (req,res)=>{
    const{nama, nim, kelas, prodi}=req.body;
    if(!nama||!nim||!kelas||!prodi){
        return res.status(400),json({message:"nama nim, kelas, prodi wajib diisi!"});
    }
    db.query(
        'insert into mahasiswa(nama, nim, kelas, prodi)values(?,?,?,?)',
        [nama, nim, kelas, prodi],
        (err, result)=>{
            if(err){
                console.error(err);
                return res.status(500).json({message:'datavase error'});
            }
            res.status(201).json({message:'user create successfully'});
        }

    );
});

app.put('/api/mahasiswa', (req,res)=>{
    const userId=res.params.id;
    const {nama, nim, kelas,prodi}=req.body;
    db.query(
        'update from mahasiswa set nama = ?, nim=?, kelas=?, prodi=? where id=?',
        [nama, nim, kelas, prodi, userId],
        (err, result)=>{
            if(err){
                console.error(err);
                return res.status(500).json({messege:'database error'});
            }
            res.json({message:'user update successfully'});
        }
    );
});

