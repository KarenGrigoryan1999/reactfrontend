<template lang="pug">
  #shop-page
    Shop(:list="shopList")
</template>

<script>
import Shop from "../../components/Shop/shop/shop";
export default {
  name: "ShopPage",
  components: {Shop},
  layout: "main",
  async asyncData({ store, $axios }) {
    await $axios.get("/xfields").then((r) => {
      r.data.forEach((x) => {
        store.dispatch("set", { name: x.code, value: x.value })
      })
    })


    const list = await $axios.get("/shop").then((r) => {
      return r.data;
    });
    return {
      shopList: list,
    }
  },
  data() {
    return {
      shopList: [],
    }
  },
}
</script>
