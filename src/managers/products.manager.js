import fs from "fs";
import { v4 as uuid } from "uuid";
import { __dirname } from "../path.js";

class ProducstManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts(querylimit) {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf8");
        return querylimit
          ? JSON.parse(products).slice(0, querylimit)
          : JSON.parse(products);
      } else return [];
    } catch (error) {
      console.error(error);
    }
  }

  async addNewProduct(obj) {
    try {
      const newProduct = {
        id: uuid(),
        status: true,
        ...obj,
        thumbnail: `${__dirname}/db/products.json`
      };
      const products = await this.getProducts();
      products.push(newProduct);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
      return newProduct;
    } catch (error) {
      console.error(error);
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const productListed = products.find((product) => product.id === id);
      return productListed || null;
    } catch (error) {
      console.error(error);
    }
  }

  async modifyProduct(id, obj) {
    try {
      const products = await this.getProducts();
      let productListed = products.find((product) => product.id === id);
      if (productListed) {
        productListed = { ...productListed, ...obj };
      } else return null;
      const productsUpdated = products.filter((product) => product.id !== id);
      productsUpdated.push(productListed);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productsUpdated, null, "\t")
      );
      return productListed;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts();
      const productListed = products.find((product) => product.id === id);
      if (!productListed) return null;
      const productsUpdated = products.filter((product) => product.id !== id);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(productsUpdated, null, "\t")
      );
      return productListed;
    } catch (error) {
      console.error(error);
    }
  }
}

export default ProducstManager;
