import popup from '../popup/modal.js'
import { atualizarTurmas } from './atualizarTurmas.js'
import { getTurmas } from './getTurmas.js'
import { Turma } from './turma.js'

/**
 * Abre um popup pedindo o nome da turma, cadastra ela caso o usuário clique em OK
 * @returns {void|alert} - Retorna um alert caso o nome esteja vazio
 */
export function adicionarTurma() {
    let turmas = getTurmas()

    popup(`
    <h2 class="modalpopup__h2">Adicionar Turma:</h2>
    <input type="text" class="modalpopup__form__input" id="input__nometurma" placeholder="Nome da Turma">
        `)

    let nome, codigo
    let form = document.querySelector(".modalpopup__form")
    let cancel = document.querySelectorAll(".modalpopup__form__button")[1]

    cancel.addEventListener("click", (e) => {
        e.preventDefault()
        document.querySelector(".modalpopup").remove()
    })
    form.addEventListener("submit", (e) => {
        nome = document.querySelector("#input__nometurma").value

        if (nome == "") {
            e.preventDefault()
            return alert("O nome não pode estar em branco!")
        }

        document.body.removeChild(document.querySelector(".modalpopup"))

        if (turmas.length >= 1) {
            codigo = turmas[turmas.length - 1].codigo + 1
        } else {
            codigo = 1
        }

        let turma = new Turma(codigo, nome)
        turmas.push(turma)

        localStorage.setItem("turmas", JSON.stringify(turmas))
        atualizarTurmas("", "")

        e.preventDefault()
    })
    form.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
            cancel.click()
        }
    })
}