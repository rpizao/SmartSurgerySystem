angular.module('starter.services', [])

.factory('ProcService', function() {

  var procedimentos = [
    { id: 1, foto: 'img/id1.jpg', nome: 'Marcelo D. do Nascimento',  procedimento: 'Bariátrica', numeroPedido: 'UNI-0001', alerta: 'red', ultimaAtualizacao: 'Dráuzio, 19/01/2016 às 00:49' },
    { id: 2, foto: 'img/id2.png', nome: 'João Barbosa Pinto', procedimento: 'Cálculo Renal', numeroPedido: 'UNI-0002', alerta: 'yellow', ultimaAtualizacao: 'Sidney, 05/01/2016 às 01:32' },
    { id: 3, foto: 'img/id3.png', nome: 'Rodolpho César Silva', procedimento: 'Cateterismo', numeroPedido: 'UNI-0003', ultimaAtualizacao: 'Artur, 03/12/2015 às 00:02'},
    { id: 4, foto: 'img/id4.png', nome: 'Ronaldo da S. Aguiar', procedimento: 'Correção no Manquito Rotador', numeroPedido: 'UNI-0004', ultimaAtualizacao: 'Sérgio, 17/01/2016 às 16:57' },
    { id: 5, foto: 'img/id5.png', nome: 'Alexandro do R. Souza', procedimento: 'Fratura de Peronio', numeroPedido: 'UNI-0005', alerta: 'green', ultimaAtualizacao: 'Dráuzio, 17/01/2016 às 16:49' },
    { id: 6, foto: 'img/id6.png', nome: 'Pedro Cardoso Moreira', procedimento: 'Fratura de Fêmur', numeroPedido: 'UNI-0006', ultimaAtualizacao: 'Dráuzio, 16/01/2016 às 19:23' },
  ];

  var hospitais = [
    {cod_hosp: 1, desc_hosp: 'HU DR. MIGUEL RIET CORREA JUNIOR'},
    {cod_hosp: 2, desc_hosp: 'HOSPITAL DE CLÍNICAS DE PORTO ALEGRE'},
    {cod_hosp: 3, desc_hosp: 'HOSPITAL DE CLÍNICAS SÃO PAULO'},
    {cod_hosp: 4, desc_hosp: 'HOSPITAL ESCOLA RONDONIA'},
    {cod_hosp: 5, desc_hosp: 'HU POLYDORO ERNANI DE SÃO THIAGO'},
    {cod_hosp: 6, desc_hosp: 'HOSPITAL UNIVERSITÁRIO CLEMENTE ROODRIGUES'},
    {cod_hosp: 7, desc_hosp: 'HU ANTONIO DE MORAES'},
    {cod_hosp: 8, desc_hosp: 'HU ANTONIO PEDRO'},
    {cod_hosp: 9, desc_hosp: 'HU CLEMENTINO FRAGA FILHO'},
    {cod_hosp: 10, desc_hosp: 'HOSPITAL ESCOLA SÃO FRANCISCO DE ASSIS'},
    {cod_hosp: 11, desc_hosp: 'INST. DE DOENÇAS DO TÓRAX'},
    {cod_hosp: 12, desc_hosp: 'INST. PUER. PED. MARTAGÃO GESTEIRA'},
    {cod_hosp: 13, desc_hosp: 'INSTITUTO DE GINECOLOGIA ABCD'},
    {cod_hosp: 14, desc_hosp: 'INSTITUTO DE NEUROLOGIA DEOLINDO COUTO'},
    {cod_hosp: 15, desc_hosp: 'INSTITUTO DE PSIQUIATRIA ALBANO REIS'},
    {cod_hosp: 16, desc_hosp: 'MATERNIDADE ESCOLA RJ'},
    {cod_hosp: 17, desc_hosp: 'HU GAFFRÉE E GUINLE'},
    {cod_hosp: 18, desc_hosp: 'HOSPITAL UNIVERSITÁRIO'},
    {cod_hosp: 19, desc_hosp: 'HOSPITAL DE CLÍNICAS DE SANTA CATARINA'},
    {cod_hosp: 20, desc_hosp: 'HOSPITAL ESCOLA FRANCISCANO'},
    {cod_hosp: 21, desc_hosp: 'UNIVERSIDADE FEDERAL DE UBERLÂNDIA '},
    {cod_hosp: 22, desc_hosp: 'HOSPITAL DE CLÍNICAS'},
    {cod_hosp: 23, desc_hosp: 'UNIVERSIDADE FEDERAL DE SÃO PAULO'},
    {cod_hosp: 24, desc_hosp: 'HOSPITAL SÃO PAULO'}
  ];

  var rascunhos = [
    { id: 7, foto: 'img/id4.png', nome: 'Sebastião Jonas da Silva',  procedimento: 'Cirurgia de Joelho', numeroPedido: 'UNI-0007', dataInclusao: "26/01/2017 às 19:23" },
    { id: 8, foto: 'img/id5.png', nome: 'Jacinto Virilha', procedimento: 'Rompimento do tendão', numeroPedido: 'UNI-0008', dataInclusao: "11/01/2017 às 19:23" },
  ];

  return {
    all: function() {
      return procedimentos;
    },
    rascunhos: function() {
      return rascunhos;
    },
    hospitais: function() {
      return hospitais;
    },
    add: function(proc) {
      if(proc.nome){
        procedimentos.push(proc);
        return true;
      }
      return false;
    },
    remove: function(chat) {
      //chats.splice(chats.indexOf(chat), 1);
    },
    get: function(procId) {
      for (var i = 0; i < procedimentos.length; i++) {
        if (procedimentos[i].id === parseInt(procId)) {
          return procedimentos[i];
        }
      }
      return null;
    }
  };
})

.factory('CameraService', function($q) {

  return {
     getPicture: function(options) {
       var q = $q.defer();

       navigator.camera.getPicture(function(result) {
          q.resolve(result);
       }, function(err) {
          q.reject(err);
       }, options);

       return q.promise;
     }
   };

});
