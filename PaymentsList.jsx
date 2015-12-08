PaymentsList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      payments: Payments.find({},{fields:{
        customerName:1, amount:1, tourName:1, createdAt:1, paymentSource:1
      }, sort:{ createdAt: -1}}).fetch()
    };
  },

  getPayments() {
    return this.data.payments;
  },

  render(){
    var Table = Reactable.Table;
    var Thead = Reactable.Thead;
    return(
      <div>
        <Table className="ui celled table" data={this.getPayments()}
          itemsPerPage={25} pageButtonLimit={5}
          sortable={true} defaultSort={{column: 'createdAt', direction: 'desc'}}
          filterable={['customerName','tourName']}
          columns={[
            {key: 'createdAt',    label: 'Date'},
            {key: 'customerName', label: 'Customer'},
            {key: 'amount',       label: 'Amount'},
            {key: 'tourName',     label: 'Tour'}
          ]}
         >

       </Table>
      </div>
    )
  }

})
