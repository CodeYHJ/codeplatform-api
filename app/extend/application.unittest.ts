
module.exports = {
  mockUserContext() {
    const ctx = this.mockContext();
    // ctx.req is not the http request
    // login, logout, isAuthenticated, isUnauthenticated
    ctx.req = {
      login: () => Promise.resolve(),
      logout: () => { return {}; },
      isAuthenticated: () => true,
      isUnauthenticated: () => false,
    };

    return ctx;
  },
};
