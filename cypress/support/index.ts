// eslint-disable-next-line @typescript-eslint/no-unused-vars
Cypress.on('uncaught:exception', (err: Error, runnable: Mocha.Runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})
