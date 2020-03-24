<template>
  <b-nav tabs>
    <b-nav-item :to="{ name: 'SalesReport' }"><a class="nav-link active" data-toggle="tab"><b-icon-graph-up></b-icon-graph-up> Quarterly Sales Report</a></b-nav-item>
    <b-nav-item :to="{ name: 'HRReport' }"><a class="nav-link active" data-toggle="tab"><b-icon-people></b-icon-people>HR Performance Dashboard</a></b-nav-item>
    <b-nav-item :to="{ name: 'MarketingReport' }"><a class="nav-link active" data-toggle="tab"><b-icon-phone></b-icon-phone>  Digital Marketing Dashboard</a></b-nav-item>
  </b-nav>
</template>
<script>

export default {
  name: 'Navbar',
};

</script>
