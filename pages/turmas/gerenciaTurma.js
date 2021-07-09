import popup from '../popup/modal.js'
import { Turma } from './turma.js'

document.querySelector("#adicionarbtn").addEventListener("click", adicionarTurma)
document.querySelector("#editarbtn").addEventListener("click", () => selectTurma("Clique na turma para editar", editarTurma))
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

function selectTurma(txt, callback) {
    for (let botao of document.querySelectorAll(".main__wrapper__menu__button")) {
        botao.style.display = "none"
    }

    let menu = document.querySelector(".main__wrapper__menu")

    let cancelAction = document.createElement("button")
    cancelAction.className = "main__wrapper__menu__button"
    cancelAction.textContent = "Cancelar"

    let texto = document.createElement("h3")
    texto.textContent = txt

    let callbackComCodigo = function(e) {
        let hashTagsSplitted = e.target.textContent.split("#")
        callback(hashTagsSplitted[hashTagsSplitted.length - 1])
        voltaAoNormal()
        for (let turma of document.querySelectorAll(".turma__wrapper")) {
            turma.removeEventListener("click", callbackComCodigo)
        }
    }

    for (let turma of document.querySelectorAll(".turma__wrapper")) {
        turma.addEventListener("click", callbackComCodigo)
    }

    cancelAction.addEventListener("click", () => {
        voltaAoNormal()
    })

    // Sai do modo de edição e mostra os botões de novo.
    function voltaAoNormal() {
        cancelAction.remove()
        texto.remove()
        for (let botao of document.querySelectorAll(".main__wrapper__menu__button")) {
            botao.style.display = ""
        }
    }

    menu.prepend(cancelAction)
    menu.prepend(texto)
}

function editarTurma(codigo) {
    popup(`
    <h2 class="modalpopup__h2">Editar Turma:</h2>
    <input type="text" class="modalpopup__form__input" id="input__nometurma" placeholder="Nome da Turma">
    `)
    let form = document.querySelector(".modalpopup__form"),
        cancel = document.querySelectorAll(".modalpopup__form__button")[1]

    form.addEventListener("submit", (e) => {
        let nome = document.querySelector("#input__nometurma").value
        document.querySelector(".modalpopup").remove()

        turmas = getTurmas()

        let index = 0
        for (let turma of turmas) {
            if (turma.codigo == codigo) {
                turma.editarTurma(nome)
                turmas[index] = turma
            }
            index++
        }

        localStorage.setItem("turmas", JSON.stringify(turmas))
        atualizarTurmas()
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

// Pega as informações da memória e retorna elas num objeto do tipo Turma
function getTurmas() {
    let turmas = []
    let turmasWithoutType = JSON.parse(localStorage.getItem("turmas"))

    for (let turmaWithoutType of turmasWithoutType) {
        let turma = new Turma(turmaWithoutType.codigo, turmaWithoutType.nome)
        turmas.push(turma)
    }

    return turmas
}