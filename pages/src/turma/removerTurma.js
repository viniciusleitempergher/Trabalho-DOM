import { atualizarTurmas } from "./atualizarTurmas.js";
import { getTurmas } from "./getTurmas.js";

/**
 * Remove uma turma a partir da matrícula
 * @param {string} matricula - Matrícula do aluno
 * @returns {void}
 */
export function removerTurma(codigo) {

    let turmas = getTurmas()

    let index = 0
    for (let turma of turmas) {
        if (turma.codigo == codigo) {
            if (!confirm(`Deseja realmente excluir a turma: ${turma.nome} #${turma.codigo}`)) return;
            turmas.splice(index, 1)
        }
        index++
    }
    localStorage.setItem("turmas", JSON.stringify(turmas))
    atualizarTurmas("", "")
}