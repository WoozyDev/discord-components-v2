"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = exports.Separator = exports.File = exports.MediaGallery = exports.MediaGalleryItem = exports.Thumbnail = exports.TextDisplay = exports.Section = exports.ChannelSelect = exports.MentionableSelect = exports.RoleSelect = exports.UserSelect = exports.SelectDefaultValue = exports.TextInput = exports.TextInputStyle = exports.StringSelect = exports.SelectOption = exports.Button = exports.ButtonStyle = exports.ActionRow = exports.Component = exports.ComponentOfContentType = exports.ComponentOfInteractiveType = exports.ComponentOfLayoutType = exports.ComponentType = void 0;
var ComponentType;
(function (ComponentType) {
    ComponentType[ComponentType["ActionRow"] = 1] = "ActionRow";
    ComponentType[ComponentType["Button"] = 2] = "Button";
    ComponentType[ComponentType["StringSelect"] = 3] = "StringSelect";
    ComponentType[ComponentType["TextInput"] = 4] = "TextInput";
    ComponentType[ComponentType["UserSelect"] = 5] = "UserSelect";
    ComponentType[ComponentType["RoleSelect"] = 6] = "RoleSelect";
    ComponentType[ComponentType["MentionableSelect"] = 7] = "MentionableSelect";
    ComponentType[ComponentType["ChannelSelect"] = 8] = "ChannelSelect";
    ComponentType[ComponentType["Section"] = 9] = "Section";
    ComponentType[ComponentType["TextDisplay"] = 10] = "TextDisplay";
    ComponentType[ComponentType["Thumbnail"] = 11] = "Thumbnail";
    ComponentType[ComponentType["MediaGallery"] = 12] = "MediaGallery";
    ComponentType[ComponentType["File"] = 13] = "File";
    ComponentType[ComponentType["Separator"] = 14] = "Separator";
    ComponentType[ComponentType["Container"] = 17] = "Container";
})(ComponentType || (exports.ComponentType = ComponentType = {}));
var ComponentOfLayoutType;
(function (ComponentOfLayoutType) {
    ComponentOfLayoutType[ComponentOfLayoutType["ActionRow"] = 1] = "ActionRow";
    ComponentOfLayoutType[ComponentOfLayoutType["Section"] = 9] = "Section";
    ComponentOfLayoutType[ComponentOfLayoutType["Separator"] = 14] = "Separator";
    ComponentOfLayoutType[ComponentOfLayoutType["Container"] = 17] = "Container";
})(ComponentOfLayoutType || (exports.ComponentOfLayoutType = ComponentOfLayoutType = {}));
var ComponentOfInteractiveType;
(function (ComponentOfInteractiveType) {
    ComponentOfInteractiveType[ComponentOfInteractiveType["Button"] = 2] = "Button";
    ComponentOfInteractiveType[ComponentOfInteractiveType["StringSelect"] = 3] = "StringSelect";
    ComponentOfInteractiveType[ComponentOfInteractiveType["TextInput"] = 4] = "TextInput";
    ComponentOfInteractiveType[ComponentOfInteractiveType["UserSelect"] = 5] = "UserSelect";
    ComponentOfInteractiveType[ComponentOfInteractiveType["RoleSelect"] = 6] = "RoleSelect";
    ComponentOfInteractiveType[ComponentOfInteractiveType["MentionableSelect"] = 7] = "MentionableSelect";
    ComponentOfInteractiveType[ComponentOfInteractiveType["ChannelSelect"] = 8] = "ChannelSelect";
})(ComponentOfInteractiveType || (exports.ComponentOfInteractiveType = ComponentOfInteractiveType = {}));
var ComponentOfContentType;
(function (ComponentOfContentType) {
    ComponentOfContentType[ComponentOfContentType["TextDisplay"] = 10] = "TextDisplay";
    ComponentOfContentType[ComponentOfContentType["Thumbnail"] = 11] = "Thumbnail";
    ComponentOfContentType[ComponentOfContentType["MediaGallery"] = 12] = "MediaGallery";
    ComponentOfContentType[ComponentOfContentType["File"] = 13] = "File";
})(ComponentOfContentType || (exports.ComponentOfContentType = ComponentOfContentType = {}));
class Component {
    type;
    id;
    constructor(type) {
        this.type = type;
    }
    build() {
        return {};
    }
}
exports.Component = Component;
class ActionRow extends Component {
    components = [];
    constructor() {
        super(ComponentType.ActionRow);
    }
    addComponents(...components) {
        for (const component of components) {
            if ([ComponentType.RoleSelect, ComponentType.UserSelect, ComponentType.MentionableSelect, ComponentType.ChannelSelect].includes(component.type) &&
                component.type == ComponentType.Button) {
                throw new Error("Only buttons or a single select component can be added to action row.");
            }
            if (this.components.find(a => a.type == ComponentType.TextInput) && component.type == ComponentType.TextInput) {
                throw new Error("Cannot add more than one text input component to action row.");
            }
            if ([ComponentType.RoleSelect, ComponentType.UserSelect, ComponentType.MentionableSelect, ComponentType.ChannelSelect].includes(component.type)
                && this.components.find(a => [ComponentType.RoleSelect, ComponentType.UserSelect, ComponentType.MentionableSelect, ComponentType.ChannelSelect].includes(a.type))) {
                throw new Error("Cannot add more than one select component to action row.");
            }
            if (this.components.length >= 5) {
                throw new Error("Cannot add more than 5 components to action row.");
            }
            this.components.push(component);
        }
        return this;
    }
    build() {
        return {
            type: this.type,
            components: this.components.map(component => component.build())
        };
    }
}
exports.ActionRow = ActionRow;
var ButtonStyle;
(function (ButtonStyle) {
    ButtonStyle[ButtonStyle["Primary"] = 1] = "Primary";
    ButtonStyle[ButtonStyle["Secondary"] = 2] = "Secondary";
    ButtonStyle[ButtonStyle["Success"] = 3] = "Success";
    ButtonStyle[ButtonStyle["Danger"] = 4] = "Danger";
    ButtonStyle[ButtonStyle["Link"] = 5] = "Link";
})(ButtonStyle || (exports.ButtonStyle = ButtonStyle = {}));
class Button extends Component {
    style;
    label;
    emoji;
    custom_id;
    sku_id;
    url;
    disabled;
    constructor() {
        super(ComponentType.Button);
    }
    setStyle(style) {
        this.style = style;
        return this;
    }
    setLabel(label) {
        this.label = label;
        return this;
    }
    setEmoji(emoji) {
        this.emoji = emoji;
        return this;
    }
    setCustomId(customId) {
        this.custom_id = customId;
        return this;
    }
    setSkuId(skuId) {
        this.sku_id = skuId;
        return this;
    }
    setUrl(url) {
        this.url = url;
        return this;
    }
    setDisabled(disabled) {
        this.disabled = disabled;
        return this;
    }
    build() {
        return {
            type: this.type,
            label: this.label,
            style: this.style,
            custom_id: this.custom_id,
            url: this.url,
            disabled: this.disabled
        };
    }
}
exports.Button = Button;
class SelectOption {
    label;
    value;
    description;
    emoji;
    default;
    constructor() { }
    setLabel(label) {
        this.label = label;
        return this;
    }
    setValue(value) {
        this.value = value;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    setEmoji(emoji) {
        this.emoji = emoji;
        return this;
    }
    setDefault(defaultValue) {
        this.default = defaultValue;
        return this;
    }
    build() {
        return {
            label: this.label,
            value: this.value,
            description: this.description,
            emoji: this.emoji,
            default: this.default
        };
    }
}
exports.SelectOption = SelectOption;
class StringSelect extends Component {
    custom_id;
    options = [];
    placeholder;
    min_values;
    max_values;
    disabled;
    constructor() {
        super(ComponentType.StringSelect);
    }
    setCustomId(customId) {
        this.custom_id = customId;
        return this;
    }
    addOptions(...options) {
        for (const option of options) {
            if (this.options.length >= 25) {
                throw new Error("Cannot add more than 25 options to select component.");
            }
            this.options.push(option);
        }
        return this;
    }
    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        return this;
    }
    setMinValues(minValues) {
        this.min_values = minValues;
        return this;
    }
    setMaxValues(maxValues) {
        this.max_values = maxValues;
        return this;
    }
    setDisabled(disabled) {
        this.disabled = disabled;
        return this;
    }
    build() {
        return {
            type: this.type,
            custom_id: this.custom_id,
            options: this.options.map(option => option.build())
        };
    }
}
exports.StringSelect = StringSelect;
var TextInputStyle;
(function (TextInputStyle) {
    TextInputStyle[TextInputStyle["Short"] = 1] = "Short";
    TextInputStyle[TextInputStyle["Paragraph"] = 2] = "Paragraph";
})(TextInputStyle || (exports.TextInputStyle = TextInputStyle = {}));
class TextInput extends Component {
    custom_id;
    style;
    label;
    min_length;
    max_length;
    required;
    value;
    placeholder;
    constructor() {
        super(ComponentType.TextInput);
    }
    setCustomId(customId) {
        this.custom_id = customId;
        return this;
    }
    setStyle(style) {
        this.style = style;
        return this;
    }
    setLabel(label) {
        this.label = label;
        return this;
    }
    setMinLength(minLength) {
        this.min_length = minLength;
        return this;
    }
    setMaxLength(maxLength) {
        this.max_length = maxLength;
        return this;
    }
    setRequired(required) {
        this.required = required;
        return this;
    }
    setValue(value) {
        this.value = value;
        return this;
    }
    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        return this;
    }
    build() {
        return {
            type: this.type,
            custom_id: this.custom_id,
            style: this.style,
            label: this.label,
            min_length: this.min_length,
            max_length: this.max_length,
            required: this.required,
            value: this.value,
            placeholder: this.placeholder
        };
    }
}
exports.TextInput = TextInput;
class SelectDefaultValue {
    id;
    type;
}
exports.SelectDefaultValue = SelectDefaultValue;
class UserSelect extends Component {
    custom_id;
    placeholder;
    default_values;
    min_values = 1;
    max_values = 1;
    disabled;
    constructor() {
        super(ComponentType.UserSelect);
    }
    setCustomId(customId) {
        this.custom_id = customId;
        return this;
    }
    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        return this;
    }
    setDefaultValues(...defaultValues) {
        for (const defaultValue of defaultValues) {
            if (!this.max_values && this.default_values.length >= 25) {
                throw new Error("Cannot add more than 25 default values to select component.");
            }
            if (this.max_values && this.default_values.length >= this.max_values) {
                throw new Error("Cannot add more than max values to select component.");
            }
            this.default_values.push(defaultValue);
        }
        return this;
    }
    setMinValues(minValues) {
        if (this.max_values && minValues > this.max_values) {
            throw new Error("Min values cannot be more than max values.");
        }
        if (minValues < 0) {
            throw new Error("Min values cannot be less than 0.");
        }
        if (minValues > 25) {
            throw new Error("Min values cannot be more than 25.");
        }
        this.min_values = minValues;
        return this;
    }
    setMaxValues(maxValues) {
        if (this.min_values && maxValues < this.min_values) {
            throw new Error("Max values cannot be less than min values.");
        }
        if (maxValues > 25) {
            throw new Error("Max values cannot be more than 25.");
        }
        this.max_values = maxValues;
        return this;
    }
    setDisabled(disabled) {
        this.disabled = disabled;
        return this;
    }
    build() {
        return {
            type: this.type,
            custom_id: this.custom_id,
            placeholder: this.placeholder,
            default_values: this.default_values.map(defaultValue => ({
                id: defaultValue.id,
                type: defaultValue.type
            })),
            min_values: this.min_values,
            max_values: this.max_values,
            disabled: this.disabled
        };
    }
}
exports.UserSelect = UserSelect;
class RoleSelect extends Component {
    custom_id;
    placeholder;
    default_values;
    min_values = 1;
    max_values = 1;
    disabled;
    constructor() {
        super(ComponentType.RoleSelect);
    }
    setCustomId(customId) {
        this.custom_id = customId;
        return this;
    }
    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        return this;
    }
    setDefaultValues(...defaultValues) {
        for (const defaultValue of defaultValues) {
            if (!this.max_values && this.default_values.length >= 25) {
                throw new Error("Cannot add more than 25 default values to select component.");
            }
            if (this.max_values && this.default_values.length >= this.max_values) {
                throw new Error("Cannot add more than max values to select component.");
            }
            this.default_values.push(defaultValue);
        }
        return this;
    }
    setMinValues(minValues) {
        if (this.max_values && minValues > this.max_values) {
            throw new Error("Min values cannot be more than max values.");
        }
        if (minValues < 0) {
            throw new Error("Min values cannot be less than 0.");
        }
        if (minValues > 25) {
            throw new Error("Min values cannot be more than 25.");
        }
        this.min_values = minValues;
        return this;
    }
    setMaxValues(maxValues) {
        if (this.min_values && maxValues < this.min_values) {
            throw new Error("Max values cannot be less than min values.");
        }
        if (maxValues > 25) {
            throw new Error("Max values cannot be more than 25.");
        }
        this.max_values = maxValues;
        return this;
    }
    setDisabled(disabled) {
        this.disabled = disabled;
        return this;
    }
    build() {
        return {
            type: this.type,
            custom_id: this.custom_id,
            placeholder: this.placeholder,
            default_values: this.default_values.map(defaultValue => ({
                id: defaultValue.id,
                type: defaultValue.type
            })),
            min_values: this.min_values,
            max_values: this.max_values,
            disabled: this.disabled
        };
    }
}
exports.RoleSelect = RoleSelect;
class MentionableSelect extends Component {
    custom_id;
    placeholder;
    default_values;
    min_values = 1;
    max_values = 1;
    disabled;
    constructor() {
        super(ComponentType.MentionableSelect);
    }
    setCustomId(customId) {
        this.custom_id = customId;
        return this;
    }
    setPlaceholder(placeholder) {
        this.placeholder = placeholder;
        return this;
    }
    setDefaultValues(...defaultValues) {
        for (const defaultValue of defaultValues) {
            if (!this.max_values && this.default_values.length >= 25) {
                throw new Error("Cannot add more than 25 default values to select component.");
            }
            if (this.max_values && this.default_values.length >= this.max_values) {
                throw new Error("Cannot add more than max values to select component.");
            }
            this.default_values.push(defaultValue);
        }
        return this;
    }
    setMinValues(minValues) {
        if (this.max_values && minValues > this.max_values) {
            throw new Error("Min values cannot be more than max values.");
        }
        if (minValues < 0) {
            throw new Error("Min values cannot be less than 0.");
        }
        if (minValues > 25) {
            throw new Error("Min values cannot be more than 25.");
        }
        this.min_values = minValues;
        return this;
    }
    setMaxValues(maxValues) {
        if (this.min_values && maxValues < this.min_values) {
            throw new Error("Max values cannot be less than min values.");
        }
        if (maxValues > 25) {
            throw new Error("Max values cannot be more than 25.");
        }
        this.max_values = maxValues;
        return this;
    }
    setDisabled(disabled) {
        this.disabled = disabled;
        return this;
    }
    build() {
        return {
            type: this.type,
            custom_id: this.custom_id,
            placeholder: this.placeholder,
            default_values: this.default_values.map(defaultValue => ({
                id: defaultValue.id,
                type: defaultValue.type
            })),
            min_values: this.min_values,
            max_values: this.max_values,
            disabled: this.disabled
        };
    }
}
exports.MentionableSelect = MentionableSelect;
class ChannelSelect extends Component {
    custom_id;
    placeholder = '';
    channel_types = [];
    default_values = [];
    min_values = 1;
    max_values = 1;
    disabled = false;
    constructor() {
        super(ComponentType.ChannelSelect);
    }
    setCustomId(customId) {
        this.custom_id = customId;
        return this;
    }
    setPlaceholder(placeholder) {
        if (placeholder.length > 100) {
            throw new Error("Placeholder cannot be more than 100 characters.");
        }
        this.placeholder = placeholder;
        return this;
    }
    setChannelTypes(...channelTypes) {
        this.channel_types = channelTypes;
        return this;
    }
    setDefaultValues(...defaultValues) {
        for (const defaultValue of defaultValues) {
            if (!this.max_values && this.default_values.length >= 25) {
                throw new Error("Cannot add more than 25 default values to select component.");
            }
            if (this.max_values && this.default_values.length >= this.max_values) {
                throw new Error("Cannot add more than max values to select component.");
            }
            this.default_values.push(defaultValue);
        }
        return this;
    }
    setMinValues(minValues) {
        if (this.max_values && minValues > this.max_values) {
            throw new Error("Min values cannot be more than max values.");
        }
        if (minValues < 0) {
            throw new Error("Min values cannot be less than 0.");
        }
        if (minValues > 25) {
            throw new Error("Min values cannot be more than 25.");
        }
        this.min_values = minValues;
        return this;
    }
    setMaxValues(maxValues) {
        if (this.min_values && maxValues < this.min_values) {
            throw new Error("Max values cannot be less than min values.");
        }
        if (maxValues > 25) {
            throw new Error("Max values cannot be more than 25.");
        }
        this.max_values = maxValues;
        return this;
    }
    setDisabled(disabled) {
        this.disabled = disabled;
        return this;
    }
    build() {
        return {
            type: this.type,
            custom_id: this.custom_id,
            placeholder: this.placeholder,
            channel_types: this.channel_types,
            default_values: this.default_values.map(defaultValue => ({
                id: defaultValue.id,
                type: defaultValue.type
            })),
            min_values: this.min_values,
            max_values: this.max_values,
            disabled: this.disabled
        };
    }
}
exports.ChannelSelect = ChannelSelect;
class Section extends Component {
    components = [];
    accessory;
    constructor() {
        super(ComponentType.Section);
    }
    addComponents(...components) {
        for (const component of components) {
            if (component.type != ComponentType.TextDisplay) {
                throw new Error("Section can only contain text display components.");
            }
            if (this.components.length >= 3) {
                throw new Error("Cannot add more than 3 components to section.");
            }
            this.components.push(component);
        }
        return this;
    }
    setAccessory(component) {
        if (component.type != ComponentType.Thumbnail && component.type != ComponentType.Button) {
            throw new Error("Accessory can only be a button or a thumbnail.");
        }
        this.accessory = component;
        return this;
    }
    build() {
        if (!this.accessory) {
            throw new Error("Accessory is required for section.");
        }
        console.log({
            type: this.type,
            components: this.components.map(component => component.build()),
            accessory: this.accessory.build()
        });
        return {
            type: this.type,
            components: this.components.map(component => component.build()),
            accessory: this.accessory.build()
        };
    }
}
exports.Section = Section;
class TextDisplay extends Component {
    content;
    constructor() {
        super(ComponentType.TextDisplay);
    }
    setContent(content) {
        this.content = content;
        return this;
    }
    build() {
        return {
            type: this.type,
            content: this.content
        };
    }
}
exports.TextDisplay = TextDisplay;
class Thumbnail extends Component {
    media;
    description;
    spoiler;
    constructor() {
        super(ComponentType.Thumbnail);
    }
    setMedia(media) {
        this.media = media;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    setSpoiler(spoiler) {
        this.spoiler = spoiler;
        return this;
    }
    build() {
        if (!this.media) {
            throw new Error("Media is required for thumbnail.");
        }
        return {
            type: this.type,
            media: this.media,
            description: this.description,
            spoiler: this.spoiler
        };
    }
}
exports.Thumbnail = Thumbnail;
class MediaGalleryItem {
    media;
    description;
    spoiler;
    constructor() { }
    setURL(url) {
        if (!this.media) {
            this.media = {
                url
            };
        }
        else {
            this.media.url = url;
        }
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    setSpoiler(spoiler) {
        this.spoiler = spoiler;
        return this;
    }
    build() {
        if (!this.media) {
            throw new Error("Media is required for media gallery item.");
        }
        return {
            media: this.media,
            description: this.description,
            spoiler: this.spoiler
        };
    }
}
exports.MediaGalleryItem = MediaGalleryItem;
class MediaGallery extends Component {
    items = [];
    constructor() {
        super(ComponentType.MediaGallery);
    }
    addItems(...items) {
        for (const item of items) {
            if (this.items.length >= 10) {
                throw new Error("Cannot add more than 10 items to media gallery.");
            }
            this.items.push(item);
        }
        return this;
    }
    build() {
        return {
            type: this.type,
            items: this.items.map(item => item.build())
        };
    }
}
exports.MediaGallery = MediaGallery;
class File extends Component {
    file = null;
    spoiler = false;
    constructor() {
        super(ComponentType.File);
    }
    setFile(file) {
        this.file = file;
        return this;
    }
    setSpoiler(spoiler) {
        this.spoiler = spoiler;
        return this;
    }
    build() {
        if (!this.file) {
            throw new Error("File is required for file component.");
        }
        if (!this.file.url.startsWith('attachment://')) {
            throw new Error("File url must match the syntax attachment://<filename>");
        }
        return {
            type: this.type,
            file: this.file,
            spoiler: this.spoiler
        };
    }
}
exports.File = File;
class Separator extends Component {
    divider = true;
    spacing = 1;
    constructor() {
        super(ComponentType.Separator);
    }
    setDivider(divider) {
        this.divider = divider;
        return this;
    }
    setSpacing(spacing) {
        if (spacing < 1 || spacing > 2) {
            throw new Error("Spacing must be between 1 and 2.");
        }
        this.spacing = spacing;
        return this;
    }
    build() {
        return {
            type: this.type,
            divider: this.divider,
            spacing: this.spacing
        };
    }
}
exports.Separator = Separator;
class Container extends Component {
    components = [];
    accent_color;
    spoiler = false;
    constructor() {
        super(ComponentType.Container);
    }
    addComponents(...components) {
        for (const component of components) {
            if (![ComponentType.ActionRow, ComponentType.TextDisplay, ComponentType.Section, ComponentType.MediaGallery, ComponentType.Separator, ComponentType.File].includes(component.type)) {
                throw new Error("Container can only contain action rows, text display, section, media gallery, separator or file components.");
            }
            this.components.push(component);
        }
        return this;
    }
    setAccentColor(color) {
        this.accent_color = color;
        return this;
    }
    setSpoiler(spoiler) {
        this.spoiler = spoiler;
        return this;
    }
    build() {
        return {
            type: this.type,
            components: this.components.map(component => component.build()),
            accent_color: this.accent_color,
            spoiler: this.spoiler
        };
    }
}
exports.Container = Container;
