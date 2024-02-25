import { NavLink } from '@remix-run/react';

export function GlobalNavigationBar() {
  return (
    <ul>
      <li>
        <NavLink prefetch='render' to="/">home</NavLink>
      </li>
      <li>
        <NavLink prefetch='render' to="/articles">Articles</NavLink>
      </li>
      <li>
        <NavLink prefetch='render' to="/brand">Brand</NavLink>
      </li>
    </ul>
  );
}
