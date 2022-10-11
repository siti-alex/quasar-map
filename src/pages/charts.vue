<template>
  <div class="q-pa-md flex flex-center">
    <div id="chartDiv" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import * as JSC from "jscharting";
import Api from 'boot/axios'
import dateformat from "dateformat";

export default defineComponent({
  name: 'charts',
  data: () => ({
    answers: [],
  }),
  async mounted() {
    // Api.getAllAnswers().then((response) => {
    //   console.log(response);
    //
    // })
    await Api.getAnswerByPointId(4).then((response) => {
      console.log(response)
      this.answers = response.data;
    })
    this.answers.forEach((element) => {
      this.answers[this.answers.indexOf(element)].created = dateformat(element.createdAt, 'dd.mm.yyyy');
    })
    console.log(this.answers)
    // JSC.Chart("chartDiv", {
    //   series: [
    //     {
    //       points: [{ x: "A", y: 10 }, { x: "B", y: 5 }]
    //     }
    //   ]
    // });

    // let points = data.map(d => {
    //   return { x: d.date, y: d.actual };
    // });
    // this.answers.forEach((element) => {
    //   // JSC.Chart("chartDiv", {
    //   //   series: [
    //   //     {
    //   //       points: [{ x: "A", y: 10 }, { x: "B", y: 5 }]
    //   //     }
    //   //   ]
    //   // });
    //
    // })

    // console.log(this.answers[0].createdAt)

    // var date = new Date(this.answers[0].createdAt);
    // console.log(date.toUTCString())
    // console.log(dateformat(this.answers[0].createdAt, 'dd.mm.yyyy'))


    var series = JSC.nest()
      .key('createdAt')
      .rollup('visualRating')
      .series(this.answers)

    var chart = JSC.chart('chartDiv', {
      type: 'column',
      defaultBox_boxVisible:false,
      legend_visible:false,
      series: series
    })

  }
})
</script>
