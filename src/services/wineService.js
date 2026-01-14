const Wine = require('../models/wine');
const { getNextId } = require('../models/counter');

async function findAll(filters = {}) {
  const query = {};

  if (filters.year) {
    query.year = Number(filters.year);
  }

  if (filters.name) {
    query.name = new RegExp(filters.name, 'i');
  }

  if (filters.type) {
    query.type = filters.type;
  }

  if (filters.country) {
    query.country = filters.country;
  }

  return Wine.find(query).sort({ id: 1 });
}

async function findById(id) {
  return Wine.findOne({ id: Number(id) });
}

async function create(data) {
  const id = await getNextId('wines');
  const wine = new Wine({
    id,
    name: data.name.trim(),
    year: Number(data.year),
    country: data.country.trim(),
    type: data.type,
    description: data.description ? data.description.trim() : ''
  });
  await wine.save();
  return wine;
}

async function update(id, data) {
  const updateData = {};

  if (data.name !== undefined) {
    updateData.name = data.name.trim();
  }
  if (data.year !== undefined) {
    updateData.year = Number(data.year);
  }
  if (data.country !== undefined) {
    updateData.country = data.country.trim();
  }
  if (data.type !== undefined) {
    updateData.type = data.type;
  }
  if (data.description !== undefined) {
    updateData.description = data.description.trim();
  }

  return Wine.findOneAndUpdate(
    { id: Number(id) },
    updateData,
    { new: true }
  );
}

async function remove(id) {
  const result = await Wine.findOneAndDelete({ id: Number(id) });
  return result !== null;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};
