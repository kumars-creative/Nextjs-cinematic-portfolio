import { SiBlender, SiDavinciresolve, SiFigma, SiInstagram } from "react-icons/si";
import {
  TbBrandAdobeAfterEffect,
  TbBrandAdobePremier,
  TbBrandAdobePhotoshop,
  TbCut,
} from "react-icons/tb";

export const SECTION = { label: "About" };

export const HEADING = {
  line1: "Ideas into",
  line2: "visual",
  line3: "stories.",
};

export const BIO = [
  "I’m *Kumar S.*, a *creative director* with *6+ years of experience* shaping visual ideas into memorable work. My practice moves between *film*, *motion*, *3D*, and *digital culture*.",
  "From *AI filmmaking* and *Blender 3D* to *video editing*, *motion graphics*, and *social media* storytelling, each project starts with a clear point of view and is built frame by frame.",
  "This portfolio is a growing archive of experiments and selected work. Project thumbnails currently use *temporary visual studies* and will be replaced with final assets as they are added.",
];


export const TECH = [
  { name: "Creative Direction", icon: SiFigma },
  { name: "AI Filmmaking", icon: SiInstagram },
  { name: "Motion Graphics", icon: TbBrandAdobeAfterEffect },
];

export const CREATIVE = [
  { name: "Blender 3D", icon: SiBlender },
  { name: "Video Editing", icon: SiDavinciresolve },
  { name: "Social Media", icon: TbBrandAdobePremier },
  { name: "Visual Design", icon: TbBrandAdobePhotoshop },
  { name: "Experimental Cuts", icon: TbCut },
];

export const EXPERIENCE = [
  { role: "Creative Direction & Visual Storytelling", period: "6+ Years" },
];
