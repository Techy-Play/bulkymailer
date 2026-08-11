import { renderToStaticMarkup, TReaderDocument, TReaderBlock } from '@usewaypoint/email-builder';

export type BlockType = 
  | 'hero'
  | 'heading' 
  | 'text' 
  | 'image' 
  | 'button' 
  | 'product' 
  | 'columns' 
  | 'divider' 
  | 'spacer' 
  | 'social' 
  | 'footer';

export interface EditorBlock {
  id: string;
  type: BlockType;
  props: Record<string, any>;
}

/**
 * Converts our simple array of blocks into the Waypoint TReaderDocument tree 
 * and compiles it to 100% email-client compatible HTML tables.
 */
export function compileWaypointToHTML(blocks: EditorBlock[]): string {
  const document: TReaderDocument = {};
  const childrenIds: string[] = [];

  for (const block of blocks) {
    childrenIds.push(block.id);
    document[block.id] = mapEditorBlockToWaypoint(block);
  }

  // Create the root layout block
  document['root'] = {
    type: 'EmailLayout',
    data: {
      backdropColor: '#F4F4F5', // Default gray-100 backdrop
      canvasColor: '#FFFFFF',
      textColor: '#262626',
      fontFamily: 'MODERN_SANS',
      childrenIds,
    }
  };

  return renderToStaticMarkup(document, { rootBlockId: 'root' });
}

