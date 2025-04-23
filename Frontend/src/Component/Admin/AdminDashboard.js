import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import {
  LibraryBooks,
  Category,
  AddCircle,
  Dashboard,
} from '@mui/icons-material';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const dashboardItems = [
    {
      title: 'Manage Categories',
      description: 'Add, edit, or remove book categories',
      icon: <Category sx={{ fontSize: 40 }} />,
      action: () => navigate('/admin/categories'),
      color: '#4CAF50', // Green
    },
    {
      title: 'Manage Books',
      description: 'Add, edit, or remove books by category',
      icon: <LibraryBooks sx={{ fontSize: 40 }} />,
      action: () => navigate('/admin/books'),
      color: '#2196F3', // Blue
    },
    {
      title: 'Add New Category',
      description: 'Create a new book category',
      icon: <AddCircle sx={{ fontSize: 40 }} />,
      action: () => navigate('/admin/add-category'),
      color: '#FF9800', // Orange
    },
    {
      title: 'Add New Book',
      description: 'Add a new book to the store',
      icon: <AddCircle sx={{ fontSize: 40 }} />,
      action: () => navigate('/admin/add-book'),
      color: '#E91E63', // Pink
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Admin Dashboard
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Welcome back, {user?.username || 'Admin'}!
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {dashboardItems.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                  borderRadius: 2,
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box 
                    sx={{ 
                      mb: 2, 
                      color: item.color,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '80px'
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography gutterBottom variant="h6" component="h2">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={item.action}
                    sx={{
                      bgcolor: item.color,
                      '&:hover': {
                        bgcolor: item.color,
                        filter: 'brightness(0.9)',
                      },
                    }}
                  >
                    Access
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default AdminDashboard; 