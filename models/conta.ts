import Sql = require("../infra/sql");
import { v4 as uuidv4 } from 'uuid';

//**********************************************************************************
// Se por acaso ocorrer algum problema de conexão, autenticação com o MySQL,
// por favor, execute este código abaixo no MySQL e tente novamente!
//
// ALTER USER 'USUÁRIO'@'localhost' IDENTIFIED WITH mysql_native_password BY 'SENHA'
//
// * Assumindo que o usuário seja root e a senha root, o comando ficaria assim:
//
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'
//
//**********************************************************************************


//criando a classe de transações
export = class Transaction {

    public id: number
    public name: string
    public type: string
    public value: number
    public date: Date
    public token: string

    public constructor(id: number, name: string, type: string, value: number, date: Date, token: string) {

        this.id = id
        this.name = name
        this.type = type
        this.value = value
        this.date = date
        this.token = token
    }

    //modulo de validação, valida se todos os dados foram preenchidos
    //private: esse método só pode ser acessado nessa classe
    private static validate(transaction: Transaction): string {

        if (transaction.name) {
            transaction.name = transaction.name.trim()
        }

        if (transaction.type) {
            transaction.type = transaction.type.trim()
        }

        if (!transaction.type || isNaN(transaction.value) || !transaction.name || !transaction.value) {
            return 'Faltam Dados'
        }

        if (transaction.name.length > 20) {
            return 'Nome muito longo'
        }
        // não retorna nada caso esteja tudo correto
        return null
    }

    //método de criação
    public static async create(transaction: Transaction): Promise<string> {

        //passa pelo método de validação e salva o retorno na variável 'err'
        let err: string = Transaction.validate(transaction)

        // caso o do método validate não for nulo esse if retornará o erro
        if (err) {
            return err
        }

        //executa a função conectar com 'await w async' oq permitirá a execução de outras coisas enquanto o servidor espera a resposta desse método
        await Sql.conectar(async (sql: Sql) => {

            try {
                transaction.id = await sql.scalar('SELECT last_insert_id()') as number
                // criptográfa o ID do registro
                transaction.token = uuidv4(transaction.id)
                //adiciona os dados no banco de dados
                await sql.query(`INSERT INTO transactions (nome, tipo, valor, dia, token) 
                                VALUES (?, ?, ?, CURDATE() , ?)`, [transaction.name, transaction.type, transaction.value, transaction.token])

            } catch (e) {
                throw e
            }

        })
        // se tudo estiver dentro dos requisitos esse retorno será nulo
        return err
    }
    // método deletar
    public static async delete(id: number): Promise<string> {

        let err: string = null

        await Sql.conectar(async (sql: Sql) => {
            // exclui do banco de dados a transaction de id escolhido
            await sql.query('DELETE FROM transactions WHERE id = ?', [id])

            if (!sql.linhasAfetadas) {
                err = 'Transação não encontrada'
            }

        })

        return err
    }
    // função listar 
    public static async list(): Promise<Transaction[]> {

        let transactions: Transaction[] = null

        await Sql.conectar(async (sql: Sql) => {
            //seliciona tudo do banco de dados e salva no vetor transactions
            transactions = await sql.query(`SELECT * FROM transactions`) as Transaction[]

        })

        return transactions
    }
}

