<template lang="html">
  <div class="popup" :class="{'shown':isPopupDisplayed,'hidden':!isPopupDisplayed}">
    <div class="popup-background">
      <div class="popup-frame-wrapper">
        <div class="popup-frame">
          <slot/>
        </div>
        <a class="close-popup-btn" @click="onClosePopupBtnClick">
          <i class="fas fa-times"></i>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Popup',
  computed: {
    ...mapState('popup', {
      isPopupDisplayed: 'isPopupDisplayed'
    })
  },
  methods: {
    ...mapMutations('popup', {
      // setIsPopupDisplayed: 'setIsPopupDisplayed'
      changePopupState: 'changePopupState'
    }),
    onClosePopupBtnClick() {
      // this.$store.commit('questionPage/set', {
      //   isPopupDisplayed: false
      // })
      // this.setIsPopupDisplayed(false)
      this.changePopupState({
        isPopupDisplayed: false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/variables.scss';
@import '../style/layout.scss';
// Popup transtion behaviour
.popup.shown {
  visibility: visible;
  transition: visibility .3s;
  .popup-background {
    opacity: 1;
    transition: opacity .3s;
    .popup-frame-wrapper {
      .popup-frame, .close-popup-btn {
        transform: translateY(0);
        transition: transform .3s;
      }
    }
  }
}
.popup.hidden {
  visibility: hidden;
  transition: visibility .3s .3s;
  .popup-background {
    opacity: 0;
    transition: opacity .3s;
    .popup-frame-wrapper {
      .popup-frame, .close-popup-btn {
        transform: translateY(50px);
        transition: transform .3s;
      }
    }
  }
}

// Popup is an abstract container, it does not have size
.popup {
  .popup-background {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    background: rgba(0, 0, 0, .6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
    .popup-frame-wrapper {
      max-width: 800px;
      width: 100%;
      max-height: 100%;
      display: flex;
      justify-content: center;
      padding: 20px 0 20px 0;
      .popup-frame {
        background: #fff;
        border-radius: 3px;
        display: flex;
        max-width: 100%;
        max-height: 100%;
      }
      .close-popup-btn {
        width: 25px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        color: #fff;
        font-size: $px20;
        margin: 10px 0 0 20px;
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .popup {
    .popup-background {
      .popup-frame-wrapper {
        // max-width: 100%;
        flex-direction: column-reverse;
        align-items: flex-end;
        .close-popup-btn {
          margin: 0 20px 10px 0;
        }
      }
    }
  }
}

</style>
