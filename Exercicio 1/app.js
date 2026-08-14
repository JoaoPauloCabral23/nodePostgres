import pg from 'pg';
const { Client } = pg;

const client = new Client({
    host:     'localhost',
    port:     5432,
    user:     'postgres',
    password: 'root',
    database: 'escola_db'
});

async function listarAlunos() {

    try {
        await client.connect();

        const resultado = await client.query('SELECT * FROM alunos');
        console.log(resultado.rows);

    } catch (erro) {
        console.log('❌ Ocorreu um erro:', erro.message);

    } finally {
        await client.end();
        console.log('🔌 Conexão encerrada.');
    }
}

listarAlunos();