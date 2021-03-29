<template>
  <div>
    <!-- メインエリア -->
    <main>
      <b-container class="data-area mt-5">
        <b-row>
          <b-col cols="6" class="result-chart-area">
            <optimization-result-chart
              :optimization_result="optimization_result"
              :target_data="target_data"
              :assimilation_result="assimilation_result"
              :actual_data="actual_data"
            />
          </b-col>
          <b-col cols="6" class="pl-4 py-5">
              <p
                :class="{
                  h3: true,
                  'font-weight-bold': true,
                  'mt-5': !is_optimization,
                }"
              >
                <font-awesome-icon
                  icon="arrows-alt-v"
                  class="mx-3 absolute-error-icon"
                />絶対誤差（相対誤差）
              </p>
              <p class="h3 font-weight-bold ml-5">
                {{ absolute_error }} ({{ relative_error }} %)
              </p>
              <div v-if="is_optimization" class="mt-4">
                <b-row class="mt-4">
                  <b-col cols="6" class="mean-col">
                    <label class="optimization-result-text">
                      <font-awesome-icon icon="square-full" class="mx-2" />
                      最適化結果
                    </label>
                    <b-form-input
                      v-model.number="optimization_result"
                      type="number"
                      step="0.1"
                    ></b-form-input>
                  </b-col>
                  <b-col cols="6" class="mean-col">
                    <label class="target-data-text">
                      <font-awesome-icon icon="minus" class="mx-2" />
                      目標データ
                    </label>
                    <b-form-input
                      v-model.number="target_data"
                      type="number"
                      step="0.1"
                    ></b-form-input>
                  </b-col>
                </b-row>
                <p class="h3 font-weight-bold mt-5">
                  <font-awesome-icon
                    icon="arrows-alt-v"
                    class="mx-3 improvement-value-icon"
                  />改善値
                </p>
                <p class="h3 font-weight-bold ml-5">
                  {{ absolute_error }} ({{ relative_error }} %)
                </p>
              </div>
              <b-row class="mt-4">
                <b-col cols="6" class="mean-col">
                  <label class="actual-data-mean-text">
                    <font-awesome-icon icon="square-full" class="mx-2" />
                    データ同化結果
                  </label>
                  <b-form-input
                    v-model.number="assimilation_result"
                    type="number"
                    step="0.1"
                  ></b-form-input>
                </b-col>
                <b-col cols="6" class="mean-col">
                  <label class="estimated-data-mean-text">
                    <font-awesome-icon icon="minus" class="mx-2" />
                    実データ
                  </label>
                  <b-form-input
                    v-model.number="actual_data"
                    type="number"
                    step="0.1"
                  ></b-form-input>
                </b-col>
              </b-row>
            </b-col>
        </b-row>
      </b-container>
    </main>
  </div>
</template>

<script>
import OptimizationResultChart from './OptimizationResultChart.vue';

export default {
  components: {
    OptimizationResultChart,
  },
  data() {
    return {
      is_optimization: true,
      absolute_error: 1.1,
      relative_error: 5.34,
      optimization_result: 20.6,
      target_data: 25,
      assimilation_result: 9,
      actual_data: 11,
    }
  },
  mounted() {

  }
};
</script>

<style scoped>
.result-chart-area {
  background-color: #f1f6ff;
}
.data-area {
  border: 3px solid #f1f6ff;
  border-radius: 2px;
  font-weight: bold;
}
.mean-col > .form-control {
  width: 80%;
}
.form-control {
  background-color: #f1f6ff;
  border: 0px;
}
.absolute-error-icon {
  color: #ffb038;
}
.optimization-result-text {
  color: #09357f;
}
.target-data-text {
  color: #11a98e;
}
.improvement-value-icon {
  color: #fc7fe8;
}
.actual-data-mean-text {
  color: #94a9cc;
}
.estimated-data-mean-text {
  color: #00ccc0;
}
</style>
