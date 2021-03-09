<template>
  <div class="container">
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      order: null,
    };
  },
  created() {
    let url = "http://localhost:4000/user/profile";
    this.axios
      .get(url)
      .then((response) => {
        console.log(response);
        this.order = response.data.order;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>