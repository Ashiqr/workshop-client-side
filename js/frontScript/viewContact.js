var app = new Vue({
  el: '#viewContacts',
  data: {
      search: '',
      results: []
  },
  methods: {
    searchContacts: function () {
      // if (this.search){
      //   var data = {'query': this.search.toString().trim()}
      // }
      // else{
      //   var data = null;
      // }
      for ( var i = 0, len = localStorage.length; i < len; ++i ) {
          if (localStorage.key( i ).indexOf('contact_') === 0) {
            var item = JSON.parse(localStorage.getItem(localStorage.key( i )));
            item.id = localStorage.key( i ).replace('contact_', '');
            this.results.push(item);
          }
      }
    }
  }
});