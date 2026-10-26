import { Link, useLocation } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import ThemeToggle from './ThemeToggle'
import { useScrolled } from '@/hooks/useScrolled'
import { BRAND } from '@/domain/rubric'
import { cn } from '@/lib/cn'

const CRUMBS = [
  [/^\/app\/new/, 'Setup'],
  [/^\/app\/projects\/[^/]+\/results/, 'Results'],
  [/^\/app\/projects\/[^/]+\/report/, 'Report'],
  [/^\/app\/projects/, 'History'],
  [/^\/app\/evaluations/, 'Evaluations'],
  [/^\/app\/reports/, 'Reports'],
  [/^\/app\/settings/, 'Settings'],
  [/^\/app\/help/, 'Help & docs'],
  [/^\/app$/, 'Dashboard'],
]

const Topbar = () => {
  const { pathname } = useLocation()
  const scrolled = useScrolled()
  const crumb = CRUMBS.find(([pattern]) => pattern.test(pathname))?.[1] ?? ''
  const inWizard = pathname.startsWith('/app/new')

  return (
    <header
      className={cn(
        "style-40b30b4e8f style-964a9431ff style-98599e4ee2 style-4e8f0a87a0 style-bbe39cfb5c style-6957a0d1d3 style-10e9f177b8 style-97e9901753",
        scrolled ? "style-4769f958af" : "style-e9c0d2f359",
      )}
    >
      <div className="style-222f930b87 style-3c2f6f8a3b style-71556df3b4 style-32c92bb1fd style-d7db3451d1 style-220ac1a984 style-d48a005697">
        <nav aria-label="Breadcrumb" className="style-222f930b87 style-71556df3b4 style-074569488c style-294e640e9b style-682659f553">
          <Link to="/app" className="style-eae178841c style-d82b3e060a">
            {BRAND}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="style-87e86ce38e style-3c70d0a0c9">{crumb}</span>
        </nav>
        <div className="style-222f930b87 style-71556df3b4 style-074569488c">
          <ThemeToggle />
          {!inWizard && (
            <Button to="/app/projects?newProject=1" icon={<Plus size={16} />}>
              <span className="style-e564b4081d style-a0a9310340">New project</span>
              <span className="style-ee12d4f979">New</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Topbar
