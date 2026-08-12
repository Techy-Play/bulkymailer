import type { AiConfig } from '@templatical/types';
import { BlockDefaults } from '@templatical/types';
import type { CollaborationConfig } from '@templatical/types';
import { ColorsConfig } from '@templatical/types';
import type { CommentEvent } from '@templatical/types';
import { ComputedRef } from 'vue';
import { createLocalStorageSavedBlocksProvider } from '@templatical/core';
import type { CustomBlock } from '@templatical/types';
import { CustomBlockDefinition } from '@templatical/types';
import { CustomFont } from '@templatical/types';
import { DisplayConditionsConfig } from '@templatical/types';
import { FontsConfig } from '@templatical/types';
import { LintOptions } from '@templatical/quality';
import { LocalStorageSavedBlocksOptions } from '@templatical/core';
import { LogicPair } from '@templatical/types';
import { LogicTag } from '@templatical/types';
import { LogicTagsConfig } from '@templatical/types';
import type { McpConfig } from '@templatical/types';
import type { MediaItem } from '@templatical/media-library';
import type { MediaRequestContext } from '@templatical/media-library';
import type { MediaResult } from '@templatical/types';
import { MergeTagsConfig } from '@templatical/types';
import { Ref } from 'vue';
import type { ResolvePreview } from '@templatical/types';
import { SavedBlock } from '@templatical/types';
import { SavedBlocksListParams } from '@templatical/types';
import { SavedBlocksProvider } from '@templatical/types';
import { SaveResult } from '@templatical/types';
import { Template } from '@templatical/types';
import { TemplateContent } from '@templatical/types';
import { TemplateDefaults } from '@templatical/types';
import { TestEmailPayload } from '@templatical/types';
import { TestEmailProvider } from '@templatical/types';
import { ThemeOverrides } from '@templatical/types';
import { UiTheme } from '@templatical/types';
import { ViewportSize } from '@templatical/types';

export { BlockDefaults }

export { ColorsConfig }

export { createLocalStorageSavedBlocksProvider }

export { CustomBlockDefinition }

export { CustomFont }

export { DisplayConditionsConfig }

export declare interface EditorCapabilities {
    plan?: {
        hasFeature(feature: string): boolean;
    };
    ai?: {
        isFeatureEnabled(feature: string): boolean;
    };
    comments?: {
        getBlockCount(blockId: string): number;
        openForBlock(blockId: string): void;
    };
    /**
     * Present only when a `SavedBlocksProvider` is configured — in OSS via
     * `init({ savedBlocks })`, in Cloud whenever cloud mode is active.
     */
    savedBlocks?: {
        /**
         * Begin a canvas pick session seeded with this block. Blocks are then
         * chosen by plain clicks until the floating bar confirms or cancels —
         * `EditorState.selectedBlockId` is untouched throughout.
         */
        startPicking(blockId: string): void;
        togglePick(blockId: string): void;
        isPicked(blockId: string): boolean;
        /** True while a pick session is running; block chrome swaps behaviour. */
        isPicking: ComputedRef<boolean>;
        /** Exposed so the shared keyboard handler can drive Enter/Escape. */
        confirmPicking(): void;
        cancelPicking(): void;
        openBrowser(): void;
        /**
         * How many entries are loaded. Informational only — the sidebar rail is
         * gated on {@link isAvailable} alone, never on this, so a slow or empty
         * `list()` can't make the entry appear late or shift the rail.
         */
        count: ComputedRef<number>;
        /**
         * Whether the feature is usable right now. Reactive because Cloud only
         * learns its plan entitlement after an async config fetch, which happens
         * *after* capabilities are provided — so presence alone can't encode it.
         * UI must gate on this, or it will render controls that do nothing.
         */
        isAvailable: ComputedRef<boolean>;
        /**
         * Which mutations the provider supplied — a provider may pass `false`
         * instead of a function to withhold one. Shared UI hides the corresponding
         * affordance: with `canCreate` false there is no bookmark action and so no
         * pick session, leaving a browse-and-insert-only library.
         *
         * Separate from {@link isAvailable}, which answers whether the feature
         * exists at all.
         */
        canCreate: ComputedRef<boolean>;
        canUpdate: ComputedRef<boolean>;
        canDelete: ComputedRef<boolean>;
    };
    /**
     * Present only when a `TestEmailProvider` is configured — in OSS via
     * `init({ testEmail })`, in Cloud whenever cloud mode is active (or when a
     * consumer supplied their own sender to `initCloud()`).
     */
    testEmail?: {
        /** Open the send dialog. A no-op while {@link isAvailable} is false. */
        open(): void;
        /**
         * Whether the feature is usable right now. Reactive for the same reason as
         * `savedBlocks.isAvailable`: Cloud resolves its plan entitlement and its
         * allowed-recipient list *after* capabilities are provided, and an
         * explicitly empty allowlist makes the feature unusable. UI must gate on
         * this or it renders a button that does nothing.
         */
        isAvailable: ComputedRef<boolean>;
    };
}

