import type { Node } from 'unist';
import { SKIP, visit } from 'unist-util-visit';

interface TextNode extends Node {
  type: 'text';
  value: string;
  processed?: boolean;
}

// URL regex pattern
const URL_REGEX = /https?:\/\/[^\s<>]+[^\s<>.,;:?!)"']/g;

// Plugin to convert plain URLs to links
export function urlToLink() {
  return (tree: Node) => {
    // Track processed nodes to avoid infinite recursion
    const processedNodes = new Set();
    
    visit(tree, 'text', (node: TextNode, index: number, parent: any) => {
      // Skip if already processed
      if (processedNodes.has(node) || !node.value) {
        return;
      }
      
      // Skip if there are no URLs
      if (!URL_REGEX.test(node.value)) {
        return;
      }
      
      // Mark as processed
      processedNodes.add(node);
      
      // Reset regex state
      URL_REGEX.lastIndex = 0;
      
      const parts: (TextNode | {type: string, tagName: string, properties: {href: string}, children: TextNode[]})[] = [];
      let lastIndex = 0;
      let match;
      
      // Find all URLs and convert them to link nodes
      while ((match = URL_REGEX.exec(node.value)) !== null) {
        const url = match[0];
        const startIndex = match.index;
        const endIndex = startIndex + url.length;
        
        // Add text before the URL
        if (startIndex > lastIndex) {
          const textNode = {
            type: 'text',
            value: node.value.slice(lastIndex, startIndex)
          } as TextNode;
          processedNodes.add(textNode);
          parts.push(textNode);
        }
        
        // Add the URL as a link
        const linkTextNode = { 
          type: 'text', 
          value: url
        } as TextNode;
        processedNodes.add(linkTextNode);
        
        parts.push({
          type: 'element',
          tagName: 'a',
          properties: { href: url, target: '_blank', rel: 'noopener noreferrer' } as any,
          children: [linkTextNode]
        });
        
        lastIndex = endIndex;
      }
      
      // Add remaining text after the last URL
      if (lastIndex < node.value.length) {
        const textNode = {
          type: 'text',
          value: node.value.slice(lastIndex)
        } as TextNode;
        processedNodes.add(textNode);
        parts.push(textNode);
      }
      
      // Replace the node with the new nodes
      if (parts.length > 0 && parent && typeof index === 'number') {
        parent.children.splice(index, 1, ...parts);
        return [SKIP, index];
      }
    });
  };
} 
