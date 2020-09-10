<template>
  <div>
    <div class="car-info">
      <p> {{ car.model }} {{ car.band }} </p>
      <p> {{ car.registrationNumber }} </p>
      <p> {{ car.type }} </p>
    </div>
    <p class="main-title">
      Wprowadź niezbędne dane do stworzenia umowy najmu
    </p>

    <carousel
      :value="page"
      :per-page="1"
      :navigate-to="[page, true]"
      :pagination-enabled="false"
      :mouse-drag="false"
      :touch-drag="false"
    >
      <slide>
        <form
          :class="[(page==0) ? activeClass : '', hiddenClass]"
          @submit.prevent="page=1"
        >
          <h3 class="title">
            Umowa najmu
          </h3>
          <input-label
            v-model="errandNumber"
            :label-text="'Nazwa/numer zlecenia'"
            :maxlength="24"
          />
          <button
            class="btn"
            type="submit"
          >
            Rozpocznij
          </button>
        </form>
      </slide>
      <slide>
        <form
          :class="[(page==1) ? activeClass : '', hiddenClass]"
          @submit.prevent="page=2"
        >
          <p class="fas fa-user" />
          <input-label
            v-model="client.fullname"
            :label-text="'Imię i nazwisko najemcy'"
            :maxlength="32"
          />
          <div class="date-box">
            <span class="content-name">
              Data urodzenia
            </span>
            <date-picker
              v-model="client.birthDate"
              class="date"
              value-type="format"
              placeholder="Data urodzenia"
              required
            />
          </div>
          <input-label
            v-model="client.birthPlace"
            :label-text="'Miejsce urodzenia'"
            :maxlength="32"
          />
          <div class="button-container">
            <button
              class="btn"
              type="button"
              @click="page=0"
            >
              Wróć
            </button>
            <button
              class="btn"
              type="submit"
            >
              Dalej
            </button>
          </div>
        </form>
      </slide>
      <slide>
        <form
          :class="[(page==2) ? activeClass : '', hiddenClass]"
          @submit.prevent="page=3"
        >
          <p class="fas fa-car" />
          <input-label
            v-model="client.driveLicense.number"
            :label-text="'Numer prawa jazdy'"
            :maxlength="32"
          />

          <div class="date-box">
            <span class="content-name">
              Data wydania
            </span>
            <date-picker
              v-model="client.driveLicense.releaseDate"
              class="date"
              value-type="format"
              placeholder="Data wydania"
              required
            />
          </div>
          <input-label
            v-model="client.driveLicense.releasePlace"
            :label-text="'Miejsce wydania'"
            :maxlength="32"
          />
          <div class="button-container">
            <button
              class="btn"
              type="button"
              @click="page=1"
            >
              Wróć
            </button>
            <button
              class="btn"
              type="submit"
            >
              Dalej
            </button>
          </div>
        </form>
      </slide>
      <slide>
        <form
          :class="[(page==3) ? activeClass : '', hiddenClass]"
          @submit.prevent="page=4"
        >
          <p class="fas fa-id-card" />
          <input-label
            v-model="client.idCard.number"
            :label-text="'Numer dowodu tożsamości'"
            :maxlength="32"
          />

          <div class="date-box">
            <span class="content-name">
              Data ważności
            </span>
            <date-picker
              v-model="client.idCard.expDate"
              class="date"
              value-type="format"
              placeholder="Data ważności"
              required
            />
          </div>
          <input-label
            v-model="client.idCard.releasePlace"
            :label-text="'Miejsce wydania'"
            :maxlength="32"
          />
          <div class="button-container">
            <button
              class="btn"
              type="button"
              @click="page=2"
            >
              Wróć
            </button>
            <button
              class="btn"
              type="submit"
            >
              Dalej
            </button>
          </div>
        </form>
      </slide>
      <slide>
        <form
          :class="[(page==4) ? activeClass : '', hiddenClass]"
          @submit.prevent="page=5"
        >
          <p class="fas fa-mobile-alt" />
          <input-label
            v-model="client.contact.zipCode"
            :label-text="'Kod pocztowy'"
            :maxlength="32"
          />

          <input-label
            v-model="client.contact.city"
            :label-text="'Miasto'"
            :maxlength="32"
          />
          <input-label
            v-model="client.contact.street"
            :label-text="'Ulica'"
            :maxlength="32"
          />
          <input-label
            v-model="client.contact.phone"
            :label-text="'Numer telefonu komórkowego'"
            :maxlength="32"
          />
          <div class="button-container">
            <button
              class="btn"
              type="button"
              @click="page=3"
            >
              Wróć
            </button>
            <button
              class="btn"
              type="submit"
            >
              Dalej
            </button>
          </div>
        </form>
      </slide>
      <slide>
        <form
          :class="[(page==5) ? activeClass : '', hiddenClass]"
          @submit.prevent="function(){page=6; rent.planningDate = formatDate(vm.insuranceCosts.maxRentDays)}"
        >
          <h3 class="title">
            Koszty, których pokrycie gwarantowane jest przez zleceniodawcę.
          </h3>
          <input-label
            v-model="insuranceCosts.rentDays"
            :label-text="'Dni wynajmu'"
            :is-text="false"
          />
          <input-label
            v-model="insuranceCosts.maxRentDays"
            :label-text="'Maks dni wynajmu'"
            :is-text="false"
          />
          <input-label
            v-model="insuranceCosts.carClass"
            :label-text="'Klasa samochodu'"
          />
          <div class="radio-input">
            <p class="content-name">
              Podstawienie pojazdu
            </p>
            <div class="input-container">
              <div class="input-label">
                <input
                  v-model="insuranceCosts.carSubstitution"
                  type="radio"
                  value="true"
                >
                <label for="true">Tak</label>
              </div>
              <div class="input-label">
                <input
                  v-model="insuranceCosts.carSubstitution"
                  type="radio"
                  value="false"
                >
                <label for="false">Nie</label>
              </div>
            </div>
          </div>
          <div class="radio-input">
            <p class="content-name">
              Odbiór pojazdu
            </p>
            <div class="input-container">
              <div class="input-label">
                <input
                  v-model="insuranceCosts.carReturn"
                  type="radio"
                  value="true"
                >
                <label for="true">Tak</label>
              </div>
              <div class="input-label">
                <input
                  v-model="insuranceCosts.carReturn"
                  type="radio"
                  value="false"
                >
                <label for="false">Nie</label>
              </div>
            </div>
          </div>
          <div class="radio-input">
            <p class="content-name">
              Udział własny CDW(kolizja)
            </p>
            <div class="input-container">
              <div class="input-label">
                <input
                  v-model="insuranceCosts.CDW"
                  type="radio"
                  value="true"
                >
                <label for="true">Tak</label>
              </div>
              <div class="input-label">
                <input
                  v-model="insuranceCosts.CDW"
                  type="radio"
                  value="false"
                >
                <label for="false">Nie</label>
              </div>
            </div>
          </div>
          <div class="radio-input">
            <p class="content-name">
              Udział własny TW(kradzież)
            </p>
            <div class="input-container">
              <div class="input-label">
                <input
                  v-model="insuranceCosts.TW"
                  type="radio"
                  value="true"
                >
                <label for="true">Tak</label>
              </div>
              <div class="input-label">
                <input
                  v-model="insuranceCosts.TW"
                  type="radio"
                  value="false"
                >
                <label for="false">Nie</label>
              </div>
            </div>
          </div>
          <div class="radio-input">
            <p class="content-name">
              Kaucja
            </p>
            <div class="input-container">
              <div class="input-label">
                <input
                  v-model="insuranceCosts.deposit"
                  type="radio"
                  value="true"
                >
                <label for="true">Tak</label>
              </div>
              <div class="input-label">
                <input
                  v-model="insuranceCosts.deposit"
                  type="radio"
                  value="false"
                >
                <label for="false">Nie</label>
              </div>
            </div>
          </div>
          <div class="radio-input">
            <p class="content-name">
              Brak limitu km
            </p>
            <div class="input-container">
              <div class="input-label">
                <input
                  v-model="insuranceCosts.noKmLimit"
                  type="radio"
                  value="true"
                >
                <label for="true">Tak</label>
              </div>
              <div class="input-label">
                <input
                  v-model="insuranceCosts.noKmLimit"
                  type="radio"
                  value="false"
                >
                <label for="false">Nie</label>
              </div>
            </div>
          </div>
          <input-label
            v-model="insuranceCosts.other"
            :label-text="'Inne'"
          />
          <div class="button-container">
            <button
              class="btn"
              type="button"
              @click="page=4"
            >
              Wróć
            </button>
            <button
              class="btn"
              type="submit"
            >
              Dalej
            </button>
          </div>
        </form>
      </slide>
      <slide>
        <form
          :class="[(page==6) ? activeClass : '', hiddenClass]"
          @submit.prevent="page=7"
        >
          <h3 class="title">
            Koszty, jakimi może zostać obciążony najemca(W PLN NETTO).
          </h3>
          <input-label
            v-model="carCost.additionalDay"
            :label-text="'Cena za każdą dodatkową dobę'"
            :min="0"
            :is-text="false"
          />

          <input-label
            v-model="carCost.transportCity"
            :label-text="'Podstawienie/odbiór w mieście'"
            :min="0"
            :is-text="false"
          />
          <input-label
            v-model="carCost.transportOutCity"
            :label-text="'Podstawienie/odbiór poza miastem'"
            :min="0"
            :is-text="false"
          />
          <input-label
            v-model="carCost.CDW"
            :label-text="'Udział własny CDW(kolizja)'"
            :min="0"
            :is-text="false"
          />
          <input-label
            v-model="carCost.TW"
            :label-text="'Udział własny TW(kradzież)'"
            :min="0"
            :is-text="false"
          />
          <input-label
            v-model="carCost.fuel"
            :label-text="'Uzupełnienie paliwa'"
            :min="0"
            :is-text="false"
          />
          <input-label
            v-model="carCost.transportOutWork"
            :label-text="'Wynajem/zwrot poza godz. pracy'"
            :min="0"
            :is-text="false"
          />
          <input-label
            v-model="carCost.cleaning"
            :label-text="'Czyszczenie auta'"
            :min="0"
            :is-text="false"
          />
          <input-label
            v-model="carCost.noSmoking"
            :label-text="'Zakaz palenia'"
            :min="0"
            :is-text="false"
          />
          <div class="button-container">
            <button
              class="btn"
              type="button"
              @click="page=5"
            >
              Wróć
            </button>
            <button
              class="btn"
              type="submit"
            >
              Dalej
            </button>
          </div>
        </form>
      </slide>
      <slide>
        <form
          :class="[(page==7) ? activeClass : '', hiddenClass]"
          @submit.prevent="page=8"
        >
          <h3 class="title">
            Informacje dot. wynajmu pojazdu.
          </h3>
          <input-label
            v-model="rent.place"
            :label-text="'Miejsce wynajmu'"
            :maxlength="32"
          />
          <div class="date-box">
            <span class="content-name">
              Data wynajmu
            </span>
            <date-picker
              v-model="rent.date"
              class="date"
              value-type="format"
              :placeholder="rent.date"
              required
            />
          </div>

          <div class="date-box">
            <span class="content-name">
              Godzina wynajmu
            </span>
            <date-picker
              v-model="rentTime"
              class="date"
              :minute-step="1"
              :hour-options="hours"
              format="HH:mm"
              value-type="format"
              type="time"
              :placeholder="rentTime"
            />
          </div>

          <input-label
            v-model="rent.planningReturnPlace"
            :label-text="'Planowane miejsce zwrotu'"
            :maxlength="32"
          />
          <div class="date-box">
            <span class="content-name">
              Planowana data wynajmu
            </span>
            <date-picker
              v-model="rent.planningDate"
              class="date"
              value-type="format"
              :placeholder="rent.planningDate"
              required
            />
          </div>

          <div class="date-box">
            <span class="content-name">
              Planowana godzina zwrotu
            </span>
            <date-picker
              v-model="returnTime"
              class="date"
              :minute-step="1"
              :hour-options="hours"
              format="HH:mm"
              value-type="format"
              type="time"
              :placeholder="returnTime"
            />
          </div>
          <input-label
            v-model="rent.deposit"
            :label-text="'Kaucja'"
            :is-text="false"
          />
          <select
            v-model="role"
            class="type"
            required
          >
            <option
              value="rent"
              selected
            >
              Wynajem
            </option>
            <option value="transport">
              Transport
            </option>
          </select>
          <div class="button-container">
            <button
              class="btn"
              type="button"
              @click="page=6"
            >
              Wróć
            </button>
            <button
              class="btn"
              type="submit"
            >
              Dalej
            </button>
          </div>
        </form>
      </slide>
      <slide>
        <form
          :class="[(page==8) ? activeClass : '', hiddenClass]"
          @submit.prevent="insertErrand()"
        >
          <h3 class="title">
            Podsumowanie.
          </h3>
          <p> Czy chcesz dodać dodatkowego kierowcę? </p>
          <p> TAK NIE(TODO) </p>

          <p> Proszę sprawdzić poprawność wprowadzonych danych przemieszczając się po poszczególnych etapach tworzenia umowy najmu.</p>
          <p> Użyj do tego przycisku wróc lub używaj kropek poniżej, które przemieszczą Cię w dowolnie wybrany etap.</p>
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
          <button
            class="btn"
            type="button"
            @click="sigantureModal=!sigantureModal"
          >
            Podpis najemcy
          </button>
          <div class="button-container">
            <button
              class="btn"
              type="button"
              @click="page=7"
            >
              Wróć
            </button>
            <button
              class="btn"
              type="submit"
            >
              Zakończ
            </button>
          </div>
        </form>
      </slide>
    </carousel>

    <basic-modal
      v-if="sigantureModal"
      @close="save"
    >
      <div
        style="max-width: 700px; max-height: 80vh; background-color: while;"
      >
        <p> Potwierdzam, że zapoznałem się z warunkami najmu oraz z danymi podanymi do aplikacji i regulaminem, znajdującym się w odnośniku lub w fizycznej wersji podanej przez pracownika firmy TRANS-POL. </p>
        <p> Potwierdzam, że zobowiązuję się do zwrotu pojazdu w miejscu i czasie określonym warunkami, które zostały podane/wprowadzone/wysłane przy mnie lub na wyraźne żądanie Zleceniodawcy wynajmu i/lub Firmy TRANS-POL. </p>
        <p> Ewentualne przedłużenie wynajmu wymaga akceptacji ze strony Firmy TRANS-POL i wiąże się z dodatkowymi kosztami, wyszczególnionymi w etapie "Koszty, jakmimi może zostać obciążony najemca". </p>
        <p> Przyjmuję do wiadmości, że niezastosowanie się do zasad i zobowiązań będzie skutkowało powiadomieniem organów ścigania. </p>
        <p> TRANS-POL nie wyraża zgody na wyjazd pojazdu poza granice Polski </p>

        <p> Wyrażam zgodę na przetwarzanie moich danych osobowych Zgoda na przetwarzanie danych osobowych zgodnie z art. 13 ust. 1-2 rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z 27.04.2016 r. w sprawie ochrony osób w sprawie swobodnego przepływu takich danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie danych) (Dz.U UE L 119, s. 1) - dalej RODO. </p>
        <p> Podpis klienta </p>
        <VueSignaturePad
          id="signature"
          ref="signaturePad"
          width="300px"
          height="300px"
          :options="options"
        />
        <button
          class="btn btn-outline-secondary"
          @click="undo"
        >
          Undo
        </button>
        <div v-if="signatureIMG">
          <p> aktualnie podany podpis </p>
          <img
            :src="signatureIMG"
          >
        </div>
      </div>
    </basic-modal>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import BasicModal from '../components/BasicModal'
