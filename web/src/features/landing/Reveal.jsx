import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/cn";

/** Fades and lifts its children in once, the first time they scroll into view. */
const Reveal = ({
  as: Tag = "div",
  delay = 0,
  margin = "-60px",
  className,
  style,
  children,
  ...rest
}) => {
  const [ref, seen] = useInView(margin);
  return (
    <Tag
      ref={ref}
      data-seen={seen}
      className={cn("lp-reveal", className)}
      style={{ "--d": `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
