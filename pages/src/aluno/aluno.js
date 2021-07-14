export class Aluno {
    /**
     * Constrói o aluno com as informações passadas
     * @param {string} matricula - Matrícula do aluno
     * @param {string} nome - Nome do aluno
     * @param {string} telefone - Telefone do aluno
     * @param {string} email - Email do aluno
     * @returns {void}
     */
    constructor(matricula, nome, telefone, email) {
        this.matricula = matricula
        this.nome = nome
        this.telefone = telefone
        this.email = email
        this.notas = []
        this.media = this.calculaMedia()
    }

    /**
     * Edita as informações do aluno com as informações passadas pelos parâmetros
     * @param {string} nome - O nome a ser substituído
     * @param {string} telefone - O telefone a ser substituído
     * @param {string} email - O email a ser substituído
     * @returns {void}
     */
    editarInformacoes(nome, telefone, email) {
        this.nome = nome
        this.telefone = telefone
        this.email = email
    }

    /**
     * Calcula a média de acordo com as notas do aluno
     * @returns {Number}
     */
    calculaMedia() {
        let media = 0
        for (let nota of this.notas) {
            media += nota
        }
        media /= this.notas.length
        return media
    }
}


