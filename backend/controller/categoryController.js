const mongoose= require('mongoose');

const Category= require('../models/categoriesModel');

const addCategory= async (req, res)=>{
    const {name, parentCate, image}= req.body;

    let category;
    let existingParent;

    if(!parentCate || parentCate.trim().length === 0){
        category= new Category({
            name,
            image
        })
    } else{

        if(!mongoose.Types.ObjectId.isValid(parentCate)){
            return res.status(404).json({err: "Id khong hop le"})
        }

        try{
            existingParent= await Category.findById(parentCate);
        }catch(err){
            return res.status(404).json({err: err});
        }
    
        if(!existingParent){
            return res.status(404).json({err: "Khong tim thay danh muc chinh."})
        }

        category= new Category({
            name,
            parentCate,
            image
        })
    } 

    try{
        await category.save();
    } catch(err){
        return res.status(404).json({err: "Da co loi xay ra. Khong the them."});
    }
    
    res.status(200).json({msg: "Them thanh cong"});
}



module.exports= {
    addCategory
}