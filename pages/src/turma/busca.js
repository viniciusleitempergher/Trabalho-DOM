import { atualizarTurmas } from "./atualizarTurmas"

/*
 Este arquivo pega as informações do Nome da Turma e Código digitadas nos inputs
 de busca e chama a função atualizarTurmas() com estes valores
 Caso ele clique no botão de limpar a busca ele chama a atualizarTurmas() sem parâmetros
*/

document.querySelector("#button__search").addEventListener("click", () => atualizarTurmas(
    document.querySelector("#inputTurmaSearch").value,
    document.querySelector("#inputCodigoSearch").value
))
document.querySelector("#button__clear__search").addEventListener("click", clearSearch)


export function clearSearch() {
    for (let input of document.querySelectorAll(".main__wrapper__menu__input")) {
        input.value = ""
    }
    document.querySelector("#button__search").click()
}