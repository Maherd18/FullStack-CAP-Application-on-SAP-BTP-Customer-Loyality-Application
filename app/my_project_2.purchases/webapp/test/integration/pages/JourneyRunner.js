sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"myproject2/purchases/test/integration/pages/PurchasesList",
	"myproject2/purchases/test/integration/pages/PurchasesObjectPage"
], function (JourneyRunner, PurchasesList, PurchasesObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('myproject2/purchases') + '/test/flpSandbox.html#myproject2purchases-tile',
        pages: {
			onThePurchasesList: PurchasesList,
			onThePurchasesObjectPage: PurchasesObjectPage
        },
        async: true
    });

    return runner;
});

