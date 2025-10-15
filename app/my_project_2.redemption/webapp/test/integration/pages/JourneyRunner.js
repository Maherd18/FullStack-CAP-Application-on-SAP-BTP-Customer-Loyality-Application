sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"myproject2/redemption/test/integration/pages/RedemptionsList",
	"myproject2/redemption/test/integration/pages/RedemptionsObjectPage"
], function (JourneyRunner, RedemptionsList, RedemptionsObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('myproject2/redemption') + '/test/flpSandbox.html#myproject2redemption-tile',
        pages: {
			onTheRedemptionsList: RedemptionsList,
			onTheRedemptionsObjectPage: RedemptionsObjectPage
        },
        async: true
    });

    return runner;
});

