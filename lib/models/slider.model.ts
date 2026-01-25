import mongoose, { Schema } from 'mongoose';

const SliderSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

SliderSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

if ((mongoose as any).models && (mongoose as any).models.Slider) {
  delete (mongoose as any).models.Slider;
}

const Slider = mongoose.model('Slider', SliderSchema);

export default Slider;
