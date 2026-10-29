import { useId } from "react";
import { Link } from "react-router-dom";
import { BRAND } from "@/domain/rubric";
import { cn } from "@/lib/cn";

// Waffle pattern on the beaver's tail: two families of parallel lines,
// computed once at module load instead of hard-coding 26 <line>s.
const GRID_LINES = (() => {
  const cx = 335,
    cy = 690,
    spacing = 76,
    half = 700;
  const lines = [];
  for (const deg of [36, -54]) {
    const a = (deg * Math.PI) / 180;
    const d = [Math.cos(a), Math.sin(a)];
    const n = [-Math.sin(a), Math.cos(a)];
    for (let k = -6; k <= 6; k++) {
      const px = cx + k * spacing * n[0];
      const py = cy + k * spacing * n[1];
      lines.push({
        x1: +(px - half * d[0]).toFixed(1),
        y1: +(py - half * d[1]).toFixed(1),
        x2: +(px + half * d[0]).toFixed(1),
        y2: +(py + half * d[1]).toFixed(1),
      });
    }
  }
  return lines;
})();

export const LogoMark = ({ size = 32, className }) => {
  // Unique per instance so gradient/clip/filter ids never collide when the
  // logo is rendered more than once on a page (navbar + footer, etc.).
  const uid = useId().replace(/:/g, "");
  const i = (name) => `${uid}-${name}`;
  const u = (name) => `url(#${uid}-${name})`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="230 245 790 790"
      aria-hidden
      className={cn("u-color-var-accent", className)}
    >
      <defs>
        <radialGradient
          id={i("bodyG")}
          cx={650}
          cy={690}
          r={340}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#13123b" />
          <stop offset="0.55" stopColor="#201e66" />
          <stop offset="1" stopColor="#3b38ad" />
        </radialGradient>
        <linearGradient
          id={i("bodyTop")}
          x1={0}
          y1={330}
          x2={0}
          y2={620}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#4a47c8" stopOpacity={0.55} />
          <stop offset="1" stopColor="#4a47c8" stopOpacity={0} />
        </linearGradient>
        <linearGradient
          id={i("rimG")}
          x1={430}
          y1={0}
          x2={880}
          y2={0}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#8886ff" />
          <stop offset="0.5" stopColor="#5a57e6" />
          <stop offset="1" stopColor="#3a37b4" />
        </linearGradient>
        <linearGradient
          id={i("bottomShade")}
          x1={0}
          y1={780}
          x2={0}
          y2={925}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0c0b2c" stopOpacity={0} />
          <stop offset="1" stopColor="#0c0b2c" stopOpacity={0.6} />
        </linearGradient>
        <clipPath id={i("bodyClip")}>
          <path d="M 725 322 C 738 322 728 346 722 358 C 742 362 762 372 778 386 C 832 422 868 482 868 545 C 868 598 852 636 836 655 C 864 678 872 704 861 732 C 850 768 824 790 810 800 C 816 832 798 880 740 904 C 690 921 620 919 560 905 C 505 910 462 906 441 872 C 414 824 420 742 446 680 C 470 622 476 562 486 520 C 500 440 560 396 622 360 C 664 338 702 324 725 322 Z" />
        </clipPath>
        <filter id={i("blur14")} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={14} />
        </filter>
        <filter id={i("blur6")} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={6} />
        </filter>
        <filter id={i("blur3")} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={3} />
        </filter>
        <linearGradient
          id={i("tailG")}
          x1={290}
          y1={510}
          x2={420}
          y2={880}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#3f3caa" />
          <stop offset="0.5" stopColor="#25236f" />
          <stop offset="1" stopColor="#16144a" />
        </linearGradient>
        <clipPath id={i("tailClip")}>
          <path d="M 335 503 C 272 508 240 560 240 628 C 241 705 292 805 435 880 L 470 705 L 482 610 C 474 545 410 498 335 503 Z" />
        </clipPath>
        <radialGradient
          id={i("earL")}
          cx={500}
          cy={436}
          r={52}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#5a58d6" />
          <stop offset="1" stopColor="#3f3cb0" />
        </radialGradient>
        <radialGradient
          id={i("earR")}
          cx={786}
          cy={388}
          r={36}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#6360e6" />
          <stop offset="1" stopColor="#3a37b4" />
        </radialGradient>
        <linearGradient id={i("eyeG")} x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" stopColor="#f0eeff" />
          <stop offset="1" stopColor="#cfcbfb" />
        </linearGradient>
        <linearGradient id={i("toothG")} x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" stopColor="#f1efff" />
          <stop offset="1" stopColor="#c3befa" />
        </linearGradient>
        <linearGradient id={i("noseG")} x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0" stopColor="#4a47bd" />
          <stop offset="1" stopColor="#2a2873" />
        </linearGradient>
        <linearGradient
          id={i("pawL")}
          x1={0}
          y1={690}
          x2={0}
          y2={790}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#7573fb" />
          <stop offset="1" stopColor="#4a47c4" />
        </linearGradient>
        <linearGradient
          id={i("pawR")}
          x1={0}
          y1={688}
          x2={0}
          y2={782}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#4b48c2" />
          <stop offset="1" stopColor="#201e68" />
        </linearGradient>
        <linearGradient
          id={i("linkG")}
          x1={960}
          y1={620}
          x2={565}
          y2={905}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#7fd2fc" />
          <stop offset="0.5" stopColor="#78a8fe" />
          <stop offset="1" stopColor="#8a7efb" />
        </linearGradient>
        <radialGradient
          id={i("nodeTR")}
          cx={935}
          cy={600}
          r={75}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#92e6fb" />
          <stop offset="1" stopColor="#78c3fb" />
        </radialGradient>
        <radialGradient
          id={i("nodeBR")}
          cx={755}
          cy={855}
          r={80}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#85a4fc" />
          <stop offset="1" stopColor="#7a6ff2" />
        </radialGradient>
        <radialGradient
          id={i("nodeBL")}
          cx={553}
          cy={880}
          r={80}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#a38efb" />
          <stop offset="1" stopColor="#8a72f2" />
        </radialGradient>
      </defs>
      <g id={i("tail")}>
        <path
          d="M 335 503 C 272 508 240 560 240 628 C 241 705 292 805 435 880 L 470 705 L 482 610 C 474 545 410 498 335 503 Z"
          fill={u("tailG")}
        />
        <g clipPath={u("tailClip")}>
          <g
            stroke="#5a56d2"
            strokeOpacity={0.4}
            strokeWidth={11}
            strokeLinecap="round"
          >
            {GRID_LINES.map((l, n) => (
              <line key={n} {...l} />
            ))}
          </g>
          <path
            d="M 335 503 C 272 508 240 560 240 628 C 241 705 292 805 435 880 L 470 705 L 482 610 C 474 545 410 498 335 503 Z"
            fill="none"
            stroke="#7371ff"
            strokeWidth={22}
            opacity={0.75}
            filter={u("blur6")}
          />
        </g>
        <path
          d="M 335 503 C 272 508 240 560 240 628 C 241 705 292 805 435 880"
          fill="none"
          stroke="#6a67f2"
          strokeOpacity={0.5}
          strokeWidth={3}
          strokeLinecap="round"
        />
      </g>
      <g id={i("ear-right")}>
        <circle cx={786} cy={388} r={31} fill={u("earR")} />
        <ellipse
          cx={792}
          cy={392}
          rx={15}
          ry={13}
          fill="#2f2c8f"
          opacity={0.55}
        />
      </g>
      <g id={i("body")}>
        <path
          d="M 725 322 C 738 322 728 346 722 358 C 742 362 762 372 778 386 C 832 422 868 482 868 545 C 868 598 852 636 836 655 C 864 678 872 704 861 732 C 850 768 824 790 810 800 C 816 832 798 880 740 904 C 690 921 620 919 560 905 C 505 910 462 906 441 872 C 414 824 420 742 446 680 C 470 622 476 562 486 520 C 500 440 560 396 622 360 C 664 338 702 324 725 322 Z"
          fill={u("bodyG")}
        />
        <g clipPath={u("bodyClip")}>
          <rect x={400} y={300} width={500} height={340} fill={u("bodyTop")} />
          <rect
            x={400}
            y={780}
            width={500}
            height={160}
            fill={u("bottomShade")}
          />
          <path
            d="M 725 322 C 738 322 728 346 722 358 C 742 362 762 372 778 386 C 832 422 868 482 868 545 C 868 598 852 636 836 655 C 864 678 872 704 861 732 C 850 768 824 790 810 800 C 816 832 798 880 740 904 C 690 921 620 919 560 905 C 505 910 462 906 441 872 C 414 824 420 742 446 680 C 470 622 476 562 486 520 C 500 440 560 396 622 360 C 664 338 702 324 725 322 Z"
            fill="none"
            stroke={u("rimG")}
            strokeWidth={34}
            filter={u("blur14")}
            opacity={0.95}
          />
        </g>
      </g>
      <g id={i("ear-left")}>
        <circle cx={506} cy={440} r={42} fill={u("earL")} />
        <ellipse
          cx={516}
          cy={446}
          rx={22}
          ry={20}
          fill="#2c2a86"
          opacity={0.6}
        />
      </g>
      <g id={i("face")}>
        <ellipse
          cx={672}
          cy={512}
          rx={17}
          ry={26}
          transform="rotate(-8 672 512)"
          fill={u("eyeG")}
        />
        <ellipse
          cx={819}
          cy={493}
          rx={14}
          ry={24}
          transform="rotate(-5 819 493)"
          fill={u("eyeG")}
        />
        <path
          d="M 735 552 H 764 V 600 Q 764 609 755 609 H 744 Q 735 609 735 600 Z"
          fill={u("toothG")}
        />
        <path
          d="M 767 550 H 792 V 598 Q 792 608 783 608 H 776 Q 767 608 767 598 Z"
          fill={u("toothG")}
        />
        <path
          d="M 722 528 Q 720 519 731 518 L 790 515 Q 802 516 800 527 L 796 541 Q 792 551 780 552 L 744 552 Q 731 551 727 541 Z"
          fill={u("noseG")}
        />
        <path
          d="M 728 521 Q 760 515 797 518"
          fill="none"
          stroke="#6e6bf0"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.7}
        />
      </g>
      <g
        id={i("links")}
        stroke={u("linkG")}
        strokeWidth={27}
        strokeLinecap="round"
        fill="none"
      >
        <line x1={955} y1={626} x2={846} y2={727} />
        <line x1={690} y1={745} x2={782} y2={741} />
        <line x1={690} y1={752} x2={775} y2={877} />
        <line x1={668} y1={788} x2={573} y2={903} />
      </g>
      <g id={i("nodes")}>
        <circle cx={955} cy={626} r={55} fill={u("nodeTR")} />
        <circle cx={775} cy={877} r={57} fill={u("nodeBR")} />
        <circle cx={573} cy={903} r={55} fill={u("nodeBL")} />
        <ellipse
          cx={935}
          cy={603}
          rx={24}
          ry={16}
          transform="rotate(-35 935 603)"
          fill="#fff"
          opacity={0.18}
          filter={u("blur3")}
        />
        <ellipse
          cx={752}
          cy={853}
          rx={24}
          ry={16}
          transform="rotate(-35 752 853)"
          fill="#fff"
          opacity={0.15}
          filter={u("blur3")}
        />
        <ellipse
          cx={550}
          cy={880}
          rx={24}
          ry={16}
          transform="rotate(-35 550 880)"
          fill="#fff"
          opacity={0.15}
          filter={u("blur3")}
        />
      </g>
      <g id={i("paws")}>
        <path
          d="M 765 724 C 767 700 794 688 820 688 C 851 688 869 706 866 736 C 863 766 840 783 810 781 C 785 779 763 752 765 724 Z"
          fill={u("pawR")}
        />
        <path
          d="M 772 712 C 785 696 812 692 832 694"
          fill="none"
          stroke="#6b68e8"
          strokeWidth={4}
          strokeLinecap="round"
          opacity={0.7}
        />
        <path
          d="M 580 738 C 578 710 608 693 640 693 C 674 693 699 716 698 742 C 697 768 678 786 653 785 C 632 784 612 780 598 768 C 586 758 581 748 580 738 Z"
          fill={u("pawL")}
        />
        <path
          d="M 636 770 Q 648 783 660 779 M 662 764 Q 672 776 682 770"
          fill="none"
          stroke="#3b38a8"
          strokeWidth={3.5}
          strokeLinecap="round"
          opacity={0.75}
        />
      </g>
    </svg>
  );
};

const Logo = ({ to = "/", light, className }) => (
  <Link
    to={to}
    aria-label={`${BRAND} home`}
    className={cn(
      "u-display-inline-flex u-align-items-center-2 u-gap-space-2 u-border-radius-var-radius-lg u-transition-property-transform-translate-scale-rotate-transition-timing-function-var-ui-ease-var-default-transition-timing-function u-ui-duration-0-15s-transition-duration-0-15s u-ui-ease-cubic-bezier-0-23-1-0-32-1-transition-timing-function-cubic-bezier-0-23-1-0-32-1 u-scale-0-97",
      light ? "u-color-var-color-white" : "u-color-var-ink",
      className,
    )}
  >
    <LogoMark />
    <span className="u-text-1-0625rem u-ui-weight-var-font-weight-bold-weight-var-font-weight-bold u-ui-tracking-0-03em-letter-spacing-0-03em">
      {BRAND}
    </span>
  </Link>
);

export default Logo;
