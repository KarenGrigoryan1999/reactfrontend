<template lang="pug">
section.sale 
  img.sale__decor-1(src="./img/sale-decor1.svg")
  img.sale__decor-3(src="./img/sale-decor3.svg")
  .container
    div.anim-wrapper
      div.red-spot
        h2.caption.sale__caption {{ mainPageInfo.boysRedSpotTitle }}
        p.sale__text {{ mainPageInfo.boysRedSpotText }}
        button.btn.btn_reset.sale__btn(@click="goToLink") {{ mainPageInfo.boysRedSpotButtonTitle }}
      div(:class="modifiers")
        lottie-vue-player(
          ref="lottie"
          :src="`/sale_boy.json`"
          :player-controls="false"
          :loop="false"
          :autoplay="false"
          :showColorPicker="false"
          style="width: 100%;")
        div.right-anim-text
          h2.caption.sale__caption {{ mainPageInfo.boysSpotTitle }}
          p.sale__text {{ mainPageInfo.boysSpotText }}
          button.btn.btn_reset.sale__btn(@click="goToLink") {{ mainPageInfo.boysSpotButtonTitle }}
    .sale__inner 
      img.sale__image(src="./img/man.png")
      div.sale__spot-container
        img.sale__decor-main(src="./img/sale-decor-main.svg")
        .sale__item 
          .sale__top
            h2.caption.sale__caption {{ mainPageInfo.boysSpotTitle }}
          p.sale__text {{ mainPageInfo.boysSpotText }}
          button.btn.btn_reset.sale__btn {{ mainPageInfo.boysSpotButtonTitle }}
  img.sale__decor-2(src="img/sale-decor2.svg")
  div.anchor
</template>

<script>
export default {
  name: "Sale",
  props: {
    mainPageInfo: {
      type: Object,
      default: null,
      required: true
    },
  },
  data() {
    return {
      isAnimVisible: false,
      played: false,
    }
  },
  computed: {
    modifiers: state => ([
      !state.isAnimVisible && `invisible`,
    ])
  },
  methods: {
    goToLink() {
      window.location.href = this.mainPageInfo.boysSpotButtonLink;
    }
  },
  mounted() {
      window.addEventListener('scroll', () => {
      let element = document.querySelector('.anchor');
      let rightAnimText = document.querySelector('.right-anim-text');
      console.log(this.played);
      if(element && this.played === false) {
        let position = element.getBoundingClientRect();

        const spot = document.querySelector('.sale__spot-container');
        const pinkSpot = document.querySelector('.sale__decor-1');
        const boy = document.querySelector('.sale__image');
        if(position.bottom > 100 && position.bottom < 200) {
          this.played = true;
          rightAnimText.style.opacity = '0';
          if(this.played === true)
          this.$refs.lottie.player.stop();
        }
        if((position.top >= 0 && position.bottom <= window.innerHeight) || (position.bottom > 100 && position.bottom < 200)) {
          this.isAnimVisible = true;
          setTimeout(() => {
            this.$refs.lottie.player.play();
            setTimeout(() => {
              rightAnimText.style.opacity = '1';
              this.played = false;
            }, 1000);
          }, 2000);

          spot.style.transform = 'scale(1)';
          pinkSpot.style.transform = 'scale(1)';
          boy.style.opacity = '1';
          boy.style.transform = 'translatex(0)';
          //isAnimVisible
        }
    }
  });
  }
}
</script>

<style scoped lang="scss">
.anchor {
  position: relative;
  top: -25vh;
}

.invisible {
  display: none;
}

.red-spot {
  background: url('../../assets/img/red-spot.png');
  width: 1164px;
  height: 1053px;
  right: 0;
  top: -100px;
  position: absolute;
  background-size: contain;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  * {
    max-width: 40%;
  }

  @include laptop {
    width: 1048px;
    height: 1082px;
    right: -78px;
    top: -154px;
  }

  @media (max-width: 1199px) {
    width: 840px;
    height: 747px;
    right: -60px;
    top: -103px;
  }
}

.anim-wrapper {
  position: relative;
  min-height: 700px;

  @include tablet {
    display: none;
  }
}

