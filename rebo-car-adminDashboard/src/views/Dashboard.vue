<template>
  <div>

    <base-header class=" pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->

    </base-header>

    <!--Charts-->
    <b-container fluid class="mt--7">
      <b-row>
        <b-col xl="8" class="mb-5 mb-xl-0">
          <card type="default" header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                <h5 class="h3 text-white mb-0">Sales value</h5>
              </b-col>
              <b-col>
                <b-nav class="nav-pills justify-content-end">
                  <b-nav-item class="mr-2 mr-md-0" :active="bigLineChart.activeIndex === 0" link-classes="py-2 px-3"
                    @click.prevent="initBigChart(0)">
                    <span class="d-none d-md-block">Month</span>
                    <span class="d-md-none">M</span>
                  </b-nav-item>
                  <b-nav-item link-classes="py-2 px-3" :active="bigLineChart.activeIndex === 1"
                    @click.prevent="initBigChart(1)">
                    <span class="d-none d-md-block">Year</span>
                    <span class="d-md-none">W</span>
                  </b-nav-item>
                </b-nav>
              </b-col>
            </b-row>
            <line-chart :height="350" ref="bigChart" :chart-data="bigLineChart.chartData"
              :extra-options="bigLineChart.extraOptions">
            </line-chart>
          </card>
        </b-col>

        <b-col xl="4" class="mb-5 mb-xl-0">
          <card header-classes="bg-transparent">
            <b-row align-v="center" slot="header">
              <b-col>
                <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
                <h5 class="h3 mb-0">Total orders</h5>
              </b-col>
            </b-row>

            <bar-chart :height="350" ref="barChart" :chart-data="redBarChart.chartData">
            </bar-chart>
          </card>
        </b-col>
      </b-row>

      <card type="default" header-classes="bg-transparent" class="mt-5 mb-4">
        <b-row align-v="center" slot="header">
          <b-col>
            <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
            <h5 class="h3 text-white mb-0">Car register</h5>
          </b-col>
          <b-col>
            <b-nav class="nav-pills justify-content-end">
              <b-nav-item class="mr-2 mr-md-0" :active="bigCarLineChart.activeIndex === 0" link-classes="py-2 px-3"
                @click.prevent="initBigCarLineChart(0)">
                <span class="d-none d-md-block">Month</span>
                <span class="d-md-none">M</span>
              </b-nav-item>
              <b-nav-item link-classes="py-2 px-3" :active="bigCarLineChart.activeIndex === 1"
                @click.prevent="initBigCarLineChart(1)">
                <span class="d-none d-md-block">Year</span>
                <span class="d-md-none">W</span>
              </b-nav-item>
            </b-nav>
          </b-col>
        </b-row>
        <line-chart :height="350" ref="bigChart" :chart-data="bigCarLineChart.chartData"
          :extra-options="bigLineChart.extraOptions">
        </line-chart>
      </card>



      <!-- End charts-->

      <!--Tables-->
      <!-- <b-row class="mt-5">
        <b-col xl="8" class="mb-5 mb-xl-0">
          <page-visits-table></page-visits-table>
        </b-col>
        <b-col xl="4" class="mb-5 mb-xl-0">
          <social-traffic-table></social-traffic-table>
        </b-col>
      </b-row> -->
      <!--End tables-->
    </b-container>

  </div>
</template>
<script>
// Charts
import * as chartConfigs from '@/components/Charts/config';
import LineChart from '@/components/Charts/LineChart';
import BarChart from '@/components/Charts/BarChart';

// Components
import BaseProgress from '@/components/BaseProgress';
import StatsCard from '@/components/Cards/StatsCard';

// Tables
import SocialTrafficTable from './Dashboard/SocialTrafficTable';
import PageVisitsTable from './Dashboard/PageVisitsTable';

//API
import { RepositoryFactory } from "@/apis/repositoryFactory";

const ordersRepo = RepositoryFactory.get('orders')
const carsRepo = RepositoryFactory.get('cars')

