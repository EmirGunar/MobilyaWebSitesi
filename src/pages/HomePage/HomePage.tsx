import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import type { Product } from '../../context/CartContext';
import { mockProducts, categories as productCategories } from '../../data/mockData';
import { colors } from '../../styles/GlobalStyles';
import { buildImageUrl } from '../../utils/image';
import { useCart } from '../../context/CartContext';

const SLIDE_INTERVAL = 6000;

interface SlideConfig {
  productId: number;
  tagline: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink?: string;
}

interface SlideData {
  product: Product;
  tagline: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
}

interface CategoryWithProducts {
  id: string;
  name: string;
  description: string;
  link: string;
  products: Product[];
}

const slideConfigs: SlideConfig[] = [
  {
    productId: 2,
    tagline: 'Yeni Sezon',
    headline: 'Cosmo Sandalye ile Modern Dokunuş',
    subheadline: 'Metal ayak ve kadife dokusuyla Cosmo, yemek alanlarınıza sıcak bir şıklık katar.',
    ctaText: "Cosmo'yu İncele"
  },
  {
    productId: 6,
    tagline: 'Ofis Konforu',
    headline: 'Ergo Ofis Sandalyesi ile Gün Boyu Rahatlık',
    subheadline: 'Bel destekli ergonomik tasarım sayesinde uzun çalışma saatlerinde konforu hissedin.',
    ctaText: "Ergo'yu Keşfet"
  },
  {
    productId: 10,
    tagline: 'Dış Mekan',
    headline: 'Katlanabilir Bahçe Takımı ile Esnek Alanlar',
    subheadline: 'Taşınabilir masa ve sandalye seti, balkon ve bahçelerde yerden tasarruf sağlar.',
    ctaText: "Takımı Gör"
  }
];

const categoryDescriptions: Record<string, string> = {
  ofis: 'Ergonomik çalışma sandalyeleri ve yönetici koltukları.',
  yemek: 'Şık yemek sandalyeleriyle sofralarınıza uyum sağlayın.',
  bahce: 'Bahçe ve dış mekan için dayanıklı sandalye seçenekleri.',
  bar: 'Kafe ve bar konseptine uygun yüksek sandalyeler.',
  genel: 'Takım ürünler ve tamamlayıcı masa seçenekleri.',
  aksesuar: 'Konforu artıran tamamlayıcı aksesuarlar.'
};

const buildSlides = (): SlideData[] => {
  return slideConfigs
    .map((config) => {
      const product = mockProducts.find((item) => item.id === config.productId);
      if (!product) {
        return null;
      }
      return {
        product,
        tagline: config.tagline,
        headline: config.headline,
        subheadline: config.subheadline,
        ctaText: config.ctaText,
        ctaLink: config.ctaLink ?? `/product/${product.id}`
      };
    })
    .filter((slide): slide is SlideData => slide !== null);
};

const buildCategoryData = (): CategoryWithProducts[] => {
  return productCategories
    .filter((category) => category.id !== 'all')
    .map((category) => {
      return {
        id: category.id,
        name: category.name,
        description: categoryDescriptions[category.id] ?? 'Bu kategoride size uygun farklı modelleri keşfedin.',
        link: `/products?category=${category.id}`,
        products: mockProducts.filter((product) => product.category === category.id)
      };
    })
    .filter((category) => category.products.length > 0);
};

const HeroSection = styled.section`
  max-width: 1200px;
  margin: 0 auto 4rem;
  padding: 0 20px;
`;

const HeroSlider = styled.div`
  position: relative;
  height: clamp(360px, 65vh, 560px);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 22px 48px rgba(96, 79, 48, 0.35);
  background-color: ${colors.primaryDark};
`;

const SlidesContainer = styled.div`
  position: absolute;
  inset: 0;
`;

const Slide = styled.div<{ active: boolean }>`
  position: absolute;
  inset: 0;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transform: scale(${({ active }) => (active ? 1 : 1.05)});
  transition: opacity 0.9s ease, transform 1.4s ease;
  pointer-events: ${({ active }) => (active ? 'auto' : 'none')};
`;

const SlideBackground = styled.div<{ imageUrl: string }>`
  position: absolute;
  inset: 0;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  filter: blur(12px) brightness(0.85);
  transform: scale(1.08);
`;

const SlideOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    rgba(93, 78, 55, 0.55) 8%,
    rgba(190, 149, 85, 0.45) 48%,
    rgba(73, 60, 42, 0.65) 100%
  );
