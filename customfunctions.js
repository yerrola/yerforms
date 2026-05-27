import fetchStatesByCountry from './functions/state-functions.js';

export default {
  fetchStatesByCountry: {
    title: 'Fetch States by Country',
    params: [
      { name: 'countryCode', type: 'string' },
      { name: 'globals', type: 'object', required: false },
    ],
    returnType: 'void',
    fn: fetchStatesByCountry,
  },
};
