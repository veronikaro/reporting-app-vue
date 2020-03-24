/* eslint-disable no-mixed-spaces-and-tabs */ /* eslint-disable
vue/no-parsing-error */ /* eslint-disable vue/no-parsing-error */ /*
eslint-disable vue/no-parsing-error */ /* eslint-disable vue/valid-v-bind */ /*
eslint-disable vue/valid-v-bind */ /* eslint-disable vue/no-parsing-error */ /*
eslint-disable vue/valid-v-bind */

<template>
  <div>
    <Pivot
      ref="pivotSales"
      v-bind:toolbar="true"
      v-bind:report="{}"
    >
    </Pivot>
    <h3 class="salesTitle">Annual Revenue by Retail Categories</h3>
    <Pivot
      id="salesCharts"
      ref="pivotChartSales"
      v-bind:toolbar="false"
      v-bind:report="{}"
    >
    </Pivot>
  </div>
</template>

<style>

#salesCharts {
  margin-top: 20px;
}

h3.salesTitle {
  text-align: center;
  vertical-align: top;
  font-size: 18px;
  position: relative;
  margin-top: 30px;
}
</style>

<script>
import OrderService from '@/api-services/order.service';

export default {
  name: 'SalesReport',
  data() {
    return {
      orders: {},
    };
  },
  mounted() {
    OrderService.getAll()
      .then((response) => {
        const responseData = response.data;
        // this.$refs.pivot.flexmonster.connectTo({ type: 'json', data: responseData });
        const report = {
          dataSource: {
            type: 'json',
            data: responseData,
            mapping: {
              orderId: {
                type: 'string',
                caption: 'Order ID',
              },
              country: {
                type: 'string',
                caption: 'Country',
              },
              city: {
                type: 'string',
                caption: 'City',
              },
              orderDate: {
                type: 'date',
                caption: 'Order Date',
              },
              contactName: {
                type: 'string',
                caption: 'Contact Name',
              },
              quantity: {
                type: 'number',
                caption: 'Quantity',
              },
              retailCategory: {
                type: 'string',
                caption: 'Retail Category',
              },
              price: {
                type: 'number',
                caption: 'Price',
              },
            },
          },
          slice: {
            rows: [
              {
                uniqueName: 'country',
              },
              {
                uniqueName: 'retailCategory',
              },
            ],
            columns: [
              {
                uniqueName: 'orderDate.Year',
              },
              {
                uniqueName: '[Measures]',
              },
            ],
            measures: [
              {
                uniqueName: 'price',
                aggregation: 'sum',
              },
              {
                uniqueName: 'quantity',
                aggregation: 'sum',
              },
            ],
            expands: {
              rows: [
                {
                  tuple: ['country.[australia]'],
                },
                {
                  tuple: ['country.[japan]'],
                },
                {
                  tuple: ['country.[norway]'],
                },
              ],
            },
          },
          conditions: [
            {
              formula: '#value > 1500',
              measure: 'price',
              format: {
                backgroundColor: '#00A45A',
                color: '#FFFFFF',
                fontFamily: 'Arial',
                fontSize: '12px',
              },
            },
            {
              formula: '#value < 100',
              measure: 'quantity',
              format: {
                backgroundColor: '#df3800',
                color: '#FFFFFF',
                fontFamily: 'Arial',
                fontSize: '12px',
              },
            },
          ],
        };
        this.$refs.pivotSales.flexmonster.setReport(report);
        const pivotChartReport = {
          dataSource: {
            type: 'json',
            data: responseData,
            mapping: {
              orderId: {
                type: 'string',
                caption: 'Order ID',
              },
              country: {
                type: 'string',
                caption: 'Country',
              },
              city: {
                type: 'string',
                caption: 'City',
              },
              orderDate: {
                type: 'date',
                caption: 'Order Date',
              },
              contactName: {
                type: 'string',
                caption: 'Contact Name',
              },
              quantity: {
                type: 'number',
                caption: 'Quantity',
              },
              retailCategory: {
                type: 'string',
                caption: 'Retail Category',
              },
              price: {
                type: 'number',
                caption: 'Price',
              },
            },
          },
          slice: {
            rows: [
              {
                uniqueName: 'retailCategory',
              },
            ],
            columns: [
              {
                uniqueName: 'orderDate.Year',
              },
              {
                uniqueName: '[Measures]',
              },
            ],
            measures: [
              {
                uniqueName: 'Revenue',
                formula: "sum('price') * sum('quantity')",
                individual: true,
                caption: 'Revenue',
                format: '-46ca9u7j6jy00',
              },
            ],
            sorting: {
              column: {
                type: 'asc',
                tuple: [],
                measure: {
                  uniqueName: 'Revenue',
                },
              },
            },
          },
          options: {
            viewType: 'charts',
            chart: {
              type: 'bar_h',
            },
          },
          formats: [
            {
              name: '-46ca9u7j6jy00',
              currencySymbol: '$',
            },
          ],
        };
        this.$refs.pivotChartSales.flexmonster.setReport(pivotChartReport);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log("Data hasn't been loaded", error);
      });
  },
};
</script>
