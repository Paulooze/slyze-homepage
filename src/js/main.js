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

const isGDPRModalOpen = () => window.location.hash === '#podmienky';

const modals = new Vue({
  el: '#modals',
  data() {
    return {
      isCookieModalOpen: false,
      isGDPRModalOpen: isGDPRModalOpen(),
    };
  },
  methods: {
    openCookieModal() {
      this.isCookieModalOpen = true;
    },
    closeCookieModal() {
      this.isCookieModalOpen = false;
    },
    openGDPRModal() {
      this.isGDPRModalOpen = true;
    },
    closeGDPRModal() {
      this.isGDPRModalOpen = false;
      window.history.pushState({}, '', '/');
    },
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
    openGDPRModal() {
      modals.openGDPRModal();
    },
  },
});

const isCookieBarVisible = () => {
  if (localStorage.getItem('cookie_consent') == null) {
    return true;
  }
  return !localStorage.getItem('cookie_consent');
};

const cookie = new Vue({
  el: '#cookie',
  data() {
    return {
      isVisible: isCookieBarVisible(),
    };
  },
  methods: {
    okClick() {
      this.isVisible = false;
      localStorage.setItem('cookie_consent', true);
    },
    moreClick() {
      modals.openCookieModal();
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
