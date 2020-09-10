<template>
  <div>
    <form
      class="form-container"
      method="post"
      @submit.prevent="endErrand"
    >
      <input-label
        v-model="returnCar.place"
        :label-text="'Miejsce zwrotu'"
        :maxlength="32"
      />
      <div class="date-box">
        <span class="content-name">
          Data zwrotu
        </span>
        <date-picker
          v-model="returnCar.realDate"
          class="date"
          value-type="format"
          :placeholder="returnCar.realDate"
          :required="true"
        />
      </div>
      <div class="date-box">
        <span class="content-name">
          Godzina zwrotu
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
          :required="true"
        />
      </div>
      <input-label
        v-model="returnCar.mileage"
        :label-text="'Km przyjazdowe'"
        :is-text="false"
      />
      <input-label
        v-model="returnCar.fuel"
        :label-text="'Stan paliwa'"
        :max="100"
        :is-text="false"
      />
      <div class="radio-input">
        <p class="content-name">
          Czystość auta
        </p>
        <div class="input-container">
          <div class="input-label">
            <input
              v-model="isClearAfter"
              type="radio"
              value="true"
            >
            <label for="true">Czyste</label>
          </div>
          <div class="input-label">
            <input
              v-model="isClearAfter"
              type="radio"
              value="false"
            >
            <label for="false">Brudne</label>
          </div>
        </div>
      </div>
      <input-label
        v-model="returnCar.comments"
        :label-text="'Uwagi'"
        :maxlength="128"
      />
      <p> Podpis klienta </p>
      <VueSignaturePad
        id="signature"
        ref="signaturePad"
        width="300px"
        height="300px"
        :options="options"
      />
      <button
        class="btn"
        type="button"
        @click="undo"
      >
        Wyczyść podpis
      </button>
      <canvas
        id="myCanvas"
        width="300"
        height="227"
        :onLoad="drawFrom"
        @mousemove="showCoordinates"
        @mousedown="drawScratch"
      />
      <div style="display: none;">
        <img
          id="source"
          src="../assets/stan_techniczny.jpg"
          width="300"
          height="227"
          @load="onImgLoad"
        >
      </div>
      <button
        class="btn"
        type="submit"
      >
        Zwróć
      </button>

      <router-link :to="{ name: 'rentalcontract', params: { errandId: errandId }}">
        <button
          class="btn"
          type="submit"
        >
          Umowa najmu
        </button>
      </router-link>
    </form>
  </div>
</template>

<script>
import api from '../api'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
// import BasicModal from '../components/BasicModal'
import InputLabel from '../components/InputLabel'

export default {
  components: {
    // BasicModal,
    DatePicker,
    InputLabel
  },
  data () {
    return {
      errandId: this.$route.params.errandId,
      time1: '',
      time2: '',
      message: 'none',
      error: false,
      editModal: false,
      returnTime: null,
      currentCanvas: null,
      x: 0,
      y: 0,
      scratchs: [],
      isClearAfter: true,
      returnCar: {
        place: '',
        realDate: null,
        mileage: null,
        fuel: 100,
        deposit: null,
        depositSignature: 'pracownik',
        scratchs: [],
        signature: ''
      }
    }
  },
  async beforeRouteEnter (to, from, next) {
    const errand = await api.getErrand(to.params.errandId)
    if (errand.status !== 200) {
      return next({ name: 'homepage' })
    }
    next(vm => {
      vm.scratchs = errand.data.rent.scratchs
    })
  },
  computed: {
    getRole () {
      return this.$store.getters.role
    }
  },
  async mounted () {
    this.returnCar.realDate = this.formatDate()
    this.returnTime = this.formatTime()
    this.deposit = new Date()
  },
  methods: {
    async endErrand () {
      if (this.save()) {
        return
      }
      var a = this.returnTime.split(':')
      var date1 = new Date(this.returnCar.realDate)
      date1.setHours(a[0])
      date1.setMinutes(a[1])
      this.returnCar.realDate = date1
      alert(this.$store.getters.username)
      const response = await api.endErrand(this.errandId, { returnCar: this.returnCar, employeePickedUp: this.$store.getters.username, isClearAfter: this.isClearAfter })

      if (response.status !== 200) {
        this.error = true
        this.message = response.data.message
      } else {
        this.error = false
        this.message = 'auto zostało zwrócone'
        this.$router.push({ name: 'rentalcontract', params: { errandId: this.errandId } })
      }
      alert(this.message)
    },
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
    undo () {
      while (!this.$refs.signaturePad.isEmpty()) {
        this.$refs.signaturePad.undoSignature()
      }
    },
    save () {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()

      if (!isEmpty) {
        this.returnCar.signature = data
      } else {
        this.message = 'Wymagany podpis klienta'
        this.error = true
      }
      return isEmpty
    },
    onImgLoad () {
      var ctx = document.getElementById('myCanvas')
      this.currentCanvas = ctx
      var img = document.getElementById('source')
      // this.img = img
      var scale = Math.min(ctx.width / img.width, ctx.height / img.height)
      ctx.getContext('2d').drawImage(img, 0, 0, img.width * scale, img.height * scale)
      this.drawFrom()
    },
    drawFrom () {
      for (var j = 0; j < this.scratchs.length; j++) {
        this.drawX(this.currentCanvas.getContext('2d'), this.scratchs[j].x, this.scratchs[j].y, 'red')
      }
      for (var i = 0; i < this.returnCar.scratchs.length; i++) {
        this.drawX(this.currentCanvas.getContext('2d'), this.returnCar.scratchs[i].x, this.returnCar.scratchs[i].y, 'green')
      }
    },
    drawX (ctx, x, y, color) {
      ctx.beginPath()
      ctx.strokeStyle = color
      ctx.lineWidth = 4
      ctx.moveTo(x, y)
      ctx.lineTo(x + 4, y + 4)
      ctx.lineTo(x - 4, y - 4)
      ctx.moveTo(x, y)
      ctx.lineTo(x + 4, y - 4)
      ctx.lineTo(x - 4, y + 4)
      ctx.stroke()
      ctx.closePath()
    },
    showCoordinates (e) {
      this.x = e.offsetX
      this.y = e.offsetY
    },
    drawScratch (e) {
      if (this.checkCollision()) {
        this.returnCar.scratchs.push({ x: this.x, y: this.y })
        this.drawX(this.currentCanvas.getContext('2d'), this.x, this.y, 'green')
      }
    },
    checkCollision () {
      for (let i = 0; i < this.returnCar.scratchs.length; i++) {
        if ((this.x <= (this.returnCar.scratchs[i].x + 12)) && (this.x >= (this.returnCar.scratchs[i].x - 12)) && (this.y <= (this.returnCar.scratchs[i].y + 12)) && (this.y >= (this.returnCar.scratchs[i].y - 12))) {
          this.currentCanvas.getContext('2d').clearRect(0, 0, this.currentCanvas.width, this.currentCanvas.height)
          this.returnCar.scratchs.splice(i, 1)
          this.onImgLoad()
          return false
        }
      }
      for (let i = 0; i < this.scratchs.length; i++) {
        if ((this.x <= (this.scratchs[i].x + 12)) && (this.x >= (this.scratchs[i].x - 12)) && (this.y <= (this.scratchs[i].y + 12)) && (this.y >= (this.scratchs[i].y - 12))) {
          // this.currentCanvas.getContext('2d').clearRect(0, 0, this.currentCanvas.width, this.currentCanvas.height)
          // this.scratchs.splice(i, 1)
          // this.onImgLoad()
          return false
        }
      }
      return true
    }
  }
}
</script>

<style lang="scss">

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
</style>
