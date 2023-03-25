<template lang="pug">
    div.result-wrapper
        div.result
            h1.result__title Твой результат
            p.result__score {{ correctQuestionCount }}/{{ questionCount }}
            h1.result__title баллов
            div.result__button-field
                app-button(:spot="false" size="s" @click.native="goToCabinet") Перейти в кабинет
                app-button(:spot="false" color="white" size="s" @click.native="refreshTest") пройти еще раз
</template>

<script>
    export default {
        name: 'TestResult',
        props: {
            questionCount: {
                type: Number,
                default: 0,
                required: true,
            },
            correctQuestionCount: {
                type: Number,
                default: 0,
                required: true,
            },
        },
        data() {
            return {

            }
        },
        methods: {
            goToCabinet() {
                this.$router.push("/cabinet");
            },
            refreshTest() {
                this.$router.go(0);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .result {
        width: 751px;
        height: 736px;
        background: url('../../assets/img/modal-bg.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &__score {
            font-family: '3Dumb';
            font-weight: 400;
            font-size: 7vw;
            line-height: 115%;

            color: #386C55;
        }

        &__button-field {
            display: flex;
            margin-top: 60px;

            &>:nth-child(2n) {
                margin-left: 30px;
            }

            @include smallmobile {
                margin-top: 20px;
                flex-direction: column;

                &>:nth-child(2n) {
                    margin-left: 0;
                    margin-top: 5px;
                }
            }
        }

        &__title {
            @include mobile {
                font-size: 5vw;
            }
        }
    }
    .result-wrapper {
        display: flex;
        justify-content: center;
        transition: all 1s;
        width: 0;
        opacity: 0;
        margin: 0 auto;
        overflow: hidden;
    }
</style>