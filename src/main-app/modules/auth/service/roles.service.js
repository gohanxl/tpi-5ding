class RoleAccesibilty {
  constructor() {
    this.routes = {};
    this.menus = {};
  }

  setRoutes(routes) {
    this.routes = routes;
    return this;
  }

  setMenus(menus) {
    this.menus = menus;
    return this;
  }

  getRoutesByRoles([role]) {
    const roleRoutes = this.routes[role.toLowerCase()];
    return roleRoutes;
  }
}

export const roleAccessibilty = new RoleAccesibilty();
