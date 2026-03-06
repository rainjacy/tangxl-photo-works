'use strict';

module.exports = {
  async find(ctx) {
    return strapi.entityService.findMany('api::exhibition.exhibition', ctx.query);
  },
  async findOne(ctx) {
    return strapi.entityService.findOne('api::exhibition.exhibition', ctx.params.id, ctx.query);
  },
};
