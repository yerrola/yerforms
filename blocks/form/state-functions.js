/**
 * Fetches states for a given country code
 * @param {string} countryCode - selected country code
 * @param {scope} globals - AF globals object
 * @name fetchStatesByCountry
 */
async function fetchStatesByCountry(countryCode, globals) {
  try {
    const response = await fetch(
      `https://417052-pushrequest.adobeioruntime.net/api/v1/web/io-app/get-states-by-country?country=${countryCode}`,
    );

    const data = await response.json();

    const enumValues = data.map((state) => state.code);
    const enumNames = data.map((state) => state.name);

    globals.functions.setProperty('state', {
      enum: enumValues,
      enumNames,
    });
  } catch (error) {
    console.error('Failed to fetch states:', error);
    globals.functions.setProperty('state', {
      enum: [],
      enumNames: [],
    });
  }
}

export default fetchStatesByCountry;
