<template>
  <div>
    <div class="centered_div row" style="margin: auto">
      <q-select class="col-11" label-color="primary" @update:model-value="val => goToPointChart(val)"  filled label="Выберите точку для анализа" :options="points" option-label="title"></q-select>
    </div>

  </div>

</template>

<script>
import Api from 'boot/axios'
export default {
  name: "selectChart.vue",
  data: () => ({
    points: null,
  }),
  methods: {
    getPoints(){
      Api.getAllPoints().then((response) => {
        this.points = response.data;
        // this.selectPoint = response.data[0]
        console.log(this.points)
      })
    },
    goToPointChart(val){
      location.href = `/#/charts/${val.id}`;
    }
  },
  mounted() {
    this.getPoints()
  }
}
</script>

<style scoped>
.centered_div {
  width: 70%;
  position: absolute;
  top:  30%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>
