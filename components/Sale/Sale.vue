<template lang="pug">
section.sale 
  img.sale__decor-1(src="./img/sale-decor1.svg")
  img.sale__decor-3(src="./img/sale-decor3.svg")
  .container 
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
  mounted() {
      window.addEventListener('scroll', function() {
      let element = document.querySelector('.anchor');
      if(element) {
        let position = element.getBoundingClientRect();

        const spot = document.querySelector('.sale__spot-container');
        const pinkSpot = document.querySelector('.sale__decor-1');
        const boy = document.querySelector('.sale__image');
        if(position.top >= 0 && position.bottom <= window.innerHeight) {
          spot.style.transform = 'scale(1)';
          pinkSpot.style.transform = 'scale(1)';
          boy.style.opacity = '1';
          boy.style.transform = 'translatex(0)';
          
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
.sale {
  margin-bottom: 200px;
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

    @include tablet {
      padding-right: 100px;
      padding-left: 0;
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