<template lang="pug">
  .collect-set
    ._container.container
      ._head
        ._caption.caption
          span(v-for="letter in 'Collect your set'") {{ letter }}
        ._subtitle.subtitle Собери
          br/  свой набор
      ._slider
        ._helper
          img(src="./img/helper-bg.svg")._helper-bg
          ._helper-text Скидка при
            br/ покупке от 3х
            br/ курсов
        ._swiper-container
          ._swiper-ctrl-btn(@click="nextSlide" v-if="isRightButtonVisible")
            img(src="~/assets/img/slider/arrow-right.svg")._swiper-ctrl-icon
          swiper._swiper(:options="swiperOptions" ref="courses" @progress="sliderProgress")
            SwiperSlide._swiper-slide(v-for="course in courses" :key="course.id" :data-id='course.id')
              app-tablet._tablet(:color="course.color")
                ._tablet-content
                  ._tablet-name {{ course ? course.name : '' }}
                    p._price {{ course && course.price }} руб
                  img(:src="require(`~/assets/img/courses-theme-short/${course.theme}/1.svg`)")._decor-1
                  img(:src="require(`~/assets/img/courses-theme-short/${course.theme}/2.svg`)")._decor-2
                  ._tablet-buttons
                    app-button(size="l" type="white" @click.native="redirectToCourse(course.id)")._button Посмотреть курс
                    app-button(size="l" @click.native="addToCart(course.id)" v-if="isTextChanged")._button {{ showButtonText(course.id) }}
          ._swiper-ctrl-btn.left(@click="prevSlide" v-if="isLeftButtonVisible")
            img(src="./img/arrow-left.svg")._swiper-ctrl-icon
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper"
import "swiper/swiper-bundle.css"
import AppTablet from "../../app/app-tablet/app-tablet"
import AppButton from "../../app/app-button/app-button";

export default {
  name: "CollectSet",
  components: {AppButton, AppTablet, Swiper, SwiperSlide },
  props: {
    courses: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      swiperOptions: {
        spaceBetween: 30,
        loop: false,
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          991: {
            slidesPerView: 3,
          },
          1550: {
            slidesPerView: 4
          }
        },
      },
      isTextChanged: true,
      isRightButtonVisible: true,
      isLeftButtonVisible: true,
    }
  },
  computed: {
    swiper: (state) => state.$refs.courses.$swiper,
  },
  mounted() {
    this.sliderProgress(this.swiper);
  },
  methods: {
    sliderProgress(ar) {
      if(ar.progress === 1) {
        this.isRightButtonVisible = false;
        this.isLeftButtonVisible = true;
      } else if(!ar.progress) {
        this.isLeftButtonVisible = false;
        this.isRightButtonVisible = true;
      } else {
        this.isLeftButtonVisible = true;
        this.isRightButtonVisible = true;
      }
    },
    nextSlide() {
      this.swiper.slideNext(400)
    },
    prevSlide() {
      this.swiper.slidePrev(400)
    },
    redirectToCourse(id) {
      this.$router.push(`/courses/${id}`)
    },
    showButtonText(courseId) {
      const course = this.cart.find(c => +c.courseId === +courseId);

      if(course?.courseId) {
        return "Уже в вашей корзине"
      }
      return "Добавить в корзину"
    }
  },
  watch: {
    cart() {
      this.isTextChanged = false;
      setTimeout(() => {
        this.isTextChanged = true;
      }, 400);
    }
  }
}
</script>

<style lang="scss" src="./collect-set.scss"></style>
