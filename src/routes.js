// src/routes.js
import React from 'react';

// ========== PUBLIC PAGES ==========
import Homepage from './pages/public/Homepage';
import AboutUs from './pages/public/AboutUs';
import OurImpact from './pages/public/OurImpact';
import SuccessStories from './pages/public/SuccessStories';
import Blog from './pages/public/Blog';
import BlogPost from './pages/public/BlogPost';
import Events from './pages/public/Events';
import EventDetails from './pages/public/EventDetails';
import FAQ from './pages/public/FAQ';
import ContactUs from './pages/public/ContactUs';
import Partners from './pages/public/Partners';
import Careers from './pages/public/Careers';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import TermsOfService from './pages/public/TermsOfService';
import InteractiveMap from './pages/public/InteractiveMap';
import TreeDetails from './pages/public/TreeDetails';
import SearchTrees from './pages/public/SearchTrees';
import SpeciesGallery from './pages/public/SpeciesGallery';
import CountryImpact from './pages/public/CountryImpact';
import FarmersProgram from './pages/public/FarmersProgram';
import MeetFarmers from './pages/public/MeetFarmers';
// For public farmer profile
import PublicFarmerProfile from './pages/public/FarmerProfile';
import TrainingPrograms from './pages/public/TrainingPrograms';
import TrainingDetails from './pages/public/TrainingDetails';
import DonationOptions from './pages/public/DonationOptions';
import OneTimeDonation from './pages/public/OneTimeDonation';
import SubscriptionPlans from './pages/public/SubscriptionPlans';
import PlanDetails from './pages/public/PlanDetails';
import GiftTrees from './pages/public/GiftTrees';
import GiftForm from './pages/public/GiftForm';
import MemorialTrees from './pages/public/MemorialTrees';
import CorporateGiving from './pages/public/CorporateGiving';
import Checkout from './pages/public/Checkout';
import OrderConfirmation from './pages/public/OrderConfirmation';
import DonationReceipt from './pages/public/DonationReceipt';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import ForgotPassword from './pages/public/ForgotPassword';
import ResetPassword from './pages/public/ResetPassword';
import CarbonCalculator from './pages/public/CarbonCalculator';
import PlantCalculator from './pages/public/PlantCalculator';
import SpeciesSelector from './pages/public/SpeciesSelector';
import FundraisingCampaigns from './pages/public/FundraisingCampaigns';
import CreateFundraiser from './pages/public/CreateFundraiser';
import CampaignPage from './pages/public/CampaignPage';
import LivePlantingFeed from './pages/public/LivePlantingFeed';
import PhotoGallery from './pages/public/PhotoGallery';
import VirtualForest from './pages/public/VirtualForest';
import MobileAppDownload from './pages/public/MobileAppDownload';
import QRCodeScanner from './pages/public/QRCodeScanner';
import TreeAdoption from './pages/public/TreeAdoption';
import SchoolPrograms from './pages/public/SchoolPrograms';
import WeddingRegistry from './pages/public/WeddingRegistry';
import InMemoriam from './pages/public/InMemoriam';
import PressKit from './pages/public/PressKit';
import APIDocumentation from './pages/public/APIDocumentation';
import SiteMap from './pages/public/SiteMap';
import Accessibility from './pages/public/Accessibility';
import NotFound from './pages/public/NotFound';

// ========== DONOR PAGES ==========
import DonorDashboard from './pages/donor/DonorDashboard';
import MyTrees from './pages/donor/MyTrees';
import TreeDetailsPrivate from './pages/donor/TreeDetailsPrivate';
import MyMap from './pages/donor/MyMap';
import MySubscription from './pages/donor/MySubscription';
import ChangePlan from './pages/donor/ChangePlan';
import PaymentMethods from './pages/donor/PaymentMethods';
import BillingHistory from './pages/donor/BillingHistory';
import MyCertificates from './pages/donor/MyCertificates';
import CertificateView from './pages/donor/CertificateView';
import MyImpact from './pages/donor/MyImpact';
import AchievementBadges from './pages/donor/AchievementBadges';
import AccountSettings from './pages/donor/AccountSettings';
import PrivacySettings from './pages/donor/PrivacySettings';
import Notifications from './pages/donor/Notifications';
import ReferralProgram from './pages/donor/ReferralProgram';
import Wishlist from './pages/donor/Wishlist';

