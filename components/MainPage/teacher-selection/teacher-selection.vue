<template lang="pug">
  .teacher-selection
    ._container.container
      ._head
        ._caption.caption
          span(v-for="letter in 'Selection'") {{ letter }}
          ._caption-group
            span(v-for="letter in 'of'") {{ letter }}
          ._caption-group
            span(v-for="letter in 'teachers'") {{ letter }}
        ._subtitle.subtitle Отбор
          br/  преподавателей
      ._content
        ._item
          img(:src="require(`~/assets/img/teacher-selection/bg-1.svg`)")
          img(src="./img/balloon.png")._item-balloon
          ._item-content
            ._item-title {{ mainPageInfo.purpureSpotTitle }}
            ._item-text {{ mainPageInfo.purpureSpotText }}
        ._item
          img(:src="require(`~/assets/img/teacher-selection/bg-2.svg`)")
          img(src="./img/balloon.png")._item-balloon
          ._item-content
            ._item-title {{ mainPageInfo.turquoiseSpotTitle }}
            ._item-text {{ mainPageInfo.turquoiseSpotText }}
        ._item
          img(:src="require(`~/assets/img/teacher-selection/bg-3.svg`)")
          img(src="./img/balloon.png")._item-balloon
          ._item-content
            ._item-title {{ mainPageInfo.blueSpotTitle }}
            ._item-text {{ mainPageInfo.blueSpotText }}
        ._item
          img(:src="require(`~/assets/img/teacher-selection/bg-4.svg`)")
          img(src="./img/balloon.png")._item-balloon
          ._item-content
            ._item-title {{ mainPageInfo.crimsonSpotTitle }}
            ._item-text {{ mainPageInfo.crimsonSpotText }}
</template>

<script>
export default {
  name: "TeacherSelection",
  props: {
    mainPageInfo: {
      type: Object,
      default: null,
      required: true
    },
  }
}
</script>

<style lang="scss" src="./teacher-selection.scss"></style>
