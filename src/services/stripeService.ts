import { ApiKeysService } from "./apiServices";

const stripeLoader = require("stripe");
export type PaymentDetails = {
  amount: number;
  currency: string;
  source: string;
  capture?: boolean;
};
export class StripeAuthorizePayment {
  constructor(readonly mail: string) {}

  async captureTransaction(payment: PaymentDetails) {
    payment.capture = false;
    const stripe = await this.loadStripe();
    return new Promise((resolve, reject) => {
      stripe.charges.create(payment, (err: any, charge: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(charge);
        }
      });
    });
  }

  async getAllAuthorizations() {
    const stripe = await this.loadStripe();
    return stripe.issuing.authorizations.list({ limit: 100 });
  }

  async getAuthorization(id: string) {
    const stripe = await this.loadStripe();
    return stripe.issuing.authorizations.retrieve(
      "ch_3MI4AZC7U3t5VhxQ1zBxWKJv"
    );
  }

  async declineAuthorization(id: string) {
    const stripe = await this.loadStripe();
    return stripe.issuing.authorizations.decline(id);
  }

  async approveAuthorization(id: string) {
    const stripe = await this.loadStripe();
    return stripe.issuing.authorizations.approve(id);
  }

  async updateAuthorization(id: string, data: any) {
    const stripe = await this.loadStripe();
    return stripe.issuing.authorizations.update(id, data);
  }

  async getAllCharges() {
    const stripe = await this.loadStripe();
    return stripe.charges.list({ limit: 100 });
  }

  async captureCharge(id: string) {
    const stripe = await this.loadStripe();
    return stripe.charges.capture(id);
  }

  async createIntent(data: PaymentIntent) {
    data = {
      ...data,
      capture_method: "manual",
    };
    const stripe = await this.loadStripe();
    const resp = await stripe.paymentIntents.create(data);
    return {
      client_secret: resp.client_secret,
      id: resp.id,
      amount: resp.amount / 100,
    };
  }

  async captureIntent(id: string) {
    const stripe = await this.loadStripe();
    return stripe.paymentIntents.capture(id);
  }

  async cancelIntent(id: string) {
    const stripe = await this.loadStripe();
    return stripe.paymentIntents.cancel(id);
  }

  private async loadStripe() {
    const apiServices = new ApiKeysService(this.mail);
    const key = await apiServices.getKeyByProvider("stripe", "secret");
    return stripeLoader(key.value);
  }
}

type PaymentIntent = {
  amount: number;
  currency: string;
  automatic_payment_methods?: any;
  capture_method?: string;
};
