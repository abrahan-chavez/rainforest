import React, { useState, createContext, useContext, useEffect } from "react";
interface Product {
  id: string;
  name: string;
  description: string;
  priceUSD: number;
  hashesRequired: number;
  image: string;
}
interface Order {
  id: string;
  productId: string;
  email: string;
  address: string;
  status: "mining" | "completed" | "shipped";
  progress: number;
  stratumUrl: string;
  workerName: string;
}
interface StoreContextType {
  products: Product[];
  orders: Order[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProducts: Product[];
  getProduct: (id: string) => Product | undefined;
  getOrder: (id: string) => Order | undefined;
  createOrder: (productId: string, email: string, address: string) => Order;
  updateOrderProgress: (id: string, progress: number) => void;
  createProduct: (product: Omit<Product, "id">) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}
const StoreContext = createContext<StoreContextType | undefined>(undefined);
export const StoreProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5030/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProducts = products.filter((product) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    );
  });
  const getProduct = (id: string) => {
    return products.find((product) => product.id === id);
  };
  const getOrder = (id: string) => {
    return orders.find((order) => order.id === id);
  };
  const createOrder = (
    productId: string,
    email: string,
    address: string
  ): Order => {
    const newOrder: Order = {
      id: `order_${Date.now()}`,
      productId,
      email,
      address,
      status: "mining",
      progress: 0,
      stratumUrl: `stratum+tcp://mine.rainforrest.local:3333`,
      workerName: `worker_${Date.now()}`,
    };
    setOrders([...orders, newOrder]);
    return newOrder;
  };
  const updateOrderProgress = (id: string, progress: number) => {
    setOrders(
      orders.map((order) => {
        if (order.id === id) {
          const status = progress >= 100 ? "completed" : "mining";
          return {
            ...order,
            progress,
            status,
          };
        }
        return order;
      })
    );
  };
  const createProduct = (product: Omit<Product, "id">): Product => {
    const newProduct = {
      ...product,
      id: `prod_${Date.now()}`,
    };
    setProducts([...products, newProduct]);
    return newProduct;
  };
  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              ...updates,
            }
          : product
      )
    );
  };
  const deleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };
  const value = {
    products,
    orders,
    searchQuery,
    setSearchQuery,
    filteredProducts,
    getProduct,
    getOrder,
    createOrder,
    updateOrderProgress,
    createProduct,
    updateProduct,
    deleteProduct,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};
export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
