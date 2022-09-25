import { Button, Card, Col, Row, Space, Typography } from 'antd';
import { signIn } from 'next-auth/client';
import { GoogleOutlined } from '@ant-design/icons';

export const SignIn = () => {
  return (
    <Row justify="space-around" align="middle" style={{ textAlign: 'center' }}>
      <Col xs={24} sm={24} md={12} lg={12} xl={12}>
        <Card
          style={{
            borderRadius: '20px',
            marginBottom: '180px',
            marginTop: '140px',
          }}
        >
          <Typography.Title level={1}>Hey! 👋</Typography.Title>
          <Space direction="vertical">
            <Typography.Title level={3}>
              Bienvenido a Melomaniapp 🚀
            </Typography.Title>
            <Button
              style={{
                margin: 'auto',
              }}
              data-cy="signInbutton"
              icon={<GoogleOutlined />}
              onClick={() => signIn('google', { callbackUrl: '/' })}
            >
              Iniciar sesión con Google
            </Button>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};
