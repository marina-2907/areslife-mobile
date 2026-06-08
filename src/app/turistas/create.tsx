import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import SpaceBackground from "../../components/SpaceBackground";
import { colors } from "../../constants/colors";
import { createTourist } from "../../services/api";
import { TouristStatus } from "../../types/tourist";

const statusOptions: TouristStatus[] = ["Seguro", "Atenção", "Crítico"];

// Destinos aceitos pela API Java (enum Localizacao)
const destinoOptions = ["Marte", "Lua"];

export default function CreateTouristScreen() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [nationality, setNationality] = useState("");
  const [destination, setDestination] = useState("Marte");
  const [status, setStatus] = useState<TouristStatus>("Seguro");
  const [oxygenLevel, setOxygenLevel] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [missionDays, setMissionDays] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    // Validações dos campos que a API realmente exige
    if (!name.trim()) {
      Alert.alert("Atenção", "Informe o nome do turista.");
      return;
    }
    const ageNum = Number(age);
    if (!age.trim() || isNaN(ageNum) || ageNum < 18 || ageNum > 99) {
      Alert.alert("Atenção", "Informe uma idade válida (entre 18 e 99 anos).");
      return;
    }
    if (!nationality.trim()) {
      Alert.alert("Atenção", "Informe a nacionalidade do turista.");
      return;
    }

    setLoading(true);
    try {
      await createTourist({
        name:        name.trim(),
        age:         ageNum,
        nationality: nationality.trim(),
        origin:      "Terra",
        destination: destination,   // "Marte" ou "Lua" — mapTouristToApi converte para enum
        missionType: "Turismo espacial",
        healthStatus: "Estável",
        ticketStatus: "Pendente",
        status,
        oxygenLevel: Number(oxygenLevel) || 95,
        heartRate:   Number(heartRate)   || 80,
        missionDays: Number(missionDays) || 0,
      });

      Alert.alert("Sucesso", "Turista cadastrado com sucesso! ✅", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error: any) {
      // Extrai a mensagem mais útil possível do erro
      const apiMsg =
        error?.response?.data?.message ??
        error?.response?.data?.erro ??
        error?.response?.data ??
        null;
      const httpStatus = error?.response?.status;
      const msg =
        typeof apiMsg === "string"
          ? apiMsg
          : httpStatus
          ? `Erro ${httpStatus} — verifique os dados e tente novamente.`
          : error?.message ?? "Não foi possível conectar à API.";

      console.error("[CreateTourist] Erro:", JSON.stringify(error?.response?.data));
      Alert.alert("Erro ao salvar", String(msg));
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>
        <SpaceBackground />

        <KeyboardAvoidingView
          style={styles.keyboard}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={22} color={colors.text} />
              </Pressable>

              <View style={styles.headerTextBox}>
                <Text style={styles.eyebrow}>NOVO VISITANTE</Text>
                <Text style={styles.title}>Cadastrar Turista</Text>
                <Text style={styles.subtitle}>
                  Registre os dados do turista espacial para a missão em Marte.
                </Text>
              </View>
            </View>

            <View style={styles.formCard}>
              <Text style={styles.sectionTitle}>Dados pessoais</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nome completo *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Laura Mendes"
                  placeholderTextColor={colors.textSecondary}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              <View style={styles.row}>
                <View style={styles.half}>
                  <Text style={styles.label}>Idade *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: 28"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    value={age}
                    onChangeText={setAge}
                  />
                </View>

                <View style={styles.half}>
                  <Text style={styles.label}>Nacionalidade *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Brasil"
                    placeholderTextColor={colors.textSecondary}
                    value={nationality}
                    onChangeText={setNationality}
                  />
                </View>
              </View>

              <Text style={styles.sectionTitle}>Dados da missão</Text>

              {/* Origem fixa = Terra */}
              <View style={styles.row}>
                <View style={styles.half}>
                  <Text style={styles.label}>Origem</Text>
                  <View style={styles.fixedField}>
                    <Text style={styles.fixedFieldText}>Terra</Text>
                  </View>
                </View>

                {/* Destino: seletor entre Marte e Lua */}
                <View style={styles.half}>
                  <Text style={styles.label}>Destino *</Text>
                  <View style={styles.destinoRow}>
                    {destinoOptions.map((opt) => (
                      <Pressable
                        key={opt}
                        style={[
                          styles.destinoChip,
                          destination === opt && styles.destinoChipActive,
                        ]}
                        onPress={() => setDestination(opt)}
                      >
                        <Text
                          style={[
                            styles.destinoChipText,
                            destination === opt && styles.destinoChipTextActive,
                          ]}
                        >
                          {opt}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                </View>
              </View>

              <Text style={styles.sectionTitle}>Monitoramento</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Status geral</Text>
                <View style={styles.statusOptions}>
                  {statusOptions.map((option) => {
                    const isActive = status === option;
                    return (
                      <Pressable
                        key={option}
                        style={[
                          styles.statusChip,
                          isActive && styles.statusChipActive,
                          option === "Atenção" && styles.statusChipWarning,
                          option === "Crítico" && styles.statusChipDanger,
                        ]}
                        onPress={() => setStatus(option)}
                      >
                        <Text
                          style={[
                            styles.statusChipText,
                            isActive && styles.statusChipTextActive,
                          ]}
                        >
                          {option}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.third}>
                  <Text style={styles.label}>O₂</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="96"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    value={oxygenLevel}
                    onChangeText={setOxygenLevel}
                  />
                </View>

                <View style={styles.third}>
                  <Text style={styles.label}>BPM</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="78"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    value={heartRate}
                    onChangeText={setHeartRate}
                  />
                </View>

                <View style={styles.third}>
                  <Text style={styles.label}>Dias</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="12"
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    value={missionDays}
                    onChangeText={setMissionDays}
                  />
                </View>
              </View>
            </View>

            <Pressable
              style={[styles.saveButton, loading && styles.saveButtonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={colors.text} />
              ) : (
                <>
                  <Ionicons name="save-outline" size={20} color={colors.text} />
                  <Text style={styles.saveButtonText}>Salvar turista</Text>
                </>
              )}
            </Pressable>

            <Pressable style={styles.cancelButton} onPress={() => router.back()}>
              <Text style={styles.cancelButtonText}>Cancelar cadastro</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:               { flex: 1, backgroundColor: colors.background },
  screen:             { flex: 1, backgroundColor: colors.background, overflow: "hidden" },
  keyboard:           { flex: 1 },
  container:          { flex: 1, backgroundColor: "transparent" },
  content:            { paddingHorizontal: 22, paddingTop: 28, paddingBottom: 34 },
  header:             { flexDirection: "row", alignItems: "flex-start", gap: 14, marginBottom: 22 },
  backButton:         { width: 44, height: 44, borderRadius: 16, backgroundColor: colors.card, borderWidth: 1.2, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  headerTextBox:      { flex: 1 },
  eyebrow:            { color: colors.secondary, fontSize: 11, fontWeight: "900", letterSpacing: 1.5, marginBottom: 5 },
  title:              { color: colors.text, fontSize: 28, fontWeight: "900", lineHeight: 34 },
  subtitle:           { color: colors.textSecondary, fontSize: 14, marginTop: 5, lineHeight: 20 },
  formCard:           { backgroundColor: colors.card, borderRadius: 26, borderWidth: 1.3, borderColor: colors.borderPurple, padding: 18, marginBottom: 18, shadowColor: colors.primary, shadowOpacity: 0.18, shadowRadius: 16, elevation: 6 },
  sectionTitle:       { color: colors.text, fontSize: 17, fontWeight: "900", marginBottom: 14, marginTop: 4 },
  inputGroup:         { marginBottom: 14 },
  label:              { color: colors.textSecondary, fontSize: 12, fontWeight: "800", marginBottom: 7 },
  input:              { minHeight: 50, backgroundColor: colors.cardSoft, borderWidth: 1.2, borderColor: colors.border, color: colors.text, paddingHorizontal: 14, borderRadius: 16, fontSize: 14 },
  row:                { flexDirection: "row", gap: 10, marginBottom: 14 },
  half:               { flex: 1 },
  third:              { flex: 1 },
  fixedField:         { minHeight: 50, backgroundColor: colors.cardSoft, borderWidth: 1.2, borderColor: colors.border, borderRadius: 16, paddingHorizontal: 14, justifyContent: "center", opacity: 0.6 },
  fixedFieldText:     { color: colors.text, fontSize: 14 },
  destinoRow:         { flexDirection: "row", gap: 6 },
  destinoChip:        { flex: 1, minHeight: 50, borderRadius: 14, backgroundColor: colors.cardSoft, borderWidth: 1.2, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  destinoChipActive:  { borderColor: colors.primary, backgroundColor: "rgba(139, 92, 246, 0.18)" },
  destinoChipText:    { color: colors.textSecondary, fontSize: 13, fontWeight: "800" },
  destinoChipTextActive: { color: colors.text },
  statusOptions:      { flexDirection: "row", gap: 8 },
  statusChip:         { flex: 1, minHeight: 44, borderRadius: 14, backgroundColor: colors.cardSoft, borderWidth: 1.2, borderColor: colors.border, alignItems: "center", justifyContent: "center" },
  statusChipActive:   { borderColor: colors.success, backgroundColor: "rgba(52, 211, 153, 0.14)" },
  statusChipWarning:  { borderColor: colors.warning },
  statusChipDanger:   { borderColor: colors.danger },
  statusChipText:     { color: colors.textSecondary, fontSize: 12, fontWeight: "900" },
  statusChipTextActive: { color: colors.text },
  saveButton:         { minHeight: 56, borderRadius: 18, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8, shadowColor: colors.primary, shadowOpacity: 0.32, shadowRadius: 14, elevation: 6 },
  saveButtonDisabled: { opacity: 0.6 },
  saveButtonText:     { color: colors.text, fontSize: 15, fontWeight: "900" },
  cancelButton:       { minHeight: 52, borderRadius: 18, alignItems: "center", justifyContent: "center", marginTop: 12, borderWidth: 1.2, borderColor: colors.border, backgroundColor: colors.card },
  cancelButtonText:   { color: colors.textSecondary, fontSize: 14, fontWeight: "800" },
});
