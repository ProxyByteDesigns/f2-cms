'use strict';

/**
 * Post.js controller
 *
 * @description: A set of functions called "actions" for managing `Post`.
 */

module.exports = {

  /**
   * Retrieve post records.
   *
   * @return {Object|Array}
   */

  find: async (ctx, next, { populate } = {}) => {
    if (ctx.query._q) {
      return strapi.services.post.search(ctx.query);
    } else {
      return strapi.services.post.fetchAll(ctx.query, populate);
    }
  },

  /**
   * Retrieve a post record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.post.fetch(ctx.params);
  },

  /**
   * Count post records.
   *
   * @return {Number}
   */

  count: async (ctx, next, { populate } = {}) => {
    return strapi.services.post.count(ctx.query, populate);
  },

  /**
   * Create a/an post record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    if(ctx.state.user && ctx.request.body.author === null) {
      ctx.request.body.author = ctx.state.user.id;
    }

    return strapi.services.post.add(ctx.request.body);
  },

  /**
   * Update a/an post record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    if(ctx.state.user && ctx.request.body.author === null) {
      ctx.request.body.author = ctx.state.user.id;
    }

    return strapi.services.post.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an post record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.post.remove(ctx.params);
  }
};
