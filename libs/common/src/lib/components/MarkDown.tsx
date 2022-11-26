import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import React from 'react';

interface MarkDownProps {
  markdown: string;
}

export const MarkDown: React.FC<MarkDownProps> = ({ markdown }) => {
  return <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>;
};
