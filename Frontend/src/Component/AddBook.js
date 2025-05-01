import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddBook.css"; // We'll create this CSS file for styling

function AddBook() {
    const [bookname, setBookname] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [image, setImage] = useState("");
    
    // Form validation states
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ message: "", type: "" });
    
    // Categories for dropdown
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    
    // Fetch categories
    useEffect(() => {
        async function fetchCategories() {
            try {
                const response = await axios.get("http://localhost:9004/categores");
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        }
        
        async function fetchSubcategories() {
            try {
                const response = await axios.get("http://localhost:9004/subcategores");
                setSubcategories(response.data);
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        }
        
        fetchCategories();
        fetchSubcategories();
    }, []);

    // Handle field change and validation
    const handleChange = (e) => {
        const { id, value } = e.target;
        
        // Update state based on field
        switch(id) {
            case "bookname": setBookname(value); break;
            case "title": setTitle(value); break;
            case "author": setAuthor(value); break;
            case "price": setPrice(value); break;
            case "description": setDescription(value); break;
            case "category": setCategory(value); break;
            case "subcategory": setSubcategory(value); break;
            default: break;
        }
        
        // Mark field as touched
        setTouched({ ...touched, [id]: true });
        
        // Validate field
        validateField(id, value);
    };
    
    // Handle field blur for validation
    const handleBlur = (e) => {
        const { id, value } = e.target;
        setTouched({ ...touched, [id]: true });
        validateField(id, value);
    };
    
    // Validate a specific field
    const validateField = (field, value) => {
        let newErrors = { ...errors };
        
        switch(field) {
            case "bookname":
                if (!value.trim()) {
                    newErrors.bookname = "Book name is required";
                } else if (value.trim().length < 2) {
                    newErrors.bookname = "Book name must be at least 2 characters";
                } else if (value.trim().length > 100) {
                    newErrors.bookname = "Book name cannot exceed 100 characters";
                } else {
                    delete newErrors.bookname;
                }
                break;
                
            case "title":
                if (!value.trim()) {
                    newErrors.title = "Title is required";
                } else if (value.trim().length < 2) {
                    newErrors.title = "Title must be at least 2 characters";
                } else if (value.trim().length > 100) {
                    newErrors.title = "Title cannot exceed 100 characters";
                } else {
                    delete newErrors.title;
                }
                break;
                
            case "author":
                if (!value.trim()) {
                    newErrors.author = "Author is required";
                } else if (value.trim().length < 2) {
                    newErrors.author = "Author name must be at least 2 characters";
                } else {
                    delete newErrors.author;
                }
                break;
                
            case "price":
                if (!value) {
                    newErrors.price = "Price is required";
                } else if (isNaN(value) || parseFloat(value) <= 0) {
                    newErrors.price = "Price must be a positive number";
                } else if (parseFloat(value) > 10000) {
                    newErrors.price = "Price cannot exceed 10,000";
                } else {
                    delete newErrors.price;
                }
                break;
                
            case "description":
                if (!value.trim()) {
                    newErrors.description = "Description is required";
                } else if (value.trim().length < 10) {
                    newErrors.description = "Description must be at least 10 characters";
                } else if (value.trim().length > 1000) {
                    newErrors.description = "Description cannot exceed 1000 characters";
                } else {
                    delete newErrors.description;
                }
                break;
                
            case "category":
                if (!value.trim()) {
                    newErrors.category = "Category is required";
                } else {
                    delete newErrors.category;
                }
                break;
                
            case "subcategory":
                // Subcategory could be optional
                if (value.trim() && value.trim().length < 2) {
                    newErrors.subcategory = "Subcategory must be at least 2 characters";
                } else {
                    delete newErrors.subcategory;
                }
                break;
                
            default:
                break;
        }
        
        setErrors(newErrors);
    };
    
    // Validate all fields
    const validateForm = () => {
        // Mark all fields as touched
        const touchedFields = {
            bookname: true,
            title: true,
            author: true,
            price: true,
            description: true,
            category: true,
            subcategory: true,
            image: true
        };
        setTouched(touchedFields);
        
        // Validate each field
        validateField("bookname", bookname);
        validateField("title", title);
        validateField("author", author);
        validateField("price", price);
        validateField("description", description);
        validateField("category", category);
        validateField("subcategory", subcategory);
        
        // Image validation
        let newErrors = { ...errors };
        if (!image) {
            newErrors.image = "Book image is required";
        } else {
            delete newErrors.image;
        }
        setErrors(newErrors);
        
        // Return true if no errors
        return Object.keys(newErrors).length === 0;
    };

    function convertToBase64(e) {
        const file = e.target.files[0];
        
        // Validate file type
        if (file) {
            const fileType = file.type;
            if (!fileType.match(/image\/(jpeg|jpg|png|gif)/)) {
                setErrors({...errors, image: "Only image files (JPEG, PNG, GIF) are allowed"});
                setImage("");
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setErrors({...errors, image: "Image size cannot exceed 5MB"});
                setImage("");
                return;
            }
            
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log("Image loaded successfully");
                setImage(reader.result);
                // Clear error if exists
                if (errors.image) {
                    const newErrors = {...errors};
                    delete newErrors.image;
                    setErrors(newErrors);
                }
            };
            reader.onerror = (error) => {
                console.log("Error: ", error);
                setErrors({...errors, image: "Failed to load image"});
            };
        }
        
        // Mark as touched
        setTouched({...touched, image: true});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Validate all fields
        const isValid = validateForm();
        
        if (!isValid) {
            setSubmitStatus({
                message: "Please fix the errors in the form before submitting.",
                type: "error"
            });
            setIsSubmitting(false);
            return;
        }
        
        // Prepare book data
        const newBook = {
            bookname,
            title,
            author,
            price: parseFloat(price),
            description,
            category,
            subcategory,
            image
        };

        try {
            await axios.post("http://localhost:9004/books", newBook);
            setSubmitStatus({
                message: "Book added successfully!",
                type: "success"
            });
            
            // Reset form after successful submission
            setBookname("");
            setTitle("");
            setAuthor("");
            setPrice("");
            setDescription("");
            setCategory("");
            setSubcategory("");
            setImage("");
            setTouched({});
        } catch (error) {
            console.error("Error adding book:", error);
            setSubmitStatus({
                message: error.response?.data || "Failed to add book. Please try again.",
                type: "error"
            });
        }
        
        setIsSubmitting(false);
    };

    return (
        <div className="container book-form-container">
            <h2 className="mb-4 text-center">Add New Book</h2>
            
            {submitStatus.message && (
                <div className={`alert ${submitStatus.type === "success" ? "alert-success" : "alert-danger"}`}>
                    {submitStatus.message}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="bookname" className="form-label">
                        Book Name <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className={`form-control ${touched.bookname && errors.bookname ? "is-invalid" : ""}`}
                        id="bookname"
                        value={bookname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.bookname && errors.bookname && (
                        <div className="invalid-feedback">{errors.bookname}</div>
                    )}
                </div>
                
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className={`form-control ${touched.title && errors.title ? "is-invalid" : ""}`}
                        id="title"
                        value={title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.title && errors.title && (
                        <div className="invalid-feedback">{errors.title}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="author" className="form-label">
                        Author <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className={`form-control ${touched.author && errors.author ? "is-invalid" : ""}`}
                        id="author"
                        value={author}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.author && errors.author && (
                        <div className="invalid-feedback">{errors.author}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        Price <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                            type="number"
                            step="0.01"
                            className={`form-control ${touched.price && errors.price ? "is-invalid" : ""}`}
                            id="price"
                            value={price}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {touched.price && errors.price && (
                            <div className="invalid-feedback">{errors.price}</div>
                        )}
                    </div>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                        className={`form-control ${touched.description && errors.description ? "is-invalid" : ""}`}
                        id="description"
                        rows="3"
                        value={description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {touched.description && errors.description && (
                        <div className="invalid-feedback">{errors.description}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                        Category <span className="text-danger">*</span>
                    </label>
                    <select
                        className={`form-select ${touched.category && errors.category ? "is-invalid" : ""}`}
                        id="category"
                        value={category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.cname}>
                                {cat.cname}
                            </option>
                        ))}
                    </select>
                    {touched.category && errors.category && (
                        <div className="invalid-feedback">{errors.category}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="subcategory" className="form-label">
                        Sub Category
                    </label>
                    <select
                        className={`form-select ${touched.subcategory && errors.subcategory ? "is-invalid" : ""}`}
                        id="subcategory"
                        value={subcategory}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <option value="">Select a subcategory</option>
                        {subcategories.map((subcat) => (
                            <option key={subcat.id} value={subcat.cname}>
                                {subcat.cname}
                            </option>
                        ))}
                    </select>
                    {touched.subcategory && errors.subcategory && (
                        <div className="invalid-feedback">{errors.subcategory}</div>
                    )}
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Book Cover Image <span className="text-danger">*</span>
                    </label>
                    <input
                        type="file" 
                        className={`form-control ${touched.image && errors.image ? "is-invalid" : ""}`}
                        id="image" 
                        onChange={convertToBase64}
                        accept="image/jpeg, image/png, image/gif, image/jpg"
                    />
                    {touched.image && errors.image && (
                        <div className="invalid-feedback">{errors.image}</div>
                    )}
                    {image && (
                        <div className="mt-2">
                            <p>Preview:</p>
                            <img src={image} alt="Book cover preview" className="img-thumbnail" style={{ maxHeight: "200px" }} />
                        </div>
                    )}
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button type="button" className="btn btn-secondary me-md-2" onClick={() => window.history.back()}>
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Adding Book..." : "Add Book"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddBook;
