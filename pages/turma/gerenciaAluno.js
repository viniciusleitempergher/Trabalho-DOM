import { Aluno } from './aluno.js'

document.querySelector("#adicionarbtn").addEventListener("click", adicionarAluno)

const queryString = new URLSearchParams(location.search)
const codigoTurma = queryString.get("codigo")

const turma = getTurma()

let alunos = turma.alunos

function getTurma() {
  let turmas

  if (localStorage.getItem("turmas")) {
    turmas = JSON.parse(localStorage.getItem("turmas"))
  }

  for (let turma of turmas) {
    if (turma.codigo == codigoTurma) {
      return turma
    }
  }

  window.location.href = "../turmas/index.html"
}

function atualizarAlunos(pesquisa, matricula) {
  alunos = getAlunos()

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

}