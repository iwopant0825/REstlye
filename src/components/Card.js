import React, { useState } from "react";
import styled from "styled-components";

const CardContainer = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(10px);
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing[5]};
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
`;

const CardNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary[500]};
`;

const CardBadge = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const CardTitle = styled.h3`
  margin-top: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const CardDescription = styled.p`
  margin-top: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

// Product Card 컴포넌트
const ProductCardContainer = styled(CardContainer)`
  &:hover {
    .product-button {
      background: ${({ theme }) => theme.colors.primary[50]};
    }
  }
`;

const ProductImage = styled.div`
  aspect-ratio: 1;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary[200]} 0%,
    ${({ theme }) => theme.colors.primary[400]} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  overflow: hidden;

  svg {
    opacity: 0.7;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const ProductBadges = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const ProductBadge = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ProductInfo = styled.div`
  margin-top: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ProductFooter = styled.div`
  margin-top: ${({ theme }) => theme.spacing[2]};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProductPrice = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ProductButton = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[100]};
  }
`;

// Designer Card 컴포넌트
const DesignerAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary[300]} 0%,
    ${({ theme }) => theme.colors.primary[500]} 100%
  );
`;

const DesignerInfo = styled.div`
  margin-left: ${({ theme }) => theme.spacing[3]};
`;

const DesignerName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const DesignerTags = styled.div`
  margin-top: ${({ theme }) => theme.spacing[1]};
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const DesignerTag = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// 로열티/대시보드 표시 제거 (요청)

// 기본 Card 컴포넌트
export const Card = ({ number, badge, title, description, children }) => {
  return (
    <CardContainer>
      <CardContent>
        <CardHeader>
          {number && <CardNumber>{String(number).padStart(2, "0")}</CardNumber>}
          {badge && <CardBadge>{badge}</CardBadge>}
        </CardHeader>
        {title && <CardTitle>{title}</CardTitle>}
        {description && <CardDescription>{description}</CardDescription>}
        {children}
      </CardContent>
    </CardContainer>
  );
};

// Product Card 컴포넌트
export const ProductCard = ({ product, onSelect }) => {
  const [imageError, setImageError] = useState(false);
  const SketchIcon = () => (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <rect
        x="8"
        y="18"
        width="56"
        height="36"
        rx="6"
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <path
        d="M14 18 L14 10 L58 10 L58 18"
        fill="none"
        stroke="#14b8a6"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
    </svg>
  );

  return (
    <ProductCardContainer>
      <CardContent>
        <ProductImage>
          {product.img && !imageError ? (
            <img
              src={product.img}
              alt={product.name}
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
            />
          ) : (
            <SketchIcon />
          )}
        </ProductImage>
        <ProductBadges>
          {product.badges.map((badge, index) => (
            <ProductBadge key={index}>{badge}</ProductBadge>
          ))}
        </ProductBadges>
        <CardTitle>{product.name}</CardTitle>
        <ProductInfo>유형: {product.type}</ProductInfo>
        <ProductFooter>
          <ProductPrice>₩{product.price.toLocaleString()}</ProductPrice>
          <ProductButton
            className="product-button"
            onClick={() => onSelect(product)}
          >
            디자이너 선택
          </ProductButton>
        </ProductFooter>
      </CardContent>
    </ProductCardContainer>
  );
};

// Designer Card 컴포넌트
export const DesignerCard = ({ designer }) => {
  return (
    <CardContainer>
      <CardContent>
        <CardHeader>
          <DesignerAvatar />
          <DesignerInfo>
            <DesignerName>{designer.name}</DesignerName>
            <DesignerTags>
              {designer.tags.map((tag, index) => (
                <DesignerTag key={index}>{tag}</DesignerTag>
              ))}
            </DesignerTags>
          </DesignerInfo>
        </CardHeader>
        <CardDescription>{designer.bio}</CardDescription>
        <DesignerFooter>
          <DesignerFeature>로열티 10–15%</DesignerFeature>
          <DesignerFeature>대시보드</DesignerFeature>
        </DesignerFooter>
      </CardContent>
    </CardContainer>
  );
};

export default Card;
