import mongoose from 'mongoose';

const deletedPersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  groupIds: [{ type: Number }],
  deletedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('DeletedPerson', deletedPersonSchema);