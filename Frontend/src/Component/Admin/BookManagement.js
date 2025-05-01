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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Snackbar,
  CircularProgress,
  FormHelperText,
  Tooltip,
  Chip,
  LinearProgress,
  Divider,
  Card,
  CardContent,
  Stack,
  Backdrop
} from '@mui/material';
import { Edit, Delete, Add, Info, Warning, ErrorOutline, CloudUpload } from '@mui/icons-material';

const BookManagement = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    bookname: '',
    title: '',
    author: '',
    price: '',
    description: '',
    category_id: '',
    image: null,
    imagePreview: '',
  });
  
  // Validation states
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  // UI states
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  
  // Stats
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalCategories: 0,
    avgPrice: 0
  });

  useEffect(() => {
    fetchCategories();
    fetchBooks();
  }, []);
  
  // Calculate statistics when books change
  useEffect(() => {
    if (books.length > 0) {
      const totalBooks = books.length;
      const totalPrice = books.reduce((sum, book) => sum + parseFloat(book.price || 0), 0);
      const avgPrice = totalPrice / totalBooks;
      const categoryCount = new Set(books.map(book => book.category?.id).filter(Boolean)).size;
      
      setStats({
        totalBooks,
        totalCategories: categoryCount,
        avgPrice: avgPrice.toFixed(2)
      });
    }
  }, [books]);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:9004/categores');
      setCategories(response.data);
    } catch (err) {
      handleApiError(err, 'Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBooks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:9004/books');
      setBooks(response.data);
    } catch (err) {
      handleApiError(err, 'Failed to fetch books');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleApiError = (err, defaultMessage) => {
    console.error('API Error:', err);
    const errorMessage = 
      err.response?.data?.message || 
      err.response?.data || 
      err.message || 
      defaultMessage;
    setError(errorMessage);
    setShowError(true);
  };

  const handleOpen = (book = null) => {
    if (book) {
      setEditingBook(book);
      setFormData({
        bookname: book.bookname || '',
        title: book.title || '',
        author: book.author || '',
        price: book.price || '',
        description: book.description || '',
        category_id: book.category?.id || '',
        image: null,
        imagePreview: book.image || '',
      });
    } else {
      setEditingBook(null);
      setFormData({
        bookname: '',
        title: '',
        author: '',
        price: '',
        description: '',
        category_id: '',
        image: null,
        imagePreview: '',
      });
    }
    // Reset validation states
    setErrors({});
    setTouched({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingBook(null);
    setFormData({
      bookname: '',
      title: '',
      author: '',
      price: '',
      description: '',
      category_id: '',
      image: null,
      imagePreview: '',
    });
    setErrors({});
    setTouched({});
    setError('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
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
      case 'bookname':
        if (!value.trim()) {
          newErrors.bookname = 'Book name is required';
        } else if (value.trim().length < 2) {
          newErrors.bookname = 'Book name must be at least 2 characters';
        } else if (value.trim().length > 100) {
          newErrors.bookname = 'Book name cannot exceed 100 characters';
        } else {
          delete newErrors.bookname;
        }
        break;
        
      case 'title':
        if (!value.trim()) {
          newErrors.title = 'Title is required';
        } else if (value.trim().length < 2) {
          newErrors.title = 'Title must be at least 2 characters';
        } else if (value.trim().length > 100) {
          newErrors.title = 'Title cannot exceed 100 characters';
        } else {
          delete newErrors.title;
        }
        break;
        
      case 'author':
        if (!value.trim()) {
          newErrors.author = 'Author is required';
        } else if (value.trim().length < 2) {
          newErrors.author = 'Author name must be at least 2 characters';
        } else if (value.trim().length > 100) {
          newErrors.author = 'Author name cannot exceed 100 characters';
        } else {
          delete newErrors.author;
        }
        break;
        
      case 'price':
        if (!value) {
          newErrors.price = 'Price is required';
        } else if (isNaN(value) || parseFloat(value) < 0) {
          newErrors.price = 'Price must be a positive number';
        } else if (parseFloat(value) > 10000) {
          newErrors.price = 'Price cannot exceed 10,000';
        } else {
          delete newErrors.price;
        }
        break;
        
      case 'description':
        if (!value.trim()) {
          newErrors.description = 'Description is required';
        } else if (value.trim().length < 10) {
          newErrors.description = 'Description must be at least 10 characters';
        } else if (value.trim().length > 1000) {
          newErrors.description = 'Description cannot exceed 1000 characters';
        } else {
          delete newErrors.description;
        }
        break;
        
      case 'category_id':
        if (!value) {
          newErrors.category_id = 'Category is required';
        } else {
          delete newErrors.category_id;
        }
        break;
        
      default:
        break;
    }
    
    setErrors(newErrors);
  };
  
  const validateForm = () => {
    // Validate all fields
    validateField('bookname', formData.bookname);
    validateField('title', formData.title);
    validateField('author', formData.author);
    validateField('price', formData.price);
    validateField('description', formData.description);
    validateField('category_id', formData.category_id);
    
    // Check image
    const newErrors = { ...errors };
    
    // Only require image for new books, not for edits
    if (!editingBook && !formData.image && !formData.imagePreview) {
      newErrors.image = 'Book cover image is required';
    } else {
      delete newErrors.image;
    }
    
    setErrors(newErrors);
    
    // Mark all fields as touched
    setTouched({
      bookname: true,
      title: true,
      author: true,
      price: true,
      description: true,
      category_id: true,
      image: true
    });
    
    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate image file
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    const newErrors = { ...errors };
    
    if (!validTypes.includes(file.type)) {
      newErrors.image = 'Only JPEG, PNG, and GIF images are allowed';
      setErrors(newErrors);
      return;
    }
    
    if (file.size > maxSize) {
      newErrors.image = 'Image size cannot exceed 5MB';
      setErrors(newErrors);
      return;
    }
    
    // Clear any image errors
    delete newErrors.image;
    setErrors(newErrors);
    
    // Set the image in form data
    setFormData(prev => ({
      ...prev,
      image: file,
      imagePreview: URL.createObjectURL(file)
    }));
    
    // Mark as touched
    setTouched({
      ...touched,
      image: true
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      setError('Please fix all validation errors before submitting');
      setShowError(true);
      return;
    }
    
    setIsSubmitting(true);
    
    const submitData = new FormData();
    submitData.append('bookName', formData.bookname.trim());
    submitData.append('title', formData.title.trim());
    submitData.append('author', formData.author.trim());
    submitData.append('price', formData.price);
    submitData.append('description', formData.description.trim());
    if (formData.category_id) {
      submitData.append('category', formData.category_id);
    }
    if (formData.image) {
      submitData.append('image', formData.image);
    }

    try {
      if (editingBook) {
        await axios.put(
          `http://localhost:9004/books/${editingBook.id}`, 
          submitData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setSuccess('Book updated successfully');
        setShowSuccess(true);
      } else {
        await axios.post(
          'http://localhost:9004/books', 
          submitData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setSuccess('Book added successfully');
        setShowSuccess(true);
      }
      fetchBooks();
      handleClose();
    } catch (err) {
      handleApiError(err, 'Failed to save book');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (book) => {
    setConfirmDelete(book);
  };
  
  const confirmDeleteBook = async () => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:9004/books/${confirmDelete.id}`);
      setSuccess('Book deleted successfully');
      setShowSuccess(true);
      fetchBooks();
    } catch (err) {
      handleApiError(err, 'Failed to delete book');
    } finally {
      setIsLoading(false);
      setConfirmDelete(null);
    }
  };
  
  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSuccess(false);
    setShowError(false);
  };

  const filteredBooks = selectedCategory === 'all'
    ? books
    : books.filter(book => book.category?.id === selectedCategory);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Book Management
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" color="primary">{stats.totalBooks}</Typography>
                <Typography variant="subtitle2">Total Books</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" color="primary">{stats.totalCategories}</Typography>
                <Typography variant="subtitle2">Categories Used</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" color="primary">${stats.avgPrice}</Typography>
                <Typography variant="subtitle2">Average Price</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Snackbar 
          open={showSuccess} 
          autoHideDuration={6000} 
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
            {success}
          </Alert>
        </Snackbar>
        
        <Snackbar 
          open={showError} 
          autoHideDuration={6000} 
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpen()}
            >
              Add New Book
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Filter by Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Filter by Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.cname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {isLoading ? (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        ) : filteredBooks.length === 0 ? (
          <Alert severity="info" sx={{ mb: 2 }}>
            No books found. Add your first book!
          </Alert>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell>
                      {book.image ? (
                        <Box
                          component="img"
                          src={book.image}
                          alt={book.title}
                          sx={{
                            width: 50,
                            height: 50,
                            objectFit: 'cover',
                            borderRadius: 1,
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            bgcolor: 'grey.200',
                            borderRadius: 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <ErrorOutline color="action" />
                        </Box>
                      )}
                    </TableCell>
                    <TableCell>{book.bookname}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>
                      <Chip 
                        label={`$${parseFloat(book.price).toFixed(2)}`} 
                        color="primary" 
                        variant="outlined" 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>
                      {book.category?.cname ? (
                        <Chip label={book.category.cname} size="small" />
                      ) : (
                        <Chip label="N/A" size="small" variant="outlined" />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Edit Book">
                        <IconButton onClick={() => handleOpen(book)} color="primary">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Book">
                        <IconButton onClick={() => handleDelete(book)} color="error">
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

        {/* Add/Edit Book Dialog */}
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingBook ? 'Edit Book' : 'Add New Book'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ my: 2, p: 2, border: '1px dashed grey.300', borderRadius: 1, textAlign: 'center' }}>
                  {formData.imagePreview ? (
                    <Box
                      component="img"
                      src={formData.imagePreview}
                      alt="Book preview"
                      sx={{
                        width: '100%',
                        maxHeight: 200,
                        objectFit: 'contain',
                      }}
                    />
                  ) : (
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                      No image selected
                    </Typography>
                  )}
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    startIcon={<CloudUpload />}
                    sx={{ mt: 2 }}
                  >
                    {formData.imagePreview ? 'Change Image' : 'Upload Image'}
                    <input
                      type="file"
                      hidden
                      accept="image/jpeg,image/png,image/gif"
                      onChange={handleImageChange}
                    />
                  </Button>
                  {touched.image && errors.image && (
                    <FormHelperText error>{errors.image}</FormHelperText>
                  )}
                  <FormHelperText>
                    Max size: 5MB. Formats: JPEG, PNG, GIF
                  </FormHelperText>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Book Name"
                  name="bookname"
                  value={formData.bookname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.bookname && !!errors.bookname}
                  helperText={touched.bookname && errors.bookname}
                  disabled={isSubmitting}
                  inputProps={{ maxLength: 100 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                  disabled={isSubmitting}
                  inputProps={{ maxLength: 100 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.author && !!errors.author}
                  helperText={touched.author && errors.author}
                  disabled={isSubmitting}
                  inputProps={{ maxLength: 100 }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                  disabled={isSubmitting}
                  InputProps={{
                    startAdornment: <Typography variant="body1" sx={{ mr: 1 }}>$</Typography>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl 
                  fullWidth 
                  margin="normal" 
                  error={touched.category_id && !!errors.category_id}
                  required
                >
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category_id"
                    value={formData.category_id}
                    label="Category"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  >
                    <MenuItem value="" disabled>
                      <em>Select a category</em>
                    </MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.cname}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.category_id && errors.category_id && (
                    <FormHelperText>{errors.category_id}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && !!errors.description}
                  helperText={
                    (touched.description && errors.description) || 
                    `${formData.description.length}/1000 characters`
                  }
                  disabled={isSubmitting}
                  inputProps={{ maxLength: 1000 }}
                />
              </Grid>
            </Grid>
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
                : editingBook 
                  ? 'Update Book' 
                  : 'Add Book'
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
              Are you sure you want to delete the book "{confirmDelete?.bookname}"?
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 2 }}>
              <Warning color="error" />
              <Typography color="error" variant="body2">
                This action cannot be undone.
              </Typography>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button 
              onClick={confirmDeleteBook} 
              color="error" 
              variant="contained"
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : <Delete />}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Loading Backdrop */}
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Paper>
    </Container>
  );
};

export default BookManagement; 