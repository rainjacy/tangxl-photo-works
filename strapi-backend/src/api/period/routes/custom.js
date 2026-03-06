'use strict';

module.exports = {
  routes: [
    { method: 'GET', path: '/periods', handler: 'period.find', config: { policies: [], auth: false } },
    { method: 'GET', path: '/periods/:id', handler: 'period.findOne', config: { policies: [], auth: false } },
  ],
};
