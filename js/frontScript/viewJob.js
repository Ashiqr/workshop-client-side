var app = new Vue({
    el: '#viewJobs',
    data: {
        search: '',
        results: []
    },
    methods: {
        searchJobs: function () {
          if (this.search){
            var data = {'query': this.search.toString().trim()}
          }
          else{
            var data = null;
          }
          jQuery.get('/api/searchJobs', data).done (function (res) {
              app.results = res;
          })
        }
    }
});