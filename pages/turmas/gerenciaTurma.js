import popup from '../popup/modal.js'
import { Turma } from './turma.js'

document.querySelector("#adicionarbtn").addEventListener("click", adicionarTurma)
document.querySelector("#editarbtn").addEventListener("click", selectTurma)
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

        if (turmas.length >= 1) {
            codigo = turmas[turmas.length - 1].codigo + 1
        } else {
            codigo = 1
        }

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
    atualizarTurmas()
})

function selectTurma() {
    for (let botao of document.querySelectorAll(".main__wrapper__menu__button")) {
        botao.style.display = "none"
    }

    let menu = document.querySelector(".main__wrapper__menu")

    let cancelAction = document.createElement("button")
    cancelAction.className = "main__wrapper__menu__button"
    cancelAction.textContent = "Cancelar"

    let texto = document.createElement("h3")
    texto.textContent = "Clique na sala que quer alterar"

    menu.prepend(cancelAction)
    menu.prepend(texto)
}

function editarTurma() {

    popup(`
    <h2 class="modalpopup__h2">Editar Turma:</h2>
    <input type="text" class="modalpopup__form__input" id="input__nometurma" placeholder="Nome da Turma">
    `)
    let form = document.querySelector(".modalpopup__form")

    form.addEventListener("submit", (e) => {
        nome = document.querySelector("#input__nometurma").value
        document.body.removeChild(document.querySelector(".modalpopup"))

        

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

function removerTurma() {

}

function atualizarTurmas() {
    if (localStorage.getItem("turmas")) {
        turmas = JSON.parse(localStorage.getItem("turmas"))
    } else {
        turmas = []
    }

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