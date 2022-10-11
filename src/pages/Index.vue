<template>
  <q-page class="flex flex-center">
<!--      <q-btn @click="test"></q-btn>-->
      <div id="map" style="min-height:100vh; width: 100%"></div>
      <q-dialog v-if="curPoint" persistent v-model="showDialog" full-width transition-show="rotate" transition-hide="rotate">
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
                          v-model="answers.Availability.rating"
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
                      <q-btn v-if="!answers.Availability.check" flat color="primary" @click="answers.Availability.check = true" label="Добавить отзыв" />
                      <div v-if="answers.Availability.check" class="q-pa-md" style="width: 100%;">
                        <q-input
                          v-model="answers.Availability.addition"
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
                          v-model="answers.Visual.rating"
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
                      <q-btn v-if="!answers.Visual.check" flat color="primary" @click="answers.Visual.check = true" label="Добавить отзыв" />
                      <div v-if="answers.Visual.check" class="q-pa-md" style="width: 100%;">
                        <q-input
                          v-model="answers.Visual.addition"
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
                          v-model="answers.Fill.rating"
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
                      <q-btn v-if="!answers.Fill.check" flat color="primary" @click="answers.Fill.check = true" label="Добавить отзыв" />
                      <div v-if="answers.Fill.check" class="q-pa-md" style="width: 100%;">
                        <q-input
                          v-model="answers.Fill.addition"
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
                          v-model="answers.Safety.rating"
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
                      <q-btn v-if="!answers.Safety.check" flat color="primary" @click="answers.Safety.check = true" label="Добавить отзыв" />
                      <div v-if="answers.Safety.check" class="q-pa-md" style="width: 100%;">
                        <q-input
                          v-model="answers.Safety.addition"
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
                          v-model="answers.Ecology.rating"
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
                      <q-btn v-if="!answers.Ecology.check" flat color="primary" @click="answers.Ecology.check = true" label="Добавить отзыв" />
                      <div v-if="answers.Ecology.check" class="q-pa-md" style="width: 100%;">
                        <q-input
                          v-model="answers.Ecology.addition"
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
                      <q-btn v-if="step === 6" @click="send" color="primary" label="Завершить" />
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
      <q-dialog v-if="showFinish == true" v-model="showFinish" full-width transition-show="rotate" transition-hide="rotate">
        <q-card>
          <q-card-section>
            <div class="text-h6">Спасибо, конечно...</div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Decline" color="primary" v-close-popup />
            <q-btn flat label="Accept" color="primary" v-close-popup />
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
    showFinish: false,
    map: null,
    curPoint: null,
    mark: [],
    points: null,
    coords: [],
    answers: {
      Availability: {
        rating: 0,
        addition: null,
        check: false,
      },
      Visual: {
        rating: 0,
        addition: null,
        check: false,
      },
      Fill: {
        rating: 0,
        addition: null,
        check: false,
      },
      Safety: {
        rating: 0,
        addition: null,
        check: false,
      },
      Ecology: {
        rating: 0,
        addition: null,
        check: false,
      },
    },
  }),
  methods: {
    test(e){
      console.log(e);
    },
    send(){
      this.showDialog = false;
      console.log(this.answers);
      this.showFinish = true;
    },
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
