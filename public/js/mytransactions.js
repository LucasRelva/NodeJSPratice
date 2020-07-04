$(document).ready(function () {
    $('#value').mask('000000000000000.00', { reverse: true });
})

$('.modal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset();
})

function update() {

    if ($.active) {
        return
    }

    $.ajax({

        url: '/api/conta/listar',
        method: 'get',

        success: returndata => {

            let table = $('#table-body')

            let html = ''

            returndata.reverse()

            for (let i = 0; i < returndata.length; i++) {

                let trans = returndata[i]

                const randomnum = Math.floor(Math.random() * 65536)

                if (trans.tipo == 'Entrada') {

                    html += `<tr>
                                <td>${randomnum}</td>
                                <td>${trans.nome}</td>
                                <td class="text-success">+ R$ ${trans.valor}</td>
                                <td>${trans.dia.slice(8, 10)}/${trans.dia.slice(5, 7)}/${trans.dia.slice(0, 4)}</td>
                    </tr>`
                } else {

                    html += `<tr>
                                <td>${randomnum}</td>
                                <td>${trans.nome}</td>
                                <td class="text-danger">- R$ ${trans.valor}</td>
                                <td>${trans.dia.slice(8, 10)}/${trans.dia.slice(5, 7)}/${trans.dia.slice(0, 4)}</td>
                    </tr>`
                }
            }

            table.html(html)

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

            income.html(` + R$ ${sum}`)
            outcome.html(`- R$ ${minus}`)
            balance.html(`R$ ${total}`)

        },

        error: () => {

            alert('Algo deu errado')
        }


    })

}

update()