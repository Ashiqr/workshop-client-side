var router = new VueRouter({
    mode: 'history',
    routes: []
  });
  var app = new Vue({
  router,
  el: '#Invoice',
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
  //   removeSPItem : function(item){
  //     if (item && this.spItems.indexOf(item) > -1){
  //       this.spItems.splice(this.spItems.indexOf(item), 1);
  //     }
  //   },
  //   save : function() {
  //     var items = this.spItems.length === 0 ? null : this.spItems;
  //     var data = { 'name' : this.name, 'car': this.car, 'regNum' : this.regNum, 'date': this.date,
  //                  'description': this.description, 'note': this.note, 'spItems': items};
  //     if(this.id) {
  //       data.id = this.id;
  //     }
  //     jQuery.post('/api/saveJob', data).done (function (res) {
  //       app.id = res.id
  //     })
  //   },
    getJob : function(id){
        var key = 'job_' + id;
        var res = JSON.parse(localStorage.getItem(key));
        this.id = id;
        this.name = res.name;
        this.car = res.car;
        this.regNum = res.regNum;
        this.description = res.description;
        this.date = res.date;
        this.note = res.note;
        this.spItems = res.spItems === '' ? [] : res.spItems;
        this.spItems.map( function (x) { x.totalCost = parseFloat(x.totalCost)});
        if (this.spItems.length < 7){
            for (var i = 0; i < (7 - this.spItems.length); i++){
              this.spItems.push({'code' : null, 'description': '', 'unitCost' : '', 'quantity' : '', 'totalCost' : ''})
            }
          }
        }
      }
})