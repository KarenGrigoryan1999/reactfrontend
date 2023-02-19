<template lang="pug">
  .app-tablet(:style="{'border-color': color}" :class="orientation")
    ._dynamic
    ._camera
    ._screen(:style="{'border-color': color}")
      slot
</template>

<script>
export default {
  name: "AppTablet",
  props: {
    orientation: {
      type: String,
      default: "vertical",
      required: false,
    },
    color: {
      type: String,
      default: "#000",
      required: false,
    },
  },
}
</script>

<style lang="scss">
.app-tablet {
  $root: &;
  position: relative;
  background: #949494;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  border: 3px solid #000;

  &.vertical {
    padding: 30px 10px 10px 10px;

    #{$root} {
      &__dynamic {
        position: absolute;
        top: calc(30px / 2 - 2.5px);
        left: 40%;
        width: 20%;
        max-width: 80px;
        height: 5px;
        border-radius: 5px;
        background: #000;
      }

      &__camera {
        position: absolute;
        top: calc(30px / 2 - 7.5px);
        left: calc(50% + 50px);
        width: 15px;
        height: 15px;
        background: #130054;
        border: 3px solid #000;
        border-radius: 10px;
      }
    }
  }

  &.horizontal {
    padding: 10px 30px 10px 10px;


    #{$root} {
      &__dynamic {
        position: absolute;
        right: calc(30px / 2 - 2.5px);
        top: 40%;
        height: 20%;
        width: 5px;
        border-radius: 5px;
        background: #000;
      }

      &__camera {
        position: absolute;
        right: calc(30px / 2 - 7.5px);
        top: calc(50% + 50px);
        width: 15px;
        height: 15px;
        background: #130054;
        border: 3px solid #000;
        border-radius: 10px;
      }
    }
  }

  &__screen {
    background: #fff;
    border-radius: 20px;
    width: 100%;
    height: 100%;
    border: 3px solid #000;
    padding: 20px;
  }
}
</style>