`;

const SlideInner = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: clamp(2rem, 5vw, 4.5rem);
  padding: clamp(2.5rem, 7vw, 4.8rem);
  color: white;
  text-shadow: 0 10px 24px rgba(59, 47, 32, 0.45);

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    text-align: center;
    justify-content: center;
    gap: 2rem;
  }
`;

const SlideInfo = styled.div`
  display: grid;
  gap: 1.2rem;
  max-width: 520px;
  text-align: left;

  @media (max-width: 900px) {
    max-width: 100%;
    text-align: center;
  }
`;

const SlideVisual = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    inset: -10% -6% -18% -6%;
    background: radial-gradient(circle at 30% 10%, rgba(255, 255, 255, 0.45), transparent 55%);
    filter: blur(20px);
    opacity: 0.55;
  }
`;

const SlideImage = styled.img`
  position: relative;
  z-index: 1;
  width: clamp(240px, 28vw, 360px);
  height: clamp(220px, 30vw, 420px);
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 0 25px 50px rgba(32, 23, 14, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.3);

  @media (max-width: 900px) {
    width: clamp(220px, 60vw, 320px);
    height: clamp(200px, 58vw, 340px);
  }
`;

const SlideTag = styled.span`
  align-self: flex-start;
  padding: 0.45rem 1.2rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.32);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 600;
`;

const SlideTitle = styled.h1`
  font-size: clamp(2.1rem, 5vw, 3.5rem);
  line-height: 1.1;
  font-weight: 700;
  max-width: 540px;
`;

const SlideText = styled.p`
  font-size: clamp(1rem, 2.2vw, 1.2rem);
  max-width: 540px;
  opacity: 0.92;

  @media (max-width: 900px) {
    max-width: 100%;
    margin: 0 auto;
  }
`;

const SlidePrice = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.75rem 1.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.35);
  font-weight: 600;
  letter-spacing: 0.05em;
`;

const SlideActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;

  @media (max-width: 900px) {
    justify-content: center;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: ${colors.secondary};
  color: white;
  padding: 0.95rem 2.4rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  box-shadow: 0 14px 26px rgba(189, 140, 74, 0.35);
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;

  &:hover {
    background: ${colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 18px 34px rgba(189, 140, 74, 0.45);
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.95rem 2.2rem;
  border-radius: 999px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(93, 78, 55, 0.35);
  backdrop-filter: blur(8px);
  transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.25);
    color: white;
  }
`;

const SliderControls = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  transform: translateY(-50%);
  z-index: 2;
  pointer-events: none;
`;

const SliderButton = styled.button`
  pointer-events: auto;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(93, 78, 55, 0.55);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(210, 180, 140, 0.7);
  }
`;

const SliderDots = styled.div`
  position: absolute;
  left: 50%;
  bottom: 1.75rem;
  display: flex;
  gap: 0.5rem;
  transform: translateX(-50%);
  z-index: 2;
`;

const DotButton = styled.button<{ active: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${({ active }) => (active ? colors.secondary : 'rgba(255, 255, 255, 0.45)')};
  opacity: ${({ active }) => (active ? 1 : 0.7)};
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease, background 0.2s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.12);
  }
`;

const BottomContent = styled.div`
  margin-top: 3rem;
  display: grid;
  gap: 3rem;
`;

const CategorySections = styled.section`
  padding: 3rem 0;
  background: radial-gradient(circle at top, rgba(210, 180, 140, 0.18), transparent 55%), ${colors.surface};
`;

const CategoryGridTitle = styled.h2`
  max-width: 1200px;
  margin: 0 auto 2rem;
  padding: 0 20px;
  font-size: 1.8rem;
  color: ${colors.text};
`;

const CategoryGridSubtitle = styled.p`
  max-width: 1200px;
  margin: -1.2rem auto 2rem;
  padding: 0 20px;
  color: ${colors.textLight};
  font-size: 0.95rem;
`;

const CategoryGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const CategoryGridCard = styled.div`
  background: white;
  border-radius: 16px;
  border: 1px solid ${colors.border};
  box-shadow: 0 16px 32px rgba(210, 180, 140, 0.18);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 36px rgba(210, 180, 140, 0.26);
  }
`;

const CategoryGridImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  cursor: pointer;
`;

const CategoryGridBody = styled.div`
  padding: 1.2rem;
  display: grid;
  gap: 0.6rem;
`;

const CategoryGridMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: ${colors.textLight};
`;

const CategoryGridName = styled.h3`
  margin: 0;
  font-size: 1.05rem;
  color: ${colors.text};
`;

const CategoryGridDescription = styled.p`
  margin: 0;
  font-size: 0.82rem;
  color: ${colors.textLight};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CategoryGridPrice = styled.span`
  font-weight: 600;
  color: ${colors.accent};
  font-size: 0.95rem;
`;

const CategoryGridActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
`;

const CategoryGridButton = styled.button`
  flex: 1;
  background: ${colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.55rem 0.85rem;
  font-weight: 600;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: ${colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const CategoryGridLink = styled(Link)`
  font-size: 0.85rem;
  color: ${colors.primaryDark};
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: ${colors.accent};
  }
`;

const ViewAllButton = styled(Link)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.65rem 1.6rem;
  border-radius: 6px;
  background-color: ${colors.text};
  color: white;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background-color: ${colors.textLight};
    transform: translateY(-2px);
  }
`;

const ViewAllContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const HomePage: React.FC = () => {
  const slides = buildSlides();
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    if (slides.length <= 1) {
      return;
    }
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [currentSlide, slides.length]);

  const goToPreviousSlide = () => {
    if (slides.length === 0) {
      return;
    }
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNextSlide = () => {
    if (slides.length === 0) {
      return;
    }
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const categorySlides = buildCategoryData();

  return (
    <>
      <HeroSection>
        <HeroSlider>
          <SlidesContainer>
            {slides.map((slide, index) => (
              <Slide key={slide.product.id} active={index === currentSlide}>
                <SlideBackground imageUrl={buildImageUrl(slide.product.image)} />
                <SlideOverlay />
                <SlideInner>
                  <SlideInfo>
                    <SlideTag>{slide.tagline}</SlideTag>
                    <SlideTitle>{slide.headline}</SlideTitle>
                    <SlideText>{slide.subheadline}</SlideText>
                    <SlidePrice>{slide.product.price} TL</SlidePrice>
                    <SlideActions>
                      <CTAButton to={slide.ctaLink}>{slide.ctaText}</CTAButton>
                      <SecondaryButton to="/products">Tüm Ürünleri Gör</SecondaryButton>
                    </SlideActions>
                  </SlideInfo>
                  <SlideVisual>
                    <SlideImage
                      src={buildImageUrl(slide.product.image)}
                      alt={slide.product.name}
                      loading="lazy"
                    />
                  </SlideVisual>
                </SlideInner>
              </Slide>
            ))}
          </SlidesContainer>

          {slides.length > 1 && (
            <>
              <SliderControls>
                <SliderButton type="button" onClick={goToPreviousSlide} aria-label="Önceki slayt">
                  {'<'}
                </SliderButton>
                <SliderButton type="button" onClick={goToNextSlide} aria-label="Sonraki slayt">
                  {'>'}
                </SliderButton>
              </SliderControls>

              <SliderDots>
                {slides.map((_, index) => (
                  <DotButton
                    key={index}
                    type="button"
                    active={index === currentSlide}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`${index + 1}. slayta git`}
                  />
                ))}
              </SliderDots>
            </>
          )}
        </HeroSlider>
      </HeroSection>

      <BottomContent>
        {categorySlides.length > 0 && (
          <CategorySections>
            <CategoryGridTitle>Tüm Sandalyeler</CategoryGridTitle>
            <CategoryGridSubtitle>
              Bahçe, dış mekan, yemek, ofis, okey masası ve daha fazlasını tek listede keşfedin.
            </CategoryGridSubtitle>
            <CategoryGrid style={{ justifyItems: 'center' }}>
              {categorySlides.flatMap((category) =>
                category.products.map((product) => (
                  <CategoryGridCard key={`${category.id}-${product.id}`}>
                    <CategoryGridImage
                      src={buildImageUrl(product.image)}
                      alt={product.name}
                      loading="lazy"
                      onClick={() => navigate(`/product/${product.id}`)}
                    />
                    <CategoryGridBody>
                      {/* kategori bilgisini gizledik */}
                      <CategoryGridName>{product.name}</CategoryGridName>
                      <CategoryGridDescription>{product.description}</CategoryGridDescription>
                      <CategoryGridPrice>{product.price} TL</CategoryGridPrice>
                      <CategoryGridActions>
                        <CategoryGridButton onClick={() => navigate(`/product/${product.id}`)}>
                          Ürünü Gör
                        </CategoryGridButton>
                        <CategoryGridButton onClick={() => addToCart(product)}>
                          Sepete Ekle
                        </CategoryGridButton>
                      </CategoryGridActions>
                    </CategoryGridBody>
                  </CategoryGridCard>
                ))
              )}
            </CategoryGrid>
            <ViewAllContainer>
              <ViewAllButton to="/products">
                Tüm Ürünleri Gör
              </ViewAllButton>
            </ViewAllContainer>
          </CategorySections>
        )}

      </BottomContent>
    </>
  );
};

export default HomePage;
