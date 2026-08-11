"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blueprints = void 0;
var types_1 = require("@templatical/types");
function withStyles(blocks) {
    return blocks.map(function (block) { return (__assign(__assign({}, block), { styles: __assign({ padding: { top: 16, bottom: 16, left: 24, right: 24 } }, (block.styles || {})) })); });
}
exports.blueprints = [
    {
        id: 'blank',
        name: 'Start from Scratch',
        description: 'A blank canvas for your imagination',
        category: 'GENERAL',
        getContent: function () {
            var content = (0, types_1.createDefaultTemplateContent)();
            return content;
        }
    },
    {
        id: 'product-launch',
        name: 'Product Launch',
        description: 'Announce a new product or feature',
        category: 'PROMOTIONAL',
        getContent: function () {
            var content = (0, types_1.createDefaultTemplateContent)();
            content.blocks = withStyles([
                {
                    id: 'h1',
                    type: 'title', content: 'Introducing Our New Product', level: 'h1', textAlign: 'center'
                },
                {
                    id: 'img1',
                    type: 'custom',
                    customType: 'advanced_image',
                    fieldValues: { image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30', altText: 'New Product', shape: 'rounded', borderEnabled: false }
                },
                {
                    id: 'p1',
                    type: 'paragraph', content: 'We are thrilled to announce the launch of our newest feature that will revolutionize your workflow. Check it out now!'
                },
                {
                    id: 'b1',
                    type: 'button', text: 'Get Started Today', url: 'https://example.com', backgroundColor: '#4F46E5', textColor: '#ffffff', borderRadius: 4, fontSize: 16, buttonPadding: { top: 12, right: 24, bottom: 12, left: 24 }
                }
            ]);
            return content;
        }
    },
    {
        id: 'newsletter',
        name: 'Newsletter',
        description: 'Weekly digest with featured article and links',
        category: 'NEWSLETTER',
        getContent: function () {
            var content = (0, types_1.createDefaultTemplateContent)();
            content.blocks = withStyles([
                {
                    id: 'h1',
                    type: 'title', content: 'Weekly Digest', level: 'h1', textAlign: 'center'
                },
                {
                    id: 'p1',
                    type: 'paragraph', content: 'Welcome to this week’s newsletter! We have some great articles lined up for you.'
                },
                {
                    id: 'divider1',
                    type: 'divider', color: '#E5E7EB', thickness: 1, lineStyle: 'solid', width: 'full'
                },
                {
                    id: 'h2',
                    type: 'title', content: 'Featured Article', level: 'h2', textAlign: 'left'
                },
                {
                    id: 'p2',
                    type: 'paragraph', content: 'Read about the latest trends in our industry and how you can stay ahead of the curve.'
                },
                {
                    id: 'b1',
                    type: 'button', text: 'Read More', url: 'https://example.com', backgroundColor: '#4F46E5', textColor: '#ffffff', borderRadius: 4, fontSize: 16, buttonPadding: { top: 12, right: 24, bottom: 12, left: 24 }
                }
            ]);
            return content;
        }
    },
    {
        id: 'welcome-email',
        name: 'Welcome Email',
        description: 'Onboarding steps for new users',
        category: 'PERSONALIZED',
        getContent: function () {
            var content = (0, types_1.createDefaultTemplateContent)();
            content.blocks = withStyles([
                {
                    id: 'h1',
                    type: 'title', content: 'Welcome aboard, {{firstName}}!', level: 'h1', textAlign: 'center'
                },
                {
                    id: 'p1',
                    type: 'paragraph', content: 'We are so excited to have you here. To get started, follow these three simple steps:'
                },
                {
                    id: 'p2',
                    type: 'paragraph', content: '1. Complete your profile<br>2. Invite your team<br>3. Create your first campaign'
                },
                {
                    id: 'b1',
                    type: 'button', text: 'Go to Dashboard', url: 'https://example.com', backgroundColor: '#4F46E5', textColor: '#ffffff', borderRadius: 4, fontSize: 16, buttonPadding: { top: 12, right: 24, bottom: 12, left: 24 }
                }
            ]);
            return content;
        }
    },
    {
        id: 'order-confirmation',
        name: 'Order Confirmation',
        description: 'Receipt and tracking info',
        category: 'TRANSACTIONAL',
        getContent: function () {
            var content = (0, types_1.createDefaultTemplateContent)();
            content.blocks = withStyles([
                {
                    id: 'h1',
                    type: 'title', content: 'Order Confirmed', level: 'h1', textAlign: 'left'
                },
                {
                    id: 'p1',
                    type: 'paragraph', content: 'Hi {{firstName}}, thank you for your order! We are preparing it for shipment.'
                },
                {
                    id: 'd1',
                    type: 'divider', color: '#E5E7EB', thickness: 1, lineStyle: 'solid', width: 'full'
                },
                {
                    id: 'p2',
                    type: 'paragraph', content: 'Order Number: #123456789<br>Estimated Delivery: 3-5 business days'
                },
                {
                    id: 'b1',
                    type: 'button', text: 'Track Order', url: 'https://example.com', backgroundColor: '#111827', textColor: '#ffffff', borderRadius: 4, fontSize: 16, buttonPadding: { top: 12, right: 24, bottom: 12, left: 24 }
                }
            ]);
            return content;
        }
    },
    {
        id: 'event-invitation',
        name: 'Event Invitation',
        description: 'RSVP and event details',
        category: 'PROMOTIONAL',
        getContent: function () {
            var content = (0, types_1.createDefaultTemplateContent)();
            content.blocks = withStyles([
                {
                    id: 'h1',
                    type: 'title', content: 'You’re Invited!', level: 'h1', textAlign: 'center'
                },
                {
                    id: 'p1',
                    type: 'paragraph', content: 'Join us for our annual summit. It will be an evening of networking, great food, and inspiring talks.'
                },
                {
                    id: 'p2',
                    type: 'paragraph', content: 'Date: October 15, 2026<br>Time: 7:00 PM EST<br>Location: Virtual Event'
                },
                {
                    id: 'b1',
                    type: 'button', text: 'RSVP Now', url: 'https://example.com', backgroundColor: '#4F46E5', textColor: '#ffffff', borderRadius: 4, fontSize: 16, buttonPadding: { top: 12, right: 24, bottom: 12, left: 24 }
                }
            ]);
            return content;
        }
    },
    {
        id: 'password-reset',
        name: 'Password Reset',
        description: 'Standard reset password template',
        category: 'TRANSACTIONAL',
        getContent: function () {
            var content = (0, types_1.createDefaultTemplateContent)();
            content.blocks = withStyles([
                {
                    id: 'h2',
                    type: 'title', content: 'Reset Your Password', level: 'h2', textAlign: 'center'
                },
                {
                    id: 'p1',
                    type: 'paragraph', content: 'We received a request to reset your password. Click the button below to choose a new password.'
                },
                {
                    id: 'b1',
                    type: 'button', text: 'Reset Password', url: '{{resetUrl}}', backgroundColor: '#4F46E5', textColor: '#ffffff', borderRadius: 4, fontSize: 16, buttonPadding: { top: 12, right: 24, bottom: 12, left: 24 }
                },
                {
                    id: 'p2',
                    type: 'paragraph', content: 'If you did not make this request, you can safely ignore this email.'
                }
            ]);
            return content;
        }
    },
    {
        id: 'black-friday',
        name: 'Black Friday Sale',
        description: 'High urgency promotional campaign',
        category: 'PROMOTIONAL',
        getContent: function () {
            var content = (0, types_1.createDefaultTemplateContent)();
            content.blocks = withStyles([
                {
                    id: 'h1',
                    type: 'title', content: 'BLACK FRIDAY EARLY ACCESS', level: 'h1', textAlign: 'center', color: '#000000'
                },
                {
                    id: 'p1',
                    type: 'paragraph', content: 'Get up to 50% off storewide. Use code BF2026 at checkout.'
                },
                {
                    id: 'img1',
                    type: 'custom',
                    customType: 'advanced_image',
                    fieldValues: { image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da', altText: 'Sale', shape: 'square', borderEnabled: false }
                },
                {
                    id: 'b1',
                    type: 'button', text: 'Shop the Sale', url: 'https://example.com', backgroundColor: '#000000', textColor: '#ffffff', borderRadius: 4, fontSize: 16, buttonPadding: { top: 12, right: 24, bottom: 12, left: 24 }
                }
            ]);
            return content;
        }
    }
];
