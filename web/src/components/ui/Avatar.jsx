import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '@/lib/cn';
import { initials } from '@/lib/format';
const TONES = ["style-95debef1e0 style-242347c218", "style-c0af61bc47 style-0e23fa0f9b", "style-8a7ae3341a style-7294770c9c", "style-91f2585319 style-5640c57ccb"];
const SIZES = { sm: "style-79ede756e7 style-e7e0a77fac", md: "style-3ee10ef4c0 style-81e78039bb", lg: "style-2bf0090baa style-c74ab393b9" };
const Avatar = ({ name, tone = 0, size = "md", square, className }) => (_jsx("span", { "aria-hidden": true, className: cn("style-0f2a693e93 style-27ead27a81 style-4446c26b62 style-0670710393 style-33b3c7d923", square ? "style-6ad537f2bb" : "style-b005d61d09", SIZES[size], TONES[tone % TONES.length], className), children: initials(name) }));
export default Avatar;
