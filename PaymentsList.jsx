PaymentsList = React.createClass({
  mixins: [ReactMeteorData],

  getInitialState(){
    return {
      columns: [
        {key: 'createdAt',    label: 'Date'},
        {key: 'customerName', label: 'Customer'},
        {key: 'amount',       label: 'Amount'},
        {key: 'tourName',     label: 'Tour'}
      ],
      filterable: ['customerName', 'tourName'],
      filterText: "",
      sort: {column: 'createdAt', direction: 'desc'},
      itemsPerPage: 20
    };
  },

  getMeteorData() {
    // console.log(`Subscribing with filter "${this.state.filterText}"`);
    var handle = Meteor.subscribe('payments', {
      filterText: this.state.filterText,
      itemsPerPage: this.state.itemsPerPage,
      sort: this.state.sort
    });

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
        {tableFilter}
        <Table ref="table" className="ui celled table" data={this.data.payments}
          itemsPerPage={this.state.itemsPerPage} pageButtonLimit={5}
          sortable={true} defaultSort={this.state.sort}
          columns={this.state.columns}
          filterable={this.state.filterable} hideFilterInput
         >
       </Table>
      </div>
    )
  }

})
