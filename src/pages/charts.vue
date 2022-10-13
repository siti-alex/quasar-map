<template>
  <div>
    <q-btn @click="test"/>
    <div class="row q-pa-md flex flex-center">
      <div class="col" id="chartDivVisualRating" style="width: 100%; height: 300px;"/>
      <div class="col" id="chartDivAvailabitityRating" style="width: 100%; height: 300px;"/>
      <div class="col" id="chartDivFillRating" style="width: 100%; height: 300px;"/>
      <div class="col" id="chartDivSafetyRating" style="width: 100%; height: 300px;"/>
      <div class="col" id="chartDivEcologyRating" style="width: 100%; height: 300px;"/>
    </div>
    <div class="q-pa-md flex flex-center">
      <div class="col" id="chartDivSplitChart" style="width: 90%; height: 400px;"/>
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
    stats: {
      point: null,
      availabitityRating: {
        name: 'Доступность',
        points: []
      },
      visualRating: {
        name: 'Визуал',
        points: [],
      },
      fillRating: {
        name: 'Наполнение',
        points: [],
      },
      safetyRating: {
        name: 'Безопасность',
        points: []
      },
      ecologyRating: {
        name: 'Экология',
        points: []
      }

    }
  }),
  methods: {
    sortByDate(){
      this.stats.availabitityRating.points.sort((a,b) => {
        a = new Date(a.x);
        b = new Date(b.x);
        return a.getTime()-b.getTime()
      })

      this.stats.visualRating.points.sort((a,b) => {
        a = new Date(a.x);
        b = new Date(b.x);
        return a.getTime()-b.getTime()
      })

      this.stats.fillRating.points.sort((a,b) => {
        a = new Date(a.x);
        b = new Date(b.x);
        return a.getTime()-b.getTime()
      })

      this.stats.safetyRating.points.sort((a,b) => {
        a = new Date(a.x);
        b = new Date(b.x);
        return a.getTime()-b.getTime()
      })

      this.stats.ecologyRating.points.sort((a,b) => {
        a = new Date(a.x);
        b = new Date(b.x);
        return a.getTime()-b.getTime()
      })

    },
    test(){
      console.log(this.stats.availabitityRating.points);
    },
  },
  async mounted() {
    // Api.getAllAnswers().then((response) => {
    //   console.log(response);
    //
    // })
    // await Api.getAnswerByPointId(4).then((response) => {
    // await Api.getAllAnswers().then((response) => {
    //   console.log(response)
    //   this.answers = response.data;
    // })
    // this.answers.forEach((element) => {
    //   this.answers[this.answers.indexOf(element)].created = dateformat(element.createdAt, 'dd.mm.yyyy');
    // })
    // console.log(this.answers)


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

    // await this.xz();

    // this.series.forEach((element) => {
    //     JSC.chart(`chartDiv${this.series.indexOf(element)}`, {
    //         type: 'column',
    //         debug: true,
    //         defaultBox_boxVisible:false,
    //         legend_visible:false,
    //         series: this.series[this.series.indexOf(element)]
    //     })
    // })

    await Api.getAnswerByPointId(4).then((response) => {
      this.answers = response.data
    })
    // this.answers[this.answers.indexOf(element)].created = dateformat(element.createdAt, 'dd.mm.yyyy');
    await this.answers.forEach((element) => {
      // this.stats.availabitityRating.points.push({x: dateformat(element.createdAt, 'dd.mm.yyyy'), y: element.availabitityRating})
      // this.stats.visualRating.points.push({x: dateformat(element.createdAt, 'dd.mm.yyyy'), y: element.visualRating})
      // this.stats.fillRating.points.push({x: dateformat(element.createdAt, 'dd.mm.yyyy'), y: element.fillRating})
      // this.stats.safetyRating.points.push({x: dateformat(element.createdAt, 'dd.mm.yyyy'), y: element.safetyRating})
      // this.stats.ecologyRating.points.push({x: dateformat(element.createdAt, 'dd.mm.yyyy'), y: element.ecologyRating})
      this.stats.availabitityRating.points.push({x: element.createdAt, y: element.availabitityRating})
      this.stats.visualRating.points.push({x: element.createdAt, y: element.visualRating})
      this.stats.fillRating.points.push({x: element.createdAt, y: element.fillRating})
      this.stats.safetyRating.points.push({x: element.createdAt, y: element.safetyRating})
      this.stats.ecologyRating.points.push({x: element.createdAt, y: element.ecologyRating})
    })
    console.log(this.stats)

    await this.sortByDate();


    let chartVisualRating = JSC.chart('chartDivVisualRating', {
      debug: false,
      type: 'area',
      legend_visible: false,
      title: {
        position: 'center',
        label: {
          align: 'center',
          text:
            '<b>Визуал</b>',
          style_fontWeight: 'normal'
          }
        },
        defaultPoint: {
          // label_text: 'Пока так',
        },
        series: [
          {
            // name: 'Upcoming Week',
            points: this.stats.visualRating.points
          }
        ]
      });

      let chartAvailabitityRating = JSC.chart('chartDivAvailabitityRating', {
        debug: false,
        type: 'area',
        legend_visible: false,
        xAxis: {
          defaultTick: { gridLine_width: 0, line_length: 0 }
        },
        title: {
          position: 'center',
          label: {
            align: 'center',
            text:
              '<b>Доступность</b>',
            style_fontWeight: 'normal'
          }
        },
        defaultPoint: {
          // label_text: 'Пока так',
        },
        series: [
          {
            // name: 'Upcoming Week',
            points: this.stats.availabitityRating.points
          }
        ]
      })

      let chartFillRating = JSC.chart('chartDivFillRating', {
        debug: false,
        type: 'area',
        legend_visible: false,
        title: {
          position: 'center',
          label: {
            align: 'center',
            text:
              '<b>Наполнение</b>',
            style_fontWeight: 'normal'
          }
        },
        defaultPoint: {
          // label_text: 'Пока так',
        },
        series: [
          {
            // name: 'Upcoming Week',
            points: this.stats.fillRating.points
          }
        ]
      })

    let chartSafetyRating = JSC.chart('chartDivSafetyRating', {
      debug: false,
      type: 'area',
      legend_visible: false,
      title: {
        position: 'center',
        label: {
          align: 'center',
          text:
            '<b>Безопасность</b>',
          style_fontWeight: 'normal'
        }
      },
      defaultPoint: {
        // label_text: 'Пока так',
      },
      series: [
        {
          // name: 'Upcoming Week',
          points: this.stats.safetyRating.points
        }
      ]
    })

    let chartEcologyRating = JSC.chart('chartDivEcologyRating', {
      debug: false,
      type: 'area',
      legend_visible: false,
      title: {
        position: 'center',
        label: {
          align: 'center',
          text:
            '<b>Экология</b>',
          style_fontWeight: 'normal'
        }
      },
      defaultPoint: {
        // label_text: 'Пока так',
      },
      series: [
        {
          // name: 'Upcoming Week',
          points: this.stats.ecologyRating.points
        }
      ]
    })

    let splitChart = JSC.chart('chartDivSplitChart', {
      legend_position: 'bottom right',
      type: 'area spline',
      defaultSeries: { shape_opacity: 0.5 },
      xAxis: {
        crosshair_enabled: true,
        scale: { type: 'time' }
      },
      title_label_text: '<b>Конкретная точка</b>',
      series: [
        {
          name: 'Визуал',
          points: this.stats.visualRating.points
        },
        {
          name: 'Доступность',
          points: this.stats.availabitityRating.points
        },
        {
          name: 'Наполнение',
          points: this.stats.fillRating.points
        },
        {
          name: 'Безопасность',
          points: this.stats.safetyRating.points
        },
        {
          name: 'Экология',
          points: this.stats.ecologyRating.points
        }
      ]
    })




  }
})
</script>
