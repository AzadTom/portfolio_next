"use client";
import { useEffect, useRef, useState } from "react";
import type EditorJS from "@editorjs/editorjs";
import { ArrowLeft, Redo2, Undo2 } from "lucide-react";
import styles from "./style.module.css";
import { postBlogs } from "@/lib/blogs/blogsapi";
import { BlogStatus } from "@/lib/blogs/type";
import { useRouter } from "next/navigation";
import { buildYouTubeEmbedUrl } from "@/lib/learning/api";

const AUTOSAVE_KEY = "blog-editor-draft";

type YouTubeIframeToolData = {
  source?: string;
  embedUrl?: string;
};

function getYouTubeEmbedUrl(source: string) {
  const trimmedSource = source.trim();

  if (!trimmedSource) return null;

  const embedUrl = buildYouTubeEmbedUrl(trimmedSource).trim();

  if (!embedUrl) return null;

  try {
    const url = new URL(embedUrl);
    const host = url.hostname.replace(/^www\./, "");
    const isYouTubeHost =
      host === "youtube.com" ||
      host === "youtube-nocookie.com" ||
      host === "youtu.be";

    if (isYouTubeHost && (url.pathname.includes("/embed/") || host === "youtu.be")) {
      return embedUrl;
    }
  } catch {
    return null;
  }

  return null;
}

class YouTubeIframeTool {
  private api: any;
  private readOnly: boolean;
  private data: YouTubeIframeToolData;
  private wrapper: HTMLDivElement | null = null;
  private input: HTMLDivElement | null = null;
  private panel: HTMLDivElement | null = null;
  private editButton: HTMLButtonElement | null = null;
  private preview: HTMLDivElement | null = null;
  private isEditing = false;

  static get toolbox() {
    return {
      title: "YouTube iframe",
      icon: '<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 4.9C14.3 4.1 13.7 3.5 12.9 3.3C11.4 3 8.5 3 8.5 3C8.5 3 5.6 3 4.1 3.3C3.3 3.5 2.7 4.1 2.5 4.9C2.2 6.4 2.2 8.5 2.2 8.5C2.2 8.5 2.2 10.6 2.5 12.1C2.7 12.9 3.3 13.5 4.1 13.7C5.6 14 8.5 14 8.5 14C8.5 14 11.4 14 12.9 13.7C13.7 13.5 14.3 12.9 14.5 12.1C14.8 10.6 14.8 8.5 14.8 8.5C14.8 8.5 14.8 6.4 14.5 4.9Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M7 6.5L11 8.5L7 10.5V6.5Z" fill="currentColor"/></svg>',
    };
  }

  static get isReadOnlySupported() {
    return true;
  }

  constructor({
    data,
    api,
    readOnly,
  }: {
    data: YouTubeIframeToolData;
    api: any;
    readOnly: boolean;
  }) {
    this.api = api;
    this.readOnly = readOnly;
    this.data = {
      source: data?.source ?? data?.embedUrl ?? "",
      embedUrl: data?.embedUrl ?? "",
    };
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.className = "youtube-iframe-tool";

    const panel = document.createElement("div");
    panel.className = "youtube-iframe-tool__panel";

    const input = document.createElement("div");
    input.className = "youtube-iframe-tool__input";
    input.contentEditable = String(!this.readOnly);
    input.spellcheck = false;
    input.dataset.placeholder = "Paste a YouTube URL or iframe code";
    input.textContent = this.data.source ?? "";
    panel.appendChild(input);

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "youtube-iframe-tool__edit";
    editButton.textContent = "Edit";
    editButton.hidden = true;
    panel.appendChild(editButton);

    const preview = document.createElement("div");
    preview.className = "youtube-iframe-tool__preview";

    this.wrapper = wrapper;
    this.input = input;
    this.panel = panel;
    this.editButton = editButton;
    this.preview = preview;

    if (!this.readOnly) {
      this.api.listeners.on(input, "input", () => {
        this.syncPreview();
      });
      this.api.listeners.on(input, "blur", () => {
        if (getYouTubeEmbedUrl(this.input?.textContent?.trim() ?? "")) {
          this.isEditing = false;
          this.syncPreview();
        }
      });
      this.api.listeners.on(input, "paste", (event: ClipboardEvent) => {
        event.preventDefault();

        const pastedText =
          event.clipboardData?.getData("text/html") ||
          event.clipboardData?.getData("text/plain") ||
          "";

        document.execCommand("insertText", false, pastedText);
        this.syncPreview();
      });
      this.api.listeners.on(editButton, "click", () => {
        this.isEditing = !this.isEditing;
        this.syncPreview();
        if (this.isEditing) {
          input.focus();
        }
      });
    }

    this.syncPreview();
    return wrapper;
  }

  save() {
    const source =
      this.input?.textContent?.trim() ?? this.data.source?.trim() ?? "";

    return {
      source,
      embedUrl: getYouTubeEmbedUrl(source) ?? this.data.embedUrl ?? "",
    };
  }