import InputLabel from '../components/InputLabel'
// import VueSignature from 'vue-signature-pad'
// import SignaturePad from 'signature-pad'
import { Carousel, Slide } from 'vue-carousel'
import api from '../api'

export default {
  components: {
    DatePicker,
    BasicModal,
    InputLabel,
    Carousel,
    Slide
  },
  data () {
    return {
      activeClass: 'form-container',
      hiddenClass: 'hidden',
      page: 0,
      stage: 0,
      errandNumber: '',
      editModal: false,
      carId: this.$route.params.carId,
      car: {},
      time1: null,
      time2: null,
      time3: null,
      cars: [],
      role: 'rent',
      error: null,
      getWindowWidth: 0,
      options: {
        penColor: '#c0f'
      },
      signatureIMG: null,
      client: {
        fullname: '',
        birthDate: null,
        birthPlace: '',
        driveLicense: {
          number: '',
          releaseDate: '',
          releasePlace: ''
        },
        idCard: {
          number: '',
          expDate: null,
          releasePlace: ''
        },
        contact: {
          zipCode: '',
          city: '',
          street: '',
          phone: ''
        }
      },
      additionalDriver: {
        fullname: '',
        birthDate: null,
        driveLicense: {
          number: '',
          releaseDate: null,
          releasePlace: ''
        }
      },
      insuranceCosts: {
        rentDays: 1,
        maxRentDays: 1,
        carClass: '',
        carSubstitution: true,
        carReturn: true, // odbiór
        CDW: false,
        TW: false,
        deposit: false, // kaucja
        noKmLimit: false,
        other: ''
      },
      carCost: { // to wziecia z samochodu ???
        additionalDay: 150,
        transportCity: 1,
        transportOutCity: 10,
        CDW: 2000,
        TW: 2000,
        fuel: 5,
        transportOutWork: 10,
        cleaning: 150,
        noSmoking: 500
      },
      rent: {
        place: '',
        date: null,
        mileage: null, // do pobrania z carobj
        fuel: null, // do pobrania z carobj
        planningDate: null,
        planningReturnPlace: '',
        deposit: null,
        scratchs: [], // do pobrania z carobj
        signature: null
      },
      rentTime: null,
      returnTime: null,
      isSignature: false,
      sigantureModal: false
    }
  },
  async beforeRouteEnter (to, from, next) {
    const car = await api.getCar(to.params.carId)

    if (car.status !== 200) {
      return next({ name: 'homepage' })
    }
    next(vm => {
      // set rent date and time
      vm.rent.date = vm.formatDate()
      vm.rentTime = vm.formatTime()
      // set return date and time
      vm.rent.planningDate = vm.formatDate(vm.insuranceCosts.maxRentDays)
      vm.returnTime = vm.formatTime()

      // set car to rent
      Object.assign(vm.car, car.data) // ?
      vm.car = car.data

      vm.rent.mileage = vm.car.mileage
      vm.rent.fuel = vm.car.fuel

      // save current scratchs of car
      vm.rent.scratchs = vm.car.scratchs

      // save car class to errand (on contract carclass doesnt have to be equal)

      vm.insuranceCosts.carClass = vm.car.type

      // save car costs to errand
      vm.carCost = vm.car.carCostsId
      delete vm.carCost.name
    })
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth)
    })
  },
  methods: {
    formatDate (days = 0) {
      var d = new Date()
      d.setDate(d.getDate() + days)
      var month = '' + (d.getMonth() + 1)
      var day = '' + d.getDate()//  + days
      var year = d.getFullYear()

      if (month.length < 2) { month = '0' + month }
      if (day.length < 2) { day = '0' + day }

      return [year, month, day].join('-')
    },
    formatTime () {
      var d = new Date()
      d.setDate(d.getDate())

      var time = ''

      var hours = d.getHours()
      var minutes = d.getMinutes()

      if (hours < 10) {
        time += '0' + hours + ':'
      } else {
        time += hours + ':'
      }
      if (minutes < 10) {
        time += '0' + minutes
      } else {
        time += minutes
      }
      return time
    },
    async insertErrand () {
      if (!this.isSignature) {
        this.error = true
        this.message = 'do stworzenia umowy najmu wymagany jest podpis clienta.'
        return
      }
      var a = this.rentTime.split(':')
      var date1 = new Date(this.rent.date)
      date1.setHours(a[0])
      date1.setMinutes(a[1])
      this.rent.date = date1

      var b = this.returnTime.split(':')
      var date2 = new Date(this.rent.planningDate)
      date2.setHours(b[0])
      date2.setMinutes(b[1])
      this.rent.planningDate = date2

      const response = await api.insertErrand(this.carId, {
        errandNumber: this.errandNumber,
        employeeRented: this.$store.getters.username,
        isClearBefore: this.car.isClean,
        carCost: this.carCost,
        role: this.role,
        client: this.client,
        additionalDriver: this.additionalDriver,
        insuranceCosts: this.insuranceCosts,
        rent: this.rent
      })

      if (response.status !== 200) {
        this.error = true
        this.message = response.data.message
      } else {
        this.error = false
        this.message = 'samochod zostal wynajety'
        this.$router.push({ name: 'rentalcontract', params: { errandId: response.data._id } })
      }
    },
    undo () {
      // this.$refs.signaturePad.undoSignature()
      // this.$refs.signaturePad.clearSignature()

      while (!this.$refs.signaturePad.isEmpty()) {
        this.$refs.signaturePad.undoSignature()
      }
    },
    save () {
      this.sigantureModal = false
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()

      // alert(this.$refs.signaturePad.getPropImagesAndCacheImages())
      // console.log(isEmpty)
      // console.log(this.$refs.signaturePad.fromData(data)[0])
      if (!isEmpty) {
        this.signatureIMG = data
        this.rent.signature = data
        this.isSignature = true
      }
    },
    change () {
      this.options = {
        penColor: '#00f'
      }
    },
    resume () {
      this.options = {
        penColor: '#c0f'
      }
    }
  }
}
</script>

