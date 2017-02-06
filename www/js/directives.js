angular.module('starter.directives', [])

  .directive('toValidate', function() {
      return {
        restrict: "A",
        scope: {
          mask:"="
        },
        require: 'ngModel',
        link: function(scope, element, attr, mCtrl) {

            function validationMethod(value) {
              var isValid = true;
              var mask = attr.mask == null ? attr.placeholder : attr.mask;

              if(mask.length != value.length){
                isValid = false;
              } else {
                for(var i=0; i < mask.length; i++){
                  var charMask = mask.charAt(i);
                  var charValue = value.charAt(i);

                  if(charMask == "X" || charMask == "x" || charMask == "9"){
                    continue;
                  }
                  // else if(charMask == "9"){
                  //   if(!angular.isNumber(charValue)){
                  //     isValid = false;
                  //     break;
                  //   }
                  // }
                  else {
                    if(charMask != charValue){
                      isValid = false;
                      break;
                    }
                  }
                }
              }

              mCtrl.$setValidity(attr.name + "_validate", isValid);
              return value;
            };

            mCtrl.$parsers.push(validationMethod);
        }
      };
  });
