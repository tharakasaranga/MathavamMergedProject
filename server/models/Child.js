import mongoose from 'mongoose';

const ChildSchema = new mongoose.Schema({
  childNo: { type: String, required: true, unique: true },
  name: String,
  age: String,
  gender: String,
  date: String, // You can also use: date: { type: Date }
});

const Child = mongoose.model('Child', ChildSchema);

export default Child;
