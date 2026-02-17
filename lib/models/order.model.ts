import mongoose, { Schema } from 'mongoose';

const OrderItemSchema = new Schema({
    bookId: { type: String, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, enum: ["S", "M", "L", "XL", "XXL", "Unique"], required: true },
    color: { type: String, required: true }, // Allow any string for custom colors
    price: { type: Number, required: true }
}, { _id: false });

const OrderSchema = new Schema({
    items: { type: [OrderItemSchema], required: true },
    totalPrice: { type: Number, required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String },
    customerPhone: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, default: 'Card' },
    status: { type: String, enum: ['Préparation', 'Livraison', 'Livré'], default: 'Préparation' },
    createdAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

OrderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

if ((mongoose as any).models && (mongoose as any).models.Order) {
    delete (mongoose as any).models.Order;
}

const Order = mongoose.model('Order', OrderSchema);

export default Order;
