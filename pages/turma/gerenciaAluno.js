import { Turma } from '../turmas/turma.js'
import { Aluno } from './aluno.js'
import popup from '../popup/modal.js'

document.querySelector("#adicionarbtn").addEventListener("click", adicionarAluno)

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
        turma.cadastrarAluno(aluno)
      }

      return turma
    }
  }

  window.location.href = "../turmas/index.html"
}

function atualizarAlunos(pesquisa, matricula) {
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
            <p class="alunos__info">${aluno.matricula}</p>
            <p class="alunos__info">${aluno.nome}</p>
            <p class="alunos__info">${aluno.telefone}</p>
            <p class="alunos__info">${aluno.email}/p>
            <p class="alunos__info">${aluno.notas}</p>
            <p class="alunos__info">${aluno.calculaMedia()}</p>
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