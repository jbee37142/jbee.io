import type { Node } from 'unist';
import { SKIP, visit } from 'unist-util-visit';

interface TextNode extends Node {
  type: 'text';
  value: string;
  processed?: boolean;
}

// Highlighted text regex pattern - matches ==text== syntax
// Updated to handle multiline text with the 's' flag (dotAll)
const HIGHLIGHT_REGEX = /==([^=]+)==/gs;

// Available colors for random selection
const COLORS = [
  'red',
  'blue',
  'green',
  'yellow',
  'purple',
  'pink',
  'orange',
  'teal',
  'cyan',
  'lime'
];

// Options interface for the plugin
interface HighlightTextOptions {
  color?: string;
}

// Plugin to convert ==text== to highlighted spans
export function highlightText(options: HighlightTextOptions = {}) {
  return (tree: Node) => {
    // Track processed nodes to avoid infinite recursion
    const processedNodes = new Set();
    
    visit(tree, 'text', (node: TextNode, index: number, parent: any) => {
      // Skip if already processed
      if (processedNodes.has(node) || !node.value) {
        return;
      }
      
      // Skip if there are no highlights
      if (!HIGHLIGHT_REGEX.test(node.value)) {
        return;
      }
      
      // Mark as processed
      processedNodes.add(node);
      
      // Reset regex state
      HIGHLIGHT_REGEX.lastIndex = 0;
      
      const parts: (TextNode | {type: string, tagName: string, properties: {className: string[]}, children: TextNode[]})[] = [];
      let lastIndex = 0;
      let match;
      
      // Find all highlights and convert them to span nodes
      while ((match = HIGHLIGHT_REGEX.exec(node.value)) !== null) {
        const [fullMatch, content] = match;
        const startIndex = match.index;
        const endIndex = startIndex + fullMatch.length;
        
        // Add text before the highlight
        if (startIndex > lastIndex) {
          const textNode = {
            type: 'text',
            value: node.value.slice(lastIndex, startIndex)
          } as TextNode;
          processedNodes.add(textNode);
          parts.push(textNode);
        }
        
        // Determine the highlight color
        let color = options.color || 'yellow'; // Default to yellow
        
        // Handle random color option - keep as "random" for the class
        if (color === 'random') {
          // Keep as "random" for the class name
          // No need to randomly select a color here
        } else if (!COLORS.includes(color)) {
          // Default to yellow if the specified color isn't in our list
          color = 'yellow';
        }
        
        // Handle content with newlines - split by newline and create separate nodes
        if (content.includes('\n')) {
          // Process content with newlines
          const contentParts = content.split('\n');
          
          // First part (no preceding <br>)
          const firstTextNode = {
            type: 'text',
            value: contentParts[0]
          } as TextNode;
          processedNodes.add(firstTextNode);
          
          const childrenNodes: any[] = [firstTextNode];
          
          // Add <br> and text nodes for remaining parts
          for (let i = 1; i < contentParts.length; i++) {
            // Add <br> element
            childrenNodes.push({
              type: 'element',
              tagName: 'br',
              properties: {},
              children: []
            });
            
            // Add text node
            const lineTextNode = {
              type: 'text',
              value: contentParts[i]
            } as TextNode;
            processedNodes.add(lineTextNode);
            childrenNodes.push(lineTextNode);
          }
          
          // Create the span with all parts
          parts.push({
            type: 'element',
            tagName: 'span',
            properties: {
              className: [`highlight-text--${color}`]
            },
            children: childrenNodes
          });
        } else {
          // Process normal content without newlines (unchanged)
          const highlightTextNode = { 
            type: 'text', 
            value: content
          } as TextNode;
          processedNodes.add(highlightTextNode);
          
          parts.push({
            type: 'element',
            tagName: 'span',
            properties: { 
              className: [`highlight-text--${color}`]
            },
            children: [highlightTextNode]
          });
        }
        
        lastIndex = endIndex;
      }
      
      // Add remaining text after the last highlight
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
