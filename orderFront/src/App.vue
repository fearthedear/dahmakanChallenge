<template>
  <div id="app">
    <h1></h1>
    {{msg}}
    <div class="card-panel">
    <table class="responsive bordered" v-if="orders">
      <thead>
        <tr>
          <th>Status</th>
          <th>Date</th>
          <th>Time</th>
          <th>Order Number</th>
          <th>Paid with</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="order in orders.orders">
          <td v-bind:class="getClass(order.arrives_at_utc)">{{getStatus(order.arrives_at_utc)}}</td>
          <td>{{getDate(order.arrives_at_utc)}}</td>
          <td style="font-weight:bolder">{{getTime(order.arrives_at_utc)}}</td>
          <td class="gray">#{{order.order_id}}</td>
          <td v-bind:class="getClass2(order.paid_with)">{{order.paid_with}}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data () {
      return {
        msg: null,
        orders: null
      }
    },
    methods: {
      getClass (input) {
        var result = this.getStatus(input)
        if ( result == "Confirmed" ) {
          return "blue1"
        }
        else if ( result == "Delivered") {
          return "green1"
        }
        else {
          return "red1"
        }
      },
      getClass2 (input) {
        if ( input == "Prime" ) {
          return "blue1"
        }
      },
      fetchOrders () {
        // GET /someUrl
        this.$http.get('http://staging-api.dahmakan.com/test/orders').then(response => {

          // get body data
          var not_ordered = response.body;
          not_ordered.orders 
          not_ordered.orders.sort(function(a, b) {
            return parseFloat(a.arrives_at_utc) - parseFloat(b.arrives_at_utc);
          });
          this.orders = not_ordered;

        }, response => {
          this.msg = "server error!"
        });
      },
      getDate (date) {
        if ( date == null ) {
          return "-"
        } 
        var toDay = function (x) {
          var day = ""
          switch (x) {
            case 0:
              day = "Sunday"
              break
            case 1:
              day = "Monday"
              break
            case 2:
              day = "Tuesday"
              break
            case 3:
              day = "Wednesday"
              break
            case 4:
              day = "Thursday"
              break
            case 5:
              day = "Friday"
              break
            case 6:
              day = "Saturday"
          }
        return day
      }
      var newDate = new Date(date)
      var dateString = ""
      dateString += toDay(newDate.getDay()) + ", "
      dateString += newDate.getDate() + "/"
      dateString += (newDate.getMonth() + 1) + "/"  
      dateString += newDate.getFullYear()
      return dateString
    },
    getTime (utc) {
      if ( utc == null ) {
        return "-"
      }
      var d = new Date(utc);
      var hour = d.getHours() == 0 ? 12 : (d.getHours() > 12 ? d.getHours() - 12 : d.getHours())
      var min = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
      var ampm = d.getHours() < 12 ? 'AM' : 'PM'
      var time = hour + ':' + min + ' ' + ampm
      return time
    },
    getStatus (utc) {
      if ( utc == null ) {
        return "Cancelled"
      }
      var now = new Date()
      var time = new Date(utc)
      if (time < now) {
        return "Delivered"
      }
      else {
        return "Confirmed"
      }
    }
  },
  created () {
    this.fetchOrders()
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 60px;
  }
  
  .gray {
    color: grey;
  }
  .green1 {
    color: green;
  }
  .blue1 {
    color: blue;
  }
  .red1 {
    color: red;
  }
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
