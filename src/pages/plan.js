import Header from "../components/header/header";
import NosideBarHeader from "../components/Sidebar/Nosidebarheader";
import "../stylesheets/auth.scss";
export default () => (
  <div>
    <Header />
    <div className="noSideBarHeader">
      <NosideBarHeader />
    </div>
    <br />
    <h1>Choose a plan now</h1>
    <div className="pricing-table">
      <div className="pricing-item">
        <div className="pricing-title">Free</div>
        <div className="pricing-value">
          $0.<span className="smallText">0</span>
          <span className="undertext">/Month</span>
        </div>
        <ul className="pricing-features">
          <li>
            <span className="keywords">1GB</span> Armazenamento
          </li>
          <li>
            Banda <span className="keywords">ilimitada</span>
          </li>
          <li>
            <span className="keywords">10 Contas</span> de email
          </li>
          <li>
            <span className="keywords">50gb</span> Transferência
          </li>
        </ul>
        <div className="button">Sign Up</div>
      </div>

      <div className="pricing-item pricing-featured">
        <div className="selected">Recomendado</div>
        <div className="pricing-title">PRO</div>
        <div className="pricing-value">
          $59.<span className="smallText">90</span>
          <span className="undertext">/Month</span>
        </div>
        <ul className="pricing-features">
          <li>
            <span className="keywords">5GB</span> Armazenamento
          </li>
          <li>
            Banda <span className="keywords">ilimitada</span>
          </li>
          <li>
            <span className="keywords">100 Contas</span> de email
          </li>
          <li>
            <span className="keywords">100gb</span> Transferência
          </li>
        </ul>
        <div className="button">Sign Up</div>
      </div>

      <div className="pricing-item pricing-featured-enterprice">
        <div className="selected">Recomendado</div>
        <div className="pricing-title">Enterprice</div>
        <div className="pricing-value-enterprice">
          $99.<span className="smallText">90</span>
          <span className="undertext">/Month</span>
        </div>
        <ul className="pricing-features">
          <li>
            <span className="keywords">20GB</span> Armazenamento
          </li>
          <li>
            Banda <span className="keywords">ilimitada</span>
          </li>
          <li>
            <span className="keywords">200 Contas</span> de email
          </li>
          <li>
            <span className="keywords">200gb</span> Transferência
          </li>
        </ul>
        <div className="button">Sign Up</div>
      </div>
    </div>
  </div>
);
