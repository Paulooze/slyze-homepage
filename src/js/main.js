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
  el: '#menu',
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

let player;

const video = new Vue({
  el: '#video-wrapper',
  data() {
    return {
      visible: true,
    };
  },
  methods: {
    onPlayButtonClick(event) {
      event.preventDefault();
      player.playVideo();
      this.visible = false;
    },
  },
});

window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  player = new YT.Player('video', {
    host: 'https://www.youtube.com',
    videoId: 'E2HTqYf2-i0',
    playerVars: {
      autoplay: 0,
      controls: 0,
      rel: 0,
      showinfo: 0,
    },
  });
};

WebFont.load({
  google: {
    families: ['Montserrat:300,400,600,700,900:latin-ext'],
  },
  timeout: 3000,
});

const observer = lozad();
observer.observe();
