<template>
  <div ref="result_chart"/>
</template>

<script>
import Plotly from 'plotly.js-dist'

export default {
  props: [
    'width', // 表示幅
    'height', // 表示高さ
    'assimilation_result', // データ同化結果 
    'optimization_result', // 最適化結果
    'actual_data', // 実データ
    'target_data', // 目標データ
  ],
  data () {
    return {
      data: [
      ],
      layout: {
        title: '',
        margin: {
          t: 30,
          b: 30,
        },
        plot_bgcolor: 'rgb(241, 246, 255)',
        paper_bgcolor: 'rgb(241, 246, 255)',
        xaxis: {
          range: [0, 1],
          showgrid:	false,
          zeroline: false,
          showticklabels: false,
          fixedrange: true,
        },
        yaxis: {
          range: [0, 0], // 全ての値のy座標のうち最大のもの×1.1
          showgrid:	false,
          zeroline: false,
          showticklabels: false,
        },
        shapes: [
          {
            // データ同化結果
            type: 'rect',
            line: {
              width: 0,
            },
            fillcolor: 'rgb(148, 169, 204)',
            x0	:	0.2,
            x1	:	0.4,
            y0	:	0,
            y1	:	0,
          },
          {
            // 最適化結果
            type: 'rect',
            line: {
              width: 0,
            },
            fillcolor: 'rgb(9, 53, 127)',
            x0	:	0.6,
            x1	:	0.9,
            y0	:	0,
            y1	:	0,

          },
          {
            // 実データ
            type: 'line',
            line: {
              width: 4,
              color: 'rgb(0, 204, 192)',
            },
            xref: 'paper',
            x0:	0.15,
            x1:	1,
            y0:	0, // 実データ
            y1:	0, // 実データ
          },
          {
            // 目標データ
            type: 'line',
            line: {
              width: 4,
              color: 'rgb(17, 169, 142)',
            },
            xref	:	'paper',
            x0:	0.15,
            x1:	1,
            y0:	0, // 目標データ
            y1:	0, // 目標データ
          },
        ],
        annotations: [
          {
            text: '<b>実データ</b>',
            showarrow: false,
            font: {
              color: "rgb(0, 0, 0)",
              family: "\"Noto Sans JP\", Avenir, Helvetica, Arial, sans-serif",
              size: 14,
            },
            x: 0,
            y: 0, // 実データ
          },
          {
            text: '<b>目標</b>',
            showarrow: false,
            font: {
              color: "rgb(0, 0, 0)",
              family: "\"Noto Sans JP\", Avenir, Helvetica, Arial, sans-serif",
              size: 14,
            },
            x: 0,
            y: 0, // 目標データ
          },
          {
            text: '<b>データ<br>同化結果</b>',
            showarrow: false,
            font: {
              color: "rgb(255, 255, 255)",
              family: "\"Noto Sans JP\", Avenir, Helvetica, Arial, sans-serif",
              size: 14,
            },
            x: 0.3,
            y: 3,
          },
          {
            text: '<b>最適化結果</b>',
            showarrow: false,
            font: {
              color: "rgb(255, 255, 255)",
              family: "\"Noto Sans JP\", Avenir, Helvetica, Arial, sans-serif",
              size: 14,
            },
            x: 0.75,
            y: 3,
          },
          {
            text: '',
            arrowside: 'end+start',
            arrowhead: 4,
            arrowwidth: 2,
            arrowcolor: 'rgb(252, 127, 232)',
            x: 0.375,
            ax: 0.375,
            axref: 'x',
            y: 0, // 最適化-同化
            ay: 0, // 最適化
            ayref: 'y',
          },
          {
            text: '<b> 改善値 </b>',
            showarrow: false,
            bgcolor: "rgb(252, 127, 232)",
            font: {
              color: "rgb(255, 255, 255)",
              family: "\"Noto Sans JP\", Avenir, Helvetica, Arial, sans-serif",
              size: 14,
            },
            x: 0.25,
            y: 0, // (最適化 + 同化) / 2
          },
          {
            text: '',
            arrowside: 'end+start',
            arrowhead: 4,
            arrowwidth: 2,
            arrowcolor: 'rgb(255, 176, 56)',
            x: 0.875,
            ax: 0.875,
            axref: 'x',
            y: 0, // 最適化
            ay: 0, // 目標
            ayref: 'y',
          },
          {
            text: '<b> 誤差 </b>',
            showarrow: false,
            bgcolor: "rgb(255, 176, 56)",
            font: {
              color: "rgb(255, 255, 255)",
              family: "\"Noto Sans JP\", Avenir, Helvetica, Arial, sans-serif",
              size: 14,
            },
            x: 0.975,
            y: 0, // (最適化 + 目標) / 2
          },
        ],
      },
      config: {
        responsive: true
      }
    }
  },
  mounted () {
    this.plotChart();
  },
  watch: {
    optimization_result: {
      handler: function () {
        this.plotChart();
      }
    },
    target_data: {
      handler: function () {
        this.plotChart();
      }
    },
    assimilation_result: {
      handler: function () {
        this.plotChart();
      }
    },
    actual_data: {
      handler: function () {
        this.plotChart();
      }
    },
  },
  methods: {
    plotChart() {
      this.setData();
      return Plotly.newPlot(this.$refs.result_chart, this.data, this.layout, this.config);
    },
    setData() {
      // サイズ
      if (this.width) this.layout.width = this.width;
      if (this.height) this.layout.height = this.height;

      // レイアウトの表示高さ
      this.layout.yaxis.range[1] = 1.1 * Math.max(
        this.assimilation_result,
        this.optimization_result,
        this.actual_data,
        this.target_data
      )

      // データ同化バー
      this.layout.shapes[0].y1 = this.assimilation_result;
      // 最適化バー
      this.layout.shapes[1].y1 = this.optimization_result;
      // 実データ線
      this.layout.shapes[2].y0 = this.actual_data;
      this.layout.shapes[2].y1 = this.actual_data;
      //目標線
      this.layout.shapes[3].y0 = this.target_data;
      this.layout.shapes[3].y1 = this.target_data;

      // 実データラベル
      this.layout.annotations[0].y = this.actual_data;
      // 目標ラベル
      this.layout.annotations[1].y = this.target_data;
      // 改善値矢印
      this.layout.annotations[4].y = this.assimilation_result;
      this.layout.annotations[4].ay = this.optimization_result;
      // 改善値ラベル
      this.layout.annotations[5].y = (this.optimization_result + this.assimilation_result) / 2;
      // 誤差矢印
      this.layout.annotations[6].y = this.optimization_result;
      this.layout.annotations[6].ay = this.target_data;
      // 誤差ラベル
      this.layout.annotations[7].y = (this.optimization_result + this.target_data) / 2;
    },
  }
} 
</script>
