<template>
    <div class="picture-link__wrapper">
        <div class="picture-link" @click="goToCourse">
            <img :src="filePath(illustration)" />
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
        },
        illustration: '',
    },
    methods: {
        goToCourse() {
            this.$router.push(`/courses/${this.teacher.courses[0].id}`);
        }
    },
    async mounted() {
        const illustration = await this.$axios.get(`/illustrations/type/${this.teacher.illustration_type}`);
        this.illustration = illustration.data.photo[0];
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
