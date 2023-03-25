<template>
    <div class="picture-link__wrapper">
        <div class="picture-link" @click="goToCourse">
            <img src="../../../assets/img/illustrations/with-ballon-black.png" v-if="teacher.illustration_type === 'with-balloon'" />
            <img src="../../../assets/img/illustrations/car.png" v-if="teacher.illustration_type === 'car'" />
            <img src="../../../assets/img/illustrations/bubble.png" v-if="teacher.illustration_type === 'bubble'" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        teacher: {
            type: Object,
            required: true,
            default: []
        }
    },
    methods: {
        goToCourse() {
            this.$router.push(`/courses/${this.teacher.courses[0].id}`);
        }
    }
}
</script>

<style scoped>
.picture-link__wrapper {
    width: 100%;
    display: flex;
    justify-content: center;
}

.picture-link {
    cursor: pointer;
}
</style>
