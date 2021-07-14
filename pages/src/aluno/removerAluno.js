import { atualizarAlunos } from "./atualizarAlunos.js";
import { getTurma } from "./getTurma.js";

/**
 * Remove um aluno a partir da matrícula
 * @param {string} matricula - Matrícula do aluno
 * @returns {void}
 */
export function removerAluno(matricula) {
    let turma = getTurma()

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