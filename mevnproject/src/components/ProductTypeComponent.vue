<template>
  <div>
    <h1>{{ $route.params.product_type }}s</h1>
    <div>
      <div
        v-for="product in productsWithProductType"
        :key="product._id"
        class="row"
      >
        <div class="col s12 m6">
          <div class="card blue-grey darken-1">
            <div class="card-content white-text">
              <span class="card-title">{{
                product[Object.keys(product)[0]].name
              }}</span>
              <p>Price: {{ product.price }}.-</p>
            </div>
            <div class="card-action">
              <router-link
                :to="{
                  name: 'product',
                  params: {
                    product_type: $route.params.product_type,
                    product_name: product[Object.keys(product)[0]].name,
                  },
                }"
                >See more</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      productsWithProductType: [],
    };
  },
  mounted() {
    window.M.AutoInit();
    let url = `http://localhost:4000/products/getbytype/${this.$route.params.product_type}`;
    this.axios
      .get(url)
      .then((res) => {
        this.productsWithProductType = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
  updated() {
    let url = `http://localhost:4000/products/getbytype/${this.$route.params.product_type}`;
    this.axios
      .get(url)
      .then((res) => {
        this.productsWithProductType = res.data;
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>