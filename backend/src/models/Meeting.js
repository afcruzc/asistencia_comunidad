import mongoose from 'mongoose';

const meetingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  attendance: [{
    personId: { type: String, required: true },
    status: { type: String, required: true },
    excuse: { type: String, default: '' }
  }],
}, { timestamps: true });

export default mongoose.model('Meeting', meetingSchema); 