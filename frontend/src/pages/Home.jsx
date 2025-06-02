import Header from "../components/Header";
import Footer from "../components/Footer";
import "../SASS/home.scss";

function Home() {
    return (
        <div className="home-page">
            <Header />
            <section className="destaque">
                <h1>Seja bem-vindo à StutuTurbo</h1>
                <p>O melhor em acessórios e performance automotiva</p>
            </section>

            <section className="sessao-produtos">
                <h2>Produtos em destaque</h2>

                <div className="produto-linha">
                    <div className="produto-item">
                        <img src="/images/ft450.jpg" alt="FT 450 FuelTech" />
                        <div>
                            <h3>FT 450 FuelTech</h3>
                            <p>Controle total e precisão para alta performance.</p>
                            <span>R$ 3.499,90</span>
                        </div>
                    </div>

                    <div className="produto-item">
                        <img src="/images/hoosier.jpg" alt="Pneu Hoosier" />
                        <div>
                            <h3>Pneu Hoosier</h3>
                            <p>Máxima aderência para carros de alta performance.</p>
                            <span>R$ 2.199,90</span>
                        </div>
                    </div>

                    <div className="produto-item">
                        <img src="/images/suspensao.jpg" alt="Suspensão Coilover" />
                        <div>
                            <h3>Suspensão Coilover</h3>
                            <p>Ajuste perfeito para conforto e desempenho.</p>
                            <span>R$ 4.799,90</span>
                        </div>
                    </div>

                    <div className="produto-item">
                        <img src="/images/freios.jpg" alt="Kit de Freios Brembo" />
                        <div>
                            <h3>Kit de Freios Brembo</h3>
                            <p>Segurança e performance em frenagens extremas.</p>
                            <span>R$ 6.999,90</span>
                        </div>
                    </div>

                    <div className="produto-item">
                        <img src="/images/barenwald_berlin.jpg" alt="Escape Esportivo Inox" />
                        <div>
                            <h3>Escape Esportivo Inox</h3>
                            <p>Potência e som que impressionam. Qualidade top de linha.</p>
                            <span>R$ 899,90</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Home;
