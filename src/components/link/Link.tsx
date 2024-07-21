import { usePageContext } from "vike-react/usePageContext";

interface ILinkProps {
    className?: string;
    href: string;
    children: any;
}

export function Link(props: ILinkProps) {
    const pageContext = usePageContext();
    const { urlPathname } = pageContext;
    const { href, children } = props;
    const isActive = href === "/" ? urlPathname === href : urlPathname.startsWith(href);
    const className = [props.className, isActive && "is-active"].filter(Boolean).join(" ");

    return (
        <a {...props} className={className}>
            {children}
        </a>
    );
}
