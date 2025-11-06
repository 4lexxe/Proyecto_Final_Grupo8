import { Container, Typography, Card, CardContent, Button, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Home.css';

function Home() {
  const navigate = useNavigate();

  const cardData = [
    {
      title: 'GAMES',
      description: 'Gestiona tu colección de juegos',
      path: '/games'
    },
    {
      title: 'ATRAPA ESTRELLAS',
      description: 'Juega y atrapa 10 estrellas',
      path: '/gameStar'
    },
    {
      title: 'ABOUT US',
      description: 'Conoce al equipo del Grupo 8',
      path: '/aboutUs'
    }
  ];

  return (
    <Container maxWidth="lg" className="home-container">
      <Box className="home-title-box">
        <Typography variant="h2" className="home-title">
          BIENVENIDO
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {cardData.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card className="home-card">
              <CardContent className="home-card-content">
                <Typography variant="h5" className="home-card-title">
                  {item.title}
                </Typography>
                
                <Typography variant="body2" className="home-card-description">
                  {item.description}
                </Typography>

                <Button
                  onClick={() => navigate(item.path)}
                  className="home-card-button"
                >
                  IR
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home;