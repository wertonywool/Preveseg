import './ProductCard.css';

const ProductSkeleton = () => {
  return (
    <div className="card skeleton-card">
      <div className="imageContainer skeleton" />
      <div className="content">
        <div className="skeleton category-skeleton" style={{ width: '40%', height: '0.75rem', marginBottom: '0.75rem' }} />
        <div className="skeleton title-skeleton" style={{ width: '90%', height: '1.2rem', marginBottom: '0.5rem' }} />
        <div className="skeleton title-skeleton" style={{ width: '70%', height: '1.2rem', marginBottom: '1.5rem' }} />
        <div className="priceContainer" style={{ marginBottom: '1.5rem', marginTop: 'auto' }}>
          <div className="skeleton price-skeleton" style={{ width: '30%', height: '1.5rem' }} />
        </div>
        <div className="skeleton button-skeleton" style={{ width: '100%', height: '3rem', borderRadius: '16px' }} />
      </div>
    </div>
  );
};

export default ProductSkeleton;
