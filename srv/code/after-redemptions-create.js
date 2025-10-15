/**
 * This custom logic deducts the redemption amount from the customer's total reward points and adds that amount to their total redeemed points.
 * @After(event = { "CREATE" }, entity = "my_Project_2Srv.Redemptions")
 * @param {(Object|Object[])} results - For the After phase only: the results of the event processing
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(results, request) {
    const { Customers } = cds.entities;

    // Ensure results is an array for consistent processing
    if (!Array.isArray(results)) {
        results = [results];
    }

    for (const redemption of results) {
        if (!redemption || !redemption.customer_ID || redemption.redeemedAmount === undefined) continue;

        // Retrieve the customer record
        const customer = await SELECT.one.from(Customers).where({ ID: redemption.customer_ID });

        if (customer) {
            // Calculate new total reward points and total redeemed reward points
            const newTotalRewardPoints = (customer.totalRewardPoints || 0) - redemption.redeemedAmount;
            const newTotalRedeemedRewardPoints = (customer.totalRedeemedRewardPoints || 0) + redemption.redeemedAmount;

            // Update the customer record
            await UPDATE(Customers).set({
                totalRewardPoints: newTotalRewardPoints,
                totalRedeemedRewardPoints: newTotalRedeemedRewardPoints
            }).where({ ID: redemption.customer_ID });
        }
    }
}
