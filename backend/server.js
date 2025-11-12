const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const JWT_SECRET = "frmrefrjj5tj^%*&(&)(U)(IU)(DS)(@#(IDkj";
const PORT = 8000;
// import bcrypt from "bcrypt";
const wishlistRoutes = require("./routes/wishlistRoutes")
const cartRouters = require("./routes/cart")
const orderRoutes = require("./routes/order");
const Order = require('./model/order');
// const { populate } = require("./model/wishlist");

app.use(cors({
  origin  :  ["http://localhost:3000", "https://e-commerce-urlt.vercel.app/"] , 
  credentials : true 
}));
app.use(express.json());

// Routes
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRouters);
app.use("/api/orders", orderRoutes);

// const dbURI = "mongodb://localhost:27017";
const dbURI = "mongodb+srv://softwizzharsh_db_user:81MZ3DfjlVPmOX9d@cluster0.h1usotm.mongodb.net/?appName=Cluster0";

mongoose.connect(dbURI, {
  dbName: "shopping",
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => console.log("Connection done"));

//maincategory schema
var maincategoryschema = mongoose.Schema({
  maincategory: { type: String, required: true },
});
var Maincategory = mongoose.model("Maincategory", maincategoryschema);

app.post("/api/insertmaincategory", async (request, response) => {
  try {
    const maincategory = new Maincategory(request.body);
    await maincategory.save();
    response.json({ success: true, message: "Tag Submitted" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error in form submission" });
  }
});

//fetch all maincategories

app.get("/api/maincategory", async (req, res) => {
  try {
    const maincategory = await Maincategory.find(); // Find all categories in the database
    res.json(maincategory); // Return the categories as JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching tags" });
  }
});
//delete maincategory
app.post("/api/deletemaincategory", async (request, response) => {
  try {
    await Maincategory.deleteOne({ _id: request.body.id });
    response.json({ success: true, message: " deleted" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error in  deleting" });
  }
});

//tag schema
var tagschema = mongoose.Schema({
  tagname: { type: String, required: true },
});
var Tag = mongoose.model("Tag", tagschema);

app.post("/api/inserttag", async (request, response) => {
  try {
    const tag = new Tag(request.body);
    await tag.save();
    response.json({ success: true, message: "Tag Submitted" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error in form submission" });
  }
});

// Endpoint to fetch all categories
app.get("/api/tags", async (req, res) => {
  try {
    const tags = await Tag.find(); // Find all categories in the database
    res.json(tags); // Return the categories as JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching tags" });
  }
});
//delete tags
app.post("/api/deletetags", async (request, response) => {
  try {
    await Tag.deleteOne({ _id: request.body.id });
    response.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error in Blog deleting" });
  }
});
//update tags
app.post("/api/tagupdate", async (request, response) => {
  try {
    await Tag.updateOne({ _id: request.body.id }, request.body);
    response.json({ success: true, message: "tag updated" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error in updating tag" });
  }
});

// display tag by id
app.post("/api/displaytagbyid", async (request, res) => {
  const items = await Tag.find({ _id: request.body.id });

  res.json(items);
});

var categorySchema = mongoose.Schema({
  title: String,
  pic1: String,
  maincategory: { type: mongoose.Schema.Types.ObjectId, ref: "Maincategory" },
});
var Category = mongoose.model("Category", categorySchema);

//insert blogs
app.post("/api/insertcategory", async (request, response) => {
  try {
    const category = new Category(request.body);
    await category.save();
    response.json({ success: true, message: "category submission" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "error in submission" });
  }
});

// Endpoint to fetch all categories
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find().populate("maincategory").exec(); // Find all categories in the database
    res.json(categories); // Return the categories as JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching categories" });
  }
});

app.get("/getCategoryByMainCategory/:id", async (req, res) => {
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);
  const skip = (page - 1) * limit;
  try {
    const categories = await Category.find({ maincategory: req.params.id }); // Find all categories in the database
    const product = await Product.find({ maincategory: req.params.id })
      .skip(skip)
      .limit(limit);
    const count = await Product.countDocuments({ maincategory: req.params.id });
    const totalPage = Math.ceil(count / limit);

    let brand = await Brand.find().populate({
      path: "category",
      match: { maincategory: req.params.id }, // filter category by maincategory
      select: "_id",
    });
    brand = brand.filter((b) => b.category !== null);
    const subCategories = await Subcategory.find({
      maincategory: req.params.id,
    });
    res
      .status(200)
      .json({
        product,
        categories,
        brand,
        subCategories,
        meta: { totalPage, count },
      }); // Return the categories or product JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching categories" });
  }
});


// bysubCategories
app.get("/bysubCategories/:id", async (req, res) => {
     const id =  req.params.id
     try {
       const data =  await  Subcategory.findById(id)
       res.status(200).json({data , isFind : true})
     } catch (error) {
      console.log(error)
      res.status(500).json({msg : "Server Error", isFind : false})
     }
});
// byBrand 
app.get("/bybrand/:id", async (req, res) => {
     const id =  req.params.id
     try {
       const data =  await  Brand.findById(id).populate({
        path : "category", 
        
        populate :{
          path : "maincategory",
          select : "_id"
        },
        select : "maincategory"
       })
       res.status(200).json({data :  data.category , isFind : true})
     } catch (error) {
      console.log(error)
      res.status(500).json({msg : "Server Error", isFind : false})
     }
});

//delete category
app.post("/api/deletecategory", async (request, response) => {
  try {
    await Category.deleteOne({ _id: request.body.id });
    response.json({ success: true, message: " deleted" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error in  deleting" });
  }
});


//update category
app.post("/api/categoryupdate", async (request, response) => {
  try {
    await Category.updateOne({ _id: request.body.id }, request.body);
    response.json({ success: true, message: "Category updated" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error in updating Category" });
  }
});

// display category by id
app.post("/api/displaycategorybyid", async (request, res) => {
  const items = await Category.find({ _id: request.body.id })
    .populate("maincategory")
    .exec();

  res.json(items);
});

var subcategoryschema = mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  subcategoryname: String,
  picture: String,
  maincategory: { type: mongoose.Schema.Types.ObjectId, ref: "Maincategory" },
  gender: String,
});
var Subcategory = mongoose.model("Subcategory", subcategoryschema);

app.post("/api/insertsubcategory", async (request, response) => {
  try {
    const subcategory = new Subcategory(request.body);
    await subcategory.save();
    response.json({ success: true, message: "Subcategory submission" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "error in submission" });
  }
});

// Endpoint to fetch all categories
app.get("/api/subcategories", async (req, res) => {
  try {
    const subcategories = await Subcategory.find()
      .populate("category")
      .populate("maincategory")
      .exec(); // Find all categories in the database
    res.json(subcategories); // Return the categories as JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching subcategories" });
  }
});

app.get("/api/subcategoriesunique", async (req, res) => {
  try {
    const subcategories = await Subcategory.aggregate([
      { $group: { _id: "$subcategoryname", doc: { $first: "$$ROOT" } } },
      { $replaceRoot: { newRoot: "$doc" } },
    ]);
    // const subcategories = await Subcategory.distinct({},'subcategoryname')
    // .populate('maincategory').populate('category').exec(); // Find all categories in the database
    res.json(subcategories); // Return the categories as JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching subcategories" });
  }
});

//delete subcategory
app.post("/api/deletesubcategory", async (request, response) => {
  try {
    await Subcategory.deleteOne({ _id: request.body.id });
    response.json({ success: true, message: " deleted" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error in  deleting" });
  }
});

//update subcategory
app.post("/api/subcategoryupdate", async (request, response) => {
  try {
    await Subcategory.updateOne({ _id: request.body.id }, request.body);
    response.json({ success: true, message: "subcategory updated" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error in updating subcategory" });
  }
});

// display subcategory by id
app.post("/api/displaysubcategorybyid", async (request, res) => {
  const items = await Subcategory.find({ _id: request.body.id })
    .populate("category")
    .populate("maincategory")
    .exec();

  res.json(items);
});

var brandschema = mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  brandname: String,
});

var Brand = mongoose.model("Brand", brandschema);

app.post("/api/insertbrand", async (request, response) => {
  try {
    const brand = new Brand(request.body);
    await brand.save();
    response.json({ success: true, message: "Brand is submitted" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "error in submission" });
  }
});

// Endpoint to fetch all categories
app.get("/api/brands", async (req, res) => {
  try {
    const brands = await Brand.find().populate("category").exec();
    res.json(brands); // Return the categories as JSON
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching categories" });
  }
});

app.post("/api/deletebrands", async (request, response) => {
  try {
    await Brand.deleteOne({ _id: request.body.id });
    response.json({ success: true, message: "Blog deleted" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: "Error in Blog deleting" });
  }
});

var productschema = mongoose.Schema({
  productname: String,

  // Foreign Key References
  maincategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Maincategory",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
  },
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tag",
  },

  // Product Details
  shortdescription: String,
  longdescription: String,
  genericname: String,
  manufacturer: String,
  packer: String,
  size: String,
  mrp: String,
  discount: String,
  itemweight: String,
  netquantity: String,
  itemdimension: String,

  // Product Images
  pic1: String,
  pic2: String,
  pic3: String,
  pic4: String,
});

var Product = mongoose.model("Product", productschema);

app.post("/api/insertproduct", async (request, response) => {
  try {
    const product = new Product(request.body);
    await product.save();
    response
      .status(200)
      .json({ success: true, message: "product is submitted" });
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ success: false, message: "error in submission" });
  }
});

app.get("/api/showProducts", async (req, res) => {
  try {
    const data = await Product.find()
      .populate("maincategory", "maincategory")
      .populate("category", "title")
      .populate("subcategory", "subcategoryname")
      .populate("brand", "brandname")
      .populate("tag", "tagname");

    res.status(200).json({ success: true, message: "all Set", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/api/productDetail/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const data = await Product.findById(_id)
      .populate("maincategory", "maincategory")
      .populate("category", "title")
      .populate("subcategory", "subcategoryname")
      .populate("brand", "brandname")
      .populate("tag", "tagname");

    res.status(200).json({ success: true, message: "all Set", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.post("/api/deleteProduct", async (req, res) => {
  const { _id } = req.body;
  try {
    await Product.deleteOne({ _id });
    const data = await Product.find();
    res.status(200).json({ success: true, message: "all Set", data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.get("/api/getProductById/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const data = await Product.findById(_id);
    if (!data) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

app.put("/api/updateProduct/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Routes
app.post("/api/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "Account created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.get("/api/checkToken", (req, res) => {
  const token = req.query.token; // token from query param

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    const user = await User.findOne({ _id: decoded.id });
    res.json({ success: true, user });
  });
});

app.get("/api/trendingProduct", async (req, res) => {
  try {
    const trendingProduct = await Product.aggregate([
      {
        $lookup: {
          from: "tags",
          localField: "tag",
          foreignField: "_id",
          as: "tags",
        },
      },
      {
        $match: {
          "tags.tagname": "Popular",
        },
      },
    ]);
    res.status(200).json({ trendingProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
});

app.get("/api/newProducts", async (req, res) => {
  try {
    let newProducts = await Product.find().populate({
      path: "tag",
      match: { tagname: "New" },
    });

    newProducts = newProducts.filter((val) => val.tag !== null);

    res.status(200).json({ newProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
});

app.get("/api/latestProducts", async (req, res) => {
  try {
    let newProducts = await Product.find().populate({
      path: "tag",
      match: { tagname: "Latest" },
    });

    newProducts = newProducts.filter((val) => val.tag !== null);

    res.status(200).json({ newProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
});

app.get("/api/featuredProducts", async (req, res) => {
  try {
    let newProducts = await Product.find().populate({
      path: "tag",
      match: { tagname: "Featured" },
    });
    newProducts = newProducts.filter((val) => val.tag !== null);

    res.status(200).json({ newProducts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
});

app.get("/api/similarProduct/:id", async (req, res) => {
  const id = req.params.id;
  try {
    if (id === "undefined")
      return res.status(300).json({ msg: " data not found" });
    const similarProducts = await Product.find({ subcategory: id });
    res.status(200).json(similarProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server Error !" });
  }
});


const couponSchema = new mongoose.Schema({
  couponCode: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  expiryDate: { type: Date, required: true },
});

const Coupon = mongoose.model("Coupon", couponSchema);

// Save coupon
app.post("/api/coupon", async (req, res) => {
  try {
    const coupon = new Coupon(req.body);
    await coupon.save();
    res.status(201).json({ message: "Coupon saved", coupon });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

// Get all coupons (auto delete expired)
app.get("/api/coupon", async (req, res) => {
  try {
    const today = new Date();

    // Delete expired coupons
    await Coupon.deleteMany({ expiryDate: { $lt: today } });

    // Fetch valid coupons
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete coupon
app.delete("/api/coupon/:id", async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: "Coupon deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check Coupon API
app.post("/api/checkCoupon", async (req, res) => {
  
  try {
    const { coupon } = req.body;

    // Find coupon by code
    const foundCoupon = await Coupon.findOne({ couponCode: coupon });
    if (!foundCoupon) {
      return res.status(404).json({ success: false, message: "Invalid coupon" });
    }

    // Check expiry
    const today = new Date();
    if (new Date(foundCoupon.expiryDate) < today) {
      return res.status(400).json({ success: false, message: "Coupon expired" });
    }

    // Valid coupon
    return res.json({
      success: true,
      message: "Coupon applied successfully",
      discountAmount: foundCoupon.amount,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, error: error.message });
  }
});


app.get("/api/products/search",async(req ,res)=>{
   try {
    const { q, category } = req.query; // q = search text, category = category id
    console.log(q,category)
    let filter = {};

    // if category selected
    if (category) {
      filter.subcategory = category;
    }

    // if search query entered
    if (q) {
      filter.$or = [
        { productname: { $regex: q, $options: "i" } },        // search in title
        { shortdescription: { $regex: q, $options: "i" } },  // search in description
      ];
    }
  // console.log(filter)
    const products = await Product.find(filter)
   
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
})


app.get('/api/counts', async (req, res) => {
  try {
    const [ mainCategoryCount,categoryCount,
      subCategoryCount,
      productCount,
      brandCount,
      tagCount,
      orderCount,
      couponCount
    ] = await Promise.all([
      Maincategory.countDocuments(),
      Category.countDocuments(),
      Subcategory.countDocuments(),
      Product.countDocuments(),
      Brand.countDocuments(),
      Tag.countDocuments(),
      Order.countDocuments(),
      Coupon.countDocuments({ isActive: true })
    ]);

    res.json({
      success: true,
      data: {
        mainCategory: mainCategoryCount,
        category: categoryCount,
        subCategory: subCategoryCount,
        product: productCount,
        brand: brandCount,
        tag: tagCount,
        order: orderCount,
        coupon: couponCount
      }
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching counts',
      error: error.message
    });
  }
});



const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  postOn: { type: Date, required: true },
  image: { type: String, required: true }, // store image filename or URL
});

const Blog =  mongoose.model("Blog", blogSchema)

// Add blog route
app.post("/api/blogs", async (req, res) => {
  try {
    const { title, description, postOn , image } = req.body;
    const newBlog = new Blog({ title, description, postOn, image });
    await newBlog.save();
    res.status(201).json({ message: "Blog added successfully", blog: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding blog", error });
  }
});

// READ Blogs
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

// UPDATE Blog
app.put("/api/blogs/:id", async (req, res) => {
  try {
    const { title, description, postOn } = req.body;
    const updateData = { title, description, postOn };

    const updated = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Blog not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating blog", error: err.message });
  }
});

// DELETE Blog
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog", error: err.message });
  }
});

app.get("/api/blog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog details", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

