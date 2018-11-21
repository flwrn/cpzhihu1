<template lang="html">
  <div class="scroll-to-top" :class="{'shown':this.isScrollerDisplayed, 'hidden':!this.isScrollerDisplayed}" @click="onScrollToTopClick">
    <div class="arrow">

    </div>
  </div>
</template>

<script>
import Scroller from '../util/scroller.js'
export default {
  data() {
    return {
      scroller: null,
      element: null,
      time: 2000,
      intervalTime: 5,
      isScrollerDisplayed: false
    }
  },
  methods: {
    onScrollToTopClick() {
      this.scroll()
    },
    scroll() {
      this.scroller.scroll(-this.element.scrollTop)
    }
  },
  mounted() {
    this.element = document.querySelector('div.container')
    this.scroller = new Scroller({
      element: this.element,
      time: 1500,
      intervalTime: 5
    })
    this.element.addEventListener('scroll', () => {
      if (this.element.scrollTop > 500) {
        if (!this.isScrollerDisplayed) {
          this.isScrollerDisplayed = true
        }
      } else {
        if (this.isScrollerDisplayed) {
          this.isScrollerDisplayed = false
        }
      }
    })
  }
}
</script>

<style lang="scss">
.scroll-to-top {
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 3px #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 30;
  .arrow {
    background: #999;
    width: 20px;
    height: 20px;
    clip-path: polygon(
      50% 0,
      0 60%,
      25% 60%,
      25% 100%,
      75% 100%,
      75% 60%,
      100% 60%
    );
  }
}
.scroll-to-top:hover {
  background: #eee;
}
.scroll-to-top.shown {
  transition: visibility .1s, opacity .5s .1s, background .2s;
  visibility: visible;
  opacity: 1;
}
.scroll-to-top.hidden {
  transition: opacity .5s, visibility .1s .5s, background .2s;
  visibility: hidden;
  opacity: 0;
}
</style>
