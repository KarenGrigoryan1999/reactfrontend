<template lang="pug">
  button.app-button(:class="modifiers")
    slot Текст кнопки
    img._smugdes(v-if='modifiers[0] === "app-button_default"' src="../../../assets/img/button/smudges.png")
    img._smugdes.app-button__smugdes-light(v-if='modifiers[0] === "app-button_default"' src="../../../assets/img/button/smudges-light.png")
</template>

<script>
export default {
  name: "AppButton",
  props: {
    type: {
      type: String,
      default: "default",
      required: false
    },
    size: {
      type: String,
      default: "xl",
      required: true
    }
  },
  computed: {
    modifiers: state => ([
      `app-button_${state.type}`,
      `app-button_size-${state.size}`
    ])
  }
}
</script>

<style lang="scss" src="./app-button.scss"></style>
