
/* eslint-disable */

import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import SalesReport from '@/components/sales/SalesReport';
import HRReport from '@/components/hr/HRReport';
import MarketingReport from '@/components/marketing/MarketingReport';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/sales',
      name: 'SalesReport',
      component: SalesReport,
    },
    {
      path: '/hr',
      name: 'HRReport',
      component: HRReport,
    },
    {
      path: '/traffic',
      name: 'MarketingReport',
      component: MarketingReport,
    },
  ],
});
