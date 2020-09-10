<template>
  <div>
    <div class="container">
      <p class="text_lines">
        {{ car.band }}<span> {{ car.model }}</span>
      </p>
      <p class="text_lines">
        {{ car.registrationNumber }}
      </p>
      <p class="text_lines">
        {{ car.fuel }}%
      </p>
      <p class="text_lines">
        {{ car.mileage }}
      </p>
      <p class="text_lines">
        {{ car.vim }}
      </p>
      <p class="text_lines">
        Uszkodzenia pojazdu
      </p>
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
        @click="setScratchs()"
      >
        zapisz
      </button>
    </div>
  </div>
</template>

<script>
import api from '../api'

export default {
  data () {
    return {
      carId: this.$route.params.carId,
      car: {},
      // scratchs: this.$route.params.scratchs,
      scratchs: [],
      scratchsJSON: '',
      scratchsNew: [],
      error: false,
      message: '',
      canvas: null,
      currentCanvas: null,
      x: 0,
      y: 0,
      items: [
        { id: 1, src: '../assets/stan_techniczny.jpg' },
        { id: 2, src: 'img/img2.jpg' },
        { id: 3, src: 'img/img3.jpg' }
      ],
      imgData: null,
      img: null,
      imgLoaded: false
    }
  },
  mounted () {
  },
  async beforeRouteEnter (to, from, next) {
    const car = await api.getCar(to.params.carId)

    if (car.status !== 200) {
      return next({ name: 'homepage' })
    }
    next(vm => {
      Object.assign(vm.car, car.data) // ?
      vm.car = car.data
      vm.scratchs = vm.car.scratchs
    })
  },
  async beforeRouteUpdate (to, from, next) {
    const car = await api.getCar(to.params.carId)

    if (car.status !== 200) {
      return next({ name: 'homepage' })
    }

    Object.assign(this.car, car.data)
    this.scratchs = this.car.scratchs
    next()
  },
  methods: {
    onImgLoad () {
      var ctx = document.getElementById('myCanvas')
      this.currentCanvas = ctx
      var img = document.getElementById('source')
      this.img = img
      var scale = Math.min(ctx.width / img.width, ctx.height / img.height)
      ctx.getContext('2d').drawImage(img, 0, 0, img.width * scale, img.height * scale)
      this.drawFrom()
    },
    drawFrom () {
      for (var j = 0; j < this.scratchs.length; j++) {
        this.drawX(this.currentCanvas.getContext('2d'), this.scratchs[j].x, this.scratchs[j].y, 'red')
      }
      for (var i = 0; i < this.scratchsNew.length; i++) {
        this.drawX(this.currentCanvas.getContext('2d'), this.scratchsNew[i].x, this.scratchsNew[i].y, 'green')
      }
    },
    async setScratchs () {
      this.scratchs = this.scratchs.concat(this.scratchsNew)
      this.scratchsNew = []
      const response = await api.setScratchs(this.carId, { scratchs: this.scratchs })
      if (response.status !== 200) {
        this.error = true
        this.message = response.data.message
      } else {
        this.error = false
        this.message = 'uszkodzenia pojazdu zostały zapisane.'
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
        this.scratchsNew.push({ x: this.x, y: this.y })
        this.drawX(this.currentCanvas.getContext('2d'), this.x, this.y, 'green')
      }
    },
    checkCollision () {
      for (let i = 0; i < this.scratchsNew.length; i++) {
        if ((this.x <= (this.scratchsNew[i].x + 12)) && (this.x >= (this.scratchsNew[i].x - 12)) && (this.y <= (this.scratchsNew[i].y + 12)) && (this.y >= (this.scratchsNew[i].y - 12))) {
          this.currentCanvas.getContext('2d').clearRect(0, 0, this.currentCanvas.width, this.currentCanvas.height)
          this.scratchsNew.splice(i, 1)
          this.onImgLoad()
          return false
        }
      }
      for (let i = 0; i < this.scratchs.length; i++) {
        if ((this.x <= (this.scratchs[i].x + 12)) && (this.x >= (this.scratchs[i].x - 12)) && (this.y <= (this.scratchs[i].y + 12)) && (this.y >= (this.scratchs[i].y - 12))) {
          this.currentCanvas.getContext('2d').clearRect(0, 0, this.currentCanvas.width, this.currentCanvas.height)
          this.scratchs.splice(i, 1)
          this.onImgLoad()
          return false
        }
      }
      return true
    }
  },
  beforeRouteLeave (to, from, next) {
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style lang="scss">
  #myCanvas {
    background-color: white;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .container {
    @media (max-width: 540px) {
      width: 320px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }
  }
</style>
