import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';
import { mockProducts } from '../../data/mockData';
import { buildImageUrl } from '../../utils/image';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const Breadcrumb = styled.nav`
  margin-bottom: 2rem;
  font-size: 0.9rem;
  color: #7f8c8d;
  
  a {
    color: #3498db;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MainImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  height: auto;
  object-fit: cover;
  background-color: #ecf0f1;
  border-radius: 10px;
`;

const ProductInfo = styled.div`
  h1 {
    color: #2c3e50;
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #e74c3c;
  margin-bottom: 1rem;
`;

const StockStatus = styled.div<{ inStock: boolean }>`
  font-size: 1rem;
  font-weight: 600;
  color: ${props => props.inStock ? '#27ae60' : '#e74c3c'};
  margin-bottom: 1.5rem;
`;

const Description = styled.div`
  color: #7f8c8d;
  line-height: 1.6;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  
  label {
    font-weight: 600;
    color: #2c3e50;
  }
`;

const QuantityInput = styled.input`
  width: 80px;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
  font-size: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const AddToCartButton = styled.button<{ disabled: boolean }>`
  flex: 1;
  background-color: ${props => props.disabled ? '#bdc3c7' : '#3498db'};
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.disabled ? '#bdc3c7' : '#2980b9'};
  }
`;

const BuyNowButton = styled.button<{ disabled: boolean }>`
  flex: 1;
  background-color: ${props => props.disabled ? '#bdc3c7' : '#e74c3c'};
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.disabled ? '#bdc3c7' : '#c0392b'};
  }
`;

const ProductFeatures = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 2rem;
  
  h3 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    
    li {
      padding: 0.5rem 0;
      border-bottom: 1px solid #ecf0f1;
      color: #7f8c8d;
      
      &:last-child {
        border-bottom: none;
      }
      
      &:before {
        content: "✓";
        color: #27ae60;
        font-weight: bold;
        margin-right: 0.5rem;
      }
    }
  }
`;

const NotFound = styled.div`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
  
  h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }
`;

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = mockProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <PageContainer>
        <NotFound>
          <h2>Ürün Bulunamadı</h2>
          <p>Aradığınız ürün mevcut değil.</p>
          <Link to="/products">Ürünlere Geri Dön</Link>
        </NotFound>
      </PageContainer>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    alert('Şu anda internet üzerinden ödeme işlemimiz yok. İstediğiniz masa veya sandalye için WhatsApp üzerinden iletişime geçebilirsiniz: 0533 439 42 57');
    window.open('https://wa.me/905465417595', '_blank');
  };

  return (
    <PageContainer>
      <Breadcrumb>
        <Link to="/">Ana Sayfa</Link> / <Link to="/products">Ürünler</Link> / {product.name}
      </Breadcrumb>

      <ProductContainer>
        <ImageSection>
          <MainImage
            src={buildImageUrl(product.image)}
            alt={product.name}
          />
        </ImageSection>

        <ProductInfo>
          <h1>{product.name}</h1>
          <Price>{product.price} TL</Price>
          <StockStatus inStock={product.inStock}>
            {product.inStock ? 'Stokta var' : 'Stokta yok'}
          </StockStatus>
          
          <Description>
            {product.description}
          </Description>

          <QuantitySelector>
            <label>Adet:</label>
            <QuantityInput
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              disabled={!product.inStock}
            />
          </QuantitySelector>

          <ButtonGroup>
            <AddToCartButton
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              Sepete Ekle
            </AddToCartButton>
            <BuyNowButton
              disabled={!product.inStock}
              onClick={handleBuyNow}
            >
              Hemen Al
            </BuyNowButton>
          </ButtonGroup>
        </ProductInfo>
      </ProductContainer>

      <ProductFeatures>
        <h3>Ürün Özellikleri</h3>
        <ul>
          <li>Yüksek kaliteli malzeme</li>
          <li>Ergonomik tasarım</li>
          <li>2 yıl garanti</li>
          <li>Kolay montaj</li>
          <li>Ücretsiz kargo (500 TL üzeri)</li>
          <li>14 gün iade garantisi</li>
        </ul>
      </ProductFeatures>
    </PageContainer>
  );
};

export default ProductDetailPage;