  private syncPreview() {
    if (!this.input || !this.wrapper || !this.panel || !this.preview || !this.editButton) return;

    const source = this.input.textContent?.trim() || "";
    const embedUrl = getYouTubeEmbedUrl(source);

    this.data = {
      source,
      embedUrl: embedUrl ?? "",
    };

    this.wrapper.dataset.hasEmbed = embedUrl ? "true" : "false";
    this.wrapper.dataset.embedUrl = embedUrl ?? "";
    this.wrapper.replaceChildren();

    if (!embedUrl) {
      this.editButton.hidden = true;
      this.isEditing = true;
      this.input.hidden = false;
      this.preview.hidden = true;
      this.wrapper.appendChild(this.panel);
      this.wrapper.appendChild(this.preview);
      return;
    }

    const iframe = document.createElement("iframe");
    iframe.className = "youtube-iframe-tool__iframe";
    iframe.src = embedUrl;
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";

    this.preview.replaceChildren(iframe);
    this.input.hidden = !this.isEditing;
    this.preview.hidden = false;
    this.editButton.hidden = false;
    this.wrapper.appendChild(this.panel);
    this.wrapper.appendChild(this.preview);
  }
}

export default function BlogEditorClient() {
  const editorRef = useRef<EditorJS | null>(null);
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef(-1);
  const isApplyingSnapshotRef = useRef(false);
  const [title, setTitle] = useState("Untitled");
  const [subtitle, setSubtitle] = useState("");
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [loading, setLoading] = useState(false);

  const refreshHistoryControls = () => {
    setCanUndo(historyIndexRef.current > 0);
    setCanRedo(historyIndexRef.current < historyRef.current.length - 1);
  };

  const getEditorData = async () => {
    const editor = editorRef.current;
    if (!editor?.saver?.save) return null;
    return editor.saver.save();
  };

  const saveDraftToLocalStorage = async () => {
    if (typeof window === "undefined") return;

    const data = await getEditorData();
    if (!data) return;

    window.localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(data));
  };

  const loadDraftFromLocalStorage = () => {
    if (typeof window === "undefined") return null;

    const rawDraft = window.localStorage.getItem(AUTOSAVE_KEY);
    if (!rawDraft) return null;

    try {
      return JSON.parse(rawDraft);
    } catch {
      return null;
    }
  };

  const waitForEditorReady = async (editor: EditorJS) => {
    const maybeReady = editor as EditorJS & { isReady?: Promise<void> };

    if (maybeReady.isReady) {
      await maybeReady.isReady;
    }
  };

  const pushSnapshot = async () => {
    if (isApplyingSnapshotRef.current) return;

    const data = await getEditorData();
    if (!data) return;

    const snapshot = JSON.stringify(data);
    const currentSnapshot = historyRef.current[historyIndexRef.current];

    if (snapshot === currentSnapshot) return;

    historyRef.current = historyRef.current.slice(
      0,
      historyIndexRef.current + 1,
    );
    historyRef.current.push(snapshot);
    historyIndexRef.current = historyRef.current.length - 1;
    refreshHistoryControls();
  };

  const syncTitleFromContent = async () => {
    const data = await getEditorData();
    if (!data) return;

    const firstHeading = data.blocks.find(
      (block) =>
        block.type === "header" &&
        block.data?.level === 1 &&
        typeof block.data?.text === "string",
    );
    const firstSubheading = data.blocks.find(
      (block) =>
        block.type === "header" &&
        block.data?.level === 2 &&
        typeof block.data?.text === "string",
    );

    const titleText = firstHeading?.data?.text ?? "";
    const subtitleText = firstSubheading?.data?.text ?? "";
    const strippedTitle = titleText.replace(/<[^>]*>/g, "").trim();
    const strippedSubtitle = subtitleText.replace(/<[^>]*>/g, "").trim();

    setTitle(strippedTitle || "Untitled");
    setSubtitle(subtitleText ? strippedSubtitle : "");
  };

  const handleEditorChange = () => {
    void (async () => {
      await pushSnapshot();
      await syncTitleFromContent();
      await saveDraftToLocalStorage();
    })();
  };

  const handleUndo = async () => {
    const editor = editorRef.current;

    if (!editor || historyIndexRef.current <= 0) return;

    historyIndexRef.current -= 1;
    const snapshot = historyRef.current[historyIndexRef.current];

    if (!snapshot) return;

    isApplyingSnapshotRef.current = true;

    try {
      await editor.render(JSON.parse(snapshot));
      await syncTitleFromContent();
    } finally {
      isApplyingSnapshotRef.current = false;
      refreshHistoryControls();
    }
  };

  const handleRedo = async () => {
    const editor = editorRef.current;

    if (!editor || historyIndexRef.current >= historyRef.current.length - 1)
      return;

    historyIndexRef.current += 1;
    const snapshot = historyRef.current[historyIndexRef.current];

    if (!snapshot) return;

    isApplyingSnapshotRef.current = true;

    try {
      await editor.render(JSON.parse(snapshot));
      await syncTitleFromContent();
    } finally {
      isApplyingSnapshotRef.current = false;
      refreshHistoryControls();
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    const data = await getEditorData();
    if (data) {
      postBlogs({
        title: title,
        content: data,
        excerpt: title,
        slug: title.toLowerCase().replace(/\s+/g, "-"),
        status: BlogStatus.PUBLISHED,
        publishedAt: new Date(),
      })
        .then((res) => {
          if (res) {
            setLoading(false);
          }
        })
        .finally(() => {
          setLoading(false);
          alert("Blog published successfully!");
        });
    }
  };

  const uploadImageToCloud = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file, file.name);
    const response = await fetch("https://nestjsserver.vercel.app/upload/image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Image upload failed with status ${response.status}`);
    }

    const payload = await response.json().catch(() => null);
    const url =
      (typeof payload === "string" ? payload : null) ??
      payload?.url ??
      payload?.file?.url ??
      payload?.data?.url ??
      payload?.imageUrl ??
      payload?.location ??
      payload?.result?.url;

    if (typeof url !== "string" || !url.trim()) {
      throw new Error("Image upload did not return a usable URL.");
    }

    return {
      success: 1,
      file: {
        url,
      },
    };
  };

  useEffect(() => {
    let isMounted = true;

    const initEditor = async () => {
      if (editorRef.current) return;

      const [
        { default: EditorJS },
        { default: Header },
        { default: List },
        { default: Quote },
        { default: CodeTool },
        { default: ImageTool },
        { default: Checklist },
        { default: Delimiter },
        { default: Table },
        { default: Marker },
        { default: InlineCode },
        { default: LinkTool },
        { default: Warning },
        { default: Embed },
      ] = await Promise.all([
        import("@editorjs/editorjs"),
        import("@editorjs/header"),
        import("@editorjs/list"),
        import("@editorjs/quote"),
        import("@editorjs/code"),
        import("@editorjs/image"),
        import("@editorjs/checklist"),
        import("@editorjs/delimiter"),
        import("@editorjs/table"),
        import("@editorjs/marker"),
        import("@editorjs/inline-code"),
        import("@editorjs/link"),
        import("@editorjs/warning"),
        import("@editorjs/embed"),
      ]);

      if (!isMounted || editorRef.current) return;

      editorRef.current = new EditorJS({
        holder: "editorjs",
        placeholder: "Tell your story...",
        autofocus: true,
        onChange: handleEditorChange,
        tools: {
          header: {
            class: Header,
            inlineToolbar: ["link", "marker", "inlineCode"],
            config: {
              levels: [1, 2, 3, 4],
              defaultLevel: 1,
            },
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
          },
          code: {
            class: CodeTool,
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                uploadByFile: uploadImageToCloud,
                uploadByUrl: async (url: string) => ({
                  success: 1,
                  file: {
                    url,
                  },
                }),
              },
            },
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          delimiter: Delimiter,
          table: {
            class: Table,
            inlineToolbar: true,
          },
          marker: Marker,
          youtubeIframe: {
            class: YouTubeIframeTool,
          },
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
                instagram: true,
                github: true,
                codepen: true,
              },
            },
          },
          warning: Warning,
          inlineCode: InlineCode,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/editor/link-preview",
            },
          },
        },
      });

      await waitForEditorReady(editorRef.current);

      const savedDraft = loadDraftFromLocalStorage();

      if (savedDraft) {
        await editorRef.current.render(savedDraft);
        historyRef.current = [JSON.stringify(savedDraft)];
        historyIndexRef.current = 0;
        refreshHistoryControls();
      } else {
        await pushSnapshot();
      }

      await syncTitleFromContent();
      refreshHistoryControls();
    };

    void initEditor();

    return () => {
      isMounted = false;
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, []);

  return (
    <main className={styles.page}>
      <ArticleHeader
        title={title}
        subtitle={subtitle}
        loading={loading}
        onPublish={handlePublish}
      />
      <section className={styles.editorShell}>
        <article className={styles.editorCard}>
          <div id="editorjs" className={styles.editor} />
        </article>
        <div className={styles.historyBar}>
          <button
            type="button"
            className={styles.actionButton}
            onClick={() => void handleUndo()}
            disabled={!canUndo}
            aria-label="Undo"
          >
            <Undo2 size={16} />
          </button>
          <button
            type="button"
            className={styles.actionButton}
            onClick={() => void handleRedo()}
            disabled={!canRedo}
            aria-label="Redo"
          >
            <Redo2 size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}

function ArticleHeader({
  title,
  subtitle,
  onPublish,
  loading,
}: {
  title: string;
  subtitle: string;
  onPublish: () => void | Promise<void>;
  loading: boolean;
}) {

  const route = useRouter();

  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <button
          type="button"
          onClick={()=>route.back()}
          className={styles.iconButton}
          aria-label="Go back"
        >
          <ArrowLeft size={16} />
        </button>
        <div className={styles.headerTitleGroup}>
          <h1 className={styles.headerTitle}>{title}</h1>
          {subtitle ? (
            <p className={styles.headerSubtitle}>{subtitle}</p>
          ) : null}
        </div>
      </div>
      <button
        type="button"
        className={styles.publishButton}
        onClick={() => void onPublish()}
        disabled={loading}
      >
        {loading ? "Publishing..." : "Publish"}
      </button>
    </header>
  );
}
