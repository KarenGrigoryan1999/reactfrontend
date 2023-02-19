<template lang="pug">
  section.sale
    ._container.container
      img._man(src="./img/man.png")
      ._content
        img._decor-main(src="./img/sale-decor-main.svg")
        ._content-wrap
          ._content-inner
            ._top
              h2._caption.caption 2000
              span._currency rub
            ._text блаблаблаблаблаблаблаблаблабла
            button.btn.btn_reset._btn Подробнее
    img._decor-1(src="./img/sale-decor1.svg")
    img._decor-2(src="./img/sale-decor2.svg")
    img._decor-3(src="./img/sale-decor3.svg")
</template>

<script>
export default {
  name: "Sale",
}
</script>

<style lang="scss" src="./sale.scss"></style>
