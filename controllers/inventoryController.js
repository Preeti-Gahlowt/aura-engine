import Product from "../models/Product.js";

export const getInventory = async (
  req,
  res
) => {
  try {
    const {
      page = 1,
      limit = 50,
      search = "",
      category,
      sort,
    } = req.query;

    const query = {};

    if (search) {
      query.$text = {
        $search: search,
      };
    }

    if (category) {
      query.category = category;
    }

    const skip =
      (Number(page) - 1) * Number(limit);

    let mongoQuery = Product.find(query);

    if (sort) {
      mongoQuery = mongoQuery.sort(sort);
    }

    const products = await mongoQuery
      .skip(skip)
      .limit(Number(limit))
      .lean();

    const totalRecords =
      await Product.countDocuments(query);

    res.status(200).json({
      success: true,

      data: products,

      pagination: {
        totalRecords,

        totalPages: Math.ceil(
          totalRecords / limit
        ),

        currentPage: Number(page),

        hasNextPage:
          Number(page) * Number(limit) <
          totalRecords,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const createProduct = async (
  req,
  res
) => {
  try {
    const product = await Product.create(
      req.body
    );

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (
  req,
  res
) => {
  try {
    const updatedProduct =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};