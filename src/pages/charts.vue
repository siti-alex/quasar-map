<template>
  <div>
    <q-btn @click="test"></q-btn>
    <div class="row" style="padding: 50px" v-for="x in series" :key="series.indexOf(x)">
<!--      <div class="col" id="chartDivVisualRating" style="width: 100%; height: 600px;"/>-->
<!--      <div class="col" id="chartDivFillRating" style="width: 100%; height: 600px;"/>-->
            <div class="col" v-bind:id="'chartDiv' + series.indexOf(x)" style="width: 100%; height: 600px;"/>
    </div>

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
    series: [],
  }),
  methods: {
    test(){
      console.log(this.series);
    },
    xz(){
      this.series[0] = JSC.nest()
        .key('createdAt')
        .rollup('fillRating')
        .series(this.answers)

      this.series[1] = JSC.nest()
        .key('createdAt')
        .rollup('availabitityRating')
        .series(this.answers)

      this.series[2] = JSC.nest()
        .key('createdAt')
        .rollup('visualRating')
        .series(this.answers)

      this.series[3] = JSC.nest()
        .key('createdAt')
        .rollup('safetyRating')
        .series(this.answers)

      this.series[4] = JSC.nest()
        .key('createdAt')
        .rollup('ecologyRating')
        .series(this.answers)
    }
  },
  async mounted() {
    // Api.getAllAnswers().then((response) => {
    //   console.log(response);
    //
    // })
    // await Api.getAnswerByPointId(4).then((response) => {
    await Api.getAllAnswers().then((response) => {
      console.log(response)
      this.answers = response.data;
    })
    this.answers.forEach((element) => {
      this.answers[this.answers.indexOf(element)].created = dateformat(element.createdAt, 'dd.mm.yyyy');
    })
    console.log(this.answers)


    // let series = JSC.nest()
    //   .key('createdAt')
    //   .rollup('visualRating')
    //   .series(this.answers)
    //
    // let chart = JSC.chart('chartDivVisualRating', {
    //   type: 'column',
    //   defaultBox_boxVisible:false,
    //   legend_visible:false,
    //   series: series
    // })

    // let series2 = JSC.nest()
    //   .key('createdAt')
    //   .rollup('fillRating')
    //   .series(this.answers)
    //
    // let chart2 = JSC.chart('chartDivFillRating', {
    //   type: 'column',
    //   defaultBox_boxVisible:false,
    //   legend_visible:false,
    //   series: series2
    // })



    // await this.answers.forEach((element) => {
    //   // this.series.push(JSC.chart(`chartDiv${this.answers.indexOf(element)}`,{
    //   //
    //   // }))
    //     this.series[this.answers.indexOf(element)] = (JSC.nest()
    //       .key('createdAt'))
    //       .rollup('fillRating')
    //       .series(this.answers)
    // })



    // this.series[0] = JSC.nest()
    //       .key('createdAt')
    //       .rollup('fillRating')
    //       .series(this.answers)
    //
    // this.series[1] = JSC.nest()
    //   .key('createdAt')
    //   .rollup('availabitityRating')
    //   .series(this.answers)
    //
    // this.series[2] = JSC.nest()
    //   .key('createdAt')
    //   .rollup('visualRating')
    //   .series(this.answers)
    //
    // this.series[3] = JSC.nest()
    //   .key('createdAt')
    //   .rollup('safetyRating')
    //   .series(this.answers)
    //
    // this.series[4] = JSC.nest()
    //   .key('createdAt')
    //   .rollup('ecologyRating')
    //   .series(this.answers)

    await this.xz();

    this.series.forEach((element) => {
        JSC.chart(`chartDiv${this.series.indexOf(element)}`, {
            type: 'column',
            debug: true,
            defaultBox_boxVisible:false,
            legend_visible:false,
            series: this.series[this.series.indexOf(element)]
        })
    })


  }
})
</script>