.right-anim-text {
  width: 400px;
  position: absolute;
  top: 35%;
  right: 23%;
  transition: all 0.5s;
  opacity: 0;
  text-align: center;

  @media (max-width: 1550px) {
    right: 20%;
  }

  @media (max-width: 1200px) {
    top: 30%;
    right: 16%;
  }
}

.animation-wrapper {
  display: none;
}
.vue-lottie-player {
  background: transparent !important;
}
.sale {
  position: relative;

  &__spot-container {
    position: relative;
    display: flex;
    justify-content: center;

    transform: scale(0);
    transition: 0.5s ease-in;
  }

  &__image {
    position: absolute;
    left: -10%;
    bottom: -30%;
    width: 600px;
    opacity: 0;
    z-index: 1;
    transform: translatex(-100px);
    transition: 0.5s ease-in;

    @include bigdesktop {
      left: -5%;
      bottom: -200px;
      width: 550px;
    }

    @include mediumdesktop {
      width: 500px;
      left: -10%;
      bottom: -150px;
    }

    @include minidesktop {
      width: 450px;
    }

    @include tablet {
      width: 400px;
      left: -40px;
      bottom: -70%;
      transform: rotate(-30deg);
      display: none;
    }

    @include mobile {
      bottom: -60%;
    }

    @include smallmobile {
      width: 300px;
      bottom: -40%;
    }
  }

  &__decor-1 {
    position: absolute;
    top: 0;
    right: 20px;
    z-index: -1;
    transform: scale(0);
    transition: 0.5s ease-in;

    @include bigdesktop {
      width: 400px;
      top: 15%;
    }

    @include tablet {
      width: 250px;
      top: 20%;
    }
  }

  &__decor-2 {
    position: absolute;
    bottom: -400px;
    right: 20px;
    z-index: -1;

    @include bigdesktop {
      width: 300px;
      bottom: -300px;
    }

    @include tablet {
      width: 200px;
      bottom: -300px;
    }

    @include smallmobile {
      width: 200px;
      bottom: -300px;
      right: -10px;
    }
  }

  &__decor-3 {
    position: absolute;
    bottom: -40%;
    left: 20px;
    z-index: -1;

    @include bigdesktop {
      width: 300px;
    }

    @include tablet {
      width: 150px;
      top: 20%;
    }
  }

  &__inner {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    min-height: 65vh;
    display: none;

    @include tablet {
      padding-right: 100px;
      padding-left: 0;
      display: block;
    }

    @include mobile {
      width: 100%;
      padding-right: 0;
      height: 600px;
    }
  }

  &__item {
    max-width: 412px;
    position: absolute;
    top: 40%;

    @include tablet {
      top: 27%;
    }

    @include mobile {
      top: 30%;
    }
  }

  &__decor-main {
    z-index: -1;
    width: 1150px;
    left: 20%;
    bottom: 0;

    @include bigdesktop {
      width: 900px;
      left: 27%;
      bottom: 50px;
    }

    @include mediumdesktop {
      left: 23%;
    }

    @include tablet {
      left: -5%;
    }

    @include mobile {
      width: 900px;
      max-width: 200%;
    }

    @include smallmobile {
      width: 600px;
    }
  }

  &__top {
    display: flex;
    align-items: end;
    margin-bottom: 20px;

    @include tablet {
      margin-top: 50px;
    }
  }

  &__caption {
    text-align: center;
    font-size: 58px;

    @include mediumdesktop {
      font-size: 60px;
    }

    @include tablet {
      font-size: 55px;
    }
  }

  &__currency {
    font-family: $secondary-font;
    font-size: 48px;
    line-height: 115%;
    text-transform: uppercase;

    @include tablet {
      font-size: 40px;
    }
  }

  &__text {
    font-family: $base-font;
    font-size: 24px;
    line-height: 130%;
    margin-bottom: 10px;
    word-break: break-all;

    @include tablet {
      font-size: 20px;
    }
  }

  &__btn {
    padding: 18px 70px;
    font-size: 25px;
    border-radius: 10px;

    @include tablet {
      padding: 12px 70px;
    }
  }

  @include tablet {
    margin-bottom: 0;
  }
}
</style>