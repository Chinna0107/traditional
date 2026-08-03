const fbq = (...args) => typeof window !== 'undefined' && window.fbq && window.fbq(...args);

export const pixelViewContent = (product, selectedSize) => {
  fbq('track', 'ViewContent', {
    content_ids: [String(product.id)],
    content_name: product.name,
    content_type: 'product',
    value: selectedSize?.price || 0,
    currency: 'INR',
  });
};

export const pixelAddToCart = (product, variant, qty = 1) => {
  fbq('track', 'AddToCart', {
    content_ids: [String(product.id)],
    content_name: product.name,
    content_type: 'product',
    value: (variant?.price || 0) * qty,
    currency: 'INR',
    num_items: qty,
  });
};

export const pixelInitiateCheckout = (items, total) => {
  fbq('track', 'InitiateCheckout', {
    content_ids: items.map(i => String(i.product.id)),
    num_items: items.reduce((s, i) => s + i.qty, 0),
    value: total,
    currency: 'INR',
  });
};

export const pixelPurchase = (orderId, total) => {
  fbq('track', 'Purchase', {
    content_type: 'product',
    order_id: String(orderId),
    value: total,
    currency: 'INR',
  });
};
