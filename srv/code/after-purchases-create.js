/**
 * This custom logic calculates reward points for each purchase, updates the total purchase value for the related customer, and updates the total reward points for the related customer.
 * @After(event = { "CREATE" }, entity = "my_Project_2Srv.Purchases")
 * @param {(Object|Object[])} results - For the After phase only: the results of the event processing
 * @param {cds.Request} request - User information, tenant-specific CDS model, headers and query parameters
 */
module.exports = async function(results, request) {
    const { Customers } = cds.entities;

    // Ensure results is an array
    if (!Array.isArray(results)) {
        results = [results];
    }

    for (const purchase of results) {
        if (!purchase || !purchase.customer_ID || purchase.purchaseValue === undefined || purchase.rewardPoints === undefined) {
            continue;
        }

        // Update the total purchase value and total reward points for the related customer
        const customerUpdate = {
            totalPurchaseValue: { '+=': purchase.purchaseValue },
            totalRewardPoints: { '+=': purchase.rewardPoints }
        };

        await UPDATE(Customers).set(customerUpdate).where({ ID: purchase.customer_ID });
    }
}
