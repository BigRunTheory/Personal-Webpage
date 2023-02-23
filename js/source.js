var mainApp = angular.module('homepage', ['ui.bootstrap','ngSanitize'])
mainApp.filter('orderBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {filtered.push(item);});
    filtered.sort(function (a, b) {return (a[field] > b[field] ? 1 : -1);});
    if(reverse) filtered.reverse();
    return filtered;
  };
});

mainApp.controller('main',['$scope','$http', function ($scope, $http) {
	$http.get('source.data').then(function(res){$scope.data = res.data;$scope.updateCat();
	angular.forEach($scope.data.publications,function(pubs,val){
		angular.forEach($scope.data.publications[val],function(full,idx){
			$scope.data.publications[val][idx].ashow = false;
		});
	}
	);});
	$scope.updateCat = function(){angular.forEach($scope.data.publications,function (val,idx){;
	$scope.data.publications[idx].show = $scope.data.publications[idx].list.some(function(itm){return itm.keywords.some(function(val){return $scope.data.keywords[val].show})});})};
	$scope.showPaper = function(paper) {return paper.keywords.some(function(val){return $scope.data.keywords[val].show});};
	$scope.toggleKeys = function(key){
		allvalue = key == 'al' ? true: false;
		angular.forEach($scope.data.keywords,function(details,allkey){
				$scope.data.keywords[allkey].show=allvalue;
		})
		$scope.data.keywords[key].show=true;
		$scope.updateCat();
	};

}]);
mainApp.controller('info',['$scope','$http', function ($scope, $http) {
  $scope.spam=["BigRunTheory","gmail","com"]
  $scope.spams = $scope.spam[0]+String.fromCharCode(64)+$scope.spam[1]+String.fromCharCode(46)+$scope.spam[2];
}]);

mainApp.controller('photoShow',['$scope','$http', function ($scope,$http) {
  $scope.intv = 5000;
  var slides = $scope.slides = [];
  $http.get('img.data').then(function(res){
	angular.forEach(res.data,function(detail){
		slides.push({ image: detail.name,text:detail.caption})
	})
  })
}]);
