<template lang="pug">
    #test-page
        app-header
        div.content
            template(v-if="!isCompleted")
                div.question-wrapper(v-for="(question, j) in test.questions")
                    div.question(v-if="currentQuestionNumber === j")
                        h1 {{ test.questions && question.question }}
                        div.question__picture-block
                            img.question__picture(v-for="picture of question.photos" :src="filePath(picture)")
                        div.question__answer-block
                            test-variant(
                                    v-for="i in [1, 2, 3, 4]",
                                    :question="test.questions && question && question[`answer_${i}`]",
                                    :selectedAnswer="selectAnswer === i",
                                    :isCorrect="null",
                                    :number="i",
                                    @selectAnswer="select"
                            )
                            input.question__test-answer(v-if="!question.answer_1" v-model="selectAnswer")
                        div.question__button-control
                            app-button(:spot="false" size="s" :disabled="!nextButtonEnabled" @click.native="nextQuestion" v-if="!isLastQuestion") Следующее задание
                            app-button(:spot="false" size="s" :disabled="!nextButtonEnabled" @click.native="completeTest" v-if="isLastQuestion") Завершить тестирование
                            app-button(:spot="false" size="s" :disabled="!backButtonEnabled" @click.native="prevQuestion") Назад
            template(v-if="isCompleted")
                h1._loading(v-if="isReady") Загрузка...
                test-result(:questionCount="pointCount" :correctQuestionCount="correctPointCount")
</template>

<script>
import AppHeader from "../../../components/app/app-header/app-header"
import TestVariant from "../../../components/Tests/test-variant.vue"
import TestResult from "../../../components/Tests/test-result.vue"
import { setTimeout } from "timers";

export default {
  async created() {
      await this.$axios.get(`/tests/${this.testId}`).then((r) => {
        this.test = r.data;
        for(let question of this.test.questions) {
            question.selectAnswer = null;
        }
    });
  },
  components: { TestVariant, TestResult, AppHeader },
  data() {
    return {
        test: [],
        selectAnswer: null,
        currentQuestionNumber: 0,
        isCompleted: false,
        isReady: true,
        correctPointCount: 0,
    }
  },
  computed: {
    testId: (state) => state.$route.params.id,
    nextButtonEnabled: (state) => state.selectAnswer !== null,
    backButtonEnabled: (state) => state.currentQuestionNumber > 0,
    isLastQuestion: (state) => state.test.questions.length - 1 === state.currentQuestionNumber,
    pointCount: (state) => state.test.questions.reduce((acc, element) => element.cost + acc, 0)
  },
  mounted() {
    window.addEventListener('load', function () {
        alert("It's loaded!");
    })
  },
  methods: {
    select(number) {
      this.selectAnswer = number;
    },
    nextQuestion() {
        this.test.questions[this.currentQuestionNumber].selectAnswer = this.selectAnswer;
        this.selectAnswer = null;
        this.currentQuestionNumber += 1;
    },
    prevQuestion() {
        this.currentQuestionNumber -= 1;
        this.selectAnswer = this.test.questions[this.currentQuestionNumber].selectAnswer;
    },
    completeTest() {
        this.test.questions[this.currentQuestionNumber].selectAnswer = this.selectAnswer;
        this.selectAnswer = null;
        this.isCompleted = true;
        this.test.questions.forEach((questionElement) => {
            const selected = questionElement[`answer_${questionElement.selectAnswer}`] || questionElement.selectAnswer;
            if(selected.toLowerCase() === questionElement.correct_answer.toLowerCase()) {
                this.correctPointCount += questionElement.cost;
            }
        });
        this.startAnimation();
        this.saveTestResult();
    },
    async saveTestResult() {
      await this.$axios.put(`/tests/save-result`, {
        testId: this.testId,
        result: this.correctPointCount
      }).then((r) => {

    });
  },
    startAnimation() {
       setTimeout(() => {
        this.isReady = false;
        const whiteSpot = document.querySelector('.result-wrapper');
        whiteSpot.style.width = '100vw';
        whiteSpot.style.opacity = '1';
       }, 2000);
    }
  },
}
</script>

<style lang="scss" scoped>
#test-page {
  margin-top: 90px;
}
.content {
    width: 100vw;

    &__loading {
        text-align: center;
    }
}

.question-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.question {
    width: 100%;
    max-width: 90%;
    background: white;
    align-items: center;
    min-height: 600px;
    max-height: 100vh;
    max-width: 900px;
    margin: 0 auto;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: 25px solid #949494;
    position: relative;

    &::after {
        content: '';
        display: block;
        background-color: #231F20;
        width: 12px;
        height: 140px;
        border-radius: 10px;
        position: absolute;
        right: -18px;
    }

    @include smallmobile {
        &::after {
            content: '';
            display: block;
            background-color: #231F20;
            height: 12px;
            width: 140px;
            border-radius: 10px;
            position: absolute;
            top: -18px;
            right: auto;
    }
    }

    &__button-control {
        display: flex;
        justify-content: center;
        flex-direction: row;

        &>:nth-child(2n) {
            margin-left: 30px;
        }
    }

    &__answer-block {
        width: 100%;
        padding-left: 20px;
        padding-right: 20px;
    }

    &__test-answer {
        font-family: '3Dumb';
        font-size: 18px;
        background: transparent;
        width: 100%;
        outline: none;
        border: 0;
        border-bottom: 1px solid silver;
    }

    &__picture-block {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
    }

    &__picture {
        width: 250px;
        padding: 5px;
    }
}
</style>