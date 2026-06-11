import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Home, Camera, Leaf, Bug, Lightbulb, BarChart2, Map, Calendar,
  Archive, Users, ShoppingBag, Euro, Crown, Bell, Menu, X,
  Fish, Shield, ShieldCheck, FileText, Tractor, Scissors, Cloud, User, Package,
  FlaskConical, Activity, MapPin, Calculator, Plus, ClipboardList,
  Droplets, ScanLine, Navigation2, Settings, ChevronDown
} from "lucide-react";
import { useState } from "react";
import AssistenteFlutuante from "@/components/chat/AssistenteFlutuante";
import PesquisaGlobal from "@/components/common/PesquisaGlobal";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import PushNotifications from "@/components/notifications/PushNotifications";
import TarefasNotificacoes from "@/components/notifications/TarefasNotificacoes";
import OfflineIndicator from "@/components/common/OfflineIndicator";
import { cn } from "@/lib/utils";

// NAVEGAÇÃO AGRUPADA
const NAV_GROUPS = [
  {
    label: "Principal",
    items: [
      { icon: Home, label: "Início", page: "Home" },
      { icon: BarChart2, label: "Painel KPI", page: "DashboardKPI" },
      { icon: Bell, label: "Alertas", page: "Alertas" },
    ]
  },
  {
    label: "Campo & Culturas",
    items: [
      { icon: Leaf, label: "Parcelas", page: "Parcelas" },
      { icon: MapPin, label: "Mapa Interativo", page: "MapaInterativo" },
      { icon: Camera, label: "Lens IA", page: "Lens" },
      { icon: Bug, label: "Diagnóstico", page: "DiagnosticoSintomas" },
      { icon: Scissors, label: "Colheitas", page: "GestaoColheitas" },
      { icon: Calendar, label: "Calendário IA", page: "CalendarioIA" },
      { icon: Cloud, label: "Meteorologia", page: "Meteorologia" },
    ]
  },
  {
    label: "Produção & Stock",
    items: [
      { icon: Package, label: "Stock Insumos", page: "StockInsumos" },
      { icon: Archive, label: "Armazém", page: "Armazem" },
      { icon: FlaskConical, label: "Catálogo Insumos", page: "CatalogoInsumos" },
      { icon: Calculator, label: "Calculadora Doses", page: "CalculadoraDoses" },
      { icon: Shield, label: "Histórico Sanitário", page: "HistoricoSanitario" },
      { icon: Leaf, label: "Fertilização", page: "RegistoFertilizacao" },
      { icon: FlaskConical, label: "Modelos Tratamento", page: "ModelosTratamento" },
      { icon: ClipboardList, label: "Modelos Intervenção", page: "ModelosIntervencao" },
      { icon: FileText, label: "Dossier Parcela", page: "DossierParcela" },
    ]
  },
  {
    label: "Financeiro & Equipa",
    items: [
      { icon: Euro, label: "Dashboard Financeiro", page: "DashboardFinanceiroCruzado" },
      { icon: Euro, label: "Gestão Financeira", page: "GestaoFinanceira" },
      { icon: Users, label: "Equipa", page: "GestaoEquipa" },
      { icon: Tractor, label: "Máquinas", page: "Maquinas" },
    ]
  },
  {
    label: "Mercado & Vendas",
    items: [
      { icon: ShoppingBag, label: "Marketplace", page: "MarketplaceLocal" },
      { icon: ShoppingBag, label: "Comercial", page: "GestaoComercial" },
      { icon: Shield, label: "Rastreabilidade", page: "Rastreabilidade" },
      { icon: ShieldCheck, label: "Certificados", page: "CertificadosDigitais" },
    ]
  },
  {
    label: "Bio & Aquacultura",
    items: [
      { icon: Leaf, label: "BIO & Aquacultura", page: "AgriculturaAquacultura" },
      { icon: Fish, label: "Gestão Aquacultura", page: "GestaoAquacultura" },
      { icon: Fish, label: "Monitorização Aqua", page: "MonitorizacaoAqua" },
      { icon: Fish, label: "Dashboard BIO", page: "DashboardBIO" },
    ]
  },
  {
    label: "Drones & Rega",
    items: [
      { icon: Navigation2, label: "Controlo Drone", page: "DroneDashboard" },
      { icon: Camera, label: "Câmara ao Vivo", page: "DroneCamara" },
      { icon: Droplets, label: "Sistema de Rega", page: "MonitorizacaoSensores" },
    ]
  },
  {
    label: "IA & Decisão",
    items: [
      { icon: Lightbulb, label: "Apoio à Decisão", page: "ApoioDecisao" },
      { icon: Activity, label: "Alertas Inteligentes", page: "AlertasInteligentes" },
      { icon: Map, label: "Análise Solo", page: "AnaliseSoloPage" },
      { icon: BarChart2, label: "Resumo Anual", page: "ResumoAnual" },
    ]
  },
  {
    label: "Conta",
    items: [
      { icon: Crown, label: "Subscrições", page: "PortalSubscricoes" },
      { icon: User, label: "Perfil", page: "Perfil" },
      { icon: Settings, label: "Definições", page: "Definicoes" },
    ]
  }
];

