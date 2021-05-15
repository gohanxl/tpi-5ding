import React from "react";
import "./Sidebar.styles.scss";

export const Sidebar = () => {
  return (
    <aside className="sidebar-menu menu">
      <ul className="menu-list">
        <li>
          <a className="is-active" href="/home">
            Dashboard
          </a>
        </li>
        <li>
          <a href="/student">Student</a>
        </li>
      </ul>
      <ul className="menu-list">
        <li>
          <a>Team Settings</a>
        </li>
        <li>
          <p>Manage Your Team</p>
          <ul>
            <li>
              <a>Members</a>
            </li>
            <li>
              <a>Plugins</a>
            </li>
            <li>
              <a>Add a member</a>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
};
