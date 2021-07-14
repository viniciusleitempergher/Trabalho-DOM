export class Turma {
    /**
     * Constrói a turma com as informações passadas pelos parâmetros
     * @param {string} codigo - O código da turma
     * @param {string} nome - O nome da turma
     * @returns {void}
     */
    constructor(codigo, nome) {
        this.codigo = codigo
        this.nome = nome
        this.alunos = []
    }

    /**
     * Cadastra o aluno passado por parâmetro na turma
     * @param {Object} aluno - O aluno a ser cadastrado na turma
     * @returns {void}
     */
    cadastrarAluno(aluno) {
        for (let item of this.alunos) {
            if (item.matricula == aluno.matricula) {
                throw new AlunoError("Já existe um aluno com esta matrícula!")
            }
        }
        this.alunos.push(aluno)
    }

    /**
     * Remove o aluno com a matrícula passada pelo parâmetro
     * @param {string} id - A matrícula do aluno a ser removido 
     * @returns {void}
     */
    removerAluno(id) {
        for (let item of this.alunos) {
            if (item.matricula == id) {
                this.alunos.splice(item)
                return
            }
        }
        throw new AlunoError("Aluno não encontrado!")
    }

    /**
     * Edita o nome da turma pelo passado como parâmetro
     * @param {string} nome - O novo nome da turma
     * @returns {void}
     */
    editarTurma(nome) {
        this.nome = nome
    }

}

/**
 * Erro que será gerado ao adicionar um aluno inválido
 */
class AlunoError extends Error {
    /**
     * Constrói um erro com o nome de AlunoError e a mensagem passada pelo parâmetro
     * @param {string} message - A mensagem do erro
     */
    constructor(message) {
        super(message)
        this.name = "AlunoError"
    }
}
