<template lang="pug">
    button.up-button(@click="goToUp" :class="{ visible: isVisible }")
</template>
<script>
export default {
    name: 'UpButton',
    data() {
        return {
            isVisible: false
        }
    },
    methods: {
        goToUp() {
            window.scrollTo(0, 0);
        }
    },
    mounted() {
        document.addEventListener('scroll', () => {
            let scrollPos = window.pageYOffset || document.documentElement.scrollTop;
            if(scrollPos > 300) {
                this.isVisible = true;
            } else {
                this.isVisible = false;
            }
        });
    }
}
</script>

<style scoped lang="scss">
    .up-button {
        position: fixed;
        bottom: 44px;
        right: 62px;

        width: 70px;
        height: 70px;
        border-radius: 50%;
        border: 3px solid #4E0087;
        background: url('../../../assets/img/up-button/up-icon.svg') white;
        background-size: 40px;
        background-repeat: no-repeat;
        background-position: center;

        outline: none;
        z-index: -1;
        opacity: 0;
        transition: all 0.3s;

        @include mediummobile {
            display: none;
        }
    }

    .visible {
        opacity: 1;
        z-index: 10;
        transition: all 0.3s;
    }
</style>