// Bottom nav — 4 itens + FAB central
const BOTTOM_NAV = [
  { icon: Home, label: "Início", page: "Home" },
  { icon: Leaf, label: "Parcelas", page: "Parcelas" },
  { icon: Calendar, label: "Calendário", page: "CalendarioIA" },
  { icon: Bell, label: "Alertas", page: "Alertas" },
];

const FAB_ACTIONS = [
  { icon: ScanLine, label: "Lens IA", page: "Lens", color: "bg-emerald-600" },
  { icon: Bug, label: "Diagnóstico", page: "DiagnosticoSintomas", color: "bg-red-500" },
  { icon: ClipboardList, label: "Registo Campo", page: "RegistoCampo", color: "bg-blue-500" },
  { icon: Droplets, label: "Rega", page: "MonitorizacaoSensores", color: "bg-sky-500" },
  { icon: Scissors, label: "Colheitas", page: "GestaoColheitas", color: "bg-amber-500" },
];

// Grupo colapsável no sidebar desktop
function NavGroup({ grupo, currentPageName }) {
  const hasActive = grupo.items.some(i => i.page === currentPageName);
  const [open, setOpen] = useState(hasActive || grupo.label === "Principal");

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-2 py-1 rounded-md hover:bg-slate-50 transition-colors group"
      >
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-slate-500">
          {grupo.label}
        </p>
        <ChevronDown className={cn("w-3 h-3 text-slate-300 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="space-y-0.5 mt-0.5">
          {grupo.items.map((item) => {
            const isActive = currentPageName === item.page;
            return (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm transition-all duration-150",
                  isActive
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium shadow-sm"
                    : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-800"
                )}
              >
                <item.icon className={cn("w-3.5 h-3.5 shrink-0", isActive ? "text-white" : "text-slate-400")} />
                <span className="truncate text-[13px]">{item.label}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const navigate = useNavigate();

  const handleFabAction = (page) => {
    setFabOpen(false);
    navigate(createPageUrl(page));
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ═══ DESKTOP SIDEBAR ═══ */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-60 lg:flex-col z-40 shadow-xl">
        <div className="flex flex-col h-full bg-white border-r border-slate-100">

          {/* Logo */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-100 bg-gradient-to-r from-emerald-600 to-teal-600 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shadow-inner">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-baseline gap-0">
                <span className="font-black text-white text-xl tracking-tight leading-none">Agro</span>
                <span className="font-black text-emerald-200 text-xl tracking-tight leading-none">Lens</span>
              </div>
              <span className="text-[9px] text-emerald-100 font-semibold tracking-widest uppercase opacity-80">Gestão Agrícola IA</span>
            </div>
          </div>

          {/* Nav scrollável — pb-4 garante que o último item não fica colado ao footer */}
          <nav className="flex-1 overflow-y-auto px-2 py-3 pb-4 space-y-1" aria-label="Navegação principal">
            {NAV_GROUPS.map((grupo) => (
              <NavGroup key={grupo.label} grupo={grupo} currentPageName={currentPageName} />
            ))}
          </nav>

          {/* Footer sidebar */}
          <div className="px-3 py-2 border-t border-slate-100 shrink-0 bg-slate-50">
            <div className="flex items-center justify-between">
              <Link to={createPageUrl("Perfil")} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white transition-colors flex-1 min-w-0">
                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="text-xs text-slate-600 font-medium truncate">Meu Perfil</span>
              </Link>
              <div className="flex items-center gap-0.5">
                <PushNotifications />
                <NotificationCenter />
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ═══ MOBILE TOP BAR ═══ */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="flex items-center justify-between px-3 h-13" style={{ height: "52px" }}>
          {/* Pesquisa — ocupa toda a largura disponível */}
          <div className="flex-1 px-1">
            <PesquisaGlobal />
          </div>

          {/* Ações */}
          <div className="flex items-center gap-0.5">
            <PushNotifications />
            <NotificationCenter />
            <button
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-slate-600 active:bg-slate-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ═══ MOBILE SLIDE MENU (direita) ═══ */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 w-[85vw] max-w-xs h-full bg-white shadow-2xl flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Header menu */}
            <div className="flex items-center justify-between px-4 h-14 bg-gradient-to-r from-emerald-600 to-teal-600 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                  <Leaf className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="flex items-baseline">
                  <span className="font-black text-white text-lg">Agro</span>
                  <span className="font-black text-emerald-200 text-lg">Lens</span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-xl text-white/80 active:bg-white/20"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav menu mobile — todos os grupos */}
            <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 pb-6">
              {NAV_GROUPS.map((grupo) => (
                <div key={grupo.label} className="mb-2">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 py-1">{grupo.label}</p>
                  {grupo.items.map((item) => {
                    const isActive = currentPageName === item.page;
                    return (
                      <Link
                        key={item.page}
                        to={createPageUrl(item.page)}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150 mb-0.5",
                          isActive
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-sm"
                            : "text-slate-700 hover:bg-slate-50 active:bg-slate-100"
                        )}
                      >
                        <item.icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "text-slate-400")} />
                        <span className="flex-1">{item.label}</span>
                        {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white/70" />}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* ═══ FAB OVERLAY ═══ */}
      {fabOpen && (
        <div className="lg:hidden fixed inset-0 z-40" onClick={() => setFabOpen(false)} />
      )}

      {/* ═══ FAB AÇÕES RÁPIDAS ═══ */}
      {fabOpen && (
        <div className="lg:hidden fixed bottom-16 right-3 z-50 flex flex-col items-end gap-2">
          {FAB_ACTIONS.map((action) => (
            <button
              key={action.page + action.label}
              onClick={() => handleFabAction(action.page)}
              className={cn(
                "flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-2xl text-white text-sm font-semibold shadow-xl active:scale-95 transition-transform border border-white/20",
                action.color
              )}
            >
              <action.icon className="w-4 h-4" />
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* ═══ MOBILE BOTTOM NAV — compacta ═══ */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
        aria-label="Navegação rápida"
      >
        <div className="flex items-end justify-around px-2 pt-1.5 pb-2" style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}>
          {BOTTOM_NAV.slice(0, 2).map((item) => {
            const isActive = currentPageName === item.page;
            return (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl min-w-[52px] transition-all active:scale-95",
                  isActive ? "text-emerald-600" : "text-slate-400"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "text-emerald-600")} />
                <span className="text-[9px] font-medium leading-tight">{item.label}</span>
                {isActive && <span className="w-3 h-0.5 rounded-full bg-emerald-500" />}
              </Link>
            );
          })}

          {/* FAB central elevado */}
          <div className="flex flex-col items-center -mt-5 px-2">
            <button
              onClick={() => setFabOpen(!fabOpen)}
              aria-label="Ações rápidas"
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-95 border-2 border-white",
                fabOpen ? "bg-slate-700" : "bg-gradient-to-br from-emerald-500 to-teal-600"
              )}
            >
              <Plus className={cn("w-6 h-6 text-white transition-transform", fabOpen && "rotate-45")} style={{ transition: "transform 0.2s" }} />
            </button>
            <span className="text-[9px] text-slate-400 font-medium mt-0.5">Ações</span>
          </div>

          {BOTTOM_NAV.slice(2).map((item) => {
            const isActive = currentPageName === item.page;
            return (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl min-w-[52px] transition-all active:scale-95",
                  isActive ? "text-emerald-600" : "text-slate-400"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "text-emerald-600")} />
                <span className="text-[9px] font-medium leading-tight">{item.label}</span>
                {isActive && <span className="w-3 h-0.5 rounded-full bg-emerald-500" />}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* ═══ MAIN CONTENT ═══ */}
      <main className="lg:pl-60 pt-[52px] lg:pt-0 pb-20 lg:pb-0 min-h-screen">
        {children}
      </main>

      <OfflineIndicator />
      <AssistenteFlutuante />
      <TarefasNotificacoes />
    </div>
  );
}