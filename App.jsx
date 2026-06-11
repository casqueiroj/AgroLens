import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import NavigationTracker from '@/lib/NavigationTracker'
import GlobalErrorHandler from '@/components/common/GlobalErrorHandler'
import { pagesConfig } from './pages.config'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DiagnosticoPragas from './pages/DiagnosticoPragas';
import AlertasInteligentes from './pages/AlertasInteligentes';
import GestaoComercial from './pages/GestaoComercial';
import AnaliseSoloPage from './pages/AnaliseSoloPage';
import LogisticaMaquinas from './pages/LogisticaMaquinas';
import HistoricoSanitario from './pages/HistoricoSanitario';
import SustentabilidadePage from './pages/SustentabilidadePage';
import GestaoColheitas from './pages/GestaoColheitas';
import PlaneamentoColheitas from './pages/PlaneamentoColheitas';
import MarketplaceLocal from './pages/MarketplaceLocal';
import LogisticaEntregas from './pages/LogisticaEntregas';
import PortalCliente from './pages/PortalCliente';
import ModelosTarefas from './pages/ModelosTarefas';
import ComparativoProdutividade from './pages/ComparativoProdutividade';
import RegistoCampo from './pages/RegistoCampo';
import AgriculturaAquacultura from './pages/AgriculturaAquacultura';
import GestaoAquacultura from './pages/GestaoAquacultura';
import RelatorioTecnico from './pages/RelatorioTecnico';
import Definicoes from './pages/Definicoes';
import BioDatabase from './pages/BioDatabase';
import DiagnosticoBIO from './pages/DiagnosticoBIO';
import StockInsumos from './pages/StockInsumos';
import DashboardAquacultura from './pages/DashboardAquacultura';
import PlaneamentoBIO from './pages/PlaneamentoBIO';
import MapaParcelas from './pages/MapaParcelas';
import MonitorizacaoAqua from './pages/MonitorizacaoAqua';
import DiagnosticoSintomas from './pages/DiagnosticoSintomas';
import DashboardFinanceiroCruzado from './pages/DashboardFinanceiroCruzado';
import CalculadoraDoses from './pages/CalculadoraDoses';
import MapaInterativo from './pages/MapaInterativo';
import DashboardBIO from './pages/DashboardBIO';
import FichaAquacultura from './pages/FichaAquacultura';
import CertificadosDigitais from './pages/CertificadosDigitais';
import DossierParcela from './pages/DossierParcela';
import CatalogoInsumos from './pages/CatalogoInsumos';
import RegistoFertilizacao from './pages/RegistoFertilizacao';
import ModelosTratamento from './pages/ModelosTratamento';
import DroneCamara from './pages/DroneCamara';
import ResumoAnual from './pages/ResumoAnual';
import ModelosIntervencao from './pages/ModelosIntervencao';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

const { Pages, Layout, mainPage } = pagesConfig;
const mainPageKey = mainPage ?? Object.keys(Pages)[0];
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>;

