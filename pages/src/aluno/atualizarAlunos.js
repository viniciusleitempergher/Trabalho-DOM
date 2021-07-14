import { getTurma } from "./getTurma.js"
import { abrirAlunoOnMobile } from "./mobilePopup.js"

/**
 * Mostra na tela os alunos que contém o nome(pesquisa) e a matrícula passados como parâmetro, caso eles
 * sejam Strings vazias retorna todos os alunos
 * @param {string} pesquisa - O nome do aluno a ser pesquisado, caso seja uma String vazia mostra tudo
 * @param {string} matricula - A matrícula a ser pesquisada, caso seja uma String vazia mostra tudo
 * @returns {void}
 */
export function atualizarAlunos(pesquisa, matricula) {
    let turma = getTurma()

    let alunos = turma.alunos

    let listaAlunos = document.querySelector(".main__wrapper__alunos")

    while (listaAlunos.children) {
        if (listaAlunos.children.length <= 7) {
            break
        }
        listaAlunos.lastChild.remove()
    }

    for (let aluno of alunos) {
        if (aluno.nome.toLowerCase().includes(pesquisa.toLowerCase()) && aluno.matricula.includes(matricula)) {
            document.querySelector(".main__wrapper__alunos").insertAdjacentHTML("beforeend", `
              <p class="alunos__info alunos__info-matricula">${aluno.matricula}</p>
              <p class="alunos__info">${aluno.nome}</p>
              <p class="alunos__info noneOnMobile">${aluno.telefone}</p>
              <p class="alunos__info noneOnMobile">${aluno.email}</p>
              <p class="alunos__info noneOnMobile">${Array.from(aluno.notas) || ""}</p>
              <p class="alunos__info noneOnMobile">${+aluno.calculaMedia().toFixed(2) || ((aluno.calculaMedia() == 0) ? "0" : "")}</p>
        `)
        }
    }
    abrirAlunoOnMobile()
}
