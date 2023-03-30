<template lang="pug">
  .auth-modal__group
    a(href='https://217.18.63.132/api/auth/external-authorization/1')
      button.auth-modal__btn.-vk.btn_reset
        | Войти через
        span VK ID
    button.auth-modal__btn.-email.btn(@click="$emit('change-type', 'email')") Войти через почту
    .auth-modal__text
      | Выполняя вход, вы принимаете пользовательское соглашение, публичную оферту на заключение договора и согласие на обработку персональных данных.
</template>
