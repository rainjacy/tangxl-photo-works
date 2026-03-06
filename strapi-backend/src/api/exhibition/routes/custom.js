'use strict';

module.exports = {
  routes: [
    { method: 'GET', path: '/exhibitions', handler: 'exhibition.find', config: { policies: [], auth: false } },
    { method: 'GET', path: '/exhibitions/:id', handler: 'exhibition.findOne', config: { policies: [], auth: false } },
  ],
};
