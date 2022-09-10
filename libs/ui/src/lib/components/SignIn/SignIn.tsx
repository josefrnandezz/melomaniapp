import { Button, Card, Col, Row, Space, Typography } from 'antd';
import { signIn } from 'next-auth/client';
import { GoogleOutlined } from '@ant-design/icons';

export const SignIn = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Row
        justify="center"
        style={{
          padding: '24px',
        }}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card
            style={{
              borderRadius: '20px',
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
    </div>
  );
};
