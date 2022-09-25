import { Col, Row, Typography } from 'antd';
import Link from 'next/link';

interface SectionProps {
  title: string;
  pushTo: string;
}

export const Section: React.FC<SectionProps> = ({ title, pushTo }) => {
  return (
    <Row>
      <Col flex={22}>
        <Typography.Title level={3}>{title}</Typography.Title>
      </Col>
      <Col flex={2}>
        <Link href={pushTo}>
          <a>Ver todos</a>
        </Link>
      </Col>
    </Row>
  );
};
