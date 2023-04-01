import enigma from 'enigma.js'

// const schema = require("enigma.js/schemas/3.1.json")

//create a new session
// const session = enigma.create({
//     schema,
//     url: 'ws://localhost:4848/app/engineData'
// })


// config connection to qlik tenant
let session, user, global;
const getQlikGlobal = async () => {
const tenantUri = 'https://kassovitz.us.qlikcloud.com';
const webIntegrationId = '57dm78_Ma_zMlX-y9A-wcm1D0jLoDy7W';

async function request(path, returnJson = true) {
    const res = await fetch(`${tenantUri}${path}`, {
        mode: 'cors',
        credentials: 'include',
        redirect: 'follow',
        headers: {
        // web integration is sent as a header:
        'qlik-web-integration-id': webIntegrationId,
        },
    });
    if (res.status < 200 || res.status >= 400) throw res;
    return returnJson ? res.json() : res;
}

try {
    // call your-tenant.us.qlikcloud.com/api/v1/users/me to
    // retrieve the user metadata, as a way to detect if they
    // are signed in. An error will be thrown if the response
    // is a non-2XX HTTP status:
    user = await request('/api/v1/users/me');
    console.log('welcome', user.name);
} catch (err) {
    const returnTo = encodeURIComponent(window.location.href);
    // redirect your user to the tenant log in screen, and once they're
    // signed in, return to your web app:
    window.location.href = `${tenantUri}/login?returnto=${returnTo}&qlik-web-integration-id=${webIntegrationId}`;
}

try {
    // fetch the CSRF token:
    const res = await request('/api/v1/csrf-token', false);
    const csrfToken = res.headers.get('qlik-csrf-token');

    // fetch the list of available apps:
    const apps = await request('/api/v1/items?resourceType=app');

    if (!apps.data.length) {
      console.log('No apps available');
      return;
    }

    // grab the first app ID in the list:
    const appId = apps.data[0].resourceId;

    // build a websocket URL:
    const url = `${tenantUri.replace(
      'https',
      'wss'
    )}/app/${appId}?qlik-web-integration-id=${webIntegrationId}&qlik-csrf-token=${csrfToken}`;

    // fetch the engine API schema:
    const schema = await (await fetch('https://unpkg.com/enigma.js@2.7.0/schemas/12.612.0.json')).json();

    // create the enigma.js session:
    session = enigma.create({ url, schema });
    global = await session.open();

  } catch (err) {
    window.console.log('Error while setting up:', err);
  }

  return global;
};

export default getQlikGlobal();