/*
 * One illustrative workload, shown twice: as the spreadsheet a small manufacturer keeps today
 * and as the application that replaces it. Same seven rows, same order, so the scan line turns
 * each row into its finished version. Names and values are invented examples.
 */
export type OrderStatus = "pendente" | "producao" | "enviado" | "faturado";

export const STATUS_LABEL: Record<OrderStatus, string> = {
  pendente: "Pendente",
  producao: "Em produção",
  enviado: "Enviado",
  faturado: "Faturado",
};

export const ORDERS: readonly {
  client: string;
  initials: string;
  date: string;
  item: string;
  value: string;
  status: OrderStatus;
}[] = [
  {
    client: "Mecânica Rui Lda",
    initials: "MR",
    date: "12 mar",
    item: "Caixas 40×30, 200 un.",
    value: "1 250,00 €",
    status: "producao",
  },
  {
    client: "Frio Total",
    initials: "FT",
    date: "12 mar",
    item: "Etiquetas A5, 5 000 un.",
    value: "312,40 €",
    status: "pendente",
  },
  {
    client: "Clínica do Parque",
    initials: "CP",
    date: "13 mar",
    item: "Impressos de consulta",
    value: "480,00 €",
    status: "enviado",
  },
  {
    client: "Padaria Ribeiro",
    initials: "PR",
    date: "14 mar",
    item: "Sacos kraft, 1 000 un.",
    value: "265,00 €",
    status: "producao",
  },
  {
    client: "Ana Costa",
    initials: "AC",
    date: "14 mar",
    item: "Cartões de visita",
    value: "89,90 €",
    status: "faturado",
  },
  {
    client: "Oficina Norte",
    initials: "ON",
    date: "15 mar",
    item: "Caixas 60×40, 80 un.",
    value: "740,00 €",
    status: "pendente",
  },
  {
    client: "Climanorte",
    initials: "CN",
    date: "15 mar",
    item: "Etiquetas A6, 2 000 un.",
    value: "198,00 €",
    status: "enviado",
  },
];

/* The same rows as the sheet kept them: inconsistent, abbreviated, half finished. */
export const SHEET_ROWS: readonly {
  cells: readonly [string, string, string, string, string];
  warn?: readonly number[];
  err?: number;
  note?: number;
}[] = [
  { cells: ["Mecânica Rui", "12/3", "caixas 40x30 (200)", "1250", "em prod."] },
  { cells: ["FRIO TOTAL", "12-03-2026", "Etiquetas A5 5000", "312,4", "?"], warn: [4] },
  { cells: ["Clínica Parque", "13/03", "impressos consulta", "480,00 €", "enviado"] },
  { cells: ["Padaria Ribeiro", "14.3", "sacos kraft 1000", "#REF!", "em prod"], err: 3 },
  { cells: ["Ana Costa", "14/3", "cartões visita", "89,9", "FATURADO"] },
  { cells: ["Oficina Norte", "15/03", "caixas 60x40 80un", "740", "ligar!!"], warn: [4], note: 4 },
  { cells: ["Climanorte", "", "etiquetas A6", "198", "enviado?"], warn: [1] },
];
