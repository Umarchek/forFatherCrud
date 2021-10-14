const { Router } = require("express");
const router = Router();
const fileMiddleware = require("../middleware/fileMiddleware");
const Category = require("../models/Category");
const toDelete = require("../middleware/toDelete");
const mongoose = require('mongoose')
router.get("/categories", async (req, res) => {
  const categories = await Category.find();
  res.render("admin/categories", {
    title: "Admin categories",
    layout: "admin",
    categories,
  });
});
router.get("/categories/:id", async (req, res) => {
  const products = await Category.aggregate([
    {
      $match: {
        $id: mongoose.Types.ObjectId(req.params.id),

      }
    },
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'categoryId',
        as: 'products'
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id'
        },
        products: {
          $push: '$products'
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        img: '$_id.img',
        price: '$_id.price',
        products: '$products',
      }
    }
  ])
  res.send(products)
  // res.render("admin/categories", {
  //   title: "Admin categories",
  //   layout: "admin",
  //   categories,
  // });
});

router.get("/categories/add", (req, res) => {
  res.render("admin/addCategories", {
    title: "Admin add categories",
    layout: "admin",
  });
});

router.post(
  "/categories/add",
  fileMiddleware.single("icon"),
  async (req, res) => {
    const { name, description } = await req.body;
    req.file ? (icon = req.file.filename) : (icon = "");
    const category = new Category({
      name,
      description,
      icon,
    });

    await category.save();
    res.redirect("/admin/categories");
  }
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

module.exports = router;
