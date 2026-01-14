const mongoose = require('mongoose');

const wineSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  year: { type: Number, required: true },
  country: { type: String, required: true, trim: true },
  type: { type: String, required: true, enum: ['red', 'white', 'rose'] },
  description: { type: String, trim: true, default: '' }
}, {
  versionKey: false
});

wineSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret._id;
    return ret;
  }
});

module.exports = mongoose.model('Wine', wineSchema);
