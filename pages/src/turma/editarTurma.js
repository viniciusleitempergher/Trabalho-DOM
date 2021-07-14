import popup from '../popup/modal.js'
import { atualizarTurmas } from './atualizarTurmas.js'
import { getTurmas } from './getTurmas.js'

/**
 * Abre um popup com as informações da turma, edita as informações caso o usuário
 * clique em OK
 * @param {string} codigo - Código da turma que será editada
 * @returns {void}
 */
export function editarTurma(codigo) {
    let turmas = getTurmas()

    popup(`
    <h2 class="modalpopup__h2">Editar Turma:</h2>
    <input type="text" class="modalpopup__form__input" id="input__nometurma" placeholder="Nome da Turma">
    `)
    let form = document.querySelector(".modalpopup__form"),
        cancel = document.querySelectorAll(".modalpopup__form__button")[1]

    form.addEventListener("submit", (e) => {
        let nome = document.querySelector("#input__nometurma").value

        if (nome == "") {
            e.preventDefault()
            return alert("O nome não pode estar em branco!")
        }

        document.querySelector(".modalpopup").remove()

        let index = 0
        for (let turma of turmas) {
            if (turma.codigo == codigo) {
                turma.editarTurma(nome)
                turmas[index] = turma
                break
            }
            index++
        }

        localStorage.setItem("turmas", JSON.stringify(turmas))
        atualizarTurmas("", "")
        e.preventDefault()
    })
    form.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
            cancel.click()
        }
    })
    cancel.addEventListener("click", (e) => {
        e.preventDefault()
        document.querySelector(".modalpopup").remove()
        atualizarTurmas("", "")
    })
}