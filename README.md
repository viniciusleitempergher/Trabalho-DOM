# Trabalho DOM

<h2> Descrição </h2>

Em equipes de 4 integrantes, utilizando o git (branches), reconstrua o trabalho <br>
de funções utilizando o DOM e Classes:

<h2> Marcos, Marlon </h2>
O projeto deve ter uma classe Turma que contenha os seguintes atributos:<br>

 * codigoTurma
 * nomeTurma
 * alunos

Essa classe deve implementar os seguintes métodos:<br>
 * constructor(codigoTurma, nomeTurma)
 * cadastrarAluno(aluno)
 * removerAluno(matriculaAluno)   

<h2> Willian </h2>
O projeto deve ter uma classe Aluno que contenha os atributos:<br>

 * matricula
 * nome
 * telefone
 * email
 * notas
 * media

Os seguinte método deve ser implementado: <br>
 * constructor(matricula, nome, telefone, email)
 * editarInformacoes(nome, telefone, email)
 * calculaMedia()

<h2> Vinícius </h2>
O site deve ter:<br>

 * Uma página inicial que irá mostrar todas as turmas cadastradas e a opção de cadastrar novas turmas.
    - Ao clicar em uma turma irá para a página daquela turma.
    * Uma página da turma que deve conter uma tabela com todos os alunos cadastrados naquela turma
      e a opção de cadastrar um novo aluno.
        - Todos os dados do aluno devem aparecer na tabela: matricula, nome, telefone, email, notas e média.
        - Para cada aluno deve ser disponibilizado a opção de editar informações.
        - Para cada aluno deve ser disponibilizado a opção de cadastrar notas.
    * Uma página para cadastrar turma.
    * Uma página para cadastrar aluno.
    * Uma página para editar as informações do aluno.
<br>
Para enviar as informações de uma página para outra utilize a Web Storage Api.
