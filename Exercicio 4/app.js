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




 async function atividade() {

     try {
         await client.connect();

         let resultado = await client.query(
            'SELECT id, nota, nome FROM alunos ORDER BY id ASC'
        );
        resultado.rows.forEach(aluno => {
            console.log(`ID: ${aluno.id} | Nome: ${aluno.nome} | Nota: ${aluno.nota}`);
        });

        console.log(" ")
        let idALUNO = Number(prompt("Qual o ID  do aluno ? "));

        if (! idALUNO ){
            console.log("o ID precisa conter um ID válido");
            return;
        } 

        let novaNOTA = Number(prompt("Qual a nova nota do aluno ? "));

        if (novaNOTA < 0 || novaNOTA > 10){
            console.log("A nota deve estar entre 0 e 10;")
            return;
        }


        const query = `
            UPDATE alunos
            SET nota = $2
            WHERE id = $1
            RETURNING *
        `;
        
        let valores = [idALUNO, novaNOTA];


        resultado = await client.query(query, valores);

        if (novaNOTA >= 7 ){
            console.log("O aluno está aprovado ✅");
        } else if (novaNOTA >= 5) {
            console.log("O aluno está de recuperação ⚠️");
        } else if ( novaNOTA < 5) {
            console.log("Reprovado ❌")
        }


     } catch (erro) {
         console.log('❌ Ocorreu um erro:', erro.message);

     } finally {
         await client.end();
         console.log('🔌 Conexão encerrada.');
     }
}

atividade();