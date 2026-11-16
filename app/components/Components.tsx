import {
    useId,
    type ButtonHTMLAttributes,
    type InputHTMLAttributes,
    type ReactNode,
    type SelectHTMLAttributes,
    type TextareaHTMLAttributes,
} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./component-styles/components.css";

const cx = (...parts: Array<string | false | null | undefined>) =>
    parts.filter(Boolean).join(" ");

/* ============================================================
   Layout
   ============================================================ */

/** Full-page wrapper with the mint background and decorative circles. */
export function Page({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cx("ui-page", className)}>{children}</div>;
}

/** Centered readable column. Use inside <Page>. */
export function Container({
    children,
    narrow,
    className,
}: {
    children: ReactNode;
    narrow?: boolean;
    className?: string;
}) {
    return <div className={cx("ui-container", narrow && "ui-container--narrow", className)}>{children}</div>;
}

/** Vertical or horizontal spacing between children. */
export function Stack({
    children,
    row,
    gap = "md",
    className,
}: {
    children: ReactNode;
    row?: boolean;
    gap?: "sm" | "md" | "lg";
    className?: string;
}) {
    return <div className={cx("ui-stack", row && "ui-stack--row", `ui-stack--${gap}`, className)}>{children}</div>;
}

export function Divider() {
    return <hr className="ui-divider" />;
}

/* ============================================================
   Typography
   ============================================================ */

export function Title({ children, className }: { children: ReactNode; className?: string }) {
    return <h1 className={cx("ui-title", className)}>{children}</h1>;
}

export function Subtitle({ children, className }: { children: ReactNode; className?: string }) {
    return <h2 className={cx("ui-subtitle", className)}>{children}</h2>;
}

export function Heading({ children, className }: { children: ReactNode; className?: string }) {
    return <h3 className={cx("ui-heading", className)}>{children}</h3>;
}

export function Text({
    children,
    muted,
    small,
    className,
}: {
    children: ReactNode;
    muted?: boolean;
    small?: boolean;
    className?: string;
}) {
    return <p className={cx("ui-text", muted && "ui-text--muted", small && "ui-text--small", className)}>{children}</p>;
}

/** A description in a white, outlined card. */
export function Description({ children, className }: { children: ReactNode; className?: string }) {
    return <p className={cx("ui-description", className)}>{children}</p>;
}

/* ============================================================
   Buttons
   ============================================================ */

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "accent" | "ghost";
    size?: "sm" | "md" | "lg";
};

export function Button({ variant = "primary", size = "md", className, type = "button", ...rest }: ButtonProps) {
    return <button type={type} className={cx("ui-button", `ui-button--${variant}`, `ui-button--${size}`, className)} {...rest} />;
}

/** Goes back in history, or to `fallback` if the page was opened directly. */
export function BackButton({ children = "Back", fallback = "/" }: { children?: ReactNode; fallback?: string }) {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <button
            type="button"
            className="ui-back"
            onClick={() => (location.key !== "default" ? navigate(-1) : navigate(fallback))}
        >
            {children}
        </button>
    );
}

/* ============================================================
   Form fields
   ============================================================ */

type FieldShellProps = {
    id: string;
    label?: string;
    hint?: string;
    error?: string;
    children: ReactNode;
};

function FieldShell({ id, label, hint, error, children }: FieldShellProps) {
    return (
        <div className="ui-field">
            {label && (
                <label className="ui-label" htmlFor={id}>
                    {label}
                </label>
            )}
            {children}
            {error ? (
                <span className="ui-field-message ui-field-message--error" id={`${id}-msg`}>
                    {error}
                </span>
            ) : (
                hint && (
                    <span className="ui-field-message" id={`${id}-msg`}>
                        {hint}
                    </span>
                )
            )}
        </div>
    );
}

type FieldExtras = { label?: string; hint?: string; error?: string };

export function Input({ label, hint, error, className, id, ...rest }: InputHTMLAttributes<HTMLInputElement> & FieldExtras) {
    const autoId = useId();
    const fieldId = id ?? autoId;
    return (
        <FieldShell id={fieldId} label={label} hint={hint} error={error}>
            <input
                id={fieldId}
                className={cx("ui-input", error && "ui-input--error", className)}
                aria-invalid={!!error || undefined}
                aria-describedby={error || hint ? `${fieldId}-msg` : undefined}
                {...rest}
            />
        </FieldShell>
    );
}

