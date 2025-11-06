'use client'
import React from 'react'

export default function CategorySection() {
    const [categoryName, setCategoryName] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [categories, setCategories] = React.useState([]);
    const [subCategories, setSubCategories] = React.useState([]);
    const [subCategoryInput, setSubCategoryInput] = React.useState({ name: "", parentCategory: "" });

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        setMessage("Creating category...");

        try {
            const res = await fetch("/api/category/createCategory", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: categoryName }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(`✅ ${data.message}`);
                setCategoryName("");
            } else {
                setMessage(`❌ ${data.message}`);
            }
        } catch (error) {
            console.error("Error creating category:", error);
            setMessage("❌ Failed to create category");
        }
    };
    const handleGetCategory = async () => {
        setMessage("Getting categories...");

        try {
            const res = await fetch("/api/category/createCategory");
            const text = await res.text();
            const data = text ? JSON.parse(text) : {};

            if (res.ok && data.success) {
                setCategories(data.categories);
                setMessage("✅ Categories fetched successfully");
            } else {
                setMessage(`❌ ${data.message || "Failed to fetch categories"}`);
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            setMessage("❌ Failed to fetch categories");
        }
    };
    const handleSubCategoryChange = (e) => {
        const { name, value } = e.target;
        setSubCategoryInput((prev) => ({ ...prev, [name]: value }));
    }
    const handleCreateSubCategory = async (e) => {
        e.preventDefault();
        setMessage("Creating subcategory...");
        console.log(subCategoryInput);
        try {
            const res = await fetch("/api/category/subCategory", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(subCategoryInput),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(`✅ ${data.message}`);
                setSubCategoryInput({ name: "", parentCategory: "" });
            } else {
                setMessage(`❌ ${data.message}`);
            }
        } catch (error) {
            console.error("Error creating subcategory:", error);
            setMessage("❌ Failed to create subcategory");
        }
    };
    const handleGetSubCategories = async () => {
        setMessage("Getting subcategories...");
        try {
            const res = await fetch("/api/category/subCategory");
            const data = await res.json();

            if (res.ok) {
                setSubCategories(data.subCategories);
                setMessage("✅ Subcategories fetched successfully");
            } else {
                setMessage(`❌ ${data.message || "Failed to fetch subcategories"}`);
            }
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            setMessage("❌ Failed to fetch subcategories");
        }
    };
    const handleDeleteSubCategory = async (subCategoryId) => {
        setMessage("Deleting subcategory...");
        try {
            const res = await fetch(`/api/category/subCategory`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: subCategoryId }),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage(`✅ ${data.message}`);
                handleGetSubCategories(); // ✅ Refresh list
            } else {
                setMessage(`❌ ${data.message}`);
            }
        } catch (error) {
            console.error("Error deleting subcategory:", error);
            setMessage("❌ Failed to delete subcategory");
        }
    };

    console.log(subCategories);
    return (
        <div>
            <h2 className='text-2xl font-semibold mb-4'>Category Management</h2>
            <div className='flex gap-5'>
                <div className='border p-2 mt-4 flex gap-12'>
                    {/* ---create category form--- */}
                    <div>
                        <p>Create Category</p>
                        <form onSubmit={handleCreateCategory}>
                            <input
                                type="text"
                                placeholder="Category Name"
                                className='border p-1'
                                value={categoryName}
                                onChange={(e) => setCategoryName(e.target.value)}
                            />
                            <button type="submit" className='border px-2 mt-2'>Create</button>
                        </form>

                        {message && <p className='mt-2 text-sm'>{message}</p>}
                    </div>
                    {/* ---see all categories--- */}
                    <div>
                        <p onClick={handleGetCategory}>All Categories</p>
                        {
                            categories.length > 0 ? (
                                <ul className='mt-2 flex flex-col gap-2'>
                                    {categories.map((category) => (
                                        <li className='border p-1' key={category._id}>{category.name}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className='mt-2'>No categories found</p>
                            )}
                    </div>
                </div>
                <div className='border p-2 mt-4'>
                    <p>Subcategory Management</p>
                    <div>
                        <div>
                            <select name="parentCategory" value={subCategoryInput?.parentCategory} onChange={handleSubCategoryChange}>
                                {categories.length > 0 ? (
                                    categories.map((category) => (
                                        <option className='text-black' key={category._id} value={category._id} >{category.name}</option>
                                    ))
                                ) : (
                                    <option>No categories available</option>
                                )}
                            </select>

                            <input type="text" placeholder="Subcategory Name" className='border p-1 mx-2' name='name' onChange={(e) => handleSubCategoryChange(e)} />
                            <button type="submit" onClick={handleCreateSubCategory} className='border px-2 mt-2'>Create Subcategory</button>
                        </div>
                        <p className='p-2 border' onClick={handleGetSubCategories}>Get all subcategories</p>

                        {
                            subCategories.length > 0 ? (
                                <ul className='mt-2 flex flex-col gap-2'>
                                    {subCategories.map((subCategory) => (
                                        <li className='border p-1' key={subCategory._id} >
                                            {subCategory.name} (Parent: {subCategory.parentCategory.name})
                                            <span className='ml-2 cursor-pointer text-red-500' onClick={() => handleDeleteSubCategory(subCategory._id)}>Delete</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className='mt-2'>No subcategories found</p>
                            )

                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
