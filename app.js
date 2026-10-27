// SPDX-License-Identifier: GPL-3.0-only

(() => {
  "use strict";

  const { Chess } = ChessLib;

  const STORAGE_KEY = "chess.prefs";
  const DEFAULT_PREFS = Object.freeze({
    theme: "system",
    lang: "system",
    coords: true,
    lastMove: true,
    motion: true,
    confirmNew: true
  });
  const THEME_VALUES = ["dark", "light", "system"];
  const LANGUAGE_VALUES = ["it", "en", "system"];
  const OPTION_KEYS = ["coords", "lastMove", "motion", "confirmNew"];

  const TRANSLATIONS = {
    it: {
      "app.title": "Chess — Scacchi in due",
      "app.description": "Chess — scacchi per due giocatori sullo stesso dispositivo.",
      "app.heading": "Chess — scacchi per due giocatori in locale",
      "brand.meta": "Due giocatori",
      "actions.more": "Altre azioni",
      "actions.settings": "Impostazioni",
      "actions.newGame": "Nuova partita",
      "menu.draw": "Patta d’accordo",
      "menu.resign": "Abbandona",
      "menu.settings": "Impostazioni",
      "player.white": "Bianco",
      "player.black": "Nero",
      "player.whiteAria": "Giocatore Bianco",
      "player.blackAria": "Giocatore Nero",
      "player.captures": "Catture",
      "player.noCaptures": "Nessuna cattura",
      "player.points": "pt",
      "states.waiting": "In attesa",
      "states.turn": "Al tratto",
      "states.check": "Sotto scacco",
      "states.winner": "Vincitore",
      "states.loser": "Sconfitto",
      "states.draw": "Patta",
      "status.turn": "Tocca al {color}",
      "status.check": "Scacco al {color}",
      "status.noMoves": "Nessuna mossa",
      "values.label": "Valori",
      "piece.pawn": "Pedone",
      "piece.knight": "Cavallo",
      "piece.bishop": "Alfiere",
      "piece.rook": "Torre",
      "piece.queen": "Regina",
      "firstMove": "Il Bianco muove per primo",
      "promotion.eyebrow": "Promozione",
      "promotion.title": "Scegli il nuovo pezzo",
      "promotion.detail": "Il pedone ha raggiunto l’ultima traversa.",
      "promotion.cancel": "Annulla",
      "promotion.option": "Promuovi a {piece}, {points} punti",
      "promotion.points": "{count} punti",
      "confirm.eyebrow": "Conferma",
      "confirm.cancel": "Annulla",
      "confirm.ok": "Conferma",
      "newGame.eyebrow": "Nuova partita",
      "newGame.title": "Ricominciare?",
      "newGame.text": "La partita attuale verrà abbandonata e i punti materiale torneranno a zero.",
      "newGame.ok": "Nuova partita",
      "draw.eyebrow": "Patta",
      "draw.title": "Patta d’accordo",
      "draw.text": "Il {color} propone la patta. L’altro giocatore può accettare.",
      "draw.ok": "Accetta",
      "draw.cancel": "Rifiuta",
      "resign.eyebrow": "Abbandono",
      "resign.title": "Vuoi abbandonare?",
      "resign.text": "Il {color} si arrende. La vittoria va al {winner}.",
      "resign.ok": "Abbandona",
      "resign.cancel": "Continua",
      "result.close": "Chiudi e guarda la scacchiera",
      "result.eyebrow": "Partita conclusa",
      "result.drawEyebrow": "Pareggio",
      "result.drawTitle": "Patta",
      "result.defaultTitle": "Partita conclusa",
      "result.legend": "Punti materiale catturato",
      "result.board": "Guarda la scacchiera",
      "result.new": "Nuova partita",
      "checkmate.title": "Scacco matto",
      "checkmate.short": "Scacco matto · {winner}",
      "checkmate.detail": "Il re {loser} non può sfuggire allo scacco. Vince il {winner}.",
      "checkmate.announce": "Scacco matto. Vince il {winner}.",
      "draw.stalemate.short": "Patta · Stallo",
      "draw.stalemate.detail": "Stallo: il giocatore al tratto non è sotto scacco, ma non ha mosse legali.",
      "draw.stalemate.announce": "Patta per stallo.",
      "draw.insufficient.short": "Patta · Materiale",
      "draw.insufficient.detail": "Materiale insufficiente: nessuno dei due giocatori può dare scacco matto.",
      "draw.insufficient.announce": "Patta: materiale insufficiente.",
      "draw.threefold.short": "Patta · Ripetizione",
      "draw.threefold.detail": "La stessa posizione si è ripetuta tre volte.",
      "draw.threefold.announce": "Patta per tripla ripetizione.",
      "draw.fifty.short": "Patta · 50 mosse",
      "draw.fifty.detail": "Sono state giocate 50 mosse consecutive senza catture né mosse di pedone.",
      "draw.fifty.announce": "Patta per la regola delle 50 mosse.",
      "draw.agreement.short": "Patta · Accordo",
      "draw.agreement.detail": "La patta è stata concordata da entrambi i giocatori.",
      "draw.agreement.announce": "Patta d’accordo.",
      "resignation.short": "Abbandono · Vince il {winner}",
      "resignation.title": "Abbandono",
      "resignation.detail": "Il {loser} si è arreso. Vince il {winner}.",
      "resignation.announce": "Partita conclusa per abbandono.",
      "board.label": "Scacchiera.",
      "board.turn": " Tocca al {color}.",
      "board.check": " Scacco al {color}.",
      "board.result": " Partita conclusa.",
      "board.checkmate": " Scacco matto.",
      "board.selected": " Pezzo selezionato.",
      "square.empty": "casella vuota",
      "square.selected": ", selezionato",
      "square.legal": ", mossa legale",
      "square.legalCapture": ", mossa legale con cattura",
      "square.castle": ", torre per l'arrocco",
      "square.kingCheck": ", re sotto scacco",
      "square.gameOver": ", partita conclusa",
      "a11y.selectedOne": "{piece} in {square} selezionato. 1 mossa legale.",
      "a11y.selectedMany": "{piece} in {square} selezionato. {count} mosse legali.",
      "a11y.selectedNone": "{piece} in {square} non ha mosse legali.",
      "a11y.cancel": "Selezione annullata.",
      "a11y.invalid": "Mossa non valida.",
      "a11y.over": "La partita è conclusa. Avvia una nuova partita.",
      "a11y.newGame": "Nuova partita. Il Bianco muove per primo.",
      "a11y.edgeOne": "Vantaggio di 1 punto",
      "a11y.edgeMany": "Vantaggio di {count} punti",
      "captures.none": "Nessuna cattura",
      "captures.label": "Il {color} ha catturato: {list}.",
      "move.castleKing": "{color}: arrocco lato re.",
      "move.castleQueen": "{color}: arrocco lato donna.",
      "move.base": "{color}: {piece} da {from} a {to}",
      "move.capture": ", cattura {piece}",
      "move.enPassant": " en passant",
      "move.promotion": ", promozione a {piece}",
      "move.check": " Scacco al {color}.",
      "move.turn": " Tocca al {color}.",
      "move.resignWin": " Vince il {color}.",
      "announce.gameOver": "La partita è conclusa.",
      "settings.eyebrow": "Preferenze",
      "settings.title": "Impostazioni",
      "settings.sub": "Aspetto e comportamento della partita.",
      "settings.theme": "Tema",
      "settings.themeDark": "Scuro",
      "settings.themeLight": "Chiaro",
      "settings.themeSystem": "Sistema",
      "settings.language": "Lingua",
      "settings.langSystem": "Sistema",
      "settings.game": "Gioco",
      "settings.coords": "Coordinate",
      "settings.coordsDesc": "Mostra lettere e numeri lungo i bordi.",
      "settings.lastMove": "Evidenzia l’ultima mossa",
      "settings.lastMoveDesc": "Tieni visibili partenza e arrivo dell’ultima mossa.",
      "settings.motion": "Animazioni",
      "settings.motionDesc": "Animazioni e transizioni dell’interfaccia.",
      "settings.confirmNew": "Chiedi conferma per una nuova partita",
      "settings.confirmNewDesc": "Evita di azzerare la partita per errore.",
      "settings.reset": "Ripristina predefiniti",
      "settings.close": "Chiudi",
      "settings.about": "Informazioni e crediti",
      "settings.aboutDesc": "Licenze, font e note sul gioco.",
      "settings.langChanged": "Lingua italiana attivata.",
      "settings.langSystemChanged": "Lingua di sistema attivata.",
      "settings.resetDone": "Impostazioni predefinite ripristinate.",
      "about.eyebrow": "Informazioni",
      "about.title": "Informazioni e crediti",
      "about.sub": "Chess è un gioco di scacchi locale per due giocatori. Nessun account, nessun dato raccolto.",
      "about.license": "Licenza del progetto",
      "about.licenseLink": "Licenza GPL",
      "about.rules": "Motore delle regole",
      "about.icons": "Icone dei pezzi",
      "about.fonts": "Font e icona",
      "about.chessLicense": "Licenza chess.js",
      "about.iconsLicense": "Licenza Font Awesome",
      "about.fontsLicense": "Licenza font",
      "about.apacheLicense": "Licenza Apache",
      "about.local": "Niente cookie, analytics o tracciamento: la partita e le preferenze restano sul dispositivo.",
      "about.close": "Chiudi"
    },
    en: {
      "app.title": "Chess — Two-player chess",
      "app.description": "Chess — chess for two players on the same device.",
      "app.heading": "Chess — local two-player chess",
      "brand.meta": "Two players",
      "actions.more": "More actions",
      "actions.settings": "Settings",
      "actions.newGame": "New game",
      "menu.draw": "Agree to a draw",
      "menu.resign": "Resign",
      "menu.settings": "Settings",
      "player.white": "White",
      "player.black": "Black",
      "player.whiteAria": "White player",
      "player.blackAria": "Black player",
      "player.captures": "Captures",
      "player.noCaptures": "No captures",
      "player.points": "pts",
      "states.waiting": "Waiting",
      "states.turn": "To move",
      "states.check": "In check",
      "states.winner": "Winner",
      "states.loser": "Defeated",
      "states.draw": "Draw",
      "status.turn": "{color} to move",
      "status.check": "{color} in check",
      "status.noMoves": "No legal moves",
      "values.label": "Values",
      "piece.pawn": "Pawn",
      "piece.knight": "Knight",
      "piece.bishop": "Bishop",
      "piece.rook": "Rook",
      "piece.queen": "Queen",
      "firstMove": "White moves first",
      "promotion.eyebrow": "Promotion",
      "promotion.title": "Choose the new piece",
      "promotion.detail": "The pawn reached the last rank.",
      "promotion.cancel": "Cancel",
      "promotion.option": "Promote to {piece}, {points} points",
      "promotion.points": "{count} points",
      "confirm.eyebrow": "Confirm",
      "confirm.cancel": "Cancel",
      "confirm.ok": "Confirm",
      "newGame.eyebrow": "New game",
      "newGame.title": "Start over?",
      "newGame.text": "The current game will be abandoned and captured material points will reset to zero.",
      "newGame.ok": "New game",
      "draw.eyebrow": "Draw",
      "draw.title": "Agree to a draw",
      "draw.text": "{color} offers a draw. The other player can accept.",
      "draw.ok": "Accept",
      "draw.cancel": "Decline",
      "resign.eyebrow": "Resignation",
      "resign.title": "Resign the game?",
      "resign.text": "{color} resigns. {winner} wins.",
      "resign.ok": "Resign",
      "resign.cancel": "Keep playing",
      "result.close": "Close and view the board",
      "result.eyebrow": "Game over",
      "result.drawEyebrow": "Draw",
      "result.drawTitle": "Draw",
      "result.defaultTitle": "Game over",
      "result.legend": "Captured material points",
      "result.board": "View the board",
      "result.new": "New game",
      "checkmate.title": "Checkmate",
      "checkmate.short": "Checkmate · {winner}",
      "checkmate.detail": "The {loser} king cannot escape check. {winner} wins.",
      "checkmate.announce": "Checkmate. {winner} wins.",
      "draw.stalemate.short": "Draw · Stalemate",
      "draw.stalemate.detail": "Stalemate: the player to move is not in check but has no legal moves.",
      "draw.stalemate.announce": "Draw by stalemate.",
      "draw.insufficient.short": "Draw · Material",
      "draw.insufficient.detail": "Insufficient material: neither player can deliver checkmate.",
      "draw.insufficient.announce": "Draw: insufficient material.",
      "draw.threefold.short": "Draw · Repetition",
      "draw.threefold.detail": "The same position has occurred three times.",
      "draw.threefold.announce": "Draw by threefold repetition.",
      "draw.fifty.short": "Draw · 50 moves",
      "draw.fifty.detail": "Fifty moves have been played without a capture or a pawn move.",
      "draw.fifty.announce": "Draw by the fifty-move rule.",
      "draw.agreement.short": "Draw · Agreement",
      "draw.agreement.detail": "Both players agreed to a draw.",
      "draw.agreement.announce": "Draw by agreement.",
      "resignation.short": "Resignation · {winner} wins",
      "resignation.title": "Resignation",
      "resignation.detail": "{loser} resigned. {winner} wins.",
      "resignation.announce": "Game over by resignation.",
      "board.label": "Chessboard.",
      "board.turn": " {color} to move.",
      "board.check": " {color} in check.",
      "board.result": " Game over.",
      "board.checkmate": " Checkmate.",
      "board.selected": " Piece selected.",
      "square.empty": "empty square",
      "square.selected": ", selected",
      "square.legal": ", legal move",
      "square.legalCapture": ", legal capture",
      "square.castle": ", castling rook",
      "square.kingCheck": ", king in check",
      "square.gameOver": ", game over",
      "a11y.selectedOne": "{piece} on {square} selected. 1 legal move.",
      "a11y.selectedMany": "{piece} on {square} selected. {count} legal moves.",
      "a11y.selectedNone": "{piece} on {square} has no legal moves.",
      "a11y.cancel": "Selection cleared.",
      "a11y.invalid": "Invalid move.",
      "a11y.over": "The game is over. Start a new game.",
      "a11y.newGame": "New game. White moves first.",
      "a11y.edgeOne": "Advantage of 1 point",
      "a11y.edgeMany": "Advantage of {count} points",
      "captures.none": "No captures",
      "captures.label": "{color} captured: {list}.",
      "move.castleKing": "{color}: kingside castling.",
      "move.castleQueen": "{color}: queenside castling.",
      "move.base": "{color}: {piece} from {from} to {to}",
      "move.capture": ", captures {piece}",
      "move.enPassant": " en passant",
      "move.promotion": ", promotes to {piece}",
      "move.check": " {color} is in check.",
      "move.turn": " {color} to move.",
      "move.resignWin": " {color} wins.",
      "announce.gameOver": "The game is over.",
      "settings.eyebrow": "Preferences",
      "settings.title": "Settings",
      "settings.sub": "Appearance and behaviour of the game.",
      "settings.theme": "Theme",
      "settings.themeDark": "Dark",
      "settings.themeLight": "Light",
      "settings.themeSystem": "System",
      "settings.language": "Language",
      "settings.langSystem": "System",
      "settings.game": "Game",
      "settings.coords": "Coordinates",
      "settings.coordsDesc": "Show letters and numbers along the edges.",
      "settings.lastMove": "Highlight the last move",
      "settings.lastMoveDesc": "Keep the start and end of the last move visible.",
      "settings.motion": "Animations",
      "settings.motionDesc": "Interface animations and transitions.",
      "settings.confirmNew": "Confirm before a new game",
      "settings.confirmNewDesc": "Avoid resetting the game by mistake.",
      "settings.reset": "Restore defaults",
      "settings.close": "Close",
      "settings.about": "About and credits",
      "settings.aboutDesc": "Licences, fonts and notes about the game.",
      "settings.langChanged": "English language enabled.",
      "settings.langSystemChanged": "System language enabled.",
      "settings.resetDone": "Default settings restored.",
      "about.eyebrow": "About",
      "about.title": "About and credits",
      "about.sub": "Chess is a local chess game for two players. No account, no data collected.",
      "about.license": "Project licence",
      "about.licenseLink": "GPL licence",
      "about.rules": "Rules engine",
      "about.icons": "Piece icons",
      "about.fonts": "Fonts and icon",
      "about.chessLicense": "chess.js licence",
      "about.iconsLicense": "Font Awesome licence",
      "about.fontsLicense": "Font licence",
      "about.apacheLicense": "Apache licence",
      "about.local": "No cookies, analytics or tracking: the game and preferences stay on the device.",
      "about.close": "Close"
    }
  };

  const COLOR = {
    it: {
      w: { name: "Bianco", adj: { m: ["bianco", "bianchi"], f: ["bianca", "bianche"] } },
      b: { name: "Nero", adj: { m: ["nero", "neri"], f: ["nera", "nere"] } }
    },
    en: {
      w: { name: "White", adj: "white" },
      b: { name: "Black", adj: "black" }
    }
  };

  const PIECE = {
    p: {
      value: 1,
      female: false,
      it: { one: "pedone", many: "pedoni", title: "Pedone" },
      en: { one: "pawn", many: "pawns", title: "Pawn" }
    },
    n: {
      value: 3,
      female: false,
      it: { one: "cavallo", many: "cavalli", title: "Cavallo" },
      en: { one: "knight", many: "knights", title: "Knight" }
    },
    b: {
      value: 3,
      female: false,
      it: { one: "alfiere", many: "alfieri", title: "Alfiere" },
      en: { one: "bishop", many: "bishops", title: "Bishop" }
    },
    r: {
      value: 5,
      female: true,
      it: { one: "torre", many: "torri", title: "Torre" },
      en: { one: "rook", many: "rooks", title: "Rook" }
    },
    q: {
      value: 9,
      female: true,
      it: { one: "regina", many: "regine", title: "Regina" },
      en: { one: "queen", many: "queens", title: "Queen" }
    },
    k: {
      value: 0,
      female: false,
      it: { one: "re", many: "re", title: "Re" },
      en: { one: "king", many: "kings", title: "King" }
    }
  };

  const PROMOTIONS = ["q", "r", "b", "n"];
  const OTHER = { w: "b", b: "w" };

  const el = {
    board: document.getElementById("board"),
    status: document.getElementById("status"),
    statusText: document.getElementById("status-text"),
    newGame: document.getElementById("new-game"),
    more: document.getElementById("more"),
    blackPlayer: document.getElementById("black-player"),
    whitePlayer: document.getElementById("white-player"),
    blackState: document.getElementById("black-state"),
    whiteState: document.getElementById("white-state"),
    blackTaken: document.getElementById("black-taken"),
    whiteTaken: document.getElementById("white-taken"),
    blackScore: document.getElementById("black-score"),
    whiteScore: document.getElementById("white-score"),
    blackEdge: document.getElementById("black-edge"),
    whiteEdge: document.getElementById("white-edge"),
    live: document.getElementById("live"),
    promotionDialog: document.getElementById("promotion-dialog"),
    promotionOptions: document.getElementById("promotion-options"),
    promotionCancel: document.getElementById("promotion-cancel"),
    confirmDialog: document.getElementById("confirm-dialog"),
    confirmEyebrow: document.getElementById("confirm-eyebrow"),
    confirmTitle: document.getElementById("confirm-title"),
    confirmSub: document.getElementById("confirm-sub"),
    confirmCancel: document.getElementById("confirm-cancel"),
    confirmOk: document.getElementById("confirm-ok"),
    settingsOpen: document.getElementById("settings-open"),
    settingsDialog: document.getElementById("settings-dialog"),
    settingsClose: document.getElementById("settings-close"),
    settingsReset: document.getElementById("settings-reset"),
    settingsAbout: document.getElementById("settings-about"),
    aboutDialog: document.getElementById("about-dialog"),
    aboutClose: document.getElementById("about-close"),
    resultDialog: document.getElementById("result-dialog"),
    resultEyebrow: document.getElementById("result-eyebrow"),
    resultTitle: document.getElementById("result-title"),
    resultSub: document.getElementById("result-sub"),
    resultWhiteScore: document.getElementById("result-white-score"),
    resultBlackScore: document.getElementById("result-black-score"),
    resultClose: document.getElementById("result-close"),
    resultBoard: document.getElementById("result-board"),
    resultNew: document.getElementById("result-new"),
    metaTheme: document.querySelector('meta[name="theme-color"]'),
    metaDescription: document.querySelector('meta[name="description"]')
  };

  const systemLight = window.matchMedia("(prefers-color-scheme: light)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let prefs = loadPreferences();
  let currentLang = resolveLanguage();

  let game = new Chess();
  let selected = null;
  let legalMoves = [];
  let lastMove = null;
  let result = null;
  let pendingPromotion = null;
  let confirmAction = null;
  let focusSquare = "e2";
  let resultShown = false;
  let resultTimer = 0;
  let flashTimer = 0;
  let lastFlashColor = null;

  // Captures are recorded as moves are committed, so rendering does not replay the game history.
  const capturesByColor = { w: [], b: [] };

  const boardButtons = new Map();

  const FILES = "abcdefgh";
  const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

  // ---------- Preferences ----------

  function loadPreferences() {
    const loaded = { ...DEFAULT_PREFS };

    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      if (stored && typeof stored === "object") {
        if (THEME_VALUES.includes(stored.theme)) loaded.theme = stored.theme;
        if (LANGUAGE_VALUES.includes(stored.lang)) loaded.lang = stored.lang;
        for (const key of OPTION_KEYS) {
          if (typeof stored[key] === "boolean") loaded[key] = stored[key];
        }
      }
    } catch (error) {
      // A corrupt or unavailable store simply falls back to the defaults.
    }

    return loaded;
  }

  function savePreferences() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (error) {
      // Preferences still work for the current visit if storage is unavailable.
    }
  }

  function resolvedTheme() {
    if (prefs.theme === "system") return systemLight.matches ? "light" : "dark";
    return prefs.theme;
  }

  function resolveLanguage(setting = prefs.lang) {
    if (setting === "it" || setting === "en") return setting;

    const preferred = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ""];

    for (const language of preferred) {
      const base = String(language).toLowerCase().split("-")[0];
      if (base === "it" || base === "en") return base;
    }

    return "en";
  }

  function applyTheme() {
    const theme = resolvedTheme();
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.themeSetting = prefs.theme;

    if (el.metaTheme) {
      el.metaTheme.setAttribute("content", theme === "light" ? "#f1f0eb" : "#181b20");
    }
  }

  function applyOptionAttributes() {
    const root = document.documentElement;
    root.dataset.coords = prefs.coords ? "on" : "off";
    root.dataset.lastMove = prefs.lastMove ? "on" : "off";
    root.dataset.motion = prefs.motion ? "on" : "off";
  }

  function reflectSettingsControls() {
    for (const input of document.querySelectorAll('input[name="theme"]')) {
      input.checked = input.value === prefs.theme;
    }
    for (const input of document.querySelectorAll('input[name="language"]')) {
      input.checked = input.value === prefs.lang;
    }
    for (const input of document.querySelectorAll("[data-setting]")) {
      input.checked = Boolean(prefs[input.dataset.setting]);
    }
  }

  // ---------- Localization ----------

  function t(key, vars) {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.it;
    const template = dict[key] ?? TRANSLATIONS.it[key] ?? key;

    if (!vars) return template;

    return template.replace(/\{(\w+)\}/g, (match, name) =>
      Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match
    );
  }

  function applyStaticTranslations() {
    document.documentElement.lang = currentLang;
    document.title = t("app.title");
    if (el.metaDescription) el.metaDescription.setAttribute("content", t("app.description"));

    for (const node of document.querySelectorAll("[data-i18n]")) {
      node.textContent = t(node.dataset.i18n);
    }
    for (const node of document.querySelectorAll("[data-i18n-aria-label]")) {
      node.setAttribute("aria-label", t(node.dataset.i18nAriaLabel));
    }
    for (const node of document.querySelectorAll("[data-i18n-title]")) {
      node.setAttribute("title", t(node.dataset.i18nTitle));
    }
  }

  function colorName(color) {
    return COLOR[currentLang][color].name;
  }

  function pieceNoun(type) {
    return PIECE[type][currentLang].one;
  }

  function pieceTitle(type) {
    return PIECE[type][currentLang].title;
  }

  function pieceLabel(type, color) {
    const info = PIECE[type][currentLang];
    const colorInfo = COLOR[currentLang][color];

    if (currentLang === "it") {
      const adjective = PIECE[type].female
        ? color === "w" ? "bianca" : "nera"
        : color === "w" ? "bianco" : "nero";
      return `${info.one} ${adjective}`;
    }

    return `${colorInfo.adj} ${info.one}`;
  }

  function pieceCountLabel(type, count, color) {
    const info = PIECE[type][currentLang];
    const colorInfo = COLOR[currentLang][color];
    const single = count === 1;

    if (currentLang === "it") {
      const adjective = PIECE[type].female
        ? color === "w"
          ? (single ? "bianca" : "bianche")
          : (single ? "nera" : "nere")
        : color === "w"
          ? (single ? "bianco" : "bianchi")
          : (single ? "nero" : "neri");
      return `${count} ${single ? info.one : info.many} ${adjective}`;
    }

    return `${count} ${single ? info.one : info.many} ${colorInfo.adj}`;
  }

  // The sprite groups already sit inside a 592-unit frame with a 40-unit safe margin.
  const PIECE_BOX = 592;

  function pieceSvg(type, color, className = "") {
    return `<svg class="piece-svg piece-svg--${color} ${className}" viewBox="0 0 ${PIECE_BOX} ${PIECE_BOX}" aria-hidden="true" focusable="false"><use href="#icon-${type}"></use></svg>`;
  }

  // ---------- Rendering ----------

  function buildBoard() {
    const fragment = document.createDocumentFragment();

    for (const rank of RANKS) {
      FILES.split("").forEach((file, fileIndex) => {
        const square = `${file}${rank}`;
        const button = document.createElement("button");
        button.type = "button";
        button.className = `square ${(fileIndex + rank) % 2 === 0 ? "is-light" : "is-dark"}`;
        button.dataset.square = square;
        button.tabIndex = square === focusSquare ? 0 : -1;
        button.setAttribute("aria-label", square);

        if (fileIndex === 0) {
          const rankLabel = document.createElement("span");
          rankLabel.className = "coord coord--rank";
          rankLabel.dataset.coord = rank;
          rankLabel.setAttribute("aria-hidden", "true");
          button.append(rankLabel);
        }

        if (rank === 1) {
          const fileLabel = document.createElement("span");
          fileLabel.className = "coord coord--file";
          fileLabel.dataset.coord = file;
          fileLabel.setAttribute("aria-hidden", "true");
          button.append(fileLabel);
        }

        const slot = document.createElement("span");
        slot.className = "piece-wrap";
        button.append(slot);

        boardButtons.set(square, button);
        fragment.append(button);
      });
    }

    el.board.append(fragment);
  }

  function findKing(color) {
    for (const rank of RANKS) {
      for (const file of FILES) {
        const square = `${file}${rank}`;
        const piece = game.get(square);
        if (piece && piece.type === "k" && piece.color === color) return square;
      }
    }
    return null;
  }

  function lastMoveSquares() {
    const squares = new Set();
    if (!lastMove) return squares;

    squares.add(lastMove.from);
    squares.add(lastMove.to);

    if (lastMove.flags.includes("k") || lastMove.flags.includes("q")) {
      const rank = lastMove.color === "w" ? "1" : "8";
      if (lastMove.flags.includes("k")) {
        squares.add(`h${rank}`);
        squares.add(`f${rank}`);
      } else {
        squares.add(`a${rank}`);
        squares.add(`d${rank}`);
      }
    }

    return squares;
  }

  function arrivalSquares() {
    const squares = new Set();
    if (!lastMove) return squares;

    squares.add(lastMove.to);

    if (lastMove.flags.includes("k") || lastMove.flags.includes("q")) {
      const rank = lastMove.color === "w" ? "1" : "8";
      squares.add(lastMove.flags.includes("k") ? `f${rank}` : `d${rank}`);
    }

    return squares;
  }

  function targetFor(square) {
    return selected ? legalMoves.find((move) => move.to === square) : null;
  }

  function castlingRookSquares() {
    const squares = new Set();
    if (!selected) return squares;

    const king = game.get(selected);
    if (!king || king.type !== "k" || king.color !== game.turn()) return squares;

    const rank = selected[1];
    for (const move of legalMoves) {
      if (move.piece !== "k") continue;
      if (move.flags.includes("k")) squares.add(`h${rank}`);
      if (move.flags.includes("q")) squares.add(`a${rank}`);
    }

    return squares;
  }

  function castlingMoveForRook(square) {
    if (!castlingRookSquares().has(square)) return null;
    const side = square[0] === "h" ? "k" : "q";
    return legalMoves.find((move) => move.piece === "k" && move.flags.includes(side)) || null;
  }

  function renderBoard() {
    const turn = game.turn();
    const checked = result ? result.kind === "checkmate" : game.isCheck();
    const kingSquare = checked ? findKing(turn) : null;
    const lastSquares = lastMoveSquares();
    const arrivals = arrivalSquares();
    const castleRooks = castlingRookSquares();

    for (const [square, button] of boardButtons) {
      const piece = game.get(square);
      const slot = button.querySelector(".piece-wrap");
      const target = targetFor(square);
      const isCapture = Boolean(target && (target.captured || target.flags.includes("e")));
      const isSelected = selected === square;

      slot.innerHTML = piece ? pieceSvg(piece.type, piece.color) : "";

      button.classList.toggle("is-selected", isSelected);
      button.classList.toggle("is-target", Boolean(target));
      button.classList.toggle("is-capture", isCapture);
      button.classList.toggle("is-last", lastSquares.has(square));
      button.classList.toggle("is-arrived", arrivals.has(square));
      button.classList.toggle("is-check", square === kingSquare);
      button.classList.toggle("is-castle", castleRooks.has(square));
      button.tabIndex = square === focusSquare ? 0 : -1;

      let label;
      if (piece) {
        label = `${square}: ${pieceLabel(piece.type, piece.color)}`;
      } else {
        label = `${square}: ${t("square.empty")}`;
      }

      if (isSelected) label += t("square.selected");
      if (target) label += isCapture ? t("square.legalCapture") : t("square.legal");
      if (castleRooks.has(square)) label += t("square.castle");
      if (square === kingSquare) label += t("square.kingCheck");
      if (result) label += t("square.gameOver");

      button.setAttribute("aria-label", label);
    }

    let boardLabel = t("board.label");
    if (result) {
      boardLabel += result.kind === "checkmate" ? t("board.checkmate") : t("board.result");
    } else if (checked) {
      boardLabel += t("board.check", { color: colorName(turn) });
    } else {
      boardLabel += t("board.turn", { color: colorName(turn) });
    }
    if (selected) boardLabel += t("board.selected");
    el.board.setAttribute("aria-label", boardLabel);
    el.board.dataset.turn = result ? "over" : turn;
    el.board.dataset.result = result ? result.kind : "";
  }

  function capturedValue(list) {
    return list.reduce((total, type) => total + PIECE[type].value, 0);
  }

  function capturesLabel(list, capturedColor) {
    if (!list.length) return t("captures.none");
    const counts = new Map();
    for (const type of list) counts.set(type, (counts.get(type) || 0) + 1);
    const parts = ["q", "r", "b", "n", "p"]
      .filter((type) => counts.has(type))
      .map((type) => pieceCountLabel(type, counts.get(type), capturedColor));
    return t("captures.label", {
      color: colorName(OTHER[capturedColor]),
      list: parts.join(", ")
    });
  }

  function renderCaptures(container, list, capturedColor) {
    if (!list.length) {
      container.innerHTML = '<span class="taken__empty" aria-hidden="true">—</span>';
      container.setAttribute("aria-label", capturesLabel(list, capturedColor));
      return;
    }

    const counts = new Map();
    for (const type of list) counts.set(type, (counts.get(type) || 0) + 1);

    container.innerHTML = ["q", "r", "b", "n", "p"]
      .filter((type) => counts.has(type))
      .map((type) => {
        const count = counts.get(type);
        return `<span class="taken__item" aria-hidden="true">${pieceSvg(
          type,
          capturedColor
        )}${count > 1 ? `<span class="taken__count">${count}</span>` : ""}</span>`;
      })
      .join("");
    container.setAttribute("aria-label", capturesLabel(list, capturedColor));
  }

  function setEdge(element, difference) {
    if (difference > 0) {
      element.hidden = false;
      element.textContent = `+${difference}`;
      element.setAttribute(
        "aria-label",
        difference === 1
          ? t("a11y.edgeOne")
          : t("a11y.edgeMany", { count: difference })
      );
    } else {
      element.hidden = true;
      element.textContent = "";
      element.removeAttribute("aria-label");
    }
  }

  function flashScore(color) {
    const panel = color === "w" ? el.whitePlayer : el.blackPlayer;
    window.clearTimeout(flashTimer);
    if (lastFlashColor) {
      (lastFlashColor === "w" ? el.whitePlayer : el.blackPlayer).classList.remove("is-flash");
    }
    lastFlashColor = color;
    // Restart the animation even when two captures happen close together.
    void panel.offsetWidth;
    panel.classList.add("is-flash");
    flashTimer = window.setTimeout(() => {
      panel.classList.remove("is-flash");
      if (lastFlashColor === color) lastFlashColor = null;
    }, 460);
  }

  function renderPanels() {
    const captured = capturesByColor;
    const whiteScore = capturedValue(captured.w);
    const blackScore = capturedValue(captured.b);
    const turn = game.turn();
    const checked = !result && game.isCheck();

    el.whiteScore.textContent = whiteScore;
    el.blackScore.textContent = blackScore;

    setEdge(el.whiteEdge, whiteScore - blackScore);
    setEdge(el.blackEdge, blackScore - whiteScore);

    renderCaptures(el.whiteTaken, captured.w, "b");
    renderCaptures(el.blackTaken, captured.b, "w");

    const panels = [
      { root: el.blackPlayer, state: el.blackState, color: "b" },
      { root: el.whitePlayer, state: el.whiteState, color: "w" }
    ];

    for (const panel of panels) {
      const isTurn = !result && turn === panel.color;
      panel.root.classList.toggle("is-active", isTurn);
      panel.root.classList.toggle("is-check", isTurn && checked);
      panel.root.classList.toggle("is-winner", Boolean(result && result.winner === panel.color));

      if (result) {
        if (result.winner) {
          panel.state.textContent = result.winner === panel.color
            ? t("states.winner")
            : t("states.loser");
        } else {
          panel.state.textContent = t("states.draw");
        }
      } else if (isTurn) {
        panel.state.textContent = checked ? t("states.check") : t("states.turn");
      } else {
        panel.state.textContent = t("states.waiting");
      }
    }
  }

  function renderStatus() {
    el.status.classList.remove("is-check", "is-over");

    if (result) {
      el.status.classList.add("is-over");
      el.statusText.textContent = result.short;
      return;
    }

    const turn = game.turn();
    if (game.isCheck()) {
      el.status.classList.add("is-check");
      el.statusText.textContent = t("status.check", { color: colorName(turn) });
    } else {
      el.statusText.textContent = t("status.turn", { color: colorName(turn) });
    }
  }

  function renderControls() {
    el.more.hidden = Boolean(result);
  }

  function renderAll() {
    renderBoard();
    renderPanels();
    renderStatus();
    renderControls();
  }

  function announce(message) {
    el.live.textContent = message;
  }

  function selectSquare(square) {
    const piece = game.get(square);
    if (!piece || piece.color !== game.turn() || result) return;

    selected = square;
    focusSquare = square;
    legalMoves = game.moves({ square, verbose: true });
    renderBoard();
    renderStatus();

    const count = new Set(legalMoves.map((move) => move.to)).size;
    const label = pieceLabel(piece.type, piece.color);

    if (!count) {
      el.statusText.textContent = t("status.noMoves");
      announce(t("a11y.selectedNone", { piece: label, square }));
    } else if (count === 1) {
      announce(t("a11y.selectedOne", { piece: label, square }));
    } else {
      announce(t("a11y.selectedMany", { piece: label, square, count }));
    }
  }

  function clearSelection(options = {}) {
    if (!selected) return;
    selected = null;
    legalMoves = [];
    renderBoard();
    renderStatus();
    if (options.announce) announce(t("a11y.cancel"));
  }

  function openPromotion(moves) {
    pendingPromotion = moves;
    const color = game.turn();
    el.promotionOptions.innerHTML = PROMOTIONS.map((type) => {
      const count = PIECE[type].value;
      const name = pieceTitle(type);
      return `<button type="button" class="promote" data-promotion="${type}" aria-label="${t("promotion.option", {
        piece: name.toLowerCase(),
        points: count
      })}">
        ${pieceSvg(type, color)}
        <span class="promote__name">${name}</span>
        <span class="promote__value">${t("promotion.points", { count })}</span>
      </button>`;
    }).join("");
    el.promotionDialog.showModal();
    const first = el.promotionOptions.querySelector("button");
    if (first) first.focus();
  }

  function closePromotionDialog() {
    pendingPromotion = null;
    if (el.promotionDialog.open) el.promotionDialog.close();
  }

  function commitMove(move) {
    let applied;
    try {
      applied = game.move({ from: move.from, to: move.to, promotion: move.promotion });
    } catch (error) {
      announce(t("a11y.invalid"));
      return;
    }

    if (!applied) {
      announce(t("a11y.invalid"));
      return;
    }

    if (applied.captured) capturesByColor[applied.color].push(applied.captured);

    lastMove = applied;
    selected = null;
    legalMoves = [];
    pendingPromotion = null;
    focusSquare = applied.to;

    const outcome = evaluateResult(applied);

    if (outcome) {
      result = outcome;
      resultShown = false;
    }

    renderAll();

    if (applied.captured) flashScore(applied.color);

    announceMove(applied);

    if (result) {
      queueResultDialog();
    }
  }

  function tryMoveTo(square) {
    const matching = legalMoves.filter((move) => move.to === square);
    if (!matching.length) return false;

    if (matching.some((move) => move.promotion)) {
      openPromotion(matching);
      return true;
    }

    commitMove(matching[0]);
    return true;
  }

  function handleSquare(square) {
    if (result) {
      announce(t("a11y.over"));
      return;
    }

    focusSquare = square;

    if (selected === square) {
      clearSelection({ announce: true });
      return;
    }

    if (selected && tryMoveTo(square)) return;

    const castle = castlingMoveForRook(square);
    if (castle) {
      commitMove(castle);
      return;
    }

    const piece = game.get(square);
    if (piece && piece.color === game.turn()) {
      selectSquare(square);
      return;
    }

    if (selected) {
      clearSelection({ announce: true });
    }
  }

  function nextFocusSquare(from, key) {
    const file = from[0];
    const rank = Number(from[1]);
    let fileIndex = FILES.indexOf(file);
    let nextRank = rank;

    switch (key) {
      case "ArrowLeft":
        fileIndex -= 1;
        break;
      case "ArrowRight":
        fileIndex += 1;
        break;
      case "ArrowUp":
        nextRank += 1;
        break;
      case "ArrowDown":
        nextRank -= 1;
        break;
      case "Home":
        fileIndex = 0;
        break;
      case "End":
        fileIndex = 7;
        break;
      default:
        return null;
    }

    fileIndex = Math.max(0, Math.min(7, fileIndex));
    nextRank = Math.max(1, Math.min(8, nextRank));
    return `${FILES[fileIndex]}${nextRank}`;
  }

  function focusBoardSquare(square) {
    const button = boardButtons.get(square);
    if (!button) return;
    focusSquare = square;
    for (const [name, item] of boardButtons) item.tabIndex = name === square ? 0 : -1;
    button.focus();
  }

  function outcomeText(kind, winner) {
    if (kind === "checkmate") {
      const loser = OTHER[winner];
      return {
        short: t("checkmate.short", { winner: colorName(winner) }),
        title: t("checkmate.title"),
        detail: t("checkmate.detail", {
          loser: colorName(loser).toLowerCase(),
          winner: colorName(winner)
        }),
        announce: t("checkmate.announce", { winner: colorName(winner) })
      };
    }

    if (kind === "resignation") {
      const loser = OTHER[winner];
      return {
        short: t("resignation.short", { winner: colorName(winner) }),
        title: t("resignation.title"),
        detail: t("resignation.detail", {
          loser: colorName(loser),
          winner: colorName(winner)
        }),
        announce: t("resignation.announce")
      };
    }

    return {
      short: t(`draw.${kind}.short`),
      title: t("result.drawTitle"),
      detail: t(`draw.${kind}.detail`),
      announce: t(`draw.${kind}.announce`)
    };
  }

  function makeOutcome(kind, winner = null) {
    return { kind, winner, ...outcomeText(kind, winner) };
  }

  function evaluateResult(move) {
    if (game.isCheckmate()) return makeOutcome("checkmate", move.color);
    if (game.isStalemate()) return makeOutcome("stalemate");
    if (game.isInsufficientMaterial()) return makeOutcome("insufficient");
    if (game.isThreefoldRepetition()) return makeOutcome("threefold");
    if (game.isDrawByFiftyMoves()) return makeOutcome("fifty");
    return null;
  }

  function endGame(outcome) {
    if (result) return;
    result = outcome;
    resultShown = false;
    selected = null;
    legalMoves = [];
    renderAll();
    announce(`${outcome.announce} ${t("announce.gameOver")}`);
    queueResultDialog();
  }

  function announceMove(move) {
    const mover = colorName(move.color);
    let text = "";

    if (move.flags.includes("k")) {
      text = t("move.castleKing", { color: mover });
    } else if (move.flags.includes("q")) {
      text = t("move.castleQueen", { color: mover });
    } else {
      text = t("move.base", {
        color: mover,
        piece: pieceNoun(move.piece),
        from: move.from,
        to: move.to
      });
      if (move.captured) text += t("move.capture", { piece: pieceNoun(move.captured) });
      if (move.flags.includes("e")) text += t("move.enPassant");
      if (move.promotion) text += t("move.promotion", { piece: pieceNoun(move.promotion) });
      text += ".";
    }

    if (result) {
      text += ` ${result.announce}`;
      if (result.kind === "resignation") {
        text += t("move.resignWin", { color: colorName(result.winner) });
      }
    } else {
      if (game.isCheck()) text += t("move.check", { color: colorName(game.turn()) });
      text += t("move.turn", { color: colorName(game.turn()) });
    }

    announce(text);
  }

  function queueResultDialog() {
    if (!result || resultShown || el.resultDialog.open) return;
    resultShown = true;
    window.clearTimeout(resultTimer);
    const delay = reduceMotion.matches || !prefs.motion ? 0 : 420;
    resultTimer = window.setTimeout(showResultDialog, delay);
  }

  function fillResultDialog() {
    el.resultEyebrow.textContent = result.winner ? t("result.eyebrow") : t("result.drawEyebrow");
    el.resultTitle.textContent = result.title || t("result.defaultTitle");
    el.resultSub.textContent = result.detail;
    el.resultWhiteScore.textContent = el.whiteScore.textContent;
    el.resultBlackScore.textContent = el.blackScore.textContent;
  }

  function showResultDialog() {
    if (!result) return;
    fillResultDialog();
    el.resultDialog.showModal();
    el.resultNew.focus();
  }

  function openConfirm(config) {
    confirmAction = config.onConfirm;
    el.confirmEyebrow.textContent = config.eyebrow || t("confirm.eyebrow");
    el.confirmTitle.textContent = config.title;
    el.confirmSub.textContent = config.text;
    el.confirmCancel.textContent = config.cancel || t("confirm.cancel");
    el.confirmOk.textContent = config.confirm || t("confirm.ok");
    el.confirmOk.classList.toggle("btn--danger", Boolean(config.danger));
    el.confirmOk.classList.toggle("btn--primary", !config.danger);
    el.confirmDialog.showModal();
    el.confirmCancel.focus();
  }

  function requestNewGame() {
    el.more.open = false;

    if (result || game.history().length === 0 || !prefs.confirmNew) {
      resetGame();
      return;
    }

    openConfirm({
      eyebrow: t("newGame.eyebrow"),
      title: t("newGame.title"),
      text: t("newGame.text"),
      confirm: t("newGame.ok"),
      cancel: t("confirm.cancel"),
      onConfirm: resetGame
    });
  }

  function requestDraw() {
    el.more.open = false;
    if (result) return;

    const proposer = colorName(game.turn());
    openConfirm({
      eyebrow: t("draw.eyebrow"),
      title: t("draw.title"),
      text: t("draw.text", { color: proposer }),
      confirm: t("draw.ok"),
      cancel: t("draw.cancel"),
      onConfirm: () => endGame(makeOutcome("agreement"))
    });
  }

  function requestResign() {
    el.more.open = false;
    if (result) return;

    const loser = game.turn();
    const winner = OTHER[loser];
    openConfirm({
      eyebrow: t("resign.eyebrow"),
      title: t("resign.title"),
      text: t("resign.text", { color: colorName(loser), winner: colorName(winner) }),
      confirm: t("resign.ok"),
      cancel: t("resign.cancel"),
      danger: true,
      onConfirm: () => endGame(makeOutcome("resignation", winner))
    });
  }

  function resetGame() {
    window.clearTimeout(resultTimer);
    window.clearTimeout(flashTimer);
    el.resultDialog.close();
    el.confirmDialog.close();
    el.promotionDialog.close();

    game = new Chess();
    capturesByColor.w.length = 0;
    capturesByColor.b.length = 0;
    selected = null;
    legalMoves = [];
    lastMove = null;
    result = null;
    pendingPromotion = null;
    confirmAction = null;
    resultShown = false;
    lastFlashColor = null;
    focusSquare = "e2";
    el.blackPlayer.classList.remove("is-flash");
    el.whitePlayer.classList.remove("is-flash");
    el.more.open = false;

    renderAll();
    announce(t("a11y.newGame"));
  }

  function makePromotionChoice(type) {
    if (!pendingPromotion) return;
    const move = pendingPromotion.find((item) => item.promotion === type);
    pendingPromotion = null;
    if (el.promotionDialog.open) el.promotionDialog.close();
    if (move) commitMove(move);
  }

  // ---------- Settings ----------

  function refreshResultCopy() {
    if (!result) return;
    Object.assign(result, outcomeText(result.kind, result.winner));
    if (el.resultDialog.open) fillResultDialog();
  }

  function applyLanguage(language) {
    prefs.lang = language;
    currentLang = resolveLanguage(language);
    savePreferences();
    refreshResultCopy();
    applyStaticTranslations();
    reflectSettingsControls();
    renderAll();
  }

  function changeLanguage(language) {
    if (!LANGUAGE_VALUES.includes(language)) return;
    applyLanguage(language);
    announce(t(language === "system" ? "settings.langSystemChanged" : "settings.langChanged"));
  }

  function changeTheme(theme) {
    if (!THEME_VALUES.includes(theme)) return;
    prefs.theme = theme;
    savePreferences();
    applyTheme();
    reflectSettingsControls();
  }

  function changeOption(key, value) {
    if (!OPTION_KEYS.includes(key)) return;
    prefs[key] = value;
    savePreferences();
    applyOptionAttributes();
    reflectSettingsControls();
  }

  function resetPreferences() {
    prefs = { ...DEFAULT_PREFS };
    currentLang = resolveLanguage();
    savePreferences();
    refreshResultCopy();
    applyTheme();
    applyOptionAttributes();
    applyStaticTranslations();
    reflectSettingsControls();
    renderAll();
    announce(t("settings.resetDone"));
  }

  function openSettings() {
    el.more.open = false;
    if (el.settingsDialog.open) return;

    el.settingsDialog.showModal();

    // Firefox focuses the scrollable body first; start on the active theme instead.
    const activeTheme = el.settingsDialog.querySelector('input[name="theme"]:checked');
    if (activeTheme) activeTheme.focus();
  }

  function openAbout() {
    if (!el.aboutDialog.open) el.aboutDialog.showModal();
    el.aboutClose.focus();
  }

  function enableBackdropClose(dialog) {
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const outside =
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom;
      if (outside) dialog.close();
    });
  }

  for (const dialog of [
    el.settingsDialog,
    el.aboutDialog,
    el.promotionDialog,
    el.confirmDialog,
    el.resultDialog
  ]) {
    enableBackdropClose(dialog);
  }

  // ---------- Events ----------

  el.board.addEventListener("click", (event) => {
    const button = event.target.closest(".square");
    if (button && el.board.contains(button)) handleSquare(button.dataset.square);
  });

  el.board.addEventListener("focusin", (event) => {
    const button = event.target.closest(".square");
    if (!button) return;
    if (focusSquare !== button.dataset.square) {
      focusSquare = button.dataset.square;
      for (const [name, item] of boardButtons) {
        item.tabIndex = name === focusSquare ? 0 : -1;
      }
    }
  });

  el.board.addEventListener("keydown", (event) => {
    if (document.querySelector("dialog[open]")) return;

    if (event.key === "Escape") {
      if (selected) {
        event.preventDefault();
        clearSelection({ announce: true });
      }
      return;
    }

    const current =
      document.activeElement?.closest?.(".square")?.dataset.square || focusSquare;
    const next = nextFocusSquare(current, event.key);
    if (!next) return;

    event.preventDefault();
    focusBoardSquare(next);
  });

  el.newGame.addEventListener("click", requestNewGame);
  el.promotionCancel.addEventListener("click", closePromotionDialog);

  el.promotionOptions.addEventListener("click", (event) => {
    const button = event.target.closest("[data-promotion]");
    if (button) makePromotionChoice(button.dataset.promotion);
  });

  el.promotionDialog.addEventListener("close", () => {
    pendingPromotion = null;
  });

  el.confirmCancel.addEventListener("click", () => {
    confirmAction = null;
    el.confirmDialog.close();
  });

  el.confirmOk.addEventListener("click", () => {
    const action = confirmAction;
    confirmAction = null;
    el.confirmDialog.close();
    if (action) action();
  });

  el.confirmDialog.addEventListener("close", () => {
    confirmAction = null;
  });

  el.resultClose.addEventListener("click", () => el.resultDialog.close());
  el.resultBoard.addEventListener("click", () => el.resultDialog.close());
  el.resultNew.addEventListener("click", () => {
    el.resultDialog.close();
    resetGame();
  });

  el.settingsOpen.addEventListener("click", openSettings);
  el.settingsClose.addEventListener("click", () => el.settingsDialog.close());
  el.settingsReset.addEventListener("click", resetPreferences);
  el.settingsAbout.addEventListener("click", openAbout);
  el.aboutClose.addEventListener("click", () => el.aboutDialog.close());

  el.aboutDialog.addEventListener("close", () => {
    if (el.settingsDialog.open) el.settingsAbout.focus();
  });

  el.settingsDialog.addEventListener("change", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;

    if (input.name === "theme") {
      changeTheme(input.value);
    } else if (input.name === "language") {
      changeLanguage(input.value);
    } else if (input.dataset.setting) {
      changeOption(input.dataset.setting, input.checked);
    }
  });

  el.settingsDialog.addEventListener("close", () => {
    const visible = (node) => Boolean(node && node.getClientRects().length);
    if (visible(el.settingsOpen)) {
      el.settingsOpen.focus();
    } else {
      el.more.querySelector("summary")?.focus();
    }
  });

  systemLight.addEventListener("change", () => {
    if (prefs.theme === "system") applyTheme();
  });

  el.more.addEventListener("click", (event) => {
    const button = event.target.closest("[data-menu]");
    if (!button) return;
    if (button.dataset.menu === "draw") requestDraw();
    if (button.dataset.menu === "resign") requestResign();
    if (button.dataset.menu === "settings") openSettings();
  });

  document.addEventListener("pointerdown", (event) => {
    if (el.more.open && !el.more.contains(event.target)) el.more.open = false;
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (el.more.open && !document.querySelector("dialog[open]")) {
      el.more.open = false;
      el.more.querySelector("summary")?.focus();
    }
  });

  window.addEventListener("blur", () => {
    el.more.open = false;
  });

  // ---------- Init ----------

  applyTheme();
  applyOptionAttributes();
  applyStaticTranslations();
  reflectSettingsControls();
  buildBoard();
  renderAll();
})();
