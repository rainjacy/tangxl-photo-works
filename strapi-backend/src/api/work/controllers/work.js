'use strict';

module.exports = {
  async find(ctx) {
    return strapi.entityService.findMany('api::work.work', ctx.query);
  },
  async findOne(ctx) {
    return strapi.entityService.findOne('api::work.work', ctx.params.id, ctx.query);
  },
};
