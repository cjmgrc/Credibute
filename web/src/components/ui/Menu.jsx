import { useEffect, useRef, useState } from 'react'
import { Ellipsis } from 'lucide-react'
import { cn } from '@/lib/cn'

/** Popover menu. Scales in from its trigger corner (not from centre). */
const Menu = ({ items, label = 'More options', placement = "bottom" }) => {
  const [open, setOpen] = useState(false)
  const root = useRef(null)

  useEffect(() => {
    if (!open) return
    const down = (e) => {
      if (!root.current?.contains(e.target)) setOpen(false)
    }
    const key = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', down)
    document.addEventListener('keydown', key)
    return () => {
      document.removeEventListener('pointerdown', down)
      document.removeEventListener('keydown', key)
    }
  }, [open])

  return (
    <div ref={root} className="style-d2d9e1f134">
      <button
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="style-0f2a693e93 style-ebd37e04d4 style-4446c26b62 style-49abc543ea style-682659f553 style-afcb01b331 style-3d53df2cf7 style-d64255261e style-0637e93d27 style-d82b3e060a"
      >
        <Ellipsis size={18} />
      </button>
      {open && (
        <div
          role="menu"
          className={cn(
            "style-95d8467434 style-747355bdc2 style-a74c447701 style-fbb62f5cb6 style-b76283ce01 style-6ad537f2bb style-4f1a55de40 style-4769f958af style-1dee6e3ec6 style-b743453ee3 style-76585be20a style-3d53df2cf7 style-501b3e6c9f style-7adacfe55a style-2c710eb96a style-d1181a2b59",
            placement === "top"
              ? "style-ada467758e style-a7b3741ba7 style-7eccd974ae"
              : "style-b726f5a347 style-5a06344d31 style-70fc9df162",
          )}
        >
          {items.map((item) => (
            <button
              key={item.label}
              role="menuitem"
              type="button"
              onClick={() => {
                setOpen(false)
                item.onSelect()
              }}
              className={cn(
                "style-222f930b87 style-58d0413dd9 style-71556df3b4 style-08f0549eb6 style-49abc543ea style-588daa1a98 style-b5edc3ea7c style-1a5d10977b style-294e640e9b style-daaac3fbf5 style-eae178841c style-aa96ad346e style-0637e93d27",
                item.tone === 'danger' ? "style-5640c57ccb" : "style-3c70d0a0c9",
              )}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Menu
