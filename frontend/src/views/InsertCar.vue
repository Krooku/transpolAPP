<template>
  <div>
    <div class="text">
      Dodaj samochód do wypożyczalni
    </div>

    <div class="form_container">
      <form
        method="post"
        @submit.prevent="insertCar"
      >
        <input
          v-model="car.band"
          type="text"
          placeholder="Marka Samochodu"
          required
        >
        <input
          v-model="car.model"
          type="text"
          placeholder="Model samochodu"
          required
        >
        <input
          v-model="car.registrationNumber"
          type="text"
          placeholder="Numer rejestracyjny"
          required
        >
        <input
          v-model="car.vim"
          type="text"
          placeholder="Numer VIM"
          required
        >
        <input
          v-model="car.mileage"
          type="number"
          placeholder="Przebieg"
          required
        >
        <input
          v-model="car.fuel"
          type="number"
          min="0"
          max="100"
          placeholder="Stan paliwa"
          required
        >
        <p> Stan auta </p>
        <input
          v-model="car.isClean"
          type="radio"
          value="true"
        >
        <label for="true">Czyste</label>
        <input
          v-model="car.isClean"
          type="radio"
          value="false"
        >
        <label for="false">Brudne</label>
        <select v-model="car.klasa">
          <option
            value="A"
            selected
          >
            Klasa: A
          </option>
          <option value="B">
            Klasa: B
          </option>
          <option value="C">
            Klasa: C
          </option>
          <option value="D">
            Klasa: D
          </option>
          <option value="SUV">
            Klasa: SUV
          </option>
        </select>
        <select v-model="car.role">
          <option
            value="avaiable"
            selected
          >
            Dostępny
          </option>
          <option value="rent">
            Wypożyczony
          </option>
          <option value="transport">
            Transport
          </option>
        </select>
        <div>
          <select
            v-if="allCarCosts.length != 0"
            v-model="car.carCostsId"
          >
            <option
              selected
              disabled
            >
              Wybierz
            </option>
            <option
              v-for="carCost in allCarCosts"
              :key="carCost._id"
              :value="carCost._id"
            >
              {{ carCost.name }}
            </option>
          </select>
          <div
            @click="insertCostModal = !insertCostModal"
          >
            Dodaj nowe
          </div>
        </div>
        <div
          v-if="error"
          class="message message--error"
        >
          {{ message }}
        </div>
        <div
          v-else-if="!error"
          class="message message--success"
        >
          {{ message }}
        </div>
        <button type="submit">
          Dodaj
        </button>
      </form>
    </div>
    <basic-modal
      v-if="insertCostModal"
      @close="insertCostModal = false"
    >
      <form
        style="max-width: 700px; background-color: while;"
        @submit.prevent="insertCarCosts"
      >
        <p class="beforeInput">
          Nazwa
        </p>
        <input
          v-model="carCosts.name"
          class="responsive__input"
          type="text"
          placeholder="Nazwa kosztów"
          maxlength="32"
          required
        >
        <p> Każda dodadkowa doba </p>
        <input
          v-model="carCosts.additionalDay"
          class="responsive__input"
          type="number"
          placeholder="Dodadkowa doba cena"
          min="0"
          required
        >
        <p class="beforeInput">
          Podstawienie/Odbiór
        </p>
        <input
          v-model="carCosts.transportCity"
          class="responsive__input"
          type="number"
          placeholder="w mieście"
          min="0"
          required
        >
        <input
          v-model="carCosts.transportOutCity"
          class="responsive__input"
          type="number"
          placeholder="poza miastem"
          min="0"
        >
        <p class="beforeInput">
          CDW(kolizja)
        </p>
        <input
          v-model="carCosts.CDW"
          class="responsive__input"
          type="number"
          placeholder="CDW"
          min="0"
          required
        >
        <p class="beforeInput">
          TW(kradież)
        </p>
        <input
          v-model="carCosts.TW"
          class="responsive__input"
          type="number"
          placeholder="TW"
          min="0"
          required
        >
        <p class="beforeInput">
          Paliwo  /litr
        </p>
        <input
          v-model="carCosts.fuel"
          class="responsive__input"
          type="number"
          placeholder="paliwo"
          min="0"
          required
        >
        <p class="beforeInput">
          Wynajem/zwrot poza godzinami pracy
        </p>
        <input
          v-model="carCosts.transportOutWork"
          class="responsive__input"
          type="number"
          placeholder="transport poza godzinami pracy"
          min="0"
          required
        >
        <p class="beforeInput">
          Czyszczenie auta
        </p>
        <input
          v-model="carCosts.cleaning"
          class="responsive__input"
          type="number"
          placeholder="czyszczenie auta"
          min="0"
          required
        >
        <p class="beforeInput">
          Zakaz palenia
        </p>
        <input
          v-model="carCosts.noSmoking"
          class="responsive__input"
          type="number"
          placeholder="zakaz palenia"
          min="0"
          required
        >
        <button
          class="submit-btn__center"
          type="submit"
        >
          Dodaj
        </button>
      </form>
    </basic-modal>
  </div>
</template>

<script>

import api from '../api'
import BasicModal from '../components/BasicModal'

export default {
  components: {
    BasicModal
  },
  data () {
    return {
      error: null,
      message: null,
      car: {
        band: '',
        model: '',
        registrationNumber: '',
        klasa: 'A',
        role: 'avaiable',
        vim: '',
        mileage: 0,
        fuel: 100,
        isClean: true,
        carCostsId: ''
      },
      allCarCosts: [],
      carCosts: {
        name: '',
        additionalDay: null,
        transportCity: null,
        transportOutCity: null,
        CDW: null,
        TW: null,
        fuel: null,
        transportOutWork: null,
        cleaning: null,
        noSmoking: null
      },
      insertCostModal: false
    }
  },
  async beforeRouteEnter (to, from, next) {
    const allCarCosts = await api.listCarCosts(to.params.carId)

    if (allCarCosts.status !== 200) {
      return next({ name: 'homepage' })
    }
    next(vm => {
      Object.assign(vm.allCarCosts, allCarCosts.data) // ?
      vm.allCarCosts = allCarCosts.data
      if (vm.allCarCosts.length() > 0) {
        vm.car.carCostsId = vm.allCarCosts[0]._id
      }
    })
  },
  methods: {
    async insertCar () {
      const response = await api.insertCar(this.car)

      if (response.status !== 200) {
        this.error = true
        this.message = response.data.message
      } else {
        this.error = false
        this.message = 'Samochód został dodany'
      }
    },
    async insertCarCosts () {
      const response = await api.insertCarCosts(this.carCosts)

      if (response.status !== 200) {
        this.error = true
        this.message = response.data.message
      } else {
        this.error = false
        this.message = 'Koszta obciążeniowe zostały dodane do listy'
      }
    }
  }
}
</script>

<style lang="scss">

.text {
  font-size: 15px;
  margin: 10px 0;
  text-align: center;
}

.form_container {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  input {
    width: 294px;
    display: block;
    border: none;
    padding: 10px 3px;
    margin: 10px auto;
  }

  select {
    width: 250px;
    display: block;
    border: none;
    padding: 10px 3px;
    margin: 10px auto;
    cursor: pointer;
  }

  button {
    width: 300px;
    display: block;
    border: none;
    padding: 10px 3px;
    margin: 10px auto;
    cursor: pointer;
    background-color: #fff;
  }

  .message {
    text-align: center;
    font-size: 24px;

    &--success {
      color: green;
    }

    &--warn {
      color: orange;
    }

    &--error {
      color: red;
    }
  }
}

</style>
