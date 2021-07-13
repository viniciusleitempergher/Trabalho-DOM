import { Turma } from '../turma/turma.js'
import { Aluno } from './aluno.js'
import popup from '../popup/modal.js'

document.querySelector("#adicionarbtn").addEventListener("click", adicionarAluno)
document.querySelector("#cadastrarbtn").addEventListener("click", (e) => {
  selecionarAluno("Clique no aluno para cadastrar", cadastrarNotas)
})
document.querySelector("#editarbtn").addEventListener("click", (e) => {
  selecionarAluno("Clique no aluno para editar", editarAluno)
})
document.querySelector("#removerbtn").addEventListener("click", (e) => {
  selecionarAluno("Clique no aluno para remover", removerAluno)
})

document.querySelector("#button__search").addEventListener("click", () => atualizarAlunos(
  document.querySelector("#input-buscarNomeAluno").value,
  document.querySelector("#input-buscarMatriculaAluno").value
))
document.querySelector("#button__clear__search").addEventListener("click", clearSearch)

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
    if (aluno.nome.toLowerCase().includes(pesquisa.toLowerCase()) && aluno.matricula.includes(matricula)) {
      document.querySelector(".main__wrapper__alunos").insertAdjacentHTML("beforeend", `
            <p class="alunos__info alunos__info-matricula">${aluno.matricula}</p>
            <p class="alunos__info">${aluno.nome}</p>
            <p class="alunos__info noneOnMobile">${aluno.telefone}</p>
            <p class="alunos__info noneOnMobile">${aluno.email}</p>
            <p class="alunos__info noneOnMobile">${Array.from(aluno.notas) || ""}</p>
            <p class="alunos__info noneOnMobile">${aluno.calculaMedia() || ((aluno.calculaMedia() == 0) ? "0" : "")}</p>
      `)
    }
  }
  abrirAlunoOnMobile()
}

function adicionarAluno() {
  popup(`
      <h2 class="modalpopup__h2">Adicionar Aluno:</h2>
      <input type="text" class="modalpopup__form__input" id="input-matricula" placeholder="Matrícula">
      <input type="text" class="modalpopup__form__input" id="input-nome" placeholder="Nome">
      <input type="text" class="modalpopup__form__input" id="input-telefone" placeholder="Telefone">
      <input type="text" class="modalpopup__form__input" id="input-email" placeholder="Email">
      `, true)

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

    if (matricula == "" || nome == "" || telefone == "" || email == "") {
      e.preventDefault()
      return alert("Nenhum campo pode estar vazio!")
    }

    document.body.removeChild(document.querySelector(".modalpopup"))

    let turmas = JSON.parse(localStorage.getItem("turmas"))

    let aluno = new Aluno(matricula, nome, telefone, email)

    try {
      turma.cadastrarAluno(aluno)
    } catch (e) {
      alert(e.message)
      return
    }

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
  for (let aluno of document.querySelectorAll(".alunos__info")) {
    aluno.removeEventListener("click", abrirAluno)
  }
  active = false

  for (let botao of document.querySelectorAll(".main__wrapper__menu__button")) {
    botao.style.display = "none"
  }

  let menu = document.querySelector(".main__wrapper__menu")
  let divAround = document.createElement("div")
  let cancelAction = document.createElement("button")

  cancelAction.classList.add("main__wrapper__menu__button")
  cancelAction.textContent = "Cancelar"

  let texto = document.createElement("h3")
  texto.textContent = txt

  let callbackComMatricula = function (e) {
    let pMatricula = e.target

    while (pMatricula.classList && !pMatricula.classList.contains("alunos__info-matricula")) {
      pMatricula = pMatricula.previousElementSibling
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

  menu.prepend(divAround)
  divAround.prepend(cancelAction)
  divAround.prepend(texto)
}

function cadastrarNotas(matricula) {
  popup(`
    <h2 class="modalpopup__h2">Cadastrar Notas:</h2>
    <input type="text" class="modalpopup__form__input" id="input-nota1" placeholder="Nota 1">
    <input type="text" class="modalpopup__form__input" id="input-nota2" placeholder="Nota 2">
    <input type="text" class="modalpopup__form__input" id="input-nota3" placeholder="Nota 3">
  `, true)

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

function editarAluno(matricula) {
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

function removerAluno(matricula) {
  turma = getTurma()

  let index = 0
  for (let aluno of turma.alunos) {
    if (aluno.matricula == matricula) {
      if (!confirm(`Deseja realmente excluir o aluno: \n${aluno.nome} \nMatrícula: ${aluno.matricula}\n?`)) return;
      turma.alunos.splice(index, 1)
      break
    }
    index++
  }

  let turmas = JSON.parse(localStorage.getItem("turmas"))

  for (let i = 0; i < turmas.length; i++) {
    if (turmas[i].codigo == turma.codigo) {
      turmas[i] = turma
    }
  }

  localStorage.setItem("turmas", JSON.stringify(turmas))
  atualizarAlunos("", "")
}

function clearSearch() {
  for (let input of document.querySelectorAll(".main__wrapper__menu__input")) {
    input.value = ""
  }
  document.querySelector("#button__search").click()
}

window.addEventListener("resize", (e) => {
  abrirAlunoOnMobile()
})


let abrirAluno = function (e) {
  let pMatricula = e.target

  while (pMatricula.classList && !pMatricula.classList.contains("alunos__info-matricula")) {
    pMatricula = pMatricula.previousElementSibling
  }

  for (let aluno of turma.alunos) {
    if (pMatricula.textContent == aluno.matricula) {
      popup(`
        <div class="popup__alunos">
          <h2 class="popup__alunos-title">${aluno.nome}</h2>

          <p class="popup__alunos-header">Matrícula</p>
          <p class="popup__alunos__info">${aluno.matricula}</p>
          
          <p class="popup__alunos-header">Telefone</p>
          <p class="popup__alunos__info">${aluno.telefone}</p>
          
          <p class="popup__alunos-header">Email</p>
          <p class="popup__alunos__info">${aluno.email}</p>
          
          <p class="popup__alunos-header">Notas</p>
          <p class="popup__alunos__info">${Array.from(aluno.notas) || ""}</p>
          
          <p class="popup__alunos-header">Média</p>
          <p class="popup__alunos__info">${aluno.calculaMedia() || ((aluno.calculaMedia() == 0) ? "0" : "")}</p>
        </div>
      `, false)

      let form = document.querySelector(".modalpopup__form")
      let ok = document.querySelectorAll(".modalpopup__form__button")[0]

      form.addEventListener("submit", (e) => {
        document.querySelector(".modalpopup").remove()
        e.preventDefault()
      })

      break
    }
  }
}

let active = false

function abrirAlunoOnMobile() {
  if (window.screen.width <= 520 && !active) {
    active = true

    for (let alunoP of document.querySelectorAll(".alunos__info")) {
      alunoP.addEventListener("click", abrirAluno)
    }
  } else if (active) {
    for (let aluno of document.querySelectorAll(".alunos__info")) {
      aluno.removeEventListener("click", abrirAluno)
    }
    active = false
  }
}