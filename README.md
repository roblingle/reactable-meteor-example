# Using the Reactable component in Meteor

This is an example of using [reactable](https://github.com/glittershark/reactable) to display large amounts of data in a Meteor application.

This example expects to have data in a `Payments` collection. You can generate this data yourself, or import your own large dataset and adjust the column names in the code to match.

To Do:
- [ ] When the table is sorted, update the subscription
- [ ] Finish implementing pagination. Will probably need to create our own page control instead of using the reactable built-in so that only a small subset of the data is published at any time

Limitations:
- [ ] Any values that you want to sort by or filter on will need to be present in the collection. If you would like to sort or filter on related data, you will need to denormalize
