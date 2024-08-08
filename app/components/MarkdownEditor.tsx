import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { FC } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface MarkdownEditorProps {
  value?: string;
  onChange: (value?: string) => void;
}

const MarkdownEditor: FC<MarkdownEditorProps> = ({ value, onChange }) => {
  return <MDEditor value={value} onChange={onChange} />;
};

export default MarkdownEditor;
