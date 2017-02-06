angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {})

.controller('ProcCtrl', function($scope, $ionicModal, $ionicPopup, ProcService, CameraService) {

    $ionicModal.fromTemplateUrl('templates/addProcedimento.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.addModal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/exibirProcedimento.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.edtModal = modal;
    });

   $scope.showAlert = function(_title, _text) {
     var alertPopup = $ionicPopup.alert({
       title: _title,
       subTitle: _text
     });
    }

   $scope.showConfirm = function() {
    var myPopup = $ionicPopup.show({
        title: 'Procedimento salvo com sucesso!',
        subTitle: 'Deseja enviá-lo para análise?',
        scope: $scope,
        buttons: [
          {
            text: 'Não',
            onTap: function(e) {
              $scope.showAlert("Realizado com sucesso!", "Procedimento salvo como <b>RASCUNHO</b>");
              $scope.clearFormulario();
            }
          },
          {
            text: 'Sim',
            type: 'button-positive',
            onTap: function(e) {
              $scope.showAlert("Realizado com sucesso!", "Procedimento enviado para <b>ANÁLISE</b>");
              $scope.clearFormulario();
            }
          },
        ]
      });
  };

  // Carregando a listagem para tela.
  $scope.procedimentos = ProcService.all();
  $scope.rascunhos = ProcService.rascunhos();
  $scope.hospitais = ProcService.hospitais();

  // abre a tela para inclusão
  $scope.abrirTelaIncluirProcedimento = function(){
    $scope.pictureURL = 'img/upload_foto.png';
    $scope.procData = {};
    $scope.addModal.show();
  };

  $scope.abrirTelaEditarProcedimento = function(procedimento){
    convertFileToDataURLviaFileReader(procedimento.foto, function(imgBase64){
      $scope.pictureURL = imgBase64;
    });
    $scope.procData = procedimento;
    $scope.edtModal.show();
  };

  // fecha a tela de inclusão
  $scope.fecharTelaIncluirProcedimento = function(){
    $scope.addModal.hide();
  };

  $scope.fecharTelaEdtProcedimento = function(){
    $scope.edtModal.hide();
  };

  $scope.clearFormulario = function(){
    $scope.pictureURL = 'img/upload_foto.png';
    $scope.procData = {};
  }

  // adiciona um item
  $scope.addProcedimento = function(){
    // Chamar o popup pra validar
    //console.log("Cheguei no ADD: " + $scope.procData.foto);
    //$scope.showAlert("", "Nome válido? " + $scope.procForm.$ngvalid);

    // validar formulário
    // if (c.attr("data-validation") === 'email') {
    //     if (!validateEmail(c.val())) {
    //         obj.validation[c.attr("title")] = " Insira um e-mail válido.";
    //     }
    // }

    $scope.procData.foto = $scope.pictureURL;
    var confirmado = ProcService.add($scope.procData);
    if(!confirmado){
      $scope.showAlert("Preenchimento incorreto", "Verifique se todos os campos obrigatórios foram preenchidos");
    } else {
      $scope.showConfirm();
    }
  };

  $scope.takePicture = function(options) {
    var options = {
       quality : 100,
       targetWidth: 150,
       targetHeight: 150,
       allowEdit: true,
       cameraDirection: 1,
       destinationType: Camera.DestinationType.DATA_URL,
       sourceType: Camera.PictureSourceType.CAMERA,
       correctOrientation: true
    };

    CameraService.getPicture(options).then(function(imageData) {
      console.log("Conteúdo: " + imageData);
       //$scope.pictureURL = imageData;
       $scope.pictureURL = "data:image/jpeg;base64," + imageData;

    }, function(err) {
       console.log(err);
    })
    .cleanup().then();
  };

  $scope.validateCustom = function(value){
    $scope.showAlert("Valor: " + value)
  };


  // $scope.remove = function(chat) {
  //   Chats.remove(chat);
  // };
})

.controller('ProcDetailCtrl', function($scope, $stateParams, ProcService) {
  $scope.procSelecionado = ProcService.get($stateParams.procId);
});
