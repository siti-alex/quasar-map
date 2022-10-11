<template>
  <q-page class="flex flex-center">
<!--      <q-btn @click="test"></q-btn>-->
      <div id="map" style="min-height:100vh; width: 100%"></div>
      <q-dialog v-if="curPoint" v-model="showDialog" full-width transition-show="rotate" transition-hide="rotate">
        <q-card>
            <q-img
              width="100%"
              height="35vh"
              :src="this.curPoint.img"
              :ratio="4/3"
            >
              <div class="absolute-bottom text-subtitle1 text-center">
                {{ this.curPoint.title }}
              </div>
            </q-img>
          <q-card-section class="q-pt-none">
<!--            stepper-->
              <div class="q-pa-md">
                <q-stepper
                  flat
                  v-model="step"
                  ref="stepper"
                  color="primary"
                  animated
                >
                  <q-step
                    :name="1"
                    title="Пройдите опрос"
                    icon="settings"
                    :done="step > 1"
                  >
                    For each ad campaign that you create, you can control how much you're willing to
                    spend on clicks and conversions, which networks and geographical locations you want
                    your ads to show on, and more.
                  </q-step>

                  <q-step
                    :name="2"
                    title="Доступность"
                    icon="create_new_folder"
                    :done="step > 2"
                  >
                    Доступность пространства характеризуется удобством для пешеходов,
                    которые передвигаются по его территории. К факторам, влияющим на
                    доступность для пешеходов относятся: связь между улицами, плотность
                    жилых построек, наличие озеленения, также насколько часто расположены
                    здания и их входы.
                    <div style="text-align: center;">
                      <div class="q-pa-md">
                        <q-rating
                          v-model="curPoint.answers.Availability.rating"
                          size="4em"
                          :max="5"
                          color="primary"
                        >
                          <template v-slot:tip-1>
                            <q-tooltip>Ужасно</q-tooltip>
                          </template>
                          <template v-slot:tip-2>
                            <q-tooltip>Плохо</q-tooltip>
                          </template>
                          <template v-slot:tip-3>
                            <q-tooltip>Нормально</q-tooltip>
                          </template>
                          <template v-slot:tip-4>
                            <q-tooltip>Хорошо</q-tooltip>
                          </template>
                          <template v-slot:tip-5>
                            <q-tooltip>Отлично</q-tooltip>
                          </template>
                        </q-rating>
                      </div>
                      <q-btn v-if="!curPoint.answers.Availability.check" flat color="primary" @click="curPoint.answers.Availability.check = true" label="Добавить отзыв" />
                      <div v-if="curPoint.answers.Availability.check" class="q-pa-md" style="width: 100%;">
                        <q-input
                          v-model="curPoint.answers.Availability.addition"
                          filled
                          type="textarea"
                          label="Напишите имеющиеся пожелания"
                        />
                      </div>
                    </div>

                  </q-step>

                  <q-step
                    :name="3"
                    title="Визуальное"
                    caption="восприятие"
                    icon="assignment"
                    :done="step > 3"
                  >
                    Дайте оценку визуальному оформлению общественно-культурного объекта,
                    гармонию деталей, пространственное решение.
                    <div style="text-align: center;">
                      <div class="q-pa-md">
                        <q-rating
                          v-model="curPoint.answers.Visual.rating"
                          size="4em"
                          :max="5"
                          color="primary"
                        >
                          <template v-slot:tip-1>
                            <q-tooltip>Ужасно</q-tooltip>
                          </template>
                          <template v-slot:tip-2>
                            <q-tooltip>Плохо</q-tooltip>
                          </template>
                          <template v-slot:tip-3>
                            <q-tooltip>Нормально</q-tooltip>
                          </template>
                          <template v-slot:tip-4>
                            <q-tooltip>Хорошо</q-tooltip>
                          </template>
                          <template v-slot:tip-5>
                            <q-tooltip>Отлично</q-tooltip>
                          </template>
                        </q-rating>
                      </div>
                      <q-btn v-if="!curPoint.answers.Visual.check" flat color="primary" @click="curPoint.answers.Visual.check = true" label="Добавить отзыв" />
                      <div v-if="curPoint.answers.Visual.check" class="q-pa-md" style="width: 100%;">
                        <q-input
                          v-model="curPoint.answers.Visual.addition"
                          filled
                          type="textarea"
                          label="Напишите имеющиеся пожелания"
                        />
                      </div>
                    </div>
                  </q-step>

                  <q-step
                    :name="4"
                    title="Наполнение"
                    icon="add_comment"
                    :done="step > 4"
                  >
                    Оцените наличие площадок для отдыха различными развлекательными,
                    спортивными или коммерческими зонами. Например, торговые точки со сладостями,
                    или спортивные площадки.
                    <div style="text-align: center;">
                      <div class="q-pa-md">
                        <q-rating
                          v-model="curPoint.answers.Fill.rating"
                          size="4em"
                          :max="5"
                          color="primary"
                        >
                          <template v-slot:tip-1>
                            <q-tooltip>Ужасно</q-tooltip>
                          </template>
                          <template v-slot:tip-2>
                            <q-tooltip>Плохо</q-tooltip>
                          </template>
                          <template v-slot:tip-3>
                            <q-tooltip>Нормально</q-tooltip>
                          </template>
                          <template v-slot:tip-4>
                            <q-tooltip>Хорошо</q-tooltip>
                          </template>
                          <template v-slot:tip-5>
                            <q-tooltip>Отлично</q-tooltip>
                          </template>
                        </q-rating>
                      </div>
                      <q-btn v-if="!curPoint.answers.Fill.check" flat color="primary" @click="curPoint.answers.Fill.check = true" label="Добавить отзыв" />
                      <div v-if="curPoint.answers.Fill.check" class="q-pa-md" style="width: 100%;">
                        <q-input
                          v-model="curPoint.answers.Fill.addition"
                          filled
                          type="textarea"
                          label="Напишите имеющиеся пожелания"
                        />
                      </div>
                    </div>
                  </q-step>

                  <q-step
                    :name="5"
                    title="Безопаность"
                    icon="add_comment"
                    :done="step > 5"
                  >
                    Имеются ли системы видеонаблюдения, колонны экстренного вызова или посты полиции.
                    Так же сюда относится наличие ограждений там, где существует опасность травмироваться.
                    <div style="text-align: center;">
                      <div class="q-pa-md">
                        <q-rating
                          v-model="curPoint.answers.Safety.rating"
                          size="4em"
                          :max="5"
                          color="primary"
                        >
                          <template v-slot:tip-1>
                            <q-tooltip>Ужасно</q-tooltip>
                          </template>
                          <template v-slot:tip-2>
                            <q-tooltip>Плохо</q-tooltip>
                          </template>
                          <template v-slot:tip-3>
                            <q-tooltip>Нормально</q-tooltip>
                          </template>
                          <template v-slot:tip-4>
                            <q-tooltip>Хорошо</q-tooltip>
                          </template>
                          <template v-slot:tip-5>
                            <q-tooltip>Отлично</q-tooltip>
                          </template>
                        </q-rating>
                      </div>
                      <q-btn v-if="!curPoint.answers.Safety.check" flat color="primary" @click="curPoint.answers.Safety.check = true" label="Добавить отзыв" />
                      <div v-if="curPoint.answers.Safety.check" class="q-pa-md" style="width: 100%;">
                        <q-input
                          v-model="curPoint.answers.Safety.addition"
                          filled
                          type="textarea"
                          label="Напишите имеющиеся пожелания"
                        />
                      </div>
                    </div>
                  </q-step>

                  <q-step
                    :name="6"
                    title="Экология"
                    icon="add_comment"
                    :done="step > 6"
                  >
                    Наличие "зеленой" зоны с деревьями, растениями, водоёмами. Загрязненность воздуха.
                    <div style="text-align: center;">
                      <div class="q-pa-md">
                        <q-rating
                          v-model="curPoint.answers.Ecology.rating"
                          size="4em"
                          :max="5"
                          color="primary"
                        >
                          <template v-slot:tip-1>
                            <q-tooltip>Ужасно</q-tooltip>
                          </template>
                          <template v-slot:tip-2>
                            <q-tooltip>Плохо</q-tooltip>
                          </template>
                          <template v-slot:tip-3>
                            <q-tooltip>Нормально</q-tooltip>
                          </template>
                          <template v-slot:tip-4>
                            <q-tooltip>Хорошо</q-tooltip>
                          </template>
                          <template v-slot:tip-5>
                            <q-tooltip>Отлично</q-tooltip>
                          </template>
                        </q-rating>
                      </div>
                      <q-btn v-if="!curPoint.answers.Ecology.check" flat color="primary" @click="curPoint.answers.Ecology.check = true" label="Добавить отзыв" />
                      <div v-if="curPoint.answers.Ecology.check" class="q-pa-md" style="width: 100%;">
                        <q-input
                          v-model="curPoint.answers.Ecology.addition"
                          filled
                          type="textarea"
                          label="Напишите имеющиеся пожелания"
                        />
                      </div>
                    </div>
                  </q-step>

                  <template v-slot:navigation>
                    <q-stepper-navigation>
                      <q-btn v-if="step < 6" @click="$refs.stepper.next()" color="primary" label="Продолжить" />
                      <q-btn v-if="step === 6" @click="$refs.stepper.next()" color="primary" label="Завершить" />
                      <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Назад" class="q-ml-sm" />
                    </q-stepper-navigation>
                  </template>
                </q-stepper>
              </div>
