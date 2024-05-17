const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const conn = mysql.createConnection({
host: 'localhost',
user: 'joyce',
password: '',
database: 'software_api'
});

conn.query((erro, resultado) => {

})



const app = express();
app.use(cors({
    origin: 'http://localhost.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.urlencoded({
    extended: true
}));


// Consultar todo os software
app.get('/software',(req,res)=> {
   
    conn.query('select * from software',(erro, resultado) => {
        try {
            const sof = resultado.map(sof=> ({ 
                id: sof.id,
                nome: sof.nome,
                empresa: sof.empresa,
                versao: sof.versao,
                forma_cobranca: sof.forma_cobranca,
                valor: sof.valor,
                data_criacao: sof.data_criacao,
                data_atualizacao: sof.data_atualizacao,
            }));
            res.json(sof);
            console.log(sof);
        } catch (erro) {
            res.send('Não existe nenhum software cadastrado!!');
            console.error('Não existe nenhum software cadastrado!!', erro);
        }{}
    });
    
});

//Consultar cada software pelo o id
app.get('/software/:id', (req,res)=>{
    const sofId = req.params.id;
    if(sof){
        console.log(sof);
        res.send(sof);
    }else{
        res.send('Não existe software com esse ID')
    }
    conn.query((erro, resultado) => {
    
    });
});

//Deletando pelo o id
app.delete('/software/deletar/:id', (req,res) => {
    const sofId = req.params.id;
res.send(`Software ${sofId} excluído com sucesso`);
conn.query((erro, resultado) => {
    
});
});

//Criando um novo Software 
app.post('/software/criar', (req,res)=> {
    try{
        const sof = req.body;
        res.send(`Software ${sof.id} criado com sucesso!`)
        console.log(id)
        console.log(body)
    }catch (error){
        res.status(400).send('Erro ao processar a requisição!!!', error.message)
    }
    conn.query((erro, resultado) => {
    
    });
});

//Editando o Software pelo o id
app.put('/software/editar/:id', (req,res) => {
    const sofId = req.params.id;
    const sof = req.body;
res.send(`Software ${sofId} editado com sucesso!`);
    console.log(sofId);
    conn.query((erro, resultado) => {
    
    });
});


app.listen(3000);

console.log('Servidor iniciado na porta 3000');