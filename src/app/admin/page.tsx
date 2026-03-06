"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/context/ContentContext";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  FolderOpen,
  Phone,
  Settings,
  LogOut,
  Save,
  RotateCcw,
  Menu,
  X,
  ChevronLeft,
  Plus,
  Trash2,
  Edit2,
  Eye,
  Lock,
  Shirt,
  Home,
  Camera,
  Palette,
  Upload,
  Type,
  Loader2,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Mail,
  Clock,
  CheckCheck,
  Tag,
  Zap,
  Star,
} from "lucide-react";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

// Tabs disponibles
const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "messages", label: "Mensajes", icon: MessageSquare },
  { id: "design", label: "Diseño", icon: Palette },
  { id: "textil", label: "Textil", icon: Shirt },
  { id: "gallery", label: "Galeria Textil", icon: Camera },
  { id: "stockDesigns", label: "Poleras Stock", icon: Tag },
  { id: "portfolio", label: "Portfolio", icon: FolderOpen },
  { id: "contact", label: "Contacto", icon: Phone },
  { id: "settings", label: "Ajustes", icon: Settings },
];

export default function AdminPage() {
  const {
    content,
    isAuthenticated,
    isSaving,
    hasUnsavedChanges,
    login,
    logout,
    updateContent,
    updateHero,
    updateTextilHero,
    updateTextilPricing,
    updateContact,
    updateWelcome,
    updateDesign,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    addStockDesign,
    updateStockDesign,
    deleteStockDesign,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    resetToDefault,
    saveToServer,
  } = useContent();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  // Login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setLoginError("Credenciales incorrectas");
    }
  };

  const [publishStatus, setPublishStatus] = useState<{
    type: "success" | "error" | "info" | null;
    message: string;
  }>({ type: null, message: "" });

  const showSaveMessage = () => {
    setSaveMessage("Cambios guardados localmente");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleSaveToServer = async () => {
    const result = await saveToServer();
    setPublishStatus({
      type: result.success ? "success" : "error",
      message: result.message,
    });
    setTimeout(() => setPublishStatus({ type: null, message: "" }), 5000);
  };

  const handleReset = () => {
    if (window.confirm("Restaurar todo el contenido a los valores por defecto?")) {
      resetToDefault();
      showSaveMessage();
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="admin-card p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-brand to-brand-dark rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Panel de Administracion</h1>
              <p className="text-gray-400 mt-2">DMC Projects</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Usuario</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="admin-input w-full"
                  placeholder="Usuario"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Contrasena</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-input w-full"
                  placeholder="Contrasena"
                />
              </div>

              {loginError && (
                <p className="text-red-500 text-sm">{loginError}</p>
              )}

              <button type="submit" className="admin-btn w-full">
                Iniciar Sesion
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside
        className={`admin-sidebar fixed lg:static inset-y-0 left-0 z-50 transform transition-all duration-300 flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } ${isCollapsed ? "lg:w-16" : "lg:w-64"} w-64`}
      >
        <div className={`p-4 flex-1 overflow-y-auto`}>
          <div className={`flex items-center mb-6 ${isCollapsed ? "lg:justify-center" : "justify-between"}`}>
            {!isCollapsed && (
              <div className="hidden lg:block">
                <h2 className="text-lg font-bold text-white">DMC Admin</h2>
                <p className="text-xs text-gray-500">Panel de Control</p>
              </div>
            )}
            <div className={`flex items-center gap-2 ${isCollapsed ? "" : ""}`}>
              <button
                onClick={() => setIsCollapsed((c) => !c)}
                className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                title={isCollapsed ? "Expandir sidebar" : "Colapsar sidebar"}
              >
                <ChevronLeft size={18} className={`transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} />
              </button>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            {!isCollapsed && (
              <div className="lg:hidden">
                <h2 className="text-lg font-bold text-white">DMC Admin</h2>
              </div>
            )}
          </div>

          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                title={isCollapsed ? tab.label : undefined}
                className={`w-full flex items-center gap-3 rounded-lg transition-all ${
                  isCollapsed ? "lg:justify-center lg:px-0 lg:py-3 px-4 py-3" : "px-4 py-2.5"
                } ${
                  activeTab === tab.id
                    ? "bg-brand text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon size={18} className="flex-shrink-0" />
                <span className={`text-sm ${isCollapsed ? "lg:hidden" : ""}`}>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className={`p-3 border-t border-white/10`}>
          <button
            onClick={logout}
            title={isCollapsed ? "Cerrar Sesion" : undefined}
            className={`w-full flex items-center gap-3 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-all ${
              isCollapsed ? "lg:justify-center lg:px-0 lg:py-3 px-4 py-3" : "px-4 py-2.5"
            }`}
          >
            <LogOut size={18} className="flex-shrink-0" />
            <span className={`text-sm ${isCollapsed ? "lg:hidden" : ""}`}>Cerrar Sesion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur border-b border-white/10 px-4 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white"
              >
                <Menu size={24} />
              </button>
              <h1 className="text-base font-semibold text-white">
                {tabs.find((t) => t.id === activeTab)?.label}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {/* Mensajes de estado */}
              {saveMessage && (
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-green-500 text-sm"
                >
                  {saveMessage}
                </motion.span>
              )}
              {publishStatus.type && (
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className={`text-sm flex items-center gap-2 ${
                    publishStatus.type === "success"
                      ? "text-green-500"
                      : publishStatus.type === "error"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {publishStatus.type === "success" ? (
                    <CheckCircle size={16} />
                  ) : publishStatus.type === "error" ? (
                    <AlertCircle size={16} />
                  ) : null}
                  {publishStatus.message}
                </motion.span>
              )}

              {/* Indicador de cambios sin guardar */}
              {hasUnsavedChanges && (
                <span className="text-yellow-500 text-sm flex items-center gap-1">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                  Cambios sin guardar
                </span>
              )}

              {/* Boton Guardar - Principal para VPS */}
              <button
                onClick={handleSaveToServer}
                disabled={isSaving}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white hover:bg-brand-dark transition-colors disabled:opacity-50"
              >
                {isSaving ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                {isSaving ? "Guardando..." : "Guardar Cambios"}
              </button>

              <a
                href="/"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <Eye size={18} />
                Ver Sitio
              </a>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "dashboard" && (
                <DashboardTab content={content} />
              )}
              {activeTab === "messages" && (
                <MessagesTab />
              )}
              {activeTab === "design" && (
                <DesignTab
                  content={content}
                  updateDesign={updateDesign}
                />
              )}
              {activeTab === "welcome" && (
                <WelcomeTab
                  content={content}
                  updateWelcome={updateWelcome}
                />
              )}
              {activeTab === "hero" && (
                <HeroTab
                  content={content}
                  updateHero={updateHero}
                />
              )}
              {activeTab === "textil" && (
                <TextilTab
                  content={content}
                  updateTextilHero={updateTextilHero}
                  updateTextilPricing={updateTextilPricing}
                  updateContent={updateContent}
                />
              )}
              {activeTab === "gallery" && (
                <GalleryTab
                  content={content}
                  addGalleryItem={addGalleryItem}
                  updateGalleryItem={updateGalleryItem}
                  deleteGalleryItem={deleteGalleryItem}
                  onSave={showSaveMessage}
                />
              )}
              {activeTab === "stockDesigns" && (
                <StockDesignsTab
                  content={content}
                  addStockDesign={addStockDesign}
                  updateStockDesign={updateStockDesign}
                  deleteStockDesign={deleteStockDesign}
                  onSave={showSaveMessage}
                />
              )}
              {activeTab === "portfolio" && (
                <PortfolioTab
                  content={content}
                  addPortfolioItem={addPortfolioItem}
                  updatePortfolioItem={updatePortfolioItem}
                  deletePortfolioItem={deletePortfolioItem}
                  onSave={showSaveMessage}
                />
              )}
              {activeTab === "contact" && (
                <ContactTab
                  content={content}
                  updateContact={updateContact}
                />
              )}
              {activeTab === "settings" && (
                <SettingsTab onReset={handleReset} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

// Dashboard Tab
function DashboardTab({ content }: any) {
  const [visits, setVisits] = useState<{ count: number; lastUpdated: string } | null>(null);
  const [loadingVisits, setLoadingVisits] = useState(true);

  useEffect(() => {
    fetch("/api/visits")
      .then((res) => res.json())
      .then((data) => {
        setVisits(data);
        setLoadingVisits(false);
      })
      .catch(() => setLoadingVisits(false));
  }, []);

  const stats = [
    {
      label: "Visitas Totales",
      value: loadingVisits ? "..." : visits?.count || 0,
      icon: Eye,
      color: "text-brand",
      bg: "bg-brand/10",
      trend: "+12%",
      trendUp: true,
    },
    {
      label: "Servicios Textil",
      value: content.textilServices?.length || 0,
      icon: Shirt,
      color: "text-[#ff0040]",
      bg: "bg-[#ff0040]/10",
    },
    {
      label: "Proyectos Portfolio",
      value: content.portfolio?.length || 0,
      icon: FolderOpen,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
  ];

  const portfolioTextil = content.portfolio?.filter((p: any) => p.type === "textil").length || 0;

  return (
    <div className="space-y-6">
      {/* Bienvenida */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="admin-card p-6 bg-gradient-to-r from-brand/20 to-transparent border-brand/30"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Bienvenido al Panel de Control</h2>
            <p className="text-gray-400">
              Gestiona el contenido de tu sitio web desde aqui. Ultima actualizacion:{" "}
              {visits?.lastUpdated
                ? new Date(visits.lastUpdated).toLocaleDateString("es-CL", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "N/A"}
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-500 text-sm font-medium">Sistema Operativo</span>
          </div>
        </div>
      </motion.div>

      {/* Estadisticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="admin-card p-6 hover:border-white/20 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                {stat.trend && (
                  <p className={`text-xs mt-1 ${stat.trendUp ? "text-green-500" : "text-red-500"}`}>
                    {stat.trend} vs mes anterior
                  </p>
                )}
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Grid de información */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Informacion del Sitio */}
        <div className="admin-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-brand" />
            Informacion del Sitio
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-gray-400">Nombre:</span>
              <span className="text-white font-medium">{content.siteName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-gray-400">Tagline:</span>
              <span className="text-white font-medium text-sm text-right max-w-[180px] truncate">
                {content.siteTagline}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-gray-400">Email:</span>
              <span className="text-white font-medium text-sm">{content.contact.email}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400">Telefono:</span>
              <span className="text-white font-medium text-sm">{content.contact.phone}</span>
            </div>
          </div>
        </div>

        {/* Portfolio Textil */}
        <div className="admin-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-brand" />
            Portfolio Textil
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff0040]" />
                <span className="text-gray-400 text-sm">Textil DTF</span>
              </div>
              <span className="text-xl font-bold text-white">{portfolioTextil}</span>
            </div>
          </div>
        </div>

        {/* Galeria Stats */}
        <div className="admin-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Camera className="w-5 h-5 text-brand" />
            Contenido Multimedia
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <span className="text-white text-sm font-medium">Galeria Textil</span>
                  <p className="text-xs text-gray-500">Imagenes de productos</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-white">
                {content.textilGallery?.length || 0}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <span className="text-white text-sm font-medium">Total Proyectos</span>
                  <p className="text-xs text-gray-500">En portfolio</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-white">
                {content.portfolio?.length || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Accesos rapidos mejorados */}
      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Accesos Rapidos</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <a
            href="/"
            target="_blank"
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-br from-brand/20 to-brand/5 border border-brand/20 hover:border-brand/40 transition-all text-center group"
          >
            <Eye className="w-6 h-6 text-brand group-hover:scale-110 transition-transform" />
            <span className="text-sm text-white">Ver Sitio</span>
          </a>
          <a
            href="/"
            target="_blank"
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-br from-[#ff0040]/20 to-[#ff0040]/5 border border-[#ff0040]/20 hover:border-[#ff0040]/40 transition-all text-center group"
          >
            <Shirt className="w-6 h-6 text-[#ff0040] group-hover:scale-110 transition-transform" />
            <span className="text-sm text-white">Textil</span>
          </a>
          <a
            href="/contacto"
            target="_blank"
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-all text-center group"
          >
            <Phone className="w-6 h-6 text-purple-500 group-hover:scale-110 transition-transform" />
            <span className="text-sm text-white">Contacto</span>
          </a>
          <button
            onClick={() => window.location.reload()}
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/30 transition-all text-center group"
          >
            <RotateCcw className="w-6 h-6 text-gray-400 group-hover:scale-110 group-hover:rotate-180 transition-all duration-500" />
            <span className="text-sm text-white">Recargar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Messages Tab - Para ver mensajes de contacto
function MessagesTab() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => {
        if (data.messages) {
          setMessages(data.messages.reverse()); // Más recientes primero
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const markAsRead = async (index: number) => {
    try {
      await fetch("/api/messages", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index, read: true }),
      });
      setMessages((prev) =>
        prev.map((m, i) => (i === index ? { ...m, read: true } : m))
      );
    } catch (err) {
      console.error("Error al marcar como leído:", err);
    }
  };

  const deleteMessage = async (index: number) => {
    if (!window.confirm("¿Eliminar este mensaje?")) return;
    try {
      await fetch("/api/messages", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ index }),
      });
      setMessages((prev) => prev.filter((_, i) => i !== index));
      if (selectedMessage && messages[index] === selectedMessage) {
        setSelectedMessage(null);
      }
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  const topicLabels: Record<string, string> = {
    textil: "Textil DTF",
    general: "General",
  };

  const topicColors: Record<string, string> = {
    textil: "bg-[#ff0040]/20 text-[#ff0040]",
    general: "bg-blue-500/20 text-blue-500",
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-brand" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header con estadisticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="admin-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-brand" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{messages.length}</p>
              <p className="text-sm text-gray-400">Total mensajes</p>
            </div>
          </div>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <Mail className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{unreadCount}</p>
              <p className="text-sm text-gray-400">Sin leer</p>
            </div>
          </div>
        </div>
        <div className="admin-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
              <CheckCheck className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {messages.length - unreadCount}
              </p>
              <p className="text-sm text-gray-400">Leídos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de mensajes */}
      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Mensajes de Contacto
        </h3>

        {messages.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>No hay mensajes todavía</p>
            <p className="text-sm mt-2">
              Los mensajes enviados desde el formulario aparecerán aquí
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  !msg.read
                    ? "bg-brand/5 border-brand/30 hover:border-brand/50"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                } ${selectedMessage === msg ? "ring-2 ring-brand" : ""}`}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (!msg.read) markAsRead(index);
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {!msg.read && (
                        <span className="w-2 h-2 bg-brand rounded-full flex-shrink-0" />
                      )}
                      <span className="font-medium text-white truncate">
                        {msg.name}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-xs ${
                          topicColors[msg.topic] || topicColors.general
                        }`}
                      >
                        {topicLabels[msg.topic] || msg.topic}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{msg.email}</p>
                    <p className="text-sm text-gray-300 mt-2 line-clamp-2">
                      {msg.message}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {msg.timestamp
                        ? new Date(msg.timestamp).toLocaleDateString("es-CL", {
                            day: "numeric",
                            month: "short",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteMessage(index);
                      }}
                      className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Detalle del mensaje seleccionado */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="admin-card p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {selectedMessage.name}
                </h3>
                <p className="text-sm text-gray-400">{selectedMessage.email}</p>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-white/5 rounded-lg">
              {selectedMessage.phone && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Teléfono</p>
                  <a
                    href={`tel:${selectedMessage.phone}`}
                    className="text-brand hover:underline"
                  >
                    {selectedMessage.phone}
                  </a>
                </div>
              )}
              {selectedMessage.company && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Empresa</p>
                  <p className="text-white">{selectedMessage.company}</p>
                </div>
              )}
              {selectedMessage.garment && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Prenda</p>
                  <p className="text-white">{selectedMessage.garment}</p>
                </div>
              )}
              {selectedMessage.quantity && (
                <div>
                  <p className="text-xs text-gray-500 mb-1">Cantidad</p>
                  <p className="text-white">{selectedMessage.quantity}</p>
                </div>
              )}
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Mensaje</p>
              <p className="text-gray-200 whitespace-pre-wrap bg-white/5 p-4 rounded-lg">
                {selectedMessage.message}
              </p>
            </div>

            <div className="flex gap-3">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: Contacto DMC Projects`}
                className="admin-btn"
              >
                <Mail className="w-4 h-4 mr-2" />
                Responder por Email
              </a>
              {selectedMessage.phone && (
                <a
                  href={`https://wa.me/${selectedMessage.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  className="px-4 py-2 rounded-lg bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Design Tab
function DesignTab({ content, updateDesign }: any) {
  const [design, setDesign] = useState(content.design || {
    logo: '/logo.png',
    fontFamily: 'Inter',
    primaryColor: '#3b82f6',
    secondaryColor: '#10b981',
    accentColor: '#ff0040',
  });
  const isFirstRender = useRef(true);
  const lastContextValue = useRef(JSON.stringify(content.design));

  useEffect(() => {
    if (content.design) {
      const currentContextStr = JSON.stringify(content.design);
      if (currentContextStr !== lastContextValue.current) {
        lastContextValue.current = currentContextStr;
        setDesign(content.design);
      }
    }
  }, [content.design]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      applyDesignChanges(design);
      return;
    }
    const designStr = JSON.stringify(design);
    if (designStr !== lastContextValue.current) {
      lastContextValue.current = designStr;
      updateDesign(design);
      applyDesignChanges(design);
    }
  }, [design, updateDesign]);

  const applyDesignChanges = (designData: any) => {
    // Aplicar fuente
    document.documentElement.style.setProperty('--font-family', designData.fontFamily);

    // Aplicar colores
    document.documentElement.style.setProperty('--color-primary', designData.primaryColor);
    document.documentElement.style.setProperty('--color-secondary', designData.secondaryColor);
    document.documentElement.style.setProperty('--color-accent', designData.accentColor);
  };

  const fontOptions = [
    { value: 'Inter', label: 'Inter (Default)' },
    { value: 'Poppins', label: 'Poppins' },
    { value: 'Montserrat', label: 'Montserrat' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Lato', label: 'Lato' },
    { value: 'Raleway', label: 'Raleway' },
    { value: 'Playfair Display', label: 'Playfair Display' },
  ];

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Endpoint dedicado para logo - siempre guarda como /logo.png
      const response = await fetch('/api/logo', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al subir el archivo');
      }

      // Actualizar estado con la URL retornada (incluye cache buster)
      const newDesign = { ...design, logo: data.url };
      setDesign(newDesign);
    } catch (error: any) {
      setUploadError(error.message || 'Error al subir el archivo');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Logo */}
      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Upload className="w-5 h-5 text-brand" />
          Logo del Sitio
        </h3>
        <div className="space-y-4">
          {/* Opcion 1: Subir archivo */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Subir Logo desde tu PC</label>
            <div className="flex gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/gif,image/webp,image/svg+xml"
                onChange={handleFileUpload}
                className="hidden"
                id="logo-upload"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2 px-4 py-3 bg-brand/20 text-brand border border-brand/30 rounded-lg hover:bg-brand/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin" />
                    Subiendo...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    Seleccionar Archivo
                  </>
                )}
              </button>
              <span className="text-xs text-gray-500 flex items-center">
                PNG, JPG, GIF, WebP, SVG (max 50MB)
              </span>
            </div>
            {uploadError && (
              <p className="text-red-500 text-sm mt-2">{uploadError}</p>
            )}
          </div>

          {/* Separador */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-gray-500 text-sm">o usar URL</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Opcion 2: URL manual */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">URL del Logo/Icono</label>
            <input
              type="text"
              value={design.logo}
              onChange={(e) => setDesign({ ...design, logo: e.target.value })}
              className="admin-input w-full"
              placeholder="https://... o /uploads/logo.png"
            />
            <p className="text-xs text-gray-500 mt-1">
              Formato recomendado: PNG transparente de 200x60px
            </p>
          </div>

          {/* Vista previa del logo */}
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-sm text-gray-400 mb-3">Vista Previa del Logo:</p>
            <div className="grid grid-cols-2 gap-4">
              {/* Fondo claro */}
              <div className="bg-white p-6 rounded-lg flex items-center justify-center min-h-[100px]">
                {design.logo ? (
                  <img
                    src={design.logo}
                    alt="Logo preview light"
                    className="max-h-16 max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <p className="text-gray-400 text-sm">Sin logo</p>
                )}
              </div>
              {/* Fondo oscuro */}
              <div className="bg-black p-6 rounded-lg flex items-center justify-center min-h-[100px]">
                {design.logo ? (
                  <img
                    src={design.logo}
                    alt="Logo preview dark"
                    className="max-h-16 max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <p className="text-gray-500 text-sm">Sin logo</p>
                )}
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Izquierda: fondo claro | Derecha: fondo oscuro
            </p>
          </div>
        </div>
      </div>

      {/* Tipografia */}
      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Type className="w-5 h-5 text-brand" />
          Tipografía del Sitio
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Fuente Principal (Aplica a todo el sitio)
            </label>
            <select
              value={design.fontFamily}
              onChange={(e) => setDesign({ ...design, fontFamily: e.target.value })}
              className="admin-input w-full text-lg"
              style={{ fontFamily: design.fontFamily }}
            >
              {fontOptions.map(font => (
                <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                  {font.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              💡 La fuente seleccionada se aplicará inmediatamente al guardar
            </p>
          </div>

          {/* Vista previa de la fuente */}
          <div className="p-4 bg-white/5 rounded-lg border border-white/10">
            <p className="text-sm text-gray-400 mb-3">Vista Previa de "{design.fontFamily}":</p>
            <div className="space-y-3 bg-gradient-to-br from-white/5 to-white/10 p-6 rounded-lg">
              <p className="text-3xl font-bold text-white" style={{ fontFamily: design.fontFamily }}>
                DMC Projects
              </p>
              <p className="text-xl text-white" style={{ fontFamily: design.fontFamily }}>
                Personalización textil DTF con calidad premium
              </p>
              <p className="text-base text-gray-300" style={{ fontFamily: design.fontFamily }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fuente aplicada a todo el contenido del sitio web.
              </p>
              <div className="flex gap-2 text-sm" style={{ fontFamily: design.fontFamily }}>
                <span className="px-3 py-1 bg-brand text-white rounded">Botón</span>
                <span className="text-gray-400">Números: 0123456789</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Colores */}
      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Palette className="w-5 h-5 text-brand" />
          Esquema de Colores
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Color Primario */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Color Primario</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={design.primaryColor}
                onChange={(e) => setDesign({ ...design, primaryColor: e.target.value })}
                className="w-16 h-12 rounded-lg border border-white/20 cursor-pointer"
              />
              <input
                type="text"
                value={design.primaryColor}
                onChange={(e) => setDesign({ ...design, primaryColor: e.target.value })}
                className="admin-input flex-1"
                placeholder="#3b82f6"
              />
            </div>
            <div className="mt-2 p-3 rounded-lg" style={{ backgroundColor: design.primaryColor }}>
              <p className="text-white text-sm font-medium">Ejemplo de texto</p>
            </div>
          </div>

          {/* Color Secundario */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Color Secundario</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={design.secondaryColor}
                onChange={(e) => setDesign({ ...design, secondaryColor: e.target.value })}
                className="w-16 h-12 rounded-lg border border-white/20 cursor-pointer"
              />
              <input
                type="text"
                value={design.secondaryColor}
                onChange={(e) => setDesign({ ...design, secondaryColor: e.target.value })}
                className="admin-input flex-1"
                placeholder="#10b981"
              />
            </div>
            <div className="mt-2 p-3 rounded-lg" style={{ backgroundColor: design.secondaryColor }}>
              <p className="text-white text-sm font-medium">Ejemplo de texto</p>
            </div>
          </div>

          {/* Color Acento */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Color Acento (Textil)</label>
            <div className="flex gap-3">
              <input
                type="color"
                value={design.accentColor}
                onChange={(e) => setDesign({ ...design, accentColor: e.target.value })}
                className="w-16 h-12 rounded-lg border border-white/20 cursor-pointer"
              />
              <input
                type="text"
                value={design.accentColor}
                onChange={(e) => setDesign({ ...design, accentColor: e.target.value })}
                className="admin-input flex-1"
                placeholder="#ff0040"
              />
            </div>
            <div className="mt-2 p-3 rounded-lg" style={{ backgroundColor: design.accentColor }}>
              <p className="text-white text-sm font-medium">Ejemplo de texto</p>
            </div>
          </div>
        </div>
      </div>

      {/* Presets de colores */}
      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Esquemas Predefinidos</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => setDesign({
              ...design,
              primaryColor: '#3b82f6',
              secondaryColor: '#10b981',
              accentColor: '#ff0040',
            })}
            className="p-4 rounded-lg border border-white/10 hover:border-white/30 transition-colors"
          >
            <div className="flex gap-2 mb-2">
              <div className="w-full h-8 rounded" style={{ backgroundColor: '#3b82f6' }}></div>
              <div className="w-full h-8 rounded" style={{ backgroundColor: '#10b981' }}></div>
              <div className="w-full h-8 rounded" style={{ backgroundColor: '#ff0040' }}></div>
            </div>
            <p className="text-white text-sm">Default</p>
          </button>

          <button
            onClick={() => setDesign({
              ...design,
              primaryColor: '#8b5cf6',
              secondaryColor: '#06b6d4',
              accentColor: '#f59e0b',
            })}
            className="p-4 rounded-lg border border-white/10 hover:border-white/30 transition-colors"
          >
            <div className="flex gap-2 mb-2">
              <div className="w-full h-8 rounded" style={{ backgroundColor: '#8b5cf6' }}></div>
              <div className="w-full h-8 rounded" style={{ backgroundColor: '#06b6d4' }}></div>
              <div className="w-full h-8 rounded" style={{ backgroundColor: '#f59e0b' }}></div>
            </div>
            <p className="text-white text-sm">Moderno</p>
          </button>

          <button
            onClick={() => setDesign({
              ...design,
              primaryColor: '#0ea5e9',
              secondaryColor: '#22c55e',
              accentColor: '#ef4444',
            })}
            className="p-4 rounded-lg border border-white/10 hover:border-white/30 transition-colors"
          >
            <div className="flex gap-2 mb-2">
              <div className="w-full h-8 rounded" style={{ backgroundColor: '#0ea5e9' }}></div>
              <div className="w-full h-8 rounded" style={{ backgroundColor: '#22c55e' }}></div>
              <div className="w-full h-8 rounded" style={{ backgroundColor: '#ef4444' }}></div>
            </div>
            <p className="text-white text-sm">Vibrante</p>
          </button>

          <button
            onClick={() => setDesign({
              ...design,
              primaryColor: '#6366f1',
              secondaryColor: '#14b8a6',
              accentColor: '#ec4899',
            })}
            className="p-4 rounded-lg border border-white/10 hover:border-white/30 transition-colors"
          >
            <div className="flex gap-2 mb-2">
              <div className="w-full h-8 rounded" style={{ backgroundColor: '#6366f1' }}></div>
              <div className="w-full h-8 rounded" style={{ backgroundColor: '#14b8a6' }}></div>
              <div className="w-full h-8 rounded" style={{ backgroundColor: '#ec4899' }}></div>
            </div>
            <p className="text-white text-sm">Neon</p>
          </button>
        </div>
      </div>
    </div>
  );
}

// Welcome Tab
function WelcomeTab({ content, updateWelcome }: any) {
  const [welcome, setWelcome] = useState(content.welcome);
  const isFirstRender = useRef(true);
  const lastContextValue = useRef(JSON.stringify(content.welcome));

  // Sincronizar estado local cuando el contenido del contexto cambie (desde el servidor)
  useEffect(() => {
    const currentContextStr = JSON.stringify(content.welcome);
    if (currentContextStr !== lastContextValue.current) {
      lastContextValue.current = currentContextStr;
      setWelcome(content.welcome);
    }
  }, [content.welcome]);

  // Sincronizar cambios locales al contexto (cuando el usuario edita)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const welcomeStr = JSON.stringify(welcome);
    if (welcomeStr !== lastContextValue.current) {
      lastContextValue.current = welcomeStr;
      updateWelcome(welcome);
    }
  }, [welcome, updateWelcome]);

  const updateTextilCard = (field: string, value: string) => {
    setWelcome({
      ...welcome,
      textilCard: { ...welcome.textilCard, [field]: value },
    });
  };

  return (
    <div className="space-y-6">
      {/* Seccion Principal */}
      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Pagina de Bienvenida</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Titulo Principal</label>
            <input
              type="text"
              value={welcome.title}
              onChange={(e) => setWelcome({ ...welcome, title: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Subtitulo</label>
            <input
              type="text"
              value={welcome.subtitle}
              onChange={(e) => setWelcome({ ...welcome, subtitle: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Descripcion</label>
            <textarea
              value={welcome.description}
              onChange={(e) => setWelcome({ ...welcome, description: e.target.value })}
              className="admin-input w-full h-24 resize-none"
            />
          </div>

          <ImageUploadField
            value={welcome.backgroundImage}
            onChange={(url) => setWelcome({ ...welcome, backgroundImage: url })}
            label="Imagen de Fondo"
            placeholder="https://images.unsplash.com/..."
            helpText="Recomendado: Imagen panorámica 1920x1080"
            previewAspect="video"
          />
        </div>
      </div>

      {/* Tarjeta Textil */}
      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Shirt className="w-5 h-5 text-[#ff0040]" />
          Tarjeta Personalizacion Textil
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Titulo</label>
            <input
              type="text"
              value={welcome.textilCard.title}
              onChange={(e) => updateTextilCard("title", e.target.value)}
              className="admin-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Subtitulo</label>
            <input
              type="text"
              value={welcome.textilCard.subtitle}
              onChange={(e) => updateTextilCard("subtitle", e.target.value)}
              className="admin-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Descripcion</label>
            <textarea
              value={welcome.textilCard.description}
              onChange={(e) => updateTextilCard("description", e.target.value)}
              className="admin-input w-full h-20 resize-none"
            />
          </div>

          <ImageUploadField
            value={welcome.textilCard.image}
            onChange={(url) => updateTextilCard("image", url)}
            label="Imagen de la Tarjeta"
            placeholder="https://..."
            previewAspect="video"
          />

          <div>
            <label className="block text-sm text-gray-400 mb-2">Texto del Boton</label>
            <input
              type="text"
              value={welcome.textilCard.buttonText}
              onChange={(e) => updateTextilCard("buttonText", e.target.value)}
              className="admin-input w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Hero Tab
function HeroTab({ content, updateHero }: any) {
  const [hero, setHero] = useState(content.hero);
  const isFirstRender = useRef(true);
  const lastContextValue = useRef(JSON.stringify(content.hero));

  useEffect(() => {
    const currentContextStr = JSON.stringify(content.hero);
    if (currentContextStr !== lastContextValue.current) {
      lastContextValue.current = currentContextStr;
      setHero(content.hero);
    }
  }, [content.hero]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const heroStr = JSON.stringify(hero);
    if (heroStr !== lastContextValue.current) {
      lastContextValue.current = heroStr;
      updateHero(hero);
    }
  }, [hero, updateHero]);

  return (
    <div className="space-y-6">
      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Hero Principal (Home)</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Titulo Linea 1</label>
            <input
              type="text"
              value={hero.title1}
              onChange={(e) => setHero({ ...hero, title1: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Titulo Linea 2</label>
            <input
              type="text"
              value={hero.title2}
              onChange={(e) => setHero({ ...hero, title2: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Subtitulo</label>
            <input
              type="text"
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Descripcion</label>
            <textarea
              value={hero.description}
              onChange={(e) => setHero({ ...hero, description: e.target.value })}
              className="admin-input w-full h-24 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Catalog Editor
function CatalogEditor({ content, updateContent }: any) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newItem, setNewItem] = useState({ title: '', description: '', image: '', features: '', highlighted: false });
  const [editItem, setEditItem] = useState({ title: '', description: '', image: '', features: '', highlighted: false });

  const catalog = content.textilCatalog || [];

  const handleAdd = () => {
    if (!newItem.title.trim()) return;
    const item = {
      id: Date.now(),
      title: newItem.title,
      description: newItem.description,
      image: newItem.image,
      features: newItem.features.split(',').map((f: string) => f.trim()).filter((f: string) => f),
      highlighted: newItem.highlighted,
    };
    updateContent('textilCatalog', [...catalog, item]);
    setNewItem({ title: '', description: '', image: '', features: '', highlighted: false });
    setShowAddForm(false);
  };

  const handleDelete = (id: number) => {
    updateContent('textilCatalog', catalog.filter((c: any) => c.id !== id));
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditItem({
      title: item.title,
      description: item.description,
      image: item.image || '',
      features: (item.features || []).join(', '),
      highlighted: item.highlighted || false,
    });
  };

  const handleSaveEdit = () => {
    if (!editItem.title.trim() || editingId === null) return;
    const updated = catalog.map((c: any) => c.id === editingId ? {
      ...c,
      title: editItem.title,
      description: editItem.description,
      image: editItem.image,
      features: editItem.features.split(',').map((f: string) => f.trim()).filter((f: string) => f),
      highlighted: editItem.highlighted,
    } : c);
    updateContent('textilCatalog', updated);
    setEditingId(null);
  };

  return (
    <div className="admin-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Catalogo de Productos</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Agregar
        </button>
      </div>

      {/* Add Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Titulo</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Ej: Poleras Streetwear"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Tags (separados por coma)</label>
                <input
                  type="text"
                  value={newItem.features}
                  onChange={(e) => setNewItem({ ...newItem, features: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Oversize, Full Color, Urban"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Descripcion</label>
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                className="admin-input w-full h-20 resize-none"
                placeholder="Descripcion del producto..."
              />
            </div>
            <ImageUploadField
              value={newItem.image}
              onChange={(url: string) => setNewItem({ ...newItem, image: url })}
              label="Imagen del Producto"
              placeholder="https://..."
              previewAspect="video"
            />
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newItem.highlighted}
                  onChange={(e) => setNewItem({ ...newItem, highlighted: e.target.checked })}
                  className="w-4 h-4 rounded accent-[#ff0040]"
                />
                <span className="text-sm text-gray-400">Destacado (mas grande en el bento grid)</span>
              </label>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                disabled={!newItem.title.trim()}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white text-sm rounded-lg transition-colors"
              >
                Agregar Producto
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Items List */}
      <div className="space-y-4">
        {catalog.map((item: any) => (
          <div key={item.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
            {editingId === item.id ? (
              /* Edit Mode */
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Titulo</label>
                    <input
                      type="text"
                      value={editItem.title}
                      onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                      className="admin-input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Tags (separados por coma)</label>
                    <input
                      type="text"
                      value={editItem.features}
                      onChange={(e) => setEditItem({ ...editItem, features: e.target.value })}
                      className="admin-input w-full"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Descripcion</label>
                  <textarea
                    value={editItem.description}
                    onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                    className="admin-input w-full h-20 resize-none"
                  />
                </div>
                <ImageUploadField
                  value={editItem.image}
                  onChange={(url: string) => setEditItem({ ...editItem, image: url })}
                  label="Imagen del Producto"
                  placeholder="https://..."
                  previewAspect="video"
                />
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editItem.highlighted}
                      onChange={(e) => setEditItem({ ...editItem, highlighted: e.target.checked })}
                      className="w-4 h-4 rounded accent-[#ff0040]"
                    />
                    <span className="text-sm text-gray-400">Destacado</span>
                  </label>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleSaveEdit} className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors">
                    Guardar
                  </button>
                  <button onClick={() => setEditingId(null)} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors">
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <div className="flex items-start gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-white/5">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <Shirt className="w-8 h-8" />
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-white text-sm">{item.title}</h4>
                    {item.highlighted && (
                      <span className="px-2 py-0.5 bg-[#ff0040]/20 text-[#ff0040] text-[10px] font-bold rounded-full">DESTACADO</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1 mb-1">{item.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {(item.features || []).map((f: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 bg-white/5 text-gray-400 text-[10px] rounded-full">{f}</span>
                    ))}
                  </div>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => startEdit(item)}
                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {catalog.length === 0 && (
          <p className="text-center text-gray-500 text-sm py-8">No hay productos en el catalogo. Agrega uno para comenzar.</p>
        )}
      </div>
    </div>
  );
}

// Configurator Editor
function ConfiguratorEditor({ content, updateContent }: any) {
  const config = content.textilConfigurator || { products: [], colors: [], sizes: [] };

  const updateConfig = (data: any) => {
    updateContent('textilConfigurator', { ...config, ...data });
  };

  // Products
  const addProduct = () => {
    updateConfig({
      products: [...config.products, { id: Date.now(), nombre: '', imagen: '' }],
    });
  };

  const updateProduct = (id: number, field: string, value: string) => {
    updateConfig({
      products: config.products.map((p: any) => p.id === id ? { ...p, [field]: value } : p),
    });
  };

  const removeProduct = (id: number) => {
    updateConfig({ products: config.products.filter((p: any) => p.id !== id) });
  };

  // Colors
  const addColor = () => {
    updateConfig({
      colors: [...config.colors, { id: Date.now(), nombre: '', hex: '#000000' }],
    });
  };

  const updateColor = (id: number, field: string, value: string) => {
    updateConfig({
      colors: config.colors.map((c: any) => c.id === id ? { ...c, [field]: value } : c),
    });
  };

  const removeColor = (id: number) => {
    updateConfig({ colors: config.colors.filter((c: any) => c.id !== id) });
  };

  // Sizes
  const addSize = () => {
    updateConfig({ sizes: [...config.sizes, ''] });
  };

  const updateSize = (index: number, value: string) => {
    const sizes = [...config.sizes];
    sizes[index] = value;
    updateConfig({ sizes });
  };

  const removeSize = (index: number) => {
    updateConfig({ sizes: config.sizes.filter((_: any, i: number) => i !== index) });
  };

  return (
    <div className="admin-card p-6">
      <h3 className="text-lg font-semibold text-white mb-6">Configurador de Producto</h3>
      <p className="text-sm text-gray-500 mb-6">Opciones que el cliente puede elegir al personalizar su pedido.</p>

      {/* Products */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-semibold text-white">Productos</h4>
          <button
            onClick={addProduct}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>
        <div className="space-y-3">
          {config.products.map((p: any) => (
            <div key={p.id} className="flex flex-col sm:flex-row gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Nombre</label>
                <input
                  type="text"
                  value={p.nombre}
                  onChange={(e) => updateProduct(p.id, 'nombre', e.target.value)}
                  className="admin-input w-full"
                  placeholder="Ej: Polera"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Imagen</label>
                <ImageUploadField
                  value={p.imagen}
                  onChange={(url) => updateProduct(p.id, 'imagen', url)}
                  placeholder="URL de imagen o subir archivo"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => removeProduct(p.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-semibold text-white">Colores</h4>
          <button
            onClick={addColor}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>
        <div className="space-y-3">
          {config.colors.map((c: any) => (
            <div key={c.id} className="flex flex-col sm:flex-row gap-3 items-center p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="w-12">
                <input
                  type="color"
                  value={c.hex}
                  onChange={(e) => updateColor(c.id, 'hex', e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Nombre</label>
                <input
                  type="text"
                  value={c.nombre}
                  onChange={(e) => updateColor(c.id, 'nombre', e.target.value)}
                  className="admin-input w-full"
                  placeholder="Ej: Negro"
                />
              </div>
              <div className="w-32">
                <label className="block text-xs text-gray-500 mb-1">Hex</label>
                <input
                  type="text"
                  value={c.hex}
                  onChange={(e) => updateColor(c.id, 'hex', e.target.value)}
                  className="admin-input w-full"
                  placeholder="#000000"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => removeColor(c.id)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-semibold text-white">Tallas</h4>
          <button
            onClick={addSize}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {config.sizes.map((size: string, index: number) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10">
              <input
                type="text"
                value={size}
                onChange={(e) => updateSize(index, e.target.value)}
                className="admin-input w-20 text-center"
                placeholder="XL"
              />
              <button
                onClick={() => removeSize(index)}
                className="p-1 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Textil Tab
function TextilTab({ content, updateTextilHero, updateTextilPricing, updateContent }: any) {
  const [hero, setHero] = useState(content.textilHero);
  const _defaultPricing = {
    adultos: [
      { producto: 'Polera Dogo Premium Hombre', talla: 'S-2XL', precio: 12990 },
      { producto: 'Polera Piqué Monzha Mujer', talla: 'S-2XL', precio: 15000 },
      { producto: 'Polera Piqué Pegaso Premium Mujer', talla: 'S-2XL', precio: 16000 },
      { producto: 'Polera Piqué Tormo', talla: 'S-2XL', precio: 18000 },
      { producto: 'Polera Dogo Premium 3XL-4XL', talla: '3XL-4XL', precio: 13000 },
      { producto: 'Polera Piqué Monzha Hombre', talla: 'S-3XL', precio: 15500 },
      { producto: 'Polerón Canguro adulto', talla: 'S-XL', precio: 28990 },
      { producto: 'Polerón Canguro adulto', talla: 'XXL', precio: 30500 },
      { producto: 'Polerón Polo adulto', talla: 'S-XL', precio: 29000 },
      { producto: 'Polerón Polo adulto', talla: 'XXL', precio: 29990 },
    ],
    ninos: [
      { producto: 'Polera Dogo Premium Niño', talla: '3/4-11/12', precio: 12990 },
      { producto: 'Polerón Canguro niño', talla: '2-8', precio: 19500 },
      { producto: 'Polerón Canguro niño', talla: '10-16', precio: 20000 },
      { producto: 'Polerón Polo niño', talla: '2-8', precio: 21000 },
      { producto: 'Polerón Polo niño', talla: '10-16', precio: 21500 },
    ],
    cotizacion: ['Personalización Empresas', 'Tallas Especiales', 'Pedidos por Mayor'],
  };
  const _rawPricing = content.textilPricing;
  const [pricing, setPricing] = useState(
    (_rawPricing && Array.isArray(_rawPricing.adultos)) ? _rawPricing : _defaultPricing
  );
  const isFirstRender = useRef(true);
  const isFirstRenderPricing = useRef(true);
  const lastContextValue = useRef(JSON.stringify(content.textilHero));
  const lastPricingValue = useRef(JSON.stringify(content.textilPricing));

  useEffect(() => {
    const currentContextStr = JSON.stringify(content.textilHero);
    if (currentContextStr !== lastContextValue.current) {
      lastContextValue.current = currentContextStr;
      setHero(content.textilHero);
    }
  }, [content.textilHero]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const heroStr = JSON.stringify(hero);
    if (heroStr !== lastContextValue.current) {
      lastContextValue.current = heroStr;
      updateTextilHero(hero);
    }
  }, [hero, updateTextilHero]);

  useEffect(() => {
    if (!content.textilPricing) return;
    const currentStr = JSON.stringify(content.textilPricing);
    if (currentStr !== lastPricingValue.current) {
      lastPricingValue.current = currentStr;
      setPricing(content.textilPricing);
    }
  }, [content.textilPricing]);

  useEffect(() => {
    if (isFirstRenderPricing.current) {
      isFirstRenderPricing.current = false;
      return;
    }
    const pricingStr = JSON.stringify(pricing);
    if (pricingStr !== lastPricingValue.current) {
      lastPricingValue.current = pricingStr;
      updateTextilPricing(pricing);
    }
  }, [pricing, updateTextilPricing]);

  const updateProduct = (category: 'adultos' | 'ninos', index: number, field: string, value: string | number) => {
    setPricing((prev: any) => {
      const updated = [...prev[category]];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, [category]: updated };
    });
  };

  const addProduct = (category: 'adultos' | 'ninos') => {
    setPricing((prev: any) => ({
      ...prev,
      [category]: [...prev[category], { producto: '', talla: '', precio: 0 }],
    }));
  };

  const removeProduct = (category: 'adultos' | 'ninos', index: number) => {
    setPricing((prev: any) => ({
      ...prev,
      [category]: prev[category].filter((_: any, i: number) => i !== index),
    }));
  };

  const updateCotizacion = (index: number, value: string) => {
    setPricing((prev: any) => {
      const updated = [...prev.cotizacion];
      updated[index] = value;
      return { ...prev, cotizacion: updated };
    });
  };

  const addCotizacion = () => {
    setPricing((prev: any) => ({
      ...prev,
      cotizacion: [...prev.cotizacion, ''],
    }));
  };

  const removeCotizacion = (index: number) => {
    setPricing((prev: any) => ({
      ...prev,
      cotizacion: prev.cotizacion.filter((_: any, i: number) => i !== index),
    }));
  };

  const formatPrice = (precio: number) => {
    return `$${precio.toLocaleString('es-CL')}`;
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Seccion Textil DTF</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Titulo Linea 1</label>
            <input
              type="text"
              value={hero.title1}
              onChange={(e) => setHero({ ...hero, title1: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Titulo Linea 2</label>
            <input
              type="text"
              value={hero.title2}
              onChange={(e) => setHero({ ...hero, title2: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Subtitulo</label>
            <input
              type="text"
              value={hero.subtitle}
              onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Descripcion</label>
            <textarea
              value={hero.description}
              onChange={(e) => setHero({ ...hero, description: e.target.value })}
              className="admin-input w-full h-24 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Estadisticas Hero */}
      <div className="admin-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Estadisticas del Hero</h3>
          <button
            onClick={() => {
              const stats = [...(content.textilStats || []), { value: '', label: '', icon: 'Star' }];
              updateContent('textilStats', stats);
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>

        <div className="space-y-4">
          {(content.textilStats || []).map((stat: any, index: number) => {
            const iconOptions = [
              { value: 'Shirt', label: 'Polera', Icon: Shirt },
              { value: 'Zap', label: 'Rayo', Icon: Zap },
              { value: 'Palette', label: 'Paleta', Icon: Palette },
              { value: 'Star', label: 'Estrella', Icon: Star },
            ];
            return (
              <div key={index} className="flex flex-col sm:flex-row gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="w-20">
                  <label className="block text-xs text-gray-500 mb-1">Icono</label>
                  <select
                    value={stat.icon}
                    onChange={(e) => {
                      const stats = [...(content.textilStats || [])];
                      stats[index] = { ...stats[index], icon: e.target.value };
                      updateContent('textilStats', stats);
                    }}
                    className="admin-input w-full"
                  >
                    {iconOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="w-28">
                  <label className="block text-xs text-gray-500 mb-1">Valor</label>
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => {
                      const stats = [...(content.textilStats || [])];
                      stats[index] = { ...stats[index], value: e.target.value };
                      updateContent('textilStats', stats);
                    }}
                    className="admin-input w-full"
                    placeholder="50+"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Etiqueta</label>
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => {
                      const stats = [...(content.textilStats || [])];
                      stats[index] = { ...stats[index], label: e.target.value };
                      updateContent('textilStats', stats);
                    }}
                    className="admin-input w-full"
                    placeholder="Lavados garantizados"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      const stats = (content.textilStats || []).filter((_: any, i: number) => i !== index);
                      updateContent('textilStats', stats);
                    }}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Catalogo de Productos */}
      <CatalogEditor content={content} updateContent={updateContent} />

      {/* Configurador de Producto */}
      <ConfiguratorEditor content={content} updateContent={updateContent} />

      {/* Precios Adultos */}
      <div className="admin-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Precios Adultos</h3>
          <button
            onClick={() => addProduct('adultos')}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>

        <div className="space-y-4">
          {pricing.adultos.map((product: any, index: number) => (
            <div key={index} className="flex flex-col sm:flex-row gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Producto</label>
                <input
                  type="text"
                  value={product.producto}
                  onChange={(e) => updateProduct('adultos', index, 'producto', e.target.value)}
                  className="admin-input w-full"
                  placeholder="Ej: Polera Algodón"
                />
              </div>
              <div className="w-full sm:w-32">
                <label className="block text-xs text-gray-500 mb-1">Talla</label>
                <input
                  type="text"
                  value={product.talla}
                  onChange={(e) => updateProduct('adultos', index, 'talla', e.target.value)}
                  className="admin-input w-full"
                  placeholder="Ej: Hasta 2XL"
                />
              </div>
              <div className="w-full sm:w-32">
                <label className="block text-xs text-gray-500 mb-1">Precio</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={product.precio}
                    onChange={(e) => updateProduct('adultos', index, 'precio', parseInt(e.target.value) || 0)}
                    className="admin-input w-full"
                    placeholder="15990"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => removeProduct('adultos', index)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                  title="Eliminar producto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-end">
                <span className="text-xs text-gray-500 pb-2">{formatPrice(product.precio)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Precios Niños */}
      <div className="admin-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Precios Niños</h3>
          <button
            onClick={() => addProduct('ninos')}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>

        <div className="space-y-4">
          {pricing.ninos.map((product: any, index: number) => (
            <div key={index} className="flex flex-col sm:flex-row gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex-1">
                <label className="block text-xs text-gray-500 mb-1">Producto</label>
                <input
                  type="text"
                  value={product.producto}
                  onChange={(e) => updateProduct('ninos', index, 'producto', e.target.value)}
                  className="admin-input w-full"
                  placeholder="Ej: Polera Algodón"
                />
              </div>
              <div className="w-full sm:w-32">
                <label className="block text-xs text-gray-500 mb-1">Talla</label>
                <input
                  type="text"
                  value={product.talla}
                  onChange={(e) => updateProduct('ninos', index, 'talla', e.target.value)}
                  className="admin-input w-full"
                  placeholder="Ej: Hasta XS"
                />
              </div>
              <div className="w-full sm:w-32">
                <label className="block text-xs text-gray-500 mb-1">Precio</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={product.precio}
                    onChange={(e) => updateProduct('ninos', index, 'precio', parseInt(e.target.value) || 0)}
                    className="admin-input w-full"
                    placeholder="12990"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => removeProduct('ninos', index)}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                  title="Eliminar producto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-end">
                <span className="text-xs text-gray-500 pb-2">{formatPrice(product.precio)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Items de Cotización */}
      <div className="admin-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Items de Cotizacion</h3>
          <button
            onClick={addCotizacion}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar
          </button>
        </div>
        <p className="text-sm text-gray-500 mb-4">Servicios que requieren cotizacion personalizada (ej: Empresas, Tallas Especiales, Pedidos por Mayor)</p>

        <div className="space-y-3">
          {pricing.cotizacion.map((item: string, index: number) => (
            <div key={index} className="flex gap-3 items-center">
              <input
                type="text"
                value={item}
                onChange={(e) => updateCotizacion(index, e.target.value)}
                className="admin-input flex-1"
                placeholder="Ej: Personalización Empresas"
              />
              <button
                onClick={() => removeCotizacion(index)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                title="Eliminar"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Contact Tab
function ContactTab({ content, updateContact }: any) {
  const [contact, setContact] = useState(content.contact);
  const isFirstRender = useRef(true);
  const lastContextValue = useRef(JSON.stringify(content.contact));

  useEffect(() => {
    const currentContextStr = JSON.stringify(content.contact);
    if (currentContextStr !== lastContextValue.current) {
      lastContextValue.current = currentContextStr;
      setContact(content.contact);
    }
  }, [content.contact]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const contactStr = JSON.stringify(contact);
    if (contactStr !== lastContextValue.current) {
      lastContextValue.current = contactStr;
      updateContact(contact);
    }
  }, [contact, updateContact]);

  return (
    <div className="space-y-6">
      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Informacion de Contacto</h3>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Telefono</label>
            <input
              type="text"
              value={contact.phone}
              onChange={(e) => setContact({ ...contact, phone: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">WhatsApp (solo numeros)</label>
            <input
              type="text"
              value={contact.whatsapp}
              onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
              className="admin-input w-full"
              placeholder="56912345678"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Direccion</label>
            <input
              type="text"
              value={contact.address}
              onChange={(e) => setContact({ ...contact, address: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-2">Horario</label>
            <input
              type="text"
              value={contact.schedule}
              onChange={(e) => setContact({ ...contact, schedule: e.target.value })}
              className="admin-input w-full"
            />
          </div>
        </div>

        <h4 className="text-md font-semibold text-white mt-8 mb-4">Redes Sociales</h4>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Instagram URL</label>
            <input
              type="text"
              value={contact.instagram}
              onChange={(e) => setContact({ ...contact, instagram: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Facebook URL</label>
            <input
              type="text"
              value={contact.facebook}
              onChange={(e) => setContact({ ...contact, facebook: e.target.value })}
              className="admin-input w-full"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">LinkedIn URL</label>
            <input
              type="text"
              value={contact.linkedin}
              onChange={(e) => setContact({ ...contact, linkedin: e.target.value })}
              className="admin-input w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Settings Tab
function SettingsTab({ onReset }: any) {
  return (
    <div className="space-y-6">
      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6">Ajustes del Sistema</h3>

        <div className="p-4 border border-white/10 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">Restaurar Valores por Defecto</h4>
              <p className="text-sm text-gray-400 mt-1">
                Esto restaurara todo el contenido a los valores originales. Esta accion no se puede deshacer.
              </p>
            </div>
            <button
              onClick={onReset}
              className="px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors flex items-center gap-2"
            >
              <RotateCcw size={18} />
              Restaurar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Gallery Tab
function GalleryTab({ content, addGalleryItem, updateGalleryItem, deleteGalleryItem, onSave }: any) {
  const [newUrl, setNewUrl] = useState("");
  const [newCaption, setNewCaption] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editUrl, setEditUrl] = useState("");
  const [editCaption, setEditCaption] = useState("");

  const handleAdd = () => {
    if (newUrl.trim()) {
      addGalleryItem({ url: newUrl.trim(), caption: newCaption.trim() || "Sin descripcion" });
      setNewUrl("");
      setNewCaption("");
      onSave();
    }
  };

  const handleStartEdit = (item: any) => {
    setEditingId(item.id);
    setEditUrl(item.url);
    setEditCaption(item.caption);
  };

  const handleSaveEdit = () => {
    if (editingId && editUrl.trim()) {
      updateGalleryItem(editingId, { url: editUrl.trim(), caption: editCaption.trim() });
      setEditingId(null);
      onSave();
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Eliminar esta imagen de la galeria?")) {
      deleteGalleryItem(id);
      onSave();
    }
  };

  return (
    <div className="space-y-6">
      {/* Agregar nueva imagen */}
      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Plus className="w-5 h-5 text-[#ff0040]" />
          Agregar Imagen a la Galeria
        </h3>

        <div className="space-y-4">
          <ImageUploadField
            value={newUrl}
            onChange={setNewUrl}
            label="Imagen de la Galeria"
            placeholder="https://images.unsplash.com/..."
            previewAspect="video"
          />

          <div>
            <label className="block text-sm text-gray-400 mb-2">Descripcion / Caption</label>
            <input
              type="text"
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              className="admin-input w-full"
              placeholder="Polera Streetwear Personalizada"
            />
          </div>

          <button onClick={handleAdd} className="admin-btn">
            <Plus size={18} className="inline mr-2" />
            Agregar a Galeria
          </button>
        </div>
      </div>

      {/* Lista de imagenes */}
      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Camera className="w-5 h-5 text-[#ff0040]" />
          Imagenes de la Galeria ({content.textilGallery?.length || 0})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.textilGallery?.map((item: any) => (
            <div
              key={item.id}
              className="relative group bg-white/5 rounded-lg overflow-hidden border border-white/10"
            >
              {editingId === item.id ? (
                /* Modo edicion */
                <div className="p-4 space-y-3">
                  <ImageUploadField
                    value={editUrl}
                    onChange={setEditUrl}
                    label="Imagen"
                    showPreview={false}
                  />
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Caption</label>
                    <input
                      type="text"
                      value={editCaption}
                      onChange={(e) => setEditCaption(e.target.value)}
                      className="admin-input w-full text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 px-3 py-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-colors text-sm"
                    >
                      <Save size={14} className="inline mr-1" />
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 px-3 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 transition-colors text-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                /* Vista normal */
                <>
                  <div className="aspect-video relative bg-gray-800">
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    {/* Overlay con acciones */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#ff0040] transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-white text-sm font-medium truncate">{item.caption}</p>
                    <p className="text-gray-500 text-xs truncate mt-1">{item.url}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {(!content.textilGallery || content.textilGallery.length === 0) && (
          <div className="text-center py-12 text-gray-500">
            <Camera className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No hay imagenes en la galeria</p>
            <p className="text-sm mt-2">Agrega tu primera imagen arriba</p>
          </div>
        )}
      </div>

      {/* Nota informativa */}
      <div className="admin-card p-4 border-[#ff0040]/30">
        <p className="text-sm text-gray-400">
          <strong className="text-[#ff0040]">Tip:</strong> Puedes usar URLs de servicios como Unsplash, Imgur, o cualquier URL de imagen publica.
          Las imagenes se mostraran en la galeria de la seccion Textil.
        </p>
      </div>
    </div>
  );
}

// Stock Designs Tab
function StockDesignsTab({ content, addStockDesign, updateStockDesign, deleteStockDesign, onSave }: any) {
  const tallasAdulto = ['S', 'M', 'L', 'XL', '2XL'];
  const tallasNino = ['3/4', '5/6', '7/8', '9/10', '11/12'];

  const [newDesign, setNewDesign] = useState({
    nombre: '',
    imagen: '',
    tipo: 'adulto' as 'adulto' | 'nino',
    tallas: tallasAdulto.map(t => ({ talla: t, disponible: true })),
  });

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDesign, setEditDesign] = useState<any>(null);

  const handleTipoChange = (tipo: 'adulto' | 'nino') => {
    const tallas = tipo === 'adulto' ? tallasAdulto : tallasNino;
    setNewDesign({
      ...newDesign,
      tipo,
      tallas: tallas.map(t => ({ talla: t, disponible: true })),
    });
  };

  const handleAdd = () => {
    if (!newDesign.nombre.trim() || !newDesign.imagen.trim()) return;
    addStockDesign({
      nombre: newDesign.nombre.trim(),
      imagen: newDesign.imagen.trim(),
      tipo: newDesign.tipo,
      tallas: newDesign.tallas,
    });
    setNewDesign({
      nombre: '',
      imagen: '',
      tipo: 'adulto',
      tallas: tallasAdulto.map(t => ({ talla: t, disponible: true })),
    });
    onSave();
  };

  const handleStartEdit = (design: any) => {
    setEditingId(design.id);
    setEditDesign({ ...design, tallas: [...design.tallas.map((t: any) => ({ ...t }))] });
  };

  const handleSaveEdit = () => {
    if (!editDesign || !editingId) return;
    updateStockDesign(editingId, {
      nombre: editDesign.nombre,
      imagen: editDesign.imagen,
      tipo: editDesign.tipo,
      tallas: editDesign.tallas,
    });
    setEditingId(null);
    setEditDesign(null);
    onSave();
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Eliminar este diseño de stock?')) {
      deleteStockDesign(id);
      onSave();
    }
  };

  const toggleTalla = (tallas: any[], index: number) => {
    return tallas.map((t: any, i: number) =>
      i === index ? { ...t, disponible: !t.disponible } : t
    );
  };

  const designs = content.stockDesigns || [];

  return (
    <div className="space-y-6">
      {/* Info */}
      <div className="admin-card p-4 border-l-4 border-[#ff0040]">
        <p className="text-sm text-gray-400">
          <strong className="text-[#ff0040]">Poleras de Stock:</strong> Diseños pre-hechos con 15% de descuento sobre Dogo Premium.
          Adulto: <strong className="text-white">$11.890</strong> (antes $13.990) |
          Niño: <strong className="text-white">$11.040</strong> (antes $12.990).
          Los precios se calculan automáticamente.
        </p>
      </div>

      {/* Add Form */}
      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Plus className="w-5 h-5 text-[#ff0040]" />
          Agregar Diseño de Stock
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Nombre del Diseño</label>
            <input
              type="text"
              value={newDesign.nombre}
              onChange={(e) => setNewDesign({ ...newDesign, nombre: e.target.value })}
              className="admin-input w-full"
              placeholder="Ej: Dragon Japones, Calavera Mexicana..."
            />
          </div>

          <ImageUploadField
            value={newDesign.imagen}
            onChange={(url: string) => setNewDesign({ ...newDesign, imagen: url })}
            label="Imagen del Diseño"
            previewAspect="square"
          />

          <div>
            <label className="block text-sm text-gray-400 mb-2">Tipo de Polera</label>
            <div className="flex gap-3">
              {(['adulto', 'nino'] as const).map(tipo => (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => handleTipoChange(tipo)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    newDesign.tipo === tipo
                      ? 'bg-[#ff0040]/20 text-[#ff0040] border border-[#ff0040]/30'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {tipo === 'adulto' ? 'Adulto' : 'Niño'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Disponibilidad de Tallas</label>
            <div className="flex flex-wrap gap-2">
              {newDesign.tallas.map((t, i) => (
                <button
                  key={t.talla}
                  type="button"
                  onClick={() => setNewDesign({
                    ...newDesign,
                    tallas: toggleTalla(newDesign.tallas, i),
                  })}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                    t.disponible
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                  }`}
                >
                  {t.talla} {t.disponible ? '✓' : '✗'}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Click para alternar: verde = en stock (24h) | naranja = sin stock (3-5 días)
            </p>
          </div>

          <button
            onClick={handleAdd}
            disabled={!newDesign.nombre.trim() || !newDesign.imagen.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar Diseño
          </button>
        </div>
      </div>

      {/* Existing Designs */}
      <div className="admin-card p-6">
        <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Shirt className="w-5 h-5 text-[#ff0040]" />
          Diseños de Stock ({designs.length})
        </h3>

        {designs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Shirt className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No hay diseños de stock</p>
            <p className="text-sm mt-2">Agrega tu primer diseño arriba</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {designs.map((design: any) => (
              <div key={design.id} className="relative group bg-white/5 rounded-lg overflow-hidden border border-white/10">
                {editingId === design.id && editDesign ? (
                  <div className="p-4 space-y-3">
                    <input
                      type="text"
                      value={editDesign.nombre}
                      onChange={(e) => setEditDesign({ ...editDesign, nombre: e.target.value })}
                      className="admin-input w-full text-sm"
                      placeholder="Nombre"
                    />
                    <ImageUploadField
                      value={editDesign.imagen}
                      onChange={(url: string) => setEditDesign({ ...editDesign, imagen: url })}
                      label="Imagen"
                      showPreview={false}
                    />
                    <div className="flex flex-wrap gap-1">
                      {editDesign.tallas.map((t: any, i: number) => (
                        <button
                          key={t.talla}
                          type="button"
                          onClick={() => setEditDesign({
                            ...editDesign,
                            tallas: toggleTalla(editDesign.tallas, i),
                          })}
                          className={`px-2 py-1 rounded text-xs font-medium border ${
                            t.disponible
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                          }`}
                        >
                          {t.talla}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveEdit}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 text-sm"
                      >
                        <Save size={14} /> Guardar
                      </button>
                      <button
                        onClick={() => { setEditingId(null); setEditDesign(null); }}
                        className="flex-1 px-3 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 text-sm"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="aspect-square relative bg-gray-800">
                      <img
                        src={design.imagen}
                        alt={design.nombre}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          design.tipo === 'adulto' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'
                        }`}>
                          {design.tipo === 'adulto' ? 'Adulto' : 'Niño'}
                        </span>
                      </div>
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleStartEdit(design)}
                          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#ff0040] transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(design.id)}
                          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-white text-sm font-medium">{design.nombre}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {design.tallas?.map((t: any) => (
                          <span
                            key={t.talla}
                            className={`text-[10px] px-1.5 py-0.5 rounded ${
                              t.disponible ? 'bg-green-500/10 text-green-400' : 'bg-orange-500/10 text-orange-400'
                            }`}
                          >
                            {t.talla}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Portfolio Tab
function PortfolioTab({ content, addPortfolioItem, updatePortfolioItem, deletePortfolioItem, onSave }: any) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form state para nuevo item
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    type: "textil" as "textil",
    image: "",
    tags: "",
  });

  // Form state para editar
  const [editItem, setEditItem] = useState({
    title: "",
    description: "",
    type: "textil" as "textil",
    image: "",
    tags: "",
  });

  const handleAdd = () => {
    if (newItem.title.trim() && newItem.description.trim() && newItem.image.trim()) {
      addPortfolioItem({
        title: newItem.title.trim(),
        description: newItem.description.trim(),
        type: newItem.type,
        image: newItem.image.trim(),
        tags: newItem.tags.split(",").map(t => t.trim()).filter(t => t),
      });
      setNewItem({ title: "", description: "", type: "textil", image: "", tags: "" });
      setIsAdding(false);
      onSave();
    }
  };

  const handleStartEdit = (item: any) => {
    setEditingId(item.id);
    setEditItem({
      title: item.title,
      description: item.description,
      type: item.type,
      image: item.image,
      tags: item.tags.join(", "),
    });
  };

  const handleSaveEdit = () => {
    if (editingId && editItem.title.trim() && editItem.description.trim() && editItem.image.trim()) {
      updatePortfolioItem(editingId, {
        title: editItem.title.trim(),
        description: editItem.description.trim(),
        type: editItem.type,
        image: editItem.image.trim(),
        tags: editItem.tags.split(",").map(t => t.trim()).filter(t => t),
      });
      setEditingId(null);
      onSave();
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Eliminar este proyecto del portfolio?")) {
      deletePortfolioItem(id);
      onSave();
    }
  };

  const portfolioTextil = content.portfolio?.filter((p: any) => p.type === "textil") || [];

  return (
    <div className="space-y-6">
      {/* Boton agregar */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white">Proyectos Portfolio</h3>
          <p className="text-sm text-gray-400 mt-1">
            Gestiona los proyectos destacados de la sección textil
          </p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className={`admin-btn ${isAdding ? "bg-red-500/20 text-red-500" : ""}`}
        >
          {isAdding ? <X size={18} className="inline mr-2" /> : <Plus size={18} className="inline mr-2" />}
          {isAdding ? "Cancelar" : "Nuevo Proyecto"}
        </button>
      </div>

      {/* Formulario nuevo proyecto */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="admin-card p-6 border-brand/30"
          >
            <h4 className="text-lg font-semibold text-white mb-4">Nuevo Proyecto</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Titulo *</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Integracion HIS-LIS"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Tipo *</label>
                <select
                  value={newItem.type}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value as any })}
                  className="admin-input w-full"
                >
                  <option value="textil">Textil DTF</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">Descripcion *</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="admin-input w-full h-20 resize-none"
                  placeholder="Descripcion del proyecto..."
                />
              </div>
              <div>
                <ImageUploadField
                  value={newItem.image}
                  onChange={(url) => setNewItem({ ...newItem, image: url })}
                  label="Imagen del Proyecto *"
                  placeholder="https://..."
                  previewAspect="video"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Tags (separados por coma)</label>
                <input
                  type="text"
                  value={newItem.tags}
                  onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
                  className="admin-input w-full"
                  placeholder="HL7, Mirth Connect, HIS"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={handleAdd} className="admin-btn">
                <Save size={18} className="inline mr-2" />
                Guardar Proyecto
              </button>
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Proyectos Textil DTF */}
      <div className="admin-card p-6">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Shirt className="w-5 h-5 text-[#ff0040]" />
          Proyectos Textil DTF ({portfolioTextil.length})
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {portfolioTextil.map((item: any) => (
            <div key={item.id} className="relative group bg-white/5 rounded-lg overflow-hidden border border-white/10">
              {editingId === item.id ? (
                <div className="p-4 space-y-3">
                  <input
                    type="text"
                    value={editItem.title}
                    onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
                    className="admin-input w-full text-sm"
                    placeholder="Titulo"
                  />
                  <textarea
                    value={editItem.description}
                    onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                    className="admin-input w-full text-sm h-16 resize-none"
                    placeholder="Descripcion"
                  />
                  <ImageUploadField
                    value={editItem.image}
                    onChange={(url) => setEditItem({ ...editItem, image: url })}
                    label="Imagen"
                    showPreview={false}
                  />
                  <input
                    type="text"
                    value={editItem.tags}
                    onChange={(e) => setEditItem({ ...editItem, tags: e.target.value })}
                    className="admin-input w-full text-sm"
                    placeholder="Tags (separados por coma)"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 px-3 py-2 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 text-sm"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 px-3 py-2 bg-gray-500/20 text-gray-400 rounded-lg hover:bg-gray-500/30 text-sm"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="aspect-video relative bg-gray-800">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-[#ff0040]"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h5 className="text-white font-semibold mb-1">{item.title}</h5>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags?.map((tag: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-[#ff0040]/10 text-[#ff0040] text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        {portfolioTextil.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FolderOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No hay proyectos de Textil DTF</p>
          </div>
        )}
      </div>
    </div>
  );
}
