import { Request, Response, NextFunction } from "express";
//models
const Category = require("../models/categorieModel");

import CustomError from "../../classes/CustomError";
//interfaces
import DbMessageResponse from "../../interfaces/DbResponse";

/*========== get categories controller ==============*/
const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find().populate("teams");

    if (!categories) {
      next(new CustomError("Categories not found", 404));
      return;
    }

    const respose = categories.map((category: any) => {
      return {
        id: category._id,
        name: category.name,
        teams: category.teams,
      };
    });

    res.status(200).json(respose);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Get categories error", 400));
  }
};
/*========== Create category controller ==============*/

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  console.log(" createCategory controller: ");

  if (!name) {
    next(new CustomError("Missing name", 400));
    return;
  }
  try {
    const category = await Category.create({ name });
    const categorieExist = Category.findOne({ name });

    if (categorieExist) {
      next(new CustomError("Category already exist", 400));
      return;
    }

    const response: DbMessageResponse = {
      message: "Category created",
      category: category,
    };

    res.status(201).json(response);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Create category error", 400));
  }
};

/*========== Update category controller ==============*/

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  const { categoryId } = req.params;

  if (!name) {
    next(new CustomError("Missing name", 400));
    return;
  }
  try {
    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name },
      { new: true }
    );

    if (!category) {
      next(new CustomError("Category not found", 404));
      return;
    }
    const response: DbMessageResponse = {
      message: "Category updated",
      category: category,
    };
    res.status(200).json(response);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Update category error", 400));
  }
};

/*========== delete category controller ==============*/

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const categoryId = req.params.id;
  try {
    const category = await Category.findById(categoryId);

    if (!category) {
      next(new CustomError("Category not found", 404));
      return;
    }

    await Category.findByIdAndDelete(categoryId);

    const response: DbMessageResponse = {
      message: "Category deleted",
    };
    res.status(200).json(response);
  } catch (error: string | CustomError | any) {
    next(new CustomError(error.message || "Delete category error", 400));
  }
};

export { createCategory, getCategories, updateCategory, deleteCategory };
