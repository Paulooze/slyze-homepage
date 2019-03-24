import Vue from 'vue';
import scrollToElement from 'scroll-to-element';
import WebFont from 'webfontloader';
import lozad from 'lozad';

const tabs1 = new Vue({
  el: '#tabs',
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

const menu = new Vue({
  el: '.js-menu',
  data() {
    return {
      active: false,
    };
  },
  methods: {
    setActive() {
      this.active = !this.active;
    },
    scrollToSection(event) {
      const target = event.target.getAttribute('href');
      scrollToElement(target, {
        offset: 0,
        ease: 'linear',
        duration: 500,
      });
    },
  },
});

const footer = new Vue({
  el: '#footer',
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
});

const contact = new Vue({
  el: '#kontakt',
  methods: {
    navClick(event) {
      event.preventDefault();
      const lat = 48.1524901;
      const long = 17.0621499;
      if (
        navigator.platform.indexOf('iPhone') !== -1 ||
        navigator.platform.indexOf('iPod') !== -1 ||
        navigator.platform.indexOf('iPad') !== -1
      ) {
        window.open(`maps://maps.google.com/maps?daddr=${lat},${long}&amp;ll=`);
      } else window.open(`http://maps.google.com/maps?daddr=${lat},${long}&amp;ll=`);
    },
  },
});

WebFont.load({
  google: {
    families: ['Montserrat:300,400,600,700,900:latin-ext'],
  },
  timeout: 3000,
});

const observer = lozad();
observer.observe();
