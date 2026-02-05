export function formatMoney (amountCents) {
    return `$${(amountCents / 100). toFixed(2)}` // this extra () around the product.price, converts the number into a string and the toFixed tells the system how many decimal places to show
    // in template strings, to insert a variable, you need to wrap it in ${} and the whole string needs to be wrapped in backticks ``
};