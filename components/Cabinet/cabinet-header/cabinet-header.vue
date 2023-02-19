<template lang="pug">
  section.cabinet-header
    ._container.container
      ._info(:class="{'course-page': coursePage}")
        h2.caption._title(:class="{'caption_rotate': !coursePage}")
          span(v-for="letter in translatedName") {{ letter }}
        ._subtitle.subtitle Привет, {{ currentUser.name }}
      ._slider(v-if="!coursePage")
        .slider__top
          .slider__text Продолжить просмотр
          //.slider__buttons
          //  img(src="./img/arrow-prev.svg").slider__btn-prev
          //  img(src="./img/arrow-next.svg").slider__btn-next
        .slider__body
          .slider__item
            img.slider__video(src="./img/slider-video.png", alt="")
            .slider__subject Биология ОГЭ
            .slider__info 1 урок - Разбор заданий
          .slider__item
            img.slider__video(src="./img/slider-video.png", alt="")
            .slider__subject Биология ОГЭ
            .slider__info 1 урок - Разбор заданий
</template>

<script>
export default {
  name: "CabinetHeader",
  props: {
    coursePage: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  computed: {
    translatedName: function () {
      let answer = "";
      const alphabet = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
        'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i',
        'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
        'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch',
        'ш': 'sh', 'щ': 'sch', 'ь': '', 'ы': 'y', 'ъ': '',
        'э': 'e', 'ю': 'yu', 'я': 'ya',

        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
        'Е': 'E', 'Ё': 'E', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
        'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
        'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
        'У': 'U', 'Ф': 'F', 'Х': 'H', 'Ц': 'C', 'Ч': 'Ch',
        'Ш': 'Sh', 'Щ': 'Sch', 'Ь': '', 'Ы': 'Y', 'Ъ': '',
        'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya'
      };

      for (let i = 0; i < this.currentUser.name.length; ++i) {
        if (alphabet[this.currentUser.name[i]] === undefined) {
          answer += this.currentUser.name[i];
        } else {
          answer += alphabet[this.currentUser.name[i]];
        }
      }

      return `Hi, ${answer}`;
    }
  }
}
</script>

<style lang="scss" src="./cabinet-header.scss"></style>
