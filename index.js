var app = angular.module('app',['infinite-scroll']);

app.controller('AppController',function($scope,Reddit){
	$scope.reddit = new Reddit();
});

app.factory('Reddit',function($http){
	var Reddit = function () {
		this.items = [];
		this.busy = false;
		this.after = '';
	};
	Reddit.prototype.nextPage = function () {
		if (this.busy) return;
		this.busy = true;

		var url = "http://api.reddit.com/hot?after="+this.after+"&jsonp=JSON_CALLBACK";
		$http.jsonp(url).success(function(data){
			var items = data.data.children;
			for (var i = 0; i < items.length; i++) {
				items[i].data.thumbnail = items[i].data.thumbnail || "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjZWVlIj48L3JlY3Q+PHRleHQgdGV4dC1hbmNob3I9Im1pZGRsZSIgeD0iMzIiIHk9IjMyIiBzdHlsZT0iZmlsbDojYWFhO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjEycHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+NjR4NjQ8L3RleHQ+PC9zdmc+";
				this.items.push(items[i].data);
			}
			this.after = "t3_"+this.items[this.items.length-1].id;
			this.busy = false;
		}.bind(this));
	}
	return Reddit;
});