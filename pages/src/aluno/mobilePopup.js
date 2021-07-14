import popup from '../popup/modal.js'
import { getTurma } from './getTurma.js'

window.addEventListener("resize", (e) => {
    abrirAlunoOnMobile()
})

/**
 * Pega a matrícula do aluno em que o usuário clicou e apartir disso abre as informações dele num popup
 * @param {Event} e - O evento do clique
 * @returns {void}
 */
export let abrirAluno = function (e) {
    let turma = getTurma()
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

/**
 * Se a tela for menor que 680px abre um popup ao clicar no aluno mostrando suas informações
 * @returns {void}
 */
export function abrirAlunoOnMobile() {
    if (window.screen.width <= 680) {
        for (let alunoP of document.querySelectorAll(".alunos__info")) {
            alunoP.addEventListener("click", abrirAluno)
        }
    } else {
        for (let aluno of document.querySelectorAll(".alunos__info")) {
            aluno.removeEventListener("click", abrirAluno)
        }
    }
}