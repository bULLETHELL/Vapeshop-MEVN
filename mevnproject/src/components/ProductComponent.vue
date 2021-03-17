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
          <a
            v-else
            class="waves-effect waves-light btn"
            @click="$emit('addToCart', product)"
            >Add to cart</a
          >
        </div>
        <div class="row">
          <b>Product Information</b>
          <p>Manufacturer: {{ product[Object.keys(product)[0]].brand }}</p>
          <p>Max Wattage: {{ product[Object.keys(product)[0]].wattage }}</p>
          <p>{{ product[Object.keys(product)[0]].productInformation }}</p>
        </div>
      </div>
      <div
        class="col s12 m6"
        v-else-if="$route.params.product_type == 'Ejuice'"
      >
        <div class="row">
          <b>Price: {{ product.price }}.-</b>
        </div>
        <div class="row"></div>
        <div class="row">
          <b v-if="product.amount == 0">Out of stock</b>
          <a
            v-else
            @click="$emit('addToCart', product)"
            class="waves-effect waves-light btn"
            >Add to cart</a
          >
        </div>
        <div class="row">
          <b>Product Information</b>
          <p>Manufacturer: {{ product[Object.keys(product)[0]].brand }}</p>
          <p>Taste: {{ product[Object.keys(product)[0]].taste }}</p>
          <p>
            VG/PG: {{ product[Object.keys(product)[0]].vg }}/{{
              product[Object.keys(product)[0]].pg
            }}
          </p>
          <p>
            Nicotine:
            {{ product[Object.keys(product)[0]].nicotine }} mg
          </p>
          <p>{{ product[Object.keys(product)[0]].productInformation }}</p>
        </div>
      </div>
      <div class="col s12 m6" v-else-if="$route.params.product_type == 'Coil'">
        <div class="row">
          <b>Price: {{ product.price }}.-</b>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <select name="resistanceSelect">
              <option
                v-for="resistance in product[Object.keys(product)[0]]
                  .resistance"
                :key="resistance"
                :value="resistance"
              >
                {{ resistance }}
              </option>
            </select>
            <label for="resistanceSelect"></label>
          </div>
        </div>
        <div class="row">
          <b v-if="product.amount == 0">Out of stock</b>
          <a
            v-else
            @click="$emit('addToCart', product)"
            class="waves-effect waves-light btn"
            >Add to cart</a
          >
        </div>
        <div class="row">
          <b>Product Information</b>
          <p>Manufacturer: {{ product[Object.keys(product)[0]].brand }}</p>
          <p>Coils in package: {{ product[Object.keys(product)[0]].amount }}</p>
          <p>{{ product[Object.keys(product)[0]].productInformation }}</p>
        </div>
      </div>
      <div
        class="col s12 m6"
        v-else-if="$route.params.product_type == 'Battery'"
      >
        <div class="row">
          <b>Price: {{ product.price }}.-</b>
        </div>
        <div class="row">
          <b v-if="product.amount == 0">Out of stock</b>
          <a
            v-else
            @click="$emit('addToCart', product)"
            class="waves-effect waves-light btn"
            >Add to cart</a
          >
        </div>
        <div class="row">
          <b>Product Information</b>
          <p>Manufacturer: {{ product[Object.keys(product)[0]].brand }}</p>
          <p>
            Battery Type: {{ product[Object.keys(product)[0]].batteryType }}
          </p>
          <p>
            Battery Life: {{ product[Object.keys(product)[0]].batteryLife }}
          </p>
          <p>{{ product[Object.keys(product)[0]].productInformation }}</p>
        </div>
      </div>
      <div class="col s12 m6" v-else-if="$route.params.product_type == 'Tank'">
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
          <a
            v-else
            @click="$emit('addToCart', product)"
            class="waves-effect waves-light btn"
            >Add to cart</a
          >
        </div>
        <div class="row">
          <b>Product Information</b>
          <p>Manufacturer: {{ product[Object.keys(product)[0]].brand }}</p>
          <p>
            Tank Capacity: {{ product[Object.keys(product)[0]].capacity }} ml
          </p>
          <p>Tank Type: {{ product[Object.keys(product)[0]].tankType }}</p>
          <p>{{ product[Object.keys(product)[0]].productInformation }}</p>
        </div>
      </div>
      <div class="col s12 m6" v-else-if="$route.params.product_type == 'Aroma'">
        <div class="row">
          <b>Price: {{ product.price }}.-</b>
        </div>
        <div class="row">
          <b v-if="product.amount == 0">Out of stock</b>
          <a
            v-else
            @click="$emit('addToCart', product)"
            class="waves-effect waves-light btn"
            >Add to cart</a
          >
        </div>
        <div class="row">
          <b>Product Information</b>
          <p>Manufacturer: {{ product[Object.keys(product)[0]].brand }}</p>
          <p>Taste: {{ product[Object.keys(product)[0]].taste }}</p>
          <p>Size: {{ product[Object.keys(product)[0]].size }} ml</p>
          <p>{{ product[Object.keys(product)[0]].productInformation }}</p>
        </div>
      </div>
      <div class="col s12 m6" v-else-if="$route.params.product_type == 'Base'">
        <div class="row">
          <b>Price: {{ product.price }}.-</b>
        </div>
        <div class="row"></div>
        <div class="row">
          <b v-if="product.amount == 0">Out of stock</b>
          <a
            v-else
            @click="$emit('addToCart', product)"
            class="waves-effect waves-light btn"
            >Add to cart</a
          >
        </div>
        <div class="row">
          <b>Product Information</b>
          <p>Manufacturer: {{ product[Object.keys(product)[0]].brand }}</p>
          <p>
            VG/PG: {{ product[Object.keys(product)[0]].vg }}/{{
              product[Object.keys(product)[0]].pg
            }}
          </p>
          <p>
            Nicotine:
            {{ product[Object.keys(product)[0]].nicotine }} mg
          </p>
          <p>
            Size:
            {{ product[Object.keys(product)[0]].size }} ml
          </p>
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
  updated() {
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