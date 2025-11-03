// import Image, { StaticImageData } from "next/image";
// import Link from "next/link";
// import React from "react";
// import MenuIcon from "@mui/icons-material/Menu";

// interface LogoProps {
//   src: StaticImageData;
//   alt: string;
// }

// const Logo: React.FC<LogoProps> = ({ src, alt }) => {
//   return (
//     <div className="logo-wrapper">
//       <input type="checkbox" id="check" />
//       <label htmlFor="check" className="checkbtn">
//         <MenuIcon />
//       </label>

//       <Link href="/">
//         <Image
//           style={{ width: "60px", height: "60px" }}
//           src={src}
//           alt={alt}
//           className="logo"
//         />
//       </Link>
//       <style jsx>{`
//         .logo-wrapper {
//           display: flex;
//           align-items: center;
//           // flex-grow: 1.1674179080885916;
//           // align-self: stretch;
//           // position: relative;
//         }
//         .logo {
//           opacity: 1;
//           transition: opacity 0.2s ease-in-out;
//           object-fit: contain;
//           object-position: center;
//           width: 89px;
//           height: 48px;

//           // max-height: 48px;
//           // max-width: 89px;
//           // min-height: 20px;
//           // min-width: 20px;

//           // aspect-ratio: 1.27;

//           // width: 100%;

//           // overflow: hidden;
//           // max-height: 48px;
//           // max-width: 89px;
//           // margin: 0 auto;
//         }
//         .checkbtn {
//           cursor: pointer;
//           display: none;
//         }

//         #check {
//           display: none;
//         }

//         @media (max-width: 991px) {
//           .logo-wrapper {
//             align-items: center;
//             // width: 100%;
//             margin: auto auto auto 0;
//           }
//           .logo {
//             margin-right: auto;
//             width: auto;
//             flex-grow: 1;
//           }
//         }
//         @media (max-width: 640px) {
//           .logo-wrapper {
//             justify-content: flex-start;
//           }
//           .logo {
//             margin-right: auto;
//             max-height: 42px;
//             max-width: 53px;
//             min-width: 42px;
//           }
//           .checkbtn {
//             display: block;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Logo;
