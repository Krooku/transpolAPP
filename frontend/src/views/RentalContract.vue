<template>
  <div
    id="printMe"
    class="grid-container"
  >
    <div class="LOGO">
      <img src="../assets/logo.png">
    </div>
    <div class="COMPANY_NAME">
      <p> Firma TRANS-POL </p>
      <p> Artur Waszczuk, Zuzanna Stolarczyk-Waszczuk </p>
      <p> 72-300 Gryfice ul. Niekładzka 10a </p>
    </div>
    <div class="RENTAL_CONTRACT_NUMBER">
      <p>UMOWA NAJMU POJAZDU ZASTĘPCZEGO NR {{ errand.contractNumber }}</p>
    </div>
    <div class="ERRAND">
      <div class="ERRAND_ID">
        <p>NR ZLECENIA {{ errand.errandNumber }}</p>
      </div>
      <div class="INSURANCE_NAME">
        <p>NAZWA ZLECENIODWACY ----</p>
      </div>
    </div>
    <div class="CLIENT">
      <div class="ICON">
        <i class="fas fa-user" />
      </div>
      <div class="FULLNAME">
        <div class="field_name">
          Imię i nazwisko najemcy
        </div>
        {{ errand.client.fullname }}
      </div>
      <div class="BIRTHDATE">
        <div class="field_name">
          Data urodzenia
        </div>
        {{ formatDate(errand.client.birthDate) }}
      </div>
      <div class="BIRTHPLACE">
        <div class="field_name">
          Miasto
        </div>
        {{ errand.client.birthPlace }}
      </div>
    </div>
    <div class="DRIVING_LICENCE">
      <div class="ICON_DL">
        <i class="fas fa-car" />
      </div>
      <div class="DL_ID">
        <div class="field_name">
          Nr prawa jazdy
        </div>
        {{ errand.client.driveLicense.number }}
      </div>
      <div class="DL_RELEASE_DATE">
        <div class="field_name">
          Data wydania
        </div>
        {{ formatDate(errand.client.driveLicense.releaseDate) }}
      </div>
      <div class="DL_RELEASE_PLACE">
        <div class="field_name">
          Miejsce wydania
        </div>
        {{ errand.client.driveLicense.releasePlace }}
      </div>
    </div>
    <div class="ID_CARD">
      <div class="ICON_ID_CARD">
        <i class="fas fa-id-card" />
      </div>
      <div class="ID_CARD_NR">
        <div class="field_name">
          Nr dowodu tożsamości
        </div>
        {{ errand.client.idCard.number }}
      </div>
      <div class="ID_CARD_EXP_DATE">
        <div class="field_name">
          Date ważności
        </div>
        {{ formatDate(errand.client.idCard.expDate) }}
      </div>
      <div class="ID_CARD_RELEASE_DATE">
        <div class="field_name">
          Miejsce wydania
        </div>
        {{ errand.client.idCard.releasePlace }}
      </div>
    </div>
    <div class="ADDITIONAL_DRIVER">
      <div class="ICON_ADD_DRIVER">
        <i class="fas fa-user-plus" />
      </div>
      <div class="ADD_DRIVER_FULLNAME">
        <div class="field_name">
          Imię i nazwisko
        </div>
        {{ errand.additionalDriver.fullname }}
      </div>
      <div class="ADD_DRIVER_BIRTH_DATE">
        <div class="field_name">
          Data urodzenia
        </div>
        {{ formatDate(errand.additionalDriver.birthDate) }}
      </div>
      <div class="ADD_DRIVER_DL_NUMBER">
        <div class="field_name">
          Nr prawa jazdy
        </div>
        {{ errand.additionalDriver.driveLicense.number }}
      </div>
      <div class="ADD_DRIVER_DL_RELEASE">
        <div class="field_name">
          Data i miejsce wydania
        </div>
        {{ formatDate(errand.additionalDriver.driveLicense.releaseDate) }} {{ errand.additionalDriver.driveLicense.releasePlace }}
      </div>
    </div>
    <div class="CONCACT">
      Dane kontaktowe
    </div>
    <div class="ZIP_CODE">
      <div class="field_name">
        Kod pocztowy
      </div>
      {{ errand.client.contact.zipCode }}
    </div>
    <div class="CITY">
      <div class="field_name">
        Miasto
      </div>
      {{ errand.client.contact.city }}
    </div>
    <div class="STREET">
      <div class="field_name">
        Ulica
      </div>
      {{ errand.client.contact.street }}
    </div>
    <div class="PHONENUMBER">
      <div class="field_name">
        Nr telefonu
      </div>
      {{ errand.client.contact.phone }}
    </div>
    <div class="COST_GUARANTEE_BY_INSURANCE">
      <div class="TITLE">
        KOSZTY, KTÓRYCH POKRYCIE GWARANTOWANE JEST PRZEZ ZLECENIODAWCĘ
      </div>
      <div class="RENT_DAYS">
        Ilość dni wynajmu: {{ errand.insuranceCosts.rentDays }}
      </div>
      <div class="MAX_RENT_DAYS">
        Maks: {{ errand.insuranceCosts.maxRentDays }}
      </div>
      <div class="GROUP_CAR">
        Rezerwowana grupa pojazdu: {{ errand.insuranceCosts.carClass }}
      </div>
      <div class="SUBSTITUTION">
        <div style="border-right: solid 1px black;">
          Podstawienie pojazdu
        </div>
        <div>
          {{ chengeBool(errand.insuranceCosts.carSubstitution) }}
        </div>
      </div>
      <div class="PICKUP">
        <div style="border-right: solid 1px black;">
          Odbiór pojazdu
        </div>
        <div>
          {{ chengeBool(errand.insuranceCosts.carReturn) }}
        </div>
      </div>
      <div class="CDW_LEFT">
        <div style="border-right: solid 1px black;">
          Udział własny CDW(kolizja)
        </div>
        <div>
          {{ chengeBool(errand.insuranceCosts.CDW) }}
        </div>
      </div>
      <div class="TW_LEFT">
        <div style="border-right: solid 1px black;">
          Udział własny TW(kradzież)
        </div>
        <div>
          {{ chengeBool(errand.insuranceCosts.TW) }}
        </div>
      </div>
      <div class="DEPOSIT_COST">
        <div style="border-right: solid 1px black;">
          Kaucja
        </div>
        <div>
          {{ chengeBool(errand.insuranceCosts.deposit) }}
        </div>
      </div>
      <div class="NO_KM_LIMIT">
        <div style="border-right: solid 1px black;">
          Brak limitu km
        </div>
        <div>
          {{ chengeBool(errand.insuranceCosts.noKmLimit) }}
        </div>
      </div>
      <div class="OTHER">
        inne: {{ errand.insuranceCosts.other }}
      </div>
    </div>
    <div class="POSSIBLE_CHARGE_CLIENT">
      <div class="TITLE">
        KOSZTY, JAKMI MOŻE ZOSTAĆ OBCIĄŻONY NAJEMCA(W PLN NETTO)
      </div>
      <div class="ADDITION_DAY_COST">
        <div style="border-right: solid 1px black;">
          Cena za każdą dodatkową dobę
        </div>
        <div>
          <div style="width: 50%; float: left;">
            {{ errand.carCost.additionalDay }}
          </div>
          <div style="text-align: right; width: 50%; float: left;">
            /dob.
          </div>
        </div>
      </div>
      <div class="SUBSTITUTION_PICKUP">
        Podstawienie/odbiór pojazdu
      </div>
      <div class="IN_CITY">
        Miasto: 1
      </div>
      <div class="OUT_CITY">
        Poza miastem: 50 /km
      </div>
      <div class="CDW_RIGHT">
        <div style="border-right: solid 1px black;">
          Udział własny CDW(kolizja)
        </div>
        <div>
          {{ errand.carCost.CDW }}
        </div>
      </div>
      <div class="TW_RIGHT">
        <div style="border-right: solid 1px black;">
          Udział własny TW(kradzież)
        </div>
        <div>
          {{ errand.carCost.TW }}
        </div>
      </div>
      <div class="FUEL">
        <div style="border-right: solid 1px black;">
          Uzupełnienie paliwa
        </div>
        <div>
          <div style="width: 50%; float: left;">
            {{ errand.carCost.fuel }}
          </div>
          <div style="text-align: right; width: 50%; float: left;">
            /litry
          </div>
        </div>
      </div>
      <div class="RENT_RETURN_OUT_HOURS_WORK">
        <div style="border-right: solid 1px black;">
          Wynajem/zwrot poza godzinami pracy
        </div>
        <div>
          <div style="width: 50%; float: left;">
            {{ errand.carCost.transportOutWork }}
          </div>
          <div style="text-align: right; width: 50%; float: left;">
            /usługa
          </div>
        </div>
      </div>
      <div class="CLEANING">
        <div style="border-right: solid 1px black;">
          Czyszczenie auta
        </div>
        <div>
          <div style="width: 50%; float: left;">
            {{ errand.carCost.cleaning }}
          </div>
          <div style="text-align: right; width: 50%; float: left;">
            /usługa
          </div>
        </div>
      </div>
      <div class="OTHER_RIGHT">
        inne: ZAKAZ PALENIA 500ZŁ
      </div>
    </div>
    <div class="RENT">
      <div class="RENT_TITLE">
        WYNAJEM POJAZDU
      </div>
      <div class="RENT_PLACE">
        <div style="border-right: 1px solid black;">
          Miejsce wynajmu
        </div><div> {{ errand.rent.place }}</div>
      </div>
      <div class="RENT_DATE">
        <div style="border-right: 1px solid black;">
          Data i godzina wynajmu
        </div> <div>{{ formatDate(errand.rent.date, true) }} </div>
      </div>
      <div class="RENT_CAR">
        <div style="border-right: 1px solid black;">
          Marka/model pojazdu:
        </div><div>{{ errand.carId.band }} {{ errand.carId.model }} </div>
      </div>
      <div class="CAR_PARAMS">
        <div style="border-right: 1px solid black;">
          KM wyjazdowe {{ errand.rent.mileage }}
        </div><div>stan paliwa {{ errand.rent.fuel }}%</div>
      </div>
      <div class="CAR_VIM">
        <div style="border-right: 1px solid black;">
          Numer VIM
        </div><div>{{ errand.carId.vim }}</div>
      </div>
      <div class="RENT_ISCLEAN">
        <div style="border-right: 1px solid black;">
          Stan auta
        </div><div>{{ chengeBool(errand.isClearBefore, 'Czyste', 'Brudne') }}</div>
      </div>
      <div class="RENT_PLAN_PLACE">
        <div style="border-right: 1px solid black;">
          Planowane miejsce zwrotu
        </div><div>{{ errand.rent.planningReturnPlace }}</div>
      </div>
      <div class="RENT_DEPOSIT">
        <div style="border-right: 1px solid black;">
          Pobrana Kaucja
        </div><div>{{ errand.rent.deposit }}</div>
      </div>
    </div>
    <div class="RETURN">
      <div class="RETURN_TITLE">
        ZWROT POJAZDU
      </div>
      <div class="RETURN_PLACE">
        <div style="border-right: 1px solid black;">
          Miejsce zwrotu
        </div><div>{{ errand.returnCar.place }}</div>
      </div>
      <div class="RETURN_DATE">
        <div style="border-right: 1px solid black;">
          Data i godzina zwrotu
        </div><div>{{ formatDate(errand.rent.planningDate, true) }}</div>
      </div>
      <div class="RETURN_REAL_DATE">
        <div style="border-right: 1px solid black;">
          Faktyczna data i godzina zwrotu
        </div><div>{{ formatDate(errand.returnCar.realDate, true) }}</div>
      </div>
      <div class="RETURN_CAR_PARAMS">
        <div style="border-right: 1px solid black;">
          KM przyjazdowe {{ errand.returnCar.mileage }}
        </div><div>stan paliwa {{ errand.returnCar.fuel }}%</div>
      </div>
      <div class="RETURN_ISCLEAN">
        <div style="border-right: 1px solid black;">
          Stan auta
        </div><div> {{ chengeBool(errand.isClearAfter, 'Czyste', 'Brudne') }} </div>
      </div>
      <div class="RETURN_DEPOSIT">
        <div style="border-right: 1px solid black;">
          Potwierdzenie zwrotu kaucji(data nazwisko)
        </div><div>{{ formatDate(errand.returnCar.realDate) }} {{ user.username }}</div>
      </div>
      <div class="RETURN_OTHER">
        Uwagi: {{ errand.returnCar.comments }}
      </div>
    </div>
    <div class="SIGNATURE">
      <div class="RENT_SIG">
        <p class="RENT_SIG_TITLE">
          Wynajem
        </p>
        <p class="RENT_SIG_EMPLOYEE">
          Wynajmował {{ errand.employeeRented }}
        </p>
        <div class="RENT_SIG_CLIENT">
          <span class="text">Podpis najemcy</span>
          <img
            :src="errand.rent.signature"
            width="230"
            height="200"
          >
        </div>
      </div>
      <div class="RETURN_SIG">
        <p class="RETURN_SIG_TITLE">
          Zwrot
        </p>
        <p class="RETURN_SIG_EMPLOYEE">
          Odbierał {{ errand.employeePickedUp }}
        </p>
        <div class="RETURN_SIG_CLIENT">
          <span class="text">Podpis najemcy</span>

          <img
            v-if="errand.returnCar.signature"
            class="client_signature"
            :src="errand.returnCar.signature"
            width="230"
            height="200"
          >
        </div>
      </div>
    </div>
    <div class="CAR">
      <div style="display: inline-block;">
        <div
          style="float: left;"
          class="beforeRent"
        />
        <div style="float: left;">
          Uszkodzenia podczas zwrotu przez klienta
        </div>
      </div>
      <div style="display: inline-block; margin-right: 8px;">
        <div
          style="clear: both; float: left;"
          class="afterRent"
        />
        <div style="float: left;">
          Uszkodzenia podczas odbioru przez klienta
        </div>
      </div>
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
    </div>
  </div>
