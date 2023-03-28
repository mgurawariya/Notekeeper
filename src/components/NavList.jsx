import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { LightbulbOutlined as Lightbulb, ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const NavList = () => {

    const [selectedIndex, setSelecetdIndex] = useState( 0 );

    const navList = [
        { id: 1, name: 'Notes', icon: <Lightbulb />, route: '/' },
        { id: 2, name: 'Archives', icon: <Archive />, route: '/archive' },
        { id: 3, name: 'Trash', icon: <Delete />, route: '/delete' },
    ];

    const selectedNav = ( index ) => {
        setSelecetdIndex( index );
    }

    useEffect( () => {
        let selectIndex = 0;
        navList.forEach((element, index) => {
            if( element.route === window.location.pathname ) {
                selectIndex = index;
            }
        })
        setSelecetdIndex( selectIndex );
    }, [window.location.pathname])
    
    return (
        <List>
        {
            navList.map((list, index) => (
                <Link key={list.id} to={`${list.route}`} style={{ textDecoration: 'none', display: 'flex', color: 'inherit' }}>
                    <ListItem onClick={() => selectedNav( index ) } style={{ background: `${ selectedIndex === index ? 'lightgray' : '' }` }}>

                        <ListItemIcon style={{ alignItems: 'center' }}>
                            {list.icon}
                        </ListItemIcon>
                        <ListItemText primary={list.name} />

                    </ListItem>
                </Link>
            ))
        }
        </List>
    )
}

export default NavList;