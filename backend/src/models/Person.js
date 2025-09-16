import mongoose from 'mongoose';

import { v4 as uuidv4 } from 'uuid';

const personSchema = new mongoose.Schema({
  personId: { type: String, default: uuidv4, unique: true },
  name: { type: String, required: true, unique: true },
  email: { type: String },
  phone: { type: String },
  groupIds: [{ type: Number }],
  deleted: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Person', personSchema); 