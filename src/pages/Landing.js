import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { Card, ProductCard, DesignerCard } from "../components/Card";
import Reveal from "../components/Reveal";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import { FaInstagram } from "react-icons/fa";

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing[12]} 0
    ${({ theme }) => theme.spacing[16]};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spacing[16]} 0
      ${({ theme }) => theme.spacing[20]};
  }
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    padding: 0 ${({ theme }) => theme.spacing[6]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.spacing[8]};
  }
`;

const SectionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
  flex-wrap: wrap;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes["2xl"]};
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.textPrimary};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.fontSizes["3xl"]};
  }
`;

const SectionLink = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary[500]};
  transition: all 0.2s ease;

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.primary[400]};
  }
`;

// FlowDescription removed as per request

const FilterContainer = styled.div`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
  }
`;

const FilterButton = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.primary[400] : theme.colors.border};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary[100] : theme.colors.surface};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary[400]};
    background: ${({ theme }) => theme.colors.primary[100]};
  }
`;

const MobileFilter = styled.select`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`;

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[5]};
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing[4]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProcessGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[5]};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const SocialCTA = styled.div`
  margin-top: ${({ theme }) => theme.spacing[8]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
`;

const InstagramButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[5]};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[100]};
    border-color: ${({ theme }) => theme.colors.primary[400]};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  svg {
    width: 1rem;
    height: 1rem;
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

const SocialNote = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  a {
    color: ${({ theme }) => theme.colors.primary[400]};
  }
`;

const DesignerGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing[5]};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ProductNote = styled.p`
  margin-top: ${({ theme }) => theme.spacing[5]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};

  b {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const ApplyForm = styled.form`
  margin-top: ${({ theme }) => theme.spacing[6]};
  display: grid;
  gap: ${({ theme }) => theme.spacing[4]};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormGroup = styled.div`
  &.full-width {
    @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
      grid-column: span 2;
    }
  }
`;

const FormLabel = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

const FormInput = styled.input`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.textPrimary};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[400]};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 3px rgba(18, 184, 134, 0.15);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing[3]};
  color: ${({ theme }) => theme.colors.textPrimary};
  resize: vertical;
  min-height: 120px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary[400]};
    background: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 3px rgba(18, 184, 134, 0.15);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[3]};
  flex-wrap: wrap;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: span 2;
  }
`;

const FormNote = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray[500]};
  flex: 1;
`;

