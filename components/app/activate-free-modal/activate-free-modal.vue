<template lang="pug">
    .free-modal
      ._dialog
        ._inner
          img._cross(src="../../../assets/img/cross.svg", alt="" @click="setActivateFreeModal(false)")
          app-tablet._tablet
            ._tablet-content
              ._text Ты посмотрел бесплатный пробный урок! Преобрети полный курс, чтобы оставаться на одной волне со знаниями!
              app-button(size="l" @click.native="activateFreeCourse")._btn Положить в корзину
  </template>
  
  <script>
  import AppTablet from "../app-tablet/app-tablet";
  import AppButton from "../app-button/app-button";
  
  export default {
    name: "ActivateFreeModal",
    components: {AppButton, AppTablet},
    props: {
      courseId: {
        type: Number,
        required: true,
        default: 0
      }
    },
    data() {
      return {
        isLoading: true
      }
    },
    async created() {
    },
    methods: {
      async activateFreeCourse() {
        this.setActivateFreeModal(false, 0);
        this.addToCart(this.courseId);
        this.setCartModalStatus(true);
      }
    }
  }
  </script>
  
  <style lang="scss">
    .free-modal {
        $root: &;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(#000, 0.7);
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        z-index: 1001;

        &__dialog {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            min-height: 850px;
            padding: 20px;
            overflow: hidden;
        }

        &__cross {
            position: absolute;
            top: -50px;
            right: -50px;
            width: 60px;
            height: 60px;
            transition: 0.4s;
            z-index: 100;
            @media(max-width: 720px) {
            right: 0;
            top: -70px;
            }
            &:hover {
            cursor: pointer;
            transform: rotateZ(45deg);
            }
        }

        &__inner {
            position: relative;
            width: 100%;
            max-width: 500px;
        }

        &__tablet-content {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 70px 0;
        }

        &__text {
            font-size: 30px;
            text-align: center;
            line-height: 1.5;
        }

        &__btn {
            margin-top: 30px;
        }
}

</style>
  