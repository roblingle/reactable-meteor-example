Payments = new Mongo.Collection("payments");

if (Meteor.isClient) {
  Meteor.startup(function () {
    ReactDOM.render(<PaymentsList />, document.getElementById("table-target"));
  });
}

if (Meteor.isServer) {
  Meteor.publish('payments', (options) => {
    _(options).defaults({
        filterText: '',
        itemsPerPage: 25,
        currentPage: 1,
        sort: { column: 'createdAt', direction: -1 }
    });

    // make reactable sort format work for mongo
    let sort = {};
    if( typeof options.sort.direction === 'string'){
      let direction = options.sort.direction;
      sort[options.sort.column] = direction.toLowerCase() === 'asc' ? 1 : -1;
    } else {
      // assume mongo will interpret this correctly
      sort[options.sort.column] = options.sort.direction;
    }
    console.log('sort',sort);

    return Payments.find(
      { customerName: new RegExp(options.filterText,"ig")},
      {
        fields:{
          customerName:1, amount:1, tourName:1, createdAt:1, paymentSource:1
        },
        limit: options.itemsPerPage * options.currentPage,
        sort
      }
    );
  });
}
