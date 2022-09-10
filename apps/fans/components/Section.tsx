import { Col, Row, Typography } from 'antd';
import Link from 'next/link';

interface SectionProps {
  title: string;
  pushTo: string;
}

export const Section: React.FC<SectionProps> = ({ title, pushTo }) => {
  return (
    <Row>
      <Col span={22}>
        <Typography.Title style={{ textAlign: 'left' }} level={3}>
          {title}
        </Typography.Title>
      </Col>
      <Col span={2}>
        <Link href={pushTo}>
          <a>Ver todos</a>
        </Link>
      </Col>
    </Row>
  );
};
