<template lang="pug">
  section.cabinet-header
    ._container.container
      ._info(:class="{'course-page': coursePage}")
        h2.caption._title(:class="{'caption_rotate': !coursePage}")
          span(v-for="letter in translatedName") {{ letter }}
        ._subtitle.subtitle Привет, {{ currentUser.name }}
      ._slider(v-if="!coursePage")
        .slider__top
          .slider__text(v-if="lastLessons.length > 0") Продолжить просмотр
        .slider__body
          .slider__item(v-for="lesson of lastLessons")
            nuxt-link(:to='`/cabinet/lesson/${lesson.id}`')
              img.slider__video(src="./img/slider-video.png", alt="")
              .slider__subject {{ lesson.courses[0].name }}
              .slider__info {{ lesson.name }}
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
  data() {
    return {
      passedLessons: []
    }
  },
  computed: {
    translatedName: (state) => {
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

      for (let i = 0; i < state.currentUser.name.length; ++i) {
        if (alphabet[state.currentUser.name[i]] === undefined) {
          answer += state.currentUser.name[i];
        } else {
          answer += alphabet[state.currentUser.name[i]];
        }
      }

      return `Hi, ${answer}`;
    },
    lastLessons: (state) => state.passedLessons.sort((a,b) => b.position - a.position).reduce((acc, element) => {
      if(!acc.find((lessonElement) => lessonElement.courses[0].name === element.courses[0].name)) {
        return [...acc, element]
      } else {
        return acc
      }
    }, [])
  },
  async created() {
    await this.getPassedLessons();
    this.setLoaded();
    this.$store.dispatch("set", {
      name: 'isReady',
      value: false,
    })
  },
  methods: {
    async getPassedLessons() {
      this.$axios.get('/lessons/passed').then(r => {
          this.passedLessons = r.data;
      });
    },
    setLoaded() {
      setTimeout(() => {  
        this.$store.dispatch("set", {
          name: "isReady",
          value: true,
        });
      }, 2000);
    },
  },
}
</script>

<style lang="scss" src="./cabinet-header.scss"></style>
