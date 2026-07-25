"use client";

import { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  Link2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "lucide-react";

type RichTextEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?:string
};

export default function RichTextEditor({
  value = "",
  onChange,
  placeholder='Add details or write your description...'
}: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "ProseMirror min-h-[220px] p-4 focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value, {
        emitUpdate: false,
      });
    }
  }, [editor, value]);

  if (!editor) return null;

  const btn = (active: boolean) =>
    `p-2 rounded-lg transition-all duration-200 ${
      active
        ? "bg-blue-600 text-white shadow-sm"
        : "hover:bg-gray-100 text-gray-600"
    }`;

  const divider = () => <div className="w-px h-8 bg-gray-200" />;

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50/80 p-2">
        {/* History */}
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-all duration-200"
          onClick={() => editor.chain().focus().undo().run()}
          title="Undo"
        >
          <Undo2 size={18} />
        </button>
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-all duration-200"
          onClick={() => editor.chain().focus().redo().run()}
          title="Redo"
        >
          <Redo2 size={18} />
        </button>

        {divider()}

        {/* Heading Select */}
        <Select
          value={
            editor.isActive("heading", { level: 1 })
              ? "h1"
              : editor.isActive("heading", { level: 2 })
                ? "h2"
                : editor.isActive("heading", { level: 3 })
                  ? "h3"
                  : editor.isActive("heading", { level: 4 })
                    ? "h4"
                    : editor.isActive("heading", { level: 5 })
                      ? "h5"
                      : editor.isActive("heading", { level: 6 })
                        ? "h6"
                        : "paragraph"
          }
          onValueChange={(value) => {
            if (value === "paragraph") {
              editor.chain().focus().setParagraph().run();
              return;
            }
            editor
              .chain()
              .focus()
              .toggleHeading({
                level: Number(value.replace("h", "")) as 1 | 2 | 3 | 4 | 5 | 6,
              })
              .run();
          }}
        >
          <SelectTrigger className="w-36 h-9 rounded-lg border-gray-200 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="paragraph">Normal Text</SelectItem>
            <SelectItem className="text-2xl font-bold" value="h1">
              Heading 1
            </SelectItem>
            <SelectItem className="text-xl font-bold" value="h2">
              Heading 2
            </SelectItem>
            <SelectItem className="text-lg font-bold" value="h3">
              Heading 3
            </SelectItem>
            <SelectItem className="text-base font-bold" value="h4">
              Heading 4
            </SelectItem>
            <SelectItem className="text-sm font-bold" value="h5">
              Heading 5
            </SelectItem>
            <SelectItem className="text-xs font-bold" value="h6">
              Heading 6
            </SelectItem>
          </SelectContent>
        </Select>

        {divider()}

        {/* Text Formatting */}
        <button
          type="button"
          className={btn(editor.isActive("bold"))}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          className={btn(editor.isActive("italic"))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          className={btn(editor.isActive("underline"))}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          title="Underline"
        >
          <UnderlineIcon size={18} />
        </button>
        <button
          type="button"
          className={btn(editor.isActive("strike"))}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          title="Strikethrough"
        >
          <Strikethrough size={18} />
        </button>

        {divider()}

        {/* Lists */}
        <button
          type="button"
          className={btn(editor.isActive("bulletList"))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          type="button"
          className={btn(editor.isActive("orderedList"))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Numbered List"
        >
          <ListOrdered size={18} />
        </button>

        {divider()}

        {/* Alignment */}
        <button
          type="button"
          className={btn(editor.isActive({ textAlign: "left" }))}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          title="Align Left"
        >
          <AlignLeft size={18} />
        </button>
        <button
          type="button"
          className={btn(editor.isActive({ textAlign: "center" }))}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          title="Align Center"
        >
          <AlignCenter size={18} />
        </button>
        <button
          type="button"
          className={btn(editor.isActive({ textAlign: "right" }))}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          title="Align Right"
        >
          <AlignRight size={18} />
        </button>
        <button
          type="button"
          className={btn(editor.isActive({ textAlign: "justify" }))}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          title="Justify"
        >
          <AlignJustify size={18} />
        </button>

        {divider()}

        {/* Link */}
        <button
          type="button"
          className={btn(editor.isActive("link"))}
          onClick={() => {
            const url = window.prompt("Enter URL");
            if (!url) return;
            editor.chain().focus().setLink({ href: url }).run();
          }}
          title="Insert Link"
        >
          <Link2 size={18} />
        </button>
      </div>

      {/* Editor Content */}
      <div className="bg-white">
        <EditorContent editor={editor} />
      </div>

      {/* Character Count */}
      <div className="flex items-center justify-end px-4 py-2 border-t border-gray-100 bg-gray-50/50">
        <span className="text-xs text-gray-400">
          {editor.storage?.characterCount?.characters?.() || 0} characters
        </span>
      </div>
    </div>
  );
}
