const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
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
app.get('/software', (req, res) => {

    conn.query('select * from software', (erro, resultado) => {
        try {
            const sof = resultado.map(sof => ({
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
        }
    });

});

//Consultar cada software pelo o id
app.get('/software/:id', (req, res) => {
    const sofId = req.params.id;
    conn.query(`select * from software where id = ${sofId}`, (erro, resultado) => {
        try {
            const sof = resultado.map(sof => ({
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
            res.send('Não existe software com esse ID');
            console.error('Não existe software com esse ID', erro);
        }
    });
});

//Deletando pelo o id
app.delete('/software/deletar/:id', (req, res) => {
    const sofId = req.params.id;
    res.send(`Software ${sofId} excluído com sucesso`);
    conn.query(`delete from software where id = ${sofId}`, (erro, resultado) => {
    if(erro){
        console.error(erro)
    }
    })
});

//Criando um novo Software 
app.post('/software/criar', (req, res) => {
    const {id, nome, empresa, versao, forma_cobranca, valor, data_criacao, data_atualizacao } = req.body;
    console.log(req.body)
    try {
            conn.query(`insert into software (id, nome, empresa, versao, forma_cobranca, valor, data_criacao, data_atualizacao) values ('${Number(id)}', '${nome}', '${empresa}', '${versao}', '${forma_cobranca}', '${Number(valor)}', '${data_criacao}', '${data_atualizacao}')`, (erro, resultado) => {
                res.send('Software cadastrado com sucesso!!');
                if (erro){
                    console.error(erro)
                }
            });

        } catch (erro) {
            res.send('Erro ao criar software');
            console.error('Erro ao criar software', erro);
        }
    });


//Editando o Software pelo o id
app.put('/software/editar/:id', (req, res) => {
    const sofId = req.params.id;
    const {id, nome, empresa, versao, forma_cobranca, valor, data_criacao, data_atualizacao } = req.body;
    conn.query(`update software set id = ${Number(id)} where id ='${Number(sofId)}'`, (erro, resultado) => {
        res.send(`Software ${sofId} editado com sucesso!!`);
       if(erro){
        console.error(erro)
       }
    });
});


app.listen(3000);

console.log('Servidor iniciado na porta 3000');