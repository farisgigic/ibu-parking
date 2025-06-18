import { 
  LayoutDashboard, 
  Bell, 
  Car, 
  GraduationCap, 
  FileText, 
  Calendar
} from 'lucide-react';

const IconRenderer = ({ iconName, size = 20 }) => {
  const icons = {
    LayoutDashboard: <LayoutDashboard size={size} />,
    GraduationCap: <GraduationCap size={size} />,
    Car: <Car size={size} />,
    Bell: <Bell size={size} />,
    FileText: <FileText size={size} />,
    Calendar: <Calendar size={size} />
  };
  return icons[iconName] || <LayoutDashboard size={size} />;
};


export default IconRenderer;    