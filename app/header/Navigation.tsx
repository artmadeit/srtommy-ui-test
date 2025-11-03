// import React from "react";

// interface NavigationItem {
//   label: string;
//   href: string;
// }

// interface NavigationProps {
//   items: NavigationItem[];
// }

// const Navigation: React.FC<NavigationProps> = ({ items }) => {
//   return (
//     <nav className="navigation">
//       <ul className="nav-list">
//         {items.map((item, index) => (
//           <li key={index} className="nav-item">
//             <a href={item.href} className="nav-link">
//               {item.label}
//             </a>
//           </li>
//         ))}
//       </ul>
//       <style jsx>{`
//         .navigation {
//           position: relative;
//           // margin-top: 15px;
//           padding-right: 0;
//           display: flex;
//           flex-direction: column;
//           flex-grow: 3.1608208817763215;
//         }
//         .nav-list {
//           position: relative;
//           align-self: stretch;
//           display: flex;
//           flex-direction: row;
//           gap: 17.847225189208984px;
//           justify-content: flex-start;
//           list-style-type: none;
//           padding: 0;
//           margin: 0;
//         }
//         .nav-link {
//           position: relative;
//           cursor: pointer;
//           pointer-events: auto;
//           text-decoration: none;
//           color: rgba(78, 77, 77, 1);
//           font-family: Helvetica;
//         }
//         @media (max-width: 991px) {
//           .navigation {
//             // display: none;
//             // margin-right: auto;
//             // flex-direction: row;
//           }
//           .nav-list {
//             justify-content: center;
//           }
//         }
//         @media (max-width: 640px) {
//           .navigation {
//             display: none;
//           }
//         }
//       `}</style>
//     </nav>
//   );
// };

// export default Navigation;
