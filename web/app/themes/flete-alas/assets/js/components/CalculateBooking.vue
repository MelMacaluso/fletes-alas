<template>
    <div class="container mx-auto relative h-auto md:h-120">
      <div class="max-w-sm mx-auto">
          <div>{{responseData}}</div>
        <transition name="fade">
            <form @submit.prevent="calculateDistance">
                <div class="flex flex-wrap -mx-4">
                    <div class="relative w-full md:w-1/2 px-2 mt-4">
                        <input ref="from" name="address" autocomplete='street-address' type="text" placeholder="Desde" class="w-full border rounded p-5 border-grey-dark">
                    </div>
                    <div class="relative w-full md:w-1/2 px-2 mt-4">
                        <input ref="to" name="address" autocomplete='street-address' type="text" placeholder="Hasta" class="w-full border rounded p-5 border-grey-dark">
                    </div>
                    <div class="w-full md:w-1/2 px-2 mt-4 mb-4">
                        <flat-pickr v-model="time" :config="config" class="w-full border border-grey-dark rounded p-5" placeholder="Fecha y hora"></flat-pickr>
                    </div>
                </div>
                <div class="flex flex-col -mx-4">
                    <div class="w-full px-2 text-center">
                      <input type="submit" value="Calcula tu mudanza" :class="['w-full max-w-xs px-4 py-4 text-white shadow hover:shadow-lg rounded bg-animated', errors.any() ? 'bg-grey-dark cursor-not-allowed' : 'bg-blue cursor-pointer']" :disabled="errors.any()" @click.prevent="calculateDistance">
                  </div>
              </div>
          </form>
        </transition>
        <transition name="fade">
          <div v-show="submitted" class="absolute pin m-auto flex flex-col justify-center text-center">
            <p class="bg-white text-lg text-black rounded shadow-lg px-2 py-4">Gracias, un fletero te va a contactar al mas pronto para organisar tu mudanza.</p>
          </div>
        </transition>
  </div>
</div>
</template>

<style scoped>
.sliding {
  transition: 2s left ease-out;
}
.fading-out {
  transition: 1s border-color ease-out;
}
</style>

<script>
import axios from "axios";

import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/themes/airbnb.css";
import "flatpickr/dist/flatpickr.css";

export default {
  name: "request",
  data: () => ({
    submitted: false,
    time: null,
    distance: "",
    responseData: "",
    config: {
      altFormat: "h i K",
      altInput: true,
      enableTime: true,
      noCalendar: true,
      dateFormat: "H:i"
    }
  }),
  components: {
    flatPickr
  },
  methods: {
    calculateDistance() {
      const mainHub = `La Plaza, Corrientes, Rosario, Santa Fe Province, Argentina`; // that fake address should be a .env
      const from = `${this.$refs.from.value}`;
      const to = `${this.$refs.to.value}`;
      new google.maps.DistanceMatrixService().getDistanceMatrix(
        {
        //   origins: [from],
          origins: [mainHub ,from],
          destinations: [to],
          travelMode: "DRIVING",
        }, (response, status) => {
            this.responseData = response.rows[0].elements[0].distance.text; // we need a foreach for rows as to sum the distances
        });
    }
  },
  mounted() {
    new google.maps.places.Autocomplete(this.$refs.from, {
      componentRestrictions: { country: "ar" }
    }); // restrict to argentina
    new google.maps.places.Autocomplete(this.$refs.to, {
      componentRestrictions: { country: "ar" }
    }); // restrict to argentina
  }
};
</script>