const SubmitButton = styled.button`
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: ${({ theme }) => theme.colors.primary[600]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[5]};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary[500]};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const Landing = () => {
  const [activeFilter, setActiveFilter] = useState("전체");
  const [openProduct, setOpenProduct] = useState(null);
  const [selectedDesigner, setSelectedDesigner] = useState("");

  const nav = [
    { label: "활동", href: "#activities" },
    { label: "제품", href: "#products" },
    { label: "디자이너", href: "#designers" },
    { label: "지원", href: "#apply" },
  ];

  const products = [
    {
      id: 1,
      name: "후드티 (스케치 A)",
      type: "후드티",
      price: 29000,
      img: "/img.jpg",
      badges: ["후드티", "스케치"],
      sku: "HOODIE-A",
    },
    {
      id: 2,
      name: "후드티 (스케치 B)",
      type: "후드티",
      price: 19000,
      img: "/img.jpg",
      badges: ["후드티", "프론트"],
      sku: "HOODIE-B",
    },
    {
      id: 3,
      name: "후드티 (스케치 C)",
      type: "후드티",
      price: 9000,
      img: "/img.jpg",
      badges: ["후드티", "백"],
      sku: "HOODIE-C",
    },
    {
      id: 4,
      name: "후드티 (스케치 D)",
      type: "후드티",
      price: 15000,
      img: "/img.jpg",
      badges: ["후드티", "디테일"],
      sku: "HOODIE-D",
    },
  ];

  const filters = ["전체", "후드티"];

  const steps = [
    {
      title: "수거",
      desc: "의류 수거함, 파트너 제휴를 통해 폐의류를 모으고 기록한다.",
    },
    {
      title: "분류·가공",
      desc: "수거된 의류를 위생·상태 기준으로 분류하고 재활용 가능한 원단으로 가공한다.",
    },
    {
      title: "디자인 큐레이션",
      desc: "무명 디자이너가 원단을 조합해 제품 디자인을 정의하고 제작 과정에 참여한다.",
    },
    {
      title: "제작·봉제",
      desc: "산업용 재단·봉제 시스템으로 디자이너 큐레이션에 맞춰 제품을 대량 생산한다.",
    },
    {
      title: "검사·태깅",
      desc: "품질을 확인하고 QR/RFID로 원산지와 임팩트 데이터를 기록한다.",
    },
    {
      title: "배송·공개",
      desc: "소비자에게 랜덤 발송하며 제작 과정과 ESG 데이터를 투명하게 공개한다.",
    },
  ];

  const designers = [
    {
      name: "ARU Studio",
      tags: ["패치워크", "컬러블록"],
      bio: "대비와 원단결을 실험하는 텍스타일 기반 스튜디오.",
    },
    {
      name: "moss&mint",
      tags: ["데님", "리페어"],
      bio: "가시적 수선 미학으로 데님의 서사를 복원.",
    },
    {
      name: "line&grain",
      tags: ["미니멀", "모노크롬"],
      bio: "텍스처 미세차를 살린 모노 유틸리티.",
    },
  ];

  const designerWorks = {
    "ARU Studio": ["패치워크 대면적", "강조 스티치", "컬러 대비"],
    "moss&mint": ["블루 데님", "리페어 패턴", "빈티지 워싱"],
    "line&grain": ["모노톤", "심플 컷", "은은한 텍스처"],
  };

  const ledgerData = [
    {
      b: "#27",
      i: 240,
      m: "데님 60 / 코튼 40",
      d: "128kg",
      c: "~290kg",
      s: "배송 중",
    },
    {
      b: "#26",
      i: 180,
      m: "캔버스 70 / 혼합 30",
      d: "103kg",
      c: "~230kg",
      s: "공개 완료",
    },
    {
      b: "#25",
      i: 210,
      m: "폴리 50 / 코튼 50",
      d: "117kg",
      c: "~260kg",
      s: "공개 완료",
    },
  ];

  const visibleProducts = products.filter(
    (p) => activeFilter === "전체" || p.type === activeFilter
  );

  const openDetail = (product) => {
    setSelectedDesigner(designers[0]?.name || "");
    setOpenProduct(product);
  };

  const closeDetail = () => setOpenProduct(null);

  return (
    <PageContainer>
      <Header />
      <Hero />

      {/* Activities / Transparency */}
      <Section id="activities">
        <Container>
          <SectionHeader>
            <Reveal as={SectionTitle}>활동 — 그린워싱 없이 공개합니다</Reveal>
          </SectionHeader>

          <ProcessGrid>
            {steps.map((step, index) => (
              <Reveal key={index} delay={index * 60}>
                <Card
                  number={index + 1}
                  badge={step.kpi}
                  title={step.title}
                  description={step.desc}
                />
              </Reveal>
            ))}
          </ProcessGrid>

          <SocialCTA>
            <Reveal>
              <InstagramButton
                href="https://instagram.com/REstyle1_official"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram 팔로우하기"
              >
                <FaInstagram />
                <span>Instagram 방문하기</span>
              </InstagramButton>
            </Reveal>
            <SocialNote>
              <a
                href="https://instagram.com/REstyle1_official"
                target="_blank"
                rel="noopener noreferrer"
              >
                @REstyle1_official
              </a>
              에서 더 많은 활동들을 확인하세요!
            </SocialNote>
          </SocialCTA>

          {/* Transparency ledger removed as requested */}
        </Container>
      </Section>

      {/* Products */}
      <Section id="products">
        <Container>
          <SectionHeader>
            <Reveal as={SectionTitle}>제품 — 스케치 선택형</Reveal>
            <FilterContainer>
              {filters.map((filter) => (
                <FilterButton
                  key={filter}
                  $active={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </FilterButton>
              ))}
            </FilterContainer>
          </SectionHeader>

          <MobileFilter
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          >
            {filters.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </MobileFilter>

          <Grid>
            {visibleProducts.map((product, i) => (
              <Reveal key={product.id} delay={i * 40}>
                <ProductCard product={product} onSelect={openDetail} />
              </Reveal>
            ))}
          </Grid>

          <ProductNote>
            모든 이미지는 <b>후드티</b> 스케치 예시이며, 실제 완성품은 디자이너
            큐레이션에 따라 달라질 수 있습니다.
          </ProductNote>
        </Container>
      </Section>

      {/* Designers */}
      <Section id="designers">
        <Container>
          <SectionHeader>
            <Reveal as={SectionTitle}>디자이너 — 독립·공정 보상</Reveal>
            <Reveal as={SectionLink} href="#apply">
              디자이너 지원 →
            </Reveal>
          </SectionHeader>

          <DesignerGrid>
            {designers.map((designer, i) => (
              <Reveal key={designer.name} delay={i * 60}>
                <DesignerCard designer={designer} />
              </Reveal>
            ))}
          </DesignerGrid>
        </Container>
      </Section>

      {/* Apply as a Designer */}
      <Section id="apply">
        <Container>
          <Reveal>
            <Card
              title="디자이너 지원"
              description="제약을 사랑하는 독립 디자이너를 찾습니다. 공정한 로열티, 배치 투명성, 실질적 임팩트를 제공합니다."
            >
              <ApplyForm>
                <FormGroup>
                  <FormLabel>이름</FormLabel>
                  <FormInput placeholder="성함" />
                </FormGroup>
                <FormGroup>
                  <FormLabel>이메일</FormLabel>
                  <FormInput type="email" placeholder="you@example.com" />
                </FormGroup>
                <FormGroup className="full-width">
                  <FormLabel>포트폴리오 URL</FormLabel>
                  <FormInput placeholder="https://…" />
                </FormGroup>
                <FormGroup className="full-width">
                  <FormLabel>소개/메모</FormLabel>
                  <FormTextarea placeholder="업사이클링 접근법, 선호 제약, 일반 산출물 등을 알려주세요." />
                </FormGroup>
                <FormFooter>
                  <FormNote>
                    지원 시 공정노동·투명성 정책에 동의한 것으로 간주됩니다.
                  </FormNote>
                  <SubmitButton type="button">제출</SubmitButton>
                </FormFooter>
              </ApplyForm>
            </Card>
          </Reveal>
        </Container>
      </Section>

      <Footer />

      {/* Product Detail Modal */}
      {openProduct && (
        <Modal
          isOpen={!!openProduct}
          onClose={closeDetail}
          title={openProduct.name}
          subtitle={`SKU: ${openProduct.sku} · 유형: ${openProduct.type}`}
        >
          {/* Modal content will be implemented based on your original design */}
        </Modal>
      )}
    </PageContainer>
  );
};

export default Landing;
