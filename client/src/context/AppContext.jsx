import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { CATEGORIAS } from '../data/categorias';

const STORAGE_KEY = 'finzip_db_v2';
// Chave da versão com dados de demonstração — descartada para começar limpo.
const LEGACY_STORAGE_KEY = 'finzip_db';
const AppContext = createContext(null);

function emptyDB() {
  return { users: [], session: null, transactions: [], goals: [] };
}

function loadDB() {
  try {
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Não foi possível ler o localStorage, começando do zero.', e);
  }
  const initial = emptyDB();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  } catch (e) {
    // ambiente sem localStorage disponível — segue só em memória
  }
  return initial;
}

function saveDB(db) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (e) {
    // silencioso: protótipo continua funcionando só em memória
  }
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}

export function AppProvider({ children }) {
  const [db, setDb] = useState(loadDB);

  useEffect(() => {
    saveDB(db);
  }, [db]);

  const currentUser = db.session
    ? db.users.find((u) => u.id === db.session.userId) || null
    : null;

  const login = useCallback((email, senha) => {
    const user = db.users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.senha === senha
    );
    if (!user) return { ok: false, error: 'E-mail ou senha incorretos.' };
    setDb((prev) => ({ ...prev, session: { userId: user.id } }));
    return { ok: true };
  }, [db.users]);

  const logout = useCallback(() => {
    setDb((prev) => ({ ...prev, session: null }));
  }, []);

  const register = useCallback((nome, email, senha) => {
    const emailNorm = email.trim().toLowerCase();
    if (db.users.some((u) => u.email.toLowerCase() === emailNorm)) {
      return { ok: false, error: 'Já existe uma conta com esse e-mail.' };
    }
    const newUser = {
      id: uid('user'),
      nome: nome.trim(),
      email: emailNorm,
      senha,
      dataCriacao: new Date().toISOString().slice(0, 10),
    };
    setDb((prev) => ({
      ...prev,
      users: [...prev.users, newUser],
      session: { userId: newUser.id },
    }));
    return { ok: true };
  }, [db.users]);

  const updateProfile = useCallback((data) => {
    setDb((prev) => ({
      ...prev,
      users: prev.users.map((u) =>
        u.id === prev.session?.userId ? { ...u, ...data } : u
      ),
    }));
  }, []);

  const addTransaction = useCallback((t) => {
    if (!currentUser) return;
    const newT = { ...t, id: uid('t'), usuarioId: currentUser.id };
    setDb((prev) => ({ ...prev, transactions: [...prev.transactions, newT] }));
  }, [currentUser]);

  const updateTransaction = useCallback((id, data) => {
    setDb((prev) => ({
      ...prev,
      transactions: prev.transactions.map((t) => (t.id === id ? { ...t, ...data } : t)),
    }));
  }, []);

  const deleteTransaction = useCallback((id) => {
    setDb((prev) => ({
      ...prev,
      transactions: prev.transactions.filter((t) => t.id !== id),
    }));
  }, []);

  const addGoal = useCallback((g) => {
    if (!currentUser) return;
    const newG = { ...g, id: uid('g'), usuarioId: currentUser.id, valorAtual: 0 };
    setDb((prev) => ({ ...prev, goals: [...prev.goals, newG] }));
  }, [currentUser]);

  const contributeToGoal = useCallback((id, valor) => {
    setDb((prev) => ({
      ...prev,
      goals: prev.goals.map((g) =>
        g.id === id ? { ...g, valorAtual: Math.max(0, g.valorAtual + valor) } : g
      ),
    }));
  }, []);

  const deleteGoal = useCallback((id) => {
    setDb((prev) => ({ ...prev, goals: prev.goals.filter((g) => g.id !== id) }));
  }, []);

  const transactions = currentUser
    ? db.transactions.filter((t) => t.usuarioId === currentUser.id)
    : [];
  const goals = currentUser
    ? db.goals.filter((g) => g.usuarioId === currentUser.id)
    : [];

  const value = {
    currentUser,
    login,
    logout,
    register,
    updateProfile,
    categorias: CATEGORIAS,
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    goals,
    addGoal,
    contributeToGoal,
    deleteGoal,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp precisa estar dentro de <AppProvider>');
  return ctx;
}
