import { NavLink, useNavigate } from 'react-router-dom'
import {
  BarChart3,
  FileText,
  FolderGit2,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Settings,
} from 'lucide-react'
import Logo from '@/components/brand/Logo'
import Avatar from '@/components/ui/Avatar'
import Menu from '@/components/ui/Menu'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/cn'

export const WORKSPACE_NAV = [
  { to: '/app', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/app/projects', label: 'Projects', icon: FolderGit2 },
  { to: '/app/evaluations', label: 'Evaluations', icon: BarChart3 },
  { to: '/app/reports', label: 'Reports', icon: FileText },
]

const item = ({ isActive }) =>
  cn(
    "style-222f930b87 style-71556df3b4 style-d7db3451d1 style-a7ab7bd722 style-0f9e667291 style-ee09e8f0b7 style-294e640e9b style-daaac3fbf5 style-d84d3212f4 style-3d53df2cf7 style-501b3e6c9f style-144113eebd",
    isActive
      ? "style-95debef1e0 style-242347c218"
      : "style-9e676c7431 style-0637e93d27 style-d82b3e060a",
  )

const Sidebar = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  return (
    <aside className="style-964a9431ff style-98599e4ee2 style-e564b4081d style-917c16a13a style-302c0d124a style-baf794b99c style-4769f958af style-ad04ce25f0 style-0f9e667291 style-17b03732cf style-08a31a346e style-521a4cf819">
      <div className="style-0f9e667291">
        <Logo to="/app" />
      </div>
      <p className="style-02fd0ea53c style-c221af54a3 style-0f9e667291 style-4010c02329 style-daaac3fbf5 style-682659f553">Workspace</p>
      <nav aria-label="Workspace" className="style-222f930b87 style-302c0d124a style-11773e883e">
        {WORKSPACE_NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={item}>
            <Icon size={18} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="style-930e37ac8b">
        <p className="style-02fd0ea53c style-0f9e667291 style-4010c02329 style-daaac3fbf5 style-682659f553">Account</p>
        <nav aria-label="Account" className="style-222f930b87 style-302c0d124a style-11773e883e">
          <NavLink to="/app/help" className={item}>
            <HelpCircle size={18} aria-hidden="true" />
            Help &amp; docs
          </NavLink>
        </nav>
        <div className="style-d21b86ea41 style-222f930b87 style-71556df3b4 style-d7db3451d1 style-894c3815a5 style-4769f958af style-e7e01cc7f4 style-0a702d97ed">
          <Avatar name={user?.name ?? 'You'} />
          <div className="style-184ddc11e5 style-7bd5bab6d7">
            <p className="style-5a3a4ee420 style-294e640e9b style-87e86ce38e">{user?.name}</p>
            <p className="style-5a3a4ee420 style-4010c02329 style-682659f553">{user?.email}</p>
          </div>
          <Menu
            label="Account menu"
            placement="top"
            items={[
              {
                label: 'Settings',
                icon: <Settings size={16} aria-hidden="true" />,
                onSelect: () => navigate('/app/settings'),
              },
              {
                label: 'Sign out',
                icon: <LogOut size={16} aria-hidden="true" />,
                onSelect: () => {
                  signOut()
                  navigate('/')
                },
              },
            ]}
          />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
