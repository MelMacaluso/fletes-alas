<template>
    <div class="container mx-auto">
      <div class="relative max-w-sm mx-auto h-128">
        <transition name="fade">
            <form v-show="!submitted" @submit.prevent="sendNotification">
                <div class="flex flex-wrap -mx-4">
                    <div class="relative w-1/2 px-2 mt-4">
                        <input v-validate="'required|alpha_spaces'" name="name" autocomplete='name' type="text" placeholder="Nombre" :class="[ 'w-full border rounded p-5', errors.has('name') ? 'border-red active:border-red focus:border-red bg-red-lightest' : 'border-grey-dark' ]" v-model="name">
                        <transition name="fade">
                            <span class="absolute pin-t pin-l ml-4 mt-1 text-xs text-red-light" v-if="errors.has('name')">Corrige tu nombre</span>
                        </transition>
                    </div>
                    <div class="relative w-1/2 px-2 mt-4">
                        <input v-validate="'required|numeric|min:6|max:14'" name="tel" autocomplete='tel' type="text" placeholder="Telefono/Mobil" :class="[ 'w-full border rounded p-5', errors.has('tel') ? 'border-red active:border-red focus:border-red bg-red-lightest' : 'border-grey-dark' ]" v-model="tel">
                        <transition name="fade">
                            <span class="absolute pin-t pin-l ml-4 mt-1 text-xs text-red-light" v-if="errors.has('tel')">Corrige tu telefono:</span>
                        </transition>
                    </div>
                    <div class="relative w-1/2 px-2 mt-4">
                        <input ref="from" name="address" autocomplete='street-address' type="text" placeholder="Desde" class="w-full border rounded p-5 border-grey-dark">
                    </div>
                    <div class="relative w-1/2 px-2 mt-4">
                        <input ref="to" name="address" autocomplete='street-address' type="text" placeholder="Hasta" class="w-full border rounded p-5 border-grey-dark">
                    </div>
                    <div class="relative w-1/2 px-2 mt-4">
                        <input v-validate="'email'" name="email" autocomplete='email' type="email" placeholder="Email" :class="[ 'w-full border rounded p-5', errors.has('email') ? 'border-red active:border-red focus:border-red bg-red-lightest' : 'border-grey-dark' ]" v-model="email">
                        <transition name="fade">
                            <span class="absolute pin-t pin-l ml-4 mt-1 text-xs text-red-light" v-if="errors.has('email')">Corrige tu email</span>
                        </transition>
                    </div>
                    <div class="w-1/2 px-2 mt-4">
                        <flat-pickr v-model="date" :config="config" class="w-full border border-grey-dark rounded p-5" placeholder="Fecha y hora"></flat-pickr>
                    </div>
                </div>
                <div class="flex flex-col -mx-4">
                    <div class="w-full px-2">
                        <textarea placeholder="Cuéntenos sobre su mudanza y preferencias." class="w-full mt-4 border border-grey-dark rounded mb-4 p-5 min-h-32" v-model="enquiry"></textarea>
                    </div>
                </div>
                <div class="flex flex-col -mx-4">
                    <div class="w-full px-2 text-center">
                      <input type="submit" value="Pide un Flete" :class="['w-full max-w-xxs px-4 py-4 text-white shadow hover:shadow-lg rounded bg-animated', errors.any() ? 'bg-grey-dark cursor-not-allowed' : 'bg-blue cursor-pointer']" :disabled="errors.any()" @click.prevent="sendNotification">
                  </div>
              </div>
          </form>
        </transition>
        <transition name="fade">
          <div v-show="submitted" class="absolute pin m-auto flex flex-col justify-center text-center">
            <p class="bg-white text-lg text-black rounded shadow-lg px-2 py-4">Gracias, un fletero te va a contactar al mas pronto para organisar tu mudanza.</p>
              <div ref="animationWrapper" class="flex flex-col justify-end relative h-32 mb-4 border-b overflow-hidden fading-out">
                  <div ref="envelope" class="absolute sliding pb-8" style="left:0;">
                      <i class="fas fa-envelope text-orange-light text-5xl text-shadow"></i>
                  </div>
                  <div ref="truck" class="absolute sliding" style="left:33%;">
                      <i class="fas fa-truck text-white text-10xl text-shadow"></i>
                  </div>
              </div>
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

import uuidv1 from "uuid/v1";

export default {
  data: () => ({
    submitted: false,
    name: "",
    tel: "",
    email: "",
    enquiry: "",
    date: null,
    config: {
      altFormat: "M j, Y h i K",
      altInput: true,
      dateFormat: "Y-m-d H:i",
      enableTime: true
    }
  }),
  components: {
    flatPickr
  },
  methods: {
    envelopeTruckAnimation() {
      setTimeout(() => {
        this.$refs.envelope.style.left = "calc(33% + 0.75em)";
      }, 500);
      setTimeout(() => {
        this.$refs.envelope.style.left = "150%";
        this.$refs.truck.style.left = "150%";
      }, 2750);
      setTimeout(() => {
        this.$refs.animationWrapper.classList.remove("border-white");
        this.$refs.animationWrapper.classList.add("border-transparent");
      }, 3000);
    },
    OneAdayMaxSubmissions() {
      document.cookie = "sentNotification=; max-age=86400;";
    },
    sendSMS() {
      console.log("sms Sent");
      //   axios
      //     .post("/sendSMS", {
      //       name: this.name,
      //       //email: this.email,
      //       enquiry: this.enquiry,
      //       tel: this.tel,
      //       from: this.$refs.from.value,
      //       to: this.$refs.to.value,
      //       date: this.date
      //     })
      //     .then(function(response) {
      //       console.log(response);
      //     })
      //     .catch(function(error) {
      //       console.log(error);
      //     });
    },
    sendToPipedrive() {
        let [date, time] = this.date.split(' ');
        axios
        .post("/sendSMS", {
            "title": `${this.name}`,
            "47947b83d91c37b34015d1bfa07bb8a650a952eb": `${date}`, // Date of moving, Fecha mudanza 
            "6ef593f2be5ac7ade9d88f7449d64cf2ef47b2c6": `${time}`, // Time of moving, Hora mudanza
            "73fa7c56b03517b77043a7f6debb789d1b966a32": `${this.tel}`, // Telefono
            "c58a9448026b1bdf0d59cab244c42cdd053c9ae4": `${this.$refs.from.value}`, // desde
            "2b08c44ec10ccc9510be9fd8d0df7674a2eed251": `${this.$refs.to.value}`, // hasta
            "dc60267b256501217f31455115ebb55a577a7dd2": `${uuidv1()}` // Booking reference
        })
    },
    sendNotification() {
        
      if (this.name != "") {
        // name is required so that'd do
        this.submitted = !this.submitted;
        if (document.cookie.indexOf("sentNotification=") === -1) {
          this.sendSMS();
        }
        this.sendToPipedrive();
        this.OneAdayMaxSubmissions();
        this.envelopeTruckAnimation();
      }
    }
  },
  mounted() {
    console.log(uuidv1());
    new google.maps.places.Autocomplete(this.$refs.from, {
      componentRestrictions: { country: "ar" }
    }); // restrict to argentina
    new google.maps.places.Autocomplete(this.$refs.to, {
      componentRestrictions: { country: "ar" }
    }); // restrict to argentina
  }
};
</script>