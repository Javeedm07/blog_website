import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import path from "path";
import { body, validationResult } from "express-validator";

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

let blogs = [
  {
    title: "Sample Blog",
    authorName: "John Doe",
    content:
      "This is a sample blog post meant to demonstrate the structure of a blog entry in this application. The content could include anything from personal experiences to professional insights, or even a simple tutorial. Blogs like this one provide an excellent opportunity to connect with readers and share valuable information. Remember to keep your audience engaged and offer content that adds value to their day.",
    category: "Technology",
    tags: ["sample", "first post"],
    timestamp: new Date(),
    imageUrl:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?fit=crop&w=1500&q=80",
  },
  {
    title: "Exploring Artificial Intelligence",
    authorName: "Jane Smith",
    content:
      "Artificial Intelligence (AI) is rapidly evolving, influencing industries such as healthcare, education, and finance. From machine learning algorithms that predict consumer behavior to neural networks capable of generating art, AI has endless possibilities. However, with great power comes responsibility. Ethical concerns, like bias in AI systems and data privacy, must be addressed to harness its full potential. This blog dives into the basics of AI, its current applications, and the exciting future it promises for technology enthusiasts.",
    category: "Technology",
    tags: ["AI", "Machine Learning", "Future"],
    timestamp: new Date(),
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?fit=crop&w=1500&q=80",
  },
  {
    title: "The Art of Cooking",
    authorName: "Chef Jamie",
    content:
      "Cooking is more than just a daily chore; it is an art form that brings people together. Whether you're whipping up a quick meal or preparing a gourmet feast, the joy of creating something delicious is unmatched. This blog explores the nuances of cooking, from selecting the freshest ingredients to mastering basic techniques like sautéing and grilling. It also includes tips for experimenting with flavors and creating signature dishes that wow your guests.",
    category: "Lifestyle",
    tags: ["Cooking", "Recipes", "Food"],
    timestamp: new Date(),
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?fit=crop&w=1500&q=80",
  },
  {
    title: "Travel Guide to Paris",
    authorName: "Emily Brown",
    content:
      "Paris, the City of Light, is a dream destination for travelers worldwide. From the iconic Eiffel Tower to the charming streets of Montmartre, every corner of Paris has its unique charm. This blog provides a comprehensive guide to exploring the city, including must-visit landmarks like the Louvre and Notre Dame. It also covers practical travel tips, such as navigating the Metro, enjoying authentic French cuisine, and finding affordable accommodations.",
    category: "Travel",
    tags: ["Paris", "Travel", "France"],
    timestamp: new Date(),
    imageUrl:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?fit=crop&w=1500&q=80",
  },
  {
    title: "Fitness and Well-being",
    authorName: "Laura Green",
    content:
      "Achieving fitness and well-being is not just about hitting the gym; it's about creating a lifestyle that promotes health. This blog highlights the importance of balanced nutrition, regular exercise, and mental health practices like meditation. Readers will also find practical advice on setting realistic fitness goals, staying motivated, and overcoming common obstacles. Whether you're a beginner or a fitness enthusiast, these tips are designed to help you on your journey to a healthier life.",
    category: "Health",
    tags: ["Fitness", "Well-being", "Health"],
    timestamp: new Date(),
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?fit=crop&w=1500&q=80",
  },
  {
    title: "The Rise of Renewable Energy",
    authorName: "Michael Johnson",
    content:
      "As the world grapples with climate change, renewable energy sources like solar, wind, and hydro are becoming increasingly vital. This blog explores the benefits of transitioning to clean energy, including reduced carbon emissions and economic growth. It also addresses the challenges, such as energy storage and infrastructure development. With advancements in technology, renewable energy has the potential to replace fossil fuels and pave the way for a sustainable future.",
    category: "Environment",
    tags: ["Renewable Energy", "Sustainability", "Green Future"],
    timestamp: new Date(),
    imageUrl:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?fit=crop&w=1500&q=80",
  },
  {
    title: "Mastering Personal Finance",
    authorName: "Anna Taylor",
    content:
      "Managing personal finances effectively is key to achieving financial freedom. This blog provides a step-by-step guide to budgeting, saving, and investing. Readers will learn how to track their expenses, set financial goals, and make informed decisions about loans and credit. The blog also covers investment options like stocks, mutual funds, and retirement plans, helping readers secure their future while enjoying the present.",
    category: "Finance",
    tags: ["Personal Finance", "Budgeting", "Investing"],
    timestamp: new Date(),
    imageUrl:
      "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?fit=crop&w=1500&q=80",
  },
];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

