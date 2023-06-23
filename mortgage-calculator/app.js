const form = document.querySelector('form');
const result = document.querySelector('.result');

const formatPrice = (price) => {
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const data = Object.fromEntries(formData);

  if (
    !data['down-payment'] ||
    !data['interest-rate'] ||
    !data['loan-length'] ||
    !data['down-payment-percentage']
  )
    return;

  const downPayment = Number(data['down-payment']);
  const downPaymentPercentage = Number(data['down-payment-percentage']) / 100;
  const interrestRate = Number(data['interest-rate']) / 100 / 12;
  const n = Number(data['loan-length']) * 12;

  const totalLoanAmount = downPayment / downPaymentPercentage;
  const remainingLoanAmount = totalLoanAmount - downPayment;

  const monthlyPayment =
    (totalLoanAmount * (interrestRate * (1 + interrestRate) ** n)) /
    ((1 + interrestRate) ** n - 1);

  result.innerHTML = `
    <p>Total Loan Amount: <span class="amount">${formatPrice(
      totalLoanAmount
    )}</span>.</p>
    <p>Remaining Loan Amount: <span class="amount">${formatPrice(
      remainingLoanAmount
    )}</span>.</p>
    <p>Your monthly mortgage payment will be <span class="amount">${formatPrice(
      monthlyPayment
    )}</span>.</p>
  `;
});
