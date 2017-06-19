app.directive('productInfo', function() { 
  return { 
    restrict: 'E', 
    scope: { 
    	product: '=' 
    }, 
    templateUrl: 'js/directives/productInfo.html' 
  }; 
});