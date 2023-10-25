const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// finds all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [Product],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets each category by their id
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category has been selected' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// creates new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// updates category
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true
    });
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category found!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// deletes category
router.delete('/:id', async (req, res) => {

  try {
    await Product.destroy({
      where: {
        category_id: req.params.id,
      },
    });

    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (categoryData === 0) {

      return res.status(404).json({ message: 'No category found!' });
    }

    res.status(200).json({ message: 'Category and related products deleted successfully.' });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
