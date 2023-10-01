const mongoose= require('mongoose');

const Category= require('../models/categoriesModel');

const addCategory= async (req, res)=>{
    const {name, parentCate, image}= req.body;

    let category;
    category= new Category ({
        name,
        parentCate,
        image
    });

    if(Boolean(parentCate) === false){
        category.mainCate= null;
        category.isMainCate= true;
        try {
            await category.save();
        }catch (err){
            return res.status(404).json({err: "Đã có lỗi xảy ra."})
        }

    } else {
        let existingParent;
        try{
            existingParent= await Category.findById(parentCate);
        }catch (err){
            return res.status(404).json({err: "Đã có lỗi xảy ra."})
        }

        if(!existingParent){
            return res.status(404).json({err: "Không tìm thấy danh mục chính."});
        }

        if(existingParent.isMainCate === false){
            return res.status(404).json({err: "Danh mục đã chọn không phải là danh mục chính."})
        }

        category.mainCate= existingParent.id;
        category.isMainCate= false;

        try{
            const sess= await mongoose.startSession();
            sess.startTransaction();
            await category.save();
            existingParent.subCate.push(category);
            await existingParent.save();
            await sess.commitTransaction();
        } catch(err){
            return res.status(404).json({err: "Đã có lỗi xảy ra."});
        }
    }
    res.status(200).json({msg: "Thêm thành công."});
}

const getSubCategory= async (req, res)=> {
    const parentCategory= req.params.cid;

    let categories;
    try {
        categories= await Category.findById(parentCategory).populate('subCate');
    }catch (err){
        return res.status(404).json({err: err});
    }

    res.status(200).json(categories.subCate);
}

const getMainCategory= async (req, res)=>{
    let cateroties;
    try{
        cateroties= await Category.find({isMainCate: true});
    }catch (err){
        return res.status(404).json({err: "Đã có lỗi xảy ra."})
    }

    res.status(200).json(cateroties);
}

const updateCategory= async (req, res)=> {
    const categoryId= req.params.cid;
    const {name, image}= req.body;

    let existingCate;
    try{
        existingCate= await Category.findById(categoryId);
    } catch(err){
        return res.status(404).json({err: "Đã có lỗi xảy ra."});
    }

    if(!existingCate){
        return res.status(404).json({err: "Không tìm thấy danh mục."});
    }

    existingCate.name= name;
    existingCate.image= image;

    try{
        await existingCate.save();
    }catch (err){
        return res.status(404).json({err: "Đã có lỗi xảy ra."});
    }

    res.status(200).json({msg: "Cập nhật thành công."});
}

const deleteCategory= async (req, res)=>{
    const categoryId= req.params.cid;

    let category;
    try{
        category= await Category.findById(categoryId).populate('subCate');
    }catch(err){
        return res.status(404).json({err: "Đã có lỗi xảy ra."});
    }

    if(!category){
        return res.status(404).json({err: "Không tìm thấy danh mục."})
    }

    if(category.isMainCate === false){
        let mainCate;
        try {
            mainCate= await Category.findById(category.mainCate);
        }catch(err){
            return res.status(404).json("Đã có lỗi xảy ra.");
        }

        try {
            const sess= await mongoose.startSession();
            sess.startTransaction();
            mainCate.subCate.pop(category);
            await mainCate.save();
            await category.deleteOne();
            await sess.commitTransaction();            
        } catch (error) {
            return res.status(404).json({err: "Đã có lỗi xảy ra."})
        }

    } else {
        try {
            const sess= await mongoose.startSession();
            sess.startTransaction();
            category.subCate.map(async (category)=> {
                let cate= await Category.findById(category._id);
                await cate.deleteOne();
            })
            category.deleteOne()
            await sess.commitTransaction();
        }catch(err){
            return res.status(404).json({err: "Không thể xóa. Đã có lỗi xảy ra."})
        }
    }
    return res.status(200).json({msg: "Đã xóa."})
}

module.exports= {
    addCategory,
    getSubCategory,
    getMainCategory,
    updateCategory,
    deleteCategory
}