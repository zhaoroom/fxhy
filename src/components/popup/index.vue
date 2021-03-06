<template>
  <div :class="classes">
    <transition name="popup-fade" v-if="!full">
      <overlay v-if="open" @click="closeHandler"></overlay>
    </transition>
    <transition :name="full?'popup-full-slide-'+direction:'popup-slide-'+direction" @enter="enterHandler">
      <div v-if="open" :class="innerClasses">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { historyPush } from 'utils/mixins.js'
import Overlay from '../overlay'
export default {
  components: {
    Overlay
  },
  mixins: [historyPush],
  props: {
    open: {
      type: Boolean,
      default: false
    },
    full: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'bottom'
    },
    fastClose: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    classes () {
      return ['popup']
    },
    innerClasses () {
      let array = ['popup-inner', 'popup-' + this.direction, this.full ?'full' : '']
      if (this.direction === 'center') {
        array.push('flexbox flexbox-align-center flexbox-content-center')
      }
      return array
    }
  },
  mounted () {
    if (this.open) {
      requestAnimationFrame(() => {
        this.pushState()
        this.$el.style.display = 'block'
      })
    }
  },
  watch: {
    open (value) {
      if (value) {
        requestAnimationFrame(() => {
          this.pushState()
          this.$el.style.display = 'block'
          this.$emit('on-open')
        })
      } else {
        setTimeout(() => {
          requestAnimationFrame(() => {
            this.goBack()
            this.$el.style.display = 'none'
            var timer = setTimeout(() => {
              clearTimeout(timer)
              this.$el.remove()
            },300)   
          })
        }, 300)
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    enterHandler () {
      this.$emit('on-enter')
    },
    closeHandler () {
      this.fastClose && this.$emit('on-close')
    }
  }
}
</script>

<style lang="scss">
  @import '~styles/variable.scss';
  @import '~styles/mixins.scss';
  .popup{
      position:fixed;
      left:0;
      top:0;
      text-align:center;
      width:100%;
      height:100%;
      overflow:hidden;
      z-index: 1000;
      display:none;
      user-select:none;
      &-inner{
        background:#fff;
        position:absolute;
        overflow: auto;
      }
      &-top{
        top:0;
        left:0;
        width:100%;
        max-height: 80%;
        &.full{
          height:100%;
          max-height: 100%;
        }
      }
      &-bottom{
        bottom:0;
        left:0;
        width:100%;
        max-height: 80%;
        &.full{
          height:100%;
          max-height: 100%;
        }
      }
      &-left{
        top:0;
        left:0;
        height:100%;
        max-width: 80%;  
        &.full{
          width:100%;
          max-width: 100%;
        }
      }
      &-right{
        top:0;
        right:0;
        height:100%;
        max-width: 80%;
        &.full{
          width:100%;
          max-width: 100%;
        }
      }
      &-center{
        top:0;
        left:0;
        width:100%;
        height:100%;
        background: transparent;
        &.full{
          display:block;
          background:#fff;
        }
      }
    }
  
  .popup-fade-enter-active, .popup-fade-leave-active {
    transition: opacity $transition-time
  }
  .popup-fade-enter, .popup-fade-leave-active {
    opacity: 0
  }
  
  .popup-slide-top-enter-active, .popup-slide-top-leave-active {
    transition: transform $transition-time
  }
  .popup-slide-top-enter, .popup-slide-top-leave-active {
    transform: translateY(-100%);
  }
  .popup-full-slide-top-enter-active, .popup-full-slide-top-leave-active {
    transition: transform 0.4s;
  }
  .popup-full-slide-top-enter, .popup-full-slide-top-leave-active {
    transform: translateY(-100%);
  }
  
  .popup-slide-bottom-enter-active, .popup-slide-bottom-leave-active {
    transition: transform $transition-time
  }
  .popup-slide-bottom-enter, .popup-slide-bottom-leave-active {
    transform: translateY(100%);
  }
  .popup-full-slide-bottom-enter-active, .popup-full-slide-bottom-leave-active {
    transition: transform 0.4s;
  }
  .popup-full-slide-bottom-enter, .popup-full-slide-bottom-leave-active {
    transform: translateY(100%);
  }
  
  .popup-slide-left-enter-active, .popup-slide-left-leave-active {
    transition: transform $transition-time
  }
  .popup-slide-left-enter, .popup-slide-left-leave-active {
    transform: translateX(-100%);
  }
  .popup-full-slide-left-enter-active, .popup-full-slide-left-leave-active {
    transition: transform 0.4s;
  }
  .popup-full-slide-left-enter, .popup-full-slide-left-leave-active {
    transform: translateX(-100%);
  }
  
  .popup-slide-right-enter-active, .popup-slide-right-leave-active {
    transition: transform $transition-time
  }
  .popup-slide-right-enter, .popup-slide-right-leave-active {
    transform: translateX(100%);
  }
  .popup-full-slide-right-enter-active, .popup-full-slide-right-leave-active {
    transition: transform 0.4s;
  }
  .popup-full-slide-right-enter, .popup-full-slide-right-leave-active {
    transform: translateX(100%);
  }
  
  .popup-slide-center-enter-active, .popup-slide-center-leave-active {
    transition: opacity $transition-time
  }
  .popup-slide-center-enter, .popup-slide-center-leave-active {
    transform: 0;
  }
  .popup-full-slide-center-enter-active, .popup-full-slide-center-leave-active {
    transition: opacity 0.4s;
  }
  .popup-full-slide-center-enter, .popup-full-slide-center-leave-active {
    transform: 0;
  }
</style>
