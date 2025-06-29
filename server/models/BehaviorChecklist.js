import mongoose from "mongoose";

const behaviorChecklistSchema = new mongoose.Schema(
  {
    childNo: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: String },
    gender: { type: String },
    date: { type: String },
    social: [String],
    restrictive: [String],
    mood: [String],
    selfRegulation: [String],
    challenging: [String],
    selfInjury: [String], // ← FIXED: now accepts arrays
    scores: { type: Object },
    severity: { type: String },
  },
  { timestamps: true }
);

const BehaviorChecklist = mongoose.model(
  "BehaviorChecklist",
  behaviorChecklistSchema
);

export default BehaviorChecklist;
