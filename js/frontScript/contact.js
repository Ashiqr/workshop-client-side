var router = new VueRouter({
  mode: 'history',
  routes: []
});

var validation = new Validation()

var app = new Vue({
  router,
  validation,
  el: '#contact',
  data: {
        id : null,
        firstName: '',
        surname: '',
        address : '',
        description: '',
        newItem: null,
        contactItems: [],
        messages: []
      },
  mounted: function() {
      var id = this.$route.query.id;
      if(id){
        this.getContact(id);
      }
  },
  methods: {
    addContactItem : function () {
      if (this.newItem && this.contactItems.indexOf(this.newItem) < 0){
        this.contactItems.push(this.newItem);
        this.newItem = null;
      }
    },
    removeContactItem : function(item){
      if (item && this.contactItems.indexOf(item) > -1){
        this.contactItems.splice(this.contactItems.indexOf(item), 1);
      }
    },
    save : function() {
      this.messages = [];
      var contacts = this.contactItems.length === 0 ? null : this.contactItems;
      var data = { 'firstName' : this.firstName, 'surname': this.surname, 'address' : this.address,
                  'description': this.description, 'contactItems': contacts};
      const valid = validation.Contact(data);
      if (valid.length > 0) {
          valid.map(x => {this.messages.push({ colour : 'Red', message: x.message});});
          return;
      }
      if(this.id) {
        var key = 'contact_' + this.id;
        localStorage.setItem(key, JSON.stringify(data))
      }
      else{
        var id  = uuidv4();
        var key = 'contact_' + id;
        localStorage.setItem(key, JSON.stringify(data))
        this.id = id;
      }
    },
    getContact  : async function(id){
      var key = 'contact_' + id;
      var res = JSON.parse(localStorage.getItem(key));
      this.id = id;
      this.firstName = res.firstName;
      this.surname = res.surname;
      this.address = res.address;
      this.description = res.description;
      this.contactItems = res.contactItems === '' ? [] : res.contactItems;
    }
  }
});