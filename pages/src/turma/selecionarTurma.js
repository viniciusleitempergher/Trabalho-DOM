import { atualizarTurmas } from "./atualizarTurmas.js"
import { redirecionarParaTurma } from "./gerenciaTurma.js"

/**
 * Esta função coloca o parâmetro txt no menu da página com um botão de cancelar e adiciona
 * listeners nas turmas para quando clicar em uma a função callback ser chamada passando
 * seu código como parâmetro.
 * @param {string} txt - Texto colocado no menu 
 * @param {Function} callback - Função que é chamada passando como parâmetro o código da turma clicada
 * @returns {void}
 */
export function selectTurma(txt, callback) {
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