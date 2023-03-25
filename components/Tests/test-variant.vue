<template lang="pug">
    div.question-field(@click="selectVariant")
        img.question-field__smile(v-if="selectedAnswer && isCorrect === null" src="~/assets/img/tests/selectedAnswer.png")
        img.question-field__smile(v-if="selectedAnswer && isCorrect === true" src="~/assets/img/tests/correctAnswer.png")
        img.question-field__smile(v-if="selectedAnswer && isCorrect === false" src="~/assets/img/tests/wrongAnswer.png")
        p.question-field__text(:class="{correct: selectedAnswer && isCorrect === true, wrong: selectedAnswer && isCorrect === false}") {{question}}
</template>
  
  <script>
  export default {
    name: "TestVariant",
    layout: "main",
    props: {
        question: {
            type: String,
            default: "default",
            required: true
        },
        number: {
            type: Number,
            required: true
        },
        selectedAnswer: {
            type: Boolean,
            default: false,
            require: false
        },
        isCorrect: {
            type: Boolean,
            default: null,
            require: false
        }
    },
    methods: {
        selectVariant() {
            if(this.isCorrect === null) {
                this.$emit('selectAnswer', this.number);
            }
        }
    }
  }
  </script>
  
  <style lang="scss" scoped>
    .question-field {
        display: flex;
        align-items: center;
        padding-left: 20px;
        padding-right: 20px;
        cursor: pointer;

        &>:nth-child(2n) {
            margin-left: 10px;
        }
    }
    .question-field__smile {
        width: 4vw;
        height: 4vw;
    }

    .question-field__text {
        font-size: 4vw;
    }
    .correct {
    color: #219653;
  }
  .wrong {
    color: #EB5757;
  }

  @media (max-width: 788px) {
    .question-field__text {
        font-size: 9vw;
    }
  }
  </style>