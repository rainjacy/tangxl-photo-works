const fs = require('fs');
const path = require('path');

const contentTypes = [
  {
    name: 'category',
    displayName: 'Category',
    description: '作品分类',
    attributes: {
      name: {
        type: 'string',
        required: true,
        minLength: 1,
        maxLength: 50,
      },
      value: {
        type: 'string',
        required: true,
        unique: true,
        minLength: 1,
        maxLength: 50,
      },
    },
  },
  {
    name: 'work',
    displayName: 'Work',
    description: '摄影作品',
    attributes: {
      title: {
        type: 'string',
        required: true,
        minLength: 1,
        maxLength: 200,
      },
      year: {
        type: 'string',
        maxLength: 10,
      },
      location: {
        type: 'string',
        maxLength: 200,
      },
      image: {
        type: 'media',
        multiple: false,
        required: false,
        allowedTypes: ['images'],
      },
      width: {
        type: 'integer',
      },
      height: {
        type: 'integer',
      },
      category: {
        type: 'relation',
        relation: 'manyToOne',
        target: 'api::category.category',
      },
    },
  },
  {
    name: 'period',
    displayName: 'Period',
    description: '历史年代',
    attributes: {
      period: {
        type: 'string',
        required: true,
        minLength: 1,
        maxLength: 50,
      },
      title: {
        type: 'string',
        required: true,
        maxLength: 200,
      },
      description: {
        type: 'richtext',
      },
      works: {
        type: 'relation',
        relation: 'manyToMany',
        target: 'api::work.work',
        mappedBy: 'periods',
        inversedBy: 'periods',
      },
    },
  },
  {
    name: 'exhibition',
    displayName: 'Exhibition',
    description: '展览信息',
    attributes: {
      name: {
        type: 'string',
        required: true,
        minLength: 1,
        maxLength: 200,
      },
      description: {
        type: 'richtext',
      },
      date: {
        type: 'datetime',
      },
      location: {
        type: 'string',
        maxLength: 200,
      },
      images: {
        type: 'media',
        multiple: true,
        allowedTypes: ['images'],
      },
    },
  },
];

contentTypes.forEach((ct) => {
  const apiDir = path.join(__dirname, '..', 'src', 'api', ct.name);
  const schemaDir = path.join(apiDir, 'content-types', ct.name);
  const controllersDir = path.join(apiDir, 'controllers');
  const servicesDir = path.join(apiDir, 'services');
  const routesDir = path.join(apiDir, 'routes');

  [schemaDir, controllersDir, servicesDir, routesDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  const schema = {
    kind: 'collectionType',
    collectionName: `${ct.name}s`,
    info: {
      singularName: ct.name,
      pluralName: `${ct.name}s`,
      displayName: ct.displayName,
      description: ct.description,
    },
    options: {
      draftAndPublish: false,
    },
    pluginOptions: {
      i18n: {
        localized: false,
      },
    },
    attributes: ct.attributes,
  };

  fs.writeFileSync(
    path.join(schemaDir, 'schema.json'),
    JSON.stringify(schema, null, 2)
  );

  const controller = `'use strict';

/**
 * ${ct.displayName} controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::${ct.name}.${ct.name}');
`;

  fs.writeFileSync(
    path.join(controllersDir, `${ct.name}.js`),
    controller
  );

  const service = `'use strict';

/**
 * ${ct.displayName} service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::${ct.name}.${ct.name}');
`;

  fs.writeFileSync(
    path.join(servicesDir, `${ct.name}.js`),
    service
  );

  const routes = `'use strict';

/**
 * ${ct.displayName} router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::${ct.name}.${ct.name}');
`;

  fs.writeFileSync(
    path.join(routesDir, `${ct.name}.js`),
    routes
  );

  const index = `'use strict';

module.exports = {
  '${ct.name}': {
    type: 'content-api',
  },
};
`;

  fs.writeFileSync(
    path.join(apiDir, 'index.js'),
    index
  );

  console.log(`✅ Created content type: ${ct.name}`);
});

console.log('\n🎉 All content types created successfully!');
console.log('Please restart Strapi: npm run develop');