<template lang="pug">
  section.questions
    ._container.container
      ._heading Отвечаем на вопросы
      ._slider
        ._slider-inner
          ._text.-left(@click="setAnswer(course.answer_1)") {{ course.question_1 }}
          ._text.-center(@click="setAnswer(course.answer_2)") {{ course.question_2 }}
          ._text.-right(@click="setAnswer(course.answer_3)") {{ course.question_3 }}
          img._image(src="./img/school.png", alt="")
    transition(name="modal")
      ._modal(v-if="showModal")
        ._modal-box
          img(src="./img/question-modal-bg.png")._modal-bg
          ._modal-content {{ activeAnswer }}
            button(@click="showModal = false")._btn Понятно
</template>

<script>
export default {
  nane: "Questions",
  props: {
    course: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      activeAnswer: "",
      showModal: false,
    }
  },
  methods: {
    setAnswer(answer) {
      this.activeAnswer = answer
      this.showModal = true
    },
  },
}
</script>

<style lang="scss" src="./questions.scss"></style>
