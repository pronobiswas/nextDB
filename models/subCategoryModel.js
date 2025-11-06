import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A subcategory must have a name'],
        trim: true,
        maxLength: [50, 'Name cannot exceed 50 characters']
    },
    // slug: {
    //     type: String,
    //     unique: true
    // },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'A subcategory must belong to a parent category']
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


const SubCategory = mongoose.models.SubCategory || mongoose.model("SubCategory", subCategorySchema);

export default SubCategory;

