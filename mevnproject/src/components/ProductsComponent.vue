<template>
  <div>
    <h4>All Products</h4>
    <div class="row" v-for="productType in productTypes" :key="productType">
      <h5>{{ productType }}s</h5>
      <div v-for="product in allProducts" :key="product._id">
        <div v-if="product.productType == productType">
          <div class="col s6 m3">
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
                      product_type: product.productType,
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      allProducts: [],
      productTypes: [],
      ejuices: [],
      coils: [],
      mods: [],
      batteries: [],
      tanks: [],
    };
  },
  created() {
    let url = "http://localhost:4000/products/getall";
    this.axios
      .get(url)
      .then((res) => {
        this.allProducts = res.data;
        console.log(Object.keys(this.allProducts));
        this.allProducts.forEach((product) => {
          if (!this.productTypes.includes(product.productType)) {
            this.productTypes.push(product.productType);
          }
          if (product.productType == "Ejuice") {
            this.ejuices.push(product);
          } else if (product.productType == "Coil") {
            this.coils.push(product);
          } else if (product.productType == "Mod") {
            this.mods.push(product);
          } else if (product.productType == "Battery") {
            this.batteries.push(product);
          } else if (product.productType == "Tank") {
            this.tanks.push(product);
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>