const LayoutWrapper = ({ children, currentPageName }) => Layout ?
  <Layout currentPageName={currentPageName}>{children}</Layout>
  : <>{children}</>;

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-emerald-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-xl">
            <div className="flex items-baseline gap-0">
              <span className="text-white font-black text-4xl tracking-tight leading-none">Agro</span>
              <span className="text-teal-200 font-black text-4xl tracking-tight leading-none">Lens</span>
            </div>
          </div>
          <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
        </div>
        <div className="absolute bottom-6 text-center px-4 max-w-md mx-auto">
          <p className="text-xs text-slate-400">© 2024–2026 AgroLens. Todos os direitos reservados.</p>
          <p className="text-xs text-slate-400">Desenvolvido por João Maurício Lucas Casqueiro · CDADC · Reg. n.º 2024/AgroLens</p>
          <p className="text-xs text-slate-400 mt-1">🔒 Conforme RGPD (Reg. UE 2016/679) · 🌿 Reg. UE 2018/848 (Produção Bio) · ⚖️ Direitos dos agricultores protegidos ao abrigo da legislação europeia em vigor</p>
          <p className="text-xs text-slate-300 mt-1">A reprodução ou utilização não autorizada é proibida por lei.</p>
        </div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="flex flex-col items-center gap-3 mb-8">
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
              <div className="flex items-baseline gap-0">
                <span className="text-white font-black text-4xl tracking-tight leading-none">Agro</span>
                <span className="text-teal-200 font-black text-4xl tracking-tight leading-none">Lens</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-center text-emerald-600 font-semibold tracking-widest uppercase mt-1">Gestão Agrícola IA</p>
            </div>
          </div>
          <div className="w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mb-6"></div>
          <p className="text-sm text-slate-500">A redirecionar para o início de sessão...</p>
          <div className="absolute bottom-6 text-center px-4 max-w-lg">
            <p className="text-xs text-slate-400">© 2024–2026 AgroLens — Todos os direitos reservados.</p>
            <p className="text-xs text-slate-400 mt-0.5">Desenvolvido por <strong>João Maurício Lucas Casqueiro</strong> · CDADC · Reg. n.º 2024/AgroLens</p>
            <p className="text-xs text-slate-400 mt-1">
              🔒 <strong>RGPD (Reg. UE 2016/679)</strong> — Os seus dados são protegidos e da sua propriedade.
              Os agricultores têm direito de acesso, portabilidade e eliminação dos seus dados.
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              🌿 Conforme <strong>Reg. UE 2018/848</strong> (Produção Bio) · <strong>Reg. CE 1107/2009</strong> (Fitofármacos) · <strong>Reg. CE 178/2002</strong> (Rastreabilidade)
            </p>
            <p className="text-xs text-slate-400 mt-0.5">A reprodução, distribuição ou utilização não autorizada é proibida por lei.</p>
          </div>
        </div>
      );
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={
        <LayoutWrapper currentPageName={mainPageKey}>
          <MainPage />
        </LayoutWrapper>
      } />
      {Object.entries(Pages).map(([path, Page]) => (
        <Route
          key={path}
          path={`/${path}`}
          element={
            <LayoutWrapper currentPageName={path}>
              <Page />
            </LayoutWrapper>
          }
        />
      ))}
      <Route path="/DiagnosticoPragas" element={
        <LayoutWrapper currentPageName="DiagnosticoPragas">
          <DiagnosticoPragas />
        </LayoutWrapper>
      } />
      <Route path="/PlaneamentoColheitas" element={
        <LayoutWrapper currentPageName="PlaneamentoColheitas">
          <PlaneamentoColheitas />
        </LayoutWrapper>
      } />
      <Route path="/MarketplaceLocal" element={
        <LayoutWrapper currentPageName="MarketplaceLocal">
          <MarketplaceLocal />
        </LayoutWrapper>
      } />
      <Route path="/LogisticaEntregas" element={
        <LayoutWrapper currentPageName="LogisticaEntregas">
          <LogisticaEntregas />
        </LayoutWrapper>
      } />
      <Route path="/GestaoColheitas" element={
        <LayoutWrapper currentPageName="GestaoColheitas">
          <GestaoColheitas />
        </LayoutWrapper>
      } />
      <Route path="/PortalCliente" element={<PortalCliente />} />
      <Route path="/AlertasInteligentes" element={
        <LayoutWrapper currentPageName="AlertasInteligentes">
          <AlertasInteligentes />
        </LayoutWrapper>
      } />
      <Route path="/ModelosTarefas" element={
        <LayoutWrapper currentPageName="ModelosTarefas">
          <ModelosTarefas />
        </LayoutWrapper>
      } />
      <Route path="/ComparativoProdutividade" element={
        <LayoutWrapper currentPageName="ComparativoProdutividade">
          <ComparativoProdutividade />
        </LayoutWrapper>
      } />
      <Route path="/RegistoCampo" element={
        <LayoutWrapper currentPageName="RegistoCampo">
          <RegistoCampo />
        </LayoutWrapper>
      } />
      <Route path="/GestaoComercial" element={
        <LayoutWrapper currentPageName="GestaoComercial">
          <GestaoComercial />
        </LayoutWrapper>
      } />
      <Route path="/AnaliseSoloPage" element={
        <LayoutWrapper currentPageName="AnaliseSoloPage">
          <AnaliseSoloPage />
        </LayoutWrapper>
      } />
      <Route path="/LogisticaMaquinas" element={
        <LayoutWrapper currentPageName="LogisticaMaquinas">
          <LogisticaMaquinas />
        </LayoutWrapper>
      } />
      <Route path="/HistoricoSanitario" element={
        <LayoutWrapper currentPageName="HistoricoSanitario">
          <HistoricoSanitario />
        </LayoutWrapper>
      } />
      <Route path="/SustentabilidadePage" element={
        <LayoutWrapper currentPageName="SustentabilidadePage">
          <SustentabilidadePage />
        </LayoutWrapper>
      } />
      <Route path="/AgriculturaAquacultura" element={
        <LayoutWrapper currentPageName="AgriculturaAquacultura">
          <AgriculturaAquacultura />
        </LayoutWrapper>
      } />
      <Route path="/GestaoAquacultura" element={
        <LayoutWrapper currentPageName="GestaoAquacultura">
          <GestaoAquacultura />
        </LayoutWrapper>
      } />
      <Route path="/RelatorioTecnico" element={
        <LayoutWrapper currentPageName="RelatorioTecnico">
          <RelatorioTecnico />
        </LayoutWrapper>
      } />
      <Route path="/Definicoes" element={
        <LayoutWrapper currentPageName="Definicoes">
          <Definicoes />
        </LayoutWrapper>
      } />
      <Route path="/BioDatabase" element={
        <LayoutWrapper currentPageName="BioDatabase">
          <BioDatabase />
        </LayoutWrapper>
      } />
      <Route path="/DiagnosticoBIO" element={
        <LayoutWrapper currentPageName="DiagnosticoBIO">
          <DiagnosticoBIO />
        </LayoutWrapper>
      } />
      <Route path="/StockInsumos" element={
        <LayoutWrapper currentPageName="StockInsumos">
          <StockInsumos />
        </LayoutWrapper>
      } />
      <Route path="/DashboardAquacultura" element={
        <LayoutWrapper currentPageName="DashboardAquacultura">
          <DashboardAquacultura />
        </LayoutWrapper>
      } />
      <Route path="/PlaneamentoBIO" element={
        <LayoutWrapper currentPageName="PlaneamentoBIO">
          <PlaneamentoBIO />
        </LayoutWrapper>
      } />
      <Route path="/MapaParcelas" element={
        <LayoutWrapper currentPageName="MapaParcelas">
          <MapaParcelas />
        </LayoutWrapper>
      } />
      <Route path="/MonitorizacaoAqua" element={
        <LayoutWrapper currentPageName="MonitorizacaoAqua">
          <MonitorizacaoAqua />
        </LayoutWrapper>
      } />
      <Route path="/DashboardBIO" element={
        <LayoutWrapper currentPageName="DashboardBIO">
          <DashboardBIO />
        </LayoutWrapper>
      } />
      <Route path="/FichaAquacultura" element={
        <LayoutWrapper currentPageName="FichaAquacultura">
          <FichaAquacultura />
        </LayoutWrapper>
      } />
      <Route path="/DiagnosticoSintomas" element={
        <LayoutWrapper currentPageName="DiagnosticoSintomas">
          <DiagnosticoSintomas />
        </LayoutWrapper>
      } />
      <Route path="/DashboardFinanceiroCruzado" element={
        <LayoutWrapper currentPageName="DashboardFinanceiroCruzado">
          <DashboardFinanceiroCruzado />
        </LayoutWrapper>
      } />
      <Route path="/CalculadoraDoses" element={
        <LayoutWrapper currentPageName="CalculadoraDoses">
          <CalculadoraDoses />
        </LayoutWrapper>
      } />
      <Route path="/MapaInterativo" element={
        <LayoutWrapper currentPageName="MapaInterativo">
          <MapaInterativo />
        </LayoutWrapper>
      } />
      <Route path="/CertificadosDigitais" element={
        <LayoutWrapper currentPageName="CertificadosDigitais">
          <CertificadosDigitais />
        </LayoutWrapper>
      } />
      <Route path="/DossierParcela" element={
        <LayoutWrapper currentPageName="DossierParcela">
          <DossierParcela />
        </LayoutWrapper>
      } />
      <Route path="/CatalogoInsumos" element={
        <LayoutWrapper currentPageName="CatalogoInsumos">
          <CatalogoInsumos />
        </LayoutWrapper>
      } />
      <Route path="/DroneCamara" element={
        <LayoutWrapper currentPageName="DroneCamara">
          <DroneCamara />
        </LayoutWrapper>
      } />
      <Route path="/ModelosTratamento" element={
        <LayoutWrapper currentPageName="ModelosTratamento">
          <ModelosTratamento />
        </LayoutWrapper>
      } />
      <Route path="/RegistoFertilizacao" element={
        <LayoutWrapper currentPageName="RegistoFertilizacao">
          <RegistoFertilizacao />
        </LayoutWrapper>
      } />
      <Route path="/ResumoAnual" element={
        <LayoutWrapper currentPageName="ResumoAnual">
          <ResumoAnual />
        </LayoutWrapper>
      } />
      <Route path="/ModelosIntervencao" element={
        <LayoutWrapper currentPageName="ModelosIntervencao">
          <ModelosIntervencao />
        </LayoutWrapper>
      } />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <NavigationTracker />
          <GlobalErrorHandler />
          <AuthenticatedApp />
          <Toaster />
        </Router>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App