var router = new VueRouter({
    mode: 'history',
    routes: []
});

var validation = new Validation()

var app = new Vue({
  router,
  validation,
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
        checkItems: [],
        messages: []
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
      this.messages = [];
      var check = this.checkItems.length === 0 ? null : this.checkItems;
      var data = { 'name' : this.name, 'car': this.car, 'regNum' : this.regNum, 'date': this.date,
                   'description': this.description, 'liftRequired' : this.liftRequired, 'checkItems': check};
      const valid = validation.Booking(data);
      if (valid.length > 0) {
          valid.map(x => {this.messages.push({ colour : 'Red', message: x.message});});
          return;
      }
      if(this.id) {
        var key = 'booking_' + this.id;
        localStorage.setItem(key, JSON.stringify(data))
      }
      else{
        var id  = uuidv4();
        var key = 'booking_' + id;
        localStorage.setItem(key, JSON.stringify(data))
        this.id = id;
      }
    },
    getBooking : function(id){
      var key = 'booking_' + id;
      var res = JSON.parse(localStorage.getItem(key));
      this.id = id;
      this.name = res.name;
      this.car = res.car;
      this.regNum = res.regNum;
      this.description = res.description;
      this.date = res.date;
      this.liftRequired = (res.liftRequired === 'true' || res.liftRequired === '1');
      this.checkItems = res.checkItems === '' ? [] : res.checkItems;
    }
  }
})