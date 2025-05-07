export enum ComponentType {
    ActionRow = 1,
    Button,
    StringSelect,
    TextInput,
    UserSelect,
    RoleSelect,
    MentionableSelect,
    ChannelSelect,
    Section,
    TextDisplay,
    Thumbnail,
    MediaGallery,
    File,
    Separator,
    Container = 17
}

export enum ComponentOfLayoutType {
    ActionRow = 1,
    Section = 9,
    Separator = 14,
    Container = 17
}

export enum ComponentOfInteractiveType {
    Button = 2,
    StringSelect = 3,
    TextInput = 4,
    UserSelect = 5,
    RoleSelect = 6,
    MentionableSelect = 7,
    ChannelSelect = 8
}

export enum ComponentOfContentType {
    TextDisplay = 10,
    Thumbnail = 11,
    MediaGallery = 12,
    File = 13
}

export abstract class Component {
    type: ComponentType;
    id?: number;

    constructor(type: ComponentType) {
        this.type = type;
    }

    build(): {
        [key: string]: any;
    } {
        return {};
    }
}

export class ActionRow extends Component {
    components: Component[] = [];

    constructor() {
        super(ComponentType.ActionRow);
    }

    addComponents(...components: Component[]) {
        for (const component of components) {
            if(
                [ComponentType.RoleSelect, ComponentType.UserSelect, ComponentType.MentionableSelect, ComponentType.ChannelSelect].includes(component.type) &&
                component.type == ComponentType.Button
            ) {
                throw new Error("Only buttons or a single select component can be added to action row.");
            }

            if(this.components.find(a => a.type == ComponentType.TextInput) && component.type == ComponentType.TextInput) {
                throw new Error("Cannot add more than one text input component to action row.");
            }

            if([ComponentType.RoleSelect, ComponentType.UserSelect, ComponentType.MentionableSelect, ComponentType.ChannelSelect].includes(component.type)
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

export enum ButtonStyle {
    Primary = 1,
    Secondary,
    Success,
    Danger,
    Link
}

export type PartialEmoji = {
    id?: string;
    name?: string;
    roles?: string[];
    user?: string;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
}

export class Button extends Component {
    style: ButtonStyle;
    label?: string;
    emoji?: PartialEmoji;
    custom_id: string;
    sku_id?: string;
    url?: string;
    disabled?: boolean;

    constructor() {
        super(ComponentType.Button);
    }

    setStyle(style: ButtonStyle) {
        this.style = style;
        return this;
    }

    setLabel(label: string) {
        this.label = label;
        return this;
    }

    setEmoji(emoji: PartialEmoji) {
        this.emoji = emoji;
        return this;
    }

    setCustomId(customId: string) {
        this.custom_id = customId;
        return this;
    }

    setSkuId(skuId: string) {
        this.sku_id = skuId;
        return this;
    }

    setUrl(url: string) {
        this.url = url;
        return this;
    }

    setDisabled(disabled: boolean) {
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

export class SelectOption {
    label: string;
    value: string;
    description?: string;
    emoji?: PartialEmoji;
    default?: boolean;

    constructor() {}

    setLabel(label: string) {
        this.label = label;
        return this;
    }

    setValue(value: string) {
        this.value = value;
        return this;
    }

    setDescription(description: string) {
        this.description = description;
        return this;
    }

    setEmoji(emoji: PartialEmoji) {
        this.emoji = emoji;
        return this;
    }

    setDefault(defaultValue: boolean) {
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

export class StringSelect extends Component {
    custom_id: string;
    options: SelectOption[] = [];
    placeholder?: string;
    min_values?: number;
    max_values?: number;
    disabled?: boolean;

    constructor() {
        super(ComponentType.StringSelect);
    }

    setCustomId(customId: string) {
        this.custom_id = customId;
        return this;
    }

    addOptions(...options: SelectOption[]) {
        for (const option of options) {
            if(this.options.length >= 25) {
                throw new Error("Cannot add more than 25 options to select component.");
            }
            this.options.push(option);
        }
        return this;
    }

    setPlaceholder(placeholder: string) {
        this.placeholder = placeholder;
        return this;
    }

    setMinValues(minValues: number) {
        this.min_values = minValues;
        return this;
    }

    setMaxValues(maxValues: number) {
        this.max_values = maxValues;
        return this;
    }

    setDisabled(disabled: boolean) {
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

export enum TextInputStyle {
    Short = 1,
    Paragraph = 2
}

export class TextInput extends Component {
    custom_id: string;
    style: TextInputStyle;
    label: string;
    min_length?: number;
    max_length?: number;
    required?: boolean;
    value?: string;
    placeholder?: string;

    constructor() {
        super(ComponentType.TextInput);
    }

    setCustomId(customId: string) {
        this.custom_id = customId;
        return this;
    }

    setStyle(style: TextInputStyle) {
        this.style = style;
        return this;
    }

    setLabel(label: string) {
        this.label = label;
        return this;
    }

    setMinLength(minLength: number) {
        this.min_length = minLength;
        return this;
    }

    setMaxLength(maxLength: number) {
        this.max_length = maxLength;
        return this;
    }

    setRequired(required: boolean) {
        this.required = required;
        return this;
    }

    setValue(value: string) {
        this.value = value;
        return this;
    }

    setPlaceholder(placeholder: string) {
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

export class SelectDefaultValue {
    id: string;
    type: "user" | "role" | "channel";
}

export class UserSelect extends Component {
    custom_id: string;
    placeholder?: string;
    default_values?: SelectDefaultValue[];
    min_values?: number = 1;
    max_values?: number = 1;
    disabled?: boolean;

    constructor() {
        super(ComponentType.UserSelect);
    }

    setCustomId(customId: string) {
        this.custom_id = customId;
        return this;
    }

    setPlaceholder(placeholder: string) {
        this.placeholder = placeholder;
        return this;
    }

    setDefaultValues(...defaultValues: SelectDefaultValue[]) {
        for (const defaultValue of defaultValues) {
            if(!this.max_values && this.default_values.length >= 25) {
                throw new Error("Cannot add more than 25 default values to select component.");
            }
            if(this.max_values && this.default_values.length >= this.max_values) {
                throw new Error("Cannot add more than max values to select component.");
            }
            this.default_values.push(defaultValue);
        }
        return this;
    }

    setMinValues(minValues: number) {
        if(this.max_values && minValues > this.max_values) {
            throw new Error("Min values cannot be more than max values.");
        }
        if(minValues < 0) {
            throw new Error("Min values cannot be less than 0.");
        }
        if(minValues > 25) {
            throw new Error("Min values cannot be more than 25.");
        }
        this.min_values = minValues;
        return this;
    }

    setMaxValues(maxValues: number) {
        if(this.min_values && maxValues < this.min_values) {
            throw new Error("Max values cannot be less than min values.");
        }
        if(maxValues > 25) {
            throw new Error("Max values cannot be more than 25.");
        }
        this.max_values = maxValues;
        return this;
    }

    setDisabled(disabled: boolean) {
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

export class RoleSelect extends Component {
    custom_id: string;
    placeholder?: string;
    default_values?: SelectDefaultValue[];
    min_values?: number = 1;
    max_values?: number = 1;
    disabled?: boolean;

    constructor() {
        super(ComponentType.RoleSelect);
    }

    setCustomId(customId: string) {
        this.custom_id = customId;
        return this;
    }

    setPlaceholder(placeholder: string) {
        this.placeholder = placeholder;
        return this;
    }

    setDefaultValues(...defaultValues: SelectDefaultValue[]) {
        for (const defaultValue of defaultValues) {
            if(!this.max_values && this.default_values.length >= 25) {
                throw new Error("Cannot add more than 25 default values to select component.");
            }
            if(this.max_values && this.default_values.length >= this.max_values) {
                throw new Error("Cannot add more than max values to select component.");
            }
            this.default_values.push(defaultValue);
        }
        return this;
    }

    setMinValues(minValues: number) {
        if(this.max_values && minValues > this.max_values) {
            throw new Error("Min values cannot be more than max values.");
        }
        if(minValues < 0) {
            throw new Error("Min values cannot be less than 0.");
        }
        if(minValues > 25) {
            throw new Error("Min values cannot be more than 25.");
        }
        this.min_values = minValues;
        return this;
    }

    setMaxValues(maxValues: number) {
        if(this.min_values && maxValues < this.min_values) {
            throw new Error("Max values cannot be less than min values.");
        }
        if(maxValues > 25) {
            throw new Error("Max values cannot be more than 25.");
        }
        this.max_values = maxValues;
        return this;
    }

    setDisabled(disabled: boolean) {
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

export class MentionableSelect extends Component {
    custom_id: string;
    placeholder?: string;
    default_values?: SelectDefaultValue[];
    min_values?: number = 1;
    max_values?: number = 1;
    disabled?: boolean;

    constructor() {
        super(ComponentType.MentionableSelect);
    }

    setCustomId(customId: string) {
        this.custom_id = customId;
        return this;
    }

    setPlaceholder(placeholder: string) {
        this.placeholder = placeholder;
        return this;
    }

    setDefaultValues(...defaultValues: SelectDefaultValue[]) {
        for (const defaultValue of defaultValues) {
            if(!this.max_values && this.default_values.length >= 25) {
                throw new Error("Cannot add more than 25 default values to select component.");
            }
            if(this.max_values && this.default_values.length >= this.max_values) {
                throw new Error("Cannot add more than max values to select component.");
            }
            this.default_values.push(defaultValue);
        }
        return this;
    }

    setMinValues(minValues: number) {
        if(this.max_values && minValues > this.max_values) {
            throw new Error("Min values cannot be more than max values.");
        }
        if(minValues < 0) {
            throw new Error("Min values cannot be less than 0.");
        }
        if(minValues > 25) {
            throw new Error("Min values cannot be more than 25.");
        }
        this.min_values = minValues;
        return this;
    }

    setMaxValues(maxValues: number) {
        if(this.min_values && maxValues < this.min_values) {
            throw new Error("Max values cannot be less than min values.");
        }
        if(maxValues > 25) {
            throw new Error("Max values cannot be more than 25.");
        }
        this.max_values = maxValues;
        return this;
    }

    setDisabled(disabled: boolean) {
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
        }
    }
}

export class ChannelSelect extends Component {
    custom_id: string;
    placeholder?: string = '';
    channel_types?: number[] = [];
    default_values?: SelectDefaultValue[] = [];
    min_values?: number = 1;
    max_values?: number = 1;
    disabled?: boolean = false;

    constructor() {
        super(ComponentType.ChannelSelect);
    }

    setCustomId(customId: string) {
        this.custom_id = customId;
        return this;
    }

    setPlaceholder(placeholder: string) {
        if(placeholder.length > 100) {
            throw new Error("Placeholder cannot be more than 100 characters.");
        }
        this.placeholder = placeholder;
        return this;
    }

    setChannelTypes(...channelTypes: number[]) {
        this.channel_types = channelTypes;
        return this;
    }

    setDefaultValues(...defaultValues: SelectDefaultValue[]) {
        for (const defaultValue of defaultValues) {
            if(!this.max_values && this.default_values.length >= 25) {
                throw new Error("Cannot add more than 25 default values to select component.");
            }
            if(this.max_values && this.default_values.length >= this.max_values) {
                throw new Error("Cannot add more than max values to select component.");
            }
            this.default_values.push(defaultValue);
        }
        return this;
    }

    setMinValues(minValues: number) {
        if(this.max_values && minValues > this.max_values) {
            throw new Error("Min values cannot be more than max values.");
        }
        if(minValues < 0) {
            throw new Error("Min values cannot be less than 0.");
        }
        if(minValues > 25) {
            throw new Error("Min values cannot be more than 25.");
        }
        this.min_values = minValues;
        return this;
    }

    setMaxValues(maxValues: number) {
        if(this.min_values && maxValues < this.min_values) {
            throw new Error("Max values cannot be less than min values.");
        }
        if(maxValues > 25) {
            throw new Error("Max values cannot be more than 25.");
        }
        this.max_values = maxValues;
        return this;
    }

    setDisabled(disabled: boolean) {
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
        }
    }
}

export class Section extends Component {
    components: Component[] = [];
    accessory: Component;

    constructor() {
        super(ComponentType.Section);
    }

    addComponents(...components: Component[]) {
        for (const component of components) {
            if(component.type != ComponentType.TextDisplay) {
                throw new Error("Section can only contain text display components.");
            }
            if(this.components.length >= 3) {
                throw new Error("Cannot add more than 3 components to section.");
            }
            this.components.push(component);
        }
        return this;
    }

    setAccessory(component: Component) {
        if(component.type != ComponentType.Thumbnail && component.type != ComponentType.Button) {
            throw new Error("Accessory can only be a button or a thumbnail.");
        }
        this.accessory = component;
        return this;
    }

    build() {
        if(!this.accessory) {
            throw new Error("Accessory is required for section.");
        }
        console.log({
            type: this.type,
            components: this.components.map(component => component.build()),
            accessory: this.accessory.build()
        })
        return {
            type: this.type,
            components: this.components.map(component => component.build()),
            accessory: this.accessory.build()
        };
    }
}

export class TextDisplay extends Component {
    content: string;

    constructor() {
        super(ComponentType.TextDisplay);
    }

    setContent(content: string) {
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

export class Thumbnail extends Component {
    media: {
        url: string;
        proxy_url?: string;
        height?: number;
        width?: number;
        content_type?: string;
    };
    description?: string;
    spoiler?: boolean;

    constructor() {
        super(ComponentType.Thumbnail);
    }

    setMedia(media: {
        url: string;
        proxy_url?: string;
        height?: number;
        width?: number;
        content_type?: string;
    }) {
        this.media = media;
        return this;
    }

    setDescription(description: string) {
        this.description = description;
        return this;
    }

    setSpoiler(spoiler: boolean) {
        this.spoiler = spoiler;
        return this;
    }

    build() {
        if(!this.media) {
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

export class MediaGalleryItem {
    media: {
        url: string;
        proxy_url?: string;
        height?: number;
        width?: number;
        content_type?: string;
    };
    description?: string;
    spoiler?: boolean;

    constructor() {}

    setURL(url: string) {
        if(!this.media) {
            this.media = {
                url
            };
        } else {
            this.media.url = url;
        }
        return this;
    }

    setDescription(description: string) {
        this.description = description;
        return this;
    }

    setSpoiler(spoiler: boolean) {
        this.spoiler = spoiler;
        return this;
    }

    build() {
        if(!this.media) {
            throw new Error("Media is required for media gallery item.");
        }
        return {
            media: this.media,
            description: this.description,
            spoiler: this.spoiler
        };
    }

}

export class MediaGallery extends Component {
    items: MediaGalleryItem[] = [];

    constructor() {
        super(ComponentType.MediaGallery);
    }

    addItems(...items: MediaGalleryItem[]) {
        for (const item of items) {
            if(this.items.length >= 10) {
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

export class File extends Component {
    file: {
        url: string;
        proxy_url?: string;
        width?: number;
        height?: number;
        content_type?: string;
    } = null;
    spoiler?: boolean = false;

    constructor() {
        super(ComponentType.File);
    }

    setFile(file: {
        url: string;
        proxy_url?: string;
        width?: number;
        height?: number;
        content_type?: string;
    }) {
        this.file = file;
        return this;
    }

    setSpoiler(spoiler: boolean) {
        this.spoiler = spoiler;
        return this;
    }

    build() {
        if(!this.file) {
            throw new Error("File is required for file component.");
        }
        if(!this.file.url.startsWith('attachment://')) {
            throw new Error("File url must match the syntax attachment://<filename>");
        }
        return {
            type: this.type,
            file: this.file,
            spoiler: this.spoiler
        };
    }
}

export class Separator extends Component {
    divider?: boolean = true;
    spacing?: number = 1;

    constructor() {
        super(ComponentType.Separator);
    }

    setDivider(divider: boolean) {
        this.divider = divider;
        return this;
    }

    setSpacing(spacing: number) {
        if(spacing < 1 || spacing > 2) {
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

export class Container extends Component {
    components: Component[] = [];
    accent_color?: number;
    spoiler?: boolean = false;

    constructor() {
        super(ComponentType.Container);
    }

    addComponents(...components: Component[]) {
        for (const component of components) {
            if(![ComponentType.ActionRow, ComponentType.TextDisplay, ComponentType.Section, ComponentType.MediaGallery, ComponentType.Separator, ComponentType.File].includes(component.type)) {
                throw new Error("Container can only contain action rows, text display, section, media gallery, separator or file components.");
            }
            this.components.push(component);
        }
        return this;
    }

    setAccentColor(color: number) {
        this.accent_color = color;
        return this;
    }

    setSpoiler(spoiler: boolean) {
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