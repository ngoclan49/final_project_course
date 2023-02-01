
import React, { useState, useEffect } from 'react'
import '../../assets/css/mobile-navbar.css'
import { AiOutlineSearch } from 'react-icons/ai'
type Props = {}

const MobileNavbar = (props: Props) => {
    return (
        <div className='mobile-search-bar'>
            <input type="text" className="input__field" placeholder="Any where" />
            <div className="input__icon-hold">
                <span className="input__icon">
                    <AiOutlineSearch className="icon" />
                </span>
            </div>
        </div>
    )
}

export default MobileNavbar
