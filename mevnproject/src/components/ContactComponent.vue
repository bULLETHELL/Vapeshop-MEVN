<template>
  <div>
    <h5>Send us and email below</h5>
    <form class="contact-form" @submit.prevent="SendEmail">
      <label for="name">Name</label>
      <input type="text" name="name" placeholder="Your Name" />
      <label for="email">Email</label>
      <input type="email" name="email" placeholder="Your Email" />
      <label for="message">Message</label>
      <textarea name="message" cols="30" rows="5" placeholder="Message">
      </textarea>

      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>
<script>
import emailjs from "emailjs-com";
export default {
  methods: {
    SendEmail: (e) => {
      emailjs
        .sendForm(
          "service_8cdmvlo",
          "template_80mnojd",
          e.target,
          "user_AtabwARIEB6o99EpnnLKd"
        )
        .then((result) => {
          console.log("SUCCESS!", result.status, result.text);
        })
        .catch((error) => {
          console.log("FAILED!", error);
        });
    },
  },
};
</script>