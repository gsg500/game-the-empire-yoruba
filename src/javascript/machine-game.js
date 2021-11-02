const pergunta = [
    {
      personagem: 'Hubert Adedeji Ogunde, nascido em 10/07/1916 na cidade de Ososa Estado de Ogun.',
      pergunta: 'Em 1940 Hubert Adedeji Ogunde lançou uma peças com comentários políticos o que lhe rendeu a ira do governante Chief Samuel Ladoke Akintola. Qual era o nome desta peça?',
      resposta: 'O Império do Tigre',  
      fatoHytorico: 'Um ator dramaturgo gerente de teatro e músico nigeriano',
      pontos: 70,
      r: 1,
    },  

    {
      personagem: 'Thomas Babington Macaulay, 1º Barão de Macaulay, +25/10/1800 – 28/12/1859, historiador e político britânico, um dos dois membros do parlamento para Edimburgo, capital da Escócia.',
      pergunta: 'Quem foi o britanico que sugeriu ao governo da Inglaterra destruir a cultura de um povo para dominar os Yorubas e extrair todas as riquezas regionais?',
      resposta: 'Lord Macaulay',  
      fatoHytorico: 'Britanico que visitou diferentes parte do continente Africano em busca de riquesas minerais em 02/02/1835',
      pontos: 50,
      r: 2,
    },     

  ];





class YorubaPeople {
    constructor(numQuestion, responder, saldoPontos) {
    this.numQuestion = numQuestion;
    this.responder = responder;
    this.saldoPontos = saldoPontos;    
  }  
    verifica() {
      if (this.responder === this.pergunta.resposta) {
        //DEVE RETORNA VALORES DE PONTUAÇÃO DO JOGADOR
        //DEVE RETORNA FALSE CASO O JOGADOR ERRE E TRUE SE O JOGADOR ACERTA         
      } else if (/*se a pontuação do jogador for menor que zero será o fim do jogo*/this.saldoPontos) {
        return 'Game over.'
      }
  }
};



