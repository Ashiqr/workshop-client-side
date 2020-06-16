var router = new VueRouter({
    mode: 'history',
    routes: []
  });
var app = new Vue({
  router,
  el: '#Job',
  data: {
        id : null,
        name: '',
        car: '',
        regNum : '',
        description: '',
        note: '',
        date: null,
        newItem: {'code' : null, 'description': null, 'unitCost' : 0, 'quantity' : 1, 'totalCost' : null},
        spItems: []
  },
  mounted: function() {
      var id = this.$route.query.id;
      if(id){
        this.getJob(id);
      }
  },
  computed: {
    totalCost : function () {
      var sum = 0;
      this.spItems.map(function (x) { sum = sum + x.totalCost});
      return sum;
    },
    vat : function () {
      var sum = 0;
      this.spItems.map(function (x) { sum = sum + x.totalCost});
      return sum * 0.15;
    }
  },
  methods: {
    addSPItem : function () {
      if (this.newItem && this.spItems.indexOf(this.newItem) < 0 &&
      (this.newItem.code && this.newItem.description && Number.isFinite(this.newItem.unitCost) && Number.isFinite(this.newItem.quantity))){
        this.newItem.totalCost = this.newItem.unitCost * this.newItem.quantity;
        this.spItems.push(this.newItem);
        this.newItem = {'code' : null, 'description': null, 'unitCost' : 0, 'quantity' : 1, 'totalCost' : null};
      }
    },
    removeSPItem : function(item){
      if (item && this.spItems.indexOf(item) > -1){
        this.spItems.splice(this.spItems.indexOf(item), 1);
      }
    },
    save : function() {
      var items = this.spItems.length === 0 ? null : this.spItems;
      var data = { 'name' : this.name, 'car': this.car, 'regNum' : this.regNum, 'date': this.date,
                   'description': this.description, 'note': this.note, 'spItems': items};
      if(this.id) {
        data.id = this.id;
      }
      jQuery.post('/api/saveJob', data).done (function (res) {
        app.id = res.id;
      })
    },
    getJob : function(id){
      jQuery.get('/api/getJob', {'id': id}).done (function (res) {
        app.id = res.id;
        app.name = res.name;
        app.car = res.car;
        app.regNum = res.regNum;
        app.description = res.description;
        app.date = res.date;
        app.note = res.note;
        app.spItems = res.spItems === '' ? [] : res.spItems;
        app.spItems.map( function (x) { x.totalCost = parseFloat(x.totalCost)});
      })
    },
    invoice : function() {
      window.location = '/invoice.html?id=' + this.id;
    }
  }
})