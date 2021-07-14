import popup from '../popup/modal.js'
import { atualizarAlunos } from './atualizarAlunos.js'
import { getTurma } from './getTurma.js'

/**
 * Cadastra as notas do aluno com a matrícula especificada
 * @param {string} matricula - Matrícula do aluno para cadastrar as notas
 * @returns {void}
 */
export function cadastrarNotas(matricula) {
    let turma = getTurma()
    
    popup(`
      <h2 class="modalpopup__h2">Cadastrar Notas:</h2>
      <input type="text" class="modalpopup__form__input" id="input-nota1" placeholder="Nota 1">
      <input type="text" class="modalpopup__form__input" id="input-nota2" placeholder="Nota 2">
      <input type="text" class="modalpopup__form__input" id="input-nota3" placeholder="Nota 3">
    `, true)

    let form = document.querySelector(".modalpopup__form")
    let cancel = document.querySelectorAll(".modalpopup__form__button")[1]

    cancel.addEventListener("click", (e) => {
        e.preventDefault()
        document.querySelector(".modalpopup").remove()
    })
    form.addEventListener("submit", (e) => {
        let nota1 = document.querySelector("#input-nota1").value,
            nota2 = document.querySelector("#input-nota2").value,
            nota3 = document.querySelector("#input-nota3").value

        document.querySelector(".modalpopup").remove()

        let turmas = JSON.parse(localStorage.getItem("turmas"))

        for (let i = 0; i < turmas.length; i++) {
            if (turmas[i].codigo == turma.codigo) {
                for (let aluno of turmas[i].alunos) {
                    if (aluno.matricula == matricula) {
                        aluno.notas = [+nota1, +nota2, +nota3]
                        break
                    }
                }
                break
            }
        }

        localStorage.setItem("turmas", JSON.stringify(turmas))
        atualizarAlunos("", "")
        e.preventDefault()
    })
    form.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
            cancel.click()
        }
    })
}