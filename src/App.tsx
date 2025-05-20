import Layout from "./components/layout"
import { Route, Routes } from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
import { ThemeProvider } from "./context/theme-provider"
import Invoices from "./pages/Invoices"
import Clients from "./pages/Clients"
import ClientDetails from "./pages/ClientDetails"
import Settings from "./pages/Settings"
import { InvoiceProvider } from "./context/invoice-provider"
import Notifications from "./pages/Notifications"
import { useDocumentTitle } from "./hooks/useDocumentTitle"

const App = () => {
  useDocumentTitle();
  return (
    <div className="">
        <InvoiceProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Layout>
              <Routes>
                <Route path={"/"} element={<Dashboard />} />
                <Route path={"/invoices"} element={<Invoices />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/clients/:email" element={<ClientDetails />} />
              </Routes>
            </Layout>
          </ThemeProvider>
        </InvoiceProvider>
    </div>
  )
}

export default App