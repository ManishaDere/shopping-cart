var app = angular.module('mainApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: "./templates/home.html",
      controller: 'homeCntrl'
    })
    // .when('/cartSummary',{
    // 	templateUrl: "./templates/cartSummary.html",
    // 	controller: 'cartCntrl'
    // })
    // .when('/checkOut',{
    // 	templateUrl: "./templates/checkOut.html",
    // 	controller: 'checkOutCntrl'
    // })
    .otherwise({
      redirectTo: '/'
    });
});

app.controller('homeCntrl', function($scope, $http, $rootScope) {
  $scope.search = [];
  //intially no products	
  $rootScope.products = [];
  $scope.relatedProducts = [];
  $rootScope.myCart = {
    totalAmount: 0,
    totalQty: 0,
    products: []
  };

  //fetch products from server as json
  $http.get('./data/products.json').success(function(data) {
    $rootScope.products = data;
  });

  //fetch products from server as json
  $http.get('./data/related-products.json').success(function(data) {
    $scope.relatedProducts = data;
    console.log('$scope.relatedProducts ==>', $scope.relatedProducts);
  });


  // if not data found
  $rootScope.noData = function() {
    alert("No data available. It can view only mobile phones");
  };

  //Add new product to cart
  $scope.addProduct = function(product) {

    var cartProduct = angular.extend({
      qty: 1,
      amount: product.price
    }, product);

    $rootScope.myCart.products.push(cartProduct);
    $scope.calculateTotalQty();
    $scope.calculateTotalAmount();
    console.log('$scope.myCart =>', $rootScope.myCart);
    console.log('$scope.myCart.products =>', $rootScope.myCart.products);
  }

  //Remove Existing product from cart
  $scope.removeProduct = function(index) {
    $rootScope.myCart.products.splice(index, 1);
    console.log('$scope.myCart.products==>', $rootScope.myCart.products);
    $scope.calculateTotalQty();
    $scope.calculateTotalAmount();
  }

  //Increment quantity of existing product in cart
  $scope.incrementQty = function(id) {
    angular.forEach($rootScope.myCart.products, function(product) {
      if (product.id == id) {
        product.qty++;
      }
      $rootScope.myCart.products.qty = product.qty;
    });
    angular.forEach($rootScope.myCart.products, function(product) {
      if (product.id == id) {
        product.amount += product.price;
      }
      $rootScope.myCart.products.amount = product.amount;
    });
    console.log('$rootScope.myCart.products==>', $rootScope.myCart.products);
    $scope.calculateTotalQty();
    $scope.calculateTotalAmount();
    console.log('$rootScope.myCart.products==>', $rootScope.myCart);
  }

  //Decrement quantity of existing product in cart
  $scope.decrementQty = function(id) {
    angular.forEach($rootScope.myCart.products, function(product) {
      if (product.id == id) {
        product.qty--;
      }
      $rootScope.myCart.products.qty = product.qty;
    });
    angular.forEach($rootScope.myCart.products, function(product) {
      if (product.id == id) {
        product.amount -= product.price;
      }
      $rootScope.myCart.products.amount = product.amount;
    });
    console.log('$scope.myCart.products==>', $rootScope.myCart.products);
    $scope.calculateTotalQty();
    $scope.calculateTotalAmount();
    console.log('$scope.myCart.products==>', $rootScope.myCart);
  }

  //Calculate total quantity of product in cart
  $scope.calculateTotalQty = function() {
    //each loop on $scope.myCart.products 		
    //$scope.myCart.totalQty
    var q = 0;
    angular.forEach($rootScope.myCart.products, function(value, key) {
      q += value.qty;
    });
    $rootScope.myCart.totalQty = q;
    $rootScope.myCart.products.qty = q;
    console.log('$scope.myCart.totalQty==', $rootScope.myCart.totalQty);
  }

  //calculate total amount of products in cart
  $scope.calculateTotalAmount = function() {
    var a = 0;
    angular.forEach($rootScope.myCart.products, function(value, key) {
      a += value.amount;
    });
    $rootScope.myCart.totalAmount = a;
    $rootScope.myCart.products.amount = a;
    console.log('$scope.myCart.totalAmount==', $rootScope.myCart.totalAmount);
  }
});

  //filter by search txt textBox
app.filter('filteredOperation', function() {
  return function (products, searchTxt, ptype1, ptype2, brand1, brand2, brand3, brand4, os1, os2) {
    console.log("searchTxt==>", searchTxt);
    var filtered = [];
    var isFilterDone = false;        
    
      for (var i=0; i<products.length; i++){
      if (searchTxt) {
          if(products[i].name.toLowerCase().indexOf(searchTxt.toLowerCase()) > -1){
            filtered.push(products[i]);
            isFilterDone = true;
          }
          }
          if(ptype1  &&  products[i].ptype == ptype1){
           filtered.push(products[i]);
           isFilterDone = true;
         }
         if (ptype2 && products[i].ptype == ptype2){
           filtered.push(products[i]);
           isFilterDone = true;
         }
         if (brand1 && products[i].brand == brand1) {
            filtered.push(products[i]);
            isFilterDone = true;
          }
          if (brand2 && products[i].brand == brand2) {
            filtered.push(products[i]);
            isFilterDone = true;
          }
          if (brand3 && products[i].brand == brand3) {
            filtered.push(products[i]);
            isFilterDone = true;
          }
          if (brand4 && products[i].brand == brand4) {
            filtered.push(products[i]);
            isFilterDone = true;
          }
          if (os1 && products[i].os == os1) {
            filtered.push(products[i]);
            isFilterDone = true;
          }
          if (os2 && products[i].os == os2) {
            filtered.push(products[i]);
            isFilterDone = true;
          }
      }

      //if nothing selected return all products
      if(!isFilterDone){
        filtered = products;
      }
      return filtered;
  }
  });
  
//cart modal controller
app.controller('cartModalCntrl', function($scope) {});
//cart controller
app.controller('cartCntrl', function($scope) {});