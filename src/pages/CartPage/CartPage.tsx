import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../context/CartContext';
import { buildImageUrl } from '../../utils/image';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
  min-height: 60vh;
`;

const PageTitle = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
`;

const CartContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 80px 1fr auto auto auto;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #ecf0f1;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 0.5rem;
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  background-color: #ecf0f1;
  border-radius: 8px;
  object-fit: cover;
`;

const ItemInfo = styled.div`
  h3 {
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }
  
  p {
    color: #7f8c8d;
    font-size: 0.9rem;
  }
`;

const ItemPrice = styled.div`
  font-weight: 600;
  color: #e74c3c;
  font-size: 1.1rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  button {
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    background-color: white;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background-color: #f8f9fa;
    }
  }
  
  span {
    min-width: 30px;
    text-align: center;
    font-weight: 600;
  }
`;

const RemoveButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  
  &:hover {
    background-color: #c0392b;
  }
`;

const CartSummary = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  height: fit-content;
`;

const SummaryTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #ecf0f1;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  &.total {
    font-weight: 600;
    font-size: 1.2rem;
    color: #2c3e50;
    padding-top: 0.5rem;
    border-top: 1px solid #ecf0f1;
    margin-top: 1rem;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  background-color: #27ae60;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #229954;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
  
  h2 {
    color: #2c3e50;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 2rem;
  }
`;

const ContinueShoppingButton = styled(Link)`
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 1rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #2980b9;
  }
`;

const CartPage: React.FC = () => {
  const { state, updateQuantity, removeFromCart } = useCart();
  const { items, total } = state;

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  const finalTotal = total;

  if (items.length === 0) {
    return (
      <PageContainer>
        <PageTitle>Sepetim</PageTitle>
        <EmptyCart>
          <h2>Sepetiniz Boş</h2>
          <p>Henüz sepetinize ürün eklemediniz.</p>
          <ContinueShoppingButton to="/products">
            Alışverişe Devam Et
          </ContinueShoppingButton>
        </EmptyCart>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageTitle>Sepetim ({items.length} ürün)</PageTitle>
      
      <CartContainer>
        <CartItems>
          {items.map(item => (
            <CartItem key={item.id}>
              <ItemImage
                src={buildImageUrl(item.image)}
                alt={item.name}
                loading="lazy"
              />
              <ItemInfo>
                <h3>{item.name}</h3>
                <p>Birim Fiyat: {item.price} TL</p>
              </ItemInfo>
              <ItemPrice>{item.price * item.quantity} TL</ItemPrice>
              <QuantityControls>
                <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                  +
                </button>
              </QuantityControls>
              <RemoveButton onClick={() => removeFromCart(item.id)}>
                Kaldır
              </RemoveButton>
            </CartItem>
          ))}
        </CartItems>

        <CartSummary>
          <SummaryTitle>Sipariş Özeti</SummaryTitle>
          <SummaryRow>
            <span>Ara Toplam:</span>
            <span>{total} TL</span>
          </SummaryRow>
          <SummaryRow className="total">
            <span>Toplam:</span>
            <span>{finalTotal} TL</span>
          </SummaryRow>
          <CheckoutButton
            onClick={() => {
              alert('Şu anda internet üzerinden ödeme alamıyoruz. Sipariş için WhatsApp üzerinden iletişime geçebilirsiniz: 0533 439 42 57');
              window.open('https://wa.me/905465417595', '_blank');
            }}
          >
            Ödemeye Geç
          </CheckoutButton>
          <ContinueShoppingButton to="/products" style={{ 
            display: 'block', 
            textAlign: 'center', 
            marginTop: '1rem',
            backgroundColor: '#95a5a6'
          }}>
            Alışverişe Devam Et
          </ContinueShoppingButton>
        </CartSummary>
      </CartContainer>
    </PageContainer>
  );
};

export default CartPage;
