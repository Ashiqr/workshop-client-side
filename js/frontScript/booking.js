var router = new VueRouter({
    mode: 'history',
    routes: []
});

var app = new Vue({
  router,
  el: '#newBooking',
  data: {
        id : null,
        name: '',
        car: '',
        regNum : '',
        description: '',
        liftRequired: 0,
        date: null,
        newItem: null,
        checkItems: []
      },
  mounted: function() {
      var id = this.$route.query.id;
      if(id){
        this.getBooking(id);
      }
  },
  methods: {
    addCheckItem : function () {
      if (this.newItem && this.checkItems.indexOf(this.newItem) < 0){
        this.checkItems.push(this.newItem);
        this.newItem = null;
      }
    },
    removeCheckItem : function(item){
      if (item && this.checkItems.indexOf(item) > -1){
        this.checkItems.splice(this.checkItems.indexOf(item), 1);
      }
    },
    save : function() {
      var check = this.checkItems.length === 0 ? null : this.checkItems;
      var data = { 'name' : this.name, 'car': this.car, 'regNum' : this.regNum, 'date': this.date,
                   'description': this.description, 'liftRequired' : this.liftRequired, 'checkItems': check};
      if(this.id) {
        data.id = this.id;
      }
      jQuery.post('/api/saveBooking', data).done (function (res) {
        app.id = res.id;
      })
    },
    getBooking : function(id){
      jQuery.get('/api/getBooking', {'id': id}).done (function (res) {
        app.id = res.id;
        app.name = res.name;
        app.car = res.car;
        app.regNum = res.regNum;
        app.description = res.description;
        app.date = res.date;
        app.liftRequired = (res.liftRequired === 'true' || res.liftRequired === '1');
        app.checkItems = res.checkItems === '' ? [] : res.checkItems;
      })
    }
  }
})