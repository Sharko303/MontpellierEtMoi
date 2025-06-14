import { StyleSheet } from "react-native";

export const COLORS = {
  primary: "#4558C8",
  secondary: "#F2F5B1",
  background: "#F2F2F7",
  success: "#7DC0AF",
};

export const styles = StyleSheet.create({
  btnPrimary: {
    backgroundColor: COLORS.primary,
    color: "black",
    padding: 8,
    margin: 10,
    width: 100,
    borderRadius: 20,
  },
  btnSecondary: {
    backgroundColor: COLORS.secondary,
    color: "white",
    padding: 8,
    margin: 10,
    width: 200,
    borderRadius: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  imageCard: {
    width: "100%",
    height: 150,
  },
  hr: {
    backgroundColor: "#ddd",
    height: 1,
    width: "100%",
  },
  bgPrimary: {
    backgroundColor: COLORS.primary,
    color: "white",
  },
  bgSecondary: {
    backgroundColor: COLORS.secondary,
    color: "black",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  backButton: {
    color: COLORS.primary,
  },
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  label: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  titleHeader: {
    fontSize: 30,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderRadius: 8,
    padding: 8,
    marginBottom: 4,
    borderColor: "#ddd",
    backgroundColor: "#F2F3F7",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginLeft: 22,
  },
  button: {
    backgroundColor: COLORS.primary,
    color: "white",
    padding: 16,
    margin: 10,
    width: 200,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  center: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  registerLink: {
    textAlign: "center",
    color: COLORS.primary,
    fontSize: 16,
    marginTop: 5,
  },
  link: {
    color: COLORS.primary,
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: COLORS.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    backgroundColor: COLORS.secondary,
    color: "black",
  },
  searchButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    height: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  modalSearchContainer: {
    marginBottom: 15,
  },
  modalSearchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  resultsList: {
    maxHeight: "90%",
  },
  resultItem: {
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
    marginBottom: 20,
  },
  noResults: {
    textAlign: "center",
    padding: 20,
    color: "#666",
  },

  fullScreenModal: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },

  btnCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    width: 280, // Ajustez selon la largeur souhaitée de vos cartes
    marginRight: 12, // Espace entre les cartes
  },
  cardContainerFavorite: {
    width: 240, // Ajustez selon la largeur souhaitée de vos cartes // Espace entre les cartes
    borderRadius: 20,
  },
  horizontalListContent: {
    paddingLeft: 16, // Marge à gauche au début de la liste
    paddingRight: 16, // Marge à droite à la fin de la liste
    paddingVertical: 8,
  },
  mt1: {
    marginTop: 10,
  },
  mt2: {
    marginTop: 20,
  },
  mt3: {
    marginTop: 30,
  },
  mt4: {
    marginTop: 40,
  },
  mb1: {
    marginBottom: 10,
  },
  mb2: {
    marginBottom: 20,
  },
  mb3: {
    marginBottom: 30,
  },
  mb4: {
    marginBottom: 40,
  },
  p1: {
    padding: 10,
  },
  p2: {
    padding: 20,
  },
  p3: {
    padding: 30,
  },
  p4: {
    padding: 40,
  },
  m1: {
    margin: 10,
  },
  m2: {
    margin: 20,
  },
  m3: {
    margin: 30,
  },

  m4: {
    margin: 40,
  },
  borderRounded: {
    borderRadius: 12,
  },
  textWhite: {
    color: "white",
  },
  textBlack: {
    color: "black",
  },
  btnPlay: {
    backgroundColor: "#303031",
    alignItems: "center",
  },
  font1: {
    fontSize: 12,
  },
  font2: {
    fontSize: 14,
  },
  font3: {
    fontSize: 16,
  },
  font4: {
    fontSize: 18,
  },
  font5: {
    fontSize: 20,
  },
  muted: {
    color: "#424242",
  },

  /* btn favorite */
  imageContainer: {
    position: "relative",
    width: "100%",
    aspectRatio: 16 / 9, // Maintient un ratio d'aspect cohérent
  },
  image: {
    width: 200,
    height: 130,
    borderRadius: 20,
  },
  heartButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  cardFavorite: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: "hidden",
    width: 200, // Largeur fixe pour les cartes horizontales, ajustez selon vos besoins
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
  /* Category block */
  categoriesContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  categoryItem: {
    alignItems: "center",
    marginHorizontal: 8,
    width: 50, // Largeur fixe pour chaque catégorie
  },
  iconBubble: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryName: {
    fontSize: 12,
    textAlign: "center",
    color: "#333",
  },
  /* Register login link */
  loginPrompt: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  loginLink: {
    textAlign: "center",
    color: COLORS.primary,
    fontSize: 16,
    marginTop: 5,
  },

  /* Inscription commerçant */
  selectedItem: {
    backgroundColor: "#f0f0f0",
  },
  resultItemText: {
    fontSize: 16,
    color: "#333",
  },
  selectedContainer: {
    marginBottom: 16,
  },
  selectedEtablissement: {
    backgroundColor: "#f0f8ff",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#b8daff",
  },
  selectedName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  resetButton: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  imageSection: {
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#333",
  },
  uploadButton: {
    backgroundColor: COLORS.secondary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  uploadButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 16,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  /* navigation */
  plansContainer: {
    gap: 16,
    marginBottom: 32,
  },
  planCard: {
    borderRadius: 12,
    padding: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedPlan: {
    borderColor: "orange",
    borderWidth: 2,
    backgroundColor: "#f8f9ff",
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  planName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  planPrice: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
  },
  planDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  selectedText: {
    color: "orange",
  },
  selectedBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "orange",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  selectedBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  backButtonText: {
    backgroundColor: COLORS.secondary,
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },

  /* Step 3 */
  formContainer: {
    gap: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 32,
    gap: 12,
  },
  submitButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  /* Game */
  gameCard: {
    margin: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    height: 300,
  },
  gameTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  timerContainer: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
  },
  timerText: {
    color: "#666",
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  /* Qr code user */
  mainTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 15,
    justifyContent: "space-between",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 5,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 2,
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
  },
  filterText: {
    fontWeight: "500",
    color: "#555",
  },
  activeFilterText: {
    color: "white",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainerPromo: {
    width: "48%",
    marginBottom: 15,
  },
  cardPromo: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: "#ddd",
    height: 140,
    justifyContent: "space-between",
  },
  qrThumbnail: {
    alignItems: "center",
    marginBottom: 10,
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  expiration: {
    fontSize: 12,
    color: "#666",
    
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  qrContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    width: "40%",
  },
  detailValue: {
    fontSize: 14,
    color: "#333",
    width: "60%",
    textAlign: "right",
  },
  textArea: {
    height: 100,
    borderRadius: 8,
    padding: 8,
    marginBottom: 4,
    borderColor: "#ddd",
    backgroundColor: "#F2F3F7",
  },

  /* Une classe qui let le contenu a droite */
  textRight: {
    textAlign: "right",
  },
  /* Qui met un bouton a droite */
  buttonSolde: {
    backgroundColor: COLORS.secondary,
    color: "black",
    padding: 8,
    margin: 10,
    width: 120,
    borderRadius: 20,
  },
  textCenter: {
    textAlign: "center",
  },

  right: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  bold: {
    fontWeight: "bold",
  },

  /* Payment */
  plansContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  planCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedPlan: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  recommendedPlan: {
    borderColor:  COLORS.success,
    borderWidth: 2,
  },
  recommendedBadge: {
    position: "absolute",
    top: -12,
    right: 16,
    backgroundColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendedText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  planNamePayment: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1a1a1a",
  },
  planPricePayment: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 16,
  },
  planPeriod: {
    fontSize: 16,
    color: "#666",
  },
  featuresList: {
    gap: 8,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  featureText: {
    fontSize: 14,
    color: "#333",
  },
  featureDisabled: {
    color: "#999",
  },
  paymentSection: {
    marginTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: "#1a1a1a",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
    color: "#333",
  },
  inputPayment: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  rowInputs: {
    flexDirection: "row",
    gap: 16,
  },
  payButton: {
    backgroundColor: "blue",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  containerPayment: {
    flex: 1,
  },
/* Partie dashboard pro */
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  statsContainer: {
    marginBottom: 30,
  },
  statBlock: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  statTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  statCount: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statDetails: {
    marginTop: 4,
  },
  statSubtext: {
    fontSize: 14,
    color: '#666',
  },

  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
