Payments = new Mongo.Collection("payments");

if (Meteor.isClient) {
  Meteor.startup(function () {
    ReactDOM.render(<PaymentsList />, document.getElementById("table-target"));
  });
}

if (Meteor.isServer) {
  console.log('publishing payments');
  Meteor.publish('payments', (filterText) => {
    return Payments.find(
      { customerName: new RegExp(filterText,"g")},
      {
        fields:{
          customerName:1, amount:1, tourName:1, createdAt:1, paymentSource:1
        },
        // sort:{ createdAt: -1}
      }
    );
  });
}
