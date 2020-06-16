var app = new Vue({
    el: '#viewBookings',
    data: {
        search: '',
        results: []
    },
    methods: {
        searchBookings: function () {
          if (this.search){
            var data = {'query': this.search.toString().trim()}
          }
          else{
            var data = null;
          }
          jQuery.get('/api/searchBookings', data).done (function (res) {
              app.results = res;
          })
        }
    }
});