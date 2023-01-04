import type { FastifyPluginAsync } from "fastify";

import captureSchema from "../../schemas/createPaymentSchema.json";
import intent from "../../schemas/intent_bodySchema.json";
import {
  type PaymentDetails,
  StripeAuthorizePayment,
} from "../../services/stripeService";

const stripeApi: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.route({
    method: "POST",
    url: "/charges",
    schema: {
      body: captureSchema,
    },
    async handler(request: any, reply) {
      const { email } = request.user;
      const stripeService = new StripeAuthorizePayment(email);
      const paymentDetails: PaymentDetails = {
        amount: request.body.amount,
        currency: request.body.currency,
        source: request.body.source,
      };
      const charge = await stripeService.captureTransaction(paymentDetails);
      reply.send(charge);
    },
  });
  fastify.route({
    method: "GET",
    url: "/authorizations",
    async handler(request: any, reply) {
      const { email } = request.user;
      const stripeService = new StripeAuthorizePayment(email);
      const authorizations = await stripeService.getAllAuthorizations();
      reply.send(authorizations);
    },
  });
  fastify.route({
    method: "GET",
    url: "/authorizations/:id",
    async handler(request: any, reply) {
      const { email } = request.user;
      const stripeService = new StripeAuthorizePayment(email);
      const authorization = await stripeService.getAuthorization(
        request.params.id
      );
      reply.send(authorization);
    },
  });
  fastify.route({
    method: "POST",
    url: "/authorizations/:id/approve",
    async handler(request: any, reply) {
      const { email } = request.user;
      const stripeService = new StripeAuthorizePayment(email);
      const authorization = await stripeService.approveAuthorization(
        request.params.id
      );
      reply.send(authorization);
    },
  });
  fastify.route({
    method: "POST",
    url: "/hooks",
    async handler(request: any, reply) {
      reply.send(request.body);
    },
  });
  fastify.route({
    method: "GET",
    url: "/charges",
    async handler(request: any, reply) {
      const { email } = request.user;
      const stripeService = new StripeAuthorizePayment(email);
      const charges = await stripeService.getAllCharges();
      reply.send(charges);
    },
  });
  fastify.route({
    method: "POST",
    url: "/charges/:id/capture",
    async handler(request: any, reply) {
      const { email } = request.user;
      const stripeService = new StripeAuthorizePayment(email);
      const charge = await stripeService.captureCharge(request.params.id);
      reply.send(charge);
    },
  });
  fastify.route({
    method: "POST",
    url: "/intent",
    schema: {
      body: intent,
    },
    async handler(request: any, reply) {
      const { email } = request.user;
      const stripeService = new StripeAuthorizePayment(email);
      const intent = await stripeService.createIntent(request.body);
      reply.send(intent);
    },
  });
  fastify.route({
    method: "POST",
    url: "/intent/:id/capture",
    async handler(request: any, reply) {
      const { email } = request.user;
      const stripeService = new StripeAuthorizePayment(email);
      const intent = await stripeService.captureIntent(request.params.id);
      reply.send(intent);
    },
  });
  fastify.route({
    method: "DELETE",
    url: "/intent/:id",
    async handler(request: any, reply) {
      const { email } = request.user;
      const stripeService = new StripeAuthorizePayment(email);
      const intent = await stripeService.cancelIntent(request.params.id);
      reply.send(intent);
    },
  });
};

export default stripeApi;
