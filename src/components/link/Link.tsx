import { usePageContext } from "vike-react/usePageContext";

export { Link };

interface ILinkProps {
    className?: string;
    to: string;
    children: any;
}

function Link(props: ILinkProps) {
    const pageContext = usePageContext();
    const { urlPathname } = pageContext;
    const { to, children } = props;
    const isActive = to === "/" ? urlPathname === to : urlPathname.startsWith(to);
    const className = [props.className, isActive && "is-active"].filter(Boolean).join(" ");
    
    return (
        <a {...props} className={className}>
            {children}
        </a>
    );
}
