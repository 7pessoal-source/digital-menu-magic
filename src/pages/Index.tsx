import { useState } from "react";
import { useStoreSettings, useCategories, useProducts } from "@/hooks/useStore";
import { useCart } from "@/hooks/useCart";
import { Header } from "@/components/menu/Header";
import { CategoryBar } from "@/components/menu/CategoryBar";
import { FeaturedSection } from "@/components/menu/FeaturedSection";
import { ProductGrid } from "@/components/menu/ProductGrid";
import { CartDrawer } from "@/components/menu/CartDrawer";
import { Footer } from "@/components/menu/Footer";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminPanel } from "@/components/admin/AdminPanel";

type View = "menu" | "admin";

const Index = () => {
  const [view, setView] = useState<View>("menu");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const { settings, updateSettings } = useStoreSettings();
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  
  const {
    items,
    observation,
    setObservation,
    isOpen,
    setIsOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    generateWhatsAppMessage,
  } = useCart();

  const handleAdminClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setView("admin");
  };

  const handleExitAdmin = () => {
    setView("menu");
  };

  if (view === "admin") {
    return (
      <AdminPanel
        settings={settings}
        categories={categories}
        products={products}
        onUpdateSettings={updateSettings}
        onAddCategory={addCategory}
        onUpdateCategory={updateCategory}
        onDeleteCategory={deleteCategory}
        onAddProduct={addProduct}
        onUpdateProduct={updateProduct}
        onDeleteProduct={deleteProduct}
        onExit={handleExitAdmin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header settings={settings} />

      <CategoryBar
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <FeaturedSection products={products} onAddToCart={addToCart} />

      <ProductGrid
        products={products}
        categories={categories}
        activeCategory={activeCategory}
        onAddToCart={addToCart}
      />

      <Footer onAdminClick={handleAdminClick} />

      <CartDrawer
        items={items}
        observation={observation}
        isOpen={isOpen}
        totalItems={totalItems}
        totalPrice={totalPrice}
        storeName={settings.name}
        whatsappNumber={settings.whatsapp}
        onSetObservation={setObservation}
        onSetIsOpen={setIsOpen}
        onUpdateQuantity={updateQuantity}
        onRemoveFromCart={removeFromCart}
        onClearCart={clearCart}
        generateWhatsAppMessage={generateWhatsAppMessage}
      />

      <AdminLogin
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
};

export default Index;
