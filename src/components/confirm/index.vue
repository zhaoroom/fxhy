<template>
  <div :class="classes">
    <transition name="confirm-fade">
      <overlay v-if="open"></overlay>
    </transition>
    <div :class="['confirm-wrapper']">
      <transition name="confirm-scale">
        <div :class="['confirm-inner']" v-if="open">
          <div :class="['confirm-body']">
            <slot></slot>
          </div>
          <divider></divider>
          <div :class="['confirm-footer','flexbox']" onselectstart="return false;">
            <button class="flexbox-item" v-if="cancel" type="button" @click="cancelHandler">{{cancelText}}</button>
            <button class="flexbox-item" type="button" @click="confirmHandler">{{confirmText}}</button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { historyPush } from 'utils/mixins.js'
import Overlay from '../overlay'
import Divider from '../divider'
export default {
  mixins: [historyPush],
  components: {
    Overlay,
    Divider
  },
  props: {
    open: {
      type: Boolean,
      default: false
    },
    cancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    }
  },
  computed: {
    classes () {
      return ['confirm']
    }
  },
  mounted () {
    if (this.open) {
      requestAnimationFrame(() => {
        this.pushState()
        this.$el.style.display = 'table'
      })
    }
  },
  watch: {
    open (value) {
      if (value) {
        requestAnimationFrame(() => {
          this.pushState()
          this.$el.style.display = 'table'
          this.$emit('on-open')
        })
      } else {
        setTimeout(() => {
          requestAnimationFrame(() => {
            this.goBack()
            this.$el.style.display = 'none'
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
    cancelHandler () {
      this.$emit('on-close')
    },
    confirmHandler () {
      this.open && this.$emit('on-confirm')
    }
  }
}
</script>

<style lang="scss">
  @import '~styles/variable.scss';
  @import '~styles/mixins.scss';
  .confirm{
    position:fixed;
    left:0;
    top:0;
    text-align:center;
    width:100%;
    height:100%;
    overflow:hidden;
    z-index: 1000;
    display:none;
    user-select: none;
    &-wrapper{
      display:table-cell;
      vertical-align:middle;
      position:relative;
      z-index:1;
      text-align:center;
    }
    &-inner{
      background:#fff;
      border-radius:3px;
      width:90vw;
      display: inline-block;
      max-width:400px;
      box-shadow: 0 1px 5px rgba(0,0,0,0.1);
    }
    &-body{
      max-height: 90%;
      padding:2rem 1.5rem;
      .content{
        font-size:.64rem;
      }
    }
    &-footer{
      button{
        @include button;
        padding:.7rem 0;
        @include active;
        user-select:none;
        position:relative;
        font-size:14px;
        line-height:100%;
        color:$sub-color;
        &+button:before{
          @include divider-vertical();
        }
        &:last-child{
          color:$primary-color;
        }
      }
    }
  }
  .confirm-scale-enter-active, .confirm-scale-leave-active {
    transition: transform $transition-time ease 0s,opacity $transition-time ease 0s;
  }
  .confirm-scale-enter{
    opacity:0;
    transform: scale(1.3);
  }
  .confirm-scale-leave-active{
    opacity:0;
    transform: scale(0.9);
  }
  .confirm-fade-enter-active, .confirm-fade-leave-active {
    transition: opacity $transition-time ease 0s;
  }
  .confirm-fade-enter, .confirm-fade-leave-active {
    opacity: 0;
  }
</style>
