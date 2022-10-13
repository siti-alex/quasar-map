<template>
  <div>
    <div class="centered_div row" style="margin: auto">
      <q-select class="col-11" v-model="selectPoint" :options="points" option-label="title"></q-select>
      <div class="col-11">
        <q-btn @click="goToPointChart" label="Анализировать"/>
      </div>

    </div>

  </div>

</template>

<script>
import Api from 'boot/axios'
export default {
  name: "selectChart.vue",
  data: () => ({
    points: null,
    selectPoint: null
  }),
  methods: {
    getPoints(){
      Api.getAllPoints().then((response) => {
        this.points = response.data;
        this.selectPoint = response.data[0]
        console.log(this.points)
      })
    },
    goToPointChart(){
      console.log(this.selectPoint)
    }
  },
  mounted() {
    this.getPoints()
  }
}
</script>

<style scoped>
.centered_div {
  position: absolute;
  top:  50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>
