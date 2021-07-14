import { addRedirectListeners } from "./gerenciaTurma.js"
import { getTurmas } from "./getTurmas.js"

/**
 * Mostra na tela as turmas que contém o nome(pesquisa) e o código passados como parâmetro, caso eles
 * sejam Strings vazias retorna todas as turmas
 * @param {string} pesquisa - O nome do aluno a ser pesquisado, caso seja uma String vazia mostra tudo
 * @param {string} codigo - O codigo a ser pesquisado, caso seja uma String vazia mostra tudo
 * @returns {void}
 */
export function atualizarTurmas(pesquisa, codigo) {
    let turmas = getTurmas()

    let listaTurmas = document.querySelector(".main__wrapper__turmas__wrapper")

    while (listaTurmas.children) {
        if (listaTurmas.children.length <= 1) {
            break
        }
        listaTurmas.lastChild.remove()
    }

    for (let turma of turmas) {
        if (turma.nome.toLowerCase().includes(pesquisa.toLowerCase()) && ((turma.codigo + "") == codigo || codigo == "")) {
            document.querySelector(".main__wrapper__turmas__wrapper").insertAdjacentHTML("beforeend", `
            <div class="turma__wrapper">
                <p>${turma.nome} #${turma.codigo}</p>
            </div>
        `)
        }
    }
    addRedirectListeners()
}