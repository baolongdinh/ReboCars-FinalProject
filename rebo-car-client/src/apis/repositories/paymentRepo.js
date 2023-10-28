import repository from "../repository";

const resource = "payment";

export default {
  async paymentProcess(amountTotal, paymentMethod) {
    return await repository.post(`${resource}`, {
      amountTotal,
      paymentMethod,
    });
  },
  async refundProcess(transactionId, amount) {
    return await repository.post(`${resource}/refund`, {
      transactionId,
      amount,
    });
  },
  async generateBraintreeToken() {
    return await repository.get(`${resource}`);
  },
};
