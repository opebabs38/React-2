import { formatMoney } from '../../utils/money';

export function PaymentSummary({ paymentSummary }) {
    return (
        <div className="payment-summary">
            <div className="payment-summary-title"> Payment Summary </div>
            {paymentSummary && ( // this checks if the payment summary object exists
                <>
                    <div className="payment-summary-row">
                        <div>Items ({paymentSummary.totalItems}):</div> {/* here we are displaying the total number of items in the cart, we are accessing this data from the paymentSummary object that we fetched from the server */}
                        <div className="payment-summary-money">{formatMoney(paymentSummary.productCostCents)}</div> {/* here we are displaying the total cost of the products in the cart, we are accessing this data from the paymentSummary object that we fetched from the server, we are also using the formatMoney function to format the price correctly */}
                    </div>

                    <div className="payment-summary-row">
                        <div>Shipping &amp; handling:</div>
                        <div className="payment-summary-money">{formatMoney(paymentSummary.shippingCostCents)}</div>
                    </div>

                    <div className="payment-summary-row subtotal-row">
                        <div>Total before tax:</div>
                        <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostBeforeTaxCents)}</div>
                    </div>

                    <div className="payment-summary-row">
                        <div>Estimated tax (10%):</div>
                        <div className="payment-summary-money">{formatMoney(paymentSummary.taxCents)}</div>
                    </div>

                    <div className="payment-summary-row total-row">
                        <div>Order total:</div>
                        <div className="payment-summary-money">{formatMoney(paymentSummary.totalCostCents)}</div>
                    </div>

                    <button className="place-order-button button-primary"> Place your order </button>
                </>
            )}
        </div>
    );
}