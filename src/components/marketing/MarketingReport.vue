/* eslint-disable vue/no-parsing-error */
/* eslint-disable vue/valid-v-bind */
/* eslint-disable vue/no-parsing-error */
 <template>
 <div>
<Pivot
          ref="pivotTableMarketing"
          v-bind:toolbar="true"
          v-bind:report="{}"
          >
         </Pivot>
         <h3 class="marketingTitle">Top Traffic Sources by Countries</h3>
         <Pivot class="marketingCharts"
          ref="pivotChartsMarketing"
          v-bind:toolbar="false"
          v-bind:report="{}"
          >
         </Pivot>
         <Pivot class="marketingCharts"
          ref="marketingPieChart"
          v-bind:toolbar="false"
          v-bind:report="{}"
          >
         </Pivot>
 </div>
</template>

<style>
.fm-charts-color-1 {
    fill: #0081ef !important;
}

.fm-charts-color-2 {
    fill: #009c07 !important;
}

.fm-charts-color-3 {
    fill: #00C1C9 !important;
}

.fm-charts-color-4 {
    fill: #ff7e60 !important;
}

.fm-charts-color-5 {
    fill: #9900ae !important;
}

.fm-charts-color-6 {
    fill: #debb2e !important;
}

.fm-charts-color-7 {
    fill: #009688 !important;
}

.marketingCharts {
  margin-top: 20px;
}

h3.marketingTitle {
    text-align: center;
    vertical-align: top;
    font-size: 18px;
    position: relative;
    margin-top: 30px;
}

text#fm-yAxis-label {
visibility: hidden !important;
}

text#fm-xAxis-label {
visibility: hidden !important;
}

text.fm-x.fm-axis.fm-title {
visibility: hidden !important;
}

</style>


<script>

import MarketingService from '@/api-services/marketing.service';

