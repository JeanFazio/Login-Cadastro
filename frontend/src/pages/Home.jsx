import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import "../SASS/home.scss";

function Home() {
    return (
        <div className="home-page">
            <Header />
            <section className="destaque">
                <h1>Seja bem-vindo à StutuTurbo</h1>
                <p>O melhor em acessórios e performance automotiva</p>
            </section>

            <ProductCard />

            <Footer />
        </div>
    );
}

export default Home;
