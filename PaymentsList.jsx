PaymentsList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    // console.log(`Subscribing with filter "${this.state.filterText}"`);
    var handle = Meteor.subscribe('payments', this.state.filterText);

    return {
      // can be used to show loading state
      paymentsLoading: !handle.ready(),
      payments: Payments.find().fetch()
    };

  },
    };
  },

  filterTextChanged(e){
    this.setState({ filterText: e.target.value});
    // console.log(`changed filterText to ${this.state.filterText} for ${e.target.value}`);
  },

  render(){
    var Table = Reactable.Table;
    var Thead = Reactable.Thead;

    tableFilter = <input type="text" onChange={this.filterTextChanged} />;

    return(
      <div>
        <Table className="ui celled table" data={this.getPayments()}
          itemsPerPage={25} pageButtonLimit={5}
        {tableFilter}
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
