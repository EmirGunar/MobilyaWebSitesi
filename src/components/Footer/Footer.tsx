import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../../styles/GlobalStyles';

const logoImage = `${process.env.PUBLIC_URL}/arsellogo.jpg`;

const FooterSection = styled.footer`
  background: #f9f5ee;
  color: ${colors.text};
  padding: 3rem 0 1.5rem;
  margin-top: auto;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FooterTop = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  align-items: start;
`;

const BrandBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .logo-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 110px;
    height: 110px;
    border-radius: 16px;
    background: white;
    padding: 12px;
    box-shadow: 0 18px 32px rgba(93, 78, 55, 0.18);
    border: 1px solid rgba(210, 180, 140, 0.4);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 10px;
  }

  p {
    margin: 0;
    color: ${colors.textLight};
    line-height: 1.6;
  }
`;

const FooterHeading = styled.h4`
  margin: 0 0 1rem;
  font-size: 1rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${colors.text};
`;

const FooterList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.6rem;
`;

const FooterLink = styled(Link)`
  color: ${colors.textLight};
  font-size: 0.95rem;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${colors.accent};
  }
`;

const ContactItem = styled.div`
  display: flex;
  gap: 0.6rem;
  color: ${colors.textLight};
  font-size: 0.95rem;
  line-height: 1.5;

  span:first-child {
    font-size: 1.1rem;
  }
`;

const ContactLink = styled.a`
  color: ${colors.accent};
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(93, 78, 55, 0.15);
  padding-top: 1.2rem;
  text-align: center;
  font-size: 0.9rem;
  color: ${colors.textLight};
`;

const Footer: React.FC = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <FooterTop>
          <BrandBlock>
            <div className="logo-wrapper">
              <img src={logoImage} alt="ArselGroup" />
            </div>
            <p>Kaliteli masa, sandalye ve bahçe mobilyaları.</p>
          </BrandBlock>

          <div>
            <FooterHeading>Hızlı Bağlantılar</FooterHeading>
            <FooterList>
              <li><FooterLink to="/">Ana Sayfa</FooterLink></li>
              <li><FooterLink to="/products">Ürünler</FooterLink></li>
              <li><FooterLink to="/contact">İletişim</FooterLink></li>
              <li><FooterLink to="/cart">Sepet</FooterLink></li>
            </FooterList>
          </div>

          <div>
            <FooterHeading>İletişim</FooterHeading>
            <FooterList as="div">
              <ContactItem>
                <span>📍</span>
                <span>
                  Nato Yolu Caddesi No:109 Ofis 37<br />
                  Ümraniye / İstanbul<br />
                  <ContactLink
                    href="https://maps.google.com/?q=Nato+Yolu+Caddesi+No+109+Ofis+37+Ümraniye+İstanbul"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Konumu Aç
                  </ContactLink>
                </span>
              </ContactItem>
              <ContactItem>
                <span>📞</span>
                <span>
                  <ContactLink href="https://wa.me/905334394257" target="_blank" rel="noreferrer">
                    0533 439 42 57 (WhatsApp)
                  </ContactLink>
                </span>
              </ContactItem>
              <ContactItem>
                <span>✉️</span>
                <span>
                  <ContactLink href="mailto:emirgunar954@gmail.com">emirgunar954@gmail.com</ContactLink>
                </span>
              </ContactItem>
              <ContactItem>
                <span>🕒</span>
                <span>
                  Pazartesi - Cumartesi: 09:00 - 18:00<br />
                  Pazar: Kapalı
                </span>
              </ContactItem>
            </FooterList>
          </div>
        </FooterTop>

        <FooterBottom>
          © 2025 ArselGroup | Tüm Hakları Saklıdır.
        </FooterBottom>
      </FooterContainer>
    </FooterSection>
  );
};

export default Footer;