export declare interface FontOption {
    value: string;
    label: string;
    isCustom?: boolean;
}

export { FontsConfig }

/**
 * Get the base language code from a locale string.
 * e.g., 'en-GB' -> 'en', 'de_DE' -> 'de'
 */
export declare function getBaseLocale(locale: string): string;

/** List of cloud-supported locales. May be a subset of OSS locales. */
export declare function getSupportedCloudLocales(): string[];

/** List of OSS-supported locales. */
export declare function getSupportedLocales(): string[];

/**
 * Consumer-facing shape of the `htmlBlockPreview` editor config option.
 *
 * Controls whether an HTML block's raw content renders as a live preview in
 * the editor canvas — inside a sandboxed iframe — instead of the static
 * placeholder card. Off by default. Accepts a bare boolean or an object so the
 * shape can grow (e.g. render modes, resource policies) without a breaking
 * change; today the object carries only `enabled`.
 */
export declare type HtmlBlockPreviewConfig = boolean | {
    enabled: boolean;
};

export declare function init(config: TemplaticalEditorConfig): Promise<TemplaticalEditor>;

export declare function initCloud(config: TemplaticalCloudEditorConfig): Promise<TemplaticalCloudEditor>;

/** Check if a locale has cloud translations (matched by exact locale, then base). */
export declare function isCloudLocaleSupported(locale: string): boolean;

/** Check if a locale has OSS translations (matched by exact locale, then base). */
export declare function isLocaleSupported(locale: string): boolean;

export { LocalStorageSavedBlocksOptions }

export { LogicPair }

export { LogicTag }

export { LogicTagsConfig }

export { MergeTagsConfig }

/** Function type for media browser requests, used by both OSS and Cloud editors. */
export declare type OnRequestMedia = (context?: MediaRequestContext) => Promise<MediaResult | null>;

/**
 * Display-only resolver for image `src` values (`config.resolveImageUrl`,
 * #415). Maps a canonical src (e.g. a plain file name like `logo.png`) to a
 * URL the canvas can actually display (e.g. an ephemeral `blob:` URL).
 * Returning `null` (or the input value) means "use the src as-is". The
 * resolved value never enters the content model or the MJML export.
 */
export declare type ResolveImageUrl = (src: string) => string | null | Promise<string | null>;

export { SavedBlock }

export { SavedBlocksListParams }

export { SavedBlocksProvider }

export { SaveResult }

export { Template }

export { TemplateContent }

export { TemplateDefaults }

/**
 * Cloud editor does not expose `toMjml` or `renderCustomBlock`: the cloud
 * backend performs MJML conversion server-side with additional processing
 * (e.g., signed image URLs, attachment handling) that isn't available client
 * side. Use the cloud `save()` flow to persist content; the backend handles
 * MJML/HTML export from there.
 */
