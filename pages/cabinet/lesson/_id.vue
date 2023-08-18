<template lang="pug">
#lesson-page
  activate-free-modal(v-if="showActivateFreeModal" :courseId="courseId")
  h1.lesson__name {{ lesson.name }}
  .lesson-wrapper
    img.lesson__screen-wrapper(
      src="../../../assets/img/lessons/screen.png",
      alt=""
    )
    .lesson__screen-content
      .noiseContain(v-if="videoError")
        div
        h1.lesson__answer-result.wrong.lesson-error-text {{ errorText }}
      video.lesson__video(
        preload="true",
        autoplay,
        controls,
        controlsList="nodownload",
        ref="videoField"
      )
        source(
          v-if="lessonVideo",
          :src="this.filePath(lessonVideo)",
          type="video/mp4"
        )
      .lesson__test-field(ref="messageField")
        h1.lesson__test-grettings Спасибо за внимание!
        p.lesson__test-grettings-text Готовы ответить на контрольный вопрос по теме?
        app-button(size="l", @click.native="openTestHandle", :spot="false") Да!
      .lesson__test-field(ref="testField")
        h1.lesson__test-title {{ question.question }}
        template(v-if="question.answer_1")
          template(v-for="i in [1, 2, 3, 4]")
            test-variant(
              v-if="question[`answer_${i}`] !== ''"
              :question="question && question[`answer_${i}`]",
              :selectedAnswer="selectAnswer === i",
              :isCorrect="isCorrect",
              :number="i",
              @selectAnswer="select"
            )
        template(v-if="!question.answer_1")
          input.lesson__input-answer(v-model="inputAnsver" placeholder="введи свой ответ" :disabled="isCorrect !== null")
        p.lesson__answer-result.correct(v-if="isCorrect === true") Молодец! ответ верный
        p.lesson__answer-result.wrong(v-if="isCorrect === false") УПС.. ответ неверный :(
        app-button(
          v-if="isCorrect === null",
          size="l",
          @click.native="askQuestion",
          :spot="false"
        ) Ответить
        app-button(
          v-if="isCorrect === false",
          size="l",
          @click.native="retryQuestion",
          :spot="false"
        ) Пройти еще раз!
        app-button(
          v-if="isCorrect === true",
          size="l",
          @click.native="goNextLesson",
          :spot="false"
        ) Следующий урок
</template>

<script>
import TestVariant from "../../../components/Tests/test-variant.vue"
import ActivateFreeModal from "../../../components/app/activate-free-modal/activate-free-modal"
export default {
  name: "LessonPage",
  layout: "main",
  components: { TestVariant, ActivateFreeModal },
  data() {
    return {
      lesson: {},
      question: {},
      selectAnswer: null,
      inputAnsver: null,
      isCorrect: null,
      lessonVideo: null,
      nextLesson: null,
      videoError: null,
      errorText: '',
      freeModal: false,
      courseId: 0,
    }
  },
  computed: {
    lessonId: (state) => state.$route.params.id,
    showActivateFreeModal: state => state.$store.getters.showActivateFreeModal,
  },
  created() {
    this.getLesson();
  },
  mounted() {
    document
      .querySelector(".lesson__video")
      .addEventListener("ended", this.hideVideo, false);
  },
  methods: {
    select(number) {
      this.selectAnswer = number
    },
    goNextLesson() {
      if(!this.nextLesson) {
        this.$router.push(`/cabinet`)
      } else {
        this.$router.push(`/cabinet/lesson/${this.nextLesson}`)
      }
    },
    async askQuestion() {
      console.log(this.inputAnsver, this.question.correct_answer)
      this.isCorrect =
        this.question.correct_answer.trim() ===
        this.question[`answer_${this.selectAnswer}`].trim() || this.inputAnsver === this.question.correct_answer.trim()
      if (this.isCorrect) {
        const response = await this.$axios.put(`/lessons/${this.lessonId}`)
        this.nextLesson = response.data.nextLesson
      }
    },
    retryQuestion() {
      this.isCorrect = null;
      this.selectAnswer = null;
      this.inputAnsver = null;
    },
    openTestHandle() {
      this.$refs.testField.classList.add("showed")
      this.$refs.messageField.classList.remove("showed")
      this.$refs.messageField.classList.add("hidden")
    },
    hideVideo() {
      this.$refs.videoField.classList.add("hidden")
      this.$refs.messageField.classList.add("showed")
    },
    async getLesson() {
      await this.$axios
        .get(`/lessons/${this.lessonId}`)
        .then((r) => {
          this.lesson = r.data;
          this.question = r.data.question;
          this.lessonVideo = this.lesson.video[0];
        })
        .catch(async (e) => {
          if(e.message.indexOf('402') >= 0) {
            const course = await this.$axios.get(`/lessons/course/${this.lessonId}`);
            this.courseId = course.data.courseId;
            this.errorText = 'Нужно преобрести полный курс :/';
            this.setActivateFreeModal(true);
          } else {
            this.errorText = 'Ты не посмотрел предыдущий урок :(';
          }
          this.videoError = true;
        })
    },
  },
}
</script>

<style lang="scss" scoped>
#lesson-page {
  margin-top: 90px;
  margin-right: auto;
  margin-left: auto;
  width: 60vw;

  @include tablet {
    width: 80%;
  }
}
.lesson-wrapper {
  position: relative;
}
.lesson {
  &__name {
    color: #356e4c;
    font-weight: 400;
    font-size: 60px;

    @include tablet {
      font-size: 40px;
    }
  }

  &__test-title {
    font-size: 20px;

    @include mobile {
      font-size: 18px;
    }
  }

  &__input-answer {
    font-family: '3Dumb';
    font-size: 18px;
    background: transparent;
    width: 95% !important;
    height: fit-content !important;
    outline: none;
    border: 0;
    border-bottom: 1px solid silver;
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  &__screen-wrapper {
    width: 70vw;
    height: 45vw;

    @include mobile {
      width: 100%;
      height: 500px;
    }
  }

  &__screen-content {
    max-width: 100%;
    width: 90%;
    height: 40vw;
    background: aliceblue;
    position: absolute;
    left: 2vw;
    top: 3vw;
    border-radius: 4vw;
    overflow: hidden;

    video {
      width: 100%;
    }

    * {
      height: 100%;
    }

    @media (max-width: 1025px) {
      width: 64vw;
    }

    @include mobile {
      width: 95%;
      height: 470px;
      border-radius: 8vw;
    }
  }

  &__test-field {
    background: white;
    display: none;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding-top: 2vw;
    padding-bottom: 2vw;

    h1,
    p,
    button {
      height: fit-content;
      width: fit-content;
    }
  }

  &__answer-result {
    font-size: 3vw;

    @include mobile {
      font-size: 9vw;
    }
  }

  &__test-grettings {
    font-size: 5vw;

    @include mobile {
      font-size: 10vw;
    }
  }

  &__test-grettings-text {
    font-size: 2vw;
    line-height: 170%;

    @include mobile {
      font-size: 6vw;
      line-height: 120%;
    }
  }
}
.hidden {
  display: none;
}

.showed {
  display: flex;
}
.correct {
  color: #219653;
}
.wrong {
  color: #eb5757;
}
.lesson-error-text{
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.noiseContain {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
}
.noiseContain div {
  background-image: url(https://prashantsani.com/Misc/codepen/noise.jpg);
  background-repeat: repeat;
  background-position: 0 0;
  width: 100%;
  height: 100%;
  -webkit-animation: noiseAnim 0.5s infinite linear alternate;
  -moz-animation: noiseAnim 0.5s infinite linear alternate;
  -o-animation: noiseAnim 0.5s infinite linear alternate;
  animation: noiseAnim 0.5s infinite linear alternate;
}
@-webkit-keyframes noiseAnim {
  0% {
    background-position: 10px 200px;
  }
  20% {
    background-position: -50px 0;
  }
  40% {
    background-position: 100px -10px;
  }
  60% {
    background-position: 0 -150px;
  }
  80% {
    background-position: -100px -30px;
  }
  100% {
    background-position: 160px -60px;
  }
}
@-moz-keyframes noiseAnim {
  0% {
    background-position: 10px 200px;
  }
  20% {
    background-position: -50px 0;
  }
  40% {
    background-position: 100px -10px;
  }
  60% {
    background-position: 0 -150px;
  }
  80% {
    background-position: -100px -30px;
  }
  100% {
    background-position: 160px -60px;
  }
}
@-o-keyframes noiseAnim {
  0% {
    background-position: 10px 200px;
  }
  20% {
    background-position: -50px 0;
  }
  40% {
    background-position: 100px -10px;
  }
  60% {
    background-position: 0 -150px;
  }
  80% {
    background-position: -100px -30px;
  }
  100% {
    background-position: 160px -60px;
  }
}
@keyframes noiseAnim {
  0% {
    background-position: 10px 200px;
  }
  20% {
    background-position: -50px 0;
  }
  40% {
    background-position: 100px -10px;
  }
  60% {
    background-position: 0 -150px;
  }
  80% {
    background-position: -100px -30px;
  }
  100% {
    background-position: 160px -60px;
  }
}
</style>