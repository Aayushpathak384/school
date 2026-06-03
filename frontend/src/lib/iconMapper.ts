import {
  FaBook,
  FaDesktop,
  FaUsers,
  FaFootball,
  FaFlask,
  FaAward,
  FaGraduationCap,
  FaLaptop,
  FaChalkboardUser,
  FaHeart,
  FaBookOpenReader,
  FaMusic,
  FaMicroscope,
  FaChess,
  FaFire,
  FaLeaf,
  FaRocket,
  FaBrain,
} from 'react-icons/fa6'

export function getIconComponent(iconName: string) {
  const icons: { [key: string]: any } = {
    FaBook,
    FaDesktop,
    FaUsers,
    FaFootball,
    FaFlask,
    FaAward,
    FaGraduationCap,
    FaLaptop,
    FaChalkboardUser,
    FaHeart,
    FaBookOpenReader,
    FaMusic,
    FaMicroscope,
    FaChess,
    FaFire,
    FaLeaf,
    FaRocket,
    FaBrain,
  }

  return icons[iconName] || null
}
