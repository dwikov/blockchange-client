import  styles from './NavBar.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Wallet from './Wallet/Wallet'
import styled from 'styled-components'

const Logo = styled.a`
    font-family: 'Poiret One', cursive;
    font-size: 35px;
    color: ${props => props.theme.palette.primary.main};

    &:hover{
        cursor: pointer;
    }
`;

const NavItem = styled.nav<{ active: boolean }>`
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    &:hover{
        cursor: pointer;
    }
    ${props => props.active && `
        color: ${props.theme.palette.primary.main};
        font-weight: bold;
        border-bottom: 1px solid ${props.theme.palette.primary.main};
    `} 
`;

const NavItems = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`;
const StyledNavBar = styled.nav`
    border-bottom: 1px solid #bfbfbf;
    width: 100%;
    display: grid;
    grid-template-columns: 3fr 2fr 3fr;
    align-items: center;
    height: 50px;
`;

const NavBar = () => {
    const router = useRouter();

    return (  
        <>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Poiret+One&display=swap" rel="stylesheet"/>
            <StyledNavBar>
                <Link href="/">
                    <Logo>BlockChange</Logo>
                </Link>
                <NavItems>
                    <Link href="/feed">
                        <NavItem active={router.pathname === '/feed'}>Recent</NavItem>
                    </Link>
                    <Link href="/feed">
                        <NavItem>Featured</NavItem>
                    </Link>
                    <Link href="/feed">
                        <NavItem>My Petitions</NavItem>
                    </Link>
                </NavItems>
                
                <div className={styles.wallet}>
                    <Wallet/>
                </div>
            </StyledNavBar>
        </>)};
 
export default NavBar;