import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-typescript";

export type CodeBlockLanguage =
  | "javascript"
  | "typescript"
  | "markup"
  | "css"
  | "json"
  | "bash";

export type CodeBlockToolData = {
  language?: CodeBlockLanguage | string;
  code?: string;
  text?: string;
};

export type CodeBlockToolConfig = {
  defaultLanguage?: CodeBlockLanguage;
  showLineNumbers?: boolean;
  maxHeight?: number;
};

type EditorApi = {
  listeners?: {
    on: (
      element: HTMLElement | HTMLTextAreaElement | HTMLButtonElement | HTMLSelectElement,
      event: string,
      handler: EventListenerOrEventListenerObject,
      useCapture?: boolean,
    ) => void;
  };
};

const SUPPORTED_LANGUAGES: CodeBlockLanguage[] = [
  "javascript",
  "typescript",
  "markup",
  "css",
  "json",
  "bash",
];

const LANGUAGE_LABELS: Record<CodeBlockLanguage, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  markup: "HTML",
  css: "CSS",
  json: "JSON",
  bash: "Bash",
};

const DEFAULT_LANGUAGE: CodeBlockLanguage = "typescript";
const DEFAULT_MAX_HEIGHT = 420;

function normalizeLanguage(language: string | undefined, fallback: CodeBlockLanguage) {
  if (!language) return fallback;

  const normalized = language.toLowerCase().trim();

  if (normalized === "html" || normalized === "markup") return "markup";
  if (normalized === "js" || normalized === "javascript") return "javascript";
  if (normalized === "ts" || normalized === "typescript") return "typescript";
  if (normalized === "css") return "css";
  if (normalized === "json") return "json";
  if (normalized === "bash" || normalized === "shell" || normalized === "sh") return "bash";

  return fallback;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getLineCount(code: string) {
  if (!code) return 1;

  return Math.max(1, code.replace(/\r\n/g, "\n").split("\n").length);
}

function buildLineNumberText(lineCount: number) {
  return Array.from({ length: lineCount }, (_, index) => String(index + 1)).join("\n");
}

function insertTextAtSelection(textarea: HTMLTextAreaElement, text: string) {
  const start = textarea.selectionStart ?? textarea.value.length;
  const end = textarea.selectionEnd ?? textarea.value.length;
  const nextValue = `${textarea.value.slice(0, start)}${text}${textarea.value.slice(end)}`;

  textarea.value = nextValue;
  const nextCursor = start + text.length;
  textarea.setSelectionRange(nextCursor, nextCursor);
  textarea.dispatchEvent(new Event("input", { bubbles: true }));
}

async function copyTextToClipboard(text: string) {
  if (!text) return false;

  if (navigator.clipboard?.writeText && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const fallback = document.createElement("textarea");
  fallback.value = text;
  fallback.setAttribute("readonly", "true");
  fallback.style.position = "fixed";
  fallback.style.opacity = "0";
  fallback.style.pointerEvents = "none";
  fallback.style.left = "-9999px";
  document.body.appendChild(fallback);
  fallback.select();

  try {
    return document.execCommand("copy");
  } finally {
    fallback.remove();
  }
}

export default class CodeBlockTool {
  static get toolbox() {
    return {
      title: "Code Block",
      icon: `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M5.7 5.3 2.8 8.5l2.9 3.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M11.3 5.3 14.2 8.5l-2.9 3.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 4.1 7.5 12.9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      </svg>`,
    };
  }

  static get isReadOnlySupported() {
    return true;
  }

  private api: EditorApi;
  private readOnly: boolean;
  private config: CodeBlockToolConfig;
  private data: Required<Pick<CodeBlockToolData, "language" | "code">>;
  private wrapper: HTMLDivElement | null = null;
  private textarea: HTMLTextAreaElement | null = null;
  private codePreview: HTMLPreElement | null = null;
  private lineNumbers: HTMLPreElement | null = null;
  private languageSelect: HTMLSelectElement | null = null;
  private copyButton: HTMLButtonElement | null = null;
  private copiedTimer: number | null = null;
  private isCopied = false;

  constructor({
    data,
    api,
    config,
    readOnly,
  }: {
    data: CodeBlockToolData;
    api: any;
    config?: CodeBlockToolConfig;
    readOnly?: boolean;
  }) {
    this.api = api;
    this.readOnly = readOnly ?? false;
    this.config = config ?? {};

    const defaultLanguage = normalizeLanguage(
      this.config.defaultLanguage,
      DEFAULT_LANGUAGE,
    );

    this.data = {
      language: normalizeLanguage(data?.language, defaultLanguage),
      code: data?.code ?? data?.text ?? "",
    };
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.className = "code-block-tool";

    const toolbar = document.createElement("div");
    toolbar.className = "code-block-tool__toolbar";

    const toolbarLeft = document.createElement("div");
    toolbarLeft.className = "code-block-tool__toolbar-left";

    const languageLabel = document.createElement("span");
    languageLabel.className = "code-block-tool__label";
    languageLabel.textContent = "Language";
    toolbarLeft.appendChild(languageLabel);

    const languageSelect = document.createElement("select");
    languageSelect.className = "code-block-tool__language";
    languageSelect.setAttribute("aria-label", "Code block language");

    for (const language of SUPPORTED_LANGUAGES) {
      const option = document.createElement("option");
      option.value = language;
      option.textContent = LANGUAGE_LABELS[language];
      languageSelect.appendChild(option);
    }

    languageSelect.value = this.data.language;
    if (this.readOnly) {
      languageSelect.disabled = true;
    }

    toolbarLeft.appendChild(languageSelect);

    const toolbarRight = document.createElement("div");
    toolbarRight.className = "code-block-tool__toolbar-right";

    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = "code-block-tool__copy";
    copyButton.setAttribute("aria-label", "Copy code");
    copyButton.textContent = "Copy code";
    toolbarRight.appendChild(copyButton);

    toolbar.appendChild(toolbarLeft);
    toolbar.appendChild(toolbarRight);

    const body = document.createElement("div");
    body.className = "code-block-tool__body";

    const showLineNumbers = this.config.showLineNumbers ?? true;
    const maxHeight = this.config.maxHeight ?? DEFAULT_MAX_HEIGHT;
    body.style.setProperty("--code-block-max-height", `${maxHeight}px`);
    body.dataset.lineNumbers = showLineNumbers ? "true" : "false";
    body.dataset.readOnly = this.readOnly ? "true" : "false";

    const lineNumbers = document.createElement("pre");
    lineNumbers.className = "code-block-tool__line-numbers";
    lineNumbers.setAttribute("aria-hidden", "true");
    lineNumbers.hidden = !showLineNumbers;

    const viewport = document.createElement("div");
    viewport.className = "code-block-tool__viewport";

    const codePreview = document.createElement("pre");
    codePreview.className = "code-block-tool__preview";
    codePreview.setAttribute("aria-label", "Code preview");

    if (!this.readOnly) {
      const textarea = document.createElement("textarea");
      textarea.className = "code-block-tool__input";
      textarea.spellcheck = false;
      textarea.setAttribute("autocapitalize", "off");
      textarea.setAttribute("autocomplete", "off");
      textarea.setAttribute("autocorrect", "off");
      textarea.setAttribute("wrap", "off");
      textarea.value = this.data.code;
      textarea.setAttribute("aria-label", "Code editor");
      textarea.dataset.language = this.data.language;

      viewport.appendChild(codePreview);
      viewport.appendChild(textarea);
      this.textarea = textarea;

      this.api.listeners?.on(textarea, "input", () => {
        this.data.code = textarea.value;
        this.updatePreview();
      });

      this.api.listeners?.on(textarea, "scroll", () => {
        this.syncScroll();
      });

      this.api.listeners?.on(textarea, "keydown", (event) => {
        const keyboardEvent = event as KeyboardEvent;

        if (keyboardEvent.key === "Tab") {
          keyboardEvent.preventDefault();
          insertTextAtSelection(textarea, "\t");
          return;
        }

        if ((keyboardEvent.metaKey || keyboardEvent.ctrlKey) && keyboardEvent.key.toLowerCase() === "c") {
          return;
        }
      });

      this.api.listeners?.on(languageSelect, "change", () => {
        this.data.language = normalizeLanguage(languageSelect.value, DEFAULT_LANGUAGE);
        this.updatePreview();
      });
    } else {
      viewport.appendChild(codePreview);
    }

    this.api.listeners?.on(copyButton, "click", () => {
      void this.handleCopy();
    });

    this.wrapper = wrapper;
    this.codePreview = codePreview;
    this.lineNumbers = lineNumbers;
    this.languageSelect = languageSelect;
    this.copyButton = copyButton;

    body.appendChild(lineNumbers);
    body.appendChild(viewport);
    wrapper.appendChild(toolbar);
    wrapper.appendChild(body);

    this.updatePreview();

    return wrapper;
  }

  save() {
    return {
      language: normalizeLanguage(this.languageSelect?.value ?? this.data.language, DEFAULT_LANGUAGE),
      code: this.textarea?.value ?? this.data.code,
    };
  }

  destroy() {
    if (this.copiedTimer !== null) {
      window.clearTimeout(this.copiedTimer);
      this.copiedTimer = null;
    }
  }

  private updatePreview() {
    const code = this.textarea?.value ?? this.data.code;
    const language = normalizeLanguage(this.languageSelect?.value ?? this.data.language, DEFAULT_LANGUAGE);

    this.data = {
      code,
      language,
    };

    if (this.codePreview) {
      const grammar = Prism.languages[language];
      this.codePreview.innerHTML = grammar
        ? Prism.highlight(code, grammar, language)
        : escapeHtml(code);
    }

    if (this.lineNumbers) {
      this.lineNumbers.textContent = buildLineNumberText(getLineCount(code));
    }

    if (this.textarea) {
      this.textarea.dataset.language = language;
      this.syncScroll();
    }
  }

  private syncScroll() {
    if (!this.textarea || !this.codePreview || !this.lineNumbers) return;

    const scrollTop = this.textarea.scrollTop;
    const scrollLeft = this.textarea.scrollLeft;

    this.codePreview.scrollTop = scrollTop;
    this.codePreview.scrollLeft = scrollLeft;
    this.lineNumbers.style.transform = `translateY(${-scrollTop}px)`;
  }

  private setCopiedState(nextState: boolean) {
    this.isCopied = nextState;

    if (!this.copyButton) return;

    this.copyButton.textContent = nextState ? "Copied!" : "Copy code";
    this.copyButton.setAttribute(
      "aria-label",
      nextState ? "Code copied to clipboard" : "Copy code",
    );
  }

  private async handleCopy() {
    const code = this.textarea?.value ?? this.data.code;

    if (!code.trim()) {
      return;
    }

    try {
      await copyTextToClipboard(code);
      this.setCopiedState(true);

      if (this.copiedTimer !== null) {
        window.clearTimeout(this.copiedTimer);
      }

      this.copiedTimer = window.setTimeout(() => {
        this.setCopiedState(false);
        this.copiedTimer = null;
      }, 2000);
    } catch {
      this.setCopiedState(false);
    }
  }
}
