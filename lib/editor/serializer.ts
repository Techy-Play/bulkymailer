import { TemplateJSONNode } from './types';
import { PLUGIN_REGISTRY } from './plugins';

export function serializeJSONToEmailHTML(root: TemplateJSONNode): string {
  if (!root) return '';

  let bodyContent = '';
  if (root.children && root.children.length > 0) {
    bodyContent = root.children
      .filter((child) => child.visible !== false)
      .map((child) => {
        const plugin = PLUGIN_REGISTRY[child.type];
        if (plugin) {
          return plugin.renderHtml(child);
        }
        return '';
      })
      .join('\n');
  } else {
    const plugin = PLUGIN_REGISTRY[root.type];
    if (plugin) {
      bodyContent = plugin.renderHtml(root);
    }
  }

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Email Campaign</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; margin: auto !important; }
      .fluid { max-width: 100% !important; height: auto !important; margin-left: auto !important; margin-right: auto !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc;">
  <center style="width: 100%; background-color: #f8fafc; padding: 40px 16px;">
    <div style="max-width: 600px; margin: 0 auto;" class="email-container">
      <!--[if mso]>
      <table role="presentation" align="center" border="0" cellspacing="0" cellpadding="0" width="600">
      <tr>
      <td>
      <![endif]-->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; margin: 0 auto; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.05), 0 8px 10px -6px rgba(0,0,0,0.01);">
        <tr>
          <td style="padding: 0;">
            ${bodyContent}
          </td>
        </tr>
      </table>
      <!--[if mso]>
      </td>
      </tr>
      </table>
      <![endif]-->
    </div>
  </center>
</body>
</html>`;
}