export default {
  name: 'MarketingReport',
  mounted() {
    MarketingService.getAll().then((response) => {
      const responseData = response.data;
      const pivotReport = {
        dataSource: {
          type: 'json',
          data: responseData,
          mapping: {
            traffic_id: {
              type: 'string',
              caption: 'Traffic ID',
            },
            country: {
              type: 'string',
              caption: 'Country',
            },
            type: {
              type: 'string',
              caption: 'Type',
            },
            source: {
              type: 'string',
              caption: 'Source',
            },
            date: {
              type: 'date',
              caption: 'Date',
            },
            sessions: {
              type: 'number',
              caption: 'Sessions',
            },
            clicks: {
              type: 'number',
              caption: 'Clicks',
            },
            campaign_cost: {
              type: 'string',
              caption: 'Campaign Cost',
            },
            purchase_cost: {
              type: 'number',
              caption: 'Purchase Cost',
            },
            sales: {
              type: 'number',
              caption: 'Sales',
            },
            opportunities: {
              type: 'number',
              caption: 'Opportunities',
            },
            leads: {
              type: 'number',
              caption: 'Leads',
            },
          },
        },
        slice: {
          reportFilters: [
            {
              uniqueName: 'country',
            },
            {
              uniqueName: 'date.Year',
            },
          ],
          rows: [
            {
              uniqueName: 'type',
            },
            {
              uniqueName: 'source',
            },
          ],
          columns: [
            {
              uniqueName: '[Measures]',
            },
          ],
          measures: [
            {
              uniqueName: 'sessions',
              aggregation: 'sum',
            },
            {
              uniqueName: 'sales',
              aggregation: 'sum',
            },
            {
              uniqueName: 'opportunities',
              aggregation: 'sum',
            },
            {
              uniqueName: 'leads',
              aggregation: 'sum',
            },
          ],
          expands: {
            rows: [
              {
                tuple: [
                  'type.[organic]',
                ],
              },
              {
                tuple: [
                  'type.[paid]',
                ],
              },
            ],
          },
        },
        options: {
          grid: {
            type: 'classic',
          },
        },
      };
      this.$refs.pivotTableMarketing.flexmonster.setReport(pivotReport);

      const pivotChartReport = {
        dataSource: {
          type: 'json',
          data: responseData,
          mapping: {
            traffic_id: {
              type: 'string',
              caption: 'Traffic ID',
            },
            country: {
              type: 'string',
              caption: 'Country',
            },
            type: {
              type: 'string',
              caption: 'Type',
            },
            source: {
              type: 'string',
              caption: 'Source',
            },
            date: {
              type: 'date',
              caption: 'Date',
            },
            sessions: {
              type: 'number',
              caption: 'Sessions',
            },
            clicks: {
              type: 'number',
              caption: 'Clicks',
            },
            campaign_cost: {
              type: 'string',
              caption: 'Campaign Cost',
            },
            purchase_cost: {
              type: 'number',
              caption: 'Purchase Cost',
            },
            sales: {
              type: 'number',
              caption: 'Sales',
            },
            opportunities: {
              type: 'number',
              caption: 'Opportunities',
            },
            leads: {
              type: 'number',
              caption: 'Leads',
            },
          },
        },
        slice: {
          reportFilters: [
            {
              uniqueName: 'date.Year',
            },
          ],
          rows: [
            {
              uniqueName: 'type',
            },
            {
              uniqueName: 'source',
            },
          ],
          columns: [
            {
              uniqueName: 'country',
            },
            {
              uniqueName: '[Measures]',
            },
          ],
          measures: [
            {
              uniqueName: 'sessions',
              aggregation: 'sum',
            },
            {
              uniqueName: 'sales',
              aggregation: 'sum',
            },
            {
              uniqueName: 'opportunities',
              aggregation: 'sum',
            },
            {
              uniqueName: 'leads',
              aggregation: 'sum',
            },
          ],
          expands: {
            rows: [
              {
                tuple: [
                  'type.[organic]',
                ],
              },
              {
                tuple: [
                  'type.[paid]',
                ],
              },
            ],
          },
        },
        options: {
          viewType: 'charts',
          grid: {
            type: 'classic',
          },
          chart: {
            type: 'stacked_column',
          },
        },
      };
      this.$refs.pivotChartsMarketing.flexmonster.setReport(pivotChartReport);

      const pieChartReport = {
        dataSource: {
          type: 'json',
          data: responseData,
          mapping: {
            traffic_id: {
              type: 'string',
              caption: 'Traffic ID',
            },
            country: {
              type: 'string',
              caption: 'Country',
            },
            type: {
              type: 'string',
              caption: 'Type',
            },
            source: {
              type: 'string',
              caption: 'Source',
            },
            date: {
              type: 'date',
              caption: 'Date',
            },
            sessions: {
              type: 'number',
              caption: 'Sessions',
            },
            clicks: {
              type: 'number',
              caption: 'Clicks',
            },
            campaign_cost: {
              type: 'string',
              caption: 'Campaign Cost',
            },
            purchase_cost: {
              type: 'number',
              caption: 'Purchase Cost',
            },
            sales: {
              type: 'number',
              caption: 'Sales',
            },
            opportunities: {
              type: 'number',
              caption: 'Opportunities',
            },
            leads: {
              type: 'number',
              caption: 'Leads',
            },
          },
        },
        slice: {
          reportFilters: [
            {
              uniqueName: 'type',
            },
          ],
          rows: [
            {
              uniqueName: 'source',
            },
          ],
          columns: [
            {
              uniqueName: '[Measures]',
            },
          ],
          measures: [
            {
              uniqueName: 'sessions',
              aggregation: 'sum',
            },
            {
              uniqueName: 'sales',
              aggregation: 'sum',
            },
            {
              uniqueName: 'opportunities',
              aggregation: 'sum',
            },
            {
              uniqueName: 'leads',
              aggregation: 'sum',
            },
          ],
        },
        options: {
          viewType: 'charts',
          grid: {
            type: 'classic',
          },
          chart: {
            type: 'pie',
          },
        },
      };
      this.$refs.marketingPieChart.flexmonster.setReport(pieChartReport);
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error.response.data);
    });
  },
};
</script>
