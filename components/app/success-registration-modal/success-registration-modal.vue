<template lang="pug">
.auth-modal
        ._dialog
          ._content
            img.cross._cross(src="../../../assets/img/cross.svg", alt="" @click="setSuccessRegistrationModalStatus(false)")
            ._inner(ref="inner")
              h3._title Ура, ты зарегистрирован!
              h4._title Обязательно активируй почту!
              button.auth-modal__btn.-small.btn(@click="setSuccessRegistrationModalStatus(false)") Спасибо
</template>
    