 <template>
 <div>
<Pivot
          ref="pivotHR"
          v-bind:toolbar="true"
          v-bind:report="{}"
          >
         </Pivot>
         <h3 class='hrTitle'>Overtime Hours by Departments</h3>
         <Pivot id='HRCharts'
          ref="pivotChartsHR"
          v-bind:toolbar="false"
          v-bind:report="{}"
          >
         </Pivot>
 </div>
</template>

<style>

.HRCharts.fm-charts-color-1 {
    fill: #0081ef !important;
}

.HRCharts.fm-charts-color-2 {
    fill: #009c07 !important;
}

.HRCharts.fm-charts-color-3 {
    fill: #00C1C9 !important;
}

.HRCharts.fm-charts-color-4 {
    fill: #ff7e60 !important;
}

.HRCharts.fm-charts-color-5 {
    fill: #9900ae !important;
}

.HRCharts.fm-charts-color-6 {
    fill: #debb2e !important;
}

.HRCharts.fm-charts-color-7 {
    fill: #009688 !important;
}

#HRCharts {
  margin-top: 20px;
}

h3.hrTitle {
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

import EmployeeService from '@/api-services/employee.service';

export default {
  name: 'HRReport',
  data() {
    return {
      orders: {
      },
    };
  },
  mounted() {
    EmployeeService.getAll().then((response) => {
      const responseData = response.data;
      // this.$refs.pivotHR.flexmonster.connectTo({ type: 'json', data: responseData });
      const pivotReport = {
        dataSource: {
          type: 'json',
          data: responseData,
          mapping: {
            employeeId: {
              type: 'string',
              caption: 'Employee ID',
            },
            country: {
              type: 'string',
              caption: 'Employee Country',
            },
            gender: {
              type: 'string',
              caption: 'Gender',
            },
            department: {
              type: 'string',
              caption: 'Department',
            },
            employmentStart: {
              type: 'date',
              caption: 'Employment Start Date',
            },
            jobTitle: {
              type: 'string',
              caption: 'Job Title',
            },
            overtimeHours: {
              type: 'number',
              caption: 'Overtime Hours',
            },
            fullName: {
              type: 'string',
              caption: 'Full Name',
            },
            monthSalary: {
              type: 'number',
              caption: 'Monthly Salary',
            },
          },
        },
        slice: {
          reportFilters: [
            {
              uniqueName: 'employmentStart.Year',
            },
          ],
          rows: [
            {
              uniqueName: 'country',
            },
            {
              uniqueName: 'jobTitle',
            },
          ],
          columns: [
            {
              uniqueName: 'department',
            },
            {
              uniqueName: '[Measures]',
            },
          ],
          measures: [
            {
              uniqueName: 'monthSalary',
              aggregation: 'average',
            },
          ],
        },
        options: {
          grid: {
            type: 'classic',
          },
        },
      };
      this.$refs.pivotHR.flexmonster.setReport(pivotReport);

      const pivotChartReport = {
        dataSource: {
          type: 'json',
          data: responseData,
          mapping: {
            employeeId: {
              type: 'string',
              caption: 'Employee ID',
            },
            country: {
              type: 'string',
              caption: 'Employee Country',
            },
            gender: {
              type: 'string',
              caption: 'Gender',
            },
            department: {
              type: 'string',
              caption: 'Department',
            },
            employmentStart: {
              type: 'date',
              caption: 'Employment Start Date',
            },
            jobTitle: {
              type: 'string',
              caption: 'Job Title',
            },
            overtimeHours: {
              type: 'number',
              caption: 'Overtime Hours',
            },
            fullName: {
              type: 'string',
              caption: 'Full Name',
            },
            monthSalary: {
              type: 'number',
              caption: 'Monthly Salary',
            },
          },
        },
        slice: {
          reportFilters: [
            {
              uniqueName: 'employmentStart.Year',
            },
          ],
          rows: [
            {
              uniqueName: 'department',
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
              uniqueName: 'overtimeHours',
              aggregation: 'sum',
            },
            {
              uniqueName: 'monthSalary',
              aggregation: 'average',
              active: false,
            },
          ],
        },
        options: {
          viewType: 'charts',
          grid: {
            type: 'classic',
          },
          chart: {
            type: 'bar_h',
          },
        },
      };
      this.$refs.pivotChartsHR.flexmonster.setReport(pivotChartReport);
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error.response.data);
    });
  },
};
</script>
