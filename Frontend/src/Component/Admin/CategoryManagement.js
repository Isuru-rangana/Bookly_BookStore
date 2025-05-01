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
  CircularProgress,
  Box,
  FormHelperText,
  Snackbar,
  Grid,
  Tooltip
} from '@mui/material';
import { Edit, Delete, Add, Info } from '@mui/icons-material';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    cname: '',
    cdescription: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  
  // Counts for display
  const [stats, setStats] = useState({
    total: 0,
    withSubcategories: 0,
    inUse: 0
  });

  useEffect(() => {
    fetchCategories();
    fetchCategoryStats();
  }, []);

  const fetchCategoryStats = async () => {
    try {
      // This would be an actual API call to get statistics in a real app
      // For now, we'll simulate it with categories data
      const response = await axios.get('http://localhost:9004/categores');
      const total = response.data.length;
      
      // These would be actual API calls
      // For now, we'll set mock values
      setStats({
        total: total,
        withSubcategories: Math.floor(total * 0.7), // Mock: 70% have subcategories
        inUse: Math.floor(total * 0.8) // Mock: 80% are in use by books
      });
    } catch (err) {
      console.error('Error fetching category stats:', err);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:9004/categores');
      setCategories(response.data);
    } catch (err) {
      setError('Failed to fetch categories: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
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
    setErrors({});
    setTouched({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingCategory(null);
    setFormData({ cname: '', cdescription: '' });
    setErrors({});
    setTouched({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Mark field as touched
    setTouched({
      ...touched,
      [name]: true
    });
    
    // Validate field
    validateField(name, value);
  };
  
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    validateField(name, value);
  };
  
  const validateField = (field, value) => {
    const newErrors = { ...errors };
    
    switch (field) {
      case 'cname':
        if (!value.trim()) {
          newErrors.cname = 'Category name is required';
        } else if (value.trim().length < 2) {
          newErrors.cname = 'Category name must be at least 2 characters';
        } else if (value.trim().length > 50) {
          newErrors.cname = 'Category name cannot exceed 50 characters';
        } else if (!/^[a-zA-Z0-9\s-]+$/.test(value)) {
          newErrors.cname = 'Category name can only contain letters, numbers, spaces and hyphens';
        } else {
          delete newErrors.cname;
        }
        break;
        
      case 'cdescription':
        if (!value.trim()) {
          newErrors.cdescription = 'Description is required';
        } else if (value.trim().length < 5) {
          newErrors.cdescription = 'Description must be at least 5 characters';
        } else if (value.trim().length > 500) {
          newErrors.cdescription = 'Description cannot exceed 500 characters';
        } else {
          delete newErrors.cdescription;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
  };
  
  const validateForm = () => {
    // Mark all fields as touched
    const allTouched = {
      cname: true,
      cdescription: true
    };
    setTouched(allTouched);
    
    // Validate all fields
    validateField('cname', formData.cname);
    validateField('cdescription', formData.cdescription);
    
    // Check if there are any errors after validation
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate before submission
    if (!validateForm()) {
      setError('Please fix the errors in the form before submitting.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      if (editingCategory) {
        await axios.put(`http://localhost:9004/categores/${editingCategory.id}`, formData);
        setSuccess('Category updated successfully');
      } else {
        // Check if category name already exists
        const existingCategory = categories.find(
          cat => cat.cname.toLowerCase() === formData.cname.toLowerCase()
        );
        
        if (existingCategory) {
          setError('A category with this name already exists');
          setIsSubmitting(false);
          return;
        }
        
        await axios.post('http://localhost:9004/categores', formData);
        setSuccess('Category added successfully');
      }
      fetchCategories();
      fetchCategoryStats();
      handleClose();
    } catch (err) {
      setError(err.response?.data || 'Failed to save category. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (category) => {
    setConfirmDelete(category);
  };
  
  const confirmDeleteCategory = async () => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:9004/categores/${confirmDelete.id}`);
      setSuccess('Category deleted successfully');
      fetchCategories();
      fetchCategoryStats();
    } catch (err) {
      if (err.response?.status === 409) {
        setError('Cannot delete this category as it is being used by books or has subcategories');
      } else {
        setError('Failed to delete category: ' + (err.message || 'Unknown error'));
      }
    } finally {
      setLoading(false);
      setConfirmDelete(null);
    }
  };
  
  const closeAlert = () => {
    setError('');
    setSuccess('');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Category Management
        </Typography>
        
        {/* Statistics Section */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={2} sx={{ p: 2, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
              <Typography variant="h6">{stats.total}</Typography>
              <Typography variant="body2">Total Categories</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={2} sx={{ p: 2, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
              <Typography variant="h6">{stats.withSubcategories}</Typography>
              <Typography variant="body2">With Subcategories</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={2} sx={{ p: 2, backgroundColor: '#f5f5f5', textAlign: 'center' }}>
              <Typography variant="h6">{stats.inUse}</Typography>
              <Typography variant="body2">Categories In Use</Typography>
            </Paper>
          </Grid>
        </Grid>
        
        <Snackbar 
          open={!!error || !!success} 
          autoHideDuration={6000} 
          onClose={closeAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={closeAlert} 
            severity={error ? "error" : "success"} 
            sx={{ width: '100%' }}
          >
            {error || success}
          </Alert>
        </Snackbar>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
          sx={{ mb: 3 }}
        >
          Add New Category
        </Button>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        ) : categories.length === 0 ? (
          <Alert severity="info">No categories found. Create your first category!</Alert>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>{category.cname}</TableCell>
                    <TableCell>
                      {category.cdescription.length > 50 
                        ? `${category.cdescription.substring(0, 50)}...` 
                        : category.cdescription}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit Category">
                        <IconButton onClick={() => handleOpen(category)} color="primary">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Category">
                        <IconButton onClick={() => handleDelete(category)} color="error">
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Add/Edit Category Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
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
              onBlur={handleBlur}
              error={touched.cname && !!errors.cname}
              helperText={touched.cname && errors.cname}
              disabled={isSubmitting}
              inputProps={{ maxLength: 50 }}
            />
            <FormHelperText>
              Category name should be concise and descriptive (2-50 characters)
            </FormHelperText>
            
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
              onBlur={handleBlur}
              error={touched.cdescription && !!errors.cdescription}
              helperText={touched.cdescription && errors.cdescription}
              disabled={isSubmitting}
              inputProps={{ maxLength: 500 }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Info fontSize="small" color="info" sx={{ mr: 1 }} />
              <FormHelperText>
                A good description helps users understand what kind of books belong in this category
              </FormHelperText>
            </Box>
            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 2 }}>
              {formData.cdescription.length}/500 characters
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              variant="contained"
              disabled={isSubmitting || Object.keys(errors).length > 0}
              startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            >
              {isSubmitting 
                ? 'Saving...' 
                : editingCategory 
                  ? 'Update Category' 
                  : 'Add Category'
              }
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <Dialog
          open={!!confirmDelete}
          onClose={() => setConfirmDelete(null)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete the category "{confirmDelete?.cname}"?
            </Typography>
            <Typography color="error" sx={{ mt: 2 }}>
              <strong>Warning:</strong> This action cannot be undone. If books are assigned to this category, 
              they may become uncategorized.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmDeleteCategory} 
              color="error" 
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Delete />}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default CategoryManagement; 