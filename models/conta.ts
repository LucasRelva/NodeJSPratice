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
 

 export = class Transaction {

     public id: number
     public name: string
     public type: string
     public value: number
     public date: Date
     public token: string

     public constructor (id:number, name:string, type:string, value:number, date: Date, token: string){

        this.id = id
        this.name = name
        this.type = type
        this.value = value
        this.date = date
        this.token = token
     }

     private static validate(transaction: Transaction): string {

        if (transaction.name) {
            transaction.name = transaction.name.trim()
        }

        if (transaction.type) {
            transaction.type = transaction.type.trim()
        }

        if (!transaction.type || isNaN(transaction.value) || !transaction.name || !transaction.value){
            return 'Faltam Dados'
        }

        if (transaction.name.length > 20) {
            return 'Nome muito longo'
        }

        return null
     }

     public static async create(transaction: Transaction): Promise<string> {

        let err: string = Transaction.validate(transaction)

        if (err) {
            return err
        }

        await Sql.conectar(async (sql: Sql) => {

            try {
                transaction.id = await sql.scalar('SELECT last_insert_id()') as number

                transaction.token = uuidv4(transaction.id)

                await sql.query(`INSERT INTO transactions (nome, tipo, valor, dia, token) 
                                VALUES (?, ?, ?, CURDATE() , ?)`, [transaction.name, transaction.type, transaction.value, transaction.token])
                                
            } catch (e) {
                throw e
            }

        })

        return err
     }

     public static async delete(id: number): Promise<string> {

        let err: string = null

        await Sql.conectar(async (sql: Sql) => {

            await sql.query('DELETE FROM transactions WHERE id = ?' [id])

            if (!sql.linhasAfetadas) {
                err = 'Transação não encontrada'
            }

        })

        return err
     }

     public static async list(): Promise<Transaction[]> {

         let transactions: Transaction[] = null

         await Sql.conectar(async (sql: Sql) => {
             
            transactions = await sql.query(`SELECT * FROM transactions`) as Transaction[]

         })

         return transactions
     }
 }

 