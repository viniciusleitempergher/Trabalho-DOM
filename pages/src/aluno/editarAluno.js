import popup from '../popup/modal.js'
import { atualizarAlunos } from './atualizarAlunos.js'
import { getTurma } from './getTurma.js'

/**
 * Abre um popup com as informações do aluno, edita as informações caso o usuário
 * clique em OK
 * @param {string} matricula - Matrícula do aluno que será editado
 * @returns {void}
 */
export function editarAluno(matricula) {
    let turma = getTurma()

    popup(`
    <h2 class="modalpopup__h2">Editar Aluno:</h2>
    <input type="text" class="modalpopup__form__input" id="input-matricula" placeholder="Matrícula">
    <input type="text" class="modalpopup__form__input" id="input-nome" placeholder="Nome">
    <input type="text" class="modalpopup__form__input" id="input-telefone" placeholder="Telefone">
    <input type="text" class="modalpopup__form__input" id="input-email" placeholder="Email">
    `, true)

    let turmas = JSON.parse(localStorage.getItem("turmas"))


    for (let i = 0; i < turmas.length; i++) {
        if (turmas[i].codigo == turma.codigo) {
            for (let aluno of turmas[i].alunos) {
                if (aluno.matricula == matricula) {
                    document.querySelector("#input-matricula").value = aluno.matricula
                    document.querySelector("#input-nome").value = aluno.nome
                    document.querySelector("#input-telefone").value = aluno.telefone
                    document.querySelector("#input-email").value = aluno.email
                    break
                }
            }
            break
        }
    }

    let form = document.querySelector(".modalpopup__form")
    let cancel = document.querySelectorAll(".modalpopup__form__button")[1]

    cancel.addEventListener("click", (e) => {
        e.preventDefault()
        document.querySelector(".modalpopup").remove()
    })
    form.addEventListener("submit", (e) => {
        let matriculaToEdit = document.querySelector("#input-matricula").value,
            nome = document.querySelector("#input-nome").value,
            telefone = document.querySelector("#input-telefone").value,
            email = document.querySelector("#input-email").value

        if (matricula == "" || nome == "" || telefone == "" || email == "") {
            e.preventDefault()
            return alert("Nenhum campo pode estar vazio!")
        }

        document.body.removeChild(document.querySelector(".modalpopup"))

        for (let i = 0; i < turmas.length; i++) {
            if (turmas[i].codigo == turma.codigo) {
                for (let aluno of turmas[i].alunos) {
                    if (aluno.matricula == matricula) {
                        aluno.matricula = matriculaToEdit
                        aluno.nome = nome
                        aluno.telefone = telefone
                        aluno.email = email
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