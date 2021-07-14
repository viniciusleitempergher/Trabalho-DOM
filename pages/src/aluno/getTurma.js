import { Turma } from "../turma/turma.js"
import { Aluno } from "./aluno.js"

const queryString = new URLSearchParams(location.search)
const codigoTurma = queryString.get("codigo")

/**
 * @returns {Turma} - Retorna a turma da página em que o usuário se encontra
 */
export function getTurma() {
    let turmasWithoutType

    if (localStorage.getItem("turmas")) {
        turmasWithoutType = JSON.parse(localStorage.getItem("turmas"))
    }

    for (let turmaWithoutType of turmasWithoutType) {
        if (turmaWithoutType.codigo == codigoTurma) {
            let turma = new Turma(turmaWithoutType.codigo, turmaWithoutType.nome)

            for (let aluno of turmaWithoutType.alunos) {
                let alunoTipado = new Aluno(aluno.matricula, aluno.nome, aluno.telefone, aluno.email)
                alunoTipado.notas = aluno.notas
                turma.cadastrarAluno(alunoTipado)
            }

            return turma
        }
    }

    window.location.href = "../turmas/index.html"
}