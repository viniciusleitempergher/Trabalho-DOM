import { Turma } from '../turmas/turma.js'
import { Aluno } from './aluno.js'
import popup from '../popup/modal.js'

document.querySelector("#adicionarbtn").addEventListener("click", adicionarAluno)
document.querySelector("#cadastrarbtn").addEventListener("click", (e) => {
  selecionarAluno("Clique no aluno para cadastrar", cadastrarNotas)
})

const queryString = new URLSearchParams(location.search)
const codigoTurma = queryString.get("codigo")

let turma = getTurma()

document.querySelector(".alunos__title h2").textContent = turma.nome

let alunos = turma.alunos

window.addEventListener("load", () => {
  atualizarAlunos("", "")
})

function getTurma() {
  let turmasWithoutType

  if (localStorage.getItem("turmas")) {
    turmasWithoutType = JSON.parse(localStorage.getItem("turmas"))
  }

  for (let turmaWithoutType of turmasWithoutType) {
    if (turmaWithoutType.codigo == codigoTurma) {
      let turma = new Turma(turmaWithoutType.codigo, turmaWithoutType.nome)

      for (let aluno of turmaWithoutType.alunos) {
        let alunoTipado = new Aluno(aluno.matricula, aluno.nome, aluno.telefone, aluno.email)
        alunoTipado.notas = aluno.notas
        turma.cadastrarAluno(alunoTipado)
      }

      return turma
    }
  }

  window.location.href = "../turmas/index.html"
}

function atualizarAlunos(pesquisa, matricula) {
  turma = getTurma()
  alunos = turma.alunos

  let listaAlunos = document.querySelector(".main__wrapper__alunos")

  while (listaAlunos.children) {
    if (listaAlunos.children.length <= 7) {
      break
    }
    listaAlunos.lastChild.remove()
  }

  for (let aluno of alunos) {
    if (aluno.nome.toLowerCase().includes(pesquisa.toLowerCase()) && ((aluno.matricula + "") == matricula || matricula == "")) {
      document.querySelector(".main__wrapper__alunos").insertAdjacentHTML("beforeend", `
            <p class="alunos__info" id="alunos__info-matricula">${aluno.matricula}</p>
            <p class="alunos__info">${aluno.nome}</p>
            <p class="alunos__info">${aluno.telefone}</p>
            <p class="alunos__info">${aluno.email}</p>
            <p class="alunos__info">${Array.from(aluno.notas) || ""}</p>
            <p class="alunos__info">${aluno.calculaMedia() || ((aluno.calculaMedia() == 0) ? "0" : "")}</p>
      `)
    }
  }
  // addRedirectListeners()
}

function adicionarAluno() {
  popup(`
      <h2 class="modalpopup__h2">Adicionar Aluno:</h2>
      <input type="text" class="modalpopup__form__input" id="input-matricula" placeholder="Matrícula">
      <input type="text" class="modalpopup__form__input" id="input-nome" placeholder="Nome">
      <input type="text" class="modalpopup__form__input" id="input-telefone" placeholder="Telefone">
      <input type="text" class="modalpopup__form__input" id="input-email" placeholder="Email">
      `)

  let form = document.querySelector(".modalpopup__form")
  let cancel = document.querySelectorAll(".modalpopup__form__button")[1]

  cancel.addEventListener("click", (e) => {
    e.preventDefault()
    document.querySelector(".modalpopup").remove()
  })
  form.addEventListener("submit", (e) => {
    let matricula = document.querySelector("#input-matricula").value,
      nome = document.querySelector("#input-nome").value,
      telefone = document.querySelector("#input-telefone").value,
      email = document.querySelector("#input-email").value

    document.body.removeChild(document.querySelector(".modalpopup"))

    let turmas = JSON.parse(localStorage.getItem("turmas"))
    let aluno = new Aluno(matricula, nome, telefone, email)

    for (let i = 0; i < turmas.length; i++) {
      if (turmas[i].codigo == turma.codigo) {
        turmas[i].alunos.push(aluno)
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

function selecionarAluno(txt, callback) {
  for (let botao of document.querySelectorAll(".main__wrapper__menu__button")) {
    botao.style.display = "none"
  }

  // for (let turma of document.querySelectorAll(".turma__wrapper")) {
  //     turma.removeEventListener("click", redirecionarParaTurma)
  // }

  let menu = document.querySelector(".main__wrapper__menu")

  let cancelAction = document.createElement("button")
  cancelAction.className = "main__wrapper__menu__button"
  cancelAction.textContent = "Cancelar"

  let texto = document.createElement("h3")
  texto.textContent = txt

  let callbackComMatricula = function (e) {
    let pMatricula = e.target

    while (pMatricula.id != "alunos__info-matricula") {
      pMatricula = pMatricula.previousSibling
    }

    callback(pMatricula.textContent)
    for (let aluno of document.querySelectorAll(".alunos__info")) {
      aluno.removeEventListener("click", callbackComMatricula)
    }
    voltaAoNormal()
  }

  for (let aluno of document.querySelectorAll(".alunos__info")) {
    aluno.addEventListener("click", callbackComMatricula)
  }

  cancelAction.addEventListener("click", () => {
    for (let aluno of document.querySelectorAll(".alunos__info")) {
      aluno.removeEventListener("click", callbackComMatricula)
    }
    voltaAoNormal()
    atualizarAlunos("", "")
  })

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

function cadastrarNotas(matricula) {
  popup(`
    <h2 class="modalpopup__h2">Cadastrar Notas:</h2>
    <input type="text" class="modalpopup__form__input" id="input-nota1" placeholder="Nota 1">
    <input type="text" class="modalpopup__form__input" id="input-nota2" placeholder="Nota 2">
    <input type="text" class="modalpopup__form__input" id="input-nota3" placeholder="Nota 3">
  `)

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