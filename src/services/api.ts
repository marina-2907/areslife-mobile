import axios from "axios";
import { Tourist } from "../types/tourist";

// ============================================================
// URL da API Java rodando no Render
// ============================================================
export const api = axios.create({
  baseURL: "https://areslife-java.onrender.com",
  timeout: 30000, // 30s — cold start do Render gratuito pode demorar
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export type Resource = {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: "Bom" | "Atenção" | "Crítico";
  icon: string;
};

// Recursos ainda são mock (não tem endpoint público de recursos)
export const resources: Resource[] = [
  { id: "1", name: "Oxigênio",    value: 82, unit: "%",  status: "Bom",    icon: "weather-windy" },
  { id: "2", name: "Água",        value: 58, unit: "%",  status: "Atenção", icon: "water" },
  { id: "3", name: "Energia",     value: 74, unit: "%",  status: "Bom",    icon: "flash" },
  { id: "4", name: "Temperatura", value: 21, unit: "°C", status: "Bom",    icon: "thermometer" },
];

export async function getResources() {
  return resources;
}

// ============================================================
// TURISTAS — integração real com a API Java (/tourists)
// ============================================================

// GET /tourists → lista todos
export async function getTourists(): Promise<Tourist[]> {
  const response = await api.get("/tourists");
  // A API retorna array direto ou array com _links do HATEOAS
  const data = Array.isArray(response.data) ? response.data : response.data?._embedded?.turistaEspacialResponseList ?? [];
  return data.map(mapApiToTourist);
}

// GET /tourists/:id → busca um
export async function getTouristById(id: string): Promise<Tourist> {
  const response = await api.get(`/tourists/${id}`);
  return mapApiToTourist(response.data);
}

// POST /tourists → cadastra novo
export async function createTourist(tourist: Omit<Tourist, "id">): Promise<Tourist> {
  const body = mapTouristToApi(tourist);
  console.log("[API] POST /tourists body:", JSON.stringify(body)); // debug
  const response = await api.post("/tourists", body);
  return mapApiToTourist(response.data);
}

// PUT /tourists/:id → atualiza
export async function updateTourist(id: string, tourist: Omit<Tourist, "id">): Promise<Tourist> {
  const body = mapTouristToApi(tourist);
  const response = await api.put(`/tourists/${id}`, body);
  return mapApiToTourist(response.data);
}

// DELETE /tourists/:id → remove
export async function deleteTourist(id: string): Promise<void> {
  await api.delete(`/tourists/${id}`);
}

// ============================================================
// Mapeamento: API Java ↔ Tourist (app mobile)
// ============================================================

function mapApiToTourist(data: any): Tourist {
  const statusMap: Record<string, Tourist["status"]> = {
    AGUARDANDO:  "Seguro",
    EMBARCADO:   "Seguro",
    EM_TRANSITO: "Atenção",
    CHEGOU:      "Seguro",
    CANCELADO:   "Crítico",
  };

  return {
    id:           String(data.id),
    name:         data.nome  ?? data.name  ?? "",
    age:          data.idade ?? data.age   ?? 0,
    nationality:  data.pais  ?? data.nationality ?? "",
    origin:       data.origin ?? "Terra",
    destination:  data.destino ?? data.destination ?? "MARTE",
    missionType:  data.missionType ?? "Turismo espacial",
    healthStatus: data.healthStatus ?? "Estável",
    ticketStatus: data.ticketStatus ?? "Pendente",
    status:       statusMap[data.status] ?? "Seguro",
    oxygenLevel:  data.oxygenLevel  ?? 95,
    heartRate:    data.heartRate    ?? 80,
    missionDays:  data.missionDays  ?? 0,
  };
}

// O que a API Java espera: { nome, idade, pais, destino }
// destino deve ser enum: "MARTE" ou "LUA"
function mapTouristToApi(tourist: Omit<Tourist, "id">) {
  const destinoMap: Record<string, string> = {
    "Marte": "MARTE",
    "marte": "MARTE",
    "MARTE": "MARTE",
    "Lua":   "LUA",
    "lua":   "LUA",
    "LUA":   "LUA",
  };

  const destino = destinoMap[String(tourist.destination)] ?? "MARTE";

  return {
    nome:    tourist.name,
    idade:   Number(tourist.age),
    pais:    tourist.nationality,
    destino,
  };
}