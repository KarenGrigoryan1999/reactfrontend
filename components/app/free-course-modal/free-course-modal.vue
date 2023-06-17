<template lang="pug">
.free-course-modal
  ._dialog
    ._content
      img.cross._cross(
        src="../../../assets/img/cross.svg",
        alt="",
        @click="setFreeCourseModalStatus(false)"
      )
      ._inner(ref="inner")
        h3._title Бесплатный урок
        ._container.container
            ._slider
                ._swiper-container
                    ._swiper-ctrl-btn(@click="nextSlide" v-if="isRightButtonVisible")
                        img(src="~/assets/img/slider/arrow-right.svg")._swiper-ctrl-icon
                    swiper._swiper(:options="swiperOptions" ref="courses" @progress="sliderProgress")
                        SwiperSlide._swiper-slide(
                            v-for="course in courses"
                            :key="course.id"
                            :data-id="course.id"
                        )
                            app-tablet._tablet(:color="course.color")
                                ._tablet-content
                                    ._tablet-name {{ course ? course.name : "" }}
                                    img._decor-1(
                                    :src="require(`~/assets/img/courses-theme-short/${course.theme}/1.svg`)"
                                    )
                                    img._decor-2(
                                    :src="require(`~/assets/img/courses-theme-short/${course.theme}/2.svg`)"
                                    )
                                    ._tablet-buttons
                                        app-button._button(
                                            size="l",
                                            type="white",
                                            @click.native="activate(course.id)"
                                        ) Активировать курс
                    ._swiper-ctrl-btn.left(@click="prevSlide" v-if="isLeftButtonVisible")
                        img(src="~/assets/img/slider/arrow-left.svg")._swiper-ctrl-icon
</template>
  
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import AppTablet from "../../app/app-tablet/app-tablet.vue";
import AppButton from "../../app/app-button/app-button";

export default {
  name: "FreeCourseModal",
  components: {AppButton, AppTablet, Swiper, SwiperSlide },
  props: {
    courseId: {
        type: Number,
        required: false,
        default: 0
      }
    },
  computed: {
    courses: state => state.$store.getters.courses,
    swiper: (state) => state.$refs.courses.$swiper,
  },
  data() {
    return {
      swiperOptions: {
        spaceBetween: 30,
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          991: {
            slidesPerView: 1,
          },
          1550: {
            slidesPerView: 1,
          },
        },
      },
      isTextChanged: true,
      isRightButtonVisible: true,
      isLeftButtonVisible: true,
    }
  },
  mounted: async function() {
    await this.$axios.get("/courses").then((r) => {
        const response = r.data.map((t, i) => ({...t, active: i === 0}));
        this.$store.dispatch("set", {
            name: 'courses',
            value: response
        });
      })
    this.sliderProgress(this.swiper);
  },
  watch: {
    courses: function() {
      for(let i = 0; i < this.courses.length; i++) {
      if(this.courseId && this.courses[i].id === this.courseId) {
          this.swiper.slideTo(i);
      }
    }
    }
  },
  methods: {
    sliderProgress(swiper) {
      if(swiper.progress === 1) {
        this.isRightButtonVisible = false;
        this.isLeftButtonVisible = true;
      } else if(!swiper.progress) {
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
    activate(courseId) {
        if(this.isAuth) {
            this.setFreeCourseModalStatus(false);
            this.setFreeModalStatus(true, courseId);
        } else {
            this.setFreeCourseModalStatus(false);
            this.setAuthModalStatus(true, 'start');
        }
    }
  },
  async created() {},
  destroyed() {
    this.setFreeCourseModalStatus(false)
  },
}
</script>
  
  <style lang="scss" src="./free-course-modal.scss" scoped></style>
  