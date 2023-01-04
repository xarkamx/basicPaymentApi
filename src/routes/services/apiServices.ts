import type { FastifyPluginAsync } from "fastify";

import { ApiKeysService } from "../../services/apiServices";

const apiServices: FastifyPluginAsync = async (
  fastify,
  _opts
): Promise<void> => {
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              provider: { type: "string" },
              value: { type: "string" },
              type: { type: "string" },
            },
          },
        },
      },
    },
    async handler(request: any, reply) {
      const { email } = request.user;
      const apiKeys = new ApiKeysService(email);
      const keys = await apiKeys.getAll();
      reply.send(keys);
    },
  });
  fastify.route({
    method: "POST",
    url: "/",
    async handler(request: any, reply) {
      const { provider, value, type } = request.body;
      const { email } = request.user;
      try {
        const apiKeys = new ApiKeysService(email);
        await apiKeys.create({ provider, value, type });
        reply.code(201);
      } catch (err) {
        reply.code(500).send(err);
      }
    },
  });
};

export default apiServices;
