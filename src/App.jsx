import { useState, useEffect } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PRODUCTS = [
  { id: 1,  name: "Космічна Станція",   img: "https://picsum.photos/seed/lego1/400/500",  price: 500, pieces: 342, age: "8+", description: "Збудуй міжгалактичну станцію з деталями, що деталізують кожну кімнату й відсік. Ідеально для юних дослідників космосу." },
  { id: 2,  name: "Лісовий Замок",      img: "https://picsum.photos/seed/lego2/400/500",  price: 500, pieces: 518, age: "9+", description: "Середньовічна фортеця серед дерев. Підніми міст, виставляй варту та захищай королівство від ворогів." },
  { id: 3,  name: "Підводний Дослідник",img: "https://picsum.photos/seed/lego3/400/500",  price: 500, pieces: 275, age: "7+", description: "Пірнай углиб океану на борту мінісубмарини. В наборі є акула, кораль та таємна печера." },
  { id: 4,  name: "Місто Майбутнього",  img: "https://picsum.photos/seed/lego4/400/500",  price: 500, pieces: 610, age: "10+", description: "Мегаполіс 2080 року з літаючими авто, хмарочосами на магнітній подушці та зарядними станціями." },
  { id: 5,  name: "Піратський Корабель",img: "https://picsum.photos/seed/lego5/400/500",  price: 500, pieces: 432, age: "8+", description: "Мчи під чорним вітрилом! Корабель має 3 щогли, каюту капітана та гарматну палубу." },
  { id: 6,  name: "Динозавр-Рекс",      img: "https://picsum.photos/seed/lego6/400/500",  price: 500, pieces: 189, age: "6+", description: "Величезний тиранозавр з рухомою щелепою та хвостом. Чудовий перший набір для маленьких будівельників." },
  { id: 7,  name: "Ракетний Стартовий Майданчик", img: "https://picsum.photos/seed/lego7/400/500", price: 500, pieces: 556, age: "9+", description: "Запускай ракету у небо! Набір включає пускову вежу, стартовий центр та двох астронавтів." },
  { id: 8,  name: "Казковий Будинок",   img: "https://picsum.photos/seed/lego8/400/500",  price: 500, pieces: 390, age: "7+", description: "Триповерховий будиночок з сонячними панелями, садочком та зробленим вручну дахом із черепиці." },
  { id: 9,  name: "Гоночне Авто",       img: "https://picsum.photos/seed/lego9/400/500",  price: 500, pieces: 224, age: "6+", description: "Болід Формули 1 у масштабі 1:20. Відкривається капот, обертаються колеса. Готовий до гонки!" },
  { id: 10, name: "Арктична База",      img: "https://picsum.photos/seed/lego10/400/500", price: 500, pieces: 480, age: "8+", description: "Дослідна станція на Північному полюсі. В наборі сніговий всюдихід, вчені та білий ведмідь." },
  { id: 11, name: "Чарівний Ліс",       img: "https://picsum.photos/seed/lego11/400/500", price: 500, pieces: 315, age: "7+", description: "Зачарований ліс з будинком на дереві, мостиком та феями. Казка, яку можна тримати в руках." },
  { id: 12, name: "Роботизований Завод", img: "https://picsum.photos/seed/lego12/400/500",price: 500, pieces: 720, age: "11+", description: "Автоматизований завод майбутнього з рухомими конвеєрами, роботизованими руками та 3 фігурками інженерів." },
];

// ─── Header ───────────────────────────────────────────────────────────────────
function Header({ cartCount, onCartClick }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-2xl mx-auto flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧱</span>
          <span className="font-bold text-lg tracking-tight text-gray-900">
            Construktor
          </span>
        </div>
        <button
          onClick={onCartClick}
          className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Кошик"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-gray-700">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function Card({ product, onDetails, onBuy }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
      <button
        onClick={() => onDetails(product)}
        className="block w-full focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded-t-2xl overflow-hidden"
        aria-label={`Деталі: ${product.name}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          <span className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-xs text-gray-600 font-medium rounded-full px-2 py-0.5">
            {product.pieces} дет.
          </span>
        </div>
      </button>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div>
          <p className="text-xs text-gray-400 mb-0.5">{product.age}</p>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">
            {product.name}
          </h3>
        </div>
        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="font-bold text-indigo-600 text-base whitespace-nowrap">
            {product.price} ₴
          </span>
          <button
            onClick={() => onBuy(product)}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-semibold rounded-xl py-2 px-3 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
          >
            Купити в 1 клік
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Product Grid (List) ──────────────────────────────────────────────────────
function ProductList({ products, onDetails, onBuy }) {
  return (
    <section className="px-4 pb-8">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {products.map((product) => (
          <Card
            key={product.id}
            product={product}
            onDetails={onDetails}
            onBuy={onBuy}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Bottom Sheet Modal ───────────────────────────────────────────────────────
function BottomSheet({ product, onClose, onBuy }) {
  // Close on Escape key
  useEffect(() => {
    if (!product) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [product, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [product]);

  if (!product) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        className="fixed bottom-0 left-0 right-0 z-50 max-w-2xl mx-auto bg-white rounded-t-3xl shadow-2xl overflow-hidden animate-slide-up"
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Закрити"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4 text-gray-600">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="relative aspect-[16/9] sm:aspect-[2/1] overflow-hidden bg-gray-50">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="px-5 pt-4 pb-8 space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Вік: {product.age} · {product.pieces} деталей</p>
              <h2 className="font-bold text-xl text-gray-900 leading-tight">
                {product.name}
              </h2>
            </div>
            <span className="font-extrabold text-2xl text-indigo-600 whitespace-nowrap">
              {product.price} ₴
            </span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            {product.description}
          </p>
          <button
            onClick={() => { onBuy(product); onClose(); }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-base rounded-2xl py-3.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          >
            🛒 Купити в 1 клік
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Toast Notification ───────────────────────────────────────────────────────
function Toast({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onDismiss, 2500);
    return () => clearTimeout(t);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-lg whitespace-nowrap animate-fade-in">
      {message}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState("");

  const handleBuy = (product) => {
    setCart((prev) => [...prev, product]);
    setToast(`✅ «${product.name}» додано до кошика!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartCount={cart.length} onCartClick={() => setToast(`🛒 Товарів у кошику: ${cart.length}`)} />

      {/* Hero Banner */}
      <div className="max-w-2xl mx-auto px-4 pt-5 pb-4">
        <div className="bg-indigo-600 rounded-2xl px-5 py-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-widest opacity-75 mb-1">Колекція 2024</p>
          <h1 className="font-extrabold text-2xl sm:text-3xl leading-tight">
            50+ конструкторів<br />для юних будівельників
          </h1>
          <p className="text-sm opacity-80 mt-1">Кожен набір — лише <span className="font-bold">500 ₴</span></p>
        </div>
      </div>

      {/* Category Label */}
      <div className="max-w-2xl mx-auto px-4 pb-3 flex items-center justify-between">
        <h2 className="font-bold text-base text-gray-900">Всі товари</h2>
        <span className="text-xs text-gray-400">{PRODUCTS.length} позицій</span>
      </div>

      {/* Product Grid */}
      <div className="max-w-2xl mx-auto">
        <ProductList
          products={PRODUCTS}
          onDetails={setSelectedProduct}
          onBuy={handleBuy}
        />
      </div>

      {/* Bottom Sheet */}
      <BottomSheet
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onBuy={handleBuy}
      />

      {/* Toast */}
      <Toast message={toast} onDismiss={() => setToast("")} />
    </div>
  );
}
