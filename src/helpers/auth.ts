const successURL = 'https://www.facebook.com/connect/login_success.html';
const path = 'https://www.facebook.com/v9.0/dialog/oauth?';
const appID = '1263314497389233';
const queryParams = [
  'client_id=' + appID,
  // 'auth_type=rerequest',
  'scope=public_profile,pages_show_list',
  'redirect_uri=' + successURL,
  'response_type=token',
  'display=popup'
];

const query = queryParams.join('&');

export const authenticationUrl = path + query;