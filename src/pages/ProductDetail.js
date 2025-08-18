import React, { useMemo, useState, useEffect } from "react";
import styled from "styled-components";
import { products } from "../data/products";

const Page = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};
`;

const BackLink = styled.a`
  display: inline-block;
  margin: ${({ theme }) => theme.spacing[6]} 0;
  color: ${({ theme }) => theme.colors.primary[500]};
  font-weight: 500;
`;

const TopSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[6]};
  align-items: start;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ProductImage = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  max-width: 560px;
  background: ${({ theme }) => theme.colors.surface};
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const Info = styled.div``;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
`;

const Tagline = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const SpecList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const SizeGrid = styled.div`
  margin-top: ${({ theme }) => theme.spacing[4]};
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const SizeButton = styled.button`
  min-width: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid
    ${({ theme, $active }) => ($active ? theme.colors.primary[400] : theme.colors.border)};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary[100] : theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  font-weight: 600;
`;

const Actions = styled.div`
  margin-top: ${({ theme }) => theme.spacing[6]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

const Quantity = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  button {
    padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
  span {
    min-width: 2.5rem;
    text-align: center;
  }
`;

const CheckoutButton = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.primary[600]};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[5]};
  font-weight: 600;
`;

const DesignersSection = styled.section`
  margin: ${({ theme }) => theme.spacing[16]} 0;
  h2 {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
  }
`;

const DesignersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.spacing[5]};
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const DesignerCard = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const DesignerImage = styled.div`
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.colors.gray[200]};
`;

const DesignerMeta = styled.div`
  padding: ${({ theme }) => theme.spacing[4]};
  display: grid;
  gap: ${({ theme }) => theme.spacing[1]};
`;

const DesignerName = styled.div`
  font-weight: 700;
`;

const DesignerTags = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const DesignerStats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
`;

const SelectButton = styled.button`
  margin: ${({ theme }) => theme.spacing[3]};
  margin-top: auto;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  font-weight: 600;
  transition: background .2s ease;
  &:hover { background: ${({ theme }) => theme.colors.primary[100]}; }
`;

const Pager = styled.div`
  margin-top: ${({ theme }) => theme.spacing[6]};
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const PageButton = styled.button`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

const ProductDetail = () => {
  const hash = window.location.hash; // #product/SKU
  const sku = useMemo(() => hash.replace("#product/", ""), [hash]);
  const product = products.find((p) => p.sku === sku) || products[0];
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [sku]);

  const dummyDesigners = new Array(9).fill(0).map((_, i) => ({
    id: i + 1,
    name: `Designer ${i + 1}`,
    tags: ["패치워크", "모던"].slice(0, (i % 2) + 1),
    stats: { 완성: 12 + i, 평점: (4 + (i % 2)) + "★" },
  }));

  return (
    <Page>
      <Container>
        <BackLink href="#products">← 제품 목록으로</BackLink>

        <TopSection>
          <ProductImage>
            <img src={product.img} alt={product.name} />
          </ProductImage>
          <Info>
            <Title>{product.name} #{product.sku}</Title>
            <Tagline>{product.tagline}</Tagline>
            <SpecList>
              <li>유형: {product.type}</li>
              <li>가로 길이: {product.widthCm}cm</li>
              <li>세로 길이: {product.heightCm}cm</li>
            </SpecList>
            {product.hasSizes && (
              <SizeGrid>
                {product.sizes.map((size) => (
                  <SizeButton
                    key={size}
                    $active={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </SizeButton>
                ))}
              </SizeGrid>
            )}
            <Actions>
              <Quantity>
                <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)}>+</button>
              </Quantity>
              <CheckoutButton>결제하러 가기</CheckoutButton>
            </Actions>
          </Info>
        </TopSection>

        <DesignersSection>
          <h2>디자이너 선택</h2>
          <DesignersGrid>
            {dummyDesigners.map((d) => (
              <DesignerCard key={d.id}>
                <DesignerImage />
                <DesignerMeta>
                  <DesignerName>{d.name}</DesignerName>
                  <DesignerTags>{d.tags.join(" · ")}</DesignerTags>
                  <DesignerStats>
                    <span>완성 {d.stats.완성}</span>
                  </DesignerStats>
                </DesignerMeta>
              </DesignerCard>
            ))}
          </DesignersGrid>
          <Pager>
            {Array.from({ length: 11 }, (_, i) => (
              <PageButton key={i + 1}>{i + 1}</PageButton>
            ))}
          </Pager>
        </DesignersSection>
      </Container>
    </Page>
  );
};

export default ProductDetail;


