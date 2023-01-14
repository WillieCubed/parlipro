import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth, UserContext } from "./lib/auth";
import ChairDashboard from "./modules/chair/ChairDashboard";
import LandingPage from "./modules/common/LandingPage";
import CompanionDisplay from "./modules/companion/components/CompanionDisplay";
import ParticipantDisplay from "./modules/participant/components/ParticipantDisplay";
import IndexRoute from "./routes/IndexRoute";
import MeetingRoute from "./routes/MeetingRoute";

const ROUTES = [
  {
    path: "/m/:meetingId/",
    element: <MeetingRoute />,
    children: [
      {
        path: "chair/",
        element: <ChairDashboard />,
      },
      {
        path: "participant/",
        element: <ParticipantDisplay />,
      },
      {
        path: "companion/",
        element: <CompanionDisplay />,
      },
    ],
  },
  {
    path: "/",
    element: <IndexRoute />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
    ],
  },
];

const router = createBrowserRouter(ROUTES);

function App() {
  const { authContext } = useAuth();

  return (
    <UserContext.Provider value={authContext}>
      <div className="min-h-screen bg-primary-2">
        <RouterProvider router={router} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
