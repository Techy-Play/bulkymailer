import type { CustomBlockDefinition } from "@templatical/types";

export const advancedImageBlock: CustomBlockDefinition = {
  type: "advanced_image",
  name: "Image",
  icon: "image",
  description: "Advanced Image block with shape, border, and crop controls.",
  fields: [
    { type: "image", key: "image", label: "Image URL", required: true },
    { type: "text", key: "altText", label: "Alt Text" },
    {
      type: "select",
      key: "shape",
      label: "Shape",
      options: [
        { label: "Square", value: "square" },
        { label: "Rounded", value: "rounded" },
        { label: "Circle", value: "circle" },
      ],
      default: "square",
    },
    { type: "boolean", key: "borderEnabled", label: "Enable Border", default: false },
    { type: "number", key: "borderWidth", label: "Border Width (px)", default: 4, min: 1, max: 20 },
    { type: "color", key: "borderColor", label: "Border Color", default: "#000000" },
    { type: "number", key: "padding", label: "Padding (px)", default: 0, min: 0, max: 100 },
    { type: "boolean", key: "cropTrigger", label: "Crop Image (Toggle to Open)", default: false },
  ],
  template: `
    {% if image %}
    <mj-image
      src="{{image}}"
      alt="{{altText}}"
      border-radius="{% if shape == 'circle' %}50%{% elsif shape == 'rounded' %}12px{% else %}0{% endif %}"
      border="{% if borderEnabled == true or borderEnabled == 'true' %}{{borderWidth}}px solid {{borderColor}}{% else %}none{% endif %}"
      padding="{{padding}}px"
    />
    {% else %}
    <mj-image
      src="https://placehold.co/600x400/f4f4f5/a1a1aa?text=Image"
      alt="Placeholder"
      border-radius="{% if shape == 'circle' %}50%{% elsif shape == 'rounded' %}12px{% else %}0{% endif %}"
      border="{% if borderEnabled == true or borderEnabled == 'true' %}{{borderWidth}}px solid {{borderColor}}{% else %}none{% endif %}"
      padding="{{padding}}px"
    />
    {% endif %}
  `,
};