function mapEditorBlockToWaypoint(block: EditorBlock): TReaderBlock {
  switch (block.type) {
    case 'heading':
      return {
        type: 'Heading',
        data: {
          props: {
            text: block.props.text || 'Heading',
            level: block.props.level || 'h2',
          },
          style: {
            color: block.props.color || '#000000',
            textAlign: block.props.textAlign || 'left',
            padding: block.props.padding || { top: 16, bottom: 16, left: 24, right: 24 },
            fontWeight: block.props.fontWeight || 'bold',
            fontFamily: block.props.fontFamily || 'MODERN_SANS',
          }
        }
      };
      
    case 'text':
      return {
        type: 'Text',
        data: {
          props: {
            text: block.props.text || 'Paragraph text',
          },
          style: {
            color: block.props.color || '#4b5563',
            fontSize: block.props.fontSize || 16,
            textAlign: block.props.textAlign || 'left',
            padding: block.props.padding || { top: 8, bottom: 8, left: 24, right: 24 },
            fontWeight: block.props.fontWeight || 'normal',
            fontFamily: block.props.fontFamily || 'MODERN_SANS',
          }
        }
      };

    case 'image':
      return {
        type: 'Image',
        data: {
          props: {
            url: block.props.url || 'https://via.placeholder.com/600x300',
            alt: block.props.alt || 'Image',
            linkHref: block.props.linkHref || '',
            contentAlignment: block.props.contentAlignment || 'middle',
            width: block.props.width || undefined,
          },
          style: {
            padding: block.props.padding || { top: 0, bottom: 0, left: 0, right: 0 },
            textAlign: block.props.textAlign || 'center',
            backgroundColor: block.props.backgroundColor || undefined,
          }
        }
      };

    case 'button':
      return {
        type: 'Button',
        data: {
          props: {
            text: block.props.text || 'Click Here',
            url: block.props.url || '#',
            buttonBackgroundColor: block.props.buttonBackgroundColor || '#4F46E5',
            buttonTextColor: block.props.buttonTextColor || '#FFFFFF',
            buttonStyle: block.props.buttonStyle || 'rounded',
            fullWidth: block.props.fullWidth || false,
            size: block.props.size || 'medium',
          },
          style: {
            textAlign: block.props.textAlign || 'center',
            padding: block.props.padding || { top: 16, bottom: 16, left: 24, right: 24 },
            fontWeight: block.props.fontWeight || 'bold',
          }
        }
      };

    case 'divider':
      return {
        type: 'Divider',
        data: {
          props: {
            lineColor: block.props.lineColor || '#E5E7EB',
            lineHeight: block.props.lineHeight || 1,
          },
          style: {
            padding: block.props.padding || { top: 16, bottom: 16, left: 24, right: 24 },
          }
        }
      };

    case 'spacer':
      return {
        type: 'Spacer',
        data: {
          props: {
            height: block.props.height || 32,
          }
        }
      };

    // Advanced blocks like Hero, Columns, Footer will be composed using Waypoint primitives 
    // Wait, Email-Builder only has basic primitives. So a "Hero" is just an Image or a Container with Image and Text.
    // For now, let's map complex blocks to HTML block or Container if possible.
    case 'hero':
      // A simple implementation using Container and nested Text/Button (or just Html)
      return {
        type: 'Html',
        data: {
          props: {
            contents: `
              <div style="background-color: ${block.props.backgroundColor || '#F3F4F6'}; padding: ${block.props.paddingTop || 48}px 24px; text-align: center;">
                <h1 style="margin:0; font-size: 32px; font-weight: bold; color: ${block.props.titleColor || '#111827'}; font-family: sans-serif;">${block.props.title || 'Hero Title'}</h1>
                <p style="margin: 16px 0 0 0; font-size: 18px; color: ${block.props.subtitleColor || '#4B5563'}; font-family: sans-serif;">${block.props.subtitle || 'Hero subtitle text goes here.'}</p>
              </div>
            `
          }
        }
      };

    case 'columns':
      // Basic multi-column using HTML since dynamic column config is easier in HTML block here
      const cols = block.props.columns || 2;
      const colWidth = Math.floor(100 / cols);
      
      let columnsHtml = '';
      for (let i = 0; i < cols; i++) {
        columnsHtml += `
          <td width="${colWidth}%" align="center" style="padding: 16px; vertical-align: top;">
            <!-- Column ${i+1} Content Placeholder -->
            <div style="background: #F9FAFB; border: 1px dashed #D1D5DB; padding: 24px; border-radius: 4px; color: #9CA3AF;">Column ${i+1}</div>
          </td>
        `;
      }

      return {
        type: 'Html',
        data: {
          props: {
            contents: `
              <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation">
                <tr>
                  ${columnsHtml}
                </tr>
              </table>
            `
          }
        }
      };
      
    case 'product':
      return {
        type: 'Html',
        data: {
          props: {
            contents: `
              <div style="padding: 24px; text-align: center; border: 1px solid #E5E7EB; border-radius: 8px;">
                <img src="${block.props.image || 'https://via.placeholder.com/300x300'}" style="max-width: 100%; border-radius: 4px;" alt="Product" />
                <h3 style="margin: 16px 0 8px 0; font-family: sans-serif; font-size: 20px; color: #111827;">${block.props.title || 'Product Title'}</h3>
                <p style="margin: 0 0 16px 0; font-family: sans-serif; font-size: 18px; font-weight: bold; color: #4F46E5;">${block.props.price || '$99.00'}</p>
              </div>
            `
          }
        }
      };

    case 'social':
      return {
        type: 'Html',
        data: {
          props: {
            contents: `
              <div style="padding: 24px; text-align: center;">
                <a href="${block.props.twitter || '#'}" style="margin: 0 8px; color: #4B5563; text-decoration: none;">Twitter</a>
                <a href="${block.props.linkedin || '#'}" style="margin: 0 8px; color: #4B5563; text-decoration: none;">LinkedIn</a>
                <a href="${block.props.instagram || '#'}" style="margin: 0 8px; color: #4B5563; text-decoration: none;">Instagram</a>
              </div>
            `
          }
        }
      };

    case 'footer':
      return {
        type: 'Html',
        data: {
          props: {
            contents: `
              <div style="padding: 32px 24px; text-align: center; font-family: sans-serif; font-size: 12px; color: #6B7280;">
                <p style="margin: 0 0 8px 0;">${block.props.company || 'Your Company Name'}</p>
                <p style="margin: 0 0 16px 0;">${block.props.address || '123 Main St, City, Country'}</p>
                <p style="margin: 0;">&copy; ${new Date().getFullYear()} All rights reserved. <a href="{{unsubscribeUrl}}" style="color: #4F46E5; text-decoration: underline;">Unsubscribe</a></p>
              </div>
            `
          }
        }
      };

    default:
      return {
        type: 'Text',
        data: { props: { text: `Unknown block type: ${block.type}` } }
      };
  }
}
