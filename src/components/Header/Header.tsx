import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';
import { colors } from '../../styles/GlobalStyles';

const logoImage = `${process.env.PUBLIC_URL}/arsellogo.jpg`;

const HeaderContainer = styled.header`
  background-color: ${colors.primary};
  color: white;
  padding: 1.6rem 0 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
  position: relative;
`;

const AnnouncementBar = styled.div`
  background: linear-gradient(90deg, rgba(210, 180, 140, 0.4), rgba(210, 180, 140, 0.2));
  color: ${colors.text};
  font-size: 0.9rem;
  padding: 0.6rem 1rem;
  text-align: center;
  border-bottom: 1px solid rgba(93, 78, 55, 0.12);

  a {
    color: ${colors.accent};
    font-weight: 600;
    text-decoration: none;
    margin-left: 0.35rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;


const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 860px) {
    flex-direction: column;
    align-items: stretch;
    gap: 1.2rem;
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 0.75rem;

  .logo-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: clamp(48px, 8vw, 64px);
    height: clamp(48px, 8vw, 64px);
    border-radius: 14px;
    background: white;
    padding: 8px;
    box-shadow: 0 14px 24px rgba(93, 78, 55, 0.25);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
  }

  .logo-text {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: clamp(1.6rem, 4vw, 2rem);
    font-weight: 700;
    color: white;
    letter-spacing: 1px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.25);
    transition: color 0.3s ease, transform 0.3s ease;
  }

  &:hover .logo-wrapper {
    box-shadow: 0 18px 28px rgba(93, 78, 55, 0.3);
    transform: translateY(-2px);
  }

  &:hover .logo-text {
    color: ${colors.accent};
    transform: translateY(-1px);
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 860px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #FDF5E6;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${colors.primaryDark};
    color: ${colors.accent};
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  justify-content: center;
  max-width: 360px;
  width: 100%;

  @media (min-width: 861px) {
    width: auto;
  }

  @media (max-width: 860px) {
    order: 2;
    max-width: 100%;
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  outline: none;
  width: 100%;
  max-width: 320px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(255, 255, 255, 0.85);

  @media (min-width: 861px) {
    max-width: 260px;
  }
`;

const CartButton = styled(Link)`
  position: relative;
  background-color: ${colors.secondary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.primaryLight};
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${colors.accent};
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
`;

const CartCountText = styled.span`
  margin-left: 0.4rem;
  font-weight: 700;
`;

const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-weight: 600;
  font-size: 0.95rem;

  @media (max-width: 860px) {
    display: inline-flex;
    order: 3;
    align-self: center;
  }
`;

const MobileMenu = styled.div<{ open: boolean }>`
  display: none;

  @media (max-width: 860px) {
    display: ${({ open }) => (open ? 'grid' : 'none')};
    gap: 0.75rem;
    background: rgba(255, 255, 255, 0.96);
    border-top: 1px solid rgba(210, 180, 140, 0.35);
    padding: 1rem 20px 1.4rem;
    border-radius: 0 0 16px 16px;
    box-shadow: 0 12px 24px rgba(93, 78, 55, 0.15);
    max-width: 1200px;
    margin: 0 auto 1rem;
    width: calc(100% - 40px);
  }
`;

const MobileMenuLink = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  background: rgba(210, 180, 140, 0.15);
  color: ${colors.text};
  font-weight: 600;
  text-decoration: none;
  text-align: center;

  &:hover {
    background: rgba(210, 180, 140, 0.3);
  }
`;

const MobileMenuCartButton = styled(Link)`
  display: block;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  background: ${colors.primary};
  color: white;
  font-weight: 600;
  text-align: center;
  text-decoration: none;

  &:hover {
    background: ${colors.primaryDark};
  }
`;

const FloatingCartButton = styled(Link)`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.92);
  color: ${colors.primary};
  border-radius: 50%;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 14px 32px rgba(93, 78, 55, 0.25);
  text-decoration: none;
  font-size: 1.4rem;
  border: 2px solid rgba(210, 180, 140, 0.4);
  animation: cart-pop 0.4s ease;

  @keyframes cart-pop {
    0% { transform: scale(0.8); opacity: 0; }
    80% { transform: scale(1.1); opacity: 1; }
    100% { transform: scale(1); }
  }

  @media (max-width: 520px) {
    top: auto;
    bottom: 18px;
    right: 18px;
  }
`;

const FloatingCartBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background: ${colors.accent};
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 0 2px white;
`;

const Header: React.FC = () => {
  const { getCartItemsCount } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const cartItemsCount = getCartItemsCount();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <AnnouncementBar>
        Toplu alımlarda indirim vardır. WhatsApp: <a href="https://wa.me/905334394257" target="_blank" rel="noreferrer">0533 439 42 57</a> · WhatsApp: <a href="https://wa.me/905465417595" target="_blank" rel="noreferrer">0546 541 75 95</a> · E-posta: <a href="mailto:emirgunar954@gmail.com">emirgunar954@gmail.com</a>
      </AnnouncementBar>
      <HeaderContainer>
        <HeaderContent>
          <Logo to="/">
            <div className="logo-wrapper">
              <img src={logoImage} alt="ArselGroup" />
            </div>
            <span className="logo-text">ArselGroup</span>
          </Logo>
          
          <SearchContainer>
            <form onSubmit={handleSearch}>
              <SearchInput
                type="text"
                placeholder="Sandalye ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
          </SearchContainer>

          <Nav>
            <NavLink to="/">Ana Sayfa</NavLink>
            <NavLink to="/products">Ürünler</NavLink>
            <NavLink to="/contact">İletişim</NavLink>
            <CartButton to="/cart">
              Sepet
              {cartItemsCount > 0 && (
                <>
                  <CartBadge>{cartItemsCount}</CartBadge>
                  <CartCountText>({cartItemsCount})</CartCountText>
                </>
              )}
            </CartButton>
          </Nav>

          <MobileMenuButton
            type="button"
            aria-label="Menüyü aç"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            ☰ Menü
          </MobileMenuButton>
        </HeaderContent>
        <MobileMenu open={isMobileMenuOpen}>
          <MobileMenuLink to="/" onClick={() => setIsMobileMenuOpen(false)}>Ana Sayfa</MobileMenuLink>
          <MobileMenuLink to="/products" onClick={() => setIsMobileMenuOpen(false)}>Ürünler</MobileMenuLink>
          <MobileMenuLink to="/contact" onClick={() => setIsMobileMenuOpen(false)}>İletişim</MobileMenuLink>
          <MobileMenuCartButton to="/cart" onClick={() => setIsMobileMenuOpen(false)}>
            Sepet {cartItemsCount > 0 ? `(${cartItemsCount})` : ''}
          </MobileMenuCartButton>
        </MobileMenu>
      </HeaderContainer>
      {cartItemsCount > 0 && (
        <FloatingCartButton to="/cart" aria-label="Sepete git">
          🛒
          <FloatingCartBadge>{cartItemsCount}</FloatingCartBadge>
        </FloatingCartButton>
      )}
    </>
  );
};

export default Header;
