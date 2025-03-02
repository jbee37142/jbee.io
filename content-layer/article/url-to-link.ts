import { Node } from 'unist';
import { visit } from 'unist-util-visit';

interface TextNode extends Node {
  type: 'text';
  value: string;
}

// URL regex pattern
const URL_REGEX = /https?:\/\/[^\s<>]+[^\s<>.,;:?!)"']/g;

// Plugin to convert plain URLs to links
export function urlToLink() {
  return (tree: Node) => {
    visit(tree, 'text', (node: TextNode) => {
      const { value } = node;
      
      // Skip if there are no URLs
      if (!URL_REGEX.test(value)) {
        return;
      }
      
      // Reset regex state
      URL_REGEX.lastIndex = 0;
      
      const parts: (TextNode | {type: string, tagName: string, properties: {href: string}, children: TextNode[]})[] = [];
      let lastIndex = 0;
      let match;
      
      // Find all URLs and convert them to link nodes
      while ((match = URL_REGEX.exec(value)) !== null) {
        const url = match[0];
        const startIndex = match.index;
        const endIndex = startIndex + url.length;
        
        // Add text before the URL
        if (startIndex > lastIndex) {
          parts.push({
            type: 'text',
            value: value.slice(lastIndex, startIndex)
          });
        }
        
        // Add the URL as a link
        parts.push({
          type: 'element',
          tagName: 'a',
          properties: { href: url },
          children: [{ type: 'text', value: url }]
        });
        
        lastIndex = endIndex;
      }
      
      // Add remaining text after the last URL
      if (lastIndex < value.length) {
        parts.push({
          type: 'text',
          value: value.slice(lastIndex)
        });
      }
      
      // Replace the original node with the new nodes
      if (parts.length > 0) {
        Object.assign(node, {
          type: 'parent',
          children: parts,
          value: undefined
        });
      }
    });
  };
} 