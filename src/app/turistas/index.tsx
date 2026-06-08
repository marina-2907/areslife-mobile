import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import BottomNav from "../../components/BottomNav";
import SpaceBackground from "../../components/SpaceBackground";
import TouristCard from "../../components/TouristCard";
import { colors } from "../../constants/colors";
import { deleteTourist, getTourists } from "../../services/api";
import { Tourist } from "../../types/tourist";

export default function TouristsScreen() {
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carrega da API toda vez que a tela entra em foco
  useFocusEffect(
    useCallback(() => {
      loadTourists();
    }, [])
  );

  async function loadTourists() {
    setLoading(true);
    setError(null);
    try {
      const data = await getTourists();
      setTourists(data);
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ??
        e?.message ??
        "Não foi possível conectar à API.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    Alert.alert("Remover turista", "Deseja remover este turista da base de dados?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteTourist(id);
            setTourists((prev) => prev.filter((t) => t.id !== id));
          } catch (e: any) {
            Alert.alert("Erro", "Não foi possível remover o turista.");
          }
        },
      },
    ]);
  }

  const filteredTourists = useMemo(() => {
    if (!search.trim()) return tourists;
    return tourists.filter(
      (t) =>
        String(t.name).toLowerCase().includes(search.toLowerCase()) ||
        String(t.destination).toLowerCase().includes(search.toLowerCase())
    );
  }, [tourists, search]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <SpaceBackground />

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.eyebrow}>MISSÃO ARES-01</Text>
              <Text style={styles.title}>Turistas</Text>
              <Text style={styles.subtitle}>
                {loading
                  ? "Carregando..."
                  : `${filteredTourists.length} turista(s) registrado(s)`}
              </Text>
            </View>

            <Pressable
              style={styles.addButton}
              onPress={() => router.push("/turistas/create")}
            >
              <Ionicons name="add" size={24} color={colors.text} />
            </Pressable>
          </View>

          <View style={styles.searchBox}>
            <Ionicons
              name="search-outline"
              size={18}
              color={colors.textSecondary}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar turista ou destino..."
              placeholderTextColor={colors.textSecondary}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          {loading && (
            <View style={styles.center}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Conectando à API...</Text>
            </View>
          )}

          {!loading && error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
              <Pressable style={styles.retryButton} onPress={loadTourists}>
                <Text style={styles.retryText}>Tentar novamente</Text>
              </Pressable>
            </View>
          )}

          {!loading && !error && filteredTourists.length === 0 && (
            <View style={styles.center}>
              <Text style={styles.emptyText}>Nenhum turista encontrado.</Text>
            </View>
          )}

          {!loading &&
            filteredTourists.map((tourist) => (
              <TouristCard
                key={tourist.id}
                tourist={tourist}
                onDelete={() => handleDelete(tourist.id)}
              />
            ))}
        </ScrollView>

        <BottomNav active={"turistas"} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:         { flex: 1, backgroundColor: colors.background },
  screen:       { flex: 1, backgroundColor: colors.background, overflow: "hidden" },
  container:    { flex: 1, backgroundColor: "transparent" },
  content:      { paddingHorizontal: 22, paddingTop: 28, paddingBottom: 100 },
  header:       { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 },
  eyebrow:      { color: colors.secondary, fontSize: 11, fontWeight: "900", letterSpacing: 1.5, marginBottom: 4 },
  title:        { color: colors.text, fontSize: 32, fontWeight: "900" },
  subtitle:     { color: colors.textSecondary, fontSize: 13, marginTop: 4 },
  addButton:    { width: 48, height: 48, borderRadius: 18, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", shadowColor: colors.primary, shadowOpacity: 0.35, shadowRadius: 12, elevation: 6 },
  searchBox:    { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: 16, borderWidth: 1.2, borderColor: colors.border, paddingHorizontal: 14, marginBottom: 20 },
  searchIcon:   { marginRight: 8 },
  searchInput:  { flex: 1, height: 48, color: colors.text, fontSize: 14 },
  center:       { alignItems: "center", marginTop: 40, gap: 12 },
  loadingText:  { color: colors.textSecondary, fontSize: 13 },
  emptyText:    { color: colors.textSecondary, fontSize: 14 },
  errorBox:     { backgroundColor: "rgba(239,68,68,0.1)", borderRadius: 16, borderWidth: 1, borderColor: "rgba(239,68,68,0.3)", padding: 16, marginTop: 20, alignItems: "center", gap: 12 },
  errorText:    { color: colors.danger ?? "#ef4444", fontSize: 13, textAlign: "center" },
  retryButton:  { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, backgroundColor: colors.primary },
  retryText:    { color: colors.text, fontWeight: "800", fontSize: 13 },
});
