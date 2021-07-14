import popup from '../popup/modal.js'
import { Aluno } from './aluno.js'
import { atualizarAlunos } from './atualizarAlunos.js';
import { getTurma } from './getTurma.js'

/**
 * Abre um popup para cadastrar o aluno e cadastra caso usuário clique em OK
 * @returns {void|alert} - Retorna um alert caso o aluno seja inválido
 */
export function adicionarAluno() {

    let turma = getTurma()

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
            console.log(e);
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