<template>
  <div>
    <p
      v-for="errand in errands"
      :key="errand._id"
    >
      <span>{{ errand.errandNumber }}</span>
      <span v-if="errand.isActive"> Wynajęte</span>
      <span v-else> Zakończone</span>
      <router-link :to="{ name: 'rentalcontract', params: { errandId: errand._id }}">
        <span> Umowa Najmu </span>
      </router-link>
    </p>
  </div>
</template>

<script>
import api from '../api'

export default {
  data () {
    return {
      errands: []
    }
  },
  async beforeRouteEnter (to, from, next) {
    const errands = await api.listErrands()
    if (errands.status !== 200) {
      return next({ name: 'homepage' })
    }
    next(vm => {
      vm.errands = errands.data
    })
  }
}
</script>
