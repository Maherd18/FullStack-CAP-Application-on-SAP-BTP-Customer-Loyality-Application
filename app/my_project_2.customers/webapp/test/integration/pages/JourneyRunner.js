sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"myproject2/customers/test/integration/pages/CustomersList",
	"myproject2/customers/test/integration/pages/CustomersObjectPage"
], function (JourneyRunner, CustomersList, CustomersObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('myproject2/customers') + '/test/flpSandbox.html#myproject2customers-tile',
        pages: {
			onTheCustomersList: CustomersList,
			onTheCustomersObjectPage: CustomersObjectPage
        },
        async: true
    });

    return runner;
});

