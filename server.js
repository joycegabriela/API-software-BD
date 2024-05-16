const express = require('express');
const cors = require('cors');
const QueryString = require('qs');


const app = express();
app.use(cors({
    origin: 'http://localhost.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000);

console.log('Servidor iniciado na porta 3000');

let arrSoftware = [
    {
        id: 1,
        nome: 'QuickBook',
        empresa: 'Finance Tech IncomingMessage',
        versao: 5.0,
        forma_cobranca: 'Assinatura Mensal',
        valor: 49.99,
        data_criacao: '15/03/2017',
        data_atualizacao: '28/04/2024',
    },
    {
        id: 2,
        nome: 'PixelPro',
        empresa: 'DesignWorks Ltda',
        versao: 3.5,
        forma_cobranca: 'Licença Perpétua',
        valor: 299.99,
        data_criacao: '20/08/2018',
        data_atualizacao: '05/05/2024',
    },
    {
        id: 3,
        nome: 'SecureNet',
        empresa: 'CyberGuard Inc',
        versao: 2.0,
        forma_cobranca: 'Assinatura Anual',
        valor: 699.99,
        data_criacao: '10/11/2019',
        data_atualizacao: '15/04/2024',
    },
    {
        id: 4,
        nome: 'DataSense',
        empresa: 'InfoTech Solutions',
        versao: 4.0,
        forma_cobranca: 'Licença Perpétua',
        valor: 599.99,
        data_criacao: '05/05/2016',
        data_atualizacao: '20/03/2024',
    },
    {
        id: 5,
        nome: 'MediaMaster',
        empresa: 'MediaWorks Inc',
        versao: 2.2,
        forma_cobranca: 'Assinatura Trimestal',
        valor: 599.99,
        data_criacao: '03/09/2017',
        data_atualizacao: '10/04/2024',
    },

];

app.get('/software',(req,res)=> {
    console.log(arrSoftware);
    res.send(arrSoftware);
})

//Consultar cada software pelo o id
app.get('/software/:id', (req,res)=>{
    const sofId = req.params.id;
    const sof = arrSoftware.find(sof => sof.id === parseInt(sofId));
    if(sof){
        console.log(sof);
        res.send(sof);
    }else{
        res.send('Não existe software com esse ID')
    }
});

//Deletando pelo o id
app.delete('/software/delete/:id', (req,res) => {
    const sofId = req.params.id;
    arrSoftware = arrSoftware.filter(sof => sof.id !== parseInt(sofId));
res.send(`Software ${sofId} excluído com sucesso`);

console.log(arrSoftware);
});

//Criando um novo Software 
app.post('/software/criar', (req,res)=> {
    try{
        const sof = req.body;
        arrSoftware.push(sof);
        res.send('Software adicionado com sucesso!')
        res.send(sof);
        console.log(id)
        console.log(body)
    }catch (error){
        res.status(400).send('Erro ao processar a requisição!!!', error.message)
    }
});


