import { atualizarAlunos } from "./atualizarAlunos.js"

/*
 Este arquivo pega as informações do Nome do Aluno e Matrícula digitadas nos inputs
 de busca e chama a função atualizarAlunos() com estes valores
 Caso ele clique no botão de limpar a busca ele chama a atualizarAlunos() sem parâmetros
*/

document.querySelector("#button__search").addEventListener("click", () => atualizarAlunos(
    document.querySelector("#input-buscarNomeAluno").value,
    document.querySelector("#input-buscarMatriculaAluno").value
))
document.querySelector("#button__clear__search").addEventListener("click", clearSearch)

export function clearSearch() {
    for (let input of document.querySelectorAll(".main__wrapper__menu__input")) {
        input.value = ""
    }
    document.querySelector("#button__search").click()
}