export declare interface TemplaticalCloudEditor extends TemplaticalEditorBase {
    create(content?: TemplateContent): Promise<Template>;
    load(templateId: string): Promise<Template>;
    save(): Promise<SaveResult>;
}

export declare interface TemplaticalCloudEditorConfig {
    container: string | HTMLElement;
    content?: TemplateContent;
    /**
     * Mount the editor inside a Shadow DOM (open mode) for CSS isolation
     * from the host page. Defaults to `true` — host stylesheets cannot
     * cascade past the shadow boundary into editor elements (`p`, `a`,
     * `input`, etc.), and editor utility classes never collide with host
     * class names.
     *
     * Set to `false` to mount in light DOM. Opt out when:
     *  - Your host integration uses `document.querySelector` to reach
     *    editor internals (with shadow DOM, use `container.shadowRoot
     *    .querySelector(...)` instead).
     *  - You need to support Firefox <101 or Safari <16.4, which lack the
     *    `adoptedStyleSheets` API the shadow path relies on.
     *
     * Light-mode consumers should keep this set to `false` explicitly so
     * future SDK changes don't silently flip the default again.
     *
     * @default true
     */
    shadowDom?: boolean;
    auth: {
        url: string;
        baseUrl?: string;
        requestOptions?: {
            method?: "GET" | "POST";
            headers?: Record<string, string>;
            body?: Record<string, unknown>;
            credentials?: RequestCredentials;
        };
    };
    theme?: ThemeOverrides;
    uiTheme?: UiTheme;
    locale?: string;
    /**
     * Show the "Powered by Templatical" footer. Defaults to `true`.
     * Set to `false` to hide the footer (no attribution required by the license).
     * Cloud white-label plans hide the footer regardless of this setting.
     */
    branding?: boolean;
    /**
     * Show a "use a larger screen" notice instead of the editor chrome on
     * viewports narrower than ~768px. Defaults to `true`.
     *
     * The drag-and-drop editor is a desktop-class tool — the block palette,
     * canvas, and properties panel can't lay out usably on a phone, and touch
     * dragging is impractical. Rather than render a broken, cramped layout, the
     * editor shows a clear message below the breakpoint.
     *
     * Set to `false` if you handle small screens yourself (e.g. you embed the
     * editor in a deliberately narrow desktop pane). The check is viewport-based,
     * so it targets actual small devices, not narrow containers on a wide screen.
     *
     * @default true
     */
    smallScreenNotice?: boolean;
    ai?: AiConfig | false;
    commenting?: boolean;
    collaboration?: CollaborationConfig;
    mcp?: McpConfig;
    blockDefaults?: BlockDefaults;
    templateDefaults?: TemplateDefaults;
    /**
     * Reusable saved blocks.
     *
     * - **omitted / `true`** — backed by Templatical Cloud, gated on the
     *   `saved_modules` plan feature.
     * - **`false`** — off entirely; no UI renders.
     * - **a {@link SavedBlocksProvider}** — backed by *your* store instead of
     *   Cloud's, and **not plan-gated**, because the plan feature licenses Cloud's
     *   storage rather than the editor's UI.
     *
     * The provider form is the same type `init()` takes, so moving an OSS
     * integration to Cloud means deleting this key (to adopt Cloud's store) or
     * leaving it exactly as-is (to keep your own) — never rewriting it.
     */
    savedBlocks?: boolean | SavedBlocksProvider;
    autoSave?: boolean;
    autoSaveDebounce?: number;
    mergeTags?: MergeTagsConfig;
    logicTags?: LogicTagsConfig;
    displayConditions?: DisplayConditionsConfig;
    customBlocks?: CustomBlockDefinition[];
    /**
     * Allowlist + order for the block palette. When set, only the listed block
     * types appear in the sidebar palette, in this order; unlisted built-ins are
     * hidden. Built-ins use their bare type (`'image'`), custom blocks the
     * `custom:`-prefixed type (`'custom:qrcode'`). Unknown entries are warned and
     * skipped. Omit for the full default palette. See `paletteBlocks` on the OSS
     * editor config for details.
     */
    paletteBlocks?: string[];
    /**
     * Render each HTML block's raw content as a live preview in the editor
     * canvas instead of the static placeholder card. **Off by default.** Accepts
     * `true` (shorthand for `{ enabled: true }`) or `{ enabled: boolean }`.
     *
     * Content is rendered verbatim inside a sandboxed `<iframe>`
     * (`sandbox="allow-same-origin"`, no `allow-scripts`), so scripts never run
     * and styles can't bleed. Preview-only — export is unaffected. See
     * `htmlBlockPreview` on the OSS editor config for details.
     *
     * @default false
     */
    htmlBlockPreview?: HtmlBlockPreviewConfig;
    fonts?: FontsConfig;
    /**
     * Editor-wide color-picker palette. `presets` render as a clickable grid in
     * every color picker popover; `allowCustom: false` (with `presets`) hides the
     * wheel and hex input so authors can only pick from the palette. Ignored with
     * a warning when no `presets` are configured. See `colors` on the OSS editor
     * config for details and an example.
     */
    colors?: ColorsConfig;
    onChange?: (content: TemplateContent) => void;
    onSave?: (result: SaveResult) => void;
    onCreate?: (template: Template) => void;
    onLoad?: (template: Template) => void;
    onError?: (error: Error) => void;
    onComment?: (event: CommentEvent) => void;
    onUnmount?: () => void;
    onRequestMedia?: (context: MediaRequestContext) => Promise<MediaItem | null>;
    /**
     * Transform the rendered HTML just before Cloud sends a test email.
     *
     * Cloud-only, and deliberately so: it exists because *Cloud* renders the HTML,
     * so a consumer needs a seam into it. A consumer-supplied {@link testEmail}
     * provider *is* that seam, and this hook is not applied to it.
     */
    onBeforeTestEmail?: (html: string) => string | Promise<string>;
    /**
     * Sending backend for test emails.
     *
     * - **omitted** — sent by Templatical Cloud, gated on the `test_email` plan
     *   feature and its signed allowed-recipient list.
     * - **a {@link TestEmailProvider}** — sent by *you* instead, which is what to
     *   reach for when mail must leave your own infrastructure for compliance or
     *   data-residency reasons.
     *
     * The same type `init()` takes, so moving an OSS integration to Cloud means
     * deleting this key (to adopt Cloud's sender) or leaving it exactly as-is (to
     * keep your own) — never rewriting it.
     */
    testEmail?: TestEmailProvider;
    /**
     * Resolves the template for preview surfaces — typically evaluating logic
     * tags (`{% if %}` … `{% endif %}`) against real data on your backend.
     *
     * The **same key and the same type as `init()`**, so adopting or dropping it
     * is a one-line change either way. Not plan-gated: this is a display concern,
     * and Cloud has no server-side resolver of its own to supersede it.
     *
     * Supersedes `MergeTag.sample` when configured, and the Sample/Label switch
     * stops rendering.
     */
    resolvePreview?: ResolvePreview;
    /**
     * Template linter (`@templatical/quality`) configuration. Runs every
     * linter exported by the package (accessibility + structure). Cloud
     * additionally merges `planConfig.accessibility` from the server (server
     * policy wins on conflict) — this option sets the consumer-supplied baseline.
     */
    lint?: LintOptions;
}

