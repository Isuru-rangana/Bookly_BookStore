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
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

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
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchCategories();
    fetchBooks();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:9004/categores');
      setCategories(response.data);
    } catch (err) {
      setError('Failed to fetch categories');
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:9004/books');
      setBooks(response.data);
    } catch (err) {
      setError('Failed to fetch books');
    }
  };

  const handleOpen = (book = null) => {
    if (book) {
      setEditingBook(book);
      setFormData({
        bookname: book.bookname,
        title: book.title,
        author: book.author,
        price: book.price,
        description: book.description,
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
    setError('');
    setSuccess('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitData = new FormData();
    submitData.append('bookName', formData.bookname);
    submitData.append('title', formData.title);
    submitData.append('author', formData.author);
    submitData.append('price', formData.price);
    submitData.append('description', formData.description);
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
      }
      fetchBooks();
      handleClose();
    } catch (err) {
      setError(err.response?.data || 'Failed to save book');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`http://localhost:9004/books/${id}`);
        setSuccess('Book deleted successfully');
        fetchBooks();
      } catch (err) {
        setError('Failed to delete book');
      }
    }
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
                    {book.image && (
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
                    )}
                  </TableCell>
                  <TableCell>{book.bookname}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>${book.price}</TableCell>
                  <TableCell>{book.category?.cname || 'N/A'}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpen(book)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(book.id)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingBook ? 'Edit Book' : 'Add New Book'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {formData.imagePreview && (
                  <Box
                    component="img"
                    src={formData.imagePreview}
                    alt="Book preview"
                    sx={{
                      width: '100%',
                      maxHeight: 200,
                      objectFit: 'contain',
                      mt: 2,
                      mb: 2,
                    }}
                  />
                )}
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Upload Image
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
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
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category_id"
                    value={formData.category_id}
                    label="Category"
                    onChange={handleChange}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.cname}
                      </MenuItem>
                    ))}
                  </Select>
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
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingBook ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
};

export default BookManagement; 