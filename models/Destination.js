import mongoose from "mongoose";
import slugify from "slugify";

const destinationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  country: { type: String, required: true },
  city: String,
  durationDays: Number,
  pricePerPerson: Number,
  description: String,
  images: [String],
  highlights: [String],
  itinerary: [String],
  ratings: {
    avg: Number,
    count: Number,
  }
});

// Auto-generate unique slug
destinationSchema.pre("save", async function (next) {
  if (!this.slug) {
    let slug = slugify(this.title, { lower: true });
    let slugExists = await mongoose.models.Destination.findOne({ slug });

    let counter = 1;
    while (slugExists) {
      slug = `${slug}-${counter}`;
      counter++;
      slugExists = await mongoose.models.Destination.findOne({ slug });
    }
    this.slug = slug;
  }
  next();
});

export default mongoose.model("Destination", destinationSchema);
