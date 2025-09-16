import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  meeting: { type: mongoose.Schema.Types.ObjectId, ref: 'Meeting', required: true },
  person: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true },
  present: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model('Attendance', attendanceSchema); 