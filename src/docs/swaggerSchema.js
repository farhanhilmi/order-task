export default {
  swagger: '2.0',
  info: {
    title: 'product',
    description: '',
    version: '1',
  },
  paths: {
    '/ProductService/getProduct': {
      post: {
        operationId: 'ProductService.getProduct',
        description: '',
        parameters: {
          name: 'body',
          in: 'body',
          required: true,
          description: '',
          schema: {
            $ref: '#/definitions/productId',
          },
        },
        responses: {
          200: {
            description: '',
            schema: {
              $ref: '#/definitions/Product',
            },
          },
        },
      },
    },
    '/ProductService/getAllProduct': {
      post: {
        operationId: 'ProductService.getAllProduct',
        description: '',
        parameters: {
          name: 'body',
          in: 'body',
          required: true,
          description: '',
          schema: {
            $ref: '#/definitions/Empty',
          },
        },
        responses: {
          200: {
            description: '',
            schema: {
              $ref: '#/definitions/ListProduct',
            },
          },
        },
      },
    },
    '/ProductService/addProduct': {
      post: {
        operationId: 'ProductService.addProduct',
        description: '',
        parameters: {
          name: 'body',
          in: 'body',
          required: true,
          description: '',
          schema: {
            $ref: '#/definitions/AddProduct',
          },
        },
        responses: {
          200: {
            description: '',
            schema: {
              $ref: '#/definitions/Product',
            },
          },
        },
      },
    },
    '/ProductService/isProductsAvailable': {
      post: {
        operationId: 'ProductService.isProductsAvailable',
        description: '',
        parameters: {
          name: 'body',
          in: 'body',
          required: true,
          description: '',
          schema: {
            $ref: '#/definitions/productsId',
          },
        },
        responses: {
          200: {
            description: '',
            schema: {
              $ref: '#/definitions/status',
            },
          },
        },
      },
    },
    '/ProductService/checkAndUpdateProductQty': {
      post: {
        operationId: 'ProductService.checkAndUpdateProductQty',
        description: '',
        parameters: {
          name: 'body',
          in: 'body',
          required: true,
          description: '',
          schema: {
            $ref: '#/definitions/listCheckAndUpdateQty',
          },
        },
        responses: {
          200: {
            description: '',
            schema: {
              $ref: '#/definitions/listProductQty',
            },
          },
        },
      },
    },
  },
  definitions: {
    Empty: {
      type: 'object',
      properties: {},
    },
    CheckAndUpdateQty: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
        },
        orderedQty: {
          type: 'integer',
          format: 'int32',
        },
      },
    },
    listCheckAndUpdateQty: {
      type: 'object',
      properties: {
        products: {
          type: 'array',
          items: {
            $ref: '#/definitions/CheckAndUpdateQty',
          },
        },
      },
    },
    productQty: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
        },
        quantity: {
          type: 'integer',
          format: 'int32',
        },
        price: {
          type: 'integer',
          format: 'int32',
        },
      },
    },
    AddProduct: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        quantity: {
          type: 'integer',
          format: 'int32',
        },
        price: {
          type: 'integer',
          format: 'int32',
        },
      },
    },
    Product: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        quantity: {
          type: 'integer',
          format: 'int32',
        },
        _id: {
          type: 'string',
        },
        price: {
          type: 'integer',
          format: 'int32',
        },
      },
    },
    productId: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
        },
      },
    },
    productsId: {
      type: 'object',
      properties: {
        productsId: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    },
    listProductQty: {
      type: 'object',
      properties: {
        listProductQty: {
          type: 'array',
          items: {
            $ref: '#/definitions/productQty',
          },
        },
      },
    },
    ListProduct: {
      type: 'object',
      properties: {
        products: {
          type: 'array',
          items: {
            $ref: '#/definitions/Product',
          },
        },
      },
    },
    status: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
        },
      },
    },
  },
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
      },
    },
  },
  security: [
    {
      cookieAuth: [],
    },
  ],
};