export default {
  components: {
    LineChart,
    BarChart,
    BaseProgress,
    StatsCard,
    PageVisitsTable,
    SocialTrafficTable
  },
  data() {
    return {
      bigLineChart: {
        allData: [
          [],
          []
        ],
        allLabel: [
          [],
          []
        ],
        activeIndex: 0,
        chartData: {
          datasets: [
            {
              label: 'Performance',
              data: [],
            }
          ],
          labels: [],
        },
        extraOptions: chartConfigs.blueChartOptions,
      },
      bigCarLineChart: {
        allData: [
          [],
          []
        ],
        allLabel: [
          [],
          []
        ],
        activeIndex: 0,
        chartData: {
          datasets: [
            {
              label: 'Performance',
              data: [],
            }
          ],
          labels: [],
        },
        extraOptions: chartConfigs.blueChartOptions,
      },

      redBarChart: {
        allData: [
          [],
          []
        ],
        allLabel: [
          [],
          []
        ],
        chartData: {
          labels: [],
          datasets: [{
            label: 'Sales',
            data: []
          }]
        },
        extraOptions: chartConfigs.blueChartOptions
      }
    };
  },
  methods: {
    async initBigChart(index) {
      this.resetData()

      await this.fillDataToChart()

      let chartData = {
        datasets: [
          {
            label: 'Sale',
            data: this.bigLineChart.allData[index]
          }
        ],
        labels: this.bigLineChart.allLabel[index],
      };
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;


      let redChartData = {
        datasets: [
          {
            label: 'Sales',
            data: this.redBarChart.allData[index]
          }
        ],
        labels: this.redBarChart.allLabel[index],
      };

      this.redBarChart.chartData = redChartData

    },

    async initBigCarLineChart(index) {
      this.resetCarChartData()

      await this.fillCarDataToChart()

      let chartData = {
        datasets: [
          {
            label: 'Cars Total',
            data: this.bigCarLineChart.allData[index]
          }
        ],
        labels: this.bigCarLineChart.allLabel[index],
      };
      this.bigCarLineChart.chartData = chartData;
      this.bigCarLineChart.activeIndex = index;




    },

    resetCarChartData() {
      this.bigCarLineChart.allData[0] = []
      this.bigCarLineChart.allData[1] = []
      this.bigCarLineChart.allLabel[0] = []
      this.bigCarLineChart.allLabel[1] = []
    },


    resetData() {
      this.bigLineChart.allData[0] = []
      this.bigLineChart.allData[1] = []
      this.bigLineChart.allLabel[0] = []
      this.bigLineChart.allLabel[1] = []


      this.redBarChart.allData[0] = []
      this.redBarChart.allData[1] = []
      this.redBarChart.allLabel[0] = []
      this.redBarChart.allLabel[1] = []
    },
    async fillCarDataToChart() {
      const result1 = await carsRepo.getCarStatics({ filter: 'month' })
      const cars1 = result1.data.metadata.cars

      for (let i = 0; i < cars1.length; i++) {
        this.bigCarLineChart.allData[0].push(cars1[i].totalCars)
        this.bigCarLineChart.allLabel[0].push(`${cars1[i]._id.month}/${cars1[i]._id.year}`)

      }

      const result2 = await carsRepo.getCarStatics({})
      const cars2 = result2.data.metadata.cars
      for (let i = 0; i < cars2.length; i++) {
        this.bigCarLineChart.allData[1].push(cars2[i].totalCars)
        this.bigCarLineChart.allLabel[1].push(`${cars2[i]._id.year}`)

      }
    },

    async fillDataToChart() {
      const result1 = await ordersRepo.getOrderStatics({ filter: 'month' })
      const orders1 = result1.data.metadata.orders
      console.log({ orders1 })
      for (let i = 0; i < orders1.length; i++) {
        this.bigLineChart.allData[0].push(orders1[i].totalSales)
        this.bigLineChart.allLabel[0].push(`${orders1[i]._id.month}/${orders1[i]._id.year}`)
        this.redBarChart.allData[0].push(orders1[i].totalOrders)
        this.redBarChart.allLabel[0].push(`${orders1[i]._id.month}/${orders1[i]._id.year}`)
      }

      const result2 = await ordersRepo.getOrderStatics({})
      const orders2 = result2.data.metadata.orders
      for (let i = 0; i < orders2.length; i++) {
        this.bigLineChart.allData[1].push(orders2[i].totalSales)
        this.bigLineChart.allLabel[1].push(`${orders2[i]._id.year}`)
        this.redBarChart.allData[1].push(orders2[i].totalOrders)
        this.redBarChart.allLabel[1].push(`${orders2[i]._id.year}`)
      }
    },

  },





  mounted() {
    this.initBigChart(0);
    this.initBigCarLineChart(0)
  },

};
</script>
<style>
.el-table .cell {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