export declare interface TemplaticalEditor extends TemplaticalEditorBase {
    /**
     * Render the current template to an MJML string. Resolves custom blocks
     * via the editor's internal block registry. Throws if the optional
     * `@templatical/renderer` package is not installed.
     */
    toMjml(): Promise<string>;
    /**
     * Render a single custom block to its HTML representation, using the
     * registered custom block definition's template and the block's current
     * field values. Exposed for headless callers that want to reuse the
     * editor's renderer (e.g., to drive `@templatical/renderer`'s
     * `renderCustomBlock` option from outside the editor instance).
     */
    renderCustomBlock(block: CustomBlock): Promise<string>;
    /**
     * Look up the definition-level `stylesheet` for a registered custom block
     * type. Returns the raw CSS string, or `undefined` when the type is unknown
     * or the definition has no stylesheet. Exposed for headless callers that
     * want to drive `@templatical/renderer`'s `getCustomBlockStylesheet` option
     * from outside the editor instance.
     */
    getCustomBlockStylesheet(customType: string): string | undefined;
}

declare interface TemplaticalEditorBase {
    getContent(): TemplateContent;
    setContent(content: TemplateContent): void;
    setTheme(theme: UiTheme): void;
    unmount(): void;
}

export declare interface TemplaticalEditorConfig {
    /**
     * Where to mount the editor — a CSS selector or an `HTMLElement`.
     *
     * Layout caveat: do NOT apply `transform`, `filter`, `perspective`, or
     * `will-change` to an ancestor of this element. Each establishes a CSS
     * containing block for `position: fixed`, which offsets the editor's
     * floating UI (color pickers, rich-text toolbars) and its drag ghost away
     * from their anchor — even when the transform's computed value is `none`
     * (an active/animated transform still promotes the element). For a
     * scroll/entrance effect on a wrapper, animate `opacity` instead of
     * `transform`.
     */
    container: string | HTMLElement;
    content?: TemplateContent;
    /**
     * Mount the editor inside a Shadow DOM (open mode) for CSS isolation
     * from the host page. Defaults to `true` — host stylesheets cannot
     * cascade past the shadow boundary into editor elements (`p`, `a`,
     * `input`, etc.), and editor utility classes never collide with host
     * class names.
     *
     * Set to `false` to mount in light DOM. Opt out when:
     *  - Your host integration uses `document.querySelector` to reach
     *    editor internals (with shadow DOM, use `container.shadowRoot
     *    .querySelector(...)` instead).
     *  - You need to support Firefox <101 or Safari <16.4, which lack the
     *    `adoptedStyleSheets` API the shadow path relies on.
     *
     * Light-mode consumers should keep this set to `false` explicitly so
     * future SDK changes don't silently flip the default again.
     *
     * @default true
     */
    shadowDom?: boolean;
    onChange?: (content: TemplateContent) => void;
    onSave?: (content: TemplateContent) => void;
    onError?: (error: Error) => void;
    onRequestMedia?: OnRequestMedia;
    /**
     * Resolves the template for preview surfaces — typically evaluating logic
     * tags (`{% if %}` … `{% endif %}`) against real data on your backend.
     *
     * Called when a preview opens and when the test-email recipient changes,
     * debounced. Display-only: the result never reaches `getContent()`, a send or
     * an export. Rejecting is safe — the preview falls back to the unresolved
     * template and says so.
     *
     * Supersedes `MergeTag.sample` when configured: real data beats example data,
     * so the Sample/Label switch stops rendering.
     */
    resolvePreview?: ResolvePreview;
    /**
     * Display-only resolver for image `src` values. The canvas calls this to
     * obtain a preview URL for a src the user entered; the content model (and
     * `toMjml()` output) always keeps the canonical value. Return `null` — or
     * the input value — to use the src as-is.
     *
     * Use this when templates reference images by a value that isn't directly
     * displayable, e.g. plain file names resolved to ephemeral `blob:` URLs
     * from local storage:
     *
     * ```ts
     * resolveImageUrl: async (src) => {
     *   const file = await fileStore.lookup(src);
     *   return file ? URL.createObjectURL(file) : null;
     * }
     * ```
     *
     * The resolver is called once per committed src value (typing in the src
     * input is debounced, so partial values never reach it) and results are
     * cached per src for the editor's lifetime — including failures, which
     * fall back to displaying the src verbatim. Note the caching applies to
     * transient failures too: a src that failed to resolve stays unresolved
     * until the editor is re-initialized (a re-resolve hook may be added
     * later). Applies to image srcs, design-time placeholder previews, and
     * explicit video thumbnails; auto-derived provider thumbnails (YouTube/
     * Vimeo) are already real URLs and are never resolved.
     */
    resolveImageUrl?: ResolveImageUrl;
    mergeTags?: MergeTagsConfig;
    /**
     * Standalone logic tags — control-flow tokens (`{% else %}`) and open/close
     * pairs (`{% if %}` … `{% endif %}`) inserted from a dedicated "Insert logic"
     * button. Separate from `mergeTags`; typed/pasted logic is highlighted
     * regardless of this config.
     */
    logicTags?: LogicTagsConfig;
    displayConditions?: DisplayConditionsConfig;
    customBlocks?: CustomBlockDefinition[];
    /**
     * Allowlist + order for the block palette. When set, only the listed block
     * types appear in the sidebar palette, in exactly this order — unlisted
     * built-ins (e.g. `video`, `table`) are hidden. When omitted, the full
     * default palette is shown.
     *
     * Reference built-in blocks by their bare type (`'section'`, `'image'`, …)
     * and custom blocks by their `custom:`-prefixed type (`'custom:qrcode'`),
     * so they can be interleaved freely:
     *
     * ```ts
     * paletteBlocks: ['section', 'title', 'image', 'custom:qrcode', 'button']
     * ```
     *
     * Unknown entries — a typo, an unregistered custom block, or `countdown`
     * outside a Cloud plan — are logged with a warning and skipped. Filtering
     * the palette never affects rendering: existing content using a hidden
     * block type still renders correctly.
     */
    paletteBlocks?: string[];
    /**
     * Render each HTML block's raw content as a live preview in the editor
     * canvas instead of the static placeholder card. **Off by default.**
     *
     * ```ts
     * htmlBlockPreview: true                 // shorthand for { enabled: true }
     * htmlBlockPreview: { enabled: true }
     * ```
     *
     * The content is rendered verbatim inside a sandboxed `<iframe>`
     * (`sandbox="allow-same-origin"`, **no** `allow-scripts`): scripts and
     * inline event handlers never execute and styles can't bleed into the rest
     * of the editor. This is a preview-only setting — the MJML/HTML export path
     * renders HTML blocks regardless of it.
     *
     * @default false
     */
    htmlBlockPreview?: HtmlBlockPreviewConfig;
    fonts?: FontsConfig;
    /**
     * Editor-wide color-picker palette. `presets` appear as a clickable grid in
     * every color picker popover (block toolbars, template settings, rich-text
     * color, custom-block color fields) — clicking one applies it, and the preset
     * matching the current value is marked selected.
     *
     * ```ts
     * colors: {
     *   presets: ['#0b5cff', '#111827', '#6b7280', '#ffffff'],
     *   allowCustom: false, // lock authors to the presets above
     * }
     * ```
     *
     * `allowCustom` defaults to `true`. Set it to `false` (together with
     * `presets`) to hide the wheel and hex input so authors can only pick from the
     * palette — useful when embedding the editor as a white-label / brand-kit
     * tool. `allowCustom: false` is ignored, with a warning, when no `presets` are
     * configured, since that would leave the picker with no way to set a color.
     */
    colors?: ColorsConfig;
    /**
     * Storage backend for **saved blocks** — reusable groups of blocks a user
     * saves from the canvas and re-inserts into other templates.
     *
     * The editor owns the UI (a save action on each block, a searchable browser
     * with preview, insert-at-position, rename, delete); you own persistence.
     * Implement the four methods of `SavedBlocksProvider` against your own API,
     * or use the bundled browser-local provider for demos and prototypes:
     *
     * ```ts
     * import { init, createLocalStorageSavedBlocksProvider } from "@templatical/editor";
     *
     * init({ container, savedBlocks: createLocalStorageSavedBlocksProvider() });
     * ```
     *
     * **Omitted by default.** With no provider the feature is entirely off — no
     * save action, no sidebar entry, and none of its UI code is downloaded.
     *
     * Not to be confused with `customBlocks`, which registers developer-defined
     * block *types* with their own templates and field schemas.
     */
    savedBlocks?: SavedBlocksProvider;
    /**
     * Sending backend for **test emails** — letting a user mail themselves the
     * template they're editing.
     *
     * The editor owns the trigger, the dialog, recipient validation and the
     * sending/success/error states; you own delivery. One method is enough:
     *
     * ```ts
     * init({
     *   container,
     *   testEmail: {
     *     send: ({ recipient, content }) =>
     *       fetch("/api/test-email", {
     *         method: "POST",
     *         headers: { "Content-Type": "application/json" },
     *         body: JSON.stringify({ recipient, content }),
     *       }).then((r) => {
     *         if (!r.ok) throw new Error("Could not send the test email");
     *       }),
     *   },
     * });
     * ```
     *
     * **Omitted by default.** With no provider the feature is entirely off — no
     * button, and none of its UI code is downloaded.
     *
     * `allowedRecipients` restricts the picker but is **not** a security boundary:
     * it lives in the user's browser. Validate the recipient on your server.
     */
    testEmail?: TestEmailProvider;
    blockDefaults?: BlockDefaults;
    templateDefaults?: TemplateDefaults;
    theme?: ThemeOverrides;
    uiTheme?: UiTheme;
    locale?: string;
    /**
     * Show the "Powered by Templatical" footer. Defaults to `true`.
     * Set to `false` to hide the footer (no attribution required by the license).
     */
    branding?: boolean;
    /**
     * Show a "use a larger screen" notice instead of the editor chrome on
     * viewports narrower than ~768px. Defaults to `true`.
     *
     * The drag-and-drop editor is a desktop-class tool — the block palette,
     * canvas, and properties panel can't lay out usably on a phone, and touch
     * dragging is impractical. Rather than render a broken, cramped layout, the
     * editor shows a clear message below the breakpoint.
     *
     * Set to `false` if you handle small screens yourself (e.g. you embed the
     * editor in a deliberately narrow desktop pane). The check is viewport-based,
     * so it targets actual small devices, not narrow containers on a wide screen.
     *
     * @default true
     */
    smallScreenNotice?: boolean;
    /**
     * Template linter (`@templatical/quality`) configuration. Runs every
     * linter exported by the package (accessibility + structure).
     *
     * - When unset, the linter loads on demand once the user opens the panel.
     * - When `disabled: true`, the optional peer is never imported (saves the
     *   chunk download) and the sidebar tab + inline badges are suppressed.
     * - `rules`/`thresholds` follow the shape exported by `@templatical/quality`.
     */
    lint?: LintOptions;
}

export { TestEmailPayload }

export { TestEmailProvider }

export { ThemeOverrides }

export { UiTheme }

/**
 * Unmount the most-recently-created OSS editor. Single-instance legacy
 * API — callers managing multiple editors should use `instance.unmount()`
 * from each returned object, which targets the specific container.
 */
export declare function unmount(): void;

export declare function useFonts(config?: FontsConfig): UseFontsReturn;

export declare interface UseFontsReturn {
    fonts: ComputedRef<FontOption[]>;
    defaultFont: ComputedRef<string>;
    defaultFallback: ComputedRef<string>;
    customFonts: Ref<CustomFont[]>;
    customFontsEnabled: Ref<boolean>;
    isLoaded: Ref<boolean>;
    setCustomFontsEnabled: (enabled: boolean) => void;
    loadCustomFonts: () => Promise<void>;
    cleanupFontLinks: () => void;
    getFontWithFallback: (fontName: string) => string;
    getDefaultFont: () => string;
}

export { ViewportSize }

export { }
