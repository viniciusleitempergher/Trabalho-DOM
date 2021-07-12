export class Turma {
    constructor(codigo, nome) {
        this.codigo = codigo
        this.nome = nome
        this.alunos = []
    }

    cadastrarAluno(aluno) {
        for (let item of this.alunos) {
            if (item.matricula == aluno.matricula) {
                throw new AlunoError("Já existe um aluno com esta matrícula!")
            }
        }
        this.alunos.push(aluno)
    }
    removerAluno(id) {
        for (let item of this.alunos) {
            if (item.matricula == id) {
                this.alunos.splice(item)
                return
            }
        }
        throw new AlunoError("Aluno não encontrado!")
    } 
    editarTurma(nome) {
        this.nome = nome
    }

}
class AlunoError extends Error {
    constructor(message) {
        super(message)
        this.name = "AlunoError"
    }
}
