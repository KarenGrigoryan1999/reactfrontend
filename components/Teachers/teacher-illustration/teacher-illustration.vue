<template lang="pug">
  .teacher-illustration
    ._container.container
      img(:src="filePath(teacher ? teacher.photos[2] : '')")
      a(href="ya.ru" target="_blank" :class="teacher.illustration_type")._link
</template>

<script>
export default {
  name: "TeacherIllustration",
  props: {
    teacher: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
}
</script>

<style lang="scss">
.teacher-illustration {
  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  &__link {
    position: absolute;

    &.bubble {
      top: 64px;
      left: 370px;
      width: 330px;
      height: 330px;
      border-radius: 50%;
      @media (max-width: 1549px) {
        left: 195px;
      }
      @media (max-width: 1199px) {
        left: 90px;
      }
      @media (max-width: 990px) {
        top: 50px;
        left: 65px;
        width: 256px;
        height: 256px;
      }
      @media (max-width: 767px) {
        width: 153px;
        height: 153px;
        top: 30px;
        left: 45px;
      }
      @media (max-width: 479px) {
        width: 125px;
        height: 125px;
        top: 25px;
        left: 40px;
      }
    }

    &.with-balloon {
      top: 200px;
      left: 165px;
      width: 373px;
      height: 345px;
      border-radius: 50%;
      @media (max-width: 1549px) {
        left: 15px;
        top: 175px;
      }
      @media (max-width: 1199px) {
        width: 284px;
        height: 266px;
        top: 150px;
      }
      @media (max-width: 990px) {
        width: 218px;
        height: 205px;
        top: 115px;
      }
      @media (max-width: 767px) {
        width: 129px;
        height: 119px;
        top: 70px;
        left: 20px;
      }
      @media (max-width: 479px) {
        width: 106px;
        height: 102px;
        top: 55px;
        left: 17px;
      }
    }

    &.car {
      top: 153px;
      right: 440px;
      width: 371px;
      height: 133px;
      @media (max-width: 1549px) {
        width: 285px;
        height: 106px;
        top: 112px;
        right: 340px;
      }
      @media (max-width: 1199px) {
        width: 231px;
        height: 86px;
        top: 95px;
        right: 280px;
      }
      @media (max-width: 990px) {
        width: 178px;
        height: 65px;
        top: 70px;
        right: 215px;
      }
      @media (max-width: 767px) {
        width: 104px;
        height: 41px;
        top: 40px;
        right: 135px;
      }
      @media (max-width: 479px) {
        top: 35px;
        right: 113px;
        width: 86px;
        height: 33px;
      }
    }
  }
}
</style>
