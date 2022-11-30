import React from 'react'
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { MenuItem } from '../model/viewModel/MenuItem';


interface MenuHierarchyProps {
    items: MenuItem[];
}


const MenuHierarchy = (props: MenuHierarchyProps) => {
    return (
        <div>
        <ul className="menu-hierarchy">
            {
                props.items.map( (item, i) =>
                    <li key={item.path}>
                        <NavLink tag={Link} to={item.path}>{item.title}{i > 0 ? ' » ': null}</NavLink>
                    </li>
                )
            }
        </ul>
        <div className="clearfix"></div>
        </div>
    )
}

export default MenuHierarchy;
