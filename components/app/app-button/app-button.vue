<template lang="pug">
  button.app-button(:class="modifiers")
    slot Текст кнопки
    img._smugdes(v-if='modifiers[0] === "app-button_default" && spot && color !== "white"' src="../../../assets/img/button/smudges.png")
    img._smugdes.app-button__smugdes-light(v-if='modifiers[0] === "app-button_default" && spot && color !== "white"' src="../../../assets/img/button/smudges-light.png")
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
    },
    color: {
      type: String,
      default: "dark",
      required: false
    },
    spot: {
      type: Boolean,
      default: true,
      required: false,
    }
  },
  computed: {
    modifiers: state => ([
      `app-button_${state.type}`,
      `app-button_size-${state.size}`,
      `color-${state.color}`
    ])
  }
}
</script>

<style lang="scss" src="./app-button.scss"></style>