const blogValidation = [
  body("title")
    .notEmpty()
    .trim()
    .escape()
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters"),
  body("authorName")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("Author name is required"),
  body("content")
    .notEmpty()
    .isLength({ min: 50 })
    .withMessage("Content must be at least 50 characters"),
  body("category").notEmpty().withMessage("Category is required"),
  body("tags").notEmpty().withMessage("At least one tag is required"),
];

app.get("/", (req, res) => {
  const { search, category } = req.query;
  let filteredBlogs = [...blogs];

  if (search) {
    filteredBlogs = filteredBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.content.toLowerCase().includes(search.toLowerCase()) ||
        blog.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        )
    );
  }

  if (category) {
    filteredBlogs = filteredBlogs.filter((blog) => blog.category === category);
  }

  const categories = [...new Set(blogs.map((blog) => blog.category))];
  res.render("index", {
    blogs: filteredBlogs,
    path: "/",
    categories,
    currentCategory: category,
    searchQuery: search,
  });
});

app.get("/add", (req, res) => {
  const categories = [...new Set(blogs.map((blog) => blog.category))];
  res.render("add", { categories: categories, path: "/add" });
});

app.post(
  "/submit",
  upload.single("image"),
  blogValidation,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("add", {
        errors: errors.array(),
        formData: req.body,
        categories: [...new Set(blogs.map((blog) => blog.category))],
        path: "/add",
      });
    }

    const newBlog = {
      ...req.body,
      tags: req.body.tags.split(",").map((tag) => tag.trim()),
      timestamp: new Date(),
      imageUrl: req.file
        ? `/uploads/${req.file.filename}`
        : "https://placehold.co/400x300/e2e8f0/8496ab?text=No+Image+Found",
    };

    blogs.unshift(newBlog);
    res.redirect("/");
  }
);

app.get("/edit/:index", (req, res) => {
  const index = parseInt(req.params.index);
  const blog = blogs[index];
  const categories = [...new Set(blogs.map((blog) => blog.category))];

  if (!blog) {
    return res.status(404).send("Blog not found");
  }

  res.render("edit", {
    blog,
    index,
    categories,
    path: "/edit",
  });
});

app.post("/edit/:index", upload.single("image"), blogValidation, (req, res) => {
  const index = parseInt(req.params.index);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("edit", {
      errors: errors.array(),
      blog: req.body,
      index,
      categories: [...new Set(blogs.map((blog) => blog.category))],
      path: "/edit",
    });
  }

  if (index >= 0 && index < blogs.length) {
    const updatedBlog = {
      ...blogs[index],
      ...req.body,
      tags: req.body.tags.split(",").map((tag) => tag.trim()),
      imageUrl: req.file
        ? `/uploads/${req.file.filename}`
        : blogs[index].imageUrl,
    };
    blogs[index] = updatedBlog;
    res.redirect("/");
  } else {
    res.status(404).send("Blog not found");
  }
});

app.post("/delete/:index", (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < blogs.length) {
    blogs.splice(index, 1);
    res.redirect("/");
  } else {
    res.status(404).send("Blog not found");
  }
});

app.get("/:index", (req, res) => {
  const index = parseInt(req.params.index);
  const blog = blogs[index];

  if (blog) {
    res.render("blogDetail", {
      blog,
      index,
      path: "/blog",
    });
  } else {
    res.status(404).send("Blog not found");
  }
});

app.listen(port, () => {
  console.log("Listening at port " + port);
});
