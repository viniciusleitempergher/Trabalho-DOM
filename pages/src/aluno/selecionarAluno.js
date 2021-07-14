import { atualizarAlunos } from "./atualizarAlunos.js"
import { abrirAluno } from "./mobilePopup.js"

/**
 * Esta função coloca o parâmetro txt no menu da página com um botão de cancelar e adiciona
 * listeners nos alunos para quando clicar em um aluno a função callback ser chamada passando
 * sua matrícula como parâmetro.
 * @param {string} txt - Texto colocado no menu 
 * @param {Function} callback - Função que é chamada passando como parâmetro a matrícula do aluno clicado
 * @returns {void}
 */
export function selecionarAluno(txt, callback) {
    for (let aluno of document.querySelectorAll(".alunos__info")) {
        aluno.removeEventListener("click", abrirAluno)
    }

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