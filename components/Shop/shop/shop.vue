<template lang="pug">
  section.shop(:class="{'no-auth': !isAuth}")
    ._container.container
      ._top
        ._left
          h2._caption.caption
            span(v-for="letter in 'Store'") {{ letter }}
          ._subtitle.subtitle Магазин
        ._balance(v-if="isAuth")
          ._balance-text Твои баллы
          ._balance-value(:data-length="`${String($auth.user.balance).length}`") {{ balance }}
      ._body
        ._item(v-for="item in list" :key="item.id" @click="getGift(item)")
          ._item-wrap
            ._sticker
              ._sticker-value(:data-length="`${String(item.price).length}`") {{ item.price }}
              ._sticker-text бонусов
            ._purchase {{ item.name }}
            img._image(:src="filePath(item.images[0])", alt="")
</template>

<script>
export default {
  name: "Shop",
  props: {
    list: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  data() {
    return {

    }
  },
  computed: {
    balance: state => state.$store.getters.balance
  },
  async created() {
    await this.getResults();
  },
  methods: {
    async getResults() {
      await this.$axios.get(`/results`).then(r => {
        this.$store.dispatch("set", {
          name: "balance",
          value: r.data.balance,
        });
      })
    },
    async getGift(item) {
      if(!this.isAuth) {
        return this.setAuthModalStatus(true, 'start');
      }
      if(item.price > this.balance) {
        return this.setGiftModalStatus(true, null);
      }

      return this.setGiftModalStatus(true, item);
    }
  }
}
</script>

<style lang="scss" src="./shop.scss"></style>
