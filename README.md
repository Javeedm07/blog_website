# Dynamic Blog Platform

A modern, responsive blog platform built with Node.js, Express, and EJS templating engine. Features dynamic search, category filtering, and image upload capabilities.

## 🚀 Features

- **Dynamic Search**: Real-time search functionality across blog titles, content, tags, and authors
- **Category Filtering**: Filter blogs by categories with an intuitive interface
- **Image Upload**: Support for blog post images with automatic storage
- **Responsive Design**: Mobile-first approach ensuring great UX across all devices
- **Tag System**: Organize and filter content using tags
- **Rich Text Content**: Support for formatted blog content
- **Author Attribution**: Track blog authors and their contributions

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **View Engine**: EJS (Embedded JavaScript)
- **Frontend**: HTML5, CSS3, JavaScript
- **Styling**: Bootstrap 5
- **Icons**: Font Awesome
- **Image Upload**: Multer
- **Form Validation**: Express Validator

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## 🔧 Installation

1. Clone the repository:
```bash
https://github.com/Javeedm07/blog_website.git
```

2. Navigate to the project directory:
```bash
cd blog_website
```

3. Install dependencies:
```bash
npm install
```

4. Create required directories:
```bash
mkdir -p public/uploads
```

5. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
dynamic-blog-platform/
├── public/
│   ├── uploads/    # Uploaded images
│   └── styles/     # CSS files
├── views/
│   ├── partials/   # EJS partials
│   ├── add.ejs     # Add blog form
│   ├── edit.ejs    # Edit blog form
│   ├── index.ejs   # Blog listing
│   └── blogDetail.ejs # Single blog view
├── index.js        # Main application file
├── package.json
└── README.md
```

## 💡 Usage

### Adding a New Blog
1. Click the "Add Blog" button in the navigation
2. Fill in the required fields:
   - Title (minimum 5 characters)
   - Author Name
   - Content (minimum 50 characters)
   - Category
   - Tags (comma-separated)
   - Image (optional)
3. Click "Submit" to publish

### Searching Blogs
- Use the search bar to dynamically filter blogs
- Results update as you type
- Searches through titles, content, tags, and authors

### Filtering by Category
- Click on category buttons to filter blogs
- Click "All" to reset filters

## 🔒 Validation

The application includes several validation rules:
- Title: Minimum 5 characters
- Content: Minimum 50 characters
- Author Name: Required
- Category: Required
- Tags: At least one tag required
- Images: Only JPG, JPEG, PNG, and GIF formats allowed

## 📝 File Upload Specifications

- Supported formats: JPEG, JPG, PNG, GIF
- Maximum file size: 10MB
- Files are stored in: `public/uploads/`
- Unique filenames are generated automatically

## 🛡️ Security Features

- Input sanitization for XSS prevention
- File type validation for uploads
- Size limits on uploads
- Form validation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details

## 👤 Author

Your Name
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your Name](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [Bootstrap](https://getbootstrap.com/)
- [Font Awesome](https://fontawesome.com/)
- [Unsplash](https://unsplash.com/) (for sample images)