// ========== FARMER PAGES ==========
import FarmerLogin from './pages/farmer/FarmerLogin';
import FarmerDashboard from './pages/farmer/FarmerDashboard';
import FarmerTrees from './pages/farmer/FarmerTrees';
import TreeCareSchedule from './pages/farmer/TreeCareSchedule';
import ReportDeadTree from './pages/farmer/ReportDeadTree';
import ReplacementStatus from './pages/farmer/ReplacementStatus';
import TrainingCalendar from './pages/farmer/TrainingCalendar';
import MyTraining from './pages/farmer/MyTraining';
import FarmerProfile from './pages/farmer/FarmerProfile';
import MyLand from './pages/farmer/MyLand';
import HarvestRecords from './pages/farmer/HarvestRecords';
import Messages from './pages/farmer/Messages';

// ========== ADMIN PAGES ==========
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import VerifyReports from './pages/admin/VerifyReports';
import ManageNursery from './pages/admin/ManageNursery';
import ProcessPayments from './pages/admin/ProcessPayments';
import GenerateReports from './pages/admin/GenerateReports';
import ManageContent from './pages/admin/ManageContent';
import ScheduleTraining from './pages/admin/ScheduleTraining';
import ManageFarmers from './pages/admin/ManageFarmers';
import ManageTrees from './pages/admin/ManageTrees';
import ManageDonations from './pages/admin/ManageDonations';
import SystemSettings from './pages/admin/SystemSettings';