<style lang="scss">

.main-title {
  margin-top: 21px;
  font-size: 12px;
  margin-bottom: 34px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.car-info {
  font-size: 8px;
  position: absolute;
  left: 1%;
  // top: 10%;

  p {
    text-align: left;
  }
}

.type {
  width: 150px;
  padding: 5px;
  margin-top: 13px;
}

.hidden {
  display: none;
}

.form-container {
  display: flex;
  max-width: 400px;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  padding: 20px 0;
  border-radius: 5px;
  font-size: 16px;
  text-align: center;

  .title {
    width: 70%;
    text-align: center;
    letter-spacing: 2px;
  }

  .button-container {
    width: 60%;
    display: flex;
    justify-content: space-around;
  }

  .btn {
    min-width: 100px;
    background-color: #00f600;
    padding: 13px;
    margin-top: 21px;
    border: none;
    border-radius: 3px;
    transition: all 0.4s ease-in-out;
  }

  .btn:hover {
    background-color: #19cc19;
    cursor: pointer;
  }

  .date-box {
    margin-top: 34px;
    position: relative;
    padding: 8px;

    .content-name {
      position: absolute;
      top: -8px;
      left: 0;
      font-size: 12px;
    }
  }

  .radio-input {
    width: 100%;

    .input-container {
      display: flex;
      justify-content: center;
    }
  }
}

.main_content {
  min-width: 300px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  input {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 7px;
  }

  .date {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .buttons {
    display: flex;
    justify-content: center;

    button {
      margin: 2px;
    }
  }

  .beforeInput {
    margin: 0 0 10px 0;
  }
}

.container_modal {
  background-color: white;
}

#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white), radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin-left: auto;
  margin-right: auto;
}

.container {
  display: flex;
  min-width: 300px;
  max-width: 1300px;
  margin: 20px auto;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 24px;
    color: black;
  }

  .date {
    margin-top: 10px;
    z-index: 10;
  }

  .type {
    cursor: pointer;
    margin-top: 15px;
    width: 200px;
    border-radius: 5px;
    padding: 6px;
  }

  .btn2 {
    cursor: pointer;
    background-color: white;
    margin-top: 12px;
    width: 180px;
    border-radius: 5px;
    border: none;
    padding: 5px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
