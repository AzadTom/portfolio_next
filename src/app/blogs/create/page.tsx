"use client";
import { useEffect, useRef, useState } from "react";
import type EditorJS from "@editorjs/editorjs";
import Embed from "@editorjs/embed";
import { ArrowLeft } from "lucide-react";
import InlineCode from "@editorjs/inline-code";
import LinkTool from "@editorjs/link";
import Warning from "@editorjs/warning";
import styles from "./style.module.css";

export default function BlogEditorClient() {
  const editorRef = useRef<EditorJS | null>(null);
  const [title, setTitle] = useState("Untitled");
  const [subtitle, setSubtitle] = useState("");

  const syncTitleFromContent = async () => {
    const editor = editorRef.current;

    if (!editor) return;

    const data = await editor.save();
    const firstHeading = data.blocks.find(
      (block) => block.type === "header" && block.data?.level === 1 && typeof block.data?.text === "string",
    );
    const firstSubheading = data.blocks.find(
      (block) => block.type === "header" && block.data?.level === 2 && typeof block.data?.text === "string",
    );

    const titleText = firstHeading?.data?.text ?? "";
    const subtitleText = firstSubheading?.data?.text ?? "";
    const strippedTitle = titleText.replace(/<[^>]*>/g, "").trim();
    const strippedSubtitle = subtitleText.replace(/<[^>]*>/g, "").trim();

    setTitle(strippedTitle || "Untitled");
    setSubtitle(subtitleText ? strippedSubtitle : "");
  };

  const uploadImage = async (file: File) => {
    const url = await fileToDataUrl(file);

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
        onChange: () => {
          void syncTitleFromContent();
        },
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
                uploadByFile: uploadImage,
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
    };

    void initEditor();

    return () => {
      isMounted = false;
      editorRef.current?.destroy();
      editorRef.current = null;
    };
  }, []);

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
          return;
        }

        reject(new Error("Failed to read image file."));
      };

      reader.onerror = () => reject(new Error("Failed to read image file."));
      reader.readAsDataURL(file);
    });

  return (
    <main className={styles.page}>
      <ArticleHeader title={title} subtitle={subtitle} />
      <article className={styles.editorCard}>
        <div id="editorjs" className={styles.editor} />
      </article>
    </main>
  );
}

function ArticleHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <button type="button" className={styles.iconButton} aria-label="Go back">
          <ArrowLeft size={16} />
        </button>
        <div className={styles.headerTitleGroup}>
          <h1 className={styles.headerTitle}>{title}</h1>
          {subtitle ? <p className={styles.headerSubtitle}>{subtitle}</p> : null}
        </div>
      </div>
      <button type="button" className={styles.publishButton}>
        Publish
      </button>
    </header>
  );
}
