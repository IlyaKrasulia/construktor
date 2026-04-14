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
function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-2xl mx-auto flex items-center px-4 h-14">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧱</span>
          <span className="font-bold text-lg tracking-tight text-gray-900">
            Construktor
          </span>
        </div>
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
  const [quantity, setQuantity] = useState(1);

  // Reset quantity when product changes
  useEffect(() => {
    setQuantity(1);
  }, [product]);

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

  const total = product.price * quantity;

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
              {total} ₴
            </span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                Кількість
              </label>
              <span className="text-sm font-bold text-indigo-600">{quantity} шт.</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-indigo-600"
              aria-label="Кількість товару"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>1</span>
              <span>10</span>
            </div>
          </div>

          <button
            onClick={() => { onBuy(product, quantity); onClose(); }}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-base rounded-2xl py-3.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
          >
            Купити в 1 клік
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Order Modal ──────────────────────────────────────────────────────────────
function OrderModal({ order, onClose }) {
  const [form, setForm] = useState({ name: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!order) return;
    setForm({ name: "", phone: "" });
    setSubmitted(false);
  }, [order]);

  useEffect(() => {
    if (!order) return;
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [order, onClose]);

  useEffect(() => {
    if (order) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [order]);

  if (!order) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Оформлення замовлення"
        className="fixed inset-0 z-[60] flex items-center justify-center px-4"
      >
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 relative animate-fade-in">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Закрити"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4 text-gray-600">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {submitted ? (
            <div className="text-center py-4 space-y-3">
              <div className="text-4xl">✅</div>
              <h3 className="font-bold text-lg text-gray-900">Замовлення прийнято!</h3>
              <p className="text-sm text-gray-500">Ми зв&#39;яжемося з вами найближчим часом.</p>
              <button
                onClick={onClose}
                className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-2xl py-3 transition-all"
              >
                Закрити
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-bold text-lg text-gray-900 mb-1">Оформлення замовлення</h3>
              <p className="text-sm text-gray-500 mb-4">
                <span className="font-medium text-gray-700">{order.product.name}</span>
                {order.quantity > 1 && <span> × {order.quantity}</span>}
                <span className="ml-1 text-indigo-600 font-bold">— {order.product.price * order.quantity} ₴</span>
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ваше ім&#39;я
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Іван Іваненко"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Номер телефону
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+380 XX XXX XX XX"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-base rounded-2xl py-3 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                >
                  Підтвердити замовлення
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderData, setOrderData] = useState(null);

  const handleBuy = (product, quantity = 1) => {
    setOrderData({ product, quantity });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

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

      {/* Order Modal */}
      <OrderModal
        order={orderData}
        onClose={() => setOrderData(null)}
      />
    </div>
  );
}
