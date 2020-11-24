'use strict';
const {
  parseMultipartData,
  sanitizeEntity
} = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async finByTag(ctx) {
    const result = await strapi.services.article.find({
      'categories.name_contains': ctx.params.id
    });
    return sanitizeEntity(result, {
      model: strapi.models.article
    });
  },
  async finOneByIdAndhint2(ctx) {
    const resultById = sanitizeEntity(await strapi.services.article.findOne({
      'id': ctx.params.id
    }), {
      model: strapi.models.article
    });
    const resultByCategory = sanitizeEntity(await strapi.services.article.find({
      'id_ne': resultById.id,
      'categories.name': resultById.categories[0].name
    }), {
      model: strapi.models.article
    });
    console.log(resultByCategory);
    resultById.hints = [];
    resultById.hints.push(resultByCategory.splice(Math.floor(Math.random() * resultByCategory.length), 1));
    resultById.hints.push(resultByCategory.splice(Math.floor(Math.random() * resultByCategory.length), 1));
    console.log(resultById);
    return resultById;
  },
  async finOneByIdAndhint(ctx) {
    const resultById = sanitizeEntity(await strapi.services.article.findOne({
      'id': ctx.params.id
    }), {
      model: strapi.models.article
    });
    let count = await strapi.services.article.count({
      'id_ne': [resultById.id],
      'categories.name': resultById.categories[0].name
    });
    resultById.hints = [];
    if (count > 0) {
      resultById.hints.push(sanitizeEntity(await strapi.services.article.find({
        'id_nin': [resultById.id],
        'categories.name': resultById.categories[0].name,
        _start: Math.floor(Math.random() * count),
        _limit: 1
      }), {
        model: strapi.models.article
      })[0]);
    }
    count--;
    if (count > 0) {
      resultById.hints.push(sanitizeEntity(await strapi.services.article.find({
        _start: Math.floor(Math.random() * count),
        _limit: 1,
        'id_ne': [resultById.id, resultById.hints[0].id],
        'categories.name': resultById.categories[0].name
      }), {
        model: strapi.models.article
      })[0]);
    }
    return resultById;
  }
};
