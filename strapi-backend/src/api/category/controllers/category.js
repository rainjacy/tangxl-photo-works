'use strict';

module.exports = {
  async find(ctx) {
    return strapi.entityService.findMany('api::category.category', ctx.query);
  },

  async findOne(ctx) {
    const { id } = ctx.params;
    return strapi.entityService.findOne('api::category.category', id, ctx.query);
  },

  async create(ctx) {
    return strapi.entityService.create('api::category.category', {
      data: ctx.request.body,
    });
  },

  async update(ctx) {
    const { id } = ctx.params;
    return strapi.entityService.update('api::category.category', id, {
      data: ctx.request.body,
    });
  },

  async delete(ctx) {
    const { id } = ctx.params;
    return strapi.entityService.delete('api::category.category', id);
  },
};
