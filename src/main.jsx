import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Header from './components/custom/Header'
import Home from './route-pages/Home'
import Preview from './destination-preview/Preview'
import Chatroom from './route-pages/Chatroom'
import Edit from './route-pages/Edit'
import Preference from './route-pages/Preference'
import Assistant from './components/custom/Assistant'
import Dashboard from './route-pages/Dashboard'
import Archive from './route-pages/Archive'
import Booking from './route-pages/Booking'
import Blog from './route-pages/Blog'
import { Toaster } from "@/components/ui/sonner"
import Trip_detail from './view-trip/[tripId]/Trip_detail'
import Hotels from './components/Recommendations/Hotels'
import Flight from './components/Recommendations/Flight'


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <Home />
      </>
    ),
  },
  {
    path: '/insights',
    element: (
      <>
        <Header />
        <Preview />
      </>
    ),
  },
  {
    path: '/collaboration',
    element: (
      <>
        <Header />
        <Chatroom />
      </>
    ),
  },
  {
    path: '/edit-itinerary',
    element: (
      <>
        <Header />
        <Edit />
      </>
    ),
  },
  {
    path: '/user-preference',
    element: (
      <>
        <Header />
        <Preference />
      </>
    ),
  },
  {
    path: '/trip-dashboard',
    element: (
      <>
        <Header />
        <Dashboard />
      </>
    ),
  },
  {
    path: '/archives',
    element: (
      <>
        <Header />
        <Archive />
      </>
    ),
  },
  {
    path: '/booking',
    element: (
      <>
        <Header />
        <Booking />
      </>
    ),
  },
  {
    path: '/trip-data/:tripId',
    element: (
      <>
        <Header />
        <Trip_detail />
      </>
    ),
  },
  {
    path: '/blog',
    element: (
      <>
        <Header />
        <Blog />
      </>
    ),
  },
  {
    path: '/hotel-recommendation',
    element: (
      <>
        <Header />
        <Hotels />
      </>
    ),
  },
  {
    path: '/flight-recommendation',
    element: (
      <>
        <Header />
        <Flight />
      </>
    ),
  },
]);

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
    <Assistant />
    <Toaster />
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
  // </StrictMode>,
)
