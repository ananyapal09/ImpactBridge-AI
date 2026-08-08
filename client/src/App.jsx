import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import DonorDashboard from "./pages/DonorDashboard";
import NgoDashboard from "./pages/NgoDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import Campaigns from "./pages/Campaigns";
import CampaignDetails from "./pages/CampaignDetails";
import NotFound from "./pages/NotFound";
import NGOs from "./pages/NGOs";

import CreateCampaign from "./pages/ngo/CreateCampaign";
import EditCampaign from "./pages/ngo/EditCampaign";
import Settings from "./pages/ngo/Settings";

import MyCampaigns from "./components/ngo/MyCampaigns";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminCampaigns from "./pages/AdminCampaigns";
import AdminUsers from "./pages/AdminUsers";
import AdminDonations from "./pages/AdminDonations";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminCampaignDetails from "./pages/AdminCampaignDetails";
import AdminNGOs from "./pages/AdminNGOs";
import VerifyCertificate from "./pages/VerifyCertificate";
function App() {
  return (
    <BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1B2A24",
            color: "#fff",
            border: "1px solid rgba(231,177,76,.35)",
            borderRadius: "14px",
          },

          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#fff",
            },
          },

          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <Routes>

        {/* ===================================== */}
        {/* PUBLIC ROUTES */}
        {/* ===================================== */}

        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/campaigns"
          element={<Campaigns />}
        />

        <Route
          path="/campaign/:id"
          element={<CampaignDetails />}
        />

        <Route
          path="/ngos"
          element={<NGOs />}
        />


        {/* ===================================== */}
        {/* DONOR DASHBOARD */}
        {/* ===================================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["donor"]}>
              <DonorDashboard />
            </ProtectedRoute>
          }
        />


        {/* ===================================== */}
        {/* NGO DASHBOARD */}
        {/* ===================================== */}

        <Route
          path="/ngo-dashboard"
          element={
            <ProtectedRoute allowedRoles={["ngo"]}>
              <NgoDashboard />
            </ProtectedRoute>
          }
        />

        {/* NGO - MY CAMPAIGNS */}

        <Route
          path="/ngo-dashboard/campaigns"
          element={
            <ProtectedRoute allowedRoles={["ngo"]}>
              <MyCampaigns search="" />
            </ProtectedRoute>
          }
        />

        {/* NGO - CREATE CAMPAIGN */}

        <Route
          path="/ngo-dashboard/create"
          element={
            <ProtectedRoute allowedRoles={["ngo"]}>
              <CreateCampaign />
            </ProtectedRoute>
          }
        />

        {/* NGO - EDIT CAMPAIGN */}

        <Route
          path="/ngo-dashboard/edit/:id"
          element={
            <ProtectedRoute allowedRoles={["ngo"]}>
              <EditCampaign />
            </ProtectedRoute>
          }
        />

        {/* NGO - SETTINGS */}

        <Route
          path="/ngo-dashboard/settings"
          element={
            <ProtectedRoute allowedRoles={["ngo"]}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
  path="/verify-certificate"
  element={<VerifyCertificate />}
/>


        {/* ===================================== */}
        {/* ADMIN DASHBOARD */}
        {/* ===================================== */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ADMIN - CAMPAIGNS */}

        <Route
          path="/admin/campaigns"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminCampaigns />
            </ProtectedRoute>
          }
        />

        {/* ADMIN - USERS */}

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        {/* ADMIN - DONATIONS */}

        <Route
          path="/admin/donations"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDonations />
            </ProtectedRoute>
          }
        />

        {/* ADMIN - ANALYTICS */}

        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />

        {/* ADMIN - CAMPAIGN DETAILS */}

        <Route
          path="/admin/campaign/:id"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminCampaignDetails />
            </ProtectedRoute>
          }
        />


        {/* ===================================== */}
        {/* 404 */}
        {/* ===================================== */}

        <Route
          path="*"
          element={<NotFound />}
        />
        <Route
  path="/admin/ngos"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminNGOs />
    </ProtectedRoute>
  }
/>

      </Routes>
      </BrowserRouter>
  
  );
}

export default App;