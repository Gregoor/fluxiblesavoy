import React from 'react';
import {NavLink} from 'flux-router-component';

let Nav = React.createClass({
  getDefaultProps() {
    return {
      selected: 'home',
      links: {}
    };
  },
  render() {
    let {selected, links} = this.props;

    let linkHTML = Object.keys(links).map((name) => {
      let className = '';
      let link = links[name];

      if (selected == name) className = 'pure-menu-selected';

      return (
        <li className={className} key={link.path}>
          <NavLink routeName={link.page}>{link.title}</NavLink>
        </li>
      );
    });

    return (
      <ul className="pure-menu pure-menu-open pure-menu-horizontal">
        {linkHTML}
      </ul>
    );
  }
});

export default Nav;
