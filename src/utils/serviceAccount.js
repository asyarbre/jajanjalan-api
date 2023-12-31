const {
  GOOGLE_PRIVATE_KEY_ID,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_X509_CERT_URL,
} = process.env;

module.exports = {
  type: "service_account",
  project_id: "jajanjalan-server",
  private_key_id: GOOGLE_PRIVATE_KEY_ID,
  private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: GOOGLE_CLIENT_EMAIL,
  client_id: GOOGLE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: GOOGLE_CLIENT_X509_CERT_URL,
  universe_domain: "googleapis.com",
};
