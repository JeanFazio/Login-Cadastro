import "../SASS/productCardStyle.scss";

function ProductCard({ produto }) {
  return (
    <div className="produto-card">
      <img src={produto.imagem} alt={produto.nome} />
      <h3>{produto.nome}</h3>
      <span>{produto.preco}</span>
      <button>Ver Detalhes</button>
    </div>
  );
}

export default ProductCard;