</template>

<script>
import api from '../api'

export default {
  data () {
    return {
      errandId: this.$route.params.errandId,
      errand: {},
      output: null,
      currentCanvas: null,
      user: {}
    }
  },
  async beforeRouteEnter (to, from, next) {
    /* const errand = await api.getErrand(to.params.errandId)

    if (errand.status !== 200) {
      return next({ name: 'homepage' })
    }
    next(vm => {
      // set car to rent
      Object.assign(vm.errand, errand.data) // ?
      vm.errand = errand.data
    }) */

    const [errand, user] = await Promise.all([
      api.getErrand(to.params.errandId),
      api.getUser()
    ])

    if (errand.status !== 200 || user.status !== 200) next({ name: 'homepage' })

    next(vm => {
      Object.assign(vm.errand, errand.data) // ?
      vm.errand = errand.data
      Object.assign(vm.user, user.data) // ?
      vm.user = user.data
    })
  },
  methods: {
    print () {
      // Pass the element id here
      this.$htmlToPaper('printMe')
    },
    chengeBool (bool, textTrue = 'Tak', textFalse = 'Nie') {
      if (bool === undefined) {
        return ''
      }
      if (bool === true) {
        return textTrue
      } else if (bool === false) {
        return textFalse
      } else {
        return 'BŁĄD'
      }
    },
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
      for (var j = 0; j < this.errand.rent.scratchs.length; j++) {
        this.drawX(this.currentCanvas.getContext('2d'), this.errand.rent.scratchs[j].x, this.errand.rent.scratchs[j].y, 'red')
      }
      for (var i = 0; i < this.errand.returnCar.scratchs.length; i++) {
        this.drawX(this.currentCanvas.getContext('2d'), this.errand.returnCar.scratchs[i].x, this.errand.returnCar.scratchs[i].y, 'green')
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
    formatDate (date, withTime = false) {
      if ((date === null) || date === undefined) {
        return ''
      }
      let fullDate = date.split('T')
      let splitedDate = fullDate[0].split('-')
      let splitedTime = fullDate[1].split(':')
      if (withTime) {
        return [splitedDate[2], splitedDate[1], splitedDate[0]].join('.') + ' ' + [splitedTime[0], splitedTime[1]].join(':')
      }
      return [splitedDate[2], splitedDate[1], splitedDate[0]].join('.')
    }
  }
}
</script>

<style lang="scss">
@media print {
  body * {
    // visibility: hidden;
  }

  #page,
  #page * {
    visibility: visible;
  }

  #page {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99999;
  }

  .grid-container {
    left: 0 !important;
    top: -50px !important;
  }
}

