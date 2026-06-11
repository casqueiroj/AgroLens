/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import Alertas from './pages/Alertas';
import AnalisesLaboratorio from './pages/AnalisesLaboratorio';
import ApoioDecisao from './pages/ApoioDecisao';
import Armazem from './pages/Armazem';
import BibliotecaAgricola from './pages/BibliotecaAgricola';
import CalendarioIA from './pages/CalendarioIA';
import Chat from './pages/Chat';
import Comunidade from './pages/Comunidade';
import DashboardKPI from './pages/DashboardKPI';
import EstimativaProducao from './pages/EstimativaProducao';
import FeedNoticias from './pages/FeedNoticias';
import Fitofarmacoss from './pages/Fitofarmacoss';
import GestaoEquipa from './pages/GestaoEquipa';
import GestaoFinanceira from './pages/GestaoFinanceira';
import Hidroponia from './pages/Hidroponia';
import Home from './pages/Home';
import Lens from './pages/Lens';
import MapasAgricola from './pages/MapasAgricola';
import Maquinas from './pages/Maquinas';
import Meteorologia from './pages/Meteorologia';
import MonitorizacaoSensores from './pages/MonitorizacaoSensores';
import Parcelas from './pages/Parcelas';
import Perfil from './pages/Perfil';
import RelatoriosSustentabilidade from './pages/RelatoriosSustentabilidade';
import SobreNos from './pages/SobreNos';
import Subscricoes from './pages/Subscricoes';
import Terrenos from './pages/Terrenos';
import Rastreabilidade from './pages/Rastreabilidade';
import PortalSubscricoes from './pages/PortalSubscricoes';
import AdminDashboard from './pages/AdminDashboard';
import DroneDashboard from './pages/DroneDashboard';
import GestaoColheitas from './pages/GestaoColheitas';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Alertas": Alertas,
    "AnalisesLaboratorio": AnalisesLaboratorio,
    "ApoioDecisao": ApoioDecisao,
    "Armazem": Armazem,
    "BibliotecaAgricola": BibliotecaAgricola,
    "CalendarioIA": CalendarioIA,
    "Chat": Chat,
    "Comunidade": Comunidade,
    "DashboardKPI": DashboardKPI,
    "EstimativaProducao": EstimativaProducao,
    "FeedNoticias": FeedNoticias,
    "Fitofarmacoss": Fitofarmacoss,
    "GestaoEquipa": GestaoEquipa,
    "GestaoFinanceira": GestaoFinanceira,
    "Hidroponia": Hidroponia,
    "Home": Home,
    "Lens": Lens,
    "MapasAgricola": MapasAgricola,
    "Maquinas": Maquinas,
    "Meteorologia": Meteorologia,
    "MonitorizacaoSensores": MonitorizacaoSensores,
    "Parcelas": Parcelas,
    "Perfil": Perfil,
    "RelatoriosSustentabilidade": RelatoriosSustentabilidade,
    "SobreNos": SobreNos,
    "Subscricoes": Subscricoes,
    "Terrenos": Terrenos,
    "Rastreabilidade": Rastreabilidade,
    "PortalSubscricoes": PortalSubscricoes,
    "AdminDashboard": AdminDashboard,
    "DroneDashboard": DroneDashboard,
    "GestaoColheitas": GestaoColheitas,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};