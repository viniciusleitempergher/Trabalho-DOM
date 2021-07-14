import { adicionarTurma } from './adicionaTurma.js'
import { atualizarTurmas } from './atualizarTurmas.js'
import { editarTurma } from './editarTurma.js'
import { removerTurma } from './removerTurma.js'
import { selectTurma } from './selecionarTurma.js'

document.querySelector("#adicionarbtn").addEventListener("click", adicionarTurma)
document.querySelector("#editarbtn").addEventListener("click", () => selectTurma("Clique na turma para editar", editarTurma))
document.querySelector("#removerbtn").addEventListener("click", () => selectTurma("Clique na turma para deletar", removerTurma))

window.addEventListener("load", () => {
    atualizarTurmas("", "")
})

export let redirecionarParaTurma = function (e) {
    let hashTagsSplitted = e.target.textContent.split("#"),
        codigo = hashTagsSplitted[hashTagsSplitted.length - 1]

    window.location.href = `../turma/index.html?codigo=${codigo}`
}

export function addRedirectListeners() {
    for (let turma of document.querySelectorAll(".turma__wrapper")) {
        turma.addEventListener("click", redirecionarParaTurma)
    }
}