.grid-container {
  position: absolute;
  // top: -50px;
  z-index: 111;
  left: calc(50% - 396px);

  @media (max-width: 792px) {
    left: 0;
  }

  background-color: white;
  width: 792px;
  // width: 1240px;
  height: 1156px;
  // height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 125px 60px 120px 30px 30px 200px 200px 346px;
  // grid-template-rows: auto auto auto auto auto auto auto;
  grid-template-areas:
    "LOGO LOGO LOGO LOGO COMPANY_NAME COMPANY_NAME COMPANY_NAME COMPANY_NAME"
    "RENTAL_CONTRACT_NUMBER RENTAL_CONTRACT_NUMBER RENTAL_CONTRACT_NUMBER RENTAL_CONTRACT_NUMBER RENTAL_CONTRACT_NUMBER ERRAND ERRAND ERRAND"
    "CLIENT CLIENT DRIVING_LICENCE DRIVING_LICENCE ID_CARD ID_CARD ADDITIONAL_DRIVER ADDITIONAL_DRIVER"
    "CONCACT CONCACT CONCACT CONCACT CONCACT CONCACT CONCACT CONCACT"
    "ZIP_CODE ZIP_CODE CITY CITY STREET STREET PHONENUMBER PHONENUMBER"
    "COST_GUARANTEE_BY_INSURANCE COST_GUARANTEE_BY_INSURANCE COST_GUARANTEE_BY_INSURANCE COST_GUARANTEE_BY_INSURANCE POSSIBLE_CHARGE_CLIENT POSSIBLE_CHARGE_CLIENT POSSIBLE_CHARGE_CLIENT POSSIBLE_CHARGE_CLIENT"
    "RENT RENT RENT RENT RETURN RETURN RETURN RETURN"
    // "LEFT_SIG LEFT_SIG CAR CAR CAR CAR RIGHT_SIG RIGHT_SIG"
    "CAR CAR CAR CAR SIGNATURE SIGNATURE SIGNATURE SIGNATURE"
    ". . . . . . . .";
}

