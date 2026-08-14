import pg from 'pg';
import promptSync from 'prompt-sync';

const { Client } = pg;
const prompt = promptSync();

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: 'root',
    database: 'escola_db'
});


const nome0 = prompt("Qual é seu nome ? ");
const turma0 = prompt("Qual é sua turma ? ");
const nota0 = Number(prompt("Qual é sua nota ? "));

if ( !nome0 ){
    console.log("Nome não pode ser vazio.");
} else {
    console.log("Nome certo");
}

if ( nota0 < 0 || nota0 > 10) {
    console.log("Sua nota deve ser entre 0 e 10");
} else{
    console.log("Nota válida")
}

 async function atividade() {

     try {
         await client.connect();

         const nome      = nome0
         const turma     = turma0
         const nota   = nota0
 
         const query = `
             INSERT INTO alunos (nome, turma, nota)
             VALUES ($1, $2, $3)
             RETURNING *
         `;
         const valores = [nome, turma, nota];

         const resultado = await client.query(query, valores);
 
         console.log('Aluno, turma e nota salvas com sucesso');
         console.log('Dados salvos:', resultado.rows[0]);

     } catch (erro) {
         console.log('❌ Ocorreu um erro:', erro.message);

     } finally {
         await client.end();
         console.log('🔌 Conexão encerrada.');
     }
}

atividade();