// Public Routes (88 pages)
export const publicRoutes = [
  { path: '/', element: <Homepage /> },
  { path: '/about', element: <AboutUs /> },
  { path: '/impact', element: <OurImpact /> },
  { path: '/stories', element: <SuccessStories /> },
  { path: '/blog', element: <Blog /> },
  { path: '/blog/:id', element: <BlogPost /> },
  { path: '/events', element: <Events /> },
  { path: '/events/:id', element: <EventDetails /> },
  { path: '/faq', element: <FAQ /> },
  { path: '/contact', element: <ContactUs /> },
  { path: '/partners', element: <Partners /> },
  { path: '/careers', element: <Careers /> },
  { path: '/privacy', element: <PrivacyPolicy /> },
  { path: '/terms', element: <TermsOfService /> },
  { path: '/map', element: <InteractiveMap /> },
  { path: '/tree/:id', element: <TreeDetails /> },
  { path: '/search', element: <SearchTrees /> },
  { path: '/species', element: <SpeciesGallery /> },
  { path: '/countries', element: <CountryImpact /> },
  { path: '/farmers', element: <FarmersProgram /> },
  { path: '/farmers/list', element: <MeetFarmers /> },
  { path: '/farmers/:id', element: <PublicFarmerProfile /> },
  { path: '/training', element: <TrainingPrograms /> },
  { path: '/training/:id', element: <TrainingDetails /> },
  { path: '/donate', element: <DonationOptions /> },
  { path: '/donate/one-time', element: <OneTimeDonation /> },
  { path: '/subscribe', element: <SubscriptionPlans /> },
  { path: '/subscribe/:plan', element: <PlanDetails /> },
  { path: '/gift', element: <GiftTrees /> },
  { path: '/gift/form', element: <GiftForm /> },
  { path: '/memorial', element: <MemorialTrees /> },
  { path: '/corporate', element: <CorporateGiving /> },
  { path: '/checkout', element: <Checkout /> },
  { path: '/thank-you', element: <OrderConfirmation /> },
  { path: '/receipt/:id', element: <DonationReceipt /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
  { path: '/calculator', element: <CarbonCalculator /> },
  { path: '/plant-calculator', element: <PlantCalculator /> },
  { path: '/species-selector', element: <SpeciesSelector /> },
  { path: '/campaigns', element: <FundraisingCampaigns /> },
  { path: '/campaigns/create', element: <CreateFundraiser /> },
  { path: '/campaigns/:id', element: <CampaignPage /> },
  { path: '/live-feed', element: <LivePlantingFeed /> },
  { path: '/gallery', element: <PhotoGallery /> },
  { path: '/virtual-forest', element: <VirtualForest /> },
  { path: '/app', element: <MobileAppDownload /> },
  { path: '/scan', element: <QRCodeScanner /> },
  { path: '/adopt', element: <TreeAdoption /> },
  { path: '/schools', element: <SchoolPrograms /> },
  { path: '/weddings', element: <WeddingRegistry /> },
  { path: '/in-memoriam', element: <InMemoriam /> },
  { path: '/press', element: <PressKit /> },
  { path: '/developers', element: <APIDocumentation /> },
  { path: '/sitemap', element: <SiteMap /> },
  { path: '/accessibility', element: <Accessibility /> },
  { path: '*', element: <NotFound /> },
];

// Donor Routes (21 pages)
export const donorRoutes = [
  { path: '/dashboard', element: <DonorDashboard /> },
  { path: '/dashboard/trees', element: <MyTrees /> },
  { path: '/dashboard/tree/:id', element: <TreeDetailsPrivate /> },
  { path: '/dashboard/map', element: <MyMap /> },
  { path: '/dashboard/subscription', element: <MySubscription /> },
  { path: '/dashboard/upgrade', element: <ChangePlan /> },
  { path: '/dashboard/payments', element: <PaymentMethods /> },
  { path: '/dashboard/invoices', element: <BillingHistory /> },
  { path: '/dashboard/certificates', element: <MyCertificates /> },
  { path: '/dashboard/certificate/:id', element: <CertificateView /> },
  { path: '/dashboard/impact', element: <MyImpact /> },
  { path: '/dashboard/badges', element: <AchievementBadges /> },
  { path: '/dashboard/settings', element: <AccountSettings /> },
  { path: '/dashboard/privacy', element: <PrivacySettings /> },
  { path: '/dashboard/notifications', element: <Notifications /> },
  { path: '/dashboard/refer', element: <ReferralProgram /> },
  { path: '/dashboard/wishlist', element: <Wishlist /> },
];

// Farmer Routes (12 pages)
export const farmerRoutes = [
  { path: '/farmer/login', element: <FarmerLogin /> },
  { path: '/farmer/dashboard', element: <FarmerDashboard /> },
  { path: '/farmer/trees', element: <FarmerTrees /> },
  { path: '/farmer/care', element: <TreeCareSchedule /> },
  { path: '/farmer/report-death', element: <ReportDeadTree /> },
  { path: '/farmer/replacements', element: <ReplacementStatus /> },
  { path: '/farmer/training', element: <TrainingCalendar /> },
  { path: '/farmer/my-training', element: <MyTraining /> },
  { path: '/farmer/profile', element: <FarmerProfile /> },
  { path: '/farmer/land', element: <MyLand /> },
  { path: '/farmer/harvest', element: <HarvestRecords /> },
  { path: '/farmer/messages', element: <Messages /> },
];

// Admin Routes (12 pages)
export const adminRoutes = [
  { path: '/admin', element: <AdminDashboard /> },
  { path: '/admin/users', element: <ManageUsers /> },
  { path: '/admin/reports', element: <VerifyReports /> },
  { path: '/admin/nursery', element: <ManageNursery /> },
  { path: '/admin/payments', element: <ProcessPayments /> },
  { path: '/admin/reports/generate', element: <GenerateReports /> },
  { path: '/admin/content', element: <ManageContent /> },
  { path: '/admin/training', element: <ScheduleTraining /> },
  { path: '/admin/farmers', element: <ManageFarmers /> },
  { path: '/admin/trees', element: <ManageTrees /> },
  { path: '/admin/donations', element: <ManageDonations /> },
  { path: '/admin/settings', element: <SystemSettings /> },
];