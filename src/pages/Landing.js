import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Hero from "../components/Hero";
import { Card, ProductCard, DesignerCard } from "../components/Card";
import Reveal from "../components/Reveal";
import Modal from "../components/Modal";
import Footer from "../components/Footer";

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(
    1200px 600px at 50% -200px,
    rgba(18, 26, 23, 0.9),
    ${({ theme }) => theme.colors.bg}
  );
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

const TransparencyCard = styled.div`
  margin-top: ${({ theme }) => theme.spacing[10]};
  border-radius: ${({ theme }) => theme.borderRadius["2xl"]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  backdrop-filter: blur(10px);
  padding: ${({ theme }) => theme.spacing[6]};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const TransparencyHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[3]};
  margin-bottom: ${({ theme }) => theme.spacing[4]};
`;

const TransparencyTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const TransparencyBadges = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const TransparencyBadge = styled.span`
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Table = styled.div`
  overflow-x: auto;
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

const TableContent = styled.table`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]}
    ${({ theme }) => theme.spacing[2]} 0;
  text-align: left;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]}
    ${({ theme }) => theme.spacing[2]} 0;
  border-top: 1px solid rgba(255, 255, 255, 0.6);
  color: ${({ theme }) => theme.colors.gray[700]};

  &:first-child {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray[900]};
  }
`;

const TableBadge = styled.span`
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing[1]} ${({ theme }) => theme.spacing[2]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const TableNote = styled.p`
  margin-top: ${({ theme }) => theme.spacing[3]};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.gray[500]};
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
      name: "에코 토트 (스케치)",
      type: "가방",
      price: 29000,
      img: "",
      badges: ["업사이클링", "원오브원"],
      sku: "TOTE-SKT",
    },
    {
      id: 2,
      name: "파우치 (스케치)",
      type: "파우치",
      price: 19000,
      img: "",
      badges: ["배치ID", "추적가능"],
      sku: "POUCH-SKT",
    },
    {
      id: 3,
      name: "키링 (스케치)",
      type: "액세서리",
      price: 9000,
      img: "",
      badges: ["오프컷 활용"],
      sku: "KEYRING-SKT",
    },
    {
      id: 4,
      name: "북커버 (스케치)",
      type: "문구",
      price: 15000,
      img: "",
      badges: ["데님", "랜덤 스티치"],
      sku: "BOOKCOVER-SKT",
    },
  ];

  const filters = ["전체", "가방", "파우치", "액세서리", "문구"];

  const steps = [
    {
      title: "수거",
      desc: "파트너 수거함/드라이브로 의류를 수거하고, 수량·섬유를 기록합니다.",
      kpi: "+1.2t/월",
    },
    {
      title: "분류·살균",
      desc: "원단·색·상태 기준으로 자동/수동 분류 후 위생 처리합니다.",
      kpi: ">98% 위생 통과",
    },
    {
      title: "디자인 큐레이션",
      desc: "SKU 스케치에 맞춰 디자이너가 원단 조합·제약을 사전 정의합니다.",
      kpi: "디자이너 14명",
    },
    {
      title: "배치 재단·봉제",
      desc: "배치ID로 추적하며 산업용 재단/봉제를 진행합니다. 오프컷 활용률 >70%.",
      kpi: "Batch #27",
    },
    {
      title: "검수·태깅",
      desc: "내구성 체크 후 QR/RFID로 원산·임팩트 데이터를 태깅합니다.",
      kpi: "반품 0.8%",
    },
    {
      title: "배송·공개",
      desc: "펄프 메일러로 배송하며 배치 레저드를 공개합니다.",
      kpi: "평균 72h",
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
            <Reveal as={SectionLink} href="#ledger">
              배치 레저드 열기 →
            </Reveal>
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

          <Reveal as={TransparencyCard} id="ledger">
            <TransparencyHeader>
              <TransparencyTitle>투명성 레저드</TransparencyTitle>
              <TransparencyBadges>
                <TransparencyBadge>분기: 3분기</TransparencyBadge>
                <TransparencyBadge>감사: 진행 중</TransparencyBadge>
              </TransparencyBadges>
            </TransparencyHeader>
            <Table>
              <TableContent>
                <thead>
                  <tr>
                    <TableHeader>배치</TableHeader>
                    <TableHeader>수량(개)</TableHeader>
                    <TableHeader>소재 믹스</TableHeader>
                    <TableHeader>전환량</TableHeader>
                    <TableHeader>CO₂e 절감</TableHeader>
                    <TableHeader>상태</TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {ledgerData.map((row) => (
                    <tr key={row.b}>
                      <TableCell>{row.b}</TableCell>
                      <TableCell>{row.i}</TableCell>
                      <TableCell>{row.m}</TableCell>
                      <TableCell>{row.d}</TableCell>
                      <TableCell>{row.c}</TableCell>
                      <TableCell>
                        <TableBadge>{row.s}</TableBadge>
                      </TableCell>
                    </tr>
                  ))}
                </tbody>
              </TableContent>
            </Table>
            <TableNote>
              각 제품에는 배치·디자이너·소싱 기록으로 연결되는 QR이 동봉됩니다.
            </TableNote>
          </Reveal>
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
            완성품은 선택한 디자이너의 제약 내에서 <b>랜덤</b>으로
            제작·발송됩니다. 하자 품목에 한해 교환/환불이 가능합니다.
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
