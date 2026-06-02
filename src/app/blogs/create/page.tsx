"use client";
import { useEffect, useRef, useState } from "react";
import type EditorJS from "@editorjs/editorjs";
import { ArrowLeft, Redo2, Undo2 } from "lucide-react";
import styles from "./style.module.css";
import { createBox } from "motion/react";
import { postBlogs } from "@/lib/blogs/blogsapi";
import { BlogStatus } from "@/lib/blogs/type";

const AUTOSAVE_KEY = "blog-editor-draft";

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
          embed: {
            class: Embed,
            config: {
              services: {
                youtube: true,
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
  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <button
          type="button"
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
