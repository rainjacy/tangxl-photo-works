'use strict';

module.exports = {
  async find(ctx) {
    return strapi.entityService.findMany('api::period.period', ctx.query);
  },
  async findOne(ctx) {
    return strapi.entityService.findOne('api::period.period', ctx.params.id, ctx.query);
  },
};
