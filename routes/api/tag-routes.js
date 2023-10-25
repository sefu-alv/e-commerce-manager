const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

// gets all the tags
router.get("/", async (req, res) => {
  try {
    const tagsWithProducts = await Tag.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });

    res.status(200).json(tagsWithProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets a tag based on the id
router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock", "category_id"],
        },
      ],
    });

    if (!tagData) {
      res.status(404).json({ message: "No category has been selected" });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// creates a new tag 
router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag); 
  } catch (err) {
    res.status(400).json(err); 
  }
});

// updates tag by id
router.put("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }

    const updatedTag = await tag.update(req.body);
    res.status(200).json(updatedTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// deletes tag by id
router.delete("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id);

    if (!tag) {
      res.status(404).json({ message: "Tag not found" });
      return;
    }

    await tag.destroy();
    res.status(204).json(); 
  } catch (err) {
    res.status(500).json(err); 
  }
});

module.exports = router;
