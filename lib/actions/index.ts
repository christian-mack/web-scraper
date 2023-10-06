"use server";

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { scrapeProduct } from "../scraper";
import { connectToDatabase } from "../scraper/mongoose";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    connectToDatabase();

    const scrapedProduct = await scrapeProduct(productUrl);

    if (!scrapedProduct) return;

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { new: true, upsert: true }
    );

    revalidatePath(`/products/${newProduct._id}`);
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
}

export async function getProductById(productId: string) {
  try {
    connectToDatabase();

    const product = await Product.findOne({ _id: productId });

    if (!product) return;

    return product;
  } catch (error: any) {
    console.log(error);
  }
}

export async function getAllProducts() {
  try {
    connectToDatabase();

    const products = await Product.find();

    if (!products) return;

    return products;
  } catch (error: any) {
    console.log(error);
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    connectToDatabase();

    const currentProduct = await Product.findById(productId);

    if (!currentProduct) return null;

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);

    return similarProducts;
  } catch (error: any) {
    console.log(error);
  }
}
