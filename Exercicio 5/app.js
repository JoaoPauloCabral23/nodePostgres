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
            console.log(
                `ID: ${aluno.id} | Nome: ${aluno.nome} | Nota: ${aluno.nota}`
            );
        });
        
        const alunoR = Number(prompt("Qual o ID do aluno a ser removido? "));
        let valores = [alunoR];
        
        resultado = await client.query(
            'SELECT id, nome, turma FROM alunos WHERE id = $1',
            valores
        );
        
        if (resultado.rows.length === 0) {
            console.log("Aluno não encontrado.");
            return;
        }
        
        const aluno = resultado.rows[0];
        
        console.log(`ID: ${aluno.id} | Nome: ${aluno.nome}`);
        
        let validacao = prompt(`Deseja remover ${aluno.nome}? (s/n): `);
        
        if (validacao.toLowerCase() != 's') {
            console.log("Operação cancelada, nenhum dado alterado.");
            return;
        } else {
            const query = `
                DELETE FROM alunos
                WHERE id = $1
                RETURNING *
            `;
        
            resultado = await client.query(query, valores);
        
            console.log(`Aluno ${resultado.rows[0].nome} removido com sucesso.`);
        }


    } catch (erro) {
        console.log('❌ Ocorreu um erro:', erro.message);

    } finally {
        await client.end();
        console.log('🔌 Conexão encerrada.');
    }
}

atividade();