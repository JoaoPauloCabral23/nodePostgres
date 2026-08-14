import pg from 'pg';
import promptSync from 'prompt-sync';

const { Client } = pg;
const prompt = promptSync();

function criarCliente() {
    return new Client({
        host:     'localhost',
        port:     5432,
        user:     'postgres',
        password: 'root',
        database: 'escola_db'
    });
};


async function MostrarAluno() {
    const client = criarCliente();
    try {
        await client.connect();
        const resultado = await client.query(
            'SELECT * FROM alunos WHERE presente = FALSE'
        );
        if(resultado.rows.length === 0){

            console.log("Nenhum aluno presente.");
        } else {
            resultado.rows.forEach(aluno => {
            console.log(`ID: ${aluno.id} | Nome: ${aluno.nome} | Nota: ${aluno.nota}`);
        });
        }

    } catch(erro) {
        console.log('❌ Erro ao listar itens:', erro.message);
    } finally {
        await client.end();
    }
}
// MostrarAluno();

async function MostrarJogo() {
    const client = criarCliente();

    try {

        await client.connect();
        const generoJogo = prompt('Digite um gênero de jogo: ');

        const resultado = await client.query(
            'SELECT id, titulo, nota, lancamento FROM jogos WHERE genero = $1',
            [generoJogo]
        );

        if (resultado.rows.length === 0) {
            console.log("Nenhum jogo encontrado para esse gênero.");

        } else {
            resultado.rows.forEach(jogo => {

                console.log(
                    `ID: ${jogo.id} | Título: ${jogo.titulo} | Nota: ${jogo.nota} | Ano: ${jogo.lancamento}`
                );
            });
        }
    } catch(erro) {
        console.log('❌ Erro ao listar itens:', erro.message);

    } finally {
        await client.end();
    }
}


MostrarJogo();