<!--          end stepper-->
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Отмена" color="primary" v-close-popup />
<!--            <q-btn flat label="Accept" color="primary" v-close-popup />-->
          </q-card-actions>
        </q-card>
      </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { ref } from 'vue'
import Api from 'boot/axios'
// import DG from '2gis-maps';
export default defineComponent({
  name: 'PageIndex',
  setup () {
    return {
      step: ref(1),
      // ratingModel: ref(0)
    }
  },
  data: () => ({

    showDialog: true,
    map: null,
    curPoint: null,
    mark: [],
    points: null,
    coords: [],
  }),
  methods: {
    test(e){
      console.log('Ты нажал по мне');
      console.log(e);
    }
  },
  async mounted() {
    let DG = require('2gis-maps');
    this.map = DG.map('map', {
      'center': [50.270136, 127.537874],
      'zoom': 13
    });
    // this.points.forEach((element) => {
    //   this.mark.push(DG.marker(element.coords).addTo(this.map).bindPopup(element.title));
    // })

  await Api.getAllPoints().then((response) => {
      this.points = response.data;
      this.points.forEach((element) => {
        this.points[this.points.indexOf(element)].coords = [element.coordX, element.coordY];
        this.mark.push(DG.marker(element.coords).addTo(this.map).bindPopup(element.title));
      })
      console.log(this.points)
    })

    this.mark.forEach((element => {
      element.on('click', (e) => {
        this.points.forEach((el) => {
          if (el.title == e.target.getPopup()._bodyContent) {
            this.test(el);
            this.curPoint = el;
            this.showDialog = true;
            this.step = 1;
          }
        })
      })
    }))

  }
})
</script>
