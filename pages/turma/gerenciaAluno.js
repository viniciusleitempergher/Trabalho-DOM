import { Turma } from '../turmas/turma.js'
import { Aluno } from './aluno.js'
import popup from '../popup/modal.js'

document.querySelector("#adicionarbtn").addEventListener("click", adicionarAluno)

const queryString = new URLSearchParams(location.search)
const codigoTurma = queryString.get("codigo")

const turma = getTurma()

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
  <h2 class="modalpopup__h2">Adicionar Turma:</h2>
  <input type="text" class="modalpopup__form__input" id="input__nometurma" placeholder="Nome da Turma">
      `)
}