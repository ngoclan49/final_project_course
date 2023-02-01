import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import '../../assets/css/header.css'
import { AiOutlineSearch, AiOutlineHeart, AiOutlineUser } from 'react-icons/ai'
type Props = {}

const BottomNavbar = (props: Props) => {
    return (
        <div className='bottomNav'>
            <Navbar>
                <Container>
                    <div className="bottomNav-content">
                        <Navbar.Text className='bottomNav-detail'>
                            <p>Explore</p>
                            <AiOutlineSearch className='icon' />
                        </Navbar.Text>
                        <Navbar.Text className='bottomNav-detail'>
                            <p>Favourite</p>
                            <AiOutlineHeart className='icon' />
                        </Navbar.Text>
                        <Navbar.Text className='bottomNav-detail'>
                            <p>Log in</p>
                            <AiOutlineUser className='icon' />
                        </Navbar.Text>
                    </div>
                </Container>
            </Navbar>
        </div>
)
}

export default BottomNavbar

