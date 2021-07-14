import { Turma } from "./turma.js"

/**
 * @returns {Array<Turma>} - Retorna um Array com todas as turmas
 */
export function getTurmas() {
    let turmas = [],
        turmasWithoutType

    if (localStorage.getItem("turmas")) {
        turmasWithoutType = JSON.parse(localStorage.getItem("turmas"))
    } else {
        return []
    }

    for (let turmaWithoutType of turmasWithoutType) {
        let turma = new Turma(turmaWithoutType.codigo, turmaWithoutType.nome)

        for (let aluno of turmaWithoutType.alunos) {
            turma.cadastrarAluno(aluno)
        }

        turmas.push(turma)
    }

    return turmas
}