<template lang="pug">
.auth-modal
    ._dialog
      ._content
        img.cross._cross(src="../../../assets/img/cross.svg", alt="" @click="setSuccessModalStatus(false)")
        ._inner(ref="inner")
          h3._title Ура, твой пользователь активирован!
          h4._title Успехов тебе!
          h4._title Не забудь войти в свой профиль!
          button.auth-modal__btn.-small.btn(@click="setSuccessModalStatus(false)") Спасибо
</template>