.CONCACT {
  grid-area: CONCACT;
  text-align: center;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}

.SIGNATURE {
  grid-area: SIGNATURE;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: "RENT_SIG" "RETURN_SIG";
}

.RENT_SIG {
  grid-area: RENT_SIG;
  border-bottom: 1px solid black;
  position: relative;

  .RENT_SIG_CLIENT {
    img {
      position: absolute;
      right: 0;
      top: 15px;
    }

    .text {
      position: absolute;
      left: 50%;
      top: 50%;
    }
  }

  .RENT_SIG_TITLE {
    margin-top: 2px;
    text-align: center;
    border-bottom: 1px solid black;
  }

  .RENT_SIG_EMPLOYEE {
    margin-left: 5px;
  }
}

.RETURN_SIG {
  grid-area: RETURN_SIG;
  position: relative;

  .RETURN_SIG_CLIENT {
    img {
      position: absolute;
      right: 0;
      top: 15px;
    }

    .text {
      position: absolute;
      left: 50%;
      top: 50%;
    }
  }

  .RETURN_SIG_TITLE {
    margin-top: 2px;
    text-align: center;
    border-bottom: 1px solid black;
  }

  .RETURN_SIG_EMPLOYEE {
    margin-left: 5px;
  }
}

.CAR {
  grid-area: CAR;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-top: 1px solid black;
  text-align: center;
  padding-top: 35px;

  canvas {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  .beforeRent {
    background-color: green;
    width: 10px;
    height: 10px;
    margin-top: 3px;
    margin-right: 3px;
  }

  .afterRent {
    background-color: red;
    width: 10px;
    height: 10px;
    margin-top: 3px;
    margin-right: 3px;
    margin-left: 13px;
  }
}

.RENT {
  grid-area: RENT;
  font-size: 12px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "RENT_TITLE RENT_TITLE" "RENT_PLACE RENT_PLACE" "RENT_DATE RENT_DATE" "RENT_CAR RENT_CAR"
    "CAR_PARAMS CAR_PARAMS" "CAR_VIM CAR_VIM" "RENT_ISCLEAN RENT_ISCLEAN" "RENT_PLAN_PLACE RENT_PLAN_PLACE" "RENT_DEPOSIT RENT_DEPOSIT";
}

.RENT_TITLE {
  grid-area: RENT_TITLE;
  text-align: center;
  border-bottom: 1px solid black;
}

.RENT_PLACE {
  grid-area: RENT_PLACE;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid black;
}

.RENT_DATE {
  grid-area: RENT_DATE;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid black;
}

.RENT_CAR {
  grid-area: RENT_CAR;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid black;
}

.CAR_PARAMS {
  grid-area: CAR_PARAMS;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid black;
}

.CAR_VIM {
  grid-area: CAR_VIM;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid black;
}

.RENT_ISCLEAN {
  grid-area: RENT_ISCLEAN;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid black;
}

.RENT_PLAN_PLACE {
  grid-area: RENT_PLAN_PLACE;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid black;
}

.RENT_DEPOSIT {
  grid-area: RENT_DEPOSIT;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.RETURN {
  grid-area: RETURN;
  font-size: 12px;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "RETURN_TITLE RETURN_TITLE" "RETURN_PLACE RETURN_PLACE" "RETURN_DATE RETURN_DATE" "RETURN_REAL_DATE RETURN_REAL_DATE"
    "RETURN_CAR_PARAMS RETURN_CAR_PARAMS" "RETURN_ISCLEAN RETURN_ISCLEAN" "RETURN_DEPOSIT RETURN_DEPOSIT" "RETURN_OTHER RETURN_OTHER" "RETURN_OTHER RETURN_OTHER";
}

.RETURN_TITLE {
  grid-area: RETURN_TITLE;
  text-align: center;
  border-bottom: 1px solid black;
}

.RETURN_PLACE {
  grid-area: RETURN_PLACE;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid black;
}

.RETURN_DATE {
  grid-area: RETURN_DATE;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid black;
}

.RETURN_REAL_DATE {
  grid-area: RETURN_REAL_DATE;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid black;
}

.RETURN_CAR_PARAMS {
  grid-area: RETURN_CAR_PARAMS;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid black;
}

.RETURN_ISCLEAN {
  grid-area: RETURN_ISCLEAN;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid black;
}

.RETURN_DEPOSIT {
  grid-area: RETURN_DEPOSIT;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid black;
}

.RETURN_OTHER {
  grid-area: RETURN_OTHER;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.LOGO {
  grid-area: LOGO;

  img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}

.COMPANY_NAME {
  grid-area: COMPANY_NAME;
  text-align: center;
}

.COMPANY_CONTACT {
  grid-area: COMPANY_CONTACT;
  text-align: center;
}

.RENTAL_CONTRACT_NUMBER {
  grid-area: RENTAL_CONTRACT_NUMBER;
  border: 1px solid #dfdfdf;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "TEXT";

  p {
    grid-area: TEXT;
    align-self: center;
    margin-left: 2px;
  }
}

.ERRAND {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: "ERRAND_ID" "INSURANCE_NAME";
  grid-area: ERRAND;
  font-size: 12px;
  border: 1px solid #dfdfdf;

  p {
    margin: 0;
    vertical-align: middle;
  }
}

.ERRAND_ID { grid-area: ERRAND_ID; }

.INSURANCE_NAME {
  grid-area: INSURANCE_NAME;
  border-top: 1px solid #dfdfdf;
}

.CLIENT {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 30px 30px 30px 30px;
  grid-template-areas: "ICON" "FULLNAME" "BIRTHDATE" "BIRTHPLACE";
  grid-area: CLIENT;
  text-align: center;
  border: 1px solid black;
  font-size: 12px;
}

.ICON {
  grid-area: ICON;
  font-size: 18px;
  padding-top: 5px;
}

.FULLNAME {
  position: relative;
  grid-area: FULLNAME;
  padding-top: 13px;
  border-top: 1px solid black;
}

.BIRTHDATE {
  position: relative;
  grid-area: BIRTHDATE;
  padding-top: 13px;
  border-top: 1px solid black;
}

.BIRTHPLACE {
  position: relative;
  grid-area: BIRTHPLACE;
  padding-top: 13px;
  border-top: 1px solid black;
}

.DRIVING_LICENCE {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 30px 30px 30px 30px;
  grid-template-areas: "ICON_DL" "DL_ID" "DL_RELEASE_DATE" "DL_RELEASE_PLACE";
  grid-area: DRIVING_LICENCE;
  text-align: center;
  border: 1px solid black;
  font-size: 12px;
}

.ICON_DL {
  grid-area: ICON_DL;
  font-size: 18px;
  padding-top: 5px;
}

.DL_ID {
  grid-area: DL_ID;
  position: relative;
  padding-top: 13px;
  border-top: 1px solid black;
}

.DL_RELEASE_DATE {
  grid-area: DL_RELEASE_DATE;
  position: relative;
  padding-top: 13px;
  border-top: 1px solid black;
}

.DL_RELEASE_PLACE {
  grid-area: DL_RELEASE_PLACE;
  position: relative;
  padding-top: 13px;
  border-top: 1px solid black;
}

.ID_CARD {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 30px 30px 30px 30px;
  grid-template-areas: "ICON_ID_CARD" "ID_CARD_NR" "ID_CARD_EXP_DATE" "ID_CARD_RELEASE_DATE";
  grid-area: ID_CARD;
  text-align: center;
  border: 1px solid black;
  font-size: 12px;
}

.ICON_ID_CARD {
  padding-top: 5px;
  grid-area: ICON_ID_CARD;
  font-size: 18px;
}

.ID_CARD_NR {
  grid-area: ID_CARD_NR;
  position: relative;
  padding-top: 13px;
  border-top: 1px solid black;
}

.ID_CARD_EXP_DATE {
  grid-area: ID_CARD_EXP_DATE;
  position: relative;
  padding-top: 13px;
  border-top: 1px solid black;
}

.ID_CARD_RELEASE_DATE {
  grid-area: ID_CARD_RELEASE_DATE;
  position: relative;
  padding-top: 13px;
  border-top: 1px solid black;
}

.ADDITIONAL_DRIVER {
  grid-area: ADDITIONAL_DRIVER;
  display: grid;
  grid-template-columns: 15% 85%;
  grid-template-rows: 30px 30px 30px 30px;
  grid-template-areas: "ICON_ADD_DRIVER ADD_DRIVER_FULLNAME" "ICON_ADD_DRIVER ADD_DRIVER_BIRTH_DATE" "ICON_ADD_DRIVER ADD_DRIVER_DL_NUMBER" "ICON_ADD_DRIVER ADD_DRIVER_DL_RELEASE";
  text-align: center;
  border: 1px solid black;
  font-size: 12px;
}

.ICON_ADD_DRIVER {
  grid-area: ICON_ADD_DRIVER;
  font-size: 18px;
  vertical-align: middle;
  line-height: 120px;
  border-right: 1px solid black;
}

.ADD_DRIVER_FULLNAME {
  position: relative;
  grid-area: ADD_DRIVER_FULLNAME;
  padding-top: 13px;
  border-bottom: 1px solid black;
}

.ADD_DRIVER_BIRTH_DATE {
  position: relative;
  grid-area: ADD_DRIVER_BIRTH_DATE;
  padding-top: 13px;
  border-bottom: 1px solid black;
}

.ADD_DRIVER_DL_NUMBER {
  position: relative;
  grid-area: ADD_DRIVER_DL_NUMBER;
  padding-top: 13px;
  border-bottom: 1px solid black;
}

.ADD_DRIVER_DL_RELEASE {
  position: relative;
  grid-area: ADD_DRIVER_DL_RELEASE;
  padding-top: 13px;
}

.field_name {
  position: absolute;
  top: 0;
  left: 0;
}

.ZIP_CODE {
  position: relative;
  grid-area: ZIP_CODE;
  font-size: 12px;
  padding-left: 8px;
  padding-top: 13px;
  border-left: 1px solid black;
  border-right: 1px solid black;
}

.CITY {
  position: relative;
  grid-area: CITY;
  font-size: 12px;
  padding-left: 8px;
  padding-top: 13px;
  border-right: 1px solid black;
}

.STREET {
  position: relative;
  grid-area: STREET;
  font-size: 12px;
  padding-left: 8px;
  padding-top: 13px;
  border-right: 1px solid black;
}

.PHONENUMBER {
  position: relative;
  grid-area: PHONENUMBER;
  font-size: 12px;
  padding-left: 8px;
  padding-top: 13px;
  border-right: 1px solid black;
}

.COST_GUARANTEE_BY_INSURANCE {
  display: grid;
  grid-template-columns: 30% 20% 50%;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    "TITLE TITLE TITLE"
    "RENT_DAYS MAX_RENT_DAYS GROUP_CAR" "SUBSTITUTION SUBSTITUTION SUBSTITUTION" "PICKUP PICKUP PICKUP"
    "CDW_LEFT CDW_LEFT CDW_LEFT" "TW_LEFT TW_LEFT TW_LEFT" "DEPOSIT_COST DEPOSIT_COST DEPOSIT_COST"
    "NO_KM_LIMIT NO_KM_LIMIT NO_KM_LIMIT" "OTHER OTHER OTHER";
  grid-area: COST_GUARANTEE_BY_INSURANCE;
  border: 1px solid black;
  font-size: 12px;
}

.TITLE {
  grid-area: TITLE;
  text-align: center;
  border-top: solid 1px black;
  border-bottom: solid 1px black;
}

.RENT_DAYS { grid-area: RENT_DAYS; }

.MAX_RENT_DAYS {
  grid-area: MAX_RENT_DAYS;
  border-left: solid 1px black;
  border-right: solid 1px black;
}

.GROUP_CAR { grid-area: GROUP_CAR; }

.SUBSTITUTION {
  grid-area: SUBSTITUTION;
  display: grid;
  grid-template-columns: 50% 50%;
  border-top: solid 1px black;
  border-bottom: solid 1px black;
}

.PICKUP {
  grid-area: PICKUP;
  display: grid;
  grid-template-columns: 50% 50%;
  border-bottom: solid 1px black;
}

.CDW_LEFT {
  grid-area: CDW_LEFT;
  display: grid;
  grid-template-columns: 50% 50%;
  border-bottom: solid 1px black;
}

.TW_LEFT {
  grid-area: TW_LEFT;
  display: grid;
  grid-template-columns: 50% 50%;
  border-bottom: solid 1px black;
}

.DEPOSIT_COST {
  grid-area: DEPOSIT_COST;
  display: grid;
  grid-template-columns: 50% 50%;
  border-bottom: solid 1px black;
}

.NO_KM_LIMIT {
  grid-area: NO_KM_LIMIT;
  display: grid;
  grid-template-columns: 50% 50%;
  border-bottom: solid 1px black;
}

.OTHER {
  grid-area: OTHER;
  border-bottom: solid 1px black;
}

.POSSIBLE_CHARGE_CLIENT {
  display: grid;
  grid-template-columns: 45% 15% 40%;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas: "TITLE TITLE TITLE" "ADDITION_DAY_COST ADDITION_DAY_COST ADDITION_DAY_COST" "SUBSTITUTION_PICKUP IN_CITY OUT_CITY" "CDW_RIGHT CDW_RIGHT CDW_RIGHT" "TW_RIGHT TW_RIGHT TW_RIGHT" "FUEL FUEL FUEL" "RENT_RETURN_OUT_HOURS_WORK RENT_RETURN_OUT_HOURS_WORK RENT_RETURN_OUT_HOURS_WORK" "CLEANING CLEANING CLEANING" "OTHER_RIGHT OTHER_RIGHT OTHER_RIGHT";
  grid-area: POSSIBLE_CHARGE_CLIENT;
  border: 1px solid black;
  font-size: 12px;
}

// .TITLE { grid-area: TITLE; }

.ADDITION_DAY_COST {
  grid-area: ADDITION_DAY_COST;
  display: grid;
  grid-template-columns: 55% 45%;
  border-bottom: solid 1px black;
}

.SUBSTITUTION_PICKUP {
  grid-area: SUBSTITUTION_PICKUP;
  border-bottom: solid 1px black;
}

.IN_CITY {
  grid-area: IN_CITY;
  border-left: solid 1px black;
  border-right: solid 1px black;
  border-bottom: solid 1px black;
}

.OUT_CITY {
  grid-area: OUT_CITY;
  border-bottom: solid 1px black;
}

.CDW_RIGHT {
  grid-area: CDW_RIGHT;
  display: grid;
  grid-template-columns: 55% 45%;
  border-bottom: solid 1px black;
}

.TW_RIGHT {
  grid-area: TW_RIGHT;
  display: grid;
  grid-template-columns: 55% 45%;
  border-bottom: solid 1px black;
}

.FUEL {
  grid-area: FUEL;
  display: grid;
  grid-template-columns: 55% 45%;
  border-bottom: solid 1px black;
}

.RENT_RETURN_OUT_HOURS_WORK {
  grid-area: RENT_RETURN_OUT_HOURS_WORK;
  display: grid;
  grid-template-columns: 55% 45%;
  border-bottom: solid 1px black;
}

.CLEANING {
  grid-area: CLEANING;
  display: grid;
  grid-template-columns: 55% 45%;
  border-bottom: solid 1px black;
}

.OTHER_RIGHT {
  grid-area: OTHER_RIGHT;
  border-bottom: solid 1px black;
}
</style>
