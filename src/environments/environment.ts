export const environment = {
  production: false,
  keycloak: {
    url: 'http://localhost:8484',
    realm: 'ajcompare',
    clientId: 'frontend-service',
    redirectUri: 'http://localhost:4200'
  }
};
