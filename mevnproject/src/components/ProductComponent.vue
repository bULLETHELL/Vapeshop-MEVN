<template>
  <div>
    <h5>{{ $route.params.product_name }}</h5>
    <div class="row">
      <div class="col s12 m6"></div>
      <div class="col s12 m6" v-if="$route.params.product_type == 'Mod'">
        <div class="row">
          <b>Price: {{ product.price }}.-</b>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <select name="colourSelect">
              <option
                v-for="colour in product[Object.keys(product)[0]].colour"
                :key="colour"
                :value="colour"
              >
                {{ colour }}
              </option>
            </select>
            <label for="colourSelect"></label>
          </div>
        </div>
        <div class="row">
          <b v-if="product.amount == 0">Out of stock</b>
          <a v-else class="waves-effect waves-light btn">Add to cart</a>
        </div>
        <div class="row">
          <b>Product Information</b>
          <p>Manufacturer: {{ product[Object.keys(product)[0]].brand }}</p>
          <p>Max Wattage: {{ product[Object.keys(product)[0]].wattage }}</p>
          <p>{{ product[Object.keys(product)[0]].productInformation }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      product: null,
    };
  },
  created() {
    window.M.AutoInit();
    let decodedProductType = decodeURIComponent(
      this.$route.params.product_type
    );
    let decodedProductName = decodeURIComponent(
      this.$route.params.product_name
    );
    let url = `http://localhost:4000/products/getbytype/${decodedProductType}`;
    this.axios
      .get(decodeURIComponent(url))
      .then((res) => {
        res.data.forEach((product) => {
          if (product[Object.keys(product)[0]].name == decodedProductName) {
            this.product = product;
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>