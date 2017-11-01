const tabs1 = new Vue({
  el: '#tabs',
  data() {
    return {
      id: 1,
    }
  },
  methods: {
    setActiveTab(id) {
      this.id = id;
    },
  },
});

const tabs2 = new Vue({
  el: '#pozicovna',
  data() {
    return {
      id: 1,
    };
  },
  methods: {
    setActiveTab(id) {
      this.id = id;
    },
  },
});
