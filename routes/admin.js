const { Router } = require("express");
const router = Router();
const fileMiddleware = require("../middleware/fileMiddleware");
const Category = require("../models/Category");
const toDelete = require("../middleware/toDelete");
const mongoose = require("mongoose");
const adminController = require("../controller/adminController");
const auth = require("../middleware/auth");
const Admin = require("../models/Admin");

router.get("/", auth, async (req, res) => {
  const admin = req.session.admin;
  console.log(admin);
  res.render("admin/index", {
    title: "Admin panel",
    layout: "admin",
    admin,
  });
});

// ===================== categories router
router.get("/categories", auth, adminController.getCategories);

router.get("/categories/add", (req, res) => {
  res.render("admin/addCategories", {
    title: "Admin add categories",
    layout: "admin",
  });
});

router.get("/categories/:id", async (req, res) => {
  const { title } = await Category.findById(req.params.id);
  let products = await Category.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
    },
    {
      $lookup: {
        // uladik producni category ga
        from: "products",
        localField: "_id",
        foreignField: "categoryId",
        as: "products",
      },
    },
    {
      $unwind: {
        path: "$products",
      },
    },
    {
      $group: {
        _id: {
          _id: "$_id",
        },
        products: {
          $push: "$products",
        },
      },
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        img: "$_id.img",
        price: "$_id.price",
        products: "$products",
      },
    },
  ]);

  if (products.length) {
    products = products[0].products;
  } else {
    products = "";
  }

  // res.send(products)

  res.render("admin/category", {
    title: title,
    layout: "admin",
    products,
  });
});

router.post(
  "/categories/add",
  fileMiddleware.single("icon"),
  adminController.createCategory
);

router.get("/category/edit/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.render("admin/editCategory", {
    title: "Edit Category",
    category,
    layout: "admin",
  });
});

router.post(
  "/categories/edit/:id",
  fileMiddleware.single("icon"),
  async (req, res) => {
    const { icon } = await Category.findById(req.params.id);
    const admin = req.body;

    if (req.file) {
      admin.icon = req.file.filename;
      toDelete(icon);
    } else {
      admin.icon = icon;
    }
    console.log(admin);
    await Category.findByIdAndUpdate(req.params.id, admin, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/admin/categories");
      }
    });
  }
);

router.get("/category/delete/:id", async (req, res) => {
  const { icon } = await Category.findById(req.params.id);
  toDelete(icon);
  await Category.findByIdAndDelete(req.params.id);
  res.redirect("/admin/categories");
});

// ===================== products router

module.exports = router;
