// import { NavLink } from "react-router-dom";

// interface MenuItem {
//   label: string;
//   path: string;
// }

// const menuItems: MenuItem[] = [
//   { label: "UsersTable", path: "/UsersTable" },
//   { label: "Service 1 for Car", path: "/Api1" },
//   { label: "Service for Scan Car", path: "/Api2" },
//   { label: "Obd Scan Report", path: "/ObdScanReport" },
//   { label: "Special Function", path: "/SpecilaFunction" },
//   { label: "Actuations Detail", path: "/ActuationsDetail" },
//   { label: "Custom commands", path: "/Customcommands1" },
//   { label: "ActuationFetcher", path: "/ActuationFetcher" },
//   { label: "CommandFetcher", path: "/CommandFetcher" },
//   { label: "Model List Page", path: "/ModelListPage" },
//   { label: "Bike Make List", path: "/BikeMakeList" },
//   { label: "Odometer Details", path: "/OdometerDetails" },
//   { label: "Update commands", path: "/Updatecommand" },
// ];

// function Sidebar() {
//   return (
//     <div className="bg-gray-100 h-screen w-64 p-4 shadow-lg">
//       <h2 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h2>

//       <div className="space-y-4">
//         {menuItems.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             className={({ isActive }) =>
//               `block px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${
//                 isActive
//                   ? "bg-blue-500 text-white shadow"
//                   : "text-gray-700 hover:bg-blue-100"
//               }`
//             }
//           >
//             {item.label}
//           </NavLink>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Sidebar;




import { NavLink } from "react-router-dom";

interface MenuItem {
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { label: "UsersTable", path: "/UsersTable" },
  { label: "Service 1 for Car", path: "/Api1" },
  { label: "Service for Scan Car", path: "/Api2" },
  { label: "Obd Scan Report", path: "/ObdScanReport" },
  { label: "Special Function", path: "/SpecilaFunction" },
  { label: "Actuations Detail", path: "/ActuationsDetail" },
  { label: "Custom commands", path: "/Customcommands1" },
  { label: "ActuationFetcher", path: "/ActuationFetcher" },
  { label: "CommandFetcher", path: "/CommandFetcher" },
  { label: "Model List Page", path: "/ModelListPage" },
  { label: "Bike Make List", path: "/BikeMakeList" },
  { label: "Odometer Details", path: "/OdometerDetails" },
  { label: "Update commands", path: "/Updatecommand" },
];

function Sidebar() {
  return (
    <div className="bg-gray-100 h-screen w-64 p-4 shadow-lg overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 ml-4 text-gray-800">Dashboard</h2>

      <div className="space-y-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-700 hover:bg-blue-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
