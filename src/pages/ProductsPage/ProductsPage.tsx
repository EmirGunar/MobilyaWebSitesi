import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { mockProducts, categories } from '../../data/mockData';
import { Product } from '../../context/CartContext';
import { useCart } from '../../context/CartContext';
import { colors } from '../../styles/GlobalStyles';
import { buildImageUrl } from '../../utils/image';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 20px;
`;

const PageTitle = styled.h1`
  color: ${colors.text};
  margin-bottom: 2rem;
  text-align: center;
`;

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: ${colors.surface};
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-weight: 600;
    color: #2c3e50;
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: none;
  
  &:focus {
    border-color: ${colors.primaryDark};
  }
`;

const CategoryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: 1px solid ${colors.primary};
  border-radius: 20px;
  background-color: ${props => props.active ? colors.primary : 'white'};
  color: ${props => props.active ? 'white' : colors.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${colors.primaryLight};
    color: ${props => props.active ? 'white' : colors.text};
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 320px));
  justify-content: center;
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 4 / 3;
  height: auto;
  object-fit: cover;
  background-color: #ecf0f1;
  cursor: pointer;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ProductDescription = styled.p`
  color: ${colors.textLight};
  margin-bottom: 0.9rem;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ProductPrice = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${colors.accent};
  margin-bottom: 0.9rem;
`;

const ProductName = styled(Link)`
  color: #2c3e50;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  display: block;
  margin-bottom: 0.5rem;
  
  &:hover {
    color: ${colors.primaryDark};
  }
`;

const StockStatus = styled.span<{ inStock: boolean }>`
  font-size: 0.8rem;
  color: ${props => props.inStock ? '#27ae60' : '#e74c3c'};
  font-weight: 600;
  margin-bottom: 1rem;
  display: block;
`;

const ProductActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
`;

const ProductButton = styled.button`
  flex: 1;
  background-color: ${colors.primary};
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const ProductSecondaryButton = styled.button<{ disabled?: boolean }>`
  flex: 1;
  background-color: ${props => props.disabled ? '#bdc3c7' : colors.secondary};
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: ${props => props.disabled ? '#bdc3c7' : colors.primary};
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
  }
`;

const NoProducts = styled.div`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
  font-size: 1.1rem;
`;

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    let filtered = [...mockProducts];
    
    // Kategori filtresi
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Arama filtresi
    const searchTerm = searchParams.get('search');
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Fiyat aralığı filtresi
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'low':
          filtered = filtered.filter(product => product.price < 500);
          break;
        case 'medium':
          filtered = filtered.filter(product => product.price >= 500 && product.price < 1500);
          break;
        case 'high':
          filtered = filtered.filter(product => product.price >= 1500);
          break;
      }
    }
    
    // Sıralama
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    
    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, priceRange, searchParams]);

  return (
    <PageContainer>
      <PageTitle>Ürünlerimiz</PageTitle>
      
      <FiltersContainer>
        <FilterGroup>
          <label>Kategori:</label>
          <CategoryFilter>
            {categories.map(category => (
              <CategoryButton
                key={category.id}
                active={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </CategoryButton>
            ))}
          </CategoryFilter>
        </FilterGroup>
        
        <FilterGroup>
          <label>Sırala:</label>
          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="name">İsme Göre</option>
            <option value="price-low">Fiyat (Düşük-Yüksek)</option>
            <option value="price-high">Fiyat (Yüksek-Düşük)</option>
          </Select>
        </FilterGroup>
        
        <FilterGroup>
          <label>Fiyat Aralığı:</label>
          <Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
            <option value="all">Tümü</option>
            <option value="low">500 TL altı</option>
            <option value="medium">500-1500 TL</option>
            <option value="high">1500 TL üzeri</option>
          </Select>
        </FilterGroup>
      </FiltersContainer>

      {filteredProducts.length === 0 ? (
        <NoProducts>
          Aradığınız kriterlere uygun ürün bulunamadı.
        </NoProducts>
      ) : (
        <ProductsGrid>
          {filteredProducts.map(product => (
            <ProductCard key={product.id}>
              <ProductImage
                src={buildImageUrl(product.image)}
                alt={product.name}
                loading="lazy"
                onClick={() => navigate(`/product/${product.id}`)}
              />
              <ProductInfo>
                <ProductName to={`/product/${product.id}`}>
                  {product.name}
                </ProductName>
                <ProductDescription>{product.description}</ProductDescription>
                <ProductPrice>{product.price} TL</ProductPrice>
                <StockStatus inStock={product.inStock}>
                  {product.inStock ? 'Stokta var' : 'Stokta yok'}
                </StockStatus>
                <ProductActions>
                  <ProductButton onClick={() => navigate(`/product/${product.id}`)}>
                    Ürünü Gör
                  </ProductButton>
                  <ProductSecondaryButton
                    disabled={!product.inStock}
                    onClick={() => product.inStock && addToCart(product)}
                  >
                    {product.inStock ? 'Sepete Ekle' : 'Stokta Yok'}
                  </ProductSecondaryButton>
                </ProductActions>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
      )}
    </PageContainer>
  );
};

export default ProductsPage;
