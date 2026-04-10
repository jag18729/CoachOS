import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AppProvider } from './context/AppContext'
import Layout from './components/layout/Layout'
import Dashboard from './components/dashboard/Dashboard'
import ClientList from './components/clients/ClientList'
import CheckInInbox from './components/checkins/CheckInInbox'
import ScheduleView from './components/schedule/ScheduleView'
import BillingView from './components/billing/BillingView'
import RostersView from './components/rosters/RostersView'
import AnalyticsView from './components/analytics/AnalyticsView'
import SettingsView from './components/settings/SettingsView'

export default function App() {
  return (
    <HashRouter>
      <ThemeProvider>
        <AppProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clients" element={<ClientList />} />
              <Route path="/checkins" element={<CheckInInbox />} />
              <Route path="/schedule" element={<ScheduleView />} />
              <Route path="/billing" element={<BillingView />} />
              <Route path="/rosters" element={<RostersView />} />
              <Route path="/analytics" element={<AnalyticsView />} />
              <Route path="/settings" element={<SettingsView />} />
            </Route>
          </Routes>
        </AppProvider>
      </ThemeProvider>
    </HashRouter>
  )
}
