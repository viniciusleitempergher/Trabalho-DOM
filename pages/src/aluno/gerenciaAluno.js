import { adicionarAluno } from './adicionarAluno.js'
import { atualizarAlunos } from './atualizarAlunos.js'
import { cadastrarNotas } from './cadastrarNotas.js'
import { editarAluno } from './editarAluno.js'
import { getTurma } from './getTurma.js'
import { removerAluno } from './removerAluno.js'
import { selecionarAluno } from './selecionarAluno.js'

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

let turma = getTurma()

document.querySelector(".alunos__title h2").textContent = turma.nome

window.addEventListener("load", () => {
  atualizarAlunos("", "")
})