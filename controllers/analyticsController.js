import Product from "../models/Product.js";

export const getAnalytics = async (
  req,
  res
) => {
  try {
    const categoryValuation =
      await Product.aggregate([
        {
          $group: {
            _id: "$category",

            totalInventoryValue: {
              $sum: {
                $multiply: [
                  "$price",
                  "$stockQuantity",
                ],
              },
            },
          },
        },

        {
          $project: {
            _id: 0,

            category: "$_id",

            totalInventoryValue: 1,
          },
        },
      ]);

    const lowStockProducts =
      await Product.aggregate([
        {
          $sort: {
            stockQuantity: 1,
          },
        },

        {
          $limit: 10,
        },

        {
          $project: {
            productName: 1,
            stockQuantity: 1,
          },
        },
      ]);

    const totalSKUs =
      await Product.countDocuments();

    const outOfStock =
      await Product.countDocuments({
        stockQuantity: 0,
      });

    res.status(200).json({
      success: true,

      analytics: {
        categoryValuation,

        lowStockProducts,

        totalSKUs,

        outOfStock,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};