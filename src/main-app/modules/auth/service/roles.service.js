import { roles } from "../../../../App.constants";

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
    const currentRole = roles[role.toUpperCase()];
    console.log(role);
    const roleRoutes = this.routes[currentRole];
    return roleRoutes;
  }
}

export const roleAccessibilty = new RoleAccesibilty();
