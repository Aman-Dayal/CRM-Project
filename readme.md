# CRM Application

This is a CRM (Customer Relationship Management) application built with React, TypeScript, and Tailwind CSS. It provides a user-friendly interface for managing contacts, companies, and deals.

## Features

*   **Dashboard:** Provides an overview of key metrics and recent activities.
*   **Contacts Management:** Allows users to create, read, update, and delete contacts.
*   **Companies Management:** Enables users to manage company information, including industry, website, and location.
*   **Deals Management:** Facilitates the tracking of sales deals through various stages.
*   **Calendar:** Provides a calendar view for scheduling and managing appointments.
*   **Settings:** Allows users to customize their application settings.
*   **Search:** Global search functionality to quickly find contacts, companies, and deals.
*   **Responsive Layout:** The application is designed to be responsive and accessible on various devices.

## Components

### Layout Components

*   **AppLayout:** Provides the main layout structure for the application, including the sidebar and header.
*   **AppHeader:** Contains the search bar, notifications, and user profile dropdown.
*   **AppSidebar:** Provides navigation links to the main sections of the application.

### Dashboard Components

*   **SalesChart:** Displays a chart of sales data.
*   **DealsByStage:** Shows the distribution of deals across different stages.
*   **RecentContacts:** Lists the most recently added contacts.
*   **LatestDeals:** Displays the latest sales deals.
*   **StatCard:** Displays a single statistic with a title and value.

### UI Components

*   The application uses a variety of UI components from the `@/components/ui` directory, including:
    *   Button
    *   Input
    *   Card
    *   Table
    *   DropdownMenu
    *   Avatar
    *   Badge
    *   Dialog
    *   Etc.

### Page Components

*   **Dashboard:** The main dashboard page.
*   **Contacts:** Page for managing contacts.
*   **Companies:** Page for managing companies.
*   **Deals:** Page for managing deals.
*   **Calendar:** Calendar page.
*   **Settings:** Settings page.

## Backend

The backend is built with Python and FastAPI. It provides a REST API for managing data.

## Technologies Used

*   React
*   TypeScript
*   Tailwind CSS
*   FastAPI
*   Lucide React Icons

## Installation

1.  Clone the repository: `git clone https://github.com/Aman-Dayal/CRM-Application.git`
2.  Install the dependencies: `npm install`
3.  Start backend server: uvicorn main:app --reload
4.  Start the development server: `npm run dev`

