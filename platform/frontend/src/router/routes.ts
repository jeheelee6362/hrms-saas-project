import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {
        path: '/get-to-know-us',
        children: [
          {
            path: 'about',
            component: () => import('pages/about/AboutPage.vue'),
          },
          {
            path: 'our-team',
            component: () => import('pages/about/TeamPage.vue'),
          },
        ],
      },
      {
        path: '/more',
        children: [
          {
            path: 'blogs',
            component: () => import('pages/more/BlogsPage.vue'),
          },
          {
            path: 'media-center',
            component: () => import('pages/more/MediaCenterPage.vue'),
          },
          {
            path: 'careers',
            component: () => import('pages/more/CareersPage.vue'),
          },
          {
            path: 'investor',
            component: () => import('pages/more/InvestorPage.vue'),
          },
          {
            path: 'data-security',
            component: () => import('pages/more/DataSecurityPage.vue'),
          },
        ],
      },
      {
        path: '/resources',
        children: [
          {
            path: 'getting-started',
            component: () => import('pages/resources/GettingStartedPage.vue'),
          },
          {
            path: 'guide',
            component: () => import('pages/resources/InstructionPage.vue'),
          },
          {
            path: 'faqs',
            component: () => import('pages/resources/FAQsPage.vue'),
          },
        ],
      },
      {
        path: '/support',
        children: [
          {
            path: 'my-account',
            component: () => import('pages/support/MyAccountPage.vue'),
          },
          {
            path: 'legal',
            component: () => import('pages/support/LegalPage.vue'),
          },
          {
            path: 'site-map',
            component: () => import('pages/support/SiteMapPage.vue'),
          },
          {
            path: 'contact-us',
            component: () => import('pages/support/ContactUsPage.vue'),
          },
        ],
      },
      {
        path: '/policy',
        children: [
          {
            path: 'data-protection',
            component: () => import('pages/policy/DataProtectionPage.vue'),
          },
          {
            path: 'terms-of-service',
            component: () => import('pages/policy/TermsServicePage.vue'),
          },
          {
            path: 'privacy',
            component: () => import('pages/policy/PrivacyPage.vue'),
          },
          {
            path: 'cookie',
            component: () => import('pages/policy/CookiePage.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/get-to-know-us',
    component: () => import('layouts/FeaturesLayout.vue'),
    children: [
      {
        path: 'income-sync',
        component: () => import('pages/about/RealTimePage.vue'),
      },
      {
        path: 'time-attendance',
        component: () => import('pages/about/TimeAttendancePage.vue'),
      },
      {
        path: 'tax-compliance',
        component: () => import('pages/about/TaxCompliancePage.vue'),
      },
    ],
  },
  {
    path: '/portal',
    component: () => import('layouts/PortalLayout.vue'),
    children: [
      {
        path: 'employer',
        children: [
          {
            path: 'dashboard',
            component: () => import('pages/portal/employer/IndexPage.vue'),
          },
          {
            path: 'people',
            component: () => import('pages/portal/employer/EmployeesPage.vue'),
          },
          {
            path: 'payroll',
            component: () => import('pages/portal/employer/PayrollPage.vue'),
          },
          {
            path: 'time-attendance',
            component: () =>
              import('pages/portal/employer/TimeAttendancePage.vue'),
          },
          {
            path: 'report',
            component: () => import('pages/portal/employer/ReportPage.vue'),
          },
          {
            path: 'data-export',
            component: () => import('pages/portal/employer/DataExportPage.vue'),
          },
        ],
      },
      {
        path: 'employee',
        component: () => import('pages/portal/employee/IndexPage.vue'),
      },
      {
        path: 'admin',
        component: () => import('pages/portal/admin/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/account/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/signup',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/account/SignUpPage.vue'),
      },
    ],
  },
  {
    path: '/forgotpassword',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/account/ForgotPasswordPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
