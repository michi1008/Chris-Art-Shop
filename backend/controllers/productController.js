import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const { keyword, pageNumber, category, style, sortBy } = req.query;
  const pageSize = 8;
  const page = Number(pageNumber) || 1;

  // Build query conditions based on query parameters
  const query = {};

  if (keyword) {
    query.name = { $regex: keyword, $options: 'i' };
  }

  if (category) {
    query.category = category;
  }

  if (style) {
    query.style = style;
  }

  // Apply sorting
  let sort = {};
  if (sortBy) {
    if (sortBy === 'nameAZ') {
      sort = { name: 1 }; // Sort by name in ascending order
    } else if (sortBy === 'nameZA') {
      sort = { name: -1 }; // Sort by name in descending order
    }
  }

  const count = await Product.countDocuments(query);
  const products = await Product.find(query)
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort(sort);

  res.status(200).json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  // NOTE: checking for valid ObjectId to prevent CastError moved to separate
  // middleware.

  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  } else {
    // NOTE: this will run if a valid ObjectId but no product was found
    // i.e. product may be null
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    image: '/images/sample.jpg',
    price: 0,
    size: '12x16',
    user: req.user._id,
    desc: 'Sample description',
    category: 'Landscape',
    style: 'Oil on Canvas',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, image, size, price, desc, category, style } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.image = image;
    product.desc = desc;
    product.category = category;
    product.size = size;
    product.price = price;
    product.style = style;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
