Payments = new Mongo.Collection("payments");
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  Meteor.startup(function () {
    ReactDOM.render(<PaymentsList />, document.getElementById("table-target"));
  });
}
