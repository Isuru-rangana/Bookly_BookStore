import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Alert,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    cname: '',
    cdescription: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:9004/categores');
      setCategories(response.data);
    } catch (err) {
      setError('Failed to fetch categories');
    }
  };

  const handleOpen = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        cname: category.cname,
        cdescription: category.cdescription,
      });
    } else {
      setEditingCategory(null);
      setFormData({ cname: '', cdescription: '' });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCategory(null);
    setFormData({ cname: '', cdescription: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await axios.put(`http://localhost:9004/categores/${editingCategory.id}`, formData);
        setSuccess('Category updated successfully');
      } else {
        await axios.post('http://localhost:9004/categores', formData);
        setSuccess('Category added successfully');
      }
      fetchCategories();
      handleClose();
    } catch (err) {
      setError(err.response?.data || 'Failed to save category');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`http://localhost:9004/categores/${id}`);
        setSuccess('Category deleted successfully');
        fetchCategories();
      } catch (err) {
        setError('Failed to delete category');
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Category Management
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
          sx={{ mb: 3 }}
        >
          Add New Category
        </Button>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.cname}</TableCell>
                  <TableCell>{category.cdescription}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpen(category)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(category.id)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Category Name"
              name="cname"
              value={formData.cname}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Description"
              name="cdescription"
              multiline
              rows={4}
              value={formData.cdescription}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingCategory ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default CategoryManagement; 