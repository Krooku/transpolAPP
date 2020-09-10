<template>
  <div class="homepage">
    <p> Auta do wynajmu </p>
    <select
      v-model="role"
      class="type"
      @change="onChange()"
    >
      <option
        value="all"
        selected
      >
        Wszystkie
      </option>
      <option value="avaiable">
        Dostępne
      </option>
      <option value="rent">
        Wynajęte
      </option>
    </select>

    <select
      v-model="klasa"
      class="type"
      @change="onChange()"
    >
      <option
        value="all"
        selected
      >
        Wszystkie klasy
      </option>
      <option value="A">
        A
      </option>
      <option value="B">
        B
      </option>
      <option value="C">
        C
      </option>
      <option value="D">
        D
      </option>
      <option value="SUV">
        SUV
      </option>
    </select>

    <p> Liczba aut: {{ selected_cars.length }} </p>

    <div class="grid_container">
      <carousel
        :per-page="2"
        :mouse-drag="true"
        :touch-drag="true"
      >
        <slide
          v-for="car in selected_cars"
          :key="car._id"
        >
          <div
            class="car_tile"
          >
            <p class="car_model">
              {{ car.band }} {{ car.model }}
            </p>
            <div class="car_model">
              {{ car.registrationNumber }}
            </div>
            <div class="car_model">
              {{ car.type }}
            </div>
            <div
              v-if="car.role=='rent' || car.role=='transport'"
              class="car_model"
            >
              Od {{ formatDate(car.errandId.rent.date) }}<br>
              Do {{ formatDate(car.errandId.rent.planningDate) }}
            </div>
            <div
              v-else
              class="car_model"
            >
              Gryfice
            </div>
            <div
              v-if="car.role=='avaiable'"
              class="car_model car_model--avaiable"
            >
              Dostępny
            </div>
            <div
              v-else-if="car.role=='rent'"
              class="car_model car_model--rent"
            >
              Wynajęty
            </div>
            <div
              v-else
              class="car_model car_model--transport"
            >
              Transport osób
            </div>
            <div
              v-if="car.role=='avaiable'"
              class="car_model"
            >
              <router-link :to="{ name: 'rent', params: { carId: car._id }}">
                Wynajmij
              </router-link>
            </div>
            <div
              v-else-if="car.role=='rent' || car.role=='transport'"
              class="car_model"
            >
              <router-link
                :to="{ name: 'return', params: { errandId: car.errandId._id }}"
              >
                Zwróć
              </router-link>
            </div>
            <div
              class="car_model"
            >
              <router-link :to="{ name: 'details', params: { carId: car._id }}">
                Szczegóły
              </router-link>
            </div>
          </div>
        </slide>
      </carousel>
    </div>
  </div>
</template>

<script>
import api from '../api'
// import Vuetify from 'vuetify/lib'
import { Carousel, Slide } from 'vue-carousel'

export default {
  // vuetify: new Vuetify(),
  name: 'Homepage',
  components: {
    Carousel,
    Slide
  },
  data () {
    return {
      cars: [],
      selected_cars: [],
      selected: 0,
      role: 'all',
      klasa: 'all',
      checkbox: true,
      radioGroup: 1,
      switch1: true,
      message: 'none',
      error: false
    }
  },
  async beforeRouteEnter (to, from, next) {
    const response = await api.listCars()
    next(vm => {
      vm.cars = response.data
      vm.selected_cars = response.data
      // alert(vm.cars[0].scratchs)
      // alert(Array.isArray(vm.cars[0].scratchs))
      // alert(JSON.stringify(vm.cars[0].scratchs))
    })
  },
  computed: {
    getRole () {
      return this.$store.getters.role
    }
  },
  async mounted () {
  },
  methods: {
    onChange () {
      this.selected_cars = this.cars
      if (this.role === 'avaiable') {
        this.selected_cars = this.cars.filter(car => car.role === 'avaiable')
      } else if (this.role === 'rent') {
        this.selected_cars = this.cars.filter(car => (car.role === 'rent') || (car.role === 'transport'))
      }
      switch (this.klasa) {
        case 'A':
          this.selected_cars = this.selected_cars.filter(car => car.type === 'A')
          break
        case 'B':
          this.selected_cars = this.selected_cars.filter(car => car.type === 'B')
          break
        case 'C':
          this.selected_cars = this.selected_cars.filter(car => car.type === 'C')
          break
        case 'D':
          this.selected_cars = this.selected_cars.filter(car => car.type === 'D')
          break
        case 'SUV':
          this.selected_cars = this.selected_cars.filter(car => car.type === 'SUV')
          break
      }
    },
    getTypedCars () {
      switch (this.selected) {
        case '0':
          this.selected_cars = this.cars
          break
        case '1':
          this.selected_cars = this.cars.filter(car => car.role === 'avaiable')
          break
        case '2':
          this.selected_cars = this.cars.filter(car => (car.role === 'rent') || (car.role === 'transport'))
          break
        default:
          this.selected_cars = this.cars
      }
    },
    formatDate (date) {
      var d = new Date(date)
      d.setDate(d.getDate())
      var month = '' + (d.getMonth() + 1)
      var day = '' + d.getDate()
      var year = d.getFullYear()

      var hours = d.getHours()
      var minutes = d.getMinutes()

      if (hours < 10) {
        hours = '0' + hours
      }
      if (minutes < 10) {
        minutes = '0' + minutes
      }

      if (month.length < 2) { month = '0' + month }
      if (day.length < 2) { day = '0' + day }

      return [year, month, day].join('-') + ' ' + hours + ':' + minutes
    }
  }
}
</script>

<style lang="scss">
.button {
  cursor: pointer;
  width: 200px;
  padding: 14px;
  margin: 14px auto;
  border: solid black 4px;
  text-align: center;
  background-color: white;
}

.button:hover {
  background-color: #eee;
}

.homepage {
  text-align: center;
}

.type {
  cursor: pointer;
  // margin-top: 15px;
  width: 200px;
  border-radius: 5px;
  padding: 6px;
}

.check {
  text-align: center;
  max-width: 1300px;
  margin: 14px auto;

  .checkmark {
    padding: 20px;
    margin: 0 8px;
  }
}

.grid_container {
  font-size: 24px;
  color: white;
  margin: 10px auto;
  // display: flex;
  // flex-direction: row;
  // flex-wrap: wrap;
  // justify-content: center;
  max-width: 1400px;
  text-align: center;

  .car_tile {
    display: block;
    background-color: #43332e;
    width: 300px;
    border: solid black 2px;
    margin: 5px;
    padding: 4px;
    margin-left: auto;
    margin-right: auto;

    .car_model {
      text-align: center;
      border-bottom: solid black 2px;
      margin: 0;
      padding: 4px;

      a {
        color: white;
      }

      a:hover {
        color: rgb(170, 158, 158);
      }

      &--avaiable {
        // text-decoration: none;
        color: green !important;
      }

      &--avaiable:hover {
        color: rgb(42, 233, 42);
      }

      &--transport {
        color: orange;
      }

      &--rent {
        color: red;
      }
    }

    .car_model:last-child {
      border-bottom: none;
    }
  }
}

.fade-enter-active {
  transition: opacity 2.5s;
}

.fade-leave-active {
  transition: opacity 1.5s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
