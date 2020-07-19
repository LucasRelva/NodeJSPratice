//formata o valor do 'value' para ter duas casas decimais
$(document).ready(function () {
    $('#value').mask('000000000000000.00', { reverse: true });
})

$('.modal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset();
})

function update() {

    //começo da função para atualizar a lista no front-end    
    $.ajax({
        // quando a função for executada irá buscar o método listar 
        url: '/api/conta/listar',
        method: 'get',
        // vetor 'transactions' retornado pelo método listar salvo no parâmetro 'returndata'
        success: returndata => {

            let table = $('#table-body')//corpo da tabela salvo na var 'table'

            let html = ''// cria var 'html' como uma string vazia

            returndata.reverse()// inverte o vetor para que as novas transações registradas apareçam no topo da tabela

            for (let i = 0; i < returndata.length; i++) {
                //for para percorrer todos os objetos do vetor
                let trans = returndata[i]

                const randomnum = Math.floor(Math.random() * 65536)// gera um número aleatório entre 0 e 65536

                if (trans.tipo == 'Entrada') { // se a opção 'entrada' for selecionada pelo usuário a string 'html' recebe oq está abaixo

                    html += `<tr>
                                <td>${randomnum}</td>
                                <td>${trans.nome}</td>
                                <td class="text-success">+ R$ ${(Math.round(trans.valor * 100) / 100).toFixed(2)}</td>
                                <td>${trans.dia.slice(8, 10)}/${trans.dia.slice(5, 7)}/${trans.dia.slice(0, 4)}</td>
                                <td><a href ='#' onclick='del(${trans.id})' class = 'trash-icon'> <svg width="1em" height="1em" viewBox="0 0 16 16" 
                                class="bi bi-trash text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style = 'font-size: 20px;'>
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 
                                .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h
                                2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                              </svg></a></td>
                    </tr>`
                } else {//string html caso a escolha seja 'saída'

                    html += `<tr>
                                <td>${randomnum}</td>
                                <td>${trans.nome}</td>
                                <td class="text-danger">- R$ ${(Math.round(trans.valor * 100) / 100).toFixed(2)}</td>
                                <td>${trans.dia.slice(8, 10)}/${trans.dia.slice(5, 7)}/${trans.dia.slice(0, 4)}</td>
                                <td><a href ='#' onclick='del(${trans.id})' class = 'trash-icon'> <svg width="1em" height="1em" viewBox="0 0 16 16" 
                                class="bi bi-trash text-danger" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style = 'font-size: 20px;'>
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 
                                .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h
                                2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                              </svg></a></td>
                    </tr>`
                }
            }

            table.html(html)// adiciona a string recebida acima a tabela

            // exibindo os resultados gerais de saldo entrada e saída nos cards da homepage
            let income = $('#income-card')
            let outcome = $('#outcome-card')
            let balance = $('#balance-card')

            let sum = 0
            let minus = 0
            let total = 0

            for (let i = 0; i < returndata.length; i++) {

                let trans = returndata[i]

                if (trans.tipo == 'Entrada') {

                    sum += trans.valor

                    total += trans.valor

                } else {

                    minus -= trans.valor

                    total -= trans.valor
                }
            }

            minus *= -1

            income.html(` + R$ ${(Math.round(sum * 100) / 100).toFixed(2)}`)
            outcome.html(`- R$ ${(Math.round(minus * 100) / 100).toFixed(2)}`)
            balance.html(`R$ ${(Math.round(total * 100) / 100).toFixed(2)}`)

        },

        error: () => {

            alert('Algo deu errado')
        }


    })

}
// função deletar executada ao apertar o botão
function del(id) {
    //evitada q a função seja executada duas ou mais vezes caso ocorra double click
    if ($.active) return


    //pop up de confirmação 
    if (!confirm('Tem certeza que deseja fazer isso?')) return
    // executa a função excluir com o id da transação escolhida
    $.ajax({
        url: '/api/conta/excluir/' + id,
        method: "GET",

        success:  data => {
            update()//atualiza a tabela para remoção da transação excluída
        },

        error:  () => {
            alert('Algo deu errado!')
        }
    })

}

update()// função update executada ao carregara a página