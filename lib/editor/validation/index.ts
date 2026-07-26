import { TemplateJSONNode, ValidationIssue } from '../types';
import { EditorEventBus } from '../events';

export function runFullValidationCheck(root: TemplateJSONNode): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  function traverse(node: TemplateJSONNode) {
    if (!node) return;

    // 1. Accessibility Checks
    if (node.type === 'image') {
      if (!node.props?.alt) {
        issues.push({
          id: `val-img-alt-${node.id}`,
          severity: 'warning',
          category: 'accessibility',
          nodeId: node.id,
          message: `Image node "${node.name || node.id}" is missing alt text for screen readers`,
          ruleId: 'accessibility/img-alt-required',
          recommendation: 'Add descriptive alt text in the Inspector panel.',
        });
      }
    }

    // 2. CTA Button Size & Touch Target Checks
    if (node.type === 'button') {
      const padding = Number(String(node.style?.paddingTop || '12').replace('px', ''));
      if (padding < 8) {
        issues.push({
          id: `val-btn-touch-${node.id}`,
          severity: 'info',
          category: 'accessibility',
          nodeId: node.id,
          message: `Button "${node.props?.text || 'CTA'}" has small touch padding (${padding}px)`,
          ruleId: 'accessibility/button-touch-target',
          recommendation: 'Increase padding to at least 10px for mobile touch compliance.',
        });
      }

      if (!node.props?.href || node.props.href === '#') {
        issues.push({
          id: `val-btn-link-${node.id}`,
          severity: 'error',
          category: 'deliverability',
          nodeId: node.id,
          message: `Button "${node.props?.text || 'CTA'}" is missing a destination URL`,
          ruleId: 'deliverability/empty-link',
          recommendation: 'Specify a target link (e.g. https://yourdomain.com/landing).',
        });
      }
    }

    // 3. Deliverability / Unsubscribe check
    if (node.type === 'footer') {
      if (!node.props?.unsubscribeUrl) {
        issues.push({
          id: `val-footer-unsub-${node.id}`,
          severity: 'error',
          category: 'deliverability',
          nodeId: node.id,
          message: 'Footer is missing an unsubscribe link (Anti-Spam requirement)',
          ruleId: 'deliverability/unsubscribe-required',
          recommendation: 'Include {{unsubscribeUrl}} in the footer.',
        });
      }
    }

    // Traverse children
    if (node.children) {
      node.children.forEach(traverse);
    }
  }

  traverse(root);

  const score = Math.max(0, 100 - issues.filter((i) => i.severity === 'error').length * 20 - issues.filter((i) => i.severity === 'warning').length * 5);
  EditorEventBus.emit('HealthCheckCompleted', { issues, score });

  return issues;
}