export function TextArea({ label, hint, error, className, id, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement> & FieldExtras) {
    const autoId = useId();
    const fieldId = id ?? autoId;
    return (
        <FieldShell id={fieldId} label={label} hint={hint} error={error}>
            <textarea
                id={fieldId}
                className={cx("ui-input", "ui-textarea", error && "ui-input--error", className)}
                aria-invalid={!!error || undefined}
                aria-describedby={error || hint ? `${fieldId}-msg` : undefined}
                {...rest}
            />
        </FieldShell>
    );
}

export function Select({
    label,
    hint,
    error,
    className,
    id,
    children,
    ...rest
}: SelectHTMLAttributes<HTMLSelectElement> & FieldExtras) {
    const autoId = useId();
    const fieldId = id ?? autoId;
    return (
        <FieldShell id={fieldId} label={label} hint={hint} error={error}>
            <select
                id={fieldId}
                className={cx("ui-input", "ui-select", error && "ui-input--error", className)}
                aria-invalid={!!error || undefined}
                aria-describedby={error || hint ? `${fieldId}-msg` : undefined}
                {...rest}
            >
                {children}
            </select>
        </FieldShell>
    );
}

export function Checkbox({ label, className, id, ...rest }: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string }) {
    const autoId = useId();
    const fieldId = id ?? autoId;
    return (
        <label className={cx("ui-check", className)} htmlFor={fieldId}>
            <input id={fieldId} type="checkbox" className="ui-check-input" {...rest} />
            <span className="ui-check-box" aria-hidden="true" />
            <span>{label}</span>
        </label>
    );
}

export function Switch({ label, className, id, ...rest }: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string }) {
    const autoId = useId();
    const fieldId = id ?? autoId;
    return (
        <label className={cx("ui-switch", className)} htmlFor={fieldId}>
            <input id={fieldId} type="checkbox" role="switch" className="ui-switch-input" {...rest} />
            <span className="ui-switch-track" aria-hidden="true">
                <span className="ui-switch-thumb" />
            </span>
            <span>{label}</span>
        </label>
    );
}

/** Input and button side by side, e.g. a zip code or search form. */
export function InlineForm({
    children,
    onSubmit,
}: {
    children: ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
    return (
        <form className="ui-inline-form" onSubmit={onSubmit}>
            {children}
        </form>
    );
}

/* ============================================================
   Content blocks
   ============================================================ */

export function Card({
    children,
    tone = "paper",
    className,
}: {
    children: ReactNode;
    tone?: "paper" | "cobalt" | "sky" | "lilac" | "mint";
    className?: string;
}) {
    return <div className={cx("ui-card", `ui-card--${tone}`, className)}>{children}</div>;
}

/** A card with a tab-style label on its top edge. */
export function LabeledCard({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
    return (
        <div className={cx("ui-card", "ui-card--cobalt", "ui-card--labeled", className)}>
            <span className="ui-card-label">{label}</span>
            {children}
        </div>
    );
}

export function Badge({
    children,
    tone = "sky",
    tilt,
}: {
    children: ReactNode;
    tone?: "sky" | "tangerine" | "lilac" | "mint" | "paper";
    tilt?: boolean;
}) {
    return <span className={cx("ui-badge", `ui-badge--${tone}`, tilt && "ui-badge--tilt")}>{children}</span>;
}

export function Callout({
    children,
    tone = "info",
    title,
}: {
    children: ReactNode;
    tone?: "info" | "success" | "warning" | "error";
    title?: string;
}) {
    return (
        <div className={cx("ui-callout", `ui-callout--${tone}`)} role={tone === "error" ? "alert" : "status"}>
            {title && <strong className="ui-callout-title">{title}</strong>}
            <div>{children}</div>
        </div>
    );
}

export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
    return (
        <div className="ui-empty">
            <p className="ui-empty-title">{title}</p>
            {children && <p className="ui-text ui-text--muted">{children}</p>}
            {action}
        </div>
    );
}

export function Spinner({ label = "Loading" }: { label?: string }) {
    return <span className="ui-spinner" role="status" aria-label={label} />;
}

/* ============================================================
   Lists
   ============================================================ */

export function List({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cx("ui-list", className)}>{children}</div>;
}

type ListItemProps = {
    children: ReactNode;
    /** Small pill on the right, e.g. a distance. */
    meta?: ReactNode;
    /** Renders as a router link. */
    to?: string | { pathname: string; search?: string };
    /** Renders as a button. */
    onClick?: () => void;
    className?: string;
};

export function ListItem({ children, meta, to, onClick, className }: ListItemProps) {
    const inner = (
        <>
            <span className="ui-list-item-main">{children}</span>
            {meta != null && <span className="ui-list-item-meta">{meta}</span>}
        </>
    );
    const classes = cx("ui-list-item", (to || onClick) && "ui-list-item--interactive", className);

    if (to) {
        return (
            <Link to={to} className={classes}>
                {inner}
            </Link>
        );
    }
    if (onClick) {
        return (
            <button type="button" className={classes} onClick={onClick}>
                {inner}
            </button>
        );
    }
    return <div className={classes}>{inner}</div>;
}

/** Plain bulleted list with colored dots. */
export function BulletList({ items }: { items: ReactNode[] }) {
    return (
        <ul className="ui-bullets">
            {items.map((item, i) => (
                <li key={i}>{item}</li>
            ))}
        </ul>
    );
}