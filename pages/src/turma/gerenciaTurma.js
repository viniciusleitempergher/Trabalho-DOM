import popup from '../popup/modal.js'
import { Turma } from './turma.js'

document.querySelector("#adicionarbtn").addEventListener("click", adicionarTurma)
document.querySelector("#editarbtn").addEventListener("click", () => selectTurma("Clique na turma para editar", editarTurma))
document.querySelector("#removerbtn").addEventListener("click", () => selectTurma("Clique na turma para deletar", removerTurma))
document.querySelector("#button__search").addEventListener("click", () => atualizarTurmas(
    document.querySelector("#inputTurmaSearch").value,
    document.querySelector("#inputCodigoSearch").value
))
document.querySelector("#button__clear__search").addEventListener("click", clearSearch)

let turmas = []

function adicionarTurma() {
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

window.addEventListener("load", () => {
    atualizarTurmas("", "")
})

let redirecionarParaTurma = function (e) {
    let hashTagsSplitted = e.target.textContent.split("#"),
        codigo = hashTagsSplitted[hashTagsSplitted.length - 1]

    window.location.href = `../turma/index.html?codigo=${codigo}`
}

function selectTurma(txt, callback) {
    for (let botao of document.querySelectorAll(".main__wrapper__menu__button")) {
        botao.style.display = "none"
    }

    for (let turma of document.querySelectorAll(".turma__wrapper")) {
        turma.removeEventListener("click", redirecionarParaTurma)
    }

    let menu = document.querySelector(".main__wrapper__menu")

    let divAround = document.createElement("div")
    let cancelAction = document.createElement("button")

    cancelAction.className = "main__wrapper__menu__button"
    cancelAction.textContent = "Cancelar"

    let texto = document.createElement("h3")
    texto.textContent = txt

    let callbackComCodigo = function (e) {
        let hashTagsSplitted = e.target.textContent.split("#")
        callback(hashTagsSplitted[hashTagsSplitted.length - 1])
        for (let turma of document.querySelectorAll(".turma__wrapper")) {
            turma.removeEventListener("click", callbackComCodigo)
        }
        voltaAoNormal()
    }

    for (let turma of document.querySelectorAll(".turma__wrapper")) {
        turma.addEventListener("click", callbackComCodigo)
    }

    cancelAction.addEventListener("click", () => {
        for (let turma of document.querySelectorAll(".turma__wrapper")) {
            turma.removeEventListener("click", callbackComCodigo)
        }
        voltaAoNormal()
        atualizarTurmas("", "")
    })

    // Sai do modo de edição e mostra os botões de novo.
    function voltaAoNormal() {
        cancelAction.remove()
        texto.remove()
        for (let botao of document.querySelectorAll(".main__wrapper__menu__button")) {
            botao.style.display = ""
        }
    }

    menu.prepend(divAround)
    divAround.prepend(cancelAction)
    divAround.prepend(texto)
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

        if (nome == "") {
            e.preventDefault()
            return alert("O nome não pode estar em branco!")
        }

        document.querySelector(".modalpopup").remove()

        turmas = getTurmas()

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

function removerTurma(codigo) {
    turmas = getTurmas()

    let index = 0
    for (let turma of turmas) {
        if (turma.codigo == codigo) {
            if (!confirm(`Deseja realmente excluir a turma: ${turma.nome} #${turma.codigo}`)) return;
            turmas.splice(index, 1)
        }
        index++
    }
    localStorage.setItem("turmas", JSON.stringify(turmas))
    atualizarTurmas("", "")
}

function atualizarTurmas(pesquisa, codigo) {
    turmas = getTurmas()

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
                <i class="fas fa-edit button__editar-turma"></i>
                <i class="fas fa-trash button__remover-turma"></i>
            </div>
        `)
        }
    }
    addRedirectListeners()
}

function addRedirectListeners() {
    for (let turma of document.querySelectorAll(".turma__wrapper")) {
        turma.addEventListener("click", redirecionarParaTurma)
    }
}

// Pega as informações da memória e retorna elas num objeto do tipo Turma
function getTurmas() {
    let turmas = [],
        turmasWithoutType

    if (localStorage.getItem("turmas")) {
        turmasWithoutType = JSON.parse(localStorage.getItem("turmas"))
    } else {
        return []
    }

    for (let turmaWithoutType of turmasWithoutType) {
        let turma = new Turma(turmaWithoutType.codigo, turmaWithoutType.nome)

        for (let aluno of turmaWithoutType.alunos) {
            turma.cadastrarAluno(aluno)
        }

        turmas.push(turma)
    }

    return turmas
}

function clearSearch() {
    for (let input of document.querySelectorAll(".main__wrapper__menu__input")) {
        input.value = ""
    }
    document.querySelector("#button__search").click()
}