import React, { useState, createContext, useContext, useEffect } from "react";
interface Product {
  productId: string;
  name: string;
  description: string;
  image: string;
  priceInAcceptedShares: number;
  priceUSD: number;
}
interface Order {
  orderId: string;
  productId: string;
  email: string;
  streetAddress: string;
  status: "Created" | "Mining" | "Completed" | "Shipped";
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
  createOrder: (
    productId: string,
    email: string,
    fullName: string,
    streetAddress: string,
    city: string,
    state: string,
    zip: string,
    country: string
  ) => any;
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
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5030/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredProducts = products.filter((product) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower)
    );
  });
  const getProduct = (id: string) => {
    return products.find((product) => product.productId === id);
  };
  const getOrder = async (id: string) => {
    const order = await fetch(`http://localhost:5030/orders/${id}`).then(
      (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch order");
        }
        const data = response.json();
        return data;
      }
    );
    return order as Order;
  };
  const createOrder = async (
    productId: string,
    emailAddress: string,
    fullName: string,
    streetAddress: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
  ): Promise<Order | undefined> => {
    const orderRequest = {
      productId,
      emailAddress,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      country,
    };

    try {
      const response = await fetch("http://localhost:5030/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderRequest),
      });

      const data = await response.json();

      setOrders([...orders, data]);
      return data;
    } catch (error) {
      console.error("Error creating order:", error);
      return undefined;
    }
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
        product.productId === id
          ? {
              ...product,
              ...updates,
            }
          : product
      )
    );
  };
  const deleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.productId !== id));
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
