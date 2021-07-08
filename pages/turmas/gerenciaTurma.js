import popup from '../popup/modal.js'
import { Turma } from './turma.js'

document.querySelector("#adicionarbtn").addEventListener("click", adicionarTurma)
document.querySelector("#editarbtn").addEventListener("click", editarTurma)
document.querySelector("#removerbtn").addEventListener("click", removerTurma)

let turmas = []

function adicionarTurma() {
    popup(`
    <h2 class="modalpopup__h2">Adicionar Turma:</h2>
    <input type="text" class="modalpopup__form__input" id="input__nometurma" placeholder="Nome da Turma">
        `)

    let nome, codigo
    let form = document.querySelector(".modalpopup__form")

    form.addEventListener("submit", (e) => {
        nome = document.querySelector("#input__nometurma").value
        document.body.removeChild(document.querySelector(".modalpopup"))
        codigo = 1

        let turma = new Turma(codigo, nome)

        turmas.push(turma)

        localStorage.setItem("turmas", JSON.stringify(turmas))
        atualizarTurmas()
        e.preventDefault()
    })
    form.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
            cancel.click()
        }
    })
}

window.addEventListener("load", () => {
    console.log(localStorage.getItem("turmas"));
    atualizarTurmas()
})

function editarTurma() {
    
}

function removerTurma() {

}

function atualizarTurmas() {
    turmas = JSON.parse(localStorage.getItem("turmas"))

    let listaTurmas = document.querySelector(".main__wrapper__turmas__wrapper")

    while (listaTurmas.children) {
        if (listaTurmas.children.length <= 1) {
            break
        }
        listaTurmas.lastChild.remove()
    }

    for (let turma of turmas) {
        document.querySelector(".main__wrapper__turmas__wrapper").insertAdjacentHTML("beforeend", `
        <div class="turma__wrapper">
            <p>${turma.nome} #${turma.codigo}</p>
            <i class="fas fa-edit button__editar-turma"></i>
            <i class="fas fa-trash button__remover-turma"></i>
        </div>
        `)
    }
}