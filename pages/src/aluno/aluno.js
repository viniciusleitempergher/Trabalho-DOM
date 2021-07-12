export class Aluno {
    constructor(matricula, nome, telefone, email) {
        this.matricula = matricula
        this.nome = nome
        this.telefone = telefone
        this.email = email
        this.notas = []
        this.media = this.calculaMedia()
    }
    editarInformacoes(nome, telefone, email) {
        this.nome = nome
        this.telefone = telefone
        this.email = email
    }

    calculaMedia() {
        let media = 0
        for (let nota of this.notas) {
            media += nota
        }
        media /= this.notas.length
        return media
    }
}


