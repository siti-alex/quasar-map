<template>
  <div>
    <div class="flex flex-center">
      <p class="text-h6" style="padding-top: 10px">Надпись</p>
    </div>
    <div class="row q-pa-md flex flex-center">
      <div class="col" id="chartDivVisualRating" style="width: 100%; height: 300px;"/>
      <div class="col" id="chartDivAvailabitityRating" style="width: 100%; height: 300px;"/>
      <div class="col" id="chartDivFillRating" style="width: 100%; height: 300px;"/>
      <div class="col" id="chartDivSafetyRating" style="width: 100%; height: 300px;"/>
      <div class="col" id="chartDivEcologyRating" style="width: 100%; height: 300px;"/>
    </div>
    <div class="q-pa-md flex flex-center row" style="padding: 30px">
      <div class="col-9" id="chartDivSplitChart" style="height: 400px;"/>
      <div class="col-3" id="chartDivRadarChart" style="height: 400px;"/>
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

    await Api.getAnswerByPointId(this.$route.params.id).then((response) => {
      this.answers = response.data
    })
    await this.answers.forEach((element) => {
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
      title_label_text: '<b>Коррелирующая диаграмма</b>',
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

    let radarChart = JSC.chart('chartDivRadarChart', {
      debug: false,
      type: 'radar area',
      legend_visible: false,
      xAxis: {
        scale: { type: 'time' }
      },
      title: {
        position: 'center',
        label: {
          text: '<b>Количество голосов за месяц</b>',
          style: { fontSize: 15, fontWeight: 'normal' }
        }
      },
      defaultSeries: {
        opacity: 0.7,
        defaultPoint_marker: {
          outline: { color: 'white', width: 2 },
          size: 12
        }
      },
      series: [
        {
          points: this.stats.safetyRating.points
        }
      ]
    })




  }
})
</script>
